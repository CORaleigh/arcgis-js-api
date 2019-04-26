/**
 * The Legend widget displays labels and symbols for layers in a map.
 * Labels and their corresponding symbols depend on the values set in the
 * {@link module:esri/renderers/Renderer} of the layer.
 * The legend will only display layers and sublayers that are
 * visible in the view.
 *
 * The legend automatically updates when
 *  - the visibility of a layer or sublayer changes
 *  - a layer is added or removed from the map
 *  - a layer's `renderer`, `opacity`, or `title` is changed
 *  - the `legendEnabled` property is changed (set to `true` or `false` on the layer)
 *
 * [![widgets-legend-basic](../../assets/img/apiref/widgets/widgets-legend-basic.png)](../sample-code/sandbox/sandbox.html?sample=widgets-legend)
 *
 * You can use the view's {@link module:esri/views/ui/DefaultUI} to add widgets
 * to the view's user interface via the {@link module:esri/views/View#ui ui} property on the view.
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * * Currently, the legend widget does not support the following layer types:
 * {@link module:esri/layers/ElevationLayer},
 * {@link module:esri/layers/IntegratedMeshLayer},
 * {@link module:esri/layers/KMLLayer},
 * {@link module:esri/layers/OpenStreetMapLayer},
 * {@link module:esri/layers/GraphicsLayer},
 * {@link module:esri/layers/GeoRSSLayer},
 * {@link module:esri/layers/VectorTileLayer}, and
 * {@link module:esri/layers/WebTileLayer}
 * * {@link module:esri/symbols/Symbol3D  3D symbols} with more than one
 * {@link module:esri/symbols/Symbol3DLayer symbol layer} are not supported.
 * :::
 *
 * @example
 * var legend = new Legend({
 *   view: view,
 *   layerInfos: [{
 *     layer: featureLayer,
 *     title: "Legend"
 *   }]
 * });
 *
 * view.ui.add(legend, "bottom-right");
 *
 * @module esri/widgets/Legend
 * @since 4.0
 *
 * @see [Sample - Legend widget](../sample-code/widgets-legend/index.html)
 * @see [Legend.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Legend.tsx)
 * @see [Legend.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Legend.scss)
 * @see {@link module:esri/views/View#ui View.ui}
 * @see module:esri/views/ui/DefaultUI
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
define(["require", "exports", "esri/core/tsSupport/assignHelper", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/widgets/Legend/nls/Legend", "esri/core/Handles", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/core/accessorSupport/decorators/cast", "esri/widgets/Widget", "esri/widgets/Legend/LegendViewModel", "esri/widgets/Legend/styles/Card", "esri/widgets/Legend/styles/Classic", "esri/widgets/support/widget"], function (require, exports, __assign, __extends, __decorate, i18n, Handles, watchUtils, decorators_1, cast_1, Widget, LegendViewModel, Card, Classic, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var CSS = {
        widgetIcon: "esri-icon-layer-list"
    };
    var Legend = /** @class */ (function (_super) {
        __extends(Legend, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @extends module:esri/widgets/Widget
         * @constructor
         * @alias module:esri/widgets/Legend
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * var legend = new Legend({
         *   view: view
         * });
         */
        function Legend(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._handles = new Handles();
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  activeLayerInfos
            //----------------------------------
            /**
             * Collection of {@link module:esri/widgets/Legend/support/ActiveLayerInfo} objects used by the legend view to
             * display data in the legend. The legend widget watches this property to hide or display the layer's legend when
             * an {@link module:esri/widgets/Legend/support/ActiveLayerInfo} is removed from or added to this collection.
             *
             * @name activeLayerInfos
             * @instance
             *
             * @type {module:esri/core/Collection<module:esri/widgets/Legend/support/ActiveLayerInfo>}
             * @autocast { "value": "Object[]" }
             */
            _this.activeLayerInfos = null;
            //----------------------------------
            //  basemapLegendVisible
            //----------------------------------
            /**
             * boolean that tells to show the basemaps or not in the legend
             *
             * @type {boolean}
             * @default false
             * @private
             */
            _this.basemapLegendVisible = false;
            //----------------------------------
            //  groundLegendVisible
            //----------------------------------
            /**
             * boolean that tells to show the ground layers or not in the legend
             *
             * @type {boolean}
             * @default false
             * @private
             */
            _this.groundLegendVisible = false;
            //----------------------------------
            //  iconClass
            //----------------------------------
            /**
             * The widget's default CSS icon class.
             *
             * @since 4.7
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
             * @since 4.7
             * @name label
             * @instance
             * @type {string}
             */
            _this.label = i18n.widgetLabel;
            //----------------------------------
            //  layerInfos
            //----------------------------------
            /**
             * Specifies a subset of the layers to display in the legend.
             * If this property is not set, all layers in the map will display in the legend.
             * Objects in this array are defined with the properties listed below.
             *
             * @name layerInfos
             * @instance
             *
             * @type {Object[]}
             *
             * @property {string} [title] - Specifies a title for the layer to display above its symbols and descriptions.
             * If no title is specified the service name is used.
             * @property {module:esri/layers/Layer} layer - A layer to display in the legend.
             * @todo @property {boolean} [defaultSymbol=true] - When `false`, the default symbol for the renderer will
             * not display in the legend. Only applicable to
             * {@link module:esri/layers/FeatureLayer}.
             * @todo @property {number[]} hideLayers -  List of sublayer ids that will not be displayed in the legend
             *                                    even if they are visible in the map.
             */
            _this.layerInfos = null;
            //----------------------------------
            //  style
            //----------------------------------
            /**
             * Indicates the style of the legend. The style determines the legend's layout and behavior.
             * You can either specify a string or an object to indicate the style. The known string values are the same values listed in
             * the table within the `type` property.
             *
             * @property {string} type - Specifies the style of the legend. There are two possible values listed in the table below:
             *
             * Value | Description
             * ------|------------
             * classic | The legend has a portrait orientation. The user can scroll vertically when many elements are included in the legend's content.
             * card | In wide views, the legend has a landscape orientation that allows users to scroll horizontally to view all legend elements. This style can be responsive, making it ideal for mobile web apps. In smaller views, the legend collapses to occupy less space. One element is shown at a time in a card-style layout, which the user can navigate horizontally.
             *
             * @property {string} [layout=stack] - When a `card` type is specified, you can specify one of the following layout options.
             *
             * Value | Description
             * ------|------------
             * auto | This layout is responsive so that in wide views the legend has a `side-by-side` layout, and a `stack` layout in smaller (mobile) views.
             * side-by-side | The legend has a landscape orientation that allows users to scroll horizontally to view multiple legend cards at a time.
             * stack | The legend cards are stacked, which conserves space, but restricts the user to seeing only one card at a time.
             *
             * @name style
             * @instance
             * @type {Object | string}
             * @default classic
             * @since 4.7
             *
             * @example
             * // renders the legend in the card style with a "stack" layout
             * legend.style = "card";
             *
             * @example
             * // renders the legend in the card style with a responsive
             * // layout that toggles between "stack" and "side-by-side"
             * legend.style = {
             *   type: "card",
             *   layout: "auto"
             * };
             *
             * @example
             * // renders the legend in the classic layout
             * legend.style = "classic";
             */
            _this.style = new Classic();
            //----------------------------------
            //  view
            //----------------------------------
            /**
             * A reference to the {@link module:esri/views/MapView} or {@link module:esri/views/SceneView}. Set this to link the widget to a specific view.
             *
             * @name view
             * @instance
             *
             * @type {module:esri/views/MapView | module:esri/views/SceneView}
             */
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            /**
             * The view model for this widget. This is a class that contains all the logic
             * (properties and methods) that controls this widget's behavior. See the
             * {@link module:esri/widgets/Legend/LegendViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             *
             * @type {module:esri/widgets/Legend/LegendViewModel}
             * @autocast
             */
            _this.viewModel = new LegendViewModel();
            return _this;
        }
        Legend.prototype.postInitialize = function () {
            var _this = this;
            this.own(watchUtils.on(this, "activeLayerInfos", "change", function () {
                return _this._refreshActiveLayerInfos(_this.activeLayerInfos);
            }), watchUtils.init(this, "style", function (value, oldValue) {
                if (oldValue && value !== oldValue) {
                    oldValue.destroy();
                }
                if (value) {
                    value.activeLayerInfos = _this.activeLayerInfos;
                    if (value.type === "card") {
                        value.view = _this.view;
                    }
                }
            }));
        };
        Legend.prototype.destroy = function () {
            this._handles.destroy();
            this._handles = null;
        };
        Legend.prototype.castStyle = function (value) {
            if (value instanceof Card || value instanceof Classic) {
                return value;
            }
            if (typeof value === "string") {
                return value === "card" ? new Card() : new Classic();
            }
            if (value && typeof value.type === "string") {
                var options = __assign({}, value);
                delete options.type;
                var StyleClass = value.type === "card" ? Card : Classic;
                return new StyleClass(options);
            }
            return new Classic();
        };
        //-------------------------------------------------------------------
        //
        //  Public methods
        //
        //-------------------------------------------------------------------
        Legend.prototype.render = function () {
            return this.style.render();
        };
        //--------------------------------------------------------------------------
        //
        //  Private methods
        //
        //-------------------------------------------------------------------
        Legend.prototype._refreshActiveLayerInfos = function (activeLayerInfos) {
            var _this = this;
            this._handles.removeAll();
            activeLayerInfos.forEach(function (activeLayerInfo) {
                return _this._renderOnActiveLayerInfoChange(activeLayerInfo);
            });
            this.scheduleRender();
        };
        Legend.prototype._renderOnActiveLayerInfoChange = function (activeLayerInfo) {
            var _this = this;
            var infoVersionHandle = watchUtils.init(activeLayerInfo, "version", function () {
                return _this.scheduleRender();
            });
            this._handles.add(infoVersionHandle, "version_" + activeLayerInfo.layer.uid);
            activeLayerInfo.children.forEach(function (childActiveLayerInfo) {
                return _this._renderOnActiveLayerInfoChange(childActiveLayerInfo);
            });
        };
        __decorate([
            decorators_1.aliasOf("viewModel.activeLayerInfos"),
            widget_1.renderable()
        ], Legend.prototype, "activeLayerInfos", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.basemapLegendVisible"),
            widget_1.renderable()
        ], Legend.prototype, "basemapLegendVisible", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.groundLegendVisible"),
            widget_1.renderable()
        ], Legend.prototype, "groundLegendVisible", void 0);
        __decorate([
            decorators_1.property()
        ], Legend.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], Legend.prototype, "label", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.layerInfos"),
            widget_1.renderable()
        ], Legend.prototype, "layerInfos", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], Legend.prototype, "style", void 0);
        __decorate([
            cast_1.cast("style")
        ], Legend.prototype, "castStyle", null);
        __decorate([
            decorators_1.aliasOf("viewModel.view"),
            widget_1.renderable()
        ], Legend.prototype, "view", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable(["view.size"])
        ], Legend.prototype, "viewModel", void 0);
        Legend = __decorate([
            decorators_1.subclass("esri.widgets.Legend")
        ], Legend);
        return Legend;
    }(decorators_1.declared(Widget)));
    return Legend;
});
//# sourceMappingURL=Legend.js.map