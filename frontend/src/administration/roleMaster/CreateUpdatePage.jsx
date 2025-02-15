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
import fieldValidation from '../../components/fieldValidation';
import { connect } from 'react-redux';

const API_form_name = "roleMaster"
const List_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}`
const form_name = 'Role Master';
const form_type = "Master"

const mapStatetoProps = (state) => {
    return {
        adminAccess: state.adminAccess,
        navOrgName: state.navOrgName
    };
};

class CreateUpdatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: "",
            obj_id: '',
            role_code: '',
            role_desc: '',
            parent_menu_list: [],
            menu_list: [],
            status: '1',
            err_msg_visible: false,
            error_message: '',
            loading: true,
            disable: false,
            menu_ids: '',
            menu_access: [],
            redirect: false,
            orgList: [],
            org_desc: '',
            orgSelected: '',
            disabled: false
        };
    };

    drpHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    checkBoxChange = (event) => {
        var curt_id = parseInt(event.target.id)
        if (event.target.previousSibling.checked === true) {
            var menu_id_list = this.state.menu_ids
            var id = menu_id_list.indexOf(curt_id)
            delete menu_id_list[id]
            this.setState({ menu_ids: menu_id_list });
        }
        else {
            this.setState({
                menu_ids: [...this.state.menu_ids, curt_id],
            });
        }
    }

    parentMenuList = async () => {
        let adminOnly = ""
        if (this.props.adminAccess === false) {
            adminOnly = `admin_only=false&`
        }
        else {
            adminOnly = ""
        }
        await fetch(`/${process.env.REACT_APP_NAME}/menuMaster/ParentMenuAPI/?${adminOnly}page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then((response) => {
            if (response.statusText === "Internal Server Error") {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                this.setState({
                    parent_menu_list: data,
                })
            })
        })
    }

    menuList = async () => {
        let adminOnly = ""
        if (this.props.adminAccess === false) {
            adminOnly = `admin_only=false&`
        }
        else {
            adminOnly = ""
        }
        await fetch(`/${process.env.REACT_APP_NAME}/menuMaster/ListAPI/?${adminOnly}&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then((response) => {
            if (response.statusText === "Internal Server Error") {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                this.setState({
                    menu_list: data.results,
                });
            });
        });

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

    orgChange = (e, value) => {
        this.setState({
            org_desc: this.state.org_desc = e.target.innerText,
            orgSelected: this.state.orgSelected = value
        });
        if (this.state.orgSelected === "") {
            const fieldName = "organisation"
            this.setState({ loading: false })
            return this.requiredElement(fieldName)
        }
    }

    getDetails = async () => {
        this.setState({ loading: true });
        const queryParams = window.location.pathname;
        await getDetailsFun.call(this, queryParams, form_name)
        if (this.state.details !== "") {
            this.setState({
                obj_id: this.state.details.id,
                role_code: this.state.details.role_code,
                role_desc: this.state.details.role_desc,
                menu_access: this.state.details.menu_access,
                menu_ids: this.state.details.menu_access,
                status: this.state.details.status === true ? '1' : '0',
                loading: false,
                org_desc: this.state.details.org_desc,
                orgSelected: this.state.details.org_selected,
                disabled: this.state.details.role_code === "ORGADMIN" ? true : false
            })
        }
    };

    componentDidMount() {
        this.getDetails();
        this.parentMenuList();
        this.menuList();
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.role_code !== "ORGADMIN" && (this.state.orgSelected === "" || this.state.orgSelected === null || this.state.orgSelected === undefined)) {
            let msg = "Please select Organisation before Save"
            return fieldValidation.call(this, msg, "org_desc")
        }
        else {
            var url = `${List_Path}/CreateUpdateAPI/`
            saveSubmitFun.call(this, event, url)
        }
    };

    displayMenus = (e) => {
        let target_id = e.target.getAttribute("aria-controls");
        if (e.target.classList.contains('collapsed')) {
            e.target.classList.remove("collapsed");
        }
        else {
            e.target.classList.add("collapsed");
        }
        let menu_ele = document.getElementById(target_id);

        if (menu_ele.classList.contains('collapse')) {
            menu_ele.classList.remove("collapse");
        }
        else {
            menu_ele.classList.add("collapse");
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
                                <input className="did-floating-input" type="text" placeholder=" " name="role_code" id="role_code" required value={this.state.role_code} readOnly={this.state.role_code === "ORGADMIN" ? true : false} disabled={this.state.role_code === "ORGADMIN" ? true : false} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Role Code</label>
                                <div className="form-helper helper_hide" id="role_code_helper">Required</div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="role_desc" id="role_desc" required value={this.state.role_desc} readOnly={this.state.role_code === "ORGADMIN" ? true : false} disabled={this.state.role_code === "ORGADMIN" ? true : false} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Role Name</label>
                                <div className="form-helper helper_hide" id="role_desc_helper">Required</div>
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
                                    disabled={this.state.role_code === "ORGADMIN" ? true : this.state.orgList.length > 0 ? false : true}
                                    onChange={(event, data) => { this.orgChange(event, data.value) }}
                                    readOnly={this.state.role_code === "ORGADMIN" ? true : false}
                                />
                                <label className="did-floating-label">Organization</label>
                                <div className="form-helper helper_hide" id="org_desc_helper">Required</div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <select className="did-floating-select" name="status" id="status" value={this.state.status} onChange={this.drpHandleChange}>
                                    <option value="1">Active</option>
                                    <option value="0">InActive</option>
                                </select>
                                <label className="did-floating-label">Status</label>
                            </div>
                        </div>
                        <div className="row" style={{ borderTop: "none" }}>
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a className="nav-link active" id="nav-menu-tab" data-bs-toggle="tab" href="#nav-menu" role="tab" aria-controls="nav-menu" aria-selected="true">Menus</a>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-menu" role="tabpanel" aria-labelledby="nav-menu-tab">
                                    <div className="card">
                                        <div className="card-header">
                                            Menu List
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <div className="accordion" id="menuListAccordian">
                                                    {this.state.parent_menu_list.map(i =>
                                                        <div className="accordion-item">
                                                            <h4 className="accordion-header" id={"heading" + i.id}>
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + i.id} aria-expanded="false" aria-controls={"collapse" + i.id} onClick={this.displayMenus}>
                                                                    {i.menu_desc}
                                                                </button>
                                                            </h4>
                                                            <div id={"collapse" + i.id} className="accordion-collapse collapse" aria-labelledby={"heading" + i.id} data-bs-parent="#menuListAccordian">
                                                                {this.state.menu_list.map(cm =>
                                                                    cm.parent_name === i.menu_desc ?
                                                                        <div className="accordion-body" style={{ borderBottom: "1px solid rgba(0,0,0,.125)", paddingBottom: "5px", paddingTop: "5px" }}>
                                                                            {this.state.menu_access.includes(cm.id) ?
                                                                                <>
                                                                                    {this.props.adminAccess ?
                                                                                        <>
                                                                                            <input type="checkbox" name="menu_ids" value={cm.id} id={cm.id + '' + cm.menu_desc} className={"pm_id-" + i.id} defaultChecked />
                                                                                            <label for={cm.id + '' + cm.menu_desc} id={cm.id} onClick={this.checkBoxChange}>{cm.menu_desc}</label>
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            <input type="checkbox" name="menu_ids" value={cm.id} id={cm.id + '' + cm.menu_desc} className={"pm_id-" + i.id} defaultChecked
                                                                                                disabled={(this.state.disabled) ? "disabled" : ""}
                                                                                            />
                                                                                            <label for={cm.id + '' + cm.menu_desc} id={cm.id}>{cm.menu_desc}</label>
                                                                                        </>
                                                                                    }

                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <input type="checkbox" name="menu_ids" value={cm.id} id={cm.id + '' + cm.menu_desc} className={"pm_id-" + i.id} />
                                                                                    <label for={cm.id + '' + cm.menu_desc} id={cm.id} onClick={this.checkBoxChange}>{cm.menu_desc}</label>
                                                                                </>
                                                                            }

                                                                        </div>
                                                                        :
                                                                        ''

                                                                )}

                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <SubmitButton form_type={form_type} list_page={List_Path}></SubmitButton>
                        </div>
                    </form>
                </div>
            </div>
        )

    }
}

export default connect(mapStatetoProps)(CreateUpdatePage);