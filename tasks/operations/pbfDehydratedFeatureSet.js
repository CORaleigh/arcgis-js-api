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

define(["require","exports","../../Graphic","../../core/compilerUtils","../../geometry/SpatialReference","../../layers/support/Field"],function(t,e,r,n,i,o){function s(t,e,r,n){return e}function a(t,e,r,n){switch(r){case 0:return d(t,e+n,0);case 1:return l(t,e+n,1)}}function h(t,e,r,n){switch(r){case 0:return d(t,e+n,0);case 1:return l(t,e+n,1);case 2:return d(t,e,2)}}function u(t,e,r,n){switch(r){case 0:return d(t,e+n,0);case 1:return l(t,e+n,1);case 2:return d(t,e,3)}}function p(t,e,r,n){switch(r){case 0:return d(t,e+n,0);case 1:return l(t,e+n,1);case 2:case 3:return d(t,e,3)}}function d(t,e,r){var n=t.translate,i=t.scale;return n[r]+e*i[r]}function l(t,e,r){var n=t.translate,i=t.scale;return n[r]-e*i[r]}Object.defineProperty(e,"__esModule",{value:!0});var c=function(){function t(t){this.options=t,this.geometryTypes=["point","multipoint","polyline","polygon"],this.previousCoordinate=[0,0],this.transform=null,this.applyTransform=s,this.lengths=[],this.currentLengthIndex=0,this.toAddInCurrentPath=0,this.vertexDimension=0,this.coordinateBuffer=null,this.coordinateBufferPtr=0}return t.prototype.createFeatureResult=function(){return{exceededTransferLimit:!1,features:[],fields:[],hasM:!1,hasZ:!1,geometryType:null,objectIdFieldName:null,globalIdFieldName:null,geometryProperties:null,geohashFieldName:null,spatialReference:null,transform:null}},t.prototype.finishFeatureResult=function(t){this.options.applyTransform&&(t.transform=null)},t.prototype.createSpatialReference=function(){return new i},t.prototype.addField=function(t,e){t.fields.push(o.fromJSON(e))},t.prototype.addFeature=function(t,e){var r=this.options.maxStringAttributeLength?this.options.maxStringAttributeLength:0;if(r>0)for(var n in e.attributes){var i=e.attributes[n];"string"==typeof i&&i.length>r&&delete e.attributes[n]}t.features.push(e)},t.prototype.prepareFeatures=function(t){switch(this.options.applyTransform&&t.transform&&(this.transform=t.transform,this.applyTransform=this.deriveApplyTransform(t)),this.vertexDimension=2,t.hasZ&&this.vertexDimension++,t.hasM&&this.vertexDimension++,t.geometryType){case"point":this.addCoordinate=this.addCoordinatePoint.bind(this),this.createGeometry=this.createPointGeometry.bind(this);break;case"polygon":this.addCoordinate=this.addCoordinatePolygon.bind(this),this.createGeometry=this.createPolygonGeometry.bind(this);break;case"polyline":this.addCoordinate=this.addCoordinatePolyline.bind(this),this.createGeometry=this.createPolylineGeometry.bind(this);break;case"multipoint":this.addCoordinate=this.addCoordinateMultipoint.bind(this),this.createGeometry=this.createMultipointGeometry.bind(this);break;default:n.neverReached(t.geometryType)}},t.prototype.createFeature=function(t){return this.lengths.length=0,this.currentLengthIndex=0,this.previousCoordinate[0]=0,this.previousCoordinate[1]=0,this.coordinateBuffer=null,this.coordinateBufferPtr=0,{uid:r.generateUID(),objectId:null,attributes:{},geometry:null,visible:!0}},t.prototype.addLength=function(t,e,r){0===this.lengths.length&&(this.toAddInCurrentPath=e),this.lengths.push(e)},t.prototype.createPointGeometry=function(t){var e={type:"point",x:0,y:0,spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM};return e.hasZ&&(e.z=0),e.hasM&&(e.m=0),e},t.prototype.addCoordinatePoint=function(t,e,r,n){switch(e=this.applyTransform(this.transform,e,n,0),n){case 0:t.x=e;break;case 1:t.y=e;break;case 2:t.hasZ?t.z=e:t.m=e;break;case 3:t.m=e}},t.prototype.transformPathLikeValue=function(t,e){var r=0;return e<=1&&(r=this.previousCoordinate[e],this.previousCoordinate[e]+=t),this.applyTransform(this.transform,t,e,r)},t.prototype.addCoordinatePolyline=function(t,e,r,n){this.dehydratedAddPointsCoordinate(t.paths,e,r,n)},t.prototype.addCoordinatePolygon=function(t,e,r,n){this.dehydratedAddPointsCoordinate(t.rings,e,r,n)},t.prototype.addCoordinateMultipoint=function(t,e,r){0===r&&t.points.push([]);var n=this.transformPathLikeValue(e,r);t.points[t.points.length-1].push(n)},t.prototype.createPolygonGeometry=function(t){return{type:"polygon",rings:[[]],spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM}},t.prototype.createPolylineGeometry=function(t){return{type:"polyline",paths:[[]],spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM}},t.prototype.createMultipointGeometry=function(t){return{type:"multipoint",points:[],spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM}},t.prototype.dehydratedAddPointsCoordinate=function(t,e,r,n){if(null===this.coordinateBuffer){var i=this.lengths.reduce(function(t,e){return t+e},0);this.coordinateBuffer=new Float64Array(i*this.vertexDimension)}0===n&&0==this.toAddInCurrentPath--&&(t.push([]),this.toAddInCurrentPath=this.lengths[++this.currentLengthIndex]-1,this.previousCoordinate[0]=0,this.previousCoordinate[1]=0);var o=this.transformPathLikeValue(e,n),s=t[t.length-1];0===n&&s.push(new Float64Array(this.coordinateBuffer.buffer,this.coordinateBufferPtr*Float64Array.BYTES_PER_ELEMENT,this.vertexDimension)),this.coordinateBuffer[this.coordinateBufferPtr++]=o},t.prototype.deriveApplyTransform=function(t){var e=t.hasZ,r=t.hasM;return e&&r?p:e?h:r?u:a},t}();e.Context=c});