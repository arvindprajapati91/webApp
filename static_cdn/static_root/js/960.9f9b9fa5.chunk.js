"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[960],{19960:(t,e,s)=>{s.r(e),s.d(e,{default:()=>f});var i=s(72791),a=s(57689),n=s(70068),o=s(71237),l=s(42609),r=s(44321),d=s(21352),c=s(34548),h=s(603),p=s(42039),m=s(74291),g=s(80184);const u="/".concat("common-app","/").concat("stateMaster"),x="State Master",_="Master";class b extends i.Component{constructor(t){super(t),this.drpHandleChange=t=>{this.setState({[t.target.name]:t.target.value})},this.getDetails=async()=>{this.setState({loading:!0});const t=window.location.pathname;await m.Z.call(this,t,x),""!==this.state.details&&this.setState({obj_id:this.state.details.id,state_code:this.state.details.state_code,state_name:this.state.details.state_name,state_no:this.state.details.state_no,loading:!1})},this.handleSubmit=async t=>{if(t.preventDefault(),""===this.state.State_type||null===this.state.State_type){let t="Please select Manager before Save";return p.Z.call(this,t,"State_type")}var e="".concat(u,"/CreateUpdateAPI/");h.Z.call(this,t,e)},this.state={details:"",obj_id:"",state_code:"",state_name:"",state_no:"",err_msg_visible:!1,error_message:"",loading:!0}}componentDidMount(){this.getDetails()}render(){const{error_message:t,redirect:e}=this.state;return e?(0,g.jsx)(a.Fg,{to:u}):(0,g.jsx)("div",{className:"wrapper",children:(0,g.jsx)("div",{className:"content-wrapper",onClick:o.Z.bind(this),children:(0,g.jsxs)("form",{id:"app-form",onSubmit:this.handleSubmit,autoComplete:"off",children:[(0,g.jsx)(n.Z,{form_name_list:x,form_name:x,form_type:_,list_page:u}),(0,g.jsx)(r.Z,{load:this.state.loading}),(0,g.jsx)(c.Z,{error_message:t,err_msg_visible:this.state.err_msg_visible}),(0,g.jsxs)("div",{className:"row",children:[(0,g.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,g.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"state_code",id:"state_code",required:!0,value:this.state.state_code,onChange:l.Z.bind(this),onClick:l.Z.bind(this)}),(0,g.jsx)("label",{className:"did-floating-label",children:"State Code"}),(0,g.jsx)("div",{className:"form-helper helper_hide",id:"state_code_helper",children:"Required"})]}),(0,g.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,g.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"state_name",id:"state_name",required:!0,value:this.state.state_name,onChange:l.Z.bind(this),onClick:l.Z.bind(this)}),(0,g.jsx)("label",{className:"did-floating-label",children:"State Name"}),(0,g.jsx)("div",{className:"form-helper helper_hide",id:"state_name_helper",children:"Required"})]}),(0,g.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,g.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"state_no",id:"state_no",required:!0,value:this.state.state_no,onChange:l.Z.bind(this),onClick:l.Z.bind(this)}),(0,g.jsx)("label",{className:"did-floating-label",children:"State No"}),(0,g.jsx)("div",{className:"form-helper helper_hide",id:"state_no_helper",children:"Required"})]}),(0,g.jsx)(d.Z,{form_type:_,list_page:u})]})]})})})}}const f=b},42609:(t,e,s)=>{s.d(e,{Z:()=>i});const i=function(t){const e=document.getElementById(t.target.name+"_helper");null!==e&&(""===t.target.value?e.classList.contains("helper_hide")&&e.classList.remove("helper_hide"):e.classList.add("helper_hide"),setTimeout((()=>{e.classList.add("helper_hide")}),"10000")),document.getElementById(t.target.id).style.border="1px solid grey",this.setState({[t.target.name]:"",[t.target.name]:t.target.value})}},70068:(t,e,s)=>{s.d(e,{Z:()=>u});var i=s(72791),a=s(74381),n=s(12576),o=s(11087),l=s(84805),r=s(55849),d=s(2002),c=s(36161),h=s(72426),p=s.n(h),m=s(80184);class g extends i.Component{constructor(t){super(t),this.sendFormRequest=t=>{this.props.parentCallback(t.target.id)},this.showAuditTrail=async t=>{console.log(this.props.slug_id),this.setState({open:!0}),await fetch("/".concat("common-app","/userMaster/userMasterAuditTrailAPI/?slug=").concat(this.props.slug_id,"&page_size=").concat("100000000")).then((t=>{if("Internal Server Error"===t.statusText){var e=window.location.origin;window.location.replace(e)}t.json().then((t=>{this.setState({auditTrail:t.results})}))}))},this.state={importDisplay:this.props.importDisplay,open:!1,auditTrail:[]}}render(){const t=[{dataField:"user_name",text:"User Name"},{dataField:"process_desc",text:"Process"},{dataField:"action_desc",text:"Action"},{dataField:"action_by",text:"Action By"},{dataField:"action_date",text:"Action Date",formatter:t=>p()(t).format("DD-MMM-YYYY HH:MM:SS A")},{dataField:"changes",text:"Changes"}];return(0,m.jsxs)("div",{className:"row form-name-row",style:{marginTop:"3px"},children:[(0,m.jsx)("div",{className:"col-lg-2 col-md-2 col-sm-2",style:{margin:"0px",paddingTop:"3px"},children:(0,m.jsx)("span",{style:{color:"brown"},children:this.props.form_name})}),(0,m.jsx)("div",{className:"col-lg-7 col-md-7 col-sm-7",style:{margin:"0",display:"flex"},children:(0,m.jsx)(a.Z,{placement:"bottom",overlay:(0,m.jsx)(n.Z,{id:"tooltip-disabled",children:"Please use this option to import data from Excel File"}),children:(0,m.jsxs)("div",{className:"input-group input-group-sm",style:{display:!0===this.state.importDisplay?"flex":"none"},children:[(0,m.jsx)("input",{className:"form-control",style:{width:"50%"},type:"file",id:"formFile",onChange:this.props.fileSelection}),(0,m.jsx)("span",{className:"btn btn-danger",style:{textDecoration:"none",color:"white"},onClick:this.props.import_data,children:"Import"})]})})}),(0,m.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3",style:{margin:"0px",paddingTop:"3px"},children:[(0,m.jsxs)(o.rU,{to:window.location.pathname.includes("pending")?"".concat(this.props.list_page,"/pendingApproval"):this.props.list_page,className:"back_to_list",style:{fontWeight:"500",color:"black",textDecoration:"none",cursor:"pointer",float:"right"},children:[(0,m.jsx)("svg",{style:{color:"brown",marginRight:"5px"},xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-left-circle-fill",viewBox:"0 0 16 16",children:(0,m.jsx)("path",{d:"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"})}),(0,m.jsx)("span",{style:{color:"black"},children:"Back to List"})]}),this.props.list_page.includes("userMaster")&&""!==this.props.slug_id?(0,m.jsxs)("div",{className:"audit_trail",id:"audit_trail",style:{fontWeight:"500",color:"black",textDecoration:"none",cursor:"pointer",float:"right",paddingLeft:"10px",paddingRight:"10px"},onClick:this.showAuditTrail,children:[(0,m.jsxs)("svg",{height:"18px",version:"1.1",viewBox:"0 0 20 21",width:"20px",children:[(0,m.jsx)("title",{}),(0,m.jsx)("desc",{}),(0,m.jsx)("defs",{}),(0,m.jsx)("g",{fill:"none","fill-rule":"evenodd",id:"Page-1",stroke:"none","stroke-width":"1",children:(0,m.jsx)("g",{fill:"#004a5d",id:"Core",opacity:"0.9",transform:"translate(-464.000000, -254.000000)",children:(0,m.jsx)("g",{id:"history",transform:"translate(464.000000, 254.500000)",children:(0,m.jsx)("path",{d:"M10.5,0 C7,0 3.9,1.9 2.3,4.8 L0,2.5 L0,9 L6.5,9 L3.7,6.2 C5,3.7 7.5,2 10.5,2 C14.6,2 18,5.4 18,9.5 C18,13.6 14.6,17 10.5,17 C7.2,17 4.5,14.9 3.4,12 L1.3,12 C2.4,16 6.1,19 10.5,19 C15.8,19 20,14.7 20,9.5 C20,4.3 15.7,0 10.5,0 L10.5,0 Z M9,5 L9,10.1 L13.7,12.9 L14.5,11.6 L10.5,9.2 L10.5,5 L9,5 L9,5 Z",id:"Shape"})})})})]}),(0,m.jsx)("span",{style:{color:"black",paddingLeft:"3px"},children:"Audit Trail"})]}):""]}),(0,m.jsxs)(l.Z,{centered:!0,open:this.state.open,onClose:()=>this.setState({open:!1}),onOpen:()=>this.setState({open:!0}),children:[(0,m.jsxs)(l.Z.Header,{children:["Audit Trail of ",this.props.trailFor]}),(0,m.jsx)(l.Z.Content,{children:(0,m.jsx)(d.Z,{keyField:"user_name",data:this.state.auditTrail,columns:t,striped:!0,hover:!0,condensed:!0,pagination:(0,c.ZP)(),noDataIndication:"No records found"})}),(0,m.jsx)(l.Z.Actions,{children:(0,m.jsx)(r.Z,{onClick:()=>this.setState({open:!1}),children:"OK"})})]})]})}}const u=g},79192:(t,e,s)=>{s.d(e,{Z:()=>i});const i=function(t){if(t.includes("Unexpected")||t.includes("Failed to fetch")){this.setState({loading:this.state.loading=!1}),alert("Session is expired!");var e=window.location.origin;window.location.replace(e)}else this.setState({loading:this.state.loading=!1})}},34548:(t,e,s)=>{s.d(e,{Z:()=>o});var i=s(72791),a=s(80184);class n extends i.Component{render(){return(0,a.jsxs)("div",{id:"error_alert",className:"alert alert-warning alert-dismissible ".concat(this.props.err_msg_visible?"alert-shown":"alert-hidden"),role:"alert",style:{display:this.props.err_msg_visible?"block":"none"},children:[(0,a.jsx)("strong",{children:"Error :"})," ",this.props.error_message]})}}const o=n},42039:(t,e,s)=>{s.d(e,{Z:()=>i});const i=function(t,e){this.setState({err_msg_visible:!1}),this.setState({err_msg_visible:!0,error_message:t,loading:!1}),setTimeout((()=>{this.setState({err_msg_visible:!1})}),"10000"),document.getElementById(e).style.border="1px solid red"}},74291:(t,e,s)=>{s.d(e,{Z:()=>a});var i=s(79192);const a=async function(t,e){if(t.includes("=")||t.includes("%"))try{await fetch(t).then((async t=>t.json())).then((t=>{this.setState({details:t})}))}catch(s){let t=s.message;i.Z.call(this,t)}else document.title="".concat(e," Create"),this.setState({loading:!1})}},603:(t,e,s)=>{s.d(e,{Z:()=>n});var i=s(47955),a=s(79192);const n=async function(t,e){this.setState({loading:!0});const s={method:"POST",headers:(0,i.Z)(),body:JSON.stringify(this.state)};try{await fetch(e,s).then((async t=>t.json())).then((t=>{t.status?"Data saved successfully"===t.status?(this.setState({success_message:!0,err_msg_visible:!1,loading:!1}),setTimeout((()=>{this.setState({success_message:!1})}),"10000")):this.setState({redirect:!0}):t.error_msg&&(this.setState({err_msg_visible:!0,error_message:t.error_msg,loading:!1}),setTimeout((()=>{this.setState({err_msg_visible:!1})}),"10000"))}))}catch(n){let t=n.message;a.Z.call(this,t)}}},21352:(t,e,s)=>{s.d(e,{Z:()=>o});var i=s(72791),a=s(11087),n=s(80184);class o extends i.Component{constructor(){super(...arguments),this.sendFormRequest=t=>{this.props.parentCallback(t.target.id)}}render(){return(0,n.jsx)("div",{className:"row",style:{border:"none"},children:(0,n.jsxs)("div",{class:"bd-example submit_form",children:["Transaction"===this.props.form_type?window.location.pathname.includes("pending")?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("button",{type:"button",class:"btn btn-success",id:"approveBtn",onClick:this.props.approve,children:"Approve"}),(0,n.jsx)("button",{type:"button",class:"btn btn-info",id:"moreInfoBtn",onClick:this.props.moreInfoRejectModalShow,children:"More Info"}),(0,n.jsx)("button",{type:"button",class:"btn btn-danger",id:"rejectBtn",onClick:this.props.moreInfoRejectModalShow,children:"Reject"})]}):!1===this.props.disableButton?(0,n.jsxs)(n.Fragment,{children:[""===this.props.status||"DRAFT"===this.props.status?(0,n.jsx)("button",{type:"submit",class:"btn btn-primary",id:"draftBtn",onClick:this.props.onSubmit,disabled:this.props.disableButton,children:"Save in Draft"}):"",(0,n.jsx)("button",{type:"submit",class:"btn btn-success",id:"submitBtn",onClick:this.props.onSubmit,disabled:this.props.disableButton,children:"Submit"})]}):"":(0,n.jsx)("button",{type:"submit",class:"btn btn-success",id:"submitBtn",onClick:this.props.onSubmit,children:"Save & Close"}),(0,n.jsx)(a.rU,{className:"btn btn-secondary",to:window.location.pathname.includes("pending")?"".concat(this.props.list_page,"/pendingApproval"):this.props.list_page,style:{textDecoration:"none",color:"white"},children:"Back to List"})]})})}}},71237:(t,e,s)=>{s.d(e,{Z:()=>i});const i=function(){if(window.innerWidth<="767"){const t=document.getElementById("side-nav-bar");t.classList.contains("sidebar-transform")&&t.classList.remove("sidebar-transform")}}}}]);
//# sourceMappingURL=960.9f9b9fa5.chunk.js.map