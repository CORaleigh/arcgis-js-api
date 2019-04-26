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

define(["require","exports","../../../../core/has","../../../../core/promiseUtils","./Rect","./RectangleBinPack","../../../webgl/Texture"],function(t,e,P,h,d,_,a){var x;return P("stable-symbol-rendering")&&(x=new Set),function(){function t(t,e,r){this.width=0,this.height=0,this._dirties=[],this._glyphData=[],this._currentPage=0,this._glyphIndex={},this._textures=[],this._rangePromises=new Map,!x&&P("stable-symbol-rendering")&&(x=new Set),this.width=t,this.height=e,this._glyphSource=r,this._binPack=new _(t-4,e-4),this._glyphData.push(new Uint8Array(t*e)),this._dirties.push(!0),this._textures.push(void 0),this._addDecorationGlyph()}return t.prototype.getGlyphItems=function(y,f){for(var v=this,m=[],w=this._glyphSource,b=new Set,t=0,e=f;t<e.length;t++){var r=e[t],i=Math.floor(r*(1/256));b.add(i)}var s=[];return b.forEach(function(t){if(t<=256){var e=y+t;if(v._rangePromises.has(e))s.push(v._rangePromises.get(e));else{var r=w.getRange(y,t).then(function(){v._rangePromises.delete(e)}).catch(function(){throw v._rangePromises.delete(e),Error("Unable to query resource")});v._rangePromises.set(e,r),s.push(r)}}}),h.all(s).then(function(t){var e,r=v._glyphIndex[y];if(r||(r={},v._glyphIndex[y]=r),P("stable-symbol-rendering")){x.clear();for(var i=0,s=f;i<s.length;i++){var h=s[i];x.add(h)}var a=[];b.forEach(function(t){a.push(t)}),a.sort(),e=[];for(var n=0,o=a;n<o.length;n++)for(var l=o[n],g=0;g<256;++g)e.push(256*l+g)}else e=f;for(var c=0,p=e;c<p.length;c++){var u=r[h=p[c]];if(u)P("stable-symbol-rendering")&&!x.has(h)||(m[h]={sdf:!0,rect:u.rect,metrics:u.metrics,page:u.page});else{var d=w.getGlyph(y,h);if(d&&d.metrics){var _=v._recordGlyph(d,h);r[h]={rect:_,metrics:d.metrics,tileIDs:null,page:v._currentPage},P("stable-symbol-rendering")&&!x.has(h)||(m[h]={sdf:!0,rect:_,metrics:d.metrics,page:v._currentPage}),v._dirties[v._currentPage]=!0}}}return m})},t.prototype._recordGlyph=function(t,e){var r,i=t.metrics;if(0===i.width)r=new d(0,0,0,0);else{var s=i.width+6,h=i.height+6,a=s%4?4-s%4:4,n=h%4?4-h%4:4;1===a&&(a=5),1===n&&(n=5),(r=this._binPack.allocate(s+a,h+n)).isEmpty&&(this._dirties[this._currentPage]||(this._glyphData[this._currentPage]=null),this._currentPage=this._glyphData.length,this._glyphData.push(new Uint8Array(this.width*this.height)),this._dirties.push(!0),this._textures.push(void 0),this._binPack=new _(this.width-4,this.height-4),r=this._binPack.allocate(s+a,h+n));var o=this._glyphData[this._currentPage],l=t.bitmap,g=void 0,c=void 0;if(l)for(var p=0;p<h;p++){g=s*p,c=this.width*(r.y+p+1)+r.x;for(var u=0;u<s;u++)o[c+u+1]=l[g+u]}}return r},t.prototype._addDecorationGlyph=function(){for(var t=[117,149,181,207,207,181,149,117],e=[],r=0;r<t.length;r++)for(var i=t[r],s=0;s<11;s++)e.push(i);var h={metrics:{width:5,height:2,left:0,top:0,advance:0},bitmap:new Uint8Array(e)};this._recordGlyph(h,0)},t.prototype.bind=function(t,e,r,i){this._textures[r]||(this._textures[r]=new a(t,{pixelFormat:6406,dataType:5121,width:this.width,height:this.height},new Uint8Array(this.width*this.height)));var s=this._textures[r];s.setSamplingMode(e),this._dirties[r]&&s.setData(this._glyphData[r]),t.bindTexture(s,i),this._dirties[r]=!1},t.prototype.dispose=function(){this._binPack=null;for(var t=0,e=this._textures;t<e.length;t++){var r=e[t];r&&r.dispose()}this._textures.length=0,this._glyphData.length=0},t}()});