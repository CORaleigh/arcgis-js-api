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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/lang","../../core/accessorSupport/decorators","./BarChartMediaInfo","./ColumnChartMediaInfo","./Content","./ImageMediaInfo","./LineChartMediaInfo","./PieChartMediaInfo","./support/mediaInfoTypes"],function(e,t,o,r,n,a,i,p,d,f,s,c,u){return function(e){function t(t){var o=e.call(this)||this;return o.mediaInfos=null,o.type="media",o}o(t,e),d=t,t.prototype.readMediaInfos=function(e){return e&&e.map(function(e){return"image"===e.type?f.fromJSON(e):"barchart"===e.type?i.fromJSON(e):"columnchart"===e.type?p.fromJSON(e):"linechart"===e.type?s.fromJSON(e):"piechart"===e.type?c.fromJSON(e):void 0}).filter(Boolean)},t.prototype.writeMediaInfos=function(e,t){t.mediaInfos=e&&e.map(function(e){return e.toJSON()})},t.prototype.clone=function(){return new d({mediaInfos:this.mediaInfos?n.clone(this.mediaInfos):null})};var d;return r([a.property({types:[u.types]})],t.prototype,"mediaInfos",void 0),r([a.reader("mediaInfos")],t.prototype,"readMediaInfos",null),r([a.writer("mediaInfos")],t.prototype,"writeMediaInfos",null),r([a.property({type:String,readOnly:!0,json:{read:!1,write:!0}})],t.prototype,"type",void 0),t=d=r([a.subclass("esri.popup.content.MediaContent")],t)}(a.declared(d))});