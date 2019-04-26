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

define(["require","exports","./tsSupport/generatorHelper","./tsSupport/awaiterHelper","./promiseUtils"],function(r,e,t,n,u){function o(r,e,t){return u.eachAlways(r.map(function(r,n){return e.apply(t,[r,n])}))}function a(r,e,t){return u.eachAlways(r.map(function(r,n){return e.apply(t,[r,n])})).then(function(r){return r.map(function(r){return r.value})})}function i(r){return r.then(function(r){return{ok:!0,value:r}}).catch(function(r){return{ok:!1,error:r}})}function c(r){if(!0===r.ok)return r.value;throw r.error}function f(r){return r}Object.defineProperty(e,"__esModule",{value:!0}),e.forEach=o,e.map=a,e.result=i,e.assertResult=c,e.safeCast=f});