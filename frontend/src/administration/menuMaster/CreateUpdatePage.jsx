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
import apiError from '../../components/apiError';

const API_form_name = "menuMaster"
const List_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}`
const form_name = 'Menu Master';
const form_type = "Master"

class CreateUpdatePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            details: "",
            obj_id: '',
            is_parent: '',
            menu_desc: '',
            order_level: '',
            menu_url: '',
            parent_icon: '',
            parent_menu_list: [],
            selectValue: "",
            pm_value: '',
            status: '1',
            isToggle: false,
            isParentToggle: false,
            required: '',
            parent_menu: '',
            folder_size: '',
            err_msg_visible: false,
            error_message: '',
            loading: true,
            disable: false,
            db_parent: '',
            app_folder: '',
            redirect: false,
            isDisable: false,
            admin_only:'0',
        };
    }

    parentMenuList = async () => {
        try {
            await fetch(`${List_Path}/ParentMenuAPI/`)
                .then(async (res) => res.json())
                .then((data) => {
                    this.setState({
                        parent_menu_list: data,
                    })
                })
        } catch (e) {
            let error = e.message;
            apiError.call(this, error)

        }
    }

    drpHandleChange = async (event) => {
        ChangeHandler.call(this, event);
        if (event.target.value === "parent") {
            this.setState({
                [event.target.name]: event.target.value,
                isToggle: false,
                isParentToggle: true,
                required: '',
            });
            try {
                await fetch(`${List_Path}/menuCountAPI/?pm=parent`)
                    .then(async (res) => res.json())
                    .then((data) => {
                        this.setState({
                            order_level: data.maxCount.toFixed(1)
                        })
                    })
            } catch (e) {
                let error = e.message;
                apiError.call(this, error)
            }
        }
        else if (event.target.name === "parent_menu") {
            await fetch(`${List_Path}/menuCountAPI/?pm=child&pm=${event.target.value}`).then((response) => {
                if (response.statusText === "Internal Server Error") {
                    this.setState({
                        loading: false
                    })
                    return alert(`${process.env.REACT_APP_ERROR_MSG}`);
                }
                response.json().then((data) => {
                    this.setState({
                        order_level: data.maxCount.toFixed(1),
                        [event.target.name]: event.target.value
                    })
                })
            });
        }
        else {
            this.setState({
                [event.target.name]: event.target.value,
                isToggle: true,
                isParentToggle: false,
                required: 'required',
            });
        }
    }

    getDetails = async () => {
        this.setState({ loading: true });
        const queryParams = window.location.pathname;
        await getDetailsFun.call(this, queryParams, form_name)
        if (this.state.details !== "") {
            if (this.state.details.is_parent === true) {
                this.setState({
                    is_parent: 'parent',
                    isParentToggle: true,
                    isToggle: false,
                    isDisable: true,
                });
            }
            else {
                this.setState({
                    is_parent: 'child',
                    isParentToggle: false,
                    isToggle: true,
                    isDisable: true,
                })
            };
            this.setState({
                obj_id: this.state.details.id,
                menu_desc: this.state.details.menu_desc,
                order_level: this.state.details.order_level,
                menu_url: this.state.details.menu_url,
                parent_icon: this.state.details.parent_icon,
                parent_menu: this.state.details.parent_menu,
                loading: false,
                createUpdate: "Update",
                status: this.state.details.status === true ? '1' : '0',
                app_folder: this.state.details.app_folder,
                folder_size: this.state.details.folder_size,
                admin_only:this.state.details.admin_only === true ? '1' : '0',
            });
        }
    };

    componentDidMount() {
        this.getDetails()
        this.parentMenuList()
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
                                <select className="did-floating-select" name="is_parent" id="is_parent" required value={this.state.is_parent} onChange={this.drpHandleChange} onClick={this.drpHandleChange} disabled={this.state.isDisable}>
                                    <option value=""></option>
                                    <option value="parent" >Parent</option>
                                    <option value="child">Child</option>
                                </select>
                                <label className="did-floating-label">Parent or Child</label>
                                <div className="form-helper helper_hide" id="is_parent_helper">Required</div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content" style={{ display: this.state.isToggle ? 'block' : 'none' }}>
                                <select className="did-floating-select" name="parent_menu" id="parent_menu" required={this.state.required} value={this.state.parent_menu} onChange={this.drpHandleChange}>
                                    <option value=""></option>
                                    {this.state.parent_menu_list.map(i =>
                                        <option value={i.id}>{i.menu_desc}</option>
                                    )}
                                </select>
                                <label className="did-floating-label">Parent Menu</label>

                                {this.state.required ?
                                    <div className="form-helper helper_hide" id="parent_menu_helper">Required</div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="menu_desc" id="menu_desc" required value={this.state.menu_desc} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Menu Name</label>
                                <div className="form-helper helper_hide" id="menu_desc_helper">Required</div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content" >
                                <input className="did-floating-input" type="number" placeholder=" " name="order_level" id="order_level" step="any" required value={this.state.order_level} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Order Level</label>
                                <div className="form-helper helper_hide" id="order_level_helper">Required</div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content" style={{ display: this.state.isToggle ? 'block' : 'none' }}>
                                <input className="did-floating-input" type="text" placeholder=" " name="menu_url" id="menu_url" value={this.state.menu_url} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Menu URL</label>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <select className="did-floating-select" name="admin_only" id="admin_only" value={this.state.admin_only} onChange={this.drpHandleChange} onClick={this.drpHandleChange} onFocus={this.drpHandleChange}>
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                                <label className="did-floating-label">Admin Only</label>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <select className="did-floating-select" name="status" id="status" value={this.state.status} onChange={this.drpHandleChange} onClick={this.drpHandleChange} onFocus={this.drpHandleChange}>
                                    <option value="1">Active</option>
                                    <option value="0">InActive</option>
                                </select>
                                <label className="did-floating-label">Status</label>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content" style={{ display: this.state.isParentToggle ? 'block' : 'none' }}>
                                <input className="did-floating-input" type="text" placeholder=" " name="app_folder" id="app_folder" value={this.state.app_folder} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">App Folder</label>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="folder_size" id="folder_size" required value={this.state.folder_size} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Folder Size</label>
                                <div className="form-helper helper_hide" id="folder_size_helper">Required</div>
                            </div>

                            <div className="col-lg-9 col-md-9 col-sm-9 did-floating-label-content" style={{ display: this.state.isParentToggle ? 'block' : 'none' }}>
                                <textarea className="did-floating-input" style={{ height: "auto" }} type="text" placeholder=" " cols="60" rows="3" name="parent_icon" id="parent_icon" value={this.state.parent_icon} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Icon SVG</label>
                                <div className="form-helper helper_hide" id="parent_icon_helper">Required</div>
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