/**
 * The DirectLineMeasurement3D widget calculates and displays the 3D distance between two points.
 * This widget can be used in a {@link module:esri/views/SceneView} to measure the vertical, horizontal,
 * and direct distance between two points.
 *
 * [![measurement-line-3d](../../assets/img/apiref/widgets/direct-line-measurement-3d-sample.png)](../sample-code/widgets-measurement-3d/index.html)
 *
 * When the widget is active, a horizontal "laser" line is drawn which indicates the height at the current mouse position.
 * This line can help in analyzing the heights of objects relative to each other and the terrain.
 * A second laser line shows the intersection of the scene with the vertical plane that passes through the checkered line.
 *
 * DirectLineMeasurement3D widget labels the direct, horizontal, and vertical orange distance lines and displays the same values
 * in the UI panel. In a WGS84 or WebMercator scene, when the distance between the points is greater than 100 km,
 * DirectLineMeasurement3D widget switches to displaying only the Horizontal and Vertical distances taking into consideration
 * the curvature of the earth (i.e. ellipsoid-based geodesic distance).
 *
 * ![measurement-line-3d](../../assets/img/apiref/widgets/direct-line-measurement-3d.png)
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * This widget is designed to work with 3D SceneViews. For measurements with 2D MapViews, use
 * {@link module:esri/widgets/DistanceMeasurement2D}.
 *
 * :::
 *
 * @example
 * var measurementWidget = new DirectLineMeasurement3D({
 *   view: view
 * });
 *
 * view.ui.add(measurementWidget, "top-right");
 *
 * @module esri/widgets/DirectLineMeasurement3D
 * @since 4.6
 *
 * @see [DirectLineMeasurement3D.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/DirectLineMeasurement3D.tsx)
 * @see [DirectLineMeasurement3D.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_DirectLineMeasurement3D.scss)
 * @see [Sample - Measurement in 3D](../sample-code/widgets-measurement-3d/index.html)
 * @see {@link module:esri/widgets/DirectLineMeasurement3D/DirectLineMeasurement3DViewModel}
 * @see {@link module:esri/widgets/AreaMeasurement3D}
 * @see {@link module:esri/views/View#ui View.ui}
 * @see {@link module:esri/views/ui/DefaultUI}
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/widgets/DirectLineMeasurement3D/nls/DirectLineMeasurement3D", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/DirectLineMeasurement3D/DirectLineMeasurement3DViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18n, decorators_1, Widget, DirectLineMeasurement3DViewModel, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var CSS = {
        // common
        button: "esri-button esri-button--secondary",
        buttonDisabled: "esri-button--disabled",
        // base
        base: "esri-direct-line-measurement-3d esri-widget esri-widget--panel",
        // container
        container: "esri-direct-line-measurement-3d__container",
        // hint
        hint: "esri-direct-line-measurement-3d__hint",
        hintText: "esri-direct-line-measurement-3d__hint-text",
        panelError: "esri-direct-line-measurement-3d__panel--error",
        // measurement
        measurement: "esri-direct-line-measurement-3d__measurement",
        measurementItem: "esri-direct-line-measurement-3d__measurement-item",
        measurementItemDisabled: "esri-direct-line-measurement-3d__measurement-item--disabled",
        measurementItemTitle: "esri-direct-line-measurement-3d__measurement-item-title",
        measurementItemValue: "esri-direct-line-measurement-3d__measurement-item-value",
        // units
        settings: "esri-direct-line-measurement-3d__settings",
        units: "esri-direct-line-measurement-3d__units",
        unitsLabel: "esri-direct-line-measurement-3d__units-label",
        unitsSelect: "esri-direct-line-measurement-3d__units-select esri-select",
        unitsSelectWrapper: "esri-direct-line-measurement-3d__units-select-wrapper",
        // clear
        actionSection: "esri-direct-line-measurement-3d__actions",
        clearButton: "esri-direct-line-measurement-3d__clear-button"
    };
    var DirectLineMeasurement3D = /** @class */ (function (_super) {
        __extends(DirectLineMeasurement3D, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @alias module:esri/widgets/DirectLineMeasurement3D
         * @extends module:esri/widgets/Widget
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * var measurementWidget = new DirectLineMeasurement3D({
         *   view: view
         * });
         */
        function DirectLineMeasurement3D(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  view
            //----------------------------------
            /**
             * A reference to the {@link module:esri/views/SceneView}. Set this to link the widget to a specific view.
             *
             * @name view
             * @instance
             * @type {module:esri/views/SceneView}
             */
            _this.view = null;
            //----------------------------------
            //  visible
            //----------------------------------
            /**
             * Indicates whether the widget is visible.
             *
             * @name visible
             * @instance
             * @type {boolean}
             * @ignore
             */
            _this.visible = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            /**
             * The view model for this widget. This is a class that contains all the logic
             * (properties and methods) that controls this widget's behavior. See the
             * {@link module:esri/widgets/DirectLineMeasurement3D/DirectLineMeasurement3DViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @since 4.7
             * @type {module:esri/widgets/DirectLineMeasurement3D/DirectLineMeasurement3DViewModel}
             * @autocast
             */
            _this.viewModel = new DirectLineMeasurement3DViewModel();
            //----------------------------------
            //  unitOptions
            //----------------------------------
            /**
             * List of unit systems (imperial, metric) and specific units for displaying the distance values.
             * By default, the following units are included: `metric`, `imperial`, `inches`, `feet`, `us-feet`, `yards`, `miles`, `nautical-miles`, `meters`, `kilometers`.
             *
             * @name unitOptions
             * @instance
             * @since 4.7
             * @type {string[]}
             */
            _this.unitOptions = null;
            //----------------------------------
            //  unit
            //----------------------------------
            /**
             * Unit system (imperial, metric) or specific unit used for displaying the distance values.
             *
             * **Possible Values:** metric | imperial | inches | feet | us-feet | yards | miles | nautical-miles | meters | kilometers
             *
             * @name unit
             * @instance
             * @since 4.8
             * @type {string}
             */
            _this.unit = null;
            return _this;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        DirectLineMeasurement3D.prototype.render = function () {
            var _this = this;
            var isSupported = this.viewModel.isSupported;
            var isActive = this.viewModel.active;
            var isDisabled = this.viewModel.state === "disabled";
            var isReady = this.viewModel.state === "ready";
            var isMeasuring = this.viewModel.state === "measuring" || this.viewModel.state === "measured";
            var measurement = this.viewModel.measurement;
            var hintNode = isActive && isReady ? (widget_1.tsx("section", { key: "esri-direct-line-measurement-3d__hint", class: CSS.hint },
                widget_1.tsx("p", { class: CSS.hintText }, i18n.hint))) : null;
            var unsupportedNode = !isSupported ? (widget_1.tsx("section", { key: "esri-direct-line-measurement-3d__unsupported", class: CSS.panelError },
                widget_1.tsx("p", null, i18n.unsupported))) : null;
            var measurementLabelNode = function (title, value, key) {
                switch (value.state) {
                    case "available":
                        return (widget_1.tsx("div", { key: key + "-enabled", class: CSS.measurementItem },
                            widget_1.tsx("span", { class: CSS.measurementItemTitle }, title),
                            widget_1.tsx("span", { class: CSS.measurementItemValue }, value.text)));
                    case "unavailable":
                        return (widget_1.tsx("div", { key: key + "-disabled", class: _this.classes(CSS.measurementItem, CSS.measurementItemDisabled) },
                            widget_1.tsx("span", { class: CSS.measurementItemTitle }, title)));
                }
            };
            var measurementNode = isMeasuring ? (widget_1.tsx("section", { key: "esri-direct-line-measurement-3d__measurement", class: CSS.measurement },
                measurementLabelNode(i18n.direct, measurement.directDistance, "direct"),
                measurementLabelNode(i18n.horizontal, measurement.horizontalDistance, "horizontal"),
                measurementLabelNode(i18n.vertical, measurement.verticalDistance, "vertical"))) : null;
            var unitsId = this.id + "__units";
            var unitsLabelNode = (widget_1.tsx("label", { class: CSS.unitsLabel, for: unitsId }, i18n.unit));
            var unitsSelectNode = (widget_1.tsx("div", { class: CSS.unitsSelectWrapper },
                widget_1.tsx("select", { class: CSS.unitsSelect, id: unitsId, onchange: this._changeUnit, bind: this }, this.viewModel.unitOptions.map(function (unit) {
                    return unit === _this.viewModel.unit ? (widget_1.tsx("option", { key: unit, value: unit, selected: true }, i18n.units[unit])) : (widget_1.tsx("option", { key: unit, value: unit }, i18n.units[unit]));
                }))));
            var unitsNode = (widget_1.tsx("section", { key: "esri-direct-line-measurement-3d__units", class: CSS.units },
                unitsLabelNode,
                unitsSelectNode));
            var settingsNode = isMeasuring ? (widget_1.tsx("div", { key: "settings", class: CSS.settings }, unitsNode)) : null;
            var newMeasurementNode = isSupported && (!isActive || isMeasuring) ? (widget_1.tsx("div", { class: CSS.actionSection },
                widget_1.tsx("button", { disabled: isDisabled, class: this.classes(CSS.button, CSS.clearButton, isDisabled && CSS.buttonDisabled), bind: this, onclick: this._newMeasurement }, i18n.newMeasurement))) : null;
            var containerNode = this.visible ? (widget_1.tsx("div", { class: CSS.container },
                unsupportedNode,
                hintNode,
                settingsNode,
                measurementNode,
                newMeasurementNode)) : null;
            return (widget_1.tsx("div", { key: "", class: CSS.base, role: "presentation" }, containerNode));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        DirectLineMeasurement3D.prototype._newMeasurement = function () {
            this.viewModel.newMeasurement();
        };
        DirectLineMeasurement3D.prototype._changeUnit = function (event) {
            var target = event.target;
            var selected = target.options[target.selectedIndex];
            if (selected) {
                this.unit = selected.value;
            }
        };
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], DirectLineMeasurement3D.prototype, "view", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.visible"),
            widget_1.renderable()
        ], DirectLineMeasurement3D.prototype, "visible", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.active"),
            widget_1.renderable()
        ], DirectLineMeasurement3D.prototype, "active", void 0);
        __decorate([
            decorators_1.property({
                type: DirectLineMeasurement3DViewModel
            }),
            widget_1.renderable([
                "viewModel.state",
                "viewModel.unitOptions",
                "viewModel.unit",
                "viewModel.measurement"
            ])
        ], DirectLineMeasurement3D.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.unitOptions")
        ], DirectLineMeasurement3D.prototype, "unitOptions", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.unit")
        ], DirectLineMeasurement3D.prototype, "unit", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], DirectLineMeasurement3D.prototype, "_newMeasurement", null);
        __decorate([
            widget_1.accessibleHandler()
        ], DirectLineMeasurement3D.prototype, "_changeUnit", null);
        DirectLineMeasurement3D = __decorate([
            decorators_1.subclass("esri.widgets.DirectLineMeasurement3D")
        ], DirectLineMeasurement3D);
        return DirectLineMeasurement3D;
    }(decorators_1.declared(Widget)));
    return DirectLineMeasurement3D;
});
//# sourceMappingURL=DirectLineMeasurement3D.js.map