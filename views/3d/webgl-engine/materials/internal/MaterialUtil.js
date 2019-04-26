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

define(["require","exports","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f32","../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../../../../core/libs/gl-matrix-2/vec4","../../../../../geometry/support/aaBoundingBox","../../../support/mathUtils","../../lib/ComponentUtils","../../lib/doublePrecisionUtils","../../lib/screenSizePerspectiveUtils","../../lib/Util"],function(e,t,i,n,r,a,o,f,c,s,l,v,u,m){function d(e,t,i,n,r,a,o,f){var c=t&&t.componentVisibilities,s=n.tolerance;if(e.componentCount>1)p(e,c,r,a,s,o);else if(!c||l.getVisibility(c,0))if(e.boundingInfo)m.assert("triangle"===e.data.primitiveType),g(e.boundingInfo,r,a,s,o);else{var v=e.getIndices(j.POSITION),u=e.getAttribute(j.POSITION),d=v.length/3;h(r,a,0,d,v,u,void 0,o)}}function g(e,t,i,n,r){var a=M(t,i,G);if(c.setMin(_,e.getBBMin()),c.setMax(_,e.getBBMax()),P(_,t,a,n)){var o=e.getPrimitiveIndices(),f=e.getIndices(),s=e.getPosition(),l=o?o.length:f.length/3;if(l>ee){var v=e.getChildren();if(void 0!==v){for(var u=0;u<8;++u)void 0!==v[u]&&g(v[u],t,i,n,r);return}}h(t,i,0,l,f,s,o,r)}}function p(e,t,i,n,r,a){var o=M(i,n,G),f=e.componentCount,s=e.componentOffsets,v=e.getIndices(j.POSITION),u=e.getAttribute(j.POSITION),m=e.boundingInfo;if(!m||(c.setMin(_,m.getBBMin()),c.setMax(_,m.getBBMax()),P(_,i,o,r)))for(var d=0;d<f;d++)if(!t||l.getVisibility(t,d)){if(e.getComponentAABB){var g=e.getComponentAABB(d,_);if(!P(g,i,o,r))continue}var p=s[d]/3,b=s[d+1]/3;h(i,n,p,b,v,u,void 0,a)}}function h(e,t,i,n,r,a,o,f){if(o)return b(e,t,i,n,r,a,o,f);for(var c=a.data,s=a.offsetIdx,l=a.strideIdx,v=e[0],u=e[1],m=e[2],d=t[0],g=t[1],p=t[2],h=d-v,M=g-u,P=p-m,I=i,O=3*i;I<n;++I){var S=s+l*r[O++],A=c[S++],U=c[S++],L=c[S];S=s+l*r[O++];var B=c[S++],T=c[S++],w=c[S];S=s+l*r[O++];var y=c[S++],W=c[S++],D=c[S],E=B-A,N=T-U,V=w-L,C=y-A,z=W-U,R=D-L,q=M*R-z*P,H=P*C-R*h,Y=h*z-C*M,_=E*q+N*H+V*Y;if(!(Math.abs(_)<=k)){var j=v-A,G=u-U,Z=m-L,F=j*q+G*H+Z*Y;if(_>0){if(F<0||F>_)continue}else if(F>0||F<_)continue;var J=G*V-N*Z,K=Z*E-V*j,Q=j*N-E*G,$=h*J+M*K+P*Q;if(_>0){if($<0||F+$>_)continue}else if($>0||F+$<_)continue;var ee=(C*J+z*K+R*Q)/_;if(ee>=0){f(ee,x(E,N,V,C,z,R,X),I)}}}}function b(e,t,i,n,r,a,o,f){for(var c=a.data,s=a.offsetIdx,l=a.strideIdx,v=e[0],u=e[1],m=e[2],d=t[0],g=t[1],p=t[2],h=d-v,b=g-u,M=p-m,P=i;P<n;++P){var I=o[P],O=3*I,S=s+l*r[O++],A=c[S++],U=c[S++],L=c[S];S=s+l*r[O++];var B=c[S++],T=c[S++],w=c[S];S=s+l*r[O];var y=c[S++],W=c[S++],D=c[S],E=B-A,N=T-U,V=w-L,C=y-A,z=W-U,R=D-L,q=b*R-z*M,H=M*C-R*h,Y=h*z-C*b,_=E*q+N*H+V*Y;if(!(Math.abs(_)<=k)){var j=v-A,G=u-U,Z=m-L,F=j*q+G*H+Z*Y;if(_>0){if(F<0||F>_)continue}else if(F>0||F<_)continue;var J=G*V-N*Z,K=Z*E-V*j,Q=j*N-E*G,$=h*J+b*K+M*Q;if(_>0){if($<0||F+$>_)continue}else if($>0||F+$<_)continue;var ee=(C*J+z*K+R*Q)/_;if(ee>=0){f(ee,x(E,N,V,C,z,R,X),I)}}}}function x(e,t,i,n,r,o,f){return a.vec3.set(Z,e,t,i),a.vec3.set(F,n,r,o),a.vec3.cross(f,Z,F),a.vec3.normalize(f,f),f}function M(e,t,i){return a.vec3.set(i,1/(t[0]-e[0]),1/(t[1]-e[1]),1/(t[2]-e[2]))}function P(e,t,i,n){var r=(e[0]-n-t[0])*i[0],a=(e[3]+n-t[0])*i[0],o=Math.min(r,a),f=Math.max(r,a),c=(e[1]-n-t[1])*i[1],s=(e[4]+n-t[1])*i[1];if(o=Math.max(o,Math.min(c,s)),f=Math.min(f,Math.max(c,s)),o>f)return!1;var l=(e[2]-n-t[2])*i[2],v=(e[5]+n-t[2])*i[2];return o=Math.max(o,Math.min(l,v)),f=Math.min(f,Math.max(l,v)),o<=f}function I(e,t,i){return f.vec4.set(i,e[0]-t[0],e[1]-t[1],e[2]-t[2],1)}function O(e,t,n,r){return i.mat4.translate(Y,n,t),n=Y,f.vec4.transformMat4(r,e,n)}function S(e,t,i,n){return n[0]=e[0]+i[0],n[1]=e[1]+i[1],n[2]=e[2]+i[2],n[3]=e[3],f.vec4.transformMat4(n,n,t)}function A(e,t){return f.vec4.scale(t,e,1/Math.abs(e[3]))}function U(e,t,i,n,r){return u.scale(e,n,i,r)}function L(e,t,i,n,r){var a=(i.screenLength||0)*e.pixelRatio;r&&(a=U(a,e,t,n,r));var o=a*Math.tan(.5*e.fovY)/(.5*e.fullHeight);return s.clamp(o*t,i.minWorldLength||0,null!=i.maxWorldLength?i.maxWorldLength:1/0)}function B(e,t,i){if(void 0!==e)return t.aquire(e,i)}function T(e,t){void 0!==e&&t.release(e)}function w(e,t,n){i.mat4.translate(J,t,e),n.setUniform3fv("localOrigin",e),n.setUniformMatrix4fv("view",J)}function y(e,t,i){i.setUniform3f("camPos",t[3]-e[0],t[7]-e[1],t[11]-e[2])}function W(e,t){v.encodeDoubleArraySplit(e,K,Q,3),t.setUniform3fv("viewOriginHi",K),t.setUniform3fv("viewOriginLo",Q)}function D(e,t,i){a.vec3.subtract($,t.origin,e),i.setUniform3fv("slicePlaneOrigin",$),i.setUniform3fv("slicePlaneBasis1",t.basis1),i.setUniform3fv("slicePlaneBasis2",t.basis2)}function E(e,t,i){if(e){var n=V(e,t.fovY,t.viewport[3]),r=t.pixelRatio||1;i.setUniform4f("verticalOffset",n.screenLength*r,n.perDistance,n.minWorldLength,n.maxWorldLength)}}function N(e,t,i){e.bindTexture(t.highlightDepthTexture,5),i.setUniform1i("depthTex",5),i.setUniform4f("highlightViewportPixelSz",0,0,1/t.viewport[2],1/t.viewport[3])}function V(e,t,i,n){return void 0===n&&(n=te),n.screenLength=e.screenLength,n.perDistance=Math.tan(.5*t)/(.5*i),n.minWorldLength=e.minWorldLength,n.maxWorldLength=e.maxWorldLength,n}function C(e,t,i){if(void 0===i&&(i="screenSizePerspectiveAlignment"),e){var n=e.parameters,r=e.paddingPixelsOverride;t.setUniform4f(i,n.divisor,n.offset,n.minPixelSize,r)}}function z(e,t){var i=t?z(t):{};for(var n in e){var r=e[n];r&&r.forEach&&(r=H(r)),null==r&&n in i||(i[n]=r)}return i}function R(e,t){var i=!1;for(var n in t){var r=t[n];void 0!==r&&(i=!0,Array.isArray(r)?e[n]=r.slice():e[n]=r)}return i}function q(e,t,i,n,r,a,o,f,c){if(n.enable.selectionMode){for(var l=e.getAttribute(j.POSITION).data,v=e.getAttribute(j.SIZE),u=v&&v.data[0],m=a[0],d=a[1],g=u+o,p=(g/2+4)*e.pixelRatio,h=Number.MAX_VALUE,b=0;b<l.length-5;b+=3){var x=l[b],M=l[b+1],P=l[b+3],I=l[b+4],O=m-x,S=d-M,A=P-x,U=I-M,L=A*O+U*S,B=A*A+U*U,T=s.clamp(L/B,0,1),w=A*T-O,y=U*T-S,W=w*w+y*y;W<h&&(h=W)}h<p*p&&f()}}function H(e){var t=[];return e.forEach(function(e){return t.push(e)}),t}Object.defineProperty(t,"__esModule",{value:!0});var Y=r.mat4f64.create(),_=c.create(),j=m.VertexAttrConstants;t.IDENTITY=r.mat4f64.create(),t.intersectTriangleGeometry=d;var G=o.vec3f64.create(),k=Math.pow(2,-52),X=o.vec3f64.create();t.intersectTriangles=h;var Z=o.vec3f64.create(),F=o.vec3f64.create();t.computeNormal=x,t.intersectAabbInvDir=P,t.transformToWorld=I,t.transformToView=O,t.transformToProjection=S,t.transformToNDC=A,t.applyScreenSizePerspectiveScale=U,t.verticalOffsetAtDistance=L,t.aquireIfNotUndefined=B,t.releaseIfNotUndefined=T;var J=n.mat4f32.create();t.bindView=w,t.bindCamPos=y;var K=o.vec3f64.create(),Q=o.vec3f64.create();t.bindViewOriginDouble=W;var $=o.vec3f64.create();t.bindSlicePlane=D,t.bindVerticalOffset=E,t.bindHighlightRendering=N,t.bindScreenSizePerspective=C,t.copyParameters=z,t.updateParameters=R;!function(e){function t(e,t){for(var i=[],n=0;n<2;n++)for(var a=0;a<2;a++){var o=r({shadowMappingEnabled:1===n,ssaoEnabled:1===a}),f=r({shadowMappingEnabled:1===n,ssaoEnabled:1===a&&e.receiveSSAO});i[o]=i[f]||t({receiveShadows:1===n,receiveSSAO:1===a&&e.receiveSSAO})}return{programs:i.filter(function(e){return null!=e}),byParameter:i}}function i(e,t){return e.byParameter[r(t)]}function n(e){return e.programs}function r(e){return(e.shadowMappingEnabled?1:0)|(e.ssaoEnabled?2:0)}e.create=t,e.lookup=i,e.programs=n}(t.BindParametersMap||(t.BindParametersMap={})),t.intersectDrapedRenderLineGeometry=q,t.colorMixModes={multiply:1,ignore:2,replace:3,tint:4};var ee=1e3,te={screenLength:0,perDistance:0,minWorldLength:0,maxWorldLength:0}});