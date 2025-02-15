function checkBoxChange(event) {
	if (event.target.checked === false) {
		var id_list = this.state[event.target.name]
		var id = id_list.indexOf(parseInt(event.target.value, 10))
		delete id_list[id]
		this.setState({ [event.target.name]: id_list });
	}
	if (event.target.checked === true) {
		this.setState({
			[event.target.name]: [...this.state[event.target.name], event.target.value],
		});
	}

}

export default checkBoxChange;
