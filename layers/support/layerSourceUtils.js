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

define(["require","exports","../../core/kebabDictionary","../../core/lang"],function(e,r,a,t){function o(e){return null!=e&&e.hasOwnProperty("mapLayerId")}function i(e){return null!=e&&e.hasOwnProperty("dataSource")}function l(e){return e?(o(e)&&(e.type=r.MAPLAYER),i(e)&&(e.type=r.DATALAYER,e.dataSource.type||y(e.dataSource)),e):e}function n(e){var a={};return e.type===r.MAPLAYER?(a.mapLayerId=e.mapLayerId,e.gdbVersion&&(a.gdbVersion=e.gdbVersion)):e.type===r.DATALAYER&&(e.fields&&(a.fields=e.fields),a.dataSource=u(e.dataSource)),a.type=p.toJSON(e.type),t.fixJson(a)}function c(e){var a={};return p.fromJSON(e.type)===r.MAPLAYER?(a.mapLayerId=e.mapLayerId,e.gdbVersion&&(a.gdbVersion=e.gdbVersion)):p.fromJSON(e.type)===r.DATALAYER&&(e.fields&&(a.fields=e.fields),a.dataSource=s(e.dataSource)),a.type=p.fromJSON(e.type),t.fixJson(a)}function y(e){e.workspaceId?e.gdbVersion?e.type="table":e.query||e.oidFields?e.type="query-table":e.type="raster":e.leftTableKey&&e.rightTableKey&&e.leftTableSource&&e.rightTableSource&&(e.type="join-table",e.leftTableSource=l(e.leftTableSource),e.rightTableSource=l(e.rightTableSource))}function u(e){var r;switch(e.type){case"table":r={dataSourceName:e.dataSourceName,workspaceId:e.workspaceId,gdbVersion:e.gdbVersion};break;case"query-table":r={geometryType:d.toJSON(e.geometryType),workspaceId:e.workspaceId,query:e.query,oidFields:e.oidFields,spatialReference:e.spatialReference};break;case"join-table":r={leftTableSource:n(e.leftTableSource),rightTableSource:n(e.rightTableSource),leftTableKey:e.leftTableKey,rightTableKey:e.rightTableKey,joinType:f.toJSON(e.joinType)};break;case"raster":r={workspaceId:e.workspaceId,dataSourceName:e.dataSourceName}}return r.type=b.toJSON(e.type),t.fixJson(r)}function s(e){var r;switch(e.type){case"table":r={dataSourceName:e.dataSourceName,workspaceId:e.workspaceId,gdbVersion:e.gdbVersion};break;case"queryTable":r={geometryType:d.fromJSON(e.geometryType),workspaceId:e.workspaceId,query:e.query,oidFields:e.oidFields,spatialReference:e.spatialReference};break;case"joinTable":r={leftTableSource:c(e.leftTableSource),rightTableSource:c(e.rightTableSource),leftTableKey:e.leftTableKey,rightTableKey:e.rightTableKey,joinType:f.fromJSON(e.joinType)};break;case"raster":r={workspaceId:e.workspaceId,dataSourceName:e.dataSourceName}}return r.type=b.fromJSON(e.type),t.fixJson(r)}Object.defineProperty(r,"__esModule",{value:!0}),r.MAPLAYER="map-layer",r.DATALAYER="data-layer";var d=new a.default({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon",esriGeometryMultiPatch:"multipatch"}),p=new a.default({mapLayer:r.MAPLAYER,dataLayer:r.DATALAYER}),b=new a.default({joinTable:"join-table",queryTable:"query-table"}),f=new a.default({esriLeftOuterJoin:"left-outer-join",esriLeftInnerJoin:"left-inner-join"});r.isMapLayerSource=o,r.isDataLayerSource=i,r.castSource=l,r.sourceToJSON=n,r.sourceFromJSON=c});