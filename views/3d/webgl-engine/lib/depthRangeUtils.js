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

define(["require","exports","../../../../core/PooledArray","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4","../../../../core/libs/gl-matrix-2/vec4f64","../../support/geometryUtils","../../support/mathUtils","./ComponentUtils","./depthRange","./Util"],function(e,t,r,a,n,i,o,s,f,h,c,u,l,d){function g(e,t,r){if(t.size<R)return F.compute(e,t);var a=l.empty();for(var n in r){var i=r[n];i.isVisible&&l.union(a,v(e,i))}return a}function v(e,t){if(t.isVisible){var r=l.empty(),a=t.getObjects();return t.getSpatialQueryAccelerator()?m(r,e,t.getSpatialQueryAccelerator()):p(r,e,a),r}}function m(e,t,r){var a=t.eye,n=t.viewForward,i=t.frustum,o=function(e){return!e.areAllComponentsHidden()},s=r.objectCount;if(s<B)l.set(E,t.near,Math.min(e.near,t.far)),r.forEachInDepthRange(a,n,"front-to-back",E,function(r,a){b(e,t,r),E.far=e.near,a.setRange(E)},i,o),l.set(E,Math.max(e.far,t.near),t.far),r.forEachInDepthRange(a,n,"back-to-front",E,function(r,a){b(e,t,r),E.near=e.far,a.setRange(E)},i,o);else{var f=Math.max(Math.min(s,M),Math.ceil(s*x)),h=r.findClosest(n,"front-to-back",i,o,f),c=r.findClosest(n,"back-to-front",i,o,f);h&&c&&(w(e,t,h.getCenter(),h.getBSRadius()),w(e,t,c.getCenter(),c.getBSRadius()))}}function p(e,t,r){D.clear(),r.forEach(function(e){e.areAllComponentsHidden()||D.add(e)}),D.empty||(D.sort(t),l.set(E,t.near,Math.min(e.near,t.far)),D.forEachInDepthRange(E,"front-to-back",function(r,a,n){a<e.near&&b(e,t,r)}),l.set(E,Math.max(e.far,t.near),t.far),D.forEachInDepthRange(E,"back-to-front",function(t,r,a){e.far=Math.max(e.far,a)}))}function b(e,t,r){if(!r.areAllComponentsHidden()&&h.frustum.intersectsSphere(t.frustum.planes,h.sphere.wrap(r.getBSRadius(),r.getCenter()))){var n=r.objectTransformation,i=I;r.geometryRecords.forEach(function(r){a.mat4.multiply(i,n,r.getShaderTransformation());var o=c.maxScale(i);y(e,t,r.geometry.boundingInfo,i,o)})}}function y(e,t,r,a,n){var o=t.eye,s=t.viewForward;i.vec3.transformMat4(_,r.center,a);var f=s[0]*(_[0]-o[0])+s[1]*(_[1]-o[1])+s[2]*(_[2]-o[2]),c=r.bsRadius*n;if(!(f-c>e.near&&f+c<e.far)&&h.frustum.intersectsSphere(t.frustum.planes,h.sphere.wrap(c,_)))if(r.bsRadius>C&&r.getChildren())for(var u=r.getChildren(),l=0;l<8;++l)u[l]&&y(e,t,u[l],a,n);else k.unionDepthRangeWithAABB(e,t.viewProjectionMatrix,a,r.bbMin,r.bbMax)}function w(e,t,r,a){var n=t.eye,i=t.viewForward,o=(r[0]-n[0])*i[0]+(r[1]-n[1])*i[1]+(r[2]-n[2])*i[2];e.near=Math.min(e.near,o-a),e.far=Math.max(e.far,o+a)}Object.defineProperty(t,"__esModule",{value:!0});var R=1e4,C=100,B=500,M=500,x=.1;t.depthRangeFromScene=g,t.depthRangeFromLayer=v;var S=function(){function e(){this._items=new r({allocator:function(e){return e||{obj:null,distance:0,near:0,far:0}},deallocator:function(e){return e.obj=null,e.distance=0,e.near=0,e.far=0,e}})}return Object.defineProperty(e.prototype,"length",{get:function(){return this._items.length},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"empty",{get:function(){return 0===this._items.length},enumerable:!0,configurable:!0}),e.prototype.clear=function(){this._items.clear()},e.prototype.add=function(e){this._items.pushNew().obj=e},e.prototype.sort=function(e){var t=e.eye,r=e.viewForward;this._items.forEach(function(e){var a=e.obj,n=a.getCenter(),i=a.getBSRadius(),o=(n[0]-t[0])*r[0]+(n[1]-t[1])*r[1]+(n[2]-t[2])*r[2];e.distance=o,e.near=o-i,e.far=o+i}),this._items.sort(function(e,t){return e.distance-t.distance})},e.prototype.forEachInDepthRange=function(e,t,r){if("front-to-back"===t)for(var a=0;a<this._items.length;++a){var n=this._items.data[a];n.far<e.near||n.near>e.far||r(n.obj,n.near,n.far)}else for(var a=this._items.length-1;a>=0;--a){var n=this._items.data[a];n.far<e.near||n.near>e.far||r(n.obj,n.near,n.far)}},e}(),j=function(){function e(){this.view=n.mat4f64.create(),this.viewProj=n.mat4f64.create(),this.frustum=h.frustum.create(),this.geometries=[],this.near=[],this.far=[],this.nearCandidates=[],this.farCandidates=[],this.range={near:0,far:0},this.looseRange={near:0,far:0}}return e.prototype.compute=function(e,t){var r=this;this.reset(),a.mat4.copy(this.view,e.viewMatrix),a.mat4.multiply(this.viewProj,e.projectionMatrix,this.view),h.frustum.copy(e.frustum,this.frustum);var n=this.view,i=n[2],o=n[6],s=n[10],f=n[14],c=this.range,l=0;if(t.forEach(function(e){var t=e.instanceParameters.componentVisibilities,a=e.componentOffsets;if(!u.isAllHidden(t,a)&&e.castShadow){var n,h;e.hasShaderTransformation?(n=e.getBoundingSphere(e.getShaderTransformation(),1,_),h=_):(n=e.bsRadius,h=e.center);var c=i*h[0]+o*h[1]+s*h[2]+f,d=c-n,g=c+n;r.geometries[l]=e,r.near[l]=-g,r.far[l]=-d,++l}}),0===this.geometries.length)return c;for(var d=0;d<this.geometries.length;++d)this.near[d]>c.far&&(c.far=this.near[d]),this.near[d]>2&&this.far[d]<c.near&&(c.near=this.far[d]);var g=this.looseRange;g.near=Math.max(.5*c.near,2),g.far=2*c.far;for(var v=0,m=0,d=0;d<this.geometries.length;++d)this.near[d]<c.near&&(this.near[d]>=g.near?c.near=this.near[d]:this.nearCandidates[v++]=d),this.far[d]>c.far&&(this.far[d]<=g.far?c.far=this.far[d]:this.farCandidates[m++]=d);if(0===this.nearCandidates.length&&0===this.farCandidates.length)return c;this.nearCandidates.sort(function(e,t){return r.near[e]<r.near[t]?-1:r.near[e]>r.near[t]?1:0}),this.farCandidates.sort(function(e,t){return r.far[e]<r.far[t]?1:r.far[e]>r.far[t]?-1:0});for(var d=0;d<this.nearCandidates.length;++d){var p=this.nearCandidates[d];if(this.near[p]<c.near){var b=this.geometries[p],y=b.boundingInfo;this.includeNearBoundingInfoRec(y,b.getShaderTransformation())}}for(var d=0;d<this.farCandidates.length;++d){var p=this.farCandidates[d];if(this.far[p]>c.far){var b=this.geometries[p],y=b.boundingInfo;this.includeFarBoundingInfoRec(y,b.getShaderTransformation())}}return c},e.prototype.reset=function(){this.geometries.length=0,this.near.length=0,this.far.length=0,this.nearCandidates.length=0,this.farCandidates.length=0,this.range.near=Number.MAX_VALUE,this.range.far=-Number.MAX_VALUE},e.prototype.includeNearBoundingInfoRec=function(e,t){var r=e.getBSRadius(),a=e.getCenter();i.vec3.transformMat4(_,a,t);var n=c.maxScale(t),o=_[0],s=_[1],f=_[2];r*=n;var h=this.frustum.planes;if(!(h[0][0]*o+h[0][1]*s+h[0][2]*f+h[0][3]>r||h[1][0]*o+h[1][1]*s+h[1][2]*f+h[1][3]>r||h[2][0]*o+h[2][1]*s+h[2][2]*f+h[2][3]>r||h[3][0]*o+h[3][1]*s+h[3][2]*f+h[3][3]>r)){var u=this.view[2]*o+this.view[6]*s+this.view[10]*f+this.view[14],l=u-r,d=u+r;if(!(-l<2||-d>=this.range.near)){if(-d>this.looseRange.near)return void(this.range.near=-d);if(r>C){var g=e.getChildren();if(void 0!==g){for(var v=0;v<8;++v)void 0!==g[v]&&this.includeNearBoundingInfoRec(g[v],t);return}}k.unionDepthRangeWithAABB(this.range,this.viewProj,t,e.getBBMin(),e.getBBMax())}}},e.prototype.includeFarBoundingInfoRec=function(e,t){var r=e.getBSRadius(),a=e.getCenter();i.vec3.transformMat4(_,a,t);var n=c.maxScale(t),o=_[0],s=_[1],f=_[2];r*=n;var h=this.frustum.planes;if(!(h[0][0]*o+h[0][1]*s+h[0][2]*f+h[0][3]>r||h[1][0]*o+h[1][1]*s+h[1][2]*f+h[1][3]>r||h[2][0]*o+h[2][1]*s+h[2][2]*f+h[2][3]>r||h[3][0]*o+h[3][1]*s+h[3][2]*f+h[3][3]>r)){var u=this.view[2]*o+this.view[6]*s+this.view[10]*f+this.view[14],l=u-r;if(!(-l<=this.range.far)){if(-l<this.looseRange.far)return void(this.range.far=-l);if(r>C){var d=e.getChildren();if(void 0!==d){for(var g=0;g<8;++g)void 0!==d[g]&&this.includeFarBoundingInfoRec(d[g],t);return}}k.unionDepthRangeWithAABB(this.range,this.viewProj,t,e.getBBMin(),e.getBBMax())}}},e}();t.DepthRangeFromRenderGeometries=j;var A=function(){function e(){this.modelViewProj=n.mat4f64.create(),this.clipPosition=[f.vec4f64.create(),f.vec4f64.create(),f.vec4f64.create(),f.vec4f64.create(),f.vec4f64.create(),f.vec4f64.create(),f.vec4f64.create(),f.vec4f64.create()]}return e.prototype.unionDepthRangeWithAABB=function(e,t,r,n,i){var o=this.modelViewProj;a.mat4.multiply(o,t,r);for(var s=!1,f=0;f<8;++f){var h=this.clipPosition[f],c=0===f||3===f||4===f||7===f?n[0]:i[0],u=0===f||1===f||4===f||5===f?n[1]:i[1],l=f<4?n[2]:i[2];h[0]=o[0]*c+o[4]*u+o[8]*l+o[12],h[1]=o[1]*c+o[5]*u+o[9]*l+o[13],h[2]=o[2]*c+o[6]*u+o[10]*l+o[14],h[3]=o[3]*c+o[7]*u+o[11]*l+o[15]}for(var f=0;f<12;++f){for(var d=this.clipPosition[P[f][0]],g=this.clipPosition[P[f][1]],v=this.clipPosition[P[f][2]],m=this.clipTriangle(d,g,v),p=!0,b=0;b<m.length;++b){var y=m[b][3];if(y>=2){p=!1;break}}if(!p){s=!0;for(var b=0;b<m.length;++b){var y=m[b][3];y<e.near&&(e.near=y),y>e.far&&(e.far=y)}}}return s},e.prototype.inside=function(e,t){return 0===t?e[0]>=-e[3]:1===t?e[1]>=-e[3]:2===t?e[0]<=e[3]:3===t?e[1]<=e[3]:void d.assert(!1)},e.prototype.intersect=function(e,t,r){var a=0;return 0===r?a=(-e[3]-e[0])/(t[0]-e[0]+t[3]-e[3]):1===r?a=(-e[3]-e[1])/(t[1]-e[1]+t[3]-e[3]):2===r?a=(e[3]-e[0])/(t[0]-e[0]-t[3]+e[3]):3===r&&(a=(e[3]-e[1])/(t[1]-e[1]-t[3]+e[3])),s.vec4.lerp(f.vec4f64.create(),e,t,a)},e.prototype.clipTriangle=function(e,t,r){for(var a=[e,t,r],n=0;n<4;++n){var i=a;a=[];for(var o=0;o<i.length;++o){var s=i[o],f=i[(o+1)%i.length];this.inside(f,n)?(this.inside(s,n)||a.push(this.intersect(s,f,n)),a.push(f)):this.inside(s,n)&&a.push(this.intersect(s,f,n))}}return a},e}(),P=[[0,1,3],[2,3,1],[1,5,2],[6,2,5],[5,4,6],[7,6,4],[4,0,7],[3,7,0],[3,2,7],[6,7,2],[4,5,0],[1,0,5]],_=o.vec3f64.create(),I=n.mat4f64.create(),E=l.empty(),D=new S,F=new j,k=new A});