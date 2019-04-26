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

define(["require","exports","./tsSupport/declareExtendsHelper","./tsSupport/decorateHelper","./Collection","./Handles","./accessorSupport/decorators"],function(t,e,o,r,n,i,s){return function(t){function e(e){var o=t.call(this)||this;return o._handles=new i,o.root=null,o.refresh=o.refresh.bind(o),o.updateCollections=o.updateCollections.bind(o),o}return o(e,t),e.prototype.initialize=function(){var t=this;this._handles.add(this.rootCollectionNames.map(function(e){return t.watch("root."+e,t.updateCollections,!0)})),this.updateCollections()},e.prototype.destroy=function(){this.root=null,this.refresh(),this._handles.destroy(),this._handles=null},e.prototype.updateCollections=function(){var t=this;this._collections=this.rootCollectionNames.map(function(e){return t.get("root."+e)}).filter(function(t){return null!=t}),this.refresh()},e.prototype.refresh=function(){var t=this._handles;t.remove("collections"),this.removeAll();for(var e=this._collections.slice(),o=0,r=this._collections;o<r.length;o++){var n=r[o];this._processCollection(e,this,n)}for(var i=0,s=e;i<s.length;i++){var l=s[i];t.add(l.on("after-changes",this.refresh),"collections")}},e.prototype._createNewInstance=function(t){return new n(t)},e.prototype._processCollection=function(t,e,o){var r=this;o&&(t.push(o),o.forEach(function(o){o&&(e.push(o),r._processCollection(t,e,r.getChildrenFunction(o)))}))},r([s.property()],e.prototype,"rootCollectionNames",void 0),r([s.property()],e.prototype,"root",void 0),r([s.property()],e.prototype,"getChildrenFunction",void 0),e=r([s.subclass("esri.core.CollectionFlattener")],e)}(s.declared(n))});