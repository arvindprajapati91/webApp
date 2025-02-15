import React, { Component } from 'react';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUserTie, faHome, faArrowsRotate, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import ToggleClick from '../components/ToggleClick'
import LogoIcon from "../images/Logo.png"
import { Button, Dropdown, Modal } from 'semantic-ui-react'
import PostHeader from "../components/postHeader";
import { Navigate } from "react-router-dom";
import { FaExchangeAlt } from "react-icons/fa";

const Home_Page = `/${process.env.REACT_APP_NAME}/homePage`
// const Reset_Password = `/${process.env.REACT_APP_NAME}/resetPassword`
const Logout = `/${process.env.REACT_APP_NAME}/logOut`

const mapStatetoProps = (state) => {
    return {
        navOrgName: state.navOrgName
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        orgNameSelect: (e, type, value) => dispatch({ type: type, payload: value }),
        userAdminAccess: (type, value) => dispatch({ type: type, payload: value })
    }
}

class navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: '',
            organisation_name: '',
            org_short_name: '',
            menuCount: '',
            org_list: [],
            orgSelected: '',
            orgSNSelected: '',
            org_ids: '',
            org_access_list: [],
            navigate: false,
            open: false,
            adminAccess: ''
        }
    }

    async masterLists() {
        // Organisation List
        await fetch(`/${process.env.REACT_APP_NAME}/organisation/ListAPI/?drpList=Y&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`).then(data => data.json().then((data) => {
            if (data.results.length > 0) {
                const OrgList = []
                data.results.map(i =>
                    OrgList.push({ key: i.org_code, value: i.org_desc, id: i.id, text: i.org_desc, short_name: i.short_name })
                )
                this.setState(prevState => ({
                    org_list: this.state.org_list = OrgList,
                }))

            }
        }))
    }

    dropDownChange = (e, type, value, short_name) => {
        this.props.orgNameSelect(e, type, value, short_name)
        this.setState({
            [type]: this.state[type] = value,
            orgSNSelected: this.state.orgSNSelected = e.currentTarget.attributes[1].nodeValue,
        });

    }


    getUserName = async () => {
        // User Full Name API
        await fetch(`/${process.env.REACT_APP_NAME}/getUserName/`).then((response) => {
            if (response.statusText === "Internal Server Error") {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                this.setState({
                    full_name: data.full_name,
                    adminAccess: data.adminAccess,
                    organisation_name: data.organisation_name === null || data.organisation_name === '' ? "ATHO IT SOLUTIONS LLP" : data.organisation_name,
                    org_short_name: data.org_short_name ===  null || data.org_short_name === '' ? "ATHO" : data.org_short_name,
                    menuCount: data.menuCount
                });
                this.props.userAdminAccess("adminAccess", data.adminAccess)
                this.props.orgNameSelect("", "orgSelected", data.organisation_name, "")
            });
        });

    }

    Toggle_Click = () => {
        ToggleClick.call(this)
    }

    goToHome() {
        if (this.state.listPageRedirect) {
            return <Navigate to={Home_Page} />
        }
    }

    user_click = (e) => {
        let menu_ele = document.getElementById("header_user")
        if (menu_ele.classList.contains('show')) {
            menu_ele.classList.remove("show");
        }
        else {
            menu_ele.classList.add("show");
        }
    }

    migrateMenus = async (e) => {
        const requestOptions = {
            method: "POST",
            headers: PostHeader(),
            body: JSON.stringify(this.state),
        };
        await fetch(`/${process.env.REACT_APP_NAME}/bulkMenuCreate/`, requestOptions)
            .then(async (res) => res.json())
            .then((data) => {
                if (data.status === "Ok") {
                    alert("Data Migration completed, please restart the server!")
                }
                else {
                    alert("Something went wrong!")
                }
            })
    }

    async componentDidMount() {
        this.getUserName();
        this.masterLists();
    }

    openModal = () => {
        this.setState({ open: true })
        var svgs = document.querySelectorAll("#header_user")
        if (svgs.length > 0) {
            svgs.forEach(obj =>
                obj.classList.remove("show")
            );
        }
    }

    changeOrg = async (e) => {
        this.setState({
            organisation_name: this.state.orgSelected,
            short_name: this.state.orgSNSelected,
            open: false

        })
        document.getElementById("home_page_link").click();
    }

    render() {
        return (
            <div className="row">
                <header className="navbar navbar-light bg-light navbar-expand-md justify-content-center fixed-top flex-column flex-md-row bd-navbar">
                    <div className="main-header">
                        <span className="logo">
                            <span className="logo-mini"><b></b></span>
                            <span className="logo-lg">
                                <img src={LogoIcon} alt="logo_icon" />
                            </span></span>
                    </div>
                    <div className="navbar-nav w-100 justify-content-center br-top">
                        <div className="menu-toggle">
                            <FontAwesomeIcon className="push-menu" icon={faBars} data-toggle="push-menu" role="button" id="menu-toggle" onClick={this.Toggle_Click} />
                        </div>
                        <span className="navbar-brand mx-auto full_COMP_NAME">{this.state.organisation_name}</span>
                        <span className="navbar-brand mx-auto short_COMP_NAME">{this.state.org_short_name}</span>
                        <ul className="nav navbar-nav ml-auto justify-content-end nav_ul">
                            {this.state.menuCount === 0 ?
                                <li className="nav-item">
                                    <Button content='Migrate Menus' style={{ marginTop: "7px", marginRight: "0px" }} onClick={this.migrateMenus} />
                                </li>
                                :
                                ''
                            }
                            <li className="nav-item">
                                <Link className="nav-link" id="home_page_link" to={Home_Page}>
                                    <FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Home Page
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" onClick={this.user_click}>
                                    <FontAwesomeIcon icon={faUserTie} className="user-icon"></FontAwesomeIcon> {this.state.full_name}
                                    <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: "4px" }}></FontAwesomeIcon>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" id="header_user">
                                    <li>
                                        <a className="dropdown-item" href={Logout}>
                                            <svg id="i-signout" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                                <path d="M28 16 L8 16 M20 8 L28 16 20 24 M11 28 L3 28 3 4 11 4" />
                                            </svg> Sign Out
                                        </a>
                                    </li>

                                </ul>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" onClick={this.openModal} style={{ cursor: "pointer" }}>
                                    <FaExchangeAlt />
                                    <span> Change Organization</span>
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </header>
                <Modal size={"small"} open={this.state.open} closeOnDimmerClick={false} onClose={() => this.setState({ open: false })} closable={false} className='changeOrgModal'>
                    <Modal.Header>Change Organisation</Modal.Header>
                    <Modal.Content>
                        <div className="navbar-brand mx-auto" style={{ paddingTop: "7px" }}>
                            <Dropdown className="did-floating-input nav_org"
                                name="nav_organisation"
                                id="nav_organisation"
                                value={this.state.orgSelected}
                                clearable
                                placeholder={this.state.org_list.length > 0 ? 'Select Organisation' : 'Loading...'}
                                fluid
                                search
                                required={true}
                                selection
                                options={this.state.org_list}
                                loading={this.state.org_list.length > 0 ? false : true}
                                disabled={this.state.org_list.length > 0 ? false : true}
                                onChange={(event, data) => { this.dropDownChange(event, "orgSelected", data.value) }}
                            />

                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => this.setState({ open: false })}>
                            No
                        </Button>
                        <Button positive onClick={this.changeOrg}>
                            Yes
                        </Button>
                    </Modal.Actions>
                </Modal>

            </div>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(navigation);