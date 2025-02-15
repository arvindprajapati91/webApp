import React, { Component } from 'react';
import wrapper_clickFun from '../../components/wrapperClickFun';
import ListPageTable from '../../pages/listPageTable';

const API_form_name = "auditTrail"
const form_name = 'Audit Trail List';
const Create_Update_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}/CreateUpdate`
const listAPI = `/${process.env.REACT_APP_NAME}/${API_form_name}/ListAPI/`
const downLoadAPI = `/${process.env.REACT_APP_NAME}/${API_form_name}/downloadAuditTrail/`
const form_type = "Master"

const tableHeaderList = [
    { cn: "Process Desc", fv: "code", fn: "process_desc", st: "search_box", sv: "process_desc" },
    { cn: "Full Name", fv: "Full Name", fn: "full_name", st: "search_box", sv: "full_name" },
    { cn: "Action Desc", fv: "Action Desc", fn: "action_desc", st: "search_box", sv: "action_desc" },
    { cn: "Changes", fv: "Changes", fn: "changes", st: "search_box", sv: "changes" },
    { cn: "Comments", fv: "Comments", fn: "comments", st: "search_box", sv: "comments" },
    { cn: "Action By", fv: "Action By", fn: "action_by", st: "search_box", sv: "action_by__full_name" },
    { cn: "Action Date", fv: "Date", fn: "action_date", st: "search_box", sv: "action_date" },
]

class listPage extends Component {

    render() {
        return (
            <div className="wrapper">
                <div className="content-wrapper" onClick={wrapper_clickFun.bind(this)}>
                    <ListPageTable tableHeaderList={tableHeaderList} listAPI={listAPI} to_page={Create_Update_Path} form_name={form_name} form_type={form_type} downLoadAPI={downLoadAPI}></ListPageTable>
                </div>
            </div>
        );
    }
}

export default listPage;