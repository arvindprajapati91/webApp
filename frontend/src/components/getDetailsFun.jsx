import apiError from "./apiError";

async function getDetailsFun(queryParams, form_name) {
    if (queryParams.includes("=") || queryParams.includes("%")) {
        try {
            await fetch(queryParams)
                .then(async (res) => res.json())
                .then((details) => {
                    this.setState({
                        details: details
                    })
                });
        } catch (e) {
            let error = e.message;
            apiError.call(this, error)
        }
    } else {
        document.title = `${form_name} Create`;
        this.setState({ loading: false });
    }
}

export default getDetailsFun;
