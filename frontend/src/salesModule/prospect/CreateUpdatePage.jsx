/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import FormName from "../../components/FormNameUpdatePage";
import Wrapper_ClickFun from "../../components/wrapperClickFun";
import ChangeHandler from "../../components/ChangeHandler";
import Loader from "../../components/Loader";
import SubmitButton from "../../components/submitButton";
import ErrorMessage from "../../components/errorMessage";
import SaveSubmitFun from "../../components/saveSubmitFun"
import getDetailsFunction from "./functions/getDetailsFun";

const API_form_name = "prospect";
const List_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}`;
const form_name = "Prospect";
const form_type = "Transaction";

const StateDic = {
    details: "",
    obj_id: "",
    prospect_number: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company_name: "",
    type: "",
    position: "",
    contact_method: "",
    interested_in: "",
    err_msg_visible: false,
    error_message: "",
    loading: true,
    redirect: false,
    company_name_visible: false,
};

class CreateUpdatePage extends Component {
    constructor(props) {
        super(props);
        this.state = StateDic;
    }

    drpHandleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, });
    };

    typeHandleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, });
        if (e.target.name === "type" && e.target.value === "Organisation") {
            this.setState({
                company_name_visible: true
            })
        }
        else {
            this.setState({
                company_name_visible: false
            })
        }
    };

    getDetails = async () => {
        getDetailsFunction.call(this, form_name)
    };

    componentDidMount() {
        this.getDetails();
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        var url = `${List_Path}/CreateUpdateAPI/`
        SaveSubmitFun.call(this, event, url)
    };

    render() {
        const { error_message, redirect } = this.state;

        if (redirect) {
            return <Navigate to={List_Path} />;
        }

        return (
            <div className="wrapper">
                <div className="content-wrapper" onClick={Wrapper_ClickFun.bind(this)}>
                    <form id="app-form" onSubmit={this.handleSubmit} autoComplete="off">
                        <FormName form_name_list={form_name} form_name={form_name} form_type={form_type} list_page={List_Path} auditTrailView={"Yes"} recordNo={this.state.prospect_number} tableName={API_form_name}></FormName>
                        <Loader load={this.state.loading}></Loader>
                        <ErrorMessage error_message={error_message} err_msg_visible={this.state.err_msg_visible}></ErrorMessage>
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="prospect_number" id="prospect_number" value={this.state.prospect_number} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} readOnly={true} disabled={true} />
                                <label className="did-floating-label">Prospect Number</label>
                                <div className="form-helper helper_hide" id="prospect_number_helper">
                                    Required
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="first_name" id="last_name" required value={this.state.first_name} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">First Name</label>
                                <div className="form-helper helper_hide" id="first_name_helper">
                                    Required
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="last_name" id="last_name" required value={this.state.last_name} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Last Name</label>
                                <div className="form-helper helper_hide" id="last_name_helper">
                                    Required
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="email" placeholder=" " name="email" id="email" required value={this.state.email} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Email</label>
                                <div className="form-helper helper_hide" id="email_helper">
                                    Required
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="phone" id="phone" required value={this.state.phone} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Phone</label>
                                <div className="form-helper helper_hide" id="phone_helper">
                                    Required
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <select className="did-floating-select" name="type" id="type" value={this.state.type} required onChange={this.typeHandleChange}>
                                    <option value=""></option>
                                    <option value="Individual">Individual</option>
                                    <option value="Organisation">Organisation</option>
                                </select>
                                <label className="did-floating-label">Type</label>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content" style={{ display: this.state.company_name_visible ? "block" : "none" }}>
                                <input className="did-floating-input" type="text" placeholder=" " name="company_name" id="company_name" required={this.state.company_name_visible} value={this.state.company_name} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Company Name</label>
                                <div className="form-helper helper_hide" id="company_name_helper">
                                    Required
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content" style={{ display: this.state.company_name_visible ? "block" : "none" }}>
                                <input className="did-floating-input" type="text" placeholder=" " name="position" id="position" required={this.state.position_visible} value={this.state.position} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Position / Desigtation</label>
                                <div className="form-helper helper_hide" id="position_helper">
                                    Required
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <select className="did-floating-select" name="channel_mode" id="channel_mode" value={this.state.channel_mode} required onChange={this.drpHandleChange} onClick={this.drpHandleChange} onFocus={this.drpHandleChange}>
                                    <option value=""></option>
                                    <option value="Email">Email</option>
                                    <option value="WhatsApp">WhatsApp</option>
                                    <option value="SMS">SMS</option>
                                    <option value="Call">Call</option>
                                </select>
                                <label className="did-floating-label">Channel Mode</label>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <select className="did-floating-select" name="mode_of_communication" id="mode_of_communication" value={this.state.mode_of_communication} required onChange={this.drpHandleChange} onClick={this.drpHandleChange} onFocus={this.drpHandleChange}>
                                    <option value=""></option>
                                    <option value="Email">Email</option>
                                    <option value="WhatsApp">WhatsApp</option>
                                    <option value="SMS">SMS</option>
                                    <option value="Call">Call</option>
                                </select>
                                <label className="did-floating-label">Mode of Communication</label>
                            </div>

                            <div className="col-lg-7 col-md-7 col-sm-7 did-floating-label-content">
                                <textarea className="did-floating-input" type="text" placeholder=" " cols="60" rows="7" name="interested_in" id="interested_in" required value={this.state.interested_in} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Interested In</label>
                                <div className="form-helper helper_hide" id="interested_in_helper">Required</div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content" style={{ display: this.state.obj_id !== "" ? "block" : "none" }}>
                                <input className="did-floating-input" type="text" placeholder=" " name="status" id="status" value={this.state.status} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} readOnly={true} disabled={true} />
                                <label className="did-floating-label">Status</label>
                                <div className="form-helper helper_hide" id="status_helper">
                                    Required
                                </div>
                            </div>
                            <SubmitButton form_type={form_type} list_page={List_Path}></SubmitButton>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateUpdatePage;
