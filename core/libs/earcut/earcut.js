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

define([],function(){"use strict";function e(e,t,x){x=x||2;var i=t&&t.length,u=i?t[0]*x:e.length,v=n(e,0,u,x,!0),y=[];if(!v||v.next===v.prev)return y;var o,p,l,a,h,s,c;if(i&&(v=f(e,t,v,x)),e.length>80*x){o=l=e[0],p=a=e[1];for(var Z=x;Z<u;Z+=x)h=e[Z],s=e[Z+1],h<o&&(o=h),s<p&&(p=s),h>l&&(l=h),s>a&&(a=s);c=Math.max(l-o,a-p),c=0!==c?1/c:0}return r(v,y,x,o,p,c),y}function n(e,n,t,r,x){var i,u;if(x===A(e,n,t,r)>0)for(i=n;i<t;i+=r)u=m(i,e[i],e[i+1],u);else for(i=t-r;i>=n;i-=r)u=m(i,e[i],e[i+1],u);return u&&d(u,u.next)&&(j(u),u=u.next),u}function t(e,n){if(!e)return e;n||(n=e);var t,r=e;do{if(t=!1,r.steiner||!d(r,r.next)&&0!==g(r.prev,r,r.next))r=r.next;else{if(j(r),(r=n=r.prev)===r.next)break;t=!0}}while(t||r!==n);return n}function r(e,n,f,y,o,p,a){if(e){!a&&p&&l(e,y,o,p);for(var h,s,c=e;e.prev!==e.next;)if(h=e.prev,s=e.next,p?i(e,y,o,p):x(e))n.push(h.i/f),n.push(e.i/f),n.push(s.i/f),j(e),e=s.next,c=s.next;else if((e=s)===c){a?1===a?(e=u(e,n,f),r(e,n,f,y,o,p,2)):2===a&&v(e,n,f,y,o,p):r(t(e),n,f,y,o,p,1);break}}}function x(e){var n=e.prev,t=e,r=e.next;if(g(n,t,r)>=0)return!1;for(var x=e.next.next;x!==e.prev;){if(c(n.x,n.y,t.x,t.y,r.x,r.y,x.x,x.y)&&g(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function i(e,n,t,r){var x=e.prev,i=e,u=e.next;if(g(x,i,u)>=0)return!1;for(var v=x.x<i.x?x.x<u.x?x.x:u.x:i.x<u.x?i.x:u.x,f=x.y<i.y?x.y<u.y?x.y:u.y:i.y<u.y?i.y:u.y,y=x.x>i.x?x.x>u.x?x.x:u.x:i.x>u.x?i.x:u.x,o=x.y>i.y?x.y>u.y?x.y:u.y:i.y>u.y?i.y:u.y,p=h(v,f,n,t,r),l=h(y,o,n,t,r),a=e.prevZ,s=e.nextZ;a&&a.z>=p&&s&&s.z<=l;){if(a!==e.prev&&a!==e.next&&c(x.x,x.y,i.x,i.y,u.x,u.y,a.x,a.y)&&g(a.prev,a,a.next)>=0)return!1;if(a=a.prevZ,s!==e.prev&&s!==e.next&&c(x.x,x.y,i.x,i.y,u.x,u.y,s.x,s.y)&&g(s.prev,s,s.next)>=0)return!1;s=s.nextZ}for(;a&&a.z>=p;){if(a!==e.prev&&a!==e.next&&c(x.x,x.y,i.x,i.y,u.x,u.y,a.x,a.y)&&g(a.prev,a,a.next)>=0)return!1;a=a.prevZ}for(;s&&s.z<=l;){if(s!==e.prev&&s!==e.next&&c(x.x,x.y,i.x,i.y,u.x,u.y,s.x,s.y)&&g(s.prev,s,s.next)>=0)return!1;s=s.nextZ}return!0}function u(e,n,t){var r=e;do{var x=r.prev,i=r.next.next;!d(x,i)&&w(x,r,r.next,i)&&b(x,i)&&b(i,x)&&(n.push(x.i/t),n.push(r.i/t),n.push(i.i/t),j(r),j(r.next),r=e=i),r=r.next}while(r!==e);return r}function v(e,n,x,i,u,v){var f=e;do{for(var y=f.next.next;y!==f.prev;){if(f.i!==y.i&&Z(f,y)){var o=k(f,y);return f=t(f,f.next),o=t(o,o.next),r(f,n,x,i,u,v),void r(o,n,x,i,u,v)}y=y.next}f=f.next}while(f!==e)}function f(e,r,x,i){var u,v,f,p,l,a=[];for(u=0,v=r.length;u<v;u++)f=r[u]*i,p=u<v-1?r[u+1]*i:e.length,l=n(e,f,p,i,!1),l===l.next&&(l.steiner=!0),a.push(s(l));for(a.sort(y),u=0;u<a.length;u++)o(a[u],x),x=t(x,x.next);return x}function y(e,n){return e.x-n.x}function o(e,n){if(n=p(e,n)){var r=k(n,e);t(r,r.next)}}function p(e,n){var t,r=n,x=e.x,i=e.y,u=-1/0;do{if(i<=r.y&&i>=r.next.y&&r.next.y!==r.y){var v=r.x+(i-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(v<=x&&v>u){if(u=v,v===x){if(i===r.y)return r;if(i===r.next.y)return r.next}t=r.x<r.next.x?r:r.next}}r=r.next}while(r!==n);if(!t)return null;if(x===u)return t.prev;var f,y=t,o=t.x,p=t.y,l=1/0;for(r=t.next;r!==y;)x>=r.x&&r.x>=o&&x!==r.x&&c(i<p?x:u,i,o,p,i<p?u:x,i,r.x,r.y)&&((f=Math.abs(i-r.y)/(x-r.x))<l||f===l&&r.x>t.x)&&b(r,e)&&(t=r,l=f),r=r.next;return t}function l(e,n,t,r){var x=e;do{null===x.z&&(x.z=h(x.x,x.y,n,t,r)),x.prevZ=x.prev,x.nextZ=x.next,x=x.next}while(x!==e);x.prevZ.nextZ=null,x.prevZ=null,a(x)}function a(e){var n,t,r,x,i,u,v,f,y=1;do{for(t=e,e=null,i=null,u=0;t;){for(u++,r=t,v=0,n=0;n<y&&(v++,r=r.nextZ);n++);for(f=y;v>0||f>0&&r;)0!==v&&(0===f||!r||t.z<=r.z)?(x=t,t=t.nextZ,v--):(x=r,r=r.nextZ,f--),i?i.nextZ=x:e=x,x.prevZ=i,i=x;t=r}i.nextZ=null,y*=2}while(u>1);return e}function h(e,n,t,r,x){return e=32767*(e-t)*x,n=32767*(n-r)*x,e=16711935&(e|e<<8),e=252645135&(e|e<<4),e=858993459&(e|e<<2),e=1431655765&(e|e<<1),n=16711935&(n|n<<8),n=252645135&(n|n<<4),n=858993459&(n|n<<2),n=1431655765&(n|n<<1),e|n<<1}function s(e){var n=e,t=e;do{n.x<t.x&&(t=n),n=n.next}while(n!==e);return t}function c(e,n,t,r,x,i,u,v){return(x-u)*(n-v)-(e-u)*(i-v)>=0&&(e-u)*(r-v)-(t-u)*(n-v)>=0&&(t-u)*(i-v)-(x-u)*(r-v)>=0}function Z(e,n){return e.next.i!==n.i&&e.prev.i!==n.i&&!z(e,n)&&b(e,n)&&b(n,e)&&M(e,n)}function g(e,n,t){return(n.y-e.y)*(t.x-n.x)-(n.x-e.x)*(t.y-n.y)}function d(e,n){return e.x===n.x&&e.y===n.y}function w(e,n,t,r){return!!(d(e,n)&&d(t,r)||d(e,r)&&d(t,n))||g(e,n,t)>0!=g(e,n,r)>0&&g(t,r,e)>0!=g(t,r,n)>0}function z(e,n){var t=e;do{if(t.i!==e.i&&t.next.i!==e.i&&t.i!==n.i&&t.next.i!==n.i&&w(t,t.next,e,n))return!0;t=t.next}while(t!==e);return!1}function b(e,n){return g(e.prev,e,e.next)<0?g(e,n,e.next)>=0&&g(e,e.prev,n)>=0:g(e,n,e.prev)<0||g(e,e.next,n)<0}function M(e,n){var t=e,r=!1,x=(e.x+n.x)/2,i=(e.y+n.y)/2;do{t.y>i!=t.next.y>i&&t.next.y!==t.y&&x<(t.next.x-t.x)*(i-t.y)/(t.next.y-t.y)+t.x&&(r=!r),t=t.next}while(t!==e);return r}function k(e,n){var t=new q(e.i,e.x,e.y),r=new q(n.i,n.x,n.y),x=e.next,i=n.prev;return e.next=n,n.prev=e,t.next=x,x.prev=t,r.next=t,t.prev=r,i.next=r,r.prev=i,r}function m(e,n,t,r){var x=new q(e,n,t);return r?(x.next=r.next,x.prev=r,r.next.prev=x,r.next=x):(x.prev=x,x.next=x),x}function j(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function q(e,n,t){this.i=e,this.x=n,this.y=t,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function A(e,n,t,r){for(var x=0,i=n,u=t-r;i<t;i+=r)x+=(e[u]-e[i])*(e[i+1]+e[u+1]),u=i;return x}return e.deviation=function(e,n,t,r){var x=n&&n.length,i=x?n[0]*t:e.length,u=Math.abs(A(e,0,i,t));if(x)for(var v=0,f=n.length;v<f;v++){var y=n[v]*t,o=v<f-1?n[v+1]*t:e.length;u-=Math.abs(A(e,y,o,t))}var p=0;for(v=0;v<r.length;v+=3){var l=r[v]*t,a=r[v+1]*t,h=r[v+2]*t;p+=Math.abs((e[l]-e[h])*(e[a+1]-e[l+1])-(e[l]-e[a])*(e[h+1]-e[l+1]))}return 0===u&&0===p?0:Math.abs((p-u)/u)},e.flatten=function(e){for(var n=e[0][0].length,t={vertices:[],holes:[],dimensions:n},r=0,x=0;x<e.length;x++){for(var i=0;i<e[x].length;i++)for(var u=0;u<n;u++)t.vertices.push(e[x][i][u]);x>0&&(r+=e[x-1].length,t.holes.push(r))}return t},e});