// import React, { Component } from 'react';
// import {Navigate } from "react-router-dom";
// import FormName from "../../components/FormNameUpdatePage"
// import Wrapper_ClickFun from "../../components/wrapperClickFun"
// import ChangeHandler from "../../components/ChangeHandler"
// import Loader from "../../components/Loader"
// import SubmitButton from '../../components/submitButton';
// import PostHeader from '../../components/postHeader'
// import ErrorMessage from '../../components/errorMessage';

// const API_form_name = "businessLine"
// const List_Path = `/${process.env.REACT_APP_NAME}/${API_form_name}`
// const form_name = 'Business Line';
// const form_type = "Master"

// const StateDic = {
//     obj_id: '',
//     bl_code: '',
//     bl_desc: '',
//     status: '1',
//     err_msg_visible: false,
//     error_message: '',
//     loading: true,
//     redirect: false,
// };

// class CreateUpdatePage extends Component {

//     constructor(props) {
//         super(props);
//         this.state = StateDic
//         // this.handleSubmit = this.handleSubmit.bind(this);
//     };

//     drpHandleChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value,
//         })
//     }


//     getDetails = () => {
//         this.setState({ loading: true })
//         const queryParams = window.location.pathname
//         if (queryParams.includes("=") || queryParams.includes("%")) {
//             fetch(queryParams).then((response) => {
//                 if (response.statusText === "Internal Server Error") {
//                     this.setState({
//                         loading : false
//                     })
//                     return alert(`${process.env.REACT_APP_ERROR_MSG}`);
//                 }
//                 response.json().then((details) => {
//                     if (details.status === true) {
//                         this.setState({
//                             status: '1'
//                         });
//                     }
//                     else {
//                         this.setState({
//                             status: '0'
//                         })
//                     };
//                     this.setState({
//                         obj_id: details.id,
//                         bl_code: details.bl_code,
//                         bl_desc: details.bl_desc,
//                         loading: false
//                     });
//                 });

//             })
//         }
//         else {
//             document.title = `${form_name} Create`;
//             this.setState({ loading: false })
//         }
//     };

//     componentDidMount(){
//         this.getDetails()
//     }

//     handleSubmit = (event) => {
//         this.setState({
//             loading: true,
//         })
//         const requestOptions = {
//             method: 'POST',
//             headers: PostHeader(),
//             body: JSON.stringify(this.state)
//         };
//         fetch(`${List_Path}/CreateUpdateAPI/`, requestOptions)
//             .then(async response => {
//                 if (response.statusText === "Internal Server Error") {
//                     this.setState({
//                         loading : false
//                     })
//                     return alert(`${process.env.REACT_APP_ERROR_MSG}`);
//                 }
//                 const data = await response.json();
//                 if (data.status) {
//                     this.setState({
//                         redirect:true,
//                     })
//                 }
//                 else if (data.error_msg) {
//                     const val = false
//                     this.setState({
//                         err_msg_visible: true,
//                         error_message: data.error_msg,
//                         loading: false,
//                     })
//                     setTimeout(() => {
//                         this.setState({
//                             err_msg_visible: false,
//                         });
//                     }, process.env.REACT_APP_ERR_MSG_DUR);
//                 };
//             })
//         event.preventDefault();
//     }


//     render() {
//         const { error_message,redirect } = this.state;

//         if (redirect) {
//             return <Navigate to={List_Path} />;
//         }

//         return (
//             <div className="wrapper">
//                 <div className="content-wrapper" onClick={Wrapper_ClickFun.bind(this)}>
//                     <form id="app-form" onSubmit={this.handleSubmit} autoComplete="off">
//                         <FormName form_name_list={form_name} form_name={form_name} form_type={form_type} list_page={List_Path}></FormName>
//                         <Loader load={this.state.loading}></Loader>
//                         <ErrorMessage error_message={error_message} err_msg_visible={this.state.err_msg_visible}></ErrorMessage>
//                         <div className="row">
//                             <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
//                                 <input className="did-floating-input" type="text" placeholder=" " name="bl_code" id="bl_code" required value={this.state.bl_code} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
//                                 <label className="did-floating-label">BL Code</label>
//                                 <div className="form-helper helper_hide" id="bl_code_helper">Required</div>
//                             </div>

//                             <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
//                                 <input className="did-floating-input" type="text" placeholder=" " name="bl_desc" id="bl_desc" required value={this.state.bl_desc} onChange={ChangeHandler.bind(this)} onClick={ChangeHandler.bind(this)} />
//                                 <label className="did-floating-label">BL Name</label>
//                                 <div className="form-helper helper_hide" id="bl_desc_helper">Required</div>
//                             </div>

//                             <div className="col-lg-3 col-md-3 col-sm-3 did-floating-label-content">
//                                 <select className="did-floating-select" name="status" id="status" value={this.state.status} onChange={this.drpHandleChange} onClick={this.drpHandleChange} onFocus={this.drpHandleChange}>
//                                     <option value="1">Active</option>
//                                     <option value="0">InActive</option>
//                                 </select>
//                                 <label className="did-floating-label">Status</label>
//                             </div>
//                             <SubmitButton form_type={form_type} list_page={List_Path}></SubmitButton>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         )

//     }
// }

// export default CreateUpdatePage;