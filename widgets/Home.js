/**
 * Provides a simple widget that switches the {@link module:esri/views/View} to its
 * initial {@link module:esri/Viewpoint} or a previously defined [viewpoint](#viewpoint).
 * By default this button looks like the following:
 *
 * ![home-button](../../assets/img/apiref/widgets/widgets-home.png)
 *
 * You can use the view's {@link module:esri/views/ui/DefaultUI} to add widgets
 * to the view's user interface via the {@link module:esri/views/View#ui ui} property on the view.
 * See the example below.
 *
 * @module esri/widgets/Home
 * @since 4.0
 *
 * @see [Home.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Home.tsx)
 * @see [button.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Widget.scss)
 * @see [Sample - Home widget](../sample-code/widgets-home/index.html)
 * @see module:esri/widgets/Home/HomeViewModel
 * @see {@link module:esri/views/View#ui View.ui}
 * @see module:esri/views/ui/DefaultUI
 *
 * @example
 * var homeWidget = new Home({
 *   view: view
 * });
 *
 * // adds the home widget to the top left corner of the MapView
 * view.ui.add(homeWidget, "top-left");
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/nls/common", "dojo/i18n!esri/widgets/Home/nls/Home", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/Home/HomeViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18nCommon, i18n, decorators_1, Widget, HomeViewModel, widget_1) {
    "use strict";
    i18nCommon = __importStar(i18nCommon);
    i18n = __importStar(i18n);
    var CSS = {
        base: "esri-home esri-widget--button esri-widget",
        text: "esri-icon-font-fallback-text",
        homeIcon: "esri-icon esri-icon-home",
        loadingIcon: "esri-icon-loading-indicator",
        rotatingIcon: "esri-rotating",
        widgetIcon: "esri-icon-home",
        // common
        disabled: "esri-disabled"
    };
    var Home = /** @class */ (function (_super) {
        __extends(Home, _super);
        /**
         * Fires when the [go()](#go) method is called.
         *
         * @event module:esri/widgets/Home#go
         *
         * @see [go()](#go)
         *
         * @example
         * homeWidget.on("go", function(event){
         *   console.log("updating viewpoint");
         * });
         */
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @alias module:esri/widgets/Home
         * @extends module:esri/widgets/Widget
         * @mixes module:esri/widgets/support/GoTo
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                              that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * var homeButton = new Home({
         *   view: view,
         *   viewpoint: new Viewpoint()
         * });
         */
        function Home(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  goToOverride
            //----------------------------------
            _this.goToOverride = null;
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
             * @type {module:esri/views/MapView | module:esri/views/SceneView}
             *
             * @name view
             * @instance
             */
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            /**
             * The view model for this widget. This is a class that contains all the logic
             * (properties and methods) that controls this widget's behavior. See the
             * {@link module:esri/widgets/Home/HomeViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @autocast
             * @type {module:esri/widgets/Home/HomeViewModel}
             */
            _this.viewModel = new HomeViewModel();
            //----------------------------------
            //  viewpoint
            //----------------------------------
            /**
             * The {@link module:esri/Viewpoint}, or point of view, to zoom to when
             * going home. The initial value is determined a few different ways:
             *
             * * If no {@link module:esri/views/View} is provided, the value is `null`.
             * * If the {@link module:esri/views/View} is ready, but the {@link module:esri/Viewpoint} is not defined, the  initial
             * value of the {@link module:esri/Viewpoint} is determined when the {@link module:esri/views/View} became ready.
             * * If the {@link module:esri/views/View} is ready and the {@link module:esri/Viewpoint} is defined by the user, the initial viewpoint value is the user-defined {@link module:esri/Viewpoint}.
             *
             * @type {module:esri/Viewpoint}
             * @name viewpoint
             * @instance
             *
             * @example
             * // Creates a viewpoint centered on the extent of a polygon geometry
             * var vp = new Viewpoint({
             *   targetGeometry: geom.extent
             * });
             *
             * // Sets the model's viewpoint to the Viewpoint based on a polygon geometry
             * home.viewpoint = vp;
             */
            _this.viewpoint = null;
            return _this;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        /**
         * This function provides the ability to interrupt and cancel the process
         * of navigating the view back to the view's initial extent.
         *
         * @since 4.9
         *
         * @method
         */
        Home.prototype.cancelGo = function () {
            return null;
        };
        /**
         * Animates the view to the initial Viewpoint of the view or the
         * value of [viewpoint](#viewpoint).
         *
         * @method
         * @see [Event: go](#event:go)
         */
        Home.prototype.go = function () {
            return null;
        };
        Home.prototype.render = function () {
            var _a, _b;
            var state = this.get("viewModel.state");
            var rootClasses = (_a = {},
                _a[CSS.disabled] = state === "disabled",
                _a);
            var iconClasses = (_b = {},
                _b[CSS.loadingIcon] = state === "going-home",
                _b[CSS.rotatingIcon] = state === "going-home",
                _b);
            var title = state === "going-home" ? i18nCommon.cancel : i18n.title;
            return (widget_1.tsx("div", { bind: this, class: this.classes(CSS.base, rootClasses), role: "button", tabIndex: 0, onclick: this._go, onkeydown: this._go, "aria-label": title, title: title },
                widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.homeIcon, iconClasses) }),
                widget_1.tsx("span", { class: CSS.text }, i18n.button)));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Home.prototype._go = function () {
            var viewModel = this.viewModel;
            viewModel.state === "going-home" ? viewModel.cancelGo() : viewModel.go();
        };
        __decorate([
            decorators_1.aliasOf("viewModel.goToOverride")
        ], Home.prototype, "goToOverride", void 0);
        __decorate([
            decorators_1.property()
        ], Home.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], Home.prototype, "label", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view"),
            widget_1.renderable()
        ], Home.prototype, "view", void 0);
        __decorate([
            decorators_1.property({
                type: HomeViewModel
            }),
            widget_1.renderable("viewModel.state"),
            widget_1.vmEvent("go")
        ], Home.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.viewpoint")
        ], Home.prototype, "viewpoint", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.cancelGo")
        ], Home.prototype, "cancelGo", null);
        __decorate([
            decorators_1.aliasOf("viewModel.go")
        ], Home.prototype, "go", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Home.prototype, "_go", null);
        Home = __decorate([
            decorators_1.subclass("esri.widgets.Home")
        ], Home);
        return Home;
    }(decorators_1.declared(Widget)));
    return Home;
});
//# sourceMappingURL=Home.js.map