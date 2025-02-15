import React, { Component } from 'react';
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import FormName from "../../components/FormNameUpdatePage"
import Wrapper_ClickFun from "../../components/wrapperClickFun"
import ChangeHandler from "../../components/ChangeHandler"
import Loader from "../../components/Loader"
import SubmitButton from '../../components/submitButton';
import { Dropdown } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../../components/errorMessage';
import fieldValidation from '../../components/fieldValidation';
import saveSubmitFun from '../../components/saveSubmitFun';
import getDetailsFun from '../../components/getDetailsFun';

const API_form_name = "userMaster"
const List_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}`
const form_name = 'User Master';
const form_type = "Master"

const mapStatetoProps = (state) => {
    return {
        navTab_List: state.navTab_List,
        adminAccess: state.adminAccess,
        navOrgName: state.navOrgName
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (t, event) => dispatch({ type: t, payload: event })
    }
}

class CreateUpdatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: "",
            obj_id: '',
            username: '',
            email: '',
            full_name: '',
            status: '1',
            employee_code: '',
            rpt_manager: '',
            managerList: [],
            manager: "",
            managerSelected: "",
            is_lock: '0',
            role_list: [],
            role_ids: '',
            role_access_list: [],
            err_msg_visible: false,
            error_message: '',
            loading: true,
            random_password: '',
            org_list: [],
            orgSelected: '',
            org_ids: '',
            org_access_list: [],
            bl_list: [],
            blSelected: '',
            bl_ids: '',
            bl_access_list: [],
            dep_list: [],
            depSelected: '',
            dep_ids: '',
            dep_access_list: [],
            loc_list: [],
            locSelected: '',
            loc_ids: '',
            loc_access_list: [],
            navTab_List: [],
            slug_id: '',
            adminAccess: '',
            navOrgName: '',
        };

    };

    drpHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    dropDownChange = (e, type, value) => {
        this.setState({
            [type]: this.state[type] = value
        });
    }

    checkBoxChange = (event) => {
        if (event.target.checked === false) {
            var id_list = this.state[event.target.name]
            var id = parseInt(event.target.value, 10)
            var filteredArray = id_list.filter(function (e) { return e !== id })

            console.log(filteredArray)
            this.setState({ [event.target.name]: filteredArray });
        }
        if (event.target.checked === true) {
            this.setState({
                [event.target.name]: [...this.state[event.target.name], event.target.value],
            });
        }
    }

    async masterLists() {
        let orgFilter = ""
        this.setState({
            adminAccess: this.state.adminAccess = this.props.adminAccess,
            navOrgName: this.state.navOrgName = this.props.navOrgName
        })
        if (this.state.adminAccess === false) {
            orgFilter = `org=${this.state.navOrgName}&`
        }
        else {
            orgFilter = ""
        }

        await Promise.all([
            // Manager List & for Nav Tabs
            await fetch(`/${process.env.REACT_APP_NAME}/userMaster/ListAPI/?${orgFilter}drpList=Y&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then(data => data.json().then((data) => {
                if (data.results.length > 0) {
                    data.results.map(i =>
                        this.setState(prevState => ({
                            managerList: [...prevState.managerList, { key: i.username, value: i.full_name, text: i.full_name }]
                        }))
                    )
                    setTimeout(() => {
                        console.log('Wait');
                    }, 4000);
                }
            })),
            // Role List
            await fetch(`/${process.env.REACT_APP_NAME}/roleMaster/ListAPI/?${orgFilter}drpList=Y&order_field=role_code&order_by=asc&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then(data => data.json().then((data) => {
                if (data.results.length > 0) {
                    const RoleList = []
                    data.results.map(i =>
                        RoleList.push({ key: i.role_code, value: i.role_desc, id: i.id })
                    )
                    this.setState(prevState => ({
                        role_list: this.state.role_list = RoleList,
                    }))
                    setTimeout(() => {
                        console.log('Wait');
                    }, 4000);
                    this.props.onChange("navTab", { order: 1, tab_name: "Role Access", id: "role_list", list_name: 'Role List', type: "active", data_list: this.state.role_list, access_list: this.state.role_access_list, tab_type: "role" })
                }
            })),

            // Organisation List
            await fetch(`/${process.env.REACT_APP_NAME}/organisation/ListAPI/?drpList=Y&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then(data => data.json().then((data) => {
                if (data.results.length > 0) {
                    const OrgList = []
                    data.results.map(i =>
                        OrgList.push({ key: i.org_code, value: i.org_desc, id: i.id, text: i.org_desc })
                    )
                    this.setState(prevState => ({
                        org_list: this.state.org_list = OrgList,
                    }))
                    this.props.onChange("navTab", { order: 2, tab_name: "Organisation Access", id: "org_list", list_name: 'Organisation List', type: "", data_list: this.state.org_list, access_list: this.state.org_ids, tab_type: "org" })
                    setTimeout(() => {
                        console.log('Wait');
                    }, 4000);
                }
            })),

            // BL List
            await fetch(`/${process.env.REACT_APP_NAME}/businessLine/ListAPI/?${orgFilter}drpList=Y&order_field=bl_code&order_by=asc&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then(data => data.json().then((data) => {
                if (data.results.length > 0) {
                    const Bl_List = []
                    data.results.map(i =>
                        Bl_List.push({ key: i.bl_code, value: i.bl_desc, id: i.id, text: i.bl_desc })
                    )
                    this.setState(prevState => ({
                        bl_list: this.state.bl_list = Bl_List,
                    }))
                    this.props.onChange("navTab", { order: 3, tab_name: "Business Line Access", id: "bl_list", list_name: 'Business Line List', type: "", data_list: this.state.bl_list, access_list: this.state.bl_ids, tab_type: "bl" })
                    setTimeout(() => {
                        console.log('Wait');
                    }, 4000);
                }
            })),

            // Dep List
            await fetch(`/${process.env.REACT_APP_NAME}/departmentMaster/ListAPI/?${orgFilter}drpList=Y&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then(data => data.json().then((data) => {
                if (data.results.length > 0) {
                    const Dep_List = []
                    data.results.map(i =>
                        Dep_List.push({ key: i.dep_code, value: i.dep_desc, id: i.id, text: i.dep_desc })
                    )
                    this.setState(prevState => ({
                        dep_list: this.state.dep_list = Dep_List,
                    }))
                    this.props.onChange("navTab", { order: 4, tab_name: "Department Access", id: "dep_list", list_name: 'Department List', type: "", data_list: this.state.dep_list, access_list: this.state.dep_ids, tab_type: "dep" })
                    setTimeout(() => {
                        console.log('Wait');
                    }, 4000);
                }
            })),

            // Loc List
            await fetch(`/${process.env.REACT_APP_NAME}/locationMaster/ListAPI/?${orgFilter}drpList=Y&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then(data => data.json().then((data) => {
                if (data.results.length > 0) {
                    const Loc_List = []
                    data.results.map(i =>
                        Loc_List.push({ key: i.loc_code, value: i.loc_desc, id: i.id, text: i.loc_desc })
                    )
                    this.setState(prevState => ({
                        loc_list: this.state.loc_list = Loc_List,
                    }))
                    this.props.onChange("navTab", { order: 5, tab_name: "Location Access", id: "loc_list", list_name: 'Location List', type: "", data_list: this.state.loc_list, access_list: this.state.loc_ids, tab_type: "loc" })
                    this.setState({
                        loading: false
                    })
                    setTimeout(() => {
                        console.log('Wait');
                    }, 4000);
                }
            })),
        ])
    }

    randomPassword = () => {
        fetch(`${List_Path}/pwdgn`).then((response) => {
            if (response.statusText === "Internal Server Error") {
                alert("Something went wrong, please contact to administrator!")
            }
            response.json().then((data) => {
                this.setState({
                    random_password: data.password,
                    loading: false
                })
            })
        })
        this.setState({ loading: false })
    }

    async componentDidMount() {
        this.getDetails()
        this.setState({ loading: false })
    }

    async componentWillUnmount() {
        this.props.onChange("navTabUpdate", {})
    }

    getDetails = async () => {
        if (this.props.navOrgName === "" && this.props.adminAccess === false) {
            return alert("Please change organisation to view details")
        }
        this.setState({ loading: true });
        const queryParams = window.location.pathname;
        await getDetailsFun.call(this, queryParams, form_name)
        if (this.state.details !== "") {
            this.setState({
                obj_id: this.state.details.id,
                slug_id: this.state.details.slug,
                username: this.state.details.username,
                full_name: this.state.details.full_name,
                email: this.state.details.email,
                employee_code: this.state.details.employee_code,
                managerSelected: this.state.details.reporting_manager,
                role_access_list: this.state.role_access_list = this.state.details.role_access,
                role_ids: this.state.details.role_access,
                status: this.state.details.status === true ? '1' : '0',
                is_lock: this.state.details.is_lock === true ? '1' : '0',
                orgSelected: this.state.details.organisation === null ? '' : this.state.details.organisation.org_desc,
                org_access_list: this.state.org_access_list = this.state.details.org_access,
                org_ids: this.state.details.org_access,
                blSelected: this.state.details.business_line === null ? '' : this.state.details.business_line.bl_desc,
                bl_access_list: this.state.details.bl_access,
                bl_ids: this.state.details.bl_access,
                locSelected: this.state.details.location === null ? '' : this.state.details.location.loc_desc,
                loc_access_list: this.state.loc_access_list = this.state.details.loc_access,
                loc_ids: this.state.details.loc_access,
                depSelected: this.state.details.department === null ? '' : this.state.details.department.dep_desc,
                dep_access_list: this.state.dep_access_list = this.state.details.dep_access,
                dep_ids: this.state.details.dep_access,
            });
            this.setState(state => ({
                bl_ids: this.state.details.business_line === null ? '' : state.bl_ids.concat([this.state.details.business_line.id]),
                org_ids: this.state.details.organisation === null ? '' : state.org_ids.concat([this.state.details.organisation.id]),
                loc_ids: this.state.details.location === null ? '' : state.loc_ids.concat([this.state.details.location.id]),
                dep_ids: this.state.details.department === null ? '' : state.dep_ids.concat([this.state.details.department.id]),
            }));

        }
        this.masterLists();


    };

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.managerSelected === "" || this.state.managerSelected === null) {
            let msg = "Please select Manager before Save"
            return fieldValidation.call(this, msg, "rpt_manager")
        }
        else if (this.state.orgSelected === "" || this.state.orgSelected === null) {
            let msg = "Please select Organisation before Save"
            return fieldValidation.call(this, msg, "organisation")
        }
        else if (this.state.blSelected === "" || this.state.blSelected === null) {
            let msg = "Please select Business Line before Save"
            return fieldValidation.call(this, msg, "business_line")
        }
        else if (this.state.depSelected === "" || this.state.depSelected === null) {
            let msg = "Please select Department before Save"
            return fieldValidation.call(this, msg, "department")
        }
        else if (this.state.locSelected === "" || this.state.locSelected === null) {
            let msg = "Please select Location before Save"
            return fieldValidation.call(this, msg, "location")
        }
        else {
            var url = `${List_Path}/CreateUpdateAPI/`
            saveSubmitFun.call(this, event, url)
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
                        <FormName form_name_list={form_name} form_name={form_name} form_type={form_type} list_page={List_Path} slug_id={this.state.slug_id} trailFor={this.state.full_name}></FormName>
                        <Loader load={this.state.loading}></Loader>
                        <ErrorMessage error_message={error_message} err_msg_visible={this.state.err_msg_visible}></ErrorMessage>
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="username" id="username" required value={this.state.username} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">User Name</label>
                                <div className="form-helper helper_hide" id="username_helper">Required</div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="full_name" id="full_name" required value={this.state.full_name} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Full Name</label>
                                <div className="form-helper helper_hide" id="full_name_helper">Required</div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="email" placeholder=" " name="email" id="email" required value={this.state.email} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Email</label>
                                <div className="form-helper helper_hide" id="email_helper">Required</div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="employee_code" id="employee_code" required value={this.state.employee_code} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Employee Code</label>
                                <div className="form-helper helper_hide" id="employee_code_helper">Required</div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                {/* <input className="did-floating-input" type="text" placeholder=" " name="rpt_manager" id="rpt_manager" required value={this.state.rpt_manager} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)}  /> */}
                                <Dropdown className="did-floating-input"
                                    name="rpt_manager"
                                    id="rpt_manager"
                                    value={this.state.managerSelected}
                                    clearable
                                    placeholder={this.state.managerList.length > 0 ? 'Select Manager' : 'Loading...'}
                                    fluid
                                    search
                                    required={true}
                                    selection
                                    options={this.state.managerList}
                                    loading={this.state.managerList.length > 0 ? false : true}
                                    disabled={this.state.managerList.length > 0 ? false : true}
                                    onChange={(event, data) => { this.dropDownChange(event, "managerSelected", data.value) }}
                                />
                                <label className="did-floating-label">Reporting Manager</label>
                                <div className="form-helper helper_hide" id="rpt_manager_helper">Required</div>
                            </div>


                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <select className="did-floating-select" name="is_lock" id="is_lock" value={this.state.is_lock} onChange={this.drpHandleChange}>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                                <FontAwesomeIcon icon={faCaretDown} className="sync_icon" />
                                <label className="did-floating-label">Is_Lock</label>

                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input type="text" name="random_password" id="random_password" className="did-floating-input" autocomplete="off" placeholder="Password" value={this.state.random_password} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} required={this.state.obj_id === "" ? 'required' : ''} />
                                <FontAwesomeIcon icon={faArrowsRotate} className="sync_icon" onClick={this.randomPassword} data-tip data-for="password_tip" />
                                {/* <FontAwesomeIcon icon={faSyncAlt} onClick={this.randomPassword} data-tip data-for="random_passwordtip"></FontAwesomeIcon> */}
                                <label className="did-floating-label">Set Password</label>
                                {this.state.obj_id === "" ?
                                    <div className="form-helper helper_hide" id="random_password_helper">Required</div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <select className="did-floating-select" name="status" id="status" value={this.state.status} onChange={this.drpHandleChange}>
                                    <option value="1">Active</option>
                                    <option value="0">InActive</option>
                                </select>
                                <label className="did-floating-label">Status</label>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                {/* <input className="did-floating-input" type="text" placeholder=" " name="rpt_manager" id="rpt_manager" required value={this.state.rpt_manager} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)}  /> */}
                                <Dropdown className="did-floating-input"
                                    name="organisation"
                                    id="organisation"
                                    value={this.state.orgSelected}
                                    clearable
                                    placeholder={this.state.org_list.length > 0 ? 'Select Organisation' : 'Loading...'}
                                    fluid
                                    search
                                    required={true}
                                    selection
                                    options={this.state.org_list}
                                    loading={this.state.org_list.length > 0 ? false : true}
                                    disabled={this.state.org_list.length > 0 ? false : true}
                                    onChange={(event, data) => { this.dropDownChange(event, "orgSelected", data.value) }}
                                />
                                <label className="did-floating-label">Organisation</label>
                                <div className="form-helper helper_hide" id="organisation_helper">Required</div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                {/* <input className="did-floating-input" type="text" placeholder=" " name="rpt_manager" id="rpt_manager" required value={this.state.rpt_manager} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)}  /> */}
                                <Dropdown className="did-floating-input"
                                    name="business_line"
                                    id="business_line"
                                    value={this.state.blSelected}
                                    clearable
                                    placeholder={this.state.bl_list.length > 0 ? 'Select Business Line' : 'Loading...'}
                                    fluid
                                    search
                                    required={true}
                                    selection
                                    options={this.state.bl_list}
                                    loading={this.state.bl_list.length > 0 ? false : true}
                                    disabled={this.state.bl_list.length > 0 ? false : true}
                                    onChange={(event, data) => { this.dropDownChange(event, "blSelected", data.value) }}
                                />
                                <label className="did-floating-label">Business Line</label>
                                <div className="form-helper helper_hide" id="business_line_helper">Required</div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                {/* <input className="did-floating-input" type="text" placeholder=" " name="rpt_manager" id="rpt_manager" required value={this.state.rpt_manager} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)}  /> */}
                                <Dropdown className="did-floating-input"
                                    name="department"
                                    id="department"
                                    value={this.state.depSelected}
                                    clearable
                                    placeholder={this.state.dep_list.length > 0 ? 'Select Business Line' : 'Loading...'}
                                    fluid
                                    search
                                    required={true}
                                    selection
                                    options={this.state.dep_list}
                                    loading={this.state.dep_list.length > 0 ? false : true}
                                    disabled={this.state.dep_list.length > 0 ? false : true}
                                    onChange={(event, data) => { this.dropDownChange(event, "depSelected", data.value) }}
                                />
                                <label className="did-floating-label">Department</label>
                                <div className="form-helper helper_hide" id="department_helper">Required</div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                {/* <input className="did-floating-input" type="text" placeholder=" " name="rpt_manager" id="rpt_manager" required value={this.state.rpt_manager} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)}  /> */}
                                <Dropdown className="did-floating-input"
                                    name="location"
                                    id="location"
                                    value={this.state.locSelected}
                                    clearable
                                    placeholder={this.state.loc_list.length > 0 ? 'Select Business Line' : 'Loading...'}
                                    fluid
                                    search
                                    required={true}
                                    selection
                                    options={this.state.loc_list}
                                    loading={this.state.loc_list.length > 0 ? false : true}
                                    disabled={this.state.loc_list.length > 0 ? false : true}
                                    onChange={(event, data) => { this.dropDownChange(event, "locSelected", data.value) }}
                                />
                                <label className="did-floating-label">Location</label>
                                <div className="form-helper helper_hide" id="location_helper">Required</div>
                            </div>

                        </div>
                        <div className="row" style={{ borderTop: "none" }}>
                            <Tabs defaultActiveKey="Role Access" id="uncontrolled-tab-example" className="mb-3">
                                {this.props.navTab_List.length > 0 ?
                                    this.props.navTab_List.map(i =>
                                        <Tab eventKey={i.tab_name} title={i.tab_name}>
                                            <div className="card" style={{ width: "30rem" }}>
                                                <div className="card-header">
                                                    {i.list_name}
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    {this.props.navTab_List.map(k =>
                                                        i.list_name === k.list_name ?
                                                            k.data_list.map(rl =>
                                                                <li className="list-group-item">
                                                                    <input type="checkbox" name={`${k.tab_type}_ids`} id={rl.key + '_' + rl.id} value={rl.id} className={`${k.tab_type}"_"${rl.id}`} onChange={this.checkBoxChange}
                                                                        defaultChecked={k.access_list.includes(rl.id) ? true : false}
                                                                        disabled={this.state.role_code === "ORGADMIN" ? true : false}

                                                                    />
                                                                    <label for={rl.key + '_' + rl.id}>{rl.key + ' - ' + rl.value}</label>
                                                                </li>
                                                            )
                                                            :
                                                            ''
                                                    )}
                                                </ul>
                                            </div>
                                        </Tab>)
                                    :
                                    ""
                                }
                            </Tabs>
                            <SubmitButton form_type={form_type} list_page={List_Path}></SubmitButton>
                        </div>
                    </form>
                </div>
            </div>
        )

    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CreateUpdatePage);
