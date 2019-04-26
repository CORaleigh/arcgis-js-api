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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/JSONSupport","../core/accessorSupport/decorators","./applicationProperties/Viewing"],function(e,r,t,i,o,n,p){return function(e){function r(r){var t=e.call(this,r)||this;return t.viewing=null,t}t(r,e),o=r,r.prototype.clone=function(){return new o({viewing:this.viewing?this.viewing.clone():null})};var o;return i([n.property({type:p,json:{write:!0}})],r.prototype,"viewing",void 0),r=o=i([n.subclass("esri.webscene.ApplicationProperties")],r)}(n.declared(o))});