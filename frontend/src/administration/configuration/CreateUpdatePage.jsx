/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import FormName from "../../components/FormNameUpdatePage";
import Wrapper_ClickFun from "../../components/wrapperClickFun";
import ChangeHandler from "../../components/ChangeHandler";
import Loader from "../../components/Loader";
import SubmitButton from "../../components/submitButton";
import ErrorMessage from "../../components/errorMessage";
import saveSubmitFun from "../../components/saveSubmitFun";
import getDetailsFun from "../../components/getDetailsFun";

const API_form_name = "configuration";
const List_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}`;
const form_name = "Configuration";
const form_type = "Master";

const StateDic = {
    details: "",
    obj_id: "",
    configuration: "",
    value: "",
    status: "1",
    err_msg_visible: false,
    error_message: "",
    loading: true,
    redirect: false,
};

class CreateUpdatePage extends Component {
    constructor(props) {
        super(props);
        this.state = StateDic;
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    drpHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    getDetails = async () => {
        this.setState({ loading: true });
        const queryParams = window.location.pathname;
        await getDetailsFun.call(this, queryParams, form_name)
        if (this.state.details !== "") {
            this.setState({
                obj_id: this.state.details.id,
                configuration: this.state.details.configuration,
                value: this.state.details.value,
                status: this.state.details.status === true ? "1" : "0",
                loading: false,
            })
        }
    };

    componentDidMount() {
        this.getDetails();
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        var url = `${List_Path}/CreateUpdateAPI/`
        saveSubmitFun.call(this, event, url)
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
                        <ErrorMessage
                            error_message={error_message}
                            err_msg_visible={this.state.err_msg_visible}
                        ></ErrorMessage>
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="configuration" id="configuration" required value={this.state.configuration} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Configuration</label>
                                <div className="form-helper helper_hide" id="configuration_helper">
                                    Required
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="value" id="value" required value={this.state.value} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Value</label>
                                <div className="form-helper helper_hide" id="value_helper">
                                    Required
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <select className="did-floating-select" name="status" id="status" value={this.state.status} onChange={this.drpHandleChange} onClick={this.drpHandleChange} onFocus={this.drpHandleChange}>
                                    <option value="1">Active</option>
                                    <option value="0">InActive</option>
                                </select>
                                <label className="did-floating-label">Status</label>
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
