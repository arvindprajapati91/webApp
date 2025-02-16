import React from 'react';

const FormStep2 = ({ state, handleChange }) => (
    <form id="form_step2" className="step_form" autoComplete="off" style={{ padding: "0px" }}>
        <div className="row" style={{ border: "none", marginTop: "5px" }}>
            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                <input className="did-floating-input" type="text" placeholder=" " name="contac_person" id="contac_person" required value={state.contac_person} onChange={handleChange}/>
                <label className="did-floating-label">Contact Person</label>
                <div className="form-helper helper_hide" id="contac_person_helper">
                    Required
                </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                <select className="did-floating-select" name="mode_of_contact" id="mode_of_contact" value={state.mode_of_contact} required onChange={handleChange}>
                    <option value=""></option>
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="SMS">SMS</option>
                    <option value="Call">Call</option>
                </select>
                <label className="did-floating-label">Mode of Contact</label>
            </div>

            <div className="col-lg-7 col-md-7 col-sm-7 did-floating-label-content">
                <textarea className="did-floating-input" type="text" placeholder=" " cols="60" rows="7" name="response" id="response" required value={state.response} onChange={handleChange} />
                <label className="did-floating-label">Response</label>
                <div className="form-helper helper_hide" id="response_helper">Required</div>
            </div>

            <div className="row" style={{ border: "none" }}>
                <div className="bd-example submit_form">
                    <button className="btn btn-success" id="save-close-btn" onClick={handleChange}>Save</button>
                    <button className="btn btn-secondary" id="submitBtn" onClick={handleChange}>Next</button>
                </div>
            </div>
        </div>
    </form>
);

export default FormStep2;