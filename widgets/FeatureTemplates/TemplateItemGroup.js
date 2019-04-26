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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/Accessor","../../core/Identifiable","../../core/accessorSupport/decorators"],function(e,r,t,o,p,l,s){return function(e){function r(r){var t=e.call(this)||this;return t.items=null,t.label=null,t}return t(r,e),o([s.property()],r.prototype,"items",void 0),o([s.property()],r.prototype,"label",void 0),r=o([s.subclass("esri.widgets.FeatureTemplates.TemplateItemGroup")],r)}(s.declared(p,l.Identifiable))});