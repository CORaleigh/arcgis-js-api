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

define(["require","exports","../../webgl-engine/lib/HighlightSet"],function(i,t,e){return function(){function i(i,t){this.highlightSet=new e,this.ids=new Set,this.paused=!1,this.options=i,this.objectIdField=t}return i.prototype.hasGraphic=function(i){if(this.objectIdField){var t=i.graphic.attributes[this.objectIdField];return this.ids.has(t)}return this.ids.has(i.graphic.uid)},i}()});