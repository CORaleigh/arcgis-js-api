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

define(["require","exports","../../../core/tsSupport/extendsHelper","../sources/Empty","../support/FeatureSet","../support/IdSet","../support/shared","../../../core/promiseUtils","../../../geometry/geometryEngineAsync"],function(e,t,r,n,i,a,s,o,l){var u=function(e){function t(t){var r=e.call(this,t)||this;return r._relation="",r._relationGeom=null,r._relationString="",r.declaredClass="esri.arcade.featureset.actions.SpatialFilter",r._relationString=t.relationString,r._parent=t.parentfeatureset,r._maxProcessing=40,r._relation=t.relation,r._relationGeom=t.relationGeom,r}return r(t,e),t.prototype._getSet=function(e){var t=this;return null===this._wset?this._ensureLoaded().then(function(){return t._parent._getFilteredSet("esriSpatialRelRelation"!==t._relation?t._relation:t._relation+":"+t._relationString,t._relationGeom,null,null,e)}).then(function(r){return t._checkCancelled(e),t._wset=new a(r._candidates.slice(0),r._known.slice(0),r._ordered,t._clonePageDefinition(r.pagesDefinition)),t._wset}):o.resolve(this._wset)},t.prototype._isInFeatureSet=function(e){var t=this._parent._isInFeatureSet(e);return t===s.IdState.NotInFeatureSet?t:(t=this._idstates[e],void 0===t?s.IdState.Unknown:t)},t.prototype._getFeature=function(e,t,r){return this._parent._getFeature(e,t,r)},t.prototype._getFeatures=function(e,t,r,n){return this._parent._getFeatures(e,t,r,n)},t.prototype._featureFromCache=function(e){return this._parent._featureFromCache(e)},t.prototype.executeSpatialRelationTest=function(e){if(null===e.geometry)return o.resolve(!1);switch(this._relation){case"esriSpatialRelEnvelopeIntersects":var t=s.shapeExtent(this._relationGeom),r=s.shapeExtent(e.geometry);return l.intersects(t,r);case"esriSpatialRelIntersects":return l.intersects(this._relationGeom,e.geometry);case"esriSpatialRelContains":return l.contains(this._relationGeom,e.geometry);case"esriSpatialRelOverlaps":return l.overlaps(this._relationGeom,e.geometry);case"esriSpatialRelWithin":return l.within(this._relationGeom,e.geometry);case"esriSpatialRelTouches":return l.touches(this._relationGeom,e.geometry);case"esriSpatialRelCrosses":return l.crosses(this._relationGeom,e.geometry);case"esriSpatialRelRelation":return l.relate(this._relationGeom,e.geometry,this._relationString)}},t.prototype._fetchAndRefineFeatures=function(e,t,r){var n=this,i=new a([],e,!1,null),l=Math.min(t,e.length);return this._parent._getFeatures(i,-1,l,r).then(function(){n._checkCancelled(r);for(var t=[],i=0;i<l;i++){var a=n._parent._featureFromCache(e[i]);t.push(n.executeSpatialRelationTest(a))}return o.all(t)}).then(function(r){for(var i=0;i<t;i++)!0===r[i]?n._idstates[e[i]]=s.IdState.InFeatureSet:n._idstates[e[i]]=s.IdState.NotInFeatureSet;return"success"})},t.prototype._getFilteredSet=function(e,t,r,n,i){var s=this;return this._ensureLoaded().then(function(){return s._parent._getFilteredSet("esriSpatialRelRelation"!==s._relation?s._relation:s._relation+":"+s._relationString,s._relationGeom,r,n,i)}).then(function(e){s._checkCancelled(i);return null!==t?new a(e._candidates.slice(0).concat(e._known.slice(0)),[],e._ordered,s._clonePageDefinition(e.pagesDefinition)):new a(e._candidates.slice(0),e._known.slice(0),e._ordered,s._clonePageDefinition(e.pagesDefinition))})},t.prototype._stat=function(e,t,r,n,i,a,s){var l=this;return""!==r?o.resolve({calculated:!1}):this._parent._stat(e,t,"esriSpatialRelRelation"!==this._relation?this._relation:this._relation+":"+this._relationString,this._relationGeom,i,a,s).then(function(o){return!1===o.calculated?null===i&&""===r&&null===n?l._manualStat(e,t,a,s):{calculated:!1}:o})},t.prototype._canDoAggregates=function(e,t,r,n,i){return""!==r||null!==n?o.resolve(!1):null===this._parent?o.resolve(!1):this._parent._canDoAggregates(e,t,"esriSpatialRelRelation"!==this._relation?this._relation:this._relation+":"+this._relationString,this._relationGeom,i)},t.prototype._getAggregatePagesDataSourceDefinition=function(e,t,r,n,i,a,s){return null===this._parent?o.reject(new Error("Should never be called")):this._parent._getAggregatePagesDataSourceDefinition(e,t,"esriSpatialRelRelation"!==this._relation?this._relation:this._relation+":"+this._relationString,this._relationGeom,i,a,s)},t.prototype.arcadeScriptStep=function(e,t,r){var n=this.arcadeAssignNextScriptStepIdentifiers(r);switch(this._relation){case"esriSpatialRelEnvelopeIntersects":var i=null===this._relationGeom?null:this._relationGeom.extent;return"var "+n.newFeatureSet+" = "+this.bigDataCachePipeline("envelopeIntersects( "+n.currentFeatureSet+","+this.constructArcadeGeom(i,t,r)+")")+"; ";case"esriSpatialRelIntersects":return"var "+n.newFeatureSet+" = "+this.bigDataCachePipeline("intersects( "+n.currentFeatureSet+","+this.constructArcadeGeom(this._relationGeom,t,r)+")")+"; ";case"esriSpatialRelContains":return"var "+n.newFeatureSet+" = "+this.bigDataCachePipeline("contains( "+n.currentFeatureSet+","+this.constructArcadeGeom(this._relationGeom,t,r)+")")+"; ";case"esriSpatialRelOverlaps":return"var "+n.newFeatureSet+" = "+this.bigDataCachePipeline("overlaps( "+n.currentFeatureSet+","+this.constructArcadeGeom(this._relationGeom,t,r)+")")+"; ";case"esriSpatialRelWithin":return"var "+n.newFeatureSet+" = "+this.bigDataCachePipeline("within( "+n.currentFeatureSet+","+this.constructArcadeGeom(this._relationGeom,t,r)+")")+"; ";case"esriSpatialRelTouches":return"var "+n.newFeatureSet+" = "+this.bigDataCachePipeline("touches( "+n.currentFeatureSet+","+this.constructArcadeGeom(this._relationGeom,t,r)+")")+"; ";case"esriSpatialRelCrosses":return"var "+n.newFeatureSet+" = "+this.bigDataCachePipeline("crosses( "+n.currentFeatureSet+","+this.constructArcadeGeom(this._relationGeom,t,r)+")")+"; ";case"esriSpatialRelRelation":return"var "+n.newFeatureSet+" = "+this.bigDataCachePipeline("relate( "+n.currentFeatureSet+","+this.constructArcadeGeom(this._relationGeom,t,r)+', "'+this._relationString+'")')+";"}return"var "+n.newFeatureSet+" = null; "},t}(i);return i._featuresetFunctions.intersects=function(e){return null===e||void 0===e?new n({parentfeatureset:this}):new u({parentfeatureset:this,relation:"esriSpatialRelIntersects",relationGeom:e})},i._featuresetFunctions.envelopeIntersects=function(e){return null===e||void 0===e?new n({parentfeatureset:this}):new u({parentfeatureset:this,relation:"esriSpatialRelEnvelopeIntersects",relationGeom:e})},i._featuresetFunctions.contains=function(e){return null===e||void 0===e?new n({parentfeatureset:this}):new u({parentfeatureset:this,relation:"esriSpatialRelContains",relationGeom:e})},i._featuresetFunctions.overlaps=function(e){return null===e||void 0===e?new n({parentfeatureset:this}):new u({parentfeatureset:this,relation:"esriSpatialRelOverlaps",relationGeom:e})},i._featuresetFunctions.within=function(e){return null===e||void 0===e?new n({parentfeatureset:this}):new u({parentfeatureset:this,relation:"esriSpatialRelWithin",relationGeom:e})},i._featuresetFunctions.touches=function(e){return null===e||void 0===e?new n({parentfeatureset:this}):new u({parentfeatureset:this,relation:"esriSpatialRelTouches",relationGeom:e})},i._featuresetFunctions.crosses=function(e){return null===e||void 0===e?new n({parentfeatureset:this}):new u({parentfeatureset:this,relation:"esriSpatialRelCrosses",relationGeom:e})},i._featuresetFunctions.relate=function(e,t){return null===e||void 0===e?new n({parentfeatureset:this}):new u({parentfeatureset:this,relation:"esriSpatialRelRelation",relationGeom:e,relationString:t})},u});