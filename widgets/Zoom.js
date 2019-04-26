/**
 * The Zoom widget allows users to zoom in/out within a view.
 *
 * An instance of the Zoom widget is available in every
 * {@link module:esri/views/MapView} and {@link module:esri/views/SceneView} by default.
 * See {@link module:esri/views/ui/DefaultUI} for details on how to place the Zoom widget
 * in other parts of the view.
 *
 * @example
 * var view = new MapView({
 *    container: "viewDiv",
 *    map: map
 * });
 *
 * var zoom = new Zoom({
 *   view: view
 * });
 *
 * @module esri/widgets/Zoom
 * @since 4.0
 *
 * @see [Zoom.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Zoom.tsx)
 * @see [Zoom.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Zoom.scss)
 * @see module:esri/views/MapView
 * @see module:esri/views/SceneView
 * @see module:esri/widgets/Zoom/ZoomViewModel
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/widgets/Zoom/nls/Zoom", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/Zoom/IconButton", "esri/widgets/Zoom/ZoomViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18n, decorators_1, Widget, IconButton, ZoomViewModel, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var CSS = {
        base: "esri-zoom esri-widget",
        horizontalLayout: "esri-zoom--horizontal",
        zoomInIcon: "esri-icon-plus",
        zoomOutIcon: "esri-icon-minus",
        widgetIcon: "esri-icon-zoom-in-magnifying-glass"
    };
    var Zoom = /** @class */ (function (_super) {
        __extends(Zoom, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @alias module:esri/widgets/Zoom
         * @extends module:esri/widgets/Widget
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         */
        function Zoom(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
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
             * {@link module:esri/widgets/Zoom/ZoomViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/Zoom/ZoomViewModel}
             * @autocast
             */
            _this.viewModel = new ZoomViewModel();
            return _this;
        }
        Zoom.prototype.postInitialize = function () {
            this._zoomInButton = new IconButton({
                action: this.zoomIn,
                iconClass: CSS.zoomInIcon,
                title: i18n.zoomIn
            });
            this._zoomOutButton = new IconButton({
                action: this.zoomOut,
                iconClass: CSS.zoomOutIcon,
                title: i18n.zoomOut
            });
        };
        Object.defineProperty(Zoom.prototype, "layout", {
            //----------------------------------
            //  layout
            //----------------------------------
            /**
             * Determines the layout/orientation of the Zoom widget.
             *
             * **Possible Values:** vertical | horizontal
             *
             * @name layout
             * @since 4.5
             * @instance
             * @default vertical
             * @type {string}
             */
            set: function (value) {
                if (value !== "horizontal") {
                    value = "vertical";
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
        Zoom.prototype.render = function () {
            var _a;
            var vm = this.viewModel;
            var rootClasses = (_a = {},
                _a[CSS.horizontalLayout] = this.layout === "horizontal",
                _a);
            this._zoomInButton.enabled = vm.state === "ready" && vm.canZoomIn;
            this._zoomOutButton.enabled = vm.state === "ready" && vm.canZoomOut;
            return (widget_1.tsx("div", { class: this.classes(CSS.base, rootClasses) },
                this._zoomInButton.render(),
                this._zoomOutButton.render()));
        };
        /**
         * Zooms the view in by an LOD factor of 0.5.
         *
         * @method
         */
        Zoom.prototype.zoomIn = function () { };
        /**
         * Zooms the view out by an LOD factor of 2.
         *
         * @method
         */
        Zoom.prototype.zoomOut = function () { };
        __decorate([
            decorators_1.property()
        ], Zoom.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], Zoom.prototype, "label", void 0);
        __decorate([
            decorators_1.property({
                value: "vertical"
            }),
            widget_1.renderable()
        ], Zoom.prototype, "layout", null);
        __decorate([
            decorators_1.aliasOf("viewModel.view"),
            widget_1.renderable()
        ], Zoom.prototype, "view", void 0);
        __decorate([
            decorators_1.property({
                type: ZoomViewModel
            }),
            widget_1.renderable(["viewModel.canZoomIn", "viewModel.canZoomOut", "viewModel.state"])
        ], Zoom.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.zoomIn")
        ], Zoom.prototype, "zoomIn", null);
        __decorate([
            decorators_1.aliasOf("viewModel.zoomOut")
        ], Zoom.prototype, "zoomOut", null);
        Zoom = __decorate([
            decorators_1.subclass("esri.widgets.Zoom")
        ], Zoom);
        return Zoom;
    }(decorators_1.declared(Widget)));
    return Zoom;
});
//# sourceMappingURL=Zoom.js.map