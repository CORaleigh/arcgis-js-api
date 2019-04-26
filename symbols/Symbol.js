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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../Color","../core/JSONSupport","../core/kebabDictionary","../core/accessorSupport/decorators"],function(e,r,o,l,t,i,n,p){var s=new n.default({esriSMS:"simple-marker",esriPMS:"picture-marker",esriSLS:"simple-line",esriSFS:"simple-fill",esriPFS:"picture-fill",esriTS:"text",esriSHD:"shield-label-symbol",PointSymbol3D:"point-3d",LineSymbol3D:"line-3d",PolygonSymbol3D:"polygon-3d",MeshSymbol3D:"mesh-3d",LabelSymbol3D:"label-3d",CIMSymbolReference:"cim"}),c=0;return function(e){function r(r){var o=e.call(this,r)||this;return o.id="sym"+c++,o.type=null,o}return o(r,e),Object.defineProperty(r.prototype,"color",{set:function(e){this._set("color",e)},enumerable:!0,configurable:!0}),r.prototype.readColor=function(e,r,o){return e&&null!=e[0]?[e[0],e[1],e[2],e[3]/255]:e},r.prototype.clone=function(){},l([p.property({type:s.apiValues,json:{read:s.read,write:{ignoreOrigin:!0,writer:s.write}}})],r.prototype,"type",void 0),l([p.property({type:t,value:new t([0,0,0,1]),json:{write:{allowNull:!0}}})],r.prototype,"color",null),l([p.reader("color")],r.prototype,"readColor",null),r=l([p.subclass("esri.symbols.Symbol")],r)}(p.declared(i))});