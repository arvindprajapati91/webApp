import React, { Component } from 'react'
import AddIcon from "../images/add_icon.png"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

export class CreateButton extends Component {
    render() {
        return (
            <div className="col-lg-9" style={{ margin: "0", textAlign: "right" }}>
                <Link to="/menu-master-create" className="btn btn-outline-success process-btn" style={{ textDecoration: "none" }}>
                    Create {this.props.form_name}
                    <img src={AddIcon} style={{ width: "20px", paddingBottom: "3px" }} alt="add_icon"></img>
                </Link>
            </div>
        )
    }
}

export default CreateButton
