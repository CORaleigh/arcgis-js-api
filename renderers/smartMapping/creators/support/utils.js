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

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../Color","../../../../symbols","../../../../core/compilerUtils","../../../../core/Error","../../../../core/numberUtils","../../../../core/promiseUtils","../../statistics/classBreaks","../../statistics/summaryStatistics","../../../support/pointCloud/PointSizeSplatAlgorithm"],function(e,n,t,i,r,l,o,a,s,u,c,m){function d(e,n){return new o(e,n)}function f(e,n,t){var i,r,l=h({statistics:e,isDate:n});return l.defaultValuesUsed?(i=l.min,r=l.max):!t||null!=e.avg&&e.stddev||(i=e.min,r=e.max),null!=i?[i,r]:null}function h(e){var n=e&&e.statistics;n||(n={});var t,i;if(null==n.min)if(e.isDate){var r=y();t=r[0],i=r[1]}else t=0,i=100;else if(n.min===n.max)if(e.isDate){var l=y(n.min);t=l[0],i=l[1]}else n.min<0?(t=2*n.min,i=0):n.min>0?(t=0,i=2*n.min):(t=0,i=100);return{min:null!=t?t:n.min,max:null!=i?i:n.max,defaultValuesUsed:null!=t||null!=i}}function y(e){var n="number"==typeof e?new Date(e):new Date,t=n.getUTCFullYear(),i=Date.UTC(t,0,1,12,0,0,0),r=Date.UTC(t,11,31,12,0,0,0);return"number"==typeof e&&(e<i&&(i=e),e>r&&(r=e)),[i,r]}function p(e,n){for(var t=[],r=e.length,l=0;l<n;l++)t.push(new i(e[l%r]));return t}function v(e,n){void 0===n&&(n=!0);var t=e.avg,i=t-e.stddev,r=t+e.stddev;i<e.min&&(i=e.min),r>e.max&&(r=e.max),n&&(t=i+(r-i)/2);var l=a.round([i,r],{strictBounds:!0});return i=l[0],r=l[1],l=[i,i+(t-i)/2,t,t+(r-t)/2,r],a.round(l,{strictBounds:!0})}function S(e,n,t){switch(n){case"point":case"multipoint":return t?"noDataSize"in e?e.noDataSize:null:"size"in e?e.size:null;case"polyline":return t?"noDataWidth"in e?e.noDataWidth:null:"width"in e?e.width:null;case"polygon":case"mesh":return;default:l.neverReached(n)}}function w(e,n){switch(n){case"point":case"multipoint":case"polygon":return"outline"in e?{color:e.outline.color,width:e.outline.width}:null;case"polyline":case"mesh":return;default:l.neverReached(n)}}function g(e,n){var t,i=n.type,l=n.size,o=n.color,a=n.outline;switch(e){case"point":case"multipoint":if("2d"===i)t=new r.SimpleMarkerSymbol({color:o,size:l,outline:{color:a.color,width:a.width}});else if("3d-flat"===i)t=new r.PointSymbol3D({symbolLayers:[new r.IconSymbol3DLayer({size:l,resource:{primitive:"circle"},material:{color:o},outline:{color:a.color,size:a.width}})]});else if(i.indexOf("3d-volumetric")>-1){var s="3d-volumetric-uniform"===i,u=s?"sphere":"cylinder",c=new r.ObjectSymbol3DLayer({height:l,resource:{primitive:u},material:{color:o}});s||(c.width=n.widthAndDepth,c.depth=n.widthAndDepth),t=new r.PointSymbol3D({symbolLayers:[c]})}break;case"polyline":"2d"===i&&(t=new r.SimpleLineSymbol({color:o,width:l}));break;case"polygon":"2d"===i&&(t=new r.SimpleFillSymbol({color:o,outline:{color:a.color,width:a.width}}));break;case"mesh":var m=n.meshInfo&&n.meshInfo.colorMixMode,d=n.meshInfo&&n.meshInfo.edgesType;t=new r.MeshSymbol3D({symbolLayers:[new r.FillSymbol3DLayer({material:{color:o,colorMixMode:m},edges:null==d||"none"===d?null:{type:d,color:k}})]})}return t}function b(e,n,t){var i=D({layer:e,fields:n});if(i.length)return d(t,"Unknown fields: "+i.join(", ")+". You can only use fields defined in the layer schema");var r=z({layer:e,fields:n});return r.length?d(t,"Unsupported fields: "+r.join(", ")+". You can only use fields that are accessible to the renderer i.e. FieldUsageInfo.supportsRenderer must be true"):void 0}function D(e){var n=e.layer;return e.fields.filter(function(e){return!n.getField(e)})}function z(e){var n=e.layer;return e.fields.filter(function(e){var t=n.getFieldUsageInfo(e);return!t||!t.supportsRenderer})}function x(e){return u(e).then(function(n){var i,r=f({min:n.minValue,max:n.maxValue,avg:null,stddev:null},!1,!1);return i=r?u(t({},e,{classificationMethod:"equal-interval",numClasses:1,analyzeData:!1,minValue:r[0],maxValue:r[1],normalizationTotal:r[0]+r[1]})):s.resolve(n),i.then(function(e){return{result:e,defaultValuesUsed:!!r}})})}function U(e){return c(e)}function F(e,n){var t=e.minSize,i=e.maxSize;if("height"===n){t=((i-t)/2+t)/4.6,i*=2}return{minSize:t,maxSize:i}}function V(e){return M.test(e)}function C(e){var n=e.match(M),t=Number(n[1]);if("%"===n[3])return new m.default({scaleFactor:t/100})}Object.defineProperty(n,"__esModule",{value:!0});var M=/^(\d+(\.\d+)?)\s*(%)$/i,k=[0,0,0,.4];n.createError=d,n.getDefaultDataRange=f,n.createColors=p,n.createStopValues=v,n.getSymbolSizeFromScheme=S,n.getSymbolOutlineFromScheme=w,n.createSymbol=g,n.verifyBasicFieldValidity=b,n.getClassBreaks=x,n.getSummaryStatistics=U,n.getSizeRangeForAxis=F,n.isValidPointSize=V,n.getPointSizeAlgorithm=C});