/**
 * Provides two simple buttons for toggling the
 * {@link module:esri/widgets/NavigationToggle/NavigationToggleViewModel#navigationMode navigation mode}
 * of a {@link module:esri/views/SceneView}. Note that this widget is designed only for 3D mouse interaction in a
 * {@link module:esri/views/SceneView}. It has no effect on touch navigation and it should not be used
 * with 2D mouse interaction in a {@link module:esri/views/MapView}.
 *
 * ![navigation-toggle](../../assets/img/apiref/widgets/navigation-toggle.png)
 *
 * The default navigation mode of the {@link module:esri/views/SceneView} is always
 * `pan`. The various mouse interactions of this mode are outlined
 * [here](../api-reference/esri-views-SceneView.html#navigation).
 * The alternate navigation mode to toggle to is `rotate`. This allows the user to
 * rotate the view with a mouse drag and pan the view with a right-click and drag
 * gesture.
 *
 * You can use the view's {@link module:esri/views/ui/DefaultUI} to add widgets
 * to the view's user interface via the {@link module:esri/views/View#ui ui} property on the view.
 * See the example below.
 *
 * @module esri/widgets/NavigationToggle
 * @since 4.0
 *
 * @see [NavigationToggle.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/NavigationToggle.tsx)
 * @see module:esri/widgets/NavigationToggle/NavigationToggleViewModel
 * @see [SceneView navigation](../api-reference/esri-views-SceneView.html)
 * @see {@link module:esri/views/View#ui View.ui}
 * @see module:esri/views/ui/DefaultUI
 *
 * @example
 * // creates a new instance of the NavigationToggle widget
 * var navigationToggle = new NavigationToggle({
 *   view: view
 * });
 *
 * // and adds it to the top right of the view
 * view.ui.add(navigationToggle, "top-right");
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/widgets/NavigationToggle/nls/NavigationToggle", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/NavigationToggle/NavigationToggleViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18n, decorators_1, Widget, NavigationToggleViewModel, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var CSS = {
        base: "esri-navigation-toggle esri-widget",
        button: "esri-navigation-toggle__button esri-widget--button",
        activeButton: "esri-navigation-toggle__button--active",
        panButton: "esri-navigation-toggle__button--pan",
        rotateButton: "esri-navigation-toggle__button--rotate",
        isLayoutHorizontal: "esri-navigation-toggle--horizontal",
        // icons
        rotationIcon: "esri-icon-rotate",
        panIcon: "esri-icon-pan",
        widgetIcon: "esri-icon-pan2",
        // common
        disabled: "esri-disabled"
    };
    var NavigationToggle = /** @class */ (function (_super) {
        __extends(NavigationToggle, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @alias module:esri/widgets/NavigationToggle
         * @extends module:esri/widgets/Widget
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                              that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * var navigationToggle = new NavigationToggle({
         *   view: view
         * });
         */
        function NavigationToggle(params) {
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
             * A reference to the {@link module:esri/views/Scene SceneView}. Set this to link the widget to a specific view.
             *
             * @name view
             * @instance
             *
             * @type {module:esri/views/SceneView}
             */
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            /**
             * The view model for this widget. This is a class that contains all the logic
             * (properties and methods) that controls this widget's behavior. See the
             * {@link module:esri/widgets/NavigationToggle/NavigationToggleViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/NavigationToggle/NavigationToggleViewModel}
             * @autocast
             */
            _this.viewModel = new NavigationToggleViewModel();
            return _this;
        }
        Object.defineProperty(NavigationToggle.prototype, "layout", {
            //----------------------------------
            //  layout
            //----------------------------------
            /**
             * Sets the layout of the widget to either `horizontal` or `vertical`. See the
             * table below for a list of possible values.
             *
             * Possible Value | Example
             * ---------------|--------
             * vertical | ![navigation-toggle](../../assets/img/apiref/widgets/navigation-toggle.png)
             * horizontal | ![navigation-toggle-horizontal](../../assets/img/apiref/widgets/navigation-toggle-horizontal.png)
             *
             * @name layout
             * @instance
             * @type {string}
             * @default vertical
             *
             * @example
             * // creates a new instance of the NavigationToggle widget
             * var navigationToggle = new NavigationToggle({
             *   view: view,
             *   layout: "horizontal"  // makes the layout horizontal
             * });
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
        /**
         * Toggles the navigation mode of the [view](#view) from `pan` to `rotate` or
         * vice versa.
         *
         * @method toggle
         * @instance
         */
        NavigationToggle.prototype.toggle = function () { };
        NavigationToggle.prototype.render = function () {
            var _a, _b, _c;
            var disabled = this.get("viewModel.state") === "disabled";
            var panSelected = this.get("viewModel.navigationMode") === "pan";
            var rootClasses = (_a = {},
                _a[CSS.disabled] = disabled,
                _a[CSS.isLayoutHorizontal] = this.layout === "horizontal",
                _a);
            var panButtonClasses = (_b = {},
                _b[CSS.activeButton] = panSelected,
                _b);
            var rotateButtonClasses = (_c = {},
                _c[CSS.activeButton] = !panSelected,
                _c);
            var tabIndex = disabled ? -1 : 0;
            return (widget_1.tsx("div", { bind: this, class: this.classes(CSS.base, rootClasses), onclick: this._toggle, onkeydown: this._toggle, tabIndex: tabIndex, "aria-label": i18n.toggle, title: i18n.toggle },
                widget_1.tsx("div", { class: this.classes(CSS.button, CSS.panButton, panButtonClasses) },
                    widget_1.tsx("span", { class: CSS.panIcon })),
                widget_1.tsx("div", { class: this.classes(CSS.button, CSS.rotateButton, rotateButtonClasses) },
                    widget_1.tsx("span", { class: CSS.rotationIcon }))));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        NavigationToggle.prototype._toggle = function () {
            this.toggle();
        };
        __decorate([
            decorators_1.property()
        ], NavigationToggle.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], NavigationToggle.prototype, "label", void 0);
        __decorate([
            decorators_1.property({
                value: "vertical"
            }),
            widget_1.renderable()
        ], NavigationToggle.prototype, "layout", null);
        __decorate([
            decorators_1.aliasOf("viewModel.view"),
            widget_1.renderable()
        ], NavigationToggle.prototype, "view", void 0);
        __decorate([
            decorators_1.property({
                type: NavigationToggleViewModel
            }),
            widget_1.renderable(["viewModel.state", "viewModel.navigationMode"])
        ], NavigationToggle.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.toggle")
        ], NavigationToggle.prototype, "toggle", null);
        __decorate([
            widget_1.accessibleHandler()
        ], NavigationToggle.prototype, "_toggle", null);
        NavigationToggle = __decorate([
            decorators_1.subclass("esri.widgets.NavigationToggle")
        ], NavigationToggle);
        return NavigationToggle;
    }(decorators_1.declared(Widget)));
    return NavigationToggle;
});
//# sourceMappingURL=NavigationToggle.js.map