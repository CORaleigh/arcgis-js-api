/**
 * The DistanceMeasurement2D widget calculates and displays the distance between two or more points
 * in a {@link module:esri/views/MapView}. When the distance is less
 * than 100 km, the default {@link module:esri/widgets/DistanceMeasurement2D/DistanceMeasurement2DViewModel#mode mode}
 * is `planar`. When the distance is greater than or equal to 100 km, the default
 * {@link module:esri/widgets/DistanceMeasurement2D/DistanceMeasurement2DViewModel#mode mode} is `geodesic`.
 *
 * [![measurement-line-2d](../../assets/img/apiref/widgets/DistanceMeasurement2D_screenshot.png)](../sample-code/widgets-measurement-2d/index.html)
 *
 * ### Undo / Redo
 *
 * Gesture | Action |
 * ---------|---------|
 * Z | Incrementally undos actions recorded in the stack. |
 * R | Incrementally redos actions recorded in the stack. |
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * This widget is designed to work with 2D MapViews. For measurements with 3D SceneViews, use
 * {@link module:esri/widgets/DirectLineMeasurement3D}
 *
 * :::
 *
 * @example
 *
 * // To add the DistanceMeasurement2D widget to the map
 * var measurementWidget = new DistanceMeasurement2D({
 *   view: view
 * });
 * view.ui.add(measurementWidget, "top-right");
 *
 * @module esri/widgets/DistanceMeasurement2D
 * @since 4.10
 *
 * @see [DistanceMeasurement2D.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/DistanceMeasurement2D.tsx)
 * @see [DistanceMeasurement2D.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_DirectLineMeasurement3D.scss)
 * @see [Sample - Measurement in 2D](../sample-code/widgets-measurement-2d/index.html)
 * @see {@link module:esri/widgets/DistanceMeasurement2D/DistanceMeasurement2DViewModel}
 * @see {@link module:esri/widgets/AreaMeasurement2D}
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/widgets/DistanceMeasurement2D/nls/DistanceMeasurement2D", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/DistanceMeasurement2D/DistanceMeasurement2DViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18n, decorators_1, Widget, DistanceMeasurement2DViewModel, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var CSS = {
        // common
        button: "esri-button esri-button--secondary",
        buttonDisabled: "esri-button--disabled",
        widgetIcon: "esri-icon-description",
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
    var DistanceMeasurement2D = /** @class */ (function (_super) {
        __extends(DistanceMeasurement2D, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @alias module:esri/widgets/DistanceMeasurement2D
         * @extends module:esri/widgets/Widget
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of
         *                                all the properties that may be passed into the constructor.
         * @example
         *
         * // To add the DistanceMeasurement2D widget to the map
         * var measurementWidget = new DistanceMeasurement2D({
         *   view: view
         * });
         * view.ui.add(measurementWidget, "top-right");
         */
        function DistanceMeasurement2D(params) {
            var _this = _super.call(this) || this;
            //----------------------------------
            //  iconClass
            //----------------------------------
            /**
             * The widget's default CSS icon class.
             *
             * @name iconClass
             * @instance
             * @type {string}
             */
            _this.iconClass = CSS.widgetIcon;
            //----------------------------------
            //  label
            //----------------------------------
            /**
             * The widget's default label.
             *
             * @name label
             * @instance
             * @type {string}
             */
            _this.label = i18n.title;
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
             * @type {string}
             * @tstype "metric" | "imperial" | "inches" | "feet" | "us-feet" | "yards" | "miles" | "nautical-miles" | "meters" | "kilometers"
             * @example
             *
             * // To create the DistanceMeasurement2D widget that displays distance in yards
             * var measurementWidget = new DistanceMeasurement2D({
             *   view: view,
             *   unit: "yards"
             * });
             *
             * // To display the current measurement unit
             * console.log('Current unit: ', measurementWidget.unit);
             */
            _this.unit = null;
            //----------------------------------
            //  unitOptions
            //----------------------------------
            /**
             * List of available units and unit systems (imperial, metric) for displaying the distance values.
             * By default, the following units are included: `metric`, `imperial`, `inches`, `feet`, `us-feet`, `yards`, `miles`, `nautical-miles`, `meters`, `kilometers`.
             *
             * @name unitOptions
             * @instance
             * @type {string[]}
             * @example
             *
             * // To display the available units to the console
             * var measurementWidget = new DistanceMeasurement2D({
             *   view: view
             * });
             * console.log('All units: ', measurementWidget.unitOptions.join(", "));
             */
            _this.unitOptions = null;
            //----------------------------------
            //  view
            //----------------------------------
            /**
             * A reference to the {@link module:esri/views/MapView}. Set this to link the widget
             * to a specific view.
             *
             * @name view
             * @instance
             * @type {module:esri/views/MapView}
             * @example
             *
             * // Typical usage
             * var measurementWidget = new DistanceMeasurement2D({
             *   view: view
             * });
             * view.ui.add(measurementWidget, "top-right");
             */
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            /**
             * The view model for this widget. This is a class that contains all the logic
             * (properties and methods) that controls this widget's behavior. See the
             * {@link module:esri/widgets/DistanceMeasurement2D/DistanceMeasurement2DViewModel}
             * class to access all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/DistanceMeasurement2D/DistanceMeasurement2DViewModel}
             * @autocast
             * @example
             *
             * // Use the ViewModel to access and set advanced settings
             * var measurementWidget = new DistanceMeasurement2D({
             *   viewModel: {
             *     view: view,
             *     mode: "planar",
             *     unit: "feet"
             *   }
             * });
             * view.ui.add(measurementWidget, "top-right");
             */
            _this.viewModel = new DistanceMeasurement2DViewModel();
            return _this;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        DistanceMeasurement2D.prototype.render = function () {
            var _this = this;
            var isSupported = this.viewModel.isSupported;
            var isActive = this.viewModel.active;
            var isDisabled = this.viewModel.state === "disabled";
            var isReady = this.viewModel.state === "ready";
            var isMeasuring = this.viewModel.state === "measuring" || this.viewModel.state === "measured";
            var label = this.viewModel.measurementLabel;
            var hintNode = isActive && isReady ? (widget_1.tsx("section", { key: "hint", class: CSS.hint },
                widget_1.tsx("p", { class: CSS.hintText }, i18n.hint))) : null;
            var unsupportedNode = !isSupported ? (widget_1.tsx("section", { key: "unsupported", class: CSS.panelError },
                widget_1.tsx("p", null, i18n.unsupported))) : null;
            var measurementLabelNode = function (title, value, key) {
                return value ? (widget_1.tsx("div", { key: key + "-enabled", class: CSS.measurementItem },
                    widget_1.tsx("span", { class: CSS.measurementItemTitle }, title),
                    widget_1.tsx("span", { class: CSS.measurementItemValue }, value))) : (widget_1.tsx("div", { key: key + "-disabled", class: _this.classes(CSS.measurementItem, CSS.measurementItemDisabled), "aria-disabled": "true" },
                    widget_1.tsx("span", { class: CSS.measurementItemTitle }, title)));
            };
            var measurementNode = isMeasuring ? (widget_1.tsx("section", { key: "measurement", class: CSS.measurement }, measurementLabelNode(i18n.distance, label, "distance"))) : null;
            var unitsId = this.id + "-units";
            var unitsNode = isMeasuring ? (widget_1.tsx("section", { key: "units", class: CSS.units },
                widget_1.tsx("label", { class: CSS.unitsLabel, for: unitsId }, i18n.unit),
                widget_1.tsx("div", { class: CSS.unitsSelectWrapper },
                    widget_1.tsx("select", { class: CSS.unitsSelect, id: unitsId, onchange: this._changeUnit, bind: this, value: this.viewModel.unit }, this.viewModel.unitOptions.map(function (unit) { return (widget_1.tsx("option", { key: unit, value: unit }, i18n.units[unit])); }))))) : null;
            var modesId = this.id + "-modes";
            var modesNode = isMeasuring ? (widget_1.tsx("section", { key: "modes", class: CSS.units },
                widget_1.tsx("label", { class: CSS.unitsLabel, for: modesId }, i18n.mode),
                widget_1.tsx("div", { class: CSS.unitsSelectWrapper },
                    widget_1.tsx("select", { class: CSS.unitsSelect, id: modesId, onchange: this._changeMode, bind: this, value: this.viewModel.mode }, this.viewModel.modes.map(function (mode) { return (widget_1.tsx("option", { key: mode, value: mode }, i18n.modes[mode])); }))))) : null;
            var settingsNode = isMeasuring ? (widget_1.tsx("div", { key: "settings", class: CSS.settings },
                unitsNode,
                modesNode)) : null;
            var newMeasurementNode = isSupported && (!isActive || isMeasuring) ? (widget_1.tsx("div", { class: CSS.actionSection },
                widget_1.tsx("button", { disabled: isDisabled, class: this.classes(CSS.button, CSS.clearButton, isDisabled && CSS.buttonDisabled), bind: this, onclick: this._newMeasurement, title: i18n.newMeasurement, "aria-label": i18n.newMeasurement }, i18n.newMeasurement))) : null;
            var containerNode = this.visible ? (widget_1.tsx("div", { class: CSS.container },
                unsupportedNode,
                hintNode,
                settingsNode,
                measurementNode,
                newMeasurementNode)) : null;
            return widget_1.tsx("div", { class: CSS.base }, containerNode);
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        /**
         * Starts a new measurement.
         * @private
         */
        DistanceMeasurement2D.prototype._newMeasurement = function () {
            this.viewModel.newMeasurement();
        };
        /**
         * Called when the user selects a new linear unit from the dropdown menu.
         * @private
         */
        DistanceMeasurement2D.prototype._changeUnit = function (event) {
            var target = event.target;
            var selected = target.options[target.selectedIndex];
            if (selected) {
                this.viewModel.unit = selected.value;
            }
        };
        /**
         * Called when the user selects a new computational mode from the dropdown menu.
         * @private
         */
        DistanceMeasurement2D.prototype._changeMode = function (event) {
            var target = event.target;
            var selected = target.options[target.selectedIndex];
            if (selected) {
                this.viewModel.mode = selected.value;
            }
        };
        __decorate([
            decorators_1.aliasOf("viewModel.active"),
            widget_1.renderable()
        ], DistanceMeasurement2D.prototype, "active", void 0);
        __decorate([
            decorators_1.property()
        ], DistanceMeasurement2D.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], DistanceMeasurement2D.prototype, "label", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.unit")
        ], DistanceMeasurement2D.prototype, "unit", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.unitOptions")
        ], DistanceMeasurement2D.prototype, "unitOptions", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], DistanceMeasurement2D.prototype, "view", void 0);
        __decorate([
            decorators_1.property({
                type: DistanceMeasurement2DViewModel
            }),
            widget_1.renderable([
                "viewModel.state",
                "viewModel.unitOptions",
                "viewModel.unit",
                "viewModel.measurementLabel"
            ])
        ], DistanceMeasurement2D.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.visible"),
            widget_1.renderable()
        ], DistanceMeasurement2D.prototype, "visible", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], DistanceMeasurement2D.prototype, "_newMeasurement", null);
        __decorate([
            widget_1.accessibleHandler()
        ], DistanceMeasurement2D.prototype, "_changeUnit", null);
        __decorate([
            widget_1.accessibleHandler()
        ], DistanceMeasurement2D.prototype, "_changeMode", null);
        DistanceMeasurement2D = __decorate([
            decorators_1.subclass("esri.widgets.DistanceMeasurement2D")
        ], DistanceMeasurement2D);
        return DistanceMeasurement2D;
    }(decorators_1.declared(Widget)));
    return DistanceMeasurement2D;
});
//# sourceMappingURL=DistanceMeasurement2D.js.map