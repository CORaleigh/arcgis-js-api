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

define(["require","exports"],function(e,n){function r(){return[0,0,0,1,0,0,0,0]}function t(e){return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]]}function o(e,n,r,t,o,u,i,a){return[e,n,r,t,o,u,i,a]}function u(e,n,r,t,o,u,i){var a=.5*o,c=.5*u,f=.5*i;return[e,n,r,t,a*t+c*r-f*n,c*t+f*e-a*r,f*t+a*n-c*e,-a*e-c*n-f*r]}function i(e,n){return new Float64Array(e,n,8)}Object.defineProperty(n,"__esModule",{value:!0}),n.create=r,n.clone=t,n.fromValues=o,n.fromRotationTranslationValues=u,n.createView=i});