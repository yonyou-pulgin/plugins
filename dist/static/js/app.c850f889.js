(()=>{var e={3722:(e,t,a)=>{"use strict";a.d(t,{Zl:()=>l,cS:()=>i,jt:()=>n});var r=a(6537);const o=new r.A({baseURL:"https://dev.yygongzi.com/",timeout:18e4}),l=e=>o.post("feishuapi/bitable/confirm/create",e),n=e=>o.post("feishuapi/bitable/confirm/preview",e),i=e=>o.post("feishuapi/bitable/confirm/update",e)},996:(e,t,a)=>{"use strict";a.d(t,{A:()=>P});var r=a(1070),o=a(8190),l=a(7958),n=(a(3722),a(3759));const i={Text:1,Number:2,SingleSelect:3,MultiSelect:4,DateTime:5,Checkbox:7,User:11,Phone:13,Url:15,Attachment:17,SingleLink:18,Lookup:19,Formula:20,DuplexLink:21,Location:22,GroupChat:23,CreatedTime:1001,ModifiedTime:1002,CreatedUser:1003,ModifiedUser:1004,AutoNumber:1005,Barcode:99001,Progress:99002,Currency:99003,Rating:99004,Email:99005},s=(0,r.KR)(!1),d=(0,r.KR)(null),c=(0,r.KR)([]),u=(0,r.KR)(""),g=(0,r.KR)([]),m=(0,r.KR)([]),p=(0,r.KR)(""),v=(0,r.KR)(""),b=(0,r.KR)([]),f=(0,r.KR)(null),h=((0,r.KR)(!1),l.UV.base),y=(l.UV.ui,l.UV.bridge,e=>h.getTable(e));const w=async(e,t="")=>{e.tableId||(e.tableId=e.id),d.value=e;const a=await y(e.tableId);t||S(e.tableId),F(e.tableId),I(e.tableId),A(e.tableId),T(),B(),a.onFieldAdd((e=>{console.log("add tableId:"+d.value.tableId),I(d.value.tableId),A(d.value.tableId)})),a.onFieldDelete((e=>{console.log("del tableId:"+d.value.tableId),I(d.value.tableId),A(d.value.tableId)})),l.UV.base.onSelectionChange((e=>{console.log("change tableId:"+d.value.tableId),(0,o.dY)((()=>{b.value=[],F(d.value.tableId),A(d.value.tableId)}))}))},F=async e=>{const t=await h.getTableMetaList();t.map((e=>(e.label=e.name,e.value=e.id,e))),c.value=t},S=async e=>{const t=await y(e),a=await t.getName();u.value=a||""},I=async e=>{const t=await y(e),a=await t.getViewMetaList(),r=a.find((e=>1==e.type));if(!r)return;const o=r.id,l=await t.getViewById(o),n=await l.getFieldMetaList();g.value=n.map((e=>(e.label=e.name,e.value=e.id,e)))},A=async e=>{if(s.value)return;s.value=!0;const t=await h.getTableById(e);let a={pageSize:5e3};f.value&&(a.pageToken=f.value);const r=await t.getRecords(a);s.value=!1,r.pageToken?(f.value=r.pageToken,setTimeout((()=>{A(e)}),1e3)):f.value=null,r.pageToken?b.value=b.value.concat(r.records):b.value=r.records},T=async()=>{const e=await l.UV.bridge.getTenantKey();p.value=e},B=async()=>{const e=await l.UV.bridge.getUserId();v.value=e},E=async(e,t,a)=>{const r=[],o=await y(e),l=g.value.filter((e=>e.name.includes("签字确认结果")));let n=l.length?`签字确认结果${l.length}`:"签字确认结果";const s=await o.addField({type:i.Url,name:n}),d=await o.getField(s),c=await o.getRecordIdList();return c.forEach((e=>{a.includes(e)&&r.push({recordId:e,fields:{[d.id]:[{type:"url",text:"查看签字结果",link:`${t}?recordId=${e}`}]}})})),await o.setRecords(r),Promise.resolve({viewFieldId:s})},C=async e=>{const t=await l.UV.base.batchUploadFile([e]);return t},k=async(e,t,a)=>{const r=await(0,n.urltoBlob)(t),o=new File([r],"imgage.png",{type:r.type}),s=await C(o),d=[],c=await l.UV.base.getTableById(e),u=g.value.filter((e=>e.name.includes("签字二维码【发给签字人员】")));let m=u.length?`签字二维码【发给签字人员】${u.length}`:"签字二维码【发给签字人员】";const p=await c.addField({type:i.Attachment,name:m}),v=await c.getField(p),b=await c.getRecordIdList();return b.forEach((e=>{a.includes(e)&&d.push({recordId:e,fields:{[v.id]:[{name:o.name,size:o.size,type:o.type,token:s[0],timeStamp:o.lastModified,permission:{}}]}})})),c.setRecords(d),Promise.resolve({qrFieldId:p})},x=async(e,t,a)=>{const r=await l.UV.base.getTableById(e),o=g.value.filter((e=>e.name.includes("签字确认结果")));let n=o.length?`签字确认结果${o.length}`:"签字确认结果";const s=await r.addField({type:i.Formula,name:n}),d=await r.getField(s);let c=t||"https://www.baidu.com/",u=`HYPERLINK(CONCATENATE("${c}",RECORD_ID()),"签字确认结果")`;return await d.setFormula(u),Promise.resolve({viewFieldId:s})},L=async(e,t,a)=>{const r=await l.UV.base.getTableById(e),o=g.value.filter((e=>e.name.includes("签字状态")));let n=o.length?`签字状态${o.length}`:"签字状态";const s=await r.addField({type:i.SingleSelect,name:n,description:{content:t,disableSyncToFormDesc:!1}}),d=await r.getField(s);await d.addOptions([{name:"未查看/未签字"},{name:"已查看/已签字"},{name:"已查看/未签字"}]);const c=await r.getRecordIdList();return c.forEach((e=>{d.setValue(e,"未查看/未签字")})),Promise.resolve({statusFieldId:s})},R=async()=>{l.UV.ui.closeHostContainer()};function P(){return{userId:v,tableInfo:d,tableName:u,sheetList:c,fieldList:g,recordList:m,tenantKey:p,tableData:b,getTableSheetList:F,setTableInfo:w,addField:E,addImgField:k,addFormulaField:x,addSingleSelectField:L,closePlugin:R}}},2351:(e,t,a)=>{"use strict";var r=a(4299),o=a(8190),l=a(1070),n=a(4772);n.A.Pagination.jump_to="跳转到";const i={token:{fontFamily:'"Helvetica Neue",Helvetica,Arial,"PingFang SC","microsoft yahei","微软雅黑","Arial","sans-serif","黑体"',borderRadius:6,boxShadow:"0px 2px 10px 0 rgba(0,0,0,0.14)",boxShadowSecondary:"0px 2px 10px 0 rgba(0,0,0,0.14)",colorPrimary:"#3a75ff",colorPrimaryActive:"#3A75FF",colorPrimaryTextHover:"#6191FF",colorPrimaryHover:"#6191FF",colorPrimaryBorderHover:"#3A75FF",colorPrimaryBorder:"#3A75FF",colorSuccess:"#11c215",colorSuccessBg:"#F0FBF0",colorSuccessBgHover:"#F0FBF0",colorSuccessBorder:"#34C724",colorSuccessBorderHover:"#34C724",colorSuccessActive:"#11C215",colorSuccessTextHover:"#11C215",colorSuccessText:"#11C215",colorSuccessTextActive:"#11C215",colorError:"#FD3B3A",colorErrorBg:"#FEEBEB",colorErrorBgHover:"#FEEBEB",colorErrorBorder:"#FD3B3A",colorErrorBorderHover:"#FD3B3A",colorErrorHover:"#FD3B3A",colorErrorActive:"#FD3B3A",colorErrorTextHover:"#FD3B3A",colorErrorText:"#FD3B3A",colorErrorTextActive:"#FD3B3A",colorInfo:"#3a75ff",colorTextBase:"#333333",colorBgMask:"rgba(0, 0, 0, 0.5)",colorTextHeading:"#333333",colorText:"#333333",marginXXS:2,marginXS:4,marginSM:6,margin:8,marginMD:12,marginLG:16,marginXL:20,marginXXL:24,paddingXXS:12,paddingXS:12,padding:12,paddingMD:12,paddingLG:12,paddingXL:12,wireframe:!1,colorBorder:"#D6DAE4",controlHeight:32,colorBgSpotlight:"rgba(51,51,51,0.9)",colorWarning:"#FB952A",fontWeightStrong:500},components:{Modal:{}}},s={locale:n.A,theme:i};var d=a(7226),c=a(3716),u=a(7958),g=a(996);a(3759);const m={__name:"App",setup(e){const{setTableInfo:t}=(0,g.A)(),a=async()=>{const e=await u.UV.base.getSelection();t(e)};return a(),(e,t)=>{const a=(0,o.g2)("a-style-provider"),r=(0,o.g2)("a-config-provider");return(0,o.uX)(),(0,o.Wv)(r,{theme:(0,l.R1)(s).theme,locale:(0,l.R1)(s).locale},{default:(0,o.k6)((()=>[(0,o.bF)(a,{"hash-priority":"high",transformers:[(0,l.R1)(d.A)]},{default:(0,o.k6)((()=>[(0,o.bF)((0,l.R1)(c.Tp))])),_:1},8,["transformers"])])),_:1},8,["theme","locale"])}}},p=m,v=p;var b=a(5686);const f={title:"title"},h={title:"标题"},y=(0,b.hU)({locale:"en",allowComposition:!0,messages:{en:f,zh:h}});u.UV.bridge.getLanguage().then((e=>{y.global.locale=e}));const w=(0,c.aE)({history:(0,c.Bt)("/"),routes:[{path:"/",name:"createForm",component:()=>Promise.all([a.e(701),a.e(513)]).then(a.bind(a,9163))},{path:"/success",name:"success",component:()=>Promise.all([a.e(701),a.e(752)]).then(a.bind(a,3701))}]}),F=w;var S=a(2713);a(757);(0,r.Ef)(v).use(S.Ay).use(F).use(y).mount("#app")},3936:()=>{}},t={};function a(r){var o=t[r];if(void 0!==o)return o.exports;var l=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(l.exports,l,l.exports,a),l.loaded=!0,l.exports}a.m=e,(()=>{var e=[];a.O=(t,r,o,l)=>{if(!r){var n=1/0;for(c=0;c<e.length;c++){for(var[r,o,l]=e[c],i=!0,s=0;s<r.length;s++)(!1&l||n>=l)&&Object.keys(a.O).every((e=>a.O[e](r[s])))?r.splice(s--,1):(i=!1,l<n&&(n=l));if(i){e.splice(c--,1);var d=o();void 0!==d&&(t=d)}}return t}l=l||0;for(var c=e.length;c>0&&e[c-1][2]>l;c--)e[c]=e[c-1];e[c]=[r,o,l]}})(),(()=>{a.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return a.d(t,{a:t}),t}})(),(()=>{a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}})(),(()=>{a.f={},a.e=e=>Promise.all(Object.keys(a.f).reduce(((t,r)=>(a.f[r](e,t),t)),[]))})(),(()=>{a.u=e=>"static/js/"+e+"."+{344:"72e848a9",513:"6ecae8c3",701:"9303ac21",752:"3aa17d56"}[e]+".js"})(),(()=>{a.miniCssF=e=>"static/css/"+e+"."+{513:"aa390a72",752:"dc83404b"}[e]+".css"})(),(()=>{a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="plugins:";a.l=(r,o,l,n)=>{if(e[r])e[r].push(o);else{var i,s;if(void 0!==l)for(var d=document.getElementsByTagName("script"),c=0;c<d.length;c++){var u=d[c];if(u.getAttribute("src")==r||u.getAttribute("data-webpack")==t+l){i=u;break}}i||(s=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.setAttribute("data-webpack",t+l),i.src=r),e[r]=[o];var g=(t,a)=>{i.onerror=i.onload=null,clearTimeout(m);var o=e[r];if(delete e[r],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((e=>e(a))),t)return t(a)},m=setTimeout(g.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=g.bind(null,i.onerror),i.onload=g.bind(null,i.onload),s&&document.head.appendChild(i)}}})(),(()=>{a.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{a.nmd=e=>(e.paths=[],e.children||(e.children=[]),e)})(),(()=>{a.p=""})(),(()=>{if("undefined"!==typeof document){var e=(e,t,r,o,l)=>{var n=document.createElement("link");n.rel="stylesheet",n.type="text/css",a.nc&&(n.nonce=a.nc);var i=a=>{if(n.onerror=n.onload=null,"load"===a.type)o();else{var r=a&&a.type,i=a&&a.target&&a.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+r+": "+i+")");s.name="ChunkLoadError",s.code="CSS_CHUNK_LOAD_FAILED",s.type=r,s.request=i,n.parentNode&&n.parentNode.removeChild(n),l(s)}};return n.onerror=n.onload=i,n.href=t,r?r.parentNode.insertBefore(n,r.nextSibling):document.head.appendChild(n),n},t=(e,t)=>{for(var a=document.getElementsByTagName("link"),r=0;r<a.length;r++){var o=a[r],l=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(l===e||l===t))return o}var n=document.getElementsByTagName("style");for(r=0;r<n.length;r++){o=n[r],l=o.getAttribute("data-href");if(l===e||l===t)return o}},r=r=>new Promise(((o,l)=>{var n=a.miniCssF(r),i=a.p+n;if(t(n,i))return o();e(r,i,null,o,l)})),o={524:0};a.f.miniCss=(e,t)=>{var a={513:1,752:1};o[e]?t.push(o[e]):0!==o[e]&&a[e]&&t.push(o[e]=r(e).then((()=>{o[e]=0}),(t=>{throw delete o[e],t})))}}})(),(()=>{var e={524:0};a.f.j=(t,r)=>{var o=a.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else if(752!=t){var l=new Promise(((a,r)=>o=e[t]=[a,r]));r.push(o[2]=l);var n=a.p+a.u(t),i=new Error,s=r=>{if(a.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var l=r&&("load"===r.type?"missing":r.type),n=r&&r.target&&r.target.src;i.message="Loading chunk "+t+" failed.\n("+l+": "+n+")",i.name="ChunkLoadError",i.type=l,i.request=n,o[1](i)}};a.l(n,s,"chunk-"+t,t)}else e[t]=0},a.O.j=t=>0===e[t];var t=(t,r)=>{var o,l,[n,i,s]=r,d=0;if(n.some((t=>0!==e[t]))){for(o in i)a.o(i,o)&&(a.m[o]=i[o]);if(s)var c=s(a)}for(t&&t(r);d<n.length;d++)l=n[d],a.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return a.O(c)},r=self["webpackChunkplugins"]=self["webpackChunkplugins"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),(()=>{a.nc=void 0})();var r=a.O(void 0,[504],(()=>a(2351)));r=a.O(r)})();
//# sourceMappingURL=app.c850f889.js.map