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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","dojo/_base/config","../../Graphic","../../core/Accessor","../../core/Collection","../../core/Error","../../core/Evented","../../core/Handles","../../core/has","../../core/Logger","../../core/promiseUtils","../../core/watchUtils","../../core/accessorSupport/decorators","../../geometry/Point","../../geometry/projection","../../geometry/SpatialReference","../../portal/support/geometryServiceUtils","../../symbols/PictureMarkerSymbol","./support/Conversion","./support/coordinateConversionUtils","./support/formatUtils","../support/GoTo"],function(e,t,o,n,r,i,a,s,c,l,h,p,u,d,v,f,m,_,g,y,w,C,b,P,S){var L={default:"default",crosshair:"crosshair"},M=new m([0,0,500]),O=window.location.pathname+"__coordinateConversionWidgetState",F=u.getLogger("esri.widgets.CoordinateConversion.CoordinateConversionViewModel"),j={conversions:"conversions",formats:"formats",view:"view",viewChange:"view-change"},A=0,G=[];return function(t){function a(o){var n=t.call(this,o)||this;return n._conversionPromise=null,n._handles=new h,n._locationGraphic=null,n._locale=r.locale,n._pointerCount=0,n.conversions=new s,n.formats=new s(P.generateDefaultFormats()),n.formatterAvailable=!1,n.geometryServicePromise=null,n.requestDelay=300,n.locationSymbol=new w({url:e.toUrl(p("trident")?"../../images/search/search-symbol-32.png":"../../images/search/search-symbol-32.svg"),size:12,width:12,height:12}),n.view=null,n._instanceNumber=A,A++,n._saveWidgetState=n._saveWidgetState.bind(n),n._handleFormatChange=n._handleFormatChange.bind(n),n._handleConversionChange=n._handleConversionChange.bind(n),n._handleViewChange=n._handleViewChange.bind(n),n._onClick=n._onClick.bind(n),n._onPointerMove=n._onPointerMove.bind(n),n._onPointerDown=n._onPointerDown.bind(n),n._onPointerUp=n._onPointerUp.bind(n),n}return o(a,t),a.prototype.initialize=function(){var e=this;if(this._loadWidgetState(),this.formats.forEach(function(t){t.viewModel=e,e._handles.add(t.watch("currentPattern",e._saveWidgetState),t.name)}),this._handles.add(this.conversions.on("change",this._handleConversionChange),j.conversions),this._handles.add(this.formats.on("change",this._handleFormatChange),j.formats),this._handles.add(v.init(this,"view.map",function(t){e.geometryServicePromise=y.create(e.get("view.map.portalItem"))}),j.viewChange),_.isSupported()?_.load().then(function(){e.formatterAvailable=!0}).catch(function(t){F.error(new c("coordinate-conversion:projection-load-failed","Failed to load the projection module.",{error:t})),e.formatterAvailable=!1}).then(function(){return e._handles.add(v.init(e,"view",e._handleViewChange),j.viewChange)}):(this.formatterAvailable=!1,this._handles.add(v.init(this,"view",this._handleViewChange),j.viewChange)),0===this.conversions.length){var t=this.formats.find(function(e){return"xy"===e.name})||this.formats.getItemAt(0);this.conversions.add(new C({format:t}))}},a.prototype.destroy=function(){this._handles.removeAll(),this._cleanUpView(this.view),this.view=null},Object.defineProperty(a.prototype,"currentLocation",{get:function(){return this._get("currentLocation")||null},set:function(e){this._set("currentLocation",e),this._updateConversions()},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"mode",{get:function(){return this._get("mode")||"live"},set:function(e){switch(e){case"capture":this.currentLocation=null,this._startCaptureMode(),this._set("mode",e);break;case"live":this._startLiveMode(),this._set("mode",e)}},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"state",{get:function(){var e=this.get("view");return this.get("view.ready")?"ready":e?"loading":"disabled"},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"waitingForConversions",{get:function(){var e=this._conversionPromise;return!!e&&!e.isFulfilled()},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"_debouncedConvert",{get:function(){return b.debounceDeferred(function(e,t){return d.eachAlways(e.map(function(e){return e.convert(t)}))},this,this.requestDelay)},enumerable:!0,configurable:!0}),a.prototype.setLocation=function(e){if(this.view.graphics.remove(this._locationGraphic),e){var t=e.clone();t.hasZ&&(t.z=void 0),this._locationGraphic=new i({geometry:t,symbol:this.get("locationSymbol")}),this.view.graphics.add(this._locationGraphic)}},a.prototype.convert=function(e,t){return b.isValidPoint(t)?d.resolve().then(function(){return e.convert(t)}):d.reject(new c("coordinate-conversion:invalid-point","Invalid point cannot be converted.",{point:t}))},a.prototype.goToLocation=function(e){if(this.get("view.clippingArea")||this.get("view.map.basemap.baseLayers.length")>0){var t=this.get("view.clippingArea")||this.view.map.basemap.baseLayers.getItemAt(0).fullExtent;return t?t.contains(e)?this.callGoTo({target:e}):d.reject(new c("coordinate-conversion:go-to-failed","Point outside basemap extent.",{point:e})):this.callGoTo({target:e})}return this.callGoTo({target:e})},a.prototype.pause=function(){this.currentLocation=null,this._handles.remove(j.view),this.view&&(this.view.cursor=L.default,this.view.graphics.remove(this._locationGraphic))},a.prototype.previewConversion=function(e,t){return void 0===t&&(t=this.currentLocation||M),this._convertMany([e],t).then(function(t){return e.displayCoordinate})},a.prototype.resume=function(){"capture"===this.mode?this._startCaptureMode():this._startLiveMode()},a.prototype.reverseConvert=function(e,t,o){return void 0===o&&(o=this.get("view.spatialReference")||g.WGS84),t.reverseConvert(e)},a.prototype.updateConversions=function(e,t){return t&&t.type&&"point"===t.type?this._convertMany(e,t).then(function(e){return e.client.concat(e.server)}):(this._clearConversions(this.conversions),d.reject(new c("coordinate-conversion:invalid-input-point","Point is invalid, conversions cannot be updated.",{point:t})))},a.prototype._cleanUpView=function(e){e&&(e.graphics.remove(this._locationGraphic),this._handles.remove(j.view),e.cursor=L.default)},a.prototype._clearConversions=function(e){e.forEach(function(e){e.position={location:null,coordinate:null}})},a.prototype._convertMany=function(e,t){var o=this,n=e.reduce(function(e,o){return e[o.format.getConversionStrategy(t)].push(o),e},{client:[],server:[]}),r=n.client,i=n.server,a=d.all(r.map(function(e){return e.format.convert(t).then(function(t){return e.position=t,e}).catch(function(t){e.position=null})})),s=function(e){return e?(o.notifyChange("waitingForConversions"),e.map(function(e,t){var o=i[t];return e.error?(o.position=null,o):(o.position=e.value,o)})):[]};return this._conversionPromise=i.length>0?this._debouncedConvert(i.map(function(e){return e.format}),t).then(s,s):d.resolve([]),this.waitingForConversions||this.notifyChange("waitingForConversions"),d.all([a,this._conversionPromise]).then(function(e){return{client:e[0],server:e[1]}})},a.prototype._handleConversionChange=function(e){var t=this;e.added.forEach(function(e){var o=e.format;o.viewModel=t,t.currentLocation&&(t._set("waitingForConversions",!0),t.convert(o,t.currentLocation).then(function(o){e.position=o,t._set("waitingForConversions",!1)}))}),this._saveWidgetState()},a.prototype._handleFormatChange=function(e){var t=this;e.added.forEach(function(e){t._handles.add(e.watch("currentPattern",t._saveWidgetState),e.name),e.viewModel=t}),e.removed.forEach(function(e){e.viewModel=null,t._handles.remove(e.name)})},a.prototype._loadWidgetState=function(){if(0===this._instanceNumber)try{var e=JSON.parse(localStorage.getItem(O));e&&(G=e)}catch(e){F.error(new c("coordinate-conversion:invalid-local-storage-json","Could not read from localStorge.",{error:e}))}this._setWidgetState()},a.prototype._startCaptureMode=function(){this._handles.remove(j.view),this.view&&(this.view.cursor=L.crosshair,this.currentLocation&&this.setLocation(this.currentLocation),this._handles.add(this.view.on("click",this._onClick),j.view))},a.prototype._startLiveMode=function(){this._pointerCount=0,this._handles.remove(j.view),this.view&&(this.view.cursor=L.default,this.view.graphics.remove(this._locationGraphic),this._handles.add([this.view.on("pointer-down",this._onPointerDown),this.view.on("pointer-up",this._onPointerUp),this.view.on("pointer-move",this._onPointerMove)],j.view))},a.prototype._handleViewChange=function(e,t){t&&t!==e&&this._cleanUpView(t),e&&("capture"===this.mode&&this._startCaptureMode(),this._startLiveMode())},a.prototype._onClick=function(e){if(0===e.button){var t=this.view.toMap(e),o=t&&t.normalize();this.setLocation(o),this.currentLocation=o}},a.prototype._onPointerDown=function(e){var t=e.pointerType;if(this._pointerCount++,("touch"===t||"pen"===t)&&1===this._pointerCount){var o=this.view.toMap(e);this.currentLocation=o&&o.normalize()}},a.prototype._onPointerMove=function(e){if("mouse"===e.pointerType||1===this._pointerCount){var t=this.view.toMap(e);this.currentLocation=t&&t.normalize()}},a.prototype._onPointerUp=function(e){this._pointerCount--},a.prototype._setWidgetState=function(){var e=this,t=G[this._instanceNumber];if(!t)return void(G[this._instanceNumber]={formats:[],locale:this._locale});try{t.formats.forEach(function(o){var n=e.formats.find(function(e){return e.name===o.name});n&&t.locale===e._locale&&o.currentPattern&&(n.currentPattern=o.currentPattern),n&&o.index>=0&&e.conversions.add(new C({format:n}))})}catch(e){F.warn(new c("coordinate-conversion:local-storage-read-error","Could not get widget state from stored JSON.",{error:e})),G[this._instanceNumber]={formats:[],locale:this._locale}}},a.prototype._saveWidgetState=function(){var e=this._toJSON();G[this._instanceNumber]={formats:e,locale:this._locale};try{localStorage.setItem(O,JSON.stringify(G))}catch(e){F.error(new c("coordinate-conversion:local-storage-write-error","Could not write to localStorage.",{error:e}))}},a.prototype._updateConversions=function(){var e=this.conversions.toArray();return this.updateConversions(e,this.currentLocation)},a.prototype._toJSON=function(){var e=this;return this.formats.filter(function(e){var t=e.name;return"xy"===t||"basemap"===t||b.isSupportedNotation(t)}).map(function(t){return{name:t.name,currentPattern:t.currentPattern,defaultPattern:t.defaultPattern,index:e.conversions.findIndex(function(e){return e.format===t})}}).sort(function(e,t){return e.index-t.index}).toArray()},n([f.property()],a.prototype,"conversions",void 0),n([f.property({type:m})],a.prototype,"currentLocation",null),n([f.property()],a.prototype,"formats",void 0),n([f.property()],a.prototype,"mode",null),n([f.property()],a.prototype,"requestDelay",void 0),n([f.property({dependsOn:["view","view.ready"],readOnly:!0})],a.prototype,"state",null),n([f.property()],a.prototype,"locationSymbol",void 0),n([f.property({readOnly:!0})],a.prototype,"waitingForConversions",null),n([f.property()],a.prototype,"view",void 0),n([f.property({readOnly:!0,dependsOn:["requestDelay"]})],a.prototype,"_debouncedConvert",null),n([f.property()],a.prototype,"reverseConvert",null),a=n([f.subclass("esri.widgets.CoordinateConversion.CoordinateConversionViewModel")],a)}(f.declared(a,l,S))});