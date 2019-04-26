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

define(["require","exports","../../../../core/maybe","./TextRenderParameters"],function(e,t,i,r){function n(e,t){return"center"===e?.5*t:"right"===e?t:0}function a(e,t,i){return e.canvas||(e.canvas=document.createElement("canvas")),e.canvas.width=t,e.canvas.height=i,e.canvas}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t,i){void 0===i&&(i=2048),this.text=e,this.maxSize=i,this._renderPixelRatio=null,this._displayWidth=null,t instanceof r.default?this.parameters=t:this.parameters=new r.default(t),this.key=this.parameters.key+"--"+e,this.textLines=e.split(/\r?\n/),this.lineHeight=this.computeLineHeight()}return Object.defineProperty(e.prototype,"displayWidth",{get:function(){return i.isNone(this._displayWidth)&&(this._displayWidth=this.computeTextWidth()),this._displayWidth},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"displayHeight",{get:function(){return this.lineHeight*this.textLines.length},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"renderedWidth",{get:function(){return Math.round(this.displayWidth*this.renderPixelRatio)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"renderedHeight",{get:function(){return Math.round(this.displayHeight*this.renderPixelRatio)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"renderedLineHeight",{get:function(){return Math.round(this.lineHeight*this.renderPixelRatio)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"renderedFontSize",{get:function(){return this.parameters.definition.size*this.renderPixelRatio},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"renderedHaloSize",{get:function(){return this.parameters.haloSize*this.renderPixelRatio},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"renderPixelRatio",{get:function(){if(i.isNone(this._renderPixelRatio)){var e=this.parameters.definition.pixelRatio;this.maxSize>0?this._renderPixelRatio=Math.min(e,Math.min(this.maxSize/(this.displayWidth*e),this.maxSize/(this.displayHeight*e))):this._renderPixelRatio=e}return this._renderPixelRatio},enumerable:!0,configurable:!0}),e.prototype.render=function(e,t,i){void 0===t&&(t=0),void 0===i&&(i=0);var r=this.renderedLineHeight,a=this.renderedHaloSize,o=n(e.textAlign,this.renderedWidth)+a,s=a;e.save(),a>0&&this.renderHalo(e,o,s,t,i),this.setFontProperties(e,this.renderedFontSize),i+=s,t+=o;for(var h=0,l=this.textLines;h<l.length;h++){var d=l[h];e.globalCompositeOperation="destination-out",e.fillStyle="rgb(0, 0, 0)",e.fillText(d,t,i),e.globalCompositeOperation="source-over",e.fillStyle=this.parameters.fillStyle,e.fillText(d,t,i),i+=r}e.restore()},e.prototype.renderHalo=function(e,t,i,r,n){var o=this.renderedWidth,s=this.renderedHeight,h=a(l,Math.max(o,d),Math.max(s,d)),p=h.getContext("2d");p.clearRect(0,0,o,s),this.setFontProperties(p,this.renderedFontSize),p.fillStyle=this.parameters.haloStyle,p.strokeStyle=this.parameters.haloStyle;var u=this.renderedHaloSize<3;p.lineJoin=u?"miter":"round",u?this.renderHaloEmulated(p,t,i):this.renderHaloNative(p,t,i),e.globalAlpha=this.parameters.definition.halo.color[3],e.drawImage(h,0,0,o,s,r,n,o,s),e.globalAlpha=1},e.prototype.renderHaloEmulated=function(e,t,i){for(var r=this.renderedLineHeight,n=this.renderedHaloSize,a=0,o=this.textLines;a<o.length;a++){for(var h=o[a],l=0,d=s;l<d.length;l++){var p=d[l],u=p[0],f=p[1];e.fillText(h,t+n*u,i+n*f)}i+=r}},e.prototype.renderHaloNative=function(e,t,i){for(var r=this.renderedLineHeight,n=this.renderedHaloSize,a=0,o=this.textLines;a<o.length;a++){for(var s=o[a],h=2*n,l=0;l<5;l++){var d=.6+.1*l;e.lineWidth=d*h,e.strokeText(s,t,i)}i+=r}},e.prototype.setFontProperties=function(e,t){var i=this.parameters.definition.font,r=i.style+" "+i.weight+" "+t+"px "+i.family+", sans-serif";e.font=r,e.textAlign="left",e.textBaseline="top"},e.prototype.computeTextWidth=function(){var e=a(l,d,d),t=e.getContext("2d");this.setFontProperties(t,this.parameters.definition.size);for(var i=0,r=0,n=this.textLines;r<n.length;r++){var o=n[r];i=Math.max(i,t.measureText(o).width)}var s=this.parameters.definition.font;return("italic"===s.style||"oblique"===s.style||"string"==typeof s.weight&&("bold"===s.weight||"bolder"===s.weight)||"number"==typeof s.weight&&s.weight>600)&&(i+=.3*t.measureText("A").width),i+=2*this.parameters.haloSize,Math.round(i)},e.prototype.computeLineHeight=function(){var e=1.275*this.parameters.definition.size;return Math.floor(e+2*this.parameters.haloSize)},e}();t.TextRenderer=o;for(var s=[],h=0;h<360;h+=22.5)s.push([Math.cos(Math.PI*h/180),Math.sin(Math.PI*h/180)]);t.getTextHelperCanvas=a;var l={canvas:null},d=512;t.default=o});