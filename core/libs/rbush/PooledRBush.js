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

define(["require","exports","../../PooledArray","../quickselect/quickselect"],function(t,i,n,r){function a(t,i,n){if(!n)return i.indexOf(t);for(var r=0;r<i.length;r++)if(n(t,i[r]))return r;return-1}function e(t,i){o(t,0,t.children.length,i,t)}function o(t,i,n,r,a){a||(a=x(null,!0)),a.minX=1/0,a.minY=1/0,a.maxX=-1/0,a.maxY=-1/0;for(var e=i,o=void 0;e<n;e++)o=t.children[e],h(a,t.leaf?r(o):o);return a}function h(t,i){return t.minX=Math.min(t.minX,i.minX),t.minY=Math.min(t.minY,i.minY),t.maxX=Math.max(t.maxX,i.maxX),t.maxY=Math.max(t.maxY,i.maxY),t}function s(t,i){return t.minX-i.minX}function l(t,i){return t.minY-i.minY}function c(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function u(t){return t.maxX-t.minX+(t.maxY-t.minY)}function m(t,i){return(Math.max(i.maxX,t.maxX)-Math.min(i.minX,t.minX))*(Math.max(i.maxY,t.maxY)-Math.min(i.minY,t.minY))}function f(t,i){var n=Math.max(t.minX,i.minX),r=Math.max(t.minY,i.minY),a=Math.min(t.maxX,i.maxX),e=Math.min(t.maxY,i.maxY);return Math.max(0,a-n)*Math.max(0,e-r)}function p(t,i){return t.minX<=i.minX&&t.minY<=i.minY&&i.maxX<=t.maxX&&i.maxY<=t.maxY}function d(t,i){return i.minX<=t.maxX&&i.minY<=t.maxY&&i.maxX>=t.minX&&i.maxY>=t.minY}function x(t,i){return{children:t,height:1,leaf:i,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function v(t,i,n,a,e){for(var o=[i,n];o.length;)if(n=o.pop(),i=o.pop(),!(n-i<=a)){var h=i+Math.ceil((n-i)/a/2)*a;r(t,h,i,n,e),o.push(i,h,h,n)}}Object.defineProperty(i,"__esModule",{value:!0});var M=function(){function t(t,i){void 0===t&&(t=9),this.compareMinX=s,this.compareMinY=l,this.toBBox=function(t){return t},this._maxEntries=Math.max(4,t||9),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),i&&("function"==typeof i?this.toBBox=i:this._initFormat(i)),this.clear()}return t.prototype.destroy=function(){this.clear(),X.prune(),Y.prune(),_.prune(),B.prune()},t.prototype.all=function(t){this._all(this.data,t)},t.prototype.search=function(t,i){var n=this.data,r=this.toBBox;if(d(t,n))for(X.clear();n;){for(var a=0,e=n.children.length;a<e;a++){var o=n.children[a],h=n.leaf?r(o):o;d(t,h)&&(n.leaf?i(o):p(t,h)?this._all(o,i):X.push(o))}n=X.pop()}},t.prototype.collides=function(t){var i=this.data,n=this.toBBox;if(!d(t,i))return!1;for(X.clear();i;){for(var r=0,a=i.children.length;r<a;r++){var e=i.children[r],o=i.leaf?n(e):e;if(d(t,o)){if(i.leaf||p(t,o))return!0;X.push(e)}}i=X.pop()}return!1},t.prototype.load=function(t,i){if(void 0===i&&(i=t.length),!i)return this;if(i<this._minEntries){for(var n=0,r=i;n<r;n++)this.insert(t[n]);return this}var a=this._build(t.slice(0,i),0,i-1,0);if(this.data.children.length)if(this.data.height===a.height)this._splitRoot(this.data,a);else{if(this.data.height<a.height){var e=this.data;this.data=a,a=e}this._insert(a,this.data.height-a.height-1,!0)}else this.data=a;return this},t.prototype.insert=function(t){return t&&this._insert(t,this.data.height-1),this},t.prototype.clear=function(){return this.data=x([],!0),this},t.prototype.remove=function(t,i){if(!t)return this;var n,r,e,o,h=this.data,s=this.toBBox(t);for(_.clear(),B.clear();h||_.length;){if(h||(h=_.pop(),n=_.data[_.length-1],r=B.pop(),e=!0),h.leaf&&-1!==(o=a(t,h.children,i)))return h.children.splice(o,1),_.push(h),this._condense(_),this;e||h.leaf||!p(h,s)?n?(r++,h=n.children[r],e=!1):h=null:(_.push(h),B.push(r),r=0,n=h,h=h.children[0])}return this},t.prototype.toJSON=function(){return this.data},t.prototype.fromJSON=function(t){return this.data=t,this},t.prototype._all=function(t,i){for(Y.clear();t;){if(!0===t.leaf)for(var n=0,r=t.children;n<r.length;n++){var a=r[n];i(a)}else Y.pushArray(t.children);t=Y.pop()}},t.prototype._build=function(t,i,n,r){var a,o=n-i+1,h=this._maxEntries;if(o<=h)return a=x(t.slice(i,n+1),!0),e(a,this.toBBox),a;r||(r=Math.ceil(Math.log(o)/Math.log(h)),h=Math.ceil(o/Math.pow(h,r-1))),a=x([],!1),a.height=r;var s=Math.ceil(o/h),l=s*Math.ceil(Math.sqrt(h));v(t,i,n,l,this.compareMinX);for(var c=i;c<=n;c+=l){var u=Math.min(c+l-1,n);v(t,c,u,s,this.compareMinY);for(var m=c;m<=u;m+=s){var f=Math.min(m+s-1,u);a.children.push(this._build(t,m,f,r-1))}}return e(a,this.toBBox),a},t.prototype._chooseSubtree=function(t,i,n,r){for(;;){if(r.push(i),!0===i.leaf||r.length-1===n)break;for(var a=1/0,e=1/0,o=void 0,h=0,s=i.children.length;h<s;h++){var l=i.children[h],u=c(l),f=m(t,l)-u;f<e?(e=f,a=u<a?u:a,o=l):f===e&&u<a&&(a=u,o=l)}i=o||i.children[0]}return i},t.prototype._insert=function(t,i,n){var r=this.toBBox,a=n?t:r(t);_.clear();var e=this._chooseSubtree(a,this.data,i,_);for(e.children.push(t),h(e,a);i>=0&&_.data[i].children.length>this._maxEntries;)this._split(_,i),i--;this._adjustParentBBoxes(a,_,i)},t.prototype._split=function(t,i){var n=t.data[i],r=n.children.length,a=this._minEntries;this._chooseSplitAxis(n,a,r);var o=this._chooseSplitIndex(n,a,r),h=x(n.children.splice(o,n.children.length-o),n.leaf);h.height=n.height,e(n,this.toBBox),e(h,this.toBBox),i?t.data[i-1].children.push(h):this._splitRoot(n,h)},t.prototype._splitRoot=function(t,i){this.data=x([t,i],!1),this.data.height=t.height+1,e(this.data,this.toBBox)},t.prototype._chooseSplitIndex=function(t,i,n){var r,a,e;r=a=1/0;for(var h=i;h<=n-i;h++){var s=o(t,0,h,this.toBBox),l=o(t,h,n,this.toBBox),u=f(s,l),m=c(s)+c(l);u<r?(r=u,e=h,a=m<a?m:a):u===r&&m<a&&(a=m,e=h)}return e},t.prototype._chooseSplitAxis=function(t,i,n){var r=t.leaf?this.compareMinX:s,a=t.leaf?this.compareMinY:l;this._allDistMargin(t,i,n,r)<this._allDistMargin(t,i,n,a)&&t.children.sort(r)},t.prototype._allDistMargin=function(t,i,n,r){t.children.sort(r);for(var a=this.toBBox,e=o(t,0,i,a),s=o(t,n-i,n,a),l=u(e)+u(s),c=i;c<n-i;c++){var m=t.children[c];h(e,t.leaf?a(m):m),l+=u(e)}for(var c=n-i-1;c>=i;c--){var m=t.children[c];h(s,t.leaf?a(m):m),l+=u(s)}return l},t.prototype._adjustParentBBoxes=function(t,i,n){for(var r=n;r>=0;r--)h(i.data[r],t)},t.prototype._condense=function(t){for(var i=t.length-1,n=void 0;i>=0;i--)0===t.data[i].children.length?i>0?(n=t.data[i-1].children,n.splice(n.indexOf(t.data[i]),1)):this.clear():e(t.data[i],this.toBBox)},t.prototype._initFormat=function(t){var i=["return a"," - b",";"];this.compareMinX=new Function("a","b",i.join(t[0])),this.compareMinY=new Function("a","b",i.join(t[1])),this.toBBox=new Function("a","return {minX: a"+t[0]+", minY: a"+t[1]+", maxX: a"+t[2]+", maxY: a"+t[3]+"};")},t}();i.PooledRBush=M;var X=new n,Y=new n,_=new n,B=new n({deallocator:null});i.default=M});