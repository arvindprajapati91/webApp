import React, { Component } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { ModalHeader, ModalDescription, ModalContent, ModalActions, Button, Modal } from 'semantic-ui-react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import moment from "moment";

export class FormNameUpdatePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            importDisplay: this.props.importDisplay,
            open: false,
            auditTrail: [],
        }
    };

    sendFormRequest = (e) => {
        this.props.parentCallback(e.target.id);
    }

    showAuditTrailUserMaster = async (e) => {
        console.log(this.props.slug_id)
        this.setState({ open: true })
        // Audit Trail
        await fetch(`/${process.env.REACT_APP_NAME}/userMaster/userMasterAuditTrailAPI/?slug=${this.props.slug_id}&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then((response) => {
            if (response.statusText === "Internal Server Error") {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                this.setState({
                    auditTrail: data.results,
                });
            });
        });
    }

    showAuditTrail = async (e) => {
        // console.log(this.props.slug_id)
        this.setState({ open: true })
        // Audit Trail
        await fetch(`/${process.env.REACT_APP_NAME}/auditTrail/auditTrailViewAPI/?record_no=${this.props.recordNo}&table_name=${this.props.tableName}&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then((response) => {
            if (!response.ok) {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                this.setState({
                    auditTrail: data.results,
                });
            });
        });
    }


    render() {
        const columns = [{
            dataField: this.props.list_page.includes('userMaster') ? 'user_name' : "record_no",
            text: this.props.list_page.includes('userMaster') ? 'User Name' : "Record No",
        }, {
            dataField: 'process',
            text: 'Process',
        },
        {
            dataField: 'action_desc',
            text: 'Action',
        },
        {
            dataField: 'action_by',
            text: 'Action By',

        },
        {
            dataField: 'action_date',
            text: 'Action Date',
            formatter: (cell) => {
                return moment(cell).format('DD-MMM-YYYY HH:MM:SS A')
            },
        },
        {
            dataField: 'changes',
            text: 'Changes',
        }];

        // console.log("Form Name")
        return (
            <div className="row form-name-row" style={{ marginTop: "3px" }}>
                <div className="col-lg-2 col-md-2 col-sm-2" style={{ margin: "0px", paddingTop: "3px" }}>
                    <span style={{ color: "brown", fontSize: "15px" }}>
                        {this.props.form_name}
                    </span>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-7" style={{ margin: "0", display: "flex" }}>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Please use this option to import data from Excel File</Tooltip>}>
                        <div className="input-group input-group-sm" style={{ display: this.state.importDisplay === true ? "flex" : "none" }}>
                            <input className="form-control" style={{ width: "50%" }} type="file" id="formFile" onChange={this.props.fileSelection} />
                            <span className="btn btn-danger" style={{ textDecoration: 'none', color: "white" }} onClick={this.props.import_data}>
                                Import
                            </span>
                        </div>
                    </OverlayTrigger>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3" style={{ margin: "0px", paddingTop: "3px" }}>
                    <Link to={window.location.pathname.includes("pending") ? `${this.props.list_page}/pendingApproval` : this.props.list_page} className="back_to_list" style={{ fontWeight: "500", color: "black", textDecoration: "none", cursor: "pointer", float: "right" }}>
                        <svg style={{ color: "brown", marginRight: "5px" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg>
                        <span style={{ color: "black" }}>Back to List</span>
                    </Link>
                    {this.props.auditTrailView === "Yes" ?
                        <div className="audit_trail" id="audit_trail" style={{ fontWeight: "500", color: "black", textDecoration: "none", cursor: "pointer", float: "right", paddingLeft: "10px", paddingRight: "10px" }} onClick={this.showAuditTrail}>
                            <svg height="18px" version="1.1" viewBox="0 0 20 21" width="20px"><title /><desc /><defs /><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#004a5d" id="Core" opacity="0.9" transform="translate(-464.000000, -254.000000)"><g id="history" transform="translate(464.000000, 254.500000)"><path d="M10.5,0 C7,0 3.9,1.9 2.3,4.8 L0,2.5 L0,9 L6.5,9 L3.7,6.2 C5,3.7 7.5,2 10.5,2 C14.6,2 18,5.4 18,9.5 C18,13.6 14.6,17 10.5,17 C7.2,17 4.5,14.9 3.4,12 L1.3,12 C2.4,16 6.1,19 10.5,19 C15.8,19 20,14.7 20,9.5 C20,4.3 15.7,0 10.5,0 L10.5,0 Z M9,5 L9,10.1 L13.7,12.9 L14.5,11.6 L10.5,9.2 L10.5,5 L9,5 L9,5 Z" id="Shape" /></g></g></g></svg>
                            <span style={{ color: "black", paddingLeft: "3px" }}>Audit Trail</span>
                        </div>
                        :
                        ''
                    }

                </div>
                <Modal centered={false} open={this.state.open} onClose={() => this.setState({ open: false })} onOpen={() => this.setState({ open: true })}>
                    <ModalHeader>Audit Trail of {this.props.recordNo}</ModalHeader>
                    <ModalContent>
                        <ModalDescription>
                            <BootstrapTable keyField='record_no' data={this.state.auditTrail} columns={columns} striped hover condensed noDataIndication={'No records found'} pagination={ paginationFactory() } />
                        </ModalDescription>
                    </ModalContent>
                    <ModalActions>
                        <Button onClick={() => this.setState({ open: false })}>OK</Button>
                    </ModalActions>
                </Modal>

            </div>
        )
    }
}

export default FormNameUpdatePage
