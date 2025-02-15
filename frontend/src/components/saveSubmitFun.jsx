import PostHeader from "../components/postHeader";
import apiError from "./apiError";

async function saveSubmitFun(event, url) {
    this.setState({
        loading: true,
    });
    const requestOptions = {
        method: "POST",
        headers: PostHeader(),
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
                        })
                        setTimeout(() => {
                            this.setState({
                                success_message: false,
                            });
                        }, process.env.REACT_APP_ERR_MSG_DUR);

                    }
                    else{
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
            });
    } catch (e) {
        let error = e.message;
        apiError.call(this,error)
    }
}

export default saveSubmitFun;
