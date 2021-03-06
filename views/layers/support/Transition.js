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

define(["require","exports","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/declareExtendsHelper","../../../core/Accessor","../../../core/accessorSupport/decorators","../../../core/libs/gl-matrix-2/mat4"],function(t,r,e,o,i,s,n){return function(t){function r(){var r=null!==t&&t.apply(this,arguments)||this;return r.from=null,r.to=null,r.duration=4e3,r.repeat=!0,r.done=!1,r}o(r,t),i=r,r.prototype.getColorMatrix=function(){if(this.done=!1,null==this._lastTime)this._currentStep=0,this._lastTime=Date.now();else{var t=this._lastTime,r=Date.now(),e=r-t;this._currentStep=this._currentStep+e,this._currentStep>=2147483647&&(this._currentStep=0),this._lastTime=r}var o=this._currentStep%this.duration/(this.duration/2),i=o<=1?o:2-o,s=this.from.getColorMatrix(),p=this.to.getColorMatrix();return n.mat4.multiplyScalar(s,s,1-i),n.mat4.multiplyScalar(p,p,i),!this.repeat&&this._currentStep>=this.duration&&(this.done=!0),n.mat4.add(s,s,p)},r.prototype.clone=function(){var t=new i({from:this.from.clone(),to:this.to.clone(),duration:this.duration});return t._lastTime=this._lastTime,t._currentStep=this._currentStep,t};var i;return e([s.property()],r.prototype,"from",void 0),e([s.property()],r.prototype,"to",void 0),e([s.property({type:Number})],r.prototype,"duration",void 0),e([s.property({type:Boolean})],r.prototype,"repeat",void 0),r=i=e([s.subclass("esri.views.layers.support.Transition")],r)}(s.declared(i))});