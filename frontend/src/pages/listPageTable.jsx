import React, { Component, startTransition } from 'react'
import { connect } from "react-redux";
import Moment from "react-moment"
import SearchBox from "../components/SearchBox"
import ChangeHandler from "../components/ChangeHandler"
import GenerateURI from "../components/GenerateURI"
import Pagination from "../components/Pagination"
import PaginationPageClick from "../components/PaginationPageClick"
import PageSizeChange from "../components/PageSizeChange"
import OrderBy from "../components/OrderBy"
import DocumentNumberTD from '../components/DocumentNumberTD';
import ToggleClick from '../components/ToggleClick'
import StateDic from "../components/StateDic"
import refreshListPage from "../components/refreshList"
import ListPageModal from "../components/listPageModal"
import Loader from "../components/Loader"
import Cookies from 'js-cookie'
import { FormName } from '../components/FormNameListPage'
import { Navigate } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        navOrgName: state.navOrgName,
        adminAccess: state.adminAccess
    };
};


export class listPageTable extends Component {
    constructor(props) {
        super(props);
        this.state = StateDic;
        this.ToggleClick = ToggleClick.bind(this);
        this.listPageModal = React.createRef()
    };

    async refreshList(page_size = this.state.perPage) {
        const pathname = window.location.pathname
        var listAPI = ""
        this.setState({
            navOrgName: this.state.navOrgName = this.props.navOrgName
        })
        if (this.props.adminAccess === false && this.props.navOrgName === "") {
            this.setState({
                loading: false
            })
            alert("Please change the organization to view list")
        }
        else if (this.props.adminAccess === true || (this.props.adminAccess === false && this.props.navOrgName !== "")) {
            if (pathname.includes("pendingProspect")) {
                listAPI = this.props.listAPI
                refreshListPage.call(this, listAPI, page_size)
            }
            else if (pathname.includes("pending")) {
                listAPI = `${this.props.listAPI}pendingApproval/?process=${this.props.form_name}`
                refreshListPage.call(this, listAPI, page_size)
            }
            else {
                listAPI = this.props.listAPI
                refreshListPage.call(this, listAPI, page_size)
            };
        }
    };

    searchOn = () => {
        this.setState({
            order_by: "desc",
            orderByField: this.state.orderByField = '',
        })
        this.refreshList();
        const caret_ele = document.getElementsByClassName('caret_up')
        if (caret_ele.length > 0) {
            caret_ele[0].classList.add("caret_up_hide");
            caret_ele[0].classList.remove("caret_up");
        }
    }

    auditTrailModalShow = (e) => {
        this.listPageModal.current.auditTrail(e)
    }

    pendingApprovalModalShow = (e) => {
        this.listPageModal.current.pendingApproval(e)
    }

    async componentDidMount() {
        for (var p in Cookies.get()) {
            if (p !== "csrftoken") {
                Cookies.remove(p)
            }

        }
        this.refreshList();
        document.title = this.props.form_name;
        this.setState({
            createUpdatePath: this.props.to_page
        })
    };

    onRowClick = (e) => {
        const elements = Array.from(document.getElementsByClassName("selected_row"))
        if (elements.length > 0) {
            elements[0].classList.remove("selected_row")
        }
        e.target.parentElement.classList.add("selected_row")
    }

    iconClick = (e) => {
        this.setState({
            redirect_obj_id: e.currentTarget.id,
            redirect: true,
            action: e.currentTarget.attributes["action"].nodeValue
        })
    }

    rowEditFun = (e) => {
        document.getElementsByClassName("edit_row_" + e.currentTarget.id)[0].style.display = 'none'
        document.getElementsByClassName("update_row_" + e.currentTarget.id)[0].style.display = 'inline-flex'
        var divList = document.getElementsByClassName("table_div_" + e.currentTarget.id)
        for (const element of divList) {
            element.style.display = "none";
        }
        var inputList = document.getElementsByClassName("table_input_" + e.currentTarget.id)
        for (const element of inputList) {
            element.style.display = "inline-flex";
        }
    }

    rowUpdateFun = (e) => {
        document.getElementsByClassName("edit_row_" + e.currentTarget.id)[0].style.display = 'inline-flex'
        document.getElementsByClassName("update_row_" + e.currentTarget.id)[0].style.display = 'none'
        var divList = document.getElementsByClassName("table_div_" + e.currentTarget.id)
        for (const element of divList) {
            element.style.display = "inline-flex";
        }
        var inputList = document.getElementsByClassName("table_input_" + e.currentTarget.id)
        for (const element of inputList) {
            element.style.display = "none";
        }
    }

