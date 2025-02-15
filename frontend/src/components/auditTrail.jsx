import React, { Component } from 'react'
import Moment from "react-moment"

const API_form_name = "auditTrail"
const List_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}`

export class auditTrail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audit_trail: [],
        }
    }

    auditTrail = async (e) => {
        this.setState({ loading: true })
        var unq_id = e.target.attributes.unq_id.value
        var process = e.target.attributes.process.value
        // Audit Trail
        await fetch(`${List_Path}/ListAPI/?unq_id=${unq_id}&process=${process}`).then((response) => {
            if (response.statusText === "Internal Server Error") {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                this.setState({
                    audit_trail: data,
                    loading: false
                });
            });
        });
    }
    render() {
        return (
            <>
                <div className="tab-pane fade" id="audit_trail" role="tabpanel" aria-labelledby="nav-audit_trail">
                    <div className="card" style={{ width: "68rem" }}>
                        <div className="card-header">
                            <span className="btn btn-primary btn-sm" style={{ width: "100px", marginLeft: "10px" }} onClick={this.auditTrail} unq_id={this.props.unq_id} process={this.props.process}>Click Here </span> to Extract Audit Trail
                        </div>
                        <ul className="list-group list-group-flush">
                            <div className="row" style={{ backgroundColor: "white", border: "none", padding: "5px" }}>
                                <div className="table-responsive">
                                    <table className="table table-hover table-striped table-bordered border-primary tab_table" style={{ margin: "0px" }}>
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Action</th>
                                                <th>Date & Time</th>
                                                <th>Role</th>
                                                <th>Comments</th>
                                                <th>Change History</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.audit_trail.length > 0 ?
                                                this.state.audit_trail.map(i =>
                                                    <tr>
                                                        <td>{i.action_by}</td>
                                                        <td>{i.action_desc}</td>
                                                        <td><Moment format="DD-MMM-YYYY h:mm:ss A">{i.created_date}</Moment></td>
                                                        <td>{i.role}</td>
                                                        <td>{i.comments}</td>
                                                        <td>{i.change_history}</td>
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
                            </div>
                        </ul>
                    </div>
                </div>

            </>
        )
    }
}

export default auditTrail
