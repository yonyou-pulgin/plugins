(()=>{var e={3722:(e,t,a)=>{"use strict";a.d(t,{Zl:()=>o,cS:()=>l,jt:()=>i});var r=a(6537);const n=new r.A({baseURL:"/gw/",timeout:18e4}),o=e=>n.post("feishuapi/bitable/confirm/create",e),i=e=>n.post("feishuapi/bitable/confirm/preview",e),l=e=>n.post("feishuapi/bitable/confirm/update",e)},996:(e,t,a)=>{"use strict";a.d(t,{A:()=>R});var r=a(1070),n=a(8190),o=a(7958),i=(a(3722),a(3759));const l={Text:1,Number:2,SingleSelect:3,MultiSelect:4,DateTime:5,Checkbox:7,User:11,Phone:13,Url:15,Attachment:17,SingleLink:18,Lookup:19,Formula:20,DuplexLink:21,Location:22,GroupChat:23,CreatedTime:1001,ModifiedTime:1002,CreatedUser:1003,ModifiedUser:1004,AutoNumber:1005,Barcode:99001,Progress:99002,Currency:99003,Rating:99004,Email:99005},s=(0,r.KR)(!1),d=null,u=(0,r.KR)(null),c=(0,r.KR)([]),p=(0,r.KR)(""),g=(0,r.KR)([]),b=(0,r.KR)([]),f=(0,r.KR)(""),v=(0,r.KR)(""),m=(0,r.KR)([]),h=(0,r.KR)(null),y=o.UV.base,w=o.UV.ui,I=(o.UV.bridge,e=>d?Promise.resolve(d):y.getTable(e)),T=async e=>{u.value=e;const t=await I(e.tableId);C(e.tableId),k(e.tableId),A(e.tableId),L(e.tableId),S(),U(),t.onFieldAdd((t=>{console.log("table:",t),A(e.tableId),L(e.tableId)})),t.onFieldDelete((t=>{console.log("table:",t),A(e.tableId),L(e.tableId)})),o.UV.base.onSelectionChange((t=>{console.log("event:",t),(0,n.dY)((()=>{m.value=[],C(e.tableId),k(e.tableId),A(e.tableId),L(e.tableId)}))}))},k=async e=>{const t=await I(e),a=await t.getViewMetaList();if(a.map((e=>(e.label=e.name,e.value=e.id,e))),c.value=a,a.length&&1!=a[0].type){const t=a.find((e=>1==e.type)),r=t[0].id;await w.switchToView(e,r)}},C=async e=>{const t=await I(e),a=await t.getName();p.value=a},A=async e=>{const t=await I(e),a=await t.getFieldMetaList();g.value=a.map((e=>(e.label=e.name,e.value=e.id,e)))},L=async e=>{if(s.value)return;s.value=!0;const t=await y.getActiveTable();let a={pageSize:5e3};h.value&&(a.pageToken=h.value);const r=await t.getRecords(a);console.log(r),s.value=!1,r.pageToken?(h.value=r.pageToken,setTimeout((()=>{L(e)}),1e3)):h.value=null,m.value=m.value.concat(r.records)},S=async()=>{const e=await o.UV.bridge.getTenantKey();f.value=e},U=async()=>{const e=await o.UV.bridge.getUserId();v.value=e},E=async(e,t)=>{const a=[],r=await I(e),n=await r.addField({type:l.Url}),o=await r.getField(n),i=await r.getRecordIdList();return i.forEach((e=>{a.push({recordId:e,fields:{[o.id]:t+e}})})),await r.setRecords(a),Promise.resolve({viewFieldId:n})},F=async(e,t)=>{const a=await(0,i.urltoBlob)("https://dev.yygongzi.com/gw/feishuapi/bitable/confirm/qrcode/1840294913194229762"),r=(new File([a],"imgage.png",{type:a.type}),[]),n=await o.UV.base.getActiveTable(),s=await n.addField({type:l.Attachment}),d=await n.getField(s),u=await n.getRecordIdList();return u.forEach((e=>{r.push({recordId:e,fields:{[d.id]:{url:"https://dev.yygongzi.com/gw/feishuapi/bitable/confirm/qrcode/1840294913194229762"}}})})),Promise.resolve({qrFieldId:s})};function R(){return{userId:v,tableInfo:u,tableName:p,sheetList:c,fieldList:g,recordList:b,tenantKey:f,tableData:m,getTableSheetList:k,setTableInfo:T,addField:E,addImgField:F}}},515:(e,t,a)=>{"use strict";var r=a(4299),n=a(8190),o=a(1070),i=a(3716),l=a(7958),s=a(996);a(3759);const d={__name:"App",setup(e){const{setTableInfo:t}=(0,s.A)(),a=async()=>{const e=await l.UV.base.getSelection();t(e)};return a(),(e,t)=>((0,n.uX)(),(0,n.Wv)((0,o.R1)(i.Tp)))}},u=d,c=u;var p=a(5686);const g={title:"title"},b={title:"标题"},f=(0,p.hU)({locale:"en",allowComposition:!0,messages:{en:g,zh:b}});l.UV.bridge.getLanguage().then((e=>{f.global.locale=e}));const v=(0,i.aE)({history:(0,i.Bt)("/"),routes:[{path:"/",name:"home",component:()=>a.e(551).then(a.bind(a,6551))},{path:"/success",name:"success",component:()=>a.e(691).then(a.bind(a,691))}]}),m=v;var h=a(6991);a(757);(0,r.Ef)(c).use(h.Ay).use(m).use(f).mount("#app")},3936:()=>{}},t={};function a(r){var n=t[r];if(void 0!==n)return n.exports;var o=t[r]={exports:{}};return e[r].call(o.exports,o,o.exports,a),o.exports}a.m=e,(()=>{var e=[];a.O=(t,r,n,o)=>{if(!r){var i=1/0;for(u=0;u<e.length;u++){for(var[r,n,o]=e[u],l=!0,s=0;s<r.length;s++)(!1&o||i>=o)&&Object.keys(a.O).every((e=>a.O[e](r[s])))?r.splice(s--,1):(l=!1,o<i&&(i=o));if(l){e.splice(u--,1);var d=n();void 0!==d&&(t=d)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[r,n,o]}})(),(()=>{a.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return a.d(t,{a:t}),t}})(),(()=>{a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}})(),(()=>{a.f={},a.e=e=>Promise.all(Object.keys(a.f).reduce(((t,r)=>(a.f[r](e,t),t)),[]))})(),(()=>{a.u=e=>"static/js/"+e+"."+{344:"72e848a9",551:"e7c96678",691:"e3d8ff4e"}[e]+".js"})(),(()=>{a.miniCssF=e=>"static/css/"+e+"."+{551:"7fdbdedc",691:"28d00130"}[e]+".css"})(),(()=>{a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="plugins:";a.l=(r,n,o,i)=>{if(e[r])e[r].push(n);else{var l,s;if(void 0!==o)for(var d=document.getElementsByTagName("script"),u=0;u<d.length;u++){var c=d[u];if(c.getAttribute("src")==r||c.getAttribute("data-webpack")==t+o){l=c;break}}l||(s=!0,l=document.createElement("script"),l.charset="utf-8",l.timeout=120,a.nc&&l.setAttribute("nonce",a.nc),l.setAttribute("data-webpack",t+o),l.src=r),e[r]=[n];var p=(t,a)=>{l.onerror=l.onload=null,clearTimeout(g);var n=e[r];if(delete e[r],l.parentNode&&l.parentNode.removeChild(l),n&&n.forEach((e=>e(a))),t)return t(a)},g=setTimeout(p.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=p.bind(null,l.onerror),l.onload=p.bind(null,l.onload),s&&document.head.appendChild(l)}}})(),(()=>{a.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{a.p=""})(),(()=>{if("undefined"!==typeof document){var e=(e,t,r,n,o)=>{var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",a.nc&&(i.nonce=a.nc);var l=a=>{if(i.onerror=i.onload=null,"load"===a.type)n();else{var r=a&&a.type,l=a&&a.target&&a.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+r+": "+l+")");s.name="ChunkLoadError",s.code="CSS_CHUNK_LOAD_FAILED",s.type=r,s.request=l,i.parentNode&&i.parentNode.removeChild(i),o(s)}};return i.onerror=i.onload=l,i.href=t,r?r.parentNode.insertBefore(i,r.nextSibling):document.head.appendChild(i),i},t=(e,t)=>{for(var a=document.getElementsByTagName("link"),r=0;r<a.length;r++){var n=a[r],o=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(o===e||o===t))return n}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){n=i[r],o=n.getAttribute("data-href");if(o===e||o===t)return n}},r=r=>new Promise(((n,o)=>{var i=a.miniCssF(r),l=a.p+i;if(t(i,l))return n();e(r,l,null,n,o)})),n={524:0};a.f.miniCss=(e,t)=>{var a={551:1,691:1};n[e]?t.push(n[e]):0!==n[e]&&a[e]&&t.push(n[e]=r(e).then((()=>{n[e]=0}),(t=>{throw delete n[e],t})))}}})(),(()=>{var e={524:0};a.f.j=(t,r)=>{var n=a.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var o=new Promise(((a,r)=>n=e[t]=[a,r]));r.push(n[2]=o);var i=a.p+a.u(t),l=new Error,s=r=>{if(a.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var o=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;l.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",l.name="ChunkLoadError",l.type=o,l.request=i,n[1](l)}};a.l(i,s,"chunk-"+t,t)}},a.O.j=t=>0===e[t];var t=(t,r)=>{var n,o,[i,l,s]=r,d=0;if(i.some((t=>0!==e[t]))){for(n in l)a.o(l,n)&&(a.m[n]=l[n]);if(s)var u=s(a)}for(t&&t(r);d<i.length;d++)o=i[d],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(u)},r=self["webpackChunkplugins"]=self["webpackChunkplugins"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),(()=>{a.nc=void 0})();var r=a.O(void 0,[504],(()=>a(515)));r=a.O(r)})();
//# sourceMappingURL=app.8651195d.js.map