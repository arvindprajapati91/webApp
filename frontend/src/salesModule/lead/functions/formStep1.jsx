import React from 'react';

const FormStep1 = ({ state, handleChange, stepFormClick, handleSubmit }) => (
    <form id="form_step1" onSubmit={handleSubmit} className="active_form step_form" autoComplete="off" style={{ padding: "0px" }}>
        <div className="row" style={{ border: "none", marginTop: "5px" }}>
            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                <input className="did-floating-input" type="text" placeholder=" " name="prospect_number" id="prospect_number" value={state.prospect_number} onChange={handleChange} readOnly={true} disabled={true} />
                <label className="did-floating-label">Prospect Number</label>
                <div className="form-helper helper_hide" id="prospect_number_helper">
                    Required
                </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                <input className="did-floating-input" type="text" placeholder=" " name="lead_number" id="lead_number" value={state.lead_number} onChange={handleChange} readOnly={true} disabled={true} />
                <label className="did-floating-label">Lead Number</label>
                <div className="form-helper helper_hide" id="lead_number_helper">
                    Required
                </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                <input className="did-floating-input" type="text" placeholder=" " name="first_name" id="last_name" required value={state.first_name} onChange={handleChange} />
                <label className="did-floating-label">First Name</label>
                <div className="form-helper helper_hide" id="first_name_helper">
                    Required
                </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                <input className="did-floating-input" type="text" placeholder=" " name="last_name" id="last_name" required value={state.last_name} onChange={handleChange} />
                <label className="did-floating-label">Last Name</label>
                <div className="form-helper helper_hide" id="last_name_helper">
                    Required
                </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                <input className="did-floating-input" type="email" placeholder=" " name="email" id="email" required value={state.email} onChange={handleChange} />
                <label className="did-floating-label">Email</label>
                <div className="form-helper helper_hide" id="email_helper">
                    Required
                </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                <input className="did-floating-input" type="text" placeholder=" " name="phone" id="phone" required value={state.phone} onChange={handleChange} />
                <label className="did-floating-label">Phone</label>
                <div className="form-helper helper_hide" id="phone_helper">
                    Required
                </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                <select className="did-floating-select" name="type" id="type" value={state.type} required onChange={handleChange}>
                    <option value=""></option>
                    <option value="Individual">Individual</option>
                    <option value="Organisation">Organisation</option>
                </select>
                <label className="did-floating-label">Type</label>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content" style={{ display: state.company_name_visible ? "block" : "none" }}>
                <input className="did-floating-input" type="text" placeholder=" " name="company_name" id="company_name" required={state.company_name_visible} value={state.company_name} onChange={handleChange} />
                <label className="did-floating-label">Company Name</label>
                <div className="form-helper helper_hide" id="company_name_helper">
                    Required
                </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content" style={{ display: state.company_name_visible ? "block" : "none" }}>
                <input className="did-floating-input" type="text" placeholder=" " name="position" id="position" required={state.position_visible} value={state.position} onChange={handleChange} />
                <label className="did-floating-label">Position / Desigtation</label>
                <div className="form-helper helper_hide" id="position_helper">
                    Required
                </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                <select className="did-floating-select" name="channel_mode" id="channel_mode" value={state.channel_mode} required onChange={handleChange}>
                    <option value=""></option>
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="SMS">SMS</option>
                    <option value="Call">Call</option>
                </select>
                <label className="did-floating-label">Channel Mode</label>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
                <select className="did-floating-select" name="mode_of_communication" id="mode_of_communication" value={state.mode_of_communication} required onChange={handleChange}>
                    <option value=""></option>
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="SMS">SMS</option>
                    <option value="Call">Call</option>
                </select>
                <label className="did-floating-label">Mode of Communication</label>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-7 did-floating-label-content">
                <textarea className="did-floating-input" type="text" placeholder=" " cols="60" rows="7" name="interested_in" id="interested_in" required value={state.interested_in} onChange={handleChange} />
                <label className="did-floating-label">Interested In</label>
                <div className="form-helper helper_hide" id="interested_in_helper">Required</div>
            </div>
            <div className="row" style={{ border: "none" }}>
                <div className="bd-example submit_form">
                    <button className="btn btn-success" id="step2_btn" onClick={handleChange}>Save</button>
                    <span className="btn btn-secondary" id="step2_btn" onClick={stepFormClick}>Next</span>
                </div>
            </div>
        </div>
    </form>
);

export default FormStep1;