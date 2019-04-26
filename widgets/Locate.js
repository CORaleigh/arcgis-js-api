/**
 * Provides a simple widget that animates the {@link module:esri/views/View}
 * to the user's current location. The view rotates according to the direction
 * where the tracked device is heading towards. By default the widget looks like the following:
 *
 * ![locate-button](../../assets/img/apiref/widgets/widgets-locate.png)
 *
 * ::: esri-md class="panel trailer-1"
 * The Locate widget is not supported on insecure origins.
 * To use it, switch your application to a secure origin, such as HTTPS.
 * Note that localhost is considered "potentially secure" and can be used for easy testing in browsers that supports
 * [Window.isSecureContext](https://developer.mozilla.org/en-US/docs/Web/API/Window/isSecureContext#Browser_compatibility)
 * (currently Chrome and Firefox).
 *
 * As of version 4.2, the Locate Button no longer displays in non-secure web apps. At version
 * [4.1](https://blogs.esri.com/esri/arcgis/2016/04/14/increased-web-api-security-in-google-chrome/)
 * this only applied to Google Chrome.
 * :::
 *
 * If the spatial reference of the {@link module:esri/views/View} is not Web Mercator or WGS84,
 * the user's location must be reprojected to match the
 * {@link module:esri/views/View#spatialReference view's spatial reference}. This is done with the
 * {@link module:esri/tasks/GeometryService} URL referenced in
 * {@link module:esri/config#geometryServiceUrl esriConfig}. You can optionally set the
 * {@link module:esri/config#geometryServiceUrl geometryServiceUrl} in esriConfig to your own
 * {@link module:esri/tasks/GeometryService} instance.
 * If not specified, however, it will refer to the service hosted in the default
 * {@link module:esri/portal/Portal portal} instance. See
 * {@link module:esri/config#geometryServiceUrl esriConfig.geometryServiceUrl} for an example.
 *
 * You can use the view's {@link module:esri/views/ui/DefaultUI} to add widgets
 * to the view's user interface via the {@link module:esri/views/View#ui ui} property on the view.
 * The snippet below demonstrates this.
 *
 * @module esri/widgets/Locate
 * @since 4.0
 *
 * @see [Locate.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Locate.tsx)
 * @see [button.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Widget.scss)
 * @see [Sample - locate widget](../sample-code/widgets-locate/index.html)
 * @see module:esri/widgets/Locate/LocateViewModel
 * @see {@link module:esri/views/View#ui View.ui}
 * @see module:esri/views/ui/DefaultUI
 *
 * @example
 * var locateWidget = new Locate({
 *   view: view,   // Attaches the Locate button to the view
 *   graphic: new Graphic({
 *     symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
 *     // graphic placed at the location of the user when found
 *   })
 * });
 *
 * view.ui.add(locateWidget, "top-right");
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/nls/common", "dojo/i18n!esri/widgets/Locate/nls/Locate", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/Locate/LocateViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18nCommon, i18n, decorators_1, Widget, LocateViewModel, widget_1) {
    "use strict";
    i18nCommon = __importStar(i18nCommon);
    i18n = __importStar(i18n);
    var CSS = {
        base: "esri-locate esri-widget--button esri-widget",
        text: "esri-icon-font-fallback-text",
        icon: "esri-icon",
        locate: "esri-icon-locate",
        loading: "esri-icon-loading-indicator",
        rotating: "esri-rotating",
        widgetIcon: "esri-icon-north-navigation",
        // common
        disabled: "esri-disabled",
        hidden: "esri-hidden"
    };
    var Locate = /** @class */ (function (_super) {
        __extends(Locate, _super);
        /**
         * Fires after the [locate()](#locate) method is called and succeeds.
         *
         * @event module:esri/widgets/Locate#locate
         * @property {Object} position - Geoposition returned from the [Geolocation API](#geolocationOptions).
         *
         * @see [locate()](#locate)
         */
        /**
         * Fires after the [locate()](#locate) method is called and fails.
         *
         * @event module:esri/widgets/Locate#locate-error
         * @property {Error} error - The Error object that occurred while locating.
         *
         * @see [locate()](#locate)
         */
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @alias module:esri/widgets/Locate
         * @extends module:esri/widgets/Widget
         * @mixes module:esri/widgets/support/GoTo
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                              that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * var locate = new Locate({
         *   view: view
         * });
         */
        function Locate(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  geolocationOptions
            //----------------------------------
            /**
             * The HTML5 Geolocation Position options for locating. Refer to
             * [Geolocation API Specification](http://www.w3.org/TR/geolocation-API/#position-options)
             * for details.
             *
             * @name geolocationOptions
             * @instance
             *
             * @type {Object}
             * @default { maximumAge: 0, timeout: 15000, enableHighAccuracy: true }
             */
            _this.geolocationOptions = null;
            //----------------------------------
            //  goToLocationEnabled
            //----------------------------------
            /**
             * Indicates whether the widget should navigate the view to the position and scale of the geolocated result.
             *
             * @name goToLocationEnabled
             * @instance
             * @type {boolean}
             * @default true
             */
            _this.goToLocationEnabled = null;
            //----------------------------------
            //  goToOverride
            //----------------------------------
            _this.goToOverride = null;
            //----------------------------------
            //  graphic
            //----------------------------------
            /**
             * The graphic used to show the user's location on the map.
             *
             * @name graphic
             * @instance
             * @autocast
             *
             * @type {module:esri/Graphic}
             *
             * @example
             * var locateWidget = new Locate({
             *   viewModel: { // autocasts as new LocateViewModel()
             *     view: view,  // assigns the locate widget to a view
             *     graphic: new Graphic({
             *       symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
             *       // graphic placed at the location of the user when found
             *     })
             *   }
             * });
             */
            _this.graphic = null;
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
             * @since 4.8
             * @name label
             * @instance
             * @type {string}
             */
            _this.label = i18n.widgetLabel;
            //----------------------------------
            //  scale
            //----------------------------------
            /**
             * Indicates the scale to set on the view when navigating to the position of the geolocated
             * result once a location is returned from the [track](#event:track) event.
             * If a scale value is not explicitly set, then the view will navigate to a default scale of `2500`.
             * For 2D views the value should be within the {@link module:esri/views/MapView#constraints effectiveMinScale}
             * and {@link module:esri/views/MapView#constraints effectiveMaxScale}.
             *
             * @since 4.7
             * @name scale
             * @instance
             * @type {number}
             * @default null
             *
             * @example
             * mapView.watch("scale", function (currentScale){
             *   console.log("scale: %s", currentScale);
             * });
             *
             * mapView.when(function(){
             *   // Create an instance of the Locate widget
             *   var locateWidget = new Locate({
             *     view: mapView,
             *     scale: 5000
             *   });
             *
             *   // and add it to the view's UI
             *   mapView.ui.add(locateWidget, "top-left");
             *
             *   locateWidget.locate();
             *
             *   locateWidget.on("locate", function(locateEvent){
             *     console.log(locateEvent);
             *     console.log("locate: %s", mapView.scale);
             *   })
             * });
             */
            _this.scale = null;
            //----------------------------------
            //  useHeadingEnabled
            //----------------------------------
            /**
             * Indicates whether the widget will automatically [rotate to user's direction](https://www.w3.org/TR/geolocation-API/#coordinates_interface).
             * Set to `false` to disable this behavior.
             *
             * @since 4.6
             *
             * @name useHeadingEnabled
             * @instance
             *
             * @type {boolean}
             * @default true
             */
            _this.useHeadingEnabled = null;
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
             * {@link module:esri/widgets/Locate/LocateViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/Locate/LocateViewModel}
             * @autocast
             */
            _this.viewModel = new LocateViewModel();
            return _this;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        /**
         * This function provides the ability to interrupt and cancel the process of
         * programmatically obtaining the location of the user's device.
         *
         * @since 4.9
         *
         * @method
         */
        Locate.prototype.cancelLocate = function () { };
        /**
         * Animates the view to the user's location.
         *
         * @return {Promise<Object>} Resolves to an object with the same specification as the event
         *                   object defined in the [locate event](#event:locate).
         *
         * @method
         *
         * @example
         * var locateWidget = new Locate({
         *   view: view,
         *   container: "locateDiv"
         * });
         *
         * locateWidget.locate().then(function(){
         *   // Fires after the user's location has been found
         * });
         */
        Locate.prototype.locate = function () { };
        Locate.prototype.render = function () {
            var _a, _b;
            var state = this.get("viewModel.state");
            var isLocating = state === "locating";
            var rootClasses = (_a = {},
                _a[CSS.disabled] = state === "disabled",
                _a[CSS.hidden] = state === "feature-unsupported",
                _a);
            var iconClasses = (_b = {},
                _b[CSS.loading] = isLocating,
                _b[CSS.rotating] = isLocating,
                _b[CSS.locate] = !isLocating,
                _b);
            var title = state === "locating" ? i18nCommon.cancel : i18n.title;
            return (widget_1.tsx("div", { bind: this, class: this.classes(CSS.base, rootClasses), hidden: state === "feature-unsupported", onclick: this._locate, onkeydown: this._locate, role: "button", tabIndex: 0, "aria-label": title, title: title },
                widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.icon, iconClasses) }),
                widget_1.tsx("span", { class: CSS.text }, i18n.title)));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Locate.prototype._locate = function () {
            var viewModel = this.viewModel;
            viewModel.state === "locating" ? viewModel.cancelLocate() : viewModel.locate();
        };
        __decorate([
            decorators_1.aliasOf("viewModel.geolocationOptions")
        ], Locate.prototype, "geolocationOptions", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.goToLocationEnabled")
        ], Locate.prototype, "goToLocationEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.goToOverride")
        ], Locate.prototype, "goToOverride", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.graphic")
        ], Locate.prototype, "graphic", void 0);
        __decorate([
            decorators_1.property()
        ], Locate.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], Locate.prototype, "label", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.scale")
        ], Locate.prototype, "scale", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.useHeadingEnabled")
        ], Locate.prototype, "useHeadingEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Locate.prototype, "view", void 0);
        __decorate([
            decorators_1.property({
                type: LocateViewModel
            }),
            widget_1.renderable("viewModel.state"),
            widget_1.vmEvent(["locate", "locate-error"])
        ], Locate.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.cancelLocate")
        ], Locate.prototype, "cancelLocate", null);
        __decorate([
            decorators_1.aliasOf("viewModel.locate")
        ], Locate.prototype, "locate", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Locate.prototype, "_locate", null);
        Locate = __decorate([
            decorators_1.subclass("esri.widgets.Locate")
        ], Locate);
        return Locate;
    }(decorators_1.declared(Widget)));
    return Locate;
});
//# sourceMappingURL=Locate.js.map