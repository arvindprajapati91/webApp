import React, { Component } from 'react';
import wrapper_clickFun from '../../components/wrapperClickFun';
import ListPageTable from '../../pages/listPageTable';

const API_form_name = "menuMaster"
const form_name = 'Menu Master List';
const Create_Update_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}/CreateUpdate`
const listAPI = `/${process.env.REACT_APP_NAME}/${API_form_name}/ListAPI/`
const form_type = "Master"

const tableHeaderList = [
    { cn: "Menu Name", fv: "code", fn: "menu_desc", st: "search_box", sv: "menu_desc" },
    { cn: "Parent/Child", fv: "Parent/Child", fn: "is_parent", st: "dropdown", sv: "is_parent" },
    { cn: "Parent Menu", fv: "Parent Menu", fn: "parent_name", st: "search_box", sv: "parent_menu__menu_desc" },
    { cn: "Menu URL", fv: "Menu URL", fn: "menu_url", st: "search_box", sv: "menu_url" },
    { cn: "Admin Only", fv: "admin_only", fn: "admin_only", st: "search_box", sv: "admin_only" },
    { cn: "Status", fv: "Status", fn: "status", st: "dropdown", sv: "status" },
    { cn: "Last Updated By", fv: "User Name", fn: "updated_by", st: "search_box", sv: "updated_by__full_name" },
    { cn: "Last Updated Date", fv: "Date", fn: "updated_date", st: "datepicker", sv: "updated_date" },
]

class listPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemons: true
        }
    }

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