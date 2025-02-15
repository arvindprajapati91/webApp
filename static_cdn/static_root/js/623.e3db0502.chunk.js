"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[623],{7135:(e,t,s)=>{s.d(t,{A:()=>a});const a=function(e){const t=document.getElementById(e.target.name+"_helper");null!==t&&(""===e.target.value?t.classList.contains("helper_hide")&&t.classList.remove("helper_hide"):t.classList.add("helper_hide"),setTimeout((()=>{t.classList.add("helper_hide")}),"10000")),document.getElementById(e.target.id).style.border="1px solid grey",this.setState({[e.target.name]:"",[e.target.name]:e.target.value})}},86985:(e,t,s)=>{s.d(t,{A:()=>a});const a=function(e){if(e.includes("Unexpected")||e.includes("Failed to fetch")){this.setState({loading:this.state.loading=!1}),alert("Session is expired!");var t=window.location.origin;window.location.replace(t)}else this.setState({loading:this.state.loading=!1})}},8900:(e,t,s)=>{s.d(t,{A:()=>i});var a=s(65043),r=s(70579);class n extends a.Component{render(){return(0,r.jsxs)("div",{id:"error_alert",className:"alert alert-warning alert-dismissible ".concat(this.props.err_msg_visible?"alert-shown":"alert-hidden"),role:"alert",style:{display:this.props.err_msg_visible?"block":"none"},children:[(0,r.jsx)("strong",{children:"Error :"})," ",this.props.error_message]})}}const i=n},76309:(e,t,s)=>{s.d(t,{A:()=>a});const a=function(){if(window.innerWidth<="767"){const e=document.getElementById("side-nav-bar");e.classList.contains("sidebar-transform")&&e.classList.remove("sidebar-transform")}}},41107:(e,t,s)=>{s.d(t,{A:()=>W});var a=s(65043),r=s(22166),n=s(61747),i=s.n(n),o=s(83910),l=s(97929),c=s(31924),d=s(18148),h=s(70579);var p="";class m extends a.Component{constructor(e){super(e),this.drphandleChange=e=>{this.setState({searchValue:e.target.value});const t=e.target.name,s=e.target.value;this.props.onPropertyChange(t,s),this.props.onChangeText(e),this.props.onSearch()},this.dateChange=(e,t)=>{let{name:s,value:a}=t;if(this.state.hasOwnProperty(s)){this.setState({[s]:a});const e=s;p=a,this.props.onPropertyChange(e,p),this.props.onSearch()}else{const e=s;p=a,this.props.onPropertyChange(e,p),this.props.onSearch()}},this.clearSearch=e=>{this.setState({clearIcon:!1}),this.props.onChangeText(e);var t=e.target.id.replace("close_","");document.getElementById(t).value="",this.props.onPropertyChange(t,"");var s=e.target.id,a=s.replace("close_","");document.getElementById("search_"+a).style.display="flex",document.getElementById("close_"+a).style.display="none",document.getElementById("close_"+s).classList.remove("searched"),this.onSearchClick()},this.state={searchValue:"",clearIcon:!1,updated_date:""},this.handleChange=this.handleChange.bind(this),this.onSearchClick=this.onSearchClick.bind(this),this.caretOrderBy=this.caretOrderBy.bind(this)}handleChange(e){this.setState({searchValue:e.target.value});const t=e.target.name,s=e.target.value;this.props.onPropertyChange(t,s),this.props.onChangeText(e),""===e.target.value?document.getElementById("close_"+t).style.display="none":(document.getElementById("close_"+t).style.display="none",document.getElementById("search_"+t).style.display="flex")}onSearchClick(e){this.props.onSearch();var t=e.target.id.replace("search_","");document.getElementById("search_"+t).style.display="none",document.getElementById("close_"+t).style.display="flex",document.getElementById("close_"+t).classList.add("searched")}caretOrderBy(e){p="";const t=e.currentTarget.attributes.caret_id.value;this.props.onOrderBy(t)}render(){return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("span",{style:{cursor:"pointer",fontSize:"14px",color:"#004a5d",marginLeft:"5px"},caret_id:this.props.field_name,onClick:this.caretOrderBy,children:[this.props.columnName,(0,h.jsx)("span",{style:{float:"right",color:"black",fontSize:"smaller"},className:"caret_up_hide",id:this.props.field_name+"_caret",children:(0,h.jsx)(o.g,{icon:l.S$_})})]}),(0,h.jsxs)("div",{className:"input-group search-field",children:[(0,h.jsx)("label",{className:"visually-hidden",for:this.props.field_name}),(0,h.jsx)("div",{className:"ui icon input search_input",children:"dropdown"!==this.props.search_type?(0,h.jsx)(h.Fragment,{children:"datepicker"===this.props.search_type?(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(c.J3,{type:"textChanged",className:"date_input prompt",id:this.props.field_name,name:this.props.field_name,value:p,onChange:this.dateChange,placeholder:"DD-MMM-YYYY",iconPosition:"left",dateFormat:"DD-MMM-YYYY",icon:"calendar alternate",clearable:!0,clearIcon:(0,h.jsx)(d.A,{name:"remove",color:"red",className:"calender_icon"})})}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("input",{className:"prompt",type:"textChanged",id:this.props.field_name,placeholder:"Search","aria-label":"Search",name:this.props.field_name,value:this.state[this.props.field_name],onChange:this.handleChange}),(0,h.jsx)("i",{className:"close icon",type:"textRemove",id:"close_"+this.props.field_name,clearName:this.props.field_name,style:{display:!0===this.state.clearIcon?"block":"none",cursor:"pointer"},onClick:this.clearSearch}),(0,h.jsx)("i",{className:"search icon",id:"search_"+this.props.field_name,onClick:this.onSearchClick})]})}):(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)("select",{class:"form-select",type:"textChanged",placeholder:"Search","aria-label":"Search",id:this.props.field_name,name:this.props.field_name,value:this.state[this.props.field_name],onChange:this.drphandleChange,children:[(0,h.jsx)("option",{value:"",selected:!0,children:"All / Selection from List"}),"status"===this.props.field_name?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("option",{value:"1",children:"Active"}),(0,h.jsx)("option",{value:"0",children:"InActive"})]}):"is_parent"===this.props.field_name?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("option",{value:"1",children:"Parent"}),(0,h.jsx)("option",{value:"0",children:"Child"})]}):"invested"===this.props.field_name||"nifty_stock"===this.props.field_name?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("option",{value:"1",children:"Yes"}),(0,h.jsx)("option",{value:"0",children:"No"})]}):""]})})})]})]})}}const g=(0,r.Ng)((e=>({message:e.message})),(e=>({onChangeText:t=>e({type:t.target.attributes.type.value,payload:t})})))(m);var u=s(7135),_={};function f(e){var t=[];for(var s in e)t.push(encodeURIComponent(s)+"="+encodeURIComponent(e[s]));return t.join("&")}const x=function(e,t){for(var s in _){var a=document.getElementById(s);null!==a?""===a.value&&delete _[s]:delete _[s]}if(""===t||"---select---"===t){delete _[e];var r=f(_);this.setState({searchParam:this.state.searchParam=r,pageCount:this.state.pageCount="",currentPage:this.state.currentPage=0}),this.refreshList()}else{_[e]=t;r=f(_);this.setState({searchParam:this.state.searchParam=r,currentPage:this.state.currentPage=0})}};var y=s(23590);class v extends a.Component{constructor(e){super(e),this.state={defaultActivePage:1}}render(){return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)("div",{className:"row pagination_row",children:[(0,h.jsxs)("div",{className:"col-lg-3 col-md-3 col-sm-3",style:{paddingTop:"5px",color:"#004a5d"},children:["Show",(0,h.jsxs)("select",{className:"btn btn-secondary dropdown-toggle page_dorpdown",name:"perPage",id:"perPage",value:this.props.perPageValue,onChange:this.props.onChange,children:[(0,h.jsx)("option",{value:"10",children:"10"}),(0,h.jsx)("option",{value:"20",children:"20"}),(0,h.jsx)("option",{value:"50",children:"50"}),(0,h.jsx)("option",{value:"100",children:"100"})]}),"Entries"]}),(0,h.jsx)("div",{className:"col-lg-4 col-md-4 col-sm-4"}),(0,h.jsx)("div",{className:"col-lg-5 col-md-5 col-sm-5",children:(0,h.jsx)(y.A,{defaultActivePage:this.props.currentPageValue,ellipsisItem:{content:(0,h.jsx)(d.A,{name:"ellipsis horizontal"}),icon:!0},firstItem:{content:(0,h.jsx)(d.A,{name:"angle double left"}),icon:!0},lastItem:{content:(0,h.jsx)(d.A,{name:"angle double right"}),icon:!0},prevItem:{content:(0,h.jsx)(d.A,{name:"angle left"}),icon:!0},nextItem:{content:(0,h.jsx)(d.A,{name:"angle right"}),icon:!0},totalPages:this.props.pageCountValue,onPageChange:this.props.onPageChange})})]})})}}const j=v;const b=function(e){const t=e.currentTarget.attributes[3].value,s=document.getElementsByClassName("caret_up");s.length>0&&(s[0].classList.add("caret_up_hide"),s[0].classList.remove("caret_up")),this.setState({loading:!0,order_by:"desc",orderByField:"",defaultActivePage:parseInt(t)});var a="";a=""===e.target.innerText?parseInt(t):parseInt(e.target.innerText),this.state.pageCount!==a?this.setState({offset:a*this.state.perPage,defaultActivePage:parseInt(t)}):this.setState({offset:this.state.pageCount,defaultActivePage:parseInt(t)}),this.setState({currentPage:parseInt(a),defaultActivePage:parseInt(t)},(()=>{this.refreshList()}))};const C=function(e){const t=e.target.value,s=document.getElementsByClassName("caret_up");s.length>0&&(s[0].classList.add("caret_up_hide"),s[0].classList.remove("caret_up")),this.setState({perPage:e.target.value,selectedPage:0,loading:this.state.loading=!0,pageCount:this.state.pageCount="",currentPage:this.state.currentPage=0,order_by:this.state.order_by="",orderByField:this.state.orderByField=""}),this.refreshList(t)};const A=function(e){Array.from(document.querySelectorAll("input")).forEach((e=>e.value="")),Array.from(document.querySelectorAll("select")).forEach((e=>e.value="")),Array.from(document.getElementsByClassName("searched")).forEach((function(e,t,s){var a=e.id,r=a.replace("close_","search_");document.getElementById(a).style.display="none",document.getElementById(r).style.display="flex"})),"desc"===this.state.order_by?this.setState({order_by:this.state.order_by="asc",loading:!0}):this.setState({order_by:this.state.order_by="desc",loading:!0}),this.setState({orderByField:this.state.orderByField=e,currentPage:this.state.currentPage=0,offset:this.state.offset=0,searchParam:this.state.searchParam=""}),this.refreshList();const t=document.getElementsByClassName("caret_up");t.length>0&&(t[0].classList.add("caret_up_hide"),t[0].classList.remove("caret_up"));const s=document.getElementById(e+"_caret");s.classList.contains("caret_up_hide")&&"asc"===this.state.order_by?(s.classList.add("order_by_caret_down"),s.classList.add("caret_up"),s.classList.remove("caret_up_hide")):(s.classList.add("caret_up"),s.classList.remove("caret_up_hide"),s.classList.remove("order_by_caret_down"))};var S=s(35475),P=s(40359),w=s(10615);class N extends a.Component{render(){return(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(P.A,{placement:"right",delay:{show:100,hide:400},overlay:e=>(0,h.jsx)(w.A,{id:"button-tooltip",...e,children:"View/Edit"}),children:(0,h.jsx)(S.N_,{to:this.props.to_link,className:"doc_no","data-tip":!0,"data-for":"view_edit_tip",children:this.props.field_val})})})}}const L=N;var B=s(53171);const k={loadTemplate:!0,data_list:[],loading:!0,links:"",page_size:"",offset:0,perPage:"10",currentPage:1,pageCount:"",pageSize:"",fildName:"",fildValue:"",searchParam:"",dataCount:"",paginationDisplay:!1,order_by:"desc",orderByField:"",err_msg_visible:!1,error_message:"",show:!1,redirect:!1,action:"",navOrgName:""};var E=s(86985);const T=async function(e,t){this.setState({loading:!0,data_list:""});var s="";s=t>this.state.perPage?"&page=".concat(this.state.currentPage+1):this.state.currentPage>0?"&page=".concat(this.state.currentPage):"";var a="";a=""!==this.state.orderByField?"".concat(e,"?order_field=").concat(this.state.orderByField,"&order_by=").concat(this.state.order_by,"&").concat(this.state.searchParam):""===this.state.searchParam?"".concat(e,"?page_size=").concat(t).concat(s):this.state.currentPage+1>1?"".concat(e,"?").concat(this.state.searchParam).concat(s):"".concat(e,"?").concat(this.state.searchParam,"&page_size=").concat(t);try{await fetch("".concat(a,"&org=").concat(this.state.navOrgName)).then((async e=>e.json())).then((e=>{if(!1===this.state.paginationDisplay&&e.count>this.state.perPage&&this.setState({paginationDisplay:this.state.paginationDisplay=!0,currentPage:this.state.currentPage}),this.state.pageCount!==this.state.currentPage){let t="";t=0===this.state.currentPage?this.state.currentPage+1:this.state.currentPage,this.setState({pageCount:this.state.pageCount=Math.ceil(e.count/e.results.length),currentPage:t})}else t>this.state.perPage?this.setState({pageCount:this.state.pageCount=Math.ceil(e.count/e.results.length),currentPage:this.state.currentPage}):this.setState({pageCount:this.state.pageCount=this.state.pageCount});this.setState({data_list:this.state.data_list=e.results,loading:this.state.loading=!1,dataCount:this.dataCount=e.count})}))}catch(r){let e=r.message;E.A.call(this,e)}};var I=s(84241);class F extends a.Component{constructor(e){super(e),this.auditTrail=e=>{this.setState({modalShow:!0,modalTitle:"Audit Trail",doc_no:e.target.id}),fetch("/".concat("common-app","/auditTrail/transaction_audit_trail_view/?doc_id=").concat(e.target.attributes.trn_id.value,"&process=").concat(e.target.attributes.process_name.value)).then((e=>{if("Internal Server Error"===e.statusText){var t=window.location.origin;window.location.replace(t)}e.json().then((e=>{this.setState({trailList:e,trailLoading:!1})}))}))},this.pendingApproval=e=>{this.setState({modalShow:!0,modalTitle:"Pending for Approval",doc_no:e.target.id}),fetch("/".concat("common-app","/listPagePendingApprovalAPI/?doc_id=").concat(e.target.attributes.trn_id.value,"&process=").concat(e.target.attributes.process_name.value)).then((e=>{if("Internal Server Error"===e.statusText){var t=window.location.origin;window.location.replace(t)}e.json().then((e=>{this.setState({trailList:e,trailLoading:!1})}))}))},this.handleClose=e=>{this.setState({modalShow:!1,trailList:this.state.trailList=[],modalTitle:"",doc_no:"",trailLoading:!0})},this.state={modalShow:!1,trailList:[],trailLoading:!0,modalTitle:""}}render(){return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(I.A,{show:this.state.modalShow,onHide:this.handleClose,backdrop:"static",keyboard:!1,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,children:[(0,h.jsx)(I.A.Header,{closeButton:!0,children:(0,h.jsx)(I.A.Title,{children:this.state.modalTitle})}),(0,h.jsxs)(I.A.Body,{children:[(0,h.jsx)("div",{className:"col-lg-12 col-md-12 col-sm-12 did-floating-label-content",style:{margin:"0px"},children:(0,h.jsx)("span",{style:{fontSize:"15px",color:"brown"},children:this.state.doc_no})}),(0,h.jsx)("div",{className:"ui active dimmer",style:{display:!0===this.state.trailLoading?"block":"none",width:"97%",left:"0"},children:(0,h.jsx)("div",{class:"ui text loader",children:"Loading..."})}),(0,h.jsx)("div",{className:"table-responsive",style:{height:"auto"},children:(0,h.jsxs)("table",{className:"ui table-striped list_page_table",style:{borderLeft:"1px solid #ccc"},children:[(0,h.jsx)("thead",{children:(0,h.jsx)("tr",{children:"Audit Trail"===this.state.modalTitle?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("th",{style:{backgroundColor:"#f3f2f2",color:"rgb(49, 24, 97)"},children:"User Name"}),(0,h.jsx)("th",{style:{backgroundColor:"#f3f2f2",color:"rgb(49, 24, 97)"},children:"Action"}),(0,h.jsx)("th",{style:{backgroundColor:"#f3f2f2",color:"rgb(49, 24, 97)"},children:"Action Data & Time"}),(0,h.jsx)("th",{style:{backgroundColor:"#f3f2f2",color:"rgb(49, 24, 97)"},children:"Comments"})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("th",{style:{backgroundColor:"#f3f2f2",color:"rgb(49, 24, 97)"},children:"Role Code"}),(0,h.jsx)("th",{style:{backgroundColor:"#f3f2f2",color:"rgb(49, 24, 97)"},children:"Role Name"}),(0,h.jsx)("th",{style:{backgroundColor:"#f3f2f2",color:"rgb(49, 24, 97)"},children:"Pending With"})]})})}),(0,h.jsx)("tbody",{children:this.state.trailList.length>0?"Audit Trail"===this.state.modalTitle?this.state.trailList.map((e=>(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:e.user_name}),(0,h.jsx)("td",{children:e.action_desc}),(0,h.jsx)("td",{children:(0,h.jsx)(i(),{format:"DD-MMM-YYYY hh:mm:ss A",children:e.action_date})}),(0,h.jsx)("td",{children:e.comments})]}))):this.state.trailList.map((e=>(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:e.role_code}),(0,h.jsx)("td",{children:e.role_desc}),(0,h.jsx)("td",{children:e.user_name})]}))):(0,h.jsx)("tr",{children:(0,h.jsx)("td",{colSpan:"16",className:"no_record",children:"No Records to Display"})})})]})})]}),(0,h.jsx)(I.A.Footer,{children:(0,h.jsx)("button",{type:"button",className:"btn btn-secondary",onClick:this.handleClose,children:"Close"})})]})})}}const D=F;var V=s(42406),M=s(1880),O=s(41434),R=s(28068),Y=s(8900),z=s(8858);class Q extends a.Component{constructor(e){super(e),this.searchParam=()=>{const e=[],t=document.getElementsByTagName("th");for(const a of t){console.log(a);const t=a.getElementsByTagName("input");for(const s of t){const t=s.value;""!==t&&e.push("".concat(s.id,"=").concat(t))}}var s="";s=e.length>1?e.join("&"):e.join(""),e.length>0?this.setState({param:this.state.param="Yes",searchParam:this.state.searchParam=s}):this.setState({param:this.state.param="No",searchParam:this.state.searchParam=""})},this.downloadData=()=>{var e="";this.searchParam(),e="Yes"===this.state.param?"".concat(this.props.downLoadAPI,"?").concat(this.state.searchParam):"".concat(this.props.downLoadAPI),fetch(e).then((async e=>{if(500===e.status)return alert("".concat("Something went wrong, please contact to system admin"));e.blob().then((e=>{if("application/json"===e.type)this.setState({err_msg_visible:!0,error_message:"No Records Available",loading:!1}),setTimeout((()=>{this.setState({err_msg_visible:!1})}),"10000");else{let t=window.URL.createObjectURL(e),s=document.createElement("a");s.href=t,s.download="report.xlsx",s.click()}}))})).catch((e=>{console.error("Error:",e)}))},this.generateWSFun=async e=>{try{const t=document.getElementsByClassName("selected_row")[0];let s=t.id;if(s){let a=t.getAttribute("doc_no"),r="/".concat("common-app","/").concat(this.props.apiFormName,"/generateWSApi/");this.setState({obj_id:this.state.obj_id=s});const n={method:"POST",headers:(0,z.A)(),body:JSON.stringify(this.state)};try{const e=await fetch(r,n);if(e.ok){const t=await e.blob();if(t.size>0){let e=window.URL.createObjectURL(t),s=document.createElement("a");s.href=e,s.download="WS_".concat(a),s.click(),this.setState({loading:!1})}else this.setState({loading:this.state.loading=!1}),alert("Something went wrong, kindly check with administrator")}}catch(e){let t=e.message;E.A.call(this,t)}}}catch(e){return alert("Select record to generate Worksheet!")}},this.state={param:"No"}}render(){return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:"row form-name-row",children:[(0,h.jsx)("div",{className:"col-lg-3 col-md-3 col-sm-3",style:{margin:"0px",paddingTop:"3px"},children:(0,h.jsx)("span",{className:"form_name",style:{color:"brown",fontSize:"15px"},children:(this.props.form_name,"".concat(this.props.form_name))})}),(0,h.jsxs)("div",{className:"col-lg-9 col-md-9 col-sm-9",style:{margin:"0",textAlign:"right",paddingTop:"4px"},children:["Automation"!==this.props.form_type&&"Organisation List"!==this.props.form_name?(0,h.jsxs)(S.N_,{to:this.props.to_page,style:{textDecoration:"none",backgroundColor:"none",border:"none",fontSize:"14px",color:"black"},children:[(0,h.jsx)("img",{src:R,style:{width:"20px",marginLeft:"3px",marginRight:"2px"},alt:"add_icon"}),"Create ",this.props.form_name.replace("List","")]}):"",!0===this.props.generateWS?(0,h.jsxs)("span",{onClick:this.generateWSFun,style:{backgroundColor:"none",border:"none",cursor:"pointer",fontSize:"14px",color:"black"},children:[(0,h.jsx)(O.TBA,{style:{fontSize:"20px",color:"brown"}}),"Generate Worksheet"]}):""]})]}),(0,h.jsx)(Y.A,{error_message:this.state.error_message,err_msg_visible:this.state.err_msg_visible})]})}}(0,r.Ng)((e=>({rdState:e})))(Q);var H=s(73216);class U extends a.Component{constructor(e){super(e),this.searchOn=()=>{this.setState({order_by:"desc",orderByField:this.state.orderByField=""}),this.refreshList();const e=document.getElementsByClassName("caret_up");e.length>0&&(e[0].classList.add("caret_up_hide"),e[0].classList.remove("caret_up"))},this.auditTrailModalShow=e=>{this.listPageModal.current.auditTrail(e)},this.pendingApprovalModalShow=e=>{this.listPageModal.current.pendingApproval(e)},this.onRowClick=e=>{const t=Array.from(document.getElementsByClassName("selected_row"));t.length>0&&t[0].classList.remove("selected_row"),e.target.parentElement.classList.add("selected_row")},this.iconClick=e=>{this.setState({redirect_obj_id:e.currentTarget.id,redirect:!0,action:e.currentTarget.attributes.action.nodeValue})},this.rowEditFun=e=>{document.getElementsByClassName("edit_row_"+e.currentTarget.id)[0].style.display="none",document.getElementsByClassName("update_row_"+e.currentTarget.id)[0].style.display="inline-flex";var t=document.getElementsByClassName("table_div_"+e.currentTarget.id);for(const a of t)a.style.display="none";var s=document.getElementsByClassName("table_input_"+e.currentTarget.id);for(const a of s)a.style.display="inline-flex"},this.rowUpdateFun=e=>{document.getElementsByClassName("edit_row_"+e.currentTarget.id)[0].style.display="inline-flex",document.getElementsByClassName("update_row_"+e.currentTarget.id)[0].style.display="none";var t=document.getElementsByClassName("table_div_"+e.currentTarget.id);for(const a of t)a.style.display="inline-flex";var s=document.getElementsByClassName("table_input_"+e.currentTarget.id);for(const a of s)a.style.display="none"},this.state=k,this.ToggleClick=B.A.bind(this),this.listPageModal=a.createRef()}async refreshList(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.perPage;const t=window.location.pathname;var s="";this.setState({navOrgName:this.state.navOrgName=this.props.navOrgName}),!1===this.props.adminAccess&&""===this.props.navOrgName?(this.setState({loading:!1}),alert("Please change the organization to view list")):(!0===this.props.adminAccess||!1===this.props.adminAccess&&""!==this.props.navOrgName)&&(t.includes("pending")?(s="".concat(this.props.listAPI,"pendingApproval/?process=").concat(this.props.form_name),T.call(this,s,e)):(s=this.props.listAPI,T.call(this,s,e)))}async componentDidMount(){for(var e in M.A.get())"csrftoken"!==e&&M.A.remove(e);this.refreshList(),document.title=this.props.form_name,this.setState({createUpdatePath:this.props.to_page})}render(){return this.state.redirect?""!==this.state.action?(0,h.jsx)(H.C5,{to:"".concat(this.props.to_page,"/").concat(this.state.action,"=").concat(this.state.redirect_obj_id)}):(0,h.jsx)(H.C5,{to:"/".concat("common-app","/").concat(this.props.form_name,"/").concat(this.state.action,"=").concat(this.state.redirect_obj_id)}):(0,h.jsx)(h.Fragment,{children:this.state.loadTemplate?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(V.A,{load:this.state.loading}),(0,h.jsx)(Q,{form_name:this.props.form_name,form_type:this.props.form_type,to_page:this.props.to_page,generateWS:this.props.generateWS,apiFormName:this.props.apiFormName,downLoadAPI:this.props.downLoadAPI}),(0,h.jsxs)("div",{className:"row list_page_row",children:[(0,h.jsx)("div",{className:"col-lg-12 col-md-12 col-sm-12",children:(0,h.jsx)("div",{className:"table-responsive",children:(0,h.jsxs)("table",{id:"transaction"===this.props.form_type?"t_list_page_table":"list_page_table",className:"ui table-striped list_page_table",children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:["transaction"===this.props.form_type?(0,h.jsx)("th",{children:(0,h.jsx)("div",{style:{width:"150px",color:"rgb(49, 24, 97)"}})}):"",this.props.tableHeaderList.map((e=>(0,h.jsx)("th",{children:(0,h.jsx)(g,{columnName:e.cn,search_type:e.st,field_value:e.fv,field_name:e.sv,onPropertyChange:x.bind(this),onSearch:this.searchOn,onOrderBy:A.bind(this)})}))),"transaction"===this.props.form_type?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("th",{children:(0,h.jsx)("div",{style:{width:"80px",color:"rgb(49, 24, 97)"},children:"Audit Trail"})}),(0,h.jsx)("th",{children:(0,h.jsx)("div",{style:{width:"80px",color:"rgb(49, 24, 97)"},children:"Pending for Approval"})})]}):""]})}),(0,h.jsx)("tbody",{style:{fontSize:"13px"},children:this.state.data_list.length>0?this.state.data_list.map((e=>(0,h.jsxs)("tr",{className:"",onClick:this.onRowClick,id:e.id,doc_no:e.document_no,children:[this.props.tableHeaderList.map((t=>"code"===t.fv?(0,h.jsx)("td",{children:void 0===e.my_absolute_url?e[t.fn]:(0,h.jsx)(L,{to_link:e.my_absolute_url.substring(0,e.my_absolute_url.length-1),field_val:e[t.fn]})}):"admin_only"===t.fn&&!0===e[t.fn]?(0,h.jsx)("td",{children:"true"}):"admin_only"===t.fn&&!1===e[t.fn]?(0,h.jsx)("td",{children:"false"}):"status"===t.fn&&!0===e[t.fn]?(0,h.jsx)("td",{children:"Active"}):"status"===t.fn&&!1===e[t.fn]?(0,h.jsx)("td",{children:"InActive"}):"Date"===t.fv?(0,h.jsx)("td",{children:(0,h.jsx)(i(),{format:"DD-MMM-YYYY",children:e[t.fn]})}):"is_parent"===t.fn&&!0===e[t.fn]?(0,h.jsx)("td",{children:"Parent"}):"is_parent"===t.fn&&!1===e[t.fn]?(0,h.jsx)("td",{children:"Child"}):"invested"===t.fn&&!0===e[t.fn]?(0,h.jsx)("td",{children:"Yes"}):"invested"===t.fn&&!1===e[t.fn]?(0,h.jsx)("td",{children:"No"}):"nifty_stock"===t.fn&&!0===e[t.fn]?(0,h.jsx)("td",{children:"Yes"}):"nifty_stock"===t.fn&&!1===e[t.fn]?(0,h.jsx)("td",{children:"No"}):"json_file"===t.fv?(0,h.jsx)("td",{children:(0,h.jsx)("a",{href:"/media/file_upload/".concat(e[t.fn]),download:!0,children:e[t.fn]})}):(0,h.jsxs)("td",{children:[(0,h.jsx)("div",{className:"table_div table_div_".concat(e.id),id:"div_".concat(e.id),style:{display:"contents"},children:e[t.fn]}),(0,h.jsx)("div",{className:"table_input",children:(0,h.jsx)("input",{type:"text",className:"form-control table_input_".concat(e.id),id:"input_".concat(e.id),name:"".concat(e[t.fn],"_").concat(e.id),value:e[t.fn],style:{display:"none"},onChange:u.A.bind(this)})})]}))),"transaction"===this.props.form_type?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("td",{children:(0,h.jsx)("a",{id:e.doc_no,trn_id:e.id,process_name:this.props.form_name,style:{color:"darkblue",cursor:"pointer",textDecoration:"underline"},onClick:this.auditTrailModalShow,children:"View"})}),(0,h.jsx)("td",{children:(0,h.jsx)("a",{id:e.doc_no,trn_id:e.id,process_name:this.props.form_name,style:{color:"darkblue",cursor:"pointer",textDecoration:"underline"},onClick:this.pendingApprovalModalShow,children:"View"})})]}):""]}))):(0,h.jsx)("tr",{children:(0,h.jsx)("td",{colSpan:"16",className:"no_record",children:"No Records to Display"})})})]})})}),this.state.data_list.length>0&&!0===this.state.paginationDisplay?(0,h.jsx)(j,{perPageValue:this.state.perPage,currentPageValue:this.state.currentPage,onChange:C.bind(this),pageCountValue:this.state.pageCount,onPageChange:b.bind(this),refreshList:this.refreshList}):"",(0,h.jsx)(D,{ref:this.listPageModal})]})]}):""})}}const W=(0,r.Ng)((e=>({navOrgName:e.navOrgName,adminAccess:e.adminAccess})))(U)},28068:e=>{e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACN0lEQVRo3u1ZS0/CQBA2vg4efZx8/AkjkRs3Q2jTlqTB6N2/oPHECbyjUeI/wPSRVLx48Ddo8Af4OAl4pl5wBmsUEsJud7vdaieZhFBov293duab6dRUaqmlxmxmw5xRbCNbcLVj1dGtgqM/Ko7+Dp8/0PEzXG8NruFvrOJ2uVyejh245mrrqm2cALhXANmn9BfF1ap5q7gmHHi+Ya7AatYBhB8C+Kj7QORc9dRlIeBVV9uDh3Y5AB/1TsE2diMDvlk/mINQuYwA+JADiQt8Ft9V99QFuPlN1OB/eROfyW/lxYL/9lvIbvPMBESEzViHw80Kfj828D8kSqHAG7axBDdox04AMl6oFBvk+b4MDpX9jK5QQXVkLVKjxlrsYBc2yFcf5QHjqnEmgGehSgQeRdZAp8hGAPQWikaSzJPlEbfcCXx5ZiIBlLuyEoDQPiLZAVvaHbCNKxICLWl3wNEfJhOgkMq8jIJEm4SALzGB3r8gkPAQSvwhTnoalbmQAbbDyUIOhk7ShpBV3CIVc88SEnginuahdJWQQCXJDU1P8ZRVuoYeJgKytJTgNeqeeKdhLkrS1HdCz01xVhl7Q28bJtNsCGeVMc6ETvm8vHB0RzR4mIJf5+5yszyHu02BBDxuw92hIa+IzARhw23lx6TXUkTZ6Y35wNLMTXHcNygw7MDxHjVM28LflWF1DGRHGO2E/6lQV9goLBCAGZzboGbHxiPo7PzAu/D9PV5DSYyqUorXrKml9gfsE+XjbLF2yWl6AAAAAElFTkSuQmCC"}}]);
//# sourceMappingURL=623.e3db0502.chunk.js.map