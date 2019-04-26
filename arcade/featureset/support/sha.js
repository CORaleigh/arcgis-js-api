// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.11/esri/copyright.txt for details.

/**
 * @preserve A JavaScript implementation of the SHA family of hashes, as
 * defined in FIPS PUB 180-2 as well as the corresponding HMAC implementation
 * as defined in FIPS PUB 198a
 *
 * Copyright Brian Turek 2008-2015
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 *
 * Several functions taken from Paul Johnston
 */

define(["require","exports"],function(r,e){function n(r,e){var n,t,h,i,o=[],w=[],d=0;if("UTF8"===e)for(t=0;t<r.length;t+=1)for(n=r.charCodeAt(t),w=[],128>n?w.push(n):2048>n?(w.push(192|n>>>6),w.push(128|63&n)):55296>n||57344<=n?w.push(224|n>>>12,128|n>>>6&63,128|63&n):(t+=1,n=65536+((1023&n)<<10|1023&r.charCodeAt(t)),w.push(240|n>>>18,128|n>>>12&63,128|n>>>6&63,128|63&n)),h=0;h<w.length;h+=1){for(i=d>>>2;o.length<=i;)o.push(0);o[i]|=w[h]<<24-d%4*8,d+=1}else if("UTF16BE"===e||"UTF16LE"===e)for(t=0;t<r.length;t+=1){for(n=r.charCodeAt(t),"UTF16LE"===e&&(h=255&n,n=h<<8|n>>8),i=d>>>2;o.length<=i;)o.push(0);o[i]|=n<<16-d%4*8,d+=2}return{value:o,binLen:8*d}}function t(r){var e,n,t,h=[],i=r.length;if(0!=i%2)throw"String of HEX type must be in byte increments";for(e=0;e<i;e+=2){if(n=parseInt(r.substr(e,2),16),isNaN(n))throw"String of HEX type contains invalid characters";for(t=e>>>3;h.length<=t;)h.push(0);h[e>>>3]|=n<<24-e%8*4}return{value:h,binLen:4*i}}function h(r){var e,n,t,h=[];for(n=0;n<r.length;n+=1)e=r.charCodeAt(n),t=n>>>2,h.length<=t&&h.push(0),h[t]|=e<<24-n%4*8;return{value:h,binLen:8*r.length}}function i(r){var e,n,t,h,i,o,w,d=[],u=0,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";if(-1===r.search(/^[a-zA-Z0-9=+\/]+$/))throw"Invalid character in base-64 string";if(o=r.indexOf("="),r=r.replace(/\=/g,""),-1!==o&&o<r.length)throw"Invalid '=' found in base-64 string";for(n=0;n<r.length;n+=4){for(i=r.substr(n,4),h=0,t=0;t<i.length;t+=1)e=l.indexOf(i[t]),h|=e<<18-6*t;for(t=0;t<i.length-1;t+=1){for(w=u>>>2;d.length<=w;)d.push(0);d[w]|=(h>>>16-8*t&255)<<24-u%4*8,u+=1}}return{value:d,binLen:8*u}}function o(r,e){var n,t,h="0123456789abcdef",i="",o=4*r.length;for(n=0;n<o;n+=1)t=r[n>>>2]>>>8*(3-n%4),i+=h.charAt(t>>>4&15)+h.charAt(15&t);return e.outputUpper?i.toUpperCase():i}function w(r,e){var n,t,h,i,o,w,d="",u=4*r.length;for(n=0;n<u;n+=3)for(i=n+1>>>2,o=r.length<=i?0:r[i],i=n+2>>>2,w=r.length<=i?0:r[i],h=(r[n>>>2]>>>8*(3-n%4)&255)<<16|(o>>>8*(3-(n+1)%4)&255)<<8|w>>>8*(3-(n+2)%4)&255,t=0;t<4;t+=1)8*n+6*t<=32*r.length?d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(h>>>6*(3-t)&63):d+=e.b64Pad;return d}function d(r,e){var n,t,h="",i=4*r.length;for(n=0;n<i;n+=1)t=r[n>>>2]>>>8*(3-n%4)&255,h+=String.fromCharCode(t);return h}function u(r){var e={outputUpper:!1,b64Pad:"="};try{r.hasOwnProperty("outputUpper")&&(e.outputUpper=r.outputUpper),r.hasOwnProperty("b64Pad")&&(e.b64Pad=r.b64Pad)}catch(r){}if("boolean"!=typeof e.outputUpper)throw"Invalid outputUpper formatting option";if("string"!=typeof e.b64Pad)throw"Invalid b64Pad formatting option";return e}function l(r,e){return r<<e|r>>>32-e}function s(r,e){return r>>>e|r<<32-e}function f(r,e){var n=new I(r.highOrder,r.lowOrder);return 32>=e?new I(n.highOrder>>>e|n.lowOrder<<32-e&4294967295,n.lowOrder>>>e|n.highOrder<<32-e&4294967295):new I(n.lowOrder>>>e-32|n.highOrder<<64-e&4294967295,n.highOrder>>>e-32|n.lowOrder<<64-e&4294967295)}function O(r,e){return r>>>e}function a(r,e){return 32>=e?new I(r.highOrder>>>e,r.lowOrder>>>e|r.highOrder<<32-e&4294967295):new I(0,r.highOrder>>>e-32)}function g(r,e,n){return r^e^n}function c(r,e,n){return r&e^~r&n}function p(r,e,n){return new I(r.highOrder&e.highOrder^~r.highOrder&n.highOrder,r.lowOrder&e.lowOrder^~r.lowOrder&n.lowOrder)}function H(r,e,n){return r&e^r&n^e&n}function v(r,e,n){return new I(r.highOrder&e.highOrder^r.highOrder&n.highOrder^e.highOrder&n.highOrder,r.lowOrder&e.lowOrder^r.lowOrder&n.lowOrder^e.lowOrder&n.lowOrder)}function T(r){return s(r,2)^s(r,13)^s(r,22)}function b(r){var e=f(r,28),n=f(r,34),t=f(r,39);return new I(e.highOrder^n.highOrder^t.highOrder,e.lowOrder^n.lowOrder^t.lowOrder)}function S(r){return s(r,6)^s(r,11)^s(r,25)}function A(r){var e=f(r,14),n=f(r,18),t=f(r,41);return new I(e.highOrder^n.highOrder^t.highOrder,e.lowOrder^n.lowOrder^t.lowOrder)}function E(r){return s(r,7)^s(r,18)^O(r,3)}function m(r){var e=f(r,1),n=f(r,8),t=a(r,7);return new I(e.highOrder^n.highOrder^t.highOrder,e.lowOrder^n.lowOrder^t.lowOrder)}function B(r){return s(r,17)^s(r,19)^O(r,10)}function L(r){var e=f(r,19),n=f(r,61),t=a(r,6);return new I(e.highOrder^n.highOrder^t.highOrder,e.lowOrder^n.lowOrder^t.lowOrder)}function U(r,e){var n=(65535&r)+(65535&e);return(65535&(r>>>16)+(e>>>16)+(n>>>16))<<16|65535&n}function y(r,e,n,t){var h=(65535&r)+(65535&e)+(65535&n)+(65535&t);return(65535&(r>>>16)+(e>>>16)+(n>>>16)+(t>>>16)+(h>>>16))<<16|65535&h}function X(r,e,n,t,h){var i=(65535&r)+(65535&e)+(65535&n)+(65535&t)+(65535&h);return(65535&(r>>>16)+(e>>>16)+(n>>>16)+(t>>>16)+(h>>>16)+(i>>>16))<<16|65535&i}function F(r,e){var n,t,h,i;return n=(65535&r.lowOrder)+(65535&e.lowOrder),t=(r.lowOrder>>>16)+(e.lowOrder>>>16)+(n>>>16),h=(65535&t)<<16|65535&n,n=(65535&r.highOrder)+(65535&e.highOrder)+(t>>>16),t=(r.highOrder>>>16)+(e.highOrder>>>16)+(n>>>16),i=(65535&t)<<16|65535&n,new I(i,h)}function C(r,e,n,t){var h,i,o,w;return h=(65535&r.lowOrder)+(65535&e.lowOrder)+(65535&n.lowOrder)+(65535&t.lowOrder),i=(r.lowOrder>>>16)+(e.lowOrder>>>16)+(n.lowOrder>>>16)+(t.lowOrder>>>16)+(h>>>16),o=(65535&i)<<16|65535&h,h=(65535&r.highOrder)+(65535&e.highOrder)+(65535&n.highOrder)+(65535&t.highOrder)+(i>>>16),i=(r.highOrder>>>16)+(e.highOrder>>>16)+(n.highOrder>>>16)+(t.highOrder>>>16)+(h>>>16),w=(65535&i)<<16|65535&h,new I(w,o)}function P(r,e,n,t,h){var i,o,w,d;return i=(65535&r.lowOrder)+(65535&e.lowOrder)+(65535&n.lowOrder)+(65535&t.lowOrder)+(65535&h.lowOrder),o=(r.lowOrder>>>16)+(e.lowOrder>>>16)+(n.lowOrder>>>16)+(t.lowOrder>>>16)+(h.lowOrder>>>16)+(i>>>16),w=(65535&o)<<16|65535&i,i=(65535&r.highOrder)+(65535&e.highOrder)+(65535&n.highOrder)+(65535&t.highOrder)+(65535&h.highOrder)+(o>>>16),o=(r.highOrder>>>16)+(e.highOrder>>>16)+(n.highOrder>>>16)+(t.highOrder>>>16)+(h.highOrder>>>16)+(i>>>16),d=(65535&o)<<16|65535&i,new I(d,w)}function Y(r,e){var n,t,h,i,o,w,d,u,s,f,O=[],a=c,p=g,v=H,T=l,b=U,S=X,A=[1732584193,4023233417,2562383102,271733878,3285377520];for(f=15+(e+65>>>9<<4);r.length<=f;)r.push(0);for(r[e>>>5]|=128<<24-e%32,r[f]=e,s=r.length,d=0;d<s;d+=16){for(n=A[0],t=A[1],h=A[2],i=A[3],o=A[4],u=0;u<80;u+=1)O[u]=u<16?r[u+d]:T(O[u-3]^O[u-8]^O[u-14]^O[u-16],1),w=u<20?S(T(n,5),a(t,h,i),o,1518500249,O[u]):u<40?S(T(n,5),p(t,h,i),o,1859775393,O[u]):u<60?S(T(n,5),v(t,h,i),o,2400959708,O[u]):S(T(n,5),p(t,h,i),o,3395469782,O[u]),o=i,i=h,h=T(t,30),t=n,n=w;A[0]=b(n,A[0]),A[1]=b(t,A[1]),A[2]=b(h,A[2]),A[3]=b(i,A[3]),A[4]=b(o,A[4])}return A}function x(r,e,n){var t,h,i,o,w,d,u,l,s,f,O,a,g,Y,x,M,N,q,z,R,Z,j,D,G,J,K,Q,V,W,$,_,rr,er=[],nr=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],tr=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428],hr=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];if(("SHA-224"===n||"SHA-256"===n)&&2&k)a=64,g=15+(e+65>>>9<<4),M=16,N=1,Q=Number,q=U,z=y,R=X,Z=E,j=B,D=T,G=S,K=H,J=c,O="SHA-224"===n?tr:hr;else{if("SHA-384"!==n&&"SHA-512"!==n||!(4&k))throw"Unexpected error in SHA-2 implementation";a=80,g=31+(e+128>>>10<<5),M=32,N=2,Q=I,q=F,z=C,R=P,Z=m,j=L,D=b,G=A,K=v,J=p,nr=[new Q(nr[0],3609767458),new Q(nr[1],602891725),new Q(nr[2],3964484399),new Q(nr[3],2173295548),new Q(nr[4],4081628472),new Q(nr[5],3053834265),new Q(nr[6],2937671579),new Q(nr[7],3664609560),new Q(nr[8],2734883394),new Q(nr[9],1164996542),new Q(nr[10],1323610764),new Q(nr[11],3590304994),new Q(nr[12],4068182383),new Q(nr[13],991336113),new Q(nr[14],633803317),new Q(nr[15],3479774868),new Q(nr[16],2666613458),new Q(nr[17],944711139),new Q(nr[18],2341262773),new Q(nr[19],2007800933),new Q(nr[20],1495990901),new Q(nr[21],1856431235),new Q(nr[22],3175218132),new Q(nr[23],2198950837),new Q(nr[24],3999719339),new Q(nr[25],766784016),new Q(nr[26],2566594879),new Q(nr[27],3203337956),new Q(nr[28],1034457026),new Q(nr[29],2466948901),new Q(nr[30],3758326383),new Q(nr[31],168717936),new Q(nr[32],1188179964),new Q(nr[33],1546045734),new Q(nr[34],1522805485),new Q(nr[35],2643833823),new Q(nr[36],2343527390),new Q(nr[37],1014477480),new Q(nr[38],1206759142),new Q(nr[39],344077627),new Q(nr[40],1290863460),new Q(nr[41],3158454273),new Q(nr[42],3505952657),new Q(nr[43],106217008),new Q(nr[44],3606008344),new Q(nr[45],1432725776),new Q(nr[46],1467031594),new Q(nr[47],851169720),new Q(nr[48],3100823752),new Q(nr[49],1363258195),new Q(nr[50],3750685593),new Q(nr[51],3785050280),new Q(nr[52],3318307427),new Q(nr[53],3812723403),new Q(nr[54],2003034995),new Q(nr[55],3602036899),new Q(nr[56],1575990012),new Q(nr[57],1125592928),new Q(nr[58],2716904306),new Q(nr[59],442776044),new Q(nr[60],593698344),new Q(nr[61],3733110249),new Q(nr[62],2999351573),new Q(nr[63],3815920427),new Q(3391569614,3928383900),new Q(3515267271,566280711),new Q(3940187606,3454069534),new Q(4118630271,4000239992),new Q(116418474,1914138554),new Q(174292421,2731055270),new Q(289380356,3203993006),new Q(460393269,320620315),new Q(685471733,587496836),new Q(852142971,1086792851),new Q(1017036298,365543100),new Q(1126000580,2618297676),new Q(1288033470,3409855158),new Q(1501505948,4234509866),new Q(1607167915,987167468),new Q(1816402316,1246189591)],O="SHA-384"===n?[new Q(3418070365,tr[0]),new Q(1654270250,tr[1]),new Q(2438529370,tr[2]),new Q(355462360,tr[3]),new Q(1731405415,tr[4]),new Q(41048885895,tr[5]),new Q(3675008525,tr[6]),new Q(1203062813,tr[7])]:[new Q(hr[0],4089235720),new Q(hr[1],2227873595),new Q(hr[2],4271175723),new Q(hr[3],1595750129),new Q(hr[4],2917565137),new Q(hr[5],725511199),new Q(hr[6],4215389547),new Q(hr[7],327033209)]}for(;r.length<=g;)r.push(0);for(r[e>>>5]|=128<<24-e%32,r[g]=e,_=r.length,Y=0;Y<_;Y+=M){for(t=O[0],h=O[1],i=O[2],o=O[3],w=O[4],d=O[5],u=O[6],l=O[7],x=0;x<a;x+=1)x<16?($=x*N+Y,V=r.length<=$?0:r[$],W=r.length<=$+1?0:r[$+1],er[x]=new Q(V,W)):er[x]=z(j(er[x-2]),er[x-7],Z(er[x-15]),er[x-16]),s=R(l,G(w),J(w,d,u),nr[x],er[x]),f=q(D(t),K(t,h,i)),l=u,u=d,d=w,w=q(o,s),o=i,i=h,h=t,t=q(s,f);O[0]=q(t,O[0]),O[1]=q(h,O[1]),O[2]=q(i,O[2]),O[3]=q(o,O[3]),O[4]=q(w,O[4]),O[5]=q(d,O[5]),O[6]=q(u,O[6]),O[7]=q(l,O[7])}if("SHA-224"===n&&2&k)rr=[O[0],O[1],O[2],O[3],O[4],O[5],O[6]];else if("SHA-256"===n&&2&k)rr=O;else if("SHA-384"===n&&4&k)rr=[O[0].highOrder,O[0].lowOrder,O[1].highOrder,O[1].lowOrder,O[2].highOrder,O[2].lowOrder,O[3].highOrder,O[3].lowOrder,O[4].highOrder,O[4].lowOrder,O[5].highOrder,O[5].lowOrder];else{if(!("SHA-512"===n&&4&k))throw"Unexpected error in SHA-2 implementation";rr=[O[0].highOrder,O[0].lowOrder,O[1].highOrder,O[1].lowOrder,O[2].highOrder,O[2].lowOrder,O[3].highOrder,O[3].lowOrder,O[4].highOrder,O[4].lowOrder,O[5].highOrder,O[5].lowOrder,O[6].highOrder,O[6].lowOrder,O[7].highOrder,O[7].lowOrder]}return rr}var k=7,I=function(){function r(r,e){this.highOrder=r,this.lowOrder=e}return r}();return function(){function r(r,e,o){this.strBinLen=0,this.strToHash=null,this.utfType="";var w=null;if(this.strToHash=[0],this.strBinLen=0,this.utfType=o||"UTF8","UTF8"!==this.utfType&&"UTF16BE"!==this.utfType&&"UTF16LE"!==this.utfType)throw"encoding must be UTF8, UTF16BE, or UTF16LE";if("HEX"===e){if(0!=r.length%2)throw"srcString of HEX type must be in byte increments";w=t(r),this.strBinLen=w.binLen,this.strToHash=w.value}else if("TEXT"===e)w=n(r,this.utfType),this.strBinLen=w.binLen,this.strToHash=w.value;else if("B64"===e)w=i(r),this.strBinLen=w.binLen,this.strToHash=w.value;else{if("BYTES"!==e)throw"inputFormat must be HEX, TEXT, B64, or BYTES";w=h(r),this.strBinLen=w.binLen,this.strToHash=w.value}}return r.prototype.getHash=function(r,e,n,t){var h,i=null,l=this.strToHash.slice(),s=this.strBinLen;if(3===arguments.length?"number"!=typeof n&&(t=n,n=1):2===arguments.length&&(n=1),n!==parseInt(n,10)||1>n)throw"numRounds must a integer >= 1";switch(e){case"HEX":i=o;break;case"B64":i=w;break;case"BYTES":i=d;break;default:throw"format must be HEX, B64, or BYTES"}if("SHA-1"===r&&1&k)for(h=0;h<n;h+=1)l=Y(l,s),s=160;else if("SHA-224"===r&&2&k)for(h=0;h<n;h+=1)l=x(l,s,r),s=224;else if("SHA-256"===r&&2&k)for(h=0;h<n;h+=1)l=x(l,s,r),s=256;else if("SHA-384"===r&&4&k)for(h=0;h<n;h+=1)l=x(l,s,r),s=384;else{if(!("SHA-512"===r&&4&k))throw"Chosen SHA variant is not supported";for(h=0;h<n;h+=1)l=x(l,s,r),s=512}return i(l,u(t))},r.prototype.getHMAC=function(r,e,l,s,f){var O,a,g,c,p,H,v,T,b,S=[],A=[],E=null;switch(s){case"HEX":O=o;break;case"B64":O=w;break;case"BYTES":O=d;break;default:throw"outputFormat must be HEX, B64, or BYTES"}if("SHA-1"===l&&1&k)g=64,b=160;else if("SHA-224"===l&&2&k)g=64,b=224;else if("SHA-256"===l&&2&k)g=64,b=256;else if("SHA-384"===l&&4&k)g=128,b=384;else{if(!("SHA-512"===l&&4&k))throw"Chosen SHA variant is not supported";g=128,b=512}if("HEX"===e)E=t(r),T=E.binLen,a=E.value;else if("TEXT"===e)E=n(r,this.utfType),T=E.binLen,a=E.value;else if("B64"===e)E=i(r),T=E.binLen,a=E.value;else{if("BYTES"!==e)throw"inputFormat must be HEX, TEXT, B64, or BYTES";E=h(r),T=E.binLen,a=E.value}if(c=8*g,v=g/4-1,g<T/8){if("SHA-1"===l&&1&k)a=Y(a,T);else{if(!(6&k))throw"Unexpected error in HMAC implementation";a=x(a,T,l)}for(;a.length<=v;)a.push(0);a[v]&=4294967040}else if(g>T/8){for(;a.length<=v;)a.push(0);a[v]&=4294967040}for(p=0;p<=v;p+=1)S[p]=909522486^a[p],A[p]=1549556828^a[p];if("SHA-1"===l&&1&k)H=Y(A.concat(Y(S.concat(this.strToHash),c+this.strBinLen)),c+b);else{if(!(6&k))throw"Unexpected error in HMAC implementation";H=x(A.concat(x(S.concat(this.strToHash),c+this.strBinLen,l)),c+b,l)}return O(H,u(f))},r}()});