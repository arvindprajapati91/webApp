import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

class successMessage extends Component {
  render() {
    return (
      <>
        <div
          className={`alert alert-success alert-dismissible ${
            this.props.msg_visible ? "alert-shown" : "alert-hidden"
          }`}
          role="alert"
          style={{ display: this.props.msg_visible ? "flex" : "none" }}
        >
          <div style={{ display: this.props.msg_visible ? "flex" : "none" }}>
            <FontAwesomeIcon
              icon={{ fas, faCircleCheck }}
              className="success_circle_check"
            />
            <strong>{this.props.msg}</strong>
          </div>
        </div>
      </>
    );
  }
}

export default successMessage;
