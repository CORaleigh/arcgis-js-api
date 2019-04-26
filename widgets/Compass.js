/**
 * The Compass widget indicates where north is in relation to the current view
 * {@link module:esri/views/MapView#rotation rotation}
 * or {@link module:esri/Camera#heading camera heading}. Clicking the Compass widget
 * rotates the view to face north (heading = 0). This widget is added to a {@link module:esri/views/SceneView}
 * by default.
 *
 * ![Compass for Web Mercator and WGS84](../../assets/img/apiref/widgets/compass.png)
 * ![Compass for other spatial references](../../assets/img/apiref/widgets/compass-other-sr.png)
 *
 * You can use the view's {@link module:esri/views/ui/DefaultUI} to add the compass widget
 * to a 2D application via the {@link module:esri/views/MapView#ui ui} property on the view.
 * See the sample below.
 *
 * @example
 * var view = new MapView({
 *   container: "viewDiv",
 *   map: map
 * });
 *
 * var compass = new Compass({
 *   view: view
 * });
 *
 * // adds the compass to the top left corner of the MapView
 * view.ui.add(compass, "top-left");
 *
 * @module esri/widgets/Compass
 * @since 4.0
 *
 * @see [Compass.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Compass.tsx)
 * @see [Compass.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Compass.scss)
 * @see module:esri/widgets/Compass/CompassViewModel
 * @see [Sample - Adding the Compass widget to a MapView](../sample-code/widgets-compass-2d/index.html)
 * @see module:esri/views/ui/DefaultUI
 * @see module:esri/views/MapView
 * @see module:esri/views/SceneView
 * @see module:esri/Camera
 */
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/widgets/Compass/nls/Compass", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/Compass/CompassViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18n, decorators_1, Widget, CompassViewModel, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var CSS = {
        base: "esri-compass esri-widget--button esri-widget",
        text: "esri-icon-font-fallback-text",
        icon: "esri-compass__icon",
        rotationIcon: "esri-icon-dial",
        northIcon: "esri-icon-compass",
        widgetIcon: "esri-icon-locate-circled",
        // common
        interactive: "esri-interactive",
        disabled: "esri-disabled"
    };
    var Compass = /** @class */ (function (_super) {
        __extends(Compass, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @mixes module:esri/widgets/support/GoTo
         * @constructor
         * @alias module:esri/widgets/Compass
         * @extends module:esri/widgets/Widget
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         */
        function Compass(params) {
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
             * The view in which the Compass obtains and indicates camera
             * {@link module:esri/Camera#heading heading}, using a (SceneView) or
             * {@link module:esri/views/Mapview#rotation rotation} (MapView).
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
             * {@link module:esri/widgets/Compass/CompassViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/Compass/CompassViewModel}
             * @autocast
             */
            _this.viewModel = new CompassViewModel();
            return _this;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        /**
         * If working in a {@link module:esri/views/MapView}, sets the view's
         * {@link module:esri/views/MapView#rotation rotation} to `0`. If working in a
         * {@link module:esri/views/SceneView}, sets the camera's
         * {@link module:esri/Camera#heading heading} to `0`. This method is executed each
         * time the {@link module:esri/widgets/Compass} is clicked.
         *
         * @method
         */
        Compass.prototype.reset = function () { };
        Compass.prototype.render = function () {
            var _a, _b;
            var _c = this.viewModel, orientation = _c.orientation, state = _c.state;
            var disabled = state === "disabled", showNorth = state === "rotation" ? "rotation" : "compass", // compass is also shown when disabled
            showingCompass = showNorth === "compass";
            var tabIndex = disabled ? -1 : 0;
            var dynamicRootClasses = (_a = {},
                _a[CSS.disabled] = disabled,
                _a[CSS.interactive] = !disabled,
                _a);
            var dynamicIconClasses = (_b = {},
                _b[CSS.northIcon] = showingCompass,
                _b[CSS.rotationIcon] = !showingCompass,
                _b);
            return (widget_1.tsx("div", { bind: this, class: this.classes(CSS.base, dynamicRootClasses), onclick: this._reset, onkeydown: this._reset, role: "button", tabIndex: tabIndex, "aria-label": i18n.reset, title: i18n.reset },
                widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.icon, dynamicIconClasses), styles: this._toRotationTransform(orientation) }),
                widget_1.tsx("span", { class: CSS.text }, i18n.reset)));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Compass.prototype._reset = function () {
            this.viewModel.reset();
        };
        Compass.prototype._toRotationTransform = function (orientation) {
            return {
                transform: "rotateZ(" + orientation.z + "deg)"
            };
        };
        __decorate([
            decorators_1.aliasOf("viewModel.goToOverride")
        ], Compass.prototype, "goToOverride", void 0);
        __decorate([
            decorators_1.property()
        ], Compass.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], Compass.prototype, "label", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Compass.prototype, "view", void 0);
        __decorate([
            decorators_1.property({
                type: CompassViewModel
            }),
            widget_1.renderable(["viewModel.orientation", "viewModel.state"])
        ], Compass.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.reset")
        ], Compass.prototype, "reset", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Compass.prototype, "_reset", null);
        Compass = __decorate([
            decorators_1.subclass("esri.widgets.Compass")
        ], Compass);
        return Compass;
    }(decorators_1.declared(Widget)));
    return Compass;
});
//# sourceMappingURL=Compass.js.map