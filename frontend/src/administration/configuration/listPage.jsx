import React, { Component } from "react";
import wrapper_clickFun from "../../components/wrapperClickFun";
import ListPageTable from "../../pages/listPageTable";

const API_form_name = "configuration";
const form_name = "Configuration List";
const Create_Update_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}/CreateUpdate`;
const listAPI = `/${process.env.REACT_APP_NAME}/${API_form_name}/ListAPI/`;
const form_type = "Master";

const tableHeaderList = [
    { cn: "Configuration", fv: "code", fn: "configuration", st: "search_box", sv: "configuration" },
    { cn: "Value", fv: "Value",fn: "value",st: "search_box",sv: "value"},
    { cn: "Status", fv: "Status", fn: "status", st: "dropdown", sv: "status" },
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
