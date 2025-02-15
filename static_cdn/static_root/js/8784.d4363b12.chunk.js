"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8784],{18784:(t,e,s)=>{s.a(t,(async(t,i)=>{try{s.r(e),s.d(e,{default:()=>w});var a=s(65043),n=s(73216),o=s(99422),r=s(76309),l=s(7135),d=s(42406),c=s(9067),p=s(8900),h=s(32557),m=s(18606),u=s(70579),g=t([h]);h=(g.then?(await g)():g)[0];const x=`/common-app/${"sampleMaster"}`,_="Sample Master",f="Master",b={details:"",obj_id:"",sample_description:"",status:"1",err_msg_visible:!1,error_message:"",loading:!0,redirect:!1};class j extends a.Component{constructor(t){super(t),this.drpHandleChange=t=>{this.setState({[t.target.name]:t.target.value})},this.getDetails=async()=>{this.setState({loading:!0});const t=window.location.pathname;await m.A.call(this,t,_),""!==this.state.details&&this.setState({obj_id:this.state.details.id,sample_description:this.state.details.sample_description,status:!0===this.state.details.status?"1":"0",loading:!1})},this.handleSubmit=async t=>{t.preventDefault();var e=`${x}/CreateUpdateAPI/`;h.A.call(this,t,e)},this.state=b}componentDidMount(){this.getDetails()}render(){const{error_message:t,redirect:e}=this.state;return e?(0,u.jsx)(n.C5,{to:x}):(0,u.jsx)("div",{className:"wrapper",children:(0,u.jsx)("div",{className:"content-wrapper",onClick:r.A.bind(this),children:(0,u.jsxs)("form",{id:"app-form",onSubmit:this.handleSubmit,autoComplete:"off",children:[(0,u.jsx)(o.A,{form_name_list:_,form_name:_,form_type:f,list_page:x}),(0,u.jsx)(d.A,{load:this.state.loading}),(0,u.jsx)(p.A,{error_message:t,err_msg_visible:this.state.err_msg_visible}),(0,u.jsxs)("div",{className:"row",children:[(0,u.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,u.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"sample_description",id:"sample_description",required:!0,value:this.state.sample_description,onChange:l.A.bind(this),onClick:l.A.bind(this)}),(0,u.jsx)("label",{className:"did-floating-label",children:"Sample Description"}),(0,u.jsx)("div",{className:"form-helper helper_hide",id:"sample_description_helper",children:"Required"})]}),(0,u.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,u.jsxs)("select",{className:"did-floating-select",name:"status",id:"status",value:this.state.status,onChange:this.drpHandleChange,onClick:this.drpHandleChange,onFocus:this.drpHandleChange,children:[(0,u.jsx)("option",{value:"1",children:"Active"}),(0,u.jsx)("option",{value:"0",children:"InActive"})]}),(0,u.jsx)("label",{className:"did-floating-label",children:"Status"})]}),(0,u.jsx)(c.A,{form_type:f,list_page:x})]})]})})})}}const w=j;i()}catch(x){i(x)}}))},7135:(t,e,s)=>{s.d(e,{A:()=>i});const i=function(t){const e=document.getElementById(t.target.name+"_helper");null!==e&&(""===t.target.value?e.classList.contains("helper_hide")&&e.classList.remove("helper_hide"):e.classList.add("helper_hide"),setTimeout((()=>{e.classList.add("helper_hide")}),"10000")),document.getElementById(t.target.id).style.border="1px solid grey",this.setState({[t.target.name]:"",[t.target.name]:t.target.value})}},99422:(t,e,s)=>{s.d(e,{A:()=>b});var i=s(65043),a=s(66978),n=s(10615),o=s(35475),r=s(16023),l=s(51505),d=s(51847),c=s(87024),p=s(44013),h=s(50326),m=s(96209),u=s(25663),g=s(86178),x=s.n(g),_=s(70579);class f extends i.Component{constructor(t){super(t),this.sendFormRequest=t=>{this.props.parentCallback(t.target.id)},this.showAuditTrailUserMaster=async t=>{console.log(this.props.slug_id),this.setState({open:!0}),await fetch(`/common-app/userMaster/userMasterAuditTrailAPI/?slug=${this.props.slug_id}&page_size=100000000`).then((t=>{if("Internal Server Error"===t.statusText){var e=window.location.origin;window.location.replace(e)}t.json().then((t=>{this.setState({auditTrail:t.results})}))}))},this.showAuditTrail=async t=>{console.log(this.props.slug_id),this.setState({open:!0}),await fetch(`/common-app/auditTrail/auditTrailViewAPI/?record_no=${this.props.recordNo}&table_name=${this.props.tableName}&page_size=100000000`).then((t=>{if(!t.ok){var e=window.location.origin;window.location.replace(e)}t.json().then((t=>{this.setState({auditTrail:t.results})}))}))},this.state={importDisplay:this.props.importDisplay,open:!1,auditTrail:[]}}render(){const t=[{dataField:this.props.list_page.includes("userMaster")?"user_name":"record_no",text:this.props.list_page.includes("userMaster")?"User Name":"Record No"},{dataField:"process_desc",text:"Process"},{dataField:"action_desc",text:"Action"},{dataField:"action_by",text:"Action By"},{dataField:"action_date",text:"Action Date",formatter:t=>x()(t).format("DD-MMM-YYYY HH:MM:SS A")},{dataField:"changes",text:"Changes"}];return(0,_.jsxs)("div",{className:"row form-name-row",style:{marginTop:"3px"},children:[(0,_.jsx)("div",{className:"col-lg-2 col-md-2 col-sm-2",style:{margin:"0px",paddingTop:"3px"},children:(0,_.jsx)("span",{style:{color:"brown",fontSize:"15px"},children:this.props.form_name})}),(0,_.jsx)("div",{className:"col-lg-7 col-md-7 col-sm-7",style:{margin:"0",display:"flex"},children:(0,_.jsx)(a.A,{placement:"bottom",overlay:(0,_.jsx)(n.A,{id:"tooltip-disabled",children:"Please use this option to import data from Excel File"}),children:(0,_.jsxs)("div",{className:"input-group input-group-sm",style:{display:!0===this.state.importDisplay?"flex":"none"},children:[(0,_.jsx)("input",{className:"form-control",style:{width:"50%"},type:"file",id:"formFile",onChange:this.props.fileSelection}),(0,_.jsx)("span",{className:"btn btn-danger",style:{textDecoration:"none",color:"white"},onClick:this.props.import_data,children:"Import"})]})})}),(0,_.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3",style:{margin:"0px",paddingTop:"3px"},children:[(0,_.jsxs)(o.N_,{to:window.location.pathname.includes("pending")?`${this.props.list_page}/pendingApproval`:this.props.list_page,className:"back_to_list",style:{fontWeight:"500",color:"black",textDecoration:"none",cursor:"pointer",float:"right"},children:[(0,_.jsx)("svg",{style:{color:"brown",marginRight:"5px"},xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-left-circle-fill",viewBox:"0 0 16 16",children:(0,_.jsx)("path",{d:"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"})}),(0,_.jsx)("span",{style:{color:"black"},children:"Back to List"})]}),"Yes"===this.props.auditTrailView?(0,_.jsxs)("div",{className:"audit_trail",id:"audit_trail",style:{fontWeight:"500",color:"black",textDecoration:"none",cursor:"pointer",float:"right",paddingLeft:"10px",paddingRight:"10px"},onClick:this.showAuditTrail,children:[(0,_.jsxs)("svg",{height:"18px",version:"1.1",viewBox:"0 0 20 21",width:"20px",children:[(0,_.jsx)("title",{}),(0,_.jsx)("desc",{}),(0,_.jsx)("defs",{}),(0,_.jsx)("g",{fill:"none","fill-rule":"evenodd",id:"Page-1",stroke:"none","stroke-width":"1",children:(0,_.jsx)("g",{fill:"#004a5d",id:"Core",opacity:"0.9",transform:"translate(-464.000000, -254.000000)",children:(0,_.jsx)("g",{id:"history",transform:"translate(464.000000, 254.500000)",children:(0,_.jsx)("path",{d:"M10.5,0 C7,0 3.9,1.9 2.3,4.8 L0,2.5 L0,9 L6.5,9 L3.7,6.2 C5,3.7 7.5,2 10.5,2 C14.6,2 18,5.4 18,9.5 C18,13.6 14.6,17 10.5,17 C7.2,17 4.5,14.9 3.4,12 L1.3,12 C2.4,16 6.1,19 10.5,19 C15.8,19 20,14.7 20,9.5 C20,4.3 15.7,0 10.5,0 L10.5,0 Z M9,5 L9,10.1 L13.7,12.9 L14.5,11.6 L10.5,9.2 L10.5,5 L9,5 L9,5 Z",id:"Shape"})})})})]}),(0,_.jsx)("span",{style:{color:"black",paddingLeft:"3px"},children:"Audit Trail"})]}):""]}),(0,_.jsxs)(r.A,{centered:!1,open:this.state.open,onClose:()=>this.setState({open:!1}),onOpen:()=>this.setState({open:!0}),children:[(0,_.jsxs)(l.A,{children:["Audit Trail of ",this.props.recordNo]}),(0,_.jsx)(d.A,{children:(0,_.jsx)(c.A,{children:(0,_.jsx)(m.A,{keyField:"record_no",data:this.state.auditTrail,columns:t,striped:!0,hover:!0,condensed:!0,pagination:(0,u.Ay)(),noDataIndication:"No records found"})})}),(0,_.jsx)(p.A,{children:(0,_.jsx)(h.A,{onClick:()=>this.setState({open:!1}),children:"OK"})})]})]})}}const b=f},86985:(t,e,s)=>{s.d(e,{A:()=>i});const i=function(t){t.includes("Unexpected")||t.includes("Failed to fetch")?(this.setState({loading:this.state.loading=!1}),alert("Something went wrong!")):this.setState({loading:this.state.loading=!1})}},8900:(t,e,s)=>{s.d(e,{A:()=>o});var i=s(65043),a=s(70579);class n extends i.Component{render(){return(0,a.jsxs)("div",{id:"error_alert",className:"alert alert-warning alert-dismissible "+(this.props.err_msg_visible?"alert-shown":"alert-hidden"),role:"alert",style:{display:this.props.err_msg_visible?"block":"none"},children:[(0,a.jsx)("strong",{children:"Error :"})," ",this.props.error_message]})}}const o=n},18606:(t,e,s)=>{s.d(e,{A:()=>a});var i=s(86985);const a=async function(t,e){if(t.includes("=")||t.includes("%"))try{await fetch(t).then((async t=>t.json())).then((t=>{this.setState({details:t})}))}catch(s){let t=s.message;i.A.call(this,t)}else document.title=`${e} Create`,this.setState({loading:!1})}},32557:(t,e,s)=>{s.a(t,(async(t,i)=>{try{s.d(e,{A:()=>d});var a=s(8858),n=s(86985),o=t([a]);async function l(t,e){this.setState({loading:!0});const s={method:"POST",headers:(0,a.A)(),body:JSON.stringify(this.state)};try{await fetch(e,s).then((async t=>t.json())).then((t=>{t.status?"Data saved successfully"===t.status?(this.setState({success_message:!0,err_msg_visible:!1,loading:!1}),setTimeout((()=>{this.setState({success_message:!1})}),"10000")):this.setState({redirect:!0}):t.error_msg&&(this.setState({err_msg_visible:!0,error_message:t.error_msg,loading:!1}),setTimeout((()=>{this.setState({err_msg_visible:!1})}),"10000"))}))}catch(i){let t=i.message;n.A.call(this,t)}}a=(o.then?(await o)():o)[0];const d=l;i()}catch(r){i(r)}}))},9067:(t,e,s)=>{s.d(e,{A:()=>o});var i=s(65043),a=s(35475),n=s(70579);class o extends i.Component{constructor(){super(...arguments),this.sendFormRequest=t=>{this.props.parentCallback(t.target.id)}}render(){return(0,n.jsx)("div",{className:"row",style:{border:"none"},children:(0,n.jsxs)("div",{class:"bd-example submit_form",children:["Draft"===this.props.trnStatus||""===this.props.trnStatus,"Yes"===this.props.draftBtn&&(window.location.pathname.includes("modify")||window.location.pathname.includes("CreateUpdate"))?(0,n.jsx)("button",{type:"submit",class:"btn btn-primary",id:"draftBtn",onClick:this.props.onSubmit,children:"Draft"}):"","Yes"===this.props.submitBtn&&(window.location.pathname.includes("modify")||window.location.pathname.includes("CreateUpdate"))?(0,n.jsx)("button",{type:"submit",class:"btn btn-success",id:"submitBtn",onClick:this.props.onSubmit,children:"Submit"}):(0,n.jsx)("button",{type:"submit",class:"btn btn-success",id:"save-close-btn",onClick:this.props.onSubmit,children:"Save & Close"}),(0,n.jsx)(a.N_,{className:"btn btn-secondary",to:window.location.pathname.includes("pending")?`${this.props.list_page}/pendingApproval`:this.props.list_page,style:{textDecoration:"none",color:"white"},children:"Back to List"})]})})}}},76309:(t,e,s)=>{s.d(e,{A:()=>i});const i=function(){if(window.innerWidth<="767"){const t=document.getElementById("side-nav-bar");t.classList.contains("sidebar-transform")&&t.classList.remove("sidebar-transform")}}}}]);
//# sourceMappingURL=8784.d4363b12.chunk.js.map