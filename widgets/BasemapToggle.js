/**
 * The BasemapToggle provides a widget which allows an end-user to switch between
 * two basemaps. The toggled basemap is set inside the [view's](#view)
 * {@link module:esri/views/View#map map} object.
 *
 * ![basemap-toggle](../../assets/img/apiref/widgets/basemap-toggle.png)
 *
 * @module esri/widgets/BasemapToggle
 * @since 4.0
 *
 * @see [BasemapToggle.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/BasemapToggle.tsx)
 * @see [BasemapToggle.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_BasemapToggle.scss)
 * @see [Sample - Intro to widgets using BasemapToggle](../sample-code/intro-widgets/index.html)
 * @see module:esri/widgets/BasemapToggle/BasemapToggleViewModel
 *
 * @example
 * // Create a map with an initial basemap
 * var map = new Map({
 *   basemap: "streets",  // The initial basemap to toggle from
 *   ground: "world-elevation"
 * });
 *
 * // Reference the map in the view instance
 * var view = new SceneView({
 *   container: "viewDiv",
 *   map: map
 * });
 *
 * var basemapToggle = new BasemapToggle({
 *   view: view,  // The view that provides access to the map's "streets" basemap
 *   nextBasemap: "hybrid"  // Allows for toggling to the "hybrid" basemap
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/widgets/BasemapToggle/nls/BasemapToggle", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/BasemapToggle/BasemapToggleViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18n, decorators_1, Widget, BasemapToggleViewModel, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var CSS = {
        base: "esri-basemap-toggle esri-widget",
        secondaryBasemapImage: "esri-basemap-toggle__image--secondary",
        container: "esri-basemap-thumbnail esri-basemap-toggle__container",
        image: "esri-basemap-thumbnail__image esri-basemap-toggle__image",
        overlay: "esri-basemap-thumbnail__overlay esri-basemap-toggle__image-overlay",
        title: "esri-basemap-thumbnail__title esri-basemap-toggle__title",
        // common
        disabled: "esri-disabled"
    };
    function getThumbnailStyles(basemap) {
        var thumbnailUrl = BasemapToggleViewModel.getThumbnailUrl(basemap);
        return thumbnailUrl ? { backgroundImage: "url(" + thumbnailUrl + ")" } : { backgroundImage: "" };
    }
    var BasemapToggle = /** @class */ (function (_super) {
        __extends(BasemapToggle, _super);
        /**
         * Fires after the [toggle()](#toggle) method is called.
         *
         * @event module:esri/widgets/BasemapToggle#toggle
         * @property {module:esri/Basemap} current - The map's current basemap.
         * @property {module:esri/Basemap} previous - The map's previous basemap.
         *
         * @see [toggle()](#toggle)
         *
         * @example
         * basemapToggle.on('toggle', function(event){
         *   console.log("current basemap title: ", event.current.title);
         *   console.log("previous basemap title: ", event.previous.title);
         * });
         */
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @alias module:esri/widgets/BasemapToggle
         * @extends module:esri/widgets/Widget
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                              that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * var basemapToggle = new BasemapToggle({
         *   view: view,
         *   nextBasemap: "satellite"
         * });
         */
        function BasemapToggle(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  activeBasemap
            //----------------------------------
            /**
             * The map's {@link module:esri/Map#basemap basemap}.
             *
             * @readonly
             * @type {module:esri/Basemap}
             * @name activeBasemap
             * @instance
             */
            _this.activeBasemap = null;
            //----------------------------------
            //  nextBasemap
            //----------------------------------
            /**
             * The next basemap for toggling. One of the following values may be set to this property:
             *
             * * The {@link module:esri/Map#basemap string ID} of any Esri basemap.
             * * A custom {@link module:esri/Basemap} object. Since this property may be
             * [autocast](../guide/autocasting/index.html), the {@link module:esri/Basemap}
             * module does not need to be included in the `require()` function in most applications.
             *
             * @instance
             * @name nextBasemap
             * @type {module:esri/Basemap}
             * @autocast { "value": "String | Object" }
             */
            _this.nextBasemap = null;
            //----------------------------------
            //  titleVisible
            //----------------------------------
            /**
             * Indicates if the title of the basemap is visible in the widget.
             *
             * @name titleVisible
             * @instance
             *
             * @type {boolean}
             * @default false
             */
            _this.titleVisible = false;
            //----------------------------------
            //  view
            //----------------------------------
            /**
             * A reference to the {@link module:esri/views/MapView} or {@link module:esri/views/SceneView}. This view
             * provides the BasemapToggle widget with access to the initial
             * {@link module:esri/Map#basemap basemap} to toggle from
             * via the view's {@link module:esri/views/View#map map} property.
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
             * The view model for this widget. This is a class that contains all the logic
             * (properties and methods) that controls this widget's behavior. See the
             * {@link module:esri/widgets/BasemapToggle/BasemapToggleViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/BasemapToggle/BasemapToggleViewModel}
             * @autocast
             */
            _this.viewModel = new BasemapToggleViewModel();
            return _this;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        /**
         * Toggles to the [next basemap](#nextBasemap).
         * @method
         */
        BasemapToggle.prototype.toggle = function () { };
        BasemapToggle.prototype.render = function () {
            var vm = this.viewModel;
            var activeBasemap = vm.state === "disabled" ? null : vm.activeBasemap;
            var nextBasemap = vm.state === "disabled" ? null : vm.nextBasemap;
            var title = nextBasemap ? nextBasemap.title : "";
            var titleNode;
            if (this.titleVisible && title) {
                titleNode = (
                // need key to distinguish children - see http://maquettejs.org/docs/rules.html
                widget_1.tsx("div", { class: CSS.overlay, key: "esri-basemap-toggle__overlay" },
                    widget_1.tsx("span", { class: CSS.title, title: title }, title)));
            }
            return (widget_1.tsx("div", { class: CSS.base, role: "button", "data-basemap-id": nextBasemap ? nextBasemap.id : "", bind: this, onclick: this._toggle, onkeydown: this._toggle, tabIndex: 0, title: i18n.toggle },
                widget_1.tsx("div", { class: CSS.container },
                    widget_1.tsx("div", { class: CSS.image, styles: getThumbnailStyles(nextBasemap) }),
                    titleNode),
                widget_1.tsx("div", { class: this.classes(CSS.container, CSS.secondaryBasemapImage) },
                    widget_1.tsx("div", { class: CSS.image, styles: getThumbnailStyles(activeBasemap) }))));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        BasemapToggle.prototype._toggle = function () {
            this.toggle();
        };
        __decorate([
            decorators_1.aliasOf("viewModel.activeBasemap"),
            widget_1.renderable()
        ], BasemapToggle.prototype, "activeBasemap", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.nextBasemap"),
            widget_1.renderable()
        ], BasemapToggle.prototype, "nextBasemap", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], BasemapToggle.prototype, "titleVisible", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view"),
            widget_1.renderable()
        ], BasemapToggle.prototype, "view", void 0);
        __decorate([
            widget_1.vmEvent("toggle"),
            decorators_1.property({
                type: BasemapToggleViewModel
            }),
            widget_1.renderable("viewModel.state")
        ], BasemapToggle.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.toggle")
        ], BasemapToggle.prototype, "toggle", null);
        __decorate([
            widget_1.accessibleHandler()
        ], BasemapToggle.prototype, "_toggle", null);
        BasemapToggle = __decorate([
            decorators_1.subclass("esri.widgets.BasemapToggle")
        ], BasemapToggle);
        return BasemapToggle;
    }(decorators_1.declared(Widget)));
    return BasemapToggle;
});
//# sourceMappingURL=BasemapToggle.js.map