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

define(["require","exports","../../definitions","./parameters","../../shaders/HighlightPrograms","../../../../../webgl/BufferObject","../../../../../webgl/programUtils","../../../../../webgl/VertexArrayObject"],function(r,e,u,_,h,a,d,g){Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function r(){this._width=void 0,this._height=void 0,this._resources=null}return r.prototype.dispose=function(){this._resources&&(this._resources.quadGeometry.dispose(),this._resources.quadVAO.dispose(),this._resources.highlightProgram.dispose(),this._resources.blurProgram.dispose(),this._resources=null)},r.prototype.preBlur=function(r,e){r.bindTexture(e,u.TEXTURE_BINDING_HIGHLIGHT_0),r.bindProgram(this._resources.blurProgram),this._resources.blurProgram.setUniform4fv("u_direction",[1,0,1/this._width,0]),this._resources.blurProgram.setUniformMatrix4fv("u_channelSelector",_.ALPHA_TO_RGBA_CHANNEL_SELECTOR_MATRIX),r.bindVAO(this._resources.quadVAO),r.drawArrays(5,0,4),r.bindVAO()},r.prototype.finalBlur=function(r,e){r.bindTexture(e,u.TEXTURE_BINDING_HIGHLIGHT_0),r.bindProgram(this._resources.blurProgram),this._resources.blurProgram.setUniform4fv("u_direction",[0,1,0,1/this._height]),this._resources.blurProgram.setUniformMatrix4fv("u_channelSelector",_.RGBA_TO_RGBA_CHANNEL_SELECTOR_MATRIX),r.bindVAO(this._resources.quadVAO),r.drawArrays(5,0,4),r.bindVAO()},r.prototype.renderHighlight=function(r,e,i){r.bindTexture(e,u.TEXTURE_BINDING_HIGHLIGHT_0),r.bindProgram(this._resources.highlightProgram),i.applyHighlightOptions(r,this._resources.highlightProgram),r.bindVAO(this._resources.quadVAO),r.setBlendingEnabled(!0),r.setBlendFunction(1,771),r.drawArrays(5,0,4),r.bindVAO()},r.prototype._initialize=function(r,e,i){this._width=e,this._height=i;var t=new a(r,34962,35044,new Int8Array([-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,1,1,1]).buffer),s=new g(r,{a_position:0,a_texcoord:1},{geometry:[{name:"a_position",count:2,type:5120,offset:0,stride:4,normalized:!1},{name:"a_texcoord",count:2,type:5121,offset:2,stride:4,normalized:!1}]},{geometry:t}),o=d.createProgram(r,h.highlight),n=d.createProgram(r,h.blur);o.setUniform1i("u_texture",u.TEXTURE_BINDING_HIGHLIGHT_0),o.setUniform1i("u_shade",u.TEXTURE_BINDING_HIGHLIGHT_1),o.setUniform4fv("u_sigmas",_.SIGMAS),n.setUniform1i("u_texture",u.TEXTURE_BINDING_HIGHLIGHT_0),n.setUniform4fv("u_sigmas",_.SIGMAS),this._resources={quadGeometry:t,quadVAO:s,highlightProgram:o,blurProgram:n}},r.prototype.setup=function(r,e,i){this._resources?(this._width=e,this._height=i):this._initialize(r,e,i)},r}();e.default=i});