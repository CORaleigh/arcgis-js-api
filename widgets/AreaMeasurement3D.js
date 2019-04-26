/**
 * The AreaMeasurement3D widget calculates and displays the area and perimeter of a polygon.
 * This widget can be used in a {@link module:esri/views/SceneView} to measure the area and perimeter of a polygon.
 *
 * [![measurement-line-3d](../../assets/img/apiref/widgets/area-measurement-3d.png)](../sample-code/widgets-measurement-3d/index.html)
 *
 * When the widget is active, a horizontal "laser" line is drawn which indicates the height at the current mouse position.
 * This line can help in analyzing the heights of objects relative to each other and the terrain.
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * This widget is designed to work with 3D SceneViews. For measurements with 2D MapViews, use
 * {@link module:esri/widgets/AreaMeasurement2D}.
 *
 * :::
 *
 * @example
 * var measurementWidget = new AreaMeasurement3D({
 *   view: view
 * });
 *
 * view.ui.add(measurementWidget, "top-right");
 *
 * @module esri/widgets/AreaMeasurement3D
 * @since 4.7
 *
 * @see [AreaMeasurement3D.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/AreaMeasurement3D.tsx)
 * @see [AreaMeasurement3D.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_AreaMeasurement3D.scss)
 * @see [Sample - Measurement in 3D](../sample-code/widgets-measurement-3d/index.html)
 * @see {@link module:esri/widgets/AreaMeasurement3D/AreaMeasurement3DViewModel}
 * @see {@link module:esri/widgets/DirectLineMeasurement3D}
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/widgets/AreaMeasurement3D/nls/AreaMeasurement3D", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/AreaMeasurement3D/AreaMeasurement3DViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18n, decorators_1, Widget, AreaMeasurement3DViewModel, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var CSS = {
        // common
        button: "esri-button esri-button--secondary",
        buttonDisabled: "esri-button--disabled",
        // base
        base: "esri-area-measurement-3d esri-widget esri-widget--panel",
        // container
        container: "esri-area-measurement-3d__container",
        // hint
        hint: "esri-area-measurement-3d__hint",
        hintText: "esri-area-measurement-3d__hint-text",
        panelError: "esri-area-measurement-3d__panel--error",
        // measurement
        measurement: "esri-area-measurement-3d__measurement",
        measurementItem: "esri-area-measurement-3d__measurement-item",
        measurementItemDisabled: "esri-area-measurement-3d__measurement-item--disabled",
        measurementItemTitle: "esri-area-measurement-3d__measurement-item-title",
        measurementItemValue: "esri-area-measurement-3d__measurement-item-value",
        // units
        settings: "esri-area-measurement-3d__settings",
        units: "esri-area-measurement-3d__units",
        unitsLabel: "esri-area-measurement-3d__units-label",
        unitsSelect: "esri-area-measurement-3d__units-select esri-select",
        unitsSelectWrapper: "esri-area-measurement-3d__units-select-wrapper",
        // clear
        actionSection: "esri-area-measurement-3d__actions",
        clearButton: "esri-area-measurement-3d__clear-button"
    };
    var AreaMeasurement3D = /** @class */ (function (_super) {
        __extends(AreaMeasurement3D, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @alias module:esri/widgets/AreaMeasurement3D
         * @extends module:esri/widgets/Widget
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * var measurementWidget = new AreaMeasurement3D({
         *   view: view
         * });
         */
        function AreaMeasurement3D(params) {
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
             * {@link module:esri/widgets/AreaMeasurement3D/AreaMeasurement3DViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/AreaMeasurement3D/AreaMeasurement3DViewModel}
             * @autocast
             */
            _this.viewModel = new AreaMeasurement3DViewModel();
            //----------------------------------
            //  unitOptions
            //----------------------------------
            /**
             * List of available units and unit systems (imperial, metric) for displaying the area values.
             * By default, the following units are included: `metric`, `imperial`, `square-inches`, `square-feet`, `square-us-feet`, `square-yards`, `square-miles`, `square-meters`, `square-kilometers`, `acres`, `ares`, `hectares`.
             *
             * @name unitOptions
             * @instance
             * @type {string[]}
             */
            _this.unitOptions = null;
            //----------------------------------
            //  unit
            //----------------------------------
            /**
             * Unit system (imperial, metric) or specific unit used for displaying the area values.
             *
             * **Possible Values:** metric | imperial | square-inches | square-feet | square-us-feet | square-yards | square-miles | square-meters | square-kilometers | acres | ares | hectares
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
        AreaMeasurement3D.prototype.render = function () {
            var _this = this;
            var isSupported = this.viewModel.isSupported;
            var isActive = this.viewModel.active;
            var isDisabled = this.viewModel.state === "disabled";
            var isReady = this.viewModel.state === "ready";
            var isMeasuring = this.viewModel.state === "measuring" || this.viewModel.state === "measured";
            var measurement = this.viewModel.measurement;
            var hintNode = isActive && isReady ? (widget_1.tsx("section", { key: "esri-area-measurement-3d__hint", class: CSS.hint },
                widget_1.tsx("p", { class: CSS.hintText }, i18n.hint))) : null;
            var unsupportedNode = !isSupported ? (widget_1.tsx("section", { key: "esri-area-measurement-3d__unsupported", class: CSS.panelError },
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
                    case "invalid":
                        return (widget_1.tsx("div", { key: key + "-enabled", class: CSS.measurementItem },
                            widget_1.tsx("span", { class: CSS.measurementItemTitle }, title),
                            widget_1.tsx("span", { class: CSS.measurementItemValue }, i18n.notApplicable)));
                }
            };
            var measurementNode = isMeasuring ? (widget_1.tsx("section", { key: "esri-area-measurement-3d__measurement", class: CSS.measurement },
                measurementLabelNode(i18n.area, measurement.area, "area"),
                measurementLabelNode(i18n.perimeterLength, measurement.perimeterLength, "perimeter-length"))) : null;
            var unitsId = this.id + "__units";
            var unitsLabelNode = (widget_1.tsx("label", { class: CSS.unitsLabel, for: unitsId }, i18n.unit));
            var unitsSelectNode = (widget_1.tsx("div", { class: CSS.unitsSelectWrapper },
                widget_1.tsx("select", { class: CSS.unitsSelect, id: unitsId, onchange: this._changeUnit, bind: this }, this.viewModel.unitOptions.map(function (unit) {
                    return unit === _this.viewModel.unit ? (widget_1.tsx("option", { key: unit, value: unit, selected: true }, i18n.units[unit])) : (widget_1.tsx("option", { key: unit, value: unit }, i18n.units[unit]));
                }))));
            var unitsNode = isMeasuring ? (widget_1.tsx("section", { key: "esri-area-measurement-3d__units", class: CSS.units },
                unitsLabelNode,
                unitsSelectNode)) : null;
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
        AreaMeasurement3D.prototype._newMeasurement = function () {
            this.viewModel.newMeasurement();
        };
        AreaMeasurement3D.prototype._changeUnit = function (event) {
            var target = event.target;
            var selected = target.options[target.selectedIndex];
            if (selected) {
                this.unit = selected.value;
            }
        };
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], AreaMeasurement3D.prototype, "view", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.visible"),
            widget_1.renderable()
        ], AreaMeasurement3D.prototype, "visible", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.active"),
            widget_1.renderable()
        ], AreaMeasurement3D.prototype, "active", void 0);
        __decorate([
            decorators_1.property({
                type: AreaMeasurement3DViewModel
            }),
            widget_1.renderable([
                "viewModel.state",
                "viewModel.unitOptions",
                "viewModel.unit",
                "viewModel.measurement"
            ])
        ], AreaMeasurement3D.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.unitOptions")
        ], AreaMeasurement3D.prototype, "unitOptions", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.unit")
        ], AreaMeasurement3D.prototype, "unit", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], AreaMeasurement3D.prototype, "_newMeasurement", null);
        __decorate([
            widget_1.accessibleHandler()
        ], AreaMeasurement3D.prototype, "_changeUnit", null);
        AreaMeasurement3D = __decorate([
            decorators_1.subclass("esri.widgets.AreaMeasurement3D")
        ], AreaMeasurement3D);
        return AreaMeasurement3D;
    }(decorators_1.declared(Widget)));
    return AreaMeasurement3D;
});
//# sourceMappingURL=AreaMeasurement3D.js.map