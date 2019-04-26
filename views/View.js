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

define(["require","exports","../core/tsSupport/decorateHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/assignHelper","../Map","../core/Accessor","../core/Collection","../core/CollectionFlattener","../core/Evented","../core/Handles","../core/Logger","../core/maybe","../core/Promise","../core/promiseUtils","../core/scheduling","../core/watchUtils","../core/accessorSupport/decorators","../geometry/Extent","../geometry/HeightModelInfo","../geometry/SpatialReference","../geometry/support/spatialReferenceUtils","../support/GraphicsCollection","./BasemapView","./LayerViewManager","./RefreshManager","./ToolViewManager","./input/Input","./navigation/Navigation","./support/DefaultsFromMap"],function(e,t,r,i,o,n,a,p,l,s,d,u,c,y,h,f,g,w,m,v,M,V,R,F,b,O,_,C,S,I){function x(e){return!(!e||!e.load)}var D=u.getLogger("esri.views.View");return function(e){function t(t){var r=e.call(this)||this;return r._viewHandles=new d,r._isValid=!1,r._readyCycleForced=!1,r._userSpatialReference=null,r._currentSpatialReference=null,r._cursor=null,r.allLayerViews=new l({root:r,rootCollectionNames:["basemapView.baseLayerViews","groundView?.layerViews","layerViews","basemapView.referenceLayerViews"],getChildrenFunction:function(e){return e.layerViews}}),r.animation=null,r.basemapView=null,r.defaultsFromMap=new I({view:r}),r.extent=null,r.graphicsView=null,r.graphics=new R.default,r.interacting=!1,r.layerViews=new p,r.padding={left:0,top:0,right:0,bottom:0},r.spatialReferenceWarningDelay=1e3,r.type=null,r.scale=null,r.updating=!1,r.initialExtentRequired=!0,r.renderContext=null,r.input=new C,r.navigation=new S,r.layerViewManager=null,r.refreshManager=null,r.isHeightModelInfoRequired=!1,r.width=null,r.height=null,r.resizing=!1,r.suspended=!1,r._viewHandles.add(r.watch("ready",function(e,t){e?(r._currentSpatialReference=r.spatialReference,o.views.add(r)):(r._currentSpatialReference=null,o.views.remove(r)),r.notifyChange("spatialReference"),!e&&t?(r.layerViewManager.clear(),r.toolViewManager.detach()):e&&!t&&r.whenReady().then(function(){return r.toolViewManager.attach()})})),r}i(t,e),o=t,t.prototype.initialize=function(){var e=this,t=this.validate().then(function(){e._isValid=!0,e.notifyChange("ready");var t=function(){return g.whenOnce(e,"ready").then(function(){return h.after(0)}).then(function(){if(!e.ready)return t()})};return t()});this.addResolvingPromise(t),this.basemapView=new F({view:this}),this.layerViewManager=new b({view:this}),this.refreshManager=new O({view:this}),this.toolViewManager=new _({view:this}),this._resetInitialViewPropertiesFromContent();var r;g.init(this.defaultsFromMap,"isSpatialReferenceDone",function(t){var i=!!(e.map&&e.map.allLayers.length>0);t&&!e.spatialReference&&i||!r?t&&!e.spatialReference&&i&&!r&&(r=h.after(e.spatialReferenceWarningDelay),r.then(function(){D.warn("#spatialReference","no spatial reference could be derived from the currently added map layers")}).catch(function(){})):(r.cancel(),r=null)},!0)},t.prototype.destroy=function(){this.destroyed||(o.views.remove(this),this.destroyViewData(),this.defaultsFromMap.destroy(),this.defaultsFromMap=null,this.navigation&&(this.navigation.destroy(),this._set("navigation",null)),this.map=null,this.graphics.destroy())},t.prototype.destroyViewData=function(){null!=this.toolViewManager&&(this._viewHandles.destroy(),this.toolViewManager.destroy(),this.toolViewManager=null,this.refreshManager.destroy(),this.refreshManager=null,this.layerViewManager.destroy(),this.layerViewManager=null,this.basemapView.destroy(),this.basemapView=null)},t.prototype.whenReady=function(){return h.resolve()},Object.defineProperty(t.prototype,"heightModelInfo",{get:function(){return this.getDefaultHeightModelInfo()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"map",{set:function(e){e!==this._get("map")&&(x(e)&&e.load(),this.initialized&&(this.forceReadyCycle(),this._resetInitialViewPropertiesFromContent()),this._set("map",e))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"ready",{get:function(){return!!(this._isValid&&!this._readyCycleForced&&this.map&&0!==this.width&&0!==this.height&&this.spatialReference&&(!x(this.map)||this.map.loaded)&&(this._currentSpatialReference||!this.initialExtentRequired||this.initialExtent||this.defaultsFromMap&&this.defaultsFromMap.isSpatialReferenceDone)&&this.defaultsFromMap&&this.defaultsFromMap.isTileInfoDone&&this.isSpatialReferenceSupported(this.spatialReference))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"spatialReference",{get:function(){var e=this._userSpatialReference||this._currentSpatialReference||this.getDefaultSpatialReference()||null;return e&&this.isHeightModelInfoRequired&&this.defaultsFromMap&&(e=e.clone(),e.vcsWkid=this.defaultsFromMap.vcsWkid,e.latestVcsWkid=this.defaultsFromMap.latestVcsWkid),e},set:function(e){this._userSpatialReference=e,this._set("spatialReference",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"stationary",{get:function(){return!this.animation&&!this.interacting&&!this.resizing},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"initialExtent",{get:function(){return this.defaultsFromMap&&this.defaultsFromMap.extent},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"cursor",{get:function(){var e=this.toolViewManager?this.toolViewManager.cursor:null;return c.isSome(e)?e:this._cursor||"default"},set:function(e){this._cursor=e,this.notifyChange("cursor")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"size",{get:function(){return[this.width,this.height]},enumerable:!0,configurable:!0}),t.prototype.whenLayerView=function(e){return this.layerViewManager.whenLayerView(e)},t.prototype.getDefaultSpatialReference=function(){return this.get("defaultsFromMap.spatialReference")},t.prototype.getDefaultHeightModelInfo=function(){return this.get("map.supportsHeightModelInfo")&&this.get("map.heightModelInfo")||this.get("defaultsFromMap.heightModelInfo")||null},t.prototype.validate=function(){return h.resolve()},t.prototype.isSpatialReferenceSupported=function(e,t,r){return!0},t.prototype.isTileInfoRequired=function(){return!1},t.prototype.when=function(e,t){return this.isResolved()&&!this.ready&&D.warn("#when()",'Calling view.when() while the view is no longer ready but was already resolved once will resolve immediately. Use watchUtils.whenOnce(view, "ready").then(...) instead.'),this.inherited(arguments)},t.prototype.forceReadyCycle=function(){var e=this;this.ready&&(this._readyCycleForced=!0,g.whenFalseOnce(this,"ready",function(){e._readyCycleForced=!1,e.notifyChange("ready")}),this.notifyChange("ready"))},t.prototype.createTool=function(e,t,r){return this.toolViewManager.createTool(e,t,r)},t.prototype.removeTool=function(e){this.toolViewManager&&this.toolViewManager.removeTool(e)},t.prototype._resetInitialViewPropertiesFromContent=function(){var e=this;if(this.defaultsFromMap){var t=function(){e.defaultsFromMap.start()};this.defaultsFromMap.reset(),this._currentSpatialReference=null,this.notifyChange("spatialReference"),this._viewHandles.remove("defaultsFromMap"),this._viewHandles.add([g.watch(this,"spatialReference",function(e,r){V.equals(e,r)||t()}),g.watch(this,"initialExtentRequired",t),f.schedule(t)],"defaultsFromMap")}};var o;return t.views=new p,r([w.aliasOf("toolViewManager.activeTool")],t.prototype,"activeTool",void 0),r([w.property({readOnly:!0})],t.prototype,"allLayerViews",void 0),r([w.property()],t.prototype,"animation",void 0),r([w.property()],t.prototype,"basemapView",void 0),r([w.property()],t.prototype,"defaultsFromMap",void 0),r([w.property({type:m})],t.prototype,"extent",void 0),r([w.property({readOnly:!0})],t.prototype,"graphicsView",void 0),r([w.property(R.graphicsCollectionProperty)],t.prototype,"graphics",void 0),r([w.property({readOnly:!0,type:v,dependsOn:["map.heightModelInfo?","defaultsFromMap.heightModelInfo"]})],t.prototype,"heightModelInfo",null),r([w.property()],t.prototype,"interacting",void 0),r([w.property({type:p,readOnly:!0})],t.prototype,"layerViews",void 0),r([w.property({value:null,type:n})],t.prototype,"map",null),r([w.property()],t.prototype,"padding",void 0),r([w.property({readOnly:!0,dependsOn:["map","spatialReference","width","height","initialExtentRequired","initialExtent","defaultsFromMap.isSpatialReferenceDone","defaultsFromMap.isTileInfoDone","map.loaded?"]})],t.prototype,"ready",null),r([w.property({type:M,dependsOn:["defaultsFromMap.spatialReference","defaultsFromMap.vcsWkid","defaultsFromMap.latestVcsWkid"]})],t.prototype,"spatialReference",null),r([w.property()],t.prototype,"spatialReferenceWarningDelay",void 0),r([w.property({dependsOn:["animation","interacting","resizing"]})],t.prototype,"stationary",null),r([w.aliasOf("toolViewManager.tools")],t.prototype,"tools",void 0),r([w.property()],t.prototype,"toolViewManager",void 0),r([w.property({readOnly:!0})],t.prototype,"type",void 0),r([w.property({type:Number})],t.prototype,"scale",void 0),r([w.property({readOnly:!0})],t.prototype,"updating",void 0),r([w.property({readOnly:!0})],t.prototype,"initialExtentRequired",void 0),r([w.property({readOnly:!0,type:m,dependsOn:["defaultsFromMap.extent"]})],t.prototype,"initialExtent",null),r([w.property({dependsOn:["toolViewManager.cursor"]})],t.prototype,"cursor",null),r([w.property()],t.prototype,"renderContext",void 0),r([w.property({readOnly:!0})],t.prototype,"input",void 0),r([w.property({readOnly:!0})],t.prototype,"navigation",void 0),r([w.property()],t.prototype,"width",void 0),r([w.property()],t.prototype,"height",void 0),r([w.property({readOnly:!0})],t.prototype,"resizing",void 0),r([w.property({value:null,dependsOn:["width","height"],readOnly:!0})],t.prototype,"size",null),r([w.property({readOnly:!0})],t.prototype,"suspended",void 0),t=o=r([w.subclass("esri.views.View")],t)}(w.declared(a,y,s))});