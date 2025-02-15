"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[608],{7135:(e,t,s)=>{s.d(t,{A:()=>i});const i=function(e){const t=document.getElementById(e.target.name+"_helper");null!==t&&(""===e.target.value?t.classList.contains("helper_hide")&&t.classList.remove("helper_hide"):t.classList.add("helper_hide"),setTimeout((()=>{t.classList.add("helper_hide")}),"10000")),document.getElementById(e.target.id).style.border="1px solid grey",this.setState({[e.target.name]:"",[e.target.name]:e.target.value})}},99422:(e,t,s)=>{s.d(t,{A:()=>g});var i=s(65043),a=s(40359),l=s(10615),n=s(35475),o=s(16023),d=s(50326),r=s(96209),c=s(25663),h=s(86178),p=s.n(h),m=s(70579);class u extends i.Component{constructor(e){super(e),this.sendFormRequest=e=>{this.props.parentCallback(e.target.id)},this.showAuditTrailUserMaster=async e=>{console.log(this.props.slug_id),this.setState({open:!0}),await fetch("/".concat("common-app","/userMaster/userMasterAuditTrailAPI/?slug=").concat(this.props.slug_id,"&page_size=").concat("100000000")).then((e=>{if("Internal Server Error"===e.statusText){var t=window.location.origin;window.location.replace(t)}e.json().then((e=>{this.setState({auditTrail:e.results})}))}))},this.showAuditTrail=async e=>{console.log(this.props.slug_id),this.setState({open:!0}),await fetch("/".concat("common-app","/auditTrail/auditTrailViewAPI/?record_no=").concat(this.props.recordNo,"&table_name=").concat(this.props.tableName,"&page_size=").concat("100000000")).then((e=>{if(!e.ok){var t=window.location.origin;window.location.replace(t)}e.json().then((e=>{this.setState({auditTrail:e.results})}))}))},this.state={importDisplay:this.props.importDisplay,open:!1,auditTrail:[]}}render(){const e=[{dataField:this.props.list_page.includes("userMaster")?"user_name":"record_no",text:this.props.list_page.includes("userMaster")?"User Name":"Record No"},{dataField:"process_desc",text:"Process"},{dataField:"action_desc",text:"Action"},{dataField:"action_by",text:"Action By"},{dataField:"action_date",text:"Action Date",formatter:e=>p()(e).format("DD-MMM-YYYY HH:MM:SS A")},{dataField:"changes",text:"Changes"}];return(0,m.jsxs)("div",{className:"row form-name-row",style:{marginTop:"3px"},children:[(0,m.jsx)("div",{className:"col-lg-2 col-md-2 col-sm-2",style:{margin:"0px",paddingTop:"3px"},children:(0,m.jsx)("span",{style:{color:"brown",fontSize:"15px"},children:this.props.form_name})}),(0,m.jsx)("div",{className:"col-lg-7 col-md-7 col-sm-7",style:{margin:"0",display:"flex"},children:(0,m.jsx)(a.A,{placement:"bottom",overlay:(0,m.jsx)(l.A,{id:"tooltip-disabled",children:"Please use this option to import data from Excel File"}),children:(0,m.jsxs)("div",{className:"input-group input-group-sm",style:{display:!0===this.state.importDisplay?"flex":"none"},children:[(0,m.jsx)("input",{className:"form-control",style:{width:"50%"},type:"file",id:"formFile",onChange:this.props.fileSelection}),(0,m.jsx)("span",{className:"btn btn-danger",style:{textDecoration:"none",color:"white"},onClick:this.props.import_data,children:"Import"})]})})}),(0,m.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3",style:{margin:"0px",paddingTop:"3px"},children:[(0,m.jsxs)(n.N_,{to:window.location.pathname.includes("pending")?"".concat(this.props.list_page,"/pendingApproval"):this.props.list_page,className:"back_to_list",style:{fontWeight:"500",color:"black",textDecoration:"none",cursor:"pointer",float:"right"},children:[(0,m.jsx)("svg",{style:{color:"brown",marginRight:"5px"},xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-left-circle-fill",viewBox:"0 0 16 16",children:(0,m.jsx)("path",{d:"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"})}),(0,m.jsx)("span",{style:{color:"black"},children:"Back to List"})]}),this.props.list_page.includes("userMaster")&&""!==this.props.slug_id?(0,m.jsxs)("div",{className:"audit_trail",id:"audit_trail",style:{fontWeight:"500",color:"black",textDecoration:"none",cursor:"pointer",float:"right",paddingLeft:"10px",paddingRight:"10px"},onClick:this.showAuditTrailUserMaster,children:[(0,m.jsxs)("svg",{height:"18px",version:"1.1",viewBox:"0 0 20 21",width:"20px",children:[(0,m.jsx)("title",{}),(0,m.jsx)("desc",{}),(0,m.jsx)("defs",{}),(0,m.jsx)("g",{fill:"none","fill-rule":"evenodd",id:"Page-1",stroke:"none","stroke-width":"1",children:(0,m.jsx)("g",{fill:"#004a5d",id:"Core",opacity:"0.9",transform:"translate(-464.000000, -254.000000)",children:(0,m.jsx)("g",{id:"history",transform:"translate(464.000000, 254.500000)",children:(0,m.jsx)("path",{d:"M10.5,0 C7,0 3.9,1.9 2.3,4.8 L0,2.5 L0,9 L6.5,9 L3.7,6.2 C5,3.7 7.5,2 10.5,2 C14.6,2 18,5.4 18,9.5 C18,13.6 14.6,17 10.5,17 C7.2,17 4.5,14.9 3.4,12 L1.3,12 C2.4,16 6.1,19 10.5,19 C15.8,19 20,14.7 20,9.5 C20,4.3 15.7,0 10.5,0 L10.5,0 Z M9,5 L9,10.1 L13.7,12.9 L14.5,11.6 L10.5,9.2 L10.5,5 L9,5 L9,5 Z",id:"Shape"})})})})]}),(0,m.jsx)("span",{style:{color:"black",paddingLeft:"3px"},children:"Audit Trail"})]}):"","Yes"===this.props.auditTrailView?(0,m.jsxs)("div",{className:"audit_trail",id:"audit_trail",style:{fontWeight:"500",color:"black",textDecoration:"none",cursor:"pointer",float:"right",paddingLeft:"10px",paddingRight:"10px"},onClick:this.showAuditTrail,children:[(0,m.jsxs)("svg",{height:"18px",version:"1.1",viewBox:"0 0 20 21",width:"20px",children:[(0,m.jsx)("title",{}),(0,m.jsx)("desc",{}),(0,m.jsx)("defs",{}),(0,m.jsx)("g",{fill:"none","fill-rule":"evenodd",id:"Page-1",stroke:"none","stroke-width":"1",children:(0,m.jsx)("g",{fill:"#004a5d",id:"Core",opacity:"0.9",transform:"translate(-464.000000, -254.000000)",children:(0,m.jsx)("g",{id:"history",transform:"translate(464.000000, 254.500000)",children:(0,m.jsx)("path",{d:"M10.5,0 C7,0 3.9,1.9 2.3,4.8 L0,2.5 L0,9 L6.5,9 L3.7,6.2 C5,3.7 7.5,2 10.5,2 C14.6,2 18,5.4 18,9.5 C18,13.6 14.6,17 10.5,17 C7.2,17 4.5,14.9 3.4,12 L1.3,12 C2.4,16 6.1,19 10.5,19 C15.8,19 20,14.7 20,9.5 C20,4.3 15.7,0 10.5,0 L10.5,0 Z M9,5 L9,10.1 L13.7,12.9 L14.5,11.6 L10.5,9.2 L10.5,5 L9,5 L9,5 Z",id:"Shape"})})})})]}),(0,m.jsx)("span",{style:{color:"black",paddingLeft:"3px"},children:"Audit Trail"})]}):""]}),this.props.list_page.includes("userMaster")?(0,m.jsxs)(o.A,{centered:!0,open:this.state.open,onClose:()=>this.setState({open:!1}),onOpen:()=>this.setState({open:!0}),children:[(0,m.jsxs)(o.A.Header,{children:["Audit Trail of ",this.props.trailFor]}),(0,m.jsx)(o.A.Content,{children:(0,m.jsx)(r.A,{keyField:"user_name",data:this.state.auditTrail,columns:e,striped:!0,hover:!0,condensed:!0,pagination:(0,c.Ay)(),noDataIndication:"No records found"})}),(0,m.jsx)(o.A.Actions,{children:(0,m.jsx)(d.A,{onClick:()=>this.setState({open:!1}),children:"OK"})})]}):(0,m.jsxs)(o.A,{centered:!0,open:this.state.open,onClose:()=>this.setState({open:!1}),onOpen:()=>this.setState({open:!0}),children:[(0,m.jsxs)(o.A.Header,{children:["Audit Trail of ",this.props.recordNo]}),(0,m.jsx)(o.A.Content,{children:(0,m.jsx)(r.A,{keyField:"user_name",data:this.state.auditTrail,columns:e,striped:!0,hover:!0,condensed:!0,pagination:(0,c.Ay)(),noDataIndication:"No records found"})}),(0,m.jsx)(o.A.Actions,{children:(0,m.jsx)(d.A,{onClick:()=>this.setState({open:!1}),children:"OK"})})]})]})}}const g=u},86985:(e,t,s)=>{s.d(t,{A:()=>i});const i=function(e){if(e.includes("Unexpected")||e.includes("Failed to fetch")){this.setState({loading:this.state.loading=!1}),alert("Session is expired!");var t=window.location.origin;window.location.replace(t)}else this.setState({loading:this.state.loading=!1})}},8900:(e,t,s)=>{s.d(t,{A:()=>n});var i=s(65043),a=s(70579);class l extends i.Component{render(){return(0,a.jsxs)("div",{id:"error_alert",className:"alert alert-warning alert-dismissible ".concat(this.props.err_msg_visible?"alert-shown":"alert-hidden"),role:"alert",style:{display:this.props.err_msg_visible?"block":"none"},children:[(0,a.jsx)("strong",{children:"Error :"})," ",this.props.error_message]})}}const n=l},13870:(e,t,s)=>{s.d(t,{A:()=>i});const i=function(e,t){this.setState({err_msg_visible:!1}),this.setState({err_msg_visible:!0,error_message:e,loading:!1}),setTimeout((()=>{this.setState({err_msg_visible:!1})}),"10000"),document.getElementById(t).style.border="1px solid red"}},18606:(e,t,s)=>{s.d(t,{A:()=>a});var i=s(86985);const a=async function(e,t){if(e.includes("=")||e.includes("%"))try{await fetch(e).then((async e=>e.json())).then((e=>{this.setState({details:e})}))}catch(s){let e=s.message;i.A.call(this,e)}else document.title="".concat(t," Create"),this.setState({loading:!1})}},32557:(e,t,s)=>{s.d(t,{A:()=>l});var i=s(8858),a=s(86985);const l=async function(e,t){this.setState({loading:!0});const s={method:"POST",headers:(0,i.A)(),body:JSON.stringify(this.state)};try{await fetch(t,s).then((async e=>e.json())).then((e=>{e.status?"Data saved successfully"===e.status?(this.setState({success_message:!0,err_msg_visible:!1,loading:!1}),setTimeout((()=>{this.setState({success_message:!1})}),"10000")):this.setState({redirect:!0}):e.error_msg&&(this.setState({err_msg_visible:!0,error_message:e.error_msg,loading:!1}),setTimeout((()=>{this.setState({err_msg_visible:!1})}),"10000"))}))}catch(l){let e=l.message;a.A.call(this,e)}}},9067:(e,t,s)=>{s.d(t,{A:()=>n});var i=s(65043),a=s(35475),l=s(70579);class n extends i.Component{constructor(){super(...arguments),this.sendFormRequest=e=>{this.props.parentCallback(e.target.id)}}render(){return(0,l.jsx)("div",{className:"row",style:{border:"none"},children:(0,l.jsxs)("div",{class:"bd-example submit_form",children:["Transaction"===this.props.form_type?window.location.pathname.includes("pending")?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("button",{type:"button",class:"btn btn-success",id:"approveBtn",onClick:this.props.approve,children:"Approve"}),(0,l.jsx)("button",{type:"button",class:"btn btn-info",id:"moreInfoBtn",onClick:this.props.moreInfoRejectModalShow,children:"More Info"}),(0,l.jsx)("button",{type:"button",class:"btn btn-danger",id:"rejectBtn",onClick:this.props.moreInfoRejectModalShow,children:"Reject"})]}):!1===this.props.disableButton?(0,l.jsxs)(l.Fragment,{children:[""===this.props.status||"DRAFT"===this.props.status?(0,l.jsx)("button",{type:"submit",class:"btn btn-primary",id:"draftBtn",onClick:this.props.onSubmit,disabled:this.props.disableButton,children:"Save in Draft"}):"",(0,l.jsx)("button",{type:"submit",class:"btn btn-success",id:"submitBtn",onClick:this.props.onSubmit,disabled:this.props.disableButton,children:"Submit"})]}):"":(0,l.jsx)("button",{type:"submit",class:"btn btn-success",id:"submitBtn",onClick:this.props.onSubmit,children:"Save & Close"}),(0,l.jsx)(a.N_,{className:"btn btn-secondary",to:window.location.pathname.includes("pending")?"".concat(this.props.list_page,"/pendingApproval"):this.props.list_page,style:{textDecoration:"none",color:"white"},children:"Back to List"})]})})}}},76309:(e,t,s)=>{s.d(t,{A:()=>i});const i=function(){if(window.innerWidth<="767"){const e=document.getElementById("side-nav-bar");e.classList.contains("sidebar-transform")&&e.classList.remove("sidebar-transform")}}},52608:(e,t,s)=>{s.r(t),s.d(t,{default:()=>v});var i=s(65043),a=s(73216),l=s(99422),n=s(76309),o=s(7135),d=s(42406),r=s(9067),c=s(8900),h=s(32557),p=s(18606),m=s(33077),u=s(22166),g=s(13870),x=s(70579);const _="/".concat("common-app","/").concat("inwardEntry"),b="Inward Entry",f="Master",j={details:"",obj_id:"",inward_no:"",applicant:"",locList:[],loc_desc:"",locSelected:"",depList:[],dep_desc:"",depSelected:"",allocate_to:"",receipt_mode:"",courier_company:"",awb_consignment_no:"",description:"",person_name:"",err_msg_visible:!1,error_message:"",loading:!0,redirect:!1,status:"",courierFieldDisplay:!1,handFieldDisplay:!1,awbFieldDisplay:!1};class y extends i.Component{constructor(e){super(e),this.drpHandleChange=e=>{this.setState({[e.target.name]:e.target.value}),"courier"===e.target.value?this.setState({courierFieldDisplay:!0,awbFieldDisplay:!0,handFieldDisplay:!1}):"hand"===e.target.value?this.setState({courierFieldDisplay:!1,handFieldDisplay:!0,awbFieldDisplay:!1}):"hand"===e.target.value?this.setState({courierFieldDisplay:!1,awbFieldDisplay:!1,handFieldDisplay:!0}):"post"===e.target.value&&this.setState({courierFieldDisplay:!1,awbFieldDisplay:!0,handFieldDisplay:!1})},this.getDetails=async()=>{if(""===this.props.navOrgName&&!1===this.props.adminAccess)return alert("Please change organisation to view details");this.setState({loading:!0});const e=window.location.pathname;await p.A.call(this,e,b),""!==this.state.details&&(this.setState({obj_id:this.state.details.id,inward_no:this.state.details.inward_no,applicant:this.state.details.applicant,allocate_to:this.state.details.allocate_to,receipt_mode:this.state.details.receipt_mode,courier_company:this.state.details.courier_company,awb_consignment_no:this.state.details.awb_consignment_no,description:this.state.details.description,depSelected:this.state.details.dep_selected,locSelected:this.state.details.loc_selected,person_name:this.state.details.person_name,status:this.state.details.status,loading:!1}),"courier"===this.state.details.receipt_mode?this.setState({courierFieldDisplay:!0,awbFieldDisplay:!0,handFieldDisplay:!1}):"hand"===this.state.details.receipt_mode?this.setState({courierFieldDisplay:!1,handFieldDisplay:!0,awbFieldDisplay:!1}):"hand"===this.state.details.receipt_mode?this.setState({courierFieldDisplay:!1,awbFieldDisplay:!1,handFieldDisplay:!0}):"post"===this.state.details.receipt_mode&&this.setState({courierFieldDisplay:!1,awbFieldDisplay:!0,handFieldDisplay:!1}))},this.masterList=async()=>{let e="";this.setState({adminAccess:this.state.adminAccess=this.props.adminAccess,navOrgName:this.state.navOrgName=this.props.navOrgName}),e=!1===this.state.adminAccess?"org=".concat(this.state.navOrgName,"&"):"",await fetch("/".concat("common-app","/locationMaster/ListAPI/?").concat(e,"drpList=Y&page_size=").concat("100000000")).then((e=>{if("Internal Server Error"===e.statusText){var t=window.location.origin;window.location.replace(t)}e.json().then((e=>{const t=[];if(e.results.length>0){e.results.map((e=>t.push({key:e.id,value:e.loc_code,text:e.loc_desc}))),this.setState({locList:this.state.locList=t});var s=this.state.loc_desc,i=this.state.locList.filter((e=>{let{text:t}=e;return s===t}));i.length>0&&this.setState({locSelected:this.state.locSelected=i[0].value})}}))})),await fetch("/".concat("common-app","/departmentMaster/ListAPI/?").concat(e,"drpList=Y&page_size=").concat("100000000")).then((e=>{if("Internal Server Error"===e.statusText){var t=window.location.origin;window.location.replace(t)}e.json().then((e=>{const t=[];if(e.results.length>0){e.results.map((e=>t.push({key:e.id,value:e.dep_code,text:e.dep_desc}))),this.setState({depList:this.state.depList=t});var s=this.state.dep_desc,i=this.state.depList.filter((e=>{let{text:t}=e;return s===t}));i.length>0&&this.setState({depSelected:this.state.depSelected=i[0].value})}}))}))},this.handleSubmit=async e=>{if(e.preventDefault(),""===this.state.applicant||null===this.state.applicant){let e="Please select Applicant before Save";return g.A.call(this,e,"applicant")}if(""===this.state.locSelected||null===this.state.locSelected){let e="Please select Location before Save";return g.A.call(this,e,"loc_desc")}if(""===this.state.receipt_mode||null===this.state.receipt_mode){let e="Please select Receipt Mode before Save";return g.A.call(this,e,"receipt_mode")}var t="".concat(_,"/CreateUpdateAPI/");h.A.call(this,e,t)},this.locChange=(e,t)=>{if(this.setState({loc_desc:this.state.loc_desc=e.target.innerText,locSelected:this.state.locSelected=t}),""===this.state.locSelected){const e="locanisation";return this.setState({loading:!1}),this.requiredElement(e)}},this.depChange=(e,t)=>{if(this.setState({dep_desc:this.state.dep_desc=e.target.innerText,depSelected:this.state.depSelected=t}),""===this.state.depSelected){const e="department";return this.setState({loading:!1}),this.requiredElement(e)}},this.state=j}componentDidMount(){this.getDetails(),this.masterList()}render(){const{error_message:e,redirect:t}=this.state;return t?(0,x.jsx)(a.C5,{to:_}):(0,x.jsx)("div",{className:"wrapper",children:(0,x.jsx)("div",{className:"content-wrapper",onClick:n.A.bind(this),children:(0,x.jsxs)("form",{id:"app-form",onSubmit:this.handleSubmit,autoComplete:"off",children:[(0,x.jsx)(l.A,{form_name_list:b,form_name:b,form_type:f,list_page:_,auditTrailView:"Yes",recordNo:this.state.inward_no,tableName:"inward_entry"}),(0,x.jsx)(d.A,{load:this.state.loading}),(0,x.jsx)(c.A,{error_message:e,err_msg_visible:this.state.err_msg_visible}),(0,x.jsxs)("div",{className:"row",children:[(0,x.jsx)("p",{className:"title_label",children:"General Information"}),(0,x.jsxs)("div",{className:"col-lg-2 col-md-2 col-sm-2 did-floating-label-content",children:[(0,x.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"inward_no",id:"inward_no",value:this.state.inward_no,onChange:o.A.bind(this),onClick:o.A.bind(this),readOnly:!0,disabled:!0}),(0,x.jsx)("label",{className:"did-floating-label",children:"Inward No."})]}),(0,x.jsxs)("div",{className:"col-lg-2 col-md-2 col-sm-2 did-floating-label-content",children:[(0,x.jsxs)("select",{className:"did-floating-select",name:"applicant",id:"applicant",value:this.state.applicant,onChange:this.drpHandleChange,onClick:this.drpHandleChange,children:[(0,x.jsx)("option",{value:"",children:"---Select---"}),(0,x.jsx)("option",{value:"vendor",children:"Vendor"}),(0,x.jsx)("option",{value:"buyer",children:"Buyer"}),(0,x.jsx)("option",{value:"agent",children:"Agent"})]}),(0,x.jsxs)("label",{className:"did-floating-label",children:["Applicant ",(0,x.jsx)("span",{className:"mandatory_field",children:"*"})]})]}),(0,x.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,x.jsx)(m.A,{className:"did-floating-input",name:"loc_desc",id:"loc_desc",value:this.state.locSelected,clearable:!0,placeholder:this.state.locList.length>0?"Select State":"Loading...",fluid:!0,search:!0,required:!0,selection:!0,options:this.state.locList,loading:!(this.state.locList.length>0),disabled:!(this.state.locList.length>0),onChange:(e,t)=>{this.locChange(e,t.value)}}),(0,x.jsxs)("label",{className:"did-floating-label",children:["Location ",(0,x.jsx)("span",{className:"mandatory_field",children:"*"})]}),(0,x.jsx)("div",{className:"form-helper helper_hide",id:"loc_desc_helper",children:"Required"})]}),(0,x.jsxs)("div",{className:"col-lg-2 col-md-2 col-sm-2 did-floating-label-content",children:[(0,x.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"status",id:"status",value:this.state.status,readOnly:!0,disabled:!0}),(0,x.jsx)("label",{className:"did-floating-label",children:"Status"})]}),(0,x.jsx)("p",{className:"title_label",children:"Allocation Information"}),(0,x.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,x.jsx)(m.A,{className:"did-floating-input",name:"dep_desc",id:"dep_desc",value:this.state.depSelected,clearable:!0,placeholder:this.state.depList.length>0?"Select State":"Loading...",fluid:!0,search:!0,required:!0,selection:!0,options:this.state.depList,loading:!(this.state.depList.length>0),disabled:!(this.state.depList.length>0),onChange:(e,t)=>{this.depChange(e,t.value)}}),(0,x.jsxs)("label",{className:"did-floating-label",children:["Department ",(0,x.jsx)("span",{className:"mandatory_field",children:"*"})]}),(0,x.jsx)("div",{className:"form-helper helper_hide",id:"dep_desc_helper",children:"Required"})]}),(0,x.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,x.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"allocate_to",id:"allocate_to",required:!0,value:this.state.allocate_to,onChange:o.A.bind(this),onClick:o.A.bind(this)}),(0,x.jsxs)("label",{className:"did-floating-label",children:["Allocate To ",(0,x.jsx)("span",{className:"mandatory_field",children:"*"})]}),(0,x.jsx)("div",{className:"form-helper helper_hide",id:"allocate_to_helper",children:"Required"})]}),(0,x.jsx)("p",{className:"title_label",children:"Inward Details"}),(0,x.jsxs)("div",{className:"col-lg-2 col-md-2 col-sm-2 did-floating-label-content",children:[(0,x.jsxs)("select",{className:"did-floating-select",name:"receipt_mode",id:"receipt_mode",value:this.state.receipt_mode,onChange:this.drpHandleChange,onClick:this.drpHandleChange,onFocus:this.drpHandleChange,children:[(0,x.jsx)("option",{value:"",children:"---Select---"}),(0,x.jsx)("option",{value:"courier",children:"Courier"}),(0,x.jsx)("option",{value:"hand",children:"Hand"}),(0,x.jsx)("option",{value:"post",children:"Post"})]}),(0,x.jsxs)("label",{className:"did-floating-label",children:["Receipt Mode ",(0,x.jsx)("span",{className:"mandatory_field",children:"*"})]})]}),(0,x.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",style:{display:this.state.courierFieldDisplay?"flex":"none"},children:[(0,x.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"courier_company",id:"courier_company",required:this.state.courierFieldDisplay,value:this.state.courier_company,onChange:o.A.bind(this),onClick:o.A.bind(this)}),(0,x.jsxs)("label",{className:"did-floating-label",children:["Courier Company ",(0,x.jsx)("span",{className:"mandatory_field",children:"*"})]}),(0,x.jsx)("div",{className:"form-helper helper_hide",id:"courier_company_helper",children:"Required"})]}),(0,x.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",style:{display:this.state.handFieldDisplay?"flex":"none"},children:[(0,x.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"person_name",id:"person_name",required:this.state.handFieldDisplay,value:this.state.person_name,onChange:o.A.bind(this),onClick:o.A.bind(this)}),(0,x.jsxs)("label",{className:"did-floating-label",children:["Person Name ",(0,x.jsx)("span",{className:"mandatory_field",children:"*"})]}),(0,x.jsx)("div",{className:"form-helper helper_hide",id:"person_name_helper",children:"Required"})]}),(0,x.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",style:{display:this.state.awbFieldDisplay?"flex":"none"},children:[(0,x.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"awb_consignment_no",id:"awb_consignment_no",required:this.state.awbFieldDisplay,value:this.state.awb_consignment_no,onChange:o.A.bind(this),onClick:o.A.bind(this)}),(0,x.jsxs)("label",{className:"did-floating-label",children:["AWB/Consignment Number ",(0,x.jsx)("span",{className:"mandatory_field",children:"*"})]}),(0,x.jsx)("div",{className:"form-helper helper_hide",id:"awb_consignment_no_helper",children:"Required"})]}),(0,x.jsx)("div",{className:"col-lg-12 col-md-12 col-sm-12 did-floating-label-content",children:(0,x.jsxs)("div",{className:"col-lg-6 col-md-6 col-sm-6 did-floating-label-content",children:[(0,x.jsx)("textarea",{className:"did-floating-input",type:"text",placeholder:" ",cols:"80",rows:"4",name:"description",id:"description",value:this.state.description,onChange:o.A.bind(this),onClick:o.A.bind(this)}),(0,x.jsx)("label",{className:"did-floating-label",children:"Description"})]})}),(0,x.jsx)(r.A,{form_type:f,list_page:_})]})]})})})}}const v=(0,u.Ng)((e=>({adminAccess:e.adminAccess,navOrgName:e.navOrgName})))(y)}}]);
//# sourceMappingURL=608.916ae2ed.chunk.js.map