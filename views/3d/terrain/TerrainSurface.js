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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../Color","../../../core/Accessor","../../../core/arrayUtils","../../../core/CollectionFlattener","../../../core/Handles","../../../core/Logger","../../../core/ObjectPool","../../../core/PooledArray","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../core/libs/gl-matrix-2/mat4","../../../core/libs/gl-matrix-2/mat4f64","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../../../core/libs/gl-matrix-2/vec4f64","../../../geometry/support/aaBoundingRect","../../../layers/support/LercWorker","../support/Evented","../support/geometryUtils","../support/index","../support/mathUtils","../support/projectionUtils","../support/PromiseLightweight","./ElevationData","./ElevationTileAgent","./MapTileAgent","./OverlayManager","./PlanarTile","./SphericalTile","./SurfaceExtentHelper","./SurfaceTilingSchemeLogic","./TerrainConst","./TerrainRenderer","./terrainUtils","./TileGeometryFactory","./TilemapOnlyTile","./tileUtils","./tileUtils","./UpsampleInfo","../../vectorTiles/VectorTileDisplayObject","../../webgl/Texture","../../webgl/Util"],function(e,t,i,r,a,n,s,l,o,p,h,d,u,c,_,y,f,v,g,m,T,S,L,P,w,E,x,b,U,O,R,I,V,C,M,D,A,q,j,k,B,N,F,H,G,X){function W(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}function z(e){return e&&("cancel"===e||"cancel"===e.dojoType||"AbortError"===e.name)}function Y(e,t){var i=!1;t=t||e;for(var r=0,a=e.children;r<a.length;r++){var n=a[r];if(n){for(var s in n.layerInfo)for(var l in n.layerInfo[s]){var o=n.layerInfo[s][l].upsampleFromTile;if(o&&o.tile===t)return!0}i=i||Y(n,t)}}return i}function Z(e){return null!=e.refreshInterval}var K=p.getLogger("esri.views.3d.terrain.TerrainSurface"),J=function(e){function t(t,i){var r=e.call(this)||this;r.defaultTileBackground=D.DEFAULT_TILE_BACKGROUND,r.hideSkirtsDistanceFromExtentMargin=Q,r.hideSkirtsMinimumCameraTilt=$,r.hideSkirtsMaximumCameraTilt=ee,r._clippingExtent=null,r._dataExtent=null,r._elevationBounds=[0,0],r._rootExtent=m.create(),r._iteratorPool=new h(N.IteratorPreorder),r._postorderIterator=new N.IteratorPostorder,r.visible=!1,r.suspended=!1,r._pendingUpdates=!1,r._lvPendingUpdates=!1,r._updateNextFrame=0,r._vectorTileLayerRequests=0,r._memoryUsed=0,r._overlayOpacity=1,r._eyePosRenderSR=v.vec3f64.create(),r._eyePosSurfaceSR=v.vec3f64.create(),r._splitLimits=[0,0,0,0,0,0],r._frustum=L.frustum.create(),r._viewProjectionMatrix=y.mat4f64.create(),r.tilemapStats={tilemapRequestsSent:0,tilemapRequestsPending:0,tilemapRequestErrors:0,fullTilemaps:0,emptyTilemaps:0,tilesRequested:0,tileRequestsSent:0,tileRequestErrors:0,tilesNotPresent:0},r._layerViews=[[],[]],r._layerIndexByLayerViewId=[{},{}],r._basemapLayerViewHandles={},r._handles=new o,r._lowPrioUpdates=new d,r._topLevelTilemapOnlyTiles=new Array(D.TILEMAP_SIZE_EXP+1),r._upsampleInfoPool=new h(F),r._getElevationData={spatialReference:null,rootTiles:null},r.loaded=!1,r.maxTextureScaleRaster=1.2,r.maxTextureScaleVector=1.8,r.rootTiles=null,r.backgroundImage=D.DEFAULT_TILE_BACKGROUND,r.backgroundColor=null,r._lercWorker=T.acquireInstance(t.resourceController.scheduler);for(var a=0;a<r._topLevelTilemapOnlyTiles.length;a++)r._topLevelTilemapOnlyTiles[a]=new k([a-D.TILEMAP_SIZE_EXP,0,0],r._upsampleInfoPool);return r}return i(t,e),t.prototype.normalizeCtorArgs=function(e,t){return this._view=e,this._stage=e._stage,this._set("manifold",t),{}},t.prototype.initialize=function(){var e=this;this._tilePool=new h("planar"===this.manifold?I:V),this._memCache=this._view.resourceController.memoryController.getMemCache("esri.views.3d.terrain",function(t){return e._renderer.releaseTileGeometry(t.renderData)}),this._renderer=new A(this.manifold,this._memCache),this._renderer.loaded=this._setLoaded.bind(this),this._renderer.install(this._view._stage),u.init(this,"_background",function(){e._renderer.updateTileBackground(e._background)}),this._handles.add(this._view.watch("pointsOfInterest",function(t){e._renderer.pointsOfInterest=t})),this._set("overlayManager",new R({terrainSurface:this,view:this._view})),this._handles.add(this.watch("overlayManager.hasHighlights",this._handleHasHighlights.bind(this)),"overlayManager");var t={layers:this._view.map.allLayers,layerViews:this._view.allLayerViews,spatialReference:this._view.spatialReference};this.extentHelper="spherical"===this.manifold?new C.SurfaceExtentHelperGlobal(t):new C.SurfaceExtentHelperLocal(t),this._handles.add(u.init(this.extentHelper,"stencilEnabledExtents",function(t){e._renderer.setStencilEnabledLayerExtents(t)}),"extentHelper");var i=this._view.defaultsFromMap?new l({root:this._view.map,rootCollectionNames:this._view.defaultsFromMap.mapCollectionPaths,getChildrenFunction:function(e){return e.layers}}):this._view.map.allLayers,r=new M({layers:i,extentHelper:this.extentHelper,manifold:this.manifold,viewSpatialReference:this._view.spatialReference});this._set("tilingSchemeLogic",r),this._handles.add([this.tilingSchemeLogic.watch("tilingScheme",this._updateTilingSchemeAndExtent.bind(this),!0),this.tilingSchemeLogic.watch("extent",this._updateTilingSchemeAndExtent.bind(this),!0)],"tilingSchemeLogic"),this._updateTilingSchemeAndExtent(),this._streamDataSupplier=this._view.resourceController.getStreamDataSupplier(P.ClientType.TERRAIN);var a=this._view.resourceController.scheduler;this._handles.add(a.registerTask(1,function(t){return e._frame(t)},function(){return e.ready})),this._viewChangeUpdate=this._viewChangeUpdate.bind(this),this._view.resourceController.memoryController.events.on("quality-changed",function(){return e._viewChangeUpdate()}),this._handles.add([this._view.on("resize",this._viewChangeUpdate),this._view.watch("state.camera",this._viewChangeUpdate,!0),this._view.watch("qualitySettings.tiledSurface.lodBias",this._viewChangeUpdate),this._view.watch("clippingArea",this._clippingChanged.bind(this))],"view"),this._handles.add(this._view.allLayerViews.on("change",this._handleLayerViewChanges.bind(this)),"allLayerViews"),this._handleLayerViewChanges({added:this._view.allLayerViews.toArray(),removed:[],moved:[],target:this._view.allLayerViews}),this._updateClippingExtent(),this.notifyChange("extent")},t.prototype.destroy=function(){this._handles.destroy(),T.releaseInstance(this._lercWorker),this._lercWorker=null,this._removeAllTiles(),this._memCache.destroy(),this._memCache=null,this.tilingSchemeLogic.destroy(),this._set("tilingSchemeLogic",null),this.extentHelper.destroy(),this.extentHelper=null;for(var e in this._basemapLayerViewHandles)this._unregisterTiledLayerView(e);this._streamDataSupplier=null,this.overlayManager&&(this.overlayManager.destroy(),this._set("overlayManager",null)),this._tilePool.destroy(),this._tilePool=null,U.Pool.prune(0),O.Pool.prune(0),this._renderer.destroy(this._stage),this._renderer=null,this._iteratorPool.destroy(),this._iteratorPool=null,this._view=null,this._stage=null,this._streamDataSupplier=null,this._upsampleInfoPool.destroy(),this._upsampleInfoPool=null},Object.defineProperty(t.prototype,"renderer",{get:function(){return this._renderer},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"frustum",{get:function(){return this._frustum},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"upsampleInfoPool",{get:function(){return this._upsampleInfoPool},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"cullBackFaces",{set:function(e){this._renderer.cullBackFaces=e,this._set("cullBackFaces",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"extent",{get:function(){return this._clippingExtent||this._rootExtent},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"baseOpacity",{set:function(e){this._renderer.opaque=e>=1,this._set("baseOpacity",e),this._updateTileTextures(!0)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"maxTextureScale",{get:function(){for(var e=!1,t=!1,i=0,r=this._layerViews[D.LayerClass.MAP];i<r.length;i++){var a=r[i],n=a.layer;n.visible&&0!==n.opacity&&("vector-tile"===n.type?e=!0:t=!0)}return e&&!t?this.maxTextureScaleVector:this.maxTextureScaleRaster},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"ready",{get:function(){return!!this.rootTiles},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"renderOrder",{set:function(e){this._renderer.renderOrder=e,this._set("renderOrder",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"skirtScale",{set:function(e){this._renderer.skirtScale=e,this._set("skirtScale",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"spatialReference",{get:function(){var e=this.tilingScheme&&this.tilingScheme.spatialReference||null;return this._getElevationData.spatialReference=e,e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_background",{get:function(){return null!=this.backgroundColor?this.backgroundColor:this.backgroundImage},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"slicePlaneEnabled",{set:function(e){this._renderer.slicePlaneEnabled=e,this._set("slicePlaneEnabled",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"velvetOverground",{set:function(e){e!==this.velvetOverground&&(this._renderer.velvetOverground=e),this._set("velvetOverground",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"wireframe",{set:function(e){this._renderer.setWireframe(e),this._set("wireframe",e)},enumerable:!0,configurable:!0}),t.prototype.setVisibility=function(e){e!==this.visible&&(this.visible=e,this._renderer.setVisibility(e),this.setUpdatesDisabled(!e),e&&this._viewChangeUpdate())},t.prototype.isVisible=function(){return this.visible&&this.ready},t.prototype.isOpaque=function(){return this._renderer.isOpaque()},t.prototype.setUpdatesDisabled=function(e){this.suspended=e,e||this._viewChangeUpdate()},t.prototype.intersect=function(e,t,i,r){this._renderer.intersect(e,t,i,r,null)},t.prototype.getElevation=function(e){var t=this._getElevationData.rootTiles;if(!t||!t.length)return null;var i=D.LayerClass.ELEVATION;if(0===t[0].layerInfo[i].length)return null;var r=ie;if(Array.isArray(e))r=e;else{var a=e;if("point"===a.type&&!E.pointToVector(a,r,this._getElevationData.spatialReference))return K.error("TerrainSurface.getElevation(): could not project given point to tiling scheme coordinate system"),null}for(var n=0;n<t.length;n++){var s=t[n];if(B.isPosWithinTile(s,r)){for(;s&&!s.renderData;){var l=0;r[0]>.5*(s.extent[0]+s.extent[2])&&(l+=1),r[1]<.5*(s.extent[1]+s.extent[3])&&(l+=2),s=s.children[l]}var o=s.renderData,p=o&&o.geometryState?o.geometryState.samplerData:null;return p?j.elevationSampler(r[0],r[1],p):null}}return null},t.prototype.getElevationBounds=function(){return this._elevationBounds},t.prototype.getScale=function(e){if(this.tilingScheme){if(!E.pointToVector(e,ie,this.spatialReference))return K.error("TerrainSurface.getElevation(): could not project given point to tiling scheme coordinate system"),null;if(this.rootTiles)for(var t=0;t<this.rootTiles.length;t++){var i=this.rootTiles[t];if(B.isPosWithinTile(i,ie)){for(;i.children[0];){var r=0;ie[0]>i.children[0].extent[2]&&(r+=1),ie[1]<i.children[0].extent[1]&&(r+=2),i=i.children[r]}return this._getLodBiasCorrectedScale(i.lij[0])}}}return 1e100},t.prototype.queryVisibleScaleRange=function(e,t,i,r){var a=t?this.tilingScheme.levelAtScale(t):0,n=i?this.tilingScheme.levelAtScale(i):1/0,s=this._getLodBias();this._renderer.queryVisibleLevelRange(e,a+s,n+s,r)},t.prototype._setLoaded=function(){this.loaded||this._set("loaded",!0)},t.prototype._updateTilingSchemeAndExtent=function(){var e=this.tilingSchemeLogic.extent,t=e&&!m.equals(e,this._dataExtent);t&&(this._dataExtent?m.set(this._dataExtent,e):this._dataExtent=m.create(e));var i=this.tilingSchemeLogic.tilingScheme,r=i!==this.tilingScheme;r&&(q.weakAssert(!!i,"tiling scheme cannot be reset to undefined"),this.tilingScheme&&this._removeAllTiles(),this._set("tilingScheme",i),this._updateClippingExtent(),i&&(this._updateTiledLayers(),this._renderer.setTileSize(i.pixelSize[0]),this.overlayManager.setSpatialReference(i.spatialReference,"spherical"===this.manifold))),(t||r)&&this._updateRootTiles()},t.prototype._acquireTile=function(e,t,i,r){var a=this._tilePool.acquire();return ae[0]=e,ae[1]=t,ae[2]=i,a.init(ae,r,this),a},t.prototype._updateRootTiles=function(){var e=this,t=this._clippingExtent||this._dataExtent,i=this.tilingScheme;if(t&&i){var r=re,a=i.rootTilesInExtent(t,r,1/0),n=function(t){var i=e._acquireTile(0,t[1],t[2],null);return i.shouldSplit(e._splitLimits,e._eyePosRenderSR)===D.TileUpdate.SPLIT&&i.setPendingUpdate(D.TileUpdate.SPLIT),e._loadTile(i),i};if(this.rootTiles){if(a.length>D.MAX_ROOT_TILES)return void K.warn(D.TOO_MANY_ROOT_TILES_AFTER_CHANGE_ERROR);var l=this.rootTiles.map(function(e){return e.lij}),o=s.difference(l,a,W);if(o.removed.length>0||o.added.length>0){var p=this.rootTiles.filter(function(t){return!(s.findIndex(o.removed,W.bind(null,t.lij))>-1&&(e._purgeTile(t),1))});o.added.forEach(function(e){return p.push(n(e))}),this._setRootTiles(p)}}else a.length>D.MAX_ROOT_TILES&&(K.warn(D.TOO_MANY_ROOT_TILES_FOR_LAYER_ERROR),a=i.rootTilesInExtent(t,r,D.MAX_ROOT_TILES)),this._setRootTiles(a.map(function(e){return n(e)}));s.equals(r,this._rootExtent)||(this._rootExtent=m.create(r),this._hasFixedExtent()||this.notifyChange("extent")),this.setVisibility(!0),this._viewChangeUpdate(),this.overlayManager.setOverlayPlacementDirty(),this.notifyChange("ready")}},t.prototype._setRootTiles=function(e){this._set("rootTiles",e),this._getElevationData.rootTiles=e,this._renderer.setRootTiles(this.rootTiles)},t.prototype._viewChangeUpdate=function(){this._stage&&!this.suspended&&this.tilingScheme&&this.visible&&(this._updateViewDependentParameters(),this._updateSkirts(),this._updateOverlayOpacity(this._eyePosSurfaceSR[2]),this._updateTiles())},t.prototype._updateClippingStatus=function(e){e.updateClippingStatus(this._clippingExtent)&&e.resetPendingUpdate(D.TileUpdate.GEOMETRY)&&this._updateTileGeometry(e)},t.prototype._updateTiles=function(e){if(void 0===e&&(e=this.rootTiles),e){var t=this._iteratorPool.acquire();t.reset(e);var i,r,a=this._splitLimits;for(B.hasVisibleSiblings(e)?(i=this._elevationBounds[0],r=this._elevationBounds[1]):(i=1/0,r=-1/0);!t.done;){var n=t.next();if(this._updateClippingStatus(n),n.updateVisibility(),n.visible){n.updateScreenDepth(this._viewProjectionMatrix),n.renderData&&(i=Math.min(n.elevationBounds[0],i),r=Math.max(n.elevationBounds[1],r));var s=n.shouldSplit(a,this._eyePosRenderSR);if(s===D.TileUpdate.SPLIT){n.resetPendingUpdate(D.TileUpdate.MERGE),n.isLeaf&&(n.setPendingUpdate(D.TileUpdate.SPLIT),t.skipSubtree()),this._pendingUpdates=this._pendingUpdates||n.hasPendingUpdates;continue}n.resetPendingUpdate(D.TileUpdate.SPLIT)&&n.updateAgentSuspension(),s===D.TileUpdate.VSPLITMERGE&&n.updateAgents(D.LayerClass.ELEVATION)}if(t.skipSubtree(),!n.renderData){n.setPendingUpdate(D.TileUpdate.MERGE),n.resetPendingUpdate(D.TileUpdate.SPLIT);var l=this._iteratorPool.acquire();for(l.resetOne(n);!l.done;){var o=l.next();this._updateClippingStatus(o),o.updateVisibility(),o.visible&&o.updateScreenDepth(this._viewProjectionMatrix)}this._iteratorPool.release(l)}this._pendingUpdates=this._pendingUpdates||n.hasPendingUpdates}this._iteratorPool.release(t),isFinite(i)&&isFinite(r)&&(this._elevationBounds[0]===i&&this._elevationBounds[1]===r||(this._elevationBounds[0]=i,this._elevationBounds[1]=r,this.emit("elevation-bounds-change",null)))}},t.prototype._updateViewDependentParameters=function(){var e=this._view.state.camera,t=Math.tan(.5*e.fovX),i=Math.tan(.5*e.fovY),r=this.tilingScheme.pixelSize,a=Math.pow(2,-this._getLodBias())*e.pixelRatio;this._splitLimits[0]=t,this._splitLimits[1]=r[0]/e.width*this.maxTextureScale*a,this._splitLimits[2]=i,this._splitLimits[3]=r[1]/e.height*this.maxTextureScale*a,this._splitLimits[4]=this.tilingScheme.getMaxLod(),this._splitLimits[5]=this._view.qualitySettings.tiledSurface.angledSplitBias,L.frustum.copy(e.frustum,this._frustum),_.mat4.multiply(this._viewProjectionMatrix,e.projectionMatrix,e.viewMatrix),f.vec3.copy(this._eyePosRenderSR,e.eye),E.vectorToVector(this._eyePosRenderSR,this._view.renderSpatialReference,this._eyePosSurfaceSR,this.spatialReference)},t.prototype._updateSkirts=function(){var e=this._view.state.camera;q.autoUpdateSkirtsVisibility(this,this._eyePosSurfaceSR,e.near)},t.prototype._setLayerViewsUpdating=function(){for(var e=0;e<D.LayerClass.COUNT;e++)for(var t=this._layerViews[e],i=0;i<t.length;i++)t[i].updatingChanged(this._pendingUpdates)},t.prototype._updateTileGeometry=function(e){e.updateVisibility(),this._renderer.updateTileGeometry(e),this._elevationUpdate(e),this._memoryUsed=0},t.prototype._elevationUpdate=function(e){ne.spatialReference=this.spatialReference,ne.tile=e,ne.extent=e.extent,this.emit("elevation-change",ne),m.containsPoint(e.extent,this._eyePosSurfaceSR)&&this._updateSkirts()},t.prototype._frame=function(e){var t=this;this._frameTraversal(e),e.run(function(){return B.sortTiles(t._renderer.renderOrder,t._lowPrioUpdates),!1}),this._processElevation(e)&&this._processTextures(e)&&!this._streamDataSupplier.hasPendingDownloads()&&0===this._vectorTileLayerRequests||(this._pendingUpdates=!0),!e.done&&this.isVisible()&&this.overlayManager&&this.overlayManager.overlaysNeedUpdate()&&(this.overlayManager.updateOverlays(),this._updateOverlayOpacity(this._eyePosSurfaceSR[2])),this._lowPrioUpdates.clear(),this._pendingUpdates!==this._lvPendingUpdates&&(this._pendingUpdates||20==++this._updateNextFrame)&&(this._setLayerViewsUpdating(),this._lvPendingUpdates=this._pendingUpdates,this._updateNextFrame=0)},t.prototype._frameTraversal=function(e){if(!this.suspended&&this._pendingUpdates){this._lowPrioUpdates.clear(),this._pendingUpdates=!1;var t=this._renderer.resourceCounter,i=t.numTileTexturesComposited,r=this._iteratorPool.acquire();r.reset(this.rootTiles);for(var a=0,n=[];!r.done&&!e.done&&t.numTileTexturesComposited-i<te;){var s=r.next();a+=s.memoryUsed,s.resetPendingUpdate(D.TileUpdate.MERGE)?(this._mergeTile(s),e.madeProgress(),r.skipSubtree()):s.resetPendingUpdate(D.TileUpdate.SPLIT)?(this._splitTile(s)&&(this._pendingUpdates=!0,n.push(s)),e.madeProgress(),r.skipSubtree()):s.hasPendingUpdates&&this._lowPrioUpdates.push(s),this._pendingUpdates=this._pendingUpdates||s.hasPendingUpdates,r.done&&(r.reset(n),n.length=0)}r.done?this._memoryUsed=a:this._pendingUpdates=!0,this._iteratorPool.release(r)}},t.prototype._processElevation=function(e){for(var t=this,i=this,r=0;r<this._lowPrioUpdates.length;++r){var a=function(r){var a=i._lowPrioUpdates.data[r];if(!e.run(function(){if(a.resetPendingUpdate(D.TileUpdate.GEOMETRY))return t._updateTileGeometry(a),!0}))return{value:!1}}(r);if("object"==typeof a)return a.value}return!0},t.prototype._processTextures=function(e){for(var t=this,i=this,r=0;r<this._lowPrioUpdates.length;++r){var a=function(r){var a=i._lowPrioUpdates.data[r];if(!e.run(function(){return!!a.resetPendingUpdate(D.TileUpdate.TEXTURE)&&(t._renderer.updateTileTexture(a),t._memoryUsed=0,!0)}))return{value:!1}}(r);if("object"==typeof a)return a.value}return!0},t.prototype._updateClippingExtent=function(){if(!this.spatialReference)return!1;var e=m.create(),t=null;return E.extentToBoundingRect(this._view.clippingArea,e,this.spatialReference)&&(t=e),!s.equals(t,this._clippingExtent)&&(this._memCache.clear(),this._clippingExtent=t,this._renderer.clippingExtent=t,this.notifyChange("extent"),this._updateTileOverlayParams(),this.overlayManager.setOverlayPlacementDirty(),!0)},t.prototype._clippingChanged=function(){this._updateClippingExtent()&&this._updateRootTiles()},t.prototype._getLodBias=function(){var e=this._view.resourceController.memoryController.memoryFactor;return this._view.qualitySettings.tiledSurface.lodBias-(1-e)*D.MAX_MEMORY_LOD_BIAS},t.prototype._getLodBiasCorrectedScale=function(e){var t=this.tilingScheme.levels,i=w.clamp(e-this._getLodBias(),0,t.length-1),r=Math.floor(i),a=i-r;return t[Math.floor(i)].scale*(1-a)+t[Math.ceil(i)].scale*a},t.prototype._cancelTilemapRequests=function(e){for(var t=0;t<D.LayerClass.COUNT;t++){var i=e.layerInfo[t];if(i)for(var r=0;r<i.length;r++){var a=i[r];a.tilemapRequest&&(a.tilemapRequest.cancel(),a.tilemapRequest=null)}}},t.prototype._removeAllTiles=function(){var e=this;this.rootTiles&&(this.rootTiles.forEach(function(t){return e._purgeTile(t)}),this._setRootTiles(null),this.notifyChange("ready"));for(var t=0;t<this._topLevelTilemapOnlyTiles.length;t++){var i=this._topLevelTilemapOnlyTiles[t];this._cancelTilemapRequests(i)}this.setVisibility(!1)},t.prototype._purgeChildTiles=function(e){for(var t in e.children){var i=e.children[t];null!=i&&(e.children[t]=null,this._purgeTile(i))}},t.prototype._purgeTile=function(e){this._purgeChildTiles(e),e.unload(this._renderer),this._cancelTilemapRequests(e),e.dispose(),this._tilePool.release(e)},t.prototype._splitTile=function(e){var t=e.lij[0]+1,i=2*e.lij[1],r=2*e.lij[2];return e.children[0]=this._createTile(t,i,r,e),e.children[1]=this._createTile(t,i,r+1,e),e.children[2]=this._createTile(t,i+1,r,e),e.children[3]=this._createTile(t,i+1,r+1,e),e.unload(this._renderer),se.spatialReference=this.spatialReference,se.extent=e.extent,se.scale=this._getLodBiasCorrectedScale(t),this.emit("scale-change",se),e.children[0].hasPendingUpdate(D.TileUpdate.SPLIT)||e.children[1].hasPendingUpdate(D.TileUpdate.SPLIT)||e.children[2].hasPendingUpdate(D.TileUpdate.SPLIT)||e.children[3].hasPendingUpdate(D.TileUpdate.SPLIT)},t.prototype._createTile=function(e,t,i,r){q.weakAssert(!!r,"_createTile sanity check");var a=this._acquireTile(e,t,i,r);return a.updateClippingStatus(this._clippingExtent),a.visible&&(a.updateScreenDepth(this._viewProjectionMatrix),a.shouldSplit(this._splitLimits,this._eyePosRenderSR)===D.TileUpdate.SPLIT&&a.setPendingUpdate(D.TileUpdate.SPLIT)),this._loadTile(a),a},t.prototype._mergeTile=function(e){q.weakAssert(!e.renderData,"_mergeTile sanity check"),q.weakAssert(!e.hasPendingUpdate(D.TileUpdate.SPLIT),"_mergeTile sanity check"),this._loadTile(e),this._purgeChildTiles(e),se.spatialReference=this.spatialReference,se.extent=e.extent,se.scale=this._getLodBiasCorrectedScale(e.lij[0]),this.emit("scale-change",se)},t.prototype._loadTile=function(e){e.load(this._renderer),this.overlayManager&&this.overlayManager.hasOverlays()&&this.overlayManager.setOverlayParamsOfTile(e,e.renderData,this._overlayOpacity),this._elevationUpdate(e)},t.prototype._handleHasHighlights=function(e){this._renderer.setNeedsHighlight(e)},t.prototype._elevationDataUpdated=function(e,t){var i=e.layerInfo[D.LayerClass.ELEVATION][t],r=[e],a=e.lij[0],n=this._iteratorPool.acquire();for(n.reset(r);!n.done;){var s=n.next();s.findElevationBoundsForLayer(t,a),s.computeElevationBounds()}this._iteratorPool.release(n),e.dataArrived(t,D.LayerClass.ELEVATION,i.data),this._updateTiles(r)},t.prototype._handleLayerViewChanges=function(e){var t=this,i=!1;e.added.forEach(function(e){var r=e.layer;q.isTiledLayerView(e)?(t._registerTiledLayer(e),r.loaded&&(i=!0)):e.supportsDraping&&t.overlayManager&&t.overlayManager.registerLayerView(e)}),e.removed.forEach(function(e){q.isTiledLayerView(e)?(i=!0,t._unregisterTiledLayerView(e.uid)):e.supportsDraping&&t.overlayManager&&t.overlayManager.unregisterLayerView(e)}),(i=i||e.moved.filter(q.isTiledLayerView).length>0)&&this._updateTiledLayers()},t.prototype._registerTiledLayer=function(e){var t=this,i=[];i.push(e.watch("visible",function(){return t._updateTiledLayers()})),i.push(e.watch("fullOpacity",function(){return t._updateTileTextures()})),e.on("data-changed",function(){var i=q.isElevationLayerView(e)?D.LayerClass.ELEVATION:D.LayerClass.MAP,r=t._layerIndexByLayerViewId[i][e.uid];null!=r&&t._invalidateLayerData(r,i)}),this._basemapLayerViewHandles[e.uid]=i},t.prototype._unregisterTiledLayerView=function(e){var t=this._basemapLayerViewHandles[e];if(t){for(var i=0;i<t.length;i++)t[i].remove();delete this._basemapLayerViewHandles[e]}},t.prototype._updateTiledLayers=function(){var e=this;if(this.tilingScheme){var t=this._view.allLayerViews,i=[[],[]],r=null,a=m.empty(),n=function(t){var n=t.layer;if(n&&t.visible&&q.isTiledLayerView(t)){var s=t.fullExtent;if(!s)return void K.warn("Terrain: Map or elevation layer does not have fullExtent: "+n.id);if(!e.tilingScheme.compatibleWith(t.tileInfo))return void K.warn("Terrain: tiling scheme of layer "+n.id+" is incompatible with other tiled layers, will not be drawn");m.expand(a,s),q.isElevationLayerView(t)?i[D.LayerClass.ELEVATION].push(t):(t.maxDataLevel!==1/0&&(null===r||t.maxDataLevel>r)&&(r=t.maxDataLevel),i[D.LayerClass.MAP].push(t))}};t.forEach(n,this);for(var s=this,l=0;l<D.LayerClass.COUNT;l++)!function(e){var t=s._layerViews[e],r=i[e];r.reverse();var a=r.length,n=t.length!==a,l=new Array(a),o=new Array(t.length);s._layerIndexByLayerViewId[e]={};for(var p=0;p<a;p++){var h=r[p].uid;s._layerIndexByLayerViewId[e][h]=p;var d=t.indexOf(r[p]);l[p]=d,p!==d&&(n=!0),d>-1&&(o[d]=p)}if(n){s._topLevelTilemapOnlyTiles.forEach(function(t){return t.modifyLayers(o,l,e)});var u=s._postorderIterator;for(u.reset(s.rootTiles);!u.done;)u.next().modifyLayers(o,l,e);for(s._layerViews[e]=r,e===D.LayerClass.ELEVATION&&s._memCache.clear(),u.reset(s.rootTiles);!u.done;){var c=u.next();c.restartAgents(e),e===D.LayerClass.ELEVATION&&c.computeElevationBounds()}s._updateTiles()}}(l);this.tilingScheme.levels.length-1<r&&(this.tilingScheme.ensureMaxLod(r),this._viewChangeUpdate())}},t.prototype._hasFixedExtent=function(){return!!this._clippingExtent},t.prototype.layerViewByIndex=function(e,t){return this._layerViews[t][e]},t.prototype.numLayers=function(e){return this._layerViews[e].length},t.prototype._updateTileTextures=function(e){void 0===e&&(e=!1);var t=this._iteratorPool.acquire();for(t.reset(this.rootTiles);!t.done;)t.next().updateTexture();this._iteratorPool.release(t)},t.prototype._invalidateLayerData=function(e,t){var i=this._iteratorPool.acquire();for(i.reset(this.rootTiles);!i.done;)i.next().removeLayerAgent(e,t);for(i.reset(this.rootTiles);!i.done;)i.next().invalidateLayerData(e,t);this._iteratorPool.release(i),t===D.LayerClass.ELEVATION&&this._memCache.clear()},t.prototype.setPendingUpdates=function(){this._pendingUpdates=!0},t.prototype.requestTileData=function(e,t,i){var r=this;this.tilemapStats.tilesRequested++;var a=this.layerViewByIndex(t,i),n=a.layer;if(n.tilemapCache&&!q.isVectorTileLayerView(a)){var s=this.getTilemapTile(e),l=s.layerInfo[i][t];if(!l.tilemap){l.tilemapRequest||(l.tilemapRequest=this.requestTilemap(s,t,i,a,n));var o,p=new x.default(function(){return o&&o.cancel()});return l.tilemapRequest.catch(function(){}).then(function(){if(l.tilemapRequest=null,!p.isCancelled()){var t=r._layerIndexByLayerViewId[i][a.uid];null!=t&&(s.hasDataAvailable(e,t,i)?(o=r._requestTileData(e,t,i,a),o.then(function(){return p.resolve()})):(r.tilemapStats.tilesNotPresent++,r._dispatchDataEvent(e,"dataMissing",i,a,{notInTilemap:!0}),p.reject()))}}),p}if(!s.hasDataAvailable(e,t,i)){this.tilemapStats.tilesNotPresent++,this._dispatchDataEvent(e,"dataMissing",i,a,{notInTilemap:!0});var h=new x.default;return h.reject(),h}}return this._requestTileData(e,t,i,a)},t.prototype._requestTileData=function(e,t,i,r){return this.tilemapStats.tileRequestsSent++,i===D.LayerClass.ELEVATION?this._requestElevationTileData(e,t,i,r):this._requestMapTileData(e,t,i,r)},t.prototype._requestElevationTileData=function(e,t,i,r){var a=this;if(!q.isElevationLayerView(r))return void q.weakAssert(!1,"_requestElevationTileData can only be called for elevation layer views");var n=function(n){var s=a._layerIndexByLayerViewId[i][r.uid];if(null==s)return void K.warn("TerrainSurface: received data from unknown layer %d %s",i,e.lij.toString());var l=e.layerInfo[i][s];a._memoryUsed=0,l.data=b.create(e.lij,e.extent,n),a._elevationDataUpdated(e,t),a._pendingUpdates=!0},s=function(t){z(t)||(a.tilemapStats.tileRequestErrors++,a._dispatchDataEvent(e,"dataMissing",i,r,t))};if(q.useFetchTileForLayer(r.layer))return r.layer.fetchTile(e.lij[0],e.lij[1],e.lij[2],D.ELEVATION_NODATA_VALUE).then(function(e){return n(e)},s);var l=r.getTileUrl(e.lij[0],e.lij[1],e.lij[2]),o=this._streamDataSupplier.request(l,"binary");return o.then(function(e){return a._lercWorker.decode(e.data,D.noDataValueOpt).then(function(e){return n({values:e.pixelData,width:e.width,height:e.height,noDataValue:e.noDataValue,minValue:e.minValue,maxValue:e.maxValue})},s)},s),o},t.prototype._requestMapTileData=function(e,t,i,r){var a=this,n=function(t){return a._dispatchDataEvent(e,"dataArrived",i,r,t)},s=function(t){z(t)||(a._dispatchDataEvent(e,"dataMissing",i,r,t),a.tilemapStats.tileRequestErrors++)};if(q.isVectorTileLayerView(r)){var l=r.tileHandler,o=r.schemaHelper.getLevelRowColumn(e.lij);return++this._vectorTileLayerRequests,l.getVectorTile(o[0],o[1],o[2],0).then(n).catch(s).then(function(){--a._vectorTileLayerRequests})}if(q.useFetchTileForLayer(r.layer)&&q.isTileLayerView(r)){return r.layer.fetchTile(e.lij[0],e.lij[1],e.lij[2]).then(n).catch(s)}var p=r.getTileUrl(e.lij[0],e.lij[1],e.lij[2]);Z(r)&&r.refreshTimestamp&&(p+=(p.indexOf("?")>-1?"&":"?")+"_ts="+r.refreshTimestamp);var h=this._streamDataSupplier.request(p,"image");return h.then(function(e){return n(e.data)},s),h},t.prototype.requestTilemap=function(e,t,i,r,a){var n=this,s=e.lij[0]+D.TILEMAP_SIZE_EXP,l=e.lij[1]<<D.TILEMAP_SIZE_EXP,o=e.lij[2]<<D.TILEMAP_SIZE_EXP;return this.tilemapStats.tilemapRequestsSent++,this.tilemapStats.tilemapRequestsPending++,a.tilemapCache.fetchTilemap(s,l,o,{timeout:6e3}).then(function(a){n.tilemapStats.tilemapRequestsPending--,null!=(t=n._layerIndexByLayerViewId[i][r.uid])&&(e.layerInfo[i][t].tilemap=a)}).catch(function(e){n.tilemapStats.tilemapRequestsPending--,n.tilemapStats.tilemapRequestErrors++})},t.prototype.getTilemapTile=function(e){var t=e.lij[0];return t>D.TILEMAP_SIZE_EXP?B.getTileNLevelsUp(e,D.TILEMAP_SIZE_EXP):this._topLevelTilemapOnlyTiles[t]},t.prototype._dispatchDataEvent=function(e,t,i,r,a){var n=this._layerIndexByLayerViewId[i][r.uid];null!=n?e[t](n,i,a):K.warn("TerrainSurface: received data from unknown layer")},t.prototype._updateTileOverlayParams=function(){if(this.rootTiles){var e=this._iteratorPool.acquire();for(e.reset(this.rootTiles);!e.done;){var t=e.next();t.renderData&&this.overlayManager&&this.overlayManager.setOverlayParamsOfTile(t,t.renderData,this._overlayOpacity)}this._iteratorPool.release(e),this._renderer.setNeedsRender()}},t.prototype._updateOverlayOpacity=function(e){if(this.overlayManager){var t=this.overlayManager.updateOpacity(e);if(!isNaN(t)){if(t!==this._overlayOpacity){var i=this._iteratorPool.acquire();for(i.reset(this.rootTiles);!i.done;){var r=i.next();r.renderData&&(r.renderData.overlayOpacity=t)}this._iteratorPool.release(i)}this._overlayOpacity=t,this._renderer.setNeedsRender()}}},t.prototype.getStats=function(){var e={numNodes:0,numLeaves:0,numVisible:0,numVisiblePerLevel:new Array},t=this._iteratorPool.acquire();for(t.reset(this.rootTiles);!t.done;){var i=t.next();if(e.numNodes++,i.renderData&&(e.numLeaves++,i.visible)){e.numVisible++;var r=i.lij[0];e.numVisiblePerLevel[r]=null==e.numVisiblePerLevel[r]?1:e.numVisiblePerLevel[r]+1}}return this._iteratorPool.release(t),e},t.prototype.getUsedMemory=function(){if(!this.tilingScheme)return 0;if(this._memoryUsed>0)return this._memoryUsed;var e=this._iteratorPool.acquire();for(e.reset(this.rootTiles);!e.done;){var t=e.next();this._memoryUsed+=t.memoryUsed}return this._iteratorPool.release(e),this._memoryUsed},t.prototype.getMemoryUsage=function(){if(!this.tilingScheme)return{};var e=0,t=0,i=0,r=0,a=0,n=0,s=this._iteratorPool.acquire();s.reset(this.rootTiles);for(var l=this.tilingScheme.pixelSize,o=l[0]*l[1]*4;!s.done;){for(var p=s.next(),h=Y(p),d=0,u=p.layerInfo[D.LayerClass.MAP];d<u.length;d++){var c=u[d],_=c.data,y=0,f=0
;_ instanceof G?y+=X.getGpuMemoryUsage(_):_ instanceof HTMLImageElement?f+=o:_ instanceof H&&(n+=_.getGpuMemoryUsage(),i+=_.getCpuMemoryUsage()),p.renderData||h?(e+=f,r+=y):(t+=f,a+=y)}for(var v=0,g=p.layerInfo[D.LayerClass.ELEVATION];v<g.length;v++){var c=g[v],_=c.data;e+=_?o:0}if(p.renderData){var m=p.renderData.textureDescriptor;r+=m?X.getGpuMemoryUsage(m):0;var T=p.renderData.estimatedGeometryMemoryUsage;n+=T,i+=T}}return this._iteratorPool.release(s),{cpuVisibleImageData:e,cpuInvisibleImageData:t,cpuGeometryData:i,gpuVisibleImageData:r,gpuInvisibleImageData:a,gpuGeometryData:n}},t.prototype.hasPendingUpdates=function(){if(this._streamDataSupplier.hasPendingDownloads()||0!==this._vectorTileLayerRequests)return!0;var e=this._iteratorPool.acquire();for(e.reset(this.rootTiles);!e.done;){if(e.next().hasPendingUpdates)return this._iteratorPool.release(e),!0}return this._iteratorPool.release(e),!1},t.prototype.getTile=function(e){var t=e.split("/").map(function(e){return+e});if(0===t[0])return this.rootTiles.forEach(function(e){if(e.lij[1]===t[1]&&e.lij[2]===t[2])return e}),null;var i,r=Math.pow(2,t[0]),a=Math.floor(t[1]/r),n=Math.floor(t[2]/r);if(this.rootTiles.some(function(e){return e.lij[1]===a&&e.lij[2]===n&&(i=e,!0)}),i){for(var s=1<<t[0]-1;i.lij[0]<t[0];){var l=t[1]&s?2:0;if((t[2]&s)>0&&l++,!i.children[l])return console.log("Tile "+e+" doesn't exist, smallest ancestor is "+B.tile2str(i)),null;i=i.children[l],s>>=1}return q.weakAssert(i.lij[0]===t[0]&&i.lij[1]===t[1]&&i.lij[2]===t[2],"not the right tile?"),i}return null},t.prototype.setBorders=function(e){this._renderer.drawBorders=e},t.prototype.setDisableRendering=function(e){this._renderer.disableRendering=e},Object.defineProperty(t.prototype,"test",{get:function(){var e=this;return{renderer:this._renderer,lercWorker:this._lercWorker,mergeTile:function(t){return e._mergeTile(t)},updateTiles:function(t){return e._updateTiles(t)}}},enumerable:!0,configurable:!0}),r([c.property({value:!1})],t.prototype,"cullBackFaces",null),r([c.property({readOnly:!0})],t.prototype,"extent",null),r([c.property({readOnly:!0})],t.prototype,"loaded",void 0),r([c.property({value:1})],t.prototype,"baseOpacity",null),r([c.property({readOnly:!0})],t.prototype,"overlayManager",void 0),r([c.property({readOnly:!0})],t.prototype,"manifold",void 0),r([c.property()],t.prototype,"maxTextureScaleRaster",void 0),r([c.property()],t.prototype,"maxTextureScaleVector",void 0),r([c.property({readOnly:!0})],t.prototype,"ready",null),r([c.property({value:1})],t.prototype,"renderOrder",null),r([c.property({readOnly:!0})],t.prototype,"rootTiles",void 0),r([c.property({value:!0})],t.prototype,"skirtScale",null),r([c.property({readOnly:!0,dependsOn:["tilingScheme.spatialReference"]})],t.prototype,"spatialReference",null),r([c.property({})],t.prototype,"backgroundImage",void 0),r([c.property({type:a})],t.prototype,"backgroundColor",void 0),r([c.property({dependsOn:["backgroundColor","backgroundImage"]})],t.prototype,"_background",null),r([c.property({value:!1})],t.prototype,"slicePlaneEnabled",null),r([c.property({readOnly:!0})],t.prototype,"tilingScheme",void 0),r([c.property({readOnly:!0,aliasOf:"tilingSchemeLogic.tilingSchemeLocked"})],t.prototype,"tilingSchemeLocked",void 0),r([c.property({readOnly:!0,aliasOf:"tilingSchemeLogic.tilingSchemeDone"})],t.prototype,"tilingSchemeDone",void 0),r([c.property({readOnly:!0})],t.prototype,"tilingSchemeLogic",void 0),r([c.property({value:!0})],t.prototype,"velvetOverground",null),r([c.property({value:!1})],t.prototype,"wireframe",null),t=r([c.subclass("esri.views.3d.terrain.TerrainSurface")],t)}(c.declared(n,S.Evented)),Q=1.2,$=80/180*Math.PI,ee=110/180*Math.PI,te=12,ie=g.vec4f64.create(),re=m.create(),ae=[0,0,0],ne={spatialReference:null,tile:null,extent:null},se={spatialReference:null,extent:null,scale:0};return J});