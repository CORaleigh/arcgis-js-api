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

define(["../../core/Accessor","../../core/kebabDictionary","../../geometry/support/jsonUtils"],function(e,i,t){var s=new i.KebabDictionary({109006:"centimeters",9102:"decimal-degrees",109005:"decimeters",9002:"feet",109009:"inches",9036:"kilometers",9001:"meters",9035:"miles",109007:"millimeters",109012:"nautical-miles",9096:"yards"});return e.createSubclass({declaredClass:"esri.tasks.support.GeneralizeParameters",properties:{geometries:null,deviationUnit:null,maxDeviation:null},toJSON:function(){var e=(this.geometries||[]).map(function(e){return e.toJSON()}),i={};return this.geometries&&this.geometries.length>0&&(i.geometries=JSON.stringify({geometryType:t.getJsonType(this.geometries[0]),geometries:e}),i.sr=JSON.stringify(this.geometries[0].spatialReference.toJSON())),this.deviationUnit&&(i.deviationUnit=s.toJSON(this.deviationUnit)),this.maxDeviation&&(i.maxDeviation=this.maxDeviation),i}})});