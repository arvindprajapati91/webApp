async function saveSubmitFormData(e,url) {
    e.preventDefault();
    this.setState({
        loading: true,
    });
    let csrftoken = ""
    await fetch(`/${process.env.REACT_APP_NAME}/get_csrf/`)
        .then(async (res) => res.json())
        .then((details) => {
            csrftoken = details.token
        });
    var formData = new FormData();
    Object.entries(this.state).forEach(([k, v]) => {
        formData.append(k, v)
    })
    try {
        await fetch(`${url}`, {
            method: 'POST',
            body: formData,
            headers: {
                "contentType": 'multipart/form-data',
                "X-CSRFToken": csrftoken
            }
        })
            .then(async (res) => res.json())
            .then((data) => {
                if (data.status) {
                    if (data.status === "Data saved successfully") {
                        this.setState({
                            success_message: true,
                            err_msg_visible: false,
                            loading: false,
                        })
                        setTimeout(() => {
                            this.setState({
                                success_message: false,
                            });
                        }, process.env.REACT_APP_ERR_MSG_DUR);

                    }
                    else {
                        this.setState({
                            redirect: true,
                        });
                    }

                } else if (data.error_msg) {
                    this.setState({
                        err_msg_visible: true,
                        error_message: data.error_msg,
                        loading: false,
                    });
                    setTimeout(() => {
                        this.setState({
                            err_msg_visible: false,
                        });
                    }, process.env.REACT_APP_ERR_MSG_DUR);
                }
            })
    }
    catch (e) {
        let error = e.message;
        this.setState({
            err_msg_visible: true,
            error_message: error,
            loading: false,
            logData: []
        });
        setTimeout(() => {
            this.setState({
                err_msg_visible: false,
            });
        }, process.env.REACT_APP_ERR_MSG_DUR);
        // apiError.call(this, error)
    }
}

export default saveSubmitFormData;
