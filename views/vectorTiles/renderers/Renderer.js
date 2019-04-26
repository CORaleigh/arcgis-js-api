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

define(["require","exports","../../../core/libs/gl-matrix-2/mat4","../../../core/libs/gl-matrix-2/mat4f32","../../../core/libs/gl-matrix-2/vec3f32","../../../core/libs/gl-matrix-2/vec4f32","../../2d/engine/webgl/BitBlitRenderer","../GeometryUtils","./BackgroundRenderer","./CircleRenderer","./FadeRecorder","./FillRenderer","./LineRenderer","./SymbolRenderer","./TileInfoRenderer","./shaders/ProgramCache","../../webgl/FramebufferObject"],function(e,t,r,i,a,s,o,n,l,d,h,c,_,u,p,f,b){return function(){function e(){this._extrudeMatrix=i.mat4f32.create(),this._extrudeNoRotationMatrix=i.mat4f32.create(),this._extrudeRotateVector=a.vec3f32.fromValues(0,0,1),this._extrudeScaleVector=a.vec3f32.fromValues(1,1,1),this._backgroundColor=s.vec4f32.fromValues(1,0,0,1),this._state={rotation:0,size:[0,0]},this._cachedWidth=0,this._cachedHeight=0,this._cachedRotation=0,this._blitRenderer=new o,this._globalOpacityFBO=null,this._boundFBO=null,this._programCache=null}return e.prototype.initialize=function(e,t,r){void 0===r&&(r=!0),this._SpriteMosaic=e,this._glyphMosaic=t,this._ignoreSpeed=!r,this._fadeRecorder=new h.FadeRecorder(300)},e.prototype.dispose=function(){this._backgroundRenderer&&(this._backgroundRenderer.dispose(),this._backgroundRenderer=null),this._lineRenderer&&(this._lineRenderer.dispose(),this._lineRenderer=null),this._fillRenderer&&(this._fillRenderer.dispose(),this._fillRenderer=null),this._symbolRenderer&&(this._symbolRenderer.dispose(),this._symbolRenderer=null),this._circleRenderer&&(this._circleRenderer.dispose(),this._circleRenderer=null),this._tileInfoRenderer&&(this._tileInfoRenderer.dispose(),this._tileInfoRenderer=null),this._hittestFBO&&(this._hittestFBO.dispose(),this._hittestFBO=null),this._globalOpacityFBO&&(this._globalOpacityFBO.dispose(),this._globalOpacityFBO=null),this._blitRenderer&&(this._blitRenderer.dispose(),this._blitRenderer=null),this._boundFBO=null,this._programCache&&(this._programCache.dispose(),this._programCache=null),this._cachedWidth=0,this._cachedHeight=0,this._cachedRotation=0},e.prototype.initializeProgramCache=function(e){if(null===this._programCache){var t=new f.default;t.initialize(e),this._backgroundRenderer=new l(t),this._lineRenderer=new _(t),this._fillRenderer=new c(t),this._symbolRenderer=new u(t),this._circleRenderer=new d(t),this._tileInfoRenderer=new p(t),this._programCache=t}},e.prototype.setStateParams=function(e,t,i){this._fadeRecorder.recordLevel(i),this._state=e,this._state.size[0]===this._cachedWidth&&this._state.size[1]===this._cachedHeight&&this._state.rotation===this._cachedRotation||(this._extrudeScaleVector[0]=2/e.size[0],this._extrudeScaleVector[1]=-2/e.size[1],r.mat4.identity(this._extrudeMatrix),r.mat4.rotate(this._extrudeMatrix,this._extrudeMatrix,-e.rotation*n.C_DEG_TO_RAD,this._extrudeRotateVector),r.mat4.scale(this._extrudeMatrix,this._extrudeMatrix,this._extrudeScaleVector),r.mat4.transpose(this._extrudeMatrix,this._extrudeMatrix),r.mat4.identity(this._extrudeNoRotationMatrix),r.mat4.scale(this._extrudeNoRotationMatrix,this._extrudeNoRotationMatrix,this._extrudeScaleVector),r.mat4.transpose(this._extrudeNoRotationMatrix,this._extrudeNoRotationMatrix),this._cachedWidth=this._state.size[0],this._cachedHeight=this._state.size[1],this._cachedRotation=this._state.rotation)},e.prototype.drawClippingMasks=function(e,t){if(0!==t.length){e.setDepthWriteEnabled(!1),e.setDepthTestEnabled(!1),e.setStencilTestEnabled(!0),e.setBlendingEnabled(!1),e.setColorMask(!1,!1,!1,!1),e.setStencilOp(7680,7680,7681),e.setStencilWriteMask(255),e.setClearStencil(0);var r=e.gl;e.clear(r.STENCIL_BUFFER_BIT);for(var i=0,a=t;i<a.length;i++){var s=a[i];s.attached&&s.visible&&(e.setStencilFunctionSeparate(1032,519,s.stencilData.reference,s.stencilData.mask),this._backgroundRenderer.renderSolidColor(e,{u_matrix:s.tileTransform.transform,u_normalized_origin:s.tileTransform.displayCoord,u_coord_range:s.coordRange,u_depth:0,u_color:this._backgroundColor}))}e.setColorMask(!0,!0,!0,!0),e.setBlendingEnabled(!0)}},e.prototype.renderDebug=function(e,t){var r=t.key;this._backgroundColor.set([r.col%2,r.row%2,r.col%2==0&&r.row%2==0?1:0,.5]),this._backgroundRenderer.renderSolidColor(e,{u_matrix:t.tileTransform.transform,u_normalized_origin:t.tileTransform.displayCoord,u_coord_range:t.coordRange,u_depth:0,u_color:this._backgroundColor})},e.prototype.renderBucket=function(e,t,r,i,a,s,o,n){if(o&&!(void 0!==o.minzoom&&o.minzoom>r+1e-6||s.key.level===i&&void 0!==o.maxzoom&&o.maxzoom<=r-1e-6))switch(t.type){case 0:2!==a&&this._renderBackground(e,t,r,a,s,o,n);break;case 1:2!==a&&this._renderFill(e,t,r,a,s,o,n);break;case 2:1!==a&&3!==a||this._renderLine(e,t,r,a,s,o,n);break;case 3:2!==a&&3!==a||this._renderSymbol(e,t,r,a,i,s,o,n);break;case 4:2!==a&&3!==a||this._renderCircle(e,t,r,a,i,s,o,n)}},e.prototype.renderTileInfo=function(e,t){this._tileInfoRenderer.render(e,t)},e.prototype.setGlobalOpacity=function(e,t,r){if(1!==r){this._boundFBO=e.getBoundFramebufferObject();var i=t.pixelRatio,a=t.state.size,s=a[0],o=a[1],n=Math.round(s*i),l=Math.round(o*i);null!==this._globalOpacityFBO&&this._globalOpacityFBO.width===n&&this._globalOpacityFBO.height===l||(null!==this._globalOpacityFBO&&this._globalOpacityFBO.dispose(),this._globalOpacityFBO=b.create(e,{colorTarget:0,depthStencilTarget:3,width:n,height:l})),e.bindFramebuffer(this._globalOpacityFBO),e.setClearColor(0,0,0,0),e.clear(e.gl.COLOR_BUFFER_BIT)}},e.prototype.applyGlobalOpacity=function(e,t,r){if(1!==r){var i=t.pixelRatio,a=t.state.size,s=a[0],o=a[1],n=e.getViewport();e.setViewport(0,0,i*s,i*o),e.bindFramebuffer(this._boundFBO);var l=this._globalOpacityFBO.colorTexture;this._blitRenderer.render(e,l,9728,r),e.setViewport(n.x,n.y,n.width,n.height),this._boundFBO=null}},e.prototype.needsRedraw=function(){return this._fadeRecorder.needsRedraw()},e.prototype.hitTest=function(e,t,r,i,a,s,o){var n=[0,0],l=[0,0],d=e.state;d.toMap(n,[0,0]),d.toMap(l,[s,s]);var h=i.filter(function(e){return!(n[0]>e.bounds[2]||l[0]<e.bounds[0]||n[1]<e.bounds[3]||l[1]>e.bounds[1])});if(0===h.length)return[];h.sort(function(e,t){return e.key.level-t.key.level});for(var c=h.length,_=1;_<=c;_++){var u=h[_-1];u.attached&&(u.stencilData.reference=_,u.stencilData.mask=255)}o(d,a,h);var p=e.context;this._hittestFBO||(this._hittestFBO=b.create(p,{colorTarget:0,depthStencilTarget:3,width:s,height:s}));var f=p.getViewport(),g=p.getBoundFramebufferObject();p.bindFramebuffer(this._hittestFBO),p.setViewport(0,0,s,s);var R=p.gl;p.setDepthWriteEnabled(!0),p.setStencilWriteMask(255),p.setClearColor(1,1,1,1),p.setClearDepth(1),p.setClearStencil(0),p.clear(R.COLOR_BUFFER_BIT|R.DEPTH_BUFFER_BIT|R.STENCIL_BUFFER_BIT),p.setDepthWriteEnabled(!1),this.drawClippingMasks(p,h),p.setBlendingEnabled(!1),p.setStencilWriteMask(0),p.setStencilOp(7680,7680,7681),p.setDepthFunction(515),p.setDepthTestEnabled(!0),p.setDepthWriteEnabled(!0),p.setStencilTestEnabled(!0);for(var x=0;x<c;x++){var u=h[x];u.attached&&u.doRender(e)}p.setStencilTestEnabled(!1),p.setDepthTestEnabled(!1),this._readbackBuffer||(this._readbackBuffer=new Uint8Array(4*s*s),this._readbackBuffer32=new Uint32Array(this._readbackBuffer.buffer)),this._hittestFBO.readPixels(0,0,s,s,6408,5121,this._readbackBuffer);var m=new Set,y=s*s,B=Math.round(y/2),F=this._readbackBuffer32[B];4294967295!==F&&m.add(F);for(var _=0;_<y;_++)4294967295!==(F=this._readbackBuffer32[_])&&m.add(F);p.bindFramebuffer(g),p.setViewport(f.x,f.y,f.width,f.height);var O=[];return m.forEach(function(e){O.push(e)}),O},e.prototype._renderBackground=function(e,t,r,i,a,s,o){this._backgroundRenderer.render(e,t,r,i,a,s,this._SpriteMosaic,this._SpriteMosaic.pixelRatio,o)},e.prototype._renderLine=function(e,t,r,i,a,s,o){this._lineRenderer.render(e,t,r,i,this._state,a,s,this._SpriteMosaic,this._extrudeMatrix,this._SpriteMosaic.pixelRatio,o)},e.prototype._renderFill=function(e,t,r,i,a,s,o){this._fillRenderer.render(e,t,r,this._state.rotation,i,a,s,this._SpriteMosaic,this._extrudeMatrix,this._SpriteMosaic.pixelRatio,o)},e.prototype._renderCircle=function(e,t,r,i,a,s,o,n){var l=!0;a===s.key.level&&(l=!1),e.setStencilTestEnabled(l),this._circleRenderer.render(e,t,r,i,this._state.rotation,s,o,this._extrudeMatrix,n)},e.prototype._renderSymbol=function(e,t,r,i,a,s,o,n){var l=!0;a===s.key.level&&(l=!1),e.setStencilTestEnabled(l),this._symbolRenderer.render(e,t,r,i,this._state.rotation,this._fadeRecorder.getFadeValues(this._ignoreSpeed),s,o,this._SpriteMosaic,this._glyphMosaic,this._extrudeMatrix,this._extrudeNoRotationMatrix,this._SpriteMosaic.pixelRatio,n)},e}()});