    render() {
        if (this.state.redirect) {
            if (this.state.action !== "") {
                return <Navigate to={`${this.props.to_page}/${this.state.action}=${this.state.redirect_obj_id}`} />
            }
            else {
                return <Navigate to={`/${process.env.REACT_APP_NAME}/${this.props.form_name}/${this.state.action}=${this.state.redirect_obj_id}`} />
            }
        }

        return (
            <>
                {this.state.loadTemplate ?
                    <>
                        <Loader load={this.state.loading}></Loader>
                        <FormName form_name={this.props.form_name} form_type={this.props.form_type} to_page={this.props.to_page} generatePDF={this.props.generatePDF} apiFormName={this.props.apiFormName} downLoadAPI={this.props.downLoadAPI}></FormName>
                        <div className="row list_page_row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="table-responsive">
                                    <table id={this.props.form_type === "transaction" ? "t_list_page_table" : "list_page_table"} className={`ui table-striped list_page_table`}>
                                        <thead>
                                            <tr>
                                                {this.props.form_type === "transaction" ?
                                                    <th>
                                                        <div style={{ width: "150px", color: "rgb(49, 24, 97)" }}></div>
                                                    </th>
                                                    :
                                                    ''
                                                }
                                                {this.props.tableHeaderList.map(i =>
                                                    <th>
                                                        <SearchBox columnName={i.cn} search_type={i.st} field_value={i.fv} field_name={i.sv} onPropertyChange={GenerateURI.bind(this)} onSearch={this.searchOn} onOrderBy={OrderBy.bind(this)} />
                                                    </th>
                                                )}
                                                {this.props.form_type === "transaction" ?
                                                    <>
                                                        <th><div style={{ width: "80px", color: "rgb(49, 24, 97)" }}>Audit Trail</div></th>
                                                        <th><div style={{ width: "80px", color: "rgb(49, 24, 97)" }}>Pending for Approval</div></th>
                                                    </>
                                                    : ''
                                                }
                                            </tr>
                                        </thead>
                                        <tbody style={{ fontSize: "14px" }}>
                                            {this.state.data_list.length > 0 ?
                                                this.state.data_list.map(i =>
                                                    <tr className='' onClick={this.onRowClick} id={i.id} doc_no={i.document_no || i.report_no}>
                                                        {this.props.tableHeaderList.map(t =>
                                                            t.fv === "code" ?
                                                                <td>
                                                                    {i.my_absolute_url === undefined ?
                                                                        i[t.fn]
                                                                        :
                                                                        <DocumentNumberTD to_link={i.my_absolute_url.substring(0, i.my_absolute_url.length - 1)} field_val={i[t.fn]}></DocumentNumberTD>
                                                                    }
                                                                </td>
                                                                :
                                                                t.fn === "admin_only" && i[t.fn] === true ?
                                                                    <td>true</td>
                                                                    :
                                                                    t.fn === "admin_only" && i[t.fn] === false ?
                                                                        <td>false</td>
                                                                        :
                                                                        t.fn === "status" && i[t.fn] === true ?
                                                                            <td>Active</td>
                                                                            :
                                                                            t.fn === "status" && i[t.fn] === false ?
                                                                                <td>InActive</td>
                                                                                :
                                                                                t.fv === "Date" ?
                                                                                    <td><Moment format="DD-MMM-YYYY">{i[t.fn]}</Moment></td>
                                                                                    :
                                                                                    t.fn === "is_parent" && i[t.fn] === true ?
                                                                                        <td>Parent</td>
                                                                                        :
                                                                                        t.fn === "is_parent" && i[t.fn] === false ?
                                                                                            <td>Child</td>
                                                                                            :
                                                                                            t.fn === "invested" && i[t.fn] === true ?
                                                                                                <td>Yes</td>
                                                                                                :
                                                                                                t.fn === "invested" && i[t.fn] === false ?
                                                                                                    <td>No</td>
                                                                                                    :
                                                                                                    t.fn === "nifty_stock" && i[t.fn] === true ?
                                                                                                        <td>Yes</td>
                                                                                                        :
                                                                                                        t.fn === "nifty_stock" && i[t.fn] === false ?
                                                                                                            <td>No</td>
                                                                                                            :
                                                                                                            t.fv === "json_file" ?
                                                                                                                <td>
                                                                                                                    <a href={`/media/file_upload/${i[t.fn]}`} download>{i[t.fn]}</a>
                                                                                                                </td>
                                                                                                                :
                                                                                                                <td>
                                                                                                                    <div className={`table_div table_div_${i.id}`} id={`div_${i.id}`} style={{ display: "contents" }}>
                                                                                                                        {i[t.fn]}
                                                                                                                    </div>
                                                                                                                    <div className='table_input'>
                                                                                                                        <input type="text" className={`form-control table_input_${i.id}`} id={`input_${i.id}`} name={`${i[t.fn]}_${i.id}`} value={i[t.fn]} style={{ display: "none" }} onChange={ChangeHandler.bind(this)} />
                                                                                                                    </div>
                                                                                                                </td>
                                                        )
                                                        }
                                                        {this.props.form_type === "transaction" ?
                                                            <>
                                                                <td><a id={i.doc_no} trn_id={i.id} process_name={this.props.form_name} style={{ color: "darkblue", cursor: "pointer", textDecoration: "underline" }} onClick={this.auditTrailModalShow}>View</a></td>
                                                                <td><a id={i.doc_no} trn_id={i.id} process_name={this.props.form_name} style={{ color: "darkblue", cursor: "pointer", textDecoration: "underline" }} onClick={this.pendingApprovalModalShow}>View</a></td>
                                                            </>
                                                            :
                                                            ''
                                                        }
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
                            {this.state.data_list.length > 0 && this.state.paginationDisplay === true ?
                                <Pagination perPageValue={this.state.perPage} currentPageValue={this.state.currentPage} onChange={PageSizeChange.bind(this)} pageCountValue={this.state.pageCount} onPageChange={PaginationPageClick.bind(this)} refreshList={this.refreshList} />
                                :
                                ''
                            }
                            <ListPageModal ref={this.listPageModal} />
                        </div>
                    </>
                    :
                    ''
                }
            </>
        );
    }
}

export default connect(mapStateToProps)(listPageTable);