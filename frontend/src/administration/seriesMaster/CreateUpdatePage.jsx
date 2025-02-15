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

const API_form_name = "seriesMaster"
const List_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}`
const form_name = 'Series Master';
const form_type = "Master"
const StateDic = {
    details: "",
    obj_id: '',
    process: '',
    status_master: '',
    org_id:'',
    type: '',
    series_no: '',
    err_msg_visible: false,
    error_message: '',
    loading: true,
    processList: [],
    statusList: [],
    orgList:[],
    redirect: false,
};;

class CreateUpdatePage extends Component {

    constructor(props) {
        super(props);
        this.state = StateDic
        // this.handleSubmit = this.handleSubmit.bind(this);
    };

    drpHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    MasterList = async () => {
        // Process Master
        await fetch(`/${process.env.REACT_APP_NAME}/processMaster/ListAPI/?page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then((response) => {
            if (response.statusText === "Internal Server Error") {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                this.setState({
                    processList: data.results,
                })
            })
        })

        // Status Master
        await fetch(`/${process.env.REACT_APP_NAME}/statusMaster/ListAPI/?page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then((response) => {
            if (response.statusText === "Internal Server Error") {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                this.setState({
                    statusList: data.results,
                })
            })
        })

        // Organisation
        await fetch(`/${process.env.REACT_APP_NAME}/organisation/ListAPI/?page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then((response) => {
            if (response.statusText === "Internal Server Error") {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                this.setState({
                    orgList: data.results,
                })
            })
        })
    }

    getDetails = async () => {
        this.setState({ loading: true });
        const queryParams = window.location.pathname;
        await getDetailsFun.call(this, queryParams, form_name)
        if (this.state.details !== "") {
            this.setState({
                obj_id: this.state.details.id,
                process: this.state.details.process,
                status_master: this.state.details.status,
                type: this.state.details.type,
                series_no: this.state.details.series_no,
                org_id: this.state.details.organisation,
                loading: false
            })
        }
    };


    componentDidMount() {
        this.getDetails()
        this.MasterList()
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
                                <select className="did-floating-select" name="process" id="process" value={this.state.process} required onChange={this.drpHandleChange} onClick={this.drpHandleChange} onFocus={this.drpHandleChange}>
                                    <option value="">---Select---</option>
                                    {this.state.processList.length > 0 ?
                                        this.state.processList.map(i =>
                                            <option value={i.process_desc}>{i.process_desc}</option>
                                        )
                                        : ''
                                    }
                                </select>
                                <label className="did-floating-label">Process Master</label>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <select className="did-floating-select" name="org_id" id="org_id" value={this.state.org_id} onChange={this.drpHandleChange} onClick={this.drpHandleChange} onFocus={this.drpHandleChange}>
                                    <option value="">---Select---</option>
                                    {this.state.orgList.length > 0 ?
                                        this.state.orgList.map(i =>
                                            <option value={i.id}>{i.org_desc}</option>
                                        )
                                        : ''
                                    }
                                </select>
                                <label className="did-floating-label">Organisation</label>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <select className="did-floating-select" name="status_master" id="status_master" value={this.state.status_master} onChange={this.drpHandleChange} onClick={this.drpHandleChange} onFocus={this.drpHandleChange}>
                                    <option value="">---Select---</option>
                                    {this.state.statusList.length > 0 ?
                                        this.state.statusList.map(i =>
                                            <option value={i.status_desc}>{i.status_desc}</option>
                                        )
                                        : ''
                                    }
                                </select>
                                <label className="did-floating-label">Status Master</label>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="series_no" id="series_no" required value={this.state.series_no} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Series No</label>
                                <div className="form-helper helper_hide" id="series_no_helper">Required</div>
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