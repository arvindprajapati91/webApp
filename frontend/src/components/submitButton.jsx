import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class submitButton extends Component {
    sendFormRequest = (e) => {
        this.props.parentCallback(e.target.id);
    }

    render() {
        return (
            <div className="row" style={{ border: "none" }}>
                <div class="bd-example submit_form">
                    {this.props.trnStatus === "Draft" || this.props.trnStatus === "" }
                    {this.props.draftBtn === "Yes" && (window.location.pathname.includes("modify") || window.location.pathname.includes("CreateUpdate")) ? 
                        <button type='submit' class="btn btn-primary" id="draftBtn" onClick={this.props.onSubmit}>Draft</button>
                        :
                        ''
                    }
                    {this.props.submitBtn === "Yes" && (window.location.pathname.includes("modify") || window.location.pathname.includes("CreateUpdate")) ?
                        <button type='submit' class="btn btn-success" id="submitBtn" onClick={this.props.onSubmit}>Submit</button>
                        :
                        <button type='submit' class="btn btn-success" id="save-close-btn" onClick={this.props.onSubmit}>Save & Close</button>
                    }
                    <Link className="btn btn-secondary" to={window.location.pathname.includes("pending") ? `${this.props.list_page}/pendingApproval` : this.props.list_page} style={{ textDecoration: 'none', color: "white" }}>
                        Back to List
                    </Link>
                </div>
            </div>

        )
    }
}
