/**
 * The ScaleBar widget displays a scale bar on the map or in a specified HTML node.
 * The widget respects various coordinate systems and displays units in metric or non-metric values.
 * Metric values shows either kilometers or meters depending on the scale, and likewise non-metric values shows miles and feet depending on the scale.
 * When working with Web Mercator or geographic coordinate systems the scale bar takes into account projection distortion and dynamically adjusts the scale bar.
 * The ScaleBar sample, which uses a map using the Web Mercator projection, shows this behavior.
 * Open the sample and note that as you pan the map south towards the equator the scale bar gets shorter and as you pan north it gets longer.
 *
 * When the scale bar is inside the map, the actual location of the scale bar is used to calculate the scale.
 * Otherwise, the center of the map is used to calculate the scale.
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * ScaleBar only works with {@link module:esri/views/MapView}.
 * :::
 *
 *
 * @module esri/widgets/ScaleBar
 * @since 4.3
 *
 * @see [ScaleBar.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/ScaleBar.tsx)
 * @see [ScaleBar.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_ScaleBar.scss)
 * @see [Sample - ScaleBar widget](../sample-code/widgets-scalebar/index.html)
 * @see module:esri/widgets/ScaleBar/ScaleBarViewModel
 *
 * @example
 * var scaleBar = new ScaleBar({
 *   view: view
 * });
 * // Add widget to the bottom left corner of the view
 * view.ui.add(scaleBar, {
 *   position: "bottom-left"
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/dom-geometry", "dojo/i18n!esri/widgets/ScaleBar/nls/ScaleBar", "esri/core/screenUtils", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/ScaleBar/ScaleBarViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, domGeometry, i18n, screenUtils_1, watchUtils_1, decorators_1, Widget, ScaleBarViewModel, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var CSS = {
        base: "esri-scale-bar esri-widget",
        labelContainer: "esri-scale-bar__label-container",
        rulerLabelContainer: "esri-scale-bar__label-container--ruler",
        lineLabelContainer: "esri-scale-bar__label-container--line",
        label: "esri-scale-bar__label",
        line: "esri-scale-bar__line",
        topLine: "esri-scale-bar__line--top",
        bottomLine: "esri-scale-bar__line--bottom",
        ruler: "esri-scale-bar__ruler",
        rulerBlock: "esri-scale-bar__ruler-block",
        barContainer: "esri-scale-bar__bar-container",
        rulerBarContainer: "esri-scale-bar__bar-container--ruler",
        lineBarContainer: "esri-scale-bar__bar-container--line",
        // common
        disabled: "esri-disabled"
    };
    function double(value) {
        return 2 * value;
    }
    var ScaleBar = /** @class */ (function (_super) {
        __extends(ScaleBar, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @extends module:esri/widgets/Widget
         * @constructor
         * @alias module:esri/widgets/ScaleBar
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * var scalebar = new ScaleBar({
         *   view: view
         * });
         */
        function ScaleBar(params) {
            var _this = _super.call(this) || this;
            //----------------------------------
            //  unit
            //----------------------------------
            /**
             * Units to use for the scale bar.
             * When using `dual`, the scale bar displays both metric and non-metric units.
             * Metric values show either kilometers or meters depending on the scale, and non-metric values show either miles or feet depending on the scale.
             *
             * **Possible Values:** non-metric | metric | dual
             *
             * @name unit
             * @instance
             * @type {string}
             * @default non-metric
             */
            _this.unit = "non-metric";
            //----------------------------------
            //  view
            //----------------------------------
            /**
             * A reference to the {@link module:esri/views/MapView}. Set this to link
             * the widget to a specific view.
             *
             * @name view
             * @instance
             *
             * @type {module:esri/views/MapView}
             */
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            /**
             * The view model for this widget. This is a class that contains all the logic
             * (properties and methods) that controls this widget's behavior. See the
             * {@link module:esri/widgets/ScaleBar/ScaleBarViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/ScaleBar/ScaleBarViewModel}
             * @autocast
             */
            _this.viewModel = new ScaleBarViewModel();
            return _this;
        }
        ScaleBar.prototype.postInitialize = function () {
            var _this = this;
            this.own([watchUtils_1.whenTrue(this, "view.stationary", function () { return _this.scheduleRender(); })]);
        };
        Object.defineProperty(ScaleBar.prototype, "style", {
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  style
            //----------------------------------
            /**
             * The style for the scale bar.
             * When `unit` is set to `dual`, the style will always be `line`.
             *
             * **Possible Values:** ruler | line
             *
             * @name style
             * @instance
             * @type {string}
             */
            set: function (value) {
                // ruler + dual not allowed
                var style = this.unit === "dual" ? "line" : value;
                this._set("style", style);
            },
            enumerable: true,
            configurable: true
        });
        ScaleBar.prototype.castStyle = function (value) {
            return value === "line" ? value : "ruler";
        };
        ScaleBar.prototype.castUnit = function (value) {
            return value === "metric" || value === "dual" ? value : "non-metric";
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        ScaleBar.prototype.render = function () {
            var _a;
            var isDisabled = this.get("viewModel.state") === "disabled";
            var baseClasses = (_a = {},
                _a[CSS.disabled] = isDisabled,
                _a);
            var metricScaleBar;
            var nonMetricScaleBar;
            if (!isDisabled) {
                var _b = this, unit = _b.unit, style = _b.style;
                var useNonMetric = unit === "non-metric" || unit === "dual";
                var useMetric = unit === "metric" || unit === "dual";
                var baseLengthInPixels = 50;
                if (useNonMetric) {
                    var nonMetricScale = this.viewModel.getScaleBarProperties(baseLengthInPixels, "non-metric");
                    if (nonMetricScale) {
                        nonMetricScaleBar =
                            style === "ruler"
                                ? this._renderRuler(nonMetricScale)
                                : this._renderLine(nonMetricScale, "bottom");
                    }
                }
                if (useMetric) {
                    var metricScale = this.viewModel.getScaleBarProperties(baseLengthInPixels, "metric");
                    if (metricScale) {
                        metricScaleBar =
                            style === "ruler"
                                ? this._renderRuler(metricScale)
                                : this._renderLine(metricScale, "top");
                    }
                }
            }
            return (widget_1.tsx("div", { afterCreate: this._handleRootCreation, bind: this, class: this.classes(CSS.base, baseClasses) },
                metricScaleBar,
                nonMetricScaleBar));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        ScaleBar.prototype._renderRuler = function (scaleBarProps) {
            var length = double(Math.round(scaleBarProps.length));
            var unit = i18n[scaleBarProps.unit] || i18n.unknownUnit;
            var unitLabel = double(scaleBarProps.value) + " " + unit;
            return (widget_1.tsx("div", { class: this.classes(CSS.barContainer, CSS.rulerBarContainer), key: "esri-scale-bar__ruler" },
                widget_1.tsx("div", { class: CSS.ruler, styles: { width: length + "px" } },
                    widget_1.tsx("div", { class: CSS.rulerBlock }),
                    widget_1.tsx("div", { class: CSS.rulerBlock }),
                    widget_1.tsx("div", { class: CSS.rulerBlock }),
                    widget_1.tsx("div", { class: CSS.rulerBlock })),
                widget_1.tsx("div", { class: this.classes(CSS.labelContainer, CSS.rulerLabelContainer) },
                    widget_1.tsx("div", { class: CSS.label }, "0"),
                    widget_1.tsx("div", { class: CSS.label }, scaleBarProps.value),
                    widget_1.tsx("div", { class: CSS.label }, unitLabel))));
        };
        ScaleBar.prototype._renderLine = function (scaleBarProps, labelPosition) {
            var _a;
            var unit = i18n[scaleBarProps.unit] || i18n.unknownUnit;
            var unitLabel = double(scaleBarProps.value) + " " + unit;
            var label = (widget_1.tsx("div", { class: this.classes(CSS.labelContainer, CSS.lineLabelContainer), key: "esri-scale-bar__label" },
                widget_1.tsx("div", { class: CSS.label }, unitLabel)));
            var lineClasses = (_a = {},
                _a[CSS.topLine] = labelPosition === "top",
                _a[CSS.bottomLine] = labelPosition === "bottom",
                _a);
            var length = double(Math.round(scaleBarProps.length));
            var line = (widget_1.tsx("div", { class: this.classes(CSS.line, lineClasses), key: "esri-scale-bar__line", styles: { width: length + "px" } }));
            return (widget_1.tsx("div", { class: this.classes(CSS.barContainer, CSS.lineBarContainer), key: "esri-scale-bar__line-container" }, [line, label]));
        };
        ScaleBar.prototype._handleRootCreation = function (node) {
            var vm = this.viewModel;
            if (vm) {
                var _a = domGeometry.position(node, true), x = _a.x, y = _a.y;
                vm.scaleComputedFrom = screenUtils_1.createScreenPoint(x, y);
            }
        };
        __decorate([
            decorators_1.property({
                dependsOn: ["unit"]
            }),
            widget_1.renderable()
        ], ScaleBar.prototype, "style", null);
        __decorate([
            decorators_1.cast("style")
        ], ScaleBar.prototype, "castStyle", null);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], ScaleBar.prototype, "unit", void 0);
        __decorate([
            decorators_1.cast("unit")
        ], ScaleBar.prototype, "castUnit", null);
        __decorate([
            decorators_1.aliasOf("viewModel.view"),
            widget_1.renderable()
        ], ScaleBar.prototype, "view", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable(["viewModel.state"])
        ], ScaleBar.prototype, "viewModel", void 0);
        ScaleBar = __decorate([
            decorators_1.subclass("esri.widgets.ScaleBar")
        ], ScaleBar);
        return ScaleBar;
    }(decorators_1.declared(Widget)));
    return ScaleBar;
});
//# sourceMappingURL=ScaleBar.js.map