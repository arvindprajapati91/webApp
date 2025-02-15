import React, { Component } from 'react'

const API_form_name = "processAppLadderULAPI"
const List_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}`
export class PendingApproval extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
        }
    }

    pendingApproval = async (e) => {
        var unq_id = e.target.attributes.unq_id.value
        var process = e.target.attributes.process.value
        // Audit Trail
        await fetch(`${List_Path}/?unq_id=${unq_id}&process=${process}`).then((response) => {
            if (response.statusText === "Internal Server Error") {
                var url = window.location.origin
                window.location.replace(url);
            }
            response.json().then((data) => {
                this.setState({
                    dataList: data,
                    loading: false
                });
                console.log(this.state.dataList)
            });
        });
    }

    render() {
        return (
            <>
                <div className="tab-pane fade" id="pending_approval" role="tabpanel" aria-labelledby="nav-pending_approval">
                    <div className="card" style={{ width: "68rem" }}>
                        <div className="card-header">
                            <span class="btn btn-primary btn-sm" style={{ width: "100px", marginLeft: "10px" }} onClick={this.pendingApproval} unq_id={this.props.unq_id} process={this.props.process}>Click Here </span> to Extract Pending Approval
                        </div>
                        <ul className="list-group list-group-flush">
                            <div className="row" style={{ backgroundColor: "white", border: "none", padding: "5px" }}>
                                <div className="table-responsive">
                                    <table className="table table-hover table-striped table-bordered border-primary tab_table" style={{ margin: "0px" }}>
                                        <thead>
                                            <tr>
                                                <th>Role / User Code</th>
                                                <th>Description</th>
                                                <th>User Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.dataList.length > 0 ?
                                                this.state.dataList.map(i =>
                                                    <tr>
                                                        <td>{i.Role_Code}</td>
                                                        <td>{i.Role_Desc}</td>
                                                        <td>{i.userName}</td>
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

export default PendingApproval
