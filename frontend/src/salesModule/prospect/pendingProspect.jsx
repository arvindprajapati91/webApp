import React, { Component } from "react";
import wrapper_clickFun from "../../components/wrapperClickFun";
import ListPageTable from "../../pages/listPageTable";

const API_form_name = "prospect";
const form_name = "Prospect List";
const Create_Update_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}/CreateUpdate`;
const listAPI = `/${process.env.REACT_APP_NAME}/${API_form_name}/pendingProspectListAPI/`;
const form_type = "Transaction";

const tableHeaderList = [
    { cn: "Number", fv: "code", fn: "prospect_number", st: "search_box", sv: "prospect_number" },
    { cn: "First Name", fv: "first_name", fn: "first_name", st: "search_box", sv: "first_name", }, 
    { cn: "Last Name", fv: "last_name", fn: "last_name", st: "search_box", sv: "last_name", }, 
    { cn: "Email", fv: "email", fn: "email", st: "search_box", sv: "email", }, 
    { cn: "Phone", fv: "phone", fn: "phone", st: "search_box", sv: "phone", },
    { cn: "Type", fv: "type", fn: "type", st: "search_box", sv: "type", },  
    { cn: "Status", fv: "Status", fn: "status", st: "search_box", sv: "status" }, 
    { cn: "Last Updated By", fv: "User Name", fn: "updated_by", st: "search_box", sv: "updated_by__full_name", }, 
    { cn: "Last Updated Date", fv: "Date", fn: "updated_date", st: "datepicker", sv: "updated_date", },
];

class listPage extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="content-wrapper" onClick={wrapper_clickFun.bind(this)}>
                    <ListPageTable
                        tableHeaderList={tableHeaderList}
                        listAPI={listAPI}
                        to_page={Create_Update_Path}
                        form_name={form_name}
                        form_type={form_type}
                    ></ListPageTable>
                </div>
            </div>
        );
    }
}

export default listPage;
