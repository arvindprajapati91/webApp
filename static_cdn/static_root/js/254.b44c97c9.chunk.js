"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[254],{90254:(t,e,s)=>{s.a(t,(async(t,i)=>{try{s.r(e),s.d(e,{default:()=>v});var a=s(65043),n=s(73216),o=s(99422),l=s(76309),r=s(7135),d=s(42406),c=s(9067),h=s(8900),p=s(32557),m=s(18606),u=s(70579),g=t([p]);p=(g.then?(await g)():g)[0];const x=`/common-app/${"configuration"}`,f="Configuration",b="Master",_={details:"",obj_id:"",configuration:"",value:"",status:"1",err_msg_visible:!1,error_message:"",loading:!0,redirect:!1};class j extends a.Component{constructor(t){super(t),this.drpHandleChange=t=>{this.setState({[t.target.name]:t.target.value})},this.getDetails=async()=>{this.setState({loading:!0});const t=window.location.pathname;await m.A.call(this,t,f),""!==this.state.details&&this.setState({obj_id:this.state.details.id,configuration:this.state.details.configuration,value:this.state.details.value,status:!0===this.state.details.status?"1":"0",loading:!1})},this.handleSubmit=async t=>{t.preventDefault();var e=`${x}/CreateUpdateAPI/`;p.A.call(this,t,e)},this.state=_}componentDidMount(){this.getDetails()}render(){const{error_message:t,redirect:e}=this.state;return e?(0,u.jsx)(n.C5,{to:x}):(0,u.jsx)("div",{className:"wrapper",children:(0,u.jsx)("div",{className:"content-wrapper",onClick:l.A.bind(this),children:(0,u.jsxs)("form",{id:"app-form",onSubmit:this.handleSubmit,autoComplete:"off",children:[(0,u.jsx)(o.A,{form_name_list:f,form_name:f,form_type:b,list_page:x}),(0,u.jsx)(d.A,{load:this.state.loading}),(0,u.jsx)(h.A,{error_message:t,err_msg_visible:this.state.err_msg_visible}),(0,u.jsxs)("div",{className:"row",children:[(0,u.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,u.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"configuration",id:"configuration",required:!0,value:this.state.configuration,onChange:r.A.bind(this),onClick:r.A.bind(this)}),(0,u.jsx)("label",{className:"did-floating-label",children:"Configuration"}),(0,u.jsx)("div",{className:"form-helper helper_hide",id:"configuration_helper",children:"Required"})]}),(0,u.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,u.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"configuration",id:"configuration",required:!0,value:this.state.configuration,onChange:r.A.bind(this),onClick:r.A.bind(this)}),(0,u.jsx)("label",{className:"did-floating-label",children:"Value"}),(0,u.jsx)("div",{className:"form-helper helper_hide",id:"value_helper",children:"Required"})]}),(0,u.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,u.jsxs)("select",{className:"did-floating-select",name:"status",id:"status",value:this.state.status,onChange:this.drpHandleChange,onClick:this.drpHandleChange,onFocus:this.drpHandleChange,children:[(0,u.jsx)("option",{value:"1",children:"Active"}),(0,u.jsx)("option",{value:"0",children:"InActive"})]}),(0,u.jsx)("label",{className:"did-floating-label",children:"Status"})]}),(0,u.jsx)(c.A,{form_type:b,list_page:x})]})]})})})}}const v=j;i()}catch(x){i(x)}}))},7135:(t,e,s)=>{s.d(e,{A:()=>i});const i=function(t){const e=document.getElementById(t.target.name+"_helper");null!==e&&(""===t.target.value?e.classList.contains("helper_hide")&&e.classList.remove("helper_hide"):e.classList.add("helper_hide"),setTimeout((()=>{e.classList.add("helper_hide")}),"10000")),document.getElementById(t.target.id).style.border="1px solid grey",this.setState({[t.target.name]:"",[t.target.name]:t.target.value})}},99422:(t,e,s)=>{s.d(e,{A:()=>_});var i=s(65043),a=s(66978),n=s(10615),o=s(35475),l=s(16023),r=s(51505),d=s(51847),c=s(87024),h=s(44013),p=s(50326),m=s(96209),u=s(25663),g=s(86178),x=s.n(g),f=s(70579);class b extends i.Component{constructor(t){super(t),this.sendFormRequest=t=>{this.props.parentCallback(t.target.id)},this.showAuditTrailUserMaster=async t=>{console.log(this.props.slug_id),this.setState({open:!0}),await fetch(`/common-app/userMaster/userMasterAuditTrailAPI/?slug=${this.props.slug_id}&page_size=100000000`).then((t=>{if("Internal Server Error"===t.statusText){var e=window.location.origin;window.location.replace(e)}t.json().then((t=>{this.setState({auditTrail:t.results})}))}))},this.showAuditTrail=async t=>{console.log(this.props.slug_id),this.setState({open:!0}),await fetch(`/common-app/auditTrail/auditTrailViewAPI/?record_no=${this.props.recordNo}&table_name=${this.props.tableName}&page_size=100000000`).then((t=>{if(!t.ok){var e=window.location.origin;window.location.replace(e)}t.json().then((t=>{this.setState({auditTrail:t.results})}))}))},this.state={importDisplay:this.props.importDisplay,open:!1,auditTrail:[]}}render(){const t=[{dataField:this.props.list_page.includes("userMaster")?"user_name":"record_no",text:this.props.list_page.includes("userMaster")?"User Name":"Record No"},{dataField:"process_desc",text:"Process"},{dataField:"action_desc",text:"Action"},{dataField:"action_by",text:"Action By"},{dataField:"action_date",text:"Action Date",formatter:t=>x()(t).format("DD-MMM-YYYY HH:MM:SS A")},{dataField:"changes",text:"Changes"}];return(0,f.jsxs)("div",{className:"row form-name-row",style:{marginTop:"3px"},children:[(0,f.jsx)("div",{className:"col-lg-2 col-md-2 col-sm-2",style:{margin:"0px",paddingTop:"3px"},children:(0,f.jsx)("span",{style:{color:"brown",fontSize:"15px"},children:this.props.form_name})}),(0,f.jsx)("div",{className:"col-lg-7 col-md-7 col-sm-7",style:{margin:"0",display:"flex"},children:(0,f.jsx)(a.A,{placement:"bottom",overlay:(0,f.jsx)(n.A,{id:"tooltip-disabled",children:"Please use this option to import data from Excel File"}),children:(0,f.jsxs)("div",{className:"input-group input-group-sm",style:{display:!0===this.state.importDisplay?"flex":"none"},children:[(0,f.jsx)("input",{className:"form-control",style:{width:"50%"},type:"file",id:"formFile",onChange:this.props.fileSelection}),(0,f.jsx)("span",{className:"btn btn-danger",style:{textDecoration:"none",color:"white"},onClick:this.props.import_data,children:"Import"})]})})}),(0,f.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3",style:{margin:"0px",paddingTop:"3px"},children:[(0,f.jsxs)(o.N_,{to:window.location.pathname.includes("pending")?`${this.props.list_page}/pendingApproval`:this.props.list_page,className:"back_to_list",style:{fontWeight:"500",color:"black",textDecoration:"none",cursor:"pointer",float:"right"},children:[(0,f.jsx)("svg",{style:{color:"brown",marginRight:"5px"},xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-left-circle-fill",viewBox:"0 0 16 16",children:(0,f.jsx)("path",{d:"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"})}),(0,f.jsx)("span",{style:{color:"black"},children:"Back to List"})]}),"Yes"===this.props.auditTrailView?(0,f.jsxs)("div",{className:"audit_trail",id:"audit_trail",style:{fontWeight:"500",color:"black",textDecoration:"none",cursor:"pointer",float:"right",paddingLeft:"10px",paddingRight:"10px"},onClick:this.showAuditTrail,children:[(0,f.jsxs)("svg",{height:"18px",version:"1.1",viewBox:"0 0 20 21",width:"20px",children:[(0,f.jsx)("title",{}),(0,f.jsx)("desc",{}),(0,f.jsx)("defs",{}),(0,f.jsx)("g",{fill:"none","fill-rule":"evenodd",id:"Page-1",stroke:"none","stroke-width":"1",children:(0,f.jsx)("g",{fill:"#004a5d",id:"Core",opacity:"0.9",transform:"translate(-464.000000, -254.000000)",children:(0,f.jsx)("g",{id:"history",transform:"translate(464.000000, 254.500000)",children:(0,f.jsx)("path",{d:"M10.5,0 C7,0 3.9,1.9 2.3,4.8 L0,2.5 L0,9 L6.5,9 L3.7,6.2 C5,3.7 7.5,2 10.5,2 C14.6,2 18,5.4 18,9.5 C18,13.6 14.6,17 10.5,17 C7.2,17 4.5,14.9 3.4,12 L1.3,12 C2.4,16 6.1,19 10.5,19 C15.8,19 20,14.7 20,9.5 C20,4.3 15.7,0 10.5,0 L10.5,0 Z M9,5 L9,10.1 L13.7,12.9 L14.5,11.6 L10.5,9.2 L10.5,5 L9,5 L9,5 Z",id:"Shape"})})})})]}),(0,f.jsx)("span",{style:{color:"black",paddingLeft:"3px"},children:"Audit Trail"})]}):""]}),(0,f.jsxs)(l.A,{centered:!1,open:this.state.open,onClose:()=>this.setState({open:!1}),onOpen:()=>this.setState({open:!0}),children:[(0,f.jsxs)(r.A,{children:["Audit Trail of ",this.props.recordNo]}),(0,f.jsx)(d.A,{children:(0,f.jsx)(c.A,{children:(0,f.jsx)(m.A,{keyField:"record_no",data:this.state.auditTrail,columns:t,striped:!0,hover:!0,condensed:!0,pagination:(0,u.Ay)(),noDataIndication:"No records found"})})}),(0,f.jsx)(h.A,{children:(0,f.jsx)(p.A,{onClick:()=>this.setState({open:!1}),children:"OK"})})]})]})}}const _=b},86985:(t,e,s)=>{s.d(e,{A:()=>i});const i=function(t){t.includes("Unexpected")||t.includes("Failed to fetch")?(this.setState({loading:this.state.loading=!1}),alert("Something went wrong!")):this.setState({loading:this.state.loading=!1})}},8900:(t,e,s)=>{s.d(e,{A:()=>o});var i=s(65043),a=s(70579);class n extends i.Component{render(){return(0,a.jsxs)("div",{id:"error_alert",className:"alert alert-warning alert-dismissible "+(this.props.err_msg_visible?"alert-shown":"alert-hidden"),role:"alert",style:{display:this.props.err_msg_visible?"block":"none"},children:[(0,a.jsx)("strong",{children:"Error :"})," ",this.props.error_message]})}}const o=n},18606:(t,e,s)=>{s.d(e,{A:()=>a});var i=s(86985);const a=async function(t,e){if(t.includes("=")||t.includes("%"))try{await fetch(t).then((async t=>t.json())).then((t=>{this.setState({details:t})}))}catch(s){let t=s.message;i.A.call(this,t)}else document.title=`${e} Create`,this.setState({loading:!1})}},32557:(t,e,s)=>{s.a(t,(async(t,i)=>{try{s.d(e,{A:()=>d});var a=s(8858),n=s(86985),o=t([a]);async function r(t,e){this.setState({loading:!0});const s={method:"POST",headers:(0,a.A)(),body:JSON.stringify(this.state)};try{await fetch(e,s).then((async t=>t.json())).then((t=>{t.status?"Data saved successfully"===t.status?(this.setState({success_message:!0,err_msg_visible:!1,loading:!1}),setTimeout((()=>{this.setState({success_message:!1})}),"10000")):this.setState({redirect:!0}):t.error_msg&&(this.setState({err_msg_visible:!0,error_message:t.error_msg,loading:!1}),setTimeout((()=>{this.setState({err_msg_visible:!1})}),"10000"))}))}catch(i){let t=i.message;n.A.call(this,t)}}a=(o.then?(await o)():o)[0];const d=r;i()}catch(l){i(l)}}))},9067:(t,e,s)=>{s.d(e,{A:()=>o});var i=s(65043),a=s(35475),n=s(70579);class o extends i.Component{constructor(){super(...arguments),this.sendFormRequest=t=>{this.props.parentCallback(t.target.id)}}render(){return(0,n.jsx)("div",{className:"row",style:{border:"none"},children:(0,n.jsxs)("div",{class:"bd-example submit_form",children:["Draft"===this.props.trnStatus||""===this.props.trnStatus,"Yes"===this.props.draftBtn&&(window.location.pathname.includes("modify")||window.location.pathname.includes("CreateUpdate"))?(0,n.jsx)("button",{type:"submit",class:"btn btn-primary",id:"draftBtn",onClick:this.props.onSubmit,children:"Draft"}):"","Yes"===this.props.submitBtn&&(window.location.pathname.includes("modify")||window.location.pathname.includes("CreateUpdate"))?(0,n.jsx)("button",{type:"submit",class:"btn btn-success",id:"submitBtn",onClick:this.props.onSubmit,children:"Submit"}):(0,n.jsx)("button",{type:"submit",class:"btn btn-success",id:"save-close-btn",onClick:this.props.onSubmit,children:"Save & Close"}),(0,n.jsx)(a.N_,{className:"btn btn-secondary",to:window.location.pathname.includes("pending")?`${this.props.list_page}/pendingApproval`:this.props.list_page,style:{textDecoration:"none",color:"white"},children:"Back to List"})]})})}}},76309:(t,e,s)=>{s.d(e,{A:()=>i});const i=function(){if(window.innerWidth<="767"){const t=document.getElementById("side-nav-bar");t.classList.contains("sidebar-transform")&&t.classList.remove("sidebar-transform")}}}}]);
//# sourceMappingURL=254.b44c97c9.chunk.js.map