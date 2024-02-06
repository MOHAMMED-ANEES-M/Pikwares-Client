"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[19437,5750],{505025:(e,s,a)=>{a.d(s,{Oz:()=>r,mo:()=>n,nt:()=>i,v8:()=>t});let r={BUSINESS_ACCOUNT:"BUSINESS_ACCOUNT",BUSINESS_HIERARCHY:"BUSINESS_HIERARCHY",USER_ACCOUNT:"USER",AD_ACCOUNT:"AD_ACCOUNT",PROFILE:"PROFILE"},t="BUSINESS_PANEL",i="ASSET_PANEL",n=500},577937:(e,s,a)=>{a.d(s,{Fe:()=>r,bO:()=>n,eQ:()=>t,s4:()=>i});let r={BUSINESS_HIERARCHY_CHILD:"BUSINESS_HIERARCHY_CHILD",BUSINESS_HIERARCHY_MEMBER:"BUSINESS_HIERARCHY_MEMBER"},t={business_relationship_invite:"business_relationship"},i={PARTNER_REQUEST:"PARTNER_REQUEST",MEMBER_INVITE:"MEMBER_INVITE",PARTNER_INVITE:"PARTNER_INVITE",ORGANIZATION_MANAGER_INVITE:"ORGANIZATION_MANAGER_INVITE"},n=e=>0===e?"DIRECT_PERMISSION":"AGGREGATED_PERMISSION"},326884:(e,s,a)=>{a.d(s,{EF:()=>l,Hg:()=>h,Hl:()=>N,IR:()=>b,Je:()=>u,K3:()=>D,O1:()=>x,Q6:()=>E,QE:()=>r,V3:()=>S,Z4:()=>p,c7:()=>A,cU:()=>n,cg:()=>t,dZ:()=>i,gO:()=>y,j$:()=>v,j9:()=>O,pg:()=>U,pt:()=>C,qq:()=>g,sy:()=>c,tP:()=>I,uE:()=>m,vk:()=>P,w2:()=>d,we:()=>R,ww:()=>T,xX:()=>_,yR:()=>o});let r=3e3,t=280,i=500,n=1e4,_=250,d=_+1,u=50,c=50,l=20,o=20,E={DASHBOARD:"DASHBOARD",PEOPLE:"PEOPLE",PARTNERS:"PARTNERS",AD_ACCOUNTS:"AD_ACCOUNTS",AD_ACCOUNTS_PENDING_TAB:"AD_ACCOUNTS_PENDING_TAB",HISTORY:"HISTORY",PEOPLE_DETAIL:"PEOPLE_DETAIL",PARTNERS_DETAIL:"PARTNERS_DETAIL",SHARED_PARTNERS_DETAIL:"SHARED_PARTNERS_DETAIL",AD_ACCOUNTS_DETAIL:"AD_ACCOUNTS_DETAIL",PENDING_AD_ACCOUNTS_DETAIL:"PENDING_AD_ACCOUNTS_DETAIL",PEOPLE_INVITES:"PEOPLE_INVITES",PARTNERS_INVITES:"PARTNERS_INVITES",CHOOSER:"CHOOSER",PARTNERS_REQUEST_PAGE:"PARTNERS_REQUEST_PAGE",PARTNERS_INVITE_PAGE:"PARTNERS_INVITE_PAGE",PROFILES:"PROFILES",PROFILES_DETAIL:"PROFILES_DETAIL",PARTNERS_PENDING_TAB:"PARTNERS_PENDING_TAB",PEOPLE_PENDING_TAB:"PEOPLE_PENDING_TAB",USERS:"USERS",ACOUNTS:"ACCOUNTS",BUSINESS_SECURITY:"BUSINESS_SECURITY",SUPPORT_TOOL:"SUPPORT_TOOL",ASSETS:"ASSETS",ASSET_GROUPS:"ASSET_GROUPS",INVOICE_MANAGEMENT:"INVOICE_MANAGEMENT",BUSINESS_HIERARCHY:"BUSINESS_HIERARCHY",BUSINESS_HIERARCHY_BUSINESS_SECURITY:"BUSINESS_HIERARCHY_BUSINESS_SECURITY",MANAGERS:"MANAGERS",AUDIENCES:"AUDIENCES",SHARED_TAGS:"SHARED_TAGS",CATALOGS:"CATALOGS"},m={PARTNER:"PARTNER",PARTNER_ADMIN:"PARTNER_ADMIN"},p={ADVERTISER_OWNED_AD_ACCOUNT:"ADVERTISER_OWNED_AD_ACCOUNT",AGENCY_OWNED_AD_ACCOUNT:"AGENCY_OWNED_AD_ACCOUNT"},b={ASCENDING:"ASCENDING",DESCENDING:"DESCENDING"},A={AD_ACCOUNT:"AD_ACCOUNT",PERSON:"PERSON",PARTNER:"PARTNER"},N={PERSON:"PERSON",PARTNER:"PARTNER",PROFILE:"PROFILE"},y={ADMIN:"ADMIN",ANALYST:"ANALYST",FINANCE_MANAGER:"FINANCE_MANAGER",AUDIENCE_MANAGER:"AUDIENCE_MANAGER",CAMPAIGN_MANAGER:"CAMPAIGN_MANAGER",CATALOGS_MANAGER:"CATALOGS_MANAGER"},v=["ADMIN","ANALYST","FINANCE_MANAGER","AUDIENCE_MANAGER","CAMPAIGN_MANAGER","CATALOGS_MANAGER"],S={EMPLOYEE:"EMPLOYEE",BIZ_ADMIN:"BIZ_ADMIN",OWNER:"OWNER"},h=["PROFILE_PUBLISHER"],I={AD_ACCOUNT:0,PROFILE:2,ASSET_GROUP:3},T={0:"AD_ACCOUNT",2:"PROFILE",3:"ASSET_GROUP"},R={id:"0",is_pin_support_user:!0,biz_roles:[S.BIZ_ADMIN],business_roles:[S.BIZ_ADMIN],user:{username:"psupport",full_name:"Pinterest support",image_small_url:"https://i.pinimg.com/60x60_RS/f6/e9/3a/f6e93a06b500b2d87ffd32e1f56f7c6f.jpg",image_medium_url:"https://i.pinimg.com/150x150_RS/f6/e9/3a/f6e93a06b500b2d87ffd32e1f56f7c6f.jpg"}},C={ACTIVE:0,PENDING:1},D={ACTIVE:"active",PENDING:"pending"},O="filter_type",P={page:1,totalCount:0,limit:10,sortDirection:"ASCENDING",sortBy:void 0,searchBy:void 0,searchTerm:""},g={WARNING:"WARNING",DEFAULT:"DEFAULT"},x={BUSINESS_INVITE_INVALID:2932,BUSINESS_ACCESS_PERSONAL_ACCOUNT:2936,INVALID_USERNAME:90,ACCESS_DENIED:280,BUSINESS_RELATIONSHIP_ALREADY_EXISTS:2751,ODO_BUSINESS_RELATIONSHIP_ALREADY_EXISTS:53,BUSINESS_RELATIONSHIP_COUNT_EXCEEDED:2769,BUSINESS_NUMBER_MEMBERS_IN_POLICY_EXCEEDS:2938,ODO_BUSINESS_NUMBER_MEMBERS_IN_POLICY_EXCEEDS:66,ODO_BIZ_INVITE_EXISTS:71,INVALID_ODO_REQUEST:2755,BUSINESS_INVITE_STACKED_ERROR:2773,ACL_POLICY_NOT_FOUND:1110,BUSINESS_INVITE_NOT_EXIST:2770},U={ALL_TAGS:"ALL",OWNED:"OWNED",SHARED:"SHARED"}},23799:(e,s,a)=>{a.d(s,{Z:()=>u});var r=a(214494),t=a(479218),i=a(466225);function n(e,s,a){var r;return(s="symbol"==typeof(r=function(e,s){if("object"!=typeof e||null===e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var r=a.call(e,s||"default");if("object"!=typeof r)return r;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===s?String:Number)(e)}(s,"string"))?r:String(r))in e?Object.defineProperty(e,s,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[s]=a,e}class _{constructor(e={},s={},a=!1){n(this,"useBatching",!1),n(this,"flush",()=>{}),n(this,"_markExperimentAsActivated",e=>{}),n(this,"checkExperiment",(e,s)=>{var a;null!=s&&s.dangerouslySkipActivation||this._markExperimentAsActivated(e);let r=(null!==(a=this.active[e])&&void 0!==a?a:this.triggerable[e])||"";return{anyEnabled:(0,i.Z)(r),group:r}}),this.active=e,this.triggerable=s,this.useBatching=a}updateExperiments(e,s){e&&(this.active=e),s&&(this.triggerable=s)}}function d(e,s,a){var r;return(s="symbol"==typeof(r=function(e,s){if("object"!=typeof e||null===e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var r=a.call(e,s||"default");if("object"!=typeof r)return r;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===s?String:Number)(e)}(s,"string"))?r:String(r))in e?Object.defineProperty(e,s,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[s]=a,e}class u extends _{constructor(...e){super(...e),d(this,"_markExperimentAsActivated",e=>{let s=this.active[e];if(void 0===s&&void 0!==(s=this.triggerable[e])){this.active[e]=s;let a={experiment_name:e,...s?{experiment_group:s}:Object.freeze({})};this.useBatching?(this._queuedResource||(this._queuedResource=new t.Z("ActivateExperimentResource",e=>({experiments:e}))),this._queuedResource.enqueue(a)):r.Z.create("ActivateExperimentResource",a).callCreate({showError:!1})}}),d(this,"flush",()=>{this._queuedResource&&this._queuedResource.flush()})}}},125203:(e,s,a)=>{a.d(s,{Z:()=>t});let r=a(23799).Z,t=r},466225:(e,s,a)=>{a.d(s,{Z:()=>r});let r=e=>e.startsWith("enabled")||e.startsWith("employee")},165544:(e,s,a)=>{a.d(s,{$2:()=>_,Ah:()=>u,IW:()=>n,Vs:()=>c,dF:()=>l,sl:()=>d});var r=a(326884),t=a(49428),i=a(76041);let n=(e={},s={})=>{if(e.limit||e.sortBy||e.sortDirection||e.searchTerm)return 0;if(e.page){let a=e.limit||s.limit,r=e.page||s.page;return(r-1)*a}return s.startIndex||0},_=(e={},s)=>{if(e.limit||e.sortBy||e.sortDirection||e.searchTerm)return 0;if(e.page){let a=e.limit||s.limit,r=e.page||s.page;return(r-1)*a}return s.startIndex},d=(e,s,a,r)=>{let{businessId:t,...i}=a,{...n}=r;return{id:e,...n,...i,searchBy:i.searchBy,searchTerm:i.searchTerm||n.searchTerm,limit:i.limit||n.limit,page:i.page||n.page,sortBy:i.sortBy||n.sortBy,sortDirection:i.sortDirection||n.sortDirection,startIndex:s,...0===s&&{page:1}}},u=(e,s)=>s.reduce((s,a)=>({ids:s.ids.concat(e(a)),data:{...s.data,[e(a)]:a}}),{ids:[],data:{}}),c=(e,s)=>{var a,r,t,i,_;let d={page:null!==(a=e.page)&&void 0!==a?a:s.page,limit:null!==(r=e.limit)&&void 0!==r?r:s.limit,sortBy:null!==(t=e.sortBy)&&void 0!==t?t:s.sortBy,searchBy:e.searchBy,searchTerm:null!==(i=e.searchTerm)&&void 0!==i?i:s.searchTerm,sortDirection:null!==(_=e.sortDirection)&&void 0!==_?_:s.sortDirection},u=n(e,s);return{...d,startIndex:u,...0===u&&{page:1}}},l=async(e,s,a,n)=>{let _="PEOPLE"===a?i.JC:t.Eg,{data:{data:d=[],total_data_count:u}={}}=n?await n({limit:r.xX,startIndex:0})||{}:await _({...e,limit:r.xX,startIndex:0,id:(null==e?void 0:e.id)||""}),c=Math.ceil(u/r.xX);if(c<=1)return{data:{data:d,total_data_count:u}};let l=[...Array(c).keys()].slice(1),o=await Promise.allSettled(l.map(s=>n?n({limit:r.xX,startIndex:s*r.xX}):_({...e,limit:r.xX,startIndex:s*r.xX,id:(null==e?void 0:e.id)||""}))),E=o.reduce((e,s)=>{var a,r;return null!==(a=s.value)&&void 0!==a&&null!==(r=a.data)&&void 0!==r&&r.data&&(e=e.concat(s.value.data.data)),e},d);return{data:{data:E,total_data_count:u}}}},433835:(e,s,a)=>{a.d(s,{ib:()=>m,vf:()=>A,XV:()=>N,jC:()=>b,oC:()=>E,W3:()=>v,fc:()=>g,cE:()=>T,xZ:()=>y,lo:()=>x,N1:()=>O,BG:()=>P,eo:()=>C,pI:()=>I,cp:()=>R,G2:()=>D,cR:()=>S,GS:()=>$,JE:()=>U,EB:()=>o});var r=a(983722),t=a(131980),i=a(326884),n=a(186656),_=a(49428),d=a(76041);let u=async(e,s,a,r=[])=>{let t=await (0,n.Z)({url:e,method:"GET",data:s}),i={bookmark:void 0,data:{business_id:"",data:[]},...t.resource_response};if(!i.bookmark){let e=a(i.data);return e.push(...r),i.data}return await u(e,{...s,bookmark:i.bookmark},a,r.concat(...a(i.data)))},c={get:(e,s={})=>u(e,s,e=>e.data,[])};var l=a(239838);let o=async(e,s,a,r,t,i,n,u)=>"PARTNER"===i?await (0,_.SZ)({businessId:t,partnerId:e,assetId:r,roles:s,clientBusinessId:n,businessHierarchyNodeId:u}):await (0,d.Jg)({businessId:t,memberId:e,assetId:r,roles:s,permissions:a,businessHierarchyNodeId:u}),E=async(e,s,a,r)=>{if(0===s.length)return;let t=[];s.forEach(({assigneeIds:s,adAccountIds:i,roles:n})=>{0!==n.length&&s.forEach(s=>{i.forEach(i=>{t.push(o(s,n,n,i,e,a,void 0,r))})})}),await Promise.all(t)},m=async(e,s,a,r,t)=>{let i="PEOPLE"===r?"MEMBER_INVITE":"PARTNER_INVITE",_=s.reduce((e,s)=>{let a=Object.keys(s)[0],r=Object.values(s)[0],t=r.includes("ADMIN")?{[a]:["ADMIN"]}:s;return{...e,...t}},{}),d=a.map(s=>(0,n.Z)({url:`/ads/v4/business_access/businesses/${e}/invites/${s}/assets/access/`,method:"POST",data:{resource_id_to_roles:JSON.stringify(_),invite_type:i,business_hierarchy_node_id:t}}));await Promise.all(d)},p=e=>e.reduce((e,s)=>{let a=Object.keys(s)[0],r=Object.values(s)[0],t=r.includes("ADMIN")?{[a]:["ADMIN"]}:s;return{...e,...t}},{}),b=async(e,s,a,t)=>{var i,_;let{anyEnabled:d}=null!==(i=null===(_=(0,r.Z)())||void 0===_?void 0:_.experimentsClient.checkExperiment("business_access_invites_api_v4_migration"))&&void 0!==i?i:{},u=p(a);if(d){let a=await (0,n.Z)({url:`/ads/v4/business_access/businesses/${e}/partners/${s}/assets/access/`,method:"POST",data:{resource_id_to_roles:u}});return a.resource_response.data}let c=await (0,n.Z)({url:`ads/internal/business_access/businesses/${e}/partners/${s}/assets/access/`,method:"POST",data:{resource_id_to_roles:JSON.stringify(u),business_hierarchy_node_id:t}});return c.resource_response.data},A=async(e,s,a,r,t)=>{let i=s.reduce((e,s)=>{let a=Object.keys(s)[0],r=Object.values(s)[0],t=r.includes("ADMIN")?{[a]:["ADMIN"]}:s;return{...e,...t}},{}),_=a.map(s=>(0,n.Z)({url:`/ads/v4/business_access/businesses/${e}/invites/${s}/assets/access/`,method:"POST",data:{resource_id_to_roles:JSON.stringify(i),invite_type:r,business_hierarchy_node_id:t}}));await Promise.all(_)},N=async(e,s,a,r)=>{let t=s.reduce((e,s)=>{let a=Object.keys(s)[0],r=Object.values(s)[0],t=r.includes("ADMIN")?{[a]:["ADMIN"]}:s;return{...e,...t}},{}),i=await (0,n.Z)({url:`/ads/v4/business_access/businesses/${e}/invites/${a}/assets/access/`,method:"POST",data:{resource_id_to_roles:JSON.stringify(t),invite_type:"PARTNER_REQUEST",business_hierarchy_node_id:r}});return i.resource_response},y=async()=>{let e=await (0,n.Z)({url:"ads/v4/advertisers/countries/",method:"GET"});return e.resource_response.data},v=async(e,s,a,r,i,_)=>{let d=await (0,n.Z)({url:"/ads/v4/advertisers/",method:"POST",data:{owner_user_id:e,name:r,country:i,business_hierarchy_node_id:a,tos_id:_||(0,l.Fc)(t.tN[i]),...s&&{agency_user_id:s}}});return d.resource_response.data},S=async()=>{var e,s,a;let{anyEnabled:t}=null!==(e=null===(s=(0,r.Z)())||void 0===s?void 0:s.experimentsClient.checkExperiment("business_access_employees_api_v4_migration"))&&void 0!==e?e:{};if(t){let e=await (0,n.Z)({url:"/ads/v4/business_access/businesses/me/employers/"}),s=null===(a=e.resource_response.data)||void 0===a?void 0:a.data;return await Promise.all(s||[])}let i=await c.get("ads/internal/business_access/users/me/employers/"),_=i.data;return await Promise.all(_||[])},h=async({businessId:e,assetId:s,limit:a,sortBy:t="name",searchBy:_="name",searchTerm:d,startIndex:u,sortDirection:c,resourceType:l,permissions:o})=>{var E,m;let{anyEnabled:p}=null!==(E=null===(m=(0,r.Z)())||void 0===m?void 0:m.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==E?E:{},b={};s&&(b={...b,child_asset_id:s}),o&&(b={...b,permissions:o}),b&&0===Object.keys(b).length&&(b=void 0);let A=p?i.xX:i.cU,N=await (0,n.Z)({url:`/ads/v4/business_access/businesses/${e}/assets/`,data:{page_size:a||A,sort_by:t,search_by:_,start_index:u,search_value:d,sort_ascending:"ASCENDING"===c,resource_type:l,filters:b?JSON.stringify(b):void 0}});return N.resource_response},I=async({businessId:e,assetIds:s,resourceType:a,limit:t,sortBy:_,sortDirection:d="ASCENDING",searchBy:u,searchTerm:c="",startIndex:l=0,filtersPayload:o})=>{var E,m,p,b;let{anyEnabled:A}=null!==(E=null===(m=(0,r.Z)())||void 0===m?void 0:m.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==E?E:{},{anyEnabled:N}=null!==(p=null===(b=(0,r.Z)())||void 0===b?void 0:b.experimentsClient.checkExperiment("business_access_invites_api_v4_migration"))&&void 0!==p?p:{},y=A||N?i.xX:i.cU,v=t||Math.min(y,s.length),S=o&&Object.keys(o).length>0?{filters:JSON.stringify(o)}:{};return(await (0,n.Z)({url:`ads/v4/business_access/businesses/${e}/assets_by_ids`,data:{asset_ids:s,resource_type:a,page_size:v,sort_by:_,sort_direction:d,search_by:u,search_value:c,start_index:l,...S}})).resource_response},T=async({id:e,limit:s,sortBy:a="name",searchBy:t="name",searchTerm:i="",startIndex:_=0,sortDirection:d="ASCENDING",forPartner:u=!1,includeAssetSummary:c=!1})=>{var l,o;let{anyEnabled:E}=null!==(l=null===(o=(0,r.Z)())||void 0===o?void 0:o.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==l?l:{};if(E){let r=await h({id:e,businessId:e,limit:s,sortBy:a,searchBy:t,searchTerm:i,startIndex:_,sortDirection:d,resourceType:"AD_ACCOUNT",permissions:u?["OWNER"]:void 0});if(!c)return r;{let a=await I({businessId:e,assetIds:(null==r?void 0:r.data.data.map(e=>e.asset_id))||[],limit:s,resourceType:"AD_ACCOUNT"}),t=null==r?void 0:r.data.data.map(e=>({...e,...null==a?void 0:a.data.data[e.asset_id]}));return{...r,data:{...null==r?void 0:r.data,data:t}}}}{let r=await (0,n.Z)({url:`/ads/internal/business_access/businesses/${String(e)}/all_assets/`,data:{limit:s,sort_by:a,sort_ascending:"ASCENDING"===d,search_by:t,search_value:i,start_index:_,for_partner:u}});return r.resource_response}},R=async({id:e,limit:s,sortBy:a="name",sortDirection:t="ASCENDING",searchBy:_="name",searchTerm:d="",startIndex:u=0,forPartner:c})=>{var l,o;let{anyEnabled:E}=null!==(l=null===(o=(0,r.Z)())||void 0===o?void 0:o.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==l?l:{};if(E)return h({id:e,businessId:e,limit:s,sortBy:a,searchBy:_,searchTerm:d,startIndex:u,sortDirection:t,resourceType:"PROFILE"});{let r=await (0,n.Z)({url:`ads/internal/business_access/businesses/${e}/all_assets/`,data:{limit:s,sort_by:a,sort_ascending:"ASCENDING"===t,search_by:_,search_value:d,start_index:u,for_partner:c,type:i.tP.PROFILE}});return r.resource_response}},C=async({id:e,assetIds:s,limit:a,type:t})=>{var _,d;let{anyEnabled:u}=null!==(_=null===(d=(0,r.Z)())||void 0===d?void 0:d.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==_?_:{};if(u)return await I({businessId:e,resourceType:i.ww[t],assetIds:s});let c=await (0,n.Z)({url:`ads/internal/business_access/businesses/${e}/batch_assets/`,method:"GET",data:{limit:a,type:t,assets_ids:s.join(",")}});return c.resource_response},D=async({businessId:e,assetId:s,resourceType:a="AD_ACCOUNT",includeAssetSummary:t=!1})=>{var i,_,d;let{anyEnabled:u}=null!==(i=null===(_=(0,r.Z)())||void 0===_?void 0:_.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==i?i:{};if(u){let r=await h({id:e,businessId:e,searchBy:"id",searchTerm:s,assetId:s,resourceType:a});if(t){let s=await I({businessId:e,assetIds:(null==r?void 0:r.data.data.map(e=>e.asset_id))||[],limit:1,resourceType:"AD_ACCOUNT"}),a=null==r?void 0:r.data.data.map(e=>({...e,...null==s?void 0:s.data.data[e.asset_id]})),t={...r,data:{...null==r?void 0:r.data,data:null==a?void 0:a[0]}};return t}{let e={...r,data:{...null==r?void 0:r.data,data:null==r?void 0:null===(d=r.data)||void 0===d?void 0:d.data[0]}};return e}}let c=await (0,n.Z)({url:`ads/internal/business_access/businesses/${e}/assets/${s}/`,method:"GET"});return c.resource_response},O=async({businessId:e,assetId:s,limit:a,sortBy:t,searchBy:i,searchTerm:_,startIndex:d,sortDirection:u})=>{var c,l;let{anyEnabled:o}=null!==(c=null===(l=(0,r.Z)())||void 0===l?void 0:l.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==c?c:{};if(o){let r=await (0,n.Z)({url:`ads/v4/business_access/businesses/${e}/assets/${s}/partners/`,data:{page_size:a,sort_by:t,search_by:i||"FULL_NAME",start_index:d,search_value:_,sort_ascending:"ASCENDING"===u}});return r.resource_response}{let r=await (0,n.Z)({url:`ads/internal/business_access/businesses/${e}/assets/${s}/partners/`,data:{limit:a,sort_by:t,search_by:i||"full_name",start_index:d,search_value:_,sort_ascending:"ASCENDING"===u}}),c=r.resource_response;return c}},P=async({businessId:e,assetId:s,limit:a,sortBy:t,searchBy:i,searchTerm:_,startIndex:d,sortDirection:u})=>{var c,l;let{anyEnabled:o}=null!==(c=null===(l=(0,r.Z)())||void 0===l?void 0:l.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==c?c:{};if(o){let r=await (0,n.Z)({url:`ads/v4/business_access/businesses/${e}/assets/${s}/members/`,data:{page_size:a,sort_by:t,search_by:i||"FULL_NAME",start_index:d,search_value:_,sort_ascending:"ASCENDING"===u}});return r.resource_response}{let r=await (0,n.Z)({url:`ads/internal/business_access/businesses/${e}/assets/${s}/members/`,data:{limit:a,sort_by:t,search_by:i||"full_name",start_index:d,search_value:_,sort_ascending:"ASCENDING"===u}}),c=r.resource_response;return c}},g=async({id:e,businessId:s,assetId:a,limit:r,sortBy:t="name",searchBy:i="name",searchTerm:n,startIndex:_,sortDirection:d,resourceType:u="ASSET_GROUP"})=>h({id:e,businessId:s,assetId:a,limit:r,sortBy:t,searchBy:i,searchTerm:n,startIndex:_,sortDirection:d,resourceType:u}),x=async({id:e,businessId:s,limit:a,sortBy:r="name",searchBy:t="name",searchTerm:i,startIndex:n,sortDirection:_,resourceType:d="ASSET_GROUP"})=>h({id:e,businessId:s,limit:a,sortBy:r,searchBy:t,searchTerm:i,startIndex:n,sortDirection:_,resourceType:d}),U=async(e,s)=>{let a=await (0,n.Z)({url:`ads/v4/businesses/${e.businessId}/advertisers/metrics`,method:"POST",data:s});return a.resource_response.data},$=async(e,s)=>{let a=await (0,n.Z)({url:`ads/v4/business_hierarchy/${e.businessHierarchyId}/advertisers/metrics`,method:"POST",data:s});return a.resource_response.data}},49428:(e,s,a)=>{a.d(s,{Bq:()=>v,Cj:()=>E,Eg:()=>b,F0:()=>p,FA:()=>_,Jq:()=>o,K7:()=>m,M9:()=>S,OA:()=>T,Of:()=>y,SB:()=>N,SZ:()=>I,Zk:()=>l,c4:()=>A,ek:()=>u,h9:()=>h,qC:()=>d,w8:()=>c,wi:()=>R});var r=a(983722),t=a(326884),i=a(186656),n=a(165544);let _=async({businessId:e,requestIds:s,includeAssetSummary:a})=>{let r=await (0,i.Z)({url:`ads/internal/business_access/businesses/${e}/batch_partners/`,method:"GET",data:{partners:s,assets_summary:a}}),{data:{data:t}}={data:{},...r.resource_response};return t},d=async({businessId:e,requestIds:s,includeAssetSummary:a})=>{let r=await (0,i.Z)({url:`ads/internal/business_access/businesses/${e}/shared/batch_partners/`,method:"GET",data:{partners:s,assets_summary:a}}),{data:{data:t}}={data:{},...r.resource_response};return t},u=async(e,s)=>{var a,n;let{anyEnabled:_}=null!==(a=null===(n=(0,r.Z)())||void 0===n?void 0:n.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==a?a:{};if(_){let a=await (0,i.Z)({url:`ads/v4/business_access/businesses/${e}/partners/${s}/assets/`,method:"GET",data:{limit:t.cU}});return{data:[],business_id:"",partner_id:"",...a.resource_response.data}}let d=await (0,i.Z)({url:`ads/internal/business_access/businesses/${e}/partners/${s}/assets/`,method:"GET",data:{limit:t.cU}});return{data:[],business_id:"",partner_id:"",...d.resource_response.data}},c=async(e,s)=>{let a=await (0,i.Z)({url:`ads/internal/business_access/businesses/${e}/partners/${s}/asset_counts/`,method:"GET"});return a.resource_response.data},l=async({partnerId:e,role:s,businessId:a,businessHierarchyNodeId:t})=>{var n,_;let{anyEnabled:d}=null!==(n=null===(_=(0,r.Z)())||void 0===_?void 0:_.experimentsClient.checkExperiment("business_access_invites_api_v4_migration"))&&void 0!==n?n:{};if(d){let s=await (0,i.Z)({url:`ads/v4/business_access/businesses/${a}/partners/${e}/invite/`,method:"POST",data:{invite_type:"PARTNER_INVITE",business_hierarchy_node_id:t}});return s.resource_response}{let r=await (0,i.Z)({url:`ads/internal/business_access/businesses/${a}/partners/${e}/invite/`,method:"POST",data:{role_name:s,business_hierarchy_node_id:t}});return r.resource_response}},o=async({partnerId:e,role:s,businessId:a})=>{var t,n;let{anyEnabled:_}=null!==(t=null===(n=(0,r.Z)())||void 0===n?void 0:n.experimentsClient.checkExperiment("business_access_invites_api_v4_migration"))&&void 0!==t?t:{};if(_){let s=await (0,i.Z)({url:`ads/v4/business_access/businesses/${a}/partners/${e}/invite/`,method:"POST",data:{invite_type:"PARTNER_REQUEST"}});return s.resource_response}{let r=await (0,i.Z)({url:`ads/internal/business_access/businesses/${a}/partners/${e}/invite/`,method:"POST",data:{role_name:s,type:"PARTNER_REQUEST"}});return r.resource_response}},E=async({businessId:e,partnerId:s,businessHierarchyNodeId:a,role:r})=>{let t=await (0,i.Z)({url:`/ads/internal/business_access/businesses/${e}/partners/${s}/`,method:"DELETE",data:{role_name:r,business_hierarchy_node_id:a}});return t.resource_response},m=async({businessId:e,partnerId:s,businessHierarchyNodeId:a,role:r,partner_type:t})=>{let n=await (0,i.Z)({url:`/ads/v4/business_access/businesses/${e}/partners/${s}/`,method:"DELETE",data:{role_name:r,partner_type:t,business_hierarchy_node_id:a}});return n.resource_response},p=async({id:e,limit:s,sortBy:a="full_name",searchBy:r="full_name",searchTerm:t="",startIndex:n=0,sortDirection:_="ASCENDING",includeAssetSummary:d=!0})=>{let u=await (0,i.Z)({url:`/ads/internal/business_access/businesses/${e}/all_partners/`,method:"GET",data:{limit:s,sort_by:a,search_by:r,start_index:n,search_value:t,assets_summary:d?"true":"false",sort_ascending:"ASCENDING"===_}}),c={data:{data:[]},...u.resource_response};return c.data.data=c.data.data.map(s=>{var a;return(null==s?void 0:null===(a=s.created_by_biz)||void 0===a?void 0:a.id)===e&&(s.isAgencyPartner=!0),s}),c},b=async({id:e,limit:s,sortBy:a="full_name",searchBy:r=["FULL_NAME","BUSINESS_ID","USERNAME"],searchTerm:t="",startIndex:n=0,sortDirection:_="ASCENDING",includeAssetSummary:d,partnerType:u,partners:c=[]})=>{let l=await (0,i.Z)({url:`ads/v4/business_access/businesses/${e}/partners/`,data:{page_size:s,sort_by:a,search_by:r,start_index:n,search_value:t,assets_summary:d?"true":"false",sort_ascending:"ASCENDING"===_,partner_type:u,partner_ids:c}});return l.resource_response},A=async({businessId:e,partnerId:s,includeAssetSummary:a=!0})=>{var r,t;let n=await (0,i.Z)({url:`ads/internal/business_access/businesses/${e}/partners/${s}/`,method:"GET",data:{assets_summary:a?"true":"false "}});if((null===(r=n.resource_response.data)||void 0===r?void 0:null===(t=r.created_by_biz)||void 0===t?void 0:t.id)===e){let e={data:{isAgencyPartner:void 0},...n.resource_response};return e.data.isAgencyPartner=!0,e}return n.resource_response},N=async({businessId:e,partnerId:s,limit:a,sortBy:t,searchBy:n="name",searchTerm:_,startIndex:d,sortDirection:u})=>{var c,l;let{anyEnabled:o}=null!==(c=null===(l=(0,r.Z)())||void 0===l?void 0:l.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==c?c:{};if(o){let r=await (0,i.Z)({url:`ads/v4/business_access/businesses/${e}/partners/${s}/assets/`,method:"GET",data:{page_size:a,sort_by:t,..._&&{search_by:n},start_index:d,search_value:_,sort_ascending:"ASCENDING"===u,partner_type:"INTERNAL"}});return r.resource_response}let E=await (0,i.Z)({url:`ads/internal/business_access/businesses/${e}/partners/${s}/assets/`,method:"GET",data:{limit:a,sort_by:t,..._&&{search_by:n},start_index:d,search_value:_,sort_ascending:"ASCENDING"===u}});return E.resource_response},y=async({businessId:e,partnerId:s,limit:a,sortBy:t,searchBy:n="name",searchTerm:_,startIndex:d,sortDirection:u})=>{var c,l;let{anyEnabled:o}=null!==(c=null===(l=(0,r.Z)())||void 0===l?void 0:l.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==c?c:{};if(o){let r=await (0,i.Z)({url:`ads/v4/business_access/businesses/${e}/partners/${s}/assets/`,method:"GET",data:{page_size:a,sort_by:t,..._&&{search_by:n},start_index:d,search_value:_,sort_ascending:"ASCENDING"===u,partner_type:"EXTERNAL"}});return r.resource_response}let E=await (0,i.Z)({url:`ads/internal/business_access/businesses/${e}/shared/${s}/assets/`,method:"GET",data:{limit:a,sort_by:t,..._&&{search_by:n},start_index:d,search_value:_,sort_ascending:"ASCENDING"===u}});return E.resource_response},v=async({businessId:e,partnerId:s,limit:a,sortBy:r,searchBy:t="name",searchTerm:n,startIndex:_,sortDirection:d})=>{let u=await (0,i.Z)({url:`ads/v4/business_access/businesses/${e}/partners/${s}/assets/`,method:"GET",data:{page_size:a,sort_by:r,...n?{search_by:t}:{},start_index:_,search_value:n,sort_ascending:"ASCENDING"===d,resource_type:"ASSET_GROUP",partner_type:"INTERNAL"}});return u.resource_response},S=async(e,s,a=!1)=>{let _=await (0,n.dF)({id:e,partnerType:"INTERNAL"},s,"PARTNER"),d=_.data.data,u=await Promise.all(d.map(async({id:s})=>{var n,_;let{anyEnabled:d}=null!==(n=null===(_=(0,r.Z)())||void 0===_?void 0:_.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==n?n:{};if(d){let r=await (0,i.Z)({url:`ads/v4/business_access/businesses/${e}/partners/${s}/assets/`,method:"GET",data:{limit:t.xX,resource_type:t.ww[a?t.tP.PROFILE:t.tP.AD_ACCOUNT],partner_type:"INTERNAL"}});return r.resource_response.data}let u=await (0,i.Z)({url:`ads/internal/business_access/businesses/${e}/partners/${s}/assets/`,method:"GET",data:{limit:t.cU,type:a?t.tP.PROFILE:t.tP.AD_ACCOUNT}});return u.resource_response.data}));return d.map((e,s)=>({...e,assets:u[s].data}))},h=async({businessId:e,partnerId:s,assetId:a})=>{let r=await (0,i.Z)({url:`ads/internal/business_access/businesses/${e}/partners/${s}/assets/${a}/`,method:"GET"});return r.resource_response},I=async({businessId:e,partnerId:s,assetId:a,roles:t,clientBusinessId:n,businessHierarchyNodeId:_})=>{var d,u;let{anyEnabled:c}=null!==(d=null===(u=(0,r.Z)())||void 0===u?void 0:u.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==d?d:{};if(c){let r=await (0,i.Z)({url:`ads/v4/business_access/businesses/${e}/partners/${s}/assets/${a}/access/`,method:"PUT",data:{permissions:t.includes("ADMIN")?["ADMIN"]:t,business_hierarchy_node_id:_,...n?{client_business_id:n}:{}}});return r.resource_response.data}{let r=await (0,i.Z)({url:`ads/internal/business_access/businesses/${e}/partners/${s}/assets/${a}/access/`,method:"PUT",data:{finalRoles:t.includes("ADMIN")?["ADMIN"]:t,business_hierarchy_node_id:_,...n?{client_business_id:n}:{}}});return r.resource_response.data}},T=async({businessId:e,partnerId:s,assetId:a,businessHierarchyNodeId:t,partner_type:n="INTERNAL"})=>{var _,d;let{anyEnabled:u}=null!==(_=null===(d=(0,r.Z)())||void 0===d?void 0:d.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==_?_:{};if(u){let r=await (0,i.Z)({url:`ads/v4/business_access/businesses/${e}/partners/${s}/assets/${a}/access/`,method:"DELETE",data:{partner_type:n,business_hierarchy_node_id:t}});return r.resource_response.data}{let r=await (0,i.Z)({url:`ads/internal/business_access/businesses/${e}/partners/${s}/assets/${a}/access/`,method:"DELETE",data:{partner_type:n,business_hierarchy_node_id:t}});return r.resource_response.data}},R=async({businessId:e,assetId:s,limit:a,sortBy:r,searchBy:t="FULL_NAME",searchTerm:n,startIndex:_,sortDirection:d})=>{let u=await (0,i.Z)({url:`ads/v4/business_access/businesses/${e}/assets/${s}/partners/`,data:{page_size:a,sort_by:r,search_by:t,search_value:n,start_index:_,sort_ascending:"ASCENDING"===d}});return u.resource_response}},76041:(e,s,a)=>{a.d(s,{GL:()=>v,JC:()=>m,Jg:()=>S,QC:()=>A,UQ:()=>l,bP:()=>h,dx:()=>o,kF:()=>I,kH:()=>p,kJ:()=>u,kY:()=>b,mZ:()=>N,n5:()=>y,p6:()=>E,p_:()=>c});var r=a(983722),t=a(577937),i=a(326884),n=a(186656),_=a(433835),d=a(427135);let u=async({businessId:e,requestIds:s,includeAssetSummary:a})=>{let r=await (0,n.Z)({url:`ads/internal/business_access/businesses/${e}/batch_members/`,method:"GET",data:{members:s,assets_summary:a,extend_info_from_user_api:!0}}),{data:{data:t}}={data:{data:{}},...r.resource_response};return t},c=async(e,s,a,t)=>{var i,_;let{anyEnabled:d}=null!==(i=null===(_=(0,r.Z)())||void 0===_?void 0:_.experimentsClient.checkExperiment("business_access_invites_api_v4_migration"))&&void 0!==i?i:{};if(d){let r=await (0,n.Z)({url:`/ads/v4/business_access/businesses/${a}/members/batch_invite/`,method:"POST",data:{business_role:s,members:e}});return{data:[],...r.resource_response.data}}let u=await (0,n.Z)({url:`ads/internal/business_access/businesses/${a}/members/batch_invite/`,method:"POST",data:{role_name:s,members:e,business_hierarchy_node_id:t}});return{data:[],...u.resource_response.data}},l=async(e,s,a)=>{var _,u,c,l;let{anyEnabled:o}=null!==(_=null===(u=(0,r.Z)())||void 0===u?void 0:u.experimentsClient.checkExperiment("web_m10n_business_manager_api_loops_removal"))&&void 0!==_?_:{},{anyEnabled:E}=null!==(c=null===(l=(0,r.Z)())||void 0===l?void 0:l.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==c?c:{},m=E?await (0,n.Z)({url:`ads/v4/business_access/businesses/${e}/members/${s}/assets/`,method:"GET",data:{limit:i.xX,...0===a||1===a?{asset_permission_type:(0,t.bO)(a)}:{}}}):await (0,n.Z)({url:`ads/internal/business_access/businesses/${e}/members/${s}/assets/`,method:"GET",data:{limit:i.cU,...Number.isInteger(a)&&{asset_permission_type:a}}}),p={data:[],...m.resource_response.data};if(o)return p.data;{let e=p.data,s=e.map(d.P);return await Promise.all(s)}},o=async(e,s,a,t)=>{var i,_;let{anyEnabled:d}=null!==(i=null===(_=(0,r.Z)())||void 0===_?void 0:_.experimentsClient.checkExperiment("business_access_employees_api_v4_migration"))&&void 0!==i?i:{},u=await (0,n.Z)({url:`ads/${d?"v4":"internal"}/business_access/businesses/${e}/members/${s}/`,method:"DELETE",data:{...d?{business_role:a}:{role_name:[a]},business_hierarchy_node_id:t}});return{data:void 0,auxData:void 0,...u.resource_response.data}},E=async(e,s,a,t)=>{var i,_;let d=null!==(i=null===(_=(0,r.Z)())||void 0===_?void 0:_.experimentsClient.checkExperiment("business_access_employees_api_v4_migration").anyEnabled)&&void 0!==i&&i,u=await (0,n.Z)({url:d?`ads/v4/business_access/businesses/${a}/members/${s}/`:`ads/internal/business_access/businesses/${a}/members/${s}/`,method:"PUT",data:{...d?{business_role:e}:{role_name:e},...t?{business_hierarchy_node_id:t}:{}}});return u.resource_response.data},m=async({id:e,limit:s,filters:a,memberIds:r=[],sortBy:t="FULL_NAME",searchBy:i=["FULL_NAME","EMAIL","USERNAME"],searchTerm:_="",startIndex:d=0,sortDirection:u="ASCENDING",includeAssetSummary:c})=>{let l=await (0,n.Z)({url:`ads/v4/business_access/businesses/${e}/members/`,data:{page_size:s,member_ids:r.length?r.join(","):void 0,filters:a?JSON.stringify(a):void 0,sort_by:t,search_by:i,start_index:d,search_value:_,assets_summary:c?"true":"false",sort_ascending:"ASCENDING"===u,extend_info_from_user_api:!0}});return l.resource_response},p=async({id:e,limit:s,filters:a,sortBy:t="full_name",searchBy:_="full_name",searchTerm:d="",startIndex:u=0,sortDirection:c="ASCENDING",includeAssetSummary:l})=>{var o,E;let{anyEnabled:p}=null!==(o=null===(E=(0,r.Z)())||void 0===E?void 0:E.experimentsClient.checkExperiment("business_access_employees_api_v4_migration_part1"))&&void 0!==o?o:{};if(p){let r=Array.isArray(_)?_:[_],n=["FULL_NAME","USERNAME","BUSINESS_ID","EMAIL"].filter(e=>r.map(e=>e.toUpperCase().trim()).includes(e)),o=t.toUpperCase().trim()?"FULL_NAME":void 0;return m({businessId:e,id:e,limit:!s||s>i.xX?i.xX:s,filters:a,sortBy:o,searchBy:n,searchTerm:d,startIndex:u,sortDirection:c,includeAssetSummary:l})}let b=await (0,n.Z)({url:`/ads/internal/business_access/businesses/${e}/members/`,method:"GET",data:{limit:s,filters:a?JSON.stringify(a):void 0,sort_by:t,search_by:_,start_index:u,search_value:d,assets_summary:l?"true":"false",sort_ascending:"ASCENDING"===c,extend_info_from_user_api:!0}});return b.resource_response},b=async({id:e})=>{var s,a;let t=null!==(s=null===(a=(0,r.Z)())||void 0===a?void 0:a.experimentsClient.checkExperiment("business_access_employees_api_v4_migration").anyEnabled)&&void 0!==s&&s,i=await (0,n.Z)({url:t?`/ads/v4/business_access/businesses/${e}/owner/`:`/ads/internal/business_access/businesses/${e}/owner/`});return i.resource_response.data},A=async({businessId:e,personId:s,limit:a,sortBy:d,searchBy:u="name",searchTerm:c,startIndex:l,sortDirection:o,assetPermissionType:E,includeAssetSummary:m=!1})=>{var p,b;let{anyEnabled:A}=null!==(p=null===(b=(0,r.Z)())||void 0===b?void 0:b.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==p?p:{},N={sort_by:d,search_by:u,start_index:l,search_value:c,sort_ascending:"ASCENDING"===o},y=A?i.xX:i.cU,v=a||y;if(A){let a=await (0,n.Z)({url:`ads/v4/business_access/businesses/${e}/members/${s}/assets/`,data:{page_size:v,...N,...0===E||1===E?{asset_permission_type:(0,t.bO)(E)}:{}}});if(m){let s=await (0,_.pI)({businessId:e,assetIds:a.resource_response.data.data.map(e=>e.asset_id),resourceType:"AD_ACCOUNT"}),r=a.resource_response.data.data,t=r.reduce((e,a)=>({...e,data:{...e.data,data:e.data.data.map(e=>e.asset_id===a.asset_id?{...a,...null==s?void 0:s.data.data[a.asset_id]}:e)}}),a.resource_response);return t}return a.resource_response}{let a=await (0,n.Z)({url:`ads/internal/business_access/businesses/${e}/members/${s}/assets/`,data:{limit:v,...N,...Number.isInteger(E)?{asset_permission_type:E}:{}}});return a.resource_response}},N=async({businessId:e,personId:s,limit:a,sortBy:d,searchBy:u="name",searchTerm:c,startIndex:l,sortDirection:o,assetPermissionType:E,includeAssetSummary:m=!1})=>{var p,b;let{anyEnabled:A}=null!==(p=null===(b=(0,r.Z)())||void 0===b?void 0:b.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==p?p:{},N={sort_by:d,search_by:u,start_index:l,search_value:c,sort_ascending:"ASCENDING"===o};if(A){let r=await (0,n.Z)({url:`ads/v4/business_access/businesses/${e}/members/${s}/assets/`,data:{...N,page_size:a,resource_type:"PROFILE",...0===E||1===E?{asset_permission_type:(0,t.bO)(E)}:{}}});if(m){let s=await (0,_.pI)({businessId:e,assetIds:r.resource_response.data.data.map(e=>e.asset_id),resourceType:"PROFILE"}),a=r.resource_response.data.data,t=a.reduce((e,s)=>({...e,data:{...e.data,data:{...e.data.data,[s.asset_id]:{...e.data.data[s.asset_id],...s}}}}),s);return t}return r.resource_response}{let r=await (0,n.Z)({url:`ads/internal/business_access/businesses/${e}/members/${s}/assets/`,data:{limit:a,...N,type:i.tP.PROFILE,...Number.isInteger(E)?{asset_permission_type:E}:{}}});return r.resource_response}},y=async({businessId:e,personId:s,limit:a,sortBy:r,searchBy:t="name",searchTerm:i,startIndex:_,sortDirection:d,assetPermissionType:u})=>{let c=await (0,n.Z)({url:`ads/v4/business_access/businesses/${e}/members/${s}/assets/`,data:{page_size:a,sort_by:r,search_by:t,start_index:_,search_value:i,sort_ascending:"ASCENDING"===d,resource_type:"ASSET_GROUP",asset_permission_type:u}});return c.resource_response},v=async({businessId:e,personId:s,assetId:a})=>{let r=await (0,n.Z)({url:`ads/internal/business_access/businesses/${e}/members/${s}/assets/${a}/`});return r.resource_response},S=async({businessId:e,memberId:s,assetId:a,businessHierarchyNodeId:t,roles:i,permissions:_})=>{var d,u;let{anyEnabled:c}=null!==(d=null===(u=(0,r.Z)())||void 0===u?void 0:u.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==d?d:{};if(c){let r=await (0,n.Z)({url:`ads/v4/business_access/businesses/${e}/members/${s}/assets/${a}/access/`,method:"PUT",data:{permissions:_.includes("ADMIN")?["ADMIN"]:_,business_hierarchy_node_id:t}});return r.resource_response.data}{let r=await (0,n.Z)({url:`ads/internal/business_access/businesses/${e}/members/${s}/assets/${a}/access/`,method:"PUT",data:{finalRoles:i.includes("ADMIN")?["ADMIN"]:i,business_hierarchy_node_id:t}});return r.resource_response.data}},h=async({businessId:e,memberId:s,assetId:a,businessHierarchyNodeId:t})=>{var i,_;let{anyEnabled:d}=null!==(i=null===(_=(0,r.Z)())||void 0===_?void 0:_.experimentsClient.checkExperiment("business_access_assets_and_history_api_v4_migration"))&&void 0!==i?i:{};if(d){let r=await (0,n.Z)({url:`ads/v4/business_access/businesses/${e}/members/${s}/assets/${a}/access/`,method:"DELETE",data:{business_hierarchy_node_id:t}});return r.resource_response.data}{let r=await (0,n.Z)({url:`ads/internal/business_access/businesses/${e}/members/${s}/assets/${a}/access/`,method:"DELETE",data:{business_hierarchy_node_id:t}});return r.resource_response.data}},I=async({businessId:e,assetId:s,limit:a,sortBy:r,searchBy:t="FULL_NAME",searchTerm:i,startIndex:_,sortDirection:d})=>{let u=await (0,n.Z)({url:`ads/v4/business_access/businesses/${e}/assets/${s}/members/`,method:"GET",data:{page_size:a,sort_by:r,search_by:t,search_value:i,start_index:_,sort_ascending:"ASCENDING"===d}}),{data:c}={data:void 0,...u.resource_response};return c}},427135:(e,s,a)=>{a.d(s,{P:()=>i,b:()=>t});var r=a(214494);let t=async e=>{let s=await r.Z.create("UserResource",{user_id:e}).callGet(),{resource_response:{data:a}}=s;return a},i=async e=>{let{asset:s}=e,a=s.agency_user_id||s.owner_user_id,r=await t(a);return{...e,asset:{...s,creator:r.full_name}}}},180548:(e,s,a)=>{function r(e){return null==e}function t(e){return!r(e)}a.d(s,{G:()=>t,k:()=>r})}}]);
//# sourceMappingURL=https://sm.pinimg.com/webapp/19437-fc49956c9af388ab.mjs.map