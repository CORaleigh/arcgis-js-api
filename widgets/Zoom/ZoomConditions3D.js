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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/Accessor","../../core/accessorSupport/decorators"],function(o,r,e,t,n,c){return function(o){function r(){var r=null!==o&&o.apply(this,arguments)||this;return r.canZoomIn=!0,r.canZoomOut=!0,r}return e(r,o),t([c.property({readOnly:!0})],r.prototype,"canZoomIn",void 0),t([c.property({readOnly:!0})],r.prototype,"canZoomOut",void 0),r=t([c.subclass("esri.widgets.Zoom.ZoomConditions3D")],r)}(c.declared(n))});