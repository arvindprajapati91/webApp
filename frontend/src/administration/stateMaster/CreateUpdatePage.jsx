import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import FormName from "../../components/FormNameUpdatePage"
import Wrapper_ClickFun from "../../components/wrapperClickFun"
import ChangeHandler from "../../components/ChangeHandler"
import Loader from "../../components/Loader"
import SubmitButton from '../../components/submitButton';
import ErrorMessage from '../../components/errorMessage';
import saveSubmitFun from '../../components/saveSubmitFun';
import fieldValidation from '../../components/fieldValidation';
import getDetailsFun from '../../components/getDetailsFun';

const API_form_name = "stateMaster"
const List_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}`
const form_name = 'State Master';
const form_type = "Master"

class CreateUpdatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: "",
            obj_id: '',
            state_code: '',
            state_name: '',
            state_no: '',
            err_msg_visible: false,
            error_message: '',
            loading: true,
        };
    };

    drpHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    getDetails = async () => {
        this.setState({ loading: true });
        const queryParams = window.location.pathname;
        await getDetailsFun.call(this, queryParams, form_name)
        if (this.state.details !== "") {
            this.setState({
                obj_id: this.state.details.id,
                state_code: this.state.details.state_code,
                state_name: this.state.details.state_name,
                state_no: this.state.details.state_no,
                loading: false
            })
        }
    };

    componentDidMount() {
        this.getDetails();
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.State_type === "" || this.state.State_type === null) {
            let msg = "Please select Manager before Save"
            return fieldValidation.call(this, msg, "State_type")
        }
        else {
            var url = `${List_Path}/CreateUpdateAPI/`
            saveSubmitFun.call(this, event, url)
        }

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
                        <FormName form_name_list={form_name} form_name={form_name} form_type={form_type} list_page={List_Path}></FormName>
                        <Loader load={this.state.loading}></Loader>
                        <ErrorMessage error_message={error_message} err_msg_visible={this.state.err_msg_visible}></ErrorMessage>
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="state_code" id="state_code" required value={this.state.state_code} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">State Code</label>
                                <div className="form-helper helper_hide" id="state_code_helper">Required</div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="state_name" id="state_name" required value={this.state.state_name} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">State Name</label>
                                <div className="form-helper helper_hide" id="state_name_helper">Required</div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="state_no" id="state_no" required value={this.state.state_no} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">State No</label>
                                <div className="form-helper helper_hide" id="state_no_helper">Required</div>
                            </div>

                            <SubmitButton form_type={form_type} list_page={List_Path}></SubmitButton>
                        </div>
                    </form>
                </div>
            </div>
        )

    }
}

export default CreateUpdatePage;