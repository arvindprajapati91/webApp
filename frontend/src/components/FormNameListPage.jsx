import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AiOutlineFilePdf } from "react-icons/ai";
import AddIcon from "../images/add_icon.png"
import { Link } from 'react-router-dom'
import ErrorMessage from "./errorMessage"
import postHeader from "./postHeader";
import apiError from "./apiError";
import { SiConvertio } from "react-icons/si";

const mapStateToProps = state => ({
    rdState: state
})

export class FormName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            param: "No"
        }
    };
    searchParam = () => {
        const param = [];
        const allParas = document.getElementsByTagName("th");
        for (const element of allParas) {
            console.log(element)
            const input = element.getElementsByTagName("input");
            for (const i of input) {
                const value = i.value
                if (value !== "") {
                    param.push(`${i.id}=${value}`)
                }
            }

        }
        var urlParam = ''
        if (param.length > 1) {
            urlParam = param.join("&");
        }
        else {
            urlParam = param.join("");
        }
        if (param.length > 0) {
            this.setState({
                param: this.state.param = "Yes",
                searchParam: this.state.searchParam = urlParam,
            })
        }
        else {
            this.setState({
                param: this.state.param = "No",
                searchParam: this.state.searchParam = '',
            })
        }

    }

    downloadData = () => {
        var apiURL = ""
        this.searchParam()
        if (this.state.param === "Yes") {
            apiURL = `${this.props.downLoadAPI}?${this.state.searchParam}`
        }
        else {
            apiURL = `${this.props.downLoadAPI}`
        }

        fetch(apiURL)
            .then(async response => {
                if (response.status === 500) {
                    return alert(`${process.env.REACT_APP_API_ERR_MSG}`);
                }
                else {
                    response.blob().then(blob => {
                        if (blob.type === "application/json") {
                            this.setState({
                                err_msg_visible: true,
                                error_message: "No Records Available",
                                loading: false,
                            })
                            setTimeout(() => {
                                this.setState({
                                    err_msg_visible: false,
                                });
                            }, process.env.REACT_APP_ERR_MSG_DUR);
                        }
                        else {
                            let url = window.URL.createObjectURL(blob);
                            let a = document.createElement('a');
                            a.href = url;
                            a.download = 'report.xlsx';
                            a.click();
                        }

                    });
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    covertToLead = async (e) => {
        try {
            var selected_row = document.getElementsByClassName("selected_row")[0];
            let obj_id = selected_row.id;
            console.log(selected_row.firstChild.innerText)
        } catch (e) {
            return alert("Select record to convert to lead!")
        }
    }
    generatePdfFun = async (e) => {
        try {
            const selected_row = document.getElementsByClassName("selected_row")[0];
            let obj_id = selected_row.id;
            if (obj_id) {
                let doc_no = selected_row.getAttribute("doc_no")
                let url = `/${process.env.REACT_APP_NAME}/${this.props.apiFormName}/downloadPdfApi/`;
                this.setState({
                    obj_id: this.state.obj_id = obj_id
                });
                const requestOptions = {
                    method: "POST",
                    headers: postHeader(),
                    body: JSON.stringify(this.state),
                };
                try {
                    const response = await fetch(url, requestOptions);
                    if (response.ok) {
                        const blob = await response.blob();
                        if (blob.size > 0) {
                            let url = window.URL.createObjectURL(blob);
                            let a = document.createElement("a");
                            a.href = url;
                            a.download = `${doc_no}`;
                            a.click();
                            this.setState({
                                loading: false,
                            });
                        } else {
                            this.setState({
                                loading: (this.state.loading = false),
                            });
                            alert("Something went wrong, kindly check with administrator");
                        }
                    }
                } catch (e) {
                    let error = e.message;
                    apiError.call(this, error);
                }
            }
        } catch (e) {
            return alert("Select record to download pdf!")
        }
    }

    render() {
        return (
            <>
                <div className="row form-name-row">
                    <div className="col-lg-3 col-md-3 col-sm-3" style={{ margin: "0px", paddingTop: "3px" }}>
                        <span className='form_name' style={{ color: "brown", fontSize: "15px" }}>
                            {this.props.form_name}
                        </span>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9 list_page_icons" style={{ margin: "0", textAlign: "right", paddingTop: "4px" }}>
                        {this.props.form_type !== 'Automation' ?
                            !window.location.pathname.includes("pendingProspect") ?
                                <Link to={this.props.to_page} style={{ textDecoration: "none", backgroundColor: "none", border: "none", fontSize: "14px", color: "black" }}>
                                    <img src={AddIcon} style={{ width: "20px", marginLeft: '3px', marginRight: "2px", marginTop: "-2px" }} alt="add_icon"></img>
                                    Create {this.props.form_name.replace("List", "")}
                                </Link>
                                :
                                window.location.pathname.includes("pendingProspect") ?
                                    <span onClick={this.covertToLead} style={{ backgroundColor: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "black" }}>
                                        <SiConvertio style={{ color: "brown", fontSize: "17px" }} /> Convert to Lead
                                    </span>
                                    :
                                    ''
                            :
                            ''
                        }
                        {this.props.generatePDF ?
                            <span onClick={this.generatePdfFun} style={{ backgroundColor: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "black" }}>
                                <AiOutlineFilePdf style={{ fontSize: "20px", color: "brown" }} />
                            </span>
                            :
                            ''
                        }
                    </div>
                </div>
                <ErrorMessage error_message={this.state.error_message} err_msg_visible={this.state.err_msg_visible}></ErrorMessage>
            </>
        )
    }
}

export default connect(mapStateToProps)(FormName)
