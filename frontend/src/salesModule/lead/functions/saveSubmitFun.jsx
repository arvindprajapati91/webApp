import apiError from "../../../components/apiError";
import postHeader from "../../../components/postHeader";
import successMessage from "../../../components/successMessage";

async function saveSubmitFun(event, url) {
    this.setState({
        loading: true,
    });
    const requestOptions = {
        method: "POST",
        headers: postHeader(),
        body: JSON.stringify(this.state),
    };
    try {
        await fetch(url, requestOptions)
            .then(async (res) => res.json())
            .then((data) => {
                if (data.status) {
                    if (data.status === "Data saved successfully"){
                        this.setState({
                            success_message: true,
                            err_msg_visible : false,
                            loading: false,
                            redirect: false,
                            successMessage: `${data.status}, Click on Next to continue`,
                        })
                        setTimeout(() => {
                            this.setState({
                                success_message: false,
                            });
                        }, process.env.REACT_APP_ERR_MSG_DUR);

                    }
                    else{
                        this.setState({
                            redirect: false,
                            loading: this.state.loading = false,
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
            });
    } catch (e) {
        let error = e.message;
        apiError.call(this,error)
    }
}

export default saveSubmitFun;
