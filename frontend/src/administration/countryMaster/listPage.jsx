import React, { Component } from "react";
import wrapper_clickFun from "../../components/wrapperClickFun";
import ListPageTable from "../../pages/listPageTable";

const API_form_name = "countryMaster";
const form_name = "Country Master List";
const Create_Update_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}/CreateUpdate`;
const listAPI = `/${process.env.REACT_APP_NAME}/${API_form_name}/ListAPI/`;
const form_type = "Master";

const tableHeaderList = [
    {
        cn: "Country",
        fv: "code",
        fn: "country_code",
        st: "search_box",
        sv: "country_code",
    },
    {
        cn: "Country Name",
        fv: "Country Name",
        fn: "country_name",
        st: "search_box",
        sv: "country_name",
    },
    { cn: "Status", fv: "Status", fn: "status", st: "dropdown", sv: "status" },
    {
        cn: "Last Updated By",
        fv: "User Name",
        fn: "updated_by",
        st: "search_box",
        sv: "updated_by__full_name",
    },
    {
        cn: "Last Updated Date",
        fv: "Date",
        fn: "updated_date",
        st: "datepicker",
        sv: "updated_date",
    },
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
