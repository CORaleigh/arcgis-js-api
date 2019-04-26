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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/tsSupport/assignHelper","../../geometry","../../core/Collection","../../core/compilerUtils","../../core/Error","../../core/Handles","../../core/Logger","../../core/promiseUtils","../../core/watchUtils","../../core/accessorSupport/decorators","../../geometry/support/webMercatorUtils","../../support/actions/ActionBase","../../support/actions/ActionButton","../../support/actions/ActionToggle","../../views/support/layerViewUtils","./actions","../support/AnchorElementViewModel","../support/GoTo"],function(e,t,o,n,r,i,a,s,p,u,l,c,d,h,g,f,y,v,m,b,w,_){var F=a.ofType({key:"type",defaultKeyValue:"button",base:f,typeMap:{button:y,toggle:v}}),P=new F([b.zoomToFeature.clone()]),C=l.getLogger("esri.widgets.Popup.PopupViewModel");return function(e){function t(t){var o=e.call(this)||this;return o._handles=new u,o._pendingPromises=new Set,o._zoomToLocation=null,o._fetchingFeatures=null,o.actions=P,o.defaultPopupTemplateEnabled=!1,o.autoCloseEnabled=!1,o.autoOpenEnabled=!0,o.content=null,o.highlightEnabled=!0,o.title=null,o.updateLocationEnabled=!1,o.view=null,o.visible=!1,o.zoomFactor=4,o}return o(t,e),t.prototype.initialize=function(){var e=this;this._handles.add([d.init(this,"autoOpenEnabled",this._autoOpenEnabledChange),this.on("view-change",this._autoClose),d.watch(this,["highlightEnabled","selectedFeature","visible","view"],this._highlightFeature),d.watch(this,"view.animation.state",function(t){e._zoomToLocation||(b.zoomToFeature.disabled="waiting-for-target"===t)}),this.on("trigger-action",function(t){return b.triggerAction({event:t,view:e.view})})])},t.prototype.destroy=function(){this._cancelFetchingFeatures(),this._handles.destroy(),this._handles=null,this._pendingPromises.clear(),this.view=null},Object.defineProperty(t.prototype,"allActions",{get:function(){var e=this._get("allActions")||new F;e.removeAll();var t=this.selectedFeature&&("function"==typeof this.selectedFeature.getEffectivePopupTemplate&&this.selectedFeature.getEffectivePopupTemplate(this.defaultPopupTemplateEnabled)||this.selectedFeature.popupTemplate),o=t&&t.actions,n=t&&t.overwriteActions,r=n?o:this.actions.concat(o);return r&&r.filter(Boolean).forEach(function(t){return e.add(t)}),e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"featureCount",{get:function(){return this.features.length},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"features",{get:function(){return this._get("features")||[]},set:function(e){var t=e||[];this._set("features",t);var o=this,n=o.pendingPromisesCount,r=o.promiseCount,i=o.selectedFeatureIndex,a=r&&t.length;if(a&&n&&-1===i)return void(this.selectedFeatureIndex=0);a&&-1!==i||(this.selectedFeatureIndex=t.length?0:-1)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"location",{get:function(){return this._get("location")||null},set:function(e){var t=this.get("location"),o=this.get("view.spatialReference.isWebMercator");e&&e.get("spatialReference.isWGS84")&&o&&(e=g.geographicToWebMercator(e)),this._set("location",e),e!==t&&this._centerAtLocation()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"pendingPromisesCount",{get:function(){return this._pendingPromises.size},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"waitingForResult",{get:function(){return this.pendingPromisesCount>0&&0===this.featureCount},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"promiseCount",{get:function(){return this.promises.length},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"promises",{get:function(){return this._get("promises")||[]},set:function(e){var t=this,o=this._get("promises");if(o&&o.forEach(function(e){e&&"function"==typeof e.cancel&&e.cancel()}),this._pendingPromises.clear(),this.features=[],!Array.isArray(e)||!e.length)return this._set("promises",[]),void this.notifyChange("pendingPromisesCount");this._set("promises",e),e=e.slice(0),e.forEach(function(e){t._pendingPromises.add(e);var o=function(o){t._updatePendingPromises(e),t._updateFeatures(o)},n=function(){return t._updatePendingPromises(e)};e.then(o,n)}),this.notifyChange("pendingPromisesCount")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"selectedFeature",{get:function(){var e=this,t=e.features,o=e.location,n=e.selectedFeatureIndex,r=e.updateLocationEnabled;if(-1===n)return null;var i=t[n];return i?(!r&&o||!i.geometry||(this.location=this._getPointFromGeometry(i.geometry)),i):null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"selectedFeatureIndex",{get:function(){var e=this._get("selectedFeatureIndex");return"number"==typeof e?e:-1},set:function(e){var t=this.featureCount;e=isNaN(e)||e<-1||!t?-1:(e+t)%t,this._set("selectedFeatureIndex",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){return this.get("view.ready")?"ready":"disabled"},enumerable:!0,configurable:!0}),t.prototype.centerAtLocation=function(){var e=this.view,t=this._getSelectedTarget();if(!t){var o=new p("center-at-location:invalid-target-or-view","Cannot center at a location without a target and view.",{target:t,view:e});return C.error(o),c.reject(o)}return this.callGoTo({target:{target:t,scale:e.scale}})},t.prototype.clear=function(){this.set({promises:[],features:[],content:null,title:null,location:null})},t.prototype.open=function(e){var t={updateLocationEnabled:!1,promises:[]};this.set(r({visible:!1},t,e)),this._setVisibleWhenContentExists()},t.prototype.triggerAction=function(e){var t=this.allActions.getItemAt(e);t&&this.emit("trigger-action",{action:t})},t.prototype.next=function(){return this.selectedFeatureIndex=this.selectedFeatureIndex+1,this},t.prototype.previous=function(){return this.selectedFeatureIndex=this.selectedFeatureIndex-1,this},t.prototype.zoomToLocation=function(){var e=this,t=this,o=t.location,n=t.selectedFeature,r=t.view,i=t.zoomFactor,a=this._getSelectedTarget();if(!a){var s=new p("zoom-to:invalid-target-or-view","Cannot zoom to location without a target and view.",{target:a,view:r});return C.error(s),c.reject(s)}var u=r.scale/i,l=this.get("selectedFeature.geometry"),d=l||o,h=d&&"point"===d.type,g=h&&this._isScreenSize(n);b.zoomToFeature.active=!0,b.zoomToFeature.disabled=!0;var f=this.callGoTo({target:{target:a,scale:g?u:void 0}}).then(function(){g&&(e.location=d),b.zoomToFeature.active=!1,b.zoomToFeature.disabled=!1,e._zoomToLocation=null}).catch(function(){b.zoomToFeature.active=!1,b.zoomToFeature.disabled=!1,e._zoomToLocation=null});return this._zoomToLocation=f,f},t.prototype._getSelectedTarget=function(){var e=this,t=e.selectedFeature,o=e.location,n=e.view;if(!n)return null;var r="3d"===n.type,i=this.get("selectedFeature.geometry");return r?t||o:i||o},t.prototype._fetchFeatures=function(e){var t=this.view;if(!t||!e){var o=new p("fetch-features:invalid-screenPoint-or-view","Cannot fetch features without a screenPoint and view.",{screenPoint:e,view:t});return C.error(o),c.reject(o)}return t.fetchPopupFeatures(e,{defaultPopupTemplateEnabled:this.defaultPopupTemplateEnabled})},t.prototype._autoOpenEnabledChange=function(){var e=this,t=this,o=t._handles,n=t.autoOpenEnabled;if(o.remove("auto-fetch-features"),n){var r=d.on(this,"view","click",function(t){e.view.toolViewManager.handlesClickEvent(t)||"mouse"===t.pointerType&&0!==t.button||e._fetchFeaturesAndOpen(t)});o.add(r,"auto-fetch-features")}},t.prototype._cancelFetchingFeatures=function(){var e=this._fetchingFeatures;e&&e.cancel(),this._fetchingFeatures=null},t.prototype._fetchFeaturesAndOpen=function(e){var t=this,o=e.screenPoint,n=e.mapPoint,r=this.view;this._cancelFetchingFeatures(),this._fetchingFeatures=this._fetchFeatures(o).then(function(e){var o=e.promises,i=e.location;return t._fetchingFeatures=null,r.popup.open({location:i||n,promises:o}),e})},t.prototype._updatePendingPromises=function(e){e&&this._pendingPromises.has(e)&&(this._pendingPromises.delete(e),this.notifyChange("pendingPromisesCount"))},t.prototype._setVisibleWhenContentExists=function(){var e=this,t=this,o=t._handles,n=t.promiseCount;if(o.remove("pendingVisible"),!n)return void this.set("visible",!0);var r=d.init(this,"pendingPromisesCount",function(t){e.featureCount&&(e.set("visible",!0),o.remove("pendingVisible")),t||o.remove("pendingVisible")});o.add(r,"pendingVisible")},t.prototype._autoClose=function(){this.autoCloseEnabled&&(this.visible=!1)},t.prototype._isScreenSize=function(e){var t=this.view;if("3d"!==t.type||!e||"esri.Graphic"!==e.declaredClass)return!0;var o=t.getViewForGraphic(e);if(o&&"whenGraphicBounds"in o){var n=!1;return o.whenGraphicBounds(e,{useViewElevation:!0}).then(function(e){n=!e||!e.boundingBox||e.boundingBox[0]===e.boundingBox[3]&&e.boundingBox[1]===e.boundingBox[4]&&e.boundingBox[2]===e.boundingBox[5]}),n}return!0},t.prototype._getPointFromGeometry=function(e){return e?"point"===e.type?e:"extent"===e.type?e.center:"polygon"===e.type?e.centroid:"multipoint"===e.type?e.extent.center:"polyline"===e.type?e.extent.center:null:null},t.prototype._isLocationOffScreen=function(e){if(!e)return!1;var t=this.view.toScreen(e);return!!t&&!(t.x>=0&&t.x<=this.view.width&&t.y>=0&&t.y<=this.view.height)},t.prototype._centerAtLocation=function(){var e=this,t=e.location;e.updateLocationEnabled&&t&&this._isLocationOffScreen(t)&&this.centerAtLocation()},t.prototype._highlightFeature=function(){var e=this;this._handles.remove("highlight");var t=this,o=t.selectedFeature,n=t.highlightEnabled,r=t.view,i=t.visible;if(o&&r&&n&&i){var a=o.layer;a&&r.when().then(function(){s.typeCast(r)().whenLayerView(a).then(function(t){if(t&&m.hasHighlight(t)){var n=a.objectIdField,r=o.attributes,i=r&&r[n],s=t.highlight(i||o);e._handles.add(s,"highlight")}})})}},t.prototype._updateFeatures=function(e){var t=this.features;if(e&&e.length){if(!t.length)return void(this.features=e);var o=e.filter(function(e){return-1===t.indexOf(e)});this.features=t.concat(o)}},n([h.property({type:F})],t.prototype,"actions",void 0),n([h.property({dependsOn:["actions.length","selectedFeature.sourceLayer.popupTemplate.actions.length","selectedFeature.sourceLayer.popupTemplate.overwriteActions","selectedFeature.popupTemplate.actions.length","selectedFeature.popupTemplate.overwriteActions"],readOnly:!0})],t.prototype,"allActions",null),n([h.property({type:Boolean})],t.prototype,"defaultPopupTemplateEnabled",void 0),n([h.property()],t.prototype,"autoCloseEnabled",void 0),n([h.property()],t.prototype,"autoOpenEnabled",void 0),n([h.property()],t.prototype,"content",void 0),n([h.property({readOnly:!0,dependsOn:["features"]})],t.prototype,"featureCount",null),n([h.property()],t.prototype,"features",null),n([h.property()],t.prototype,"highlightEnabled",void 0),n([h.property({type:i.Point})],t.prototype,"location",null),n([h.property({readOnly:!0,dependsOn:["promises"]})],t.prototype,"pendingPromisesCount",null),n([h.property({readOnly:!0,dependsOn:["featureCount","pendingPromisesCount"]})],t.prototype,"waitingForResult",null),n([h.property({readOnly:!0,dependsOn:["promises"]})],t.prototype,"promiseCount",null),n([h.property()],t.prototype,"promises",null),n([h.property({value:null,readOnly:!0,dependsOn:["features","selectedFeatureIndex","updateLocationEnabled"]})],t.prototype,"selectedFeature",null),n([h.property({value:-1})],t.prototype,"selectedFeatureIndex",null),n([h.property({readOnly:!0,dependsOn:["view.ready"]})],t.prototype,"state",null),n([h.property()],t.prototype,"title",void 0),n([h.property()],t.prototype,"updateLocationEnabled",void 0),n([h.property()],t.prototype,"view",void 0),n([h.property()],t.prototype,"visible",void 0),n([h.property()],t.prototype,"zoomFactor",void 0),n([h.property()],t.prototype,"centerAtLocation",null),n([h.property()],t.prototype,"clear",null),n([h.property()],t.prototype,"triggerAction",null),n([h.property()],t.prototype,"next",null),n([h.property()],t.prototype,"previous",null),n([h.property()],t.prototype,"zoomToLocation",null),t=n([h.subclass("esri.widgets.Popup.PopupViewModel")],t)}(h.declared(w,_))});