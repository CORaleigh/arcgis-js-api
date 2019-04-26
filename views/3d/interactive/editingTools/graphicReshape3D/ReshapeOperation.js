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

define(["require","exports","../../../../../core/tsSupport/decorateHelper","../../../../../core/tsSupport/declareExtendsHelper","../../../../../core/Accessor","../../../../../core/Evented","../../../../../core/Handles","../../../../../core/accessorSupport/decorators","../../../../../layers/graphics/dehydratedFeatures","./ReshapeMoveManipulator","./reshapeUtils","../../../webgl-engine/lib/Geometry","../../../webgl-engine/lib/GeometryUtil","../../../../interactive/Manipulator3D","../../../../interactive/manipulatorUtils"],function(e,t,a,r,n,i,o,l,p,s,u,h,c,m,d){Object.defineProperty(t,"__esModule",{value:!0});var v=function(){function e(e,t){void 0===e&&(e=!1),void 0===t&&(t=!1),this.isDragging=e,this.fromTranslation=t,this.graphic=null,this.type="reshape-start"}return e}();t.ReshapeStartEvent=v;var _=function(){function e(e){this.coords=e,this.graphic=null,this.type="vertex-move"}return e}();t.VertexMoveEvent=_;var g=function(){function e(e,t){this.dxScreen=e,this.dyScreen=t,this.graphic=null,this.type="translate"}return e}();t.TranslateEvent=g;var f=function(){function e(e){this.coords=e,this.graphic=null,this.type="vertex-add"}return e}();t.VertexAddEvent=f;var M=function(){function e(e){this.coords=e,this.graphic=null,this.type="vertex-remove"}return e}();t.VertexRemoveEvent=M;var y=function(){function e(e,t){void 0===e&&(e=!1),void 0===t&&(t=!1),this.isDragging=e,this.fromTranslation=t,this.graphic=null,this.type="reshape-stop"}return e}();t.ReshapeStopEvent=y;var w=function(e){function t(t){var a=e.call(this,t)||this;return a._vertexManipulatorMaterial=d.createManipulatorMaterial([1,.5,0],1),a._edgeManipulatorMaterial=d.createManipulatorMaterial([.5,.5,.5],1),a._selectedManipulatorMaterial=d.createManipulatorMaterial([1,1,1],1),a._manipulatorGeometry=new h(c.createSphereGeometry(1,16,16),"reshape-manipulator"),a._handles=new o,a._manipulators=[],a._reshapeHelper=null,a._moveManipulator=null,a._numDragging=0,a}return r(t,e),t.prototype.destroy=function(){this._clear(null)},Object.defineProperty(t.prototype,"inputGeometry",{get:function(){return this._reshapeHelper?this._reshapeHelper.geometry:null},set:function(e){this._recreateManipulators(this.toolViewManager,e)},enumerable:!0,configurable:!0}),t.prototype.removeSelectedVertices=function(){var e=this._manipulators.filter(function(e){return e.manipulator.selected&&"vertex"===e.handle.type});this._removeVertices(e)},t.prototype._clear=function(e){this._handles.removeAll(),e&&(this._manipulators.forEach(function(t){e.removeManipulator(t.manipulator)}),e.removeManipulator(this._moveManipulator)),this._manipulators=[],this._moveManipulator=null,this._reshapeHelper=null,this._numDragging=0},t.prototype._recreateManipulators=function(e,t){var a=this;if(this._clear(this.toolViewManager),this._reshapeHelper=u.createReshapeHelper(t,"global"===this.view.viewingMode),!this._reshapeHelper)return null;this._reshapeHelper.components.forEach(function(e){e.vertices.forEach(function(e){return a._createManipulator(e)}),e.edges.forEach(function(e){return a._createManipulator(e)})}),this._moveManipulator=new s.ReshapeMoveManipulator({view:this.view,reshapeHelper:this._reshapeHelper,selectable:!1}),this._handles.add(this._moveManipulator.watch("grabbing",function(e){a._manipulators.forEach(function(t){t.manipulator.interactive=!e})},!0),this._moveManipulator),this._handles.add(this._moveManipulator.watch("dragging",function(e){!0===e?1===++a._numDragging&&a.emit("reshape-operation-start",new v(!0,!0)):0===--a._numDragging&&a.emit("reshape-operation-stop",new y(!0,!0))},!0),this._moveManipulator),this._handles.add(this._moveManipulator.watch("hovering",function(e){a.cursor=e?"move":null},!0),this._moveManipulator),this._moveManipulator.on("drag",function(e){return a._moveManipulatorDragCallback(e)}),this._moveManipulator.on("click",function(){return a.emit("click")}),this.toolViewManager.addManipulator(this._moveManipulator)},t.prototype._clearManipulatorSelection=function(){this._manipulators.forEach(function(e){return e.manipulator.selected=!1})},t.prototype._createManipulator=function(e){var t=this,a=new m.Manipulator3D({view:this.view,renderObjects:[{geometry:this._manipulatorGeometry,material:this._vertexManipulatorMaterial,stateMask:4|x.Vertex},{geometry:this._manipulatorGeometry,material:this._edgeManipulatorMaterial,stateMask:4|x.Edge},{geometry:this._manipulatorGeometry,material:this._selectedManipulatorMaterial,stateMask:8}],radius:5});a.alignment="on-the-ground",a.allowOverlap=!0,"vertex"===e.type?(a.state=x.Vertex,a.selectable=!0):(a.state=x.Edge,a.selectable=!1);var r={manipulator:a,handle:e};return this._manipulators.push(r),this.toolViewManager.addManipulator(a),this._setManipulatorPosition(r),this._handles.add(a.watch("grabbing",function(e){t._moveManipulator.interactive=!e},!0),a),this._handles.add(a.watch("dragging",function(e){!0===e?1===++t._numDragging&&t.emit("reshape-operation-start",new v(!0)):0===--t._numDragging&&t.emit("reshape-operation-stop",new y(!0))},!0),a),this._handles.add(a.watch("hovering",function(e){t.cursor=e?"vertex"===r.handle.type?"move":"copy":null},!0),a),a.on("drag",function(){return t._manipulatorMoveCallback(r)}),a.on("click",function(e){return t._manipulatorClickCallback(e,r)}),a},t.prototype._removeManipulator=function(e){e&&(this._handles.remove(e.manipulator),this._manipulators.splice(this._manipulators.indexOf(e),1),this.toolViewManager.removeManipulator(e.manipulator))},t.prototype._getManipulatorInfoFromHandle=function(e){if(e)for(var t=0,a=this._manipulators;t<a.length;t++){var r=a[t];if(e===r.handle)return r}return null},t.prototype._setManipulatorPosition=function(e){e&&("vertex"===e.handle.type?e.manipulator.mapPoint=this._reshapeHelper.getVertexPositionAsPoint(e.handle,b):"edge"===e.handle.type&&(e.manipulator.mapPoint=this._reshapeHelper.getEdgePositionAsPoint(e.handle,.5,b)))},t.prototype._splitEdgeManipulator=function(e){if("edge"===e.handle.type){var t=this._reshapeHelper.splitEdge(e.handle,.5);return e.handle=t,e.manipulator.state=x.Vertex,e.manipulator.selectable=!0,t.left&&this.toolViewManager&&this._createManipulator(t.left),t.right&&this.toolViewManager&&this._createManipulator(t.right),t}return null},t.prototype._manipulatorMoveCallback=function(e){var t=this;if("edge"===e.handle.type&&this._splitEdgeManipulator(e),e.handle&&"vertex"===e.handle.type){!1===e.manipulator.selected&&(this._clearManipulatorSelection(),e.manipulator.selected=!0);var a=e.handle.pos,r=e.manipulator.mapPoint.x-a[0],n=e.manipulator.mapPoint.y-a[1],i=this._manipulators.filter(function(e){return e.manipulator.selected&&"vertex"===e.handle.type});i.forEach(function(a){var i=a.handle;i.pos[0]+=r,i.pos[1]+=n,e!==a&&(b.x=i.pos[0],b.y=i.pos[1],b.spatialReference=t._reshapeHelper.geometry.spatialReference,a.manipulator.mapPoint=b)}),this.outputGeometry=this._reshapeHelper.commit(),i.forEach(function(e){var a=e.handle;t._setManipulatorPosition(t._getManipulatorInfoFromHandle(a.left)),t._setManipulatorPosition(t._getManipulatorInfoFromHandle(a.right))});var o=i.map(function(e){return e.handle.unnormalizedPos}),l=new _(o);this.emit("vertex-move",l)}},t.prototype._removeVertices=function(e){var t=this,a=[];if(e.forEach(function(e){if("vertex"===e.handle.type&&t._reshapeHelper.canRemoveVertex(e.handle)){0===a.length&&t.emit("reshape-operation-start",new v),a.push(e.handle.unnormalizedPos),t._removeManipulator(e),t._removeManipulator(t._getManipulatorInfoFromHandle(e.handle.left)),t._removeManipulator(t._getManipulatorInfoFromHandle(e.handle.right));var r=t._reshapeHelper.removeVertex(e.handle);r&&t._createManipulator(r)}}),a.length>0){this.outputGeometry=this._reshapeHelper.commit();var r=new M(a);this.emit("vertex-remove",r),this.emit("reshape-operation-stop",new y)}},t.prototype._manipulatorClickCallback=function(e,t){if("vertex"===t.handle.type&&2===e.button&&this._removeVertices([t]),"edge"===t.handle.type&&0===e.button){this.emit("reshape-operation-start",new v);var a=this._splitEdgeManipulator(t);this.outputGeometry=this._reshapeHelper.commit();var r=new f([a.unnormalizedPos]);this.emit("vertex-add",r),this.emit("reshape-operation-stop",new y)}},t.prototype._moveManipulatorDragCallback=function(e){var t=this,a=[],r=!0;if(this._manipulators.forEach(function(n){"vertex"===n.handle.type&&(n.manipulator.grabbing?r=!1:"vertex"===n.handle.type&&(n.handle.pos[0]+=e.dxGeometry,n.handle.pos[1]+=e.dyGeometry,a.push(n.handle.pos),t._setManipulatorPosition(n)))}),this._manipulators.forEach(function(e){"vertex"!==e.handle.type&&t._setManipulatorPosition(e)}),this.outputGeometry=this._reshapeHelper.commit(),r)this.emit("translate",new g(e.dxScreen,e.dyScreen));else{var n=new _(a);this.emit("vertex-move",n)}},a([l.property({value:null})],t.prototype,"toolViewManager",void 0),a([l.property({value:null,nonNullable:!0})],t.prototype,"view",void 0),a([l.property({value:null})],t.prototype,"inputGeometry",null),a([l.property({value:null})],t.prototype,"cursor",void 0),a([l.property({value:null})],t.prototype,"outputGeometry",void 0),t=a([l.subclass("esri.views.3d.interactive.editingTools.graphicReshape3D.ReshapeOperation")],t)}(l.declared(n,i));t.ReshapeOperation=w;var x,b=p.makeDehydratedPoint(0,0,null,null);!function(e){e.Vertex=16,e.Edge=32}(x||(x={}))});