function fieldValidation(msg, id) {
    this.setState({
        err_msg_visible: false,
    });
    this.setState({
        err_msg_visible: true,
        error_message: msg,
        loading: false,
    })
    setTimeout(() => {
        this.setState({
            err_msg_visible: false,
        });
    }, process.env.REACT_APP_ERR_MSG_DUR);
    document.getElementById(id).style.border = "1px solid red"
}


export default fieldValidation;