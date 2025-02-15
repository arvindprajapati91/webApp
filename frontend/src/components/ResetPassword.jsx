import React, { Component } from 'react'
import Wrapper_ClickFun from "../components/wrapperClickFun"
import FormName from "../components/FormNameUpdatePage"
import ChangeHandler from "../components/ChangeHandler"
import Loader from "../components/Loader"
import PasswordStrengthMeter from './PasswordStrengthMeter';
import ErrorMessage from './errorMessage'

const API_form_name = "resetPasswordAPI"
const Reset_Password_API = `/${process.env.REACT_APP_NAME}/${API_form_name}`
const form_name_list = '';
const form_name = 'Reset Password';

export class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: '',
            cnfPassword: '',
            error_message: '',
            err_msg_visible: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        document.title = "Reset Password";
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.currentPassword === this.state.newPassword) {
            this.setState({
                error_message: "Current Password & New Password should not be same!!",
                err_msg_visible: true
            })
            return
        }
        if (this.state.newPassword !== this.state.cnfPassword) {
            this.setState({
                error_message: "New Password & Confirm Password should be same!!",
                err_msg_visible: true
            })
            return
        }
        this.setState({
            loading: true,
        })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        await fetch(`${Reset_Password_API}/`, requestOptions)
            .then(async response => {
                if (response.statusText === "Internal Server Error") {
                    this.setState({
                        loading: false
                    })
                    return alert(`${process.env.REACT_APP_ERROR_MSG}`);
                }
                const data = await response.json();
                if (data.status) {
                    this.setState({
                        sucess_msg: "Password is changed sucessfully!",
                        currentPassword: '',
                        newPassword: '',
                        cnfPassword: '',
                        error_message: '',
                        loading: false,
                        err_msg_visible: false
                    })
                }
                else if (data.error_msg) {
                    const val = false
                    this.setState({
                        sucess_msg: "",
                        err_msg_visible: true,
                        error_message: data.error_msg,
                        loading: false,
                    })
                    setTimeout(() => {
                        this.setState({
                            err_msg_visible: false,
                        });
                    }, process.env.REACT_APP_ERR_MSG_DUR);
                };
            })

    }
    render() {
        return (
            <div className="wrapper">
                <div className="content-wrapper" onClick={Wrapper_ClickFun.bind(this)}>
                    <form id="app-form" onSubmit={this.handleSubmit} autoComplete="off">
                        <FormName form_name_list={form_name_list} form_name={form_name}></FormName>
                        <Loader load={this.state.loading}></Loader>
                        <ErrorMessage error_message={error_message} err_msg_visible={this.state.err_msg_visible}></ErrorMessage>
                        <div className={`alert alert-success alert-dismissible`} role="alert" style={{ padding: "5px", marginBottom: "2px", display: this.state.sucess_msg ? 'block' : 'none' }}>
                            <strong>Success :</strong> {this.state.sucess_msg}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" ></button>
                        </div>
                        <div className="row">
                            <label for="bl_code" className="col-lg-2 col-md-2 col-sm-2 col-form-label col-form-label-sm">
                                Current Password :
                            </label>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input type="password" name="currentPassword" id="current_password" className="form-control form-control-sm" autocomplete="off" placeholder="Current Password" value={this.state.currentPassword} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} required />
                                <div className="form-helper helper_hide" id="current_password_helper">Required</div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-7"></div>

                            <label for="bl_code" className="col-lg-2 col-md-2 col-sm-2 col-form-label col-form-label-sm">
                                New Password :
                            </label>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input type="password" name="newPassword" id="new_password" className="form-control form-control-sm" autocomplete="off" placeholder="New Password" value={this.state.newPassword} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} required />
                                <div className="form-helper helper_hide" id="new_password_helper">Required</div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2">
                                {this.state.newPassword !== "" ?
                                    <PasswordStrengthMeter password={this.state.newPassword} minLength={10} />
                                    :
                                    ''
                                }
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-5"></div>

                            <label for="bl_code" className="col-lg-2 col-md-2 col-sm-2 col-form-label col-form-label-sm">
                                Confirm Password :
                            </label>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input type="password" name="cnfPassword" id="confirm_password" className="form-control form-control-sm" autocomplete="off" placeholder="Confirm Password" value={this.state.cnfPassword} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} required />
                                <div className="form-helper helper_hide" id="confirm_password_helper">Required</div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2">
                                {this.state.newPassword !== "" ?
                                    <PasswordStrengthMeter password={this.state.cnfPassword} />
                                    :
                                    ''
                                }
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-5"></div>

                            <div className="col-lg-2 col-md-2 col-sm-2" style={{ textAlign: "center" }}>
                                <button type="submit" class="btn btn-success btn-sm" style={{ width: "100px" }}>Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ResetPassword
