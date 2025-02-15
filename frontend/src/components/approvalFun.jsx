import Modal from 'react-bootstrap/Modal';

function approvalFun(obj_id, approvalAPI, action) {
	this.setState({
		showModal: true
	})
	// var formData = new FormData();
	// formData.append('obj_id', obj_id)
	// formData.append('comments', this.state.comments)
	// formData.append('action', action)
	// fetch(approvalAPI,
	// 	{
	// 		mode: 'no-cors',
	// 		method: 'POST',
	// 		body: formData,
	// 	})
	// 	.then(async response => {
	// 		if (response.statusText === "Internal Server Error") {
	// 			this.setState({
	// 				loading : false
	// 			})
	// 			return alert(`${process.env.REACT_APP_ERROR_MSG}`);
	// 		}
	// 		const data = await response.json();
	// 		if (data.status) {
	// 			this.setState({
	// 				redirect:true,
	// 				listPath: this.state.listPath+"/pendingApproval"
	// 			})
	// 		}
	// 		else if (data.error_msg) {
	// 			this.setState({
	// 				err_msg_visible: true,
	// 				error_message: data.error_msg,
	// 				loading: false,
	// 			})
	// 			setTimeout(() => {
	// 				this.setState({
	// 					err_msg_visible: false,
	// 				});
	// 			}, process.env.REACT_APP_ERR_MSG_DUR);
	// 		};
	// 	})

	return (
		<>
			<Modal show={this.state.showModal} onHide={this.handleClose} backdrop="static" keyboard={false} size={"lg"} aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Header closeButton>
					<Modal.Title>{this.state.modalTitle}</Modal.Title>
				</Modal.Header>
				<Modal.Body>

				</Modal.Body>
				<Modal.Footer>
					<button type="button" className="btn btn-secondary" onClick={this.handleClose}>Close</button>
				</Modal.Footer>
			</Modal>
		</>


	);
}


export default approvalFun;
