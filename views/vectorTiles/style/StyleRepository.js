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

define(["require","exports","../../../core/has","./StyleLayer"],function(e,r,t,a){return function(){function e(r,a){if(this._layerByName={},this.styleJSON=r,this.version=parseFloat(r.version),this.sprite=a?a.spriteUrl:r.sprite,this.glyphs=a?a.glyphsUrl:r.glyphs,t("stable-symbol-rendering")){var i=(r.layers||[]).filter(function(e){return e.layout&&e.layout["text-font"]})[0];i&&(r.layers||[]).forEach(function(e){e.layout&&e.layout["text-font"]&&(e.layout["text-font"]=i.layout["text-font"])})}if(this.layers=(r.layers||[]).map(e._create),this.layers)for(var y=void 0,o=0;o<this.layers.length;o++)y=this.layers[o],this._layerByName[y.id.toLowerCase()]=y;this._identifyRefLayers()}return e.prototype.getStyleLayerId=function(e){return e>=this.layers.length?null:this.layers[e].id},e.prototype.getLayoutProperties=function(e){var r=this._layerByName[e.toLowerCase()];return r?r.layout:null},e.prototype.getPaintProperties=function(e){var r=this._layerByName[e.toLowerCase()];return r?r.paint:null},e.prototype.setPaintProperties=function(r,t){var a=this._layerByName[r.toLowerCase()];if(!a)return"";var i=this.layers.indexOf(a);this.styleJSON.layers[i].paint=t;var y={id:a.id,type:a.typeName,source:a.source,sourceLayer:a["source-layer"],minzoom:a.minzoom,maxzoom:a.maxzoom,filter:a.filter,layout:a.layout,paint:t},o=e._recreateLayer(y,a);return this.layers[i]=o,this._layerByName[a.id.toLowerCase()]=o,a.id},e.prototype.setLayoutProperties=function(r,t){var a=this._layerByName[r.toLowerCase()];if(!a)return"";var i=this.layers.indexOf(a);this.styleJSON.layers[i].layout=t;var y={id:a.id,type:a.typeName,source:a.source,sourceLayer:a["source-layer"],minzoom:a.minzoom,maxzoom:a.maxzoom,filter:a.filter,layout:t,paint:a.paint},o=e._recreateLayer(y,a);return this.layers[i]=o,this._layerByName[a.id.toLowerCase()]=o,a.id},e.prototype._identifyRefLayers=function(){for(var e=[],r=[],t=0,a=0,i=this.layers;a<i.length;a++){var y=i[a];if(1===y.type){var o=y,n=y.sourceLayer;n+="|"+JSON.stringify(y.layout&&y.layout.visibility),n+="|"+JSON.stringify(y.minzoom),n+="|"+JSON.stringify(y.maxzoom),n+="|"+JSON.stringify(y.filter),(o.hasDataDrivenFill||o.hasDataDrivenOutline)&&(n+="|"+JSON.stringify(t)),e.push({key:n,layer:y})}if(2===y.type){var s=y,n=y.sourceLayer;n+="|"+JSON.stringify(y.layout&&y.layout.visibility),n+="|"+JSON.stringify(y.minzoom),n+="|"+JSON.stringify(y.maxzoom),n+="|"+JSON.stringify(y.filter),n+="|"+JSON.stringify(y.layout&&y.layout["line-cap"]),n+="|"+JSON.stringify(y.layout&&y.layout["line-join"]),s.hasDataDrivenLine&&(n+="|"+JSON.stringify(t)),r.push({key:n,layer:y})}++t}this._assignRefLayers(e),this._assignRefLayers(r)},e.prototype._assignRefLayers=function(e){e.sort(function(e,r){return e.key<r.key?-1:e.key>r.key?1:0});for(var r,t,a=e.length,i=0;i<a;i++){var y=e[i];if(y.key===r)y.layer.refLayerId=t;else if(r=y.key,t=y.layer.id,1===y.layer.type&&!y.layer.getPaintProperty("fill-outline-color"))for(var o=i+1;o<a;o++){var n=e[o];if(n.key!==r)break;if(n.layer.getPaintProperty("fill-outline-color")){e[i]=n,e[o]=y,t=n.layer.id;break}}}},e._create=function(e,r,t){var i=1/(t.length+1),y=1-(1+r)*i;switch(e.type){case"background":return new a.BackgroundStyleLayer(0,e,y);case"fill":return new a.FillStyleLayer(1,e,y);case"line":return new a.LineStyleLayer(2,e,y);case"symbol":return new a.SymbolStyleLayer(3,e,y);case"raster":throw new Error("Unsupported vector tile raster layer");case"circle":return new a.CircleStyleLayer(4,e,y)}throw new Error("Unknown vector tile layer")},e._recreateLayer=function(e,r){switch(e.type){case"background":return new a.BackgroundStyleLayer(0,e,r.z);case"fill":return new a.FillStyleLayer(1,e,r.z);case"line":return new a.LineStyleLayer(2,e,r.z);case"symbol":return new a.SymbolStyleLayer(3,e,r.z);case"raster":throw new Error("Unsupported vector tile raster layer");case"circle":return new a.CircleStyleLayer(4,e,r.z)}},e}()});