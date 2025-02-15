import React, { Component } from 'react';

class errorMessage extends Component {

	render() {

		return (
			<div id="error_alert" className={`alert alert-warning alert-dismissible ${this.props.err_msg_visible ? 'alert-shown' : 'alert-hidden'}`} role="alert" style={{ display: this.props.err_msg_visible ? 'block' : 'none' }}>
				<strong>Error :</strong> {this.props.error_message}
				{/* <button type="button" className="btn-close" onClick={this.errorClose}></button> */}
			</div>
		);
	}
}

export default errorMessage;