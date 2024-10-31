"use strict";(self["webpackChunkplugins"]=self["webpackChunkplugins"]||[]).push([[344],{9344:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Za});var r=n(4217),l=(n(4384),(0,r.d)(((e,t)=>{t.exports=function(e){return null!=e&&null!=e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}}))),i=(0,r.d)(((e,t)=>{var n=Object.prototype.hasOwnProperty,r=Object.prototype.toString,l=Object.defineProperty,i=Object.getOwnPropertyDescriptor,o=function(e){return"function"==typeof Array.isArray?Array.isArray(e):"[object Array]"===r.call(e)},a=function(e){if(!e||"[object Object]"!==r.call(e))return!1;var t,l=n.call(e,"constructor"),i=e.constructor&&e.constructor.prototype&&n.call(e.constructor.prototype,"isPrototypeOf");if(e.constructor&&!l&&!i)return!1;for(t in e);return"undefined"==typeof t||n.call(e,t)},u=function(e,t){l&&"__proto__"===t.name?l(e,t.name,{enumerable:!0,configurable:!0,value:t.newValue,writable:!0}):e[t.name]=t.newValue},s=function(e,t){if("__proto__"===t){if(!n.call(e,t))return;if(i)return i(e,t).value}return e[t]};t.exports=function e(){var t,n,r,l,i,c,f=arguments[0],p=1,d=arguments.length,h=!1;for("boolean"==typeof f&&(h=f,f=arguments[1]||{},p=2),(null==f||"object"!=typeof f&&"function"!=typeof f)&&(f={});p<d;++p)if(t=arguments[p],null!=t)for(n in t)r=s(f,n),l=s(t,n),f!==l&&(h&&l&&(a(l)||(i=o(l)))?(i?(i=!1,c=r&&o(r)?r:[]):c=r&&a(r)?r:{},u(f,{name:n,newValue:e(h,c,l)})):"undefined"!=typeof l&&u(f,{name:n,newValue:l}));return f}})),o=(0,r.d)(((e,t)=>{var n="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";t.exports=n})),a=(0,r.d)(((e,t)=>{var n=o();function r(){}function l(){}l.resetWarningCache=r,t.exports=function(){function e(e,t,r,l,i,o){if(o!==n){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return e}e.isRequired=e;var i={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:l,resetWarningCache:r};return i.PropTypes=i,i}})),u=(0,r.d)(((e,t)=>{t.exports=a()()})),s=(0,r.d)(((e,t)=>{var n=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,l=/^\s*/,i=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,o=/^:\s*/,a=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,u=/^[;\s]*/,s=/^\s+|\s+$/g,c="\n",f="/",p="*",d="",h="comment",g="declaration";function m(e){return e?e.replace(s,d):d}t.exports=function(e,t){if("string"!=typeof e)throw new TypeError("First argument must be a string");if(!e)return[];t=t||{};var s=1,y=1;function b(e){var t=e.match(r);t&&(s+=t.length);var n=e.lastIndexOf(c);y=~n?e.length-n:y+e.length}function k(){var e={line:s,column:y};return function(t){return t.position=new x(e),S(),t}}function x(e){this.start=e,this.end={line:s,column:y},this.source=t.source}function v(n){var r=new Error(t.source+":"+s+":"+y+": "+n);if(r.reason=n,r.filename=t.source,r.line=s,r.column=y,r.source=e,!t.silent)throw r}function w(t){var n=t.exec(e);if(n){var r=n[0];return b(r),e=e.slice(r.length),n}}function S(){w(l)}function C(e){var t;for(e=e||[];t=E();)!1!==t&&e.push(t);return e}function E(){var t=k();if(f==e.charAt(0)&&p==e.charAt(1)){for(var n=2;d!=e.charAt(n)&&(p!=e.charAt(n)||f!=e.charAt(n+1));)++n;if(n+=2,d===e.charAt(n-1))return v("End of comment missing");var r=e.slice(2,n-2);return y+=2,b(r),e=e.slice(n),y+=2,t({type:h,comment:r})}}function F(){var e=k(),t=w(i);if(t){if(E(),!w(o))return v("property missing ':'");var r=w(a),l=e({type:g,property:m(t[0].replace(n,d)),value:r?m(r[0].replace(n,d)):d});return w(u),l}}function A(){var e,t=[];for(C(t);e=F();)!1!==e&&(t.push(e),C(t));return t}return x.prototype.content=e,S(),A()}})),c=(0,r.d)(((e,t)=>{var n=s();function r(e,t){var r=null;if(!e||"string"!=typeof e)return r;for(var l,i,o,a=n(e),u="function"==typeof t,s=0,c=a.length;s<c;s++)l=a[s],i=l.property,o=l.value,u?t(i,o,l):o&&(r||(r={}),r[i]=o);return r}t.exports=r,t.exports.default=r})),f=(0,r.f)((0,r.k)(),1),p=["http","https","mailto","tel"];function d(e){let t=(e||"").trim(),n=t.charAt(0);if("#"===n||"/"===n)return t;let r=t.indexOf(":");if(-1===r)return t;let l=-1;for(;++l<p.length;){let e=p[l];if(r===e.length&&t.slice(0,e.length).toLowerCase()===e)return t}return l=t.indexOf("?"),-1!==l&&r>l||(l=t.indexOf("#"),-1!==l&&r>l)?t:"javascript:void(0)"}var h=(0,r.f)((0,r.j)(),1),g=(0,r.f)(l(),1);function m(e){return e&&"object"==typeof e?"position"in e||"type"in e?b(e.position):"start"in e||"end"in e?b(e):"line"in e||"column"in e?y(e):"":""}function y(e){return k(e&&e.line)+":"+k(e&&e.column)}function b(e){return y(e&&e.start)+"-"+y(e&&e.end)}function k(e){return e&&"number"==typeof e?e:1}var x=class extends Error{constructor(e,t,n){let r=[null,null],l={start:{line:null,column:null},end:{line:null,column:null}};if(super(),"string"==typeof t&&(n=t,t=void 0),"string"==typeof n){let e=n.indexOf(":");-1===e?r[1]=n:(r[0]=n.slice(0,e),r[1]=n.slice(e+1))}t&&("type"in t||"position"in t?t.position&&(l=t.position):"start"in t||"end"in t?l=t:("line"in t||"column"in t)&&(l.start=t)),this.name=m(t)||"1:1",this.message="object"==typeof e?e.message:e,this.stack="","object"==typeof e&&e.stack&&(this.stack=e.stack),this.reason=this.message,this.fatal,this.line=l.start.line,this.column=l.start.column,this.position=l,this.source=r[0],this.ruleId=r[1],this.file,this.actual,this.expected,this.url,this.note}};x.prototype.file="",x.prototype.name="",x.prototype.reason="",x.prototype.message="",x.prototype.stack="",x.prototype.fatal=null,x.prototype.column=null,x.prototype.line=null,x.prototype.source=null,x.prototype.ruleId=null,x.prototype.position=null;var v={basename:w,dirname:S,extname:C,join:E,sep:"/"};function w(e,t){if(void 0!==t&&"string"!=typeof t)throw new TypeError('"ext" argument must be a string');D(e);let n,r=0,l=-1,i=e.length;if(void 0===t||0===t.length||t.length>e.length){for(;i--;)if(47===e.charCodeAt(i)){if(n){r=i+1;break}}else l<0&&(n=!0,l=i+1);return l<0?"":e.slice(r,l)}if(t===e)return"";let o=-1,a=t.length-1;for(;i--;)if(47===e.charCodeAt(i)){if(n){r=i+1;break}}else o<0&&(n=!0,o=i+1),a>-1&&(e.charCodeAt(i)===t.charCodeAt(a--)?a<0&&(l=i):(a=-1,l=o));return r===l?l=o:l<0&&(l=e.length),e.slice(r,l)}function S(e){if(D(e),0===e.length)return".";let t,n=-1,r=e.length;for(;--r;)if(47===e.charCodeAt(r)){if(t){n=r;break}}else t||(t=!0);return n<0?47===e.charCodeAt(0)?"/":".":1===n&&47===e.charCodeAt(0)?"//":e.slice(0,n)}function C(e){D(e);let t,n=e.length,r=-1,l=0,i=-1,o=0;for(;n--;){let a=e.charCodeAt(n);if(47!==a)r<0&&(t=!0,r=n+1),46===a?i<0?i=n:1!==o&&(o=1):i>-1&&(o=-1);else if(t){l=n+1;break}}return i<0||r<0||0===o||1===o&&i===r-1&&i===l+1?"":e.slice(i,r)}function E(...e){let t,n=-1;for(;++n<e.length;)D(e[n]),e[n]&&(t=void 0===t?e[n]:t+"/"+e[n]);return void 0===t?".":F(t)}function F(e){D(e);let t=47===e.charCodeAt(0),n=A(e,!t);return 0===n.length&&!t&&(n="."),n.length>0&&47===e.charCodeAt(e.length-1)&&(n+="/"),t?"/"+n:n}function A(e,t){let n,r,l="",i=0,o=-1,a=0,u=-1;for(;++u<=e.length;){if(u<e.length)n=e.charCodeAt(u);else{if(47===n)break;n=47}if(47===n){if(o!==u-1&&1!==a)if(o!==u-1&&2===a){if(l.length<2||2!==i||46!==l.charCodeAt(l.length-1)||46!==l.charCodeAt(l.length-2))if(l.length>2){if(r=l.lastIndexOf("/"),r!==l.length-1){r<0?(l="",i=0):(l=l.slice(0,r),i=l.length-1-l.lastIndexOf("/")),o=u,a=0;continue}}else if(l.length>0){l="",i=0,o=u,a=0;continue}t&&(l=l.length>0?l+"/..":"..",i=2)}else l.length>0?l+="/"+e.slice(o+1,u):l=e.slice(o+1,u),i=u-o-1;o=u,a=0}else 46===n&&a>-1?a++:a=-1}return l}function D(e){if("string"!=typeof e)throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}var T={cwd:O};function O(){return"/"}function L(e){return null!==e&&"object"==typeof e&&e.href&&e.origin}function P(e){if("string"==typeof e)e=new URL(e);else if(!L(e)){let t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if("file:"!==e.protocol){let e=new TypeError("The URL must be of scheme file");throw e.code="ERR_INVALID_URL_SCHEME",e}return I(e)}function I(e){if(""!==e.hostname){let e=new TypeError('File URL host must be "localhost" or empty on darwin');throw e.code="ERR_INVALID_FILE_URL_HOST",e}let t=e.pathname,n=-1;for(;++n<t.length;)if(37===t.charCodeAt(n)&&50===t.charCodeAt(n+1)){let e=t.charCodeAt(n+2);if(70===e||102===e){let e=new TypeError("File URL path must not include encoded / characters");throw e.code="ERR_INVALID_FILE_URL_PATH",e}}return decodeURIComponent(t)}var z=["history","path","basename","stem","extname","dirname"],M=class{constructor(e){let t;t=e?"string"==typeof e||B(e)?{value:e}:L(e)?{path:e}:e:{},this.data={},this.messages=[],this.history=[],this.cwd=T.cwd(),this.value,this.stored,this.result,this.map;let n,r=-1;for(;++r<z.length;){let e=z[r];e in t&&void 0!==t[e]&&null!==t[e]&&(this[e]="history"===e?[...t[e]]:t[e])}for(n in t)z.includes(n)||(this[n]=t[n])}get path(){return this.history[this.history.length-1]}set path(e){L(e)&&(e=P(e)),j(e,"path"),this.path!==e&&this.history.push(e)}get dirname(){return"string"==typeof this.path?v.dirname(this.path):void 0}set dirname(e){_(this.basename,"dirname"),this.path=v.join(e||"",this.basename)}get basename(){return"string"==typeof this.path?v.basename(this.path):void 0}set basename(e){j(e,"basename"),R(e,"basename"),this.path=v.join(this.dirname||"",e)}get extname(){return"string"==typeof this.path?v.extname(this.path):void 0}set extname(e){if(R(e,"extname"),_(this.dirname,"extname"),e){if(46!==e.charCodeAt(0))throw new Error("`extname` must start with `.`");if(e.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=v.join(this.dirname,this.stem+(e||""))}get stem(){return"string"==typeof this.path?v.basename(this.path,this.extname):void 0}set stem(e){j(e,"stem"),R(e,"stem"),this.path=v.join(this.dirname||"",e+(this.extname||""))}toString(e){return(this.value||"").toString(e||void 0)}message(e,t,n){let r=new x(e,t,n);return this.path&&(r.name=this.path+":"+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}info(e,t,n){let r=this.message(e,t,n);return r.fatal=null,r}fail(e,t,n){let r=this.message(e,t,n);throw r.fatal=!0,r}};function R(e,t){if(e&&e.includes(v.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+v.sep+"`")}function j(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function _(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}function B(e){return(0,g.default)(e)}function N(e){if(e)throw e}var H=(0,r.f)(l(),1),U=(0,r.f)(i(),1);function q(e){if("object"!=typeof e||null===e)return!1;let t=Object.getPrototypeOf(e);return(null===t||t===Object.prototype||null===Object.getPrototypeOf(t))&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function V(){let e=[],t={run:n,use:r};return t;function n(...t){let n=-1,r=t.pop();if("function"!=typeof r)throw new TypeError("Expected function as last argument, not "+r);function l(i,...o){let a=e[++n],u=-1;if(i)r(i);else{for(;++u<t.length;)(null===o[u]||void 0===o[u])&&(o[u]=t[u]);t=o,a?W(a,l)(...o):r(null,...o)}}l(null,...t)}function r(n){if("function"!=typeof n)throw new TypeError("Expected `middelware` to be a function, not "+n);return e.push(n),t}}function W(e,t){let n;return r;function r(...t){let r,o=e.length>t.length;o&&t.push(l);try{r=e.apply(this,t)}catch(a){let e=a;if(o&&n)throw e;return l(e)}o||(r instanceof Promise?r.then(i,l):r instanceof Error?l(r):i(r))}function l(e,...r){n||(n=!0,t(e,...r))}function i(e){l(null,e)}}var $=Y().freeze(),Q={}.hasOwnProperty;function Y(){let e,t=V(),n=[],r={},l=-1;return i.data=o,i.Parser=void 0,i.Compiler=void 0,i.freeze=a,i.attachers=n,i.use=u,i.parse=s,i.stringify=c,i.run=f,i.runSync=p,i.process=d,i.processSync=h,i;function i(){let e=Y(),t=-1;for(;++t<n.length;)e.use(...n[t]);return e.data((0,U.default)(!0,{},r)),e}function o(t,n){return"string"==typeof t?2===arguments.length?(G("data",e),r[t]=n,i):Q.call(r,t)&&r[t]||null:t?(G("data",e),r=t,i):r}function a(){if(e)return i;for(;++l<n.length;){let[e,...r]=n[l];if(!1===r[0])continue;!0===r[0]&&(r[0]=void 0);let o=e.call(i,...r);"function"==typeof o&&t.use(o)}return e=!0,l=Number.POSITIVE_INFINITY,i}function u(t,...l){let o;if(G("use",e),null!=t)if("function"==typeof t)c(t,...l);else{if("object"!=typeof t)throw new TypeError("Expected usable value, not `"+t+"`");Array.isArray(t)?s(t):u(t)}return o&&(r.settings=Object.assign(r.settings||{},o)),i;function a(e){if("function"==typeof e)c(e);else{if("object"!=typeof e)throw new TypeError("Expected usable value, not `"+e+"`");if(Array.isArray(e)){let[t,...n]=e;c(t,...n)}else u(e)}}function u(e){s(e.plugins),e.settings&&(o=Object.assign(o||{},e.settings))}function s(e){let t=-1;if(null!=e){if(!Array.isArray(e))throw new TypeError("Expected a list of plugins, not `"+e+"`");for(;++t<e.length;){let n=e[t];a(n)}}}function c(e,t){let r,l=-1;for(;++l<n.length;)if(n[l][0]===e){r=n[l];break}r?(q(r[1])&&q(t)&&(t=(0,U.default)(!0,r[1],t)),r[1]=t):n.push([...arguments])}}function s(e){i.freeze();let t=ne(e),n=i.Parser;return Z("parse",n),K(n,"parse")?new n(String(t),t).parse():n(String(t),t)}function c(e,t){i.freeze();let n=ne(t),r=i.Compiler;return J("stringify",r),ee(e),K(r,"compile")?new r(e,n).compile():r(e,n)}function f(e,n,r){if(ee(e),i.freeze(),!r&&"function"==typeof n&&(r=n,n=void 0),!r)return new Promise(l);function l(l,i){function o(t,n,o){n=n||e,t?i(t):l?l(n):r(null,n,o)}t.run(e,ne(n),o)}l(null,r)}function p(e,t){let n,r;return i.run(e,t,l),te("runSync","run",r),n;function l(e,t){N(e),n=t,r=!0}}function d(e,t){if(i.freeze(),Z("process",i.Parser),J("process",i.Compiler),!t)return new Promise(n);function n(n,r){let l=ne(e);function o(e,l){e||!l?r(e):n?n(l):t(null,l)}i.run(i.parse(l),l,((e,t,n)=>{if(!e&&t&&n){let r=i.stringify(t,n);null==r||(le(r)?n.value=r:n.result=r),o(e,n)}else o(e)}))}n(null,t)}function h(e){let t;i.freeze(),Z("processSync",i.Parser),J("processSync",i.Compiler);let n=ne(e);return i.process(n,r),te("processSync","process",t),n;function r(e){t=!0,N(e)}}}function K(e,t){return"function"==typeof e&&e.prototype&&(X(e.prototype)||t in e.prototype)}function X(e){let t;for(t in e)if(Q.call(e,t))return!0;return!1}function Z(e,t){if("function"!=typeof t)throw new TypeError("Cannot `"+e+"` without `Parser`")}function J(e,t){if("function"!=typeof t)throw new TypeError("Cannot `"+e+"` without `Compiler`")}function G(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function ee(e){if(!q(e)||"string"!=typeof e.type)throw new TypeError("Expected node, got `"+e+"`")}function te(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function ne(e){return re(e)?e:new M(e)}function re(e){return!!(e&&"object"==typeof e&&"message"in e&&"messages"in e)}function le(e){return"string"==typeof e||(0,H.default)(e)}var ie={};function oe(e,t){let n=t||ie,r="boolean"!=typeof n.includeImageAlt||n.includeImageAlt,l="boolean"!=typeof n.includeHtml||n.includeHtml;return ae(e,r,l)}function ae(e,t,n){if(se(e)){if("value"in e)return"html"!==e.type||n?e.value:"";if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return ue(e.children,t,n)}return Array.isArray(e)?ue(e,t,n):""}function ue(e,t,n){let r=[],l=-1;for(;++l<e.length;)r[l]=ae(e[l],t,n);return r.join("")}function se(e){return!(!e||"object"!=typeof e)}function ce(e,t,n,r){let l,i=e.length,o=0;if(t=t<0?-t>i?0:i+t:t>i?i:t,n=n>0?n:0,r.length<1e4)l=Array.from(r),l.unshift(t,n),e.splice(...l);else for(n&&e.splice(t,n);o<r.length;)l=r.slice(o,o+1e4),l.unshift(t,0),e.splice(...l),o+=1e4,t+=1e4}function fe(e,t){return e.length>0?(ce(e,e.length,0,t),e):t}var pe={}.hasOwnProperty;function de(e){let t={},n=-1;for(;++n<e.length;)he(t,e[n]);return t}function he(e,t){let n;for(n in t){let r,l=(pe.call(e,n)?e[n]:void 0)||(e[n]={}),i=t[n];if(i)for(r in i){pe.call(l,r)||(l[r]=[]);let e=i[r];ge(l[r],Array.isArray(e)?e:e?[e]:[])}}}function ge(e,t){let n=-1,r=[];for(;++n<t.length;)("after"===t[n].add?e:r).push(t[n]);ce(e,0,0,r)}var me=/[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/,ye=Te(/[A-Za-z]/),be=Te(/[\dA-Za-z]/),ke=Te(/[#-'*+\--9=?A-Z^-~]/);function xe(e){return null!==e&&(e<32||127===e)}var ve=Te(/\d/),we=Te(/[\dA-Fa-f]/),Se=Te(/[!-/:-@[-`{-~]/);function Ce(e){return null!==e&&e<-2}function Ee(e){return null!==e&&(e<0||32===e)}function Fe(e){return-2===e||-1===e||32===e}var Ae=Te(me),De=Te(/\s/);function Te(e){return t;function t(t){return null!==t&&e.test(String.fromCharCode(t))}}function Oe(e,t,n,r){let l=r?r-1:Number.POSITIVE_INFINITY,i=0;return o;function o(r){return Fe(r)?(e.enter(n),a(r)):t(r)}function a(r){return Fe(r)&&i++<l?(e.consume(r),a):(e.exit(n),t(r))}}var Le={tokenize:Pe};function Pe(e){let t,n=e.attempt(this.parser.constructs.contentInitial,r,l);return n;function r(t){if(null!==t)return e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),Oe(e,n,"linePrefix");e.consume(t)}function l(t){return e.enter("paragraph"),i(t)}function i(n){let r=e.enter("chunkText",{contentType:"text",previous:t});return t&&(t.next=r),t=r,o(n)}function o(t){return null===t?(e.exit("chunkText"),e.exit("paragraph"),void e.consume(t)):Ce(t)?(e.consume(t),e.exit("chunkText"),i):(e.consume(t),o)}}var Ie={tokenize:Me},ze={tokenize:Re};function Me(e){let t,n,r,l=this,i=[],o=0;return a;function a(t){if(o<i.length){let n=i[o];return l.containerState=n[1],e.attempt(n[0].continuation,u,s)(t)}return s(t)}function u(e){if(o++,l.containerState._closeFlow){l.containerState._closeFlow=void 0,t&&b();let n,r=l.events.length,i=r;for(;i--;)if("exit"===l.events[i][0]&&"chunkFlow"===l.events[i][1].type){n=l.events[i][1].end;break}y(o);let a=r;for(;a<l.events.length;)l.events[a][1].end=Object.assign({},n),a++;return ce(l.events,i+1,0,l.events.slice(r)),l.events.length=a,s(e)}return a(e)}function s(n){if(o===i.length){if(!t)return p(n);if(t.currentConstruct&&t.currentConstruct.concrete)return h(n);l.interrupt=!(!t.currentConstruct||t._gfmTableDynamicInterruptHack)}return l.containerState={},e.check(ze,c,f)(n)}function c(e){return t&&b(),y(o),p(e)}function f(e){return l.parser.lazy[l.now().line]=o!==i.length,r=l.now().offset,h(e)}function p(t){return l.containerState={},e.attempt(ze,d,h)(t)}function d(e){return o++,i.push([l.currentConstruct,l.containerState]),p(e)}function h(r){return null===r?(t&&b(),y(0),void e.consume(r)):(t=t||l.parser.flow(l.now()),e.enter("chunkFlow",{contentType:"flow",previous:n,_tokenizer:t}),g(r))}function g(t){return null===t?(m(e.exit("chunkFlow"),!0),y(0),void e.consume(t)):Ce(t)?(e.consume(t),m(e.exit("chunkFlow")),o=0,l.interrupt=void 0,a):(e.consume(t),g)}function m(e,i){let a=l.sliceStream(e);if(i&&a.push(null),e.previous=n,n&&(n.next=e),n=e,t.defineSkip(e.start),t.write(a),l.parser.lazy[e.start.line]){let e=t.events.length;for(;e--;)if(t.events[e][1].start.offset<r&&(!t.events[e][1].end||t.events[e][1].end.offset>r))return;let n,i,a=l.events.length,u=a;for(;u--;)if("exit"===l.events[u][0]&&"chunkFlow"===l.events[u][1].type){if(n){i=l.events[u][1].end;break}n=!0}for(y(o),e=a;e<l.events.length;)l.events[e][1].end=Object.assign({},i),e++;ce(l.events,u+1,0,l.events.slice(a)),l.events.length=e}}function y(t){let n=i.length;for(;n-- >t;){let t=i[n];l.containerState=t[1],t[0].exit.call(l,e)}i.length=t}function b(){t.write([null]),n=void 0,t=void 0,l.containerState._closeFlow=void 0}}function Re(e,t,n){return Oe(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function je(e){return null===e||Ee(e)||De(e)?1:Ae(e)?2:void 0}function _e(e,t,n){let r=[],l=-1;for(;++l<e.length;){let i=e[l].resolveAll;i&&!r.includes(i)&&(t=i(t,n),r.push(i))}return t}var Be={name:"attention",tokenize:He,resolveAll:Ne};function Ne(e,t){let n,r,l,i,o,a,u,s,c=-1;for(;++c<e.length;)if("enter"===e[c][0]&&"attentionSequence"===e[c][1].type&&e[c][1]._close)for(n=c;n--;)if("exit"===e[n][0]&&"attentionSequence"===e[n][1].type&&e[n][1]._open&&t.sliceSerialize(e[n][1]).charCodeAt(0)===t.sliceSerialize(e[c][1]).charCodeAt(0)){if((e[n][1]._close||e[c][1]._open)&&(e[c][1].end.offset-e[c][1].start.offset)%3&&!((e[n][1].end.offset-e[n][1].start.offset+e[c][1].end.offset-e[c][1].start.offset)%3))continue;a=e[n][1].end.offset-e[n][1].start.offset>1&&e[c][1].end.offset-e[c][1].start.offset>1?2:1;let f=Object.assign({},e[n][1].end),p=Object.assign({},e[c][1].start);Ue(f,-a),Ue(p,a),i={type:a>1?"strongSequence":"emphasisSequence",start:f,end:Object.assign({},e[n][1].end)},o={type:a>1?"strongSequence":"emphasisSequence",start:Object.assign({},e[c][1].start),end:p},l={type:a>1?"strongText":"emphasisText",start:Object.assign({},e[n][1].end),end:Object.assign({},e[c][1].start)},r={type:a>1?"strong":"emphasis",start:Object.assign({},i.start),end:Object.assign({},o.end)},e[n][1].end=Object.assign({},i.start),e[c][1].start=Object.assign({},o.end),u=[],e[n][1].end.offset-e[n][1].start.offset&&(u=fe(u,[["enter",e[n][1],t],["exit",e[n][1],t]])),u=fe(u,[["enter",r,t],["enter",i,t],["exit",i,t],["enter",l,t]]),u=fe(u,_e(t.parser.constructs.insideSpan.null,e.slice(n+1,c),t)),u=fe(u,[["exit",l,t],["enter",o,t],["exit",o,t],["exit",r,t]]),e[c][1].end.offset-e[c][1].start.offset?(s=2,u=fe(u,[["enter",e[c][1],t],["exit",e[c][1],t]])):s=0,ce(e,n-1,c-n+3,u),c=n+u.length-s-2;break}for(c=-1;++c<e.length;)"attentionSequence"===e[c][1].type&&(e[c][1].type="data");return e}function He(e,t){let n,r=this.parser.constructs.attentionMarkers.null,l=this.previous,i=je(l);return o;function o(t){return n=t,e.enter("attentionSequence"),a(t)}function a(o){if(o===n)return e.consume(o),a;let u=e.exit("attentionSequence"),s=je(o),c=!s||2===s&&i||r.includes(o),f=!i||2===i&&s||r.includes(l);return u._open=!!(42===n?c:c&&(i||!f)),u._close=!!(42===n?f:f&&(s||!c)),t(o)}}function Ue(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}var qe={name:"autolink",tokenize:Ve};function Ve(e,t,n){let r=0;return l;function l(t){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(t),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),i}function i(t){return ye(t)?(e.consume(t),o):s(t)}function o(e){return 43===e||45===e||46===e||be(e)?(r=1,a(e)):s(e)}function a(t){return 58===t?(e.consume(t),r=0,u):(43===t||45===t||46===t||be(t))&&r++<32?(e.consume(t),a):(r=0,s(t))}function u(r){return 62===r?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(r),e.exit("autolinkMarker"),e.exit("autolink"),t):null===r||32===r||60===r||xe(r)?n(r):(e.consume(r),u)}function s(t){return 64===t?(e.consume(t),c):ke(t)?(e.consume(t),s):n(t)}function c(e){return be(e)?f(e):n(e)}function f(n){return 46===n?(e.consume(n),r=0,c):62===n?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(n),e.exit("autolinkMarker"),e.exit("autolink"),t):p(n)}function p(t){if((45===t||be(t))&&r++<63){let n=45===t?p:f;return e.consume(t),n}return n(t)}}var We={tokenize:$e,partial:!0};function $e(e,t,n){return r;function r(t){return Fe(t)?Oe(e,l,"linePrefix")(t):l(t)}function l(e){return null===e||Ce(e)?t(e):n(e)}}var Qe={name:"blockQuote",tokenize:Ye,continuation:{tokenize:Ke},exit:Xe};function Ye(e,t,n){let r=this;return l;function l(t){if(62===t){let n=r.containerState;return n.open||(e.enter("blockQuote",{_container:!0}),n.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(t),e.exit("blockQuoteMarker"),i}return n(t)}function i(n){return Fe(n)?(e.enter("blockQuotePrefixWhitespace"),e.consume(n),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(n))}}function Ke(e,t,n){let r=this;return l;function l(t){return Fe(t)?Oe(e,i,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(t):i(t)}function i(r){return e.attempt(Qe,t,n)(r)}}function Xe(e){e.exit("blockQuote")}var Ze={name:"characterEscape",tokenize:Je};function Je(e,t,n){return r;function r(t){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(t),e.exit("escapeMarker"),l}function l(r){return Se(r)?(e.enter("characterEscapeValue"),e.consume(r),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(r)}}var Ge=document.createElement("i");function et(e){let t="&"+e+";";Ge.innerHTML=t;let n=Ge.textContent;return(59!==n.charCodeAt(n.length-1)||"semi"===e)&&n!==t&&n}var tt={name:"characterReference",tokenize:nt};function nt(e,t,n){let r,l,i=this,o=0;return a;function a(t){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(t),e.exit("characterReferenceMarker"),u}function u(t){return 35===t?(e.enter("characterReferenceMarkerNumeric"),e.consume(t),e.exit("characterReferenceMarkerNumeric"),s):(e.enter("characterReferenceValue"),r=31,l=be,c(t))}function s(t){return 88===t||120===t?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(t),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),r=6,l=we,c):(e.enter("characterReferenceValue"),r=7,l=ve,c(t))}function c(a){if(59===a&&o){let r=e.exit("characterReferenceValue");return l!==be||et(i.sliceSerialize(r))?(e.enter("characterReferenceMarker"),e.consume(a),e.exit("characterReferenceMarker"),e.exit("characterReference"),t):n(a)}return l(a)&&o++<r?(e.consume(a),c):n(a)}}var rt={tokenize:ot,partial:!0},lt={name:"codeFenced",tokenize:it,concrete:!0};function it(e,t,n){let r,l=this,i={tokenize:v,partial:!0},o=0,a=0;return u;function u(e){return s(e)}function s(t){let n=l.events[l.events.length-1];return o=n&&"linePrefix"===n[1].type?n[2].sliceSerialize(n[1],!0).length:0,r=t,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),c(t)}function c(t){return t===r?(a++,e.consume(t),c):a<3?n(t):(e.exit("codeFencedFenceSequence"),Fe(t)?Oe(e,f,"whitespace")(t):f(t))}function f(n){return null===n||Ce(n)?(e.exit("codeFencedFence"),l.interrupt?t(n):e.check(rt,g,x)(n)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),p(n))}function p(t){return null===t||Ce(t)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),f(t)):Fe(t)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),Oe(e,d,"whitespace")(t)):96===t&&t===r?n(t):(e.consume(t),p)}function d(t){return null===t||Ce(t)?f(t):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),h(t))}function h(t){return null===t||Ce(t)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),f(t)):96===t&&t===r?n(t):(e.consume(t),h)}function g(t){return e.attempt(i,x,m)(t)}function m(t){return e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),y}function y(t){return o>0&&Fe(t)?Oe(e,b,"linePrefix",o+1)(t):b(t)}function b(t){return null===t||Ce(t)?e.check(rt,g,x)(t):(e.enter("codeFlowValue"),k(t))}function k(t){return null===t||Ce(t)?(e.exit("codeFlowValue"),b(t)):(e.consume(t),k)}function x(n){return e.exit("codeFenced"),t(n)}function v(e,t,n){let i=0;return o;function o(t){return e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),u}function u(t){return e.enter("codeFencedFence"),Fe(t)?Oe(e,s,"linePrefix",l.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(t):s(t)}function s(t){return t===r?(e.enter("codeFencedFenceSequence"),c(t)):n(t)}function c(t){return t===r?(i++,e.consume(t),c):i>=a?(e.exit("codeFencedFenceSequence"),Fe(t)?Oe(e,f,"whitespace")(t):f(t)):n(t)}function f(r){return null===r||Ce(r)?(e.exit("codeFencedFence"),t(r)):n(r)}}}function ot(e,t,n){let r=this;return l;function l(t){return null===t?n(t):(e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),i)}function i(e){return r.parser.lazy[r.now().line]?n(e):t(e)}}var at={name:"codeIndented",tokenize:st},ut={tokenize:ct,partial:!0};function st(e,t,n){let r=this;return l;function l(t){return e.enter("codeIndented"),Oe(e,i,"linePrefix",5)(t)}function i(e){let t=r.events[r.events.length-1];return t&&"linePrefix"===t[1].type&&t[2].sliceSerialize(t[1],!0).length>=4?o(e):n(e)}function o(t){return null===t?u(t):Ce(t)?e.attempt(ut,o,u)(t):(e.enter("codeFlowValue"),a(t))}function a(t){return null===t||Ce(t)?(e.exit("codeFlowValue"),o(t)):(e.consume(t),a)}function u(n){return e.exit("codeIndented"),t(n)}}function ct(e,t,n){let r=this;return l;function l(t){return r.parser.lazy[r.now().line]?n(t):Ce(t)?(e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),l):Oe(e,i,"linePrefix",5)(t)}function i(e){let i=r.events[r.events.length-1];return i&&"linePrefix"===i[1].type&&i[2].sliceSerialize(i[1],!0).length>=4?t(e):Ce(e)?l(e):n(e)}}var ft={name:"codeText",tokenize:ht,resolve:pt,previous:dt};function pt(e){let t,n,r=e.length-4,l=3;if(("lineEnding"===e[l][1].type||"space"===e[l][1].type)&&("lineEnding"===e[r][1].type||"space"===e[r][1].type))for(t=l;++t<r;)if("codeTextData"===e[t][1].type){e[l][1].type="codeTextPadding",e[r][1].type="codeTextPadding",l+=2,r-=2;break}for(t=l-1,r++;++t<=r;)void 0===n?t!==r&&"lineEnding"!==e[t][1].type&&(n=t):(t===r||"lineEnding"===e[t][1].type)&&(e[n][1].type="codeTextData",t!==n+2&&(e[n][1].end=e[t-1][1].end,e.splice(n+2,t-n-2),r-=t-n-2,t=n+2),n=void 0);return e}function dt(e){return 96!==e||"characterEscape"===this.events[this.events.length-1][1].type}function ht(e,t,n){let r,l,i=0;return o;function o(t){return e.enter("codeText"),e.enter("codeTextSequence"),a(t)}function a(t){return 96===t?(e.consume(t),i++,a):(e.exit("codeTextSequence"),u(t))}function u(t){return null===t?n(t):32===t?(e.enter("space"),e.consume(t),e.exit("space"),u):96===t?(l=e.enter("codeTextSequence"),r=0,c(t)):Ce(t)?(e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),u):(e.enter("codeTextData"),s(t))}function s(t){return null===t||32===t||96===t||Ce(t)?(e.exit("codeTextData"),u(t)):(e.consume(t),s)}function c(n){return 96===n?(e.consume(n),r++,c):r===i?(e.exit("codeTextSequence"),e.exit("codeText"),t(n)):(l.type="codeTextData",s(n))}}function gt(e){let t,n,r,l,i,o,a,u={},s=-1;for(;++s<e.length;){for(;s in u;)s=u[s];if(t=e[s],s&&"chunkFlow"===t[1].type&&"listItemPrefix"===e[s-1][1].type&&(o=t[1]._tokenizer.events,r=0,r<o.length&&"lineEndingBlank"===o[r][1].type&&(r+=2),r<o.length&&"content"===o[r][1].type))for(;++r<o.length&&"content"!==o[r][1].type;)"chunkText"===o[r][1].type&&(o[r][1]._isInFirstContentOfListItem=!0,r++);if("enter"===t[0])t[1].contentType&&(Object.assign(u,mt(e,s)),s=u[s],a=!0);else if(t[1]._container){for(r=s,n=void 0;r--&&(l=e[r],"lineEnding"===l[1].type||"lineEndingBlank"===l[1].type);)"enter"===l[0]&&(n&&(e[n][1].type="lineEndingBlank"),l[1].type="lineEnding",n=r);n&&(t[1].end=Object.assign({},e[n][1].start),i=e.slice(n,s),i.unshift(t),ce(e,n,s-n+1,i))}}return!a}function mt(e,t){let n,r,l=e[t][1],i=e[t][2],o=t-1,a=[],u=l._tokenizer||i.parser[l.contentType](l.start),s=u.events,c=[],f={},p=-1,d=l,h=0,g=0,m=[g];for(;d;){for(;e[++o][1]!==d;);a.push(o),d._tokenizer||(n=i.sliceStream(d),d.next||n.push(null),r&&u.defineSkip(d.start),d._isInFirstContentOfListItem&&(u._gfmTasklistFirstContentOfListItem=!0),u.write(n),d._isInFirstContentOfListItem&&(u._gfmTasklistFirstContentOfListItem=void 0)),r=d,d=d.next}for(d=l;++p<s.length;)"exit"===s[p][0]&&"enter"===s[p-1][0]&&s[p][1].type===s[p-1][1].type&&s[p][1].start.line!==s[p][1].end.line&&(g=p+1,m.push(g),d._tokenizer=void 0,d.previous=void 0,d=d.next);for(u.events=[],d?(d._tokenizer=void 0,d.previous=void 0):m.pop(),p=m.length;p--;){let t=s.slice(m[p],m[p+1]),n=a.pop();c.unshift([n,n+t.length-1]),ce(e,n,2,t)}for(p=-1;++p<c.length;)f[h+c[p][0]]=h+c[p][1],h+=c[p][1]-c[p][0]-1;return f}var yt={tokenize:xt,resolve:kt},bt={tokenize:vt,partial:!0};function kt(e){return gt(e),e}function xt(e,t){let n;return r;function r(t){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),l(t)}function l(t){return null===t?i(t):Ce(t)?e.check(bt,o,i)(t):(e.consume(t),l)}function i(n){return e.exit("chunkContent"),e.exit("content"),t(n)}function o(t){return e.consume(t),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,l}}function vt(e,t,n){let r=this;return l;function l(t){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),Oe(e,i,"linePrefix")}function i(l){if(null===l||Ce(l))return n(l);let i=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&i&&"linePrefix"===i[1].type&&i[2].sliceSerialize(i[1],!0).length>=4?t(l):e.interrupt(r.parser.constructs.flow,n,t)(l)}}function wt(e,t,n,r,l,i,o,a,u){let s=u||Number.POSITIVE_INFINITY,c=0;return f;function f(t){return 60===t?(e.enter(r),e.enter(l),e.enter(i),e.consume(t),e.exit(i),p):null===t||32===t||41===t||xe(t)?n(t):(e.enter(r),e.enter(o),e.enter(a),e.enter("chunkString",{contentType:"string"}),g(t))}function p(n){return 62===n?(e.enter(i),e.consume(n),e.exit(i),e.exit(l),e.exit(r),t):(e.enter(a),e.enter("chunkString",{contentType:"string"}),d(n))}function d(t){return 62===t?(e.exit("chunkString"),e.exit(a),p(t)):null===t||60===t||Ce(t)?n(t):(e.consume(t),92===t?h:d)}function h(t){return 60===t||62===t||92===t?(e.consume(t),d):d(t)}function g(l){return c||null!==l&&41!==l&&!Ee(l)?c<s&&40===l?(e.consume(l),c++,g):41===l?(e.consume(l),c--,g):null===l||32===l||40===l||xe(l)?n(l):(e.consume(l),92===l?m:g):(e.exit("chunkString"),e.exit(a),e.exit(o),e.exit(r),t(l))}function m(t){return 40===t||41===t||92===t?(e.consume(t),g):g(t)}}function St(e,t,n,r,l,i){let o,a=this,u=0;return s;function s(t){return e.enter(r),e.enter(l),e.consume(t),e.exit(l),e.enter(i),c}function c(s){return u>999||null===s||91===s||93===s&&!o||94===s&&!u&&"_hiddenFootnoteSupport"in a.parser.constructs?n(s):93===s?(e.exit(i),e.enter(l),e.consume(s),e.exit(l),e.exit(r),t):Ce(s)?(e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),c):(e.enter("chunkString",{contentType:"string"}),f(s))}function f(t){return null===t||91===t||93===t||Ce(t)||u++>999?(e.exit("chunkString"),c(t)):(e.consume(t),o||(o=!Fe(t)),92===t?p:f)}function p(t){return 91===t||92===t||93===t?(e.consume(t),u++,f):f(t)}}function Ct(e,t,n,r,l,i){let o;return a;function a(t){return 34===t||39===t||40===t?(e.enter(r),e.enter(l),e.consume(t),e.exit(l),o=40===t?41:t,u):n(t)}function u(n){return n===o?(e.enter(l),e.consume(n),e.exit(l),e.exit(r),t):(e.enter(i),s(n))}function s(t){return t===o?(e.exit(i),u(o)):null===t?n(t):Ce(t)?(e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),Oe(e,s,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),c(t))}function c(t){return t===o||null===t||Ce(t)?(e.exit("chunkString"),s(t)):(e.consume(t),92===t?f:c)}function f(t){return t===o||92===t?(e.consume(t),c):c(t)}}function Et(e,t){let n;return r;function r(l){return Ce(l)?(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),n=!0,r):Fe(l)?Oe(e,r,n?"linePrefix":"lineSuffix")(l):t(l)}}function Ft(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}var At={name:"definition",tokenize:Tt},Dt={tokenize:Ot,partial:!0};function Tt(e,t,n){let r,l=this;return i;function i(t){return e.enter("definition"),o(t)}function o(t){return St.call(l,e,a,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(t)}function a(t){return r=Ft(l.sliceSerialize(l.events[l.events.length-1][1]).slice(1,-1)),58===t?(e.enter("definitionMarker"),e.consume(t),e.exit("definitionMarker"),u):n(t)}function u(t){return Ee(t)?Et(e,s)(t):s(t)}function s(t){return wt(e,c,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(t)}function c(t){return e.attempt(Dt,f,f)(t)}function f(t){return Fe(t)?Oe(e,p,"whitespace")(t):p(t)}function p(i){return null===i||Ce(i)?(e.exit("definition"),l.parser.defined.push(r),t(i)):n(i)}}function Ot(e,t,n){return r;function r(t){return Ee(t)?Et(e,l)(t):n(t)}function l(t){return Ct(e,i,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(t)}function i(t){return Fe(t)?Oe(e,o,"whitespace")(t):o(t)}function o(e){return null===e||Ce(e)?t(e):n(e)}}var Lt={name:"hardBreakEscape",tokenize:Pt};function Pt(e,t,n){return r;function r(t){return e.enter("hardBreakEscape"),e.consume(t),l}function l(r){return Ce(r)?(e.exit("hardBreakEscape"),t(r)):n(r)}}var It={name:"headingAtx",tokenize:Mt,resolve:zt};function zt(e,t){let n,r,l=e.length-2,i=3;return"whitespace"===e[i][1].type&&(i+=2),l-2>i&&"whitespace"===e[l][1].type&&(l-=2),"atxHeadingSequence"===e[l][1].type&&(i===l-1||l-4>i&&"whitespace"===e[l-2][1].type)&&(l-=i+1===l?2:4),l>i&&(n={type:"atxHeadingText",start:e[i][1].start,end:e[l][1].end},r={type:"chunkText",start:e[i][1].start,end:e[l][1].end,contentType:"text"},ce(e,i,l-i+1,[["enter",n,t],["enter",r,t],["exit",r,t],["exit",n,t]])),e}function Mt(e,t,n){let r=0;return l;function l(t){return e.enter("atxHeading"),i(t)}function i(t){return e.enter("atxHeadingSequence"),o(t)}function o(t){return 35===t&&r++<6?(e.consume(t),o):null===t||Ee(t)?(e.exit("atxHeadingSequence"),a(t)):n(t)}function a(n){return 35===n?(e.enter("atxHeadingSequence"),u(n)):null===n||Ce(n)?(e.exit("atxHeading"),t(n)):Fe(n)?Oe(e,a,"whitespace")(n):(e.enter("atxHeadingText"),s(n))}function u(t){return 35===t?(e.consume(t),u):(e.exit("atxHeadingSequence"),a(t))}function s(t){return null===t||35===t||Ee(t)?(e.exit("atxHeadingText"),a(t)):(e.consume(t),s)}}var Rt=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],jt=["pre","script","style","textarea"],_t={name:"htmlFlow",tokenize:Ut,resolveTo:Ht,concrete:!0},Bt={tokenize:Vt,partial:!0},Nt={tokenize:qt,partial:!0};function Ht(e){let t=e.length;for(;t--&&("enter"!==e[t][0]||"htmlFlow"!==e[t][1].type););return t>1&&"linePrefix"===e[t-2][1].type&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function Ut(e,t,n){let r,l,i,o,a,u=this;return s;function s(e){return c(e)}function c(t){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(t),f}function f(o){return 33===o?(e.consume(o),p):47===o?(e.consume(o),l=!0,g):63===o?(e.consume(o),r=3,u.interrupt?t:R):ye(o)?(e.consume(o),i=String.fromCharCode(o),m):n(o)}function p(l){return 45===l?(e.consume(l),r=2,d):91===l?(e.consume(l),r=5,o=0,h):ye(l)?(e.consume(l),r=4,u.interrupt?t:R):n(l)}function d(r){return 45===r?(e.consume(r),u.interrupt?t:R):n(r)}function h(r){let l="CDATA[";return r===l.charCodeAt(o++)?(e.consume(r),o===l.length?u.interrupt?t:D:h):n(r)}function g(t){return ye(t)?(e.consume(t),i=String.fromCharCode(t),m):n(t)}function m(o){if(null===o||47===o||62===o||Ee(o)){let a=47===o,s=i.toLowerCase();return a||l||!jt.includes(s)?Rt.includes(i.toLowerCase())?(r=6,a?(e.consume(o),y):u.interrupt?t(o):D(o)):(r=7,u.interrupt&&!u.parser.lazy[u.now().line]?n(o):l?b(o):k(o)):(r=1,u.interrupt?t(o):D(o))}return 45===o||be(o)?(e.consume(o),i+=String.fromCharCode(o),m):n(o)}function y(r){return 62===r?(e.consume(r),u.interrupt?t:D):n(r)}function b(t){return Fe(t)?(e.consume(t),b):F(t)}function k(t){return 47===t?(e.consume(t),F):58===t||95===t||ye(t)?(e.consume(t),x):Fe(t)?(e.consume(t),k):F(t)}function x(t){return 45===t||46===t||58===t||95===t||be(t)?(e.consume(t),x):v(t)}function v(t){return 61===t?(e.consume(t),w):Fe(t)?(e.consume(t),v):k(t)}function w(t){return null===t||60===t||61===t||62===t||96===t?n(t):34===t||39===t?(e.consume(t),a=t,S):Fe(t)?(e.consume(t),w):C(t)}function S(t){return t===a?(e.consume(t),a=null,E):null===t||Ce(t)?n(t):(e.consume(t),S)}function C(t){return null===t||34===t||39===t||47===t||60===t||61===t||62===t||96===t||Ee(t)?v(t):(e.consume(t),C)}function E(e){return 47===e||62===e||Fe(e)?k(e):n(e)}function F(t){return 62===t?(e.consume(t),A):n(t)}function A(t){return null===t||Ce(t)?D(t):Fe(t)?(e.consume(t),A):n(t)}function D(t){return 45===t&&2===r?(e.consume(t),P):60===t&&1===r?(e.consume(t),I):62===t&&4===r?(e.consume(t),j):63===t&&3===r?(e.consume(t),R):93===t&&5===r?(e.consume(t),M):!Ce(t)||6!==r&&7!==r?null===t||Ce(t)?(e.exit("htmlFlowData"),T(t)):(e.consume(t),D):(e.exit("htmlFlowData"),e.check(Bt,_,T)(t))}function T(t){return e.check(Nt,O,_)(t)}function O(t){return e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),L}function L(t){return null===t||Ce(t)?T(t):(e.enter("htmlFlowData"),D(t))}function P(t){return 45===t?(e.consume(t),R):D(t)}function I(t){return 47===t?(e.consume(t),i="",z):D(t)}function z(t){if(62===t){let n=i.toLowerCase();return jt.includes(n)?(e.consume(t),j):D(t)}return ye(t)&&i.length<8?(e.consume(t),i+=String.fromCharCode(t),z):D(t)}function M(t){return 93===t?(e.consume(t),R):D(t)}function R(t){return 62===t?(e.consume(t),j):45===t&&2===r?(e.consume(t),R):D(t)}function j(t){return null===t||Ce(t)?(e.exit("htmlFlowData"),_(t)):(e.consume(t),j)}function _(n){return e.exit("htmlFlow"),t(n)}}function qt(e,t,n){let r=this;return l;function l(t){return Ce(t)?(e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),i):n(t)}function i(e){return r.parser.lazy[r.now().line]?n(e):t(e)}}function Vt(e,t,n){return r;function r(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),e.attempt(We,t,n)}}var Wt={name:"htmlText",tokenize:$t};function $t(e,t,n){let r,l,i,o=this;return a;function a(t){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(t),u}function u(t){return 33===t?(e.consume(t),s):47===t?(e.consume(t),v):63===t?(e.consume(t),k):ye(t)?(e.consume(t),C):n(t)}function s(t){return 45===t?(e.consume(t),c):91===t?(e.consume(t),l=0,h):ye(t)?(e.consume(t),b):n(t)}function c(t){return 45===t?(e.consume(t),d):n(t)}function f(t){return null===t?n(t):45===t?(e.consume(t),p):Ce(t)?(i=f,I(t)):(e.consume(t),f)}function p(t){return 45===t?(e.consume(t),d):f(t)}function d(e){return 62===e?P(e):45===e?p(e):f(e)}function h(t){let r="CDATA[";return t===r.charCodeAt(l++)?(e.consume(t),l===r.length?g:h):n(t)}function g(t){return null===t?n(t):93===t?(e.consume(t),m):Ce(t)?(i=g,I(t)):(e.consume(t),g)}function m(t){return 93===t?(e.consume(t),y):g(t)}function y(t){return 62===t?P(t):93===t?(e.consume(t),y):g(t)}function b(t){return null===t||62===t?P(t):Ce(t)?(i=b,I(t)):(e.consume(t),b)}function k(t){return null===t?n(t):63===t?(e.consume(t),x):Ce(t)?(i=k,I(t)):(e.consume(t),k)}function x(e){return 62===e?P(e):k(e)}function v(t){return ye(t)?(e.consume(t),w):n(t)}function w(t){return 45===t||be(t)?(e.consume(t),w):S(t)}function S(t){return Ce(t)?(i=S,I(t)):Fe(t)?(e.consume(t),S):P(t)}function C(t){return 45===t||be(t)?(e.consume(t),C):47===t||62===t||Ee(t)?E(t):n(t)}function E(t){return 47===t?(e.consume(t),P):58===t||95===t||ye(t)?(e.consume(t),F):Ce(t)?(i=E,I(t)):Fe(t)?(e.consume(t),E):P(t)}function F(t){return 45===t||46===t||58===t||95===t||be(t)?(e.consume(t),F):A(t)}function A(t){return 61===t?(e.consume(t),D):Ce(t)?(i=A,I(t)):Fe(t)?(e.consume(t),A):E(t)}function D(t){return null===t||60===t||61===t||62===t||96===t?n(t):34===t||39===t?(e.consume(t),r=t,T):Ce(t)?(i=D,I(t)):Fe(t)?(e.consume(t),D):(e.consume(t),O)}function T(t){return t===r?(e.consume(t),r=void 0,L):null===t?n(t):Ce(t)?(i=T,I(t)):(e.consume(t),T)}function O(t){return null===t||34===t||39===t||60===t||61===t||96===t?n(t):47===t||62===t||Ee(t)?E(t):(e.consume(t),O)}function L(e){return 47===e||62===e||Ee(e)?E(e):n(e)}function P(r){return 62===r?(e.consume(r),e.exit("htmlTextData"),e.exit("htmlText"),t):n(r)}function I(t){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),z}function z(t){return Fe(t)?Oe(e,M,"linePrefix",o.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(t):M(t)}function M(t){return e.enter("htmlTextData"),i(t)}}var Qt={name:"labelEnd",tokenize:Gt,resolveTo:Jt,resolveAll:Zt},Yt={tokenize:en},Kt={tokenize:tn},Xt={tokenize:nn};function Zt(e){let t=-1;for(;++t<e.length;){let n=e[t][1];("labelImage"===n.type||"labelLink"===n.type||"labelEnd"===n.type)&&(e.splice(t+1,"labelImage"===n.type?4:2),n.type="data",t++)}return e}function Jt(e,t){let n,r,l,i,o=e.length,a=0;for(;o--;)if(n=e[o][1],r){if("link"===n.type||"labelLink"===n.type&&n._inactive)break;"enter"===e[o][0]&&"labelLink"===n.type&&(n._inactive=!0)}else if(l){if("enter"===e[o][0]&&("labelImage"===n.type||"labelLink"===n.type)&&!n._balanced&&(r=o,"labelLink"!==n.type)){a=2;break}}else"labelEnd"===n.type&&(l=o);let u={type:"labelLink"===e[r][1].type?"link":"image",start:Object.assign({},e[r][1].start),end:Object.assign({},e[e.length-1][1].end)},s={type:"label",start:Object.assign({},e[r][1].start),end:Object.assign({},e[l][1].end)},c={type:"labelText",start:Object.assign({},e[r+a+2][1].end),end:Object.assign({},e[l-2][1].start)};return i=[["enter",u,t],["enter",s,t]],i=fe(i,e.slice(r+1,r+a+3)),i=fe(i,[["enter",c,t]]),i=fe(i,_e(t.parser.constructs.insideSpan.null,e.slice(r+a+4,l-3),t)),i=fe(i,[["exit",c,t],e[l-2],e[l-1],["exit",s,t]]),i=fe(i,e.slice(l+1)),i=fe(i,[["exit",u,t]]),ce(e,r,e.length,i),e}function Gt(e,t,n){let r,l,i=this,o=i.events.length;for(;o--;)if(("labelImage"===i.events[o][1].type||"labelLink"===i.events[o][1].type)&&!i.events[o][1]._balanced){r=i.events[o][1];break}return a;function a(t){return r?r._inactive?f(t):(l=i.parser.defined.includes(Ft(i.sliceSerialize({start:r.end,end:i.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(t),e.exit("labelMarker"),e.exit("labelEnd"),u):n(t)}function u(t){return 40===t?e.attempt(Yt,c,l?c:f)(t):91===t?e.attempt(Kt,c,l?s:f)(t):l?c(t):f(t)}function s(t){return e.attempt(Xt,c,f)(t)}function c(e){return t(e)}function f(e){return r._balanced=!0,n(e)}}function en(e,t,n){return r;function r(t){return e.enter("resource"),e.enter("resourceMarker"),e.consume(t),e.exit("resourceMarker"),l}function l(t){return Ee(t)?Et(e,i)(t):i(t)}function i(t){return 41===t?c(t):wt(e,o,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(t)}function o(t){return Ee(t)?Et(e,u)(t):c(t)}function a(e){return n(e)}function u(t){return 34===t||39===t||40===t?Ct(e,s,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(t):c(t)}function s(t){return Ee(t)?Et(e,c)(t):c(t)}function c(r){return 41===r?(e.enter("resourceMarker"),e.consume(r),e.exit("resourceMarker"),e.exit("resource"),t):n(r)}}function tn(e,t,n){let r=this;return l;function l(t){return St.call(r,e,i,o,"reference","referenceMarker","referenceString")(t)}function i(e){return r.parser.defined.includes(Ft(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(e):n(e)}function o(e){return n(e)}}function nn(e,t,n){return r;function r(t){return e.enter("reference"),e.enter("referenceMarker"),e.consume(t),e.exit("referenceMarker"),l}function l(r){return 93===r?(e.enter("referenceMarker"),e.consume(r),e.exit("referenceMarker"),e.exit("reference"),t):n(r)}}var rn={name:"labelStartImage",tokenize:ln,resolveAll:Qt.resolveAll};function ln(e,t,n){let r=this;return l;function l(t){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(t),e.exit("labelImageMarker"),i}function i(t){return 91===t?(e.enter("labelMarker"),e.consume(t),e.exit("labelMarker"),e.exit("labelImage"),o):n(t)}function o(e){return 94===e&&"_hiddenFootnoteSupport"in r.parser.constructs?n(e):t(e)}}var on={name:"labelStartLink",tokenize:an,resolveAll:Qt.resolveAll};function an(e,t,n){let r=this;return l;function l(t){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(t),e.exit("labelMarker"),e.exit("labelLink"),i}function i(e){return 94===e&&"_hiddenFootnoteSupport"in r.parser.constructs?n(e):t(e)}}var un={name:"lineEnding",tokenize:sn};function sn(e,t){return n;function n(n){return e.enter("lineEnding"),e.consume(n),e.exit("lineEnding"),Oe(e,t,"linePrefix")}}var cn={name:"thematicBreak",tokenize:fn};function fn(e,t,n){let r,l=0;return i;function i(t){return e.enter("thematicBreak"),o(t)}function o(e){return r=e,a(e)}function a(i){return i===r?(e.enter("thematicBreakSequence"),u(i)):l>=3&&(null===i||Ce(i))?(e.exit("thematicBreak"),t(i)):n(i)}function u(t){return t===r?(e.consume(t),l++,u):(e.exit("thematicBreakSequence"),Fe(t)?Oe(e,a,"whitespace")(t):a(t))}}var pn={name:"list",tokenize:gn,continuation:{tokenize:mn},exit:bn},dn={tokenize:kn,partial:!0},hn={tokenize:yn,partial:!0};function gn(e,t,n){let r=this,l=r.events[r.events.length-1],i=l&&"linePrefix"===l[1].type?l[2].sliceSerialize(l[1],!0).length:0,o=0;return a;function a(t){let l=r.containerState.type||(42===t||43===t||45===t?"listUnordered":"listOrdered");if("listUnordered"===l?!r.containerState.marker||t===r.containerState.marker:ve(t)){if(r.containerState.type||(r.containerState.type=l,e.enter(l,{_container:!0})),"listUnordered"===l)return e.enter("listItemPrefix"),42===t||45===t?e.check(cn,n,s)(t):s(t);if(!r.interrupt||49===t)return e.enter("listItemPrefix"),e.enter("listItemValue"),u(t)}return n(t)}function u(t){return ve(t)&&++o<10?(e.consume(t),u):(!r.interrupt||o<2)&&(r.containerState.marker?t===r.containerState.marker:41===t||46===t)?(e.exit("listItemValue"),s(t)):n(t)}function s(t){return e.enter("listItemMarker"),e.consume(t),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||t,e.check(We,r.interrupt?n:c,e.attempt(dn,p,f))}function c(e){return r.containerState.initialBlankLine=!0,i++,p(e)}function f(t){return Fe(t)?(e.enter("listItemPrefixWhitespace"),e.consume(t),e.exit("listItemPrefixWhitespace"),p):n(t)}function p(n){return r.containerState.size=i+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(n)}}function mn(e,t,n){let r=this;return r.containerState._closeFlow=void 0,e.check(We,l,i);function l(n){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,Oe(e,t,"listItemIndent",r.containerState.size+1)(n)}function i(n){return r.containerState.furtherBlankLines||!Fe(n)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,o(n)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(hn,t,o)(n))}function o(l){return r.containerState._closeFlow=!0,r.interrupt=void 0,Oe(e,e.attempt(pn,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(l)}}function yn(e,t,n){let r=this;return Oe(e,l,"listItemIndent",r.containerState.size+1);function l(e){let l=r.events[r.events.length-1];return l&&"listItemIndent"===l[1].type&&l[2].sliceSerialize(l[1],!0).length===r.containerState.size?t(e):n(e)}}function bn(e){e.exit(this.containerState.type)}function kn(e,t,n){let r=this;return Oe(e,l,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function l(e){let l=r.events[r.events.length-1];return!Fe(e)&&l&&"listItemPrefixWhitespace"===l[1].type?t(e):n(e)}}var xn={name:"setextUnderline",tokenize:wn,resolveTo:vn};function vn(e,t){let n,r,l,i=e.length;for(;i--;)if("enter"===e[i][0]){if("content"===e[i][1].type){n=i;break}"paragraph"===e[i][1].type&&(r=i)}else"content"===e[i][1].type&&e.splice(i,1),!l&&"definition"===e[i][1].type&&(l=i);let o={type:"setextHeading",start:Object.assign({},e[r][1].start),end:Object.assign({},e[e.length-1][1].end)};return e[r][1].type="setextHeadingText",l?(e.splice(r,0,["enter",o,t]),e.splice(l+1,0,["exit",e[n][1],t]),e[n][1].end=Object.assign({},e[l][1].end)):e[n][1]=o,e.push(["exit",o,t]),e}function wn(e,t,n){let r,l=this;return i;function i(t){let i,a=l.events.length;for(;a--;)if("lineEnding"!==l.events[a][1].type&&"linePrefix"!==l.events[a][1].type&&"content"!==l.events[a][1].type){i="paragraph"===l.events[a][1].type;break}return l.parser.lazy[l.now().line]||!l.interrupt&&!i?n(t):(e.enter("setextHeadingLine"),r=t,o(t))}function o(t){return e.enter("setextHeadingLineSequence"),a(t)}function a(t){return t===r?(e.consume(t),a):(e.exit("setextHeadingLineSequence"),Fe(t)?Oe(e,u,"lineSuffix")(t):u(t))}function u(r){return null===r||Ce(r)?(e.exit("setextHeadingLine"),t(r)):n(r)}}var Sn={tokenize:Cn};function Cn(e){let t=this,n=e.attempt(We,r,e.attempt(this.parser.constructs.flowInitial,l,Oe(e,e.attempt(this.parser.constructs.flow,l,e.attempt(yt,l)),"linePrefix")));return n;function r(r){if(null!==r)return e.enter("lineEndingBlank"),e.consume(r),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n;e.consume(r)}function l(r){if(null!==r)return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),t.currentConstruct=void 0,n;e.consume(r)}}var En={resolveAll:Tn()},Fn=Dn("string"),An=Dn("text");function Dn(e){return{tokenize:t,resolveAll:Tn("text"===e?On:void 0)};function t(t){let n=this,r=this.parser.constructs[e],l=t.attempt(r,i,o);return i;function i(e){return u(e)?l(e):o(e)}function o(e){if(null!==e)return t.enter("data"),t.consume(e),a;t.consume(e)}function a(e){return u(e)?(t.exit("data"),l(e)):(t.consume(e),a)}function u(e){if(null===e)return!0;let t=r[e],l=-1;if(t)for(;++l<t.length;){let e=t[l];if(!e.previous||e.previous.call(n,n.previous))return!0}return!1}}}function Tn(e){return t;function t(t,n){let r,l=-1;for(;++l<=t.length;)void 0===r?t[l]&&"data"===t[l][1].type&&(r=l,l++):(!t[l]||"data"!==t[l][1].type)&&(l!==r+2&&(t[r][1].end=t[l-1][1].end,t.splice(r+2,l-r-2),l=r+2),r=void 0);return e?e(t,n):t}}function On(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||"lineEnding"===e[n][1].type)&&"data"===e[n-1][1].type){let r,l=e[n-1][1],i=t.sliceStream(l),o=i.length,a=-1,u=0;for(;o--;){let e=i[o];if("string"==typeof e){for(a=e.length;32===e.charCodeAt(a-1);)u++,a--;if(a)break;a=-1}else if(-2===e)r=!0,u++;else if(-1!==e){o++;break}}if(u){let i={type:n===e.length||r||u<2?"lineSuffix":"hardBreakTrailing",start:{line:l.end.line,column:l.end.column-u,offset:l.end.offset-u,_index:l.start._index+o,_bufferIndex:o?a:l.start._bufferIndex+a},end:Object.assign({},l.end)};l.end=Object.assign({},i.start),l.start.offset===l.end.offset?Object.assign(l,i):(e.splice(n,0,["enter",i,t],["exit",i,t]),n+=2)}n++}return e}function Ln(e,t,n){let r=Object.assign(n?Object.assign({},n):{line:1,column:1,offset:0},{_index:0,_bufferIndex:-1}),l={},i=[],o=[],a=[],u={consume:b,enter:k,exit:x,attempt:S(v),check:S(w),interrupt:S(w,{interrupt:!0})},s={previous:null,code:null,containerState:{},events:[],parser:e,sliceStream:d,sliceSerialize:p,now:h,defineSkip:g,write:f},c=t.tokenize.call(s,u);return t.resolveAll&&i.push(t),s;function f(e){return o=fe(o,e),m(),null!==o[o.length-1]?[]:(C(t,0),s.events=_e(i,s.events,s),s.events)}function p(e,t){return In(d(e),t)}function d(e){return Pn(o,e)}function h(){let{line:e,column:t,offset:n,_index:l,_bufferIndex:i}=r;return{line:e,column:t,offset:n,_index:l,_bufferIndex:i}}function g(e){l[e.line]=e.column,F()}function m(){let e;for(;r._index<o.length;){let t=o[r._index];if("string"==typeof t)for(e=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===e&&r._bufferIndex<t.length;)y(t.charCodeAt(r._bufferIndex));else y(t)}}function y(e){c=c(e)}function b(e){Ce(e)?(r.line++,r.column=1,r.offset+=-3===e?2:1,F()):-1!==e&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===o[r._index].length&&(r._bufferIndex=-1,r._index++)),s.previous=e}function k(e,t){let n=t||{};return n.type=e,n.start=h(),s.events.push(["enter",n,s]),a.push(n),n}function x(e){let t=a.pop();return t.end=h(),s.events.push(["exit",t,s]),t}function v(e,t){C(e,t.from)}function w(e,t){t.restore()}function S(e,t){return n;function n(n,r,l){let i,o,a,c;return Array.isArray(n)?p(n):"tokenize"in n?p([n]):f(n);function f(e){return t;function t(t){let n=null!==t&&e[t],r=null!==t&&e.null,l=[...Array.isArray(n)?n:n?[n]:[],...Array.isArray(r)?r:r?[r]:[]];return p(l)(t)}}function p(e){return i=e,o=0,0===e.length?l:d(e[o])}function d(e){return n;function n(n){return c=E(),a=e,e.partial||(s.currentConstruct=e),e.name&&s.parser.constructs.disable.null.includes(e.name)?g():e.tokenize.call(t?Object.assign(Object.create(s),t):s,u,h,g)(n)}}function h(t){return e(a,c),r}function g(e){return c.restore(),++o<i.length?d(i[o]):l}}}function C(e,t){e.resolveAll&&!i.includes(e)&&i.push(e),e.resolve&&ce(s.events,t,s.events.length-t,e.resolve(s.events.slice(t),s)),e.resolveTo&&(s.events=e.resolveTo(s.events,s))}function E(){let e=h(),t=s.previous,n=s.currentConstruct,l=s.events.length,i=Array.from(a);return{restore:o,from:l};function o(){r=e,s.previous=t,s.currentConstruct=n,s.events.length=l,a=i,F()}}function F(){r.line in l&&r.column<2&&(r.column=l[r.line],r.offset+=l[r.line]-1)}}function Pn(e,t){let n,r=t.start._index,l=t.start._bufferIndex,i=t.end._index,o=t.end._bufferIndex;if(r===i)n=[e[r].slice(l,o)];else{if(n=e.slice(r,i),l>-1){let e=n[0];"string"==typeof e?n[0]=e.slice(l):n.shift()}o>0&&n.push(e[i].slice(0,o))}return n}function In(e,t){let n,r=-1,l=[];for(;++r<e.length;){let i,o=e[r];if("string"==typeof o)i=o;else switch(o){case-5:i="\r";break;case-4:i="\n";break;case-3:i="\r\n";break;case-2:i=t?" ":"\t";break;case-1:if(!t&&n)continue;i=" ";break;default:i=String.fromCharCode(o)}n=-2===o,l.push(i)}return l.join("")}var zn={};(0,r.e)(zn,{attentionMarkers:()=>Un,contentInitial:()=>Rn,disable:()=>qn,document:()=>Mn,flow:()=>_n,flowInitial:()=>jn,insideSpan:()=>Hn,string:()=>Bn,text:()=>Nn});var Mn={[42]:pn,[43]:pn,[45]:pn,[48]:pn,[49]:pn,[50]:pn,[51]:pn,[52]:pn,[53]:pn,[54]:pn,[55]:pn,[56]:pn,[57]:pn,[62]:Qe},Rn={[91]:At},jn={[-2]:at,[-1]:at,[32]:at},_n={[35]:It,[42]:cn,[45]:[xn,cn],[60]:_t,[61]:xn,[95]:cn,[96]:lt,[126]:lt},Bn={[38]:tt,[92]:Ze},Nn={[-5]:un,[-4]:un,[-3]:un,[33]:rn,[38]:tt,[42]:Be,[60]:[qe,Wt],[91]:on,[92]:[Lt,Ze],[93]:Qt,[95]:Be,[96]:ft},Hn={null:[Be,En]},Un={null:[42,95]},qn={null:[]};function Vn(e){let t=de([zn,...(e||{}).extensions||[]]),n={defined:[],lazy:{},constructs:t,content:r(Le),document:r(Ie),flow:r(Sn),string:r(Fn),text:r(An)};return n;function r(e){return t;function t(t){return Ln(n,e,t)}}}var Wn=/[\0\t\n\r]/g;function $n(){let e,t=1,n="",r=!0;return l;function l(l,i,o){let a,u,s,c,f,p=[];for(l=n+l.toString(i),s=0,n="",r&&(65279===l.charCodeAt(0)&&s++,r=void 0);s<l.length;){if(Wn.lastIndex=s,a=Wn.exec(l),c=a&&void 0!==a.index?a.index:l.length,f=l.charCodeAt(c),!a){n=l.slice(s);break}if(10===f&&s===c&&e)p.push(-3),e=void 0;else switch(e&&(p.push(-5),e=void 0),s<c&&(p.push(l.slice(s,c)),t+=c-s),f){case 0:p.push(65533),t++;break;case 9:for(u=4*Math.ceil(t/4),p.push(-2);t++<u;)p.push(-1);break;case 10:p.push(-4),t=1;break;default:e=!0,t=1}s=c+1}return o&&(e&&p.push(-5),n&&p.push(n),p.push(null)),p}}function Qn(e){for(;!gt(e););return e}function Yn(e,t){let n=Number.parseInt(e,t);return n<9||11===n||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||65535===(65535&n)||65534===(65535&n)||n>1114111?"�":String.fromCharCode(n)}var Kn=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function Xn(e){return e.replace(Kn,Zn)}function Zn(e,t,n){if(t)return t;if(35===n.charCodeAt(0)){let e=n.charCodeAt(1),t=120===e||88===e;return Yn(n.slice(t?2:1),t?16:10)}return et(n)||e}var Jn={}.hasOwnProperty,Gn=function(e,t,n){return"string"!=typeof t&&(n=t,t=void 0),er(n)(Qn(Vn(n).document().write($n()(e,t,!0))))};function er(e){let t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:a(re),autolinkProtocol:D,autolinkEmail:D,atxHeading:a(G),blockQuote:a(Y),characterEscape:D,characterReference:D,codeFenced:a(K),codeFencedFenceInfo:u,codeFencedFenceMeta:u,codeIndented:a(K,u),codeText:a(X,u),codeTextData:D,data:D,codeFlowValue:D,definition:a(Z),definitionDestinationString:u,definitionLabelString:u,definitionTitleString:u,emphasis:a(J),hardBreakEscape:a(ee),hardBreakTrailing:a(ee),htmlFlow:a(te,u),htmlFlowData:D,htmlText:a(te,u),htmlTextData:D,image:a(ne),label:u,link:a(re),listItem:a(ie),listItemValue:h,listOrdered:a(le,d),listUnordered:a(le),paragraph:a(ae),reference:U,referenceString:u,resourceDestinationString:u,resourceTitleString:u,setextHeading:a(G),strong:a(ue),thematicBreak:a(ce)},exit:{atxHeading:c(),atxHeadingSequence:C,autolink:c(),autolinkEmail:Q,autolinkProtocol:$,blockQuote:c(),characterEscapeValue:T,characterReferenceMarkerHexadecimal:V,characterReferenceMarkerNumeric:V,characterReferenceValue:W,codeFenced:c(k),codeFencedFence:b,codeFencedFenceInfo:g,codeFencedFenceMeta:y,codeFlowValue:T,codeIndented:c(x),codeText:c(z),codeTextData:T,data:T,definition:c(),definitionDestinationString:S,definitionLabelString:v,definitionTitleString:w,emphasis:c(),hardBreakEscape:c(L),hardBreakTrailing:c(L),htmlFlow:c(P),htmlFlowData:T,htmlText:c(I),htmlTextData:T,image:c(R),label:_,labelText:j,lineEnding:O,link:c(M),listItem:c(),listOrdered:c(),listUnordered:c(),paragraph:c(),referenceString:q,resourceDestinationString:B,resourceTitleString:N,resource:H,setextHeading:c(A),setextHeadingLineSequence:F,setextHeadingText:E,strong:c(),thematicBreak:c()}};nr(t,(e||{}).mdastExtensions||[]);let n={};return r;function r(e){let n={type:"root",children:[]},r={stack:[n],tokenStack:[],config:t,enter:s,exit:f,buffer:u,resume:p,setData:i,getData:o},a=[],c=-1;for(;++c<e.length;)if("listOrdered"===e[c][1].type||"listUnordered"===e[c][1].type)if("enter"===e[c][0])a.push(c);else{let t=a.pop();c=l(e,t,c)}for(c=-1;++c<e.length;){let n=t[e[c][0]];Jn.call(n,e[c][1].type)&&n[e[c][1].type].call(Object.assign({sliceSerialize:e[c][2].sliceSerialize},r),e[c][1])}if(r.tokenStack.length>0){let e=r.tokenStack[r.tokenStack.length-1];(e[1]||lr).call(r,void 0,e[0])}for(n.position={start:tr(e.length>0?e[0][1].start:{line:1,column:1,offset:0}),end:tr(e.length>0?e[e.length-2][1].end:{line:1,column:1,offset:0})},c=-1;++c<t.transforms.length;)n=t.transforms[c](n)||n;return n}function l(e,t,n){let r,l,i,o,a=t-1,u=-1,s=!1;for(;++a<=n;){let t=e[a];if("listUnordered"===t[1].type||"listOrdered"===t[1].type||"blockQuote"===t[1].type?("enter"===t[0]?u++:u--,o=void 0):"lineEndingBlank"===t[1].type?"enter"===t[0]&&(r&&!o&&!u&&!i&&(i=a),o=void 0):"linePrefix"===t[1].type||"listItemValue"===t[1].type||"listItemMarker"===t[1].type||"listItemPrefix"===t[1].type||"listItemPrefixWhitespace"===t[1].type||(o=void 0),!u&&"enter"===t[0]&&"listItemPrefix"===t[1].type||-1===u&&"exit"===t[0]&&("listUnordered"===t[1].type||"listOrdered"===t[1].type)){if(r){let o=a;for(l=void 0;o--;){let t=e[o];if("lineEnding"===t[1].type||"lineEndingBlank"===t[1].type){if("exit"===t[0])continue;l&&(e[l][1].type="lineEndingBlank",s=!0),t[1].type="lineEnding",l=o}else if("linePrefix"!==t[1].type&&"blockQuotePrefix"!==t[1].type&&"blockQuotePrefixWhitespace"!==t[1].type&&"blockQuoteMarker"!==t[1].type&&"listItemIndent"!==t[1].type)break}i&&(!l||i<l)&&(r._spread=!0),r.end=Object.assign({},l?e[l][1].start:t[1].end),e.splice(l||a,0,["exit",r,t[2]]),a++,n++}"listItemPrefix"===t[1].type&&(r={type:"listItem",_spread:!1,start:Object.assign({},t[1].start),end:void 0},e.splice(a,0,["enter",r,t[2]]),a++,n++,i=void 0,o=!0)}}return e[t][1]._spread=s,n}function i(e,t){n[e]=t}function o(e){return n[e]}function a(e,t){return n;function n(n){s.call(this,e(n),n),t&&t.call(this,n)}}function u(){this.stack.push({type:"fragment",children:[]})}function s(e,t,n){return this.stack[this.stack.length-1].children.push(e),this.stack.push(e),this.tokenStack.push([t,n]),e.position={start:tr(t.start)},e}function c(e){return t;function t(t){e&&e.call(this,t),f.call(this,t)}}function f(e,t){let n=this.stack.pop(),r=this.tokenStack.pop();if(!r)throw new Error("Cannot close `"+e.type+"` ("+m({start:e.start,end:e.end})+"): it’s not open");return r[0].type!==e.type&&(t?t.call(this,e,r[0]):(r[1]||lr).call(this,e,r[0])),n.position.end=tr(e.end),n}function p(){return oe(this.stack.pop())}function d(){i("expectingFirstListItemValue",!0)}function h(e){if(o("expectingFirstListItemValue")){let t=this.stack[this.stack.length-2];t.start=Number.parseInt(this.sliceSerialize(e),10),i("expectingFirstListItemValue")}}function g(){let e=this.resume(),t=this.stack[this.stack.length-1];t.lang=e}function y(){let e=this.resume(),t=this.stack[this.stack.length-1];t.meta=e}function b(){o("flowCodeInside")||(this.buffer(),i("flowCodeInside",!0))}function k(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),i("flowCodeInside")}function x(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e.replace(/(\r?\n|\r)$/g,"")}function v(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=Ft(this.sliceSerialize(e)).toLowerCase()}function w(){let e=this.resume(),t=this.stack[this.stack.length-1];t.title=e}function S(){let e=this.resume(),t=this.stack[this.stack.length-1];t.url=e}function C(e){let t=this.stack[this.stack.length-1];if(!t.depth){let n=this.sliceSerialize(e).length;t.depth=n}}function E(){i("setextHeadingSlurpLineEnding",!0)}function F(e){let t=this.stack[this.stack.length-1];t.depth=61===this.sliceSerialize(e).charCodeAt(0)?1:2}function A(){i("setextHeadingSlurpLineEnding")}function D(e){let t=this.stack[this.stack.length-1],n=t.children[t.children.length-1];(!n||"text"!==n.type)&&(n=se(),n.position={start:tr(e.start)},t.children.push(n)),this.stack.push(n)}function T(e){let t=this.stack.pop();t.value+=this.sliceSerialize(e),t.position.end=tr(e.end)}function O(e){let n=this.stack[this.stack.length-1];if(o("atHardBreak")){let t=n.children[n.children.length-1];return t.position.end=tr(e.end),void i("atHardBreak")}!o("setextHeadingSlurpLineEnding")&&t.canContainEols.includes(n.type)&&(D.call(this,e),T.call(this,e))}function L(){i("atHardBreak",!0)}function P(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e}function I(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e}function z(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e}function M(){let e=this.stack[this.stack.length-1];if(o("inReference")){let t=o("referenceType")||"shortcut";e.type+="Reference",e.referenceType=t,delete e.url,delete e.title}else delete e.identifier,delete e.label;i("referenceType")}function R(){let e=this.stack[this.stack.length-1];if(o("inReference")){let t=o("referenceType")||"shortcut";e.type+="Reference",e.referenceType=t,delete e.url,delete e.title}else delete e.identifier,delete e.label;i("referenceType")}function j(e){let t=this.sliceSerialize(e),n=this.stack[this.stack.length-2];n.label=Xn(t),n.identifier=Ft(t).toLowerCase()}function _(){let e=this.stack[this.stack.length-1],t=this.resume(),n=this.stack[this.stack.length-1];if(i("inReference",!0),"link"===n.type){let t=e.children;n.children=t}else n.alt=t}function B(){let e=this.resume(),t=this.stack[this.stack.length-1];t.url=e}function N(){let e=this.resume(),t=this.stack[this.stack.length-1];t.title=e}function H(){i("inReference")}function U(){i("referenceType","collapsed")}function q(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=Ft(this.sliceSerialize(e)).toLowerCase(),i("referenceType","full")}function V(e){i("characterReferenceType",e.type)}function W(e){let t,n=this.sliceSerialize(e),r=o("characterReferenceType");r?(t=Yn(n,"characterReferenceMarkerNumeric"===r?10:16),i("characterReferenceType")):t=et(n);let l=this.stack.pop();l.value+=t,l.position.end=tr(e.end)}function $(e){T.call(this,e);let t=this.stack[this.stack.length-1];t.url=this.sliceSerialize(e)}function Q(e){T.call(this,e);let t=this.stack[this.stack.length-1];t.url="mailto:"+this.sliceSerialize(e)}function Y(){return{type:"blockquote",children:[]}}function K(){return{type:"code",lang:null,meta:null,value:""}}function X(){return{type:"inlineCode",value:""}}function Z(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function J(){return{type:"emphasis",children:[]}}function G(){return{type:"heading",depth:void 0,children:[]}}function ee(){return{type:"break"}}function te(){return{type:"html",value:""}}function ne(){return{type:"image",title:null,url:"",alt:null}}function re(){return{type:"link",title:null,url:"",children:[]}}function le(e){return{type:"list",ordered:"listOrdered"===e.type,start:null,spread:e._spread,children:[]}}function ie(e){return{type:"listItem",spread:e._spread,checked:null,children:[]}}function ae(){return{type:"paragraph",children:[]}}function ue(){return{type:"strong",children:[]}}function se(){return{type:"text",value:""}}function ce(){return{type:"thematicBreak"}}}function tr(e){return{line:e.line,column:e.column,offset:e.offset}}function nr(e,t){let n=-1;for(;++n<t.length;){let r=t[n];Array.isArray(r)?nr(e,r):rr(e,r)}}function rr(e,t){let n;for(n in t)if(Jn.call(t,n))if("canContainEols"===n){let r=t[n];r&&e[n].push(...r)}else if("transforms"===n){let r=t[n];r&&e[n].push(...r)}else if("enter"===n||"exit"===n){let r=t[n];r&&Object.assign(e[n],r)}}function lr(e,t){throw e?new Error("Cannot close `"+e.type+"` ("+m({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+m({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+m({start:t.start,end:t.end})+") is still open")}function ir(e){Object.assign(this,{Parser:t=>{let n=this.data("settings");return Gn(t,Object.assign({},n,e,{extensions:this.data("micromarkExtensions")||[],mdastExtensions:this.data("fromMarkdownExtensions")||[]}))}})}function or(e,t){let n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function ar(e,t){let n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:"\n"}]}function ur(e,t){let n=t.value?t.value+"\n":"",r=t.lang?t.lang.match(/^[^ \t]+(?=[ \t]|$)/):null,l={};r&&(l.className=["language-"+r]);let i={type:"element",tagName:"code",properties:l,children:[{type:"text",value:n}]};return t.meta&&(i.data={meta:t.meta}),e.patch(t,i),i=e.applyData(t,i),i={type:"element",tagName:"pre",properties:{},children:[i]},e.patch(t,i),i}function sr(e,t){let n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function cr(e,t){let n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function fr(e){let t=[],n=-1,r=0,l=0;for(;++n<e.length;){let i=e.charCodeAt(n),o="";if(37===i&&be(e.charCodeAt(n+1))&&be(e.charCodeAt(n+2)))l=2;else if(i<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(i))||(o=String.fromCharCode(i));else if(i>55295&&i<57344){let t=e.charCodeAt(n+1);i<56320&&t>56319&&t<57344?(o=String.fromCharCode(i,t),l=1):o="�"}else o=String.fromCharCode(i);o&&(t.push(e.slice(r,n),encodeURIComponent(o)),r=n+l+1,o=""),l&&(n+=l,l=0)}return t.join("")+e.slice(r)}function pr(e,t){let n,r=String(t.identifier).toUpperCase(),l=fr(r.toLowerCase()),i=e.footnoteOrder.indexOf(r);-1===i?(e.footnoteOrder.push(r),e.footnoteCounts[r]=1,n=e.footnoteOrder.length):(e.footnoteCounts[r]++,n=i+1);let o=e.footnoteCounts[r],a={type:"element",tagName:"a",properties:{href:"#"+e.clobberPrefix+"fn-"+l,id:e.clobberPrefix+"fnref-"+l+(o>1?"-"+o:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(n)}]};e.patch(t,a);let u={type:"element",tagName:"sup",properties:{},children:[a]};return e.patch(t,u),e.applyData(t,u)}function dr(e,t){let n=e.footnoteById,r=1;for(;r in n;)r++;let l=String(r);return n[l]={type:"footnoteDefinition",identifier:l,children:[{type:"paragraph",children:t.children}],position:t.position},pr(e,{type:"footnoteReference",identifier:l,position:t.position})}function hr(e,t){let n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function gr(e,t){if(e.dangerous){let n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}return null}function mr(e,t){let n=t.referenceType,r="]";if("collapsed"===n?r+="[]":"full"===n&&(r+="["+(t.label||t.identifier)+"]"),"imageReference"===t.type)return{type:"text",value:"!["+t.alt+r};let l=e.all(t),i=l[0];i&&"text"===i.type?i.value="["+i.value:l.unshift({type:"text",value:"["});let o=l[l.length-1];return o&&"text"===o.type?o.value+=r:l.push({type:"text",value:r}),l}function yr(e,t){let n=e.definition(t.identifier);if(!n)return mr(e,t);let r={src:fr(n.url||""),alt:t.alt};null!==n.title&&void 0!==n.title&&(r.title=n.title);let l={type:"element",tagName:"img",properties:r,children:[]};return e.patch(t,l),e.applyData(t,l)}function br(e,t){let n={src:fr(t.url)};null!==t.alt&&void 0!==t.alt&&(n.alt=t.alt),null!==t.title&&void 0!==t.title&&(n.title=t.title);let r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function kr(e,t){let n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);let r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function xr(e,t){let n=e.definition(t.identifier);if(!n)return mr(e,t);let r={href:fr(n.url||"")};null!==n.title&&void 0!==n.title&&(r.title=n.title);let l={type:"element",tagName:"a",properties:r,children:e.all(t)};return e.patch(t,l),e.applyData(t,l)}function vr(e,t){let n={href:fr(t.url)};null!==t.title&&void 0!==t.title&&(n.title=t.title);let r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function wr(e,t,n){let r=e.all(t),l=n?Sr(n):Cr(t),i={},o=[];if("boolean"==typeof t.checked){let e,n=r[0];n&&"element"===n.type&&"p"===n.tagName?e=n:(e={type:"element",tagName:"p",properties:{},children:[]},r.unshift(e)),e.children.length>0&&e.children.unshift({type:"text",value:" "}),e.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),i.className=["task-list-item"]}let a=-1;for(;++a<r.length;){let e=r[a];(l||0!==a||"element"!==e.type||"p"!==e.tagName)&&o.push({type:"text",value:"\n"}),"element"!==e.type||"p"!==e.tagName||l?o.push(e):o.push(...e.children)}let u=r[r.length-1];u&&(l||"element"!==u.type||"p"!==u.tagName)&&o.push({type:"text",value:"\n"});let s={type:"element",tagName:"li",properties:i,children:o};return e.patch(t,s),e.applyData(t,s)}function Sr(e){let t=!1;if("list"===e.type){t=e.spread||!1;let n=e.children,r=-1;for(;!t&&++r<n.length;)t=Cr(n[r])}return t}function Cr(e){let t=e.spread;return null==t?e.children.length>1:t}function Er(e,t){let n={},r=e.all(t),l=-1;for("number"==typeof t.start&&1!==t.start&&(n.start=t.start);++l<r.length;){let e=r[l];if("element"===e.type&&"li"===e.tagName&&e.properties&&Array.isArray(e.properties.className)&&e.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}let i={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,i),e.applyData(t,i)}function Fr(e,t){let n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Ar(e,t){let n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function Dr(e,t){let n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}var Tr=Pr("start"),Or=Pr("end");function Lr(e){return{start:Tr(e),end:Or(e)}}function Pr(e){return t;function t(t){let n=t&&t.position&&t.position[e]||{};return{line:n.line||null,column:n.column||null,offset:n.offset>-1?n.offset:null}}}function Ir(e,t){let n=e.all(t),r=n.shift(),l=[];if(r){let n={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],n),l.push(n)}if(n.length>0){let r={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},i=Tr(t.children[1]),o=Or(t.children[t.children.length-1]);i.line&&o.line&&(r.position={start:i,end:o}),l.push(r)}let i={type:"element",tagName:"table",properties:{},children:e.wrap(l,!0)};return e.patch(t,i),e.applyData(t,i)}function zr(e,t,n){let r=n?n.children:void 0,l=0===(r?r.indexOf(t):1)?"th":"td",i=n&&"table"===n.type?n.align:void 0,o=i?i.length:t.children.length,a=-1,u=[];for(;++a<o;){let n=t.children[a],r={},o=i?i[a]:void 0;o&&(r.align=o);let s={type:"element",tagName:l,properties:r,children:[]};n&&(s.children=e.all(n),e.patch(n,s),s=e.applyData(t,s)),u.push(s)}let s={type:"element",tagName:"tr",properties:{},children:e.wrap(u,!0)};return e.patch(t,s),e.applyData(t,s)}function Mr(e,t){let n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Rr(e){let t=String(e),n=/\r?\n|\r/g,r=n.exec(t),l=0,i=[];for(;r;)i.push(jr(t.slice(l,r.index),l>0,!0),r[0]),l=r.index+r[0].length,r=n.exec(t);return i.push(jr(t.slice(l),l>0,!1)),i.join("")}function jr(e,t,n){let r=0,l=e.length;if(t){let t=e.codePointAt(r);for(;9===t||32===t;)r++,t=e.codePointAt(r)}if(n){let t=e.codePointAt(l-1);for(;9===t||32===t;)l--,t=e.codePointAt(l-1)}return l>r?e.slice(r,l):""}function _r(e,t){let n={type:"text",value:Rr(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function Br(e,t){let n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}var Nr={blockquote:or,break:ar,code:ur,delete:sr,emphasis:cr,footnoteReference:pr,footnote:dr,heading:hr,html:gr,imageReference:yr,image:br,inlineCode:kr,linkReference:xr,link:vr,listItem:wr,list:Er,paragraph:Fr,root:Ar,strong:Dr,table:Ir,tableCell:Mr,tableRow:zr,text:_r,thematicBreak:Br,toml:Hr,yaml:Hr,definition:Hr,footnoteDefinition:Hr};function Hr(){return null}var Ur=function(e){if(null==e)return Qr;if("string"==typeof e)return Wr(e);if("object"==typeof e)return Array.isArray(e)?qr(e):Vr(e);if("function"==typeof e)return $r(e);throw new Error("Expected function, string, or object as test")};function qr(e){let t=[],n=-1;for(;++n<e.length;)t[n]=Ur(e[n]);return $r(r);function r(...e){let n=-1;for(;++n<t.length;)if(t[n].call(this,...e))return!0;return!1}}function Vr(e){return $r(t);function t(t){let n;for(n in e)if(t[n]!==e[n])return!1;return!0}}function Wr(e){return $r(t);function t(t){return t&&t.type===e}}function $r(e){return t;function t(t,...n){return!!(t&&"object"==typeof t&&"type"in t&&e.call(this,t,...n))}}function Qr(){return!0}var Yr=!0,Kr=!1,Xr="skip",Zr=function(e,t,n,r){"function"==typeof t&&"function"!=typeof n&&(r=n,n=t,t=null);let l=Ur(t),i=r?-1:1;function o(e,a,u){let s=e&&"object"==typeof e?e:{};if("string"==typeof s.type){let t="string"==typeof s.tagName?s.tagName:"string"==typeof s.name?s.name:void 0;Object.defineProperty(c,"name",{value:"node ("+e.type+(t?"<"+t+">":"")+")"})}return c;function c(){let s,c,f,p=[];if((!t||l(e,a,u[u.length-1]||null))&&(p=Jr(n(e,u)),p[0]===Kr))return p;if(e.children&&p[0]!==Xr)for(c=(r?e.children.length:-1)+i,f=u.concat(e);c>-1&&c<e.children.length;){if(s=o(e.children[c],c,f)(),s[0]===Kr)return s;c="number"==typeof s[1]?s[1]:c+i}return p}}o(e,void 0,[])()};function Jr(e){return Array.isArray(e)?e:"number"==typeof e?[Yr,e]:[e]}var Gr=function(e,t,n,r){function l(e,t){let r=t[t.length-1];return n(e,r?r.children.indexOf(e):null,r)}"function"==typeof t&&"function"!=typeof n&&(r=n,n=t,t=null),Zr(e,t,l,r)};function el(e){return!e||!e.position||!e.position.start||!e.position.start.line||!e.position.start.column||!e.position.end||!e.position.end.line||!e.position.end.column}var tl={}.hasOwnProperty;function nl(e){let t=Object.create(null);if(!e||!e.type)throw new Error("mdast-util-definitions expected node");return Gr(e,"definition",(e=>{let n=rl(e.identifier);n&&!tl.call(t,n)&&(t[n]=e)})),n;function n(e){let n=rl(e);return n&&tl.call(t,n)?t[n]:null}}function rl(e){return String(e||"").toUpperCase()}var ll={}.hasOwnProperty;function il(e,t){let n=t||{},l=n.allowDangerousHtml||!1,i={};return a.dangerous=l,a.clobberPrefix=void 0===n.clobberPrefix||null===n.clobberPrefix?"user-content-":n.clobberPrefix,a.footnoteLabel=n.footnoteLabel||"Footnotes",a.footnoteLabelTagName=n.footnoteLabelTagName||"h2",a.footnoteLabelProperties=n.footnoteLabelProperties||{className:["sr-only"]},a.footnoteBackLabel=n.footnoteBackLabel||"Back to content",a.unknownHandler=n.unknownHandler,a.passThrough=n.passThrough,a.handlers=(0,r.a)((0,r.a)({},Nr),n.handlers),a.definition=nl(e),a.footnoteById=i,a.footnoteOrder=[],a.footnoteCounts={},a.patch=ol,a.applyData=al,a.one=u,a.all=s,a.wrap=fl,a.augment=o,Gr(e,"footnoteDefinition",(e=>{let t=String(e.identifier).toUpperCase();ll.call(i,t)||(i[t]=e)})),a;function o(e,t){if(e&&"data"in e&&e.data){let n=e.data;n.hName&&("element"!==t.type&&(t={type:"element",tagName:"",properties:{},children:[]}),t.tagName=n.hName),"element"===t.type&&n.hProperties&&(t.properties=(0,r.a)((0,r.a)({},t.properties),n.hProperties)),"children"in t&&t.children&&n.hChildren&&(t.children=n.hChildren)}if(e){let n="type"in e?e:{position:e};el(n)||(t.position={start:Tr(n),end:Or(n)})}return t}function a(e,t,n,r){return Array.isArray(n)&&(r=n,n={}),o(e,{type:"element",tagName:t,properties:n||{},children:r||[]})}function u(e,t){return ul(a,e,t)}function s(e){return sl(a,e)}}function ol(e,t){e.position&&(t.position=Lr(e))}function al(e,t){let n=t;if(e&&e.data){let t=e.data.hName,l=e.data.hChildren,i=e.data.hProperties;"string"==typeof t&&("element"===n.type?n.tagName=t:n={type:"element",tagName:t,properties:{},children:[]}),"element"===n.type&&i&&(n.properties=(0,r.a)((0,r.a)({},n.properties),i)),"children"in n&&n.children&&null!==l&&void 0!==l&&(n.children=l)}return n}function ul(e,t,n){let l=t&&t.type;if(!l)throw new Error("Expected node, got `"+t+"`");return ll.call(e.handlers,l)?e.handlers[l](e,t,n):e.passThrough&&e.passThrough.includes(l)?"children"in t?(0,r.b)((0,r.a)({},t),{children:sl(e,t)}):t:e.unknownHandler?e.unknownHandler(e,t,n):cl(e,t)}function sl(e,t){let n=[];if("children"in t){let r=t.children,l=-1;for(;++l<r.length;){let i=ul(e,r[l],t);if(i){if(l&&"break"===r[l-1].type&&(!Array.isArray(i)&&"text"===i.type&&(i.value=i.value.replace(/^\s+/,"")),!Array.isArray(i)&&"element"===i.type)){let e=i.children[0];e&&"text"===e.type&&(e.value=e.value.replace(/^\s+/,""))}Array.isArray(i)?n.push(...i):n.push(i)}}}return n}function cl(e,t){let n=t.data||{},r=!("value"in t)||ll.call(n,"hProperties")||ll.call(n,"hChildren")?{type:"element",tagName:"div",properties:{},children:sl(e,t)}:{type:"text",value:t.value};return e.patch(t,r),e.applyData(t,r)}function fl(e,t){let n=[],r=-1;for(t&&n.push({type:"text",value:"\n"});++r<e.length;)r&&n.push({type:"text",value:"\n"}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:"\n"}),n}function pl(e){let t=[],n=-1;for(;++n<e.footnoteOrder.length;){let r=e.footnoteById[e.footnoteOrder[n]];if(!r)continue;let l=e.all(r),i=String(r.identifier).toUpperCase(),o=fr(i.toLowerCase()),a=0,u=[];for(;++a<=e.footnoteCounts[i];){let t={type:"element",tagName:"a",properties:{href:"#"+e.clobberPrefix+"fnref-"+o+(a>1?"-"+a:""),dataFootnoteBackref:!0,className:["data-footnote-backref"],ariaLabel:e.footnoteBackLabel},children:[{type:"text",value:"↩"}]};a>1&&t.children.push({type:"element",tagName:"sup",children:[{type:"text",value:String(a)}]}),u.length>0&&u.push({type:"text",value:" "}),u.push(t)}let s=l[l.length-1];if(s&&"element"===s.type&&"p"===s.tagName){let e=s.children[s.children.length-1];e&&"text"===e.type?e.value+=" ":s.children.push({type:"text",value:" "}),s.children.push(...u)}else l.push(...u);let c={type:"element",tagName:"li",properties:{id:e.clobberPrefix+"fn-"+o},children:e.wrap(l,!0)};e.patch(r,c),t.push(c)}if(0!==t.length)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:e.footnoteLabelTagName,properties:(0,r.b)((0,r.a)({},JSON.parse(JSON.stringify(e.footnoteLabelProperties))),{id:"footnote-label"}),children:[{type:"text",value:e.footnoteLabel}]},{type:"text",value:"\n"},{type:"element",tagName:"ol",properties:{},children:e.wrap(t,!0)},{type:"text",value:"\n"}]}}function dl(e,t){let n=il(e,t),r=n.one(e,null),l=pl(n);return l&&r.children.push({type:"text",value:"\n"},l),Array.isArray(r)?{type:"root",children:r}:r}var hl=function(e,t){return e&&"run"in e?ml(e,t):yl(e||t)},gl=hl;function ml(e,t){return(n,r,l)=>{e.run(dl(n,t),r,(e=>{l(e)}))}}function yl(e){return t=>dl(t,e)}var bl=(0,r.f)(u(),1),kl=class{constructor(e,t,n){this.property=e,this.normal=t,n&&(this.space=n)}};function xl(e,t){let n={},r={},l=-1;for(;++l<e.length;)Object.assign(n,e[l].property),Object.assign(r,e[l].normal);return new kl(n,r,t)}function vl(e){return e.toLowerCase()}kl.prototype.property={},kl.prototype.normal={},kl.prototype.space=null;var wl=class{constructor(e,t){this.property=e,this.attribute=t}};wl.prototype.space=null,wl.prototype.boolean=!1,wl.prototype.booleanish=!1,wl.prototype.overloadedBoolean=!1,wl.prototype.number=!1,wl.prototype.commaSeparated=!1,wl.prototype.spaceSeparated=!1,wl.prototype.commaOrSpaceSeparated=!1,wl.prototype.mustUseProperty=!1,wl.prototype.defined=!1;var Sl={};(0,r.e)(Sl,{boolean:()=>El,booleanish:()=>Fl,commaOrSpaceSeparated:()=>Ll,commaSeparated:()=>Ol,number:()=>Dl,overloadedBoolean:()=>Al,spaceSeparated:()=>Tl});var Cl=0,El=Pl(),Fl=Pl(),Al=Pl(),Dl=Pl(),Tl=Pl(),Ol=Pl(),Ll=Pl();function Pl(){return 2**++Cl}var Il=Object.keys(Sl),zl=class extends wl{constructor(e,t,n,r){let l=-1;if(super(e,t),Ml(this,"space",r),"number"==typeof n)for(;++l<Il.length;){let e=Il[l];Ml(this,Il[l],(n&Sl[e])===Sl[e])}}};function Ml(e,t,n){n&&(e[t]=n)}zl.prototype.defined=!0;var Rl={}.hasOwnProperty;function jl(e){let t,n={},r={};for(t in e.properties)if(Rl.call(e.properties,t)){let l=e.properties[t],i=new zl(t,e.transform(e.attributes||{},t),l,e.space);e.mustUseProperty&&e.mustUseProperty.includes(t)&&(i.mustUseProperty=!0),n[t]=i,r[vl(t)]=t,r[vl(i.attribute)]=t}return new kl(n,r,e.space)}var _l=jl({space:"xlink",transform(e,t){return"xlink:"+t.slice(5).toLowerCase()},properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null}}),Bl=jl({space:"xml",transform(e,t){return"xml:"+t.slice(3).toLowerCase()},properties:{xmlLang:null,xmlBase:null,xmlSpace:null}});function Nl(e,t){return t in e?e[t]:t}function Hl(e,t){return Nl(e,t.toLowerCase())}var Ul=jl({space:"xmlns",attributes:{xmlnsxlink:"xmlns:xlink"},transform:Hl,properties:{xmlns:null,xmlnsXLink:null}}),ql=jl({transform(e,t){return"role"===t?t:"aria-"+t.slice(4).toLowerCase()},properties:{ariaActiveDescendant:null,ariaAtomic:Fl,ariaAutoComplete:null,ariaBusy:Fl,ariaChecked:Fl,ariaColCount:Dl,ariaColIndex:Dl,ariaColSpan:Dl,ariaControls:Tl,ariaCurrent:null,ariaDescribedBy:Tl,ariaDetails:null,ariaDisabled:Fl,ariaDropEffect:Tl,ariaErrorMessage:null,ariaExpanded:Fl,ariaFlowTo:Tl,ariaGrabbed:Fl,ariaHasPopup:null,ariaHidden:Fl,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:Tl,ariaLevel:Dl,ariaLive:null,ariaModal:Fl,ariaMultiLine:Fl,ariaMultiSelectable:Fl,ariaOrientation:null,ariaOwns:Tl,ariaPlaceholder:null,ariaPosInSet:Dl,ariaPressed:Fl,ariaReadOnly:Fl,ariaRelevant:null,ariaRequired:Fl,ariaRoleDescription:Tl,ariaRowCount:Dl,ariaRowIndex:Dl,ariaRowSpan:Dl,ariaSelected:Fl,ariaSetSize:Dl,ariaSort:null,ariaValueMax:Dl,ariaValueMin:Dl,ariaValueNow:Dl,ariaValueText:null,role:null}}),Vl=jl({space:"html",attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},transform:Hl,mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:Ol,acceptCharset:Tl,accessKey:Tl,action:null,allow:null,allowFullScreen:El,allowPaymentRequest:El,allowUserMedia:El,alt:null,as:null,async:El,autoCapitalize:null,autoComplete:Tl,autoFocus:El,autoPlay:El,blocking:Tl,capture:El,charSet:null,checked:El,cite:null,className:Tl,cols:Dl,colSpan:null,content:null,contentEditable:Fl,controls:El,controlsList:Tl,coords:Dl|Ol,crossOrigin:null,data:null,dateTime:null,decoding:null,default:El,defer:El,dir:null,dirName:null,disabled:El,download:Al,draggable:Fl,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:El,formTarget:null,headers:Tl,height:Dl,hidden:El,high:Dl,href:null,hrefLang:null,htmlFor:Tl,httpEquiv:Tl,id:null,imageSizes:null,imageSrcSet:null,inert:El,inputMode:null,integrity:null,is:null,isMap:El,itemId:null,itemProp:Tl,itemRef:Tl,itemScope:El,itemType:Tl,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:El,low:Dl,manifest:null,max:null,maxLength:Dl,media:null,method:null,min:null,minLength:Dl,multiple:El,muted:El,name:null,nonce:null,noModule:El,noValidate:El,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:El,optimum:Dl,pattern:null,ping:Tl,placeholder:null,playsInline:El,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:El,referrerPolicy:null,rel:Tl,required:El,reversed:El,rows:Dl,rowSpan:Dl,sandbox:Tl,scope:null,scoped:El,seamless:El,selected:El,shadowRootDelegatesFocus:El,shadowRootMode:null,shape:null,size:Dl,sizes:null,slot:null,span:Dl,spellCheck:Fl,src:null,srcDoc:null,srcLang:null,srcSet:null,start:Dl,step:null,style:null,tabIndex:Dl,target:null,title:null,translate:null,type:null,typeMustMatch:El,useMap:null,value:Fl,width:Dl,wrap:null,align:null,aLink:null,archive:Tl,axis:null,background:null,bgColor:null,border:Dl,borderColor:null,bottomMargin:Dl,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:El,declare:El,event:null,face:null,frame:null,frameBorder:null,hSpace:Dl,leftMargin:Dl,link:null,longDesc:null,lowSrc:null,marginHeight:Dl,marginWidth:Dl,noResize:El,noHref:El,noShade:El,noWrap:El,object:null,profile:null,prompt:null,rev:null,rightMargin:Dl,rules:null,scheme:null,scrolling:Fl,standby:null,summary:null,text:null,topMargin:Dl,valueType:null,version:null,vAlign:null,vLink:null,vSpace:Dl,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:El,disableRemotePlayback:El,prefix:null,property:null,results:Dl,security:null,unselectable:null}}),Wl=jl({space:"svg",attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},transform:Nl,properties:{about:Ll,accentHeight:Dl,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:Dl,amplitude:Dl,arabicForm:null,ascent:Dl,attributeName:null,attributeType:null,azimuth:Dl,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:Dl,by:null,calcMode:null,capHeight:Dl,className:Tl,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:Dl,diffuseConstant:Dl,direction:null,display:null,dur:null,divisor:Dl,dominantBaseline:null,download:El,dx:null,dy:null,edgeMode:null,editable:null,elevation:Dl,enableBackground:null,end:null,event:null,exponent:Dl,externalResourcesRequired:null,fill:null,fillOpacity:Dl,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Ol,g2:Ol,glyphName:Ol,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:Dl,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:Dl,horizOriginX:Dl,horizOriginY:Dl,id:null,ideographic:Dl,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:Dl,k:Dl,k1:Dl,k2:Dl,k3:Dl,k4:Dl,kernelMatrix:Ll,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:Dl,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:Dl,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:Dl,overlineThickness:Dl,paintOrder:null,panose1:null,path:null,pathLength:Dl,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:Tl,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:Dl,pointsAtY:Dl,pointsAtZ:Dl,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:Ll,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:Ll,rev:Ll,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:Ll,requiredFeatures:Ll,requiredFonts:Ll,requiredFormats:Ll,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:Dl,specularExponent:Dl,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:Dl,strikethroughThickness:Dl,string:null,stroke:null,strokeDashArray:Ll,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:Dl,strokeOpacity:Dl,strokeWidth:null,style:null,surfaceScale:Dl,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:Ll,tabIndex:Dl,tableValues:null,target:null,targetX:Dl,targetY:Dl,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:Ll,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:Dl,underlineThickness:Dl,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:Dl,values:null,vAlphabetic:Dl,vMathematical:Dl,vectorEffect:null,vHanging:Dl,vIdeographic:Dl,version:null,vertAdvY:Dl,vertOriginX:Dl,vertOriginY:Dl,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:Dl,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null}}),$l=/^data[-\w.:]+$/i,Ql=/-[a-z]/g,Yl=/[A-Z]/g;function Kl(e,t){let n=vl(t),r=t,l=wl;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&"data"===n.slice(0,4)&&$l.test(t)){if("-"===t.charAt(4)){let e=t.slice(5).replace(Ql,Zl);r="data"+e.charAt(0).toUpperCase()+e.slice(1)}else{let e=t.slice(4);if(!Ql.test(e)){let n=e.replace(Yl,Xl);"-"!==n.charAt(0)&&(n="-"+n),t="data"+n}}l=zl}return new l(r,t)}function Xl(e){return"-"+e.toLowerCase()}function Zl(e){return e.charAt(1).toUpperCase()}var Jl={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},Gl=xl([Bl,_l,Ul,ql,Vl],"html"),ei=xl([Bl,_l,Ul,ql,Wl],"svg");function ti(e){if(e.allowedElements&&e.disallowedElements)throw new TypeError("Only one of `allowedElements` and `disallowedElements` should be defined");if(e.allowedElements||e.disallowedElements||e.allowElement)return t=>{Gr(t,"element",((t,n,r)=>{let l,i=r;if(e.allowedElements?l=!e.allowedElements.includes(t.tagName):e.disallowedElements&&(l=e.disallowedElements.includes(t.tagName)),!l&&e.allowElement&&"number"==typeof n&&(l=!e.allowElement(t,n,i)),l&&"number"==typeof n)return e.unwrapDisallowed&&t.children?i.children.splice(n,1,...t.children):i.children.splice(n,1),n}))}}var ni=(0,r.f)((0,r.j)(),1),ri=(0,r.f)((0,r.l)(),1);function li(e){let t=e&&"object"==typeof e&&"text"===e.type?e.value||"":e;return"string"==typeof t&&""===t.replace(/[ \t\n\f\r]/g,"")}function ii(e){return e.join(" ").trim()}function oi(e,t){let n=t||{};return(""===e[e.length-1]?[...e,""]:e).join((n.padRight?" ":"")+","+(!1===n.padLeft?"":" ")).trim()}var ai=(0,r.f)(c(),1),ui=ai.default,si={}.hasOwnProperty,ci=new Set(["table","thead","tbody","tfoot","tr"]);function fi(e,t){let n,r=[],l=-1;for(;++l<t.children.length;)n=t.children[l],"element"===n.type?r.push(pi(e,n,l,t)):"text"===n.type?("element"!==t.type||!ci.has(t.tagName)||!li(n))&&r.push(n.value):"raw"===n.type&&!e.options.skipHtml&&r.push(n.value);return r}function pi(e,t,n,r){let l,i=e.options,o=void 0===i.transformLinkUri?d:i.transformLinkUri,a=e.schema,u=t.tagName,s={},c=a;if("html"===a.space&&"svg"===u&&(c=ei,e.schema=c),t.properties)for(l in t.properties)si.call(t.properties,l)&&gi(s,l,t.properties[l],e);("ol"===u||"ul"===u)&&e.listDepth++;let f=fi(e,t);("ol"===u||"ul"===u)&&e.listDepth--,e.schema=a;let p=t.position||{start:{line:null,column:null,offset:null},end:{line:null,column:null,offset:null}},h=i.components&&si.call(i.components,u)?i.components[u]:u,g="string"==typeof h||h===ni.default.Fragment;if(!ri.default.isValidElementType(h))throw new TypeError(`Component for name \`${u}\` not defined or is not renderable`);if(s.key=n,"a"===u&&i.linkTarget&&(s.target="function"==typeof i.linkTarget?i.linkTarget(String(s.href||""),t.children,"string"==typeof s.title?s.title:null):i.linkTarget),"a"===u&&o&&(s.href=o(String(s.href||""),t.children,"string"==typeof s.title?s.title:null)),!g&&"code"===u&&"element"===r.type&&"pre"!==r.tagName&&(s.inline=!0),!g&&("h1"===u||"h2"===u||"h3"===u||"h4"===u||"h5"===u||"h6"===u)&&(s.level=Number.parseInt(u.charAt(1),10)),"img"===u&&i.transformImageUri&&(s.src=i.transformImageUri(String(s.src||""),String(s.alt||""),"string"==typeof s.title?s.title:null)),!g&&"li"===u&&"element"===r.type){let e=di(t);s.checked=e&&e.properties?!!e.properties.checked:null,s.index=hi(r,t),s.ordered="ol"===r.tagName}return!g&&("ol"===u||"ul"===u)&&(s.ordered="ol"===u,s.depth=e.listDepth),("td"===u||"th"===u)&&(s.align&&(s.style||(s.style={}),s.style.textAlign=s.align,delete s.align),g||(s.isHeader="th"===u)),!g&&"tr"===u&&"element"===r.type&&(s.isHeader="thead"===r.tagName),i.sourcePos&&(s["data-sourcepos"]=bi(p)),!g&&i.rawSourcePos&&(s.sourcePosition=t.position),!g&&i.includeElementIndex&&(s.index=hi(r,t),s.siblingCount=hi(r)),g||(s.node=t),f.length>0?ni.default.createElement(h,s,f):ni.default.createElement(h,s)}function di(e){let t=-1;for(;++t<e.children.length;){let n=e.children[t];if("element"===n.type&&"input"===n.tagName)return n}return null}function hi(e,t){let n=-1,r=0;for(;++n<e.children.length&&e.children[n]!==t;)"element"===e.children[n].type&&r++;return r}function gi(e,t,n,r){let l=Kl(r.schema,t),i=n;null==i||i!==i||(Array.isArray(i)&&(i=l.commaSeparated?oi(i):ii(i)),"style"===l.property&&"string"==typeof i&&(i=mi(i)),l.space&&l.property?e[si.call(Jl,l.property)?Jl[l.property]:l.property]=i:l.attribute&&(e[l.attribute]=i))}function mi(e){let t={};try{ui(e,n)}catch(r){}return t;function n(e,n){let r="-ms-"===e.slice(0,4)?`ms-${e.slice(4)}`:e;t[r.replace(/-([a-z])/g,yi)]=n}}function yi(e,t){return t.toUpperCase()}function bi(e){return[e.start.line,":",e.start.column,"-",e.end.line,":",e.end.column].map(String).join("")}var ki={}.hasOwnProperty,xi="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",vi={plugins:{to:"remarkPlugins",id:"change-plugins-to-remarkplugins"},renderers:{to:"components",id:"change-renderers-to-components"},astPlugins:{id:"remove-buggy-html-in-markdown-parser"},allowDangerousHtml:{id:"remove-buggy-html-in-markdown-parser"},escapeHtml:{id:"remove-buggy-html-in-markdown-parser"},source:{to:"children",id:"change-source-to-children"},allowNode:{to:"allowElement",id:"replace-allownode-allowedtypes-and-disallowedtypes"},allowedTypes:{to:"allowedElements",id:"replace-allownode-allowedtypes-and-disallowedtypes"},disallowedTypes:{to:"disallowedElements",id:"replace-allownode-allowedtypes-and-disallowedtypes"},includeNodeIndex:{to:"includeElementIndex",id:"change-includenodeindex-to-includeelementindex"}};function wi(e){for(let r in vi)if(ki.call(vi,r)&&ki.call(e,r)){let e=vi[r];console.warn(`[react-markdown] Warning: please ${e.to?`use \`${e.to}\` instead of`:"remove"} \`${r}\` (see <${xi}#${e.id}> for more info)`),delete vi[r]}let t=$().use(ir).use(e.remarkPlugins||[]).use(gl,(0,r.b)((0,r.a)({},e.remarkRehypeOptions),{allowDangerousHtml:!0})).use(e.rehypePlugins||[]).use(ti,e),n=new M;"string"==typeof e.children?n.value=e.children:void 0!==e.children&&null!==e.children&&console.warn(`[react-markdown] Warning: please pass a string as \`children\` (not: \`${e.children}\`)`);let l=t.runSync(t.parse(n),n);if("root"!==l.type)throw new TypeError("Expected a `root` node");let i=h.default.createElement(h.default.Fragment,{},fi({options:e,schema:Gl,listDepth:0},l));return e.className&&(i=h.default.createElement("div",{className:e.className},i)),i}wi.propTypes={children:bl.default.string,className:bl.default.string,allowElement:bl.default.func,allowedElements:bl.default.arrayOf(bl.default.string),disallowedElements:bl.default.arrayOf(bl.default.string),unwrapDisallowed:bl.default.bool,remarkPlugins:bl.default.arrayOf(bl.default.oneOfType([bl.default.object,bl.default.func,bl.default.arrayOf(bl.default.oneOfType([bl.default.bool,bl.default.string,bl.default.object,bl.default.func,bl.default.arrayOf(bl.default.any)]))])),rehypePlugins:bl.default.arrayOf(bl.default.oneOfType([bl.default.object,bl.default.func,bl.default.arrayOf(bl.default.oneOfType([bl.default.bool,bl.default.string,bl.default.object,bl.default.func,bl.default.arrayOf(bl.default.any)]))])),sourcePos:bl.default.bool,rawSourcePos:bl.default.bool,skipHtml:bl.default.bool,includeElementIndex:bl.default.bool,transformLinkUri:bl.default.oneOfType([bl.default.func,bl.default.bool]),linkTarget:bl.default.oneOfType([bl.default.func,bl.default.string]),transformImageUri:bl.default.func,components:bl.default.object};for(var Si="\n  color-scheme: light;\n  --color-prettylights-syntax-comment: #6e7781;\n  --color-prettylights-syntax-constant: #0550ae;\n  --color-prettylights-syntax-entity: #8250df;\n  --color-prettylights-syntax-storage-modifier-import: #24292f;\n  --color-prettylights-syntax-entity-tag: #116329;\n  --color-prettylights-syntax-keyword: #cf222e;\n  --color-prettylights-syntax-string: #0a3069;\n  --color-prettylights-syntax-variable: #953800;\n  --color-prettylights-syntax-brackethighlighter-unmatched: #82071e;\n  --color-prettylights-syntax-invalid-illegal-text: #f6f8fa;\n  --color-prettylights-syntax-invalid-illegal-bg: #82071e;\n  --color-prettylights-syntax-carriage-return-text: #f6f8fa;\n  --color-prettylights-syntax-carriage-return-bg: #cf222e;\n  --color-prettylights-syntax-string-regexp: #116329;\n  --color-prettylights-syntax-markup-list: #3b2300;\n  --color-prettylights-syntax-markup-heading: #0550ae;\n  --color-prettylights-syntax-markup-italic: #24292f;\n  --color-prettylights-syntax-markup-bold: #24292f;\n  --color-prettylights-syntax-markup-deleted-text: #82071e;\n  --color-prettylights-syntax-markup-deleted-bg: #ffebe9;\n  --color-prettylights-syntax-markup-inserted-text: #116329;\n  --color-prettylights-syntax-markup-inserted-bg: #dafbe1;\n  --color-prettylights-syntax-markup-changed-text: #953800;\n  --color-prettylights-syntax-markup-changed-bg: #ffd8b5;\n  --color-prettylights-syntax-markup-ignored-text: #eaeef2;\n  --color-prettylights-syntax-markup-ignored-bg: #0550ae;\n  --color-prettylights-syntax-meta-diff-range: #8250df;\n  --color-prettylights-syntax-brackethighlighter-angle: #57606a;\n  --color-prettylights-syntax-sublimelinter-gutter-mark: #8c959f;\n  --color-prettylights-syntax-constant-other-reference-link: #0a3069;\n  --color-fg-default: #24292f;\n  --color-fg-muted: #57606a;\n  --color-fg-subtle: #6e7781;\n  --color-canvas-default: #ffffff;\n  --color-canvas-subtle: #f6f8fa;\n  --color-border-default: #d0d7de;\n  --color-border-muted: hsla(210, 18%, 87%, 1);\n  --color-neutral-muted: rgba(175, 184, 193, 0.2);\n  --color-accent-fg: #0969da;\n  --color-accent-emphasis: #0969da;\n  --color-attention-subtle: #fff8c5;\n  --color-danger-fg: #cf222e;\n",Ci=(0,f.default)(wi)`
  ${Si}
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  color: var(--color-fg-default);
  background-color: var(--color-canvas-default);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji';
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;

  .octicon {
    display: inline-block;
    fill: currentColor;
    vertical-align: text-bottom;
  }
  h1:hover .anchor .octicon-link:before,
  h2:hover .anchor .octicon-link:before,
  h3:hover .anchor .octicon-link:before,
  h4:hover .anchor .octicon-link:before,
  h5:hover .anchor .octicon-link:before,
  h6:hover .anchor .octicon-link:before {
    width: 16px;
    height: 16px;
    content: ' ';
    display: inline-block;
    background-color: currentColor;
    -webkit-mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
    mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
  }

  details,
  figcaption,
  figure {
    display: block;
  }

  summary {
    display: list-item;
  }

  [hidden] {
    display: none !important;
  }

  a {
    background-color: transparent;
    color: var(--color-accent-fg);
    text-decoration: none;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: var(--base-text-weight-semibold, 600);
  }

  dfn {
    font-style: italic;
  }

  h1 {
    margin: 0.67em 0;
    font-weight: var(--base-text-weight-semibold, 600);
    padding-bottom: 0.3em;
    font-size: 2em;
    border-bottom: 1px solid var(--color-border-muted);
  }

  mark {
    background-color: var(--color-attention-subtle);
    color: var(--color-fg-default);
  }

  small {
    font-size: 90%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
    max-width: 100%;
    box-sizing: content-box;
    background-color: var(--color-canvas-default);
  }

  code,
  kbd,
  pre,
  samp {
    font-family: monospace;
    font-size: 1em;
  }

  figure {
    margin: 1em 40px;
  }

  hr {
    box-sizing: content-box;
    overflow: hidden;
    background: transparent;
    border-bottom: 1px solid var(--color-border-muted);
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: var(--color-border-default);
    border: 0;
  }

  input {
    font: inherit;
    margin: 0;
    overflow: visible;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  [type='search']::-webkit-search-cancel-button,
  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  a:hover {
    text-decoration: underline;
  }

  ::placeholder {
    color: var(--color-fg-subtle);
    opacity: 1;
  }

  hr::before {
    display: table;
    content: '';
  }

  hr::after {
    display: table;
    clear: both;
    content: '';
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
    display: block;
    width: max-content;
    max-width: 100%;
    overflow: auto;
  }

  td,
  th {
    padding: 0;
  }

  details summary {
    cursor: pointer;
  }

  details:not([open]) > *:not(summary) {
    display: none !important;
  }

  a:focus,
  [role='button']:focus,
  input[type='radio']:focus,
  input[type='checkbox']:focus {
    outline: 2px solid var(--color-accent-fg);
    outline-offset: -2px;
    box-shadow: none;
  }

  a:focus:not(:focus-visible),
  [role='button']:focus:not(:focus-visible),
  input[type='radio']:focus:not(:focus-visible),
  input[type='checkbox']:focus:not(:focus-visible) {
    outline: solid 1px transparent;
  }

  a:focus-visible,
  [role='button']:focus-visible,
  input[type='radio']:focus-visible,
  input[type='checkbox']:focus-visible {
    outline: 2px solid var(--color-accent-fg);
    outline-offset: -2px;
    box-shadow: none;
  }

  a:not([class]):focus,
  a:not([class]):focus-visible,
  input[type='radio']:focus,
  input[type='radio']:focus-visible,
  input[type='checkbox']:focus,
  input[type='checkbox']:focus-visible {
    outline-offset: 0;
  }

  kbd {
    display: inline-block;
    padding: 3px 5px;
    font: 11px ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    line-height: 10px;
    color: var(--color-fg-default);
    vertical-align: middle;
    background-color: var(--color-canvas-subtle);
    border: solid 1px var(--color-neutral-muted);
    border-bottom-color: var(--color-neutral-muted);
    border-radius: 6px;
    box-shadow: inset 0 -1px 0 var(--color-neutral-muted);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: var(--base-text-weight-semibold, 600);
    line-height: 1.25;
  }

  h2 {
    font-weight: var(--base-text-weight-semibold, 600);
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid var(--color-border-muted);
  }

  h3 {
    font-weight: var(--base-text-weight-semibold, 600);
    font-size: 1.25em;
  }

  h4 {
    font-weight: var(--base-text-weight-semibold, 600);
    font-size: 1em;
  }

  h5 {
    font-weight: var(--base-text-weight-semibold, 600);
    font-size: 0.875em;
  }

  h6 {
    font-weight: var(--base-text-weight-semibold, 600);
    font-size: 0.85em;
    color: var(--color-fg-muted);
  }

  p {
    margin-top: 0;
    margin-bottom: 10px;
  }

  blockquote {
    margin: 0;
    padding: 0 1em;
    color: var(--color-fg-muted);
    border-left: 0.25em solid var(--color-border-default);
  }

  ul,
  ol {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 2em;
  }

  ol ol,
  ul ol {
    list-style-type: lower-roman;
  }

  ul ul ol,
  ul ol ol,
  ol ul ol,
  ol ol ol {
    list-style-type: lower-alpha;
  }

  dd {
    margin-left: 0;
  }

  tt,
  code,
  samp {
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    font-size: 12px;
  }

  pre {
    margin-top: 0;
    margin-bottom: 0;
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    font-size: 12px;
    word-wrap: normal;
  }

  .octicon {
    display: inline-block;
    overflow: visible !important;
    vertical-align: text-bottom;
    fill: currentColor;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
    appearance: none;
  }

  .markdown-body::before {
    display: table;
    content: '';
  }

  .markdown-body::after {
    display: table;
    clear: both;
    content: '';
  }

  .markdown-body > *:first-child {
    margin-top: 0 !important;
  }

  .markdown-body > *:last-child {
    margin-bottom: 0 !important;
  }

  a:not([href]) {
    color: inherit;
    text-decoration: none;
  }

  .absent {
    color: var(--color-danger-fg);
  }

  .anchor {
    float: left;
    padding-right: 4px;
    margin-left: -20px;
    line-height: 1;
  }

  .anchor:focus {
    outline: none;
  }

  p,
  blockquote,
  ul,
  ol,
  dl,
  table,
  pre,
  details {
    margin-top: 0;
    margin-bottom: 16px;
  }

  blockquote > :first-child {
    margin-top: 0;
  }

  blockquote > :last-child {
    margin-bottom: 0;
  }

  h1 .octicon-link,
  h2 .octicon-link,
  h3 .octicon-link,
  h4 .octicon-link,
  h5 .octicon-link,
  h6 .octicon-link {
    color: var(--color-fg-default);
    vertical-align: middle;
    visibility: hidden;
  }

  h1:hover .anchor,
  h2:hover .anchor,
  h3:hover .anchor,
  h4:hover .anchor,
  h5:hover .anchor,
  h6:hover .anchor {
    text-decoration: none;
  }

  h1:hover .anchor .octicon-link,
  h2:hover .anchor .octicon-link,
  h3:hover .anchor .octicon-link,
  h4:hover .anchor .octicon-link,
  h5:hover .anchor .octicon-link,
  h6:hover .anchor .octicon-link {
    visibility: visible;
  }

  h1 tt,
  h1 code,
  h2 tt,
  h2 code,
  h3 tt,
  h3 code,
  h4 tt,
  h4 code,
  h5 tt,
  h5 code,
  h6 tt,
  h6 code {
    padding: 0 0.2em;
    font-size: inherit;
  }

  summary h1,
  summary h2,
  summary h3,
  summary h4,
  summary h5,
  summary h6 {
    display: inline-block;
  }

  summary h1 .anchor,
  summary h2 .anchor,
  summary h3 .anchor,
  summary h4 .anchor,
  summary h5 .anchor,
  summary h6 .anchor {
    margin-left: -40px;
  }

  summary h1,
  summary h2 {
    padding-bottom: 0;
    border-bottom: 0;
  }

  ul.no-list,
  ol.no-list {
    padding: 0;
    list-style-type: none;
  }

  ol[type='a'] {
    list-style-type: lower-alpha;
  }

  ol[type='A'] {
    list-style-type: upper-alpha;
  }

  ol[type='i'] {
    list-style-type: lower-roman;
  }

  ol[type='I'] {
    list-style-type: upper-roman;
  }

  ol[type='1'] {
    list-style-type: decimal;
  }

  div > ol:not([type]) {
    list-style-type: decimal;
  }

  ul ul,
  ul ol,
  ol ol,
  ol ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  li > p {
    margin-top: 16px;
  }

  li + li {
    margin-top: 0.25em;
  }

  dl {
    padding: 0;
  }

  dl dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: var(--base-text-weight-semibold, 600);
  }

  dl dd {
    padding: 0 16px;
    margin-bottom: 16px;
  }

  table th {
    font-weight: var(--base-text-weight-semibold, 600);
  }

  table th,
  table td {
    padding: 6px 13px;
    border: 1px solid var(--color-border-default);
  }

  table tr {
    background-color: var(--color-canvas-default);
    border-top: 1px solid var(--color-border-muted);
  }

  table tr:nth-child(2n) {
    background-color: var(--color-canvas-subtle);
  }

  table img {
    background-color: transparent;
  }

  img[align='right'] {
    padding-left: 20px;
  }

  img[align='left'] {
    padding-right: 20px;
  }

  .emoji {
    max-width: none;
    vertical-align: text-top;
    background-color: transparent;
  }

  span.frame {
    display: block;
    overflow: hidden;
  }

  span.frame > span {
    display: block;
    float: left;
    width: auto;
    padding: 7px;
    margin: 13px 0 0;
    overflow: hidden;
    border: 1px solid var(--color-border-default);
  }

  span.frame span img {
    display: block;
    float: left;
  }

  span.frame span span {
    display: block;
    padding: 5px 0 0;
    clear: both;
    color: var(--color-fg-default);
  }

  span.align-center {
    display: block;
    overflow: hidden;
    clear: both;
  }

  span.align-center > span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: center;
  }

  span.align-center span img {
    margin: 0 auto;
    text-align: center;
  }

  span.align-right {
    display: block;
    overflow: hidden;
    clear: both;
  }

  span.align-right > span {
    display: block;
    margin: 13px 0 0;
    overflow: hidden;
    text-align: right;
  }

  span.align-right span img {
    margin: 0;
    text-align: right;
  }

  span.float-left {
    display: block;
    float: left;
    margin-right: 13px;
    overflow: hidden;
  }

  span.float-left span {
    margin: 13px 0 0;
  }

  span.float-right {
    display: block;
    float: right;
    margin-left: 13px;
    overflow: hidden;
  }

  span.float-right > span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: right;
  }

  code,
  tt {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    white-space: break-spaces;
    background-color: var(--color-neutral-muted);
    border-radius: 6px;
  }

  code br,
  tt br {
    display: none;
  }

  del code {
    text-decoration: inherit;
  }

  samp {
    font-size: 85%;
  }

  pre code {
    font-size: 100%;
  }

  pre > code {
    padding: 0;
    margin: 0;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0;
  }

  .highlight {
    margin-bottom: 16px;
  }

  .highlight pre {
    margin-bottom: 0;
    word-break: normal;
  }

  .highlight pre,
  pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: var(--color-canvas-subtle);
    border-radius: 6px;
  }

  pre code,
  pre tt {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }

  .csv-data td,
  .csv-data th {
    padding: 5px;
    overflow: hidden;
    font-size: 12px;
    line-height: 1;
    text-align: left;
    white-space: nowrap;
  }

  .csv-data .blob-num {
    padding: 10px 8px 9px;
    text-align: right;
    background: var(--color-canvas-default);
    border: 0;
  }

  .csv-data tr {
    border-top: 0;
  }

  .csv-data th {
    font-weight: var(--base-text-weight-semibold, 600);
    background: var(--color-canvas-subtle);
    border-top: 0;
  }

  [data-footnote-ref]::before {
    content: '[';
  }

  [data-footnote-ref]::after {
    content: ']';
  }

  .footnotes {
    font-size: 12px;
    color: var(--color-fg-muted);
    border-top: 1px solid var(--color-border-default);
  }

  .footnotes ol {
    padding-left: 16px;
  }

  .footnotes ol ul {
    display: inline-block;
    padding-left: 16px;
    margin-top: 16px;
  }

  .footnotes li {
    position: relative;
  }

  .footnotes li:target::before {
    position: absolute;
    top: -8px;
    right: -8px;
    bottom: -8px;
    left: -24px;
    pointer-events: none;
    content: '';
    border: 2px solid var(--color-accent-emphasis);
    border-radius: 6px;
  }

  .footnotes li:target {
    color: var(--color-fg-default);
  }

  .footnotes .data-footnote-backref g-emoji {
    font-family: monospace;
  }

  .pl-c {
    color: var(--color-prettylights-syntax-comment);
  }

  .pl-c1,
  .pl-s .pl-v {
    color: var(--color-prettylights-syntax-constant);
  }

  .pl-e,
  .pl-en {
    color: var(--color-prettylights-syntax-entity);
  }

  .pl-smi,
  .pl-s .pl-s1 {
    color: var(--color-prettylights-syntax-storage-modifier-import);
  }

  .pl-ent {
    color: var(--color-prettylights-syntax-entity-tag);
  }

  .pl-k {
    color: var(--color-prettylights-syntax-keyword);
  }

  .pl-s,
  .pl-pds,
  .pl-s .pl-pse .pl-s1,
  .pl-sr,
  .pl-sr .pl-cce,
  .pl-sr .pl-sre,
  .pl-sr .pl-sra {
    color: var(--color-prettylights-syntax-string);
  }

  .pl-v,
  .pl-smw {
    color: var(--color-prettylights-syntax-variable);
  }

  .pl-bu {
    color: var(--color-prettylights-syntax-brackethighlighter-unmatched);
  }

  .pl-ii {
    color: var(--color-prettylights-syntax-invalid-illegal-text);
    background-color: var(--color-prettylights-syntax-invalid-illegal-bg);
  }

  .pl-c2 {
    color: var(--color-prettylights-syntax-carriage-return-text);
    background-color: var(--color-prettylights-syntax-carriage-return-bg);
  }

  .pl-sr .pl-cce {
    font-weight: bold;
    color: var(--color-prettylights-syntax-string-regexp);
  }

  .pl-ml {
    color: var(--color-prettylights-syntax-markup-list);
  }

  .pl-mh,
  .pl-mh .pl-en,
  .pl-ms {
    font-weight: bold;
    color: var(--color-prettylights-syntax-markup-heading);
  }

  .pl-mi {
    font-style: italic;
    color: var(--color-prettylights-syntax-markup-italic);
  }

  .pl-mb {
    font-weight: bold;
    color: var(--color-prettylights-syntax-markup-bold);
  }

  .pl-md {
    color: var(--color-prettylights-syntax-markup-deleted-text);
    background-color: var(--color-prettylights-syntax-markup-deleted-bg);
  }

  .pl-mi1 {
    color: var(--color-prettylights-syntax-markup-inserted-text);
    background-color: var(--color-prettylights-syntax-markup-inserted-bg);
  }

  .pl-mc {
    color: var(--color-prettylights-syntax-markup-changed-text);
    background-color: var(--color-prettylights-syntax-markup-changed-bg);
  }

  .pl-mi2 {
    color: var(--color-prettylights-syntax-markup-ignored-text);
    background-color: var(--color-prettylights-syntax-markup-ignored-bg);
  }

  .pl-mdr {
    font-weight: bold;
    color: var(--color-prettylights-syntax-meta-diff-range);
  }

  .pl-ba {
    color: var(--color-prettylights-syntax-brackethighlighter-angle);
  }

  .pl-sg {
    color: var(--color-prettylights-syntax-sublimelinter-gutter-mark);
  }

  .pl-corl {
    text-decoration: underline;
    color: var(--color-prettylights-syntax-constant-other-reference-link);
  }

  g-emoji {
    display: inline-block;
    min-width: 1ch;
    font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 1em;
    font-style: normal !important;
    font-weight: var(--base-text-weight-normal, 400);
    line-height: 1;
    vertical-align: -0.075em;
  }

  g-emoji img {
    width: 1em;
    height: 1em;
  }

  .task-list-item {
    list-style-type: none;
  }

  .task-list-item label {
    font-weight: var(--base-text-weight-normal, 400);
  }

  .task-list-item.enabled label {
    cursor: pointer;
  }

  .task-list-item + .task-list-item {
    margin-top: 4px;
  }

  .task-list-item .handle {
    display: none;
  }

  .task-list-item-checkbox {
    margin: 0 0.2em 0.25em -1.4em;
    vertical-align: middle;
  }

  .contains-task-list:dir(rtl) .task-list-item-checkbox {
    margin: 0 -1.6em 0.25em 0.2em;
  }

  .contains-task-list {
    position: relative;
  }

  .contains-task-list:hover .task-list-item-convert-container,
  .contains-task-list:focus-within .task-list-item-convert-container {
    display: block;
    width: auto;
    height: 24px;
    overflow: visible;
    clip: auto;
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(50%);
  }
`,Ei={tokenize:Bi,partial:!0},Fi={tokenize:Ni,partial:!0},Ai={tokenize:Hi,partial:!0},Di={tokenize:Ui,partial:!0},Ti={tokenize:qi,partial:!0},Oi={tokenize:ji,previous:Vi},Li={tokenize:_i,previous:Wi},Pi={tokenize:Ri,previous:$i},Ii={},zi={text:Ii},Mi=48;Mi<123;)Ii[Mi]=Pi,Mi++,58===Mi?Mi=65:91===Mi&&(Mi=97);function Ri(e,t,n){let r,l,i=this;return o;function o(t){return Qi(t)&&$i.call(i,i.previous)&&!Yi(i.events)?(e.enter("literalAutolink"),e.enter("literalAutolinkEmail"),a(t)):n(t)}function a(t){return Qi(t)?(e.consume(t),a):64===t?(e.consume(t),u):n(t)}function u(t){return 46===t?e.check(Ti,c,s)(t):45===t||95===t||be(t)?(l=!0,e.consume(t),u):c(t)}function s(t){return e.consume(t),r=!0,u}function c(o){return l&&r&&ye(i.previous)?(e.exit("literalAutolinkEmail"),e.exit("literalAutolink"),t(o)):n(o)}}function ji(e,t,n){let r=this;return l;function l(t){return 87!==t&&119!==t||!Vi.call(r,r.previous)||Yi(r.events)?n(t):(e.enter("literalAutolink"),e.enter("literalAutolinkWww"),e.check(Ei,e.attempt(Fi,e.attempt(Ai,i),n),n)(t))}function i(n){return e.exit("literalAutolinkWww"),e.exit("literalAutolink"),t(n)}}function _i(e,t,n){let r=this,l="",i=!1;return o;function o(t){return 72!==t&&104!==t||!Wi.call(r,r.previous)||Yi(r.events)?n(t):(e.enter("literalAutolink"),e.enter("literalAutolinkHttp"),l+=String.fromCodePoint(t),e.consume(t),a)}function a(t){if(ye(t)&&l.length<5)return l+=String.fromCodePoint(t),e.consume(t),a;if(58===t){let n=l.toLowerCase();if("http"===n||"https"===n)return e.consume(t),u}return n(t)}function u(t){return 47===t?(e.consume(t),i?s:(i=!0,u)):n(t)}function s(t){return null===t||xe(t)||Ee(t)||De(t)||Ae(t)?n(t):e.attempt(Fi,e.attempt(Ai,c),n)(t)}function c(n){return e.exit("literalAutolinkHttp"),e.exit("literalAutolink"),t(n)}}function Bi(e,t,n){let r=0;return l;function l(t){return(87===t||119===t)&&r<3?(r++,e.consume(t),l):46===t&&3===r?(e.consume(t),i):n(t)}function i(e){return null===e?n(e):t(e)}}function Ni(e,t,n){let r,l,i;return o;function o(t){return 46===t||95===t?e.check(Di,u,a)(t):null===t||Ee(t)||De(t)||45!==t&&Ae(t)?u(t):(i=!0,e.consume(t),o)}function a(t){return 95===t?r=!0:(l=r,r=void 0),e.consume(t),o}function u(e){return l||r||!i?n(e):t(e)}}function Hi(e,t){let n=0,r=0;return l;function l(o){return 40===o?(n++,e.consume(o),l):41===o&&r<n?i(o):33===o||34===o||38===o||39===o||41===o||42===o||44===o||46===o||58===o||59===o||60===o||63===o||93===o||95===o||126===o?e.check(Di,t,i)(o):null===o||Ee(o)||De(o)?t(o):(e.consume(o),l)}function i(t){return 41===t&&r++,e.consume(t),l}}function Ui(e,t,n){return r;function r(o){return 33===o||34===o||39===o||41===o||42===o||44===o||46===o||58===o||59===o||63===o||95===o||126===o?(e.consume(o),r):38===o?(e.consume(o),i):93===o?(e.consume(o),l):60===o||null===o||Ee(o)||De(o)?t(o):n(o)}function l(e){return null===e||40===e||91===e||Ee(e)||De(e)?t(e):r(e)}function i(e){return ye(e)?o(e):n(e)}function o(t){return 59===t?(e.consume(t),r):ye(t)?(e.consume(t),o):n(t)}}function qi(e,t,n){return r;function r(t){return e.consume(t),l}function l(e){return be(e)?n(e):t(e)}}function Vi(e){return null===e||40===e||42===e||95===e||91===e||93===e||126===e||Ee(e)}function Wi(e){return!ye(e)}function $i(e){return!(47===e||Qi(e))}function Qi(e){return 43===e||45===e||46===e||95===e||be(e)}function Yi(e){let t=e.length,n=!1;for(;t--;){let r=e[t][1];if(("labelLink"===r.type||"labelImage"===r.type)&&!r._balanced){n=!0;break}if(r._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}Ii[43]=Pi,Ii[45]=Pi,Ii[46]=Pi,Ii[95]=Pi,Ii[72]=[Pi,Li],Ii[104]=[Pi,Li],Ii[87]=[Pi,Oi],Ii[119]=[Pi,Oi];var Ki={tokenize:ro,partial:!0};function Xi(){return{document:{[91]:{tokenize:eo,continuation:{tokenize:to},exit:no}},text:{[91]:{tokenize:Gi},[93]:{add:"after",tokenize:Zi,resolveTo:Ji}}}}function Zi(e,t,n){let r,l=this,i=l.events.length,o=l.parser.gfmFootnotes||(l.parser.gfmFootnotes=[]);for(;i--;){let e=l.events[i][1];if("labelImage"===e.type){r=e;break}if("gfmFootnoteCall"===e.type||"labelLink"===e.type||"label"===e.type||"image"===e.type||"link"===e.type)break}return a;function a(i){if(!r||!r._balanced)return n(i);let a=Ft(l.sliceSerialize({start:r.end,end:l.now()}));return 94===a.codePointAt(0)&&o.includes(a.slice(1))?(e.enter("gfmFootnoteCallLabelMarker"),e.consume(i),e.exit("gfmFootnoteCallLabelMarker"),t(i)):n(i)}}function Ji(e,t){let n=e.length;for(;n--;)if("labelImage"===e[n][1].type&&"enter"===e[n][0]){e[n][1];break}e[n+1][1].type="data",e[n+3][1].type="gfmFootnoteCallLabelMarker";let r={type:"gfmFootnoteCall",start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},l={type:"gfmFootnoteCallMarker",start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};l.end.column++,l.end.offset++,l.end._bufferIndex++;let i={type:"gfmFootnoteCallString",start:Object.assign({},l.end),end:Object.assign({},e[e.length-1][1].start)},o={type:"chunkString",contentType:"string",start:Object.assign({},i.start),end:Object.assign({},i.end)},a=[e[n+1],e[n+2],["enter",r,t],e[n+3],e[n+4],["enter",l,t],["exit",l,t],["enter",i,t],["enter",o,t],["exit",o,t],["exit",i,t],e[e.length-2],e[e.length-1],["exit",r,t]];return e.splice(n,e.length-n+1,...a),e}function Gi(e,t,n){let r,l=this,i=l.parser.gfmFootnotes||(l.parser.gfmFootnotes=[]),o=0;return a;function a(t){return e.enter("gfmFootnoteCall"),e.enter("gfmFootnoteCallLabelMarker"),e.consume(t),e.exit("gfmFootnoteCallLabelMarker"),u}function u(t){return 94!==t?n(t):(e.enter("gfmFootnoteCallMarker"),e.consume(t),e.exit("gfmFootnoteCallMarker"),e.enter("gfmFootnoteCallString"),e.enter("chunkString").contentType="string",s)}function s(a){if(o>999||93===a&&!r||null===a||91===a||Ee(a))return n(a);if(93===a){e.exit("chunkString");let r=e.exit("gfmFootnoteCallString");return i.includes(Ft(l.sliceSerialize(r)))?(e.enter("gfmFootnoteCallLabelMarker"),e.consume(a),e.exit("gfmFootnoteCallLabelMarker"),e.exit("gfmFootnoteCall"),t):n(a)}return Ee(a)||(r=!0),o++,e.consume(a),92===a?c:s}function c(t){return 91===t||92===t||93===t?(e.consume(t),o++,s):s(t)}}function eo(e,t,n){let r,l,i=this,o=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]),a=0;return u;function u(t){return e.enter("gfmFootnoteDefinition")._container=!0,e.enter("gfmFootnoteDefinitionLabel"),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(t),e.exit("gfmFootnoteDefinitionLabelMarker"),s}function s(t){return 94===t?(e.enter("gfmFootnoteDefinitionMarker"),e.consume(t),e.exit("gfmFootnoteDefinitionMarker"),e.enter("gfmFootnoteDefinitionLabelString"),e.enter("chunkString").contentType="string",c):n(t)}function c(t){if(a>999||93===t&&!l||null===t||91===t||Ee(t))return n(t);if(93===t){e.exit("chunkString");let n=e.exit("gfmFootnoteDefinitionLabelString");return r=Ft(i.sliceSerialize(n)),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(t),e.exit("gfmFootnoteDefinitionLabelMarker"),e.exit("gfmFootnoteDefinitionLabel"),p}return Ee(t)||(l=!0),a++,e.consume(t),92===t?f:c}function f(t){return 91===t||92===t||93===t?(e.consume(t),a++,c):c(t)}function p(t){return 58===t?(e.enter("definitionMarker"),e.consume(t),e.exit("definitionMarker"),o.includes(r)||o.push(r),Oe(e,d,"gfmFootnoteDefinitionWhitespace")):n(t)}function d(e){return t(e)}}function to(e,t,n){return e.check(We,t,e.attempt(Ki,t,n))}function no(e){e.exit("gfmFootnoteDefinition")}function ro(e,t,n){let r=this;return Oe(e,l,"gfmFootnoteDefinitionIndent",5);function l(e){let l=r.events[r.events.length-1];return l&&"gfmFootnoteDefinitionIndent"===l[1].type&&4===l[2].sliceSerialize(l[1],!0).length?t(e):n(e)}}function lo(e){let t=(e||{}).singleTilde,n={tokenize:l,resolveAll:r};return null==t&&(t=!0),{text:{[126]:n},insideSpan:{null:[n]},attentionMarkers:{null:[126]}};function r(e,t){let n=-1;for(;++n<e.length;)if("enter"===e[n][0]&&"strikethroughSequenceTemporary"===e[n][1].type&&e[n][1]._close){let r=n;for(;r--;)if("exit"===e[r][0]&&"strikethroughSequenceTemporary"===e[r][1].type&&e[r][1]._open&&e[n][1].end.offset-e[n][1].start.offset===e[r][1].end.offset-e[r][1].start.offset){e[n][1].type="strikethroughSequence",e[r][1].type="strikethroughSequence";let l={type:"strikethrough",start:Object.assign({},e[r][1].start),end:Object.assign({},e[n][1].end)},i={type:"strikethroughText",start:Object.assign({},e[r][1].end),end:Object.assign({},e[n][1].start)},o=[["enter",l,t],["enter",e[r][1],t],["exit",e[r][1],t],["enter",i,t]],a=t.parser.constructs.insideSpan.null;a&&ce(o,o.length,0,_e(a,e.slice(r+1,n),t)),ce(o,o.length,0,[["exit",i,t],["enter",e[n][1],t],["exit",e[n][1],t],["exit",l,t]]),ce(e,r-1,n-r+3,o),n=r+o.length-2;break}}for(n=-1;++n<e.length;)"strikethroughSequenceTemporary"===e[n][1].type&&(e[n][1].type="data");return e}function l(e,n,r){let l=this.previous,i=this.events,o=0;return a;function a(t){return 126===l&&"characterEscape"!==i[i.length-1][1].type?r(t):(e.enter("strikethroughSequenceTemporary"),u(t))}function u(i){let a=je(l);if(126===i)return o>1?r(i):(e.consume(i),o++,u);if(o<2&&!t)return r(i);let s=e.exit("strikethroughSequenceTemporary"),c=je(i);return s._open=!c||2===c&&!!a,s._close=!a||2===a&&!!c,n(i)}}}var io=class{constructor(){this.map=[]}add(e,t,n){oo(this,e,t,n)}consume(e){if(this.map.sort(((e,t)=>e[0]-t[0])),0===this.map.length)return;let t=this.map.length,n=[];for(;t>0;)t-=1,n.push(e.slice(this.map[t][0]+this.map[t][1])),n.push(this.map[t][2]),e.length=this.map[t][0];n.push([...e]),e.length=0;let r=n.pop();for(;r;)e.push(...r),r=n.pop();this.map.length=0}};function oo(e,t,n,r){let l=0;if(0!==n||0!==r.length){for(;l<e.map.length;){if(e.map[l][0]===t)return e.map[l][1]+=n,void e.map[l][2].push(...r);l+=1}e.map.push([t,n,r])}}function ao(e,t){let n=!1,r=[];for(;t<e.length;){let l=e[t];if(n){if("enter"===l[0])"tableContent"===l[1].type&&r.push("tableDelimiterMarker"===e[t+1][1].type?"left":"none");else if("tableContent"===l[1].type){if("tableDelimiterMarker"===e[t-1][1].type){let e=r.length-1;r[e]="left"===r[e]?"center":"right"}}else if("tableDelimiterRow"===l[1].type)break}else"enter"===l[0]&&"tableDelimiterRow"===l[1].type&&(n=!0);t+=1}return r}var uo={flow:{null:{tokenize:so,resolveAll:co}}};function so(e,t,n){let r,l=this,i=0,o=0;return a;function a(e){let t=l.events.length-1;for(;t>-1;){let e=l.events[t][1].type;if("lineEnding"!==e&&"linePrefix"!==e)break;t--}let r=t>-1?l.events[t][1].type:null,i="tableHead"===r||"tableRow"===r?w:u;return i===w&&l.parser.lazy[l.now().line]?n(e):i(e)}function u(t){return e.enter("tableHead"),e.enter("tableRow"),s(t)}function s(e){return 124===e||(r=!0,o+=1),c(e)}function c(t){return null===t?n(t):Ce(t)?o>1?(o=0,l.interrupt=!0,e.exit("tableRow"),e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),d):n(t):Fe(t)?Oe(e,c,"whitespace")(t):(o+=1,r&&(r=!1,i+=1),124===t?(e.enter("tableCellDivider"),e.consume(t),e.exit("tableCellDivider"),r=!0,c):(e.enter("data"),f(t)))}function f(t){return null===t||124===t||Ee(t)?(e.exit("data"),c(t)):(e.consume(t),92===t?p:f)}function p(t){return 92===t||124===t?(e.consume(t),f):f(t)}function d(t){return l.interrupt=!1,l.parser.lazy[l.now().line]?n(t):(e.enter("tableDelimiterRow"),r=!1,Fe(t)?Oe(e,h,"linePrefix",l.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(t):h(t))}function h(t){return 45===t||58===t?m(t):124===t?(r=!0,e.enter("tableCellDivider"),e.consume(t),e.exit("tableCellDivider"),g):v(t)}function g(t){return Fe(t)?Oe(e,m,"whitespace")(t):m(t)}function m(t){return 58===t?(o+=1,r=!0,e.enter("tableDelimiterMarker"),e.consume(t),e.exit("tableDelimiterMarker"),y):45===t?(o+=1,y(t)):null===t||Ce(t)?x(t):v(t)}function y(t){return 45===t?(e.enter("tableDelimiterFiller"),b(t)):v(t)}function b(t){return 45===t?(e.consume(t),b):58===t?(r=!0,e.exit("tableDelimiterFiller"),e.enter("tableDelimiterMarker"),e.consume(t),e.exit("tableDelimiterMarker"),k):(e.exit("tableDelimiterFiller"),k(t))}function k(t){return Fe(t)?Oe(e,x,"whitespace")(t):x(t)}function x(n){return 124===n?h(n):(null===n||Ce(n))&&r&&i===o?(e.exit("tableDelimiterRow"),e.exit("tableHead"),t(n)):v(n)}function v(e){return n(e)}function w(t){return e.enter("tableRow"),S(t)}function S(n){return 124===n?(e.enter("tableCellDivider"),e.consume(n),e.exit("tableCellDivider"),S):null===n||Ce(n)?(e.exit("tableRow"),t(n)):Fe(n)?Oe(e,S,"whitespace")(n):(e.enter("data"),C(n))}function C(t){return null===t||124===t||Ee(t)?(e.exit("data"),S(t)):(e.consume(t),92===t?E:C)}function E(t){return 92===t||124===t?(e.consume(t),C):C(t)}}function co(e,t){let n,r,l,i=-1,o=!0,a=0,u=[0,0,0,0],s=[0,0,0,0],c=!1,f=0,p=new io;for(;++i<e.length;){let d=e[i],h=d[1];"enter"===d[0]?"tableHead"===h.type?(c=!1,0!==f&&(po(p,t,f,n,r),r=void 0,f=0),n={type:"table",start:Object.assign({},h.start),end:Object.assign({},h.end)},p.add(i,0,[["enter",n,t]])):"tableRow"===h.type||"tableDelimiterRow"===h.type?(o=!0,l=void 0,u=[0,0,0,0],s=[0,i+1,0,0],c&&(c=!1,r={type:"tableBody",start:Object.assign({},h.start),end:Object.assign({},h.end)},p.add(i,0,[["enter",r,t]])),a="tableDelimiterRow"===h.type?2:r?3:1):!a||"data"!==h.type&&"tableDelimiterMarker"!==h.type&&"tableDelimiterFiller"!==h.type?"tableCellDivider"===h.type&&(o?o=!1:(0!==u[1]&&(s[0]=s[1],l=fo(p,t,u,a,void 0,l)),u=s,s=[u[1],i,0,0])):(o=!1,0===s[2]&&(0!==u[1]&&(s[0]=s[1],l=fo(p,t,u,a,void 0,l),u=[0,0,0,0]),s[2]=i)):"tableHead"===h.type?(c=!0,f=i):"tableRow"===h.type||"tableDelimiterRow"===h.type?(f=i,0!==u[1]?(s[0]=s[1],l=fo(p,t,u,a,i,l)):0!==s[1]&&(l=fo(p,t,s,a,i,l)),a=0):a&&("data"===h.type||"tableDelimiterMarker"===h.type||"tableDelimiterFiller"===h.type)&&(s[3]=i)}for(0!==f&&po(p,t,f,n,r),p.consume(t.events),i=-1;++i<t.events.length;){let e=t.events[i];"enter"===e[0]&&"table"===e[1].type&&(e[1]._align=ao(t.events,i))}return e}function fo(e,t,n,r,l,i){let o=1===r?"tableHeader":2===r?"tableDelimiter":"tableData",a="tableContent";0!==n[0]&&(i.end=Object.assign({},ho(t.events,n[0])),e.add(n[0],0,[["exit",i,t]]));let u=ho(t.events,n[1]);if(i={type:o,start:Object.assign({},u),end:Object.assign({},u)},e.add(n[1],0,[["enter",i,t]]),0!==n[2]){let l=ho(t.events,n[2]),i=ho(t.events,n[3]),o={type:a,start:Object.assign({},l),end:Object.assign({},i)};if(e.add(n[2],0,[["enter",o,t]]),2!==r){let r=t.events[n[2]],l=t.events[n[3]];if(r[1].end=Object.assign({},l[1].end),r[1].type="chunkText",r[1].contentType="text",n[3]>n[2]+1){let t=n[2]+1,r=n[3]-n[2]-1;e.add(t,r,[])}}e.add(n[3]+1,0,[["exit",o,t]])}return void 0!==l&&(i.end=Object.assign({},ho(t.events,l)),e.add(l,0,[["exit",i,t]]),i=void 0),i}function po(e,t,n,r,l){let i=[],o=ho(t.events,n);l&&(l.end=Object.assign({},o),i.push(["exit",l,t])),r.end=Object.assign({},o),i.push(["exit",r,t]),e.add(n+1,0,i)}function ho(e,t){let n=e[t],r="enter"===n[0]?"start":"end";return n[1][r]}var go={tokenize:yo},mo={text:{[91]:go}};function yo(e,t,n){let r=this;return l;function l(t){return null===r.previous&&r._gfmTasklistFirstContentOfListItem?(e.enter("taskListCheck"),e.enter("taskListCheckMarker"),e.consume(t),e.exit("taskListCheckMarker"),i):n(t)}function i(t){return Ee(t)?(e.enter("taskListCheckValueUnchecked"),e.consume(t),e.exit("taskListCheckValueUnchecked"),o):88===t||120===t?(e.enter("taskListCheckValueChecked"),e.consume(t),e.exit("taskListCheckValueChecked"),o):n(t)}function o(t){return 93===t?(e.enter("taskListCheckMarker"),e.consume(t),e.exit("taskListCheckMarker"),e.exit("taskListCheck"),a):n(t)}function a(r){return Ce(r)?t(r):Fe(r)?e.check({tokenize:bo},t,n)(r):n(r)}}function bo(e,t,n){return Oe(e,r,"whitespace");function r(e){return null===e?n(e):t(e)}}function ko(e){return de([zi,Xi(),lo(e),uo,mo])}function xo(e,t){let n=String(e);if("string"!=typeof t)throw new TypeError("Expected character");let r=0,l=n.indexOf(t);for(;-1!==l;)r++,l=n.indexOf(t,l+t.length);return r}function vo(e){if("string"!=typeof e)throw new TypeError("Expected a string");return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}var wo={}.hasOwnProperty,So=function(e,t,n,r){let l,i;"string"==typeof t||t instanceof RegExp?(i=[[t,n]],l=r):(i=t,l=n),l||(l={});let o=Ur(l.ignore||[]),a=Co(i),u=-1;for(;++u<a.length;)Zr(e,"text",s);return e;function s(e,t){let n,r=-1;for(;++r<t.length;){let e=t[r];if(o(e,n?n.children.indexOf(e):void 0,n))return;n=e}if(n)return c(e,t)}function c(e,t){let n=t[t.length-1],r=a[u][0],l=a[u][1],i=0,o=n.children.indexOf(e),s=!1,c=[];r.lastIndex=0;let f=r.exec(e.value);for(;f;){let n=f.index,o={index:f.index,input:f.input,stack:[...t,e]},a=l(...f,o);if("string"==typeof a&&(a=a.length>0?{type:"text",value:a}:void 0),!1!==a&&(i!==n&&c.push({type:"text",value:e.value.slice(i,n)}),Array.isArray(a)?c.push(...a):a&&c.push(a),i=n+f[0].length,s=!0),!r.global)break;f=r.exec(e.value)}return s?(i<e.value.length&&c.push({type:"text",value:e.value.slice(i)}),n.children.splice(o,1,...c)):c=[e],o+c.length}};function Co(e){let t=[];if("object"!=typeof e)throw new TypeError("Expected array or object as schema");if(Array.isArray(e)){let n=-1;for(;++n<e.length;)t.push([Eo(e[n][0]),Fo(e[n][1])])}else{let n;for(n in e)wo.call(e,n)&&t.push([Eo(n),Fo(e[n])])}return t}function Eo(e){return"string"==typeof e?new RegExp(vo(e),"g"):e}function Fo(e){return"function"==typeof e?e:()=>e}var Ao="phrasing",Do=["autolink","link","image","label"],To={transforms:[jo],enter:{literalAutolink:Lo,literalAutolinkEmail:Po,literalAutolinkHttp:Po,literalAutolinkWww:Po},exit:{literalAutolink:Ro,literalAutolinkEmail:Mo,literalAutolinkHttp:Io,literalAutolinkWww:zo}},Oo={unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:Ao,notInConstruct:Do},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:Ao,notInConstruct:Do},{character:":",before:"[ps]",after:"\\/",inConstruct:Ao,notInConstruct:Do}]};function Lo(e){this.enter({type:"link",title:null,url:"",children:[]},e)}function Po(e){this.config.enter.autolinkProtocol.call(this,e)}function Io(e){this.config.exit.autolinkProtocol.call(this,e)}function zo(e){this.config.exit.data.call(this,e);let t=this.stack[this.stack.length-1];t.url="http://"+this.sliceSerialize(e)}function Mo(e){this.config.exit.autolinkEmail.call(this,e)}function Ro(e){this.exit(e)}function jo(e){So(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,_o],[/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/g,Bo]],{ignore:["link","linkReference"]})}function _o(e,t,n,r,l){let i="";if(!Uo(l)||(/^w/i.test(t)&&(n=t+n,t="",i="http://"),!No(n)))return!1;let o=Ho(n+r);if(!o[0])return!1;let a={type:"link",title:null,url:i+t+o[0],children:[{type:"text",value:t+o[0]}]};return o[1]?[a,{type:"text",value:o[1]}]:a}function Bo(e,t,n,r){return!(!Uo(r,!0)||/[-\d_]$/.test(n))&&{type:"link",title:null,url:"mailto:"+t+"@"+n,children:[{type:"text",value:t+"@"+n}]}}function No(e){let t=e.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function Ho(e){let t=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!t)return[e,void 0];e=e.slice(0,t.index);let n=t[0],r=n.indexOf(")"),l=xo(e,"("),i=xo(e,")");for(;-1!==r&&l>i;)e+=n.slice(0,r+1),n=n.slice(r+1),r=n.indexOf(")"),i++;return[e,n]}function Uo(e,t){let n=e.input.charCodeAt(e.index-1);return(0===e.index||De(n)||Ae(n))&&(!t||47!==n)}function qo(e){return e.label||!e.identifier?e.label||"":Xn(e.identifier)}function Vo(e,t,n){let l=t.indexStack,i=e.children||[],o=t.createTracker(n),a=[],u=-1;for(l.push(-1);++u<i.length;){let n=i[u];l[l.length-1]=u,a.push(o.move(t.handle(n,e,t,(0,r.a)({before:"\n",after:"\n"},o.current())))),"list"!==n.type&&(t.bulletLastUsed=void 0),u<i.length-1&&a.push(o.move(Wo(n,i[u+1],e,t)))}return l.pop(),a.join("")}function Wo(e,t,n,r){let l=r.join.length;for(;l--;){let i=r.join[l](e,t,n,r);if(!0===i||1===i)break;if("number"==typeof i)return"\n".repeat(1+i);if(!1===i)return"\n\n\x3c!----\x3e\n\n"}return"\n\n"}var $o=/\r?\n|\r/g;function Qo(e,t){let n,r=[],l=0,i=0;for(;n=$o.exec(e);)o(e.slice(l,n.index)),r.push(n[0]),l=n.index+n[0].length,i++;return o(e.slice(l)),r.join("");function o(e){r.push(t(e,i,!e))}}function Yo(e){if(!e._compiled){let t=(e.atBreak?"[\\r\\n][\\t ]*":"")+(e.before?"(?:"+e.before+")":"");e._compiled=new RegExp((t?"("+t+")":"")+(/[|\\{}()[\]^$+*?.-]/.test(e.character)?"\\":"")+e.character+(e.after?"(?:"+e.after+")":""),"g")}return e._compiled}function Ko(e,t){return Xo(e,t.inConstruct,!0)&&!Xo(e,t.notInConstruct,!1)}function Xo(e,t,n){if("string"==typeof t&&(t=[t]),!t||0===t.length)return n;let r=-1;for(;++r<t.length;)if(e.includes(t[r]))return!0;return!1}function Zo(e,t,n){let r=(n.before||"")+(t||"")+(n.after||""),l=[],i=[],o={},a=-1;for(;++a<e.unsafe.length;){let t=e.unsafe[a];if(!Ko(e.stack,t))continue;let n,i=Yo(t);for(;n=i.exec(r);){let e="before"in t||!!t.atBreak,r="after"in t,i=n.index+(e?n[1].length:0);l.includes(i)?(o[i].before&&!e&&(o[i].before=!1),o[i].after&&!r&&(o[i].after=!1)):(l.push(i),o[i]={before:e,after:r})}}l.sort(Jo);let u=n.before?n.before.length:0,s=r.length-(n.after?n.after.length:0);for(a=-1;++a<l.length;){let e=l[a];e<u||e>=s||e+1<s&&l[a+1]===e+1&&o[e].after&&!o[e+1].before&&!o[e+1].after||l[a-1]===e-1&&o[e].before&&!o[e-1].before&&!o[e-1].after||(u!==e&&i.push(Go(r.slice(u,e),"\\")),u=e,!/[!-/:-@[-`{-~]/.test(r.charAt(e))||n.encode&&n.encode.includes(r.charAt(e))?(i.push("&#x"+r.charCodeAt(e).toString(16).toUpperCase()+";"),u++):i.push("\\"))}return i.push(Go(r.slice(u,s),n.after)),i.join("")}function Jo(e,t){return e-t}function Go(e,t){let n,r=/\\(?=[!-/:-@[-`{-~])/g,l=[],i=[],o=e+t,a=-1,u=0;for(;n=r.exec(o);)l.push(n.index);for(;++a<l.length;)u!==l[a]&&i.push(e.slice(u,l[a])),i.push("\\"),u=l[a];return i.push(e.slice(u)),i.join("")}function ea(e){let t=e||{},n=t.now||{},r=t.lineShift||0,l=n.line||1,i=n.column||1;return{move:u,current:o,shift:a};function o(){return{now:{line:l,column:i},lineShift:r}}function a(e){r+=e}function u(e){let t=e||"",n=t.split(/\r?\n|\r/g),o=n[n.length-1];return l+=n.length-1,i=1===n.length?i+o.length:1+o.length+r,t}}function ta(){return{enter:{gfmFootnoteDefinition:ra,gfmFootnoteDefinitionLabelString:la,gfmFootnoteCall:aa,gfmFootnoteCallString:ua},exit:{gfmFootnoteDefinition:oa,gfmFootnoteDefinitionLabelString:ia,gfmFootnoteCall:ca,gfmFootnoteCallString:sa}}}function na(){return{unsafe:[{character:"[",inConstruct:["phrasing","label","reference"]}],handlers:{footnoteDefinition:da,footnoteReference:fa}}}function ra(e){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},e)}function la(){this.buffer()}function ia(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=Ft(this.sliceSerialize(e)).toLowerCase()}function oa(e){this.exit(e)}function aa(e){this.enter({type:"footnoteReference",identifier:"",label:""},e)}function ua(){this.buffer()}function sa(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=Ft(this.sliceSerialize(e)).toLowerCase()}function ca(e){this.exit(e)}function fa(e,t,n,l){let i=ea(l),o=i.move("[^"),a=n.enter("footnoteReference"),u=n.enter("reference");return o+=i.move(Zo(n,qo(e),(0,r.b)((0,r.a)({},i.current()),{before:o,after:"]"}))),u(),a(),o+=i.move("]"),o}function pa(){return"["}function da(e,t,n,l){let i=ea(l),o=i.move("[^"),a=n.enter("footnoteDefinition"),u=n.enter("label");return o+=i.move(Zo(n,qo(e),(0,r.b)((0,r.a)({},i.current()),{before:o,after:"]"}))),u(),o+=i.move("]:"+(e.children&&e.children.length>0?" ":"")),i.shift(4),o+=i.move(Qo(Vo(e,n,i.current()),ha)),a(),o}function ha(e,t,n){return 0===t?e:(n?"":"    ")+e}function ga(e,t,n){let l=t.indexStack,i=e.children||[],o=[],a=-1,u=n.before;l.push(-1);let s=t.createTracker(n);for(;++a<i.length;){let c,f=i[a];if(l[l.length-1]=a,a+1<i.length){let n=t.handle.handlers[i[a+1].type];n&&n.peek&&(n=n.peek),c=n?n(i[a+1],e,t,(0,r.a)({before:"",after:""},s.current())).charAt(0):""}else c=n.after;o.length>0&&("\r"===u||"\n"===u)&&"html"===f.type&&(o[o.length-1]=o[o.length-1].replace(/(\r?\n|\r)$/," "),u=" ",s=t.createTracker(n),s.move(o.join(""))),o.push(s.move(t.handle(f,e,t,(0,r.b)((0,r.a)({},s.current()),{before:u,after:c})))),u=o[o.length-1].slice(-1)}return l.pop(),o.join("")}fa.peek=pa;var ma=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];va.peek=wa;var ya={canContainEols:["delete"],enter:{strikethrough:ka},exit:{strikethrough:xa}},ba={unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:ma}],handlers:{delete:va}};function ka(e){this.enter({type:"delete",children:[]},e)}function xa(e){this.exit(e)}function va(e,t,n,l){let i=ea(l),o=n.enter("strikethrough"),a=i.move("~~");return a+=ga(e,n,(0,r.b)((0,r.a)({},i.current()),{before:a,after:"~"})),a+=i.move("~~"),o(),a}function wa(){return"~"}function Sa(e,t,n){let r=e.value||"",l="`",i=-1;for(;new RegExp("(^|[^`])"+l+"([^`]|$)").test(r);)l+="`";for(/[^ \r\n]/.test(r)&&(/^[ \r\n]/.test(r)&&/[ \r\n]$/.test(r)||/^`|`$/.test(r))&&(r=" "+r+" ");++i<n.unsafe.length;){let e,t=n.unsafe[i],l=Yo(t);if(t.atBreak)for(;e=l.exec(r);){let t=e.index;10===r.charCodeAt(t)&&13===r.charCodeAt(t-1)&&t--,r=r.slice(0,t)+" "+r.slice(e.index+1)}}return l+r+l}function Ca(){return"`"}function Ea(e,t={}){let n=(t.align||[]).concat(),r=t.stringLength||Aa,l=[],i=[],o=[],a=[],u=0,s=-1;for(;++s<e.length;){let n=[],l=[],c=-1;for(e[s].length>u&&(u=e[s].length);++c<e[s].length;){let i=Fa(e[s][c]);if(!1!==t.alignDelimiters){let e=r(i);l[c]=e,(void 0===a[c]||e>a[c])&&(a[c]=e)}n.push(i)}i[s]=n,o[s]=l}let c=-1;if("object"==typeof n&&"length"in n)for(;++c<u;)l[c]=Da(n[c]);else{let e=Da(n);for(;++c<u;)l[c]=e}c=-1;let f=[],p=[];for(;++c<u;){let e=l[c],n="",r="";99===e?(n=":",r=":"):108===e?n=":":114===e&&(r=":");let i=!1===t.alignDelimiters?1:Math.max(1,a[c]-n.length-r.length),o=n+"-".repeat(i)+r;!1!==t.alignDelimiters&&(i=n.length+i+r.length,i>a[c]&&(a[c]=i),p[c]=i),f[c]=o}i.splice(1,0,f),o.splice(1,0,p),s=-1;let d=[];for(;++s<i.length;){let e=i[s],n=o[s];c=-1;let r=[];for(;++c<u;){let i=e[c]||"",o="",s="";if(!1!==t.alignDelimiters){let e=a[c]-(n[c]||0),t=l[c];114===t?o=" ".repeat(e):99===t?e%2?(o=" ".repeat(e/2+.5),s=" ".repeat(e/2-.5)):(o=" ".repeat(e/2),s=o):s=" ".repeat(e)}!1!==t.delimiterStart&&!c&&r.push("|"),!1!==t.padding&&!(!1===t.alignDelimiters&&""===i)&&(!1!==t.delimiterStart||c)&&r.push(" "),!1!==t.alignDelimiters&&r.push(o),r.push(i),!1!==t.alignDelimiters&&r.push(s),!1!==t.padding&&r.push(" "),(!1!==t.delimiterEnd||c!==u-1)&&r.push("|")}d.push(!1===t.delimiterEnd?r.join("").replace(/ +$/,""):r.join(""))}return d.join("\n")}function Fa(e){return null==e?"":String(e)}function Aa(e){return e.length}function Da(e){let t="string"==typeof e?e.codePointAt(0):0;return 67===t||99===t?99:76===t||108===t?108:82===t||114===t?114:0}Sa.peek=Ca;var Ta={enter:{table:Oa,tableData:za,tableHeader:za,tableRow:Pa},exit:{codeText:Ma,table:La,tableData:Ia,tableHeader:Ia,tableRow:Ia}};function Oa(e){let t=e._align;this.enter({type:"table",align:t.map((e=>"none"===e?null:e)),children:[]},e),this.setData("inTable",!0)}function La(e){this.exit(e),this.setData("inTable")}function Pa(e){this.enter({type:"tableRow",children:[]},e)}function Ia(e){this.exit(e)}function za(e){this.enter({type:"tableCell",children:[]},e)}function Ma(e){let t=this.resume();this.getData("inTable")&&(t=t.replace(/\\([\\|])/g,Ra));let n=this.stack[this.stack.length-1];n.value=t,this.exit(e)}function Ra(e,t){return"|"===t?t:e}function ja(e){let t=e||{},n=t.tableCellPadding,l=t.tablePipeAlign,i=t.stringLength,o=n?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:"\n",inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[\t :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{table:a,tableRow:u,tableCell:s,inlineCode:d}};function a(e,t,n,r){return c(f(e,n,r),e.align)}function u(e,t,n,r){let l=p(e,n,r),i=c([l]);return i.slice(0,i.indexOf("\n"))}function s(e,t,n,l){let i=n.enter("tableCell"),a=n.enter("phrasing"),u=ga(e,n,(0,r.b)((0,r.a)({},l),{before:o,after:o}));return a(),i(),u}function c(e,t){return Ea(e,{align:t,alignDelimiters:l,padding:n,stringLength:i})}function f(e,t,n){let r=e.children,l=-1,i=[],o=t.enter("table");for(;++l<r.length;)i[l]=p(r[l],t,n);return o(),i}function p(e,t,n){let r=e.children,l=-1,i=[],o=t.enter("tableRow");for(;++l<r.length;)i[l]=s(r[l],e,t,n);return o(),i}function d(e,t,n){let r=Sa(e,t,n);return n.stack.includes("tableCell")&&(r=r.replace(/\|/g,"\\$&")),r}}function _a(e){let t=e.options.bullet||"*";if("*"!==t&&"+"!==t&&"-"!==t)throw new Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function Ba(e){let t=e.options.listItemIndent||"tab";if(1===t||"1"===t)return"one";if("tab"!==t&&"one"!==t&&"mixed"!==t)throw new Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function Na(e,t,n,r){let l=Ba(n),i=n.bulletCurrent||_a(n);t&&"list"===t.type&&t.ordered&&(i=("number"==typeof t.start&&t.start>-1?t.start:1)+(!1===n.options.incrementListMarker?0:t.children.indexOf(e))+i);let o=i.length+1;("tab"===l||"mixed"===l&&(t&&"list"===t.type&&t.spread||e.spread))&&(o=4*Math.ceil(o/4));let a=n.createTracker(r);a.move(i+" ".repeat(o-i.length)),a.shift(o);let u=n.enter("listItem"),s=n.indentLines(n.containerFlow(e,a.current()),c);return u(),s;function c(e,t,n){return t?(n?"":" ".repeat(o))+e:(n?i:i+" ".repeat(o-i.length))+e}}var Ha={exit:{taskListCheckValueChecked:qa,taskListCheckValueUnchecked:qa,paragraph:Va}},Ua={unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:Wa}};function qa(e){let t=this.stack[this.stack.length-2];t.checked="taskListCheckValueChecked"===e.type}function Va(e){let t=this.stack[this.stack.length-2];if(t&&"listItem"===t.type&&"boolean"==typeof t.checked){let e=this.stack[this.stack.length-1],n=e.children[0];if(n&&"text"===n.type){let r,l=t.children,i=-1;for(;++i<l.length;){let e=l[i];if("paragraph"===e.type){r=e;break}}r===e&&(n.value=n.value.slice(1),0===n.value.length?e.children.shift():e.position&&n.position&&"number"==typeof n.position.start.offset&&(n.position.start.column++,n.position.start.offset++,e.position.start=Object.assign({},n.position.start)))}}this.exit(e)}function Wa(e,t,n,l){let i=e.children[0],o="boolean"==typeof e.checked&&i&&"paragraph"===i.type,a="["+(e.checked?"x":" ")+"] ",u=ea(l);o&&u.move(a);let s=Na(e,t,n,(0,r.a)((0,r.a)({},l),u.current()));return o&&(s=s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,c)),s;function c(e){return e+a}}function $a(){return[To,ta(),ya,Ta,Ha]}function Qa(e){return{extensions:[Oo,na(),ba,ja(e),Ua]}}function Ya(e={}){let t=this.data();function n(e,n){(t[e]?t[e]:t[e]=[]).push(n)}n("micromarkExtensions",ko(e)),n("fromMarkdownExtensions",$a()),n("toMarkdownExtensions",Qa(e))}var Ka=(0,r.f)((0,r.j)(),1);function Xa(e){return Ka.default.createElement("a",{href:e.href,target:"_blank",rel:"noreferrer"},e.children)}function Za({source:e}){return Ka.default.createElement(Ci,{components:{a:Xa},rehypePlugins:[Ya]},e)}
/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/}}]);
//# sourceMappingURL=344.72e848a9.js.map