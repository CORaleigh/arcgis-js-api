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

define(["require","exports","../../../../../core/tsSupport/declareExtendsHelper","../../../../../core/tsSupport/decorateHelper","../../../../../geometry","../../../../../core/Handles","../../../../../core/maybe","../../../../../core/screenUtils","../../../../../layers/graphics/dehydratedFeatures","./DirectLineMeasurement3DView"],function(e,t,i,o,n,r,a,s,c,d){function h(e){return"mouse"!==e.pointerType||0===e.button}var u=function(){function e(e,t){this._handles=new r,this._cachedPickRequest=new d.PickRequest,this._cachedPickResult=new d.PickResult,this._isAnyPointerDown=!1,this.model=e,this.view=t,this.model.reset()}return e.prototype.destroy=function(){this._handles.destroy(),this._handles=null},e.prototype.setup=function(e){var t=this,i=e.start,o=e.end;i.on("drag",function(){var e=i.mapPoint,o=i.surfaceType;if(a.isSome(e)&&a.isSome(o)){var n=c.clonePoint(e,l);t.model.startPoint=n,t.model.startPointSurfaceLocation=t._surfaceLocation(n,o)}}),o.on("drag",function(){var e=o.mapPoint,i=o.surfaceType;if(a.isSome(e)&&a.isSome(i)){var n=c.clonePoint(e,l);t.model.endPoint=n,t.model.endPointSurfaceLocation=t._surfaceLocation(n,i)}}),[i,o].forEach(function(i){t._handles.add([i.watch("grabbing",function(){var i=e.start.grabbing||e.end.grabbing;i&&"measured"===t.model.state&&(t.model.state="editing"),i||(t.model.finishedMeasurement({cameraAboveGround:t.view.cameraAboveGround}),"editing"===t.model.state&&(t.model.state="measured"))},!0)])})},e.prototype.handleInputEvent=function(e,t,i){switch(e.type){case"immediate-click":this._handleImmediateClick(e,t,i);break;case"pointer-move":this._handlePointerMove(e,t,i);break;case"pointer-down":this._handlePointerDown(e);break;case"pointer-up":this._handlePointerUp(e);break;case"key-down":this._handleKeyDown(e)}},e.prototype._handlePointerMove=function(e,t,i){this._clearCachedPickRequest();var o=s.createScreenPointFromEvent(e);"mouse"===e.pointerType&&(this._hoverAt(o),"drawing"===this.model.state&&(i.attemptManipulatorDragTo(t.end,o),e.stopPropagation()))},e.prototype._handlePointerDown=function(e){this._isAnyPointerDown=!0},e.prototype._handlePointerUp=function(e){this._isAnyPointerDown=!1},e.prototype._handleImmediateClick=function(e,t,i){if(this._clearCachedPickRequest(),h(e)){var o=s.createScreenPointFromEvent(e),n=!1;if(this.model.active)switch(this.model.state){case"initial":t.start.attemptDragTo({screenPoint:o})&&(t.start.interactive=!1,t.end.interactive=!1,this.model.state="drawing",n=!0);break;case"drawing":i.attemptManipulatorDragTo(t.end,o)&&(t.start.interactive=!0,t.end.interactive=!0,this.model.finishedMeasurement({cameraAboveGround:this.view.cameraAboveGround}),n=!0)}n&&e.stopPropagation(),"mouse"===e.pointerType&&this._hoverAt(o)}},e.prototype._handleKeyDown=function(e){"Escape"===e.key&&"drawing"===this.model.state&&(this.model.clearMeasurement(),e.stopPropagation())},e.prototype._hoverAt=function(e){var t=this._isAnyPointerDown&&"drawing"!==this.model.state&&"editing"!==this.model.state;if(this.view.requiresCursorPoint&&!t){var i=this._pick(e);i.mapPoint&&(this.model.cursorPoint=i.mapPoint)}else this.model.cursorPoint=null},e.prototype._pick=function(e){var t=this._cachedPickRequest.screenPoint;return t&&t.x===e.x&&t.y===e.y?this._cachedPickResult:(this._cachedPickRequest.screenPoint=e,this._cachedPickResult=this.view.pick(this._cachedPickRequest),this._cachedPickResult)},e.prototype._clearCachedPickRequest=function(){this._cachedPickRequest.screenPoint=null},e.prototype._surfaceLocation=function(e,t){return"ground"===t?"on-the-surface":e.z>=this.view.getElevation(e)?"above-the-surface":"below-the-surface"},e}(),l=new n.Point;return u});