/**
 * Provides a simple widget to present the {@link module:esri/views/View} or a user-defined {@link HTMLElement} using the entire screen.
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * * The Fullscreen widget only works with browsers that implement
 * the [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API). Thus, iOS Safari is not supported.
 * :::
 *
 * @module esri/widgets/Fullscreen
 * @since 4.6
 *
 * @see [Fullscreen.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Fullscreen.tsx)
 * @see [Sample - Animate opacity visual variable](../sample-code/visualization-vv-opacity-animate/index.html)
 * @see [Sample - Animate color visual variable](../sample-code/visualization-vv-color-animate/index.html)
 * @see module:esri/widgets/Fullscreen/FullscreenViewModel
 * @see module:esri/views/ui/DefaultUI
 *
 * @example
 *
 * fullscreen = new Fullscreen({
 *   view: view
 * });
 * view.ui.add(fullscreen, "top-right");
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/widgets/Fullscreen/nls/Fullscreen", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/Fullscreen/FullscreenViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18n, decorators_1, Widget, FullscreenViewModel, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var CSS = {
        base: "esri-fullscreen esri-widget--button esri-widget",
        text: "esri-icon-font-fallback-text",
        icon: "esri-icon",
        enter: "esri-icon-zoom-out-fixed",
        exit: "esri-icon-zoom-in-fixed",
        // common
        disabled: "esri-disabled"
    };
    var Fullscreen = /** @class */ (function (_super) {
        __extends(Fullscreen, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @alias module:esri/widgets/Fullscreen
         * @extends module:esri/widgets/Widget
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         */
        function Fullscreen(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  element
            //----------------------------------
            /**
             * The {@link HTMLElement} to present in fullscreen mode.
             *
             * @type {HTMLElement}
             *
             * @name element
             * @instance
             */
            _this.element = null;
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
             * {@link module:esri/widgets/Fullscreen/FullscreenViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/Fullscreen/FullscreenViewModel}
             * @autocast
             */
            _this.viewModel = new FullscreenViewModel();
            return _this;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        Fullscreen.prototype.render = function () {
            var _a, _b;
            var state = this.get("viewModel.state");
            var rootClasses = (_a = {},
                _a[CSS.disabled] = state === "disabled" || state === "feature-unsupported",
                _a);
            var iconClasses = (_b = {},
                _b[CSS.enter] = state === "ready" || state === "disabled" || state === "feature-unsupported",
                _b[CSS.exit] = state === "active",
                _b);
            var title = state === "active" ? i18n.exit : state === "ready" ? i18n.enter : "";
            return (widget_1.tsx("div", { bind: this, class: this.classes(CSS.base, rootClasses), role: "button", tabIndex: 0, onclick: this._toggle, onkeydown: this._toggle, "aria-label": title, title: title },
                widget_1.tsx("span", { class: this.classes(CSS.icon, iconClasses), "aria-hidden": "true" }),
                widget_1.tsx("span", { class: CSS.text }, title)));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Fullscreen.prototype._toggle = function () {
            this.viewModel.toggle();
        };
        __decorate([
            decorators_1.aliasOf("viewModel.element")
        ], Fullscreen.prototype, "element", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Fullscreen.prototype, "view", void 0);
        __decorate([
            decorators_1.property({
                type: FullscreenViewModel
            }),
            widget_1.renderable("viewModel.state")
        ], Fullscreen.prototype, "viewModel", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], Fullscreen.prototype, "_toggle", null);
        Fullscreen = __decorate([
            decorators_1.subclass("esri.widgets.Fullscreen")
        ], Fullscreen);
        return Fullscreen;
    }(decorators_1.declared(Widget)));
    return Fullscreen;
});
//# sourceMappingURL=Fullscreen.js.map