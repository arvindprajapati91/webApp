/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import FormName from "../../components/FormNameUpdatePage";
import Wrapper_ClickFun from "../../components/wrapperClickFun";
import ChangeHandler from "../../components/ChangeHandler";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/errorMessage";
import SuccessMessage from '../../components/successMessage';
import getDetailsFunction from "./functions/getDetailsFun";
import saveSubmitFun from "./functions/saveSubmitFun";
import FormStep1 from "./functions/formStep1";
import FormStep2 from "./functions/formStep2";

const API_form_name = "lead";
const List_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}`;
const form_name = "Lead";
const form_type = "Transaction";

const StateDic = {
    details: "",
    obj_id: "",
    prospect_number: "",
    lead_number: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company_name: "",
    type: "",
    position: "",
    contact_method: "",
    interested_in: "",
    response: "",
    contac_person: "",
    mode_of_contact: "",
    err_msg_visible: false,
    error_message: "",
    loading: true,
    redirect: false,
    company_name_visible: false,
    success_message: false,
    successMessage: "",
};

class CreateUpdatePage extends Component {
    constructor(props) {
        super(props);
        this.state = StateDic;
    }

    drpHandleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    typeHandleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.name === "type" && e.target.value === "Organisation") {
            this.setState({
                company_name_visible: true,
            });
        } else {
            this.setState({
                company_name_visible: false,
            });
        }
    };

    getDetails = async () => {
        getDetailsFunction.call(this, form_name);
    };

    componentDidMount() {
        this.getDetails();
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        var url = `${List_Path}/CreateUpdateAPI/`;
        saveSubmitFun.call(this, event, url);
    };

    stepFormClick = async (e) => {
        console.log(e)
        let stepID = e.target.id
        const steps = document.getElementsByClassName("step");
        const step_forms = document.getElementsByClassName("step_form");
        for (let i = 0; i < steps.length; i++) {
            steps[i].classList.remove("active");
        }
        for (let i = 0; i < step_forms.length; i++) {
            step_forms[i].classList.remove("active_form");
        }
        let formID = ""
        if (stepID.includes("btn")) {
            let form_ID = stepID.replace("_btn", "")
            formID = `form_${form_ID}`
            const stepEle = document.querySelector(`#${form_ID}`)
            console.log(stepEle)
            stepEle.offsetParent.classList.add("active")
        }
        else{
            formID = `form_${stepID}`
            e.target.offsetParent.classList.add("active")
        }
        const stepForm = document.getElementById(formID);
        stepForm.classList.add("active_form")
    }

    render() {
        const { error_message, redirect } = this.state;

        if (redirect) {
            return <Navigate to={List_Path} />;
        }

        return (
            <div className="wrapper">
                <div className="content-wrapper" onClick={Wrapper_ClickFun.bind(this)}>
                    <div className="row" style={{ marginLeft: "1px", marginRight: "1px" }}>
                        <FormName form_name_list={form_name} form_name={form_name} form_type={form_type} list_page={List_Path} auditTrailView={"Yes"} recordNo={this.state.prospect_number} tableName={API_form_name}></FormName>
                        <Loader load={this.state.loading}></Loader>
                        <ErrorMessage error_message={error_message} err_msg_visible={this.state.err_msg_visible}></ErrorMessage>
                        <SuccessMessage msg_visible={this.state.success_message} msg={this.state.successMessage}></SuccessMessage>
                    </div>
                    <div className="row" style={{ marginLeft: "1px", marginRight: "1px", border: "1px solid #d3d3d3" }}>
                        <div class="ui top attached steps" style={{ margin: "5px" }}>
                            <div class="active step">
                                <div class="content">
                                    <div class="title" id="step1" onClick={this.stepFormClick}>Lead Generate</div>
                                </div>
                            </div>
                            <div class="step">
                                <div class="content">
                                    <div class="title" id="step2" onClick={this.stepFormClick}>Contact</div>
                                </div>
                            </div>
                            <div class="step">
                                <div class="content">
                                    <div class="title" id="step3" onClick={this.stepFormClick}>Qutation/Proposal</div>
                                </div>
                            </div>
                            <div class="step">
                                <div class="content">
                                    <div class="title" id="step4" onClick={this.stepFormClick}>Negotiation</div>
                                </div>
                            </div>
                            <div class="step">
                                <div class="content">
                                    <div class="title" id="step5" onClick={this.stepFormClick}>Sales Order</div>
                                </div>
                            </div>
                        </div>
                        <FormStep1 state={this.state} handleChange={ChangeHandler.bind(this)} stepFormClick={this.stepFormClick} handleSubmit={this.handleSubmit}/>
                        <FormStep2 state={this.state} handleChange={ChangeHandler.bind(this)} stepFormClick={this.stepFormClick} handleSubmit={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUpdatePage;
