import React, { Component } from 'react';
import { Tabs, Tab } from "react-bootstrap";

class navTabs extends Component {
	constructor(props) {
		super(props);
	}

	// checkBoxChange = (event) => {
	//     if (event.target.checked === false) {
	//         var id_list = this.state[event.target.name]
	//         var id = id_list.indexOf(parseInt(event.target.value, 10))
	//         delete id_list[id]
	//         this.setState({ [event.target.name]: id_list });
	//     }
	//     if (event.target.checked === true) {
	//         this.setState({
	//             [event.target.name]: [...this.state[event.target.name], event.target.value],
	//         });
	//     }
	// }


	onCheckBox_Change = (e) => {
		this.props.CheckBoxChange(e)
	}

	defaultCheck = (access_list, id, value) => {
		const list = access_list
		const result = list.filter(list => list == id);
		console.log(result, value);
		if (result.length > 0) {
			alert(list + result + value + "true")
			return true
		}
		else {
			alert(list + result + value + "false")
			return false
		}

	}

	render() {
		let NavTabList = this.props.navTabList.sort(function (a, b) { return a.order - b.order; });

		return (
			<>
				<Tabs defaultActiveKey="Role Access" id="uncontrolled-tab-example" className="mb-3">
					{NavTabList.map(i =>
						<Tab eventKey={i.tab_name} title={i.tab_name}>
							<div className="card" style={{ width: "30rem" }}>
								<div className="card-header">
									{i.list_name}
								</div>
								<ul className="list-group list-group-flush">
									{NavTabList.map(k =>
										i.list_name === k.list_name ?
											k.data_list.map(rl =>
												<li className="list-group-item">
													<input type="checkbox" name={`${k.tab_type}_ids`} id={rl.key + '_' + rl.id} value={rl.id} className={`${k.tab_type}"_"${rl.id}`} onChange={(e) => this.onCheckBox_Change(e)}
														defaultChecked={k.access_list.includes(rl.id) ? true : false}

													/>
													<label for={rl.key + '_' + rl.id}>{rl.key + ' - ' + rl.value}</label>
												</li>
											)
											:
											''
									)}
								</ul>
							</div>
						</Tab>
					)}
				</Tabs>
			</>
		);
	}
}

export default navTabs;