import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import { Dropdown } from 'semantic-ui-react'
import FormName from "../../components/FormNameUpdatePage"
import ChangeHandler from "../../components/ChangeHandler"
import Loader from "../../components/Loader"
import SubmitButton from '../../components/submitButton';
import ErrorMessage from '../../components/errorMessage';
import Wrapper_clickFun from '../../components/wrapperClickFun';
import saveSubmitFun from '../../components/saveSubmitFun';
import getDetailsFun from '../../components/getDetailsFun';
import apiError from '../../components/apiError';

const API_form_name = "locationMaster"
const List_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}`
const form_name = 'Location Master';
const form_type = "Master"

const StateDic = {
    details: "",
    obj_id: '',
    loc_code: '',
    loc_desc: '',
    orgList: [],
    org_desc: '',
    orgSelected: '',
    status: '1',
    err_msg_visible: false,
    error_message: '',
    loading: true,
    redirect: false,
    countryList: [],
    country_name: '',
    countrySelected: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zip_code: '',
    phone: '',
    fax: '',
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

    countryChange = (e, value) => {
        this.setState({
            country_name: this.state.country_name = e.target.innerText,
            countrySelected: this.state.countrySelected = value
        });
        if (this.state.countrySelected === "") {
            const fieldName = "country"
            this.setState({
                loading: false
            })
            return this.requiredElement(fieldName)
        }
    }

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

        // Country List
        const URL = `/${process.env.REACT_APP_NAME}/countryMaster/ListAPI/?order_field=country_name&order_by=asc&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`
        const CountryList = []
        try {
            await fetch(URL)
                .then(async (res) => res.json())
                .then((data) => {
                    if (data.results.length > 0) {
                        data.results.map(i =>

                            i.status === true ?
                                CountryList.push({ key: i.flag, value: i.flag, flag: i.flag, text: i.country_name })
                                :
                                ''
                        )
                        this.setState({
                            countryList: this.state.countryList = CountryList,
                        })
                        var dv = this.state.country_name;
                        var res = this.state.countryList.filter(
                            ({ text }) =>
                                dv === text);
                        if (res.length > 0) {
                            this.setState({ countrySelected: this.state.countrySelected = res[0].value })
                        }
                    }
                })
        } catch (e) {
            let error = e.message;
            apiError.call(this, error)

        }
    }

    getDetails = async () => {
        this.setState({ loading: true });
        const queryParams = window.location.pathname;
        await getDetailsFun.call(this, queryParams, form_name)
        if (this.state.details !== "") {
            this.setState({
                obj_id: this.state.details.id,
                loc_code: this.state.details.loc_code,
                loc_desc: this.state.details.loc_desc,
                status: this.state.details.status === true ? '1' : '0',
                country_name: this.state.details.country,
                address_1: this.state.details.address_1,
                address_2: this.state.details.address_2,
                city: this.state.details.city,
                state: this.state.details.state,
                zip_code: this.state.details.zip_code,
                phone: this.state.details.phone,
                fax: this.state.details.fax,
                countrySelected: this.state.countrySelected = this.state.details.country,
                org_desc: this.state.details.org_desc,
                orgSelected : this.state.details.org_selected,
                loading: false,
            })
        }
    };

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
                <div className="content-wrapper" onClick={Wrapper_clickFun.bind(this)}>
                    <form id="app-form" onSubmit={this.handleSubmit} autoComplete="off">
                        <FormName form_name_list={form_name} form_name={form_name} form_type={form_type} list_page={List_Path}></FormName>
                        <Loader load={this.state.loading}></Loader>
                        <ErrorMessage error_message={error_message} err_msg_visible={this.state.err_msg_visible}></ErrorMessage>
                        <div className="row gx-3 gy-2 align-items-cente">
                            <div className="col-lg-2 col-md-2 col-sm-2 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="loc_code" id="loc_code" required value={this.state.loc_code} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Code</label>
                                <div className="form-helper helper_hide" id="loc_code_helper">Required</div>
                            </div>

                            <div className="col-lg-2 col-md-2 col-sm-2  did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="loc_desc" id="loc_desc" required value={this.state.loc_desc} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Location Name</label>
                                <div className="form-helper helper_hide" id="loc_desc_helper">Required</div>
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
                                <Dropdown className="did-floating-input"
                                    name="country_name"
                                    value={this.state.countrySelected}
                                    clearable
                                    placeholder={this.state.countryList.length > 0 ? 'Select Country' : 'Loading...'}
                                    fluid
                                    search
                                    required={true}
                                    selection
                                    options={this.state.countryList}
                                    loading={this.state.countryList.length > 0 ? false : true}
                                    disabled={this.state.countryList.length > 0 ? false : true}
                                    onChange={(event, data) => { this.countryChange(event, data.value) }}
                                />
                                <label className="did-floating-label">Country</label>
                                <div className="form-helper helper_hide" id="country_name_helper">Required</div>
                            </div>

                            <div className="col-lg-2 col-md-2 col-sm-2 did-floating-label-content">
                                <select className="did-floating-select" name="status" id="status" value={this.state.status} onChange={this.drpHandleChange} onClick={this.drpHandleChange} onFocus={this.drpHandleChange}>
                                    <option value="1">Active</option>
                                    <option value="0">InActive</option>
                                </select>
                                <label className="did-floating-label">Status</label>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-6 did-floating-label-content">
                                <textarea className="did-floating-input" type="text" placeholder=" " cols="60" rows="2" name="address_1" id="address_1" required value={this.state.address_1} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Address 1</label>
                                <div className="form-helper helper_hide" id="address_1_helper">Required</div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-6 did-floating-label-content">
                                <textarea className="did-floating-input" type="text" placeholder=" " cols="60" rows="2" name="address_2" id="address_2" value={this.state.address_2} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Address 2</label>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="city" id="city" value={this.state.city} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">City</label>
                                <div className="form-helper helper_hide" id="city_helper">Required</div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="state" id="state" required value={this.state.state} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">State</label>
                                <div className="form-helper helper_hide" id="state_helper">Required</div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="zip_code" id="zip_code" required value={this.state.zip_code} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Zip Code</label>
                                <div className="form-helper helper_hide" id="zip_code_helper">Required</div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="phone" id="phone" value={this.state.phone} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Phone</label>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="fax" id="fax" value={this.state.fax} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Fax</label>
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