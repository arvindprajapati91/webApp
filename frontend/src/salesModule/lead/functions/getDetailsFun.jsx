import moment from "moment";
import getDetailsFun from "../../../components/getDetailsFun";
import apiError from "../../../components/apiError";

async function getDetailsFunction(form_name) {
    this.setState({ loading: true });
    const queryParams = window.location.pathname;
    await getDetailsFun.call(this, queryParams, form_name);
    if (window.location.search.includes("prospect_no")) {
        try {
            await fetch(`/${process.env.REACT_APP_NAME}/prospect/fetchProspectDetails/${window.location.search}`)
                .then(async (res) => res.json())
                .then((data) => {
                    this.setState({
                        details: data
                    })
                })
        } catch (e) {
            let error = e.message;
            apiError.call(this, error)
        }
    }
    if (this.state.details !== "") {
        for (const [key, value] of Object.entries(this.state.details)) {
            if (key === "id") {
                this.setState({
                    obj_id: value
                })
            }
            else {
                this.setState({ [key]: value })
                
            }
        }
        if (this.state.type === "Organisation") {
            this.setState({
                company_name_visible: true,
            });
        }
        else{
            this.setState({
                company_name_visible: false,
            });
        }
        this.setState({ loading: false });
    }
}

export default getDetailsFunction;