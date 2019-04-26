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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../core/Error","../../core/promiseUtils","../../core/accessorSupport/decorators","../../renderers/support/clickToleranceUtils","./RefreshableLayerView"],function(e,r,t,o,a,i,u,n,c,l,p){return function(e){function r(r){return e.call(this,r)||this}return t(r,e),r.prototype.fetchPopupFeatures=function(e){return i(this,void 0,void 0,function(){var r,t,o,c=this;return a(this,function(p){return r=this.layer,e?"tile"!==r.type?[2,n.reject(new u("tilelayerview:fetchPopupFeatures","Layer type should be 'tile'",{type:r.type}))]:(t=this.get("view.scale"),o=r.allSublayers.toArray().filter(function(e){var r=0===e.minScale||t<=e.minScale,o=0===e.maxScale||t>=e.maxScale;return e.popupTemplate&&e.popupEnabled&&e.visible&&r&&o}),[2,n.eachAlways(o.map(function(r){return i(c,void 0,void 0,function(){var t,o,i,u;return a(this,function(a){switch(a.label){case 0:return t=r.createQuery(),o=l.calculateTolerance(r.renderer),t.geometry=this.createFetchPopupFeaturesQueryGeometry(e,o),i=t,[4,r.popupTemplate.getRequiredFields()];case 1:return i.outFields=a.sent(),[4,r.queryFeatures(t)];case 2:return u=a.sent(),[2,u.features]}})})})).then(function(e){return[].concat.apply([],e.map(function(e){return e.value}).filter(Boolean))})]):[2,n.reject(new u("tilelayerview:fetchPopupFeatures","Nothing to fetch without area",{layer:r}))]})})},o([c.property()],r.prototype,"layer",void 0),r=o([c.subclass("esri.views.layers.TileLayerView")],r)}(c.declared(p))});