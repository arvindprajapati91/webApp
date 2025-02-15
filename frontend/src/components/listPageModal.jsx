import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';

class listPageModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			trailList: [],
			trailLoading: true,
			modalTitle: '',
		};
	};

	auditTrail = (e) => {
		this.setState({
			modalShow: true,
			modalTitle: "Audit Trail",
			doc_no: e.target.id,
		})
		// Audit Trail
		fetch(`/${process.env.REACT_APP_NAME}/auditTrail/transaction_audit_trail_view/?doc_id=${e.target.attributes.trn_id.value}&process=${e.target.attributes.process_name.value}`).then((response) => {
			if (response.statusText === "Internal Server Error") {
				var url = window.location.origin
                		window.location.replace(url);
			}
			response.json().then((data) => {
				this.setState({
					trailList: data,
					trailLoading: false
				})
			})
		})
	}

	pendingApproval = (e) => {
		this.setState({
			modalShow: true,
			modalTitle: "Pending for Approval",
			doc_no: e.target.id,
		})
		// Audit Trail
		fetch(`/${process.env.REACT_APP_NAME}/listPagePendingApprovalAPI/?doc_id=${e.target.attributes.trn_id.value}&process=${e.target.attributes.process_name.value}`).then((response) => {
			if (response.statusText === "Internal Server Error") {
				var url = window.location.origin
                		window.location.replace(url);
			}
			response.json().then((data) => {
				this.setState({
					trailList: data,
					trailLoading: false
				})
			})
		})
	}

	handleClose = (e) => {
		this.setState({
			modalShow: false,
			trailList: this.state.trailList = [],
			modalTitle: "",
			doc_no: "",
			trailLoading: true,
		})
	}

	render() {
		return (
			<>
				<Modal show={this.state.modalShow} onHide={this.handleClose} backdrop="static" keyboard={false} size={"lg"} aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton>
						<Modal.Title>{this.state.modalTitle}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="col-lg-12 col-md-12 col-sm-12 did-floating-label-content" style={{ margin: "0px" }}>
							<span style={{ fontSize: "15px", color: "brown" }}>
								{this.state.doc_no}
							</span>
						</div>
						<div className="ui active dimmer" style={{ display: this.state.trailLoading === true ? 'block' : 'none', width: "97%", left: "0" }}>
							<div class="ui text loader">Loading...</div>
						</div>
						<div className="table-responsive" style={{ height: "auto" }}>
							<table className="ui table-striped list_page_table" style={{ borderLeft: "1px solid #ccc" }}>
								<thead>
									<tr>
										{this.state.modalTitle === "Audit Trail" ?
											<>
												<th style={{ backgroundColor: "#f3f2f2", color: "rgb(49, 24, 97)" }}>User Name</th>
												<th style={{ backgroundColor: "#f3f2f2", color: "rgb(49, 24, 97)" }}>Action</th>
												<th style={{ backgroundColor: "#f3f2f2", color: "rgb(49, 24, 97)" }}>Action Data & Time</th>
												<th style={{ backgroundColor: "#f3f2f2", color: "rgb(49, 24, 97)" }}>Comments</th>
											</>
											:
											<>
												<th style={{ backgroundColor: "#f3f2f2", color: "rgb(49, 24, 97)" }}>Role Code</th>
												<th style={{ backgroundColor: "#f3f2f2", color: "rgb(49, 24, 97)" }}>Role Name</th>
												<th style={{ backgroundColor: "#f3f2f2", color: "rgb(49, 24, 97)" }}>Pending With</th>
											</>
										}
									</tr>
								</thead>
								<tbody>
									{this.state.trailList.length > 0 ?
										this.state.modalTitle === "Audit Trail" ?
											this.state.trailList.map(tl =>
												<tr>
													<td>{tl.user_name}</td>
													<td>{tl.action_desc}</td>
													<td><Moment format="DD-MMM-YYYY hh:mm:ss A">{tl.action_date}</Moment></td>
													<td>{tl.comments}</td>
												</tr>
											)
											:
											this.state.trailList.map(tl =>
												<tr>
													<td>{tl.role_code}</td>
													<td>{tl.role_desc}</td>
													<td>{tl.user_name}</td>
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

					</Modal.Body>
					<Modal.Footer>
						<button type="button" className="btn btn-secondary" onClick={this.handleClose}>Close</button>
					</Modal.Footer>
				</Modal>

			</>
		);
	}
}

export default listPageModal;