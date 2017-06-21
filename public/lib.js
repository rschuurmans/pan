!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.io=e():t.io=e()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";function n(t,e){"object"===("undefined"==typeof t?"undefined":i(t))&&(e=t,t=void 0),e=e||{};var r,n=s(t),a=n.source,p=n.id,f=n.path,l=h[p]&&f in h[p].nsps,d=e.forceNew||e["force new connection"]||!1===e.multiplex||l;return d?(u("ignoring socket cache for %s",a),r=c(a,e)):(h[p]||(u("new io instance for %s",a),h[p]=c(a,e)),r=h[p]),n.query&&!e.query?e.query=n.query:e&&"object"===i(e.query)&&(e.query=o(e.query)),r.socket(n.path,e)}function o(t){var e=[];for(var r in t)t.hasOwnProperty(r)&&e.push(encodeURIComponent(r)+"="+encodeURIComponent(t[r]));return e.join("&")}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s=r(1),a=r(7),c=r(17),u=r(3)("socket.io-client");t.exports=e=n;var h=e.managers={};e.protocol=a.protocol,e.connect=n,e.Manager=r(17),e.Socket=r(44)},function(t,e,r){(function(e){"use strict";function n(t,r){var n=t;r=r||e.location,null==t&&(t=r.protocol+"//"+r.host),"string"==typeof t&&("/"===t.charAt(0)&&(t="/"===t.charAt(1)?r.protocol+t:r.host+t),/^(https?|wss?):\/\//.test(t)||(i("protocol-less url %s",t),t="undefined"!=typeof r?r.protocol+"//"+t:"https://"+t),i("parse %s",t),n=o(t)),n.port||(/^(http|ws)$/.test(n.protocol)?n.port="80":/^(http|ws)s$/.test(n.protocol)&&(n.port="443")),n.path=n.path||"/";var s=n.host.indexOf(":")!==-1,a=s?"["+n.host+"]":n.host;return n.id=n.protocol+"://"+a+":"+n.port,n.href=n.protocol+"://"+a+(r&&r.port===n.port?"":":"+n.port),n}var o=r(2),i=r(3)("socket.io-client:url");t.exports=n}).call(e,function(){return this}())},function(t,e){var r=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,n=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];t.exports=function(t){var e=t,o=t.indexOf("["),i=t.indexOf("]");o!=-1&&i!=-1&&(t=t.substring(0,o)+t.substring(o,i).replace(/:/g,";")+t.substring(i,t.length));for(var s=r.exec(t||""),a={},c=14;c--;)a[n[c]]=s[c]||"";return o!=-1&&i!=-1&&(a.source=e,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a}},function(t,e,r){(function(n){function o(){return"undefined"!=typeof document&&"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function i(){var t=arguments,r=this.useColors;if(t[0]=(r?"%c":"")+this.namespace+(r?" %c":" ")+t[0]+(r?"%c ":" ")+"+"+e.humanize(this.diff),!r)return t;var n="color: "+this.color;t=[t[0],n,"color: inherit"].concat(Array.prototype.slice.call(t,1));var o=0,i=0;return t[0].replace(/%[a-z%]/g,function(t){"%%"!==t&&(o++,"%c"===t&&(i=o))}),t.splice(i,0,n),t}function s(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function a(t){try{null==t?e.storage.removeItem("debug"):e.storage.debug=t}catch(t){}}function c(){try{return e.storage.debug}catch(t){}if("undefined"!=typeof n&&"env"in n)return n.env.DEBUG}function u(){try{return window.localStorage}catch(t){}}e=t.exports=r(5),e.log=s,e.formatArgs=i,e.save=a,e.load=c,e.useColors=o,e.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:u(),e.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],e.formatters.j=function(t){try{return JSON.stringify(t)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}},e.enable(c())}).call(e,r(4))},function(t,e){function r(){throw new Error("setTimeout has not been defined")}function n(){throw new Error("clearTimeout has not been defined")}function o(t){if(h===setTimeout)return setTimeout(t,0);if((h===r||!h)&&setTimeout)return h=setTimeout,setTimeout(t,0);try{return h(t,0)}catch(e){try{return h.call(null,t,0)}catch(e){return h.call(this,t,0)}}}function i(t){if(p===clearTimeout)return clearTimeout(t);if((p===n||!p)&&clearTimeout)return p=clearTimeout,clearTimeout(t);try{return p(t)}catch(e){try{return p.call(null,t)}catch(e){return p.call(this,t)}}}function s(){y&&l&&(y=!1,l.length?d=l.concat(d):g=-1,d.length&&a())}function a(){if(!y){var t=o(s);y=!0;for(var e=d.length;e;){for(l=d,d=[];++g<e;)l&&l[g].run();g=-1,e=d.length}l=null,y=!1,i(t)}}function c(t,e){this.fun=t,this.array=e}function u(){}var h,p,f=t.exports={};!function(){try{h="function"==typeof setTimeout?setTimeout:r}catch(t){h=r}try{p="function"==typeof clearTimeout?clearTimeout:n}catch(t){p=n}}();var l,d=[],y=!1,g=-1;f.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];d.push(new c(t,e)),1!==d.length||y||o(a)},c.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=u,f.addListener=u,f.once=u,f.off=u,f.removeListener=u,f.removeAllListeners=u,f.emit=u,f.binding=function(t){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(t){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},function(t,e,r){function n(){return e.colors[h++%e.colors.length]}function o(t){function r(){}function o(){var t=o,r=+new Date,i=r-(u||r);t.diff=i,t.prev=u,t.curr=r,u=r,null==t.useColors&&(t.useColors=e.useColors()),null==t.color&&t.useColors&&(t.color=n());for(var s=new Array(arguments.length),a=0;a<s.length;a++)s[a]=arguments[a];s[0]=e.coerce(s[0]),"string"!=typeof s[0]&&(s=["%o"].concat(s));var c=0;s[0]=s[0].replace(/%([a-z%])/g,function(r,n){if("%%"===r)return r;c++;var o=e.formatters[n];if("function"==typeof o){var i=s[c];r=o.call(t,i),s.splice(c,1),c--}return r}),s=e.formatArgs.apply(t,s);var h=o.log||e.log||console.log.bind(console);h.apply(t,s)}r.enabled=!1,o.enabled=!0;var i=e.enabled(t)?o:r;return i.namespace=t,i}function i(t){e.save(t);for(var r=(t||"").split(/[\s,]+/),n=r.length,o=0;o<n;o++)r[o]&&(t=r[o].replace(/[\\^$+?.()|[\]{}]/g,"\\$&").replace(/\*/g,".*?"),"-"===t[0]?e.skips.push(new RegExp("^"+t.substr(1)+"$")):e.names.push(new RegExp("^"+t+"$")))}function s(){e.enable("")}function a(t){var r,n;for(r=0,n=e.skips.length;r<n;r++)if(e.skips[r].test(t))return!1;for(r=0,n=e.names.length;r<n;r++)if(e.names[r].test(t))return!0;return!1}function c(t){return t instanceof Error?t.stack||t.message:t}e=t.exports=o.debug=o,e.coerce=c,e.disable=s,e.enable=i,e.enabled=a,e.humanize=r(6),e.names=[],e.skips=[],e.formatters={};var u,h=0},function(t,e){function r(t){if(t=String(t),!(t.length>1e4)){var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*h;case"days":case"day":case"d":return r*u;case"hours":case"hour":case"hrs":case"hr":case"h":return r*c;case"minutes":case"minute":case"mins":case"min":case"m":return r*a;case"seconds":case"second":case"secs":case"sec":case"s":return r*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function n(t){return t>=u?Math.round(t/u)+"d":t>=c?Math.round(t/c)+"h":t>=a?Math.round(t/a)+"m":t>=s?Math.round(t/s)+"s":t+"ms"}function o(t){return i(t,u,"day")||i(t,c,"hour")||i(t,a,"minute")||i(t,s,"second")||t+" ms"}function i(t,e,r){if(!(t<e))return t<1.5*e?Math.floor(t/e)+" "+r:Math.ceil(t/e)+" "+r+"s"}var s=1e3,a=60*s,c=60*a,u=24*c,h=365.25*u;t.exports=function(t,e){e=e||{};var i=typeof t;if("string"===i&&t.length>0)return r(t);if("number"===i&&isNaN(t)===!1)return e.long?o(t):n(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))}},function(t,e,r){function n(){}function o(t){var r="",n=!1;return r+=t.type,e.BINARY_EVENT!=t.type&&e.BINARY_ACK!=t.type||(r+=t.attachments,r+="-"),t.nsp&&"/"!=t.nsp&&(n=!0,r+=t.nsp),null!=t.id&&(n&&(r+=",",n=!1),r+=t.id),null!=t.data&&(n&&(r+=","),r+=f.stringify(t.data)),p("encoded %j as %s",t,r),r}function i(t,e){function r(t){var r=d.deconstructPacket(t),n=o(r.packet),i=r.buffers;i.unshift(n),e(i)}d.removeBlobs(t,r)}function s(){this.reconstructor=null}function a(t){var r={},n=0;if(r.type=Number(t.charAt(0)),null==e.types[r.type])return h();if(e.BINARY_EVENT==r.type||e.BINARY_ACK==r.type){for(var o="";"-"!=t.charAt(++n)&&(o+=t.charAt(n),n!=t.length););if(o!=Number(o)||"-"!=t.charAt(n))throw new Error("Illegal attachments");r.attachments=Number(o)}if("/"==t.charAt(n+1))for(r.nsp="";++n;){var i=t.charAt(n);if(","==i)break;if(r.nsp+=i,n==t.length)break}else r.nsp="/";var s=t.charAt(n+1);if(""!==s&&Number(s)==s){for(r.id="";++n;){var i=t.charAt(n);if(null==i||Number(i)!=i){--n;break}if(r.id+=t.charAt(n),n==t.length)break}r.id=Number(r.id)}return t.charAt(++n)&&(r=c(r,t.substr(n))),p("decoded %s as %j",t,r),r}function c(t,e){try{t.data=f.parse(e)}catch(t){return h()}return t}function u(t){this.reconPack=t,this.buffers=[]}function h(t){return{type:e.ERROR,data:"parser error"}}var p=r(8)("socket.io-parser"),f=r(11),l=r(13),d=r(14),y=r(16);e.protocol=4,e.types=["CONNECT","DISCONNECT","EVENT","ACK","ERROR","BINARY_EVENT","BINARY_ACK"],e.CONNECT=0,e.DISCONNECT=1,e.EVENT=2,e.ACK=3,e.ERROR=4,e.BINARY_EVENT=5,e.BINARY_ACK=6,e.Encoder=n,e.Decoder=s,n.prototype.encode=function(t,r){if(p("encoding packet %j",t),e.BINARY_EVENT==t.type||e.BINARY_ACK==t.type)i(t,r);else{var n=o(t);r([n])}},l(s.prototype),s.prototype.add=function(t){var r;if("string"==typeof t)r=a(t),e.BINARY_EVENT==r.type||e.BINARY_ACK==r.type?(this.reconstructor=new u(r),0===this.reconstructor.reconPack.attachments&&this.emit("decoded",r)):this.emit("decoded",r);else{if(!y(t)&&!t.base64)throw new Error("Unknown type: "+t);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");r=this.reconstructor.takeBinaryData(t),r&&(this.reconstructor=null,this.emit("decoded",r))}},s.prototype.destroy=function(){this.reconstructor&&this.reconstructor.finishedReconstruction()},u.prototype.takeBinaryData=function(t){if(this.buffers.push(t),this.buffers.length==this.reconPack.attachments){var e=d.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null},u.prototype.finishedReconstruction=function(){this.reconPack=null,this.buffers=[]}},function(t,e,r){function n(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function o(){var t=arguments,r=this.useColors;if(t[0]=(r?"%c":"")+this.namespace+(r?" %c":" ")+t[0]+(r?"%c ":" ")+"+"+e.humanize(this.diff),!r)return t;var n="color: "+this.color;t=[t[0],n,"color: inherit"].concat(Array.prototype.slice.call(t,1));var o=0,i=0;return t[0].replace(/%[a-z%]/g,function(t){"%%"!==t&&(o++,"%c"===t&&(i=o))}),t.splice(i,0,n),t}function i(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function s(t){try{null==t?e.storage.removeItem("debug"):e.storage.debug=t}catch(t){}}function a(){var t;try{t=e.storage.debug}catch(t){}return t}function c(){try{return window.localStorage}catch(t){}}e=t.exports=r(9),e.log=i,e.formatArgs=o,e.save=s,e.load=a,e.useColors=n,e.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:c(),e.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],e.formatters.j=function(t){return JSON.stringify(t)},e.enable(a())},function(t,e,r){function n(){return e.colors[h++%e.colors.length]}function o(t){function r(){}function o(){var t=o,r=+new Date,i=r-(u||r);t.diff=i,t.prev=u,t.curr=r,u=r,null==t.useColors&&(t.useColors=e.useColors()),null==t.color&&t.useColors&&(t.color=n());var s=Array.prototype.slice.call(arguments);s[0]=e.coerce(s[0]),"string"!=typeof s[0]&&(s=["%o"].concat(s));var a=0;s[0]=s[0].replace(/%([a-z%])/g,function(r,n){if("%%"===r)return r;a++;var o=e.formatters[n];if("function"==typeof o){var i=s[a];r=o.call(t,i),s.splice(a,1),a--}return r}),"function"==typeof e.formatArgs&&(s=e.formatArgs.apply(t,s));var c=o.log||e.log||console.log.bind(console);c.apply(t,s)}r.enabled=!1,o.enabled=!0;var i=e.enabled(t)?o:r;return i.namespace=t,i}function i(t){e.save(t);for(var r=(t||"").split(/[\s,]+/),n=r.length,o=0;o<n;o++)r[o]&&(t=r[o].replace(/\*/g,".*?"),"-"===t[0]?e.skips.push(new RegExp("^"+t.substr(1)+"$")):e.names.push(new RegExp("^"+t+"$")))}function s(){e.enable("")}function a(t){var r,n;for(r=0,n=e.skips.length;r<n;r++)if(e.skips[r].test(t))return!1;for(r=0,n=e.names.length;r<n;r++)if(e.names[r].test(t))return!0;return!1}function c(t){return t instanceof Error?t.stack||t.message:t}e=t.exports=o,e.coerce=c,e.disable=s,e.enable=i,e.enabled=a,e.humanize=r(10),e.names=[],e.skips=[],e.formatters={};var u,h=0},function(t,e){function r(t){if(t=""+t,!(t.length>1e4)){var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*h;case"days":case"day":case"d":return r*u;case"hours":case"hour":case"hrs":case"hr":case"h":return r*c;case"minutes":case"minute":case"mins":case"min":case"m":return r*a;case"seconds":case"second":case"secs":case"sec":case"s":return r*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r}}}}function n(t){return t>=u?Math.round(t/u)+"d":t>=c?Math.round(t/c)+"h":t>=a?Math.round(t/a)+"m":t>=s?Math.round(t/s)+"s":t+"ms"}function o(t){return i(t,u,"day")||i(t,c,"hour")||i(t,a,"minute")||i(t,s,"second")||t+" ms"}function i(t,e,r){if(!(t<e))return t<1.5*e?Math.floor(t/e)+" "+r:Math.ceil(t/e)+" "+r+"s"}var s=1e3,a=60*s,c=60*a,u=24*c,h=365.25*u;t.exports=function(t,e){return e=e||{},"string"==typeof t?r(t):e.long?o(t):n(t)}},function(t,e,r){(function(t,r){var n=!1;(function(){function o(t,e){function r(t){if(r[t]!==g)return r[t];var o;if("bug-string-char-index"==t)o="a"!="a"[0];else if("json"==t)o=r("json-stringify")&&r("json-parse");else{var s,a='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if("json-stringify"==t){var c=e.stringify,h="function"==typeof c&&b;if(h){(s=function(){return 1}).toJSON=s;try{h="0"===c(0)&&"0"===c(new n)&&'""'==c(new i)&&c(v)===g&&c(g)===g&&c()===g&&"1"===c(s)&&"[1]"==c([s])&&"[null]"==c([g])&&"null"==c(null)&&"[null,null,null]"==c([g,v,null])&&c({a:[s,!0,!1,null,"\0\b\n\f\r\t"]})==a&&"1"===c(null,s)&&"[\n 1,\n 2\n]"==c([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==c(new u(-864e13))&&'"+275760-09-13T00:00:00.000Z"'==c(new u(864e13))&&'"-000001-01-01T00:00:00.000Z"'==c(new u(-621987552e5))&&'"1969-12-31T23:59:59.999Z"'==c(new u(-1))}catch(t){h=!1}}o=h}if("json-parse"==t){var p=e.parse;if("function"==typeof p)try{if(0===p("0")&&!p(!1)){s=p(a);var f=5==s.a.length&&1===s.a[0];if(f){try{f=!p('"\t"')}catch(t){}if(f)try{f=1!==p("01")}catch(t){}if(f)try{f=1!==p("1.")}catch(t){}}}}catch(t){f=!1}o=f}}return r[t]=!!o}t||(t=c.Object()),e||(e=c.Object());var n=t.Number||c.Number,i=t.String||c.String,a=t.Object||c.Object,u=t.Date||c.Date,h=t.SyntaxError||c.SyntaxError,p=t.TypeError||c.TypeError,f=t.Math||c.Math,l=t.JSON||c.JSON;"object"==typeof l&&l&&(e.stringify=l.stringify,e.parse=l.parse);var d,y,g,m=a.prototype,v=m.toString,b=new u(-0xc782b5b800cec);try{b=b.getUTCFullYear()==-109252&&0===b.getUTCMonth()&&1===b.getUTCDate()&&10==b.getUTCHours()&&37==b.getUTCMinutes()&&6==b.getUTCSeconds()&&708==b.getUTCMilliseconds()}catch(t){}if(!r("json")){var w="[object Function]",k="[object Date]",x="[object Number]",A="[object String]",C="[object Array]",B="[object Boolean]",S=r("bug-string-char-index");if(!b)var T=f.floor,E=[0,31,59,90,120,151,181,212,243,273,304,334],_=function(t,e){return E[e]+365*(t-1970)+T((t-1969+(e=+(e>1)))/4)-T((t-1901+e)/100)+T((t-1601+e)/400)};if((d=m.hasOwnProperty)||(d=function(t){var e,r={};return(r.__proto__=null,r.__proto__={toString:1},r).toString!=v?d=function(t){var e=this.__proto__,r=t in(this.__proto__=null,this);return this.__proto__=e,r}:(e=r.constructor,d=function(t){var r=(this.constructor||e).prototype;return t in this&&!(t in r&&this[t]===r[t])}),r=null,d.call(this,t)}),y=function(t,e){var r,n,o,i=0;(r=function(){this.valueOf=0}).prototype.valueOf=0,n=new r;for(o in n)d.call(n,o)&&i++;return r=n=null,i?y=2==i?function(t,e){var r,n={},o=v.call(t)==w;for(r in t)o&&"prototype"==r||d.call(n,r)||!(n[r]=1)||!d.call(t,r)||e(r)}:function(t,e){var r,n,o=v.call(t)==w;for(r in t)o&&"prototype"==r||!d.call(t,r)||(n="constructor"===r)||e(r);(n||d.call(t,r="constructor"))&&e(r)}:(n=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"],y=function(t,e){var r,o,i=v.call(t)==w,a=!i&&"function"!=typeof t.constructor&&s[typeof t.hasOwnProperty]&&t.hasOwnProperty||d;for(r in t)i&&"prototype"==r||!a.call(t,r)||e(r);for(o=n.length;r=n[--o];a.call(t,r)&&e(r));}),y(t,e)},!r("json-stringify")){var N={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},j="000000",O=function(t,e){return(j+(e||0)).slice(-t)},P="\\u00",R=function(t){for(var e='"',r=0,n=t.length,o=!S||n>10,i=o&&(S?t.split(""):t);r<n;r++){var s=t.charCodeAt(r);switch(s){case 8:case 9:case 10:case 12:case 13:case 34:case 92:e+=N[s];break;default:if(s<32){e+=P+O(2,s.toString(16));break}e+=o?i[r]:t.charAt(r)}}return e+'"'},D=function(t,e,r,n,o,i,s){var a,c,u,h,f,l,m,b,w,S,E,N,j,P,q,U;try{a=e[t]}catch(t){}if("object"==typeof a&&a)if(c=v.call(a),c!=k||d.call(a,"toJSON"))"function"==typeof a.toJSON&&(c!=x&&c!=A&&c!=C||d.call(a,"toJSON"))&&(a=a.toJSON(t));else if(a>-1/0&&a<1/0){if(_){for(f=T(a/864e5),u=T(f/365.2425)+1970-1;_(u+1,0)<=f;u++);for(h=T((f-_(u,0))/30.42);_(u,h+1)<=f;h++);f=1+f-_(u,h),l=(a%864e5+864e5)%864e5,m=T(l/36e5)%24,b=T(l/6e4)%60,w=T(l/1e3)%60,S=l%1e3}else u=a.getUTCFullYear(),h=a.getUTCMonth(),f=a.getUTCDate(),m=a.getUTCHours(),b=a.getUTCMinutes(),w=a.getUTCSeconds(),S=a.getUTCMilliseconds();a=(u<=0||u>=1e4?(u<0?"-":"+")+O(6,u<0?-u:u):O(4,u))+"-"+O(2,h+1)+"-"+O(2,f)+"T"+O(2,m)+":"+O(2,b)+":"+O(2,w)+"."+O(3,S)+"Z"}else a=null;if(r&&(a=r.call(e,t,a)),null===a)return"null";if(c=v.call(a),c==B)return""+a;if(c==x)return a>-1/0&&a<1/0?""+a:"null";if(c==A)return R(""+a);if("object"==typeof a){for(P=s.length;P--;)if(s[P]===a)throw p();if(s.push(a),E=[],q=i,i+=o,c==C){for(j=0,P=a.length;j<P;j++)N=D(j,a,r,n,o,i,s),E.push(N===g?"null":N);U=E.length?o?"[\n"+i+E.join(",\n"+i)+"\n"+q+"]":"["+E.join(",")+"]":"[]"}else y(n||a,function(t){var e=D(t,a,r,n,o,i,s);e!==g&&E.push(R(t)+":"+(o?" ":"")+e)}),U=E.length?o?"{\n"+i+E.join(",\n"+i)+"\n"+q+"}":"{"+E.join(",")+"}":"{}";return s.pop(),U}};e.stringify=function(t,e,r){var n,o,i,a;if(s[typeof e]&&e)if((a=v.call(e))==w)o=e;else if(a==C){i={};for(var c,u=0,h=e.length;u<h;c=e[u++],a=v.call(c),(a==A||a==x)&&(i[c]=1));}if(r)if((a=v.call(r))==x){if((r-=r%1)>0)for(n="",r>10&&(r=10);n.length<r;n+=" ");}else a==A&&(n=r.length<=10?r:r.slice(0,10));return D("",(c={},c[""]=t,c),o,i,n,"",[])}}if(!r("json-parse")){var q,U,M=i.fromCharCode,L={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},I=function(){throw q=U=null,h()},H=function(){for(var t,e,r,n,o,i=U,s=i.length;q<s;)switch(o=i.charCodeAt(q)){case 9:case 10:case 13:case 32:q++;break;case 123:case 125:case 91:case 93:case 58:case 44:return t=S?i.charAt(q):i[q],q++,t;case 34:for(t="@",q++;q<s;)if(o=i.charCodeAt(q),o<32)I();else if(92==o)switch(o=i.charCodeAt(++q)){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:t+=L[o],q++;break;case 117:for(e=++q,r=q+4;q<r;q++)o=i.charCodeAt(q),o>=48&&o<=57||o>=97&&o<=102||o>=65&&o<=70||I();t+=M("0x"+i.slice(e,q));break;default:I()}else{if(34==o)break;for(o=i.charCodeAt(q),e=q;o>=32&&92!=o&&34!=o;)o=i.charCodeAt(++q);t+=i.slice(e,q)}if(34==i.charCodeAt(q))return q++,t;I();default:if(e=q,45==o&&(n=!0,o=i.charCodeAt(++q)),o>=48&&o<=57){for(48==o&&(o=i.charCodeAt(q+1),o>=48&&o<=57)&&I(),n=!1;q<s&&(o=i.charCodeAt(q),o>=48&&o<=57);q++);if(46==i.charCodeAt(q)){for(r=++q;r<s&&(o=i.charCodeAt(r),o>=48&&o<=57);r++);r==q&&I(),q=r}if(o=i.charCodeAt(q),101==o||69==o){for(o=i.charCodeAt(++q),43!=o&&45!=o||q++,r=q;r<s&&(o=i.charCodeAt(r),o>=48&&o<=57);r++);r==q&&I(),q=r}return+i.slice(e,q)}if(n&&I(),"true"==i.slice(q,q+4))return q+=4,!0;if("false"==i.slice(q,q+5))return q+=5,!1;if("null"==i.slice(q,q+4))return q+=4,null;I()}return"$"},z=function(t){var e,r;if("$"==t&&I(),"string"==typeof t){if("@"==(S?t.charAt(0):t[0]))return t.slice(1);if("["==t){for(e=[];t=H(),"]"!=t;r||(r=!0))r&&(","==t?(t=H(),"]"==t&&I()):I()),","==t&&I(),e.push(z(t));return e}if("{"==t){for(e={};t=H(),"}"!=t;r||(r=!0))r&&(","==t?(t=H(),"}"==t&&I()):I()),","!=t&&"string"==typeof t&&"@"==(S?t.charAt(0):t[0])&&":"==H()||I(),e[t.slice(1)]=z(H());return e}I()}return t},J=function(t,e,r){var n=X(t,e,r);n===g?delete t[e]:t[e]=n},X=function(t,e,r){var n,o=t[e];if("object"==typeof o&&o)if(v.call(o)==C)for(n=o.length;n--;)J(o,n,r);else y(o,function(t){J(o,t,r)});return r.call(t,e,o)};e.parse=function(t,e){var r,n;return q=0,U=""+t,r=z(H()),"$"!=H()&&I(),q=U=null,e&&v.call(e)==w?X((n={},n[""]=r,n),"",e):r}}}return e.runInContext=o,e}var i="function"==typeof n&&n.amd,s={function:!0,object:!0},a=s[typeof e]&&e&&!e.nodeType&&e,c=s[typeof window]&&window||this,u=a&&s[typeof t]&&t&&!t.nodeType&&"object"==typeof r&&r;if(!u||u.global!==u&&u.window!==u&&u.self!==u||(c=u),a&&!i)o(c,a);else{var h=c.JSON,p=c.JSON3,f=!1,l=o(c,c.JSON3={noConflict:function(){return f||(f=!0,c.JSON=h,c.JSON3=p,h=p=null),l}});c.JSON={parse:l.parse,stringify:l.stringify}}i&&n(function(){return l})}).call(this)}).call(e,r(12)(t),function(){return this}())},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(t,e){function r(t){if(t)return n(t)}function n(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}t.exports=r,r.prototype.on=r.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks[t]=this._callbacks[t]||[]).push(e),this},r.prototype.once=function(t,e){function r(){n.off(t,r),e.apply(this,arguments)}var n=this;return this._callbacks=this._callbacks||{},r.fn=e,this.on(t,r),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var r=this._callbacks[t];if(!r)return this;if(1==arguments.length)return delete this._callbacks[t],this;for(var n,o=0;o<r.length;o++)if(n=r[o],n===e||n.fn===e){r.splice(o,1);break}return this},r.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),r=this._callbacks[t];if(r){r=r.slice(0);for(var n=0,o=r.length;n<o;++n)r[n].apply(this,e)}return this},r.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks[t]||[]},r.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e,r){(function(t){var n=r(15),o=r(16);e.deconstructPacket=function(t){function e(t){if(!t)return t;if(o(t)){var i={_placeholder:!0,num:r.length};return r.push(t),i}if(n(t)){for(var s=new Array(t.length),a=0;a<t.length;a++)s[a]=e(t[a]);return s}if("object"==typeof t&&!(t instanceof Date)){var s={};for(var c in t)s[c]=e(t[c]);return s}return t}var r=[],i=t.data,s=t;return s.data=e(i),s.attachments=r.length,{packet:s,buffers:r}},e.reconstructPacket=function(t,e){function r(t){if(t&&t._placeholder){var o=e[t.num];return o}if(n(t)){for(var i=0;i<t.length;i++)t[i]=r(t[i]);return t}if(t&&"object"==typeof t){for(var s in t)t[s]=r(t[s]);return t}return t}return t.data=r(t.data),t.attachments=void 0,t},e.removeBlobs=function(e,r){function i(e,c,u){if(!e)return e;if(t.Blob&&e instanceof Blob||t.File&&e instanceof File){s++;var h=new FileReader;h.onload=function(){u?u[c]=this.result:a=this.result,--s||r(a)},h.readAsArrayBuffer(e)}else if(n(e))for(var p=0;p<e.length;p++)i(e[p],p,e);else if(e&&"object"==typeof e&&!o(e))for(var f in e)i(e[f],f,e)}var s=0,a=e;i(a),s||r(a)}}).call(e,function(){return this}())},function(t,e){t.exports=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)}},function(t,e){(function(e){function r(t){return e.Buffer&&e.Buffer.isBuffer(t)||e.ArrayBuffer&&t instanceof ArrayBuffer}t.exports=r}).call(e,function(){return this}())},function(t,e,r){"use strict";function n(t,e){return this instanceof n?(t&&"object"===("undefined"==typeof t?"undefined":o(t))&&(e=t,t=void 0),e=e||{},e.path=e.path||"/socket.io",this.nsps={},this.subs=[],this.opts=e,this.reconnection(e.reconnection!==!1),this.reconnectionAttempts(e.reconnectionAttempts||1/0),this.reconnectionDelay(e.reconnectionDelay||1e3),this.reconnectionDelayMax(e.reconnectionDelayMax||5e3),this.randomizationFactor(e.randomizationFactor||.5),this.backoff=new l({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(null==e.timeout?2e4:e.timeout),this.readyState="closed",this.uri=t,this.connecting=[],this.lastPing=null,this.encoding=!1,this.packetBuffer=[],this.encoder=new c.Encoder,this.decoder=new c.Decoder,this.autoConnect=e.autoConnect!==!1,void(this.autoConnect&&this.open())):new n(t,e)}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=r(18),s=r(44),a=r(35),c=r(7),u=r(46),h=r(47),p=r(3)("socket.io-client:manager"),f=r(42),l=r(48),d=Object.prototype.hasOwnProperty;t.exports=n,n.prototype.emitAll=function(){this.emit.apply(this,arguments);for(var t in this.nsps)d.call(this.nsps,t)&&this.nsps[t].emit.apply(this.nsps[t],arguments)},n.prototype.updateSocketIds=function(){for(var t in this.nsps)d.call(this.nsps,t)&&(this.nsps[t].id=this.engine.id)},a(n.prototype),n.prototype.reconnection=function(t){return arguments.length?(this._reconnection=!!t,this):this._reconnection},n.prototype.reconnectionAttempts=function(t){return arguments.length?(this._reconnectionAttempts=t,this):this._reconnectionAttempts},n.prototype.reconnectionDelay=function(t){return arguments.length?(this._reconnectionDelay=t,this.backoff&&this.backoff.setMin(t),this):this._reconnectionDelay},n.prototype.randomizationFactor=function(t){return arguments.length?(this._randomizationFactor=t,this.backoff&&this.backoff.setJitter(t),this):this._randomizationFactor},n.prototype.reconnectionDelayMax=function(t){return arguments.length?(this._reconnectionDelayMax=t,this.backoff&&this.backoff.setMax(t),this):this._reconnectionDelayMax},n.prototype.timeout=function(t){return arguments.length?(this._timeout=t,this):this._timeout},n.prototype.maybeReconnectOnOpen=function(){!this.reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()},n.prototype.open=n.prototype.connect=function(t,e){if(p("readyState %s",this.readyState),~this.readyState.indexOf("open"))return this;p("opening %s",this.uri),this.engine=i(this.uri,this.opts);var r=this.engine,n=this;this.readyState="opening",this.skipReconnect=!1;var o=u(r,"open",function(){n.onopen(),t&&t()}),s=u(r,"error",function(e){if(p("connect_error"),n.cleanup(),n.readyState="closed",n.emitAll("connect_error",e),t){var r=new Error("Connection error");r.data=e,t(r)}else n.maybeReconnectOnOpen()});if(!1!==this._timeout){var a=this._timeout;p("connect attempt will timeout after %d",a);var c=setTimeout(function(){p("connect attempt timed out after %d",a),o.destroy(),r.close(),r.emit("error","timeout"),n.emitAll("connect_timeout",a)},a);this.subs.push({destroy:function(){clearTimeout(c)}})}return this.subs.push(o),this.subs.push(s),this},n.prototype.onopen=function(){p("open"),this.cleanup(),this.readyState="open",this.emit("open");var t=this.engine;this.subs.push(u(t,"data",h(this,"ondata"))),this.subs.push(u(t,"ping",h(this,"onping"))),this.subs.push(u(t,"pong",h(this,"onpong"))),this.subs.push(u(t,"error",h(this,"onerror"))),this.subs.push(u(t,"close",h(this,"onclose"))),this.subs.push(u(this.decoder,"decoded",h(this,"ondecoded")))},n.prototype.onping=function(){this.lastPing=new Date,this.emitAll("ping")},n.prototype.onpong=function(){this.emitAll("pong",new Date-this.lastPing)},n.prototype.ondata=function(t){this.decoder.add(t)},n.prototype.ondecoded=function(t){this.emit("packet",t)},n.prototype.onerror=function(t){p("error",t),this.emitAll("error",t)},n.prototype.socket=function(t,e){function r(){~f(o.connecting,n)||o.connecting.push(n)}var n=this.nsps[t];if(!n){n=new s(this,t,e),this.nsps[t]=n;var o=this;n.on("connecting",r),n.on("connect",function(){n.id=o.engine.id}),this.autoConnect&&r()}return n},n.prototype.destroy=function(t){var e=f(this.connecting,t);~e&&this.connecting.splice(e,1),this.connecting.length||this.close()},n.prototype.packet=function(t){p("writing packet %j",t);var e=this;t.query&&0===t.type&&(t.nsp+="?"+t.query),e.encoding?e.packetBuffer.push(t):(e.encoding=!0,this.encoder.encode(t,function(r){for(var n=0;n<r.length;n++)e.engine.write(r[n],t.options);e.encoding=!1,e.processPacketQueue()}))},n.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var t=this.packetBuffer.shift();this.packet(t)}},n.prototype.cleanup=function(){p("cleanup");for(var t=this.subs.length,e=0;e<t;e++){var r=this.subs.shift();r.destroy()}this.packetBuffer=[],this.encoding=!1,this.lastPing=null,this.decoder.destroy()},n.prototype.close=n.prototype.disconnect=function(){p("disconnect"),this.skipReconnect=!0,this.reconnecting=!1,"opening"===this.readyState&&this.cleanup(),this.backoff.reset(),this.readyState="closed",this.engine&&this.engine.close()},n.prototype.onclose=function(t){p("onclose"),this.cleanup(),this.backoff.reset(),this.readyState="closed",this.emit("close",t),this._reconnection&&!this.skipReconnect&&this.reconnect()},n.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var t=this;if(this.backoff.attempts>=this._reconnectionAttempts)p("reconnect failed"),this.backoff.reset(),this.emitAll("reconnect_failed"),this.reconnecting=!1;else{var e=this.backoff.duration();p("will wait %dms before reconnect attempt",e),this.reconnecting=!0;var r=setTimeout(function(){t.skipReconnect||(p("attempting reconnect"),t.emitAll("reconnect_attempt",t.backoff.attempts),t.emitAll("reconnecting",t.backoff.attempts),t.skipReconnect||t.open(function(e){e?(p("reconnect attempt error"),t.reconnecting=!1,t.reconnect(),t.emitAll("reconnect_error",e.data)):(p("reconnect success"),t.onreconnect())}))},e);this.subs.push({destroy:function(){clearTimeout(r)}})}},n.prototype.onreconnect=function(){var t=this.backoff.attempts;this.reconnecting=!1,this.backoff.reset(),this.updateSocketIds(),this.emitAll("reconnect",t)}},function(t,e,r){t.exports=r(19)},function(t,e,r){t.exports=r(20),t.exports.parser=r(27)},function(t,e,r){(function(e){function n(t,r){if(!(this instanceof n))return new n(t,r);r=r||{},t&&"object"==typeof t&&(r=t,t=null),t?(t=h(t),r.hostname=t.host,r.secure="https"===t.protocol||"wss"===t.protocol,r.port=t.port,t.query&&(r.query=t.query)):r.host&&(r.hostname=h(r.host).host),
this.secure=null!=r.secure?r.secure:e.location&&"https:"===location.protocol,r.hostname&&!r.port&&(r.port=this.secure?"443":"80"),this.agent=r.agent||!1,this.hostname=r.hostname||(e.location?location.hostname:"localhost"),this.port=r.port||(e.location&&location.port?location.port:this.secure?443:80),this.query=r.query||{},"string"==typeof this.query&&(this.query=f.decode(this.query)),this.upgrade=!1!==r.upgrade,this.path=(r.path||"/engine.io").replace(/\/$/,"")+"/",this.forceJSONP=!!r.forceJSONP,this.jsonp=!1!==r.jsonp,this.forceBase64=!!r.forceBase64,this.enablesXDR=!!r.enablesXDR,this.timestampParam=r.timestampParam||"t",this.timestampRequests=r.timestampRequests,this.transports=r.transports||["polling","websocket"],this.readyState="",this.writeBuffer=[],this.prevBufferLen=0,this.policyPort=r.policyPort||843,this.rememberUpgrade=r.rememberUpgrade||!1,this.binaryType=null,this.onlyBinaryUpgrades=r.onlyBinaryUpgrades,this.perMessageDeflate=!1!==r.perMessageDeflate&&(r.perMessageDeflate||{}),!0===this.perMessageDeflate&&(this.perMessageDeflate={}),this.perMessageDeflate&&null==this.perMessageDeflate.threshold&&(this.perMessageDeflate.threshold=1024),this.pfx=r.pfx||null,this.key=r.key||null,this.passphrase=r.passphrase||null,this.cert=r.cert||null,this.ca=r.ca||null,this.ciphers=r.ciphers||null,this.rejectUnauthorized=void 0===r.rejectUnauthorized?null:r.rejectUnauthorized,this.forceNode=!!r.forceNode;var o="object"==typeof e&&e;o.global===o&&(r.extraHeaders&&Object.keys(r.extraHeaders).length>0&&(this.extraHeaders=r.extraHeaders),r.localAddress&&(this.localAddress=r.localAddress)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingIntervalTimer=null,this.pingTimeoutTimer=null,this.open()}function o(t){var e={};for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);return e}var i=r(21),s=r(35),a=r(3)("engine.io-client:socket"),c=r(42),u=r(27),h=r(2),p=r(43),f=r(36);t.exports=n,n.priorWebsocketSuccess=!1,s(n.prototype),n.protocol=u.protocol,n.Socket=n,n.Transport=r(26),n.transports=r(21),n.parser=r(27),n.prototype.createTransport=function(t){a('creating transport "%s"',t);var e=o(this.query);e.EIO=u.protocol,e.transport=t,this.id&&(e.sid=this.id);var r=new i[t]({agent:this.agent,hostname:this.hostname,port:this.port,secure:this.secure,path:this.path,query:e,forceJSONP:this.forceJSONP,jsonp:this.jsonp,forceBase64:this.forceBase64,enablesXDR:this.enablesXDR,timestampRequests:this.timestampRequests,timestampParam:this.timestampParam,policyPort:this.policyPort,socket:this,pfx:this.pfx,key:this.key,passphrase:this.passphrase,cert:this.cert,ca:this.ca,ciphers:this.ciphers,rejectUnauthorized:this.rejectUnauthorized,perMessageDeflate:this.perMessageDeflate,extraHeaders:this.extraHeaders,forceNode:this.forceNode,localAddress:this.localAddress});return r},n.prototype.open=function(){var t;if(this.rememberUpgrade&&n.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)t="websocket";else{if(0===this.transports.length){var e=this;return void setTimeout(function(){e.emit("error","No transports available")},0)}t=this.transports[0]}this.readyState="opening";try{t=this.createTransport(t)}catch(t){return this.transports.shift(),void this.open()}t.open(),this.setTransport(t)},n.prototype.setTransport=function(t){a("setting transport %s",t.name);var e=this;this.transport&&(a("clearing existing transport %s",this.transport.name),this.transport.removeAllListeners()),this.transport=t,t.on("drain",function(){e.onDrain()}).on("packet",function(t){e.onPacket(t)}).on("error",function(t){e.onError(t)}).on("close",function(){e.onClose("transport close")})},n.prototype.probe=function(t){function e(){if(f.onlyBinaryUpgrades){var e=!this.supportsBinary&&f.transport.supportsBinary;p=p||e}p||(a('probe transport "%s" opened',t),h.send([{type:"ping",data:"probe"}]),h.once("packet",function(e){if(!p)if("pong"===e.type&&"probe"===e.data){if(a('probe transport "%s" pong',t),f.upgrading=!0,f.emit("upgrading",h),!h)return;n.priorWebsocketSuccess="websocket"===h.name,a('pausing current transport "%s"',f.transport.name),f.transport.pause(function(){p||"closed"!==f.readyState&&(a("changing transport and sending upgrade packet"),u(),f.setTransport(h),h.send([{type:"upgrade"}]),f.emit("upgrade",h),h=null,f.upgrading=!1,f.flush())})}else{a('probe transport "%s" failed',t);var r=new Error("probe error");r.transport=h.name,f.emit("upgradeError",r)}}))}function r(){p||(p=!0,u(),h.close(),h=null)}function o(e){var n=new Error("probe error: "+e);n.transport=h.name,r(),a('probe transport "%s" failed because of error: %s',t,e),f.emit("upgradeError",n)}function i(){o("transport closed")}function s(){o("socket closed")}function c(t){h&&t.name!==h.name&&(a('"%s" works - aborting "%s"',t.name,h.name),r())}function u(){h.removeListener("open",e),h.removeListener("error",o),h.removeListener("close",i),f.removeListener("close",s),f.removeListener("upgrading",c)}a('probing transport "%s"',t);var h=this.createTransport(t,{probe:1}),p=!1,f=this;n.priorWebsocketSuccess=!1,h.once("open",e),h.once("error",o),h.once("close",i),this.once("close",s),this.once("upgrading",c),h.open()},n.prototype.onOpen=function(){if(a("socket open"),this.readyState="open",n.priorWebsocketSuccess="websocket"===this.transport.name,this.emit("open"),this.flush(),"open"===this.readyState&&this.upgrade&&this.transport.pause){a("starting upgrade probes");for(var t=0,e=this.upgrades.length;t<e;t++)this.probe(this.upgrades[t])}},n.prototype.onPacket=function(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(a('socket receive: type "%s", data "%s"',t.type,t.data),this.emit("packet",t),this.emit("heartbeat"),t.type){case"open":this.onHandshake(p(t.data));break;case"pong":this.setPing(),this.emit("pong");break;case"error":var e=new Error("server error");e.code=t.data,this.onError(e);break;case"message":this.emit("data",t.data),this.emit("message",t.data)}else a('packet received with socket readyState "%s"',this.readyState)},n.prototype.onHandshake=function(t){this.emit("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.onOpen(),"closed"!==this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat))},n.prototype.onHeartbeat=function(t){clearTimeout(this.pingTimeoutTimer);var e=this;e.pingTimeoutTimer=setTimeout(function(){"closed"!==e.readyState&&e.onClose("ping timeout")},t||e.pingInterval+e.pingTimeout)},n.prototype.setPing=function(){var t=this;clearTimeout(t.pingIntervalTimer),t.pingIntervalTimer=setTimeout(function(){a("writing ping packet - expecting pong within %sms",t.pingTimeout),t.ping(),t.onHeartbeat(t.pingTimeout)},t.pingInterval)},n.prototype.ping=function(){var t=this;this.sendPacket("ping",function(){t.emit("ping")})},n.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush()},n.prototype.flush=function(){"closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(a("flushing %d packets in socket",this.writeBuffer.length),this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))},n.prototype.write=n.prototype.send=function(t,e,r){return this.sendPacket("message",t,e,r),this},n.prototype.sendPacket=function(t,e,r,n){if("function"==typeof e&&(n=e,e=void 0),"function"==typeof r&&(n=r,r=null),"closing"!==this.readyState&&"closed"!==this.readyState){r=r||{},r.compress=!1!==r.compress;var o={type:t,data:e,options:r};this.emit("packetCreate",o),this.writeBuffer.push(o),n&&this.once("flush",n),this.flush()}},n.prototype.close=function(){function t(){n.onClose("forced close"),a("socket closing - telling transport to close"),n.transport.close()}function e(){n.removeListener("upgrade",e),n.removeListener("upgradeError",e),t()}function r(){n.once("upgrade",e),n.once("upgradeError",e)}if("opening"===this.readyState||"open"===this.readyState){this.readyState="closing";var n=this;this.writeBuffer.length?this.once("drain",function(){this.upgrading?r():t()}):this.upgrading?r():t()}return this},n.prototype.onError=function(t){a("socket error %j",t),n.priorWebsocketSuccess=!1,this.emit("error",t),this.onClose("transport error",t)},n.prototype.onClose=function(t,e){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState){a('socket close with reason: "%s"',t);var r=this;clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),this.readyState="closed",this.id=null,this.emit("close",t,e),r.writeBuffer=[],r.prevBufferLen=0}},n.prototype.filterUpgrades=function(t){for(var e=[],r=0,n=t.length;r<n;r++)~c(this.transports,t[r])&&e.push(t[r]);return e}}).call(e,function(){return this}())},function(t,e,r){(function(t){function n(e){var r,n=!1,a=!1,c=!1!==e.jsonp;if(t.location){var u="https:"===location.protocol,h=location.port;h||(h=u?443:80),n=e.hostname!==location.hostname||h!==e.port,a=e.secure!==u}if(e.xdomain=n,e.xscheme=a,r=new o(e),"open"in r&&!e.forceJSONP)return new i(e);if(!c)throw new Error("JSONP disabled");return new s(e)}var o=r(22),i=r(24),s=r(39),a=r(40);e.polling=n,e.websocket=a}).call(e,function(){return this}())},function(t,e,r){(function(e){var n=r(23);t.exports=function(t){var r=t.xdomain,o=t.xscheme,i=t.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!r||n))return new XMLHttpRequest}catch(t){}try{if("undefined"!=typeof XDomainRequest&&!o&&i)return new XDomainRequest}catch(t){}if(!r)try{return new(e[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(t){}}}).call(e,function(){return this}())},function(t,e){try{t.exports="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(e){t.exports=!1}},function(t,e,r){(function(e){function n(){}function o(t){if(c.call(this,t),this.requestTimeout=t.requestTimeout,e.location){var r="https:"===location.protocol,n=location.port;n||(n=r?443:80),this.xd=t.hostname!==e.location.hostname||n!==t.port,this.xs=t.secure!==r}else this.extraHeaders=t.extraHeaders}function i(t){this.method=t.method||"GET",this.uri=t.uri,this.xd=!!t.xd,this.xs=!!t.xs,this.async=!1!==t.async,this.data=void 0!==t.data?t.data:null,this.agent=t.agent,this.isBinary=t.isBinary,this.supportsBinary=t.supportsBinary,this.enablesXDR=t.enablesXDR,this.requestTimeout=t.requestTimeout,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.extraHeaders=t.extraHeaders,this.create()}function s(){for(var t in i.requests)i.requests.hasOwnProperty(t)&&i.requests[t].abort()}var a=r(22),c=r(25),u=r(35),h=r(37),p=r(3)("engine.io-client:polling-xhr");t.exports=o,t.exports.Request=i,h(o,c),o.prototype.supportsBinary=!0,o.prototype.request=function(t){return t=t||{},t.uri=this.uri(),t.xd=this.xd,t.xs=this.xs,t.agent=this.agent||!1,t.supportsBinary=this.supportsBinary,t.enablesXDR=this.enablesXDR,t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized,t.requestTimeout=this.requestTimeout,t.extraHeaders=this.extraHeaders,new i(t)},o.prototype.doWrite=function(t,e){var r="string"!=typeof t&&void 0!==t,n=this.request({method:"POST",data:t,isBinary:r}),o=this;n.on("success",e),n.on("error",function(t){o.onError("xhr post error",t)}),this.sendXhr=n},o.prototype.doPoll=function(){p("xhr poll");var t=this.request(),e=this;t.on("data",function(t){e.onData(t)}),t.on("error",function(t){e.onError("xhr poll error",t)}),this.pollXhr=t},u(i.prototype),i.prototype.create=function(){var t={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized;var r=this.xhr=new a(t),n=this;try{p("xhr open %s: %s",this.method,this.uri),r.open(this.method,this.uri,this.async);try{if(this.extraHeaders){r.setDisableHeaderCheck(!0);for(var o in this.extraHeaders)this.extraHeaders.hasOwnProperty(o)&&r.setRequestHeader(o,this.extraHeaders[o])}}catch(t){}if(this.supportsBinary&&(r.responseType="arraybuffer"),"POST"===this.method)try{this.isBinary?r.setRequestHeader("Content-type","application/octet-stream"):r.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(t){}try{r.setRequestHeader("Accept","*/*")}catch(t){}"withCredentials"in r&&(r.withCredentials=!0),this.requestTimeout&&(r.timeout=this.requestTimeout),this.hasXDR()?(r.onload=function(){n.onLoad()},r.onerror=function(){n.onError(r.responseText)}):r.onreadystatechange=function(){4===r.readyState&&(200===r.status||1223===r.status?n.onLoad():setTimeout(function(){n.onError(r.status)},0))},p("xhr data %s",this.data),r.send(this.data)}catch(t){return void setTimeout(function(){n.onError(t)},0)}e.document&&(this.index=i.requestsCount++,i.requests[this.index]=this)},i.prototype.onSuccess=function(){this.emit("success"),this.cleanup()},i.prototype.onData=function(t){this.emit("data",t),this.onSuccess()},i.prototype.onError=function(t){this.emit("error",t),this.cleanup(!0)},i.prototype.cleanup=function(t){if("undefined"!=typeof this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=n:this.xhr.onreadystatechange=n,t)try{this.xhr.abort()}catch(t){}e.document&&delete i.requests[this.index],this.xhr=null}},i.prototype.onLoad=function(){var t;try{var e;try{e=this.xhr.getResponseHeader("Content-Type").split(";")[0]}catch(t){}if("application/octet-stream"===e)t=this.xhr.response||this.xhr.responseText;else if(this.supportsBinary)try{t=String.fromCharCode.apply(null,new Uint8Array(this.xhr.response))}catch(e){for(var r=new Uint8Array(this.xhr.response),n=[],o=0,i=r.length;o<i;o++)n.push(r[o]);t=String.fromCharCode.apply(null,n)}else t=this.xhr.responseText}catch(t){this.onError(t)}null!=t&&this.onData(t)},i.prototype.hasXDR=function(){return"undefined"!=typeof e.XDomainRequest&&!this.xs&&this.enablesXDR},i.prototype.abort=function(){this.cleanup()},i.requestsCount=0,i.requests={},e.document&&(e.attachEvent?e.attachEvent("onunload",s):e.addEventListener&&e.addEventListener("beforeunload",s,!1))}).call(e,function(){return this}())},function(t,e,r){function n(t){var e=t&&t.forceBase64;h&&!e||(this.supportsBinary=!1),o.call(this,t)}var o=r(26),i=r(36),s=r(27),a=r(37),c=r(38),u=r(3)("engine.io-client:polling");t.exports=n;var h=function(){var t=r(22),e=new t({xdomain:!1});return null!=e.responseType}();a(n,o),n.prototype.name="polling",n.prototype.doOpen=function(){this.poll()},n.prototype.pause=function(t){function e(){u("paused"),r.readyState="paused",t()}var r=this;if(this.readyState="pausing",this.polling||!this.writable){var n=0;this.polling&&(u("we are currently polling - waiting to pause"),n++,this.once("pollComplete",function(){u("pre-pause polling complete"),--n||e()})),this.writable||(u("we are currently writing - waiting to pause"),n++,this.once("drain",function(){u("pre-pause writing complete"),--n||e()}))}else e()},n.prototype.poll=function(){u("polling"),this.polling=!0,this.doPoll(),this.emit("poll")},n.prototype.onData=function(t){var e=this;u("polling got data %s",t);var r=function(t,r,n){return"opening"===e.readyState&&e.onOpen(),"close"===t.type?(e.onClose(),!1):void e.onPacket(t)};s.decodePayload(t,this.socket.binaryType,r),"closed"!==this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"===this.readyState?this.poll():u('ignoring poll - transport state "%s"',this.readyState))},n.prototype.doClose=function(){function t(){u("writing close packet"),e.write([{type:"close"}])}var e=this;"open"===this.readyState?(u("transport open - closing"),t()):(u("transport not open - deferring close"),this.once("open",t))},n.prototype.write=function(t){var e=this;this.writable=!1;var r=function(){e.writable=!0,e.emit("drain")};s.encodePayload(t,this.supportsBinary,function(t){e.doWrite(t,r)})},n.prototype.uri=function(){var t=this.query||{},e=this.secure?"https":"http",r="";!1!==this.timestampRequests&&(t[this.timestampParam]=c()),this.supportsBinary||t.sid||(t.b64=1),t=i.encode(t),this.port&&("https"===e&&443!==Number(this.port)||"http"===e&&80!==Number(this.port))&&(r=":"+this.port),t.length&&(t="?"+t);var n=this.hostname.indexOf(":")!==-1;return e+"://"+(n?"["+this.hostname+"]":this.hostname)+r+this.path+t}},function(t,e,r){function n(t){this.path=t.path,this.hostname=t.hostname,this.port=t.port,this.secure=t.secure,this.query=t.query,this.timestampParam=t.timestampParam,this.timestampRequests=t.timestampRequests,this.readyState="",this.agent=t.agent||!1,this.socket=t.socket,this.enablesXDR=t.enablesXDR,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.forceNode=t.forceNode,this.extraHeaders=t.extraHeaders,this.localAddress=t.localAddress}var o=r(27),i=r(35);t.exports=n,i(n.prototype),n.prototype.onError=function(t,e){var r=new Error(t);return r.type="TransportError",r.description=e,this.emit("error",r),this},n.prototype.open=function(){return"closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this},n.prototype.close=function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this},n.prototype.send=function(t){if("open"!==this.readyState)throw new Error("Transport not open");this.write(t)},n.prototype.onOpen=function(){this.readyState="open",this.writable=!0,this.emit("open")},n.prototype.onData=function(t){var e=o.decodePacket(t,this.socket.binaryType);this.onPacket(e)},n.prototype.onPacket=function(t){this.emit("packet",t)},n.prototype.onClose=function(){this.readyState="closed",this.emit("close")}},function(t,e,r){(function(t){function n(t,r){var n="b"+e.packets[t.type]+t.data.data;return r(n)}function o(t,r,n){if(!r)return e.encodeBase64Packet(t,n);var o=t.data,i=new Uint8Array(o),s=new Uint8Array(1+o.byteLength);s[0]=v[t.type];for(var a=0;a<i.length;a++)s[a+1]=i[a];return n(s.buffer)}function i(t,r,n){if(!r)return e.encodeBase64Packet(t,n);var o=new FileReader;return o.onload=function(){t.data=o.result,e.encodePacket(t,r,!0,n)},o.readAsArrayBuffer(t.data)}function s(t,r,n){if(!r)return e.encodeBase64Packet(t,n);if(m)return i(t,r,n);var o=new Uint8Array(1);o[0]=v[t.type];var s=new k([o.buffer,t.data]);return n(s)}function a(t){try{t=d.decode(t)}catch(t){return!1}return t}function c(t,e,r){for(var n=new Array(t.length),o=l(t.length,r),i=function(t,r,o){e(r,function(e,r){n[t]=r,o(e,n)})},s=0;s<t.length;s++)i(s,t[s],o)}var u,h=r(28),p=r(29),f=r(30),l=r(31),d=r(32);t&&t.ArrayBuffer&&(u=r(33));var y="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),g="undefined"!=typeof navigator&&/PhantomJS/i.test(navigator.userAgent),m=y||g;e.protocol=3;var v=e.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6},b=h(v),w={type:"error",data:"parser error"},k=r(34);e.encodePacket=function(e,r,i,a){"function"==typeof r&&(a=r,r=!1),"function"==typeof i&&(a=i,i=null);var c=void 0===e.data?void 0:e.data.buffer||e.data;if(t.ArrayBuffer&&c instanceof ArrayBuffer)return o(e,r,a);if(k&&c instanceof t.Blob)return s(e,r,a);if(c&&c.base64)return n(e,a);var u=v[e.type];return void 0!==e.data&&(u+=i?d.encode(String(e.data)):String(e.data)),a(""+u)},e.encodeBase64Packet=function(r,n){var o="b"+e.packets[r.type];if(k&&r.data instanceof t.Blob){var i=new FileReader;return i.onload=function(){var t=i.result.split(",")[1];n(o+t)},i.readAsDataURL(r.data)}var s;try{s=String.fromCharCode.apply(null,new Uint8Array(r.data))}catch(t){for(var a=new Uint8Array(r.data),c=new Array(a.length),u=0;u<a.length;u++)c[u]=a[u];s=String.fromCharCode.apply(null,c)}return o+=t.btoa(s),n(o)},e.decodePacket=function(t,r,n){if(void 0===t)return w;if("string"==typeof t){if("b"==t.charAt(0))return e.decodeBase64Packet(t.substr(1),r);if(n&&(t=a(t),t===!1))return w;var o=t.charAt(0);return Number(o)==o&&b[o]?t.length>1?{type:b[o],data:t.substring(1)}:{type:b[o]}:w}var i=new Uint8Array(t),o=i[0],s=f(t,1);return k&&"blob"===r&&(s=new k([s])),{type:b[o],data:s}},e.decodeBase64Packet=function(t,e){var r=b[t.charAt(0)];if(!u)return{type:r,data:{base64:!0,data:t.substr(1)}};var n=u.decode(t.substr(1));return"blob"===e&&k&&(n=new k([n])),{type:r,data:n}},e.encodePayload=function(t,r,n){function o(t){return t.length+":"+t}function i(t,n){e.encodePacket(t,!!s&&r,!0,function(t){n(null,o(t))})}"function"==typeof r&&(n=r,r=null);var s=p(t);return r&&s?k&&!m?e.encodePayloadAsBlob(t,n):e.encodePayloadAsArrayBuffer(t,n):t.length?void c(t,i,function(t,e){return n(e.join(""))}):n("0:")},e.decodePayload=function(t,r,n){if("string"!=typeof t)return e.decodePayloadAsBinary(t,r,n);"function"==typeof r&&(n=r,r=null);var o;if(""==t)return n(w,0,1);for(var i,s,a="",c=0,u=t.length;c<u;c++){var h=t.charAt(c);if(":"!=h)a+=h;else{if(""==a||a!=(i=Number(a)))return n(w,0,1);if(s=t.substr(c+1,i),a!=s.length)return n(w,0,1);if(s.length){if(o=e.decodePacket(s,r,!0),w.type==o.type&&w.data==o.data)return n(w,0,1);var p=n(o,c+i,u);if(!1===p)return}c+=i,a=""}}return""!=a?n(w,0,1):void 0},e.encodePayloadAsArrayBuffer=function(t,r){function n(t,r){e.encodePacket(t,!0,!0,function(t){return r(null,t)})}return t.length?void c(t,n,function(t,e){var n=e.reduce(function(t,e){var r;return r="string"==typeof e?e.length:e.byteLength,t+r.toString().length+r+2},0),o=new Uint8Array(n),i=0;return e.forEach(function(t){var e="string"==typeof t,r=t;if(e){for(var n=new Uint8Array(t.length),s=0;s<t.length;s++)n[s]=t.charCodeAt(s);r=n.buffer}e?o[i++]=0:o[i++]=1;for(var a=r.byteLength.toString(),s=0;s<a.length;s++)o[i++]=parseInt(a[s]);o[i++]=255;for(var n=new Uint8Array(r),s=0;s<n.length;s++)o[i++]=n[s]}),r(o.buffer)}):r(new ArrayBuffer(0))},e.encodePayloadAsBlob=function(t,r){function n(t,r){e.encodePacket(t,!0,!0,function(t){var e=new Uint8Array(1);if(e[0]=1,"string"==typeof t){for(var n=new Uint8Array(t.length),o=0;o<t.length;o++)n[o]=t.charCodeAt(o);t=n.buffer,e[0]=0}for(var i=t instanceof ArrayBuffer?t.byteLength:t.size,s=i.toString(),a=new Uint8Array(s.length+1),o=0;o<s.length;o++)a[o]=parseInt(s[o]);if(a[s.length]=255,k){var c=new k([e.buffer,a.buffer,t]);r(null,c)}})}c(t,n,function(t,e){return r(new k(e))})},e.decodePayloadAsBinary=function(t,r,n){"function"==typeof r&&(n=r,r=null);for(var o=t,i=[],s=!1;o.byteLength>0;){for(var a=new Uint8Array(o),c=0===a[0],u="",h=1;255!=a[h];h++){if(u.length>310){s=!0;break}u+=a[h]}if(s)return n(w,0,1);o=f(o,2+u.length),u=parseInt(u);var p=f(o,0,u);if(c)try{p=String.fromCharCode.apply(null,new Uint8Array(p))}catch(t){var l=new Uint8Array(p);p="";for(var h=0;h<l.length;h++)p+=String.fromCharCode(l[h])}i.push(p),o=f(o,u)}var d=i.length;i.forEach(function(t,o){n(e.decodePacket(t,r,!0),o,d)})}}).call(e,function(){return this}())},function(t,e){t.exports=Object.keys||function(t){var e=[],r=Object.prototype.hasOwnProperty;for(var n in t)r.call(t,n)&&e.push(n);return e}},function(t,e,r){(function(e){function n(t){function r(t){if(!t)return!1;if(e.Buffer&&e.Buffer.isBuffer&&e.Buffer.isBuffer(t)||e.ArrayBuffer&&t instanceof ArrayBuffer||e.Blob&&t instanceof Blob||e.File&&t instanceof File)return!0;if(o(t)){for(var n=0;n<t.length;n++)if(r(t[n]))return!0}else if(t&&"object"==typeof t){t.toJSON&&"function"==typeof t.toJSON&&(t=t.toJSON());for(var i in t)if(Object.prototype.hasOwnProperty.call(t,i)&&r(t[i]))return!0}return!1}return r(t)}var o=r(15);t.exports=n}).call(e,function(){return this}())},function(t,e){t.exports=function(t,e,r){var n=t.byteLength;if(e=e||0,r=r||n,t.slice)return t.slice(e,r);if(e<0&&(e+=n),r<0&&(r+=n),r>n&&(r=n),e>=n||e>=r||0===n)return new ArrayBuffer(0);for(var o=new Uint8Array(t),i=new Uint8Array(r-e),s=e,a=0;s<r;s++,a++)i[a]=o[s];return i.buffer}},function(t,e){function r(t,e,r){function o(t,n){if(o.count<=0)throw new Error("after called too many times");--o.count,t?(i=!0,e(t),e=r):0!==o.count||i||e(null,n)}var i=!1;return r=r||n,o.count=t,0===t?e():o}function n(){}t.exports=r},function(t,e,r){var n;(function(t,o){!function(i){function s(t){for(var e,r,n=[],o=0,i=t.length;o<i;)e=t.charCodeAt(o++),e>=55296&&e<=56319&&o<i?(r=t.charCodeAt(o++),56320==(64512&r)?n.push(((1023&e)<<10)+(1023&r)+65536):(n.push(e),o--)):n.push(e);return n}function a(t){for(var e,r=t.length,n=-1,o="";++n<r;)e=t[n],e>65535&&(e-=65536,o+=b(e>>>10&1023|55296),e=56320|1023&e),o+=b(e);return o}function c(t,e){return b(t>>e&63|128)}function u(t){if(0==(4294967168&t))return b(t);var e="";return 0==(4294965248&t)?e=b(t>>6&31|192):0==(4294901760&t)?(e=b(t>>12&15|224),e+=c(t,6)):0==(4292870144&t)&&(e=b(t>>18&7|240),e+=c(t,12),e+=c(t,6)),e+=b(63&t|128)}function h(t){for(var e,r=s(t),n=r.length,o=-1,i="";++o<n;)e=r[o],i+=u(e);return i}function p(){if(v>=m)throw Error("Invalid byte index");var t=255&g[v];if(v++,128==(192&t))return 63&t;throw Error("Invalid continuation byte")}function f(){var t,e,r,n,o;if(v>m)throw Error("Invalid byte index");if(v==m)return!1;if(t=255&g[v],v++,0==(128&t))return t;if(192==(224&t)){var e=p();if(o=(31&t)<<6|e,o>=128)return o;throw Error("Invalid continuation byte")}if(224==(240&t)){if(e=p(),r=p(),o=(15&t)<<12|e<<6|r,o>=2048)return o;throw Error("Invalid continuation byte")}if(240==(248&t)&&(e=p(),r=p(),n=p(),o=(15&t)<<18|e<<12|r<<6|n,o>=65536&&o<=1114111))return o;throw Error("Invalid WTF-8 detected")}function l(t){g=s(t),m=g.length,v=0;for(var e,r=[];(e=f())!==!1;)r.push(e);return a(r)}var d="object"==typeof e&&e,y=("object"==typeof t&&t&&t.exports==d&&t,"object"==typeof o&&o);y.global!==y&&y.window!==y||(i=y);var g,m,v,b=String.fromCharCode,w={version:"1.0.0",encode:h,decode:l};n=function(){return w}.call(e,r,e,t),!(void 0!==n&&(t.exports=n))}(this)}).call(e,r(12)(t),function(){return this}())},function(t,e){!function(){"use strict";for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r=new Uint8Array(256),n=0;n<t.length;n++)r[t.charCodeAt(n)]=n;e.encode=function(e){var r,n=new Uint8Array(e),o=n.length,i="";for(r=0;r<o;r+=3)i+=t[n[r]>>2],i+=t[(3&n[r])<<4|n[r+1]>>4],i+=t[(15&n[r+1])<<2|n[r+2]>>6],i+=t[63&n[r+2]];return o%3===2?i=i.substring(0,i.length-1)+"=":o%3===1&&(i=i.substring(0,i.length-2)+"=="),i},e.decode=function(t){var e,n,o,i,s,a=.75*t.length,c=t.length,u=0;"="===t[t.length-1]&&(a--,"="===t[t.length-2]&&a--);var h=new ArrayBuffer(a),p=new Uint8Array(h);for(e=0;e<c;e+=4)n=r[t.charCodeAt(e)],o=r[t.charCodeAt(e+1)],i=r[t.charCodeAt(e+2)],s=r[t.charCodeAt(e+3)],p[u++]=n<<2|o>>4,p[u++]=(15&o)<<4|i>>2,p[u++]=(3&i)<<6|63&s;return h}}()},function(t,e){(function(e){function r(t){for(var e=0;e<t.length;e++){var r=t[e];if(r.buffer instanceof ArrayBuffer){var n=r.buffer;if(r.byteLength!==n.byteLength){var o=new Uint8Array(r.byteLength);o.set(new Uint8Array(n,r.byteOffset,r.byteLength)),n=o.buffer}t[e]=n}}}function n(t,e){e=e||{};var n=new i;r(t);for(var o=0;o<t.length;o++)n.append(t[o]);return e.type?n.getBlob(e.type):n.getBlob()}function o(t,e){return r(t),new Blob(t,e||{})}var i=e.BlobBuilder||e.WebKitBlobBuilder||e.MSBlobBuilder||e.MozBlobBuilder,s=function(){try{var t=new Blob(["hi"]);return 2===t.size}catch(t){return!1}}(),a=s&&function(){try{var t=new Blob([new Uint8Array([1,2])]);return 2===t.size}catch(t){return!1}}(),c=i&&i.prototype.append&&i.prototype.getBlob;t.exports=function(){return s?a?e.Blob:o:c?n:void 0}()}).call(e,function(){return this}())},function(t,e,r){function n(t){if(t)return o(t)}function o(t){for(var e in n.prototype)t[e]=n.prototype[e];return t}t.exports=n,n.prototype.on=n.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},n.prototype.once=function(t,e){function r(){this.off(t,r),e.apply(this,arguments)}return r.fn=e,this.on(t,r),this},n.prototype.off=n.prototype.removeListener=n.prototype.removeAllListeners=n.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var r=this._callbacks["$"+t];if(!r)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var n,o=0;o<r.length;o++)if(n=r[o],n===e||n.fn===e){r.splice(o,1);break}return this},n.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),r=this._callbacks["$"+t];if(r){r=r.slice(0);for(var n=0,o=r.length;n<o;++n)r[n].apply(this,e)}return this},n.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},n.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e){e.encode=function(t){var e="";for(var r in t)t.hasOwnProperty(r)&&(e.length&&(e+="&"),e+=encodeURIComponent(r)+"="+encodeURIComponent(t[r]));return e},e.decode=function(t){for(var e={},r=t.split("&"),n=0,o=r.length;n<o;n++){var i=r[n].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}},function(t,e){t.exports=function(t,e){var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}},function(t,e){"use strict";function r(t){var e="";do e=s[t%a]+e,t=Math.floor(t/a);while(t>0);return e}function n(t){var e=0;for(h=0;h<t.length;h++)e=e*a+c[t.charAt(h)];return e}function o(){var t=r(+new Date);return t!==i?(u=0,i=t):t+"."+r(u++)}for(var i,s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),a=64,c={},u=0,h=0;h<a;h++)c[s[h]]=h;o.encode=r,o.decode=n,t.exports=o},function(t,e,r){(function(e){function n(){}function o(t){i.call(this,t),this.query=this.query||{},a||(e.___eio||(e.___eio=[]),a=e.___eio),this.index=a.length;var r=this;a.push(function(t){r.onData(t)}),this.query.j=this.index,e.document&&e.addEventListener&&e.addEventListener("beforeunload",function(){r.script&&(r.script.onerror=n)},!1)}var i=r(25),s=r(37);t.exports=o;var a,c=/\n/g,u=/\\n/g;s(o,i),o.prototype.supportsBinary=!1,o.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),i.prototype.doClose.call(this)},o.prototype.doPoll=function(){var t=this,e=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),e.async=!0,e.src=this.uri(),e.onerror=function(e){t.onError("jsonp poll error",e)};var r=document.getElementsByTagName("script")[0];r?r.parentNode.insertBefore(e,r):(document.head||document.body).appendChild(e),this.script=e;var n="undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent);n&&setTimeout(function(){var t=document.createElement("iframe");document.body.appendChild(t),document.body.removeChild(t)},100)},o.prototype.doWrite=function(t,e){function r(){n(),e()}function n(){if(o.iframe)try{o.form.removeChild(o.iframe)}catch(t){o.onError("jsonp polling iframe removal error",t)}try{var t='<iframe src="javascript:0" name="'+o.iframeId+'">';i=document.createElement(t)}catch(t){i=document.createElement("iframe"),i.name=o.iframeId,i.src="javascript:0"}i.id=o.iframeId,o.form.appendChild(i),o.iframe=i}var o=this;if(!this.form){var i,s=document.createElement("form"),a=document.createElement("textarea"),h=this.iframeId="eio_iframe_"+this.index;s.className="socketio",s.style.position="absolute",s.style.top="-1000px",s.style.left="-1000px",s.target=h,s.method="POST",s.setAttribute("accept-charset","utf-8"),a.name="d",s.appendChild(a),document.body.appendChild(s),this.form=s,this.area=a}this.form.action=this.uri(),n(),t=t.replace(u,"\\\n"),this.area.value=t.replace(c,"\\n");try{this.form.submit()}catch(t){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"===o.iframe.readyState&&r();
}:this.iframe.onload=r}}).call(e,function(){return this}())},function(t,e,r){(function(e){function n(t){var e=t&&t.forceBase64;e&&(this.supportsBinary=!1),this.perMessageDeflate=t.perMessageDeflate,this.usingBrowserWebSocket=p&&!t.forceNode,this.usingBrowserWebSocket||(f=o),i.call(this,t)}var o,i=r(26),s=r(27),a=r(36),c=r(37),u=r(38),h=r(3)("engine.io-client:websocket"),p=e.WebSocket||e.MozWebSocket;if("undefined"==typeof window)try{o=r(41)}catch(t){}var f=p;f||"undefined"!=typeof window||(f=o),t.exports=n,c(n,i),n.prototype.name="websocket",n.prototype.supportsBinary=!0,n.prototype.doOpen=function(){if(this.check()){var t=this.uri(),e=void 0,r={agent:this.agent,perMessageDeflate:this.perMessageDeflate};r.pfx=this.pfx,r.key=this.key,r.passphrase=this.passphrase,r.cert=this.cert,r.ca=this.ca,r.ciphers=this.ciphers,r.rejectUnauthorized=this.rejectUnauthorized,this.extraHeaders&&(r.headers=this.extraHeaders),this.localAddress&&(r.localAddress=this.localAddress);try{this.ws=this.usingBrowserWebSocket?new f(t):new f(t,e,r)}catch(t){return this.emit("error",t)}void 0===this.ws.binaryType&&(this.supportsBinary=!1),this.ws.supports&&this.ws.supports.binary?(this.supportsBinary=!0,this.ws.binaryType="nodebuffer"):this.ws.binaryType="arraybuffer",this.addEventListeners()}},n.prototype.addEventListeners=function(){var t=this;this.ws.onopen=function(){t.onOpen()},this.ws.onclose=function(){t.onClose()},this.ws.onmessage=function(e){t.onData(e.data)},this.ws.onerror=function(e){t.onError("websocket error",e)}},n.prototype.write=function(t){function r(){n.emit("flush"),setTimeout(function(){n.writable=!0,n.emit("drain")},0)}var n=this;this.writable=!1;for(var o=t.length,i=0,a=o;i<a;i++)!function(t){s.encodePacket(t,n.supportsBinary,function(i){if(!n.usingBrowserWebSocket){var s={};if(t.options&&(s.compress=t.options.compress),n.perMessageDeflate){var a="string"==typeof i?e.Buffer.byteLength(i):i.length;a<n.perMessageDeflate.threshold&&(s.compress=!1)}}try{n.usingBrowserWebSocket?n.ws.send(i):n.ws.send(i,s)}catch(t){h("websocket closed before onclose event")}--o||r()})}(t[i])},n.prototype.onClose=function(){i.prototype.onClose.call(this)},n.prototype.doClose=function(){"undefined"!=typeof this.ws&&this.ws.close()},n.prototype.uri=function(){var t=this.query||{},e=this.secure?"wss":"ws",r="";this.port&&("wss"===e&&443!==Number(this.port)||"ws"===e&&80!==Number(this.port))&&(r=":"+this.port),this.timestampRequests&&(t[this.timestampParam]=u()),this.supportsBinary||(t.b64=1),t=a.encode(t),t.length&&(t="?"+t);var n=this.hostname.indexOf(":")!==-1;return e+"://"+(n?"["+this.hostname+"]":this.hostname)+r+this.path+t},n.prototype.check=function(){return!(!f||"__initialize"in f&&this.name===n.prototype.name)}}).call(e,function(){return this}())},function(t,e){},function(t,e){var r=[].indexOf;t.exports=function(t,e){if(r)return t.indexOf(e);for(var n=0;n<t.length;++n)if(t[n]===e)return n;return-1}},function(t,e){(function(e){var r=/^[\],:{}\s]*$/,n=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,o=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,i=/(?:^|:|,)(?:\s*\[)+/g,s=/^\s+/,a=/\s+$/;t.exports=function(t){return"string"==typeof t&&t?(t=t.replace(s,"").replace(a,""),e.JSON&&JSON.parse?JSON.parse(t):r.test(t.replace(n,"@").replace(o,"]").replace(i,""))?new Function("return "+t)():void 0):null}}).call(e,function(){return this}())},function(t,e,r){"use strict";function n(t,e,r){this.io=t,this.nsp=e,this.json=this,this.ids=0,this.acks={},this.receiveBuffer=[],this.sendBuffer=[],this.connected=!1,this.disconnected=!0,r&&r.query&&(this.query=r.query),this.io.autoConnect&&this.open()}var o=r(7),i=r(35),s=r(45),a=r(46),c=r(47),u=r(3)("socket.io-client:socket"),h=r(29);t.exports=e=n;var p={connect:1,connect_error:1,connect_timeout:1,connecting:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1,ping:1,pong:1},f=i.prototype.emit;i(n.prototype),n.prototype.subEvents=function(){if(!this.subs){var t=this.io;this.subs=[a(t,"open",c(this,"onopen")),a(t,"packet",c(this,"onpacket")),a(t,"close",c(this,"onclose"))]}},n.prototype.open=n.prototype.connect=function(){return this.connected?this:(this.subEvents(),this.io.open(),"open"===this.io.readyState&&this.onopen(),this.emit("connecting"),this)},n.prototype.send=function(){var t=s(arguments);return t.unshift("message"),this.emit.apply(this,t),this},n.prototype.emit=function(t){if(p.hasOwnProperty(t))return f.apply(this,arguments),this;var e=s(arguments),r=o.EVENT;h(e)&&(r=o.BINARY_EVENT);var n={type:r,data:e};return n.options={},n.options.compress=!this.flags||!1!==this.flags.compress,"function"==typeof e[e.length-1]&&(u("emitting packet with ack id %d",this.ids),this.acks[this.ids]=e.pop(),n.id=this.ids++),this.connected?this.packet(n):this.sendBuffer.push(n),delete this.flags,this},n.prototype.packet=function(t){t.nsp=this.nsp,this.io.packet(t)},n.prototype.onopen=function(){u("transport is open - connecting"),"/"!==this.nsp&&(this.query?this.packet({type:o.CONNECT,query:this.query}):this.packet({type:o.CONNECT}))},n.prototype.onclose=function(t){u("close (%s)",t),this.connected=!1,this.disconnected=!0,delete this.id,this.emit("disconnect",t)},n.prototype.onpacket=function(t){if(t.nsp===this.nsp)switch(t.type){case o.CONNECT:this.onconnect();break;case o.EVENT:this.onevent(t);break;case o.BINARY_EVENT:this.onevent(t);break;case o.ACK:this.onack(t);break;case o.BINARY_ACK:this.onack(t);break;case o.DISCONNECT:this.ondisconnect();break;case o.ERROR:this.emit("error",t.data)}},n.prototype.onevent=function(t){var e=t.data||[];u("emitting event %j",e),null!=t.id&&(u("attaching ack callback to event"),e.push(this.ack(t.id))),this.connected?f.apply(this,e):this.receiveBuffer.push(e)},n.prototype.ack=function(t){var e=this,r=!1;return function(){if(!r){r=!0;var n=s(arguments);u("sending ack %j",n);var i=h(n)?o.BINARY_ACK:o.ACK;e.packet({type:i,id:t,data:n})}}},n.prototype.onack=function(t){var e=this.acks[t.id];"function"==typeof e?(u("calling ack %s with %j",t.id,t.data),e.apply(this,t.data),delete this.acks[t.id]):u("bad ack %s",t.id)},n.prototype.onconnect=function(){this.connected=!0,this.disconnected=!1,this.emit("connect"),this.emitBuffered()},n.prototype.emitBuffered=function(){var t;for(t=0;t<this.receiveBuffer.length;t++)f.apply(this,this.receiveBuffer[t]);for(this.receiveBuffer=[],t=0;t<this.sendBuffer.length;t++)this.packet(this.sendBuffer[t]);this.sendBuffer=[]},n.prototype.ondisconnect=function(){u("server disconnect (%s)",this.nsp),this.destroy(),this.onclose("io server disconnect")},n.prototype.destroy=function(){if(this.subs){for(var t=0;t<this.subs.length;t++)this.subs[t].destroy();this.subs=null}this.io.destroy(this)},n.prototype.close=n.prototype.disconnect=function(){return this.connected&&(u("performing disconnect (%s)",this.nsp),this.packet({type:o.DISCONNECT})),this.destroy(),this.connected&&this.onclose("io client disconnect"),this},n.prototype.compress=function(t){return this.flags=this.flags||{},this.flags.compress=t,this}},function(t,e){function r(t,e){var r=[];e=e||0;for(var n=e||0;n<t.length;n++)r[n-e]=t[n];return r}t.exports=r},function(t,e){"use strict";function r(t,e,r){return t.on(e,r),{destroy:function(){t.removeListener(e,r)}}}t.exports=r},function(t,e){var r=[].slice;t.exports=function(t,e){if("string"==typeof e&&(e=t[e]),"function"!=typeof e)throw new Error("bind() requires a function");var n=r.call(arguments,2);return function(){return e.apply(t,n.concat(r.call(arguments)))}}},function(t,e){function r(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}t.exports=r,r.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),r=Math.floor(e*this.jitter*t);t=0==(1&Math.floor(10*e))?t-r:t+r}return 0|Math.min(t,this.max)},r.prototype.reset=function(){this.attempts=0},r.prototype.setMin=function(t){this.ms=t},r.prototype.setMax=function(t){this.max=t},r.prototype.setJitter=function(t){this.jitter=t}}])});
/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.8",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha,"function"==typeof define&&define.amd?define(function(){return ha}):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.js.map
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Recorder = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = require("./recorder").Recorder;

},{"./recorder":2}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Recorder = undefined;

var _inlineWorker = require('inline-worker');

var _inlineWorker2 = _interopRequireDefault(_inlineWorker);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Recorder = exports.Recorder = (function () {
    function Recorder(source, cfg) {
        var _this = this;

        _classCallCheck(this, Recorder);

        this.config = {
            bufferLen: 4096,
            numChannels: 2,
            mimeType: 'audio/wav'
        };
        this.recording = false;
        this.callbacks = {
            getBuffer: [],
            exportWAV: []
        };

        Object.assign(this.config, cfg);
        this.context = source.context;
        this.node = (this.context.createScriptProcessor || this.context.createJavaScriptNode).call(this.context, this.config.bufferLen, this.config.numChannels, this.config.numChannels);

        this.node.onaudioprocess = function (e) {
            if (!_this.recording) return;

            var buffer = [];
            for (var channel = 0; channel < _this.config.numChannels; channel++) {
                buffer.push(e.inputBuffer.getChannelData(channel));
            }
            _this.worker.postMessage({
                command: 'record',
                buffer: buffer
            });
        };

        source.connect(this.node);
        this.node.connect(this.context.destination); //this should not be necessary

        var self = {};
        this.worker = new _inlineWorker2.default(function () {
            var recLength = 0,
                recBuffers = [],
                sampleRate = undefined,
                numChannels = undefined;

            self.onmessage = function (e) {
                switch (e.data.command) {
                    case 'init':
                        init(e.data.config);
                        break;
                    case 'record':
                        record(e.data.buffer);
                        break;
                    case 'exportWAV':
                        exportWAV(e.data.type);
                        break;
                    case 'getBuffer':
                        getBuffer();
                        break;
                    case 'clear':
                        clear();
                        break;
                }
            };

            function init(config) {
                sampleRate = config.sampleRate;
                numChannels = config.numChannels;
                initBuffers();
            }

            function record(inputBuffer) {
                for (var channel = 0; channel < numChannels; channel++) {
                    recBuffers[channel].push(inputBuffer[channel]);
                }
                recLength += inputBuffer[0].length;
            }

            function exportWAV(type) {
                var buffers = [];
                for (var channel = 0; channel < numChannels; channel++) {
                    buffers.push(mergeBuffers(recBuffers[channel], recLength));
                }
                var interleaved = undefined;
                if (numChannels === 2) {
                    interleaved = interleave(buffers[0], buffers[1]);
                } else {
                    interleaved = buffers[0];
                }
                var dataview = encodeWAV(interleaved);
                var audioBlob = new Blob([dataview], { type: type });

                self.postMessage({ command: 'exportWAV', data: audioBlob });
            }

            function getBuffer() {
                var buffers = [];
                for (var channel = 0; channel < numChannels; channel++) {
                    buffers.push(mergeBuffers(recBuffers[channel], recLength));
                }
                self.postMessage({ command: 'getBuffer', data: buffers });
            }

            function clear() {
                recLength = 0;
                recBuffers = [];
                initBuffers();
            }

            function initBuffers() {
                for (var channel = 0; channel < numChannels; channel++) {
                    recBuffers[channel] = [];
                }
            }

            function mergeBuffers(recBuffers, recLength) {
                var result = new Float32Array(recLength);
                var offset = 0;
                for (var i = 0; i < recBuffers.length; i++) {
                    result.set(recBuffers[i], offset);
                    offset += recBuffers[i].length;
                }
                return result;
            }

            function interleave(inputL, inputR) {
                var length = inputL.length + inputR.length;
                var result = new Float32Array(length);

                var index = 0,
                    inputIndex = 0;

                while (index < length) {
                    result[index++] = inputL[inputIndex];
                    result[index++] = inputR[inputIndex];
                    inputIndex++;
                }
                return result;
            }

            function floatTo16BitPCM(output, offset, input) {
                for (var i = 0; i < input.length; i++, offset += 2) {
                    var s = Math.max(-1, Math.min(1, input[i]));
                    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
                }
            }

            function writeString(view, offset, string) {
                for (var i = 0; i < string.length; i++) {
                    view.setUint8(offset + i, string.charCodeAt(i));
                }
            }

            function encodeWAV(samples) {
                var buffer = new ArrayBuffer(44 + samples.length * 2);
                var view = new DataView(buffer);

                /* RIFF identifier */
                writeString(view, 0, 'RIFF');
                /* RIFF chunk length */
                view.setUint32(4, 36 + samples.length * 2, true);
                /* RIFF type */
                writeString(view, 8, 'WAVE');
                /* format chunk identifier */
                writeString(view, 12, 'fmt ');
                /* format chunk length */
                view.setUint32(16, 16, true);
                /* sample format (raw) */
                view.setUint16(20, 1, true);
                /* channel count */
                view.setUint16(22, numChannels, true);
                /* sample rate */
                view.setUint32(24, sampleRate, true);
                /* byte rate (sample rate * block align) */
                view.setUint32(28, sampleRate * 4, true);
                /* block align (channel count * bytes per sample) */
                view.setUint16(32, numChannels * 2, true);
                /* bits per sample */
                view.setUint16(34, 16, true);
                /* data chunk identifier */
                writeString(view, 36, 'data');
                /* data chunk length */
                view.setUint32(40, samples.length * 2, true);

                floatTo16BitPCM(view, 44, samples);

                return view;
            }
        }, self);

        this.worker.postMessage({
            command: 'init',
            config: {
                sampleRate: this.context.sampleRate,
                numChannels: this.config.numChannels
            }
        });

        this.worker.onmessage = function (e) {
            var cb = _this.callbacks[e.data.command].pop();
            if (typeof cb == 'function') {
                cb(e.data.data);
            }
        };
    }

    _createClass(Recorder, [{
        key: 'record',
        value: function record() {
            this.recording = true;
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.recording = false;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.worker.postMessage({ command: 'clear' });
        }
    }, {
        key: 'getBuffer',
        value: function getBuffer(cb) {
            cb = cb || this.config.callback;
            if (!cb) throw new Error('Callback not set');

            this.callbacks.getBuffer.push(cb);

            this.worker.postMessage({ command: 'getBuffer' });
        }
    }, {
        key: 'exportWAV',
        value: function exportWAV(cb, mimeType) {
            mimeType = mimeType || this.config.mimeType;
            cb = cb || this.config.callback;
            if (!cb) throw new Error('Callback not set');

            this.callbacks.exportWAV.push(cb);

            this.worker.postMessage({
                command: 'exportWAV',
                type: mimeType
            });
        }
    }], [{
        key: 'forceDownload',
        value: function forceDownload(blob, filename) {
            var url = (window.URL || window.webkitURL).createObjectURL(blob);
            var link = window.document.createElement('a');
            link.href = url;
            link.download = filename || 'output.wav';
            var click = document.createEvent("Event");
            click.initEvent("click", true, true);
            link.dispatchEvent(click);
        }
    }]);

    return Recorder;
})();

exports.default = Recorder;

},{"inline-worker":3}],3:[function(require,module,exports){
"use strict";

module.exports = require("./inline-worker");
},{"./inline-worker":4}],4:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var WORKER_ENABLED = !!(global === global.window && global.URL && global.Blob && global.Worker);

var InlineWorker = (function () {
  function InlineWorker(func, self) {
    var _this = this;

    _classCallCheck(this, InlineWorker);

    if (WORKER_ENABLED) {
      var functionBody = func.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];
      var url = global.URL.createObjectURL(new global.Blob([functionBody], { type: "text/javascript" }));

      return new global.Worker(url);
    }

    this.self = self;
    this.self.postMessage = function (data) {
      setTimeout(function () {
        _this.onmessage({ data: data });
      }, 0);
    };

    setTimeout(function () {
      func.call(self);
    }, 0);
  }

  _createClass(InlineWorker, {
    postMessage: {
      value: function postMessage(data) {
        var _this = this;

        setTimeout(function () {
          _this.self.onmessage({ data: data });
        }, 0);
      }
    }
  });

  return InlineWorker;
})();

module.exports = InlineWorker;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof module&&module.exports?module.exports=t():e.StartAudioContext=t()}(this,function(){function e(e){var t=e.createBuffer(1,1,e.sampleRate),n=e.createBufferSource();n.buffer=t,n.connect(e.destination),n.start(0),e.resume&&e.resume()}function t(e){return"running"===e.state}function n(e,n){function i(){t(e)?n():(requestAnimationFrame(i),e.resume&&e.resume())}t(e)?n():i()}function i(e,t,n){if(Array.isArray(e)||NodeList&&e instanceof NodeList)for(var o=0;o<e.length;o++)i(e[o],t,n);else if("string"==typeof e)i(document.querySelectorAll(e),t,n);else if(e.jquery&&"function"==typeof e.toArray)i(e.toArray(),t,n);else if(Element&&e instanceof Element){var s=new d(e,n);t.push(s)}}function o(e,t,o){var d=new Promise(function(t){n(e,t)}),s=[];return t||(t=document.body),i(t,s,e),d.then(function(){for(var e=0;e<s.length;e++)s[e].dispose();s=null,o&&o()}),d}console.log("start");var d=function(e,t){this._dragged=!1,this._element=e,this._bindedMove=this._moved.bind(this),this._bindedEnd=this._ended.bind(this,t),e.addEventListener("touchstart",this._bindedEnd),e.addEventListener("touchmove",this._bindedMove),e.addEventListener("touchend",this._bindedEnd),e.addEventListener("mouseup",this._bindedEnd)};return d.prototype._moved=function(e){this._dragged=!0},d.prototype._ended=function(t){this._dragged||e(t),this._dragged=!1},d.prototype.dispose=function(){this._element.removeEventListener("touchstart",this._bindedEnd),this._element.removeEventListener("touchmove",this._bindedMove),this._element.removeEventListener("touchend",this._bindedEnd),this._element.removeEventListener("mouseup",this._bindedEnd),this._bindedMove=null,this._bindedEnd=null,this._element=null},o});
!function(t,e){"function"==typeof define&&define.amd?define(function(){return e()}):"object"==typeof module?module.exports=e():t.Tone=e()}(this,function(){"use strict";function t(t){t(e)}var e;return function(t){e=t()}(function(){var t=function(t,e){this.isUndef(t)||1===t?this.input=this.context.createGain():t>1&&(this.input=new Array(t)),this.isUndef(e)||1===e?this.output=this.context.createGain():e>1&&(this.output=new Array(t))};t.prototype.set=function(e,i,n){if(this.isObject(e))n=i;else if(this.isString(e)){var s={};s[e]=i,e=s}t:for(var o in e){i=e[o];var r=this;if(-1!==o.indexOf(".")){for(var a=o.split("."),h=0;h<a.length-1;h++)if((r=r[a[h]])instanceof t){a.splice(0,h+1);var l=a.join(".");r.set(l,i);continue t}o=a[a.length-1]}var u=r[o];this.isUndef(u)||(t.Signal&&u instanceof t.Signal||t.Param&&u instanceof t.Param?u.value!==i&&(this.isUndef(n)?u.value=i:u.rampTo(i,n)):u instanceof AudioParam?u.value!==i&&(u.value=i):u instanceof t?u.set(i):u!==i&&(r[o]=i))}return this},t.prototype.get=function(e){this.isUndef(e)?e=this._collectDefaults(this.constructor):this.isString(e)&&(e=[e]);for(var i={},n=0;n<e.length;n++){var s=e[n],o=this,r=i;if(-1!==s.indexOf(".")){for(var a=s.split("."),h=0;h<a.length-1;h++){var l=a[h];r[l]=r[l]||{},r=r[l],o=o[l]}s=a[a.length-1]}var u=o[s];this.isObject(e[s])?r[s]=u.get():t.Signal&&u instanceof t.Signal?r[s]=u.value:t.Param&&u instanceof t.Param?r[s]=u.value:u instanceof AudioParam?r[s]=u.value:u instanceof t?r[s]=u.get():this.isFunction(u)||this.isUndef(u)||(r[s]=u)}return i},t.prototype._collectDefaults=function(t){var e=[];if(this.isUndef(t.defaults)||(e=Object.keys(t.defaults)),!this.isUndef(t._super))for(var i=this._collectDefaults(t._super),n=0;n<i.length;n++)-1===e.indexOf(i[n])&&e.push(i[n]);return e},t.prototype.toString=function(){for(var e in t){var i=e[0].match(/^[A-Z]$/),n=t[e]===this.constructor;if(this.isFunction(t[e])&&i&&n)return e}return"Tone"},Object.defineProperty(t.prototype,"numberOfInputs",{get:function(){return this.input?this.isArray(this.input)?this.input.length:1:0}}),Object.defineProperty(t.prototype,"numberOfOutputs",{get:function(){return this.output?this.isArray(this.output)?this.output.length:1:0}}),t.prototype.dispose=function(){return this.isUndef(this.input)||(this.input instanceof AudioNode&&this.input.disconnect(),this.input=null),this.isUndef(this.output)||(this.output instanceof AudioNode&&this.output.disconnect(),this.output=null),this},t.prototype.connect=function(t,e,i){return Array.isArray(this.output)?(e=this.defaultArg(e,0),this.output[e].connect(t,0,i)):this.output.connect(t,e,i),this},t.prototype.disconnect=function(t,e,i){this.isArray(this.output)?this.isNumber(t)?this.output[t].disconnect():(e=this.defaultArg(e,0),this.output[e].disconnect(t,0,i)):this.output.disconnect.apply(this.output,arguments)},t.prototype.connectSeries=function(){if(arguments.length>1)for(var t=arguments[0],e=1;e<arguments.length;e++){var i=arguments[e];t.connect(i),t=i}return this},t.prototype.chain=function(){if(arguments.length>0)for(var t=this,e=0;e<arguments.length;e++){var i=arguments[e];t.connect(i),t=i}return this},t.prototype.fan=function(){if(arguments.length>0)for(var t=0;t<arguments.length;t++)this.connect(arguments[t]);return this},AudioNode.prototype.chain=t.prototype.chain,AudioNode.prototype.fan=t.prototype.fan,t.prototype.defaultArg=function(t,e){if(this.isObject(t)&&this.isObject(e)){var i={};for(var n in t)i[n]=this.defaultArg(e[n],t[n]);for(var s in e)i[s]=this.defaultArg(t[s],e[s]);return i}return this.isUndef(t)?e:t},t.prototype.optionsObject=function(t,e,i){var n={};if(1===t.length&&this.isObject(t[0]))n=t[0];else for(var s=0;s<e.length;s++)n[e[s]]=t[s];return this.isUndef(i)?n:this.defaultArg(n,i)},t.prototype.isUndef=function(t){return void 0===t},t.prototype.isFunction=function(t){return"function"==typeof t},t.prototype.isNumber=function(t){return"number"==typeof t},t.prototype.isObject=function(t){return"[object Object]"===Object.prototype.toString.call(t)&&t.constructor===Object},t.prototype.isBoolean=function(t){return"boolean"==typeof t},t.prototype.isArray=function(t){return Array.isArray(t)},t.prototype.isString=function(t){return"string"==typeof t},t.noOp=function(){},t.prototype._readOnly=function(t){if(Array.isArray(t))for(var e=0;e<t.length;e++)this._readOnly(t[e]);else Object.defineProperty(this,t,{writable:!1,enumerable:!0})},t.prototype._writable=function(t){if(Array.isArray(t))for(var e=0;e<t.length;e++)this._writable(t[e]);else Object.defineProperty(this,t,{writable:!0})},t.State={Started:"started",Stopped:"stopped",Paused:"paused"},t.prototype.equalPowerScale=function(t){var e=.5*Math.PI;return Math.sin(t*e)},t.prototype.dbToGain=function(t){return Math.pow(2,t/6)},t.prototype.gainToDb=function(t){return Math.log(t)/Math.LN10*20},t.prototype.intervalToFrequencyRatio=function(t){return Math.pow(2,t/12)},t.prototype.now=function(){return t.context.now()},t.now=function(){return t.context.now()},t.extend=function(e,i){function n(){}t.prototype.isUndef(i)&&(i=t),n.prototype=i.prototype,e.prototype=new n,e.prototype.constructor=e,e._super=i};var e;return Object.defineProperty(t,"context",{get:function(){return e},set:function(i){e=t.Context&&i instanceof t.Context?i:new t.Context(i),t.Context&&t.Context.emit("init",e)}}),Object.defineProperty(t.prototype,"context",{get:function(){return t.context}}),t.setContext=function(e){t.context=e},Object.defineProperty(t.prototype,"blockTime",{get:function(){return 128/this.context.sampleRate}}),Object.defineProperty(t.prototype,"sampleTime",{get:function(){return 1/this.context.sampleRate}}),Object.defineProperty(t,"supported",{get:function(){var t=window.hasOwnProperty("AudioContext")||window.hasOwnProperty("webkitAudioContext"),e=window.hasOwnProperty("Promise"),i=window.hasOwnProperty("Worker");return t&&e&&i}}),t.version="r10",window.TONE_SILENCE_VERSION_LOGGING||console.log("%c * Tone.js "+t.version+" * ","background: #000; color: #fff"),t}),t(function(t){return t.SignalBase=function(){},t.extend(t.SignalBase),t.SignalBase.prototype.connect=function(e,i,n){return t.Signal&&t.Signal===e.constructor||t.Param&&t.Param===e.constructor||t.TimelineSignal&&t.TimelineSignal===e.constructor?(e._param.cancelScheduledValues(0),e._param.value=0,e.overridden=!0):e instanceof AudioParam&&(e.cancelScheduledValues(0),e.value=0),t.prototype.connect.call(this,e,i,n),this},t.SignalBase}),t(function(t){return t.WaveShaper=function(t,e){this._shaper=this.input=this.output=this.context.createWaveShaper(),this._curve=null,Array.isArray(t)?this.curve=t:isFinite(t)||this.isUndef(t)?this._curve=new Float32Array(this.defaultArg(t,1024)):this.isFunction(t)&&(this._curve=new Float32Array(this.defaultArg(e,1024)),this.setMap(t))},t.extend(t.WaveShaper,t.SignalBase),t.WaveShaper.prototype.setMap=function(t){for(var e=0,i=this._curve.length;e<i;e++){var n=e/(i-1)*2-1;this._curve[e]=t(n,e)}return this._shaper.curve=this._curve,this},Object.defineProperty(t.WaveShaper.prototype,"curve",{get:function(){return this._shaper.curve},set:function(t){this._curve=new Float32Array(t),this._shaper.curve=this._curve}}),Object.defineProperty(t.WaveShaper.prototype,"oversample",{get:function(){return this._shaper.oversample},set:function(t){if(-1===["none","2x","4x"].indexOf(t))throw new RangeError("Tone.WaveShaper: oversampling must be either 'none', '2x', or '4x'");this._shaper.oversample=t}}),t.WaveShaper.prototype.dispose=function(){return t.prototype.dispose.call(this),this._shaper.disconnect(),this._shaper=null,this._curve=null,this},t.WaveShaper}),t(function(t){return t.TimeBase=function(e,i){if(!(this instanceof t.TimeBase))return new t.TimeBase(e,i);if(this._expr=this._noOp,e instanceof t.TimeBase)this.copy(e);else if(!this.isUndef(i)||this.isNumber(e)){i=this.defaultArg(i,this._defaultUnits);var n=this._primaryExpressions[i].method;this._expr=n.bind(this,e)}else this.isString(e)?this.set(e):this.isUndef(e)&&(this._expr=this._defaultExpr())},t.extend(t.TimeBase),t.TimeBase.prototype.set=function(t){return this._expr=this._parseExprString(t),this},t.TimeBase.prototype.clone=function(){var t=new this.constructor;return t.copy(this),t},t.TimeBase.prototype.copy=function(t){var e=t._expr();return this.set(e)},t.TimeBase.prototype._primaryExpressions={n:{regexp:/^(\d+)n/i,method:function(t){return t=parseInt(t),1===t?this._beatsToUnits(this._timeSignature()):this._beatsToUnits(4/t)}},t:{regexp:/^(\d+)t/i,method:function(t){return t=parseInt(t),this._beatsToUnits(8/(3*parseInt(t)))}},m:{regexp:/^(\d+)m/i,method:function(t){return this._beatsToUnits(parseInt(t)*this._timeSignature())}},i:{regexp:/^(\d+)i/i,method:function(t){return this._ticksToUnits(parseInt(t))}},hz:{regexp:/^(\d+(?:\.\d+)?)hz/i,method:function(t){return this._frequencyToUnits(parseFloat(t))}},tr:{regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,method:function(t,e,i){var n=0;return t&&"0"!==t&&(n+=this._beatsToUnits(this._timeSignature()*parseFloat(t))),e&&"0"!==e&&(n+=this._beatsToUnits(parseFloat(e))),i&&"0"!==i&&(n+=this._beatsToUnits(parseFloat(i)/4)),n}},s:{regexp:/^(\d+(?:\.\d+)?s)/,method:function(t){return this._secondsToUnits(parseFloat(t))}},samples:{regexp:/^(\d+)samples/,method:function(t){return parseInt(t)/this.context.sampleRate}},default:{regexp:/^(\d+(?:\.\d+)?)/,method:function(t){return this._primaryExpressions[this._defaultUnits].method.call(this,t)}}},t.TimeBase.prototype._binaryExpressions={"+":{regexp:/^\+/,precedence:2,method:function(t,e){return t()+e()}},"-":{regexp:/^\-/,precedence:2,method:function(t,e){return t()-e()}},"*":{regexp:/^\*/,precedence:1,method:function(t,e){return t()*e()}},"/":{regexp:/^\//,precedence:1,method:function(t,e){return t()/e()}}},t.TimeBase.prototype._unaryExpressions={neg:{regexp:/^\-/,method:function(t){return-t()}}},t.TimeBase.prototype._syntaxGlue={"(":{regexp:/^\(/},")":{regexp:/^\)/}},t.TimeBase.prototype._tokenize=function(t){for(var e=-1,i=[];t.length>0;){var n=function(t,e){for(var i=["_binaryExpressions","_unaryExpressions","_primaryExpressions","_syntaxGlue"],n=0;n<i.length;n++){var s=e[i[n]];for(var o in s){var r=s[o],a=r.regexp,h=t.match(a);if(null!==h)return{method:r.method,precedence:r.precedence,regexp:r.regexp,value:h[0]}}}throw new SyntaxError("Tone.TimeBase: Unexpected token "+t)}(t=t.trim(),this);i.push(n),t=t.substr(n.value.length)}return{next:function(){return i[++e]},peek:function(){return i[e+1]}}},t.TimeBase.prototype._matchGroup=function(t,e,i){if(!this.isUndef(t))for(var n in e){var s=e[n];if(s.regexp.test(t.value)){if(this.isUndef(i))return s;if(s.precedence===i)return s}}return!1},t.TimeBase.prototype._parseBinary=function(t,e){this.isUndef(e)&&(e=2);var i;i=e<0?this._parseUnary(t):this._parseBinary(t,e-1);for(var n=t.peek();n&&this._matchGroup(n,this._binaryExpressions,e);)i=(n=t.next()).method.bind(this,i,this._parseBinary(t,e-1)),n=t.peek();return i},t.TimeBase.prototype._parseUnary=function(t){var e,i;e=t.peek();var n=this._matchGroup(e,this._unaryExpressions);return n?(e=t.next(),i=this._parseUnary(t),n.method.bind(this,i)):this._parsePrimary(t)},t.TimeBase.prototype._parsePrimary=function(t){var e,i;if(e=t.peek(),this.isUndef(e))throw new SyntaxError("Tone.TimeBase: Unexpected end of expression");if(this._matchGroup(e,this._primaryExpressions)){var n=(e=t.next()).value.match(e.regexp);return e.method.bind(this,n[1],n[2],n[3])}if(e&&"("===e.value){if(t.next(),i=this._parseBinary(t),!(e=t.next())||")"!==e.value)throw new SyntaxError("Expected )");return i}throw new SyntaxError("Tone.TimeBase: Cannot process token "+e.value)},t.TimeBase.prototype._parseExprString=function(t){this.isString(t)||(t=t.toString());var e=this._tokenize(t);return this._parseBinary(e)},t.TimeBase.prototype._noOp=function(){return 0},t.TimeBase.prototype._defaultExpr=function(){return this._noOp},t.TimeBase.prototype._defaultUnits="s",t.TimeBase.prototype._frequencyToUnits=function(t){return 1/t},t.TimeBase.prototype._beatsToUnits=function(e){return 60/t.Transport.bpm.value*e},t.TimeBase.prototype._secondsToUnits=function(t){return t},t.TimeBase.prototype._ticksToUnits=function(e){return e*(this._beatsToUnits(1)/t.Transport.PPQ)},t.TimeBase.prototype._timeSignature=function(){return t.Transport.timeSignature},t.TimeBase.prototype._pushExpr=function(e,i,n){return e instanceof t.TimeBase||(e=new this.constructor(e,n)),this._expr=this._binaryExpressions[i].method.bind(this,this._expr,e._expr),this},t.TimeBase.prototype.add=function(t,e){return this._pushExpr(t,"+",e)},t.TimeBase.prototype.sub=function(t,e){return this._pushExpr(t,"-",e)},t.TimeBase.prototype.mult=function(t,e){return this._pushExpr(t,"*",e)},t.TimeBase.prototype.div=function(t,e){return this._pushExpr(t,"/",e)},t.TimeBase.prototype.valueOf=function(){return this._expr()},t.TimeBase.prototype.dispose=function(){this._expr=null},t.TimeBase}),t(function(t){return t.Time=function(e,i){if(!(this instanceof t.Time))return new t.Time(e,i);this._plusNow=!1,t.TimeBase.call(this,e,i)},t.extend(t.Time,t.TimeBase),t.Time.prototype._unaryExpressions=Object.create(t.TimeBase.prototype._unaryExpressions),t.Time.prototype._unaryExpressions.quantize={regexp:/^@/,method:function(e){return t.Transport.nextSubdivision(e())}},t.Time.prototype._unaryExpressions.now={regexp:/^\+/,method:function(t){return this._plusNow=!0,t()}},t.Time.prototype.quantize=function(t,e){return e=this.defaultArg(e,1),this._expr=function(t,e,i){return t=t(),e=e.toSeconds(),t+(Math.round(t/e)*e-t)*i}.bind(this,this._expr,new this.constructor(t),e),this},t.Time.prototype.addNow=function(){return this._plusNow=!0,this},t.Time.prototype._defaultExpr=function(){return this._plusNow=!0,this._noOp},t.Time.prototype.copy=function(e){return t.TimeBase.prototype.copy.call(this,e),this._plusNow=e._plusNow,this},t.Time.prototype.toNotation=function(){var t=this.toSeconds(),e=["1m","2n","4n","8n","16n","32n","64n","128n"],i=this._toNotationHelper(t,e),n=["1m","2n","2t","4n","4t","8n","8t","16n","16t","32n","32t","64n","64t","128n"],s=this._toNotationHelper(t,n);return s.split("+").length<i.split("+").length?s:i},t.Time.prototype._toNotationHelper=function(t,e){for(var i=this._notationToUnits(e[e.length-1]),n="",s=0;s<e.length;s++){var o=this._notationToUnits(e[s]),r=t/o;if(1-r%1<1e-6&&(r+=1e-6),(r=Math.floor(r))>0){if(n+=1===r?e[s]:r.toString()+"*"+e[s],(t-=r*o)<i)break;n+=" + "}}return""===n&&(n="0"),n},t.Time.prototype._notationToUnits=function(t){for(var e=this._primaryExpressions,i=[e.n,e.t,e.m],n=0;n<i.length;n++){var s=i[n],o=t.match(s.regexp);if(o)return s.method.call(this,o[1])}},t.Time.prototype.toBarsBeatsSixteenths=function(){var t=this._beatsToUnits(1),e=this.toSeconds()/t,i=Math.floor(e/this._timeSignature()),n=e%1*4;return e=Math.floor(e)%this._timeSignature(),(n=n.toString()).length>3&&(n=parseFloat(n).toFixed(3)),[i,e,n].join(":")},t.Time.prototype.toTicks=function(){var e=this._beatsToUnits(1),i=this.valueOf()/e;return Math.floor(i*t.Transport.PPQ)},t.Time.prototype.toSamples=function(){return this.toSeconds()*this.context.sampleRate},t.Time.prototype.toFrequency=function(){return 1/this.toSeconds()},t.Time.prototype.toSeconds=function(){return this.valueOf()},t.Time.prototype.toMilliseconds=function(){return 1e3*this.toSeconds()},t.Time.prototype.valueOf=function(){return this._expr()+(this._plusNow?this.now():0)},t.Time}),t(function(t){t.Frequency=function(e,i){if(!(this instanceof t.Frequency))return new t.Frequency(e,i);t.TimeBase.call(this,e,i)},t.extend(t.Frequency,t.TimeBase),t.Frequency.prototype._primaryExpressions=Object.create(t.TimeBase.prototype._primaryExpressions),t.Frequency.prototype._primaryExpressions.midi={regexp:/^(\d+(?:\.\d+)?midi)/,method:function(t){return this.midiToFrequency(t)}},t.Frequency.prototype._primaryExpressions.note={regexp:/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i,method:function(t,i){var n=e[t.toLowerCase()]+12*(parseInt(i)+1);return this.midiToFrequency(n)}},t.Frequency.prototype._primaryExpressions.tr={regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,method:function(t,e,i){var n=1;return t&&"0"!==t&&(n*=this._beatsToUnits(this._timeSignature()*parseFloat(t))),e&&"0"!==e&&(n*=this._beatsToUnits(parseFloat(e))),i&&"0"!==i&&(n*=this._beatsToUnits(parseFloat(i)/4)),n}},t.Frequency.prototype.transpose=function(t){return this._expr=function(t,e){return t()*this.intervalToFrequencyRatio(e)}.bind(this,this._expr,t),this},t.Frequency.prototype.harmonize=function(t){return this._expr=function(t,e){for(var i=t(),n=[],s=0;s<e.length;s++)n[s]=i*this.intervalToFrequencyRatio(e[s]);return n}.bind(this,this._expr,t),this},t.Frequency.prototype.toMidi=function(){return this.frequencyToMidi(this.valueOf())},t.Frequency.prototype.toNote=function(){var e=this.valueOf(),n=Math.log(e/t.Frequency.A4)/Math.LN2,s=Math.round(12*n)+57,o=Math.floor(s/12);return o<0&&(s+=-12*o),i[s%12]+o.toString()},t.Frequency.prototype.toSeconds=function(){return 1/this.valueOf()},t.Frequency.prototype.toFrequency=function(){return this.valueOf()},t.Frequency.prototype.toTicks=function(){var e=this._beatsToUnits(1),i=this.valueOf()/e;return Math.floor(i*t.Transport.PPQ)},t.Frequency.prototype._frequencyToUnits=function(t){return t},t.Frequency.prototype._ticksToUnits=function(e){return 1/(60*e/(t.Transport.bpm.value*t.Transport.PPQ))},t.Frequency.prototype._beatsToUnits=function(e){return 1/t.TimeBase.prototype._beatsToUnits.call(this,e)},t.Frequency.prototype._secondsToUnits=function(t){return 1/t},t.Frequency.prototype._defaultUnits="hz";var e={cbb:-2,cb:-1,c:0,"c#":1,cx:2,dbb:0,db:1,d:2,"d#":3,dx:4,ebb:2,eb:3,e:4,"e#":5,ex:6,fbb:3,fb:4,f:5,"f#":6,fx:7,gbb:5,gb:6,g:7,"g#":8,gx:9,abb:7,ab:8,a:9,"a#":10,ax:11,bbb:9,bb:10,b:11,"b#":12,bx:13},i=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];return t.Frequency.A4=440,t.Frequency.prototype.midiToFrequency=function(e){return t.Frequency.A4*Math.pow(2,(e-69)/12)},t.Frequency.prototype.frequencyToMidi=function(e){return 69+12*Math.log(e/t.Frequency.A4)/Math.LN2},t.Frequency}),t(function(t){return t.TransportTime=function(e,i){if(!(this instanceof t.TransportTime))return new t.TransportTime(e,i);t.Time.call(this,e,i)},t.extend(t.TransportTime,t.Time),t.TransportTime.prototype._unaryExpressions=Object.create(t.Time.prototype._unaryExpressions),t.TransportTime.prototype._unaryExpressions.quantize={regexp:/^@/,method:function(e){var i=this._secondsToTicks(e()),n=Math.ceil(t.Transport.ticks/i);return this._ticksToUnits(n*i)}},t.TransportTime.prototype._secondsToTicks=function(e){var i=e/this._beatsToUnits(1);return Math.round(i*t.Transport.PPQ)},t.TransportTime.prototype.valueOf=function(){return this._secondsToTicks(this._expr())+(this._plusNow?t.Transport.ticks:0)},t.TransportTime.prototype.toTicks=function(){return this.valueOf()},t.TransportTime.prototype.toSeconds=function(){return this._expr()+(this._plusNow?t.Transport.seconds:0)},t.TransportTime.prototype.toFrequency=function(){return 1/this.toSeconds()},t.TransportTime}),t(function(t){return t.Emitter=function(){this._events={}},t.extend(t.Emitter),t.Emitter.prototype.on=function(t,e){for(var i=t.split(/\W+/),n=0;n<i.length;n++){var s=i[n];this._events.hasOwnProperty(s)||(this._events[s]=[]),this._events[s].push(e)}return this},t.Emitter.prototype.off=function(e,i){for(var n=e.split(/\W+/),s=0;s<n.length;s++)if(e=n[s],this._events.hasOwnProperty(e))if(t.prototype.isUndef(i))this._events[e]=[];else for(var o=this._events[e],r=0;r<o.length;r++)o[r]===i&&o.splice(r,1);return this},t.Emitter.prototype.emit=function(t){if(this._events){var e=Array.apply(null,arguments).slice(1);if(this._events.hasOwnProperty(t))for(var i=this._events[t],n=0,s=i.length;n<s;n++)i[n].apply(this,e)}return this},t.Emitter.mixin=function(e){var i=["on","off","emit"];e._events={};for(var n=0;n<i.length;n++){var s=i[n],o=t.Emitter.prototype[s];e[s]=o}},t.Emitter.prototype.dispose=function(){return t.prototype.dispose.call(this),this._events=null,this},t.Emitter}),t(function(t){return!window.hasOwnProperty("AudioContext")&&window.hasOwnProperty("webkitAudioContext")&&(window.AudioContext=window.webkitAudioContext),t.Context=function(e){t.Emitter.call(this),e||(e=new window.AudioContext),this._context=e;for(var i in this._context)this._defineProperty(this._context,i);this._latencyHint="interactive",this._lookAhead=.1,this._updateInterval=this._lookAhead/3,this._computedUpdateInterval=0,this._worker=this._createWorker(),this._constants={}},t.extend(t.Context,t.Emitter),t.Emitter.mixin(t.Context),t.Context.prototype._defineProperty=function(t,e){this.isUndef(this[e])&&Object.defineProperty(this,e,{get:function(){return"function"==typeof t[e]?t[e].bind(t):t[e]},set:function(i){t[e]=i}})},t.Context.prototype.now=function(){return this._context.currentTime},t.Context.prototype._createWorker=function(){window.URL=window.URL||window.webkitURL;var t=new Blob(["var timeoutTime = "+(1e3*this._updateInterval).toFixed(1)+";self.onmessage = function(msg){\ttimeoutTime = parseInt(msg.data);};function tick(){\tsetTimeout(tick, timeoutTime);\tself.postMessage('tick');}tick();"]),e=URL.createObjectURL(t),i=new Worker(e);return i.addEventListener("message",function(){this.emit("tick")}.bind(this)),i.addEventListener("message",function(){var t=this.now();if(this.isNumber(this._lastUpdate)){var e=t-this._lastUpdate;this._computedUpdateInterval=Math.max(e,.97*this._computedUpdateInterval)}this._lastUpdate=t}.bind(this)),i},t.Context.prototype.getConstant=function(t){if(this._constants[t])return this._constants[t];for(var e=this._context.createBuffer(1,128,this._context.sampleRate),i=e.getChannelData(0),n=0;n<i.length;n++)i[n]=t;var s=this._context.createBufferSource();return s.channelCount=1,s.channelCountMode="explicit",s.buffer=e,s.loop=!0,s.start(0),this._constants[t]=s,s},Object.defineProperty(t.Context.prototype,"lag",{get:function(){var t=this._computedUpdateInterval-this._updateInterval;return t=Math.max(t,0)}}),Object.defineProperty(t.Context.prototype,"lookAhead",{get:function(){return this._lookAhead},set:function(t){this._lookAhead=t}}),Object.defineProperty(t.Context.prototype,"updateInterval",{get:function(){return this._updateInterval},set:function(e){this._updateInterval=Math.max(e,t.prototype.blockTime),this._worker.postMessage(Math.max(1e3*e,1))}}),Object.defineProperty(t.Context.prototype,"latencyHint",{get:function(){return this._latencyHint},set:function(t){var e=t;if(this._latencyHint=t,this.isString(t))switch(t){case"interactive":e=.1,this._context.latencyHint=t;break;case"playback":e=.8,this._context.latencyHint=t;break;case"balanced":e=.25,this._context.latencyHint=t;break;case"fastest":e=.01}this.lookAhead=e,this.updateInterval=e/3}}),t.supported?(!function(){function e(e,i,s){if(e.input)Array.isArray(e.input)?(t.prototype.isUndef(s)&&(s=0),this.connect(e.input[s])):this.connect(e.input,i,s);else try{e instanceof AudioNode?n.call(this,e,i,s):n.call(this,e,i)}catch(t){throw new Error("error connecting to node: "+e+"\n"+t)}}function i(e,i,n){if(e&&e.input&&Array.isArray(e.input))t.prototype.isUndef(n)&&(n=0),this.disconnect(e.input[n],i,n);else if(e&&e.input)this.disconnect(e.input,i,n);else try{s.apply(this,arguments)}catch(t){throw new Error("error disconnecting node: "+e+"\n"+t)}}var n=AudioNode.prototype.connect,s=AudioNode.prototype.disconnect;AudioNode.prototype.connect!==e&&(AudioNode.prototype.connect=e,AudioNode.prototype.disconnect=i)}(),t.context=new t.Context):console.warn("This browser does not support Tone.js"),t.Context}),t(function(t){return t.Type={Default:"number",Time:"time",Frequency:"frequency",TransportTime:"transportTime",Ticks:"ticks",NormalRange:"normalRange",AudioRange:"audioRange",Decibels:"db",Interval:"interval",BPM:"bpm",Positive:"positive",Cents:"cents",Degrees:"degrees",MIDI:"midi",BarsBeatsSixteenths:"barsBeatsSixteenths",Samples:"samples",Hertz:"hertz",Note:"note",Milliseconds:"milliseconds",Seconds:"seconds",Notation:"notation"},t.prototype.toSeconds=function(e){return this.isNumber(e)?e:this.isUndef(e)?this.now():this.isString(e)?new t.Time(e).toSeconds():e instanceof t.TimeBase?e.toSeconds():void 0},t.prototype.toFrequency=function(e){return this.isNumber(e)?e:this.isString(e)||this.isUndef(e)?new t.Frequency(e).valueOf():e instanceof t.TimeBase?e.toFrequency():void 0},t.prototype.toTicks=function(e){return this.isNumber(e)||this.isString(e)?new t.TransportTime(e).toTicks():this.isUndef(e)?t.Transport.ticks:e instanceof t.TimeBase?e.toTicks():void 0},t}),t(function(t){return t.Param=function(){var e=this.optionsObject(arguments,["param","units","convert"],t.Param.defaults);this._param=this.input=e.param,this.units=e.units,this.convert=e.convert,this.overridden=!1,this._lfo=null,this.isObject(e.lfo)?this.value=e.lfo:this.isUndef(e.value)||(this.value=e.value)},t.extend(t.Param),t.Param.defaults={units:t.Type.Default,convert:!0,param:void 0},Object.defineProperty(t.Param.prototype,"value",{get:function(){return this._toUnits(this._param.value)},set:function(e){if(this.isObject(e)){if(this.isUndef(t.LFO))throw new Error("Include 'Tone.LFO' to use an LFO as a Param value.");this._lfo&&this._lfo.dispose(),this._lfo=new t.LFO(e).start(),this._lfo.connect(this.input)}else{var i=this._fromUnits(e);this._param.cancelScheduledValues(0),this._param.value=i}}}),t.Param.prototype._fromUnits=function(e){if(!this.convert&&!this.isUndef(this.convert))return e;switch(this.units){case t.Type.Time:return this.toSeconds(e);case t.Type.Frequency:return this.toFrequency(e);case t.Type.Decibels:return this.dbToGain(e);case t.Type.NormalRange:return Math.min(Math.max(e,0),1);case t.Type.AudioRange:return Math.min(Math.max(e,-1),1);case t.Type.Positive:return Math.max(e,0);default:return e}},t.Param.prototype._toUnits=function(e){if(!this.convert&&!this.isUndef(this.convert))return e;switch(this.units){case t.Type.Decibels:return this.gainToDb(e);default:return e}},t.Param.prototype._minOutput=1e-5,t.Param.prototype.setValueAtTime=function(t,e){return t=this._fromUnits(t),e=this.toSeconds(e),e<=this.now()+this.blockTime?this._param.value=t:this._param.setValueAtTime(t,e),this},t.Param.prototype.setRampPoint=function(t){t=this.defaultArg(t,this.now());var e=this._param.value;return 0===e&&(e=this._minOutput),this._param.setValueAtTime(e,t),this},t.Param.prototype.linearRampToValueAtTime=function(t,e){return t=this._fromUnits(t),this._param.linearRampToValueAtTime(t,this.toSeconds(e)),this},t.Param.prototype.exponentialRampToValueAtTime=function(t,e){return t=this._fromUnits(t),t=Math.max(this._minOutput,t),this._param.exponentialRampToValueAtTime(t,this.toSeconds(e)),this},t.Param.prototype.exponentialRampToValue=function(t,e,i){return i=this.toSeconds(i),this.setRampPoint(i),this.exponentialRampToValueAtTime(t,i+this.toSeconds(e)),this},t.Param.prototype.linearRampToValue=function(t,e,i){return i=this.toSeconds(i),this.setRampPoint(i),this.linearRampToValueAtTime(t,i+this.toSeconds(e)),this},t.Param.prototype.setTargetAtTime=function(t,e,i){return t=this._fromUnits(t),t=Math.max(this._minOutput,t),i=Math.max(this._minOutput,i),this._param.setTargetAtTime(t,this.toSeconds(e),i),this},t.Param.prototype.setValueCurveAtTime=function(t,e,i){for(var n=0;n<t.length;n++)t[n]=this._fromUnits(t[n]);return this._param.setValueCurveAtTime(t,this.toSeconds(e),this.toSeconds(i)),this},t.Param.prototype.cancelScheduledValues=function(t){return this._param.cancelScheduledValues(this.toSeconds(t)),this},t.Param.prototype.rampTo=function(e,i,n){return i=this.defaultArg(i,0),this.units===t.Type.Frequency||this.units===t.Type.BPM||this.units===t.Type.Decibels?this.exponentialRampToValue(e,i,n):this.linearRampToValue(e,i,n),this},Object.defineProperty(t.Param.prototype,"lfo",{get:function(){return this._lfo}}),t.Param.prototype.dispose=function(){return t.prototype.dispose.call(this),this._param=null,this._lfo&&(this._lfo.dispose(),this._lfo=null),this},t.Param}),t(function(t){return window.GainNode&&!AudioContext.prototype.createGain&&(AudioContext.prototype.createGain=AudioContext.prototype.createGainNode),t.Gain=function(){var e=this.optionsObject(arguments,["gain","units"],t.Gain.defaults);this.input=this.output=this._gainNode=this.context.createGain(),this.gain=new t.Param({param:this._gainNode.gain,units:e.units,value:e.gain,convert:e.convert}),this._readOnly("gain")},t.extend(t.Gain),t.Gain.defaults={gain:1,convert:!0},t.Gain.prototype.dispose=function(){t.Param.prototype.dispose.call(this),this._gainNode.disconnect(),this._gainNode=null,this._writable("gain"),this.gain.dispose(),this.gain=null},t.prototype.createInsOuts=function(e,i){1===e?this.input=new t.Gain:e>1&&(this.input=new Array(e)),1===i?this.output=new t.Gain:i>1&&(this.output=new Array(e))},t.Gain}),t(function(t){return t.Signal=function(){var e=this.optionsObject(arguments,["value","units"],t.Signal.defaults);this.output=this._gain=this.context.createGain(),e.param=this._gain.gain,t.Param.call(this,e),this.input=this._param=this._gain.gain,this.context.getConstant(1).chain(this._gain)},t.extend(t.Signal,t.Param),t.Signal.defaults={value:0,units:t.Type.Default,convert:!0},t.Signal.prototype.connect=t.SignalBase.prototype.connect,t.Signal.prototype.dispose=function(){return t.Param.prototype.dispose.call(this),this._param=null,this._gain.disconnect(),this._gain=null,this},t.Signal}),t(function(t){return t.Timeline=function(){var e=this.optionsObject(arguments,["memory"],t.Timeline.defaults);this._timeline=[],this._toRemove=[],this._iterating=!1,this.memory=e.memory},t.extend(t.Timeline),t.Timeline.defaults={memory:1/0},Object.defineProperty(t.Timeline.prototype,"length",{get:function(){return this._timeline.length}}),t.Timeline.prototype.add=function(t){if(this.isUndef(t.time))throw new Error("Tone.Timeline: events must have a time attribute");if(this._timeline.length){var e=this._search(t.time);this._timeline.splice(e+1,0,t)}else this._timeline.push(t);if(this.length>this.memory){var i=this.length-this.memory;this._timeline.splice(0,i)}return this},t.Timeline.prototype.remove=function(t){if(this._iterating)this._toRemove.push(t);else{var e=this._timeline.indexOf(t);-1!==e&&this._timeline.splice(e,1)}return this},t.Timeline.prototype.get=function(t){var e=this._search(t);return-1!==e?this._timeline[e]:null},t.Timeline.prototype.peek=function(){return this._timeline[0]},t.Timeline.prototype.shift=function(){return this._timeline.shift()},t.Timeline.prototype.getAfter=function(t){var e=this._search(t);return e+1<this._timeline.length?this._timeline[e+1]:null},t.Timeline.prototype.getBefore=function(t){var e=this._timeline.length;if(e>0&&this._timeline[e-1].time<t)return this._timeline[e-1];var i=this._search(t);return i-1>=0?this._timeline[i-1]:null},t.Timeline.prototype.cancel=function(t){if(this._timeline.length>1){var e=this._search(t);if(e>=0)if(this._timeline[e].time===t){for(var i=e;i>=0&&this._timeline[i].time===t;i--)e=i;this._timeline=this._timeline.slice(0,e)}else this._timeline=this._timeline.slice(0,e+1);else this._timeline=[]}else 1===this._timeline.length&&this._timeline[0].time>=t&&(this._timeline=[]);return this},t.Timeline.prototype.cancelBefore=function(t){if(this._timeline.length){var e=this._search(t);e>=0&&(this._timeline=this._timeline.slice(e+1))}return this},t.Timeline.prototype._search=function(t){var e=0,i=this._timeline.length,n=i;if(i>0&&this._timeline[i-1].time<=t)return i-1;for(;e<n;){var s=Math.floor(e+(n-e)/2),o=this._timeline[s],r=this._timeline[s+1];if(o.time===t){for(var a=s;a<this._timeline.length;a++)this._timeline[a].time===t&&(s=a);return s}if(o.time<t&&r.time>t)return s;o.time>t?n=s:o.time<t&&(e=s+1)}return-1},t.Timeline.prototype._iterate=function(t,e,i){this._iterating=!0,e=this.defaultArg(e,0),i=this.defaultArg(i,this._timeline.length-1);for(var n=e;n<=i;n++)t(this._timeline[n]);if(this._iterating=!1,this._toRemove.length>0){for(var s=0;s<this._toRemove.length;s++){var o=this._timeline.indexOf(this._toRemove[s]);-1!==o&&this._timeline.splice(o,1)}this._toRemove=[]}},t.Timeline.prototype.forEach=function(t){return this._iterate(t),this},t.Timeline.prototype.forEachBefore=function(t,e){var i=this._search(t);return-1!==i&&this._iterate(e,0,i),this},t.Timeline.prototype.forEachAfter=function(t,e){var i=this._search(t);return this._iterate(e,i+1),this},t.Timeline.prototype.forEachFrom=function(t,e){for(var i=this._search(t);i>=0&&this._timeline[i].time>=t;)i--;return this._iterate(e,i+1),this},t.Timeline.prototype.forEachAtTime=function(t,e){var i=this._search(t);return-1!==i&&this._iterate(function(i){i.time===t&&e(i)},0,i),this},t.Timeline.prototype.dispose=function(){t.prototype.dispose.call(this),this._timeline=null,this._toRemove=null},t.Timeline}),t(function(t){return t.TimelineSignal=function(){var e=this.optionsObject(arguments,["value","units"],t.Signal.defaults);this._events=new t.Timeline(10),t.Signal.apply(this,e),e.param=this._param,t.Param.call(this,e),this._initial=this._fromUnits(this._param.value)},t.extend(t.TimelineSignal,t.Param),t.TimelineSignal.Type={Linear:"linear",Exponential:"exponential",Target:"target",Curve:"curve",Set:"set"},Object.defineProperty(t.TimelineSignal.prototype,"value",{get:function(){var t=this.now(),e=this.getValueAtTime(t);return this._toUnits(e)},set:function(t){var e=this._fromUnits(t);this._initial=e,this.cancelScheduledValues(),this._param.value=e}}),t.TimelineSignal.prototype.setValueAtTime=function(e,i){return e=this._fromUnits(e),i=this.toSeconds(i),this._events.add({type:t.TimelineSignal.Type.Set,value:e,time:i}),this._param.setValueAtTime(e,i),this},t.TimelineSignal.prototype.linearRampToValueAtTime=function(e,i){return e=this._fromUnits(e),i=this.toSeconds(i),this._events.add({type:t.TimelineSignal.Type.Linear,value:e,time:i}),this._param.linearRampToValueAtTime(e,i),this},t.TimelineSignal.prototype.exponentialRampToValueAtTime=function(e,i){i=this.toSeconds(i);var n=this._searchBefore(i);n&&0===n.value&&this.setValueAtTime(this._minOutput,n.time),e=this._fromUnits(e);var s=Math.max(e,this._minOutput);return this._events.add({type:t.TimelineSignal.Type.Exponential,value:s,time:i}),e<this._minOutput?(this._param.exponentialRampToValueAtTime(this._minOutput,i-this.sampleTime),this.setValueAtTime(0,i)):this._param.exponentialRampToValueAtTime(e,i),this},t.TimelineSignal.prototype.setTargetAtTime=function(e,i,n){return e=this._fromUnits(e),e=Math.max(this._minOutput,e),n=Math.max(this._minOutput,n),i=this.toSeconds(i),this._events.add({type:t.TimelineSignal.Type.Target,value:e,time:i,constant:n}),this._param.setTargetAtTime(e,i,n),this},t.TimelineSignal.prototype.setValueCurveAtTime=function(e,i,n,s){s=this.defaultArg(s,1);for(var o=new Array(e.length),r=0;r<o.length;r++)o[r]=this._fromUnits(e[r])*s;i=this.toSeconds(i),n=this.toSeconds(n),this._events.add({type:t.TimelineSignal.Type.Curve,value:o,time:i,duration:n}),this._param.setValueAtTime(o[0],i);for(var a=1;a<o.length;a++){var h=i+a/(o.length-1)*n;this._param.linearRampToValueAtTime(o[a],h)}return this},t.TimelineSignal.prototype.cancelScheduledValues=function(t){return t=this.toSeconds(t),this._events.cancel(t),this._param.cancelScheduledValues(t),this},t.TimelineSignal.prototype.setRampPoint=function(e){e=this.toSeconds(e);var i=this._toUnits(this.getValueAtTime(e)),n=this._searchBefore(e);if(n&&n.time===e)this.cancelScheduledValues(e+this.sampleTime);else if(n&&n.type===t.TimelineSignal.Type.Curve&&n.time+n.duration>e)this.cancelScheduledValues(e),this.linearRampToValueAtTime(i,e);else{var s=this._searchAfter(e);s&&(this.cancelScheduledValues(e),s.type===t.TimelineSignal.Type.Linear?this.linearRampToValueAtTime(i,e):s.type===t.TimelineSignal.Type.Exponential&&this.exponentialRampToValueAtTime(i,e)),this.setValueAtTime(i,e)}return this},t.TimelineSignal.prototype.linearRampToValueBetween=function(t,e,i){return this.setRampPoint(e),this.linearRampToValueAtTime(t,i),this},t.TimelineSignal.prototype.exponentialRampToValueBetween=function(t,e,i){return this.setRampPoint(e),this.exponentialRampToValueAtTime(t,i),this},t.TimelineSignal.prototype._searchBefore=function(t){return this._events.get(t)},t.TimelineSignal.prototype._searchAfter=function(t){return this._events.getAfter(t)},t.TimelineSignal.prototype.getValueAtTime=function(e){e=this.toSeconds(e);var i=this._searchAfter(e),n=this._searchBefore(e),s=this._initial;if(null===n)s=this._initial;else if(n.type===t.TimelineSignal.Type.Target){var o,r=this._events.getBefore(n.time);o=null===r?this._initial:r.value,s=this._exponentialApproach(n.time,o,n.value,n.constant,e)}else s=n.type===t.TimelineSignal.Type.Curve?this._curveInterpolate(n.time,n.value,n.duration,e):null===i?n.value:i.type===t.TimelineSignal.Type.Linear?this._linearInterpolate(n.time,n.value,i.time,i.value,e):i.type===t.TimelineSignal.Type.Exponential?this._exponentialInterpolate(n.time,n.value,i.time,i.value,e):n.value;return s},t.TimelineSignal.prototype.connect=t.SignalBase.prototype.connect,t.TimelineSignal.prototype._exponentialApproach=function(t,e,i,n,s){return i+(e-i)*Math.exp(-(s-t)/n)},t.TimelineSignal.prototype._linearInterpolate=function(t,e,i,n,s){return e+(s-t)/(i-t)*(n-e)},t.TimelineSignal.prototype._exponentialInterpolate=function(t,e,i,n,s){return(e=Math.max(this._minOutput,e))*Math.pow(n/e,(s-t)/(i-t))},t.TimelineSignal.prototype._curveInterpolate=function(t,e,i,n){var s=e.length;if(n>=t+i)return e[s-1];if(n<=t)return e[0];var o=(n-t)/i,r=Math.floor((s-1)*o),a=Math.ceil((s-1)*o),h=e[r],l=e[a];return a===r?h:this._linearInterpolate(r,h,a,l,o*(s-1))},t.TimelineSignal.prototype.dispose=function(){t.Signal.prototype.dispose.call(this),t.Param.prototype.dispose.call(this),this._events.dispose(),this._events=null},t.TimelineSignal}),t(function(t){return t.Pow=function(e){this._exp=this.defaultArg(e,1),this._expScaler=this.input=this.output=new t.WaveShaper(this._expFunc(this._exp),8192)},t.extend(t.Pow,t.SignalBase),Object.defineProperty(t.Pow.prototype,"value",{get:function(){return this._exp},set:function(t){this._exp=t,this._expScaler.setMap(this._expFunc(this._exp))}}),t.Pow.prototype._expFunc=function(t){return function(e){return Math.pow(Math.abs(e),t)}},t.Pow.prototype.dispose=function(){return t.prototype.dispose.call(this),this._expScaler.dispose(),this._expScaler=null,this},t.Pow}),t(function(t){return t.Envelope=function(){var e=this.optionsObject(arguments,["attack","decay","sustain","release"],t.Envelope.defaults);this.attack=e.attack,this.decay=e.decay,this.sustain=e.sustain,this.release=e.release,this._attackCurve="linear",this._releaseCurve="exponential",this._sig=this.output=new t.TimelineSignal,this._sig.setValueAtTime(0,0),this.attackCurve=e.attackCurve,this.releaseCurve=e.releaseCurve},t.extend(t.Envelope),t.Envelope.defaults={attack:.01,decay:.1,sustain:.5,release:1,attackCurve:"linear",releaseCurve:"exponential"},Object.defineProperty(t.Envelope.prototype,"value",{get:function(){return this.getValueAtTime(this.now())}}),Object.defineProperty(t.Envelope.prototype,"attackCurve",{get:function(){if(this.isString(this._attackCurve))return this._attackCurve;if(this.isArray(this._attackCurve)){for(var e in t.Envelope.Type)if(t.Envelope.Type[e].In===this._attackCurve)return e;return this._attackCurve}},set:function(e){if(t.Envelope.Type.hasOwnProperty(e)){var i=t.Envelope.Type[e];this.isObject(i)?this._attackCurve=i.In:this._attackCurve=i}else{if(!this.isArray(e))throw new Error("Tone.Envelope: invalid curve: "+e);this._attackCurve=e}}}),Object.defineProperty(t.Envelope.prototype,"releaseCurve",{get:function(){if(this.isString(this._releaseCurve))return this._releaseCurve;if(this.isArray(this._releaseCurve)){for(var e in t.Envelope.Type)if(t.Envelope.Type[e].Out===this._releaseCurve)return e;return this._releaseCurve}},set:function(e){if(t.Envelope.Type.hasOwnProperty(e)){var i=t.Envelope.Type[e];this.isObject(i)?this._releaseCurve=i.Out:this._releaseCurve=i}else{if(!this.isArray(e))throw new Error("Tone.Envelope: invalid curve: "+e);this._releaseCurve=e}}}),t.Envelope.prototype.triggerAttack=function(t,e){t=this.toSeconds(t);var i=this.toSeconds(this.attack),n=i,s=this.toSeconds(this.decay);e=this.defaultArg(e,1);var o=this.getValueAtTime(t);if(o>0&&(n=(1-o)/(1/n)),"linear"===this._attackCurve)this._sig.linearRampToValue(e,n,t);else if("exponential"===this._attackCurve)this._sig.exponentialRampToValue(e,n,t);else if(n>0){this._sig.setRampPoint(t);var r=this._attackCurve;if(n<i){var a=1-n/i,h=Math.floor(a*this._attackCurve.length);(r=this._attackCurve.slice(h))[0]=o}this._sig.setValueCurveAtTime(r,t,n,e)}return this._sig.exponentialRampToValue(e*this.sustain,s,n+t),this},t.Envelope.prototype.triggerRelease=function(t){t=this.toSeconds(t);var e=this.getValueAtTime(t);if(e>0){var i=this.toSeconds(this.release);if("linear"===this._releaseCurve)this._sig.linearRampToValue(0,i,t);else if("exponential"===this._releaseCurve)this._sig.exponentialRampToValue(0,i,t);else{var n=this._releaseCurve;this.isArray(n)&&(this._sig.setRampPoint(t),this._sig.setValueCurveAtTime(n,t,i,e))}}return this},t.Envelope.prototype.getValueAtTime=function(t){return this._sig.getValueAtTime(t)},t.Envelope.prototype.triggerAttackRelease=function(t,e,i){return e=this.toSeconds(e),this.triggerAttack(e,i),this.triggerRelease(e+this.toSeconds(t)),this},t.Envelope.prototype.cancel=function(t){return this._sig.cancelScheduledValues(t),this},t.Envelope.prototype.connect=t.Signal.prototype.connect,function(){function e(t){for(var e=new Array(t.length),i=0;i<t.length;i++)e[i]=1-t[i];return e}var i,n,s=[];for(i=0;i<128;i++)s[i]=Math.sin(i/127*(Math.PI/2));var o=[];for(i=0;i<127;i++){n=i/127;var r=Math.sin(n*(2*Math.PI)*6.4-Math.PI/2)+1;o[i]=r/10+.83*n}o[127]=1;var a=[];for(i=0;i<128;i++)a[i]=Math.ceil(i/127*5)/5;var h=[];for(i=0;i<128;i++)n=i/127,h[i]=.5*(1-Math.cos(Math.PI*n));var l=[];for(i=0;i<128;i++){n=i/127;var u=4*Math.pow(n,3)+.2,p=Math.cos(u*Math.PI*2*n);l[i]=Math.abs(p*(1-n))}t.Envelope.Type={linear:"linear",exponential:"exponential",bounce:{In:e(l),Out:l},cosine:{In:s,Out:function(t){return t.slice(0).reverse()}(s)},step:{In:a,Out:e(a)},ripple:{In:o,Out:e(o)},sine:{In:h,Out:e(h)}}}(),t.Envelope.prototype.dispose=function(){return t.prototype.dispose.call(this),this._sig.dispose(),this._sig=null,this._attackCurve=null,this._releaseCurve=null,this},t.Envelope}),t(function(t){return t.AmplitudeEnvelope=function(){t.Envelope.apply(this,arguments),this.input=this.output=new t.Gain,this._sig.connect(this.output.gain)},t.extend(t.AmplitudeEnvelope,t.Envelope),t.AmplitudeEnvelope.prototype.dispose=function(){return this.input.dispose(),this.input=null,t.Envelope.prototype.dispose.call(this),this},t.AmplitudeEnvelope}),t(function(t){return window.AnalyserNode&&!AnalyserNode.prototype.getFloatTimeDomainData&&(AnalyserNode.prototype.getFloatTimeDomainData=function(t){var e=new Uint8Array(t.length);this.getByteTimeDomainData(e);for(var i=0;i<e.length;i++)t[i]=(e[i]-128)/128}),t.Analyser=function(){var e=this.optionsObject(arguments,["type","size"],t.Analyser.defaults);this._analyser=this.input=this.output=this.context.createAnalyser(),this._type=e.type,this._returnType=e.returnType,this._buffer=null,this.size=e.size,this.type=e.type,this.returnType=e.returnType,this.minDecibels=e.minDecibels,this.maxDecibels=e.maxDecibels},t.extend(t.Analyser),t.Analyser.defaults={size:1024,returnType:"byte",type:"fft",smoothing:.8,maxDecibels:-30,minDecibels:-100},t.Analyser.Type={Waveform:"waveform",FFT:"fft"},t.Analyser.ReturnType={Byte:"byte",Float:"float"},t.Analyser.prototype.analyse=function(){return this._type===t.Analyser.Type.FFT?this._returnType===t.Analyser.ReturnType.Byte?this._analyser.getByteFrequencyData(this._buffer):this._analyser.getFloatFrequencyData(this._buffer):this._type===t.Analyser.Type.Waveform&&(this._returnType===t.Analyser.ReturnType.Byte?this._analyser.getByteTimeDomainData(this._buffer):this._analyser.getFloatTimeDomainData(this._buffer)),this._buffer},Object.defineProperty(t.Analyser.prototype,"size",{get:function(){return this._analyser.frequencyBinCount},set:function(t){this._analyser.fftSize=2*t,this.type=this._type}}),Object.defineProperty(t.Analyser.prototype,"returnType",{get:function(){return this._returnType},set:function(e){if(e===t.Analyser.ReturnType.Byte)this._buffer=new Uint8Array(this._analyser.frequencyBinCount);else{if(e!==t.Analyser.ReturnType.Float)throw new TypeError("Tone.Analayser: invalid return type: "+e);this._buffer=new Float32Array(this._analyser.frequencyBinCount)}this._returnType=e}}),Object.defineProperty(t.Analyser.prototype,"type",{get:function(){return this._type},set:function(e){if(e!==t.Analyser.Type.Waveform&&e!==t.Analyser.Type.FFT)throw new TypeError("Tone.Analyser: invalid type: "+e);this._type=e}}),Object.defineProperty(t.Analyser.prototype,"smoothing",{get:function(){return this._analyser.smoothingTimeConstant},set:function(t){this._analyser.smoothingTimeConstant=t}}),Object.defineProperty(t.Analyser.prototype,"minDecibels",{get:function(){return this._analyser.minDecibels},set:function(t){this._analyser.minDecibels=t}}),Object.defineProperty(t.Analyser.prototype,"maxDecibels",{get:function(){return this._analyser.maxDecibels},set:function(t){this._analyser.maxDecibels=t}}),t.Analyser.prototype.dispose=function(){t.prototype.dispose.call(this),this._analyser.disconnect(),this._analyser=null,this._buffer=null},t.Analyser}),t(function(t){return t.Compressor=function(){var e=this.optionsObject(arguments,["threshold","ratio"],t.Compressor.defaults);this._compressor=this.input=this.output=this.context.createDynamicsCompressor(),this.threshold=new t.Param({param:this._compressor.threshold,units:t.Type.Decibels,convert:!1}),this.attack=new t.Param(this._compressor.attack,t.Type.Time),this.release=new t.Param(this._compressor.release,t.Type.Time),this.knee=new t.Param({param:this._compressor.knee,units:t.Type.Decibels,convert:!1}),this.ratio=new t.Param({param:this._compressor.ratio,convert:!1}),this._readOnly(["knee","release","attack","ratio","threshold"]),this.set(e)},t.extend(t.Compressor),t.Compressor.defaults={ratio:12,threshold:-24,release:.25,attack:.003,knee:30},t.Compressor.prototype.dispose=function(){return t.prototype.dispose.call(this),this._writable(["knee","release","attack","ratio","threshold"]),this._compressor.disconnect(),this._compressor=null,this.attack.dispose(),this.attack=null,this.release.dispose(),this.release=null,this.threshold.dispose(),this.threshold=null,this.ratio.dispose(),this.ratio=null,this.knee.dispose(),this.knee=null,this},t.Compressor}),t(function(t){return t.Add=function(e){this.createInsOuts(2,0),this._sum=this.input[0]=this.input[1]=this.output=new t.Gain,this._param=this.input[1]=new t.Signal(e),this._param.connect(this._sum)},t.extend(t.Add,t.Signal),t.Add.prototype.dispose=function(){return t.prototype.dispose.call(this),this._sum.dispose(),this._sum=null,this._param.dispose(),this._param=null,this},t.Add}),t(function(t){return t.Multiply=function(e){this.createInsOuts(2,0),this._mult=this.input[0]=this.output=new t.Gain,this._param=this.input[1]=this.output.gain,this._param.value=this.defaultArg(e,0)},t.extend(t.Multiply,t.Signal),t.Multiply.prototype.dispose=function(){return t.prototype.dispose.call(this),this._mult.dispose(),this._mult=null,this._param=null,this},t.Multiply}),t(function(t){return t.Negate=function(){this._multiply=this.input=this.output=new t.Multiply(-1)},t.extend(t.Negate,t.SignalBase),t.Negate.prototype.dispose=function(){return t.prototype.dispose.call(this),this._multiply.dispose(),this._multiply=null,this},t.Negate}),t(function(t){return t.Subtract=function(e){this.createInsOuts(2,0),this._sum=this.input[0]=this.output=new t.Gain,this._neg=new t.Negate,this._param=this.input[1]=new t.Signal(e),this._param.chain(this._neg,this._sum)},t.extend(t.Subtract,t.Signal),t.Subtract.prototype.dispose=function(){return t.prototype.dispose.call(this),this._neg.dispose(),this._neg=null,this._sum.disconnect(),this._sum=null,this._param.dispose(),this._param=null,this},t.Subtract}),t(function(t){return t.GreaterThanZero=function(){this._thresh=this.output=new t.WaveShaper(function(t){return t<=0?0:1},127),this._scale=this.input=new t.Multiply(1e4),this._scale.connect(this._thresh)},t.extend(t.GreaterThanZero,t.SignalBase),t.GreaterThanZero.prototype.dispose=function(){return t.prototype.dispose.call(this),this._scale.dispose(),this._scale=null,this._thresh.dispose(),this._thresh=null,this},t.GreaterThanZero}),t(function(t){return t.GreaterThan=function(e){this.createInsOuts(2,0),this._param=this.input[0]=new t.Subtract(e),this.input[1]=this._param.input[1],this._gtz=this.output=new t.GreaterThanZero,this._param.connect(this._gtz)},t.extend(t.GreaterThan,t.Signal),t.GreaterThan.prototype.dispose=function(){return t.prototype.dispose.call(this),this._param.dispose(),this._param=null,this._gtz.dispose(),this._gtz=null,this},t.GreaterThan}),t(function(t){return t.Abs=function(){this._abs=this.input=this.output=new t.WaveShaper(function(t){return 0===t?0:Math.abs(t)},127)},t.extend(t.Abs,t.SignalBase),t.Abs.prototype.dispose=function(){return t.prototype.dispose.call(this),this._abs.dispose(),this._abs=null,this},t.Abs}),t(function(t){return t.Modulo=function(e){this.createInsOuts(1,0),this._shaper=new t.WaveShaper(Math.pow(2,16)),this._multiply=new t.Multiply,this._subtract=this.output=new t.Subtract,this._modSignal=new t.Signal(e),this.input.fan(this._shaper,this._subtract),this._modSignal.connect(this._multiply,0,0),this._shaper.connect(this._multiply,0,1),this._multiply.connect(this._subtract,0,1),this._setWaveShaper(e)},t.extend(t.Modulo,t.SignalBase),t.Modulo.prototype._setWaveShaper=function(t){this._shaper.setMap(function(e){return Math.floor((e+1e-4)/t)})},Object.defineProperty(t.Modulo.prototype,"value",{get:function(){return this._modSignal.value},set:function(t){this._modSignal.value=t,this._setWaveShaper(t)}}),t.Modulo.prototype.dispose=function(){return t.prototype.dispose.call(this),this._shaper.dispose(),this._shaper=null,this._multiply.dispose(),this._multiply=null,this._subtract.dispose(),this._subtract=null,this._modSignal.dispose(),this._modSignal=null,this},t.Modulo}),t(function(t){return t.AudioToGain=function(){this._norm=this.input=this.output=new t.WaveShaper(function(t){return(t+1)/2})},t.extend(t.AudioToGain,t.SignalBase),t.AudioToGain.prototype.dispose=function(){return t.prototype.dispose.call(this),this._norm.dispose(),this._norm=null,this},t.AudioToGain}),t(function(t){function e(t,e,i){var n=new t;return i._eval(e[0]).connect(n,0,0),i._eval(e[1]).connect(n,0,1),n}function i(t,e,i){var n=new t;return i._eval(e[0]).connect(n,0,0),n}function n(t){return t?parseFloat(t):void 0}function s(t){return t&&t.args?parseFloat(t.args):void 0}return t.Expr=function(){var t=this._replacements(Array.prototype.slice.call(arguments)),e=this._parseInputs(t);this._nodes=[],this.input=new Array(e);for(var i=0;i<e;i++)this.input[i]=this.context.createGain();var n,s=this._parseTree(t);try{n=this._eval(s)}catch(e){throw this._disposeNodes(),new Error("Tone.Expr: Could evaluate expression: "+t)}this.output=n},t.extend(t.Expr,t.SignalBase),t.Expr._Expressions={value:{signal:{regexp:/^\d+\.\d+|^\d+/,method:function(e){return new t.Signal(n(e))}},input:{regexp:/^\$\d/,method:function(t,e){return e.input[n(t.substr(1))]}}},glue:{"(":{regexp:/^\(/},")":{regexp:/^\)/},",":{regexp:/^,/}},func:{abs:{regexp:/^abs/,method:i.bind(this,t.Abs)},mod:{regexp:/^mod/,method:function(e,i){var n=s(e[1]),o=new t.Modulo(n);return i._eval(e[0]).connect(o),o}},pow:{regexp:/^pow/,method:function(e,i){var n=s(e[1]),o=new t.Pow(n);return i._eval(e[0]).connect(o),o}},a2g:{regexp:/^a2g/,method:function(e,i){var n=new t.AudioToGain;return i._eval(e[0]).connect(n),n}}},binary:{"+":{regexp:/^\+/,precedence:1,method:e.bind(this,t.Add)},"-":{regexp:/^\-/,precedence:1,method:function(n,s){return 1===n.length?i(t.Negate,n,s):e(t.Subtract,n,s)}},"*":{regexp:/^\*/,precedence:0,method:e.bind(this,t.Multiply)}},unary:{"-":{regexp:/^\-/,method:i.bind(this,t.Negate)},"!":{regexp:/^\!/,method:i.bind(this,t.NOT)}}},t.Expr.prototype._parseInputs=function(t){var e=t.match(/\$\d/g),i=0;if(null!==e)for(var n=0;n<e.length;n++){var s=parseInt(e[n].substr(1))+1;i=Math.max(i,s)}return i},t.Expr.prototype._replacements=function(t){for(var e=t.shift(),i=0;i<t.length;i++)e=e.replace(/\%/i,t[i]);return e},t.Expr.prototype._tokenize=function(e){for(var i=-1,n=[];e.length>0;){var s=function(e){for(var i in t.Expr._Expressions){var n=t.Expr._Expressions[i];for(var s in n){var o=n[s],r=o.regexp,a=e.match(r);if(null!==a)return{type:i,value:a[0],method:o.method}}}throw new SyntaxError("Tone.Expr: Unexpected token "+e)}(e=e.trim());n.push(s),e=e.substr(s.value.length)}return{next:function(){return n[++i]},peek:function(){return n[i+1]}}},t.Expr.prototype._parseTree=function(e){function i(t,e){return!u(t)&&"glue"===t.type&&t.value===e}function n(e,i,n){var s=t.Expr._Expressions[i];if(!u(e))for(var o in s){var r=s[o];if(r.regexp.test(e.value)){if(u(n))return!0;if(r.precedence===n)return!0}}return!1}function s(t){u(t)&&(t=5);var e;e=t<0?o():s(t-1);for(var i=l.peek();n(i,"binary",t);)e={operator:(i=l.next()).value,method:i.method,args:[e,s(t-1)]},i=l.peek();return e}function o(){var t,e;return t=l.peek(),n(t,"unary")?(t=l.next(),e=o(),{operator:t.value,method:t.method,args:[e]}):r()}function r(){var t,e;if(t=l.peek(),u(t))throw new SyntaxError("Tone.Expr: Unexpected termination of expression");if("func"===t.type)return t=l.next(),a(t);if("value"===t.type)return t=l.next(),{method:t.method,args:t.value};if(i(t,"(")){if(l.next(),e=s(),t=l.next(),!i(t,")"))throw new SyntaxError("Expected )");return e}throw new SyntaxError("Tone.Expr: Parse error, cannot process token "+t.value)}function a(t){var e,n=[];if(e=l.next(),!i(e,"("))throw new SyntaxError('Tone.Expr: Expected ( in a function call "'+t.value+'"');if(e=l.peek(),i(e,")")||(n=h()),e=l.next(),!i(e,")"))throw new SyntaxError('Tone.Expr: Expected ) in a function call "'+t.value+'"');return{method:t.method,args:n,name:name}}function h(){for(var t,e,n=[];;){if(e=s(),u(e))break;if(n.push(e),t=l.peek(),!i(t,","))break;l.next()}return n}var l=this._tokenize(e),u=this.isUndef.bind(this);return s()},t.Expr.prototype._eval=function(t){if(!this.isUndef(t)){var e=t.method(t.args,this);return this._nodes.push(e),e}},t.Expr.prototype._disposeNodes=function(){for(var t=0;t<this._nodes.length;t++){var e=this._nodes[t];this.isFunction(e.dispose)?e.dispose():this.isFunction(e.disconnect)&&e.disconnect(),e=null,this._nodes[t]=null}this._nodes=null},t.Expr.prototype.dispose=function(){t.prototype.dispose.call(this),this._disposeNodes()},t.Expr}),t(function(t){return t.EqualPowerGain=function(){this._eqPower=this.input=this.output=new t.WaveShaper(function(t){return Math.abs(t)<.001?0:this.equalPowerScale(t)}.bind(this),4096)},t.extend(t.EqualPowerGain,t.SignalBase),t.EqualPowerGain.prototype.dispose=function(){return t.prototype.dispose.call(this),this._eqPower.dispose(),this._eqPower=null,this},t.EqualPowerGain}),t(function(t){return t.CrossFade=function(e){this.createInsOuts(2,1),this.a=this.input[0]=new t.Gain,this.b=this.input[1]=new t.Gain,this.fade=new t.Signal(this.defaultArg(e,.5),t.Type.NormalRange),this._equalPowerA=new t.EqualPowerGain,this._equalPowerB=new t.EqualPowerGain,this._invert=new t.Expr("1 - $0"),this.a.connect(this.output),this.b.connect(this.output),this.fade.chain(this._equalPowerB,this.b.gain),this.fade.chain(this._invert,this._equalPowerA,this.a.gain),this._readOnly("fade")},t.extend(t.CrossFade),t.CrossFade.prototype.dispose=function(){return t.prototype.dispose.call(this),this._writable("fade"),this._equalPowerA.dispose(),this._equalPowerA=null,this._equalPowerB.dispose(),this._equalPowerB=null,this.fade.dispose(),this.fade=null,this._invert.dispose(),this._invert=null,this.a.dispose(),this.a=null,this.b.dispose(),this.b=null,this},t.CrossFade}),t(function(t){return t.Filter=function(){this.createInsOuts(1,1);var e=this.optionsObject(arguments,["frequency","type","rolloff"],t.Filter.defaults);this._filters=[],this.frequency=new t.Signal(e.frequency,t.Type.Frequency),this.detune=new t.Signal(0,t.Type.Cents),this.gain=new t.Signal({value:e.gain,convert:!1}),this.Q=new t.Signal(e.Q),this._type=e.type,this._rolloff=e.rolloff,this.rolloff=e.rolloff,this._readOnly(["detune","frequency","gain","Q"])},t.extend(t.Filter),t.Filter.defaults={type:"lowpass",frequency:350,rolloff:-12,Q:1,gain:0},Object.defineProperty(t.Filter.prototype,"type",{get:function(){return this._type},set:function(t){if(-1===["lowpass","highpass","bandpass","lowshelf","highshelf","notch","allpass","peaking"].indexOf(t))throw new TypeError("Tone.Filter: invalid type "+t);this._type=t;for(var e=0;e<this._filters.length;e++)this._filters[e].type=t}}),Object.defineProperty(t.Filter.prototype,"rolloff",{get:function(){return this._rolloff},set:function(t){t=parseInt(t,10);var e=[-12,-24,-48,-96].indexOf(t);if(-1===e)throw new RangeError("Tone.Filter: rolloff can only be -12, -24, -48 or -96");e+=1,this._rolloff=t,this.input.disconnect();for(var i=0;i<this._filters.length;i++)this._filters[i].disconnect(),this._filters[i]=null;this._filters=new Array(e);for(var n=0;n<e;n++){var s=this.context.createBiquadFilter();s.type=this._type,this.frequency.connect(s.frequency),this.detune.connect(s.detune),this.Q.connect(s.Q),this.gain.connect(s.gain),this._filters[n]=s}var o=[this.input].concat(this._filters).concat([this.output]);this.connectSeries.apply(this,o)}}),t.Filter.prototype.dispose=function(){t.prototype.dispose.call(this);for(var e=0;e<this._filters.length;e++)this._filters[e].disconnect(),this._filters[e]=null;return this._filters=null,this._writable(["detune","frequency","gain","Q"]),this.frequency.dispose(),this.Q.dispose(),this.frequency=null,this.Q=null,this.detune.dispose(),this.detune=null,this.gain.dispose(),this.gain=null,this},t.Filter}),t(function(t){return t.MultibandSplit=function(){var e=this.optionsObject(arguments,["lowFrequency","highFrequency"],t.MultibandSplit.defaults);this.input=new t.Gain,this.output=new Array(3),this.low=this.output[0]=new t.Filter(0,"lowpass"),this._lowMidFilter=new t.Filter(0,"highpass"),this.mid=this.output[1]=new t.Filter(0,"lowpass"),this.high=this.output[2]=new t.Filter(0,"highpass"),this.lowFrequency=new t.Signal(e.lowFrequency,t.Type.Frequency),this.highFrequency=new t.Signal(e.highFrequency,t.Type.Frequency),this.Q=new t.Signal(e.Q),this.input.fan(this.low,this.high),this.input.chain(this._lowMidFilter,this.mid),this.lowFrequency.connect(this.low.frequency),this.lowFrequency.connect(this._lowMidFilter.frequency),this.highFrequency.connect(this.mid.frequency),this.highFrequency.connect(this.high.frequency),this.Q.connect(this.low.Q),this.Q.connect(this._lowMidFilter.Q),this.Q.connect(this.mid.Q),this.Q.connect(this.high.Q),this._readOnly(["high","mid","low","highFrequency","lowFrequency"])},t.extend(t.MultibandSplit),t.MultibandSplit.defaults={lowFrequency:400,highFrequency:2500,Q:1},t.MultibandSplit.prototype.dispose=function(){return t.prototype.dispose.call(this),this._writable(["high","mid","low","highFrequency","lowFrequency"]),this.low.dispose(),this.low=null,this._lowMidFilter.dispose(),this._lowMidFilter=null,this.mid.dispose(),this.mid=null,this.high.dispose(),this.high=null,this.lowFrequency.dispose(),this.lowFrequency=null,this.highFrequency.dispose(),this.highFrequency=null,this.Q.dispose(),this.Q=null,this},t.MultibandSplit}),t(function(t){return t.EQ3=function(){var e=this.optionsObject(arguments,["low","mid","high"],t.EQ3.defaults);this.output=new t.Gain,this._multibandSplit=this.input=new t.MultibandSplit({lowFrequency:e.lowFrequency,highFrequency:e.highFrequency}),this._lowGain=new t.Gain(e.low,t.Type.Decibels),this._midGain=new t.Gain(e.mid,t.Type.Decibels),this._highGain=new t.Gain(e.high,t.Type.Decibels),this.low=this._lowGain.gain,this.mid=this._midGain.gain,this.high=this._highGain.gain,this.Q=this._multibandSplit.Q,this.lowFrequency=this._multibandSplit.lowFrequency,this.highFrequency=this._multibandSplit.highFrequency,this._multibandSplit.low.chain(this._lowGain,this.output),this._multibandSplit.mid.chain(this._midGain,this.output),this._multibandSplit.high.chain(this._highGain,this.output),this._readOnly(["low","mid","high","lowFrequency","highFrequency"])},t.extend(t.EQ3),t.EQ3.defaults={low:0,mid:0,high:0,lowFrequency:400,highFrequency:2500},t.EQ3.prototype.dispose=function(){return t.prototype.dispose.call(this),this._writable(["low","mid","high","lowFrequency","highFrequency"]),this._multibandSplit.dispose(),this._multibandSplit=null,this.lowFrequency=null,this.highFrequency=null,this._lowGain.dispose(),this._lowGain=null,this._midGain.dispose(),this._midGain=null,this._highGain.dispose(),this._highGain=null,this.low=null,this.mid=null,this.high=null,this.Q=null,this},t.EQ3}),t(function(t){return t.Scale=function(e,i){this._outputMin=this.defaultArg(e,0),this._outputMax=this.defaultArg(i,1),this._scale=this.input=new t.Multiply(1),this._add=this.output=new t.Add(0),this._scale.connect(this._add),this._setRange()},t.extend(t.Scale,t.SignalBase),Object.defineProperty(t.Scale.prototype,"min",{get:function(){return this._outputMin},set:function(t){this._outputMin=t,this._setRange()}}),Object.defineProperty(t.Scale.prototype,"max",{get:function(){return this._outputMax},set:function(t){this._outputMax=t,this._setRange()}}),t.Scale.prototype._setRange=function(){this._add.value=this._outputMin,this._scale.value=this._outputMax-this._outputMin},t.Scale.prototype.dispose=function(){return t.prototype.dispose.call(this),this._add.dispose(),this._add=null,this._scale.dispose(),this._scale=null,this},t.Scale}),t(function(t){return t.ScaleExp=function(e,i,n){this._scale=this.output=new t.Scale(e,i),this._exp=this.input=new t.Pow(this.defaultArg(n,2)),this._exp.connect(this._scale)},t.extend(t.ScaleExp,t.SignalBase),Object.defineProperty(t.ScaleExp.prototype,"exponent",{get:function(){return this._exp.value},set:function(t){this._exp.value=t}}),Object.defineProperty(t.ScaleExp.prototype,"min",{get:function(){return this._scale.min},set:function(t){this._scale.min=t}}),Object.defineProperty(t.ScaleExp.prototype,"max",{get:function(){return this._scale.max},set:function(t){this._scale.max=t}}),t.ScaleExp.prototype.dispose=function(){return t.prototype.dispose.call(this),this._scale.dispose(),this._scale=null,this._exp.dispose(),this._exp=null,this},t.ScaleExp}),t(function(t){return window.DelayNode&&!AudioContext.prototype.createDelay&&(AudioContext.prototype.createDelay=AudioContext.prototype.createDelayNode),t.Delay=function(){var e=this.optionsObject(arguments,["delayTime","maxDelay"],t.Delay.defaults);this._delayNode=this.input=this.output=this.context.createDelay(this.toSeconds(e.maxDelay)),this.delayTime=new t.Param({param:this._delayNode.delayTime,units:t.Type.Time,value:e.delayTime}),this._readOnly("delayTime")},t.extend(t.Delay),t.Delay.defaults={maxDelay:1,delayTime:0},t.Delay.prototype.dispose=function(){return t.Param.prototype.dispose.call(this),this._delayNode.disconnect(),this._delayNode=null,this._writable("delayTime"),this.delayTime=null,this},t.Delay}),t(function(t){return t.FeedbackCombFilter=function(){var e=this.optionsObject(arguments,["delayTime","resonance"],t.FeedbackCombFilter.defaults);this._delay=this.input=this.output=new t.Delay(e.delayTime),this.delayTime=this._delay.delayTime,this._feedback=new t.Gain(e.resonance,t.Type.NormalRange),this.resonance=this._feedback.gain,this._delay.chain(this._feedback,this._delay),this._readOnly(["resonance","delayTime"])},t.extend(t.FeedbackCombFilter),t.FeedbackCombFilter.defaults={delayTime:.1,resonance:.5},t.FeedbackCombFilter.prototype.dispose=function(){return t.prototype.dispose.call(this),this._writable(["resonance","delayTime"]),this._delay.dispose(),this._delay=null,this.delayTime=null,this._feedback.dispose(),this._feedback=null,this.resonance=null,this},t.FeedbackCombFilter}),t(function(t){return t.Follower=function(){this.createInsOuts(1,1);var e=this.optionsObject(arguments,["attack","release"],t.Follower.defaults);this._abs=new t.Abs,this._filter=this.context.createBiquadFilter(),this._filter.type="lowpass",this._filter.frequency.value=0,this._filter.Q.value=-100,this._frequencyValues=new t.WaveShaper,this._sub=new t.Subtract,this._delay=new t.Delay(this.blockTime),this._mult=new t.Multiply(1e4),this._attack=e.attack,this._release=e.release,this.input.chain(this._abs,this._filter,this.output),this._abs.connect(this._sub,0,1),this._filter.chain(this._delay,this._sub),this._sub.chain(this._mult,this._frequencyValues,this._filter.frequency),this._setAttackRelease(this._attack,this._release)},t.extend(t.Follower),t.Follower.defaults={attack:.05,release:.5},t.Follower.prototype._setAttackRelease=function(e,i){var n=this.blockTime;e=t.Time(e).toFrequency(),i=t.Time(i).toFrequency(),e=Math.max(e,n),i=Math.max(i,n),this._frequencyValues.setMap(function(t){return t<=0?e:i})},Object.defineProperty(t.Follower.prototype,"attack",{get:function(){return this._attack},set:function(t){this._attack=t,this._setAttackRelease(this._attack,this._release)}}),Object.defineProperty(t.Follower.prototype,"release",{get:function(){return this._release},set:function(t){this._release=t,this._setAttackRelease(this._attack,this._release)}}),t.Follower.prototype.connect=t.Signal.prototype.connect,t.Follower.prototype.dispose=function(){return t.prototype.dispose.call(this),this._filter.disconnect(),this._filter=null,this._frequencyValues.disconnect(),this._frequencyValues=null,this._delay.dispose(),this._delay=null,this._sub.disconnect(),this._sub=null,this._abs.dispose(),this._abs=null,this._mult.dispose(),this._mult=null,this._curve=null,this},t.Follower}),t(function(t){return t.ScaledEnvelope=function(){var e=this.optionsObject(arguments,["attack","decay","sustain","release"],t.Envelope.defaults);t.Envelope.call(this,e),e=this.defaultArg(e,t.ScaledEnvelope.defaults),this._exp=this.output=new t.Pow(e.exponent),this._scale=this.output=new t.Scale(e.min,e.max),this._sig.chain(this._exp,this._scale)},t.extend(t.ScaledEnvelope,t.Envelope),t.ScaledEnvelope.defaults={min:0,max:1,exponent:1},Object.defineProperty(t.ScaledEnvelope.prototype,"min",{get:function(){return this._scale.min},set:function(t){this._scale.min=t}}),Object.defineProperty(t.ScaledEnvelope.prototype,"max",{get:function(){return this._scale.max},set:function(t){this._scale.max=t}}),Object.defineProperty(t.ScaledEnvelope.prototype,"exponent",{get:function(){return this._exp.value},set:function(t){this._exp.value=t}}),t.ScaledEnvelope.prototype.dispose=function(){return t.Envelope.prototype.dispose.call(this),this._scale.dispose(),this._scale=null,this._exp.dispose(),this._exp=null,this},t.ScaledEnvelope}),t(function(t){return t.FrequencyEnvelope=function(){var e=this.optionsObject(arguments,["attack","decay","sustain","release"],t.Envelope.defaults);t.ScaledEnvelope.call(this,e),e=this.defaultArg(e,t.FrequencyEnvelope.defaults),this._octaves=e.octaves,this.baseFrequency=e.baseFrequency,this.octaves=e.octaves},t.extend(t.FrequencyEnvelope,t.Envelope),t.FrequencyEnvelope.defaults={baseFrequency:200,octaves:4,exponent:2},Object.defineProperty(t.FrequencyEnvelope.prototype,"baseFrequency",{get:function(){return this._scale.min},set:function(t){this._scale.min=this.toFrequency(t),this.octaves=this._octaves}}),Object.defineProperty(t.FrequencyEnvelope.prototype,"octaves",{get:function(){return this._octaves},set:function(t){this._octaves=t,this._scale.max=this.baseFrequency*Math.pow(2,t)}}),Object.defineProperty(t.FrequencyEnvelope.prototype,"exponent",{get:function(){return this._exp.value},set:function(t){this._exp.value=t}}),t.FrequencyEnvelope.prototype.dispose=function(){return t.ScaledEnvelope.prototype.dispose.call(this),this},t.FrequencyEnvelope}),t(function(t){return t.Gate=function(){this.createInsOuts(1,1);var e=this.optionsObject(arguments,["threshold","attack","release"],t.Gate.defaults);this._follower=new t.Follower(e.attack,e.release),this._gt=new t.GreaterThan(this.dbToGain(e.threshold)),this.input.connect(this.output),this.input.chain(this._gt,this._follower,this.output.gain)},t.extend(t.Gate),t.Gate.defaults={attack:.1,release:.1,threshold:-40},Object.defineProperty(t.Gate.prototype,"threshold",{get:function(){return this.gainToDb(this._gt.value)},set:function(t){this._gt.value=this.dbToGain(t)}}),Object.defineProperty(t.Gate.prototype,"attack",{get:function(){return this._follower.attack},set:function(t){this._follower.attack=t}}),Object.defineProperty(t.Gate.prototype,"release",{get:function(){return this._follower.release},set:function(t){this._follower.release=t}}),t.Gate.prototype.dispose=function(){return t.prototype.dispose.call(this),this._follower.dispose(),this._gt.dispose(),this._follower=null,this._gt=null,this},t.Gate}),t(function(t){return t.TimelineState=function(e){t.Timeline.call(this),this._initial=e},t.extend(t.TimelineState,t.Timeline),t.TimelineState.prototype.getValueAtTime=function(t){var e=this.get(t);return null!==e?e.state:this._initial},t.TimelineState.prototype.setStateAtTime=function(t,e){this.add({state:t,time:e})},t.TimelineState}),t(function(t){return t.Clock=function(){t.Emitter.call(this);var e=this.optionsObject(arguments,["callback","frequency"],t.Clock.defaults);this.callback=e.callback,this._nextTick=0,this._lastState=t.State.Stopped,this.frequency=new t.TimelineSignal(e.frequency,t.Type.Frequency),this._readOnly("frequency"),this.ticks=0,this._state=new t.TimelineState(t.State.Stopped),this._boundLoop=this._loop.bind(this),this.context.on("tick",this._boundLoop)},t.extend(t.Clock,t.Emitter),t.Clock.defaults={callback:t.noOp,frequency:1,lookAhead:"auto"},Object.defineProperty(t.Clock.prototype,"state",{get:function(){return this._state.getValueAtTime(this.now())}}),t.Clock.prototype.start=function(e,i){return e=this.toSeconds(e),this._state.getValueAtTime(e)!==t.State.Started&&this._state.add({state:t.State.Started,time:e,offset:i}),this},t.Clock.prototype.stop=function(e){return e=this.toSeconds(e),this._state.cancel(e),this._state.setStateAtTime(t.State.Stopped,e),this},t.Clock.prototype.pause=function(e){return e=this.toSeconds(e),this._state.getValueAtTime(e)===t.State.Started&&this._state.setStateAtTime(t.State.Paused,e),this},t.Clock.prototype._loop=function(){for(var e=this.now()+this.context.lookAhead+this.context.updateInterval+2*this.context.lag;e>this._nextTick&&this._state;){var i=this._state.getValueAtTime(this._nextTick);if(i!==this._lastState){this._lastState=i;var n=this._state.get(this._nextTick);i===t.State.Started?(this._nextTick=n.time,this.isUndef(n.offset)||(this.ticks=n.offset),this.emit("start",n.time,this.ticks)):i===t.State.Stopped?(this.ticks=0,this.emit("stop",n.time)):i===t.State.Paused&&this.emit("pause",n.time)}var s=this._nextTick;this.frequency&&(this._nextTick+=1/this.frequency.getValueAtTime(this._nextTick),i===t.State.Started&&(this.callback(s),this.ticks++))}},t.Clock.prototype.getStateAtTime=function(t){return t=this.toSeconds(t),this._state.getValueAtTime(t)},t.Clock.prototype.dispose=function(){t.Emitter.prototype.dispose.call(this),this.context.off("tick",this._boundLoop),this._writable("frequency"),this.frequency.dispose(),this.frequency=null,this._boundLoop=null,this._nextTick=1/0,this.callback=null,this._state.dispose(),this._state=null},t.Clock}),t(function(t){t.IntervalTimeline=function(){this._root=null,this._length=0},t.extend(t.IntervalTimeline),t.IntervalTimeline.prototype.add=function(t){if(this.isUndef(t.time)||this.isUndef(t.duration))throw new Error("Tone.IntervalTimeline: events must have time and duration parameters");var i=new e(t.time,t.time+t.duration,t);for(null===this._root?this._root=i:this._root.insert(i),this._length++;null!==i;)i.updateHeight(),i.updateMax(),this._rebalance(i),i=i.parent;return this},t.IntervalTimeline.prototype.remove=function(t){if(null!==this._root){var e=[];this._root.search(t.time,e);for(var i=0;i<e.length;i++){var n=e[i];if(n.event===t){this._removeNode(n),this._length--;break}}}return this},Object.defineProperty(t.IntervalTimeline.prototype,"length",{get:function(){return this._length}}),t.IntervalTimeline.prototype.cancel=function(t){return this.forEachAfter(t,function(t){this.remove(t)}.bind(this)),this},t.IntervalTimeline.prototype._setRoot=function(t){this._root=t,null!==this._root&&(this._root.parent=null)},t.IntervalTimeline.prototype._replaceNodeInParent=function(t,e){null!==t.parent?(t.isLeftChild()?t.parent.left=e:t.parent.right=e,this._rebalance(t.parent)):this._setRoot(e)},t.IntervalTimeline.prototype._removeNode=function(t){if(null===t.left&&null===t.right)this._replaceNodeInParent(t,null);else if(null===t.right)this._replaceNodeInParent(t,t.left);else if(null===t.left)this._replaceNodeInParent(t,t.right);else{var e,i;if(t.getBalance()>0)if(null===t.left.right)(e=t.left).right=t.right,i=e;else{for(e=t.left.right;null!==e.right;)e=e.right;e.parent.right=e.left,i=e.parent,e.left=t.left,e.right=t.right}else if(null===t.right.left)(e=t.right).left=t.left,i=e;else{for(e=t.right.left;null!==e.left;)e=e.left;e.parent=e.parent,e.parent.left=e.right,i=e.parent,e.left=t.left,e.right=t.right}null!==t.parent?t.isLeftChild()?t.parent.left=e:t.parent.right=e:this._setRoot(e),this._rebalance(i)}t.dispose()},t.IntervalTimeline.prototype._rotateLeft=function(t){var e=t.parent,i=t.isLeftChild(),n=t.right;t.right=n.left,n.left=t,null!==e?i?e.left=n:e.right=n:this._setRoot(n)},t.IntervalTimeline.prototype._rotateRight=function(t){var e=t.parent,i=t.isLeftChild(),n=t.left;t.left=n.right,n.right=t,null!==e?i?e.left=n:e.right=n:this._setRoot(n)},t.IntervalTimeline.prototype._rebalance=function(t){var e=t.getBalance();e>1?t.left.getBalance()<0?this._rotateLeft(t.left):this._rotateRight(t):e<-1&&(t.right.getBalance()>0?this._rotateRight(t.right):this._rotateLeft(t))},t.IntervalTimeline.prototype.get=function(t){if(null!==this._root){var e=[];if(this._root.search(t,e),e.length>0){for(var i=e[0],n=1;n<e.length;n++)e[n].low>i.low&&(i=e[n]);return i.event}}return null},t.IntervalTimeline.prototype.forEach=function(t){if(null!==this._root){var e=[];null!==this._root&&this._root.traverse(function(t){e.push(t)});for(var i=0;i<e.length;i++){var n=e[i].event;n&&t(n)}}return this},t.IntervalTimeline.prototype.forEachAtTime=function(t,e){if(null!==this._root){var i=[];this._root.search(t,i);for(var n=i.length-1;n>=0;n--){var s=i[n].event;s&&e(s)}}return this},t.IntervalTimeline.prototype.forEachAfter=function(t,e){if(null!==this._root){var i=[];this._root.searchAfter(t,i);for(var n=i.length-1;n>=0;n--){var s=i[n].event;s&&e(s)}}return this},t.IntervalTimeline.prototype.dispose=function(){var t=[];null!==this._root&&this._root.traverse(function(e){t.push(e)});for(var e=0;e<t.length;e++)t[e].dispose();return t=null,this._root=null,this};var e=function(t,e,i){this.event=i,this.low=t,this.high=e,this.max=this.high,this._left=null,this._right=null,this.parent=null,this.height=0};return e.prototype.insert=function(t){t.low<=this.low?null===this.left?this.left=t:this.left.insert(t):null===this.right?this.right=t:this.right.insert(t)},e.prototype.search=function(t,e){t>this.max||(null!==this.left&&this.left.search(t,e),this.low<=t&&this.high>t&&e.push(this),this.low>t||null!==this.right&&this.right.search(t,e))},e.prototype.searchAfter=function(t,e){this.low>=t&&(e.push(this),null!==this.left&&this.left.searchAfter(t,e)),null!==this.right&&this.right.searchAfter(t,e)},e.prototype.traverse=function(t){t(this),null!==this.left&&this.left.traverse(t),null!==this.right&&this.right.traverse(t)},e.prototype.updateHeight=function(){null!==this.left&&null!==this.right?this.height=Math.max(this.left.height,this.right.height)+1:null!==this.right?this.height=this.right.height+1:null!==this.left?this.height=this.left.height+1:this.height=0},e.prototype.updateMax=function(){this.max=this.high,null!==this.left&&(this.max=Math.max(this.max,this.left.max)),null!==this.right&&(this.max=Math.max(this.max,this.right.max))},e.prototype.getBalance=function(){var t=0;return null!==this.left&&null!==this.right?t=this.left.height-this.right.height:null!==this.left?t=this.left.height+1:null!==this.right&&(t=-(this.right.height+1)),t},e.prototype.isLeftChild=function(){return null!==this.parent&&this.parent.left===this},Object.defineProperty(e.prototype,"left",{get:function(){return this._left},set:function(t){this._left=t,null!==t&&(t.parent=this),this.updateHeight(),this.updateMax()}}),Object.defineProperty(e.prototype,"right",{get:function(){return this._right},set:function(t){this._right=t,null!==t&&(t.parent=this),this.updateHeight(),this.updateMax()}}),e.prototype.dispose=function(){this.parent=null,this._left=null,this._right=null,this.event=null},t.IntervalTimeline}),t(function(t){t.Transport=function(){t.Emitter.call(this),this.loop=!1,this._loopStart=0,this._loopEnd=0,this._ppq=e.defaults.PPQ,this._clock=new t.Clock({callback:this._processTick.bind(this),frequency:0}),this._bindClockEvents(),this.bpm=this._clock.frequency,this.bpm._toUnits=this._toUnits.bind(this),this.bpm._fromUnits=this._fromUnits.bind(this),this.bpm.units=t.Type.BPM,this.bpm.value=e.defaults.bpm,this._readOnly("bpm"),this._timeSignature=e.defaults.timeSignature,this._scheduledEvents={},this._eventID=0,this._timeline=new t.Timeline,this._repeatedEvents=new t.IntervalTimeline,this._onceEvents=new t.Timeline,this._syncedSignals=[],this._swingTicks=e.defaults.PPQ/2,this._swingAmount=0},t.extend(t.Transport,t.Emitter),t.Transport.defaults={bpm:120,swing:0,swingSubdivision:"8n",timeSignature:4,loopStart:0,loopEnd:"4m",PPQ:192},t.Transport.prototype._processTick=function(e){var i=this._clock.ticks;if(this._swingAmount>0&&i%this._ppq!=0&&i%(2*this._swingTicks)!=0){var n=i%(2*this._swingTicks)/(2*this._swingTicks),s=Math.sin(n*Math.PI)*this._swingAmount;e+=t.Time(2*this._swingTicks/3,"i")*s}this.loop&&i===this._loopEnd&&(this.emit("loopEnd",e),this._clock.ticks=this._loopStart,i=this._loopStart,this.emit("loopStart",e,this.seconds),this.emit("loop",e)),this._onceEvents.forEachBefore(i,function(t){t.callback(e),delete this._scheduledEvents[t.id.toString()]}.bind(this)),this._onceEvents.cancelBefore(i),this._timeline.forEachAtTime(i,function(t){t.callback(e)}),this._repeatedEvents.forEachAtTime(i,function(t){(i-t.time)%t.interval==0&&t.callback(e)})},t.Transport.prototype.schedule=function(t,e){var i={time:this.toTicks(e),callback:t},n=this._eventID++;return this._scheduledEvents[n.toString()]={event:i,timeline:this._timeline},this._timeline.add(i),n},t.Transport.prototype.scheduleRepeat=function(t,e,i,n){if(e<=0)throw new Error("Tone.Transport: repeat events must have an interval larger than 0");var s={time:this.toTicks(i),duration:this.toTicks(this.defaultArg(n,1/0)),interval:this.toTicks(e),callback:t},o=this._eventID++;return this._scheduledEvents[o.toString()]={event:s,timeline:this._repeatedEvents},this._repeatedEvents.add(s),o},t.Transport.prototype.scheduleOnce=function(t,e){var i=this._eventID++,n={time:this.toTicks(e),callback:t,id:i};return this._scheduledEvents[i.toString()]={event:n,timeline:this._onceEvents},this._onceEvents.add(n),i},t.Transport.prototype.clear=function(t){if(this._scheduledEvents.hasOwnProperty(t)){var e=this._scheduledEvents[t.toString()];e.timeline.remove(e.event),delete this._scheduledEvents[t.toString()]}return this},t.Transport.prototype.cancel=function(t){return t=this.defaultArg(t,0),t=this.toTicks(t),this._timeline.cancel(t),this._onceEvents.cancel(t),this._repeatedEvents.cancel(t),this},t.Transport.prototype._bindClockEvents=function(){this._clock.on("start",function(e,i){i=t.Time(this._clock.ticks,"i").toSeconds(),this.emit("start",e,i)}.bind(this)),this._clock.on("stop",function(t){this.emit("stop",t)}.bind(this)),this._clock.on("pause",function(t){this.emit("pause",t)}.bind(this))},Object.defineProperty(t.Transport.prototype,"state",{get:function(){return this._clock.getStateAtTime(this.now())}}),t.Transport.prototype.start=function(t,e){return this.isUndef(e)||(e=this.toTicks(e)),this._clock.start(t,e),this},t.Transport.prototype.stop=function(t){return this._clock.stop(t),this},t.Transport.prototype.pause=function(t){return this._clock.pause(t),this},Object.defineProperty(t.Transport.prototype,"timeSignature",{get:function(){return this._timeSignature},set:function(t){this.isArray(t)&&(t=t[0]/t[1]*4),this._timeSignature=t}}),Object.defineProperty(t.Transport.prototype,"loopStart",{get:function(){return t.TransportTime(this._loopStart,"i").toSeconds()},set:function(t){this._loopStart=this.toTicks(t)}}),Object.defineProperty(t.Transport.prototype,"loopEnd",{get:function(){return t.TransportTime(this._loopEnd,"i").toSeconds()},set:function(t){this._loopEnd=this.toTicks(t)}}),t.Transport.prototype.setLoopPoints=function(t,e){return this.loopStart=t,this.loopEnd=e,this},Object.defineProperty(t.Transport.prototype,"swing",{get:function(){return this._swingAmount},set:function(t){this._swingAmount=t}}),Object.defineProperty(t.Transport.prototype,"swingSubdivision",{get:function(){return t.Time(this._swingTicks,"i").toNotation()},set:function(t){this._swingTicks=this.toTicks(t)}}),Object.defineProperty(t.Transport.prototype,"position",{get:function(){return t.TransportTime(this.ticks,"i").toBarsBeatsSixteenths()},set:function(t){var e=this.toTicks(t);this.ticks=e}}),Object.defineProperty(t.Transport.prototype,"seconds",{get:function(){return t.TransportTime(this.ticks,"i").toSeconds()},set:function(t){var e=this.toTicks(t);this.ticks=e}}),Object.defineProperty(t.Transport.prototype,"progress",{get:function(){return this.loop?(this.ticks-this._loopStart)/(this._loopEnd-this._loopStart):0}}),Object.defineProperty(t.Transport.prototype,"ticks",{get:function(){return this._clock.ticks},set:function(e){if(this._clock.ticks!==e){var i=this.now();this.state===t.State.Started?(this.emit("stop",i),this._clock.ticks=e,this.emit("start",i,this.seconds)):this._clock.ticks=e}}}),Object.defineProperty(t.Transport.prototype,"PPQ",{get:function(){return this._ppq},set:function(t){var e=this.bpm.value;this._ppq=t,this.bpm.value=e}}),Object.defineProperty(t.Transport.prototype,"latencyHint",{get:function(){return t.Clock.latencyHint},set:function(e){t.Clock.latencyHint=e}}),t.Transport.prototype._fromUnits=function(t){return 1/(60/t/this.PPQ)},t.Transport.prototype._toUnits=function(t){return t/this.PPQ*60},t.Transport.prototype.nextSubdivision=function(e){e=this.toSeconds(e);var i;if(this.state!==t.State.Started)return 0;i=this._clock._nextTick;var n=e-t.Time(this.ticks,"i")%e;return 0===n&&(n=e),i+n},t.Transport.prototype.syncSignal=function(e,i){i||(i=0!==e._param.value?e._param.value/this.bpm._param.value:0);var n=new t.Gain(i);return this.bpm.chain(n,e._param),this._syncedSignals.push({ratio:n,signal:e,initial:e._param.value}),e._param.value=0,this},t.Transport.prototype.unsyncSignal=function(t){for(var e=this._syncedSignals.length-1;e>=0;e--){var i=this._syncedSignals[e];i.signal===t&&(i.ratio.dispose(),i.signal._param.value=i.initial,this._syncedSignals.splice(e,1))}return this},t.Transport.prototype.dispose=function(){return t.Emitter.prototype.dispose.call(this),this._clock.dispose(),this._clock=null,this._writable("bpm"),this.bpm=null,this._timeline.dispose(),this._timeline=null,this._onceEvents.dispose(),this._onceEvents=null,this._repeatedEvents.dispose(),this._repeatedEvents=null,this};var e=t.Transport;return t.Transport=new e,t.Context.on("init",function(i){i.Transport instanceof e?t.Transport=i.Transport:(t.Transport=new e,i.Transport=t.Transport)}),t.Transport}),t(function(t){return t.Volume=function(){var e=this.optionsObject(arguments,["volume"],t.Volume.defaults);this.output=this.input=new t.Gain(e.volume,t.Type.Decibels),this._unmutedVolume=e.volume,this.volume=this.output.gain,this._readOnly("volume"),this.mute=e.mute},t.extend(t.Volume),t.Volume.defaults={volume:0,mute:!1},Object.defineProperty(t.Volume.prototype,"mute",{get:function(){return this.volume.value===-1/0},set:function(t){!this.mute&&t?(this._unmutedVolume=this.volume.value,this.volume.value=-1/0):this.mute&&!t&&(this.volume.value=this._unmutedVolume)}}),t.Volume.prototype.dispose=function(){return this.input.dispose(),t.prototype.dispose.call(this),this._writable("volume"),this.volume.dispose(),this.volume=null,this},t.Volume}),t(function(t){t.Master=function(){this.createInsOuts(1,1),this._volume=this.output=new t.Volume,this.volume=this._volume.volume,this._readOnly("volume"),this.input.chain(this.output,this.context.destination)},t.extend(t.Master),t.Master.defaults={volume:0,mute:!1},Object.defineProperty(t.Master.prototype,"mute",{get:function(){return this._volume.mute},set:function(t){this._volume.mute=t}}),t.Master.prototype.chain=function(){this.input.disconnect(),this.input.chain.apply(this.input,arguments),arguments[arguments.length-1].connect(this.output)},t.Master.prototype.dispose=function(){t.prototype.dispose.call(this),this._writable("volume"),this._volume.dispose(),this._volume=null,this.volume=null},t.prototype.toMaster=function(){return this.connect(t.Master),this},AudioNode.prototype.toMaster=function(){return this.connect(t.Master),this};var e=t.Master;return t.Master=new e,t.Context.on("init",function(i){i.Master instanceof e?t.Master=i.Master:t.Master=new e,i.Master=t.Master}),t.Master}),t(function(t){return t.Source=function(e){e=this.defaultArg(e,t.Source.defaults),this._volume=this.output=new t.Volume(e.volume),this.volume=this._volume.volume,this._readOnly("volume"),this._state=new t.TimelineState(t.State.Stopped),this._state.memory=10,this._synced=!1,this._scheduled=[],this._volume.output.output.channelCount=2,this._volume.output.output.channelCountMode="explicit",this.mute=e.mute},t.extend(t.Source),t.Source.defaults={volume:0,mute:!1},Object.defineProperty(t.Source.prototype,"state",{get:function(){return this._synced?t.Transport.state===t.State.Started?this._state.getValueAtTime(t.Transport.seconds):t.State.Stopped:this._state.getValueAtTime(this.now())}}),Object.defineProperty(t.Source.prototype,"mute",{get:function(){return this._volume.mute},set:function(t){this._volume.mute=t}}),t.Source.prototype._start=t.noOp,t.Source.prototype._stop=t.noOp,t.Source.prototype.start=function(e,i,n){if(e=this.isUndef(e)&&this._synced?t.Transport.seconds:this.toSeconds(e),this.retrigger||this._state.getValueAtTime(e)!==t.State.Started||this.stop(e),this._state.setStateAtTime(t.State.Started,e),this._synced){var s=this._state.get(e);s.offset=this.defaultArg(i,0),s.duration=n;var o=t.Transport.schedule(function(t){this._start(t,i,n)}.bind(this),e);this._scheduled.push(o)}else this._start.apply(this,arguments);return this},t.Source.prototype.stop=function(e){if(e=this.isUndef(e)&&this._synced?t.Transport.seconds:this.toSeconds(e),this._state.cancel(e),this._state.setStateAtTime(t.State.Stopped,e),this._synced){var i=t.Transport.schedule(this._stop.bind(this),e);this._scheduled.push(i)}else this._stop.apply(this,arguments);return this},t.Source.prototype.sync=function(){return this._synced=!0,t.Transport.on("start loopStart",function(e,i){if(i>0){var n=this._state.get(i);if(n&&n.state===t.State.Started&&n.time!==i){var s,o=i-this.toSeconds(n.time);n.duration&&(s=this.toSeconds(n.duration)-o),this._start(e,this.toSeconds(n.offset)+o,s)}}}.bind(this)),t.Transport.on("stop pause loopEnd",function(e){this._state.getValueAtTime(t.Transport.seconds)===t.State.Started&&this._stop(e)}.bind(this)),this},t.Source.prototype.unsync=function(){this._synced=!1,t.Transport.off("start stop pause loopEnd loopStart");for(var e=0;e<this._scheduled.length;e++){var i=this._scheduled[e];t.Transport.clear(i)}return this._scheduled=[],this._state.cancel(0),this},t.Source.prototype.dispose=function(){t.prototype.dispose.call(this),this.unsync(),this._scheduled=null,this._writable("volume"),this._volume.dispose(),this._volume=null,this.volume=null,this._state.dispose(),this._state=null},t.Source}),t(function(t){return window.OscillatorNode&&!OscillatorNode.prototype.start&&(OscillatorNode.prototype.start=OscillatorNode.prototype.noteOn,OscillatorNode.prototype.stop=OscillatorNode.prototype.noteOff,OscillatorNode.prototype.setPeriodicWave||(OscillatorNode.prototype.setPeriodicWave=OscillatorNode.prototype.setWaveTable),AudioContext.prototype.createPeriodicWave||(AudioContext.prototype.createPeriodicWave=AudioContext.prototype.createWaveTable)),t.Oscillator=function(){var e=this.optionsObject(arguments,["frequency","type"],t.Oscillator.defaults);t.Source.call(this,e),this._oscillator=null,this.frequency=new t.Signal(e.frequency,t.Type.Frequency),this.detune=new t.Signal(e.detune,t.Type.Cents),this._wave=null,this._partials=this.defaultArg(e.partials,[1]),this._phase=e.phase,this._type=null,this.type=e.type,this.phase=this._phase,this._readOnly(["frequency","detune"])},t.extend(t.Oscillator,t.Source),t.Oscillator.defaults={type:"sine",frequency:440,detune:0,phase:0,partials:[]},t.Oscillator.Type={Sine:"sine",Triangle:"triangle",Sawtooth:"sawtooth",Square:"square",Custom:"custom"},t.Oscillator.prototype._start=function(t){this._oscillator=this.context.createOscillator(),this._oscillator.setPeriodicWave(this._wave),this._oscillator.connect(this.output),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.start(this.toSeconds(t))},t.Oscillator.prototype._stop=function(t){return this._oscillator&&(this._oscillator.stop(this.toSeconds(t)),this._oscillator=null),this},t.Oscillator.prototype.syncFrequency=function(){return t.Transport.syncSignal(this.frequency),this},t.Oscillator.prototype.unsyncFrequency=function(){return t.Transport.unsyncSignal(this.frequency),this},Object.defineProperty(t.Oscillator.prototype,"type",{get:function(){return this._type},set:function(t){var e=this._getRealImaginary(t,this._phase),i=this.context.createPeriodicWave(e[0],e[1]);this._wave=i,null!==this._oscillator&&this._oscillator.setPeriodicWave(this._wave),this._type=t}}),t.Oscillator.prototype._getRealImaginary=function(e,i){var n=2048,s=new Float32Array(n),o=new Float32Array(n),r=1;if(e===t.Oscillator.Type.Custom)n=r=this._partials.length+1;else{var a=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(e);a&&(r=parseInt(a[2])+1,e=a[1],n=r=Math.max(r,2))}for(var h=1;h<n;++h){var l,u=2/(h*Math.PI);switch(e){case t.Oscillator.Type.Sine:l=h<=r?1:0;break;case t.Oscillator.Type.Square:l=1&h?2*u:0;break;case t.Oscillator.Type.Sawtooth:l=u*(1&h?1:-1);break;case t.Oscillator.Type.Triangle:l=1&h?u*u*2*(h-1>>1&1?-1:1):0;break;case t.Oscillator.Type.Custom:l=this._partials[h-1];break;default:throw new TypeError("Tone.Oscillator: invalid type: "+e)}0!==l?(s[h]=-l*Math.sin(i*h),o[h]=l*Math.cos(i*h)):(s[h]=0,o[h]=0)}return[s,o]},t.Oscillator.prototype._inverseFFT=function(t,e,i){for(var n=0,s=t.length,o=0;o<s;o++)n+=t[o]*Math.cos(o*i)+e[o]*Math.sin(o*i);return n},t.Oscillator.prototype._getInitialValue=function(){for(var t=this._getRealImaginary(this._type,0),e=t[0],i=t[1],n=0,s=2*Math.PI,o=0;o<8;o++)n=Math.max(this._inverseFFT(e,i,o/8*s),n);return-this._inverseFFT(e,i,this._phase)/n},Object.defineProperty(t.Oscillator.prototype,"partials",{get:function(){return this._type!==t.Oscillator.Type.Custom?[]:this._partials},set:function(e){this._partials=e,this.type=t.Oscillator.Type.Custom}}),Object.defineProperty(t.Oscillator.prototype,"phase",{get:function(){return this._phase*(180/Math.PI)},set:function(t){this._phase=t*Math.PI/180,this.type=this._type}}),t.Oscillator.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),null!==this._oscillator&&(this._oscillator.disconnect(),this._oscillator=null),this._wave=null,this._writable(["frequency","detune"]),this.frequency.dispose(),this.frequency=null,this.detune.dispose(),this.detune=null,this._partials=null,this},t.Oscillator}),t(function(t){return t.Zero=function(){this._gain=this.input=this.output=new t.Gain,this.context.getConstant(0).connect(this._gain)},t.extend(t.Zero),t.Zero.prototype.dispose=function(){return t.prototype.dispose.call(this),this._gain.dispose(),this._gain=null,this},t.Zero}),t(function(t){return t.LFO=function(){var e=this.optionsObject(arguments,["frequency","min","max"],t.LFO.defaults);this._oscillator=new t.Oscillator({frequency:e.frequency,type:e.type}),this.frequency=this._oscillator.frequency,this.amplitude=this._oscillator.volume,this.amplitude.units=t.Type.NormalRange,this.amplitude.value=e.amplitude,this._stoppedSignal=new t.Signal(0,t.Type.AudioRange),this._zeros=new t.Zero,this._stoppedValue=0,this._a2g=new t.AudioToGain,this._scaler=this.output=new t.Scale(e.min,e.max),this._units=t.Type.Default,this.units=e.units,this._oscillator.chain(this._a2g,this._scaler),this._zeros.connect(this._a2g),this._stoppedSignal.connect(this._a2g),this._readOnly(["amplitude","frequency"]),this.phase=e.phase},t.extend(t.LFO,t.Oscillator),t.LFO.defaults={type:"sine",min:0,max:1,phase:0,frequency:"4n",amplitude:1,units:t.Type.Default},t.LFO.prototype.start=function(t){return t=this.toSeconds(t),this._stoppedSignal.setValueAtTime(0,t),this._oscillator.start(t),this},t.LFO.prototype.stop=function(t){return t=this.toSeconds(t),this._stoppedSignal.setValueAtTime(this._stoppedValue,t),this._oscillator.stop(t),this},t.LFO.prototype.sync=function(){return this._oscillator.sync(),this._oscillator.syncFrequency(),this},t.LFO.prototype.unsync=function(){return this._oscillator.unsync(),this._oscillator.unsyncFrequency(),this},Object.defineProperty(t.LFO.prototype,"min",{get:function(){return this._toUnits(this._scaler.min)},set:function(t){t=this._fromUnits(t),this._scaler.min=t}}),Object.defineProperty(t.LFO.prototype,"max",{get:function(){return this._toUnits(this._scaler.max)},set:function(t){t=this._fromUnits(t),this._scaler.max=t}}),Object.defineProperty(t.LFO.prototype,"type",{get:function(){return this._oscillator.type},set:function(t){this._oscillator.type=t,this._stoppedValue=this._oscillator._getInitialValue(),this._stoppedSignal.value=this._stoppedValue}}),Object.defineProperty(t.LFO.prototype,"phase",{get:function(){return this._oscillator.phase},set:function(t){this._oscillator.phase=t,this._stoppedValue=this._oscillator._getInitialValue(),this._stoppedSignal.value=this._stoppedValue}}),Object.defineProperty(t.LFO.prototype,"units",{get:function(){return this._units},set:function(t){var e=this.min,i=this.max;this._units=t,this.min=e,this.max=i}}),Object.defineProperty(t.LFO.prototype,"mute",{get:function(){return this._oscillator.mute},set:function(t){this._oscillator.mute=t}}),Object.defineProperty(t.LFO.prototype,"state",{get:function(){return this._oscillator.state}}),t.LFO.prototype.connect=function(e){return e.constructor!==t.Signal&&e.constructor!==t.Param&&e.constructor!==t.TimelineSignal||(this.convert=e.convert,this.units=e.units),t.Signal.prototype.connect.apply(this,arguments),this},t.LFO.prototype._fromUnits=t.Param.prototype._fromUnits,t.LFO.prototype._toUnits=t.Param.prototype._toUnits,t.LFO.prototype.dispose=function(){return t.prototype.dispose.call(this),this._writable(["amplitude","frequency"]),this._oscillator.dispose(),this._oscillator=null,this._stoppedSignal.dispose(),this._stoppedSignal=null,this._zeros.dispose(),this._zeros=null,this._scaler.dispose(),this._scaler=null,this._a2g.dispose(),this._a2g=null,this.frequency=null,this.amplitude=null,this},t.LFO}),t(function(t){return t.Limiter=function(){var e=this.optionsObject(arguments,["threshold"],t.Limiter.defaults);this._compressor=this.input=this.output=new t.Compressor({attack:.001,decay:.001,threshold:e.threshold}),this.threshold=this._compressor.threshold,this._readOnly("threshold")},t.extend(t.Limiter),t.Limiter.defaults={threshold:-12},t.Limiter.prototype.dispose=function(){return t.prototype.dispose.call(this),this._compressor.dispose(),this._compressor=null,this._writable("threshold"),this.threshold=null,this},t.Limiter}),t(function(t){return t.LowpassCombFilter=function(){this.createInsOuts(1,1);var e=this.optionsObject(arguments,["delayTime","resonance","dampening"],t.LowpassCombFilter.defaults);this._delay=this.input=new t.Delay(e.delayTime),this.delayTime=this._delay.delayTime,this._lowpass=this.output=this.context.createBiquadFilter(),this._lowpass.Q.value=-3.0102999566398125,this._lowpass.type="lowpass",this.dampening=new t.Param({param:this._lowpass.frequency,units:t.Type.Frequency,value:e.dampening}),this._feedback=new t.Gain(e.resonance,t.Type.NormalRange),this.resonance=this._feedback.gain,this._delay.chain(this._lowpass,this._feedback,this._delay),this._readOnly(["dampening","resonance","delayTime"])},t.extend(t.LowpassCombFilter),t.LowpassCombFilter.defaults={delayTime:.1,resonance:.5,dampening:3e3},t.LowpassCombFilter.prototype.dispose=function(){return t.prototype.dispose.call(this),this._writable(["dampening","resonance","delayTime"]),this.dampening.dispose(),this.dampening=null,this.resonance.dispose(),this.resonance=null,this._delay.dispose(),this._delay=null,this.delayTime=null,this._lowpass.disconnect(),this._lowpass=null,this._feedback.disconnect(),this._feedback=null,this},t.LowpassCombFilter}),t(function(t){return t.Merge=function(){this.createInsOuts(2,0),this.left=this.input[0]=new t.Gain,this.right=this.input[1]=new t.Gain,this._merger=this.output=this.context.createChannelMerger(2),this.left.connect(this._merger,0,0),this.right.connect(this._merger,0,1),this.left.channelCount=1,this.right.channelCount=1,this.left.channelCountMode="explicit",this.right.channelCountMode="explicit"},t.extend(t.Merge),t.Merge.prototype.dispose=function(){return t.prototype.dispose.call(this),this.left.dispose(),this.left=null,this.right.dispose(),this.right=null,this._merger.disconnect(),this._merger=null,this},t.Merge}),t(function(t){return t.Meter=function(){var e=this.optionsObject(arguments,["type","smoothing"],t.Meter.defaults);this.type=e.type,this.input=this.output=this._analyser=new t.Analyser("waveform",512),this._analyser.returnType="float",this.smoothing=e.smoothing,this._lastValue=0},t.extend(t.Meter),t.Meter.Type={Level:"level",Signal:"signal"},t.Meter.defaults={smoothing:.8,type:t.Meter.Type.Level},Object.defineProperty(t.Meter.prototype,"value",{get:function(){var e=this._analyser.analyse();if(this.type===t.Meter.Type.Level){for(var i=0,n=0;n<e.length;n++)i+=Math.pow(e[n],2);var s=Math.sqrt(i/e.length);s=Math.max(s,this._lastValue*this.smoothing),this._lastValue=s;var o=s/.35;return Math.sqrt(o)}return e[0]}}),t.Meter.prototype.dispose=function(){return t.prototype.dispose.call(this),this._analyser.dispose(),this._analyser=null,this},t.Meter}),t(function(t){return t.Split=function(){this.createInsOuts(0,2),this._splitter=this.input=this.context.createChannelSplitter(2),this.left=this.output[0]=new t.Gain,this.right=this.output[1]=new t.Gain,this._splitter.connect(this.left,0,0),this._splitter.connect(this.right,1,0)},t.extend(t.Split),t.Split.prototype.dispose=function(){return t.prototype.dispose.call(this),this._splitter.disconnect(),this.left.dispose(),this.left=null,this.right.dispose(),this.right=null,this._splitter=null,this},t.Split}),t(function(t){return t.MidSideSplit=function(){this.createInsOuts(0,2),this._split=this.input=new t.Split,this.mid=this.output[0]=new t.Expr("($0 + $1) * $2"),this.side=this.output[1]=new t.Expr("($0 - $1) * $2"),this._split.connect(this.mid,0,0),this._split.connect(this.mid,1,1),this._split.connect(this.side,0,0),this._split.connect(this.side,1,1),this.context.getConstant(Math.SQRT1_2).connect(this.mid,0,2),this.context.getConstant(Math.SQRT1_2).connect(this.side,0,2)},t.extend(t.MidSideSplit),t.MidSideSplit.prototype.dispose=function(){return t.prototype.dispose.call(this),this.mid.dispose(),this.mid=null,this.side.dispose(),this.side=null,this._split.dispose(),this._split=null,this},t.MidSideSplit}),t(function(t){return t.MidSideMerge=function(){this.createInsOuts(2,0),this.mid=this.input[0]=new t.Gain,this._left=new t.Expr("($0 + $1) * $2"),this.side=this.input[1]=new t.Gain,this._right=new t.Expr("($0 - $1) * $2"),this._merge=this.output=new t.Merge,this.mid.connect(this._left,0,0),this.side.connect(this._left,0,1),this.mid.connect(this._right,0,0),this.side.connect(this._right,0,1),this._left.connect(this._merge,0,0),this._right.connect(this._merge,0,1),this.context.getConstant(Math.SQRT1_2).connect(this._left,0,2),this.context.getConstant(Math.SQRT1_2).connect(this._right,0,2)},t.extend(t.MidSideMerge),t.MidSideMerge.prototype.dispose=function(){return t.prototype.dispose.call(this),this.mid.dispose(),this.mid=null,this.side.dispose(),this.side=null,this._left.dispose(),this._left=null,this._right.dispose(),this._right=null,this._merge.dispose(),this._merge=null,this},t.MidSideMerge}),t(function(t){return t.MidSideCompressor=function(e){e=this.defaultArg(e,t.MidSideCompressor.defaults),this._midSideSplit=this.input=new t.MidSideSplit,this._midSideMerge=this.output=new t.MidSideMerge,this.mid=new t.Compressor(e.mid),this.side=new t.Compressor(e.side),this._midSideSplit.mid.chain(this.mid,this._midSideMerge.mid),this._midSideSplit.side.chain(this.side,this._midSideMerge.side),this._readOnly(["mid","side"])},t.extend(t.MidSideCompressor),t.MidSideCompressor.defaults={mid:{ratio:3,threshold:-24,release:.03,attack:.02,knee:16},side:{ratio:6,threshold:-30,release:.25,attack:.03,knee:10}},t.MidSideCompressor.prototype.dispose=function(){return t.prototype.dispose.call(this),this._writable(["mid","side"]),this.mid.dispose(),this.mid=null,this.side.dispose(),this.side=null,this._midSideSplit.dispose(),this._midSideSplit=null,this._midSideMerge.dispose(),this._midSideMerge=null,this},t.MidSideCompressor}),t(function(t){return t.Mono=function(){this.createInsOuts(1,0),this._merge=this.output=new t.Merge,this.input.connect(this._merge,0,0),this.input.connect(this._merge,0,1),this.input.gain.value=this.dbToGain(-10)},t.extend(t.Mono),t.Mono.prototype.dispose=function(){return t.prototype.dispose.call(this),this._merge.dispose(),this._merge=null,this},t.Mono}),t(function(t){return t.MultibandCompressor=function(e){e=this.defaultArg(arguments,t.MultibandCompressor.defaults),this._splitter=this.input=new t.MultibandSplit({lowFrequency:e.lowFrequency,highFrequency:e.highFrequency}),this.lowFrequency=this._splitter.lowFrequency,this.highFrequency=this._splitter.highFrequency,this.output=new t.Gain,this.low=new t.Compressor(e.low),this.mid=new t.Compressor(e.mid),this.high=new t.Compressor(e.high),this._splitter.low.chain(this.low,this.output),this._splitter.mid.chain(this.mid,this.output),this._splitter.high.chain(this.high,this.output),this._readOnly(["high","mid","low","highFrequency","lowFrequency"])},t.extend(t.MultibandCompressor),t.MultibandCompressor.defaults={low:t.Compressor.defaults,mid:t.Compressor.defaults,high:t.Compressor.defaults,lowFrequency:250,highFrequency:2e3},t.MultibandCompressor.prototype.dispose=function(){return t.prototype.dispose.call(this),this._splitter.dispose(),this._writable(["high","mid","low","highFrequency","lowFrequency"]),this.low.dispose(),this.mid.dispose(),this.high.dispose(),this._splitter=null,this.low=null,this.mid=null,this.high=null,this.lowFrequency=null,this.highFrequency=null,this},t.MultibandCompressor}),t(function(t){return t.Panner=function(e){this._hasStereoPanner?(this._panner=this.input=this.output=this.context.createStereoPanner(),this.pan=this._panner.pan):(this._crossFade=new t.CrossFade,this._merger=this.output=new t.Merge,this._splitter=this.input=new t.Split,this.pan=new t.Signal(0,t.Type.AudioRange),this._zero=new t.Zero,this._a2g=new t.AudioToGain,this._zero.connect(this._a2g),this.pan.chain(this._a2g,this._crossFade.fade),this._splitter.connect(this._crossFade,0,0),this._splitter.connect(this._crossFade,1,1),this._crossFade.a.connect(this._merger,0,0),this._crossFade.b.connect(this._merger,0,1)),this.pan.value=this.defaultArg(e,0),this._readOnly("pan")},t.extend(t.Panner),t.Panner.prototype._hasStereoPanner=t.prototype.isFunction(t.context.createStereoPanner),t.Panner.prototype.dispose=function(){return t.prototype.dispose.call(this),this._writable("pan"),this._hasStereoPanner?(this._panner.disconnect(),this._panner=null,this.pan=null):(this._zero.dispose(),this._zero=null,this._crossFade.dispose(),this._crossFade=null,this._splitter.dispose(),this._splitter=null,this._merger.dispose(),this._merger=null,this.pan.dispose(),this.pan=null,this._a2g.dispose(),this._a2g=null),this},t.Panner}),t(function(t){return t.Panner3D=function(){var e=this.optionsObject(arguments,["positionX","positionY","positionZ"],t.Panner3D.defaults);this._panner=this.input=this.output=this.context.createPanner(),this._panner.panningModel=e.panningModel,this._panner.maxDistance=e.maxDistance,this._panner.distanceModel=e.distanceModel,this._panner.coneOuterGain=e.coneOuterGain,this._panner.coneOuterAngle=e.coneOuterAngle,this._panner.coneInnerAngle=e.coneInnerAngle,this._panner.refDistance=e.refDistance,this._panner.rolloffFactor=e.rolloffFactor,this._orientation=[e.orientationX,e.orientationY,e.orientationZ],this._position=[e.positionX,e.positionY,e.positionZ],this.orientationX=e.orientationX,this.orientationY=e.orientationY,this.orientationZ=e.orientationZ,this.positionX=e.positionX,this.positionY=e.positionY,this.positionZ=e.positionZ},t.extend(t.Panner3D),t.Panner3D.defaults={positionX:0,positionY:0,positionZ:0,orientationX:0,orientationY:0,orientationZ:0,panningModel:"equalpower",maxDistance:1e4,distanceModel:"inverse",coneOuterGain:0,coneOuterAngle:360,coneInnerAngle:360,refDistance:1,rolloffFactor:1},t.Panner3D.prototype._rampTimeConstant=.01,t.Panner3D.prototype.setPosition=function(t,e,i){if(this._panner.positionX){var n=this.now();this._panner.positionX.setTargetAtTime(t,n,this._rampTimeConstant),this._panner.positionY.setTargetAtTime(e,n,this._rampTimeConstant),this._panner.positionZ.setTargetAtTime(i,n,this._rampTimeConstant)}else this._panner.setPosition(t,e,i);return this._position=Array.prototype.slice.call(arguments),this},t.Panner3D.prototype.setOrientation=function(t,e,i){if(this._panner.orientationX){var n=this.now();this._panner.orientationX.setTargetAtTime(t,n,this._rampTimeConstant),this._panner.orientationY.setTargetAtTime(e,n,this._rampTimeConstant),this._panner.orientationZ.setTargetAtTime(i,n,this._rampTimeConstant)}else this._panner.setOrientation(t,e,i);return this._orientation=Array.prototype.slice.call(arguments),this},Object.defineProperty(t.Panner3D.prototype,"positionX",{set:function(t){this._position[0]=t,this.setPosition.apply(this,this._position)},get:function(){return this._position[0]}}),Object.defineProperty(t.Panner3D.prototype,"positionY",{set:function(t){this._position[1]=t,this.setPosition.apply(this,this._position)},get:function(){return this._position[1]}}),Object.defineProperty(t.Panner3D.prototype,"positionZ",{set:function(t){this._position[2]=t,this.setPosition.apply(this,this._position)},get:function(){return this._position[2]}}),Object.defineProperty(t.Panner3D.prototype,"orientationX",{set:function(t){this._orientation[0]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[0]}}),Object.defineProperty(t.Panner3D.prototype,"orientationY",{set:function(t){this._orientation[1]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[1]}}),Object.defineProperty(t.Panner3D.prototype,"orientationZ",{set:function(t){this._orientation[2]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[2]}}),t.Panner3D._aliasProperty=function(e){Object.defineProperty(t.Panner3D.prototype,e,{set:function(t){this._panner[e]=t},get:function(){return this._panner[e]}})},t.Panner3D._aliasProperty("panningModel"),t.Panner3D._aliasProperty("refDistance"),t.Panner3D._aliasProperty("rolloffFactor"),t.Panner3D._aliasProperty("distanceModel"),t.Panner3D._aliasProperty("coneInnerAngle"),t.Panner3D._aliasProperty("coneOuterAngle"),t.Panner3D._aliasProperty("coneOuterGain"),t.Panner3D._aliasProperty("maxDistance"),t.Panner3D.prototype.dispose=function(){return this._panner.disconnect(),this._panner=null,this._orientation=null,this._position=null,this},t.Panner3D}),t(function(t){return t.PanVol=function(){var e=this.optionsObject(arguments,["pan","volume"],t.PanVol.defaults);this._panner=this.input=new t.Panner(e.pan),this.pan=this._panner.pan,this._volume=this.output=new t.Volume(e.volume),this.volume=this._volume.volume,this._panner.connect(this._volume),this._readOnly(["pan","volume"])},t.extend(t.PanVol),t.PanVol.defaults={pan:.5,volume:0},t.PanVol.prototype.dispose=function(){return t.prototype.dispose.call(this),this._writable(["pan","volume"]),this._panner.dispose(),this._panner=null,this.pan=null,this._volume.dispose(),this._volume=null,this.volume=null,this},t.PanVol}),t(function(t){return t.CtrlInterpolate=function(){var e=this.optionsObject(arguments,["values","index"],t.CtrlInterpolate.defaults);this.values=e.values,this.index=e.index},t.extend(t.CtrlInterpolate),t.CtrlInterpolate.defaults={index:0,values:[]},Object.defineProperty(t.CtrlInterpolate.prototype,"value",{get:function(){var t=this.index;t=Math.min(t,this.values.length-1);var e=Math.floor(t),i=this.values[e],n=this.values[Math.ceil(t)];return this._interpolate(t-e,i,n)}}),t.CtrlInterpolate.prototype._interpolate=function(t,e,i){if(this.isArray(e)){for(var n=[],s=0;s<e.length;s++)n[s]=this._interpolate(t,e[s],i[s]);return n}if(this.isObject(e)){var o={};for(var r in e)o[r]=this._interpolate(t,e[r],i[r]);return o}return e=this._toNumber(e),i=this._toNumber(i),(1-t)*e+t*i},t.CtrlInterpolate.prototype._toNumber=function(t){return this.isNumber(t)?t:this.toSeconds(t)},t.CtrlInterpolate.prototype.dispose=function(){this.values=null},t.CtrlInterpolate}),t(function(t){return t.CtrlMarkov=function(t,e){this.values=this.defaultArg(t,{}),this.value=this.defaultArg(e,Object.keys(this.values)[0])},t.extend(t.CtrlMarkov),t.CtrlMarkov.prototype.next=function(){if(this.values.hasOwnProperty(this.value)){var t=this.values[this.value];if(this.isArray(t))for(var e=this._getProbDistribution(t),i=Math.random(),n=0,s=0;s<e.length;s++){var o=e[s];if(i>n&&i<n+o){var r=t[s];this.isObject(r)?this.value=r.value:this.value=r}n+=o}else this.value=t}return this.value},t.CtrlMarkov.prototype._getProbDistribution=function(t){for(var e=[],i=0,n=!1,s=0;s<t.length;s++){var o=t[s];this.isObject(o)?(n=!0,e[s]=o.probability):e[s]=1/t.length,i+=e[s]}if(n)for(var r=0;r<e.length;r++)e[r]=e[r]/i;return e},t.CtrlMarkov.prototype.dispose=function(){this.values=null},t.CtrlMarkov}),t(function(t){return t.CtrlPattern=function(){var e=this.optionsObject(arguments,["values","type"],t.CtrlPattern.defaults);this.values=e.values,this.index=0,this._type=null,this._shuffled=null,this._direction=null,this.type=e.type},t.extend(t.CtrlPattern),t.CtrlPattern.Type={Up:"up",Down:"down",UpDown:"upDown",DownUp:"downUp",AlternateUp:"alternateUp",AlternateDown:"alternateDown",Random:"random",RandomWalk:"randomWalk",RandomOnce:"randomOnce"},t.CtrlPattern.defaults={type:t.CtrlPattern.Type.Up,values:[]},Object.defineProperty(t.CtrlPattern.prototype,"value",{get:function(){if(0!==this.values.length){if(1===this.values.length)return this.values[0];this.index=Math.min(this.index,this.values.length-1);var e=this.values[this.index];return this.type===t.CtrlPattern.Type.RandomOnce&&(this.values.length!==this._shuffled.length&&this._shuffleValues(),e=this.values[this._shuffled[this.index]]),e}}}),Object.defineProperty(t.CtrlPattern.prototype,"type",{get:function(){return this._type},set:function(e){this._type=e,this._shuffled=null,this._type===t.CtrlPattern.Type.Up||this._type===t.CtrlPattern.Type.UpDown||this._type===t.CtrlPattern.Type.RandomOnce||this._type===t.CtrlPattern.Type.AlternateUp?this.index=0:this._type!==t.CtrlPattern.Type.Down&&this._type!==t.CtrlPattern.Type.DownUp&&this._type!==t.CtrlPattern.Type.AlternateDown||(this.index=this.values.length-1),this._type===t.CtrlPattern.Type.UpDown||this._type===t.CtrlPattern.Type.AlternateUp?this._direction=t.CtrlPattern.Type.Up:this._type!==t.CtrlPattern.Type.DownUp&&this._type!==t.CtrlPattern.Type.AlternateDown||(this._direction=t.CtrlPattern.Type.Down),this._type===t.CtrlPattern.Type.RandomOnce?this._shuffleValues():this._type===t.CtrlPattern.Random&&(this.index=Math.floor(Math.random()*this.values.length))}}),t.CtrlPattern.prototype.next=function(){var e=this.type;return e===t.CtrlPattern.Type.Up?++this.index>=this.values.length&&(this.index=0):e===t.CtrlPattern.Type.Down?--this.index<0&&(this.index=this.values.length-1):e===t.CtrlPattern.Type.UpDown||e===t.CtrlPattern.Type.DownUp?(this._direction===t.CtrlPattern.Type.Up?this.index++:this.index--,this.index<0?(this.index=1,this._direction=t.CtrlPattern.Type.Up):this.index>=this.values.length&&(this.index=this.values.length-2,this._direction=t.CtrlPattern.Type.Down)):e===t.CtrlPattern.Type.Random?this.index=Math.floor(Math.random()*this.values.length):e===t.CtrlPattern.Type.RandomWalk?Math.random()<.5?(this.index--,this.index=Math.max(this.index,0)):(this.index++,this.index=Math.min(this.index,this.values.length-1)):e===t.CtrlPattern.Type.RandomOnce?++this.index>=this.values.length&&(this.index=0,this._shuffleValues()):e===t.CtrlPattern.Type.AlternateUp?(this._direction===t.CtrlPattern.Type.Up?(this.index+=2,this._direction=t.CtrlPattern.Type.Down):(this.index-=1,this._direction=t.CtrlPattern.Type.Up),this.index>=this.values.length&&(this.index=0,this._direction=t.CtrlPattern.Type.Up)):e===t.CtrlPattern.Type.AlternateDown&&(this._direction===t.CtrlPattern.Type.Up?(this.index+=1,this._direction=t.CtrlPattern.Type.Down):(this.index-=2,this._direction=t.CtrlPattern.Type.Up),this.index<0&&(this.index=this.values.length-1,this._direction=t.CtrlPattern.Type.Down)),this.value},t.CtrlPattern.prototype._shuffleValues=function(){var t=[];this._shuffled=[];for(var e=0;e<this.values.length;e++)t[e]=e;for(;t.length>0;){var i=t.splice(Math.floor(t.length*Math.random()),1);this._shuffled.push(i[0])}},t.CtrlPattern.prototype.dispose=function(){this._shuffled=null,this.values=null},t.CtrlPattern}),t(function(t){return t.CtrlRandom=function(){var e=this.optionsObject(arguments,["min","max"],t.CtrlRandom.defaults);this.min=e.min,this.max=e.max,this.integer=e.integer},t.extend(t.CtrlRandom),t.CtrlRandom.defaults={min:0,max:1,integer:!1},Object.defineProperty(t.CtrlRandom.prototype,"value",{get:function(){var t=this.toSeconds(this.min),e=this.toSeconds(this.max),i=Math.random(),n=i*t+(1-i)*e;return this.integer&&(n=Math.floor(n)),n}}),t.CtrlRandom}),t(function(t){return window.AudioBuffer&&!AudioBuffer.prototype.copyToChannel&&(AudioBuffer.prototype.copyToChannel=function(t,e,i){var n=this.getChannelData(e);i=i||0;for(var s=0;s<n.length;s++)n[s+i]=t[s]},AudioBuffer.prototype.copyFromChannel=function(t,e,i){var n=this.getChannelData(e);i=i||0;for(var s=0;s<n.length;s++)t[s]=n[s+i]}),t.Buffer=function(){var e=this.optionsObject(arguments,["url","onload","onerror"],t.Buffer.defaults);this._buffer=null,this._reversed=e.reverse,this._xhr=null,e.url instanceof AudioBuffer||e.url instanceof t.Buffer?(this.set(e.url),e.onload&&e.onload(this)):this.isString(e.url)&&this.load(e.url,e.onload,e.onerror)},t.extend(t.Buffer),t.Buffer.defaults={url:void 0,reverse:!1},t.Buffer.prototype.set=function(e){return e instanceof t.Buffer?this._buffer=e.get():this._buffer=e,this},t.Buffer.prototype.get=function(){return this._buffer},t.Buffer.prototype.load=function(e,i,n){return new Promise(function(s,o){this._xhr=t.Buffer.load(e,function(t){this._xhr=null,this.set(t),s(this),i&&i(this)}.bind(this),function(t){this._xhr=null,o(t),n&&n(t)}.bind(this))}.bind(this))},t.Buffer.prototype.dispose=function(){return t.Emitter.prototype.dispose.call(this),this._buffer=null,this._xhr&&(t.Buffer._currentDownloads--,this._xhr.abort(),this._xhr=null),this},Object.defineProperty(t.Buffer.prototype,"loaded",{get:function(){return this.length>0}}),Object.defineProperty(t.Buffer.prototype,"duration",{get:function(){return this._buffer?this._buffer.duration:0}}),Object.defineProperty(t.Buffer.prototype,"length",{get:function(){return this._buffer?this._buffer.length:0}}),Object.defineProperty(t.Buffer.prototype,"numberOfChannels",{get:function(){return this._buffer?this._buffer.numberOfChannels:0}}),t.Buffer.prototype.fromArray=function(t){var e=t[0].length>0,i=e?t.length:1,n=e?t[0].length:t.length,s=this.context.createBuffer(i,n,this.context.sampleRate);e||1!==i||(t=[t]);for(var o=0;o<i;o++)s.copyToChannel(t[o],o);return this._buffer=s,this},t.Buffer.prototype.toMono=function(t){if(this.isNumber(t))this.fromArray(this.toArray(t));else{for(var e=new Float32Array(this.length),i=this.numberOfChannels,n=0;n<i;n++)for(var s=this.toArray(n),o=0;o<s.length;o++)e[o]+=s[o];e=e.map(function(t){return t/i}),this.fromArray(e)}return this},t.Buffer.prototype.toArray=function(t){if(this.isNumber(t))return this.getChannelData(t);if(1===this.numberOfChannels)return this.toArray(0);for(var e=[],i=0;i<this.numberOfChannels;i++)e[i]=this.getChannelData(i);return e},t.Buffer.prototype.getChannelData=function(t){return this._buffer.getChannelData(t)},t.Buffer.prototype.slice=function(e,i){i=this.defaultArg(i,this.duration);for(var n=Math.floor(this.context.sampleRate*this.toSeconds(e)),s=Math.floor(this.context.sampleRate*this.toSeconds(i)),o=[],r=0;r<this.numberOfChannels;r++)o[r]=this.toArray(r).slice(n,s);return(new t.Buffer).fromArray(o)},t.Buffer.prototype._reverse=function(){if(this.loaded)for(var t=0;t<this.numberOfChannels;t++)Array.prototype.reverse.call(this.getChannelData(t));return this},Object.defineProperty(t.Buffer.prototype,"reverse",{get:function(){return this._reversed},set:function(t){this._reversed!==t&&(this._reversed=t,this._reverse())}}),t.Emitter.mixin(t.Buffer),t.Buffer._downloadQueue=[],t.Buffer._currentDownloads=0,t.Buffer.baseUrl="",t.Buffer.load=function(e,i,n){function s(e){if(!n)throw new Error(e);n(e),t.Buffer.emit("error",e)}function o(){for(var e=0,i=0;i<t.Buffer._downloadQueue.length;i++)e+=t.Buffer._downloadQueue[i].progress;t.Buffer.emit("progress",e/t.Buffer._downloadQueue.length)}i=i||t.noOp;var r=new XMLHttpRequest;return r.open("GET",t.Buffer.baseUrl+e,!0),r.responseType="arraybuffer",r.progress=0,t.Buffer._currentDownloads++,t.Buffer._downloadQueue.push(r),r.addEventListener("load",function(){200===r.status?t.context.decodeAudioData(r.response,function(e){r.progress=1,o(),i(e),0===--t.Buffer._currentDownloads&&(t.Buffer._downloadQueue=[],t.Buffer.emit("load"))},function(){s("Tone.Buffer: could not decode audio data: "+e)}):s("Tone.Buffer: could not locate file: "+e)}),r.addEventListener("error",s),r.addEventListener("progress",function(t){t.lengthComputable&&(r.progress=t.loaded/t.total*.95,o())}),r.send(),r},t.Buffer.cancelDownloads=function(){return t.Buffer._downloadQueue.forEach(function(t){t.abort()}),t.Buffer._currentDownloads=0,t.Buffer},t.Buffer.supportsType=function(t){var e=t.split(".");return e=e[e.length-1],""!==document.createElement("audio").canPlayType("audio/"+e)},t.loaded=function(){function e(){t.Buffer.off("load",i),t.Buffer.off("error",n)}var i,n;return new Promise(function(e,s){i=function(){e()},n=function(){s()},t.Buffer.on("load",i),t.Buffer.on("error",n)}).then(e).catch(function(t){throw e(),new Error(t)})},t.Buffer}),t(function(t){return t.Buffers=function(t,e,i){this._buffers={},this.baseUrl=this.defaultArg(i,""),t=this._flattenUrls(t),this._loadingCount=0;for(var n in t)this._loadingCount++,this.add(n,t[n],this._bufferLoaded.bind(this,e))},t.extend(t.Buffers),t.Buffers.prototype.has=function(t){return this._buffers.hasOwnProperty(t)},t.Buffers.prototype.get=function(t){if(this.has(t))return this._buffers[t];throw new Error("Tone.Buffers: no buffer named "+t)},t.Buffers.prototype._bufferLoaded=function(t){0===--this._loadingCount&&t&&t(this)},Object.defineProperty(t.Buffers.prototype,"loaded",{get:function(){var t=!0;for(var e in this._buffers){var i=this.get(e);t=t&&i.loaded}return t}}),t.Buffers.prototype.add=function(e,i,n){return n=this.defaultArg(n,t.noOp),i instanceof t.Buffer?(this._buffers[e]=i,n(this)):i instanceof AudioBuffer?(this._buffers[e]=new t.Buffer(i),n(this)):this.isString(i)&&(this._buffers[e]=new t.Buffer(this.baseUrl+i,n)),this},t.Buffers.prototype._flattenUrls=function(t){var e={};for(var i in t)if(t.hasOwnProperty(i))if(this.isObject(t[i])){var n=this._flattenUrls(t[i]);for(var s in n)n.hasOwnProperty(s)&&(e[i+"."+s]=n[s])}else e[i]=t[i];return e},t.Buffers.prototype.dispose=function(){for(var t in this._buffers)this._buffers[t].dispose();return this._buffers=null,this},t.Buffers}),t(function(t){var e={};return t.prototype.send=function(i,n){e.hasOwnProperty(i)||(e[i]=this.context.createGain()),n=this.defaultArg(n,0);var s=new t.Gain(n,t.Type.Decibels);return this.output.chain(s,e[i]),s},t.prototype.receive=function(t,i){return e.hasOwnProperty(t)||(e[t]=this.context.createGain()),this.isUndef(i)&&(i=this.input),e[t].connect(i),this},t.Context.on("init",function(t){t.Buses?e=t.Buses:(e={},t.Buses=e)}),t}),t(function(t){return t.Draw=function(){this._events=new t.Timeline,this.expiration=.25,this.anticipation=.008,this._boundDrawLoop=this._drawLoop.bind(this)},t.extend(t.Draw),t.Draw.prototype.schedule=function(t,e){return this._events.add({callback:t,time:this.toSeconds(e)}),1===this._events.length&&requestAnimationFrame(this._boundDrawLoop),this},t.Draw.prototype.cancel=function(t){return this._events.cancel(this.toSeconds(t)),this},t.Draw.prototype._drawLoop=function(){for(var e=t.now();this._events.length&&this._events.peek().time-this.anticipation<=e;){var i=this._events.shift();e-i.time<=this.expiration&&i.callback()}this._events.length>0&&requestAnimationFrame(this._boundDrawLoop)},t.Draw=new t.Draw,t.Draw}),t(function(t){t.Listener=function(){var t=this.optionsObject(arguments,["positionX","positionY","positionZ"],e.defaults);this._orientation=[t.forwardX,t.forwardY,t.forwardZ,t.upX,t.upY,t.upZ],this._position=[t.positionX,t.positionY,t.positionZ],this.forwardX=t.forwardX,this.forwardY=t.forwardY,this.forwardZ=t.forwardZ,this.upX=t.upX,this.upY=t.upY,this.upZ=t.upZ,this.positionX=t.positionX,this.positionY=t.positionY,this.positionZ=t.positionZ},t.extend(t.Listener),t.Listener.defaults={positionX:0,positionY:0,positionZ:0,forwardX:0,forwardY:0,forwardZ:1,upX:0,upY:1,upZ:0},t.Listener.prototype._rampTimeConstant=.01,t.Listener.prototype.setPosition=function(t,e,i){if(this.context.listener.positionX){var n=this.now();this.context.listener.positionX.setTargetAtTime(t,n,this._rampTimeConstant),this.context.listener.positionY.setTargetAtTime(e,n,this._rampTimeConstant),this.context.listener.positionZ.setTargetAtTime(i,n,this._rampTimeConstant)}else this.context.listener.setPosition(t,e,i);return this._position=Array.prototype.slice.call(arguments),this},t.Listener.prototype.setOrientation=function(t,e,i,n,s,o){if(this.context.listener.forwardX){var r=this.now();this.context.listener.forwardX.setTargetAtTime(t,r,this._rampTimeConstant),this.context.listener.forwardY.setTargetAtTime(e,r,this._rampTimeConstant),this.context.listener.forwardZ.setTargetAtTime(i,r,this._rampTimeConstant),this.context.listener.upX.setTargetAtTime(n,r,this._rampTimeConstant),this.context.listener.upY.setTargetAtTime(s,r,this._rampTimeConstant),this.context.listener.upZ.setTargetAtTime(o,r,this._rampTimeConstant)}else this.context.listener.setOrientation(t,e,i,n,s,o);return this._orientation=Array.prototype.slice.call(arguments),this},Object.defineProperty(t.Listener.prototype,"positionX",{set:function(t){this._position[0]=t,this.setPosition.apply(this,this._position)},get:function(){return this._position[0]}}),Object.defineProperty(t.Listener.prototype,"positionY",{set:function(t){this._position[1]=t,this.setPosition.apply(this,this._position)},get:function(){return this._position[1]}}),Object.defineProperty(t.Listener.prototype,"positionZ",{set:function(t){this._position[2]=t,this.setPosition.apply(this,this._position)},get:function(){return this._position[2]}}),Object.defineProperty(t.Listener.prototype,"forwardX",{set:function(t){this._orientation[0]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[0]}}),Object.defineProperty(t.Listener.prototype,"forwardY",{set:function(t){this._orientation[1]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[1]}}),Object.defineProperty(t.Listener.prototype,"forwardZ",{set:function(t){this._orientation[2]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[2]}}),Object.defineProperty(t.Listener.prototype,"upX",{set:function(t){this._orientation[3]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[3]}}),Object.defineProperty(t.Listener.prototype,"upY",{set:function(t){this._orientation[4]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[4]}}),Object.defineProperty(t.Listener.prototype,"upZ",{set:function(t){this._orientation[5]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[5]}}),t.Listener.prototype.dispose=function(){return this._orientation=null,this._position=null,this};var e=t.Listener;return t.Listener=new e,t.Context.on("init",function(i){i.Listener instanceof e?t.Listener=i.Listener:t.Listener=new e,i.Listener=t.Listener}),t.Listener}),t(function(t){return!window.hasOwnProperty("OfflineAudioContext")&&window.hasOwnProperty("webkitOfflineAudioContext")&&(window.OfflineAudioContext=window.webkitOfflineAudioContext),t.OfflineContext=function(e,i,n){var s=new OfflineAudioContext(e,i*n,n);t.Context.call(this,s),this._duration=i,this._currentTime=0,this.lookAhead=this.blockTime,this.updateInterval=this.blockTime},t.extend(t.OfflineContext,t.Context),t.OfflineContext.prototype.now=function(){return this._currentTime},t.OfflineContext.prototype._createWorker=function(){return{postMessage:function(){}}},t.OfflineContext.prototype.render=function(){for(;this._duration-this._currentTime>=0;)this.emit("tick"),this._currentTime+=t.prototype.blockTime;return new Promise(function(t){this._context.oncomplete=function(e){t(e.renderedBuffer)},this._context.startRendering()}.bind(this))},t.OfflineContext}),t(function(t){return t.Offline=function(e,i){var n=t.context.sampleRate,s=t.context,o=new t.OfflineContext(2,i,n);t.context=o,e(t.Transport);var r=o.render();return t.context=s,r.then(function(e){return new t.Buffer(e)})},t.Offline}),t(function(t){return t.Effect=function(){this.createInsOuts(1,1);var e=this.optionsObject(arguments,["wet"],t.Effect.defaults);this._dryWet=new t.CrossFade(e.wet),this.wet=this._dryWet.fade,this.effectSend=new t.Gain,this.effectReturn=new t.Gain,this.input.connect(this._dryWet.a),this.input.connect(this.effectSend),this.effectReturn.connect(this._dryWet.b),this._dryWet.connect(this.output),this._readOnly(["wet"])},t.extend(t.Effect),t.Effect.defaults={wet:1},t.Effect.prototype.connectEffect=function(t){return this.effectSend.chain(t,this.effectReturn),this},t.Effect.prototype.dispose=function(){return t.prototype.dispose.call(this),this._dryWet.dispose(),this._dryWet=null,this.effectSend.dispose(),this.effectSend=null,this.effectReturn.dispose(),this.effectReturn=null,this._writable(["wet"]),this.wet=null,this},t.Effect}),t(function(t){return t.AutoFilter=function(){var e=this.optionsObject(arguments,["frequency","baseFrequency","octaves"],t.AutoFilter.defaults);t.Effect.call(this,e),this._lfo=new t.LFO({frequency:e.frequency,amplitude:e.depth}),this.depth=this._lfo.amplitude,this.frequency=this._lfo.frequency,this.filter=new t.Filter(e.filter),this._octaves=0,this.connectEffect(this.filter),this._lfo.connect(this.filter.frequency),this.type=e.type,this._readOnly(["frequency","depth"]),this.octaves=e.octaves,this.baseFrequency=e.baseFrequency},t.extend(t.AutoFilter,t.Effect),t.AutoFilter.defaults={frequency:1,type:"sine",depth:1,baseFrequency:200,octaves:2.6,filter:{type:"lowpass",rolloff:-12,Q:1}},t.AutoFilter.prototype.start=function(t){return this._lfo.start(t),this},t.AutoFilter.prototype.stop=function(t){return this._lfo.stop(t),this},t.AutoFilter.prototype.sync=function(t){return this._lfo.sync(t),this},t.AutoFilter.prototype.unsync=function(){return this._lfo.unsync(),this},Object.defineProperty(t.AutoFilter.prototype,"type",{get:function(){return this._lfo.type},set:function(t){this._lfo.type=t}}),Object.defineProperty(t.AutoFilter.prototype,"baseFrequency",{get:function(){return this._lfo.min},set:function(t){this._lfo.min=this.toFrequency(t),this.octaves=this._octaves}}),Object.defineProperty(t.AutoFilter.prototype,"octaves",{get:function(){return this._octaves},set:function(t){this._octaves=t,this._lfo.max=this.baseFrequency*Math.pow(2,t)}}),t.AutoFilter.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._lfo.dispose(),this._lfo=null,this.filter.dispose(),this.filter=null,this._writable(["frequency","depth"]),this.frequency=null,this.depth=null,this},t.AutoFilter}),t(function(t){return t.AutoPanner=function(){var e=this.optionsObject(arguments,["frequency"],t.AutoPanner.defaults);t.Effect.call(this,e),this._lfo=new t.LFO({frequency:e.frequency,amplitude:e.depth,min:-1,max:1}),this.depth=this._lfo.amplitude,this._panner=new t.Panner,this.frequency=this._lfo.frequency,this.connectEffect(this._panner),this._lfo.connect(this._panner.pan),this.type=e.type,this._readOnly(["depth","frequency"])},t.extend(t.AutoPanner,t.Effect),t.AutoPanner.defaults={frequency:1,type:"sine",depth:1},t.AutoPanner.prototype.start=function(t){return this._lfo.start(t),this},t.AutoPanner.prototype.stop=function(t){return this._lfo.stop(t),this},t.AutoPanner.prototype.sync=function(t){return this._lfo.sync(t),this},t.AutoPanner.prototype.unsync=function(){return this._lfo.unsync(),this},Object.defineProperty(t.AutoPanner.prototype,"type",{get:function(){return this._lfo.type},set:function(t){this._lfo.type=t}}),t.AutoPanner.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._lfo.dispose(),this._lfo=null,this._panner.dispose(),this._panner=null,this._writable(["depth","frequency"]),this.frequency=null,this.depth=null,this},t.AutoPanner}),t(function(t){return t.AutoWah=function(){var e=this.optionsObject(arguments,["baseFrequency","octaves","sensitivity"],t.AutoWah.defaults);t.Effect.call(this,e),this.follower=new t.Follower(e.follower),this._sweepRange=new t.ScaleExp(0,1,.5),this._baseFrequency=e.baseFrequency,this._octaves=e.octaves,this._inputBoost=new t.Gain,this._bandpass=new t.Filter({rolloff:-48,frequency:0,Q:e.Q}),this._peaking=new t.Filter(0,"peaking"),this._peaking.gain.value=e.gain,this.gain=this._peaking.gain,this.Q=this._bandpass.Q,this.effectSend.chain(this._inputBoost,this.follower,this._sweepRange),this._sweepRange.connect(this._bandpass.frequency),this._sweepRange.connect(this._peaking.frequency),this.effectSend.chain(this._bandpass,this._peaking,this.effectReturn),this._setSweepRange(),this.sensitivity=e.sensitivity,this._readOnly(["gain","Q"])},t.extend(t.AutoWah,t.Effect),t.AutoWah.defaults={baseFrequency:100,octaves:6,sensitivity:0,Q:2,gain:2,follower:{attack:.3,release:.5}},Object.defineProperty(t.AutoWah.prototype,"octaves",{get:function(){return this._octaves},set:function(t){this._octaves=t,this._setSweepRange()}}),Object.defineProperty(t.AutoWah.prototype,"baseFrequency",{get:function(){return this._baseFrequency},set:function(t){this._baseFrequency=t,this._setSweepRange()}}),Object.defineProperty(t.AutoWah.prototype,"sensitivity",{get:function(){return this.gainToDb(1/this._inputBoost.gain.value)},set:function(t){this._inputBoost.gain.value=1/this.dbToGain(t)}}),t.AutoWah.prototype._setSweepRange=function(){this._sweepRange.min=this._baseFrequency,this._sweepRange.max=Math.min(this._baseFrequency*Math.pow(2,this._octaves),this.context.sampleRate/2)},t.AutoWah.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this.follower.dispose(),this.follower=null,this._sweepRange.dispose(),this._sweepRange=null,this._bandpass.dispose(),this._bandpass=null,this._peaking.dispose(),this._peaking=null,this._inputBoost.dispose(),this._inputBoost=null,this._writable(["gain","Q"]),this.gain=null,this.Q=null,this},t.AutoWah}),t(function(t){return t.BitCrusher=function(){var e=this.optionsObject(arguments,["bits"],t.BitCrusher.defaults);t.Effect.call(this,e);var i=1/Math.pow(2,e.bits-1);this._subtract=new t.Subtract,this._modulo=new t.Modulo(i),this._bits=e.bits,this.effectSend.fan(this._subtract,this._modulo),this._modulo.connect(this._subtract,0,1),this._subtract.connect(this.effectReturn)},t.extend(t.BitCrusher,t.Effect),t.BitCrusher.defaults={bits:4},Object.defineProperty(t.BitCrusher.prototype,"bits",{get:function(){return this._bits},set:function(t){this._bits=t;var e=1/Math.pow(2,t-1);this._modulo.value=e}}),t.BitCrusher.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._subtract.dispose(),this._subtract=null,this._modulo.dispose(),this._modulo=null,this},t.BitCrusher}),t(function(t){return t.Chebyshev=function(){var e=this.optionsObject(arguments,["order"],t.Chebyshev.defaults);t.Effect.call(this,e),this._shaper=new t.WaveShaper(4096),this._order=e.order,this.connectEffect(this._shaper),this.order=e.order,this.oversample=e.oversample},t.extend(t.Chebyshev,t.Effect),t.Chebyshev.defaults={order:1,oversample:"none"},t.Chebyshev.prototype._getCoefficient=function(t,e,i){return i.hasOwnProperty(e)?i[e]:(i[e]=0===e?0:1===e?t:2*t*this._getCoefficient(t,e-1,i)-this._getCoefficient(t,e-2,i),i[e])},Object.defineProperty(t.Chebyshev.prototype,"order",{get:function(){return this._order},set:function(t){this._order=t;for(var e=new Array(4096),i=e.length,n=0;n<i;++n){var s=2*n/i-1;e[n]=0===s?0:this._getCoefficient(s,t,{})}this._shaper.curve=e}}),Object.defineProperty(t.Chebyshev.prototype,"oversample",{get:function(){return this._shaper.oversample},set:function(t){this._shaper.oversample=t}}),t.Chebyshev.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._shaper.dispose(),this._shaper=null,this},t.Chebyshev}),t(function(t){return t.StereoEffect=function(){this.createInsOuts(1,1);var e=this.optionsObject(arguments,["wet"],t.Effect.defaults);this._dryWet=new t.CrossFade(e.wet),this.wet=this._dryWet.fade,this._split=new t.Split,this.effectSendL=this._split.left,this.effectSendR=this._split.right,this._merge=new t.Merge,this.effectReturnL=this._merge.left,this.effectReturnR=this._merge.right,this.input.connect(this._split),this.input.connect(this._dryWet,0,0),this._merge.connect(this._dryWet,0,1),this._dryWet.connect(this.output),this._readOnly(["wet"])},t.extend(t.StereoEffect,t.Effect),t.StereoEffect.prototype.dispose=function(){return t.prototype.dispose.call(this),this._dryWet.dispose(),this._dryWet=null,this._split.dispose(),this._split=null,this._merge.dispose(),this._merge=null,this.effectSendL=null,this.effectSendR=null,this.effectReturnL=null,this.effectReturnR=null,this._writable(["wet"]),this.wet=null,this},t.StereoEffect}),t(function(t){return t.FeedbackEffect=function(){var e=this.optionsObject(arguments,["feedback"]);e=this.defaultArg(e,t.FeedbackEffect.defaults),t.Effect.call(this,e),this._feedbackGain=new t.Gain(e.feedback,t.Type.NormalRange),this.feedback=this._feedbackGain.gain,this.effectReturn.chain(this._feedbackGain,this.effectSend),this._readOnly(["feedback"])},t.extend(t.FeedbackEffect,t.Effect),t.FeedbackEffect.defaults={feedback:.125},t.FeedbackEffect.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._writable(["feedback"]),this._feedbackGain.dispose(),this._feedbackGain=null,this.feedback=null,this},t.FeedbackEffect}),t(function(t){return t.StereoXFeedbackEffect=function(){var e=this.optionsObject(arguments,["feedback"],t.FeedbackEffect.defaults);t.StereoEffect.call(this,e),this.feedback=new t.Signal(e.feedback,t.Type.NormalRange),this._feedbackLR=new t.Gain,this._feedbackRL=new t.Gain,this.effectReturnL.chain(this._feedbackLR,this.effectSendR),this.effectReturnR.chain(this._feedbackRL,this.effectSendL),this.feedback.fan(this._feedbackLR.gain,this._feedbackRL.gain),this._readOnly(["feedback"])},t.extend(t.StereoXFeedbackEffect,t.FeedbackEffect),t.StereoXFeedbackEffect.prototype.dispose=function(){return t.StereoEffect.prototype.dispose.call(this),this._writable(["feedback"]),this.feedback.dispose(),this.feedback=null,this._feedbackLR.dispose(),this._feedbackLR=null,this._feedbackRL.dispose(),this._feedbackRL=null,this},t.StereoXFeedbackEffect}),t(function(t){return t.Chorus=function(){var e=this.optionsObject(arguments,["frequency","delayTime","depth"],t.Chorus.defaults);t.StereoXFeedbackEffect.call(this,e),this._depth=e.depth,this._delayTime=e.delayTime/1e3,this._lfoL=new t.LFO({frequency:e.frequency,min:0,max:1}),this._lfoR=new t.LFO({frequency:e.frequency,min:0,max:1,phase:180}),this._delayNodeL=new t.Delay,this._delayNodeR=new t.Delay,this.frequency=this._lfoL.frequency,this.effectSendL.chain(this._delayNodeL,this.effectReturnL),this.effectSendR.chain(this._delayNodeR,this.effectReturnR),this.effectSendL.connect(this.effectReturnL),this.effectSendR.connect(this.effectReturnR),this._lfoL.connect(this._delayNodeL.delayTime),this._lfoR.connect(this._delayNodeR.delayTime),this._lfoL.start(),this._lfoR.start(),this._lfoL.frequency.connect(this._lfoR.frequency),this.depth=this._depth,this.frequency.value=e.frequency,this.type=e.type,this._readOnly(["frequency"]),this.spread=e.spread},t.extend(t.Chorus,t.StereoXFeedbackEffect),t.Chorus.defaults={frequency:1.5,delayTime:3.5,depth:.7,feedback:.1,type:"sine",spread:180},Object.defineProperty(t.Chorus.prototype,"depth",{get:function(){return this._depth},set:function(t){this._depth=t;var e=this._delayTime*t;this._lfoL.min=Math.max(this._delayTime-e,0),this._lfoL.max=this._delayTime+e,this._lfoR.min=Math.max(this._delayTime-e,0),this._lfoR.max=this._delayTime+e}}),Object.defineProperty(t.Chorus.prototype,"delayTime",{get:function(){return 1e3*this._delayTime},set:function(t){this._delayTime=t/1e3,this.depth=this._depth}}),Object.defineProperty(t.Chorus.prototype,"type",{get:function(){return this._lfoL.type},set:function(t){this._lfoL.type=t,this._lfoR.type=t}}),Object.defineProperty(t.Chorus.prototype,"spread",{get:function(){return this._lfoR.phase-this._lfoL.phase},set:function(t){this._lfoL.phase=90-t/2,this._lfoR.phase=t/2+90}}),t.Chorus.prototype.dispose=function(){return t.StereoXFeedbackEffect.prototype.dispose.call(this),this._lfoL.dispose(),this._lfoL=null,this._lfoR.dispose(),this._lfoR=null,this._delayNodeL.dispose(),this._delayNodeL=null,this._delayNodeR.dispose(),this._delayNodeR=null,this._writable("frequency"),this.frequency=null,this},t.Chorus}),t(function(t){return t.Convolver=function(){var e=this.optionsObject(arguments,["url","onload"],t.Convolver.defaults);t.Effect.call(this,e),this._convolver=this.context.createConvolver(),this._buffer=new t.Buffer,this.isString(e.url)?this._buffer.load(e.url,function(t){this.buffer=t,e.onload()}.bind(this)):e.url&&(this.buffer=e.url,e.onload()),this.connectEffect(this._convolver)},t.extend(t.Convolver,t.Effect),t.Convolver.defaults={onload:t.noOp},Object.defineProperty(t.Convolver.prototype,"buffer",{get:function(){return this._buffer.get()},set:function(t){this._buffer.set(t),this._convolver.buffer=this._buffer.get()}}),t.Convolver.prototype.load=function(t,e){return this._buffer.load(t,function(t){this.buffer=t,e&&e()}.bind(this))},t.Convolver.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._convolver.disconnect(),this._convolver=null,this._buffer.dispose(),this._buffer=null,this},t.Convolver}),t(function(t){return t.Distortion=function(){var e=this.optionsObject(arguments,["distortion"],t.Distortion.defaults);t.Effect.call(this,e),this._shaper=new t.WaveShaper(4096),this._distortion=e.distortion,this.connectEffect(this._shaper),this.distortion=e.distortion,this.oversample=e.oversample},t.extend(t.Distortion,t.Effect),t.Distortion.defaults={distortion:.4,oversample:"none"},Object.defineProperty(t.Distortion.prototype,"distortion",{get:function(){return this._distortion},set:function(t){this._distortion=t;var e=100*t,i=Math.PI/180;this._shaper.setMap(function(t){return Math.abs(t)<.001?0:(3+e)*t*20*i/(Math.PI+e*Math.abs(t))})}}),Object.defineProperty(t.Distortion.prototype,"oversample",{get:function(){return this._shaper.oversample},set:function(t){this._shaper.oversample=t}}),t.Distortion.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._shaper.dispose(),this._shaper=null,this},t.Distortion}),t(function(t){return t.FeedbackDelay=function(){var e=this.optionsObject(arguments,["delayTime","feedback"],t.FeedbackDelay.defaults);t.FeedbackEffect.call(this,e),this._delayNode=new t.Delay(e.delayTime),this.delayTime=this._delayNode.delayTime,this.connectEffect(this._delayNode),this._readOnly(["delayTime"])},t.extend(t.FeedbackDelay,t.FeedbackEffect),t.FeedbackDelay.defaults={delayTime:.25},t.FeedbackDelay.prototype.dispose=function(){return t.FeedbackEffect.prototype.dispose.call(this),this._delayNode.dispose(),this._delayNode=null,this._writable(["delayTime"]),this.delayTime=null,this},t.FeedbackDelay}),t(function(t){var e=[1557/44100,1617/44100,1491/44100,1422/44100,1277/44100,1356/44100,1188/44100,1116/44100],i=[225,556,441,341];return t.Freeverb=function(){var n=this.optionsObject(arguments,["roomSize","dampening"],t.Freeverb.defaults);t.StereoEffect.call(this,n),this.roomSize=new t.Signal(n.roomSize,t.Type.NormalRange),this.dampening=new t.Signal(n.dampening,t.Type.Frequency),this._combFilters=[],this._allpassFiltersL=[],this._allpassFiltersR=[];for(var s=0;s<i.length;s++){var o=this.context.createBiquadFilter();o.type="allpass",o.frequency.value=i[s],this._allpassFiltersL.push(o)}for(var r=0;r<i.length;r++){var a=this.context.createBiquadFilter();a.type="allpass",a.frequency.value=i[r],this._allpassFiltersR.push(a)}for(var h=0;h<e.length;h++){var l=new t.LowpassCombFilter(e[h]);h<e.length/2?this.effectSendL.chain(l,this._allpassFiltersL[0]):this.effectSendR.chain(l,this._allpassFiltersR[0]),this.roomSize.connect(l.resonance),this.dampening.connect(l.dampening),this._combFilters.push(l)}this.connectSeries.apply(this,this._allpassFiltersL),this.connectSeries.apply(this,this._allpassFiltersR),this._allpassFiltersL[this._allpassFiltersL.length-1].connect(this.effectReturnL),this._allpassFiltersR[this._allpassFiltersR.length-1].connect(this.effectReturnR),this._readOnly(["roomSize","dampening"])},t.extend(t.Freeverb,t.StereoEffect),t.Freeverb.defaults={roomSize:.7,dampening:3e3},t.Freeverb.prototype.dispose=function(){t.StereoEffect.prototype.dispose.call(this);for(var e=0;e<this._allpassFiltersL.length;e++)this._allpassFiltersL[e].disconnect(),this._allpassFiltersL[e]=null;this._allpassFiltersL=null;for(var i=0;i<this._allpassFiltersR.length;i++)this._allpassFiltersR[i].disconnect(),this._allpassFiltersR[i]=null;this._allpassFiltersR=null;for(var n=0;n<this._combFilters.length;n++)this._combFilters[n].dispose(),this._combFilters[n]=null;return this._combFilters=null,this._writable(["roomSize","dampening"]),this.roomSize.dispose(),this.roomSize=null,this.dampening.dispose(),this.dampening=null,this},t.Freeverb}),t(function(t){var e=[.06748,.06404,.08212,.09004],i=[.773,.802,.753,.733],n=[347,113,37];return t.JCReverb=function(){var s=this.optionsObject(arguments,["roomSize"],t.JCReverb.defaults);t.StereoEffect.call(this,s),this.roomSize=new t.Signal(s.roomSize,t.Type.NormalRange),this._scaleRoomSize=new t.Scale(-.733,.197),this._allpassFilters=[],this._feedbackCombFilters=[];for(var o=0;o<n.length;o++){var r=this.context.createBiquadFilter();r.type="allpass",r.frequency.value=n[o],this._allpassFilters.push(r)}for(var a=0;a<e.length;a++){var h=new t.FeedbackCombFilter(e[a],.1);this._scaleRoomSize.connect(h.resonance),h.resonance.value=i[a],this._allpassFilters[this._allpassFilters.length-1].connect(h),a<e.length/2?h.connect(this.effectReturnL):h.connect(this.effectReturnR),this._feedbackCombFilters.push(h)}this.roomSize.connect(this._scaleRoomSize),this.connectSeries.apply(this,this._allpassFilters),this.effectSendL.connect(this._allpassFilters[0]),this.effectSendR.connect(this._allpassFilters[0]),this._readOnly(["roomSize"])},t.extend(t.JCReverb,t.StereoEffect),t.JCReverb.defaults={roomSize:.5},t.JCReverb.prototype.dispose=function(){t.StereoEffect.prototype.dispose.call(this);for(var e=0;e<this._allpassFilters.length;e++)this._allpassFilters[e].disconnect(),this._allpassFilters[e]=null;this._allpassFilters=null;for(var i=0;i<this._feedbackCombFilters.length;i++)this._feedbackCombFilters[i].dispose(),this._feedbackCombFilters[i]=null;return this._feedbackCombFilters=null,this._writable(["roomSize"]),this.roomSize.dispose(),this.roomSize=null,this._scaleRoomSize.dispose(),this._scaleRoomSize=null,this},t.JCReverb}),t(function(t){return t.MidSideEffect=function(){t.Effect.apply(this,arguments),this._midSideSplit=new t.MidSideSplit,this._midSideMerge=new t.MidSideMerge,this.midSend=this._midSideSplit.mid,this.sideSend=this._midSideSplit.side,this.midReturn=this._midSideMerge.mid,this.sideReturn=this._midSideMerge.side,this.effectSend.connect(this._midSideSplit),this._midSideMerge.connect(this.effectReturn)},t.extend(t.MidSideEffect,t.Effect),t.MidSideEffect.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._midSideSplit.dispose(),this._midSideSplit=null,this._midSideMerge.dispose(),this._midSideMerge=null,this.midSend=null,this.sideSend=null,this.midReturn=null,this.sideReturn=null,this},t.MidSideEffect}),t(function(t){return t.Phaser=function(){var e=this.optionsObject(arguments,["frequency","octaves","baseFrequency"],t.Phaser.defaults);t.StereoEffect.call(this,e),this._lfoL=new t.LFO(e.frequency,0,1),this._lfoR=new t.LFO(e.frequency,0,1),this._lfoR.phase=180,this._baseFrequency=e.baseFrequency,this._octaves=e.octaves,this.Q=new t.Signal(e.Q,t.Type.Positive),this._filtersL=this._makeFilters(e.stages,this._lfoL,this.Q),this._filtersR=this._makeFilters(e.stages,this._lfoR,this.Q),this.frequency=this._lfoL.frequency,this.frequency.value=e.frequency,this.effectSendL.connect(this._filtersL[0]),this.effectSendR.connect(this._filtersR[0]),this._filtersL[e.stages-1].connect(this.effectReturnL),this._filtersR[e.stages-1].connect(this.effectReturnR),this._lfoL.frequency.connect(this._lfoR.frequency),this.baseFrequency=e.baseFrequency,this.octaves=e.octaves,this._lfoL.start(),this._lfoR.start(),this._readOnly(["frequency","Q"])},t.extend(t.Phaser,t.StereoEffect),t.Phaser.defaults={frequency:.5,octaves:3,stages:10,Q:10,baseFrequency:350},t.Phaser.prototype._makeFilters=function(t,e,i){for(var n=new Array(t),s=0;s<t;s++){var o=this.context.createBiquadFilter();o.type="allpass",i.connect(o.Q),e.connect(o.frequency),n[s]=o}return this.connectSeries.apply(this,n),n},Object.defineProperty(t.Phaser.prototype,"octaves",{get:function(){return this._octaves},set:function(t){this._octaves=t;var e=this._baseFrequency*Math.pow(2,t);this._lfoL.max=e,this._lfoR.max=e}}),Object.defineProperty(t.Phaser.prototype,"baseFrequency",{get:function(){return this._baseFrequency},set:function(t){this._baseFrequency=t,this._lfoL.min=t,this._lfoR.min=t,this.octaves=this._octaves}}),t.Phaser.prototype.dispose=function(){t.StereoEffect.prototype.dispose.call(this),this._writable(["frequency","Q"]),this.Q.dispose(),this.Q=null,this._lfoL.dispose(),this._lfoL=null,this._lfoR.dispose(),this._lfoR=null;for(var e=0;e<this._filtersL.length;e++)this._filtersL[e].disconnect(),this._filtersL[e]=null;this._filtersL=null;for(var i=0;i<this._filtersR.length;i++)this._filtersR[i].disconnect(),this._filtersR[i]=null;return this._filtersR=null,this.frequency=null,this},t.Phaser}),t(function(t){return t.PingPongDelay=function(){var e=this.optionsObject(arguments,["delayTime","feedback"],t.PingPongDelay.defaults);t.StereoXFeedbackEffect.call(this,e),this._leftDelay=new t.Delay(0,e.maxDelayTime),this._rightDelay=new t.Delay(0,e.maxDelayTime),this._rightPreDelay=new t.Delay(0,e.maxDelayTime),this.delayTime=new t.Signal(e.delayTime,t.Type.Time),this.effectSendL.chain(this._leftDelay,this.effectReturnL),this.effectSendR.chain(this._rightPreDelay,this._rightDelay,this.effectReturnR),this.delayTime.fan(this._leftDelay.delayTime,this._rightDelay.delayTime,this._rightPreDelay.delayTime),this._feedbackLR.disconnect(),this._feedbackLR.connect(this._rightDelay),this._readOnly(["delayTime"])},t.extend(t.PingPongDelay,t.StereoXFeedbackEffect),t.PingPongDelay.defaults={delayTime:.25,maxDelayTime:1},t.PingPongDelay.prototype.dispose=function(){return t.StereoXFeedbackEffect.prototype.dispose.call(this),this._leftDelay.dispose(),this._leftDelay=null,this._rightDelay.dispose(),this._rightDelay=null,this._rightPreDelay.dispose(),this._rightPreDelay=null,this._writable(["delayTime"]),this.delayTime.dispose(),this.delayTime=null,this},t.PingPongDelay}),t(function(t){return t.PitchShift=function(){var e=this.optionsObject(arguments,["pitch"],t.PitchShift.defaults);t.FeedbackEffect.call(this,e),this._frequency=new t.Signal(0),this._delayA=new t.Delay(0,1),this._lfoA=new t.LFO({min:0,max:.1,type:"sawtooth"}).connect(this._delayA.delayTime),this._delayB=new t.Delay(0,1),this._lfoB=new t.LFO({min:0,max:.1,type:"sawtooth",phase:180}).connect(this._delayB.delayTime),this._crossFade=new t.CrossFade,this._crossFadeLFO=new t.LFO({min:0,max:1,type:"triangle",phase:90}).connect(this._crossFade.fade),this._feedbackDelay=new t.Delay(e.delayTime),this.delayTime=this._feedbackDelay.delayTime,this._readOnly("delayTime"),this._pitch=e.pitch,this._windowSize=e.windowSize,this._delayA.connect(this._crossFade.a),this._delayB.connect(this._crossFade.b),this._frequency.fan(this._lfoA.frequency,this._lfoB.frequency,this._crossFadeLFO.frequency),this.effectSend.fan(this._delayA,this._delayB),this._crossFade.chain(this._feedbackDelay,this.effectReturn);var i=this.now();this._lfoA.start(i),this._lfoB.start(i),this._crossFadeLFO.start(i),this.windowSize=this._windowSize},t.extend(t.PitchShift,t.FeedbackEffect),t.PitchShift.defaults={pitch:0,windowSize:.1,delayTime:0,feedback:0},Object.defineProperty(t.PitchShift.prototype,"pitch",{get:function(){return this._pitch},set:function(t){this._pitch=t;var e=0;t<0?(this._lfoA.min=0,this._lfoA.max=this._windowSize,this._lfoB.min=0,this._lfoB.max=this._windowSize,e=this.intervalToFrequencyRatio(t-1)+1):(this._lfoA.min=this._windowSize,this._lfoA.max=0,this._lfoB.min=this._windowSize,this._lfoB.max=0,e=this.intervalToFrequencyRatio(t)-1),this._frequency.value=e*(1.2/this._windowSize)}}),Object.defineProperty(t.PitchShift.prototype,"windowSize",{get:function(){return this._windowSize},set:function(t){this._windowSize=this.toSeconds(t),this.pitch=this._pitch}}),t.PitchShift.prototype.dispose=function(){return t.FeedbackEffect.prototype.dispose.call(this),this._frequency.dispose(),this._frequency=null,this._delayA.disconnect(),this._delayA=null,this._delayB.disconnect(),this._delayB=null,this._lfoA.dispose(),this._lfoA=null,this._lfoB.dispose(),this._lfoB=null,this._crossFade.dispose(),this._crossFade=null,this._crossFadeLFO.dispose(),this._crossFadeLFO=null,this._writable("delayTime"),this._feedbackDelay.dispose(),this._feedbackDelay=null,this.delayTime=null,this},t.PitchShift}),t(function(t){return t.StereoFeedbackEffect=function(){var e=this.optionsObject(arguments,["feedback"],t.FeedbackEffect.defaults);t.StereoEffect.call(this,e),this.feedback=new t.Signal(e.feedback,t.Type.NormalRange),this._feedbackL=new t.Gain,this._feedbackR=new t.Gain,this.effectReturnL.chain(this._feedbackL,this.effectSendL),this.effectReturnR.chain(this._feedbackR,this.effectSendR),this.feedback.fan(this._feedbackL.gain,this._feedbackR.gain),this._readOnly(["feedback"])},t.extend(t.StereoFeedbackEffect,t.FeedbackEffect),t.StereoFeedbackEffect.prototype.dispose=function(){return t.StereoEffect.prototype.dispose.call(this),this._writable(["feedback"]),this.feedback.dispose(),this.feedback=null,this._feedbackL.dispose(),this._feedbackL=null,this._feedbackR.dispose(),this._feedbackR=null,this},t.StereoFeedbackEffect}),t(function(t){return t.StereoWidener=function(){var e=this.optionsObject(arguments,["width"],t.StereoWidener.defaults);t.MidSideEffect.call(this,e),this.width=new t.Signal(e.width,t.Type.NormalRange),this._midMult=new t.Expr("$0 * ($1 * (1 - $2))"),this._sideMult=new t.Expr("$0 * ($1 * $2)"),this._two=new t.Signal(2),this._two.connect(this._midMult,0,1),this.width.connect(this._midMult,0,2),this._two.connect(this._sideMult,0,1),this.width.connect(this._sideMult,0,2),this.midSend.chain(this._midMult,this.midReturn),this.sideSend.chain(this._sideMult,this.sideReturn),this._readOnly(["width"])},t.extend(t.StereoWidener,t.MidSideEffect),t.StereoWidener.defaults={width:.5},t.StereoWidener.prototype.dispose=function(){return t.MidSideEffect.prototype.dispose.call(this),this._writable(["width"]),this.width.dispose(),this.width=null,this._midMult.dispose(),this._midMult=null,this._sideMult.dispose(),this._sideMult=null,this._two.dispose(),this._two=null,this},t.StereoWidener}),t(function(t){return t.Tremolo=function(){var e=this.optionsObject(arguments,["frequency","depth"],t.Tremolo.defaults);t.StereoEffect.call(this,e),this._lfoL=new t.LFO({phase:e.spread,min:1,max:0}),this._lfoR=new t.LFO({phase:e.spread,min:1,max:0}),this._amplitudeL=new t.Gain,this._amplitudeR=new t.Gain,this.frequency=new t.Signal(e.frequency,t.Type.Frequency),this.depth=new t.Signal(e.depth,t.Type.NormalRange),this._readOnly(["frequency","depth"]),this.effectSendL.chain(this._amplitudeL,this.effectReturnL),this.effectSendR.chain(this._amplitudeR,this.effectReturnR),this._lfoL.connect(this._amplitudeL.gain),this._lfoR.connect(this._amplitudeR.gain),this.frequency.fan(this._lfoL.frequency,this._lfoR.frequency),this.depth.fan(this._lfoR.amplitude,this._lfoL.amplitude),this.type=e.type,this.spread=e.spread},t.extend(t.Tremolo,t.StereoEffect),t.Tremolo.defaults={frequency:10,type:"sine",depth:.5,spread:180},t.Tremolo.prototype.start=function(t){return this._lfoL.start(t),this._lfoR.start(t),this},t.Tremolo.prototype.stop=function(t){return this._lfoL.stop(t),this._lfoR.stop(t),this},t.Tremolo.prototype.sync=function(t){return this._lfoL.sync(t),this._lfoR.sync(t),this},t.Tremolo.prototype.unsync=function(){return this._lfoL.unsync(),this._lfoR.unsync(),this},Object.defineProperty(t.Tremolo.prototype,"type",{get:function(){return this._lfoL.type},set:function(t){this._lfoL.type=t,this._lfoR.type=t}}),Object.defineProperty(t.Tremolo.prototype,"spread",{get:function(){return this._lfoR.phase-this._lfoL.phase},set:function(t){this._lfoL.phase=90-t/2,this._lfoR.phase=t/2+90}}),t.Tremolo.prototype.dispose=function(){return t.StereoEffect.prototype.dispose.call(this),this._writable(["frequency","depth"]),this._lfoL.dispose(),this._lfoL=null,this._lfoR.dispose(),this._lfoR=null,this._amplitudeL.dispose(),this._amplitudeL=null,this._amplitudeR.dispose(),this._amplitudeR=null,this.frequency=null,this.depth=null,this},t.Tremolo}),t(function(t){return t.Vibrato=function(){var e=this.optionsObject(arguments,["frequency","depth"],t.Vibrato.defaults);t.Effect.call(this,e),this._delayNode=new t.Delay(0,e.maxDelay),this._lfo=new t.LFO({type:e.type,min:0,max:e.maxDelay,frequency:e.frequency,phase:-90}).start().connect(this._delayNode.delayTime),this.frequency=this._lfo.frequency,this.depth=this._lfo.amplitude,this.depth.value=e.depth,this._readOnly(["frequency","depth"]),this.effectSend.chain(this._delayNode,this.effectReturn)},t.extend(t.Vibrato,t.Effect),t.Vibrato.defaults={maxDelay:.005,frequency:5,depth:.1,type:"sine"},Object.defineProperty(t.Vibrato.prototype,"type",{get:function(){return this._lfo.type},set:function(t){this._lfo.type=t}}),t.Vibrato.prototype.dispose=function(){t.Effect.prototype.dispose.call(this),this._delayNode.dispose(),this._delayNode=null,this._lfo.dispose(),this._lfo=null,this._writable(["frequency","depth"]),this.frequency=null,this.depth=null},t.Vibrato}),t(function(t){return t.Event=function(){var e=this.optionsObject(arguments,["callback","value"],t.Event.defaults);this._loop=e.loop,this.callback=e.callback,this.value=e.value,this._loopStart=this.toTicks(e.loopStart),this._loopEnd=this.toTicks(e.loopEnd),this._state=new t.TimelineState(t.State.Stopped),this._playbackRate=1,this._startOffset=0,this.probability=e.probability,this.humanize=e.humanize,this.mute=e.mute,this.playbackRate=e.playbackRate},t.extend(t.Event),t.Event.defaults={callback:t.noOp,loop:!1,loopEnd:"1m",loopStart:0,playbackRate:1,value:null,probability:1,mute:!1,humanize:!1},t.Event.prototype._rescheduleEvents=function(e){return e=this.defaultArg(e,-1),this._state.forEachFrom(e,function(e){var i;if(e.state===t.State.Started){this.isUndef(e.id)||t.Transport.clear(e.id);var n=e.time+Math.round(this.startOffset/this._playbackRate);if(this._loop){i=1/0,this.isNumber(this._loop)&&(i=this._loop*this._getLoopDuration());var s=this._state.getAfter(n);null!==s&&(i=Math.min(i,s.time-n)),i!==1/0&&(this._state.setStateAtTime(t.State.Stopped,n+i+1),i=t.Time(i,"i"));var o=t.Time(this._getLoopDuration(),"i");e.id=t.Transport.scheduleRepeat(this._tick.bind(this),o,t.TransportTime(n,"i"),i)}else e.id=t.Transport.schedule(this._tick.bind(this),n+"i")}}.bind(this)),this},Object.defineProperty(t.Event.prototype,"state",{get:function(){return this._state.getValueAtTime(t.Transport.ticks)}}),Object.defineProperty(t.Event.prototype,"startOffset",{get:function(){return this._startOffset},set:function(t){this._startOffset=t}}),t.Event.prototype.start=function(e){return e=this.toTicks(e),this._state.getValueAtTime(e)===t.State.Stopped&&(this._state.add({state:t.State.Started,time:e,id:void 0}),this._rescheduleEvents(e)),this},t.Event.prototype.stop=function(e){if(this.cancel(e),e=this.toTicks(e),this._state.getValueAtTime(e)===t.State.Started){this._state.setStateAtTime(t.State.Stopped,e);var i=this._state.getBefore(e),n=e;null!==i&&(n=i.time),this._rescheduleEvents(n)}return this},t.Event.prototype.cancel=function(e){return e=this.defaultArg(e,-1/0),e=this.toTicks(e),this._state.forEachFrom(e,function(e){t.Transport.clear(e.id)}),this._state.cancel(e),this},t.Event.prototype._tick=function(e){if(!this.mute&&this._state.getValueAtTime(t.Transport.ticks)===t.State.Started){if(this.probability<1&&Math.random()>this.probability)return;if(this.humanize){var i=.02;this.isBoolean(this.humanize)||(i=this.toSeconds(this.humanize)),e+=(2*Math.random()-1)*i}this.callback(e,this.value)}},t.Event.prototype._getLoopDuration=function(){return Math.round((this._loopEnd-this._loopStart)/this._playbackRate)},Object.defineProperty(t.Event.prototype,"loop",{get:function(){return this._loop},set:function(t){this._loop=t,this._rescheduleEvents()}}),Object.defineProperty(t.Event.prototype,"playbackRate",{get:function(){return this._playbackRate},set:function(t){this._playbackRate=t,this._rescheduleEvents()}}),Object.defineProperty(t.Event.prototype,"loopEnd",{get:function(){return t.TransportTime(this._loopEnd,"i").toNotation()},set:function(t){this._loopEnd=this.toTicks(t),this._loop&&this._rescheduleEvents()}}),Object.defineProperty(t.Event.prototype,"loopStart",{get:function(){return t.TransportTime(this._loopStart,"i").toNotation()},set:function(t){this._loopStart=this.toTicks(t),this._loop&&this._rescheduleEvents()}}),Object.defineProperty(t.Event.prototype,"progress",{get:function(){if(this._loop){var e=t.Transport.ticks,i=this._state.get(e);if(null!==i&&i.state===t.State.Started){var n=this._getLoopDuration();return(e-i.time)%n/n}return 0}return 0}}),t.Event.prototype.dispose=function(){this.cancel(),this._state.dispose(),this._state=null,this.callback=null,this.value=null},t.Event}),t(function(t){return t.Loop=function(){var e=this.optionsObject(arguments,["callback","interval"],t.Loop.defaults);this._event=new t.Event({callback:this._tick.bind(this),loop:!0,loopEnd:e.interval,playbackRate:e.playbackRate,probability:e.probability}),this.callback=e.callback,this.iterations=e.iterations},t.extend(t.Loop),t.Loop.defaults={interval:"4n",callback:t.noOp,playbackRate:1,iterations:1/0,probability:!0,mute:!1},t.Loop.prototype.start=function(t){return this._event.start(t),this},t.Loop.prototype.stop=function(t){return this._event.stop(t),this},t.Loop.prototype.cancel=function(t){return this._event.cancel(t),this},t.Loop.prototype._tick=function(t){this.callback(t)},Object.defineProperty(t.Loop.prototype,"state",{get:function(){return this._event.state}}),Object.defineProperty(t.Loop.prototype,"progress",{get:function(){return this._event.progress}}),Object.defineProperty(t.Loop.prototype,"interval",{get:function(){return this._event.loopEnd},set:function(t){this._event.loopEnd=t}}),Object.defineProperty(t.Loop.prototype,"playbackRate",{get:function(){return this._event.playbackRate},set:function(t){this._event.playbackRate=t}}),Object.defineProperty(t.Loop.prototype,"humanize",{get:function(){return this._event.humanize},set:function(t){this._event.humanize=t}}),Object.defineProperty(t.Loop.prototype,"probability",{get:function(){return this._event.probability},set:function(t){this._event.probability=t}}),Object.defineProperty(t.Loop.prototype,"mute",{get:function(){return this._event.mute},set:function(t){this._event.mute=t}}),Object.defineProperty(t.Loop.prototype,"iterations",{get:function(){return!0===this._event.loop?1/0:this._event.loop},set:function(t){this._event.loop=t===1/0||t}}),t.Loop.prototype.dispose=function(){this._event.dispose(),this._event=null,this.callback=null},t.Loop}),t(function(t){return t.Part=function(){var e=this.optionsObject(arguments,["callback","events"],t.Part.defaults);this._loop=e.loop,this._loopStart=this.toTicks(e.loopStart),this._loopEnd=this.toTicks(e.loopEnd),this._playbackRate=e.playbackRate,this._probability=e.probability,this._humanize=e.humanize,this._startOffset=0,this._state=new t.TimelineState(t.State.Stopped),this._events=[],this.callback=e.callback,this.mute=e.mute;var i=this.defaultArg(e.events,[]);if(!this.isUndef(e.events))for(var n=0;n<i.length;n++)Array.isArray(i[n])?this.add(i[n][0],i[n][1]):this.add(i[n])},t.extend(t.Part,t.Event),t.Part.defaults={callback:t.noOp,loop:!1,loopEnd:"1m",loopStart:0,playbackRate:1,probability:1,humanize:!1,mute:!1},t.Part.prototype.start=function(e,i){var n=this.toTicks(e);return this._state.getValueAtTime(n)!==t.State.Started&&(i=this._loop?this.defaultArg(i,this._loopStart):this.defaultArg(i,0),i=this.toTicks(i),this._state.add({state:t.State.Started,time:n,offset:i}),this._forEach(function(t){this._startNote(t,n,i)})),this},t.Part.prototype._startNote=function(e,i,n){i-=n,this._loop?e.startOffset>=this._loopStart&&e.startOffset<this._loopEnd?(e.startOffset<n&&(i+=this._getLoopDuration()),e.start(t.TransportTime(i,"i"))):e.startOffset<this._loopStart&&e.startOffset>=n&&(e.loop=!1,e.start(t.TransportTime(i,"i"))):e.startOffset>=n&&e.start(t.TransportTime(i,"i"))},Object.defineProperty(t.Part.prototype,"startOffset",{get:function(){return this._startOffset},set:function(t){this._startOffset=t,this._forEach(function(t){t.startOffset+=this._startOffset})}}),t.Part.prototype.stop=function(e){var i=this.toTicks(e);return this._state.cancel(i),this._state.setStateAtTime(t.State.Stopped,i),this._forEach(function(t){t.stop(e)}),this},t.Part.prototype.at=function(e,i){e=t.TransportTime(e);for(var n=t.Time(1,"i").toSeconds(),s=0;s<this._events.length;s++){var o=this._events[s];if(Math.abs(e.toTicks()-o.startOffset)<n)return this.isUndef(i)||(o.value=i),o}return this.isUndef(i)?null:(this.add(e,i),this._events[this._events.length-1])},t.Part.prototype.add=function(e,i){e.hasOwnProperty("time")&&(e=(i=e).time),e=this.toTicks(e);var n;return i instanceof t.Event?(n=i).callback=this._tick.bind(this):n=new t.Event({callback:this._tick.bind(this),value:i}),n.startOffset=e,n.set({loopEnd:this.loopEnd,loopStart:this.loopStart,loop:this.loop,humanize:this.humanize,playbackRate:this.playbackRate,probability:this.probability}),this._events.push(n),this._restartEvent(n),this},t.Part.prototype._restartEvent=function(e){this._state.forEach(function(i){i.state===t.State.Started?this._startNote(e,i.time,i.offset):e.stop(t.TransportTime(i.time,"i"))}.bind(this))},t.Part.prototype.remove=function(e,i){e.hasOwnProperty("time")&&(e=(i=e).time),e=this.toTicks(e);for(var n=this._events.length-1;n>=0;n--){var s=this._events[n];s instanceof t.Part?s.remove(e,i):s.startOffset===e&&(this.isUndef(i)||!this.isUndef(i)&&s.value===i)&&(this._events.splice(n,1),s.dispose())}return this},t.Part.prototype.removeAll=function(){return this._forEach(function(t){t.dispose()}),this._events=[],this},t.Part.prototype.cancel=function(t){return t=this.toTicks(t),this._forEach(function(e){e.cancel(t)}),this._state.cancel(t),this},t.Part.prototype._forEach=function(e,i){i=this.defaultArg(i,this);for(var n=this._events.length-1;n>=0;n--){var s=this._events[n];s instanceof t.Part?s._forEach(e,i):e.call(i,s)}return this},t.Part.prototype._setAll=function(t,e){this._forEach(function(i){i[t]=e})},t.Part.prototype._tick=function(t,e){this.mute||this.callback(t,e)},t.Part.prototype._testLoopBoundries=function(e){e.startOffset<this._loopStart||e.startOffset>=this._loopEnd?e.cancel(0):e.state===t.State.Stopped&&this._restartEvent(e)},Object.defineProperty(t.Part.prototype,"probability",{get:function(){return this._probability},set:function(t){this._probability=t,this._setAll("probability",t)}}),Object.defineProperty(t.Part.prototype,"humanize",{get:function(){return this._humanize},set:function(t){this._humanize=t,this._setAll("humanize",t)}}),Object.defineProperty(t.Part.prototype,"loop",{get:function(){return this._loop},set:function(t){this._loop=t,this._forEach(function(e){e._loopStart=this._loopStart,e._loopEnd=this._loopEnd,e.loop=t,this._testLoopBoundries(e)})}}),Object.defineProperty(t.Part.prototype,"loopEnd",{get:function(){return t.TransportTime(this._loopEnd,"i").toNotation()},set:function(t){this._loopEnd=this.toTicks(t),this._loop&&this._forEach(function(e){e.loopEnd=t,this._testLoopBoundries(e)})}}),Object.defineProperty(t.Part.prototype,"loopStart",{get:function(){return t.TransportTime(this._loopStart,"i").toNotation()},set:function(t){this._loopStart=this.toTicks(t),this._loop&&this._forEach(function(t){t.loopStart=this.loopStart,this._testLoopBoundries(t)})}}),Object.defineProperty(t.Part.prototype,"playbackRate",{get:function(){return this._playbackRate},set:function(t){this._playbackRate=t,this._setAll("playbackRate",t)}}),Object.defineProperty(t.Part.prototype,"length",{get:function(){return this._events.length}}),t.Part.prototype.dispose=function(){return this.removeAll(),this._state.dispose(),this._state=null,this.callback=null,this._events=null,this},t.Part}),t(function(t){return t.Pattern=function(){var e=this.optionsObject(arguments,["callback","values","pattern"],t.Pattern.defaults);t.Loop.call(this,e),this._pattern=new t.CtrlPattern({values:e.values,type:e.pattern,index:e.index})},t.extend(t.Pattern,t.Loop),t.Pattern.defaults={pattern:t.CtrlPattern.Type.Up,values:[]},t.Pattern.prototype._tick=function(t){this.callback(t,this._pattern.value),this._pattern.next()},Object.defineProperty(t.Pattern.prototype,"index",{get:function(){return this._pattern.index},set:function(t){this._pattern.index=t}}),Object.defineProperty(t.Pattern.prototype,"values",{get:function(){return this._pattern.values},set:function(t){this._pattern.values=t}}),Object.defineProperty(t.Pattern.prototype,"value",{get:function(){return this._pattern.value}}),Object.defineProperty(t.Pattern.prototype,"pattern",{get:function(){return this._pattern.type},set:function(t){this._pattern.type=t}}),t.Pattern.prototype.dispose=function(){t.Loop.prototype.dispose.call(this),this._pattern.dispose(),this._pattern=null},t.Pattern}),t(function(t){return t.Sequence=function(){var e=this.optionsObject(arguments,["callback","events","subdivision"],t.Sequence.defaults),i=e.events;if(delete e.events,t.Part.call(this,e),this._subdivision=this.toTicks(e.subdivision),this.isUndef(e.loopEnd)&&!this.isUndef(i)&&(this._loopEnd=i.length*this._subdivision),this._loop=!0,!this.isUndef(i))for(var n=0;n<i.length;n++)this.add(n,i[n])},t.extend(t.Sequence,t.Part),t.Sequence.defaults={subdivision:"4n"},Object.defineProperty(t.Sequence.prototype,"subdivision",{get:function(){return t.Time(this._subdivision,"i").toNotation()}}),t.Sequence.prototype.at=function(e,i){return this.isArray(i)&&this.remove(e),t.Part.prototype.at.call(this,this._indexTime(e),i)},t.Sequence.prototype.add=function(e,i){if(null===i)return this;if(this.isArray(i)){var n=Math.round(this._subdivision/i.length);i=new t.Sequence(this._tick.bind(this),i,t.Time(n,"i"))}return t.Part.prototype.add.call(this,this._indexTime(e),i),this},t.Sequence.prototype.remove=function(e,i){return t.Part.prototype.remove.call(this,this._indexTime(e),i),this},t.Sequence.prototype._indexTime=function(e){return e instanceof t.TransportTime?e:t.TransportTime(e*this._subdivision+this.startOffset,"i")},t.Sequence.prototype.dispose=function(){return t.Part.prototype.dispose.call(this),this},t.Sequence}),t(function(t){return t.PulseOscillator=function(){var e=this.optionsObject(arguments,["frequency","width"],t.Oscillator.defaults);t.Source.call(this,e),this.width=new t.Signal(e.width,t.Type.NormalRange),this._widthGate=new t.Gain,this._sawtooth=new t.Oscillator({frequency:e.frequency,detune:e.detune,type:"sawtooth",phase:e.phase}),this.frequency=this._sawtooth.frequency,this.detune=this._sawtooth.detune,this._thresh=new t.WaveShaper(function(t){return t<0?-1:1}),this._sawtooth.chain(this._thresh,this.output),this.width.chain(this._widthGate,this._thresh),this._readOnly(["width","frequency","detune"])},t.extend(t.PulseOscillator,t.Oscillator),t.PulseOscillator.defaults={frequency:440,detune:0,phase:0,width:.2},t.PulseOscillator.prototype._start=function(t){t=this.toSeconds(t),this._sawtooth.start(t),this._widthGate.gain.setValueAtTime(1,t)},t.PulseOscillator.prototype._stop=function(t){t=this.toSeconds(t),this._sawtooth.stop(t),this._widthGate.gain.setValueAtTime(0,t)},Object.defineProperty(t.PulseOscillator.prototype,"phase",{get:function(){return this._sawtooth.phase},set:function(t){this._sawtooth.phase=t}}),Object.defineProperty(t.PulseOscillator.prototype,"type",{get:function(){return"pulse"}}),Object.defineProperty(t.PulseOscillator.prototype,"partials",{get:function(){return[]}}),t.PulseOscillator.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),this._sawtooth.dispose(),this._sawtooth=null,this._writable(["width","frequency","detune"]),this.width.dispose(),this.width=null,this._widthGate.dispose(),this._widthGate=null,this._thresh.dispose(),this._thresh=null,this.frequency=null,this.detune=null,this},t.PulseOscillator}),t(function(t){return t.PWMOscillator=function(){var e=this.optionsObject(arguments,["frequency","modulationFrequency"],t.PWMOscillator.defaults);t.Source.call(this,e),this._pulse=new t.PulseOscillator(e.modulationFrequency),this._pulse._sawtooth.type="sine",this._modulator=new t.Oscillator({frequency:e.frequency,detune:e.detune,phase:e.phase}),this._scale=new t.Multiply(2),this.frequency=this._modulator.frequency,this.detune=this._modulator.detune,this.modulationFrequency=this._pulse.frequency,this._modulator.chain(this._scale,this._pulse.width),this._pulse.connect(this.output),this._readOnly(["modulationFrequency","frequency","detune"])},t.extend(t.PWMOscillator,t.Oscillator),t.PWMOscillator.defaults={frequency:440,detune:0,phase:0,modulationFrequency:.4},t.PWMOscillator.prototype._start=function(t){t=this.toSeconds(t),this._modulator.start(t),this._pulse.start(t)},t.PWMOscillator.prototype._stop=function(t){t=this.toSeconds(t),this._modulator.stop(t),this._pulse.stop(t)},Object.defineProperty(t.PWMOscillator.prototype,"type",{get:function(){return"pwm"}}),Object.defineProperty(t.PWMOscillator.prototype,"partials",{get:function(){return[]}}),Object.defineProperty(t.PWMOscillator.prototype,"phase",{get:function(){return this._modulator.phase},set:function(t){this._modulator.phase=t}}),t.PWMOscillator.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),this._pulse.dispose(),this._pulse=null,this._scale.dispose(),this._scale=null,this._modulator.dispose(),this._modulator=null,this._writable(["modulationFrequency","frequency","detune"]),this.frequency=null,this.detune=null,this.modulationFrequency=null,this},t.PWMOscillator}),t(function(t){return t.FMOscillator=function(){var e=this.optionsObject(arguments,["frequency","type","modulationType"],t.FMOscillator.defaults);t.Source.call(this,e),this._carrier=new t.Oscillator(e.frequency,e.type),this.frequency=new t.Signal(e.frequency,t.Type.Frequency),this.detune=this._carrier.detune,this.detune.value=e.detune,this.modulationIndex=new t.Multiply(e.modulationIndex),this.modulationIndex.units=t.Type.Positive,this._modulator=new t.Oscillator(e.frequency,e.modulationType),this.harmonicity=new t.Multiply(e.harmonicity),this.harmonicity.units=t.Type.Positive,this._modulationNode=new t.Gain(0),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output),this.detune.connect(this._modulator.detune),this.phase=e.phase,this._readOnly(["modulationIndex","frequency","detune","harmonicity"])},t.extend(t.FMOscillator,t.Oscillator),t.FMOscillator.defaults={frequency:440,detune:0,phase:0,modulationIndex:2,modulationType:"square",harmonicity:1},t.FMOscillator.prototype._start=function(t){t=this.toSeconds(t),this._modulator.start(t),this._carrier.start(t)},t.FMOscillator.prototype._stop=function(t){t=this.toSeconds(t),this._modulator.stop(t),this._carrier.stop(t)},Object.defineProperty(t.FMOscillator.prototype,"type",{get:function(){return this._carrier.type},set:function(t){this._carrier.type=t}}),Object.defineProperty(t.FMOscillator.prototype,"modulationType",{get:function(){return this._modulator.type},set:function(t){this._modulator.type=t}}),Object.defineProperty(t.FMOscillator.prototype,"phase",{get:function(){return this._carrier.phase},set:function(t){this._carrier.phase=t,this._modulator.phase=t}}),Object.defineProperty(t.FMOscillator.prototype,"partials",{get:function(){return this._carrier.partials},set:function(t){this._carrier.partials=t}}),t.FMOscillator.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),this._writable(["modulationIndex","frequency","detune","harmonicity"]),this.frequency.dispose(),this.frequency=null,this.detune=null,this.harmonicity.dispose(),this.harmonicity=null,this._carrier.dispose(),this._carrier=null,this._modulator.dispose(),this._modulator=null,this._modulationNode.dispose(),this._modulationNode=null,this.modulationIndex.dispose(),this.modulationIndex=null,this},t.FMOscillator}),t(function(t){return t.AMOscillator=function(){var e=this.optionsObject(arguments,["frequency","type","modulationType"],t.AMOscillator.defaults);t.Source.call(this,e),this._carrier=new t.Oscillator(e.frequency,e.type),this.frequency=this._carrier.frequency,this.detune=this._carrier.detune,this.detune.value=e.detune,this._modulator=new t.Oscillator(e.frequency,e.modulationType),this._modulationScale=new t.AudioToGain,this.harmonicity=new t.Multiply(e.harmonicity),this.harmonicity.units=t.Type.Positive,this._modulationNode=new t.Gain(0),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.detune.connect(this._modulator.detune),this._modulator.chain(this._modulationScale,this._modulationNode.gain),this._carrier.chain(this._modulationNode,this.output),this.phase=e.phase,this._readOnly(["frequency","detune","harmonicity"])},t.extend(t.AMOscillator,t.Oscillator),t.AMOscillator.defaults={frequency:440,detune:0,phase:0,modulationType:"square",harmonicity:1},t.AMOscillator.prototype._start=function(t){t=this.toSeconds(t),this._modulator.start(t),this._carrier.start(t)},t.AMOscillator.prototype._stop=function(t){t=this.toSeconds(t),this._modulator.stop(t),this._carrier.stop(t)},Object.defineProperty(t.AMOscillator.prototype,"type",{get:function(){return this._carrier.type},set:function(t){this._carrier.type=t}}),Object.defineProperty(t.AMOscillator.prototype,"modulationType",{get:function(){return this._modulator.type},set:function(t){this._modulator.type=t}}),Object.defineProperty(t.AMOscillator.prototype,"phase",{get:function(){return this._carrier.phase},set:function(t){this._carrier.phase=t,this._modulator.phase=t}}),Object.defineProperty(t.AMOscillator.prototype,"partials",{get:function(){return this._carrier.partials},set:function(t){this._carrier.partials=t}}),t.AMOscillator.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),this._writable(["frequency","detune","harmonicity"]),this.frequency=null,this.detune=null,this.harmonicity.dispose(),this.harmonicity=null,this._carrier.dispose(),this._carrier=null,this._modulator.dispose(),this._modulator=null,this._modulationNode.dispose(),this._modulationNode=null,this._modulationScale.dispose(),this._modulationScale=null,this},t.AMOscillator}),t(function(t){return t.FatOscillator=function(){var e=this.optionsObject(arguments,["frequency","type","spread"],t.FatOscillator.defaults);t.Source.call(this,e),this.frequency=new t.Signal(e.frequency,t.Type.Frequency),this.detune=new t.Signal(e.detune,t.Type.Cents),this._oscillators=[],this._spread=e.spread,this._type=e.type,this._phase=e.phase,this._partials=this.defaultArg(e.partials,[]),this.count=e.count,this._readOnly(["frequency","detune"])},t.extend(t.FatOscillator,t.Oscillator),t.FatOscillator.defaults={frequency:440,detune:0,phase:0,spread:20,count:3,type:"sawtooth"},t.FatOscillator.prototype._start=function(t){t=this.toSeconds(t),this._forEach(function(e){e.start(t)})},t.FatOscillator.prototype._stop=function(t){t=this.toSeconds(t),this._forEach(function(e){e.stop(t)})},t.FatOscillator.prototype._forEach=function(t){for(var e=0;e<this._oscillators.length;e++)t.call(this,this._oscillators[e],e)},Object.defineProperty(t.FatOscillator.prototype,"type",{get:function(){return this._type},set:function(t){this._type=t,this._forEach(function(e){e.type=t})}}),Object.defineProperty(t.FatOscillator.prototype,"spread",{get:function(){return this._spread},set:function(t){if(this._spread=t,this._oscillators.length>1){var e=-t/2,i=t/(this._oscillators.length-1);this._forEach(function(t,n){t.detune.value=e+i*n})}}}),Object.defineProperty(t.FatOscillator.prototype,"count",{get:function(){return this._oscillators.length},set:function(e){if(e=Math.max(e,1),this._oscillators.length!==e){this._forEach(function(t){t.dispose()}),this._oscillators=[];for(var i=0;i<e;i++){var n=new t.Oscillator;this.type===t.Oscillator.Type.Custom?n.partials=this._partials:n.type=this._type,n.phase=this._phase,n.volume.value=-6-e,this.frequency.connect(n.frequency),this.detune.connect(n.detune),n.connect(this.output),this._oscillators[i]=n}this.spread=this._spread,this.state===t.State.Started&&this._forEach(function(t){t.start()})}}}),Object.defineProperty(t.FatOscillator.prototype,"phase",{get:function(){return this._phase},set:function(t){this._phase=t,this._forEach(function(e){e.phase=t})}}),Object.defineProperty(t.FatOscillator.prototype,"partials",{get:function(){return this._partials},set:function(e){this._partials=e,this._type=t.Oscillator.Type.Custom,this._forEach(function(t){t.partials=e})}}),t.FatOscillator.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),this._writable(["frequency","detune"]),this.frequency.dispose(),this.frequency=null,this.detune.dispose(),this.detune=null,this._forEach(function(t){t.dispose()}),this._oscillators=null,this._partials=null,this},t.FatOscillator}),t(function(t){t.OmniOscillator=function(){var e=this.optionsObject(arguments,["frequency","type"],t.OmniOscillator.defaults);t.Source.call(this,e),this.frequency=new t.Signal(e.frequency,t.Type.Frequency),this.detune=new t.Signal(e.detune,t.Type.Cents),this._sourceType=void 0,this._oscillator=null,this.type=e.type,this._readOnly(["frequency","detune"]),this.set(e)},t.extend(t.OmniOscillator,t.Oscillator),t.OmniOscillator.defaults={frequency:440,detune:0,type:"sine",phase:0};var e={Pulse:"PulseOscillator",PWM:"PWMOscillator",Osc:"Oscillator",FM:"FMOscillator",AM:"AMOscillator",Fat:"FatOscillator"};return t.OmniOscillator.prototype._start=function(t){this._oscillator.start(t)},t.OmniOscillator.prototype._stop=function(t){this._oscillator.stop(t)},Object.defineProperty(t.OmniOscillator.prototype,"type",{get:function(){var t="";return this._sourceType===e.FM?t="fm":this._sourceType===e.AM?t="am":this._sourceType===e.Fat&&(t="fat"),t+this._oscillator.type},set:function(t){"fm"===t.substr(0,2)?(this._createNewOscillator(e.FM),this._oscillator.type=t.substr(2)):"am"===t.substr(0,2)?(this._createNewOscillator(e.AM),this._oscillator.type=t.substr(2)):"fat"===t.substr(0,3)?(this._createNewOscillator(e.Fat),this._oscillator.type=t.substr(3)):"pwm"===t?this._createNewOscillator(e.PWM):"pulse"===t?this._createNewOscillator(e.Pulse):(this._createNewOscillator(e.Osc),this._oscillator.type=t)}}),Object.defineProperty(t.OmniOscillator.prototype,"partials",{get:function(){return this._oscillator.partials},set:function(t){this._oscillator.partials=t}}),t.OmniOscillator.prototype.set=function(e,i){return"type"===e?this.type=i:this.isObject(e)&&e.hasOwnProperty("type")&&(this.type=e.type),t.prototype.set.apply(this,arguments),this},t.OmniOscillator.prototype._createNewOscillator=function(e){if(e!==this._sourceType){this._sourceType=e;var i=t[e],n=this.now()+this.blockTime;if(null!==this._oscillator){var s=this._oscillator;s.stop(n),setTimeout(function(){s.dispose(),s=null},1e3*this.blockTime)}this._oscillator=new i,this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.connect(this.output),this.state===t.State.Started&&this._oscillator.start(n)}},Object.defineProperty(t.OmniOscillator.prototype,"phase",{get:function(){return this._oscillator.phase},set:function(t){this._oscillator.phase=t}}),Object.defineProperty(t.OmniOscillator.prototype,"width",{get:function(){if(this._sourceType===e.Pulse)return this._oscillator.width}}),Object.defineProperty(t.OmniOscillator.prototype,"count",{get:function(){if(this._sourceType===e.Fat)return this._oscillator.count},set:function(t){this._sourceType===e.Fat&&(this._oscillator.count=t)}}),Object.defineProperty(t.OmniOscillator.prototype,"spread",{get:function(){if(this._sourceType===e.Fat)return this._oscillator.spread},set:function(t){this._sourceType===e.Fat&&(this._oscillator.spread=t)}}),Object.defineProperty(t.OmniOscillator.prototype,"modulationType",{get:function(){if(this._sourceType===e.FM||this._sourceType===e.AM)return this._oscillator.modulationType},set:function(t){this._sourceType!==e.FM&&this._sourceType!==e.AM||(this._oscillator.modulationType=t)}}),Object.defineProperty(t.OmniOscillator.prototype,"modulationIndex",{get:function(){if(this._sourceType===e.FM)return this._oscillator.modulationIndex}}),Object.defineProperty(t.OmniOscillator.prototype,"harmonicity",{get:function(){if(this._sourceType===e.FM||this._sourceType===e.AM)return this._oscillator.harmonicity}}),Object.defineProperty(t.OmniOscillator.prototype,"modulationFrequency",{get:function(){if(this._sourceType===e.PWM)return this._oscillator.modulationFrequency}}),t.OmniOscillator.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),this._writable(["frequency","detune"]),this.detune.dispose(),this.detune=null,this.frequency.dispose(),this.frequency=null,this._oscillator.dispose(),this._oscillator=null,this._sourceType=null,this},t.OmniOscillator}),t(function(t){return t.Instrument=function(e){e=this.defaultArg(e,t.Instrument.defaults),this._volume=this.output=new t.Volume(e.volume),this.volume=this._volume.volume,this._readOnly("volume")},t.extend(t.Instrument),t.Instrument.defaults={volume:0},t.Instrument.prototype.triggerAttack=t.noOp,t.Instrument.prototype.triggerRelease=t.noOp,t.Instrument.prototype.triggerAttackRelease=function(t,e,i,n){return i=this.isUndef(i)?this.now()+this.blockTime:this.toSeconds(i),e=this.toSeconds(e),this.triggerAttack(t,i,n),this.triggerRelease(i+e),this},t.Instrument.prototype.dispose=function(){return t.prototype.dispose.call(this),this._volume.dispose(),this._volume=null,this._writable(["volume"]),this.volume=null,this},t.Instrument}),t(function(t){return t.Monophonic=function(e){e=this.defaultArg(e,t.Monophonic.defaults),t.Instrument.call(this,e),this.portamento=e.portamento},t.extend(t.Monophonic,t.Instrument),t.Monophonic.defaults={portamento:0},t.Monophonic.prototype.triggerAttack=function(t,e,i){return e=this.isUndef(e)?this.now()+this.blockTime:this.toSeconds(e),this._triggerEnvelopeAttack(e,i),this.setNote(t,e),this},t.Monophonic.prototype.triggerRelease=function(t){return t=this.isUndef(t)?this.now()+this.blockTime:this.toSeconds(t),this._triggerEnvelopeRelease(t),this},t.Monophonic.prototype._triggerEnvelopeAttack=function(){},t.Monophonic.prototype._triggerEnvelopeRelease=function(){},t.Monophonic.prototype.setNote=function(t,e){if(e=this.toSeconds(e),this.portamento>0){var i=this.frequency.value;this.frequency.setValueAtTime(i,e);var n=this.toSeconds(this.portamento);this.frequency.exponentialRampToValueAtTime(t,e+n)}else this.frequency.setValueAtTime(t,e);return this},t.Monophonic}),t(function(t){return t.Synth=function(e){e=this.defaultArg(e,t.Synth.defaults),t.Monophonic.call(this,e),this.oscillator=new t.OmniOscillator(e.oscillator),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.envelope=new t.AmplitudeEnvelope(e.envelope),this.oscillator.chain(this.envelope,this.output),this.oscillator.start(),this._readOnly(["oscillator","frequency","detune","envelope"])},t.extend(t.Synth,t.Monophonic),t.Synth.defaults={oscillator:{type:"triangle"},envelope:{attack:.005,decay:.1,sustain:.3,release:1}},t.Synth.prototype._triggerEnvelopeAttack=function(t,e){return this.envelope.triggerAttack(t,e),this},t.Synth.prototype._triggerEnvelopeRelease=function(t){return this.envelope.triggerRelease(t),this},t.Synth.prototype.dispose=function(){return t.Monophonic.prototype.dispose.call(this),this._writable(["oscillator","frequency","detune","envelope"]),this.oscillator.dispose(),this.oscillator=null,this.envelope.dispose(),this.envelope=null,this.frequency=null,this.detune=null,this},t.Synth}),t(function(t){return t.AMSynth=function(e){e=this.defaultArg(e,t.AMSynth.defaults),t.Monophonic.call(this,e),this._carrier=new t.Synth,this._carrier.volume.value=-10,this.oscillator=this._carrier.oscillator,this.envelope=this._carrier.envelope.set(e.envelope),this._modulator=new t.Synth,this._modulator.volume.value=-10,this.modulation=this._modulator.oscillator.set(e.modulation),this.modulationEnvelope=this._modulator.envelope.set(e.modulationEnvelope),this.frequency=new t.Signal(440,t.Type.Frequency),this.detune=new t.Signal(e.detune,t.Type.Cents),this.harmonicity=new t.Multiply(e.harmonicity),this.harmonicity.units=t.Type.Positive,this._modulationScale=new t.AudioToGain,this._modulationNode=new t.Gain,this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.detune.fan(this._carrier.detune,this._modulator.detune),this._modulator.chain(this._modulationScale,this._modulationNode.gain),this._carrier.chain(this._modulationNode,this.output),this._readOnly(["frequency","harmonicity","oscillator","envelope","modulation","modulationEnvelope","detune"])},t.extend(t.AMSynth,t.Monophonic),t.AMSynth.defaults={harmonicity:3,detune:0,oscillator:{type:"sine"},envelope:{attack:.01,decay:.01,sustain:1,release:.5},modulation:{type:"square"},modulationEnvelope:{attack:.5,decay:0,sustain:1,release:.5}},t.AMSynth.prototype._triggerEnvelopeAttack=function(t,e){return t=this.toSeconds(t),this.envelope.triggerAttack(t,e),this.modulationEnvelope.triggerAttack(t,e),this},t.AMSynth.prototype._triggerEnvelopeRelease=function(t){return this.envelope.triggerRelease(t),this.modulationEnvelope.triggerRelease(t),this},t.AMSynth.prototype.dispose=function(){return t.Monophonic.prototype.dispose.call(this),this._writable(["frequency","harmonicity","oscillator","envelope","modulation","modulationEnvelope","detune"]),this._carrier.dispose(),this._carrier=null,this._modulator.dispose(),this._modulator=null,this.frequency.dispose(),this.frequency=null,this.detune.dispose(),this.detune=null,this.harmonicity.dispose(),this.harmonicity=null,this._modulationScale.dispose(),this._modulationScale=null,this._modulationNode.dispose(),this._modulationNode=null,this.oscillator=null,this.envelope=null,this.modulationEnvelope=null,this.modulation=null,this},t.AMSynth}),t(function(t){return t.MonoSynth=function(e){e=this.defaultArg(e,t.MonoSynth.defaults),t.Monophonic.call(this,e),this.oscillator=new t.OmniOscillator(e.oscillator),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.filter=new t.Filter(e.filter),this.filterEnvelope=new t.FrequencyEnvelope(e.filterEnvelope),this.envelope=new t.AmplitudeEnvelope(e.envelope),this.oscillator.chain(this.filter,this.envelope,this.output),this.oscillator.start(),this.filterEnvelope.connect(this.filter.frequency),this._readOnly(["oscillator","frequency","detune","filter","filterEnvelope","envelope"])},t.extend(t.MonoSynth,t.Monophonic),t.MonoSynth.defaults={frequency:"C4",detune:0,oscillator:{type:"square"},filter:{Q:6,type:"lowpass",rolloff:-24},envelope:{attack:.005,decay:.1,sustain:.9,release:1},filterEnvelope:{attack:.06,decay:.2,sustain:.5,release:2,baseFrequency:200,octaves:7,exponent:2}},t.MonoSynth.prototype._triggerEnvelopeAttack=function(t,e){return this.envelope.triggerAttack(t,e),this.filterEnvelope.triggerAttack(t),this},t.MonoSynth.prototype._triggerEnvelopeRelease=function(t){return this.envelope.triggerRelease(t),this.filterEnvelope.triggerRelease(t),this},t.MonoSynth.prototype.dispose=function(){return t.Monophonic.prototype.dispose.call(this),this._writable(["oscillator","frequency","detune","filter","filterEnvelope","envelope"]),this.oscillator.dispose(),this.oscillator=null,this.envelope.dispose(),this.envelope=null,this.filterEnvelope.dispose(),this.filterEnvelope=null,this.filter.dispose(),this.filter=null,this.frequency=null,this.detune=null,this},t.MonoSynth}),t(function(t){return t.DuoSynth=function(e){e=this.defaultArg(e,t.DuoSynth.defaults),t.Monophonic.call(this,e),this.voice0=new t.MonoSynth(e.voice0),this.voice0.volume.value=-10,this.voice1=new t.MonoSynth(e.voice1),this.voice1.volume.value=-10,this._vibrato=new t.LFO(e.vibratoRate,-50,50),this._vibrato.start(),this.vibratoRate=this._vibrato.frequency,this._vibratoGain=new t.Gain(e.vibratoAmount,t.Type.Positive),this.vibratoAmount=this._vibratoGain.gain,this.frequency=new t.Signal(440,t.Type.Frequency),this.harmonicity=new t.Multiply(e.harmonicity),this.harmonicity.units=t.Type.Positive,this.frequency.connect(this.voice0.frequency),this.frequency.chain(this.harmonicity,this.voice1.frequency),this._vibrato.connect(this._vibratoGain),this._vibratoGain.fan(this.voice0.detune,this.voice1.detune),this.voice0.connect(this.output),this.voice1.connect(this.output),this._readOnly(["voice0","voice1","frequency","vibratoAmount","vibratoRate"])},t.extend(t.DuoSynth,t.Monophonic),t.DuoSynth.defaults={vibratoAmount:.5,vibratoRate:5,harmonicity:1.5,voice0:{volume:-10,portamento:0,oscillator:{type:"sine"},filterEnvelope:{attack:.01,decay:0,sustain:1,release:.5},envelope:{attack:.01,decay:0,sustain:1,release:.5}},voice1:{volume:-10,portamento:0,oscillator:{type:"sine"},filterEnvelope:{attack:.01,decay:0,sustain:1,release:.5},envelope:{attack:.01,decay:0,sustain:1,release:.5}}},t.DuoSynth.prototype._triggerEnvelopeAttack=function(t,e){return t=this.toSeconds(t),this.voice0.envelope.triggerAttack(t,e),this.voice1.envelope.triggerAttack(t,e),this.voice0.filterEnvelope.triggerAttack(t),this.voice1.filterEnvelope.triggerAttack(t),this},t.DuoSynth.prototype._triggerEnvelopeRelease=function(t){return this.voice0.triggerRelease(t),this.voice1.triggerRelease(t),this},t.DuoSynth.prototype.dispose=function(){return t.Monophonic.prototype.dispose.call(this),this._writable(["voice0","voice1","frequency","vibratoAmount","vibratoRate"]),this.voice0.dispose(),this.voice0=null,this.voice1.dispose(),this.voice1=null,this.frequency.dispose(),this.frequency=null,this._vibratoGain.dispose(),this._vibratoGain=null,this._vibrato=null,this.harmonicity.dispose(),this.harmonicity=null,this.vibratoAmount.dispose(),this.vibratoAmount=null,this.vibratoRate=null,this},t.DuoSynth}),t(function(t){return t.FMSynth=function(e){e=this.defaultArg(e,t.FMSynth.defaults),t.Monophonic.call(this,e),this._carrier=new t.Synth(e.carrier),this._carrier.volume.value=-10,this.oscillator=this._carrier.oscillator,this.envelope=this._carrier.envelope.set(e.envelope),this._modulator=new t.Synth(e.modulator),this._modulator.volume.value=-10,this.modulation=this._modulator.oscillator.set(e.modulation),this.modulationEnvelope=this._modulator.envelope.set(e.modulationEnvelope),this.frequency=new t.Signal(440,t.Type.Frequency),this.detune=new t.Signal(e.detune,t.Type.Cents),this.harmonicity=new t.Multiply(e.harmonicity),this.harmonicity.units=t.Type.Positive,this.modulationIndex=new t.Multiply(e.modulationIndex),this.modulationIndex.units=t.Type.Positive,this._modulationNode=new t.Gain(0),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this.detune.fan(this._carrier.detune,this._modulator.detune),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output),this._readOnly(["frequency","harmonicity","modulationIndex","oscillator","envelope","modulation","modulationEnvelope","detune"])},t.extend(t.FMSynth,t.Monophonic),t.FMSynth.defaults={harmonicity:3,modulationIndex:10,detune:0,oscillator:{type:"sine"},envelope:{attack:.01,decay:.01,sustain:1,release:.5},modulation:{type:"square"},modulationEnvelope:{attack:.5,decay:0,sustain:1,release:.5}},t.FMSynth.prototype._triggerEnvelopeAttack=function(t,e){return t=this.toSeconds(t),this.envelope.triggerAttack(t,e),this.modulationEnvelope.triggerAttack(t),this},t.FMSynth.prototype._triggerEnvelopeRelease=function(t){return t=this.toSeconds(t),this.envelope.triggerRelease(t),this.modulationEnvelope.triggerRelease(t),this},t.FMSynth.prototype.dispose=function(){return t.Monophonic.prototype.dispose.call(this),this._writable(["frequency","harmonicity","modulationIndex","oscillator","envelope","modulation","modulationEnvelope","detune"]),this._carrier.dispose(),this._carrier=null,this._modulator.dispose(),this._modulator=null,this.frequency.dispose(),this.frequency=null,this.detune.dispose(),this.detune=null,this.modulationIndex.dispose(),this.modulationIndex=null,this.harmonicity.dispose(),this.harmonicity=null,this._modulationNode.dispose(),this._modulationNode=null,this.oscillator=null,this.envelope=null,this.modulationEnvelope=null,this.modulation=null,this},t.FMSynth}),t(function(t){return t.MembraneSynth=function(e){e=this.defaultArg(e,t.MembraneSynth.defaults),t.Instrument.call(this,e),this.oscillator=new t.OmniOscillator(e.oscillator).start(),this.envelope=new t.AmplitudeEnvelope(e.envelope),this.octaves=e.octaves,this.pitchDecay=e.pitchDecay,this.oscillator.chain(this.envelope,this.output),this._readOnly(["oscillator","envelope"])},t.extend(t.MembraneSynth,t.Instrument),t.MembraneSynth.defaults={pitchDecay:.05,octaves:10,oscillator:{type:"sine"},envelope:{attack:.001,decay:.4,sustain:.01,release:1.4,attackCurve:"exponential"}},t.MembraneSynth.prototype.triggerAttack=function(t,e,i){e=this.toSeconds(e);var n=(t=this.toFrequency(t))*this.octaves;return this.oscillator.frequency.setValueAtTime(n,e),this.oscillator.frequency.exponentialRampToValueAtTime(t,e+this.toSeconds(this.pitchDecay)),this.envelope.triggerAttack(e,i),this},t.MembraneSynth.prototype.triggerRelease=function(t){return this.envelope.triggerRelease(t),this},t.MembraneSynth.prototype.dispose=function(){return t.Instrument.prototype.dispose.call(this),this._writable(["oscillator","envelope"]),this.oscillator.dispose(),this.oscillator=null,this.envelope.dispose(),this.envelope=null,this},t.MembraneSynth}),t(function(t){var e=[1,1.483,1.932,2.546,2.63,3.897];return t.MetalSynth=function(i){i=this.defaultArg(i,t.MetalSynth.defaults),t.Instrument.call(this,i),this.frequency=new t.Signal(i.frequency,t.Type.Frequency),this._oscillators=[],this._freqMultipliers=[],this._amplitue=new t.Gain(0).connect(this.output),this._highpass=new t.Filter({type:"highpass",Q:-3.0102999566398125}).connect(this._amplitue),this._octaves=i.octaves,this._filterFreqScaler=new t.Scale(i.resonance,7e3),this.envelope=new t.Envelope({attack:i.envelope.attack,attackCurve:"linear",decay:i.envelope.decay,sustain:0,release:i.envelope.release}).chain(this._filterFreqScaler,this._highpass.frequency),this.envelope.connect(this._amplitue.gain);for(var n=0;n<e.length;n++){var s=new t.FMOscillator({type:"square",modulationType:"square",harmonicity:i.harmonicity,modulationIndex:i.modulationIndex});s.connect(this._highpass).start(0),this._oscillators[n]=s;var o=new t.Multiply(e[n]);this._freqMultipliers[n]=o,this.frequency.chain(o,s.frequency)}this.octaves=i.octaves},t.extend(t.MetalSynth,t.Instrument),t.MetalSynth.defaults={frequency:200,envelope:{attack:.001,decay:1.4,release:.2},harmonicity:5.1,modulationIndex:32,resonance:4e3,octaves:1.5},t.MetalSynth.prototype.triggerAttack=function(t,e){return t=this.toSeconds(t),e=this.defaultArg(e,1),this.envelope.triggerAttack(t,e),this},t.MetalSynth.prototype.triggerRelease=function(t){return t=this.toSeconds(t),this.envelope.triggerRelease(t),this},t.MetalSynth.prototype.triggerAttackRelease=function(t,e,i){return e=this.toSeconds(e),t=this.toSeconds(t),this.triggerAttack(e,i),this.triggerRelease(e+t),this},Object.defineProperty(t.MetalSynth.prototype,"modulationIndex",{get:function(){return this._oscillators[0].modulationIndex.value},set:function(t){for(var e=0;e<this._oscillators.length;e++)this._oscillators[e].modulationIndex.value=t}}),Object.defineProperty(t.MetalSynth.prototype,"harmonicity",{get:function(){return this._oscillators[0].harmonicity.value},set:function(t){for(var e=0;e<this._oscillators.length;e++)this._oscillators[e].harmonicity.value=t}}),Object.defineProperty(t.MetalSynth.prototype,"resonance",{get:function(){return this._filterFreqScaler.min},set:function(t){this._filterFreqScaler.min=t,this.octaves=this._octaves}}),Object.defineProperty(t.MetalSynth.prototype,"octaves",{get:function(){return this._octaves},set:function(t){this._octaves=t,this._filterFreqScaler.max=this._filterFreqScaler.min*Math.pow(2,t)}}),t.MetalSynth.prototype.dispose=function(){t.Instrument.prototype.dispose.call(this);for(var e=0;e<this._oscillators.length;e++)this._oscillators[e].dispose(),this._freqMultipliers[e].dispose();this._oscillators=null,this._freqMultipliers=null,this.frequency.dispose(),this.frequency=null,this._filterFreqScaler.dispose(),this._filterFreqScaler=null,this._amplitue.dispose(),this._amplitue=null,this.envelope.dispose(),this.envelope=null,this._highpass.dispose(),this._highpass=null},t.MetalSynth}),t(function(t){return window.AudioBufferSourceNode&&!AudioBufferSourceNode.prototype.start&&(AudioBufferSourceNode.prototype.start=AudioBufferSourceNode.prototype.noteGrainOn,AudioBufferSourceNode.prototype.stop=AudioBufferSourceNode.prototype.noteOff),t.BufferSource=function(){var e=this.optionsObject(arguments,["buffer","onended"],t.BufferSource.defaults);this.onended=e.onended,this._startTime=-1,this._stopTime=-1,this._gainNode=this.output=new t.Gain,this._source=this.context.createBufferSource(),this._source.connect(this._gainNode),this.playbackRate=new t.Param(this._source.playbackRate,t.Type.Positive),this.fadeIn=e.fadeIn,this.fadeOut=e.fadeOut,this._gain=1,this._onendedTimeout=-1,this.isUndef(e.buffer)||(this.buffer=e.buffer),this.loop=e.loop},t.extend(t.BufferSource),t.BufferSource.defaults={onended:t.noOp,fadeIn:0,fadeOut:0},Object.defineProperty(t.BufferSource.prototype,"state",{get:function(){var e=this.now();return-1!==this._startTime&&e>=this._startTime&&e<this._stopTime?t.State.Started:t.State.Stopped}}),t.BufferSource.prototype.start=function(t,e,i,n,s){if(-1!==this._startTime)throw new Error("Tone.BufferSource: can only be started once.");return this.buffer&&(t=this.toSeconds(t),e=this.loop?this.defaultArg(e,this.loopStart):this.defaultArg(e,0),e=this.toSeconds(e),t=this.toSeconds(t),this._source.start(t,e),n=this.defaultArg(n,1),this._gain=n,(s=this.isUndef(s)?this.toSeconds(this.fadeIn):this.toSeconds(s))>0?(this._gainNode.gain.setValueAtTime(0,t),this._gainNode.gain.linearRampToValueAtTime(this._gain,t+s)):this._gainNode.gain.setValueAtTime(n,t),this._startTime=t+s,this.isUndef(i)||(i=this.defaultArg(i,this.buffer.duration-e),i=this.toSeconds(i),this.stop(t+i+s,s))),this},t.BufferSource.prototype.stop=function(t,e){return this.buffer&&(t=this.toSeconds(t),e=this.isUndef(e)?this.toSeconds(this.fadeOut):this.toSeconds(e),this._stopTime=t+e,this._gainNode.gain.cancelScheduledValues(this._startTime+this.sampleTime),e>0?(this._gainNode.gain.setValueAtTime(this._gain,t),this._gainNode.gain.linearRampToValueAtTime(0,t+e),t+=e):this._gainNode.gain.setValueAtTime(0,t),this.isNumber(this._source.playbackState)&&2!==this._source.playbackState||this._source.stop(t),clearTimeout(this._onendedTimeout),this._onendedTimeout=setTimeout(this._onended.bind(this),1e3*(this._stopTime-this.now()))),this},t.BufferSource.prototype._onended=function(){this.onended(this),this.dispose()},Object.defineProperty(t.BufferSource.prototype,"loopStart",{get:function(){return this._source.loopStart},set:function(t){this._source.loopStart=this.toSeconds(t)}}),Object.defineProperty(t.BufferSource.prototype,"loopEnd",{get:function(){return this._source.loopEnd},set:function(t){this._source.loopEnd=this.toSeconds(t)}}),Object.defineProperty(t.BufferSource.prototype,"buffer",{get:function(){return this._source?this._source.buffer:null},set:function(e){e instanceof t.Buffer?this._source.buffer=e.get():this._source.buffer=e}}),Object.defineProperty(t.BufferSource.prototype,"loop",{get:function(){return this._source.loop},set:function(t){this._source.loop=t}}),t.BufferSource.prototype.dispose=function(){return this.onended=null,this._source&&(this._source.disconnect(),this._source=null),this._gainNode&&(this._gainNode.dispose(),this._gainNode=null),this._startTime=-1,this.playbackRate=null,this.output=null,clearTimeout(this._onendedTimeout),this},t.BufferSource}),t(function(t){function e(){for(var e in i)n[e]=(new t.Buffer).fromArray(i[e])}t.Noise=function(){var e=this.optionsObject(arguments,["type"],t.Noise.defaults);t.Source.call(this,e),this._source=null,this._type=e.type,this._playbackRate=e.playbackRate},t.extend(t.Noise,t.Source),t.Noise.defaults={type:"white",playbackRate:1},Object.defineProperty(t.Noise.prototype,"type",{get:function(){return this._type},set:function(e){if(this._type!==e){if(!(e in n))throw new TypeError("Tone.Noise: invalid type: "+e);if(this._type=e,this.state===t.State.Started){var i=this.now()+this.blockTime;this._stop(i),this._start(i)}}}}),Object.defineProperty(t.Noise.prototype,"playbackRate",{get:function(){return this._playbackRate},set:function(t){this._playbackRate=t,this._source&&(this._source.playbackRate.value=t)}}),t.Noise.prototype._start=function(e){var i=n[this._type];this._source=new t.BufferSource(i).connect(this.output),this._source.loop=!0,this._source.playbackRate.value=this._playbackRate,this._source.start(this.toSeconds(e),Math.random()*(i.duration-.001))},t.Noise.prototype._stop=function(t){this._source&&(this._source.stop(this.toSeconds(t)),this._source=null)},t.Noise.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),null!==this._source&&(this._source.disconnect(),this._source=null),this._buffer=null,this};var i={pink:function(){for(var t=[],e=0;e<2;e++){var i=new Float32Array(220500);t[e]=i;var n,s,o,r,a,h,l;n=s=o=r=a=h=l=0;for(var u=0;u<220500;u++){var p=2*Math.random()-1;n=.99886*n+.0555179*p,s=.99332*s+.0750759*p,o=.969*o+.153852*p,r=.8665*r+.3104856*p,a=.55*a+.5329522*p,h=-.7616*h-.016898*p,i[u]=n+s+o+r+a+h+l+.5362*p,i[u]*=.11,l=.115926*p}}return t}(),brown:function(){for(var t=[],e=0;e<2;e++){var i=new Float32Array(220500);t[e]=i;for(var n=0,s=0;s<220500;s++){var o=2*Math.random()-1;i[s]=(n+.02*o)/1.02,n=i[s],i[s]*=3.5}}return t}(),white:function(){for(var t=[],e=0;e<2;e++){var i=new Float32Array(220500);t[e]=i;for(var n=0;n<220500;n++)i[n]=2*Math.random()-1}return t}()},n={};return e(),t.Context.on("init",e),t.Noise}),t(function(t){return t.NoiseSynth=function(e){e=this.defaultArg(e,t.NoiseSynth.defaults),t.Instrument.call(this,e),this.noise=new t.Noise,this.envelope=new t.AmplitudeEnvelope(e.envelope),this.noise.chain(this.envelope,this.output),this.noise.start(),this._readOnly(["noise","envelope"])},t.extend(t.NoiseSynth,t.Instrument),t.NoiseSynth.defaults={noise:{type:"white"},envelope:{attack:.005,decay:.1,sustain:0}},t.NoiseSynth.prototype.triggerAttack=function(t,e){return this.envelope.triggerAttack(t,e),this},t.NoiseSynth.prototype.triggerRelease=function(t){return this.envelope.triggerRelease(t),this},t.NoiseSynth.prototype.triggerAttackRelease=function(t,e,i){return e=this.toSeconds(e),t=this.toSeconds(t),this.triggerAttack(e,i),this.triggerRelease(e+t),this},t.NoiseSynth.prototype.dispose=function(){return t.Instrument.prototype.dispose.call(this),this._writable(["noise","envelope"]),this.noise.dispose(),this.noise=null,this.envelope.dispose(),this.envelope=null,this},t.NoiseSynth}),t(function(t){return t.PluckSynth=function(e){e=this.defaultArg(e,t.PluckSynth.defaults),t.Instrument.call(this,e),this._noise=new t.Noise("pink"),this.attackNoise=e.attackNoise,this._lfcf=new t.LowpassCombFilter({resonance:e.resonance,dampening:e.dampening}),this.resonance=this._lfcf.resonance,this.dampening=this._lfcf.dampening,this._noise.connect(this._lfcf),this._lfcf.connect(this.output),this._readOnly(["resonance","dampening"])},t.extend(t.PluckSynth,t.Instrument),t.PluckSynth.defaults={attackNoise:1,dampening:4e3,resonance:.9},t.PluckSynth.prototype.triggerAttack=function(t,e){t=this.toFrequency(t),e=this.toSeconds(e);var i=1/t;return this._lfcf.delayTime.setValueAtTime(i,e),this._noise.start(e),this._noise.stop(e+i*this.attackNoise),this},t.PluckSynth.prototype.dispose=function(){return t.Instrument.prototype.dispose.call(this),this._noise.dispose(),this._lfcf.dispose(),this._noise=null,this._lfcf=null,this._writable(["resonance","dampening"]),this.dampening=null,this.resonance=null,this},t.PluckSynth}),t(function(t){return t.PolySynth=function(){t.Instrument.call(this);var e=this.optionsObject(arguments,["polyphony","voice"],t.PolySynth.defaults);(e=this.defaultArg(e,t.Instrument.defaults)).polyphony=Math.min(t.PolySynth.MAX_POLYPHONY,e.polyphony),this.voices=new Array(e.polyphony),this._triggers=new Array(e.polyphony),this.detune=new t.Signal(e.detune,t.Type.Cents),this._readOnly("detune");for(var i=0;i<e.polyphony;i++){var n=new e.voice(arguments[2],arguments[3]);this.voices[i]=n,n.connect(this.output),n.hasOwnProperty("detune")&&this.detune.connect(n.detune),this._triggers[i]={release:-1,note:null,voice:n}}this.volume.value=e.volume},t.extend(t.PolySynth,t.Instrument),t.PolySynth.defaults={polyphony:4,volume:0,detune:0,voice:t.Synth},t.PolySynth.prototype.triggerAttack=function(t,e,i){Array.isArray(t)||(t=[t]),e=this.toSeconds(e);for(var n=0;n<t.length;n++){for(var s=t[n],o=this._triggers[0],r=1;r<this._triggers.length;r++)this._triggers[r].release<o.release&&(o=this._triggers[r],r);o.release=1/0,o.note=JSON.stringify(s),o.voice.triggerAttack(s,e,i)}return this},t.PolySynth.prototype.triggerAttackRelease=function(t,e,i,n){if(i=this.toSeconds(i),this.triggerAttack(t,i,n),this.isArray(e)&&this.isArray(t))for(var s=0;s<t.length;s++){var o=e[Math.min(s,e.length-1)];this.triggerRelease(t[s],i+this.toSeconds(o))}else this.triggerRelease(t,i+this.toSeconds(e));return this},t.PolySynth.prototype.triggerRelease=function(t,e){Array.isArray(t)||(t=[t]),e=this.toSeconds(e);for(var i=0;i<t.length;i++)for(var n=JSON.stringify(t[i]),s=0;s<this._triggers.length;s++){var o=this._triggers[s];o.note===n&&o.release>e&&(o.voice.triggerRelease(e),o.release=e)}return this},t.PolySynth.prototype.set=function(t,e,i){for(var n=0;n<this.voices.length;n++)this.voices[n].set(t,e,i);return this},t.PolySynth.prototype.get=function(t){return this.voices[0].get(t)},t.PolySynth.prototype.releaseAll=function(t){t=this.toSeconds(t);for(var e=0;e<this._triggers.length;e++){var i=this._triggers[e];i.release>t&&(i.release=t,i.voice.triggerRelease(t))}return this},t.PolySynth.prototype.dispose=function(){t.Instrument.prototype.dispose.call(this);for(var e=0;e<this.voices.length;e++)this.voices[e].dispose(),this.voices[e]=null;return this._writable("detune"),this.detune.dispose(),this.detune=null,this.voices=null,this._triggers=null,this},t.PolySynth.MAX_POLYPHONY=20,t.PolySynth}),t(function(t){return t.Player=function(e){var i;e instanceof t.Buffer?(e=e.get(),i=t.Player.defaults):i=this.optionsObject(arguments,["url","onload"],t.Player.defaults),t.Source.call(this,i),this._source=null,this.autostart=i.autostart,this._buffer=new t.Buffer({url:i.url,onload:this._onload.bind(this,i.onload),reverse:i.reverse}),e instanceof AudioBuffer&&this._buffer.set(e),this._loop=i.loop,this._loopStart=i.loopStart,this._loopEnd=i.loopEnd,this._playbackRate=i.playbackRate,this.retrigger=i.retrigger},t.extend(t.Player,t.Source),t.Player.defaults={onload:t.noOp,playbackRate:1,loop:!1,autostart:!1,loopStart:0,loopEnd:0,retrigger:!1,reverse:!1},t.Player.prototype.load=function(t,e){return this._buffer.load(t,this._onload.bind(this,e))},t.Player.prototype._onload=function(e){(e=this.defaultArg(e,t.noOp))(this),this.autostart&&this.start()},t.Player.prototype._start=function(e,i,n){if(!this._buffer.loaded)throw Error("Tone.Player: tried to start Player before the buffer was loaded");if(i=this._loop?this.defaultArg(i,this._loopStart):this.defaultArg(i,0),i=this.toSeconds(i),n=this.defaultArg(n,Math.max(this._buffer.duration-i,0)),n=this.toSeconds(n),e=this.toSeconds(e),this._source=this.context.createBufferSource(),this._source.buffer=this._buffer.get(),this._loop?(this._source.loop=this._loop,this._source.loopStart=this.toSeconds(this._loopStart),this._source.loopEnd=this.toSeconds(this._loopEnd)):this._synced||this._state.setStateAtTime(t.State.Stopped,e+n),this._source.playbackRate.value=this._playbackRate,this._source.connect(this.output),this._loop){var s=this._source.loopEnd||this._buffer.duration,o=s-this._source.loopStart;if(i>s)for(;i>s;)i-=o;this._source.start(e,i)}else this._source.start(e,i,n);return this},t.Player.prototype._stop=function(t){return this._source&&(this._source.stop(this.toSeconds(t)),this._source=null),this},t.Player.prototype.seek=function(e,i){return i=this.toSeconds(i),this._state.getValueAtTime(i)===t.State.Started&&(e=this.toSeconds(e),this._stop(i),this._start(i,e)),this},t.Player.prototype.setLoopPoints=function(t,e){return this.loopStart=t,this.loopEnd=e,this},Object.defineProperty(t.Player.prototype,"loopStart",{get:function(){return this._loopStart},set:function(t){this._loopStart=t,this._source&&(this._source.loopStart=this.toSeconds(t))}}),Object.defineProperty(t.Player.prototype,"loopEnd",{get:function(){return this._loopEnd},set:function(t){this._loopEnd=t,this._source&&(this._source.loopEnd=this.toSeconds(t))}}),Object.defineProperty(t.Player.prototype,"buffer",{get:function(){return this._buffer},set:function(t){this._buffer.set(t)}}),Object.defineProperty(t.Player.prototype,"loop",{get:function(){return this._loop},set:function(t){this._loop=t,this._source&&(this._source.loop=t)}}),Object.defineProperty(t.Player.prototype,"playbackRate",{get:function(){return this._playbackRate},set:function(t){this._playbackRate=t,this._source&&(this._source.playbackRate.value=t)}}),Object.defineProperty(t.Player.prototype,"reverse",{get:function(){return this._buffer.reverse},set:function(t){this._buffer.reverse=t}}),t.Player.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),null!==this._source&&(this._source.disconnect(),this._source=null),this._buffer.dispose(),this._buffer=null,this},t.Player}),t(function(t){return t.Sampler=function(){var e=this.optionsObject(arguments,["url","onload"],t.Sampler.defaults);t.Instrument.call(this,e),this.player=new t.Player(e.url,e.onload),this.player.retrigger=!0,this.envelope=new t.AmplitudeEnvelope(e.envelope),this.player.chain(this.envelope,this.output),this._readOnly(["player","envelope"]),this.loop=e.loop,this.reverse=e.reverse},t.extend(t.Sampler,t.Instrument),t.Sampler.defaults={onload:t.noOp,loop:!1,reverse:!1,envelope:{attack:.001,decay:0,sustain:1,release:.1}},t.Sampler.prototype.triggerAttack=function(t,e,i){return e=this.toSeconds(e),t=this.defaultArg(t,0),this.player.playbackRate=this.intervalToFrequencyRatio(t),this.player.start(e),this.envelope.triggerAttack(e,i),this},t.Sampler.prototype.triggerRelease=function(t){return t=this.toSeconds(t),this.envelope.triggerRelease(t),this.player.stop(this.toSeconds(this.envelope.release)+t),this},Object.defineProperty(t.Sampler.prototype,"loop",{get:function(){return this.player.loop},set:function(t){this.player.loop=t}}),Object.defineProperty(t.Sampler.prototype,"reverse",{get:function(){return this.player.reverse},set:function(t){this.player.reverse=t}}),Object.defineProperty(t.Sampler.prototype,"buffer",{get:function(){return this.player.buffer},set:function(t){this.player.buffer=t}}),t.Sampler.prototype.dispose=function(){return t.Instrument.prototype.dispose.call(this),this._writable(["player","envelope"]),this.player.dispose(),this.player=null,this.envelope.dispose(),this.envelope=null,this},t.Sampler}),t(function(t){return t.GainToAudio=function(){this._norm=this.input=this.output=new t.WaveShaper(function(t){return 2*Math.abs(t)-1})},t.extend(t.GainToAudio,t.SignalBase),t.GainToAudio.prototype.dispose=function(){return t.prototype.dispose.call(this),this._norm.dispose(),this._norm=null,this},t.GainToAudio}),t(function(t){return t.Normalize=function(e,i){this._inputMin=this.defaultArg(e,0),this._inputMax=this.defaultArg(i,1),this._sub=this.input=new t.Add(0),this._div=this.output=new t.Multiply(1),this._sub.connect(this._div),this._setRange()},t.extend(t.Normalize,t.SignalBase),Object.defineProperty(t.Normalize.prototype,"min",{get:function(){return this._inputMin},set:function(t){this._inputMin=t,this._setRange()}}),Object.defineProperty(t.Normalize.prototype,"max",{get:function(){return this._inputMax},set:function(t){this._inputMax=t,this._setRange()}}),t.Normalize.prototype._setRange=function(){this._sub.value=-this._inputMin,this._div.value=1/(this._inputMax-this._inputMin)},t.Normalize.prototype.dispose=function(){return t.prototype.dispose.call(this),this._sub.dispose(),this._sub=null,this._div.dispose(),this._div=null,this},t.Normalize}),t(function(t){return t.MultiPlayer=function(){var e=this.optionsObject(arguments,["urls","onload"],t.MultiPlayer.defaults);e.urls instanceof t.Buffers?this.buffers=e.urls:this.buffers=new t.Buffers(e.urls,e.onload),this._activeSources={},this.fadeIn=e.fadeIn,this.fadeOut=e.fadeOut,this._volume=this.output=new t.Volume(e.volume),this.volume=this._volume.volume,this._readOnly("volume"),this._volume.output.output.channelCount=2,this._volume.output.output.channelCountMode="explicit",this.mute=e.mute},t.extend(t.MultiPlayer,t.Source),t.MultiPlayer.defaults={onload:t.noOp,fadeIn:0,fadeOut:0},t.MultiPlayer.prototype._makeSource=function(e){var i;this.isString(e)||this.isNumber(e)?i=this.buffers.get(e).get():e instanceof t.Buffer?i=e.get():e instanceof AudioBuffer&&(i=e);var n=new t.BufferSource(i).connect(this.output);return this._activeSources.hasOwnProperty(e)||(this._activeSources[e]=[]),this._activeSources[e].push(n),n},t.MultiPlayer.prototype.start=function(t,e,i,n,s,o){e=this.toSeconds(e);var r=this._makeSource(t);return r.start(e,i,n,this.defaultArg(o,1),this.fadeIn),n&&r.stop(e+this.toSeconds(n),this.fadeOut),s=this.defaultArg(s,0),r.playbackRate.value=this.intervalToFrequencyRatio(s),this},t.MultiPlayer.prototype.startLoop=function(t,e,i,n,s,o,r){e=this.toSeconds(e);var a=this._makeSource(t);return a.loop=!0,a.loopStart=this.toSeconds(this.defaultArg(n,0)),a.loopEnd=this.toSeconds(this.defaultArg(s,0)),a.start(e,i,void 0,this.defaultArg(r,1),this.fadeIn),o=this.defaultArg(o,0),a.playbackRate.value=this.intervalToFrequencyRatio(o),this},t.MultiPlayer.prototype.stop=function(t,e){if(!this._activeSources[t]||!this._activeSources[t].length)throw new Error("Tone.MultiPlayer: cannot stop a buffer that hasn't been started or is already stopped");return e=this.toSeconds(e),this._activeSources[t].shift().stop(e,this.fadeOut),this},t.MultiPlayer.prototype.stopAll=function(t){t=this.toSeconds(t);for(var e in this._activeSources)for(var i=this._activeSources[e],n=0;n<i.length;n++)i[n].stop(t);return this},t.MultiPlayer.prototype.add=function(t,e,i){return this.buffers.add(t,e,i),this},Object.defineProperty(t.MultiPlayer.prototype,"state",{get:function(){return this._activeSources.length>0?t.State.Started:t.State.Stopped}}),Object.defineProperty(t.MultiPlayer.prototype,"mute",{get:function(){return this._volume.mute},set:function(t){this._volume.mute=t}}),t.MultiPlayer.prototype.dispose=function(){t.prototype.dispose.call(this),this._volume.dispose(),this._volume=null,this._writable("volume"),this.volume=null;for(var e in this._activeSources)this._activeSources[e].forEach(function(t){t.dispose()});return this.buffers.dispose(),this.buffers=null,this._activeSources=null,this},t.MultiPlayer}),t(function(t){return t.GrainPlayer=function(){var e=this.optionsObject(arguments,["url","onload"],t.GrainPlayer.defaults);t.Source.call(this),this.buffer=new t.Buffer(e.url,e.onload),this._player=(new t.MultiPlayer).connect(this.output),this._clock=new t.Clock(this._tick.bind(this),1),this._loopStart=0,this._loopEnd=0,this._playbackRate=e.playbackRate,this._grainSize=e.grainSize,this._overlap=e.overlap,this.detune=e.detune,this.drift=e.drift,this.overlap=e.overlap,this.loop=e.loop,this.playbackRate=e.playbackRate,this.grainSize=e.grainSize,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.reverse=e.reverse},t.extend(t.GrainPlayer,t.Source),t.GrainPlayer.defaults={onload:t.noOp,overlap:.1,grainSize:.2,drift:0,playbackRate:1,detune:0,loop:!1,loopStart:0,loopEnd:0,reverse:!1},t.GrainPlayer.prototype._start=function(t,e,i){e=this.defaultArg(e,0),e=this.toSeconds(e),t=this.toSeconds(t),this._offset=e,this._clock.start(t),this._player.volume.setValueAtTime(0,t),i&&this._stop(t+this.toSeconds(i))},t.GrainPlayer.prototype._stop=function(t){this._clock.stop(t),this._player.volume.cancelScheduledValues(t),this._player.volume.setValueAtTime(-1/0,t)},t.GrainPlayer.prototype._tick=function(t){var e=this.buffer.duration;this.loop&&this._loopEnd>0&&(e=this._loopEnd);var i=(2*Math.random()-1)*this.drift,n=this._offset-this._overlap+i,s=this.detune/100;n=Math.max(n,0),n=Math.min(n,e);var o=this._player.fadeIn;if(this.loop&&this._offset>e){var r=this._offset-e;this._player.start(this.buffer,t,n,r+this._overlap,s),n=this._offset%e,this._offset=this._loopStart,this._player.fadeIn=0,this._player.start(this.buffer,t+r,this._offset,n+this._overlap,s)}else this._offset>e?this.stop(t):(0===n&&(this._player.fadeIn=0),this._player.start(this.buffer,t,n,this.grainSize+this._overlap,s));this._player.fadeIn=o;var a=this._clock._nextTick-t;this._offset+=a*this._playbackRate},t.GrainPlayer.prototype.scrub=function(t,e){return this._offset=this.toSeconds(t),this._tick(this.toSeconds(e)),this},Object.defineProperty(t.GrainPlayer.prototype,"playbackRate",{get:function(){return this._playbackRate},set:function(t){this._playbackRate=t,this.grainSize=this._grainSize}}),Object.defineProperty(t.GrainPlayer.prototype,"loopStart",{get:function(){return this._loopStart},set:function(t){this._loopStart=this.toSeconds(t)}}),Object.defineProperty(t.GrainPlayer.prototype,"loopEnd",{get:function(){return this._loopEnd},set:function(t){this._loopEnd=this.toSeconds(t)}}),Object.defineProperty(t.GrainPlayer.prototype,"reverse",{get:function(){return this.buffer.reverse},set:function(t){this.buffer.reverse=t}}),Object.defineProperty(t.GrainPlayer.prototype,"grainSize",{get:function(){return this._grainSize},set:function(t){this._grainSize=this.toSeconds(t),this._clock.frequency.value=this._playbackRate/this._grainSize}}),Object.defineProperty(t.GrainPlayer.prototype,"overlap",{get:function(){return this._overlap},set:function(t){t=this.toSeconds(t),this._overlap=t,this._overlap<0?(this._player.fadeIn=.01,this._player.fadeOut=.01):(this._player.fadeIn=t,this._player.fadeOut=t)}}),t.GrainPlayer.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),this.buffer.dispose(),this.buffer=null,this._player.dispose(),this._player=null,this._clock.dispose(),this._clock=null,this},t.GrainPlayer}),t(function(t){return t.UserMedia=function(){var e=this.optionsObject(arguments,["volume"],t.UserMedia.defaults);this._mediaStream=null,this._stream=null,this._device=null,this._volume=this.output=new t.Volume(e.volume),this.volume=this._volume.volume,this._readOnly("volume"),this.mute=e.mute},t.extend(t.UserMedia),t.UserMedia.defaults={volume:0,mute:!1},t.UserMedia.prototype.open=function(t){return t=this.defaultArg(t,"default"),this.enumerateDevices().then(function(e){var i;if(this.isNumber(t)?i=e[t]:(i=e.find(function(e){return e.label===t||e.deviceId===t}))||(i=e[0]),!i)throw new Error("Tone.UserMedia: no matching audio inputs.");this._device=i;var n={audio:{deviceId:i.deviceId,echoCancellation:!1,sampleRate:this.context.sampleRate}};return navigator.mediaDevices.getUserMedia(n).then(function(t){return this._stream||(this._stream=t,this._mediaStream=this.context.createMediaStreamSource(t),this._mediaStream.connect(this.output)),this}.bind(this))}.bind(this))},t.UserMedia.prototype.close=function(){return this._stream&&(this._stream.getAudioTracks().forEach(function(t){t.stop()}),this._stream=null,this._mediaStream.disconnect(),this._mediaStream=null),this._device=null,this},t.UserMedia.prototype.enumerateDevices=function(){return navigator.mediaDevices.enumerateDevices().then(function(t){return t.filter(function(t){return"audioinput"===t.kind})})},Object.defineProperty(t.UserMedia.prototype,"state",{get:function(){return this._stream&&this._stream.active?t.State.Started:t.State.Stopped}}),Object.defineProperty(t.UserMedia.prototype,"deviceId",{get:function(){if(this._device)return this._device.deviceId}}),Object.defineProperty(t.UserMedia.prototype,"groupId",{get:function(){if(this._device)return this._device.groupId}}),Object.defineProperty(t.UserMedia.prototype,"label",{get:function(){if(this._device)return this._device.label}}),Object.defineProperty(t.UserMedia.prototype,"mute",{get:function(){return this._volume.mute},set:function(t){this._volume.mute=t}}),t.UserMedia.prototype.dispose=function(){return t.prototype.dispose.call(this),this.close(),this._writable("volume"),this._volume.dispose(),this._volume=null,this.volume=null,this},Object.defineProperty(t.UserMedia,"supported",{get:function(){return!t.prototype.isUndef(navigator.mediaDevices)&&t.prototype.isFunction(navigator.mediaDevices.getUserMedia)}}),t.UserMedia}),e});
/**
 * tracking - A modern approach for Computer Vision on the web.
 * @author Eduardo Lundgren <edu@rdo.io>
 * @version v1.1.2
 * @link http://trackingjs.com
 * @license BSD
 */
(function(window, undefined) {
  window.tracking = window.tracking || {};

  /**
   * Inherit the prototype methods from one constructor into another.
   *
   * Usage:
   * <pre>
   * function ParentClass(a, b) { }
   * ParentClass.prototype.foo = function(a) { }
   *
   * function ChildClass(a, b, c) {
   *   tracking.base(this, a, b);
   * }
   * tracking.inherits(ChildClass, ParentClass);
   *
   * var child = new ChildClass('a', 'b', 'c');
   * child.foo();
   * </pre>
   *
   * @param {Function} childCtor Child class.
   * @param {Function} parentCtor Parent class.
   */
  tracking.inherits = function(childCtor, parentCtor) {
    function TempCtor() {
    }
    TempCtor.prototype = parentCtor.prototype;
    childCtor.superClass_ = parentCtor.prototype;
    childCtor.prototype = new TempCtor();
    childCtor.prototype.constructor = childCtor;

    /**
     * Calls superclass constructor/method.
     *
     * This function is only available if you use tracking.inherits to express
     * inheritance relationships between classes.
     *
     * @param {!object} me Should always be "this".
     * @param {string} methodName The method name to call. Calling superclass
     *     constructor can be done with the special string 'constructor'.
     * @param {...*} var_args The arguments to pass to superclass
     *     method/constructor.
     * @return {*} The return value of the superclass method/constructor.
     */
    childCtor.base = function(me, methodName) {
      var args = Array.prototype.slice.call(arguments, 2);
      return parentCtor.prototype[methodName].apply(me, args);
    };
  };

  /**
   * Captures the user camera when tracking a video element and set its source
   * to the camera stream.
   * @param {HTMLVideoElement} element Canvas element to track.
   * @param {object} opt_options Optional configuration to the tracker.
   */
  tracking.initUserMedia_ = function(element, opt_options) {

	var errorElement = document.querySelector('#errorMsg');
	var video = document.querySelector('video');

	// Put variables in global scope to make them available to the browser console.
	var constraints = window.constraints = {
	  audio: false,
	  video: true
	};

	function handleSuccess(stream) {
	  var videoTracks = stream.getVideoTracks();
	 
	  window.stream = stream; // make variable available to browser console
	  element.srcObject = stream;
	}

	function handleError(error) {
	  if (error.name === 'ConstraintNotSatisfiedError') {
	    errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
	        constraints.video.width.exact + ' px is not supported by your device.');
	  } else if (error.name === 'PermissionDeniedError') {
	    errorMsg('Permissions have not been granted to use your camera and ' +
	      'microphone, you need to allow the page access to your devices in ' +
	      'order for the demo to work.');
	  }
	  errorMsg('getUserMedia error: ' + error.name, error);
	}

	function errorMsg(msg, error) {
	  console.error(error);
	}

	navigator.mediaDevices.getUserMedia(constraints).
	    then(handleSuccess).catch(handleError);
  	// console.log(element);
   //  window.navigator.getUserMedia({
   //    video: true,
   //    audio: !!(opt_options && opt_options.audio)
   //  }, function(stream) {
   //      try {
   //        element.src = window.URL.createObjectURL(stream);
   //      } catch (err) {
   //        element.src = stream;
   //      }
   //    }, function() {
   //      throw Error('Cannot capture user camera.');
   //    }
   //  );
  };

  /**
   * Tests whether the object is a dom node.
   * @param {object} o Object to be tested.
   * @return {boolean} True if the object is a dom node.
   */
  tracking.isNode = function(o) {
    return o.nodeType || this.isWindow(o);
  };

  /**
   * Tests whether the object is the `window` object.
   * @param {object} o Object to be tested.
   * @return {boolean} True if the object is the `window` object.
   */
  tracking.isWindow = function(o) {
    return !!(o && o.alert && o.document);
  };

  /**
   * Selects a dom node from a CSS3 selector using `document.querySelector`.
   * @param {string} selector
   * @param {object} opt_element The root element for the query. When not
   *     specified `document` is used as root element.
   * @return {HTMLElement} The first dom element that matches to the selector.
   *     If not found, returns `null`.
   */
  tracking.one = function(selector, opt_element) {
    if (this.isNode(selector)) {
      return selector;
    }
    return (opt_element || document).querySelector(selector);
  };

  /**
   * Tracks a canvas, image or video element based on the specified `tracker`
   * instance. This method extract the pixel information of the input element
   * to pass to the `tracker` instance. When tracking a video, the
   * `tracker.track(pixels, width, height)` will be in a
   * `requestAnimationFrame` loop in order to track all video frames.
   *
   * Example:
   * var tracker = new tracking.ColorTracker();
   *
   * tracking.track('#video', tracker);
   * or
   * tracking.track('#video', tracker, { camera: true });
   *
   * tracker.on('track', function(event) {
   *   // console.log(event.data[0].x, event.data[0].y)
   * });
   *
   * @param {HTMLElement} element The element to track, canvas, image or
   *     video.
   * @param {tracking.Tracker} tracker The tracker instance used to track the
   *     element.
   * @param {object} opt_options Optional configuration to the tracker.
   */
  tracking.track = function(element, tracker, opt_options) {
    element = tracking.one(element);
    if (!element) {
      throw new Error('Element not found, try a different element or selector.');
    }
    if (!tracker) {
      throw new Error('Tracker not specified, try `tracking.track(element, new tracking.FaceTracker())`.');
    }

    switch (element.nodeName.toLowerCase()) {
      case 'canvas':
        return this.trackCanvas_(element, tracker, opt_options);
      case 'img':
        return this.trackImg_(element, tracker, opt_options);
      case 'video':
        if (opt_options) {
          if (opt_options.camera) {
            this.initUserMedia_(element, opt_options);
          }
        }
        return this.trackVideo_(element, tracker, opt_options);
      default:
        throw new Error('Element not supported, try in a canvas, img, or video.');
    }
  };

  /**
   * Tracks a canvas element based on the specified `tracker` instance and
   * returns a `TrackerTask` for this track.
   * @param {HTMLCanvasElement} element Canvas element to track.
   * @param {tracking.Tracker} tracker The tracker instance used to track the
   *     element.
   * @param {object} opt_options Optional configuration to the tracker.
   * @return {tracking.TrackerTask}
   * @private
   */
  tracking.trackCanvas_ = function(element, tracker) {
    var self = this;
    var task = new tracking.TrackerTask(tracker);
    task.on('run', function() {
      self.trackCanvasInternal_(element, tracker);
    });
    return task.run();
  };

  /**
   * Tracks a canvas element based on the specified `tracker` instance. This
   * method extract the pixel information of the input element to pass to the
   * `tracker` instance.
   * @param {HTMLCanvasElement} element Canvas element to track.
   * @param {tracking.Tracker} tracker The tracker instance used to track the
   *     element.
   * @param {object} opt_options Optional configuration to the tracker.
   * @private
   */
  tracking.trackCanvasInternal_ = function(element, tracker) {
    var width = element.width;
    var height = element.height;
    var context = element.getContext('2d');
    var imageData = context.getImageData(0, 0, width, height);
    tracker.track(imageData.data, width, height);
  };

  /**
   * Tracks a image element based on the specified `tracker` instance. This
   * method extract the pixel information of the input element to pass to the
   * `tracker` instance.
   * @param {HTMLImageElement} element Canvas element to track.
   * @param {tracking.Tracker} tracker The tracker instance used to track the
   *     element.
   * @param {object} opt_options Optional configuration to the tracker.
   * @private
   */
  tracking.trackImg_ = function(element, tracker) {
    var width = element.width;
    var height = element.height;
    var canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    var task = new tracking.TrackerTask(tracker);
    task.on('run', function() {
      tracking.Canvas.loadImage(canvas, element.src, 0, 0, width, height, function() {
        tracking.trackCanvasInternal_(canvas, tracker);
      });
    });
    return task.run();
  };

  /**
   * Tracks a video element based on the specified `tracker` instance. This
   * method extract the pixel information of the input element to pass to the
   * `tracker` instance. The `tracker.track(pixels, width, height)` will be in
   * a `requestAnimationFrame` loop in order to track all video frames.
   * @param {HTMLVideoElement} element Canvas element to track.
   * @param {tracking.Tracker} tracker The tracker instance used to track the
   *     element.
   * @param {object} opt_options Optional configuration to the tracker.
   * @private
   */
  tracking.trackVideo_ = function(element, tracker) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width;
    var height;

    var resizeCanvas_ = function() {
      width = element.offsetWidth;
      height = element.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resizeCanvas_();
    element.addEventListener('resize', resizeCanvas_);

    var requestId;
    var requestAnimationFrame_ = function() {
      requestId = window.requestAnimationFrame(function() {
        if (element.readyState === element.HAVE_ENOUGH_DATA) {
          try {
            // Firefox v~30.0 gets confused with the video readyState firing an
            // erroneous HAVE_ENOUGH_DATA just before HAVE_CURRENT_DATA state,
            // hence keep trying to read it until resolved.
            context.drawImage(element, 0, 0, width, height);
          } catch (err) {}
          tracking.trackCanvasInternal_(canvas, tracker);
        }
        requestAnimationFrame_();
      });
    };

    var task = new tracking.TrackerTask(tracker);
    task.on('stop', function() {
      window.cancelAnimationFrame(requestId);
    });
    task.on('run', function() {
      requestAnimationFrame_();
    });
    return task.run();
  };

  // Browser polyfills
  //===================

  if (!window.URL) {
    window.URL = window.URL || window.webkitURL || window.msURL || window.oURL;
  }

  if (!navigator.getUserMedia) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
  }
}(window));

(function() {
  /**
   * EventEmitter utility.
   * @constructor
   */
  tracking.EventEmitter = function() {};

  /**
   * Holds event listeners scoped by event type.
   * @type {object}
   * @private
   */
  tracking.EventEmitter.prototype.events_ = null;

  /**
   * Adds a listener to the end of the listeners array for the specified event.
   * @param {string} event
   * @param {function} listener
   * @return {object} Returns emitter, so calls can be chained.
   */
  tracking.EventEmitter.prototype.addListener = function(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }
    if (!this.events_) {
      this.events_ = {};
    }

    this.emit('newListener', event, listener);

    if (!this.events_[event]) {
      this.events_[event] = [];
    }

    this.events_[event].push(listener);

    return this;
  };

  /**
   * Returns an array of listeners for the specified event.
   * @param {string} event
   * @return {array} Array of listeners.
   */
  tracking.EventEmitter.prototype.listeners = function(event) {
    return this.events_ && this.events_[event];
  };

  /**
   * Execute each of the listeners in order with the supplied arguments.
   * @param {string} event
   * @param {*} opt_args [arg1], [arg2], [...]
   * @return {boolean} Returns true if event had listeners, false otherwise.
   */
  tracking.EventEmitter.prototype.emit = function(event) {
    var listeners = this.listeners(event);
    if (listeners) {
      var args = Array.prototype.slice.call(arguments, 1);
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i]) {
          listeners[i].apply(this, args);
        }
      }
      return true;
    }
    return false;
  };

  /**
   * Adds a listener to the end of the listeners array for the specified event.
   * @param {string} event
   * @param {function} listener
   * @return {object} Returns emitter, so calls can be chained.
   */
  tracking.EventEmitter.prototype.on = tracking.EventEmitter.prototype.addListener;

  /**
   * Adds a one time listener for the event. This listener is invoked only the
   * next time the event is fired, after which it is removed.
   * @param {string} event
   * @param {function} listener
   * @return {object} Returns emitter, so calls can be chained.
   */
  tracking.EventEmitter.prototype.once = function(event, listener) {
    var self = this;
    self.on(event, function handlerInternal() {
      self.removeListener(event, handlerInternal);
      listener.apply(this, arguments);
    });
  };

  /**
   * Removes all listeners, or those of the specified event. It's not a good
   * idea to remove listeners that were added elsewhere in the code,
   * especially when it's on an emitter that you didn't create.
   * @param {string} event
   * @return {object} Returns emitter, so calls can be chained.
   */
  tracking.EventEmitter.prototype.removeAllListeners = function(opt_event) {
    if (!this.events_) {
      return this;
    }
    if (opt_event) {
      delete this.events_[opt_event];
    } else {
      delete this.events_;
    }
    return this;
  };

  /**
   * Remove a listener from the listener array for the specified event.
   * Caution: changes array indices in the listener array behind the listener.
   * @param {string} event
   * @param {function} listener
   * @return {object} Returns emitter, so calls can be chained.
   */
  tracking.EventEmitter.prototype.removeListener = function(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }
    if (!this.events_) {
      return this;
    }

    var listeners = this.listeners(event);
    if (Array.isArray(listeners)) {
      var i = listeners.indexOf(listener);
      if (i < 0) {
        return this;
      }
      listeners.splice(i, 1);
    }

    return this;
  };

  /**
   * By default EventEmitters will print a warning if more than 10 listeners
   * are added for a particular event. This is a useful default which helps
   * finding memory leaks. Obviously not all Emitters should be limited to 10.
   * This function allows that to be increased. Set to zero for unlimited.
   * @param {number} n The maximum number of listeners.
   */
  tracking.EventEmitter.prototype.setMaxListeners = function() {
    throw new Error('Not implemented');
  };

}());

(function() {
  /**
   * Canvas utility.
   * @static
   * @constructor
   */
  tracking.Canvas = {};

  /**
   * Loads an image source into the canvas.
   * @param {HTMLCanvasElement} canvas The canvas dom element.
   * @param {string} src The image source.
   * @param {number} x The canvas horizontal coordinate to load the image.
   * @param {number} y The canvas vertical coordinate to load the image.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {function} opt_callback Callback that fires when the image is loaded
   *     into the canvas.
   * @static
   */
  tracking.Canvas.loadImage = function(canvas, src, x, y, width, height, opt_callback) {
    var instance = this;
    var img = new window.Image();
    img.crossOrigin = '*';
    img.onload = function() {
      var context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      context.drawImage(img, x, y, width, height);
      if (opt_callback) {
        opt_callback.call(instance);
      }
      img = null;
    };
    img.src = src;
  };
}());

(function() {
  /**
   * DisjointSet utility with path compression. Some applications involve
   * grouping n distinct objects into a collection of disjoint sets. Two
   * important operations are then finding which set a given object belongs to
   * and uniting the two sets. A disjoint set data structure maintains a
   * collection S={ S1 , S2 ,..., Sk } of disjoint dynamic sets. Each set is
   * identified by a representative, which usually is a member in the set.
   * @static
   * @constructor
   */
  tracking.DisjointSet = function(length) {
    if (length === undefined) {
      throw new Error('DisjointSet length not specified.');
    }
    this.length = length;
    this.parent = new Uint32Array(length);
    for (var i = 0; i < length; i++) {
      this.parent[i] = i;
    }
  };

  /**
   * Holds the length of the internal set.
   * @type {number}
   */
  tracking.DisjointSet.prototype.length = null;

  /**
   * Holds the set containing the representative values.
   * @type {Array.<number>}
   */
  tracking.DisjointSet.prototype.parent = null;

  /**
   * Finds a pointer to the representative of the set containing i.
   * @param {number} i
   * @return {number} The representative set of i.
   */
  tracking.DisjointSet.prototype.find = function(i) {
    if (this.parent[i] === i) {
      return i;
    } else {
      return (this.parent[i] = this.find(this.parent[i]));
    }
  };

  /**
   * Unites two dynamic sets containing objects i and j, say Si and Sj, into
   * a new set that Si ∪ Sj, assuming that Si ∩ Sj = ∅;
   * @param {number} i
   * @param {number} j
   */
  tracking.DisjointSet.prototype.union = function(i, j) {
    var iRepresentative = this.find(i);
    var jRepresentative = this.find(j);
    this.parent[iRepresentative] = jRepresentative;
  };

}());

(function() {
  /**
   * Image utility.
   * @static
   * @constructor
   */
  tracking.Image = {};

  /**
   * Computes gaussian blur. Adapted from
   * https://github.com/kig/canvasfilters.
   * @param {pixels} pixels The pixels in a linear [r,g,b,a,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {number} diameter Gaussian blur diameter, must be greater than 1.
   * @return {array} The edge pixels in a linear [r,g,b,a,...] array.
   */
  tracking.Image.blur = function(pixels, width, height, diameter) {
    diameter = Math.abs(diameter);
    if (diameter <= 1) {
      throw new Error('Diameter should be greater than 1.');
    }
    var radius = diameter / 2;
    var len = Math.ceil(diameter) + (1 - (Math.ceil(diameter) % 2));
    var weights = new Float32Array(len);
    var rho = (radius + 0.5) / 3;
    var rhoSq = rho * rho;
    var gaussianFactor = 1 / Math.sqrt(2 * Math.PI * rhoSq);
    var rhoFactor = -1 / (2 * rho * rho);
    var wsum = 0;
    var middle = Math.floor(len / 2);
    for (var i = 0; i < len; i++) {
      var x = i - middle;
      var gx = gaussianFactor * Math.exp(x * x * rhoFactor);
      weights[i] = gx;
      wsum += gx;
    }
    for (var j = 0; j < weights.length; j++) {
      weights[j] /= wsum;
    }
    return this.separableConvolve(pixels, width, height, weights, weights, false);
  };

  /**
   * Computes the integral image for summed, squared, rotated and sobel pixels.
   * @param {array} pixels The pixels in a linear [r,g,b,a,...] array to loop
   *     through.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {array} opt_integralImage Empty array of size `width * height` to
   *     be filled with the integral image values. If not specified compute sum
   *     values will be skipped.
   * @param {array} opt_integralImageSquare Empty array of size `width *
   *     height` to be filled with the integral image squared values. If not
   *     specified compute squared values will be skipped.
   * @param {array} opt_tiltedIntegralImage Empty array of size `width *
   *     height` to be filled with the rotated integral image values. If not
   *     specified compute sum values will be skipped.
   * @param {array} opt_integralImageSobel Empty array of size `width *
   *     height` to be filled with the integral image of sobel values. If not
   *     specified compute sobel filtering will be skipped.
   * @static
   */
  tracking.Image.computeIntegralImage = function(pixels, width, height, opt_integralImage, opt_integralImageSquare, opt_tiltedIntegralImage, opt_integralImageSobel) {
    if (arguments.length < 4) {
      throw new Error('You should specify at least one output array in the order: sum, square, tilted, sobel.');
    }
    var pixelsSobel;
    if (opt_integralImageSobel) {
      pixelsSobel = tracking.Image.sobel(pixels, width, height);
    }
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        var w = i * width * 4 + j * 4;
        var pixel = ~~(pixels[w] * 0.299 + pixels[w + 1] * 0.587 + pixels[w + 2] * 0.114);
        if (opt_integralImage) {
          this.computePixelValueSAT_(opt_integralImage, width, i, j, pixel);
        }
        if (opt_integralImageSquare) {
          this.computePixelValueSAT_(opt_integralImageSquare, width, i, j, pixel * pixel);
        }
        if (opt_tiltedIntegralImage) {
          var w1 = w - width * 4;
          var pixelAbove = ~~(pixels[w1] * 0.299 + pixels[w1 + 1] * 0.587 + pixels[w1 + 2] * 0.114);
          this.computePixelValueRSAT_(opt_tiltedIntegralImage, width, i, j, pixel, pixelAbove || 0);
        }
        if (opt_integralImageSobel) {
          this.computePixelValueSAT_(opt_integralImageSobel, width, i, j, pixelsSobel[w]);
        }
      }
    }
  };

  /**
   * Helper method to compute the rotated summed area table (RSAT) by the
   * formula:
   *
   * RSAT(x, y) = RSAT(x-1, y-1) + RSAT(x+1, y-1) - RSAT(x, y-2) + I(x, y) + I(x, y-1)
   *
   * @param {number} width The image width.
   * @param {array} RSAT Empty array of size `width * height` to be filled with
   *     the integral image values. If not specified compute sum values will be
   *     skipped.
   * @param {number} i Vertical position of the pixel to be evaluated.
   * @param {number} j Horizontal position of the pixel to be evaluated.
   * @param {number} pixel Pixel value to be added to the integral image.
   * @static
   * @private
   */
  tracking.Image.computePixelValueRSAT_ = function(RSAT, width, i, j, pixel, pixelAbove) {
    var w = i * width + j;
    RSAT[w] = (RSAT[w - width - 1] || 0) + (RSAT[w - width + 1] || 0) - (RSAT[w - width - width] || 0) + pixel + pixelAbove;
  };

  /**
   * Helper method to compute the summed area table (SAT) by the formula:
   *
   * SAT(x, y) = SAT(x, y-1) + SAT(x-1, y) + I(x, y) - SAT(x-1, y-1)
   *
   * @param {number} width The image width.
   * @param {array} SAT Empty array of size `width * height` to be filled with
   *     the integral image values. If not specified compute sum values will be
   *     skipped.
   * @param {number} i Vertical position of the pixel to be evaluated.
   * @param {number} j Horizontal position of the pixel to be evaluated.
   * @param {number} pixel Pixel value to be added to the integral image.
   * @static
   * @private
   */
  tracking.Image.computePixelValueSAT_ = function(SAT, width, i, j, pixel) {
    var w = i * width + j;
    SAT[w] = (SAT[w - width] || 0) + (SAT[w - 1] || 0) + pixel - (SAT[w - width - 1] || 0);
  };

  /**
   * Converts a color from a colorspace based on an RGB color model to a
   * grayscale representation of its luminance. The coefficients represent the
   * measured intensity perception of typical trichromat humans, in
   * particular, human vision is most sensitive to green and least sensitive
   * to blue.
   * @param {pixels} pixels The pixels in a linear [r,g,b,a,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {boolean} fillRGBA If the result should fill all RGBA values with the gray scale
   *  values, instead of returning a single value per pixel.
   * @param {Uint8ClampedArray} The grayscale pixels in a linear array ([p,p,p,a,...] if fillRGBA
   *  is true and [p1, p2, p3, ...] if fillRGBA is false).
   * @static
   */
  tracking.Image.grayscale = function(pixels, width, height, fillRGBA) {
    var gray = new Uint8ClampedArray(fillRGBA ? pixels.length : pixels.length >> 2);
    var p = 0;
    var w = 0;
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        var value = pixels[w] * 0.299 + pixels[w + 1] * 0.587 + pixels[w + 2] * 0.114;
        gray[p++] = value;

        if (fillRGBA) {
          gray[p++] = value;
          gray[p++] = value;
          gray[p++] = pixels[w + 3];
        }

        w += 4;
      }
    }
    return gray;
  };

  /**
   * Fast horizontal separable convolution. A point spread function (PSF) is
   * said to be separable if it can be broken into two one-dimensional
   * signals: a vertical and a horizontal projection. The convolution is
   * performed by sliding the kernel over the image, generally starting at the
   * top left corner, so as to move the kernel through all the positions where
   * the kernel fits entirely within the boundaries of the image. Adapted from
   * https://github.com/kig/canvasfilters.
   * @param {pixels} pixels The pixels in a linear [r,g,b,a,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {array} weightsVector The weighting vector, e.g [-1,0,1].
   * @param {number} opaque
   * @return {array} The convoluted pixels in a linear [r,g,b,a,...] array.
   */
  tracking.Image.horizontalConvolve = function(pixels, width, height, weightsVector, opaque) {
    var side = weightsVector.length;
    var halfSide = Math.floor(side / 2);
    var output = new Float32Array(width * height * 4);
    var alphaFac = opaque ? 1 : 0;

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var sy = y;
        var sx = x;
        var offset = (y * width + x) * 4;
        var r = 0;
        var g = 0;
        var b = 0;
        var a = 0;
        for (var cx = 0; cx < side; cx++) {
          var scy = sy;
          var scx = Math.min(width - 1, Math.max(0, sx + cx - halfSide));
          var poffset = (scy * width + scx) * 4;
          var wt = weightsVector[cx];
          r += pixels[poffset] * wt;
          g += pixels[poffset + 1] * wt;
          b += pixels[poffset + 2] * wt;
          a += pixels[poffset + 3] * wt;
        }
        output[offset] = r;
        output[offset + 1] = g;
        output[offset + 2] = b;
        output[offset + 3] = a + alphaFac * (255 - a);
      }
    }
    return output;
  };

  /**
   * Fast vertical separable convolution. A point spread function (PSF) is
   * said to be separable if it can be broken into two one-dimensional
   * signals: a vertical and a horizontal projection. The convolution is
   * performed by sliding the kernel over the image, generally starting at the
   * top left corner, so as to move the kernel through all the positions where
   * the kernel fits entirely within the boundaries of the image. Adapted from
   * https://github.com/kig/canvasfilters.
   * @param {pixels} pixels The pixels in a linear [r,g,b,a,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {array} weightsVector The weighting vector, e.g [-1,0,1].
   * @param {number} opaque
   * @return {array} The convoluted pixels in a linear [r,g,b,a,...] array.
   */
  tracking.Image.verticalConvolve = function(pixels, width, height, weightsVector, opaque) {
    var side = weightsVector.length;
    var halfSide = Math.floor(side / 2);
    var output = new Float32Array(width * height * 4);
    var alphaFac = opaque ? 1 : 0;

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var sy = y;
        var sx = x;
        var offset = (y * width + x) * 4;
        var r = 0;
        var g = 0;
        var b = 0;
        var a = 0;
        for (var cy = 0; cy < side; cy++) {
          var scy = Math.min(height - 1, Math.max(0, sy + cy - halfSide));
          var scx = sx;
          var poffset = (scy * width + scx) * 4;
          var wt = weightsVector[cy];
          r += pixels[poffset] * wt;
          g += pixels[poffset + 1] * wt;
          b += pixels[poffset + 2] * wt;
          a += pixels[poffset + 3] * wt;
        }
        output[offset] = r;
        output[offset + 1] = g;
        output[offset + 2] = b;
        output[offset + 3] = a + alphaFac * (255 - a);
      }
    }
    return output;
  };

  /**
   * Fast separable convolution. A point spread function (PSF) is said to be
   * separable if it can be broken into two one-dimensional signals: a
   * vertical and a horizontal projection. The convolution is performed by
   * sliding the kernel over the image, generally starting at the top left
   * corner, so as to move the kernel through all the positions where the
   * kernel fits entirely within the boundaries of the image. Adapted from
   * https://github.com/kig/canvasfilters.
   * @param {pixels} pixels The pixels in a linear [r,g,b,a,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {array} horizWeights The horizontal weighting vector, e.g [-1,0,1].
   * @param {array} vertWeights The vertical vector, e.g [-1,0,1].
   * @param {number} opaque
   * @return {array} The convoluted pixels in a linear [r,g,b,a,...] array.
   */
  tracking.Image.separableConvolve = function(pixels, width, height, horizWeights, vertWeights, opaque) {
    var vertical = this.verticalConvolve(pixels, width, height, vertWeights, opaque);
    return this.horizontalConvolve(vertical, width, height, horizWeights, opaque);
  };

  /**
   * Compute image edges using Sobel operator. Computes the vertical and
   * horizontal gradients of the image and combines the computed images to
   * find edges in the image. The way we implement the Sobel filter here is by
   * first grayscaling the image, then taking the horizontal and vertical
   * gradients and finally combining the gradient images to make up the final
   * image. Adapted from https://github.com/kig/canvasfilters.
   * @param {pixels} pixels The pixels in a linear [r,g,b,a,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @return {array} The edge pixels in a linear [r,g,b,a,...] array.
   */
  tracking.Image.sobel = function(pixels, width, height) {
    pixels = this.grayscale(pixels, width, height, true);
    var output = new Float32Array(width * height * 4);
    var sobelSignVector = new Float32Array([-1, 0, 1]);
    var sobelScaleVector = new Float32Array([1, 2, 1]);
    var vertical = this.separableConvolve(pixels, width, height, sobelSignVector, sobelScaleVector);
    var horizontal = this.separableConvolve(pixels, width, height, sobelScaleVector, sobelSignVector);

    for (var i = 0; i < output.length; i += 4) {
      var v = vertical[i];
      var h = horizontal[i];
      var p = Math.sqrt(h * h + v * v);
      output[i] = p;
      output[i + 1] = p;
      output[i + 2] = p;
      output[i + 3] = 255;
    }

    return output;
  };

}());

(function() {
  /**
   * ViolaJones utility.
   * @static
   * @constructor
   */
  tracking.ViolaJones = {};

  /**
   * Holds the minimum area of intersection that defines when a rectangle is
   * from the same group. Often when a face is matched multiple rectangles are
   * classified as possible rectangles to represent the face, when they
   * intersects they are grouped as one face.
   * @type {number}
   * @default 0.5
   * @static
   */
  tracking.ViolaJones.REGIONS_OVERLAP = 0.5;

  /**
   * Holds the HAAR cascade classifiers converted from OpenCV training.
   * @type {array}
   * @static
   */
  tracking.ViolaJones.classifiers = {};

  /**
   * Detects through the HAAR cascade data rectangles matches.
   * @param {pixels} pixels The pixels in a linear [r,g,b,a,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {number} initialScale The initial scale to start the block
   *     scaling.
   * @param {number} scaleFactor The scale factor to scale the feature block.
   * @param {number} stepSize The block step size.
   * @param {number} edgesDensity Percentage density edges inside the
   *     classifier block. Value from [0.0, 1.0], defaults to 0.2. If specified
   *     edge detection will be applied to the image to prune dead areas of the
   *     image, this can improve significantly performance.
   * @param {number} data The HAAR cascade data.
   * @return {array} Found rectangles.
   * @static
   */
  tracking.ViolaJones.detect = function(pixels, width, height, initialScale, scaleFactor, stepSize, edgesDensity, data) {
    var total = 0;
    var rects = [];
    var integralImage = new Int32Array(width * height);
    var integralImageSquare = new Int32Array(width * height);
    var tiltedIntegralImage = new Int32Array(width * height);

    var integralImageSobel;
    if (edgesDensity > 0) {
      integralImageSobel = new Int32Array(width * height);
    }

    tracking.Image.computeIntegralImage(pixels, width, height, integralImage, integralImageSquare, tiltedIntegralImage, integralImageSobel);

    var minWidth = data[0];
    var minHeight = data[1];
    var scale = initialScale * scaleFactor;
    var blockWidth = (scale * minWidth) | 0;
    var blockHeight = (scale * minHeight) | 0;

    while (blockWidth < width && blockHeight < height) {
      var step = (scale * stepSize + 0.5) | 0;
      for (var i = 0; i < (height - blockHeight); i += step) {
        for (var j = 0; j < (width - blockWidth); j += step) {

          if (edgesDensity > 0) {
            if (this.isTriviallyExcluded(edgesDensity, integralImageSobel, i, j, width, blockWidth, blockHeight)) {
              continue;
            }
          }

          if (this.evalStages_(data, integralImage, integralImageSquare, tiltedIntegralImage, i, j, width, blockWidth, blockHeight, scale)) {
            rects[total++] = {
              width: blockWidth,
              height: blockHeight,
              x: j,
              y: i
            };
          }
        }
      }

      scale *= scaleFactor;
      blockWidth = (scale * minWidth) | 0;
      blockHeight = (scale * minHeight) | 0;
    }
    return this.mergeRectangles_(rects);
  };

  /**
   * Fast check to test whether the edges density inside the block is greater
   * than a threshold, if true it tests the stages. This can improve
   * significantly performance.
   * @param {number} edgesDensity Percentage density edges inside the
   *     classifier block.
   * @param {array} integralImageSobel The integral image of a sobel image.
   * @param {number} i Vertical position of the pixel to be evaluated.
   * @param {number} j Horizontal position of the pixel to be evaluated.
   * @param {number} width The image width.
   * @return {boolean} True whether the block at position i,j can be skipped,
   *     false otherwise.
   * @static
   * @protected
   */
  tracking.ViolaJones.isTriviallyExcluded = function(edgesDensity, integralImageSobel, i, j, width, blockWidth, blockHeight) {
    var wbA = i * width + j;
    var wbB = wbA + blockWidth;
    var wbD = wbA + blockHeight * width;
    var wbC = wbD + blockWidth;
    var blockEdgesDensity = (integralImageSobel[wbA] - integralImageSobel[wbB] - integralImageSobel[wbD] + integralImageSobel[wbC]) / (blockWidth * blockHeight * 255);
    if (blockEdgesDensity < edgesDensity) {
      return true;
    }
    return false;
  };

  /**
   * Evaluates if the block size on i,j position is a valid HAAR cascade
   * stage.
   * @param {number} data The HAAR cascade data.
   * @param {number} i Vertical position of the pixel to be evaluated.
   * @param {number} j Horizontal position of the pixel to be evaluated.
   * @param {number} width The image width.
   * @param {number} blockSize The block size.
   * @param {number} scale The scale factor of the block size and its original
   *     size.
   * @param {number} inverseArea The inverse area of the block size.
   * @return {boolean} Whether the region passes all the stage tests.
   * @private
   * @static
   */
  tracking.ViolaJones.evalStages_ = function(data, integralImage, integralImageSquare, tiltedIntegralImage, i, j, width, blockWidth, blockHeight, scale) {
    var inverseArea = 1.0 / (blockWidth * blockHeight);
    var wbA = i * width + j;
    var wbB = wbA + blockWidth;
    var wbD = wbA + blockHeight * width;
    var wbC = wbD + blockWidth;
    var mean = (integralImage[wbA] - integralImage[wbB] - integralImage[wbD] + integralImage[wbC]) * inverseArea;
    var variance = (integralImageSquare[wbA] - integralImageSquare[wbB] - integralImageSquare[wbD] + integralImageSquare[wbC]) * inverseArea - mean * mean;

    var standardDeviation = 1;
    if (variance > 0) {
      standardDeviation = Math.sqrt(variance);
    }

    var length = data.length;

    for (var w = 2; w < length; ) {
      var stageSum = 0;
      var stageThreshold = data[w++];
      var nodeLength = data[w++];

      while (nodeLength--) {
        var rectsSum = 0;
        var tilted = data[w++];
        var rectsLength = data[w++];

        for (var r = 0; r < rectsLength; r++) {
          var rectLeft = (j + data[w++] * scale + 0.5) | 0;
          var rectTop = (i + data[w++] * scale + 0.5) | 0;
          var rectWidth = (data[w++] * scale + 0.5) | 0;
          var rectHeight = (data[w++] * scale + 0.5) | 0;
          var rectWeight = data[w++];

          var w1;
          var w2;
          var w3;
          var w4;
          if (tilted) {
            // RectSum(r) = RSAT(x-h+w, y+w+h-1) + RSAT(x, y-1) - RSAT(x-h, y+h-1) - RSAT(x+w, y+w-1)
            w1 = (rectLeft - rectHeight + rectWidth) + (rectTop + rectWidth + rectHeight - 1) * width;
            w2 = rectLeft + (rectTop - 1) * width;
            w3 = (rectLeft - rectHeight) + (rectTop + rectHeight - 1) * width;
            w4 = (rectLeft + rectWidth) + (rectTop + rectWidth - 1) * width;
            rectsSum += (tiltedIntegralImage[w1] + tiltedIntegralImage[w2] - tiltedIntegralImage[w3] - tiltedIntegralImage[w4]) * rectWeight;
          } else {
            // RectSum(r) = SAT(x-1, y-1) + SAT(x+w-1, y+h-1) - SAT(x-1, y+h-1) - SAT(x+w-1, y-1)
            w1 = rectTop * width + rectLeft;
            w2 = w1 + rectWidth;
            w3 = w1 + rectHeight * width;
            w4 = w3 + rectWidth;
            rectsSum += (integralImage[w1] - integralImage[w2] - integralImage[w3] + integralImage[w4]) * rectWeight;
            // TODO: Review the code below to analyze performance when using it instead.
            // w1 = (rectLeft - 1) + (rectTop - 1) * width;
            // w2 = (rectLeft + rectWidth - 1) + (rectTop + rectHeight - 1) * width;
            // w3 = (rectLeft - 1) + (rectTop + rectHeight - 1) * width;
            // w4 = (rectLeft + rectWidth - 1) + (rectTop - 1) * width;
            // rectsSum += (integralImage[w1] + integralImage[w2] - integralImage[w3] - integralImage[w4]) * rectWeight;
          }
        }

        var nodeThreshold = data[w++];
        var nodeLeft = data[w++];
        var nodeRight = data[w++];

        if (rectsSum * inverseArea < nodeThreshold * standardDeviation) {
          stageSum += nodeLeft;
        } else {
          stageSum += nodeRight;
        }
      }

      if (stageSum < stageThreshold) {
        return false;
      }
    }
    return true;
  };

  /**
   * Postprocess the detected sub-windows in order to combine overlapping
   * detections into a single detection.
   * @param {array} rects
   * @return {array}
   * @private
   * @static
   */
  tracking.ViolaJones.mergeRectangles_ = function(rects) {
    var disjointSet = new tracking.DisjointSet(rects.length);

    for (var i = 0; i < rects.length; i++) {
      var r1 = rects[i];
      for (var j = 0; j < rects.length; j++) {
        var r2 = rects[j];
        if (tracking.Math.intersectRect(r1.x, r1.y, r1.x + r1.width, r1.y + r1.height, r2.x, r2.y, r2.x + r2.width, r2.y + r2.height)) {
          var x1 = Math.max(r1.x, r2.x);
          var y1 = Math.max(r1.y, r2.y);
          var x2 = Math.min(r1.x + r1.width, r2.x + r2.width);
          var y2 = Math.min(r1.y + r1.height, r2.y + r2.height);
          var overlap = (x1 - x2) * (y1 - y2);
          var area1 = (r1.width * r1.height);
          var area2 = (r2.width * r2.height);

          if ((overlap / (area1 * (area1 / area2)) >= this.REGIONS_OVERLAP) &&
            (overlap / (area2 * (area1 / area2)) >= this.REGIONS_OVERLAP)) {
            disjointSet.union(i, j);
          }
        }
      }
    }

    var map = {};
    for (var k = 0; k < disjointSet.length; k++) {
      var rep = disjointSet.find(k);
      if (!map[rep]) {
        map[rep] = {
          total: 1,
          width: rects[k].width,
          height: rects[k].height,
          x: rects[k].x,
          y: rects[k].y
        };
        continue;
      }
      map[rep].total++;
      map[rep].width += rects[k].width;
      map[rep].height += rects[k].height;
      map[rep].x += rects[k].x;
      map[rep].y += rects[k].y;
    }

    var result = [];
    Object.keys(map).forEach(function(key) {
      var rect = map[key];
      result.push({
        total: rect.total,
        width: (rect.width / rect.total + 0.5) | 0,
        height: (rect.height / rect.total + 0.5) | 0,
        x: (rect.x / rect.total + 0.5) | 0,
        y: (rect.y / rect.total + 0.5) | 0
      });
    });

    return result;
  };

}());

(function() {
  /**
   * Brief intends for "Binary Robust Independent Elementary Features".This
   * method generates a binary string for each keypoint found by an extractor
   * method.
   * @static
   * @constructor
   */
  tracking.Brief = {};

  /**
   * The set of binary tests is defined by the nd (x,y)-location pairs
   * uniquely chosen during the initialization. Values could vary between N =
   * 128,256,512. N=128 yield good compromises between speed, storage
   * efficiency, and recognition rate.
   * @type {number}
   */
  tracking.Brief.N = 512;

  /**
   * Caches coordinates values of (x,y)-location pairs uniquely chosen during
   * the initialization.
   * @type {Object.<number, Int32Array>}
   * @private
   * @static
   */
  tracking.Brief.randomImageOffsets_ = {};

  /**
   * Caches delta values of (x,y)-location pairs uniquely chosen during
   * the initialization.
   * @type {Int32Array}
   * @private
   * @static
   */
  tracking.Brief.randomWindowOffsets_ = null;

  /**
   * Generates a binary string for each found keypoints extracted using an
   * extractor method.
   * @param {array} The grayscale pixels in a linear [p1,p2,...] array.
   * @param {number} width The image width.
   * @param {array} keypoints
   * @return {Int32Array} Returns an array where for each four sequence int
   *     values represent the descriptor binary string (128 bits) necessary
   *     to describe the corner, e.g. [0,0,0,0, 0,0,0,0, ...].
   * @static
   */
  tracking.Brief.getDescriptors = function(pixels, width, keypoints) {
    // Optimizing divide by 32 operation using binary shift
    // (this.N >> 5) === this.N/32.
    var descriptors = new Int32Array((keypoints.length >> 1) * (this.N >> 5));
    var descriptorWord = 0;
    var offsets = this.getRandomOffsets_(width);
    var position = 0;

    for (var i = 0; i < keypoints.length; i += 2) {
      var w = width * keypoints[i + 1] + keypoints[i];

      var offsetsPosition = 0;
      for (var j = 0, n = this.N; j < n; j++) {
        if (pixels[offsets[offsetsPosition++] + w] < pixels[offsets[offsetsPosition++] + w]) {
          // The bit in the position `j % 32` of descriptorWord should be set to 1. We do
          // this by making an OR operation with a binary number that only has the bit
          // in that position set to 1. That binary number is obtained by shifting 1 left by
          // `j % 32` (which is the same as `j & 31` left) positions.
          descriptorWord |= 1 << (j & 31);
        }

        // If the next j is a multiple of 32, we will need to use a new descriptor word to hold
        // the next results.
        if (!((j + 1) & 31)) {
          descriptors[position++] = descriptorWord;
          descriptorWord = 0;
        }
      }
    }

    return descriptors;
  };

  /**
   * Matches sets of features {mi} and {m′j} extracted from two images taken
   * from similar, and often successive, viewpoints. A classical procedure
   * runs as follows. For each point {mi} in the first image, search in a
   * region of the second image around location {mi} for point {m′j}. The
   * search is based on the similarity of the local image windows, also known
   * as kernel windows, centered on the points, which strongly characterizes
   * the points when the images are sufficiently close. Once each keypoint is
   * described with its binary string, they need to be compared with the
   * closest matching point. Distance metric is critical to the performance of
   * in- trusion detection systems. Thus using binary strings reduces the size
   * of the descriptor and provides an interesting data structure that is fast
   * to operate whose similarity can be measured by the Hamming distance.
   * @param {array} keypoints1
   * @param {array} descriptors1
   * @param {array} keypoints2
   * @param {array} descriptors2
   * @return {Int32Array} Returns an array where the index is the corner1
   *     index coordinate, and the value is the corresponding match index of
   *     corner2, e.g. keypoints1=[x0,y0,x1,y1,...] and
   *     keypoints2=[x'0,y'0,x'1,y'1,...], if x0 matches x'1 and x1 matches x'0,
   *     the return array would be [3,0].
   * @static
   */
  tracking.Brief.match = function(keypoints1, descriptors1, keypoints2, descriptors2) {
    var len1 = keypoints1.length >> 1;
    var len2 = keypoints2.length >> 1;
    var matches = new Array(len1);

    for (var i = 0; i < len1; i++) {
      var min = Infinity;
      var minj = 0;
      for (var j = 0; j < len2; j++) {
        var dist = 0;
        // Optimizing divide by 32 operation using binary shift
        // (this.N >> 5) === this.N/32.
        for (var k = 0, n = this.N >> 5; k < n; k++) {
          dist += tracking.Math.hammingWeight(descriptors1[i * n + k] ^ descriptors2[j * n + k]);
        }
        if (dist < min) {
          min = dist;
          minj = j;
        }
      }
      matches[i] = {
        index1: i,
        index2: minj,
        keypoint1: [keypoints1[2 * i], keypoints1[2 * i + 1]],
        keypoint2: [keypoints2[2 * minj], keypoints2[2 * minj + 1]],
        confidence: 1 - min / this.N
      };
    }

    return matches;
  };

  /**
   * Removes matches outliers by testing matches on both directions.
   * @param {array} keypoints1
   * @param {array} descriptors1
   * @param {array} keypoints2
   * @param {array} descriptors2
   * @return {Int32Array} Returns an array where the index is the corner1
   *     index coordinate, and the value is the corresponding match index of
   *     corner2, e.g. keypoints1=[x0,y0,x1,y1,...] and
   *     keypoints2=[x'0,y'0,x'1,y'1,...], if x0 matches x'1 and x1 matches x'0,
   *     the return array would be [3,0].
   * @static
   */
  tracking.Brief.reciprocalMatch = function(keypoints1, descriptors1, keypoints2, descriptors2) {
    var matches = [];
    if (keypoints1.length === 0 || keypoints2.length === 0) {
      return matches;
    }

    var matches1 = tracking.Brief.match(keypoints1, descriptors1, keypoints2, descriptors2);
    var matches2 = tracking.Brief.match(keypoints2, descriptors2, keypoints1, descriptors1);
    for (var i = 0; i < matches1.length; i++) {
      if (matches2[matches1[i].index2].index2 === i) {
        matches.push(matches1[i]);
      }
    }
    return matches;
  };

  /**
   * Gets the coordinates values of (x,y)-location pairs uniquely chosen
   * during the initialization.
   * @return {array} Array with the random offset values.
   * @private
   */
  tracking.Brief.getRandomOffsets_ = function(width) {
    if (!this.randomWindowOffsets_) {
      var windowPosition = 0;
      var windowOffsets = new Int32Array(4 * this.N);
      for (var i = 0; i < this.N; i++) {
        windowOffsets[windowPosition++] = Math.round(tracking.Math.uniformRandom(-15, 16));
        windowOffsets[windowPosition++] = Math.round(tracking.Math.uniformRandom(-15, 16));
        windowOffsets[windowPosition++] = Math.round(tracking.Math.uniformRandom(-15, 16));
        windowOffsets[windowPosition++] = Math.round(tracking.Math.uniformRandom(-15, 16));
      }
      this.randomWindowOffsets_ = windowOffsets;
    }

    if (!this.randomImageOffsets_[width]) {
      var imagePosition = 0;
      var imageOffsets = new Int32Array(2 * this.N);
      for (var j = 0; j < this.N; j++) {
        imageOffsets[imagePosition++] = this.randomWindowOffsets_[4 * j] * width + this.randomWindowOffsets_[4 * j + 1];
        imageOffsets[imagePosition++] = this.randomWindowOffsets_[4 * j + 2] * width + this.randomWindowOffsets_[4 * j + 3];
      }
      this.randomImageOffsets_[width] = imageOffsets;
    }

    return this.randomImageOffsets_[width];
  };
}());

(function() {
  /**
   * FAST intends for "Features from Accelerated Segment Test". This method
   * performs a point segment test corner detection. The segment test
   * criterion operates by considering a circle of sixteen pixels around the
   * corner candidate p. The detector classifies p as a corner if there exists
   * a set of n contiguous pixelsin the circle which are all brighter than the
   * intensity of the candidate pixel Ip plus a threshold t, or all darker
   * than Ip − t.
   *
   *       15 00 01
   *    14          02
   * 13                03
   * 12       []       04
   * 11                05
   *    10          06
   *       09 08 07
   *
   * For more reference:
   * http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.60.3991&rep=rep1&type=pdf
   * @static
   * @constructor
   */
  tracking.Fast = {};

  /**
   * Holds the threshold to determine whether the tested pixel is brighter or
   * darker than the corner candidate p.
   * @type {number}
   * @default 40
   * @static
   */
  tracking.Fast.THRESHOLD = 40;

  /**
   * Caches coordinates values of the circle surrounding the pixel candidate p.
   * @type {Object.<number, Int32Array>}
   * @private
   * @static
   */
  tracking.Fast.circles_ = {};

  /**
   * Finds corners coordinates on the graysacaled image.
   * @param {array} The grayscale pixels in a linear [p1,p2,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {number} threshold to determine whether the tested pixel is brighter or
   *     darker than the corner candidate p. Default value is 40.
   * @return {array} Array containing the coordinates of all found corners,
   *     e.g. [x0,y0,x1,y1,...], where P(x0,y0) represents a corner coordinate.
   * @static
   */
  tracking.Fast.findCorners = function(pixels, width, height, opt_threshold) {
    var circleOffsets = this.getCircleOffsets_(width);
    var circlePixels = new Int32Array(16);
    var corners = [];

    if (opt_threshold === undefined) {
      opt_threshold = this.THRESHOLD;
    }

    // When looping through the image pixels, skips the first three lines from
    // the image boundaries to constrain the surrounding circle inside the image
    // area.
    for (var i = 3; i < height - 3; i++) {
      for (var j = 3; j < width - 3; j++) {
        var w = i * width + j;
        var p = pixels[w];

        // Loops the circle offsets to read the pixel value for the sixteen
        // surrounding pixels.
        for (var k = 0; k < 16; k++) {
          circlePixels[k] = pixels[w + circleOffsets[k]];
        }

        if (this.isCorner(p, circlePixels, opt_threshold)) {
          // The pixel p is classified as a corner, as optimization increment j
          // by the circle radius 3 to skip the neighbor pixels inside the
          // surrounding circle. This can be removed without compromising the
          // result.
          corners.push(j, i);
          j += 3;
        }
      }
    }

    return corners;
  };

  /**
   * Checks if the circle pixel is brighter than the candidate pixel p by
   * a threshold.
   * @param {number} circlePixel The circle pixel value.
   * @param {number} p The value of the candidate pixel p.
   * @param {number} threshold
   * @return {Boolean}
   * @static
   */
  tracking.Fast.isBrighter = function(circlePixel, p, threshold) {
    return circlePixel - p > threshold;
  };

  /**
   * Checks if the circle pixel is within the corner of the candidate pixel p
   * by a threshold.
   * @param {number} p The value of the candidate pixel p.
   * @param {number} circlePixel The circle pixel value.
   * @param {number} threshold
   * @return {Boolean}
   * @static
   */
  tracking.Fast.isCorner = function(p, circlePixels, threshold) {
    if (this.isTriviallyExcluded(circlePixels, p, threshold)) {
      return false;
    }

    for (var x = 0; x < 16; x++) {
      var darker = true;
      var brighter = true;

      for (var y = 0; y < 9; y++) {
        var circlePixel = circlePixels[(x + y) & 15];

        if (!this.isBrighter(p, circlePixel, threshold)) {
          brighter = false;
          if (darker === false) {
            break;
          }
        }

        if (!this.isDarker(p, circlePixel, threshold)) {
          darker = false;
          if (brighter === false) {
            break;
          }
        }
      }

      if (brighter || darker) {
        return true;
      }
    }

    return false;
  };

  /**
   * Checks if the circle pixel is darker than the candidate pixel p by
   * a threshold.
   * @param {number} circlePixel The circle pixel value.
   * @param {number} p The value of the candidate pixel p.
   * @param {number} threshold
   * @return {Boolean}
   * @static
   */
  tracking.Fast.isDarker = function(circlePixel, p, threshold) {
    return p - circlePixel > threshold;
  };

  /**
   * Fast check to test if the candidate pixel is a trivially excluded value.
   * In order to be a corner, the candidate pixel value should be darker or
   * brighter than 9-12 surrounding pixels, when at least three of the top,
   * bottom, left and right pixels are brighter or darker it can be
   * automatically excluded improving the performance.
   * @param {number} circlePixel The circle pixel value.
   * @param {number} p The value of the candidate pixel p.
   * @param {number} threshold
   * @return {Boolean}
   * @static
   * @protected
   */
  tracking.Fast.isTriviallyExcluded = function(circlePixels, p, threshold) {
    var count = 0;
    var circleBottom = circlePixels[8];
    var circleLeft = circlePixels[12];
    var circleRight = circlePixels[4];
    var circleTop = circlePixels[0];

    if (this.isBrighter(circleTop, p, threshold)) {
      count++;
    }
    if (this.isBrighter(circleRight, p, threshold)) {
      count++;
    }
    if (this.isBrighter(circleBottom, p, threshold)) {
      count++;
    }
    if (this.isBrighter(circleLeft, p, threshold)) {
      count++;
    }

    if (count < 3) {
      count = 0;
      if (this.isDarker(circleTop, p, threshold)) {
        count++;
      }
      if (this.isDarker(circleRight, p, threshold)) {
        count++;
      }
      if (this.isDarker(circleBottom, p, threshold)) {
        count++;
      }
      if (this.isDarker(circleLeft, p, threshold)) {
        count++;
      }
      if (count < 3) {
        return true;
      }
    }

    return false;
  };

  /**
   * Gets the sixteen offset values of the circle surrounding pixel.
   * @param {number} width The image width.
   * @return {array} Array with the sixteen offset values of the circle
   *     surrounding pixel.
   * @private
   */
  tracking.Fast.getCircleOffsets_ = function(width) {
    if (this.circles_[width]) {
      return this.circles_[width];
    }

    var circle = new Int32Array(16);

    circle[0] = -width - width - width;
    circle[1] = circle[0] + 1;
    circle[2] = circle[1] + width + 1;
    circle[3] = circle[2] + width + 1;
    circle[4] = circle[3] + width;
    circle[5] = circle[4] + width;
    circle[6] = circle[5] + width - 1;
    circle[7] = circle[6] + width - 1;
    circle[8] = circle[7] - 1;
    circle[9] = circle[8] - 1;
    circle[10] = circle[9] - width - 1;
    circle[11] = circle[10] - width - 1;
    circle[12] = circle[11] - width;
    circle[13] = circle[12] - width;
    circle[14] = circle[13] - width + 1;
    circle[15] = circle[14] - width + 1;

    this.circles_[width] = circle;
    return circle;
  };
}());

(function() {
  /**
   * Math utility.
   * @static
   * @constructor
   */
  tracking.Math = {};

  /**
   * Euclidean distance between two points P(x0, y0) and P(x1, y1).
   * @param {number} x0 Horizontal coordinate of P0.
   * @param {number} y0 Vertical coordinate of P0.
   * @param {number} x1 Horizontal coordinate of P1.
   * @param {number} y1 Vertical coordinate of P1.
   * @return {number} The euclidean distance.
   */
  tracking.Math.distance = function(x0, y0, x1, y1) {
    var dx = x1 - x0;
    var dy = y1 - y0;

    return Math.sqrt(dx * dx + dy * dy);
  };

  /**
   * Calculates the Hamming weight of a string, which is the number of symbols that are
   * different from the zero-symbol of the alphabet used. It is thus
   * equivalent to the Hamming distance from the all-zero string of the same
   * length. For the most typical case, a string of bits, this is the number
   * of 1's in the string.
   *
   * Example:
   *
   * <pre>
   *  Binary string     Hamming weight
   *   11101                 4
   *   11101010              5
   * </pre>
   *
   * @param {number} i Number that holds the binary string to extract the hamming weight.
   * @return {number} The hamming weight.
   */
  tracking.Math.hammingWeight = function(i) {
    i = i - ((i >> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >> 2) & 0x33333333);

    return ((i + (i >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
  };

  /**
   * Generates a random number between [a, b] interval.
   * @param {number} a
   * @param {number} b
   * @return {number}
   */
  tracking.Math.uniformRandom = function(a, b) {
    return a + Math.random() * (b - a);
  };

  /**
   * Tests if a rectangle intersects with another.
   *
   *  <pre>
   *  x0y0 --------       x2y2 --------
   *      |       |           |       |
   *      -------- x1y1       -------- x3y3
   * </pre>
   *
   * @param {number} x0 Horizontal coordinate of P0.
   * @param {number} y0 Vertical coordinate of P0.
   * @param {number} x1 Horizontal coordinate of P1.
   * @param {number} y1 Vertical coordinate of P1.
   * @param {number} x2 Horizontal coordinate of P2.
   * @param {number} y2 Vertical coordinate of P2.
   * @param {number} x3 Horizontal coordinate of P3.
   * @param {number} y3 Vertical coordinate of P3.
   * @return {boolean}
   */
  tracking.Math.intersectRect = function(x0, y0, x1, y1, x2, y2, x3, y3) {
    return !(x2 > x1 || x3 < x0 || y2 > y1 || y3 < y0);
  };

}());

(function() {
  /**
   * Matrix utility.
   * @static
   * @constructor
   */
  tracking.Matrix = {};

  /**
   * Loops the array organized as major-row order and executes `fn` callback
   * for each iteration. The `fn` callback receives the following parameters:
   * `(r,g,b,a,index,i,j)`, where `r,g,b,a` represents the pixel color with
   * alpha channel, `index` represents the position in the major-row order
   * array and `i,j` the respective indexes positions in two dimensions.
   * @param {array} pixels The pixels in a linear [r,g,b,a,...] array to loop
   *     through.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {function} fn The callback function for each pixel.
   * @param {number} opt_jump Optional jump for the iteration, by default it
   *     is 1, hence loops all the pixels of the array.
   * @static
   */
  tracking.Matrix.forEach = function(pixels, width, height, fn, opt_jump) {
    opt_jump = opt_jump || 1;
    for (var i = 0; i < height; i += opt_jump) {
      for (var j = 0; j < width; j += opt_jump) {
        var w = i * width * 4 + j * 4;
        fn.call(this, pixels[w], pixels[w + 1], pixels[w + 2], pixels[w + 3], w, i, j);
      }
    }
  };

}());

(function() {
  /**
   * EPnp utility.
   * @static
   * @constructor
   */
  tracking.EPnP = {};

  tracking.EPnP.solve = function(objectPoints, imagePoints, cameraMatrix) {};
}());

(function() {
  /**
   * Tracker utility.
   * @constructor
   * @extends {tracking.EventEmitter}
   */
  tracking.Tracker = function() {
    tracking.Tracker.base(this, 'constructor');
  };

  tracking.inherits(tracking.Tracker, tracking.EventEmitter);

  /**
   * Tracks the pixels on the array. This method is called for each video
   * frame in order to emit `track` event.
   * @param {Uint8ClampedArray} pixels The pixels data to track.
   * @param {number} width The pixels canvas width.
   * @param {number} height The pixels canvas height.
   */
  tracking.Tracker.prototype.track = function() {};
}());

(function() {
  /**
   * TrackerTask utility.
   * @constructor
   * @extends {tracking.EventEmitter}
   */
  tracking.TrackerTask = function(tracker) {
    tracking.TrackerTask.base(this, 'constructor');

    if (!tracker) {
      throw new Error('Tracker instance not specified.');
    }

    this.setTracker(tracker);
  };

  tracking.inherits(tracking.TrackerTask, tracking.EventEmitter);

  /**
   * Holds the tracker instance managed by this task.
   * @type {tracking.Tracker}
   * @private
   */
  tracking.TrackerTask.prototype.tracker_ = null;

  /**
   * Holds if the tracker task is in running.
   * @type {boolean}
   * @private
   */
  tracking.TrackerTask.prototype.running_ = false;

  /**
   * Gets the tracker instance managed by this task.
   * @return {tracking.Tracker}
   */
  tracking.TrackerTask.prototype.getTracker = function() {
    return this.tracker_;
  };

  /**
   * Returns true if the tracker task is in running, false otherwise.
   * @return {boolean}
   * @private
   */
  tracking.TrackerTask.prototype.inRunning = function() {
    return this.running_;
  };

  /**
   * Sets if the tracker task is in running.
   * @param {boolean} running
   * @private
   */
  tracking.TrackerTask.prototype.setRunning = function(running) {
    this.running_ = running;
  };

  /**
   * Sets the tracker instance managed by this task.
   * @return {tracking.Tracker}
   */
  tracking.TrackerTask.prototype.setTracker = function(tracker) {
    this.tracker_ = tracker;
  };

  /**
   * Emits a `run` event on the tracker task for the implementers to run any
   * child action, e.g. `requestAnimationFrame`.
   * @return {object} Returns itself, so calls can be chained.
   */
  tracking.TrackerTask.prototype.run = function() {
    var self = this;

    if (this.inRunning()) {
      return;
    }

    this.setRunning(true);
    this.reemitTrackEvent_ = function(event) {
      self.emit('track', event);
    };
    this.tracker_.on('track', this.reemitTrackEvent_);
    this.emit('run');
    return this;
  };

  /**
   * Emits a `stop` event on the tracker task for the implementers to stop any
   * child action being done, e.g. `requestAnimationFrame`.
   * @return {object} Returns itself, so calls can be chained.
   */
  tracking.TrackerTask.prototype.stop = function() {
    if (!this.inRunning()) {
      return;
    }

    this.setRunning(false);
    this.emit('stop');
    this.tracker_.removeListener('track', this.reemitTrackEvent_);
    return this;
  };
}());

(function() {
  /**
   * ColorTracker utility to track colored blobs in a frame using color
   * difference evaluation.
   * @constructor
   * @param {string|Array.<string>} opt_colors Optional colors to track.
   * @extends {tracking.Tracker}
   */
  tracking.ColorTracker = function(opt_colors) {
    tracking.ColorTracker.base(this, 'constructor');

    if (typeof opt_colors === 'string') {
      opt_colors = [opt_colors];
    }

    if (opt_colors) {
      opt_colors.forEach(function(color) {
        if (!tracking.ColorTracker.getColor(color)) {
          throw new Error('Color not valid, try `new tracking.ColorTracker("magenta")`.');
        }
      });
      this.setColors(opt_colors);
    }
  };

  tracking.inherits(tracking.ColorTracker, tracking.Tracker);

  /**
   * Holds the known colors.
   * @type {Object.<string, function>}
   * @private
   * @static
   */
  tracking.ColorTracker.knownColors_ = {};

  /**
   * Caches coordinates values of the neighbours surrounding a pixel.
   * @type {Object.<number, Int32Array>}
   * @private
   * @static
   */
  tracking.ColorTracker.neighbours_ = {};

  /**
   * Registers a color as known color.
   * @param {string} name The color name.
   * @param {function} fn The color function to test if the passed (r,g,b) is
   *     the desired color.
   * @static
   */
  tracking.ColorTracker.registerColor = function(name, fn) {
    tracking.ColorTracker.knownColors_[name] = fn;
  };

  /**
   * Gets the known color function that is able to test whether an (r,g,b) is
   * the desired color.
   * @param {string} name The color name.
   * @return {function} The known color test function.
   * @static
   */
  tracking.ColorTracker.getColor = function(name) {
    return tracking.ColorTracker.knownColors_[name];
  };

  /**
   * Holds the colors to be tracked by the `ColorTracker` instance.
   * @default ['magenta']
   * @type {Array.<string>}
   */
  tracking.ColorTracker.prototype.colors = ['magenta'];

  /**
   * Holds the minimum dimension to classify a rectangle.
   * @default 20
   * @type {number}
   */
  tracking.ColorTracker.prototype.minDimension = 20;

  /**
   * Holds the maximum dimension to classify a rectangle.
   * @default Infinity
   * @type {number}
   */
  tracking.ColorTracker.prototype.maxDimension = Infinity;


  /**
   * Holds the minimum group size to be classified as a rectangle.
   * @default 30
   * @type {number}
   */
  tracking.ColorTracker.prototype.minGroupSize = 30;

  /**
   * Calculates the central coordinate from the cloud points. The cloud points
   * are all points that matches the desired color.
   * @param {Array.<number>} cloud Major row order array containing all the
   *     points from the desired color, e.g. [x1, y1, c2, y2, ...].
   * @param {number} total Total numbers of pixels of the desired color.
   * @return {object} Object containing the x, y and estimated z coordinate of
   *     the blog extracted from the cloud points.
   * @private
   */
  tracking.ColorTracker.prototype.calculateDimensions_ = function(cloud, total) {
    var maxx = -1;
    var maxy = -1;
    var minx = Infinity;
    var miny = Infinity;

    for (var c = 0; c < total; c += 2) {
      var x = cloud[c];
      var y = cloud[c + 1];

      if (x < minx) {
        minx = x;
      }
      if (x > maxx) {
        maxx = x;
      }
      if (y < miny) {
        miny = y;
      }
      if (y > maxy) {
        maxy = y;
      }
    }

    return {
      width: maxx - minx,
      height: maxy - miny,
      x: minx,
      y: miny
    };
  };

  /**
   * Gets the colors being tracked by the `ColorTracker` instance.
   * @return {Array.<string>}
   */
  tracking.ColorTracker.prototype.getColors = function() {
    return this.colors;
  };

  /**
   * Gets the minimum dimension to classify a rectangle.
   * @return {number}
   */
  tracking.ColorTracker.prototype.getMinDimension = function() {
    return this.minDimension;
  };

  /**
   * Gets the maximum dimension to classify a rectangle.
   * @return {number}
   */
  tracking.ColorTracker.prototype.getMaxDimension = function() {
    return this.maxDimension;
  };

  /**
   * Gets the minimum group size to be classified as a rectangle.
   * @return {number}
   */
  tracking.ColorTracker.prototype.getMinGroupSize = function() {
    return this.minGroupSize;
  };

  /**
   * Gets the eight offset values of the neighbours surrounding a pixel.
   * @param {number} width The image width.
   * @return {array} Array with the eight offset values of the neighbours
   *     surrounding a pixel.
   * @private
   */
  tracking.ColorTracker.prototype.getNeighboursForWidth_ = function(width) {
    if (tracking.ColorTracker.neighbours_[width]) {
      return tracking.ColorTracker.neighbours_[width];
    }

    var neighbours = new Int32Array(8);

    neighbours[0] = -width * 4;
    neighbours[1] = -width * 4 + 4;
    neighbours[2] = 4;
    neighbours[3] = width * 4 + 4;
    neighbours[4] = width * 4;
    neighbours[5] = width * 4 - 4;
    neighbours[6] = -4;
    neighbours[7] = -width * 4 - 4;

    tracking.ColorTracker.neighbours_[width] = neighbours;

    return neighbours;
  };

  /**
   * Unites groups whose bounding box intersect with each other.
   * @param {Array.<Object>} rects
   * @private
   */
  tracking.ColorTracker.prototype.mergeRectangles_ = function(rects) {
    var intersects;
    var results = [];
    var minDimension = this.getMinDimension();
    var maxDimension = this.getMaxDimension();

    for (var r = 0; r < rects.length; r++) {
      var r1 = rects[r];
      intersects = true;
      for (var s = r + 1; s < rects.length; s++) {
        var r2 = rects[s];
        if (tracking.Math.intersectRect(r1.x, r1.y, r1.x + r1.width, r1.y + r1.height, r2.x, r2.y, r2.x + r2.width, r2.y + r2.height)) {
          intersects = false;
          var x1 = Math.min(r1.x, r2.x);
          var y1 = Math.min(r1.y, r2.y);
          var x2 = Math.max(r1.x + r1.width, r2.x + r2.width);
          var y2 = Math.max(r1.y + r1.height, r2.y + r2.height);
          r2.height = y2 - y1;
          r2.width = x2 - x1;
          r2.x = x1;
          r2.y = y1;
          break;
        }
      }

      if (intersects) {
        if (r1.width >= minDimension && r1.height >= minDimension) {
          if (r1.width <= maxDimension && r1.height <= maxDimension) {
            results.push(r1);
          }
        }
      }
    }

    return results;
  };

  /**
   * Sets the colors to be tracked by the `ColorTracker` instance.
   * @param {Array.<string>} colors
   */
  tracking.ColorTracker.prototype.setColors = function(colors) {
    this.colors = colors;
  };

  /**
   * Sets the minimum dimension to classify a rectangle.
   * @param {number} minDimension
   */
  tracking.ColorTracker.prototype.setMinDimension = function(minDimension) {
    this.minDimension = minDimension;
  };

  /**
   * Sets the maximum dimension to classify a rectangle.
   * @param {number} maxDimension
   */
  tracking.ColorTracker.prototype.setMaxDimension = function(maxDimension) {
    this.maxDimension = maxDimension;
  };

  /**
   * Sets the minimum group size to be classified as a rectangle.
   * @param {number} minGroupSize
   */
  tracking.ColorTracker.prototype.setMinGroupSize = function(minGroupSize) {
    this.minGroupSize = minGroupSize;
  };

  /**
   * Tracks the `Video` frames. This method is called for each video frame in
   * order to emit `track` event.
   * @param {Uint8ClampedArray} pixels The pixels data to track.
   * @param {number} width The pixels canvas width.
   * @param {number} height The pixels canvas height.
   */
  tracking.ColorTracker.prototype.track = function(pixels, width, height) {
    var self = this;
    var colors = this.getColors();

    if (!colors) {
      throw new Error('Colors not specified, try `new tracking.ColorTracker("magenta")`.');
    }

    var results = [];

    colors.forEach(function(color) {
      results = results.concat(self.trackColor_(pixels, width, height, color));
    });

    this.emit('track', {
      data: results
    });
  };

  /**
   * Find the given color in the given matrix of pixels using Flood fill
   * algorithm to determines the area connected to a given node in a
   * multi-dimensional array.
   * @param {Uint8ClampedArray} pixels The pixels data to track.
   * @param {number} width The pixels canvas width.
   * @param {number} height The pixels canvas height.
   * @param {string} color The color to be found
   * @private
   */
  tracking.ColorTracker.prototype.trackColor_ = function(pixels, width, height, color) {
    var colorFn = tracking.ColorTracker.knownColors_[color];
    var currGroup = new Int32Array(pixels.length >> 2);
    var currGroupSize;
    var currI;
    var currJ;
    var currW;
    var marked = new Int8Array(pixels.length);
    var minGroupSize = this.getMinGroupSize();
    var neighboursW = this.getNeighboursForWidth_(width);
    var queue = new Int32Array(pixels.length);
    var queuePosition;
    var results = [];
    var w = -4;

    if (!colorFn) {
      return results;
    }

    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        w += 4;

        if (marked[w]) {
          continue;
        }

        currGroupSize = 0;

        queuePosition = -1;
        queue[++queuePosition] = w;
        queue[++queuePosition] = i;
        queue[++queuePosition] = j;

        marked[w] = 1;

        while (queuePosition >= 0) {
          currJ = queue[queuePosition--];
          currI = queue[queuePosition--];
          currW = queue[queuePosition--];

          if (colorFn(pixels[currW], pixels[currW + 1], pixels[currW + 2], pixels[currW + 3], currW, currI, currJ)) {
            currGroup[currGroupSize++] = currJ;
            currGroup[currGroupSize++] = currI;

            for (var k = 0; k < neighboursW.length; k++) {
              var otherW = currW + neighboursW[k];
              var otherI = currI + neighboursI[k];
              var otherJ = currJ + neighboursJ[k];
              if (!marked[otherW] && otherI >= 0 && otherI < height && otherJ >= 0 && otherJ < width) {
                queue[++queuePosition] = otherW;
                queue[++queuePosition] = otherI;
                queue[++queuePosition] = otherJ;

                marked[otherW] = 1;
              }
            }
          }
        }

        if (currGroupSize >= minGroupSize) {
          var data = this.calculateDimensions_(currGroup, currGroupSize);
          if (data) {
            data.color = color;
            results.push(data);
          }
        }
      }
    }

    return this.mergeRectangles_(results);
  };

  // Default colors
  //===================

  tracking.ColorTracker.registerColor('cyan', function(r, g, b) {
    var thresholdGreen = 50,
      thresholdBlue = 70,
      dx = r - 0,
      dy = g - 255,
      dz = b - 255;

    if ((g - r) >= thresholdGreen && (b - r) >= thresholdBlue) {
      return true;
    }
    return dx * dx + dy * dy + dz * dz < 6400;
  });

  tracking.ColorTracker.registerColor('magenta', function(r, g, b) {
    var threshold = 50,
      dx = r - 255,
      dy = g - 0,
      dz = b - 255;

    if ((r - g) >= threshold && (b - g) >= threshold) {
      return true;
    }
    return dx * dx + dy * dy + dz * dz < 19600;
  });

  tracking.ColorTracker.registerColor('yellow', function(r, g, b) {
    var threshold = 50,
      dx = r - 255,
      dy = g - 255,
      dz = b - 0;

    if ((r - b) >= threshold && (g - b) >= threshold) {
      return true;
    }
    return dx * dx + dy * dy + dz * dz < 10000;
  });


  // Caching neighbour i/j offset values.
  //=====================================
  var neighboursI = new Int32Array([-1, -1, 0, 1, 1, 1, 0, -1]);
  var neighboursJ = new Int32Array([0, 1, 1, 1, 0, -1, -1, -1]);
}());

(function() {
  /**
   * ObjectTracker utility.
   * @constructor
   * @param {string|Array.<string|Array.<number>>} opt_classifiers Optional
   *     object classifiers to track.
   * @extends {tracking.Tracker}
   */
  tracking.ObjectTracker = function(opt_classifiers) {
    tracking.ObjectTracker.base(this, 'constructor');

    if (opt_classifiers) {
      if (!Array.isArray(opt_classifiers)) {
        opt_classifiers = [opt_classifiers];
      }

      if (Array.isArray(opt_classifiers)) {
        opt_classifiers.forEach(function(classifier, i) {
          if (typeof classifier === 'string') {
            opt_classifiers[i] = tracking.ViolaJones.classifiers[classifier];
          }
          if (!opt_classifiers[i]) {
            throw new Error('Object classifier not valid, try `new tracking.ObjectTracker("face")`.');
          }
        });
      }
    }

    this.setClassifiers(opt_classifiers);
  };

  tracking.inherits(tracking.ObjectTracker, tracking.Tracker);

  /**
   * Specifies the edges density of a block in order to decide whether to skip
   * it or not.
   * @default 0.2
   * @type {number}
   */
  tracking.ObjectTracker.prototype.edgesDensity = 0.2;

  /**
   * Specifies the initial scale to start the feature block scaling.
   * @default 1.0
   * @type {number}
   */
  tracking.ObjectTracker.prototype.initialScale = 1.0;

  /**
   * Specifies the scale factor to scale the feature block.
   * @default 1.25
   * @type {number}
   */
  tracking.ObjectTracker.prototype.scaleFactor = 1.25;

  /**
   * Specifies the block step size.
   * @default 1.5
   * @type {number}
   */
  tracking.ObjectTracker.prototype.stepSize = 1.5;

  /**
   * Gets the tracker HAAR classifiers.
   * @return {TypedArray.<number>}
   */
  tracking.ObjectTracker.prototype.getClassifiers = function() {
    return this.classifiers;
  };

  /**
   * Gets the edges density value.
   * @return {number}
   */
  tracking.ObjectTracker.prototype.getEdgesDensity = function() {
    return this.edgesDensity;
  };

  /**
   * Gets the initial scale to start the feature block scaling.
   * @return {number}
   */
  tracking.ObjectTracker.prototype.getInitialScale = function() {
    return this.initialScale;
  };

  /**
   * Gets the scale factor to scale the feature block.
   * @return {number}
   */
  tracking.ObjectTracker.prototype.getScaleFactor = function() {
    return this.scaleFactor;
  };

  /**
   * Gets the block step size.
   * @return {number}
   */
  tracking.ObjectTracker.prototype.getStepSize = function() {
    return this.stepSize;
  };

  /**
   * Tracks the `Video` frames. This method is called for each video frame in
   * order to emit `track` event.
   * @param {Uint8ClampedArray} pixels The pixels data to track.
   * @param {number} width The pixels canvas width.
   * @param {number} height The pixels canvas height.
   */
  tracking.ObjectTracker.prototype.track = function(pixels, width, height) {
    var self = this;
    var classifiers = this.getClassifiers();

    if (!classifiers) {
      throw new Error('Object classifier not specified, try `new tracking.ObjectTracker("face")`.');
    }

    var results = [];

    classifiers.forEach(function(classifier) {
      results = results.concat(tracking.ViolaJones.detect(pixels, width, height, self.getInitialScale(), self.getScaleFactor(), self.getStepSize(), self.getEdgesDensity(), classifier));
    });

    this.emit('track', {
      data: results
    });
  };

  /**
   * Sets the tracker HAAR classifiers.
   * @param {TypedArray.<number>} classifiers
   */
  tracking.ObjectTracker.prototype.setClassifiers = function(classifiers) {
    this.classifiers = classifiers;
  };

  /**
   * Sets the edges density.
   * @param {number} edgesDensity
   */
  tracking.ObjectTracker.prototype.setEdgesDensity = function(edgesDensity) {
    this.edgesDensity = edgesDensity;
  };

  /**
   * Sets the initial scale to start the block scaling.
   * @param {number} initialScale
   */
  tracking.ObjectTracker.prototype.setInitialScale = function(initialScale) {
    this.initialScale = initialScale;
  };

  /**
   * Sets the scale factor to scale the feature block.
   * @param {number} scaleFactor
   */
  tracking.ObjectTracker.prototype.setScaleFactor = function(scaleFactor) {
    this.scaleFactor = scaleFactor;
  };

  /**
   * Sets the block step size.
   * @param {number} stepSize
   */
  tracking.ObjectTracker.prototype.setStepSize = function(stepSize) {
    this.stepSize = stepSize;
  };

}());