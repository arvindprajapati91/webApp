/* eslint-disable react/no-direct-mutation-state */
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
import { Dropdown } from 'semantic-ui-react';

const API_form_name = "departmentMaster"
const List_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}`
const form_name = 'Department Master';
const form_type = "Master"

const StateDic = {
    details: "",
    obj_id: '',
    dep_code: '',
    dep_desc: '',
    status: '1',
    orgList: [],
    org_desc: '',
    orgSelected: '',
    err_msg_visible: false,
    error_message: '',
    loading: true,
    redirect: false,
};

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

    getDetails = async () => {
        this.setState({ loading: true });
        const queryParams = window.location.pathname;
        await getDetailsFun.call(this, queryParams, form_name)
        if (this.state.details !== "") {
            this.setState({
                obj_id: this.state.details.id,
                dep_code: this.state.details.dep_code,
                dep_desc: this.state.details.dep_desc,
                org_desc: this.state.details.org_desc,
                orgSelected : this.state.details.org_selected,
                status: this.state.details.status === true ? '1' : '0',
                loading: false
            })
        }
    };

    masterList = async () => {
        // Organisation List
        await fetch(`/${process.env.REACT_APP_NAME}/organisation/ListAPI/?order_field=org_desc&order_by=asc&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then((response) => {
            if (response.statusText === "Internal Server Error") {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                const Org_List = []
                if (data.results.length > 0) {
                    data.results.map(i =>
                        Org_List.push({ key: i.id, value: i.org_code, text: i.org_desc })
                    )
                    this.setState({
                        orgList: this.state.orgList = Org_List
                    })
                    var dv = this.state.org_desc;
                    var res = this.state.orgList.filter(
                        ({ text }) =>
                            dv === text);
                    if (res.length > 0) {
                        this.setState({ orgSelected: this.state.orgSelected = res[0].value })
                    }
                }
            });
        });
    }

    componentDidMount() {
        this.getDetails()
        this.masterList();
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        var url = `${List_Path}/CreateUpdateAPI/`
        saveSubmitFun.call(this, event, url)
    };

    orgChange = (e, value) => {
        this.setState({
            org_desc : this.state.org_desc = e.target.innerText,
            orgSelected: this.state.orgSelected = value
        });
        if (this.state.orgSelected === "") {
            const fieldName = "organisation"
            this.setState({ loading: false })
            return this.requiredElement(fieldName)
        }
    }


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
                                <input className="did-floating-input" type="text" placeholder=" " name="dep_code" id="dep_code" required value={this.state.dep_code} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Dep Code</label>
                                <div className="form-helper helper_hide" id="dep_code_helper">Required</div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="dep_desc" id="dep_desc" required value={this.state.dep_desc} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Dep Name</label>
                                <div className="form-helper helper_hide" id="dep_desc_helper">Required</div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <Dropdown className="did-floating-input"
                                    name="org_desc"
                                    id="org_desc"
                                    value={this.state.orgSelected}
                                    clearable
                                    placeholder={this.state.orgList.length > 0 ? 'Select State' : 'Loading...'}
                                    fluid
                                    search
                                    required={true}
                                    selection
                                    options={this.state.orgList}
                                    loading={this.state.orgList.length > 0 ? false : true}
                                    disabled={this.state.orgList.length > 0 ? false : true}
                                    onChange={(event, data) => { this.orgChange(event, data.value) }}
                                />
                                <label className="did-floating-label">Organization</label>
                                <div className="form-helper helper_hide" id="org_desc_helper">Required</div>
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