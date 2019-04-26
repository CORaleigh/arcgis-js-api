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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/Accessor","../../../core/Handles","../../../core/watchUtils","../../../core/accessorSupport/decorators","../camera/constraintUtils","../camera/intersectionUtils","./NearFarHeuristic","./SurfaceCollisionConstraint","../support/mathUtils"],function(t,a,e,i,n,s,r,o,c,l,u,d,h){Object.defineProperty(a,"__esModule",{value:!0});var p=function(t){function a(a){var e=t.call(this)||this;return e.handles=new s,e.nearFarHeuristic=u.createNearFarHeuristic(a.view.state.mode,a.view.basemapTerrain,a.view.renderCoordsHelper.spatialReference),e}return e(a,t),a.prototype.initialize=function(){var t=this;this.handles.add([this.view.watch(["constraints.clipDistance.near","constraints.clipDistance.far"],function(){return t.handleClipDistanceNearFarChanged()}),this.view.watch("constraints.clipDistance.mode",function(){return t.handleClipDistanceModeChanged()}),this.view.state.events.on("before-camera-change",function(a){return t.cameraUpdateNearFar(a.camera)}),this.view.watch("dataExtent",function(){return t.updateNearFar()},!0)]),this.handles.add([this.view.watch(["constraints.altitude.min","constraints.altitude.max"],function(){return t.handleAltitudeMinMaxChanged()},!0)]),this.handles.add([this.view.watch("constraints.tilt.max",function(){return t.handleTiltMaxChanged()},!0),this.view.watch("constraints.tilt.mode",function(){return t.handleTiltModeChanged()},!0),this.view.watch("state.camera",function(){return t.tiltAutoUpdateMax()},!0)]),this.handles.add(this.view.watch(["map.ground.navigationConstraint.type","constraints.collision.enabled"],function(){return t.updateCollision()},!0)),this.view.state.isLocal&&this.handles.add(r.init(this.view,"dataExtent",function(a){return t.updateLocalSurfaceDistance(a)})),this.updateNearFar(),"local"!==this.view.state.mode&&this.updateAltitude(),this.updateTilt(),this.updateCollision(),this._set("surfaceCollisionConstraint",new d.default({view:this.view}))},a.prototype.destroy=function(){this.handles&&(this.handles.destroy(),this.handles=null),this.surfaceCollisionConstraint&&(this.surfaceCollisionConstraint.destroy(),this._set("surfaceCollisionConstraint",null))},a.prototype.handleClipDistanceNearFarChanged=function(){var t=this,a=this.view.constraints&&this.view.constraints.clipDistance;a&&"auto"!==a.mode&&this.view.state.updateCamera(function(e){return t.cameraUpdateNearFarManual(e,a),!0})},a.prototype.handleClipDistanceModeChanged=function(){this.updateNearFar()},a.prototype.updateNearFar=function(){var t=this;this.view.state.updateCamera(function(a){return t.cameraUpdateNearFar(a),!0})},a.prototype.cameraUpdateNearFar=function(t){var a=this.view.constraints&&this.view.constraints.clipDistance;"manual"===(a?a.mode:"auto")?this.cameraUpdateNearFarManual(t,a):this.cameraUpdateNearFarAuto(t,a)},a.prototype.cameraUpdateNearFarAuto=function(t,a){this.nearFarHeuristic.compute(t.eye,t.center,this.view.dataExtent,l.surfaceElevationBelowEye(this.view,t),t),a&&a.autoUpdate(t.near,t.far)},a.prototype.cameraUpdateNearFarManual=function(t,a){a&&(t.near=a.near,t.far=a.far)},a.prototype.updateCollision=function(){var t=this.view.map&&this.view.map.ground&&this.view.map.ground.navigationConstraint,a=this.view.constraints&&this.view.constraints.collision.enabled,e=t?"stay-above"===t.type:a,i=this.view.state.constraints.collision;if(e!==i.enabled){i.enabled=e,e&&this.reapplyConstraints(8);var n=this.view.constraints&&this.view.constraints.tilt;n&&"auto"!==n.mode||this.updateTiltAuto(n)}},a.prototype.handleAltitudeMinMaxChanged=function(){this.updateAltitude()},a.prototype.updateAltitude=function(){var t=this.view.constraints&&this.view.constraints.altitude;t&&"local"!==this.view.state.mode?this.view.state.constraints.altitude={min:t.min,max:t.max}:this.view.state.constraints.altitude=null,this.reapplyConstraints()},a.prototype.handleTiltModeChanged=function(){this.updateTilt()},a.prototype.handleTiltMaxChanged=function(){var t=this.view.constraints&&this.view.constraints.tilt;t&&"auto"!==t.mode&&(this.updateTiltManual(t),this.reapplyConstraints())},a.prototype.updateTilt=function(){var t=this.view.constraints&&this.view.constraints.tilt;"manual"===(t?t.mode:"auto")?this.updateTiltManual(t):this.updateTiltAuto(t),this.reapplyConstraints()},a.prototype.updateTiltManual=function(t){var a=this.view.state.constraints;a.tilt=a.createConstantMaxTilt(h.deg2rad(t.max))},a.prototype.updateTiltAuto=function(t){var a=this.view.state.constraints;a.tilt=a.createDefaultTilt(),this.tiltAutoUpdateMax()},a.prototype.tiltAutoUpdateMax=function(){var t=this.view.constraints&&this.view.constraints.tilt;if(t&&"auto"===t.mode){var a=this.view.state.constraints;if(a.tilt){var e=a.tilt(this.view.state.camera.distance).max;t.autoUpdate(h.rad2deg(e))}}},a.prototype.updateLocalSurfaceDistance=function(t){var a=Math.max(t.width,t.height);if(!(a<=0)){t.hasZ&&(a=Math.max(a,t.zmax-t.zmin));var e=this.view.state,i=3*a/Math.atan(e.camera.fov/2);i!==e.constraints.distance&&(e.constraints.distance=i)}},a.prototype.reapplyConstraints=function(t){var a=this;void 0===t&&(t=15),this.view.state.updateCamera(function(e){return c.applyAll(a.view,e,{selection:t,interactionType:0,interactionFactor:null,interactionStartCamera:null,interactionDirection:null,tiltMode:0})})},i([o.property({constructOnly:!0})],a.prototype,"view",void 0),i([o.property({readOnly:!0})],a.prototype,"surfaceCollisionConstraint",void 0),a=i([o.subclass("esri.views.3d.state.ConstraintsManager")],a)}(o.declared(n));a.ConstraintsManager=p,a.default=p});