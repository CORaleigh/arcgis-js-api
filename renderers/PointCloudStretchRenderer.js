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

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/lang","../core/accessorSupport/decorators","./PointCloudRenderer","./support/LegendOptions","./support/pointCloud/StopInfo"],function(e,r,t,o,p,n,i,s,l,d){return function(e){function r(r){var t=e.call(this)||this;return t.type="point-cloud-stretch",t.field=null,t.legendOptions=null,t.fieldTransformType=null,t.stops=null,t}o(r,e),a=r,r.prototype.clone=function(){return new a(t({},this.cloneProperties(),{field:n.clone(this.field),fieldTransformType:n.clone(this.fieldTransformType),stops:n.clone(this.stops),legendOptions:n.clone(this.legendOptions)}))};var a;return p([i.enumeration.serializable()({pointCloudStretchRenderer:"point-cloud-stretch"})],r.prototype,"type",void 0),p([i.property({json:{write:!0},type:String})],r.prototype,"field",void 0),p([i.property({type:l.default,json:{write:!0}})],r.prototype,"legendOptions",void 0),p([i.property({type:s.fieldTransformTypeKebabDict.apiValues,json:{type:s.fieldTransformTypeKebabDict.jsonValues,read:s.fieldTransformTypeKebabDict.read,write:s.fieldTransformTypeKebabDict.write}})],r.prototype,"fieldTransformType",void 0),p([i.property({type:[d.default],json:{write:!0}})],r.prototype,"stops",void 0),r=a=p([i.subclass("esri.renderers.PointCloudStretchRenderer")],r)}(i.declared(s))});