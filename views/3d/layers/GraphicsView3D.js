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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../core/maybe","../../../core/promiseUtils","../../../core/accessorSupport/decorators","./graphics/Graphics3DGraphicLikeLayerView","./graphics/graphicSymbolUtils","../../layers/GraphicsView"],function(r,e,t,p,i,o,a,s,n,c,d,h){return function(r){function e(e){var t=r.call(this)||this;return t.graphics3d=null,t.slicePlaneEnabled=!1,t.supportsDraping=!0,t.overlayUpdating=!1,t.mockLayerId="__sceneView.graphics-"+Date.now().toString(16),t}return t(e,r),e.prototype.initialize=function(){var r={id:this.mockLayerId,uid:this.mockLayerId};this._set("graphics3d",new c({owner:this,layer:r})),this.graphics3d.setup()},e.prototype.destroy=function(){this.graphics3d&&(this.graphics3d.destroy(),this._set("graphics3d",null))},Object.defineProperty(e.prototype,"updating",{get:function(){return!(this.graphics3d&&!this.graphics3d.updating&&!this.overlayUpdating)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"drawingOrder",{set:function(r){this.graphics3d.graphicsCore.setDrawingOrder(r),this._set("drawingOrder",r)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"graphics3DGraphics",{get:function(){return this.graphics3d.graphicsCore.graphics3DGraphics},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"graphics3DGraphicsByObjectID",{get:function(){return this.graphics3d.graphicsCore.graphics3DGraphicsByObjectID},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"symbolUpdateType",{get:function(){return this.graphics3d.graphicsCore.symbolUpdateType},enumerable:!0,configurable:!0}),e.prototype.getRenderingInfo=function(r){return{symbol:r.symbol||d.getDefaultSymbol(r)}},e.prototype.getGraphicFromGraphicUid=function(r){return this.graphics3d.getGraphicFromGraphicUid(r)},e.prototype.whenGraphicBounds=function(r,e){return this.graphics3d.whenGraphicBounds(r,e)},e.prototype.graphicChanged=function(r){this.graphics3d.graphicsCore.graphicUpdateHandler(r)},e.prototype.queryGraphics=function(){return s.resolve(this.loadedGraphics)},e.prototype.fetchPopupFeatures=function(r,e){return o(this,void 0,void 0,function(){return i(this,function(r){return[2,a.isSome(e)?e.clientGraphics:null]})})},p([n.property({readOnly:!0,aliasOf:"view.graphics"})],e.prototype,"graphics",void 0),p([n.property({aliasOf:"graphics"})],e.prototype,"loadedGraphics",void 0),p([n.property({readOnly:!0,dependsOn:["graphics3d.updating","overlayUpdating"]})],e.prototype,"updating",null),p([n.property({constructOnly:!0})],e.prototype,"view",void 0),p([n.property()],e.prototype,"graphics3d",void 0),p([n.property({type:Boolean})],e.prototype,"slicePlaneEnabled",void 0),p([n.property({aliasOf:"graphics3d.graphicsCore.hasDraped"})],e.prototype,"hasDraped",void 0),p([n.property({type:Boolean})],e.prototype,"supportsDraping",void 0),p([n.property({type:Boolean})],e.prototype,"overlayUpdating",void 0),p([n.property()],e.prototype,"drawingOrder",null),e=p([n.subclass("esri.views.3d.layers.GraphicsView3D")],e)}(n.declared(h))});