"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[378],{52378:(e,t,s)=>{s.r(t),s.d(t,{default:()=>f});var i=s(72791),a=s(57689),l=s(70068),n=s(71237),r=s(42609),o=s(44321),d=s(21352),c=s(34548),h=s(603),p=s(74291),m=s(79192),u=s(80184);const g="/".concat("common-app","/").concat("menuMaster"),_="Menu Master",x="Master";class b extends i.Component{constructor(e){super(e),this.parentMenuList=async()=>{try{await fetch("".concat(g,"/ParentMenuAPI/")).then((async e=>e.json())).then((e=>{this.setState({parent_menu_list:e})}))}catch(e){let t=e.message;m.Z.call(this,t)}},this.drpHandleChange=async e=>{if(r.Z.call(this,e),"parent"===e.target.value){this.setState({[e.target.name]:e.target.value,isToggle:!1,isParentToggle:!0,required:""});try{await fetch("".concat(g,"/menuCountAPI/?pm=parent")).then((async e=>e.json())).then((e=>{this.setState({order_level:e.maxCount.toFixed(1)})}))}catch(t){let e=t.message;m.Z.call(this,e)}}else"status"===e.target.name?this.setState({[e.target.name]:e.target.value}):"child"===e.target.value?this.setState({[e.target.name]:e.target.value,isToggle:!0,isParentToggle:!1,required:"required"}):""!==e.target.value&&await fetch("".concat(g,"/menuCountAPI/?pm=child&pm=").concat(e.target.value)).then((t=>{if("Internal Server Error"===t.statusText)return this.setState({loading:!1}),alert("".concat({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_ERR_MSG:"Something went wrong, please contact to system admin",REACT_APP_COMP_NAME:"common-app",REACT_APP_ERR_MSG_DUR:"10000",REACT_APP_NAME:"common-app",REACT_APP_PAGE_SIZE:"10",REACT_APP_PAGE_SIZE_FOR_MASTER:"100000000",REACT_APP_SHRT_COMP_NAME:"CMNAP"}.REACT_APP_ERROR_MSG));t.json().then((t=>{this.setState({order_level:t.maxCount.toFixed(1),[e.target.name]:e.target.value})}))}))},this.getDetails=async()=>{this.setState({loading:!0});const e=window.location.pathname;await p.Z.call(this,e,_),""!==this.state.details&&(!0===this.state.details.is_parent?this.setState({is_parent:"parent",isParentToggle:!0,isToggle:!1,isDisable:!0}):this.setState({is_parent:"child",isParentToggle:!1,isToggle:!0,isDisable:!0}),this.setState({obj_id:this.state.details.id,menu_desc:this.state.details.menu_desc,order_level:this.state.details.order_level,menu_url:this.state.details.menu_url,parent_icon:this.state.details.parent_icon,parent_menu:this.state.details.parent_menu,loading:!1,createUpdate:"Update",status:!0===this.state.details.status?"1":"0",app_folder:this.state.details.app_folder,folder_size:this.state.details.folder_size}))},this.handleSubmit=async e=>{e.preventDefault();var t="".concat(g,"/CreateUpdateAPI/");h.Z.call(this,e,t)},this.state={details:"",obj_id:"",is_parent:"",menu_desc:"",order_level:"",menu_url:"",parent_icon:"",parent_menu_list:[],selectValue:"",pm_value:"",status:"1",isToggle:!1,isParentToggle:!1,required:"",parent_menu:"",folder_size:"",err_msg_visible:!1,error_message:"",loading:!0,disable:!1,db_parent:"",app_folder:"",redirect:!1,isDisable:!1}}componentDidMount(){this.getDetails(),this.parentMenuList()}render(){const{error_message:e,redirect:t}=this.state;return t?(0,u.jsx)(a.Fg,{to:g}):(0,u.jsx)("div",{className:"wrapper",children:(0,u.jsx)("div",{className:"content-wrapper",onClick:n.Z.bind(this),children:(0,u.jsxs)("form",{id:"app-form",onSubmit:this.handleSubmit,autoComplete:"off",children:[(0,u.jsx)(l.Z,{form_name_list:_,form_name:_,form_type:x,list_page:g}),(0,u.jsx)(o.Z,{load:this.state.loading}),(0,u.jsx)(c.Z,{error_message:e,err_msg_visible:this.state.err_msg_visible}),(0,u.jsxs)("div",{className:"row",children:[(0,u.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,u.jsxs)("select",{className:"did-floating-select",name:"is_parent",id:"is_parent",required:!0,value:this.state.is_parent,onChange:this.drpHandleChange,onClick:this.drpHandleChange,disabled:this.state.isDisable,children:[(0,u.jsx)("option",{value:""}),(0,u.jsx)("option",{value:"parent",children:"Parent"}),(0,u.jsx)("option",{value:"child",children:"Child"})]}),(0,u.jsx)("label",{className:"did-floating-label",children:"Parent or Child"}),(0,u.jsx)("div",{className:"form-helper helper_hide",id:"is_parent_helper",children:"Required"})]}),(0,u.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",style:{display:this.state.isToggle?"block":"none"},children:[(0,u.jsxs)("select",{className:"did-floating-select",name:"parent_menu",id:"parent_menu",required:this.state.required,value:this.state.parent_menu,onChange:this.drpHandleChange,onClick:this.drpHandleChange,children:[(0,u.jsx)("option",{value:""}),this.state.parent_menu_list.map((e=>(0,u.jsx)("option",{value:e.id,children:e.menu_desc})))]}),(0,u.jsx)("label",{className:"did-floating-label",children:"Parent Menu"}),this.state.required?(0,u.jsx)("div",{className:"form-helper helper_hide",id:"parent_menu_helper",children:"Required"}):""]}),(0,u.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,u.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"menu_desc",id:"menu_desc",required:!0,value:this.state.menu_desc,onChange:r.Z.bind(this),onClick:r.Z.bind(this)}),(0,u.jsx)("label",{className:"did-floating-label",children:"Menu Name"}),(0,u.jsx)("div",{className:"form-helper helper_hide",id:"menu_desc_helper",children:"Required"})]}),(0,u.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,u.jsx)("input",{className:"did-floating-input",type:"number",placeholder:" ",name:"order_level",id:"order_level",step:"any",required:!0,value:this.state.order_level,onChange:r.Z.bind(this),onClick:r.Z.bind(this)}),(0,u.jsx)("label",{className:"did-floating-label",children:"Order Level"}),(0,u.jsx)("div",{className:"form-helper helper_hide",id:"order_level_helper",children:"Required"})]}),(0,u.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",style:{display:this.state.isToggle?"block":"none"},children:[(0,u.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"menu_url",id:"menu_url",value:this.state.menu_url,onChange:r.Z.bind(this),onClick:r.Z.bind(this)}),(0,u.jsx)("label",{className:"did-floating-label",children:"Menu URL"})]}),(0,u.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,u.jsxs)("select",{className:"did-floating-select",name:"status",id:"status",value:this.state.status,onChange:this.drpHandleChange,onClick:this.drpHandleChange,onFocus:this.drpHandleChange,children:[(0,u.jsx)("option",{value:"1",children:"Active"}),(0,u.jsx)("option",{value:"0",children:"InActive"})]}),(0,u.jsx)("label",{className:"did-floating-label",children:"Status"})]}),(0,u.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",style:{display:this.state.isParentToggle?"block":"none"},children:[(0,u.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"app_folder",id:"app_folder",value:this.state.app_folder,onChange:r.Z.bind(this),onClick:r.Z.bind(this)}),(0,u.jsx)("label",{className:"did-floating-label",children:"App Folder"})]}),(0,u.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3 did-floating-label-content",children:[(0,u.jsx)("input",{className:"did-floating-input",type:"text",placeholder:" ",name:"folder_size",id:"folder_size",required:!0,value:this.state.folder_size,onChange:r.Z.bind(this),onClick:r.Z.bind(this)}),(0,u.jsx)("label",{className:"did-floating-label",children:"Folder Size"}),(0,u.jsx)("div",{className:"form-helper helper_hide",id:"folder_size_helper",children:"Required"})]}),(0,u.jsxs)("div",{className:"col-lg-9 col-md-9 col-sm-9 did-floating-label-content",style:{display:this.state.isParentToggle?"block":"none"},children:[(0,u.jsx)("textarea",{className:"did-floating-input",style:{height:"auto"},type:"text",placeholder:" ",cols:"60",rows:"3",name:"parent_icon",id:"parent_icon",value:this.state.parent_icon,onChange:r.Z.bind(this),onClick:r.Z.bind(this)}),(0,u.jsx)("label",{className:"did-floating-label",children:"Icon SVG"}),(0,u.jsx)("div",{className:"form-helper helper_hide",id:"parent_icon_helper",children:"Required"})]}),(0,u.jsx)(d.Z,{form_type:x,list_page:g})]})]})})})}}const f=b},42609:(e,t,s)=>{s.d(t,{Z:()=>i});const i=function(e){const t=document.getElementById(e.target.name+"_helper");null!==t&&(""===e.target.value?t.classList.contains("helper_hide")&&t.classList.remove("helper_hide"):t.classList.add("helper_hide"),setTimeout((()=>{t.classList.add("helper_hide")}),"10000")),document.getElementById(e.target.id).style.border="1px solid grey",this.setState({[e.target.name]:"",[e.target.name]:e.target.value})}},70068:(e,t,s)=>{s.d(t,{Z:()=>g});var i=s(72791),a=s(74381),l=s(12576),n=s(11087),r=s(84805),o=s(55849),d=s(2002),c=s(36161),h=s(72426),p=s.n(h),m=s(80184);class u extends i.Component{constructor(e){super(e),this.sendFormRequest=e=>{this.props.parentCallback(e.target.id)},this.showAuditTrail=async e=>{console.log(this.props.slug_id),this.setState({open:!0}),await fetch("/".concat("common-app","/userMaster/userMasterAuditTrailAPI/?slug=").concat(this.props.slug_id,"&page_size=").concat("100000000")).then((e=>{if("Internal Server Error"===e.statusText){var t=window.location.origin;window.location.replace(t)}e.json().then((e=>{this.setState({auditTrail:e.results})}))}))},this.state={importDisplay:this.props.importDisplay,open:!1,auditTrail:[]}}render(){const e=[{dataField:"user_name",text:"User Name"},{dataField:"process_desc",text:"Process"},{dataField:"action_desc",text:"Action"},{dataField:"action_by",text:"Action By"},{dataField:"action_date",text:"Action Date",formatter:e=>p()(e).format("DD-MMM-YYYY HH:MM:SS A")},{dataField:"changes",text:"Changes"}];return(0,m.jsxs)("div",{className:"row form-name-row",style:{marginTop:"3px"},children:[(0,m.jsx)("div",{className:"col-lg-2 col-md-2 col-sm-2",style:{margin:"0px",paddingTop:"3px"},children:(0,m.jsx)("span",{style:{color:"brown"},children:this.props.form_name})}),(0,m.jsx)("div",{className:"col-lg-7 col-md-7 col-sm-7",style:{margin:"0",display:"flex"},children:(0,m.jsx)(a.Z,{placement:"bottom",overlay:(0,m.jsx)(l.Z,{id:"tooltip-disabled",children:"Please use this option to import data from Excel File"}),children:(0,m.jsxs)("div",{className:"input-group input-group-sm",style:{display:!0===this.state.importDisplay?"flex":"none"},children:[(0,m.jsx)("input",{className:"form-control",style:{width:"50%"},type:"file",id:"formFile",onChange:this.props.fileSelection}),(0,m.jsx)("span",{className:"btn btn-danger",style:{textDecoration:"none",color:"white"},onClick:this.props.import_data,children:"Import"})]})})}),(0,m.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3",style:{margin:"0px",paddingTop:"3px"},children:[(0,m.jsxs)(n.rU,{to:window.location.pathname.includes("pending")?"".concat(this.props.list_page,"/pendingApproval"):this.props.list_page,className:"back_to_list",style:{fontWeight:"500",color:"black",textDecoration:"none",cursor:"pointer",float:"right"},children:[(0,m.jsx)("svg",{style:{color:"brown",marginRight:"5px"},xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-left-circle-fill",viewBox:"0 0 16 16",children:(0,m.jsx)("path",{d:"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"})}),(0,m.jsx)("span",{style:{color:"black"},children:"Back to List"})]}),this.props.list_page.includes("userMaster")&&""!==this.props.slug_id?(0,m.jsxs)("div",{className:"audit_trail",id:"audit_trail",style:{fontWeight:"500",color:"black",textDecoration:"none",cursor:"pointer",float:"right",paddingLeft:"10px",paddingRight:"10px"},onClick:this.showAuditTrail,children:[(0,m.jsxs)("svg",{height:"18px",version:"1.1",viewBox:"0 0 20 21",width:"20px",children:[(0,m.jsx)("title",{}),(0,m.jsx)("desc",{}),(0,m.jsx)("defs",{}),(0,m.jsx)("g",{fill:"none","fill-rule":"evenodd",id:"Page-1",stroke:"none","stroke-width":"1",children:(0,m.jsx)("g",{fill:"#004a5d",id:"Core",opacity:"0.9",transform:"translate(-464.000000, -254.000000)",children:(0,m.jsx)("g",{id:"history",transform:"translate(464.000000, 254.500000)",children:(0,m.jsx)("path",{d:"M10.5,0 C7,0 3.9,1.9 2.3,4.8 L0,2.5 L0,9 L6.5,9 L3.7,6.2 C5,3.7 7.5,2 10.5,2 C14.6,2 18,5.4 18,9.5 C18,13.6 14.6,17 10.5,17 C7.2,17 4.5,14.9 3.4,12 L1.3,12 C2.4,16 6.1,19 10.5,19 C15.8,19 20,14.7 20,9.5 C20,4.3 15.7,0 10.5,0 L10.5,0 Z M9,5 L9,10.1 L13.7,12.9 L14.5,11.6 L10.5,9.2 L10.5,5 L9,5 L9,5 Z",id:"Shape"})})})})]}),(0,m.jsx)("span",{style:{color:"black",paddingLeft:"3px"},children:"Audit Trail"})]}):""]}),(0,m.jsxs)(r.Z,{centered:!0,open:this.state.open,onClose:()=>this.setState({open:!1}),onOpen:()=>this.setState({open:!0}),children:[(0,m.jsxs)(r.Z.Header,{children:["Audit Trail of ",this.props.trailFor]}),(0,m.jsx)(r.Z.Content,{children:(0,m.jsx)(d.Z,{keyField:"user_name",data:this.state.auditTrail,columns:e,striped:!0,hover:!0,condensed:!0,pagination:(0,c.ZP)(),noDataIndication:"No records found"})}),(0,m.jsx)(r.Z.Actions,{children:(0,m.jsx)(o.Z,{onClick:()=>this.setState({open:!1}),children:"OK"})})]})]})}}const g=u},79192:(e,t,s)=>{s.d(t,{Z:()=>i});const i=function(e){if(e.includes("Unexpected")||e.includes("Failed to fetch")){this.setState({loading:this.state.loading=!1}),alert("Session is expired!");var t=window.location.origin;window.location.replace(t)}else this.setState({loading:this.state.loading=!1})}},34548:(e,t,s)=>{s.d(t,{Z:()=>n});var i=s(72791),a=s(80184);class l extends i.Component{render(){return(0,a.jsxs)("div",{id:"error_alert",className:"alert alert-warning alert-dismissible ".concat(this.props.err_msg_visible?"alert-shown":"alert-hidden"),role:"alert",style:{display:this.props.err_msg_visible?"block":"none"},children:[(0,a.jsx)("strong",{children:"Error :"})," ",this.props.error_message]})}}const n=l},74291:(e,t,s)=>{s.d(t,{Z:()=>a});var i=s(79192);const a=async function(e,t){if(e.includes("=")||e.includes("%"))try{await fetch(e).then((async e=>e.json())).then((e=>{this.setState({details:e})}))}catch(s){let e=s.message;i.Z.call(this,e)}else document.title="".concat(t," Create"),this.setState({loading:!1})}},603:(e,t,s)=>{s.d(t,{Z:()=>l});var i=s(47955),a=s(79192);const l=async function(e,t){this.setState({loading:!0});const s={method:"POST",headers:(0,i.Z)(),body:JSON.stringify(this.state)};try{await fetch(t,s).then((async e=>e.json())).then((e=>{e.status?"Data saved successfully"===e.status?(this.setState({success_message:!0,err_msg_visible:!1,loading:!1}),setTimeout((()=>{this.setState({success_message:!1})}),"10000")):this.setState({redirect:!0}):e.error_msg&&(this.setState({err_msg_visible:!0,error_message:e.error_msg,loading:!1}),setTimeout((()=>{this.setState({err_msg_visible:!1})}),"10000"))}))}catch(l){let e=l.message;a.Z.call(this,e)}}},21352:(e,t,s)=>{s.d(t,{Z:()=>n});var i=s(72791),a=s(11087),l=s(80184);class n extends i.Component{constructor(){super(...arguments),this.sendFormRequest=e=>{this.props.parentCallback(e.target.id)}}render(){return(0,l.jsx)("div",{className:"row",style:{border:"none"},children:(0,l.jsxs)("div",{class:"bd-example submit_form",children:["Transaction"===this.props.form_type?window.location.pathname.includes("pending")?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("button",{type:"button",class:"btn btn-success",id:"approveBtn",onClick:this.props.approve,children:"Approve"}),(0,l.jsx)("button",{type:"button",class:"btn btn-info",id:"moreInfoBtn",onClick:this.props.moreInfoRejectModalShow,children:"More Info"}),(0,l.jsx)("button",{type:"button",class:"btn btn-danger",id:"rejectBtn",onClick:this.props.moreInfoRejectModalShow,children:"Reject"})]}):!1===this.props.disableButton?(0,l.jsxs)(l.Fragment,{children:[""===this.props.status||"DRAFT"===this.props.status?(0,l.jsx)("button",{type:"submit",class:"btn btn-primary",id:"draftBtn",onClick:this.props.onSubmit,disabled:this.props.disableButton,children:"Save in Draft"}):"",(0,l.jsx)("button",{type:"submit",class:"btn btn-success",id:"submitBtn",onClick:this.props.onSubmit,disabled:this.props.disableButton,children:"Submit"})]}):"":(0,l.jsx)("button",{type:"submit",class:"btn btn-success",id:"submitBtn",onClick:this.props.onSubmit,children:"Save & Close"}),(0,l.jsx)(a.rU,{className:"btn btn-secondary",to:window.location.pathname.includes("pending")?"".concat(this.props.list_page,"/pendingApproval"):this.props.list_page,style:{textDecoration:"none",color:"white"},children:"Back to List"})]})})}}},71237:(e,t,s)=>{s.d(t,{Z:()=>i});const i=function(){if(window.innerWidth<="767"){const e=document.getElementById("side-nav-bar");e.classList.contains("sidebar-transform")&&e.classList.remove("sidebar-transform")}}}}]);
//# sourceMappingURL=378.f867d17b.chunk.js.map