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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../Graphic","../../../core/Accessor","../../../core/Collection","../../../core/Promise","../../../core/accessorSupport/decorators"],function(r,e,o,t,p,c,n,y,s){var i=n.ofType(p);return function(r){function e(e){var o=r.call(this)||this;return o.type="memory",o.updating=!1,o}return o(e,r),t([s.property({readOnly:!0})],e.prototype,"type",void 0),t([s.property({constructOnly:!0})],e.prototype,"layer",void 0),t([s.property({constructOnly:!0})],e.prototype,"layerView",void 0),t([s.property({type:i,constructOnly:!0})],e.prototype,"graphics",void 0),t([s.property({readOnly:!0})],e.prototype,"updating",void 0),e=t([s.subclass("esri.layers.graphics.controllers.MemoryController")],e)}(s.declared(c,y))});