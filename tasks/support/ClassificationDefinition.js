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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/JSONSupport","../../core/kebabDictionary","../../core/accessorSupport/decorators","../../symbols/Symbol","./colorRamps"],function(e,r,o,t,p,s,i,a,n){var l=new s.default({classBreaksDef:"class-breaks-definition",uniqueValueDef:"unique-value-definition"});return function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.baseSymbol=null,r.colorRamp=null,r.type=null,r}return o(r,e),t([i.property({type:a,json:{write:!0}})],r.prototype,"baseSymbol",void 0),t([i.property({types:n.types,json:{read:{reader:n.fromJSON},write:!0}})],r.prototype,"colorRamp",void 0),t([i.property({json:{read:l.read,write:l.write}})],r.prototype,"type",void 0),r=t([i.subclass("esri.tasks.support.ClassificationDefinition")],r)}(i.declared(p))});