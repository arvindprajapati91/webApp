import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import FormName from "../../components/FormNameUpdatePage"
import Wrapper_ClickFun from "../../components/wrapperClickFun"
import ChangeHandler from "../../components/ChangeHandler"
import Loader from "../../components/Loader"
import SubmitButton from '../../components/submitButton';
import ErrorMessage from '../../components/errorMessage';
import saveSubmitFun from '../../components/saveSubmitFun';
import getDetailsFun from '../../components/getDetailsFun';

const API_form_name = "testMaster"
const List_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}`
const form_name = 'Test Master';
const form_type = "Master"

class CreateUpdatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: "",
            obj_id: '',
            test_name: '',
            test_method: '',
            department: '',
            status: "1",
            err_msg_visible: false,
            error_message: "",
            loading: true,
            redirect: false,
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
                test_name: this.state.details.test_name,
                test_method: this.state.details.test_method,
                department: this.state.details.department,
                status: this.state.details.status === true ? "1" : "0",
                loading: false
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
                        <ErrorMessage error_message={error_message} err_msg_visible={this.state.err_msg_visible}></ErrorMessage>
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="test_name" id="test_name" required value={this.state.test_name} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Test Name</label>
                                <div className="form-helper helper_hide" id="test_name_helper">Required</div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="test_method" id="test_method" required value={this.state.test_method} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Test Method</label>
                                <div className="form-helper helper_hide" id="test_method_helper">Required</div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="department" id="department" required value={this.state.department} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Department</label>
                                <div className="form-helper helper_hide" id="department_helper">Required</div>
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
        )

    }
}

export default CreateUpdatePage;