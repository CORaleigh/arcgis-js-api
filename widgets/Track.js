/**
 * Provides a simple button that animates the {@link module:esri/views/View}
 * to the user's location when clicked. The view rotates according to the direction where the
 * tracked device is heading towards. While tracking, the default button looks like the following:
 *
 * ![track-button](../../assets/img/apiref/widgets/widgets-track.png)
 *
 * You can use the view's {@link module:esri/views/ui/DefaultUI} to add widgets
 * to the view's user interface via the {@link module:esri/views/View#ui ui} property on the view. The snippet below demonstrates this.
 *
 * ::: esri-md class="panel trailer-1"
 * The Track widget is not supported on insecure origins.
 * To use it, switch your application to a secure origin, such as HTTPS.
 * Note that localhost is considered "potentially secure" and can be used for easy testing in browsers that supports
 * [Window.isSecureContext](https://developer.mozilla.org/en-US/docs/Web/API/Window/isSecureContext#Browser_compatibility)
 * (currently Chrome and Firefox).
 *
 * As of version 4.2, the Track Button no longer displays in non-secure web apps. At version
 * [4.1](https://blogs.esri.com/esri/arcgis/2016/04/14/increased-web-api-security-in-google-chrome/)
 * this only applied to Google Chrome.
 *
 * For additional information regarding this, visit the ArcGIS blog,
 * [Increased web API security in Google Chrome](https://blogs.esri.com/esri/arcgis/2016/04/14/increased-web-api-security-in-google-chrome/).
 * :::
 *
 * @module esri/widgets/Track
 * @since 4.0
 *
 * @see [Track.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Track.tsx)
 * @see [button.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Widget.scss)
 * @see module:esri/widgets/Track/TrackViewModel
 * @see {@link module:esri/views/View#ui View.ui}
 * @see module:esri/views/ui/DefaultUI
 * @see [Sample - track widget](../sample-code/widgets-track/index.html)
 *
 * @example
 * var trackWidget = new Track({
 *   view: view
 * });
 *
 * view.ui.add(trackWidget, "top-left");
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/widgets/Track/nls/Track", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/Track/TrackViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18n, decorators_1, Widget, TrackViewModel, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var CSS = {
        base: "esri-track esri-widget--button esri-widget",
        text: "esri-icon-font-fallback-text",
        icon: "esri-icon",
        loading: "esri-icon-loading-indicator",
        rotating: "esri-rotating",
        startTrackingIcon: "esri-icon-tracking",
        stopTrackingIcon: "esri-icon-pause",
        widgetIcon: "esri-icon-tracking",
        // common
        disabled: "esri-disabled",
        hidden: "esri-hidden"
    };
    var Track = /** @class */ (function (_super) {
        __extends(Track, _super);
        /**
         * Fires after the [start()](#start) method is called and a position is found.
         *
         * @event module:esri/widgets/Track#track
         * @property {Object} position - Geoposition returned from the [Geolocation API](#geolocationOptions).
         */
        /**
         * Fires after the [start()](#start) method is called and an error is returned.
         *
         * @event module:esri/widgets/Track#track-error
         * @property {Error} error - The Error object returned if an error occurred while tracking.
         */
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @alias module:esri/widgets/Track
         * @extends module:esri/widgets/Widget
         * @mixes module:esri/widgets/support/GoTo
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                              that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * var track = new Track({
         *   view: view
         * });
         */
        function Track(params) {
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
             * Indicates whether the widget will automatically navigate the view to the user's position
             * when a geolocation result is found. Set to `false` to disable this behavior,
             * leaving full control to the developer.
             *
             * @name goToLocationEnabled
             * @instance
             *
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
             * The graphic used to show the user's location in the view.
             *
             * @name graphic
             * @instance
             * @autocast
             *
             * @type {module:esri/Graphic}
             *
             * @example
             * var trackWidget = new Track({
             *   view: view,  // Assigns the track widget to a view
             *     graphic: new Graphic({
             *       symbol: { type: "simple-marker" }  // Overwrites the default symbol used for the
             *       // graphic placed at the location of the user when found
             *     })
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
             * @since 4.7
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
             *   // Create an instance of the Track widget
             *   var track = new Track({
             *     view: mapView,
             *     scale: 5000
             *   });
             *
             *   // and add it to the view's UI
             *   mapView.ui.add(track, "top-left");
             *
             *   track.start();
             *
             *   track.on("track", function(trackEvent){
             *     console.log(trackEvent);
             *     console.log("track: %s", mapView.scale);
             *   })
             * });
             */
            _this.scale = null;
            //----------------------------------
            //  tracking
            //----------------------------------
            /**
             * Indicates whether the widget is watching for new positions.
             *
             * @name tracking
             * @instance
             *
             * @type {boolean}
             * @readonly
             * @default false
             * @readonly
             */
            _this.tracking = null;
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
             * {@link module:esri/widgets/Track/TrackViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/Track/TrackViewModel}
             * @autocast
             */
            _this.viewModel = new TrackViewModel();
            return _this;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        /**
         * When executed, the widget will start [tracking](#tracking) the
         * user's location.
         *
         * @method start
         * @instance
         */
        Track.prototype.start = function () { };
        /**
         * Stops tracking the user's location when executed.
         *
         * @method stop
         * @instance
         */
        Track.prototype.stop = function () { };
        Track.prototype.render = function () {
            var _a, _b;
            var state = this.get("viewModel.state");
            var rootClasses = (_a = {},
                _a[CSS.disabled] = state === "disabled",
                _a[CSS.hidden] = state === "feature-unsupported",
                _a);
            var isTracking = state === "tracking";
            var iconClasses = (_b = {},
                _b[CSS.startTrackingIcon] = !isTracking && state !== "waiting",
                _b[CSS.stopTrackingIcon] = isTracking,
                _b[CSS.rotating] = state === "waiting",
                _b[CSS.loading] = state === "waiting",
                _b);
            var text = isTracking ? i18n.stopTracking : i18n.startTracking;
            return (widget_1.tsx("div", { bind: this, class: this.classes(CSS.base, rootClasses), hidden: state === "feature-unsupported", onclick: this._toggleTracking, onkeydown: this._toggleTracking, role: "button", tabIndex: 0, "aria-label": text, title: text },
                widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.icon, iconClasses) }),
                widget_1.tsx("span", { class: CSS.text }, text)));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Track.prototype._toggleTracking = function () {
            var vm = this.viewModel;
            if (!vm) {
                return;
            }
            if (vm.tracking) {
                this.viewModel.stop();
                return;
            }
            this.viewModel.start();
        };
        __decorate([
            decorators_1.aliasOf("viewModel.geolocationOptions")
        ], Track.prototype, "geolocationOptions", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.goToLocationEnabled")
        ], Track.prototype, "goToLocationEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.goToOverride")
        ], Track.prototype, "goToOverride", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.graphic")
        ], Track.prototype, "graphic", void 0);
        __decorate([
            decorators_1.property()
        ], Track.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], Track.prototype, "label", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.scale")
        ], Track.prototype, "scale", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.tracking")
        ], Track.prototype, "tracking", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.useHeadingEnabled")
        ], Track.prototype, "useHeadingEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view"),
            widget_1.renderable()
        ], Track.prototype, "view", void 0);
        __decorate([
            decorators_1.property({
                type: TrackViewModel
            }),
            widget_1.renderable("viewModel.state"),
            widget_1.vmEvent(["track", "track-error"])
        ], Track.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.start")
        ], Track.prototype, "start", null);
        __decorate([
            decorators_1.aliasOf("viewModel.stop")
        ], Track.prototype, "stop", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Track.prototype, "_toggleTracking", null);
        Track = __decorate([
            decorators_1.subclass("esri.widgets.Track")
        ], Track);
        return Track;
    }(decorators_1.declared(Widget)));
    return Track;
});
//# sourceMappingURL=Track.js.map