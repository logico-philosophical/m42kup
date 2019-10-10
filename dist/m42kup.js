var m42kup=function(t){var e={};function r(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([function(t,e){function r(t){var e={};for(var r in t)e[r]=t[r];return e}function n(t){var e={};return t.tags&&(e.tags=r(t.tags)),t.hljs&&(e.hljs=t.hljs),t.katex&&(e.katex=t.katex),e}function a(t,e){for(var n in t=r(t),e)t[n]=e[n];return t}t.exports={copyOptions:n,tags:a,options:function(t,e){if("object"!=typeof t||"object"!=typeof e)throw TypeError("One of the options provided is not an object");return t=n(t),e.tags&&(t.tags||(t.tags={}),t.tags=a(t.tags,e.tags)),e.hljs&&(t.hljs=e.hljs),e.katex&&(t.katex=e.katex),t}}},function(t,e,r){var n=r(2),a=r(3),i=r(4),o=r(0),l={};var p={parser:n,renderer:a,highlighter:i,render:function(t,e){t+="",e||(e={}),e.tags||(e.tags={}),e=o.options(l,e);var r=n.input2pt(t),i=n.pt2ast(r);return a.ast2html(i,e)},highlight:function(t){t+="";var e=n.input2pt(t);return i.pt2hl(e)},cascade:function(t){if("object"!=typeof t)throw TypeError("typeof options != 'object'");l=o.options(l,t)},set:function(t){if("object"!=typeof t)throw TypeError("typeof options != 'object'");l=t}};t.exports=p},function(t,e){t.exports={input2pt:function(t){var e=[],r=[];function n(e){if("text"==e.type&&r.length&&"text"==r[r.length-1].type){var n=r.pop();e={type:"text",start:n.start,end:e.end,data:n.data+e.data}}if("right boundary marker"==e.type){for(var a=[e];;){if(!(l=r.pop()))throw new Error("No lbm found");if(a.unshift(l),"left boundary marker"==l.type&&l.level==e.level)break}var i=a[0].start,o=a[a.length-1].end;e={type:"element",start:i,end:o,data:t.substring(i,o),children:a}}if("right verbatim marker"==e.type){var l;for(a=[e];;){if(!(l=r.pop()))throw new Error("No lvm found");if(a.unshift(l),"left verbatim marker"==l.type&&l.level==e.level)break}var p=a[0].start,s=a[a.length-1].end;e={type:"verbatim",start:p,end:s,data:t.substring(p,s),children:a}}r.push(e)}for(var a=0;a<t.length;)if("`"==t[a]){var i=a;for(a++;a<t.length&&"<"==t[a];a++);var o=a-i;a<t.length-1&&"."==t[a]&&"<"==t[a+1]&&a++;var l=a;n({type:"left verbatim marker",start:i,end:l,data:t.substring(i,l),level:o}),e.push(-o);var p,s,h=">".repeat(o-1)+"`",d=t.indexOf(h,a),c=d>=0;c&&([p,s]=[d,d+h.length]),a=c?s:t.length,n({type:"text",start:O=l,end:T=c?p:a,data:t.substring(O,T)}),c&&(n({type:"right verbatim marker",start:p,end:s,data:t.substring(p,s),level:s-p}),e.pop())}else if("["==t[a]){var u=a;for(a++;a<t.length&&"<"==t[a];a++);var y=a;if(y-u<(x=e[e.length-1]||0)){n({type:"text",start:u,end:y,data:t.substring(u,y)});continue}e.push(y-u),n({type:"left boundary marker",start:u,end:y,data:t.substring(u,y),level:y-u});var f=a,m=f+t.substring(f).match(/^(?:(?:\*{1,3}|={1,6}|\${1,2}|;{1,3}|[!"#$%&')*+,\-\/;=>?@\\^_{|}~]|[a-z][a-z0-9]*)|)/i)[0].length;n({type:"tag name",start:f,end:m,data:t.substring(f,m)});var g=a=m,b=g+t.substring(g).match(/^(?:[.]|)/i)[0].length;n({type:"separator",start:g,end:b,data:t.substring(g,b)}),a=b}else if(">"==t[a]||"]"==t[a]){for(var x=e[e.length-1]||0,v=a;a<t.length&&">"==t[a];a++);var k=a;if(k==t.length||"]"!=t[k]){n({type:"text",start:v,end:k,data:t.substring(v,k)});continue}if(0==x){v<k&&n({type:"text",start:v,end:k,data:t.substring(v,k)});var w=a,E=++a;n({type:"mismatched right boundary marker",start:w,end:E,data:t.substring(w,E)});continue}if(++a-v<x){n({type:"text",start:v,end:a,data:t.substring(v,a)});continue}a-v>x&&n({type:"text",start:v,end:a-x,data:t.substring(v,a-x)});var $=a-x,j=a;n({type:"right boundary marker",start:$,end:j,data:t.substring($,j),level:j-$}),e.pop()}else{var T,O=a;for(a++;a<t.length&&!["[","]","`",">"].includes(t[a]);a++);n({type:"text",start:O,end:T=a,data:t.substring(O,T)})}for(var q=e.length-1;q>=0;q--){var N=e[q]>0?"right boundary marker":"right verbatim marker",S=e[q]>0?e[q]:-e[q];n({type:N,start:t.length,end:t.length,data:"",level:S})}return r},pt2ast:function(t){return function t(e){return e.map(e=>{switch(e.type){case"text":return{type:"text",text:e.data};case"verbatim":return{type:"text",text:e.children[1].data};case"element":return{type:"element",name:e.children[1].data,code:e.data,children:t(e.children.slice(3,-1))};case"mismatched right boundary marker":return{type:"error",text:e.data};default:throw new TypeError(`Unknown type: ${e.type}`)}}).reduce((t,e,r)=>{if("text"==e.type){if(!e.text)return t;if(r>0&&"text"==t[t.length-1].type)return t[t.length-1].text+=e.text,t}return t.push(e),t},[])}(t)}}},function(t,e,r){var n=t=>({type:"html",html:t}),a=t=>`<code class="m42kup-error">${i(t)}</code>`,i=t=>t.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),o=t=>{if("html"==t.type)return t;if("text"==t.type)return n(i(t.text));if("error"==t.type)return n(a(t.text));throw new TypeError(`Cannot convert type ${t.type} to HTML`)},l=(...t)=>e=>(t.forEach(t=>e=t(e)),e);function p({name:t,display:e,render:r}){if(!t)throw TypeError("!name");if(!["inline","leaf-block","container-block"].includes(e))throw TypeError('display != "inline" | "leaf-block" | "container-block"');if(!(r instanceof Function))throw TypeError("!(render instanceof Function)");[this.name,this.display,this.render]=[t,e,r]}var s={};s.comment=new p({name:"comment",display:"inline",render:t=>(t=>({type:"text",text:t}))("")}),s.entity=new p({name:"entity",display:"inline",render:t=>{if("text"!=t.type)throw TypeError("Non-text input");if(!/^([a-z]{1,50}|#[0-9]{1,10}|#x[0-9a-f]{1,10})$/i.test(t.text))throw SyntaxError("Invalid value");return n(`&${t.text};`)}}),["b","code","i","u","sup","sub"].forEach(t=>s[t]=new p({name:t,display:"inline",render:l(o,e=>n(`<${t}>${e.html}</${t}>`))})),["h1","h2","h3","h4","h5","h6","p"].forEach(t=>s[t]=new p({name:t,display:"leaf-block",render:l(o,e=>n(`<${t}>${e.html}</${t}>`))})),["blockquote","ol","ul","li","table","tr","td","th"].forEach(t=>s[t]=new p({name:t,display:"container-block",render:l(o,e=>n(`<${t}>${e.html}</${t}>`))})),["br","hr"].forEach(t=>s[t]=new p({name:t,display:"leaf-block",render:l(o,e=>n(`<${t}>${e.html}`))})),s.blockcode=new p({name:"blockcode",display:"leaf-block",render:l(o,t=>{var e=t.html.replace(/(^[ \t]*(\r\n|\r|\n))|((\r\n|\r|\n)[ \t]*$)/g,"");return n(`<pre><code>${e}\n</code></pre>`)})}),s.bi=new p({name:"bi",display:"inline",render:l(s.b.render,s.i.render)}),s.link=new p({name:"link",display:"inline",render:t=>{if("text"!=t.type)throw TypeError("Non-text input");if(/^(http:\/\/|https:\/\/)/.test(t.text)||(t.text="http://"+t.text),!/^(http:\/\/|https:\/\/)[a-z0-9]+(-+[a-z0-9]+)*(\.[a-z0-9]+(-+[a-z0-9]+)*)+\.?(:[0-9]{1,5})?(\/[^ ]*)?$/.test(t.text))throw Error("Invalid URL");return t=o(t),n(`<a href="${t.html}">${t.html}</a>`)}}),["squote","dquote"].forEach(t=>s[t]=new p({name:t,display:"inline",render:l(o,e=>{var r={squote:["‘","’"],dquote:["“","”"]};return n(`${r[t][0]}${e.html}${r[t][1]}`)})})),s.highlight=new p({name:"highlight",display:"leaf-block",render:(t,e)=>{if(!e.hljs)throw Error("Element not implemented (options.highlight not given)");if("text"!=t.type)throw TypeError("Non-text input");var r=t.text.replace(/(^[ \t]*(\r\n|\r|\n))|((\r\n|\r|\n)[ \t]*$)/g,""),a=e.hljs.highlightAuto(r,["apache","bash","coffeescript","cpp","cs","css","diff","http","ini","java","javascript","json","makefile","xml","markdown","nginx","objectivec","perl","php","python","ruby","sql"]).value;return n(`<pre class="hljs"><code>${a}\n</code></pre>`)}}),s.math=new p({name:"math",display:"inline",render:(t,e)=>{if(!e.katex)throw Error("Element not implemented (options.katex not given)");if("text"!=t.type)throw TypeError("Non-text input");var r=e.katex.renderToString(t.text,{throwOnError:!1,displayMode:!1,strict:"error"});return n(r)}}),s.displaymath=new p({name:"displaymath",display:"leaf-block",render:(t,e)=>{if(!e.katex)throw Error("Element not implemented (options.katex not given)");if("text"!=t.type)throw TypeError("Non-text input");var r=e.katex.renderToString(t.text,{throwOnError:!1,displayMode:!0,strict:"error"});return n(r)}});var h={'"':"dquote",$:"math",$$:"displaymath","%":"comment","&":"entity","'":"squote","*":"i","**":"b","***":"bi",";":"code",";;":"blockcode",";;;":"highlight","=":"h1","==":"h2","===":"h3","====":"h4","=====":"h5","======":"h6",">":"blockquote","\\":"br","^":"sup",_:"sub","~":"link"};for(var d in h){if(!s[h[d]])throw new TypeError(`aliases[${JSON.stringify(d)}] aliases non-existing function ${JSON.stringify(h[d])}`);s[d]=s[h[d]]}t.exports={ast2html:function(t,e){e||(e={}),e.tags||(e.tags={});var l=r(0).tags(s,e.tags);for(var p in l)!1===l[p]&&delete l[p];var h={type:"element",root:!0,children:t},d=t=>{t.display=t.root?"container-block":t.name in l?l[t.name].display:"inline",t.children.forEach(t=>"element"==t.type&&d(t))};d(h);var c=t=>{var r;try{if(!(t.root||t.name in l)){if(!t.name)throw Error("No tag name");throw Error("Undefined tag name")}if(t.children=t.children.map(e=>"element"==e.type?(e.displayContext=t.display,c(e)):e),t.children.every(t=>"text"==t.type)){var p=t.children.map(t=>t.text).join("");p&&"container-block"==t.display?t.content={type:"html",html:p.split(/(?:\r\n){2,}|\r{2,}|\n{2,}/).map(i).map(t=>`<p>${t}</p>`).join("")}:t.content={type:"text",text:p}}else if("container-block"==t.display){var s=[],h=[],d=()=>{h.length&&(s.push(h),h=[])},u=t=>h.push(t);t.children.forEach(t=>{if("text"==t.type){var e=t.text.split(/(?:\r\n){2,}|\r{2,}|\n{2,}/);if(e.length<2)return u(t);e.forEach((t,r)=>{t.length&&u({type:"text",text:t}),r<e.length-1&&d()})}else"inline"!=t.display?(d(),s.push(t),d()):u(t)}),d(),t.content={type:"html",html:s.map(t=>t instanceof Array?"<p>"+t.map(o).map(t=>t.html).join("")+"</p>":t.html).join("")}}else t.content={type:"html",html:t.children.map(o).map(t=>t.html).join("")};(r=t.root?t.content:l[t.name].render(t.content,e)).display=t.display}catch(e){(r=n(a(t.code))).display="inline"}finally{return r}};return o(c(h)).html},escapeHtml:i,htmlFilter:o,Element:p}},function(t,e){var r=t=>t.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function n(t){return`<span class="m42kup-hl-${t.type}">${t.html||r(t.text)}</span>`}t.exports={pt2hl:function t(e){for(var r="",a=0;a<e.length;a++)switch(e[a].type){case"text":r+=n({type:"tx",text:e[a].data});break;case"element":var i=n({type:"lbm",text:e[a].children[0].data})+n({type:"tn",text:e[a].children[1].data})+n({type:"sp",text:e[a].children[2].data})+t(e[a].children.slice(3,-1))+n({type:"rbm",text:e[a].children[e[a].children.length-1].data});r+=n({type:"elem",html:i});break;case"verbatim":i=n({type:"lvm",text:e[a].children[0].data})+n({type:"text",text:e[a].children[1].data})+n({type:"rvm",text:e[a].children[2].data}),r+=n({type:"verb",html:i});break;case"mismatched right boundary marker":r+=n({type:"mrbm",text:e[a].data})}return r}}}]);