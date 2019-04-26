/**
 * Sketch widget provides a simple UI for creating and updating graphics on a {@link module:esri/views/MapView} or
 * a {@link module:esri/views/SceneView}. This significantly minimizes the code required for working with graphics in the view.
 * It is intended to be used with {@link module:esri/Graphic graphics} stored in its [layer](#layer) property.
 *
 * By default, the Sketch widget provides out-of-the-box tools for creating and updating graphics with {@link module:esri/geometry/Point point},
 * {@link module:esri/geometry/Polyline polyline}, {@link module:esri/geometry/Polygon polygon}, {@link module:esri/geometry/Polygon rectangle}
 * and {@link module:esri/geometry/Polygon circle} geometries.
 *
 * [![sketch-geometries](../../assets/img/apiref/widgets/sketch/sketch-widget.gif)](../sample-code/sketch-geometries/index.html)
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * * Graphics with polyline or polygon geometries can not be rotated or scaled in a {@link module:esri/views/SceneView}.
 * * Graphics with geometries where {@link module:esri/geometry/Geometry#hasZ hasZ} is `true` will be ignored by [update()](#update)
 *   in a {@link module:esri/views/SceneView}.
 * * Multipoint geometry can only be created in a {@link module:esri/views/MapView}.
 * :::
 *
 * >>> esri-read-more
 * <a name="create-graphics"></a>
 * Pointer and keyboard gestures for creating graphics with different geometries are described in the tables below.
 *
 * #### Creating point graphics
 *
 * Gesture | Action |
 * ---------|---------|
 * Left-click | Adds a point graphic at the pointer location. |
 * C | Adds a point graphic at the pointer location. |
 *
 * #### Creating polyline and polygon graphics
 *
 * Gesture | Action |
 * ---------|---------|
 * Left-click | Adds a vertex at the pointer location.|
 * Left-drag | Adds a vertex for each pointer move. |
 * F | Adds a vertex to the polyline or polygon graphic. |
 * C | Completes the polyline or polygon graphic sketch. |
 * Z | Incrementally undo actions recorded in the stack. |
 * R | Incrementally redo actions recorded in the stack. |
 * Spacebar+Left-drag | Pan the view while creating a polyline or polygon graphic.
 * Left-click on the first vertex | Completes the polygon graphic sketch. |
 *
 * #### Creating polygon graphics with predefined shapes
 *
 * The following keyboard shortcuts apply when creating polygon graphics with predefined shapes.
 *
 * Gesture | Action |
 * ------- | ------ |
 * Left-click+Drag | Creates a `rectangle` graphic with dimensions based on the bounding box between initial click and cursor location. Creates a `circle` graphic with radius based on the distance between initial click and cursor location. |
 * Ctrl+Left-click+Drag | Changes the shape from a `rectangle` to a `square` or from a `circle` to an `ellipse`. |
 * Alt+Left-click+Drag | Creates a `rectangle` graphic with a center at initial click, and dimensions based on the distance between the initial click to the cursor location. Creates a `circle` graphic with a radius based on the bounding box between the initial click and the cursor location.
 * Ctrl+Alt+Left-click+Drag | Combines the behavior described above. |
 *
 * <a name="update-graphics"></a>
 * #### Updating graphics
 *
 * The Sketch widget provides users with the ability to move, rotate, scale or reshape graphics during an update operation.
 * To begin updating, `Left-click` on a graphic. Use `Shift+Left-click` to add more graphics to the selection, for bulk updating.
 * Once graphics are selected, the following actions can be performed.
 *
 * Gesture | Action | Example |
 * ---------|---------|----------|
 * Left-click on a graphic | Select a graphic to move, rotate or scale. | <img alt="Select a graphic" src="../../assets/img/apiref/widgets/sketch/sketch-box-mode.gif" width="400px"> |
 * Shift+Left-click graphics | Select multiple graphics to move, rotate or scale.| <img alt="Select graphics" src="../../assets/img/apiref/widgets/sketch/sketch-graphics.gif" width="400px"> |
 * Drag graphic | Move the selected graphic.| <img alt="Drag the graphic" src="../../assets/img/apiref/widgets/sketch/sketch-box-move.gif" width="400px"> |
 * Drag rotate handle | Rotate the selected graphic.| <img alt="Rotate the graphic" src="../../assets/img/apiref/widgets/sketch/sketch-rotate.gif" width="400px"> |
 * Drag scale handle | Scale the selected graphic.| <img alt="Scale the graphic" src="../../assets/img/apiref/widgets/sketch/sketch-scale.gif" width="400px"> |
 * Z | Incrementally undo actions recorded in the stack. | <img alt="Undo update" src="../../assets/img/apiref/widgets/sketch/sketch-update-undo.gif" width="400px"> |
 * R | Incrementally redo actions recorded in the stack. | <img alt="Redo update" src="../../assets/img/apiref/widgets/sketch/sketch-update-redo.gif" width="400px"> |
 * Left-click on view (not the graphic) | Complete the graphic update. | <img alt="Sketch update complete" src="../../assets/img/apiref/widgets/sketch/sketch-update-complete.gif" width="400px"> |
 *
 * The following update operations can be performed on a single polyline or polygon graphic:
 *
 * Gesture | Action | Example |
 * ---------|---------|----------|
 * Left-click on a graphic | Select a graphic to move or reshape.| <img alt="Select a graphic" src="../../assets/img/apiref/widgets/sketch/sketch-reshape-mode.gif" width="400px"> |
 * Drag graphic | Move the selected graphic.| <img alt="Drag the graphic" src="../../assets/img/apiref/widgets/sketch/sketch-drag.gif" width="400px"> |
 * Left-click on a ghost vertex| Add a new vertex. | <img alt="Add a vertex" src="../../assets/img/apiref/widgets/sketch/sketch-add-vertices.gif" width="400px"> |
 * Left-click on a vertex| Select a vertex. | <img alt="Select a vertex" src="../../assets/img/apiref/widgets/sketch/sketch-selectvertex.gif" width="400px"> |
 * Ctrl+Left-click on vertices | Select or unselect multiple vertices. | <img alt="Select vertices" src="../../assets/img/apiref/widgets/sketch/sketch-selectvertices.gif" width="400px"> |
 * Drag vertex | Move the selected vertex or vertices. | <img alt="Drag vertices" src="../../assets/img/apiref/widgets/sketch/sketch-dragvertices.gif" width="400px"> |
 * Right-click on a vertex | Delete a vertex. | <img alt="Delete a vertex" src="../../assets/img/apiref/widgets/sketch/sketch-delete-vertex.gif" width="400px"> |
 * Select multiple vertices and press `Backspace` or `Delete` button | Delete multiple vertices. | <img alt="Delete vertices" src="../../assets/img/apiref/widgets/sketch/sketch-delete-vertices.gif" width="400px"> |
 *
 * The following update operations can be performed on a single graphic with point geometry in a {@link module:esri/views/SceneView}, if the graphic uses a {@link module:esri/symbols/ObjectSymbol3DLayer 3D object symbol layer}:
 *
 * Gesture | Action | Example |
 * ---------|---------|----------|
 * Left-click on a graphic | Select a graphic to move, rotate or scale. | <img alt="Select a graphic" src="../../assets/img/apiref/widgets/sketch/sketch-update-point-3D.gif" width="400px"> |
 * Drag inner handle | Move the selected graphic.| <img alt="Drag the graphic" src="../../assets/img/apiref/widgets/sketch/sketch-transform-move-point.gif" width="400px"> |
 * Drag outer handle sideways | Rotate the selected graphic.| <img alt="Rotate the graphic" src="../../assets/img/apiref/widgets/sketch/sketch-transform-rotate-point.gif" width="400px"> |
 * Drag outer handle inwards or outwards | Scale the selected graphic.| <img alt="Scale the graphic" src="../../assets/img/apiref/widgets/sketch/sketch-transform-scale-point.gif" width="400px"> |
 *
 * >>>
 *
 * @module module:esri/widgets/Sketch
 *
 * @since 4.10
 * @see [Sketch.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Sketch.tsx)
 * @see [Sketch.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Sketch.scss)
 * @see module:esri/widgets/Sketch/SketchViewModel
 * @see [Sample - Sketch temporary geometries](../sample-code/sketch-geometries/index.html)
 * @see [Sample - Sketch update validation](../sample-code/sketch-update-validation/index.html)
 * @see [Sample - Query statistics by geometry](../sample-code/featurelayerview-query-geometry/index.html)
 *
 * @example
 * // Create a new instance of sketch widget and set
 * // its required parameters
 * var sketch = new Sketch({
 *   layer: graphicsLayer,
 *   view: view
 * });
 *
 * // Listen to sketch widget's create event.
 * sketch.on("create", function(event) {
 *   // check if the create event's state has changed to complete indicating
 *   // the graphic create operation is completed.
 *   if (event.state === "complete") {
 *     // remove the graphic from the layer. Sketch adds
 *     // the completed graphic to the layer by default.
 *     polygonGraphicsLayer.remove(event.graphic);
 *
 *     // use the graphic.geometry to query features that intersect it
 *     selectFeatures(event.graphic.geometry);
 *   }
 * });
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/widgets/Sketch/nls/Sketch", "esri/widgets/../Graphic", "esri/core/Collection", "esri/core/lang", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/Sketch/SketchViewModel", "esri/geometry/geometryEngine", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18n, Graphic, Collection, lang_1, decorators_1, Widget, SketchViewModel, geometryEngine, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var CSS = {
        // sketch classes
        base: "esri-sketch",
        verticalLayout: "esri-sketch--vertical",
        panel: "esri-sketch__panel",
        infoPanel: "esri-sketch__info-panel",
        section: "esri-sketch__section",
        toolSection: "esri-sketch__tool-section",
        infoSection: "esri-sketch__info-section",
        infoCountSection: "esri-sketch__info-count-section",
        featureCountBadge: "esri-sketch__feature-count-badge",
        featureCountText: "esri-sketch__feature-count-text",
        featureCountNumber: "esri-sketch__feature-count-number",
        inputText: "esri-print__input-text",
        // button classes
        button: "esri-sketch__button",
        selectedButton: "esri-sketch__button--selected",
        // icon classes
        pointIcon: "esri-icon-map-pin",
        polygonIcon: "esri-icon-polygon",
        polylineIcon: "esri-icon-polyline",
        multipointIcon: "esri-icon-handle-vertical",
        circleIcon: "esri-icon-radio-unchecked",
        rectangleIcon: "esri-icon-checkbox-unchecked",
        panIcon: "esri-icon-pan",
        cursorIcon: "esri-icon-cursor",
        resetIcon: "esri-icon-trash",
        undoIcon: "esri-icon-undo",
        redoIcon: "esri-icon-redo",
        // common
        esriWidget: "esri-widget",
        widgetIcon: "esri-icon-edit",
        disabled: "esri-disabled",
        input: "esri-input",
        widgetButton: "esri-print__export-button",
        bufferButton: "esri-button"
    };
    var Sketch = /** @class */ (function (_super) {
        __extends(Sketch, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * Fires when a user deletes selected graphics by clicking the `Delete feature` button on the Sketch widget.
         *
         * @since 4.11
         * @event module:esri/widgets/Sketch#delete
         * @property {module:esri/Graphic[]} graphics - An array of deleted graphics.
         * @property {string} tool - Name of the tool that was active when graphics are deleted.
         *
         * **Possible Values:** | move | reshape | transform |
         *
         * @property {string} type - The type of the event. For this event, the type is always `delete`.
         */
        /**
         * Fires when a user starts sketching a graphic, is actively sketching a graphic and completes sketching a graphic.
         *
         * @event module:esri/widgets/Sketch#create
         * @property {module:esri/Graphic} graphic - The graphic that is being created.
         * @property {string} state - The current state of the event.
         *
         * **Possible Values:**
         *
         * Value | Description |
         * ----- | ----------- |
         * start | State changes to `start` when the first vertex is created. Not applicable when creating `points`.
         * active | State is `active` while graphic is being created. Not applicable when creating `points`.
         * complete | State changes to `complete` after the [complete()](#complete) method is called, when the user double clicks, presses the C key or clicks the first vertex of the `polygon` while creating a graphic. When `point` is created, the create event is fired with the `complete` state.
         * cancel | State changes to `cancel` if the [create()](#create) or [reset()](#reset) methods are called during the create operation and before the state changes to `complete`.
         *
         * @property {string} tool - Name of the create tool.
         *
         * **Possible Values:** point | polyline | polygon | rectangle | circle
         *
         * @property {module:esri/widgets/Sketch~CreateToolEventInfo} toolEventInfo - Returns additional information associated with
         * the create operation such as where the user is clicking the view or where the user is moving the cursor to.
         * Value of this parameter changes to `null` when the `create` event's `state` changes to `complete` or `cancel`.
         *
         * @property {string} type - The type of the event. For this event, the type is always `create`.
         *
         * @example
         * // Listen to sketch widget's create event.
         * sketch.on("create", function(event) {
         *   // check if the create event's state has changed to complete indicating
         *   // the graphic create operation is completed.
         *   if (event.state === "complete") {
         *     // remove the graphic from the layer. Sketch adds
         *     // the completed graphic to the layer by default.
         *     polygonGraphicsLayer.remove(event.graphic);
         *
         *     // use the graphic.geometry to query features that intersect it
         *     selectFeatures(event.graphic.geometry);
         *   }
         * });
         */
        /**
         * Fires when the user starts updating graphics, is actively updating graphics, and completes updating graphics.
         *
         * @event module:esri/widgets/Sketch#update
         * @property {module:esri/Graphic[]} graphics - An array of graphics that are being updated.
         * @property {string} state - The state of the event.
         *
         * **Possible Values:**
         *
         * Value | Description |
         * ----- | ----------- |
         * start | State changes to `start` when a graphic is selected to be updated.
         * active | State is `active` while graphics are being updated and `toolEventInfo` parameter is not `null`.
         * complete | State changes to `complete` after graphics are updated.
         * cancel | State changes to `cancel` when graphics are selected and then unselected without any updates, or when the [update](#update), [create](#create) or [reset](#reset) method is called before the `update` event's `state` changes to `complete`.
         *
         * @property {string} tool - Name of the update operation tool.
         *
         * **Possible Values:**  move | transform | reshape
         *
         * @property {string} type - The type of the event. For this event, the type is always `update`.
         * @property {module:esri/widgets/Sketch~UpdateToolEventInfo} toolEventInfo - Returns additional information associated
         * with the update operation that is taking place for the selected graphics and what stage it is at. Value of this parameter
         * changes to `null` when the `update` event's `state` changes to `complete`.
         *
         * @example
         * // Listen to sketch's update event to show relevant data in a chart
         * // as the graphics are being moved
         * sketch.on("update", onMove);
         *
         * // Point graphics at the center and edge of the buffer polygon are being moved.
         * // Recalculate the buffer with updated geometry and run the query stats using
         * // the updated buffer and update the chart.
         * function onMove(event) {
         *   // If the edge graphic is moving, keep the center graphic
         *   // at its initial location. Only move edge graphic to resize the buffer.
         *   if (event.toolEventInfo && event.toolEventInfo.mover.attributes.edge) {
         *     const toolType = event.toolEventInfo.type;
         *     if (toolType === "move-start") {
         *       centerGeometryAtStart = centerGraphic.geometry;
         *     }
         *     // keep the center graphic at its initial location when edge point is moving
         *     else if (toolType === "move" || toolType === "move-stop") {
         *       centerGraphic.geometry = centerGeometryAtStart;
         *     }
         *   }
         *
         *   // the center or edge graphic is being moved, recalculate the buffer
         *   const vertices = [
         *     [centerGraphic.geometry.x, centerGraphic.geometry.y],
         *     [edgeGraphic.geometry.x, edgeGraphic.geometry.y]
         *   ];
         *
         *   // client-side stats query of features that intersect the buffer
         *   calculateBuffer(vertices);
         *
         *   // user is clicking on the view... call update method with the center and edge graphics
         *   if ((event.state === "cancel" || event.state === "complete")) {
         *     sketch.update({
         *       tool: "move",
         *       graphics: [edgeGraphic, centerGraphic]
         *     });
         *   }
         * }
         */
        /**
         * Fires in response to redo action during creation of a new graphic or updating existing graphics.
         *
         * @event module:esri/widgets/Sketch#redo
         * @property {module:esri/Graphic[]} graphics - An array of graphics that are being updated or created.
         * @property {string} tool - Name of the create or update tool that is active.
         *
         * **Possible Values:** point | polyline | polygon | rectangle | circle | move | transform | reshape
         *
         * @property {string} type - The type of the event. For this event, the type is always `redo`.
         */
        /**
         * Fires in response to undo action during creation of a new graphic or updating existing graphics.
         *
         * @event module:esri/widgets/Sketch#undo
         * @property {module:esri/Graphic[]} graphics - An array of graphics that are being updated or created.
         * @property {string} tool - Name of the create or update tool that is active.
         *
         * **Possible Values:** point | polyline | polygon | rectangle | circle | move | transform | reshape
         *
         * @property {string} type - The type of the event. For this event, the type is always `undo`.
         */
        /**
         * This information is returned as `toolEventInfo` parameter for the [create](#event:create) event when the graphic
         * is being created. It returns {@link module:esri/widgets/Sketch~VertexAddEventInfo}
         * when the user clicks the view or {@link module:esri/widgets/Sketch~CursorUpdateEventInfo} or when the user moves the cursor.
         *
         * @typedef {module:esri/widgets/Sketch~VertexAddEventInfo | module:esri/widgets/Sketch~CursorUpdateEventInfo} module:esri/widgets/Sketch~CreateToolEventInfo
         */
        /**
         * This information is returned as `toolEventInfo` parameter for the [update](#event:update) event when the user is updating graphics.
         *
         * @typedef {module:esri/widgets/Sketch~MoveEventInfo | module:esri/widgets/Sketch~ReshapeEventInfo | module:esri/widgets/Sketch~RotateEventInfo | module:esri/widgets/Sketch~ScaleEventInfo | module:esri/widgets/Sketch~VertexAddEventInfo | module:esri/widgets/Sketch~VertexRemoveEventInfo} module:esri/widgets/Sketch~UpdateToolEventInfo
         */
        /**
         * This information is returned as `toolEventInfo` parameter for the [create](#event:create)
         * event when the user moves the cursor on the view while the graphic is being created.
         *
         * @typedef {Object} module:esri/widgets/Sketch~CursorUpdateEventInfo
         *
         * @property {string} type - Type is always `cursor-update`.
         *
         * @property {number[]} coordinates - An array of numbers representing the coordinates of the cursor location.
         *
         * @example
         * // listen to create event
         * sketch.on("create", function(event){
         *   // respond to create event while the cursor is being moved on the view.
         *   const eventInfo = event.toolEventInfo;
         *   if (eventInfo && eventInfo.type === "cursor-update"){
         *     console.log(eventInfo.type, eventInfo.coordinates[0], eventInfo.coordinates[1]);
         *   }
         * });
         */
        /**
         * This information is returned as `toolEventInfo` parameter for the [create](#event:create)
         * or [update](#event:update) event when the user adds vertices to the graphic being created or updated.
         *
         * @typedef {Object} module:esri/widgets/Sketch~VertexAddEventInfo
         *
         * @property {string} type - Type is always `vertex-add`.
         *
         * @property {module:esri/Graphic[]} added - An array of {@link module:esri/Graphic graphics} with {@link module:esri/geometry/Point point} geometries
         * representing the vertices that were added.
         *
         * @example
         * // listen to create event
         * sketch.on("create", function(event){
         *   // check if vertices are being added to the graphic that is being updated.
         *   if (event.toolEventInfo && event.toolEventInfo.type === "vertex-add"){
         *     const addedPoint = event.toolEventInfo.added[0].geometry;
         *     console.log(event.toolEventInfo.type, addedPoint.x, addedPoint.y);
         *   }
         * });
         */
        /**
         * This information is returned as `toolEventInfo` parameter for the [update](#event:update) event
         * when the user is removing vertices from the graphic.
         *
         * @typedef {Object} module:esri/widgets/Sketch~VertexRemoveEventInfo
         *
         * @property {string} type - Type is always `vertex-remove`.
         *
         * @property {module:esri/Graphic[]} removed - An array of {@link module:esri/Graphic graphics} with {@link module:esri/geometry/Point point} geometries
         * representing the vertices that were removed.
         *
         * @example
         * // listen to update event
         * sketch.on("update", function(event){
         *   // check if vertices are being added to the graphic that is being updated.
         *   const eventInfo = event.toolEventInfo;
         *   if (eventInfo && eventInfo.type === "vertex-remove"){
         *     const removedPoint = eventInfo.removed[0].geometry;
         *     console.log(eventInfo.type, removedPoint.x,removedPoint.y);
         *   }
         * });
         */
        /**
         * This information is returned as `toolEventInfo` parameter for the [update](#event:update)
         * event while the user is moving the graphics. It returns additional information associated with the move operation
         * and what stage it is at.
         *
         * @typedef {Object} module:esri/widgets/Sketch~MoveEventInfo
         *
         * @property {string} type - Returns information indicating the stage of the move operation.
         *
         * **Possible Values:**
         *
         * Value | Description |
         * ----- | ----------- |
         * move-start | The type changes to `move-start` at the start of `move` operation.
         * move | The type changes to `move` while graphics are being moved.
         * move-stop | The type changes to `move-stop` once graphics are moved.
         *
         * @property {number} dx - Number of pixels moved on the x-axis from the last known position.
         * @property {number} dy - Number of pixels moved on the y-axis from the last known position.
         * @property {module:esri/Graphic} mover - The instance of the graphic that is being moved.
         *
         * @example
         * // listen to update event
         * sketch.on("update", function(event){
         *   // check if the graphics are done being moved, printout dx, dy parameters to the console.
         *   const eventInfo = event.toolEventInfo;
         *   if (eventInfo && eventInfo.type.includes("move")){
         *     console.log(eventInfo.type, eventInfo.dx, eventInfo.dy);
         *   }
         * });
         */
        /**
         * This information is returned as `toolEventInfo` parameter for the [update](#event:update)
         * event while the user is reshaping the graphics. It returns additional information associated with the reshape operation
         * and what stage it is at.
         *
         * @typedef {Object} module:esri/widgets/Sketch~ReshapeEventInfo
         *
         * @property {string} type - Returns information indicating the stage of the reshape operation.
         *
         * **Possible Values:**
         *
         * Value | Description |
         * ----- | ----------- |
         * reshape-start | The type changes to `reshape-start` at the start of `reshape` operation.
         * reshape | The type changes to `reshape` while graphics are being reshaped.
         * reshape-stop | The type changes to `reshape-stop` once graphics are reshaped.
         *
         * @example
         * // listen to update event
         * sketch.on("update", function(event){
         *   // check if the graphics are done being reshaped, printout updated graphic's geometry and reshape stage.
         *   const eventInfo = event.toolEventInfo;
         *   if (eventInfo && eventInfo.type.includes("reshape")) {
         *     console.log(eventInfo.type, event.graphics[0].geometry);
         *   }
         * });
         */
        /**
         * This information is returned as `toolEventInfo` parameter for the [update](#event:update)
         * event while the user is rotating the graphics. It returns additional information associated with the rotate operation
         * and what stage it is at.
         *
         * @typedef {Object} module:esri/widgets/Sketch~RotateEventInfo
         *
         * @property {string} type - Returns information indicating the stage of the rotate operation.
         *
         * **Possible Values:**
         *
         * Value | Description |
         * ----- | ----------- |
         * rotate-start | The type changes to `rotate-start` at the start of `rotate` operation.
         * rotate | The type changes to `rotate` while graphics are being rotated.
         * rotate-stop | The type changes to `rotate-stop` once graphics are rotated.
         *
         * @property {number} angle - Angle of rotation in degrees.
         * @example
         * // listen to update event
         * sketch.on("update", function(event){
         *   if (evt.tool === "transform") {
         *     if (event.toolEventInfo) {
         *       const info = evt.toolEventInfo,
         *       type = info.type;
         *
         *       // rotate events only
         *       if (type.includes("rotate")) {
         *         // check if the rotation angle exceeded 45
         *         if (info.angle > 45) {
         *           // complete the graphic update operation
         *           sketch.complete();
         *         }
         *       }
         *     }
         *   }
         * });
         */
        /**
         * This information is returned as `toolEventInfo` parameter for the [update](#event:update)
         * event while the user is scaling or resizing the graphics. It returns additional information associated with the scale
         * operation and what stage it is at.
         *
         * @typedef {Object} module:esri/widgets/Sketch~ScaleEventInfo
         *
         * @property {string} type - Returns information indicating the stage of the scale operation.
         *
         * **Possible Values:**
         *
         * Value | Description |
         * ----- | ----------- |
         * scale-start | The type changes to `scale-start` at the start of scale or resize operation.
         * scale | The type changes to `scale` while graphics are being scaled or resized.
         * scale-stop | The type changes to `scale-stop` once graphics are scaled or resized.
         *
         * @property {number} xScale - The x scale factor used to enlarge or shrink the geometry.
         * @property {number} yScale - The y scale factor used to enlarge or shrink the geometry.
         */
        /**
         * @extends module:esri/widgets/Widget
         * @constructor
         * @alias module:esri/widgets/Sketch
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * var sketch = new Sketch({
         *   layer: layer,
         *   view: view
         * });
         */
        function Sketch(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            /**
             * Returns the name of the active tool associated with the Sketch widget instance.
             *
             * **Possible Values:** point | polyline | polygon | circle | rectangle | move | transform | reshape
             *
             * @name activeTool
             * @instance
             * @type {string}
             * @readonly
             */
            _this.activeTool = null;
            //----------------------------------
            //  createGraphic
            //----------------------------------
            /**
             * The graphic that is being created.
             *
             * @name createGraphic
             * @instance
             * @type {module:esri/Graphic}
             * @readonly
             */
            _this.createGraphic = null;
            //----------------------------------
            //  defaultUpdateOptions
            //----------------------------------
            /**
             * Default update options set for the Sketch widget. Update options set on this property will be overwritten if the update options are changed
             * when [update()](#update) method is called.
             *
             * @name defaultUpdateOptions
             * @instance
             * @since 4.11
             *
             * @property {string} [tool] - Name of the update tool. The default tool is `transform` for graphics with polygon and polyline geometries and `move` for graphics with point and multipoint geometries.
             *                             However, if a graphic with point geometry uses a {@link module:esri/symbols/ObjectSymbol3DLayer 3D object symbol layer}, the default tool is `transform`.
             * @property {boolean} [enableRotation=true] - Indicates if the `rotation` operation will be enabled when updating graphics. Only applies if `tool` is `transform`.
             * @property {boolean} [enableScaling=true] - Indicates if the `scale` operation will be enabled when updating graphics. Only applies if `tool` is `transform`.
             * @property {boolean} [multipleSelectionEnabled=true] - Indicates whether more than one selection can be made at once. This pertains to shift+click interaction with the `transform` tool.
             * @property {boolean} [preserveAspectRatio=false] - Indicates if the uniform scale operation will be enabled when updating graphics. `enableScaling`
             * must be set `true` when setting this property to `true`. Only applies if `tool` is `transform` and is always `true` when transforming points that use a {@link module:esri/symbols/ObjectSymbol3DLayer 3D object symbol layer}.
             * @property {boolean} [toggleToolOnClick=true] - Indicates if the graphic being updated can be toggled between `transform` and `reshape` update options.
             * @instance
             * @type {Object}
             * @readonly
             *
             */
            _this.defaultUpdateOptions = null;
            //----------------------------------
            //  iconClass
            //----------------------------------
            /**
             * The Sketch widget's default CSS icon class.
             *
             * @name iconClass
             * @instance
             * @type {string}
             */
            _this.iconClass = CSS.widgetIcon;
            //----------------------------------
            //  layer
            //----------------------------------
            /**
             * The {@link module:esri/layers/GraphicsLayer} associated with the Sketch widget. The Sketch widget adds new {@link module:esri/Graphic graphics} to this layer or can only update graphics
             * stored in this layer.
             *
             * @name layer
             * @instance
             * @type {module:esri/layers/GraphicsLayer}
             *
             */
            _this.layer = null;
            //----------------------------------
            //  state
            //----------------------------------
            /**
             * The Sketch widget's state.
             *
             * **Possible Values:** ready | disabled | active
             *
             * @name state
             * @instance
             * @type {string}
             * @readonly
             *
             */
            _this.state = null;
            //----------------------------------
            //  updateGraphics
            //----------------------------------
            /**
             * An array of {@link module:esri/Graphic graphics} that are being updated by the Sketch widget.
             *
             * @name updateGraphics
             * @instance
             * @type {module:esri/core/Collection<module:esri/Graphic>}
             * @readonly
             */
            _this.updateGraphics = new Collection();
            //----------------------------------
            //  view
            //----------------------------------
            /**
             * A reference to the {@link module:esri/views/MapView} or {@link module:esri/views/SceneView}. Set this to link the Sketch widget to a specific view.
             *
             * @name view
             * @instance
             * @type {module:esri/views/MapView | module:esri/views/SceneView}
             */
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            /**
             * The view model for the Sketch widget. This is a class that contains all the logic
             * (properties and methods) that controls this widget's behavior. See the
             * {@link module:esri/widgets/Sketch/SketchViewModel} class to access
             * all properties and methods on the Sketch widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/Sketch/SketchViewModel}
             */
            _this.viewModel = new SketchViewModel();
            //----------------------------------
            //  widgetLabel
            //----------------------------------
            /**
             * The Sketch widget's default label.
             *
             * @name widgetLabel
             * @instance
             * @type {string}
             * @readonly
             */
            _this.widgetLabel = i18n.title;
            _this.bufferGraphic = null;
            _this.propertyLayer = null;
            _this.distance = null;
            return _this;
        }
        Sketch.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                this.viewModel.on("create", function () { return _this.scheduleRender(); }),
                this.viewModel.on("update", function () { return _this.scheduleRender(); }),
                this.viewModel.on("create", function (event) { return _this._onOperationComplete(event); }),
                this.viewModel.on("update", function (event) { return _this._onOperationComplete(event); }),
                this.viewModel.on("undo", function () { return _this.scheduleRender(); }),
                this.viewModel.on("redo", function () { return _this.scheduleRender(); }),
                this.viewModel.on("reset", function () { return _this.scheduleRender(); })
            ]);
        };
        Object.defineProperty(Sketch.prototype, "layout", {
            //----------------------------------
            //  layout
            //----------------------------------
            /**
             * Determines the layout/orientation of the Sketch widget.
             *
             * **Possible Values:** vertical | horizontal
             *
             * @name layout
             * @since 4.10
             * @instance
             * @default horizontal
             * @type {string}
             */
            set: function (value) {
                if (value !== "vertical") {
                    value = "horizontal";
                }
                this._set("layout", value);
            },
            enumerable: true,
            configurable: true
        });
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        /**
         * Create a graphic with a geometry specified in `tool`. When first vertex of the graphic is added,
         * [create](#event:create) event will start firing.
         *
         * @since 4.10
         * @method create
         * @instance
         *
         * @param {string} tool - Name of the create tool. Specifies the geometry type for the graphic to be created.
         *
         * **Possible Values:** point | polyline | polygon | rectangle | circle
         *
         * @param {Object} [createOptions] - Options for the graphic to be created.
         *
         * @param {string} [createOptions.mode] - Specifies how the graphic can be created. The create mode applies only when creating
         * `polygon`, `polyline`, `rectangle` and `circle` geometries.
         *
         * **Possible Values:**
         *
         * Value | Description |
         * ----- | ----------- |
         * hybrid | Vertices are added while the pointer is clicked or dragged. Applies to and is the default for `polygon` and `polyline`.
         * freehand | Vertices are added while the pointer is dragged. Applies to `polygon`, `polyline` `rectangle` and `circle`. Default for `rectangle` and `circle`.
         * click | Vertices are added when the pointer is clicked.
         *
         * @example
         * // Call create method to create a polygon with freehand mode.
         * sketch.create("polygon", { mode: "freehand" });
         *
         * // listen to create event, only respond when event's state changes to complete
         * sketch.on("create", function(event) {
         *   if (event.state === "complete") {
         *     // remove the graphic from the layer associated with the Sketch widget
         *     // instead use the polygon that user created to query features that
         *     // intersect it.
         *     polygonGraphicsLayer.remove(event.graphic);
         *     selectFeatures(event.graphic.geometry);
         *   }
         * });
         */
        Sketch.prototype.create = function (tool, options) { };
        /**
         * Initializes an update operation for the specified graphic(s) and fires [update](#event:update) event.
         *
         * @since 4.10
         * @method update
         * @instance
         * @param {module:esri/Graphic | module:esri/Graphic[]} graphics - A graphic or an array of graphics to be updated. Only graphics added to SketchViewModel's [layer](#layer) property can be updated.
         * @param {Object} [updateOptions] - Update options for the graphics to be updated.
         * @param {string} [updateOptions.tool] - Name of the update tool. Specifies the update operation for the selected graphics.
         *
         * **Possible Values:**
         *
         * Value | Description |
         * ----- | ----------- |
         * transform | This is the *default* tool for graphics with a {@link module:esri/geometry/Polygon polygon} geometry, {@link module:esri/geometry/Polyline polyline} geometry or graphics that use a {@link module:esri/symbols/ObjectSymbol3DLayer 3D object symbol layer} with a {@link module:esri/geometry/Point point} geometry. It allows one or multiple graphics to be scaled, rotated and moved by default. Its default behavior can be changed by setting the `enableRotation`, `enableScaling` or `preserveAspectRatio` arguments when calling the `update` method or setting them on the [defaultUpdateOptions](#defaultUpdateOptions) property when the Sketch widget initializes.
         * reshape | This tool allows the entire graphic or individual vertices of the graphic to be moved. Vertices can be added or removed. This tool can only be used with a single graphic that has a {@link module:esri/geometry/Polygon polygon} or {@link module:esri/geometry/Polyline polyline} geometry.
         * move | This is the *default* tool for graphics with a {@link module:esri/geometry/Point point} geometry that do not use a {@link module:esri/symbols/ObjectSymbol3DLayer 3D object symbol layer}. It should be used for specific cases where you just want to move selected `polygon` and `polyline` graphics without additional options. Additionally, the `move` tool does not support toggling to different modes, since the `move` operation is built into both the `transform` and `reshape` tools by default.
         *
         * @param {boolean} [updateOptions.enableRotation=true] - Indicates if the `rotation` operation will be enabled when updating graphics. Only applies if `tool` is `transform`.
         * @param {boolean} [updateOptions.enableScaling=true] - Indicates if the `scale` operation will be enabled when updating graphics. Only applies if `tool` is `transform`.
         * @param {boolean} [updateOptions.preserveAspectRatio=false] - Indicates if the uniform scale operation will be enabled when updating graphics. `enableScaling`
         * must be set `true` when setting this property to `true`. Only applies if `tool` is `transform` and is always `true` when transforming points that use a {@link module:esri/symbols/ObjectSymbol3DLayer 3D object symbol layer}.
         * @param {boolean} [updateOptions.toggleToolOnClick=true] - Indicates if the graphic being updated can be toggled between `transform` and `reshape` update options.
         *
         * @return {Promise<void>} Resolves when the requested update tool has been loaded and is ready to use.
         *
         * @example
         * // start update operation for the selected graphic
         * // with transform tool. Only allow uniform scaling operation.
         * sketch.update([selectedGraphic], {
         *   tool: "transform",
         *   enableRotation: false,
         *   enableScaling: true,
         *   preserveAspectRatio: true,
         *   toggleToolOnClick: false
         * });
         *
         * @example
         * // Listen to sketch's update event to validate graphic's
         * // location while it is being reshaped or moved
         * sketch.on("update", onGraphicUpdate);
         * function onGraphicUpdate(event) {
         *   // get the graphic as it is being updated
         *   const graphic = event.graphics[0];
         *   // check if the graphic is intersecting school buffers
         *   intersects = geometryEngine.intersects(buffers, graphic.geometry);
         *
         *   // change the graphic symbol to valid or invalid symbol
         *   // depending the graphic location
         *   graphic.symbol = (intersects) ? invalidSymbol : validSymbol
         *
         *   // check if the update event's the toolEventInfo.type is move-stop or reshape-stop
         *   // user finished moving or reshaping the graphic, call complete method.
         *   // This changes update event state to complete.
         *   const toolType = event.toolEventInfo.type;
         *   if (event.toolEventInfo && (toolType === "move-stop" || toolType === "reshape-stop")) {
         *     if (!intersects) {
         *       sketch.complete();
         *     }
         *   } else if ((event.state === "cancel" || event.state === "complete")) {
         *       // graphic update has been completed or cancelled
         *       // if the graphic is in a bad spot, call sketch's update method again
         *       // giving user a chance to correct the location of the graphic
         *       if ((!contains) || (intersects)) {
         *         sketch.update({
         *           tool: "reshape",
         *           graphics: [graphic],
         *           toggleToolOnClick: false
         *         });
         *       }
         *   }
         * }
         */
        Sketch.prototype.update = function (graphicOrGraphics, options) {
            return this.viewModel.update(graphicOrGraphics, options);
        };
        /**
         * Completes the active operation and fires the [create](#event:create) or [update](#event:update) event
         * and changes the event's state to `complete`. If called in midst of create operation, `complete()` finishes
         * the active create operation and keeps the valid geometry.
         *
         * @method complete
         * @instance
         *
         */ Sketch.prototype.complete = function () { };
        /**
         * Cancels the active operation and fires the [create](#event:create) or [update](#event:update) event
         * and changes the event's state to `cancel`.
         *
         * @since 4.10
         * @method cancel
         * @instance
         *
         */
        Sketch.prototype.cancel = function () { };
        /**
         * Incrementally undo actions recorded in the stack. Calling this method will fire the
         * [undo](#event:undo) event.
         *
         * @method undo
         * @instance
         *
         */
        Sketch.prototype.undo = function () { };
        /**
         * Incrementally redo actions recorded in the stack. Calling this method will fire the
         * [redo](#event:redo) event.
         *
         * @method redo
         * @instance
         *
         */
        Sketch.prototype.redo = function () { };
        /**
         * Resets the Sketch widget to prepare for another create operation.
         * Reset discards the current sketch, if called in middle of create operation.
         *
         * @method reset
         * @instance
         */
        Sketch.prototype.reset = function () {
            this.viewModel.reset();
            this.view.focus();
        };
        Sketch.prototype.render = function () {
            var state = this.viewModel.state;
            var classes = this.classes(CSS.base, CSS.esriWidget, state === "disabled" ? CSS.disabled : null, this.layout === "vertical" ? CSS.verticalLayout : null);
            return (widget_1.tsx("div", { "aria-label": i18n.widgetLabel, class: classes },
                widget_1.tsx("div", { class: CSS.panel }, this.renderTopPanelContents()),
                widget_1.tsx("div", { class: this.classes(CSS.panel, CSS.infoPanel) }, this.renderInfoPanelContents()),
                widget_1.tsx("div", { class: this.classes(CSS.panel, CSS.infoPanel) }, this.renderBufferSection())));
        };
        Sketch.prototype.renderTopPanelContents = function () {
            return [
                // <div class={this.classes(CSS.section, CSS.toolSection)}>
                //   {this.renderNavigationButtons()}
                // </div>,
                null,
                widget_1.tsx("div", { class: this.classes(CSS.section, CSS.toolSection) }, this.renderDrawButtons()),
                null
                // <div class={this.classes(CSS.section, CSS.toolSection)}>{this.renderMenuButtons()}</div>
            ];
        };
        Sketch.prototype.renderInfoPanelContents = function () {
            if (this.updateGraphics.length) {
                return [
                    widget_1.tsx("div", { class: this.classes(CSS.section, CSS.infoSection, CSS.infoCountSection), key: "feature-count-container" }, this.renderFeatureCount()),
                    widget_1.tsx("div", { class: this.classes(CSS.section, CSS.infoSection), key: "delete-button-container" }, this.renderDeleteButton())
                ];
            }
        };
        Sketch.prototype.renderFeatureCount = function () {
            var _a = this, layout = _a.layout, count = _a.updateGraphics.length;
            var countLabel = lang_1.substitute({ count: count }, count === 1 ? i18n.featureCount : i18n.featuresCount);
            return (widget_1.tsx("div", { class: CSS.featureCountBadge, "aria-label": countLabel },
                widget_1.tsx("span", { class: CSS.featureCountNumber }, layout === "vertical" ? count : countLabel)));
        };
        Sketch.prototype.renderDeleteButton = function () {
            var title = i18n.deleteFeature;
            return (widget_1.tsx("button", { "aria-label": title, bind: this, class: this.classes(CSS.button, CSS.resetIcon), onclick: this._deleteGraphic, title: title }));
        };
        Sketch.prototype.renderNavigationButtons = function () {
            return [this.renderTransformButton(), this.renderReshapeButton()];
        };
        Sketch.prototype.renderTransformButton = function () {
            var title = i18n.move;
            var classes = [CSS.button, CSS.panIcon];
            var defaultTool = this.viewModel.defaultUpdateOptions.tool;
            var isActive = !!(this.activeTool === "transform" || this.activeTool === "move");
            if ((this.state === "ready" && defaultTool === "transform") || isActive) {
                classes.push(CSS.selectedButton);
            }
            return (widget_1.tsx("button", { "aria-label": title, bind: this, class: this.classes(classes), onclick: this._activateTransformTool, title: title }));
        };
        Sketch.prototype.renderReshapeButton = function () {
            var title = i18n.reshape;
            var classes = [CSS.button, CSS.cursorIcon];
            var defaultTool = this.viewModel.defaultUpdateOptions.tool;
            var isDisabled = this.updateGraphics.length > 1;
            if ((this.state === "ready" && defaultTool === "reshape") || this.activeTool === "reshape") {
                classes.push(CSS.selectedButton);
            }
            return (widget_1.tsx("button", { "aria-label": title, bind: this, class: this.classes(classes), onclick: this._activateReshapeTool, disabled: isDisabled, title: title }));
        };
        Sketch.prototype.renderDrawButtons = function () {
            return [
                this.renderPointButton(),
                this.renderMultiPointButton(),
                this.renderPolylineButton(),
                this.renderPolygonButton(),
                this.renderRectangleButton(),
                this.renderCircleButton()
            ];
        };
        Sketch.prototype.renderPointButton = function () {
            var title = i18n.drawPoint;
            var classes = [CSS.button, CSS.pointIcon];
            if (this.activeTool === "point") {
                classes.push(CSS.selectedButton);
            }
            return (widget_1.tsx("button", { "aria-label": title, bind: this, class: this.classes(classes), onclick: this._activateCreatePoint, title: title }));
        };
        Sketch.prototype.renderMultiPointButton = function () {
            var title = "Draw multiple points";
            var classes = [CSS.button, CSS.pointIcon];
            if (this.activeTool === "multipoint") {
                classes.push(CSS.selectedButton);
            }
            return (widget_1.tsx("button", { "aria-label": title, bind: this, class: this.classes(classes), onclick: this._activateCreateMultiPoint, title: title }));
        };
        Sketch.prototype.renderPolygonButton = function () {
            var title = i18n.drawPolygon;
            var classes = [CSS.button, CSS.polygonIcon];
            if (this.activeTool === "polygon") {
                classes.push(CSS.selectedButton);
            }
            return (widget_1.tsx("button", { "aria-label": title, bind: this, class: this.classes(classes), onclick: this._activateCreatePolygon, title: title }));
        };
        Sketch.prototype.renderPolylineButton = function () {
            var title = i18n.drawPolyline;
            var classes = [CSS.button, CSS.polylineIcon];
            if (this.activeTool === "polyline") {
                classes.push(CSS.selectedButton);
            }
            return (widget_1.tsx("button", { "aria-label": title, bind: this, class: this.classes(classes), onclick: this._activateCreatePolyline, title: title }));
        };
        Sketch.prototype.renderCircleButton = function () {
            var title = i18n.drawCircle;
            var classes = [CSS.button, CSS.circleIcon];
            if (this.activeTool === "circle") {
                classes.push(CSS.selectedButton);
            }
            return (widget_1.tsx("button", { "aria-label": title, bind: this, class: this.classes(classes), onclick: this._activateCreateCircle, title: title }));
        };
        Sketch.prototype.renderRectangleButton = function () {
            var title = i18n.drawRectangle;
            var classes = [CSS.button, CSS.rectangleIcon];
            if (this.activeTool === "rectangle") {
                classes.push(CSS.selectedButton);
            }
            return (widget_1.tsx("button", { "aria-label": title, bind: this, class: this.classes(classes), onclick: this._activateCreateRectangle, title: title }));
        };
        Sketch.prototype.renderMenuButtons = function () {
            return [this.renderUndoButton(), this.renderRedoButton()];
        };
        Sketch.prototype.renderUndoButton = function () {
            var title = i18n.undo;
            var isDisabled = !this.viewModel.canUndo();
            return (widget_1.tsx("button", { "aria-label": title, bind: this, class: this.classes(CSS.button, CSS.undoIcon), disabled: isDisabled, onclick: this._undo, title: title }));
        };
        Sketch.prototype.renderRedoButton = function () {
            var title = i18n.redo;
            var isDisabled = !this.viewModel.canRedo();
            return (widget_1.tsx("button", { "aria-label": title, bind: this, class: this.classes(CSS.button, CSS.redoIcon), disabled: isDisabled, onclick: this._redo, title: title }));
        };
        Sketch.prototype.renderBufferSection = function () {
            var bufferInput = widget_1.tsx("input", { type: "number", "data-input-name": "distance", placeholder: "Buffer distance (feet)", class: this.classes(CSS.inputText, CSS.input), value: this.distance, oninput: this._updateInputValue, bind: this });
            var bufferButton = widget_1.tsx("button", { "aria-label": "Buffer Property", role: "button", class: this.classes(CSS.widgetButton, CSS.bufferButton), 
                // tabIndex={0}
                onclick: this._bufferProperty, bind: this }, "Buffer Property");
            var content = (this.bufferGraphic && parseInt(this.distance) != NaN && parseInt(this.distance) > 0) ? (widget_1.tsx("div", { key: "buffer-section" },
                bufferInput,
                bufferButton)) : (widget_1.tsx("div", { key: "buffer-section" }, bufferInput));
            return (content);
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Sketch.prototype._isUpdateToolActive = function () {
            return !!(this.activeTool === "transform" ||
                this.activeTool === "reshape" ||
                this.activeTool === "move");
        };
        Sketch.prototype._deleteGraphic = function () {
            if (this.state === "active") {
                var _a = this, activeTool = _a.activeTool, layer = _a.layer, updateGraphics = _a.updateGraphics;
                var graphics = updateGraphics.toArray();
                layer.removeMany(graphics);
                this.reset(); // Resets 'activeTool'
                this.emit("delete", { graphics: graphics, tool: activeTool, type: "delete" });
            }
        };
        Sketch.prototype._updateInputValue = function (e) {
            var target = e.target;
            var targetProperty = target.getAttribute("data-input-name");
            this[targetProperty] = target.value;
        };
        Sketch.prototype._bufferProperty = function () {
            if (this.bufferGraphic && parseInt(this.distance) != NaN && parseInt(this.distance) > 0) {
                var geometry = geometryEngine.buffer(this.bufferGraphic.geometry, parseInt(this.distance), 'feet');
                this.layer.add(new Graphic({ geometry: geometry, symbol: {
                        type: "simple-fill",
                        color: [51, 51, 204, 0],
                        style: "solid",
                        outline: {
                            color: "black",
                            width: 2
                        }
                    } }));
                this._selectProperties(geometry);
            }
        };
        Sketch.prototype._selectProperties = function (geometry) {
            var _this = this;
            if (this.propertyLayer) {
                this.propertyLayer.queryFeatures({ geometry: geometry, returnGeometry: true, outFields: ['OBJECTID'] }).then(function (result) {
                    var oids = [];
                    result.features.forEach(function (feature) {
                        oids.push(feature.attributes.OBJECTID);
                    });
                    _this.propertyLayer.queryRelatedFeatures({ relationshipId: 0, objectIds: oids, outFields: ['*'] }).then(function (result) {
                        var data = [];
                        oids.forEach(function (oid) {
                            if (result[oid]) {
                                result[oid].features.forEach(function (f) {
                                    data.push(f.attributes);
                                });
                            }
                        });
                        event.oids = oids;
                        event.propertyInfo = data;
                        _this.emit('buffered', event);
                    });
                });
            }
        };
        Sketch.prototype._onOperationComplete = function (event) {
            // Reset the default tool when an operation finishes
            if (event.state === "complete" || event.state === "cancel") {
                this._modifyDefaultUpdateTool("transform");
                if (parseInt(this.distance) != NaN && parseInt(this.distance) > 0) {
                    var geometry = geometryEngine.buffer(event.graphic.geometry, parseInt(this.distance), 'feet');
                    event.graphic = new Graphic(geometry);
                    this._selectProperties(geometry);
                }
                else {
                    this._selectProperties(event.graphic.geometry);
                }
            }
        };
        // Resets the default update tool
        Sketch.prototype._modifyDefaultUpdateTool = function (tool) {
            if (this.viewModel.defaultUpdateOptions) {
                this.viewModel.defaultUpdateOptions.tool = tool;
            }
        };
        Sketch.prototype._activateTransformTool = function () {
            // Create tool is active - reset the widget
            if (this.state === "active" && !this._isUpdateToolActive()) {
                this.viewModel.reset();
            }
            // Reshape tool is active - toggle tool
            else if (this.activeTool === "reshape") {
                this.viewModel.toggleUpdateTool();
            }
            // Set the default update tool to 'transform'
            this._modifyDefaultUpdateTool("transform");
            this.view.focus();
        };
        Sketch.prototype._activateReshapeTool = function () {
            // Create tool is active - reset the widget
            if (this.state === "active" && !this._isUpdateToolActive()) {
                this.viewModel.reset();
            }
            // Transform tool is active - toggle tool
            // -- Reshape workflow only supports one graphic
            if (this.activeTool === "transform" && this.updateGraphics.length === 1) {
                this.viewModel.toggleUpdateTool();
            }
            // Set the default update tool to 'reshape' temporarily
            this._modifyDefaultUpdateTool("reshape");
            this.view.focus();
        };
        Sketch.prototype._activateCreatePoint = function () {
            this.viewModel.create("point");
            this.view.focus();
        };
        Sketch.prototype._activateCreateMultiPoint = function () {
            this.viewModel.create("multipoint");
            this.view.focus();
        };
        Sketch.prototype._activateCreatePolygon = function () {
            this.viewModel.create("polygon");
            this.view.focus();
        };
        Sketch.prototype._activateCreatePolyline = function () {
            this.viewModel.create("polyline");
            this.view.focus();
        };
        Sketch.prototype._activateCreateCircle = function () {
            this.viewModel.create("circle");
            this.view.focus();
        };
        Sketch.prototype._activateCreateRectangle = function () {
            this.viewModel.create("rectangle");
            this.view.focus();
        };
        Sketch.prototype._undo = function () {
            this.undo();
            this.view.focus();
        };
        Sketch.prototype._redo = function () {
            this.redo();
            this.view.focus();
        };
        __decorate([
            decorators_1.aliasOf("viewModel.activeTool"),
            widget_1.renderable()
        ], Sketch.prototype, "activeTool", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.createGraphic"),
            widget_1.renderable()
        ], Sketch.prototype, "createGraphic", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.defaultUpdateOptions"),
            widget_1.renderable()
        ], Sketch.prototype, "defaultUpdateOptions", void 0);
        __decorate([
            decorators_1.property()
        ], Sketch.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.layer"),
            widget_1.renderable()
        ], Sketch.prototype, "layer", void 0);
        __decorate([
            decorators_1.property({ value: "horizontal" }),
            widget_1.renderable()
        ], Sketch.prototype, "layout", null);
        __decorate([
            decorators_1.aliasOf("viewModel.state"),
            widget_1.renderable()
        ], Sketch.prototype, "state", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.updateGraphics"),
            widget_1.renderable(["updateGraphics", "updateGraphics.length"])
        ], Sketch.prototype, "updateGraphics", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view"),
            widget_1.renderable()
        ], Sketch.prototype, "view", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable("viewModel.state"),
            widget_1.vmEvent(["create", "update", "undo", "redo", "reset"])
        ], Sketch.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.property()
        ], Sketch.prototype, "widgetLabel", void 0);
        __decorate([
            decorators_1.property()
        ], Sketch.prototype, "bufferGraphic", void 0);
        __decorate([
            decorators_1.property()
        ], Sketch.prototype, "propertyLayer", void 0);
        __decorate([
            decorators_1.property()
        ], Sketch.prototype, "distance", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.create")
        ], Sketch.prototype, "create", null);
        __decorate([
            decorators_1.aliasOf("viewModel.complete")
        ], Sketch.prototype, "complete", null);
        __decorate([
            decorators_1.aliasOf("viewModel.cancel")
        ], Sketch.prototype, "cancel", null);
        __decorate([
            decorators_1.aliasOf("viewModel.undo")
        ], Sketch.prototype, "undo", null);
        __decorate([
            decorators_1.aliasOf("viewModel.redo")
        ], Sketch.prototype, "redo", null);
        Sketch = __decorate([
            decorators_1.subclass("esri.widgets.Sketch")
        ], Sketch);
        return Sketch;
    }(decorators_1.declared(Widget)));
    return Sketch;
});
//# sourceMappingURL=PropertySelect.js.map