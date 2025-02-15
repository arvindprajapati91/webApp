function changeHander(event) {
    const ele = document.getElementById(event.target.name + '_helper')
    if (ele !== null) {
        if (event.target.value === "") {
            if (ele.classList.contains("helper_hide")) {
                ele.classList.remove("helper_hide");
            }
        }
        else {
            ele.classList.add("helper_hide");
        }
        setTimeout(() => {
            ele.classList.add("helper_hide")
        }, process.env.REACT_APP_ERR_MSG_DUR);
    }
    document.getElementById(event.target.id).style.border = "1px solid grey"
    this.setState({
        [event.target.name]: '',
        [event.target.name]: event.target.value,
    });
}

export default changeHander;