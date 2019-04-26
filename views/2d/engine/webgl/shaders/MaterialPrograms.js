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

define(["require","exports","./sources/resolver","../../../../webgl/programUtils"],function(e,r,t,a){Object.defineProperty(r,"__esModule",{value:!0});var n=function(e){var r="";r+=e[0].toUpperCase();for(var t=1;t<e.length;t++){var a=e[t];a===a.toUpperCase()?(r+="_",r+=a):r+=a.toUpperCase()}return r},o=function(e){var r={};for(var t in e){r[n(t)]=e[t]}return a.glslifyDefineMap(r)};r.createProgramTemplate=function(r,e){return{name:r,attributes:e,shaders:function(e){return{vertexShader:o(e)+t.resolveIncludes("materials/"+r+"/"+r+".vert"),fragmentShader:o(e)+t.resolveIncludes("materials/"+r+"/"+r+".frag")}}}}});