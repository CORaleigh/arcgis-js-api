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

define(["require","exports","../../support/earthUtils","../../support/mathUtils"],function(e,t,a,r){function i(e){return new g(e,t.defaultDescription)}function n(e){var a=t.defaultDescription.curvatureDependent,r=t.defaultDescription.scaleStart,i=t.defaultDescription.scaleFallOffRange;return new g(e,{curvatureDependent:{min:{curvature:a.min.curvature,tiltAngle:a.min.tiltAngle,scaleFallOffFactor:P.curvatureDependent.min.scaleFallOffFactor},max:{curvature:a.max.curvature,tiltAngle:a.max.tiltAngle,scaleFallOffFactor:P.curvatureDependent.max.scaleFallOffFactor}},scaleStart:r,scaleFallOffRange:i,minPixelSize:P.minPixelSize})}function l(e){return Math.abs(e*e*e)}function c(e,t,a,r){void 0===r&&(r=x);var i=a.parameters,n=a.paddingPixelsOverride;return r.scale=Math.min(i.divisor/(t-i.offset),1),r.factor=l(e),r.minPixelSize=i.minPixelSize,r.paddingPixels=n,r}function s(e,t){return 0===e?t.minPixelSize:t.minPixelSize*(1+2*t.paddingPixels/e)}function o(e,t){return Math.max(r.lerp(e*t.scale,e,t.factor),s(e,t))}function u(e,t,a){void 0===a&&(a=[0,0]);var i=Math.min(Math.max(t.scale,s(e[1],t)/e[1]),1);return a[0]=r.lerp(e[0]*i,e[0],t.factor),a[1]=r.lerp(e[1]*i,e[1],t.factor),a}function d(e,t,a){var r=c(e,t,a);return r.minPixelSize=0,r.paddingPixels=0,o(1,r)}function f(e,t,a,r){return r.scale=d(e,t,a),r.factor=0,r.minPixelSize=a.parameters.minPixelSize,r.paddingPixels=a.paddingPixelsOverride,r}function p(e,t,a){void 0===a&&(a=[0,0]);var r=Math.min(Math.max(t.scale,s(e[1],t)/e[1]),1);return a[0]=e[0]*r,a[1]=e[1]*r,a}function m(e,t,a,r){return o(e,c(t,a,r))}function v(){return{camera:{distance:0,fovY:0},divisor:0,offset:0,minPixelSize:0,paddingPixels:0}}function h(e,t){return t.camera.distance=e.camera.distance,t.camera.fovY=e.camera.fovY,t.divisor=e.divisor,t.offset=e.offset,t.minPixelSize=e.minPixelSize,t}Object.defineProperty(t,"__esModule",{value:!0}),t.getSettings=i,t.getLabelSettings=n,t.perspectiveFactor=l,t.scaleFactor=c,t.applyScaleFactor=o,t.applyScaleFactorVec2=u,t.precomputeScale=d,t.precomputeScaleFactor=f,t.applyPrecomputedScaleFactorVec2=p,t.scale=m;var g=function(){function e(e,t,a,r){void 0===a&&(a=v()),this.viewingMode=e,this.description=t,this.parameters=a,this._paddingPixelsOverride=r,"local"===this.viewingMode?(this.coverageCompensation=this.surfaceCoverageCompensationLocal,this.calculateCurvatureDependentParameters=this.calculateCurvatureDependentParametersLocal):(this.coverageCompensation=this.surfaceCoverageCompensationGlobal,this.calculateCurvatureDependentParameters=this.calculateCurvatureDependentParametersGlobal)}return Object.defineProperty(e.prototype,"paddingPixelsOverride",{get:function(){return this._paddingPixelsOverride||this.parameters.paddingPixels},enumerable:!0,configurable:!0}),e.prototype.update=function(e){return(!this.parameters||this.parameters.camera.fovY!==e.fovY||this.parameters.camera.distance!==e.distance)&&(this.calculateParameters(e,this.parameters),!0)},e.prototype.overridePadding=function(t){return t!==this.paddingPixelsOverride?new e(this.viewingMode,this.description,this.parameters,t):this},e.prototype.calculateParameters=function(e,t){var a=this.description,r=a.scaleStart,i=a.scaleFallOffRange,n=a.minPixelSize,l=e.fovY,c=e.distance,s=this.calculateCurvatureDependentParameters(e),o=this.coverageCompensation(e,s),u=s.tiltAngle,d=s.scaleFallOffFactor,f=Math.sin(u)*c,p=.5*Math.PI-u-l*(.5-r*o),m=f/Math.cos(p),v=p+l*i*o,h=f/Math.cos(v),g=(m-d*h)/(1-d);return t.camera.fovY=e.fovY,t.camera.distance=e.distance,t.offset=g,t.divisor=m-g,t.minPixelSize=n,t},e.prototype.calculateCurvatureDependentParametersLocal=function(e,t){return void 0===t&&(t=F),t.tiltAngle=this.description.curvatureDependent.min.tiltAngle,t.scaleFallOffFactor=this.description.curvatureDependent.min.scaleFallOffFactor,t},e.prototype.calculateCurvatureDependentParametersGlobal=function(e,t){void 0===t&&(t=F);var i=this.description.curvatureDependent,n=1+e.distance/a.earthRadius,l=Math.sqrt(n*n-1),c=[i.min.curvature,i.max.curvature],s=c[0],o=c[1],u=r.clamp((l-s)/(o-s),0,1),d=[i.min,i.max],f=d[0],p=d[1];return t.tiltAngle=r.lerp(f.tiltAngle,p.tiltAngle,u),t.scaleFallOffFactor=r.lerp(f.scaleFallOffFactor,p.scaleFallOffFactor,u),t},e.prototype.surfaceCoverageCompensationLocal=function(e,t){return(e.fovY-t.tiltAngle)/e.fovY},e.prototype.surfaceCoverageCompensationGlobal=function(e,t){var r=a.earthRadius*a.earthRadius,i=t.tiltAngle+.5*Math.PI,n=e.fovY,l=e.distance,c=l*l,s=c+r-2*Math.cos(i)*l*a.earthRadius,o=Math.sqrt(s),u=Math.sqrt(s-r);return(Math.acos(u/o)-Math.asin(a.earthRadius/(o/Math.sin(i)))+.5*n)/n},e}();t.defaultDescription={curvatureDependent:{min:{curvature:r.deg2rad(10),tiltAngle:r.deg2rad(12),scaleFallOffFactor:.5},max:{curvature:r.deg2rad(70),tiltAngle:r.deg2rad(40),scaleFallOffFactor:.8}},scaleStart:.3,scaleFallOffRange:.65,minPixelSize:0};var P={curvatureDependent:{min:{scaleFallOffFactor:.7},max:{scaleFallOffFactor:.95}},minPixelSize:14};t.copyParameters=h;var x={scale:0,factor:0,minPixelSize:0,paddingPixels:0},F={tiltAngle:0,scaleFallOffFactor:0}});