import moment from "moment";
import getDetailsFun from "../../../components/getDetailsFun";

async function getDetailsFunction(form_name) {
    this.setState({ loading: true });
    const queryParams = window.location.pathname;
    await getDetailsFun.call(this, queryParams, form_name);
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
        this.setState({ loading: false });
    }
}

export default getDetailsFunction;