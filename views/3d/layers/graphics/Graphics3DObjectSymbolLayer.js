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

define(["require","exports","../../../../core/tsSupport/extendsHelper","dojo/errors/CancelError","../../../../Color","../../../../core/asyncUtils","../../../../core/lang","../../../../core/screenUtils","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4f64","../../../../geometry/support/aaBoundingBox","../../../../symbols/support/ObjectSymbol3DLayerResource","./ElevationAligners","./Graphics3DLodInstanceGraphicLayer","./Graphics3DSymbolCommonCode","./Graphics3DSymbolLayer","./graphicUtils","./lodResourceUtils","./objectResourceUtils","./primitiveObjectSymbolUtils","./symbolComplexity","../support/FastSymbolUpdates","../../support/projectionUtils","../../webgl-engine/Stage","../../webgl-engine/lib/Util","../../webgl-engine/lib/lodRendering/LodRenderer","../../webgl-engine/lib/lodRendering/LodResources","../../webgl-engine/materials/DefaultMaterial"],function(e,t,r,i,o,a,s,n,l,c,h,p,d,u,m,f,y,_,v,b,g,x,P,S,R,L,E,C,U,z,T){Object.defineProperty(t,"__esModule",{value:!0});var O=function(e){function t(t,r,i,o){var a=e.call(this,t,r,i,o)||this;a._optionalFields=[],a._instanceIndexToGraphicUid=new Map;var s=a._getStageIdHint();if(!a._isPropertyDriven("size")){var n=b.validateSymbolLayerSize(a.symbolLayer);if(n)return a._logWarning(n),a.reject(),a}if(r.resource&&r.resource.href)a._prepareModelResources(r.resource.href,s);else{var l=r.resource?r.resource.primitive:m.defaultPrimitive;a._preparePrimitiveResources(l,s)}return a}return r(t,e),t.prototype.getCachedSize=function(){var e=this._symbolSize;return{width:e[0],depth:e[1],height:e[2]}},Object.defineProperty(t.prototype,"lodRenderer",{get:function(){return this._lodRenderer},enumerable:!0,configurable:!0}),t.prototype._preparePrimitiveResources=function(e,t){if(!P.isValidPrimitive(e))return this._logWarning("Unknown object symbol primitive: "+e),void this.reject();var r=this.symbolLayer;this._resourceBoundingBox=u.create(P.primitiveBoundingBox(e)),this._resourceSize=p.vec3f64.fromArray(u.size(this._resourceBoundingBox)),this._symbolSize=p.vec3f64.fromArray(b.computeSizeWithResourceSize(this._resourceSize,r));var i=this._getMaterialOpacity(),a={specular:[0,0,0],opacity:i,transparent:i<1||this._isPropertyDriven("opacity"),instanced:["transformation"],ambient:B,diffuse:B,slicePlaneEnabled:this._context.slicePlaneEnabled,castShadows:this.symbolLayer.castShadows},l=this.symbol;if("point-3d"===l.type&&l.verticalOffset){var c=l.verticalOffset,h=c.screenLength,d=c.minWorldLength,m=c.maxWorldLength;a.verticalOffset={screenLength:n.pt2px(h),minWorldLength:d||0,maxWorldLength:null!=m?m:1/0},a.castShadows=!1}if(this._context.screenSizePerspectiveEnabled&&(a.screenSizePerspective=this._context.sharedResources.screenSizePerspectiveSettings),this._isPropertyDriven("color"))a.externalColor=G;else{var f=r.material?o.toUnitRGBA(r.material.color):G;a.externalColor=f}this._fastUpdates=R.initFastSymbolUpdatesState(this._context.renderer,this._fastVisualVariableConvertOptions()),this._fastUpdates.enabled?(s.mixin(a,this._fastUpdates.materialParameters),a.instanced.push("featureAttribute"),this._optionalFields.push("featureAttribute")):this._hasPerInstanceColor()&&(a.instanced.push("color"),this._optionalFields.push("color"));var y=new T(a,t+"_objectmat");if(this._lodResources=P.primitiveLodResources(e,y,t),this._originalOpacities=z.materialsFromLodResources(this._lodResources).map(function(){return 1}),!this._lodResources)return this._logWarning("Unknown object symbol primitive: "+e),void this.reject();this.finalizeSymbolResources(),this.initializeLodRenderer(),this.complexity=this.computeComplexity(),this.resolve()},t.prototype._prepareModelResources=function(e,t){var r=this,o=["transformation"],l={instanced:o,slicePlaneEnabled:this._context.slicePlaneEnabled,castShadows:this.symbolLayer.castShadows},c={materialParamsMixin:l,idHint:t,streamDataSupplier:this._context.streamDataSupplier};this._fastUpdates=R.initFastSymbolUpdatesState(this._context.renderer,this._fastVisualVariableConvertOptions()),this._fastUpdates.enabled?(s.mixin(c.materialParamsMixin,this._fastUpdates.materialParameters),o.push("featureAttribute"),this._optionalFields.push("featureAttribute")):this._hasPerInstanceColor()&&(o.push("color"),this._optionalFields.push("color"));var h=this.symbol;if("point-3d"===h.type&&h.verticalOffset){var d=h.verticalOffset,m=d.screenLength,f=d.minWorldLength,y=d.maxWorldLength;c.materialParamsMixin.verticalOffset={screenLength:n.pt2px(m),minWorldLength:f||0,maxWorldLength:null!=y?y:1/0},c.materialParamsMixin.castShadows=!1}this._symbolLoaderPromise=a.safeCast(x.fetch(e,c)),this._symbolLoaderPromise.then(function(e){if(r._symbolLoaderPromise=null,!r.isRejected()){var t=g.makeLodResources(e.lods);g.fillEstimatedMinScreenSpaceRadius(t),t.levels.sort(function(e,t){return e.minScreenSpaceRadius-t.minScreenSpaceRadius}),t.levels[0].minScreenSpaceRadius=Math.min(2,t.levels[0].minScreenSpaceRadius),r._lodResources=t;var i=r._context,o=r.symbolLayer.material,a=r._getExternalColorParameters(o),s=r._getMaterialOpacity(),n=r._isPropertyDriven("opacity"),l=z.materialsFromLodResources(r._lodResources);r._originalOpacities=l.map(function(e){return e.getParameters().opacity||1}),l.forEach(function(e){var t=e.getParameters();e.setParameterValues(a);var r=t.opacity*s,o=r<1||n||t.transparent;e.setParameterValues({opacity:r,transparent:o}),i.screenSizePerspectiveEnabled&&e.setParameterValues({screenSizePerspective:i.sharedResources.screenSizePerspectiveSettings})}),r._resourceBoundingBox=e.referenceBoundingBox,r._resourceSize=p.vec3f64.fromArray(u.size(r._resourceBoundingBox)),r._pivotOffset=p.vec3f64.fromArray(r._lodResources.levels[0].pivotOffset),r._symbolSize=p.vec3f64.fromArray(b.computeSizeWithResourceSize(r._resourceSize,r.symbolLayer)),R.updateFastSymbolUpdatesState(r._fastUpdates,r._context.renderer,r._fastVisualVariableConvertOptions())&&l.forEach(function(e){return e.setParameterValues(r._fastUpdates.materialParameters)}),r.finalizeSymbolResources(),r.initializeLodRenderer(),r.complexity=r.computeComplexity(),r.resolve()}},function(e){if(r._symbolLoaderPromise=null,!r.isFulfilled()){if(!(e instanceof i)){var t="ObjectSymbol3DLayer failed to load";e&&e.message&&(t+=" ("+e.message+")"),r._logWarning(t)}r.reject()}})},t.prototype.finalizeSymbolResources=function(){var e=this._context.stage;this._materials=z.materialsFromLodResources(this._lodResources),this._materials.forEach(function(t){e.add(E.ModelContentType.MATERIAL,t)}),this._textures=z.texturesFromLodResources(this._lodResources),this._textures.forEach(function(t){e.add(E.ModelContentType.TEXTURE,t)}),this._geometries=z.geometriesFromLodResources(this._lodResources),this._geometries.forEach(function(t){e.add(E.ModelContentType.GEOMETRY,t)})},t.prototype.initializeLodRenderer=function(){var e=this,t=this._context.stage,r={layerUid:this._context.layer.uid,graphicUid:function(t){return e._instanceIndexToGraphicUid.get(t)}},i=this._fastUpdates.enabled?{applyTransform:function(t,r,i){t.getFeatureAttribute(r,V),l.mat4.copy(i,R.evaluateModelTransform(e._fastUpdates.materialParameters,V,i))},scaleFactor:function(t,r,i){return r.getFeatureAttribute(i,V),R.evaluateModelTransformScale(t,e._fastUpdates.materialParameters,V)}}:null;this._lodRenderer=new U.LodRenderer(this._lodResources,this._optionalFields,r,i),this._lodRenderer.slicePlaneEnabled=this._context.slicePlaneEnabled,t.addRenderPlugin(this._lodRenderer.slots,this._lodRenderer)},t.prototype._getExternalColorParameters=function(e){var t={};return this._isPropertyDriven("color")?t.externalColor=G:e&&e.color?t.externalColor=o.toUnitRGBA(e.color):(t.externalColor=G,t.colorMixMode="ignore"),t},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.isFulfilled()||this.reject(),this._symbolLoaderPromise&&this._symbolLoaderPromise.cancel();var t=this._context.stage;this._lodRenderer&&(t.removeRenderPlugin(this._lodRenderer),this._lodRenderer.destroy()),this._materials&&this._materials.forEach(function(e){return t.remove(E.ModelContentType.MATERIAL,e.id)}),this._textures&&this._textures.forEach(function(e){return t.remove(E.ModelContentType.TEXTURE,e.id)}),this._geometries&&this._geometries.forEach(function(e){return t.remove(E.ModelContentType.GEOMETRY,e.id)})},t.prototype.createGraphics3DGraphic=function(e){var t=e.graphic;if(!this._validateGeometry(t.geometry))return null;var r=_.placePointOnGeometry(t.geometry);if(!r)return this._logWarning("unsupported geometry type for icon symbol: "+t.geometry.type),null;var i=this.getGraphicElevationContext(t),o=e.renderingInfo;return this._createAs3DShape(t,r,o,i,t.uid)},t.prototype.notifyDestroyGraphicLayer=function(e){this._instanceIndexToGraphicUid.delete(e.instanceIndex)},t.prototype.graphicLayerToGraphicId=function(e){return 0},t.prototype.layerOpacityChanged=function(){var e=this,t=this._isPropertyDriven("opacity");return this._materials.forEach(function(r,i){var o=e._getMaterialOpacity()*e._originalOpacities[i];r.setParameterValues({opacity:o,transparent:o<1||t})}),!0},t.prototype.layerElevationInfoChanged=function(e,t){return this.updateGraphics3DGraphicElevationInfo(e,t,_.needsElevationUpdates3D)},t.prototype.slicePlaneEnabledChanged=function(e,t){var r=this;return this._lodRenderer.slicePlaneEnabled=this._context.slicePlaneEnabled,this._materials.forEach(function(e){e.setParameterValues({slicePlaneEnabled:r._context.slicePlaneEnabled})}),!0},t.prototype.pixelRatioChanged=function(e,t){return!0},t.prototype.applyRendererDiff=function(e,t){var r=this;for(var i in e.diff)switch(i){case"visualVariables":if(!R.updateFastSymbolUpdatesState(this._fastUpdates,t,this._fastVisualVariableConvertOptions()))return!1;this._materials.forEach(function(e){return e.setParameterValues(r._fastUpdates.materialParameters)}),this._lodRenderer.notifyShaderTransformationChanged();break;default:return!1}return!0},t.prototype.computeComplexity=function(){return this._lodResources?{primitivesPerFeature:z.geometriesFromLodLevelResources(this._lodResources.levels[0]).reduce(function(e,t){return e+t.data.getIndices(C.VertexAttrConstants.POSITION).length},0)/3,primitivesPerCoordinate:0,memory:S.defaultSymbolLayerMemoryComplexity(this.symbol,this.symbolLayer)}:e.prototype.computeComplexity.call(this)},t.prototype._createAs3DShape=function(e,t,r,i,o){var a=this.getFastUpdateAttrValues(e),s=!this._fastUpdates.enabled&&this._hasPerInstanceColor()?b.mixinColorAndOpacity(r.color,r.opacity):null,n=this._context.clippingExtent;if(L.pointToVector(t,A,this._context.elevationProvider.spatialReference),n&&!_.pointInBox2D(A,n))return null;var l=this._requiresTerrainElevation(i),c=this._computeGlobalTransform(t,i,I,l?w:null),h=this._computeLocalTransform(this.symbolLayer,r,M),p=this._lodRenderer.instanceData,d=p.addInstance();this._instanceIndexToGraphicUid.set(d,o),p.setLocalTransform(d,h,!1),p.setGlobalTransform(d,c),a&&p.setFeatureAttribute(d,a),s&&p.setColor(d,s);var u=f.perLodInstanceElevationAligner,m=new y(this,d,u,i);return l&&(m.alignedTerrainElevation=w.terrainElevation),m.needsElevationUpdates=_.needsElevationUpdates3D(i.mode),_.extendPointGraphicElevationContext(m,t,this._context.elevationProvider),m},t.prototype._computeGlobalTransform=function(e,t,r,i){var o=_.computeElevation(this._context.elevationProvider,e,t,this._context.renderCoordsHelper,i);return A[0]=e.x,A[1]=e.y,A[2]=o,L.computeLinearTransformation(e.spatialReference,A,r,this._context.renderSpatialReference),r},t.prototype._computeLocalTransform=function(e,t,r){return l.mat4.identity(r),this._applyObjectRotation(t,!1,r),this._applyObjectRotation(e,!0,r),this._applyObjectScale(t,r),this._applyAnchor(e,r),r},t.prototype._applyObjectScale=function(e,t){if(!this._fastUpdates.enabled||!this._fastUpdates.requiresShaderTransformation){var r=this._isPropertyDriven("size")&&e.size?e.size:this._symbolSize,i=b.computeObjectScale(r,this._symbolSize,this._resourceSize,this._context.renderCoordsHelper.unitInMeters);1===i[0]&&1===i[1]&&1===i[2]||l.mat4.scale(t,t,i)}},t.prototype.prepareSymbolLayerPatch=function(e){if("partial"===e.diff.type){var t=e.diff.diff;this._preparePatchTransform(e,t),this._preparePatchColor(e,t)}},t.prototype.updateGeometry=function(e,t){var r=t&&_.placePointOnGeometry(t);if(!r)return!1;var i=this.getGeometryElevationMode(t);if(e.elevationContext.mode!==i)return!1;var o=this._requiresTerrainElevation(e.elevationContext);return this._computeGlobalTransform(r,e.elevationContext,I,o?w:null),o&&(e.alignedTerrainElevation=w.terrainElevation),this._lodRenderer.instanceData.setGlobalTransform(e.instanceIndex,I,!0),_.extendPointGraphicElevationContext(e,r,this._context.elevationProvider),!0},t.prototype._preparePatchTransform=function(e,t){var r=this;if(t.heading||t.tilt||t.roll||t.width||t.height||t.depth||t.anchor||t.anchorPosition){var i=function(e,t,r){return(null!=e&&"complete"===e.type?e.newValue:t)||r},o=i(t.heading,this.symbolLayer.heading,0),a=i(t.tilt,this.symbolLayer.tilt,0),s=i(t.roll,this.symbolLayer.roll,0),n=i(t.width,this.symbolLayer.width,void 0),l=i(t.height,this.symbolLayer.height,void 0),c=i(t.depth,this.symbolLayer.depth,void 0),h=i(t.anchor,this.symbolLayer.anchor,void 0),d=i(t.anchorPosition,this.symbolLayer.anchorPosition,void 0);delete t.heading,delete t.tilt,delete t.roll,delete t.width,delete t.height,delete t.depth,delete t.anchor,delete t.anchorPosition;var u={heading:o,tilt:a,roll:s,anchor:h,anchorPosition:d};this.isResolved()&&e.symbolLayerStatePatches.push(function(){r._symbolSize=p.vec3f64.fromArray(b.computeSizeWithResourceSize(r._resourceSize,{width:n,height:l,depth:c,isPrimitive:r.symbolLayer.isPrimitive}))}),e.graphics3DGraphicPatches.push(function(e,t){var i=r._computeLocalTransform(u,t,M),o=e.instanceIndex;r._lodRenderer.instanceData.setLocalTransform(o,i,!0)})}},t.prototype._preparePatchColor=function(e,t){var r=this;if(t.material&&"partial"===t.material.type){var i=t.material.diff;if(i.color&&"complete"===i.color.type){var a=i.color.newValue,s=a?o.toUnitRGBA(a):G;delete i.color,e.graphics3DGraphicPatches.push(function(e,t){if(r._hasPerInstanceColor())r._lodRenderer.instanceData.setColor(e.instanceIndex,s);else for(var i=0,o=r._materials;i<o.length;i++){var a=o[i];a.setParameterValues({externalColor:s})}})}}},t.prototype._requiresTerrainElevation=function(e){return"absolute-height"!==e.mode},t.prototype._applyObjectRotation=function(e,t,r){if(!(this._fastUpdates.enabled&&this._fastUpdates.requiresShaderTransformation&&t))return b.computeObjectRotation(e.heading,e.tilt,e.roll,r)},t.prototype._computeAnchor=function(e){var t=p.vec3f64.create();switch(e.anchor){case"center":h.vec3.copy(t,u.center(this._resourceBoundingBox)),h.vec3.negate(t,t);break;case"top":var r=u.center(this._resourceBoundingBox);h.vec3.set(t,-r[0],-r[1],-this._resourceBoundingBox[5]);break;case"bottom":var r=u.center(this._resourceBoundingBox);h.vec3.set(t,-r[0],-r[1],-this._resourceBoundingBox[2]);break;case"relative":var r=u.center(this._resourceBoundingBox),i=u.size(this._resourceBoundingBox),o=e.anchorPosition,a=o?p.vec3f64.fromValues(o.x,o.y,o.z):D;h.vec3.multiply(t,i,a),h.vec3.add(t,t,r),h.vec3.negate(t,t);break;case"origin":default:this._pivotOffset?h.vec3.negate(t,this._pivotOffset):h.vec3.copy(t,D)}return t},t.prototype._applyAnchor=function(e,t){if(!this._fastUpdates.enabled||!this._fastUpdates.requiresShaderTransformation){var r=this._computeAnchor(e);r&&l.mat4.translate(t,t,r)}},t.prototype._hasPerInstanceColor=function(){return this._isPropertyDriven("color")||this._isPropertyDriven("opacity")},t.prototype._fastVisualVariableConvertOptions=function(){var e=this._resourceBoundingBox?p.vec3f64.fromArray(u.size(this._resourceBoundingBox)):B,t=this._resourceBoundingBox?this._computeAnchor(this.symbolLayer):D,r=this._context.renderCoordsHelper.unitInMeters,i=b.computeObjectScale(this._symbolSize,this._symbolSize,this._resourceSize,r),o=p.vec3f64.fromValues(this.symbolLayer.tilt||0,this.symbolLayer.roll||0,this.symbolLayer.heading||0);return{modelSize:e,symbolSize:this._symbolSize||B,unitInMeters:r,transformation:{anchor:t,scale:i,rotation:o}}},t}(v.default);t.Graphics3DObjectSymbolLayer=O;var B=p.vec3f64.fromValues(1,1,1),G=d.vec4f64.fromValues(1,1,1,1),D=p.vec3f64.fromValues(0,0,0),A=p.vec3f64.create(),M=c.mat4f64.create(),I=c.mat4f64.create(),V=d.vec4f64.create(),w={verticalDistanceToGround:0,terrainElevation:0};t.default=O});