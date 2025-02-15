import React, { Component } from 'react'
import ChangeHandler from "../components/ChangeHandler"
import Moment from "react-moment"
import DeleteIcon from "../images/delete_icon.png"
import * as ReactTooltip from 'react-tooltip'
import Loader from "../components/Loader"

export class attachmentTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            unq_id: '',
            form_name: '',
            fileDesc: '',
            attachment_list: [],
            loading: false,
            form_id: '',
        }
    };

    onFileChange = (e) => {
        this.setState({ selectedFile: this.state.selectedFile = e.target.files[0] });
    }

    // On file upload (click the upload button)
    onFileUpload = (e) => {
        if (this.state.selectedFile === null) {
            return alert("Please select file before upload")
        }

        var formData = new FormData();
        formData.append('File', this.state.selectedFile)
        this.setState({
            unq_id: this.state.unq_id = e.target.id,
            form_name: this.state.form_name = e.target.attributes.form_name.value,
            form_id: this.state.form_id = e.target.attributes.form_id.value,
            fileDesc: this.state.fileDesc,
            loading: this.state.loading = true,
        })
        formData.append('unq_id', this.state.unq_id)
        formData.append('form_name', this.state.form_name)
        formData.append('fileDesc', this.state.fileDesc)
        formData.append('form_id', this.state.form_id)
        formData.append('fileAction', "Upload")
        fetch(`/${process.env.REACT_APP_NAME}/fileUpload/fileUploadDelete/`,
            {
                mode: 'no-cors',
                method: 'POST',
                body: formData,
            })
            .then(async response => {
                if (response.statusText === "Internal Server Error") {
                    this.setState({
                        loading: false
                    })
                    return alert(`${process.env.REACT_APP_ERROR_MSG}`);
                }
                const data = await response.json();
                if (data.status) {
                    this.attachmentListAPI(this.state.unq_id, this.state.form_id)
                    this.setState({
                        selectedFile: null,
                        unq_id: '',
                        form_name: '',
                        fileDesc: '',
                        attachment_list: [],
                        loading: false,
                    })
                    document.getElementById('file_name').value = ""
                }
            })
    };

    attachmentListAPI = (obj_id, formID) => {
        if (obj_id !== "") {
            var url = `/${process.env.REACT_APP_NAME}/fileUpload/ListAPI/?unq_id=${obj_id}&process=${this.props.process}`
        }
        else {
            var url = `/${process.env.REACT_APP_NAME}/fileUpload/ListAPI/?process=${this.props.process}&formID=${formID}`
        }
        // Attachment List
        fetch(url).then((response) => {
            if (response.statusText === "Internal Server Error") {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                this.setState({
                    attachment_list: data,
                    loading: false,
                });
            });
        });
    }

    deleteAttacment = (e) => {
        this.setState({
            unq_id: this.state.unq_id = e.target.attributes.unq_id.value,
            loading: this.state.loading = true
        })
        var formData = new FormData();
        formData.append('file_id', e.target.id)
        formData.append('fileAction', "Delete")
        fetch(`/${process.env.REACT_APP_NAME}/fileUpload/fileUploadDelete/`,
            {
                mode: 'no-cors',
                method: 'POST',
                body: formData,
            })
            .then(async response => {
                if (response.statusText === "Internal Server Error") {
                    this.setState({
                        loading: false
                    })
                    return alert(`${process.env.REACT_APP_ERROR_MSG}`);
                }
                const data = await response.json();
                if (data.status) {
                    this.attachmentListAPI(this.state.unq_id)
                    this.setState({ loading: false })
                }
            })
    }

    render() {
        return (
            <>
                <div className="tab-pane fade" id="attachment" role="tabpanel" aria-labelledby="nav-attachment-tab">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <ul className="list-group list-group-flush">
                            <Loader load={this.state.loading}></Loader>
                            <div className="row" style={{ border: "none", marginTop: "5px" }}>
                                <div className="col-lg-5 col-md-5 col-sm-5" style={{ marginBottom: "2px" }}>
                                    <input type="file" name="file_name" className="form-control form-control-sm" id="file_name" onChange={this.onFileChange} />
                                </div>
                                <div className="col-lg-7 col-md-7 col-sm-7"></div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <input type="text" name="fileDesc" id="fileDesc" className="form-control form-control-sm" placeholder="Description" value={this.state.fileDesc} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4" style={{ paddingLeft: "5px" }}>
                                    <button type="button" className="btn btn-secondary btn-sm" form_name={this.props.process} role="button" id={this.props.unq_id} form_id={this.props.formID} onClick={this.onFileUpload} disabled={window.location.pathname.includes('all') ? true : ""} >Upload File</button>
                                </div>
                            </div>
                            <div className="table-responsive" style={{ padding: "0px", width: "50rem" }}>
                                <table className="table table-hover table-striped table-bordered border-primary" style={{ margin: "0px" }}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>File Name</th>
                                            <th>Description</th>
                                            <th>Uploaded Date</th>
                                            <th>Uploaded By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.attachment_list.length > 0 ?
                                            this.state.attachment_list.map(i =>
                                                <tr>
                                                    <td style={{ textAlign: "center" }}>
                                                        <img src={DeleteIcon} id={i.id} unq_id={this.props.unq_id} style={{ width: "20px", marginRight: "5px", cursor: "pointer" }} alt="delete_icon" data-tip data-for="delete_ladder_tip" onClick={this.deleteAttacment} ></img>
                                                        <ReactTooltip id="delete_ladder_tip" place="right" effect="solid">
                                                            Delete
                                                        </ReactTooltip>
                                                    </td>
                                                    <td><a href={i.file} download className="doc_no">{i.file_name}</a> </td>
                                                    <td>{i.description}</td>
                                                    <td><Moment format="DD-MMM-YYYY h:mm:ss A">{i.modified_date}</Moment></td>
                                                    <td>{i.modified_by}</td>
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
                        </ul>
                    </div>
                </div>

            </>
        )
    }
}

export default attachmentTab
