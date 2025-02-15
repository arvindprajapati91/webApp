import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Navigate } from 'react-router-dom';
import ChangeHandler from '../components/ChangeHandler'

class moreInfoRejectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            redirect: false,
            obj_id: '',
            approvalAPI: '',
            action: '',
            List_Path: '',
            listPath: '',
            comments: '',
        };
    };

    actionFun = (e, obj_id, doc_no, approvalAPI, List_Path) => {
        this.setState({
            modalShow: true,
            modalTitle: e.target.id === "moreInfoBtn" ? "More Info" : "Reject",
            doc_no: doc_no,
            obj_id: obj_id,
            approvalAPI: approvalAPI,
            List_Path: List_Path,
            action: e.target.id
        })
    }

    approveAction = (e) => {
        if (this.state.comments === "") {
            return alert("Please update comments for more info")
        }
        else {
            var formData = new FormData();
            formData.append('obj_id', this.state.obj_id)
            formData.append('comments', this.state.comments)
            formData.append('action', this.state.action)
            fetch(this.state.approvalAPI,
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
                        this.setState({
                            redirect: true,
                            listPath: this.state.List_Path + "/pendingApproval"
                        })
                    }
                    else if (data.error_msg) {
                        this.setState({
                            err_msg_visible: true,
                            error_message: data.error_msg,
                            loading: false,
                        })
                        setTimeout(() => {
                            this.setState({
                                err_msg_visible: false,
                            });
                        }, process.env.REACT_APP_ERR_MSG_DUR);
                    };
                })
        }

    }

    handleClose = (e) => {
        this.setState({
            modalShow: false,
        })
    }

    render() {

        const { redirect } = this.state;

        if (redirect) {
            return <Navigate to={this.state.listPath} />;
        }
        return (
            <>
                <Modal show={this.state.modalShow} onHide={this.handleClose} backdrop="static" keyboard={false} size={"lg"} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Please put comments for
                            {this.state.action === "moreInfoBtn" ?
                                "More Info"
                                :
                                "Reject"
                            }

                        </h4>
                        <div className="col-lg-12 col-md-12 col-sm-12 did-floating-label-content">
                            <textarea className="did-floating-input" type="text" placeholder=" " cols="60" rows="4" name="comments" id="comments" value={this.state.comments} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
                            <label className="did-floating-label">Comments</label>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-danger" onClick={this.handleClose}>Close</button>
                        {this.state.action === "moreInfoBtn" ?
                            <button type="button" className="btn btn-success" id="ModalBtn" onClick={this.approveAction}>More Info</button>
                            :
                            <button type="button" className="btn btn-success" id="ModalBtn" onClick={this.approveAction}>Reject</button>
                        }

                    </Modal.Footer>
                </Modal>

            </>
        );
    }
}

export default moreInfoRejectModal;