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

define(["require","exports","../../core/tsSupport/assignHelper","../../core/compilerUtils","../../core/Error","../../core/Logger","../../core/promiseUtils","../../core/screenUtils","./gfxUtils","./IconSymbol3DLayerResource","./ObjectSymbol3DLayerResource","./previewUtils","./renderUtils","./styleUtils","./utils"],function(e,a,r,t,l,s,i,o,n,h,u,p,c,m,f){function v(e){var a=e.outline,r=e.material&&e.material.color,t=r&&r.toRgba().toString();if(!a)return"fill"===e.type&&"255,255,255,1"===t?{color:"#bdc3c7",width:.75}:null;var l=o.pt2px(a.size)||0;return{color:"rgba("+(null!=a.color?a.color.toRgba():"255,255,255,1")+")",width:Math.min(l,C)}}function d(e,a){var r=a&&a.resource,t=r&&r.href;return e.thumbnail&&e.thumbnail.url?i.resolve(e.thumbnail.url):t&&"object"!==a.type?i.resolve(f.getIconHref(e,a)):e.styleOrigin&&(e.styleOrigin.styleName||e.styleOrigin.styleUrl)?m.resolveWebStyleSymbol(e.styleOrigin,{portal:e.styleOrigin.portal}).catch(function(e){return e}).then(function(e){return e&&e.thumbnail&&e.thumbnail.url||E}):i.resolve(E)}function y(e,a){return Math.min(Math.max(e+255*a*.75,0),255)}function b(e,a){if(void 0===a&&(a=0),!e.material||!e.material.color){var r=n.defaultThematicColor.r,t=y(r,a);return[t,t,t,100]}for(var l=e.material.color.toRgb(),s=0;s<3;s++)l[s]=y(l[s],a);return l.push(e.material.color.a),l}function g(e){return e.outline?v(e):{color:"rgba(0, 0, 0, 1)",width:1.5}}function x(e,a){if(!e.material)return null;for(var r=e.material.color.toRgb(),t="rgba(",l=0;l<3;l++)t+=y(r[l],a)+",";return t+e.material.color.a+");"}function w(e,a){var r=x(e,a);return r?{color:r,width:Math.min(e.size?o.pt2px(e.size):.75,C)}:{}}function k(e,a,r){var t=.75*r;return{type:"linear",x1:t?.25*t:0,y1:t?.5*t:0,x2:t||4,y2:t?.5*t:4,colors:[{color:e,offset:0},{color:a,offset:1}]}}function M(e){var a=e.depth,r=e.height,t=e.width;return t&&a&&r&&t===a&&t<r}function S(e,a,r){var l=[];if(!e)return l;switch(e.type){case"icon":var s=a,i=a,o=e.resource&&e.resource.primitive||h.defaultPrimitive;switch(o){case"circle":l.push({shape:{type:"circle",cx:0,cy:0,r:.5*a},fill:b(e,0),stroke:v(e)});break;case"square":l.push({shape:{type:"path",path:[{command:"M",values:[0,i]},{command:"L",values:[0,0]},{command:"L",values:[s,0]},{command:"L",values:[s,i]},{command:"Z",values:[]}]},fill:b(e,0),stroke:v(e)});break;case"triangle":l.push({shape:{type:"path",path:[{command:"M",values:[0,i]},{command:"L",values:[.5*s,0]},{command:"L",values:[s,i]},{command:"Z",values:[]}]},fill:b(e,0),stroke:v(e)});break;case"cross":l.push({shape:{type:"path",path:[{command:"M",values:[.5*s,0]},{command:"L",values:[.5*s,i]},{command:"M",values:[0,.5*i]},{command:"L",values:[s,.5*i]},{command:"E",values:[]}]},stroke:g(e)});break;case"x":l.push({shape:{type:"path",path:[{command:"M",values:[0,0]},{command:"L",values:[s,i]},{command:"M",values:[s,0]},{command:"L",values:[0,i]},{command:"E",values:[]}]},stroke:g(e)});break;case"kite":l.push({shape:{type:"path",path:[{command:"M",values:[0,.5*i]},{command:"L",values:[.5*s,0]},{command:"L",values:[s,.5*i]},{command:"L",values:[.5*s,i]},{command:"Z",values:[]}]},fill:b(e,0),stroke:v(e)});break;default:t.neverReached(o)}break;case"object":var o=e.resource&&e.resource.primitive||u.defaultPrimitive;switch(o){case"cone":var n=b(e,0),c=b(e,-.6),m=r?P:a,f=k(n,c,m),d=p.getConeShapes(a,r);l.push({shape:d[0],fill:f}),l.push({shape:d[1],fill:f});break;case"inverted-cone":var y=b(e,0),x=b(e,-.6),w=k(y,x,a),M=p.getInvertedConeShapes(a);l.push({shape:M[0],fill:w}),l.push({shape:M[1],fill:y});break;case"cube":var S=p.getCubeShapes(a,r);l.push({shape:S[0],fill:b(e,0)}),l.push({shape:S[1],fill:b(e,-.3)}),l.push({shape:S[2],fill:b(e,-.5)});break;case"cylinder":var L=b(e,0),z=b(e,-.6),U=r?P:a,j=k(L,z,U),D=p.getCylinderShapes(a,r);l.push({shape:D[0],fill:j}),l.push({shape:D[1],fill:j}),l.push({shape:D[2],fill:b(e,0)});break;case"diamond":var E=p.getDiamondShapes(a);l.push({shape:E[0],fill:b(e,-.3)}),l.push({shape:E[1],fill:b(e,0)}),l.push({shape:E[2],fill:b(e,-.3)}),l.push({shape:E[3],fill:b(e,-.7)});break;case"sphere":var I=b(e,0),R=b(e,-.6),C=k(I,R);C.x1=0,C.y1=0,C.x2=.25*a,C.y2=.25*a,l.push({shape:{type:"circle",cx:0,cy:0,r:.5*a},fill:C});break;case"tetrahedron":var O=p.getTetrahedronShapes(a);l.push({shape:O[0],fill:b(e,-.3)}),l.push({shape:O[1],fill:b(e,0)}),l.push({shape:O[2],fill:b(e,-.6)});break;default:t.neverReached(o)}}return l}function L(e){return"icon"===e.type?"multiply":"tint"}function z(e,a){var r,t=a&&a.size?o.pt2px(a.size):null,l=a&&a.maxSize?o.pt2px(a.maxSize):null,s=a&&a.disableUpsampling,n=e.symbolLayers,h=[],u=0,p=0,m=n.getItemAt(n.length-1);return m&&"icon"===m.type&&(r=m.size&&o.pt2px(m.size)),n.forEach(function(n,m){if("icon"===n.type||"object"===n.type){var f="icon"===n.type?n.size&&o.pt2px(n.size):0,y=t||f?Math.ceil(Math.min(t||f,l||R)):I,b="icon"===n.type?v(n):null,g=b?b.width:0;if(n&&n.resource&&n.resource.href){var x=d(e,n).then(function(e){var a=n.get("material.color"),r=L(n);return c.tintImageWithColor(e,y,a,r,s)}).then(function(e){var a=e.width,r=e.height;return u=Math.max(u,a+g+H),p=Math.max(p,r+g+H),[{shape:{type:"image",x:0,y:0,width:a,height:r,src:e.url},fill:null,stroke:null}]});h.unshift(x)}else{var w=y;"icon"===n.type&&r&&t&&(w=y*(f/r));var k=a&&"tall"===a.symbolConfig||"object"===n.type&&M(n);u=Math.max(u,k?P:w+g+H),p=Math.max(p,w+g+H),h.unshift(i.resolve(S(n,w,k)))}}}),i.eachAlways(h).then(function(e){var r=[];return e.forEach(function(e){e.value?r.push(e.value):e.error&&A.warn("error while building swatchInfo!",e.error)}),c.renderSymbol(r,[u,p],{node:a&&a.node,scale:!1})})}function U(e,a){var r,t=e.symbolLayers,l=[],s=f.isVolumetricSymbol(e),n=a&&a.size?o.pt2px(a.size):null,h=a&&a.maxSize?o.pt2px(a.maxSize):null,u=h||C,m=0,v=0;return t.forEach(function(e,a){if(e&&("line"===e.type||"path"===e.type)){var t=[];switch(e.type){case"line":var s=w(e,0),i=s&&s.width||0;0===a&&(r=i);var o=Math.min(n||i,u),h=0===a?o:n?o*(i/r):o,c=h>I?h+H:O;v=Math.max(v,h),m=Math.max(m,c),s.width=h,t.push({shape:{type:"path",path:[{command:"M",values:[0,.5*v]},{command:"L",values:[m,.5*v]},{command:"E",values:[]}]},stroke:s});break;case"path":var f=Math.min(n||I,u),d=b(e,0),y=b(e,-.2),g=x(e,-.4),s=g?{color:g,width:1}:{};t.push({shape:p.shapes.pathSymbol3DLayer[0],fill:y,stroke:s}),t.push({shape:p.shapes.pathSymbol3DLayer[1],fill:d,stroke:s}),v=Math.max(v,f+(s.width||0)+H),m=v}l.push(t)}}),i.resolve(c.renderSymbol(l,[m,v],{node:a&&a.node,scale:s}))}function j(e,a){for(var t=e.type,l="mesh-3d"===t,s=e.symbolLayers,n=a&&a.size?o.pt2px(a.size):null,h=a&&a.maxSize?o.pt2px(a.maxSize):null,u=n||I,m=[],f=0,d=0,y=!1,g=0;g<s.length;g++){var x=s.getItemAt(g),k=[];if(!l||"fill"===x.type){var M=p.shapes.fill[0];switch(x.type){case"fill":var S=v(x),L=S&&S.width||0;f=Math.max(f,u+L),d=Math.max(d,u+L),y=!0,k.push({shape:M,fill:b(x,0),stroke:S});break;case"line":var z=w(x,0),U=z&&z.width||0,j={stroke:z,shape:M};f=Math.max(f,I+U),d=Math.max(d,I+U),k.push(j);break;case"extrude":var D=r({join:"round"},w(x,-.4)),E=b(x,0),C=b(x,-.2),O=Math.min(u,h||R),P=p.getExtrudeSymbolShapes(O);D.width=1,k.push({shape:P[0],fill:C,stroke:D}),k.push({shape:P[1],fill:C,stroke:D}),k.push({shape:P[2],fill:E,stroke:D});var A=I,T=.7*I+.5*O;f=Math.max(f,A+D.width+H),d=Math.max(d,T+D.width+H)}m.push(k)}}return i.resolve(c.renderSymbol(m,[f,d],{node:a&&a.node,scale:y}))}function D(e,a){if(0===e.symbolLayers.length)return i.reject(new l("symbolPreview: renderPreviewHTML3D","No symbolLayers in the symbol."));var r=null;switch(e.type){case"point-3d":r=z(e,a);break;case"line-3d":r=U(e,a);break;case"polygon-3d":case"mesh-3d":r=j(e,a)}return r||i.reject(new l("symbolPreview: swatchInfo3D","symbol not supported."))}Object.defineProperty(a,"__esModule",{value:!0});var E=e.toUrl("../../images/Legend/legend3dsymboldefault.png"),I=22,R=120,C=80,O=40,P=20,A=s.getLogger("esri.symbols.support.previewSymbol3D"),H=1;a.getSymbolLayerFill=b,a.previewSymbol3D=D});