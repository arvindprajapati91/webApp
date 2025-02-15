import React, { Component } from 'react';
import wrapper_clickFun from '../../components/wrapperClickFun';
import ListPageTable from '../../pages/listPageTable';

const API_form_name = "userMaster"
const form_name = 'User Master List';
const Create_Update_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}/CreateUpdate`
const listAPI = `/${process.env.REACT_APP_NAME}/${API_form_name}/ListAPI/`
const form_type = "Master"

const tableHeaderList = [
    { cn: "User Name", fv: "code", fn: "username", st: "search_box", sv: "username" },
    { cn: "Employee Code", fv: "Employee Code", fn: "employee_code", st: "search_box", sv: "employee_code" },
    { cn: "Full Name", fv: "Full Name", fn: "full_name", st: "search_box", sv: "full_name" },
    { cn: "Email", fv: "Email", fn: "email", st: "search_box", sv: "email" },
    { cn: "Org Name", fv: "Org Name", fn: "org_desc", st: "search_box", sv: "organisation__org_desc" },
    { cn: "Manager Name", fv: "Manager Name", fn: "reporting_manager", st: "search_box", sv: "reporting_manager" },
    { cn: "Status", fv: "Status", fn: "status", st: "dropdown", sv: "status" },
    { cn: "Last Updated By", fv: "User Name", fn: "updated_by", st: "search_box", sv: "updated_by__full_name" },
    { cn: "Last Updated Date", fv: "Date", fn: "modified_date", st: "datepicker", sv: "modified_date" },
]

class listPage extends Component {

    render() {
        return (
            <div className="wrapper">
                <div className="content-wrapper" onClick={wrapper_clickFun.bind(this)}>
                    <ListPageTable tableHeaderList={tableHeaderList} listAPI={listAPI} to_page={Create_Update_Path} form_name={form_name} form_type={form_type}></ListPageTable>
                </div>
            </div>
        );
    }
}

export default listPage;