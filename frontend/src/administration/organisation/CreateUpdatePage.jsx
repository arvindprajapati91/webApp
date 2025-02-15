import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import { Dropdown } from 'semantic-ui-react'
import FormName from "../../components/FormNameUpdatePage"
import Wrapper_clickFun from '../../components/wrapperClickFun';
import ChangeHandler from "../../components/ChangeHandler"
import Loader from "../../components/Loader"
import SubmitButton from '../../components/submitButton';
import PostHeader from '../../components/postHeader'
import ErrorMessage from '../../components/errorMessage';
import AddIcon from "../../images/add_icon.png"
import EditIcon from "../../images/edit_icon.png"
import Modal from 'react-bootstrap/Modal';
import SuccessMessage from '../../components/successMessage';
import saveSubmitFun from '../../components/saveSubmitFun';
import fieldValidation from '../../components/fieldValidation';
import getDetailsFun from '../../components/getDetailsFun';


const API_form_name = "organisation"
const List_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}`
const form_name = 'Organisation';
const form_type = "Master"

class CreateUpdatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: "",
            obj_id: '',
            org_code: '',
            org_desc: '',
            short_name: '',
            status: '1',
            err_msg_visible: false,
            error_message: '',
            success_message: false,
            loading: true,
            countryList: [],
            country_name: '',
            countrySelected: '',
            address_1: '',
            address_2: '',
            city: '',
            stateMasterList: [],
            state_name: '',
            stateMasterSelected: '',
            zip_code: '',
            phone: '',
            fax: '',
            processList: [],
            roleList: [],
            process_desc: '',
            obj_id_al: '',
            role_desc: "",
            approval_limit: '',
            approval_order: '',
            modalOpen: '#staticBackdrop',
            modalTitle: '',
            ladderList: [],
            ladderID: '',
            mandatoryColor: false,
            show: false,
        }
        // this.handleSubmit = this.handleSubmit.bind(this);
    };
    drpHandleChange = (e) => {
        document.getElementById(e.target.id).style.border = "1px solid grey"
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    addImageClick = (e) => {
        if (this.state.process_desc === "") {
            this.setState({
                modalTitle: "Error",
                modalOpen: "#staticBackdrop",
                show: true,
            })
        }
        else {
            this.setState({
                modalTitle: "Add/Edit Limit",
                modalOpen: "#staticBackdrop",
                show: true,
            })
        }
        this.setState({
            role_desc: "",
            approval_limit: '',
            approval_order: '',
            obj_id_al: ''
        })
    }

    handleClose = () => {
        this.setState({
            show: false,
            loading: false
        })
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    countryChange = (e, value) => {
        this.setState({
            country_name: this.state.country_name = e.target.innerText,
            countrySelected: this.state.countrySelected = value
        });
        if (this.state.countrySelected === "") {
            const fieldName = "country"
            this.setState({ loading: false })
            return this.requiredElement(fieldName)
        }
    }

    stateMasterChange = (e, value) => {
        this.setState({
            state_name: this.state.state_name = e.target.innerText,
            stateMasterSelected: this.state.stateMasterSelected = value
        });
        if (this.state.stateMasterSelected === "") {
            const fieldName = "country"
            this.setState({ loading: false })
            return this.requiredElement(fieldName)
        }
    }

    drpProcessChange = (e) => {
        if (e.target.value === "") {
            this.setState({
                ladderList: [],
                [e.target.name]: e.target.value,
            })
        }
        else if (e.target.name === "process_desc") {
            this.setState({
                modalOpen: "#staticBackdrop",
                [e.target.name]: e.target.value,
                loading: true,
            })
            this.getApprovalLadderList(e.target.value)
        }

    }

    masterList = async () => {
        // Country List
        await fetch(`/${process.env.REACT_APP_NAME}/countryMaster/ListAPI/?order_field=country_name&order_by=asc&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then((response) => {
            if (response.statusText === "Internal Server Error") {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                const CountryList = []
                if (data.results.length > 0) {
                    data.results.map(i =>
                        i.status === true ?
                            CountryList.push({ key: i.flag, value: i.flag, flag: i.flag, text: i.country_name })
                            :
                            ''
                    )
                    this.setState({
                        countryList: this.state.countryList = CountryList
                    })
                    var dv = this.state.country_name;
                    var res = this.state.countryList.filter(
                        ({ text }) =>
                            dv === text);
                    if (res.length > 0) {
                        this.setState({ countrySelected: this.state.countrySelected = res[0].value })
                    }
                }
            });
        });

        // peocessMasterList
        await fetch(`/${process.env.REACT_APP_NAME}/processMaster/ListAPI/?type=T&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then((response) => {
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

        // roleMasterList
        await fetch(`/${process.env.REACT_APP_NAME}/roleMaster/ListAPI/?page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then((response) => {
            if (response.statusText === "Internal Server Error") {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                this.setState({
                    roleList: data.results,
                })
            })
        })

        // State Master List
        await fetch(`/${process.env.REACT_APP_NAME}/stateMaster/ListAPI/?order_field=state_name&order_by=asc&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then((response) => {
            if (response.statusText === "Internal Server Error") {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                const StateMasterList = []
                if (data.results.length > 0) {
                    data.results.map(i =>
                        StateMasterList.push({ key: i.id, value: i.state_code, text: i.state_name })
                    )
                    this.setState({
                        stateMasterList: this.state.stateMasterList = StateMasterList
                    })
                    var dv = this.state.state_name;
                    var res = this.state.stateMasterList.filter(
                        ({ text }) =>
                            dv === text);
                    if (res.length > 0) {
                        this.setState({ stateMasterSelected: this.state.stateMasterSelected = res[0].value })
                    }
                }
            });
        });
    }

    getDetails = async () => {
        this.setState({ loading: true });
        const queryParams = window.location.pathname;
        await getDetailsFun.call(this, queryParams, form_name)
        if (this.state.details !== "") {
            this.setState({
                obj_id: this.state.details.id,
                org_code: this.state.details.org_code,
                org_desc: this.state.details.org_desc,
                short_name: this.state.details.short_name,
                country_name: this.state.details.country,
                address_1: this.state.details.address_1,
                address_2: this.state.details.address_2,
                city: this.state.details.city,
                state_name: this.state.details.state,
                stateMasterSelected: this.state.details.state_selected,
                zip_code: this.state.details.zip_code,
                phone: this.state.details.phone,
                fax: this.state.details.fax,
                status: this.state.details.status === true ? '1' : '0',
                countrySelected: this.state.countrySelected = this.state.details.country_selected,
                loading: false,
            });
        }
    };

    componentDidMount() {
        this.getDetails();
        this.masterList();
    };

    getApprovalLadderList = async (process_desc) => {
        await fetch(`${List_Path}/ladderListAPI/?organisation__id=${this.state.obj_id}&process__process_desc=${process_desc}`).then((response) => {
            if (response.statusText === "Internal Server Error") {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                this.setState({
                    ladderList: data,
                    loading: false,

                })

            })
        })
    }
    approvalLadder = async (e) => {
        if (this.state.role_desc === "") {
            document.getElementById("role_desc").style.borderColor = "red"
            alert("Please select role from list")
        }
        else if (this.state.approval_limit === "") {
            document.getElementById("approval_limit").style.borderColor = "red"
            alert("Please update approval limit")
        }
        else if (this.state.approval_order === "") {
            document.getElementById("approval_order").style.borderColor = "red"
            alert("Please update approval order")
        }
        else {
            this.setState({
                loading: true,
            })

            const requestOptions = {
                method: 'POST',
                headers: PostHeader(),
                body: JSON.stringify(this.state)
            };
            await fetch(`${List_Path}/createUpdateApprovalLadderAPI/`, requestOptions)
                .then(async response => {
                    if (response.statusText === "Internal Server Error") {
                        this.setState({
                            loading: false
                        })
                        return alert(`${process.env.REACT_APP_ERROR_MSG}`);
                    }
                    const data = await response.json();
                    if (data.status) {
                        this.getApprovalLadderList(this.state.process_desc)
                        this.setState({
                            loading: false,
                            show: false,
                        })
                    }

                })
        }
    }

    deleteApprovalLadder = async (e) => {
        this.setState({
            loading: true
        })
        const requestOptions = {
            method: 'DELETE',
            headers: PostHeader(),
            body: JSON.stringify(this.state)
        };
        await fetch(`${List_Path}/createUpdateApprovalLadderAPI/`, requestOptions)
            .then(async response => {
                if (response.statusText === "Internal Server Error") {
                    this.setState({
                        loading: false
                    })
                    return alert(`${process.env.REACT_APP_ERROR_MSG}`);
                }
                const data = await response.json();
                if (data.status) {
                    this.getApprovalLadderList(this.state.process_desc)
                    this.setState({
                        loading: false,
                        show: false,
                    })
                }

            })
    }

    editApprovalLAdder = async (e) => {
        this.setState({
            ladderID: e.target.id,
            modalTitle: "Add/Edit Limit",
            show: true,
            loading: true
        })
        await fetch(`${List_Path}/ladderListAPI/?id=${e.target.id}`).then((response) => {
            response.json().then((data) => {
                this.setState({
                    role_desc: data[0].role.role_desc,
                    approval_limit: data[0].approval_limit,
                    approval_order: data[0].approval_order,
                    obj_id_al: data[0].id,
                    loading: true
                })

            })
        })
    }

    handleSubmit = async (event) => {
        if (this.state.countrySelected === "") {
            let msg = "Please select Country before Save"
            return fieldValidation.call(this, msg)
        }
        else {
            event.preventDefault();
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
                <div className="content-wrapper" onClick={Wrapper_clickFun.bind(this)}>
                    <form id="app-form" onSubmit={this.handleSubmit} autoComplete="off">
                        <FormName form_name_list={form_name} form_name={form_name} form_type={form_type} list_page={List_Path}></FormName>
                        <Loader load={this.state.loading}></Loader>
                        <ErrorMessage error_message={error_message} err_msg_visible={this.state.err_msg_visible}></ErrorMessage>
                        <SuccessMessage msg_visible={this.state.success_message} msg={"Data saved successfully"}></SuccessMessage>
                        <div className="row gx-3 gy-2 align-items-cente">
                            <div className="col-lg-2 col-md-2 col-sm-2 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="org_code" id="org_code" required value={this.state.org_code} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Code</label>
                                <div className="form-helper helper_hide" id="org_code_helper">Required</div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="org_desc" id="org_desc" required value={this.state.org_desc} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Organisation Name</label>
                                <div className="form-helper helper_hide" id="org_desc_helper">Required</div>
                            </div>

                            <div className="col-lg-2 col-md-2 col-sm-2 did-floating-label-content">
                                <input className="did-floating-input" type="text" placeholder=" " name="short_name" id="short_name" required value={this.state.short_name} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Short Name</label>
                                <div className="form-helper helper_hide" id="short_name_helper">Required</div>
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
                                <Dropdown className="did-floating-input"
                                    name="state_name"
                                    value={this.state.stateMasterSelected}
                                    clearable
                                    placeholder={this.state.stateMasterList.length > 0 ? 'Select State' : 'Loading...'}
                                    fluid
                                    search
                                    required={true}
                                    selection
                                    options={this.state.stateMasterList}
                                    loading={this.state.stateMasterList.length > 0 ? false : true}
                                    disabled={this.state.stateMasterList.length > 0 ? false : true}
                                    onChange={(event, data) => { this.stateMasterChange(event, data.value) }}
                                />
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
                        <div className="row" style={{ borderTop: "none", display: this.state.obj_id !== "" || this.state.success_message ? "contents" : "none" }}>
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a className="nav-link active" id="nav-menu-tab" data-bs-toggle="tab" href="#approval_list" role="tab" aria-controls="nav-menu" aria-selected="true">Approval List</a>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="approval_list" role="tabpanel" aria-labelledby="nav-menu-tab">
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="input-group input-group-sm" style={{ display: "flex" }}>
                                            <span className="input-group-text" style={{ width: "20%", fontWeight: "bold", fontSize: "14px" }}>Process</span>
                                            <select className="form-select" style={{ fontSize: "14px" }} name="process_desc" id="process_desc" value={this.state.process_desc} onChange={this.drpProcessChange}>
                                                <option value="">---Select---</option>
                                                {this.state.processList.length > 0 ?
                                                    this.state.processList.map(i =>
                                                        <option value={i.process_desc}>{i.process_desc}</option>
                                                    )
                                                    :
                                                    ''
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="table-responsive ">
                                            <table className="table table-hover table-striped table-bordered border-primary">
                                                <thead>
                                                    <tr>
                                                        <th style={{ textAlign: "center" }}>
                                                            <img src={AddIcon} style={{ width: "20px", cursor: "pointer" }} alt="add_icon" data-tip data-for="add_icon" onClick={this.addImageClick}></img>
                                                            {/* <ReactTooltip id="add_icon" place="right" effect="solid">
                                                                Add Task
                                                            </ReactTooltip> */}
                                                        </th>
                                                        <th>
                                                            <span> Role </span>
                                                        </th>
                                                        <th>Limit</th>
                                                        <th>Order</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.ladderList.length > 0 ?
                                                            this.state.ladderList.map(ol =>
                                                                <tr>
                                                                    <td style={{ textAlign: "center" }}>
                                                                        <img src={EditIcon} style={{ width: "15px", cursor: "pointer" }} id={ol.id} alt="edit_icon" data-tip data-for="edit_icon" onClick={this.editApprovalLAdder}></img>
                                                                        {/* <ReactTooltip id="edit_icon" place="right" effect="solid">
                                                                    Update
                                                                </ReactTooltip> */}
                                                                    </td>
                                                                    <td>
                                                                        <span> {ol.role.role_code + " - " + ol.role.role_desc} </span>
                                                                    </td>
                                                                    <td>
                                                                        <span> {ol.approval_limit} </span>
                                                                    </td>
                                                                    <td>
                                                                        <span> {ol.approval_order} </span>
                                                                    </td>
                                                                </tr>


                                                            )

                                                            :
                                                            <tr>
                                                                <td colSpan="16" className="no_record">No Records to Display</td>
                                                            </tr>
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    {/* <!-- Modal --> */}
                    <Modal
                        show={this.state.show}
                        onHide={this.handleClose}
                        backdrop="static"
                        keyboard={false}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="col-lg-12 col-md-12 col-sm-12 did-floating-label-content" style={{ display: this.state.modalTitle !== "Error" ? "none" : "flex" }}>
                                <span style={{ fontSize: "20px", color: "brown" }}>
                                    Please select Process from process list
                                </span>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 did-floating-label-content" style={{ display: this.state.modalTitle === "Error" ? "none" : "flex" }}>
                                <select className="did-floating-select" name="role_desc" id="role_desc" value={this.state.role_desc} onChange={this.drpHandleChange} onClick={this.drpHandleChange} onFocus={this.drpHandleChange}>
                                    <option value="">---Select---</option>
                                    {this.state.roleList.length > 0 ?
                                        this.state.roleList.map(rl =>
                                            <option value={rl.role_desc}>{rl.role_code + " " + rl.role_desc}</option>
                                        )
                                        :
                                        ''
                                    }

                                </select>
                                <label className="did-floating-label">Role</label>
                            </div>
                            <input className="did-floating-input" type="hidden" name="obj_id_al" id="obj_id_al" required value={this.state.obj_id_al} />
                            <div className="col-lg-12 col-md-12 col-sm-12 did-floating-label-content" style={{ display: this.state.modalTitle === "Error" ? "none" : "flex" }}>
                                <input className="did-floating-input" type="text" placeholder=" " name="approval_limit" id="approval_limit" required value={this.state.approval_limit} maxlength="9" onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Approval Limit</label>
                                <div className="form-helper helper_hide" id="approval_limit_helper">Required</div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 did-floating-label-content" style={{ display: this.state.modalTitle === "Error" ? "none" : "flex" }}>
                                <input className="did-floating-input" type="text" placeholder=" " name="approval_order" id="approval_order" required value={this.state.approval_order} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                <label className="did-floating-label">Approval Order</label>
                                <div className="form-helper helper_hide" id="approval_order_helper">Required</div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" onClick={this.handleClose}>Close</button>
                            <button type="button" className="btn btn-danger" style={{ display: this.state.modalTitle === "Error" ? "none" : "block" }} data-bs-dismiss="modal" onClick={this.deleteApprovalLadder}>Delete</button>
                            <button type="button" id="modal_ok" className="btn btn-success" style={{ display: this.state.modalTitle === "Error" ? "none" : "block" }} onClick={this.approvalLadder}>Ok</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default CreateUpdatePage;