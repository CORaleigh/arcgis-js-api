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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../symbols","../../core/JSONSupport","../../core/accessorSupport/decorators","../../symbols/support/jsonUtils"],function(e,r,t,o,s,l,p,n){Object.defineProperty(r,"__esModule",{value:!0});var i=function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.description=null,r.label=null,r.symbol=null,r.value=null,r}t(r,e),l=r,r.prototype.clone=function(){return new l({value:this.value,description:this.description,label:this.label,symbol:this.symbol?this.symbol.clone():null})};var l;return o([p.property({type:String,json:{write:!0}})],r.prototype,"description",void 0),o([p.property({type:String,json:{write:!0}})],r.prototype,"label",void 0),o([p.property({types:s.symbolTypesRenderer,json:{origins:{"web-scene":{read:n.read,write:{target:{symbol:{types:s.symbolTypesRenderer3D}},writer:n.writeTarget}}},read:n.read,write:n.writeTarget}})],r.prototype,"symbol",void 0),o([p.property({type:String,json:{write:!0}})],r.prototype,"value",void 0),r=l=o([p.subclass("esri.renderers.support.UniqueValueInfo")],r)}(p.declared(l));r.UniqueValueInfo=i,r.default=i});