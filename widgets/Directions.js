/**
 * The Directions Widget provides a way to build driving and walking directions using ArcGIS online and custom
 * Network Analysis Route services. Similar to how the {@link module:esri/tasks/RouteTask} works, this widget
 * generates a route finding a least-cost path between multiple points using a specified network. The resulting
 * directions are displayed with detailed turn-by-turn instructions.
 *
 * The widget wraps pre-built search functionality directly within it so all you need to do is reference the widget
 * within your application. The routing service defaults to the [Esri World Route service](http://www.arcgis.com/home/item.html?id=1feb41652c5c4bd2ba5c60df2b4ea2c4).
 * This is a subscription based service available through ArcGIS Online. You can use this default
 * or specify your own ArcGIS Server route service. Please see the
 * [routeServiceUrl](#routeServiceUrl) property.
 *
 * Any types of customizations made to the underlying functionality of the widget should be handled via its [viewModel](#viewModel) property.
 *
 * @example
 * var directionsWidget = new Directions({
 *   view: view
 * });
 * // Adds the Directions widget below other elements in
 * // the top right corner of the view
 * view.ui.add(directionsWidget, {
 *   position: "top-right",
 *   index: 2
 * });
 *
 * @module esri/widgets/Directions
 * @since 4.6
 * @beta
 *
 * @see module:esri/widgets/Directions/DirectionsViewModel
 * @see [Directions.tsx]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Directions.tsx)
 * @see [Directions.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Directions.scss)
 * @see [Guide topic - Proxy pages](../guide/proxies/index.html)
 * @see [Sample - Directions widget](../sample-code/widgets-directions/index.html)
 *
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/tsSupport/assignHelper", "dojo/i18n!esri/nls/common", "dojo/i18n!esri/widgets/Directions/nls/Directions", "esri/moment", "esri/core/Collection", "esri/core/Handles", "esri/core/lang", "esri/core/on", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/widgets/Search", "esri/widgets/Widget", "esri/widgets/Directions/DirectionsViewModel", "esri/widgets/Directions/support/CostSummary", "esri/widgets/Directions/support/DatePicker", "esri/widgets/Directions/support/directionsUtils", "esri/widgets/Directions/support/maneuverUtils", "esri/widgets/Directions/support/RouteSections", "esri/widgets/Directions/support/TimePicker", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, __assign, i18nCommon, i18n, moment, Collection, Handles, lang_1, on_1, watchUtils_1, decorators_1, Search, Widget, DirectionsViewModel, CostSummary, DatePicker, directionsUtils_1, maneuverUtils_1, RouteSections, TimePicker, widget_1) {
    "use strict";
    i18nCommon = __importStar(i18nCommon);
    i18n = __importStar(i18n);
    var NOW = "now";
    var DEPART_BY = "depart-by";
    var CSS = {
        base: "esri-directions esri-widget esri-widget--panel",
        directionsButton: "esri-directions__button",
        clearRouteButton: "esri-directions__clear-route-button",
        scroller: "esri-directions__scroller",
        panelContent: "esri-directions__panel-content",
        panelContentLoading: "esri-directions__panel-content--loading",
        panelContentError: "esri-directions__panel-content--error",
        panelContentSignIn: "esri-directions__panel-content--sign-in",
        loader: "esri-directions__loader",
        message: "esri-directions__message",
        travelModeSelect: "esri-directions__travel-modes-select",
        departureTime: "esri-directions__departure-time",
        departureTimeSelect: "esri-directions__departure-time-select",
        directionsSection: "esri-directions__directions-section",
        departureTimeControls: "esri-directions__departure-time-controls",
        section: "esri-directions__section",
        summary: "esri-directions__summary",
        stopIcon: "esri-directions__stop-icon",
        interactiveStopIcon: "esri-directions__stop-icon--interactive",
        removeStopButton: "esri-directions__remove-stop",
        removeStop: "esri-directions__remove-stop-icon",
        reverseStops: "esri-directions__reverse-stops",
        stopIconContainer: "esri-directions__stop-icon-container",
        lastStopIconContainer: "esri-directions__stop-icon-container--last",
        stopHandle: "esri-directions__stop-handle",
        stopInput: "esri-directions__stop-input",
        stopOptions: "esri-directions__stop-options",
        stopUnderline: "esri-directions__stop-underline",
        underlineDragInProcess: "esri-directions__stop-underline--drag-in-process",
        stopHandleIcon: "esri-directions__stop-handle-icon",
        verticalSplitter: "esri-directions__vertical-splitter",
        stopRow: "esri-directions__stop-row",
        stopRowGhost: "esri-directions__stop-row-ghost",
        stopRowDragged: "esri-directions__stop-row--dragged",
        stopRowDropTarget: "esri-directions__stop-row--target",
        validStopRow: "esri-directions__stop-row--valid",
        stops: "esri-directions__stops",
        addStop: "esri-directions__add-stop",
        addStopText: "esri-directions__add-stop-text",
        directionCosts: "esri-directions__costs",
        costsDetails: "esri-directions__costs-details",
        primaryCosts: "esri-directions__costs-value",
        secondaryCosts: "esri-directions__other-costs-total",
        routeActions: "esri-directions__route-actions",
        maneuvers: "esri-directions__maneuvers",
        maneuverList: "esri-directions__maneuver-list",
        maneuverSection: "esri-directions__maneuver-section",
        maneuverSectionHeader: "esri-directions__maneuver-section-header",
        maneuverSectionHeaderButton: "esri-directions__maneuver-section-header-toggle-button",
        maneuverSectionTitle: "esri-directions__maneuver-section-title",
        collapsibleSection: "esri-directions__maneuver-section--collapsible",
        maneuverSectionToggle: "esri-directions__maneuver-section-toggle",
        maneuver: "esri-directions__maneuver",
        maneuverActive: "esri-directions__maneuver--active",
        maneuverCosts: "esri-directions__maneuver-costs",
        maneuverCostsContainer: "esri-directions__maneuver-costs-container",
        maneuverIcon: "esri-directions__maneuver-icon",
        cumulativeCost: "esri-directions__cost--cumulative",
        intermediateCost: "esri-directions__cost--intermediate",
        horizontalSplitter: "esri-directions__horizontal-splitter",
        sectionSplitter: "esri-directions__section-splitter",
        disclaimer: "esri-directions__disclaimer",
        signInContent: "esri-directions__sign-in-content",
        signInButton: "esri-directions__sign-in-button",
        contentTitle: "esri-directions__content-title",
        warningCard: "esri-directions__warning-card",
        warningHeader: "esri-directions__warning-header",
        warningHeading: "esri-directions__warning-heading",
        warningMessage: "esri-directions__warning-message",
        // icons
        stopsIcon: "esri-icon-radio-unchecked",
        lastStopIcon: "esri-icon-radio-checked",
        handleIcon: "esri-icon-handle-vertical",
        addStopIcon: "esri-icon-plus",
        removeStopIcon: "esri-icon-close",
        reverseStopIcon: "esri-icon-up-down-arrows",
        openIcon: "esri-icon-right-triangle-arrow",
        closeIcon: "esri-icon-down-arrow",
        warningIcon: "esri-icon-notice-triangle",
        widgetIcon: "esri-icon-directions",
        // common
        anchor: "esri-widget__anchor",
        button: "esri-button",
        buttonSecondary: "esri-button--secondary",
        buttonTertiary: "esri-button--tertiary",
        emptyContent: "esri-widget__content--empty",
        emptyIllustration: "esri-widget__content-illustration--empty",
        heading: "esri-widget__heading",
        offscreen: "esri-offscreen",
        select: "esri-select",
        screenReaderText: "esri-icon-font-fallback-text"
    };
    var REGISTRY_KEYS = {
        awaitingViewClickStop: "awaiting-view-click-stop"
    };
    var MANEUVER_ICON_DIR = require.toUrl("../themes/base/images/maneuvers/");
    function getFirstResult(response) {
        return response.results[0].results[0];
    }
    function getDefaultStops() {
        return [{}, {}];
    }
    var defaultDelayInMs = 100;
    var viewClickDelayInMs = 500;
    var Directions = /** @class */ (function (_super) {
        __extends(Directions, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @extends module:esri/widgets/Widget
         * @mixes module:esri/widgets/support/GoTo
         * @constructor
         * @alias module:esri/widgets/Directions
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         */
        function Directions(params) {
            var _this = _super.call(this) || this;
            _this._autoStopRemovalDelay = defaultDelayInMs;
            _this._costSummary = new CostSummary();
            _this._departureTime = NOW;
            _this._datePicker = new DatePicker();
            _this._handles = new Handles();
            _this._newPlaceholderStop = null;
            _this._routeSections = new RouteSections();
            _this._stops = new Collection(getDefaultStops());
            _this._stopsToSearches = new Map();
            _this._timePicker = new TimePicker();
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
            //  maxStops
            //----------------------------------
            /**
             * The maximum number of stops allowed for routing.
             *
             * @name maxStops
             * @type {number}
             * @instance
             * @default 50
             */
            _this.maxStops = null;
            //----------------------------------
            //  routeServiceUrl
            //----------------------------------
            /**
             * The URL of the REST endpoint of the Route service.
             *
             * @name routeServiceUrl
             * @instance
             * @type {string}
             * @default "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World"
             * @autocast
             */
            _this.routeServiceUrl = null;
            //----------------------------------
            //  routeSymbol
            //----------------------------------
            /**
             * Defines the symbol used to draw the route on the map.
             *
             * @name routeSymbol
             * @instance
             * @type {module:esri/symbols/SimpleLineSymbol}
             */
            _this.routeSymbol = null;
            //----------------------------------
            //  searchProperties
            //----------------------------------
            /**
             * Controls the default properties used when {@link module:esri/widgets/Search searching}.
             * Note that the default `searchProperties` differ slightly from
             * the {@link module:esri/widgets/Search Search widget}.
             *
             * @name searchProperties
             * @instance
             * @type {module:esri/widgets/Directions~SearchProperties}
             * @default null
             *
             */
            _this.searchProperties = null;
            ////////////////////////////////////////////////////////////
            //
            // Type definitions
            //
            ////////////////////////////////////////////////////////////
            /**
             * Configurable Search properties of the widget.
             *
             * @typedef SearchProperties
             *
             * @property {number} [activeSourceIndex] - Number index indicating the current selected source.
             * @property {string} [allPlaceholder] - String value used as a hint for input text when searching on multiple sources.
             * @property {boolean} [autoNavigate=true] - Indicates whether to automatically navigate to the selected result once selected.
             * @property {boolean} [autoSelect] - Indicates whether to automatically select and zoom to the first geocoded result.
             * @property {number} [maxResults=6] - Indicates the maximum number of search results to return.
             * @property {number} [maxSuggestions=6] - Indicates the maximum number of suggestions to return for the widget's input.
             * @property {number} [minSuggestCharacters=1] - Indicates the minimum number of characters required before querying for a suggestion.
             * @property {boolean} [popupEnabled=false] - Indicates whether to display a {@link module:esri/widgets/Popup Popup} when a selected result is clicked.
             * @property {boolean} [popupOpenOnSelect=true] - Indicates whether to show the {@link module:esri/widgets/Popup Popup} when a result is selected.
             * @property {module:esri/PopupTemplate} [popupTemplate] - A customized PopupTemplate for the selected feature.
             * @property {boolean} [resultGraphicEnabled=false] - Indicates whether to show a graphic on the map for the selected source.
             * @property {boolean} [searchAllEnabled] - Indicates whether to display the option to search all sources.
             * @property {string} [searchTerm] - The value of the search box input text string.
             * @property {module:esri/core/Collection<module:esri/widgets/Search/LayerSearchSource | module:esri/widgets/Search/LocatorSearchSource>} [sources] - Specifies the sources
             * to search in the [view](#view).
             * @property {boolean} [suggestionsEnabled=true] - Indicates whether to display suggestions as the user enters input text in the widget.
             * @property {module:esri/views/MapView | module:esri/views/SceneView} [view] - The view of the widget.
             * @property {module:esri/widgets/Search/SearchViewModel} [viewModel] - The Search widget's view model.
             */
            //----------------------------------
            //  stopSymbols
            //----------------------------------
            /**
             * The default stop symbols used to display locations between the origin and final destination.
             *
             * @name stopSymbols
             * @instance
             * @type {Object}
             *
             * @property {module:esri/symbols/Symbol} [first] - The first stop symbol.
             * @property {module:esri/symbols/Symbol} [middle] - The middle stop symbol.
             * @property {module:esri/symbols/Symbol} [last] - The last stop symbol.
             * @property {module:esri/symbols/Symbol} [unlocated] - An unlocated stop symbol.
             * @property {module:esri/symbols/Symbol} [waypoint] - A waypoint stop symbol.
             *
             */
            _this.stopSymbols = null;
            //----------------------------------
            //  view
            //----------------------------------
            /**
             * The view from which the widget will operate.
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
             * {@link module:esri/widgets/Directions/DirectionsViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/Directions/DirectionsViewModel}
             * @default
             * @autocast
             *
             */
            _this.viewModel = new DirectionsViewModel();
            return _this;
        }
        Directions.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.init(this, "viewModel.lastRoute", function () {
                    _this._routeSections.routePath = _this.get("viewModel.directionLines");
                    _this._activeManeuver = null;
                    _this._focusedManeuver = null;
                    _this.scheduleRender();
                }),
                watchUtils_1.init(this, "viewModel.selectedTravelMode, viewModel.departureTime", function () {
                    if (_this.get("viewModel.stops.length") > 1) {
                        _this.getDirections();
                    }
                }),
                watchUtils_1.when(this, "view", function (value, oldValue) {
                    if (oldValue) {
                        _this._viewClickHandle = null;
                        _this._handles.remove(oldValue);
                    }
                    if (value) {
                        var viewClickHandle = _this._prepViewClick();
                        _this._handles.add([
                            on_1.on(value.surface, "mousedown", function () { return (_this._autoStopRemovalDelay = viewClickDelayInMs); }),
                            on_1.on(value.surface, "mouseup", function () { return (_this._autoStopRemovalDelay = defaultDelayInMs); }),
                            viewClickHandle
                        ], _this.view.surface);
                        _this._viewClickHandle = viewClickHandle;
                    }
                }),
                watchUtils_1.whenOnce(this, "routeServiceUrl", function () { return _this.viewModel.load(); }),
                watchUtils_1.watch(this, "viewModel.stops.length", function (numStops) {
                    if (numStops !== 0) {
                        return;
                    }
                    _this._stops.toArray().forEach(function (stop) { return _this._removeStop(stop, true); });
                    _this._stops.addMany(getDefaultStops());
                    _this.scheduleRender();
                })
            ]);
        };
        Directions.prototype.destroy = function () {
            this._datePicker.destroy();
            this._timePicker.destroy();
            this._stopsToSearches.forEach(function (search) { return search.destroy(); });
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        /**
         * Calculate the route to the input locations and display the list of directions.
         *
         * @method
         *
         * @return {Promise<module:esri/tasks/support/RouteResult>} When resolved, returns an object containing the calculated {@link module:esri/tasks/support/RouteResult}.
         *
         */
        Directions.prototype.getDirections = function () {
            return null;
        };
        /**
         * Zoom so that the full route is displayed within the current map extent.
         */
        Directions.prototype.zoomToRoute = function () { };
        Directions.prototype.render = function () {
            return widget_1.tsx("div", { class: this.classes(CSS.base, CSS.scroller) }, this._renderPanelContent());
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Directions.prototype._renderPanelContent = function () {
            var _a;
            var state = this.viewModel.state;
            var initializing = state === "initializing";
            var failed = state === "error" && !this.viewModel.serviceDescription;
            var signInPending = state === "unauthenticated";
            var panelClasses = (_a = {},
                _a[CSS.panelContentLoading] = initializing,
                _a[CSS.panelContentError] = failed,
                _a[CSS.panelContentSignIn] = signInPending,
                _a);
            var role = initializing ? "presentation" : "group";
            var content = signInPending
                ? this._renderSignIn()
                : failed
                    ? this._renderMessage(this._getErrorMessage())
                    : initializing
                        ? this._renderLoader()
                        : this._renderReadyContent();
            return (widget_1.tsx("div", { class: this.classes(CSS.panelContent, panelClasses), role: role }, content));
        };
        Directions.prototype._renderReadyContent = function () {
            return [
                this._renderStopsContainer(),
                this._renderTravelModeOptions(),
                this._renderDepartureTimeControls(),
                this._renderSectionSplitter(),
                this._renderDirectionsContainer(),
                this._renderDisclaimer()
            ];
        };
        Directions.prototype._renderSignIn = function () {
            return (widget_1.tsx("div", { key: "sign-in", class: CSS.signInContent },
                widget_1.tsx("h2", { class: this.classes(CSS.heading, CSS.contentTitle) }, i18n.widgetLabel),
                this._renderPlaceholder(),
                widget_1.tsx("h3", { class: CSS.heading }, i18n.signInRequired),
                widget_1.tsx("button", { class: this.classes(CSS.button, CSS.buttonSecondary, CSS.signInButton), tabIndex: 0, onclick: this._handleSignInClick, bind: this }, i18nCommon.auth.signIn)));
        };
        Directions.prototype._handleSignInClick = function () {
            this.viewModel.load();
        };
        Directions.prototype._renderTravelModeOptions = function () {
            var travelModes = this.viewModel.travelModes;
            if (travelModes.length === 0) {
                return null;
            }
            var travelMode = this.viewModel.selectedTravelMode;
            var title = travelMode.name || i18n.travelMode;
            return (widget_1.tsx("select", { "aria-label": title, bind: this, class: this.classes(CSS.travelModeSelect, CSS.select), key: "esri-directions__travel-mode-options", onchange: this._handleTravelModeChange, title: title }, travelModes.map(function (mode) {
                var selected = mode.id === travelMode.id;
                return (widget_1.tsx("option", { key: mode, "data-mode": mode, selected: selected, value: mode.id }, mode.name));
            })));
        };
        Directions.prototype._handleTravelModeChange = function (event) {
            var select = event.currentTarget;
            var option = select.item(select.selectedIndex);
            this.viewModel.selectedTravelMode = option["data-mode"];
        };
        Directions.prototype._renderStopsContainer = function () {
            return (widget_1.tsx("div", { class: CSS.section, key: "esri-directions__stops-container", role: "group" }, this._renderStops()));
        };
        Directions.prototype._renderDepartureTimeControls = function () {
            var startTimeIsNow = this._departureTime === NOW;
            var title = i18n.departureTime;
            return (widget_1.tsx("div", { class: CSS.departureTime, key: "esri-directions__departure-time-controls", role: "group" },
                widget_1.tsx("select", { "aria-label": title, bind: this, class: this.classes(CSS.departureTimeSelect, CSS.select), onchange: this._handleDepartureOptionChange, title: title },
                    widget_1.tsx("option", { value: NOW, selected: startTimeIsNow }, i18n.leaveNow),
                    widget_1.tsx("option", { value: DEPART_BY, selected: !startTimeIsNow }, i18n.departBy)),
                startTimeIsNow ? null : this._renderTimeControls()));
        };
        Directions.prototype._renderStops = function () {
            var _this = this;
            var stops = this._stops;
            var rows = stops.toArray().map(function (stop, i) {
                var _a, _b, _c, _d;
                var numStops = stops.length;
                var newRow = i > 1 && !stop.result;
                var stopIconClasses = (_a = {},
                    _a[CSS.stopsIcon] = i >= 0 && i < numStops - 1,
                    _a[CSS.lastStopIcon] = i === numStops - 1,
                    _a);
                var stopIconContainerClasses = (_b = {},
                    _b[CSS.lastStopIconContainer] = i === numStops - 1,
                    _b);
                var rowClasses = (_c = {},
                    _c[CSS.stopRowDragged] = _this._draggedStopIndex === i,
                    _c[CSS.stopRowDropTarget] = _this._dropTargetStopIndex === i,
                    _c[CSS.validStopRow] = !newRow,
                    _c);
                var underlineClasses = (_d = {},
                    _d[CSS.underlineDragInProcess] = !isNaN(_this._draggedStopIndex),
                    _d);
                var lastStop = stops.getItemAt(numStops - 1);
                var lastStopIsValid = lastStop && lastStop.result;
                var nextStop = stops.getItemAt(i + 1);
                var nextStopIsValid = nextStop && nextStop.result;
                var isLast = i === numStops - 1;
                var nextIsLast = i === numStops - 2;
                var shouldHideReverseIcon = (numStops === 2 && i === 0) ||
                    (numStops > 2 && !isLast && !nextIsLast) ||
                    (numStops > 2 && nextIsLast && nextStopIsValid) ||
                    (numStops > 2 && isLast && !stop.result);
                var shouldHideClearIcon = numStops === 2 || (numStops === 3 && !lastStopIsValid) || newRow;
                var draggable = newRow ? "false" : "true";
                var search = _this._acquireSearch(stop);
                var removeStopTitle = i18n.removeStop, reverseStopsTitle = i18n.reverseStops, unlocated = i18n.unlocated;
                var label = lang_1.substitute({ number: i + 1, label: stop.result ? stop.result.name : unlocated }, i18n.stopLabelTemplate);
                var stopListItemId = _this.id + "__stop--" + i;
                var centerOnStopEnabled = !!search.searchTerm &&
                    !!search.selectedResult &&
                    !!stop.result &&
                    search.selectedResult === stop.result;
                return (widget_1.tsx("li", { "aria-label": label, afterCreate: _this._handleStopFieldCreation, bind: _this, class: _this.classes(CSS.stopRow, rowClasses), id: stopListItemId, key: i, "data-stop-index": i, ondragend: _this._handleStopFieldDragEnd, ondragover: _this._handleStopFieldDragOver, ondragstart: _this._handleStopFieldDragStart, ondrop: _this._handleStopFieldDrop },
                    widget_1.tsx("div", { class: CSS.stopHandle, draggable: draggable },
                        widget_1.tsx("span", { "aria-hidden": "true", class: _this.classes(CSS.stopIcon, CSS.handleIcon, CSS.stopHandleIcon, CSS.interactiveStopIcon) }),
                        widget_1.tsx("div", { bind: _this, "aria-labelledby": stopListItemId, class: _this.classes(CSS.stopIconContainer, stopIconContainerClasses), "data-stop-index": i, onclick: _this._handleStopIconClick, onkeydown: _this._handleStopIconClick, role: "button" },
                            widget_1.tsx("span", { class: _this.classes(CSS.stopIcon, stopIconClasses), tabindex: centerOnStopEnabled ? "0" : null }))),
                    widget_1.tsx("div", { class: CSS.stopInput },
                        search.render(),
                        widget_1.tsx("div", { class: _this.classes(CSS.stopUnderline, underlineClasses) })),
                    widget_1.tsx("div", { class: CSS.stopOptions, role: "group" },
                        widget_1.tsx("div", { "aria-label": removeStopTitle, class: CSS.removeStopButton, bind: _this, "data-stop-index": i, hidden: shouldHideClearIcon, onkeydown: _this._handleRemoveStop, onclick: _this._handleRemoveStop, role: "button", tabIndex: 0, title: removeStopTitle },
                            widget_1.tsx("span", { "aria-hidden": "true", class: _this.classes(CSS.stopIcon, CSS.removeStop, CSS.removeStopIcon, CSS.interactiveStopIcon) }),
                            widget_1.tsx("span", { class: CSS.screenReaderText }, "removeStopTitle")),
                        widget_1.tsx("div", { "aria-label": reverseStopsTitle, class: CSS.reverseStops, bind: _this, hidden: shouldHideReverseIcon, onkeydown: _this._handleReverseStops, onclick: _this._handleReverseStops, role: "button", tabIndex: 0, title: reverseStopsTitle },
                            widget_1.tsx("span", { "aria-hidden": "true", class: _this.classes(CSS.stopIcon, CSS.reverseStopIcon, CSS.interactiveStopIcon) }),
                            widget_1.tsx("span", { class: CSS.screenReaderText }, "removeStopTitle")))));
            });
            var allStopsValid = stops.every(function (stop) {
                var search = _this._stopsToSearches.get(stop);
                return stop.result && search.selectedResult === stop.result;
            });
            var exceededMaxStops = this._stops.length >= this.maxStops;
            var addStopTitle = i18n.addStop;
            var addStop = stops.length >= 2 && allStopsValid && !exceededMaxStops ? (widget_1.tsx("div", { "aria-label": addStopTitle, bind: this, class: CSS.addStop, key: "esri-directions__add-stop", onfocus: this._handleAddStopFocus, tabIndex: 0 },
                widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.addStopIcon, CSS.stopIcon, CSS.interactiveStopIcon) }),
                widget_1.tsx("div", { "aria-hidden": "true", class: CSS.addStopText }, addStopTitle))) : null;
            return (widget_1.tsx("div", null,
                widget_1.tsx("ol", { class: CSS.stops, role: "group" }, rows),
                addStop));
        };
        Directions.prototype._handleStopIconClick = function (event) {
            var element = event.currentTarget;
            var stopIndex = element["data-stop-index"];
            var stop = this._stops.getItemAt(stopIndex);
            if (stop && stop.result) {
                this._centerAtStop(stop);
            }
        };
        Directions.prototype._handleClearRouteClick = function () {
            this.viewModel.reset();
        };
        Directions.prototype._centerAtStop = function (stop) {
            this.viewModel.centerAt(stop.result.feature);
        };
        Directions.prototype._handleStopFieldCreation = function (node) {
            var newPlaceholderStop = this._newPlaceholderStop;
            if (!newPlaceholderStop) {
                return;
            }
            var stopIndex = node["data-stop-index"];
            var stop = this._stops.getItemAt(stopIndex);
            if (newPlaceholderStop === stop) {
                this._acquireSearch(stop).focus();
            }
            this._newPlaceholderStop = null;
        };
        Directions.prototype._handleStopInputBlur = function (search, stop) {
            var _this = this;
            this._handles.remove(REGISTRY_KEYS.awaitingViewClickStop);
            this.view.cursor = this._previousCursor;
            var unchanged = !!search.selectedResult && !!stop.result && search.selectedResult === stop.result;
            if (unchanged) {
                return;
            }
            if (search.activeMenu === "none" &&
                search.searchTerm &&
                (search.selectedResult !== stop.result || (!search.selectedResult && !stop.result))) {
                search.search();
                return;
            }
            if (!search.searchTerm) {
                this._viewClickHandle.resume();
                clearTimeout(this._autoStopRemovalTimeoutId);
                this._autoStopRemovalTimeoutId = setTimeout(function () {
                    if (_this.destroyed) {
                        return;
                    }
                    _this._viewClickHandle.pause();
                    if (search.viewModel.state === "searching") {
                        return;
                    }
                    _this._removeStop(stop);
                    var stopUsedInRoute = !!stop.result;
                    if (stopUsedInRoute) {
                        stop.result = null;
                        _this._processStops();
                    }
                    _this.scheduleRender();
                }, this._autoStopRemovalDelay);
            }
        };
        Directions.prototype._handleStopInputFocus = function (search, stop) {
            if (this._handles.has(REGISTRY_KEYS.awaitingViewClickStop)) {
                return;
            }
            var _a = this, view = _a.view, previousCursor = _a.view.cursor;
            this._previousCursor = previousCursor;
            this._handles.add(watchUtils_1.init(search, "searchTerm", function (term) {
                view.cursor = term.length === 0 ? "copy" : previousCursor;
            }), REGISTRY_KEYS.awaitingViewClickStop);
            this._activeStop = stop;
        };
        Directions.prototype._prepViewClick = function () {
            var _this = this;
            var view = this.get("viewModel.view");
            var viewClickHandle = on_1.pausable(view, "click", this._handleViewClick.bind(this));
            var surfaceClickHandle = on_1.pausable(view.surface, "click", function () {
                clearTimeout(_this._autoStopRemovalTimeoutId);
                surfaceClickHandle.pause();
            });
            return {
                remove: function () {
                    surfaceClickHandle.remove();
                    viewClickHandle.remove();
                },
                pause: function () {
                    surfaceClickHandle.pause();
                    viewClickHandle.pause();
                },
                resume: function () {
                    surfaceClickHandle.resume();
                    viewClickHandle.resume();
                }
            };
        };
        Directions.prototype._handleViewClick = function (event) {
            var _this = this;
            var input = this._stopsToSearches.get(this._activeStop);
            if (input && !input.searchTerm) {
                input.search(event.mapPoint).then(function (response) {
                    var result = getFirstResult(response);
                    var stop = _this._activeStop;
                    stop.result = result;
                    stop.result.feature.attributes.Name = result.name;
                    input.searchTerm = result.name;
                    // let "select-result" event trigger stop processing & rendering
                });
                this.scheduleRender();
            }
            this._viewClickHandle.pause();
            clearTimeout(this._autoStopRemovalTimeoutId);
        };
        Directions.prototype._handleAddStopFocus = function (event) {
            this._addNewPlaceholder();
        };
        Directions.prototype._addNewPlaceholder = function () {
            if (this._newPlaceholderStop) {
                return;
            }
            var placeholder = {};
            this._stops.add(placeholder);
            this._newPlaceholderStop = placeholder;
        };
        Directions.prototype._handleReverseStops = function () {
            this._reverseStops();
        };
        Directions.prototype._reverseStops = function () {
            this._stops.reverse();
            this._processStops();
        };
        Directions.prototype._handleRemoveStop = function (event) {
            var element = event.currentTarget;
            var stopIndex = element["data-stop-index"];
            this._removeStop(this._stops.getItemAt(stopIndex));
            this._processStops();
        };
        Directions.prototype._removeStop = function (stop, force) {
            if (force === void 0) { force = false; }
            if (this._stops.length <= 2 && !force) {
                return;
            }
            this._disposeSearch(stop);
            this._stops.remove(stop);
        };
        Directions.prototype._getStopFieldGhost = function () {
            var ghost = this._ghost;
            if (!ghost) {
                ghost = document.createElement("div");
                ghost.classList.add(CSS.stopRowGhost, CSS.offscreen);
                this._ghost = ghost;
            }
            return ghost;
        };
        Directions.prototype._handleStopFieldDragStart = function (event) {
            var currentTarget = event.currentTarget, dataTransfer = event.dataTransfer;
            var element = currentTarget;
            var index = Number(element["data-stop-index"]);
            this._draggedStopIndex = index;
            var ghost = this._getStopFieldGhost();
            var search = this._acquireSearch(this._stops.getItemAt(index));
            ghost.innerHTML = search.searchTerm || search.activeSource.placeholder;
            document.body.appendChild(ghost);
            var height = ghost.getBoundingClientRect().height;
            dataTransfer.effectAllowed = "move";
            dataTransfer.setDragImage(ghost, 20, height / 2);
            dataTransfer.setData("text/plain", element["data-stop-index"]);
        };
        Directions.prototype._handleStopFieldDragEnd = function () {
            this._draggedStopIndex = null;
            this._dropTargetStopIndex = null;
            document.body.removeChild(this._getStopFieldGhost());
        };
        Directions.prototype._handleStopFieldDragOver = function (event) {
            var element = event.currentTarget;
            var stopIndex = Number(element["data-stop-index"]);
            event.preventDefault(); // needed to allow drop
            if (this._draggedStopIndex === stopIndex) {
                this._dropTargetStopIndex = null;
                return;
            }
            this._dropTargetStopIndex = stopIndex;
        };
        Directions.prototype._handleStopFieldDrop = function (event) {
            event.stopPropagation();
            event.preventDefault();
            var element = event.currentTarget;
            var targetIndex = Number(element["data-stop-index"]);
            var sourceIndex = Number(event.dataTransfer.getData("text/plain"));
            if (sourceIndex === targetIndex) {
                return;
            }
            var stops = this._stops;
            stops.reorder(stops.getItemAt(sourceIndex), targetIndex);
            this._processStops();
        };
        Directions.prototype._handleDepartureOptionChange = function () {
            var _this = this;
            var select = event.currentTarget;
            var option = select.item(select.selectedIndex);
            if (option.value === NOW) {
                this._departureTime = NOW;
                this.viewModel.departureTime = NOW;
                this._handles.remove("departure-time-controls");
            }
            else if (option.value === DEPART_BY) {
                this._departureTime = DEPART_BY;
                this._handles.add([
                    watchUtils_1.init(this._datePicker, "value", function () { return _this._updateDepartureTime(); }),
                    watchUtils_1.init(this._timePicker, "value", function () { return _this._updateDepartureTime(); })
                ], "departure-time-controls");
            }
        };
        Directions.prototype._updateDepartureTime = function () {
            var date = this._datePicker.value;
            var time = this._timePicker.value;
            var joinedTime = moment({
                date: date.date(),
                month: date.month(),
                year: date.year(),
                hour: time.hour(),
                minute: time.minute()
            });
            this.viewModel.departureTime = joinedTime.toDate();
        };
        Directions.prototype._renderTimeControls = function () {
            return (widget_1.tsx("div", { class: CSS.departureTimeControls, key: "esri-directions__time-controls", role: "group" },
                this._datePicker.render(),
                this._timePicker.render()));
        };
        Directions.prototype._renderSectionSplitter = function () {
            return widget_1.tsx("div", { class: CSS.sectionSplitter });
        };
        Directions.prototype._renderDisclaimer = function () {
            var link = "<a class=\"" + CSS.anchor + "\" href=\"http://www.esri.com/legal/software-license\" target=\"_blank\">" + i18n.esriTerms + "</a>";
            var disclaimer = lang_1.substitute({ esriTerms: link }, i18n.disclaimer);
            return widget_1.tsx("div", { class: CSS.disclaimer, innerHTML: disclaimer, key: "esri-directions__disclaimer" });
        };
        Directions.prototype._renderDirectionsContainer = function () {
            return (widget_1.tsx("div", { class: this.classes(CSS.directionsSection, CSS.section), key: "esri-directions__container" }, this._renderDirectionsContainerContent()));
        };
        Directions.prototype._renderLoader = function () {
            return widget_1.tsx("div", { class: CSS.loader, key: "loader" });
        };
        Directions.prototype._renderWarningCard = function () {
            return (widget_1.tsx("div", { class: CSS.warningCard, role: "alert" },
                widget_1.tsx("div", { class: CSS.warningHeader },
                    widget_1.tsx("span", { class: CSS.warningIcon, "aria-hidden": "true" }),
                    widget_1.tsx("div", { class: this.classes(CSS.heading, CSS.warningHeading) }, i18nCommon.warning)),
                widget_1.tsx("div", { class: CSS.warningMessage }, this._getErrorMessage())));
        };
        Directions.prototype._renderDirectionsContainerContent = function () {
            var _a = this.viewModel, directions = _a.lastRoute, state = _a.state;
            var hasError = state === "error";
            var isRouting = state === "routing";
            if (hasError) {
                return this._renderWarningCard();
            }
            if (isRouting) {
                return this._renderLoader();
            }
            if (directions) {
                return (widget_1.tsx("div", { class: CSS.summary, key: "esri-directions__summary", role: "group" },
                    this._renderCosts(),
                    this._renderRouteActions(),
                    this._renderManeuverSections()));
            }
            return (widget_1.tsx("div", { key: "esri-directions__placeholder", class: CSS.emptyContent },
                this._renderPlaceholder(),
                widget_1.tsx("h3", { class: this.classes(CSS.message, CSS.heading) }, i18n.directionsPlaceholder)));
        };
        Directions.prototype._renderPlaceholder = function () {
            return (widget_1.tsx("svg", { class: CSS.emptyIllustration, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256" },
                widget_1.tsx("path", { fill: "currentcolor", d: "M192 36c-15.477 0-24 6.034-24 16.99v45.822l24 24 24-24v-45.82C216 42.033 207.477 36 192 36zm20 61.155l-20 20-20-20V52.99c0-8.62 6.73-12.99 20-12.99s20 4.37 20 12.99zM192 52a12 12 0 1 0 12 12 12.013 12.013 0 0 0-12-12zm0 20a8 8 0 1 1 8-8 8.008 8.008 0 0 1-8 8zM92 140.99C92 130.035 83.477 124 68 124s-24 6.034-24 16.99v45.822l24 24 24-24zm-4 44.165l-20 20-20-20V140.99c0-8.62 6.73-12.99 20-12.99s20 4.37 20 12.99zM68 140a12 12 0 1 0 12 12 12.013 12.013 0 0 0-12-12zm0 20a8 8 0 1 1 8-8 8.008 8.008 0 0 1-8 8zm84-44h16v4h-16zm-24 80h4v12h-12v-4h8zm0-28h4v16h-4zm0-52h12v4h-8v8h-4zm0 24h4v16h-4zm-36 64h16v4H92z" })));
        };
        Directions.prototype._renderMessage = function (text) {
            return widget_1.tsx("h3", null, text);
        };
        Directions.prototype._renderRouteActions = function () {
            return (widget_1.tsx("div", { class: CSS.routeActions },
                widget_1.tsx("button", { "aria-label": i18n.clearRoute, class: this.classes(CSS.clearRouteButton, CSS.button, CSS.buttonTertiary), tabIndex: 0, onclick: this._handleClearRouteClick, bind: this }, i18n.clearRoute)));
        };
        Directions.prototype._renderManeuverSections = function () {
            var _this = this;
            var sections = this._routeSections.sections;
            return (widget_1.tsx("div", { class: CSS.maneuvers, role: "group" }, sections.map(function (section, index) {
                var _a, _b;
                var open = section.open;
                var maneuvers;
                if (section.maneuvers.length > 0 && open) {
                    maneuvers = (widget_1.tsx("ol", { class: CSS.maneuverList }, section.maneuvers.map(function (maneuver) { return _this._renderManeuver(maneuver); })));
                }
                var multiSectionRoute = sections.length > 2;
                var last = index === sections.length - 1;
                var sectionClasses = (_a = {},
                    _a[CSS.collapsibleSection] = multiSectionRoute,
                    _a);
                var sectionHeaderIconClasses = (_b = {},
                    _b[CSS.openIcon] = !open,
                    _b[CSS.closeIcon] = open,
                    _b);
                var sectionHeader;
                if (!multiSectionRoute) {
                    sectionHeader = null;
                }
                else if (last) {
                    sectionHeader = (widget_1.tsx("header", { class: CSS.maneuverSectionHeader, key: "esri-directions__maneuver-section-header" },
                        widget_1.tsx("span", { "aria-hidden": "true", class: CSS.lastStopIcon }),
                        widget_1.tsx("h2", { class: _this.classes(CSS.heading, CSS.maneuverSectionTitle) }, section.name)));
                }
                else {
                    var title = open ? i18nCommon.open : i18nCommon.close;
                    sectionHeader = (widget_1.tsx("header", { class: _this.classes(CSS.maneuverSectionHeader, CSS.maneuverSectionToggle), key: "esri-directions__maneuver-section-header" },
                        widget_1.tsx("div", { "aria-expanded": open, "aria-label": title, bind: _this, class: CSS.maneuverSectionHeaderButton, "data-maneuver-section": section, onkeydown: _this._handleSectionToggle, onclick: _this._handleSectionToggle, role: "button", tabIndex: 0, title: title },
                            widget_1.tsx("span", { "aria-hidden": "true", class: _this.classes(sectionHeaderIconClasses) }),
                            widget_1.tsx("h2", { class: _this.classes(CSS.heading, CSS.maneuverSectionTitle) }, section.name))));
                }
                return (widget_1.tsx("section", { class: _this.classes(CSS.maneuverSection, sectionClasses) },
                    sectionHeader,
                    maneuvers));
            })));
        };
        Directions.prototype._handleSectionToggle = function (event) {
            var element = event.currentTarget;
            var section = element["data-maneuver-section"];
            section.open = !section.open;
        };
        Directions.prototype._renderCosts = function () {
            var directionLines = this.get("viewModel.directionLines");
            var last = directionLines[directionLines.length - 1];
            var now = moment(last.attributes.arriveTimeUTC);
            var time = now.format("LT");
            var gmt = now.format("[GMT]ZZ");
            var costSummary = this._costSummary.set({
                directionsViewModel: this.viewModel
            });
            var title = i18n.zoomToRoute;
            var eta = lang_1.substitute({ time: "<strong>" + time + "</strong>", gmt: gmt }, i18n.etaTemplate);
            var primaryCostsTitle = i18n.primaryCosts;
            var secondaryCostsTitle = i18n.secondaryCosts;
            var etaTitle = i18n.eta;
            return (widget_1.tsx("div", { "aria-label": title, bind: this, class: CSS.directionCosts, onkeydown: this._handleSummaryInteraction, onclick: this._handleSummaryInteraction, role: "button", tabIndex: 0, title: title },
                widget_1.tsx("div", { class: CSS.costsDetails, role: "group" },
                    widget_1.tsx("div", { "aria-label": primaryCostsTitle, class: CSS.primaryCosts, title: primaryCostsTitle }, costSummary.primary),
                    widget_1.tsx("div", { class: CSS.verticalSplitter }),
                    widget_1.tsx("div", { "aria-label": secondaryCostsTitle, class: CSS.secondaryCosts, title: secondaryCostsTitle }, costSummary.secondary)),
                widget_1.tsx("div", { "aria-label": etaTitle, innerHTML: eta, title: etaTitle })));
        };
        Directions.prototype._handleSummaryInteraction = function () {
            this._activeManeuver = null;
            this._focusedManeuver = null;
            this.viewModel.clearHighlights();
            this.zoomToRoute();
        };
        Directions.prototype._getErrorMessage = function () {
            var error = this.viewModel.error;
            if (error.name === "directions-view-model:unable-to-route") {
                return i18n.errors.unableToRoute;
            }
            if (error.name === "directions-view-model:service-metadata-unavailable") {
                return i18n.errors.unableToLoadServiceMetadata;
            }
            return i18n.errors.unknownError;
        };
        Directions.prototype._overrideDefaultSources = function (search) {
            var placeholder = search.view
                ? i18n.searchFieldPlaceholder
                : i18n.viewlessSearchFieldPlaceholder;
            search.viewModel.defaultSources.forEach(function (source) {
                source.placeholder = placeholder;
                source.autoNavigate = false;
            });
        };
        Directions.prototype._acquireSearch = function (stop) {
            var _this = this;
            var view = this.get("viewModel.view");
            if (this._stopsToSearches.has(stop)) {
                var search_1 = this._stopsToSearches.get(stop);
                search_1.view = view;
                this._overrideDefaultSources(search_1);
                return search_1;
            }
            var search = new Search(__assign({ view: view, resultGraphicEnabled: false, popupEnabled: false }, this.searchProperties));
            this._handles.add([
                search.watch("defaultSources", function () { return _this._overrideDefaultSources(search); }),
                search.on("select-result", function () {
                    stop.result = search.selectedResult;
                    stop.result.feature.attributes.Name = search.selectedResult.name;
                    _this._processStops();
                    _this.scheduleRender();
                }),
                search.on("search-focus", function () { return _this._handleStopInputFocus(search, stop); }),
                search.on("search-blur", function () { return _this._handleStopInputBlur(search, stop); })
            ], search);
            this._stopsToSearches.set(stop, search);
            return search;
        };
        Directions.prototype._disposeSearch = function (stop) {
            this._stopsToSearches.get(stop).destroy();
            this._stopsToSearches.delete(stop);
        };
        Directions.prototype._processStops = function () {
            var vm = this.viewModel;
            vm.stops.removeAll();
            vm.stops.addMany(this._stops.filter(function (stop) { return !!stop.result; }).map(function (stop) { return stop.result.feature; }));
            if (vm.stops.length > 1) {
                vm.getDirections();
            }
        };
        Directions.prototype._renderManeuver = function (maneuver) {
            var _a;
            var cumulativeCosts = "";
            var intermediateCosts;
            var attributes = maneuver.attributes;
            var distanceUnits = this.get("viewModel.routeParameters.directionsLengthUnits");
            var length = directionsUtils_1.formatDistance(attributes.length, { toUnits: distanceUnits });
            var time = directionsUtils_1.formatTime(attributes.time);
            var associatedStop = directionsUtils_1.getAssociatedStop(maneuver);
            if (directionsUtils_1.useSpatiallyLocalTime(maneuver, this.get("viewModel.routeParameters.startTime"))) {
                intermediateCosts = directionsUtils_1.toSpatiallyLocalTimeString(attributes.arriveTimeUTC, attributes.ETA, this._departureTime === NOW);
            }
            else if (length) {
                intermediateCosts = time ? length + "&nbsp;&middot;<wbr>&nbsp;" + time : length;
            }
            var showAsHeader = associatedStop;
            var maneuverText = this._getFormattedManeuverText(maneuver);
            var iconPath = this._getIconPath(attributes.maneuverType);
            if (showAsHeader) {
                return (widget_1.tsx("li", { class: CSS.maneuver, key: maneuver },
                    widget_1.tsx("header", null, associatedStop.attributes.Name)));
            }
            var maneuverId = "esri-directions__maneuver-" + maneuver.uid;
            var cumulativeCostsId = "esri-directions__cumulative-costs-" + maneuver.uid;
            var intermediateCostsId = "esri-directions__intermediate-costs-" + maneuver.uid;
            var maneuverClasses = (_a = {},
                _a[CSS.maneuverActive] = this._activeManeuver === maneuver,
                _a);
            return (widget_1.tsx("li", { "aria-labelledby": maneuverId + " " + cumulativeCostsId + " " + intermediateCostsId, bind: this, class: this.classes(CSS.maneuver, maneuverClasses), "data-maneuver": maneuver, key: maneuver, onclick: this._handleManeuverClick, onkeydown: this._handleManeuverClick, onfocus: this._handleManeuverFocus, onmouseover: this._handleManeuverMouseOver, onmouseout: this._handleManeuverMouseOut, onblur: this._handleManeuverBlur, tabIndex: 0 },
                widget_1.tsx("img", { alt: "", class: CSS.maneuverIcon, src: iconPath }),
                widget_1.tsx("div", { class: CSS.maneuverCostsContainer },
                    widget_1.tsx("span", { id: maneuverId, innerHTML: maneuverText }),
                    widget_1.tsx("div", { class: CSS.maneuverCosts },
                        widget_1.tsx("div", { class: CSS.horizontalSplitter }),
                        widget_1.tsx("div", { id: cumulativeCostsId, "aria-label": i18n.cumulativeCosts, class: CSS.cumulativeCost, innerHTML: cumulativeCosts, title: i18n.cumulativeCosts }),
                        widget_1.tsx("div", { id: intermediateCostsId, "aria-label": i18n.intermediateCosts, class: CSS.intermediateCost, innerHTML: intermediateCosts, title: i18n.intermediateCosts })))));
        };
        Directions.prototype._getIconPath = function (maneuverType) {
            var iconName = maneuverUtils_1.toIconName(maneuverType);
            var iconFormat = window.devicePixelRatio === 2 ? "@2x" : "";
            return "" + MANEUVER_ICON_DIR + iconName + iconFormat + ".png";
        };
        Directions.prototype._handleManeuverClick = function (event) {
            var element = event.currentTarget;
            var maneuver = element["data-maneuver"];
            if (this._activeManeuver === maneuver) {
                this._activeManeuver = null;
                this.zoomToRoute();
                return;
            }
            this._activeManeuver = maneuver;
            this.viewModel.centerAt(maneuver);
            this.viewModel.highlightSegment(maneuver);
        };
        Directions.prototype._handleManeuverMouseOver = function (event) {
            if (this._activeManeuver || this._focusedManeuver) {
                return;
            }
            var element = event.currentTarget;
            var maneuver = element["data-maneuver"];
            this.viewModel.highlightSegment(maneuver);
        };
        Directions.prototype._handleManeuverMouseOut = function () {
            if (this._activeManeuver || this._focusedManeuver) {
                return;
            }
            this.viewModel.clearHighlights();
        };
        Directions.prototype._handleManeuverBlur = function () {
            if (this._activeManeuver) {
                return;
            }
            this._focusedManeuver = null;
            this.viewModel.clearHighlights();
        };
        Directions.prototype._handleManeuverFocus = function (event) {
            if (this._activeManeuver) {
                return;
            }
            var element = event.currentTarget;
            var maneuver = element["data-maneuver"];
            this._focusedManeuver = maneuver;
            this.viewModel.highlightSegment(maneuver);
        };
        Directions.prototype._getFormattedManeuverText = function (maneuver) {
            var text = maneuver.attributes.text, toEmphasize = maneuver.strings;
            if (!toEmphasize) {
                return text;
            }
            var maneuverText = text;
            toEmphasize.forEach(function (string) {
                maneuverText = maneuverText.replace(string.string, "<strong>" + string.string + "</strong>");
            });
            return maneuverText;
        };
        __decorate([
            decorators_1.aliasOf("viewModel.goToOverride")
        ], Directions.prototype, "goToOverride", void 0);
        __decorate([
            decorators_1.property()
        ], Directions.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], Directions.prototype, "label", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.maxStops")
        ], Directions.prototype, "maxStops", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.routeServiceUrl")
        ], Directions.prototype, "routeServiceUrl", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.routeSymbol")
        ], Directions.prototype, "routeSymbol", void 0);
        __decorate([
            decorators_1.property()
        ], Directions.prototype, "searchProperties", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.stopSymbols")
        ], Directions.prototype, "stopSymbols", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Directions.prototype, "view", void 0);
        __decorate([
            widget_1.renderable(["lastRoute", "state", "travelModes"]),
            decorators_1.property({
                type: DirectionsViewModel
            })
        ], Directions.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.getDirections")
        ], Directions.prototype, "getDirections", null);
        __decorate([
            decorators_1.aliasOf("viewModel.zoomToRoute")
        ], Directions.prototype, "zoomToRoute", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Directions.prototype, "_handleStopIconClick", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Directions.prototype, "_handleClearRouteClick", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Directions.prototype, "_handleReverseStops", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Directions.prototype, "_handleRemoveStop", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Directions.prototype, "_handleSectionToggle", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Directions.prototype, "_handleSummaryInteraction", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Directions.prototype, "_handleManeuverClick", null);
        Directions = __decorate([
            decorators_1.subclass("esri.widgets.Directions")
        ], Directions);
        return Directions;
    }(decorators_1.declared(Widget)));
    return Directions;
});
//# sourceMappingURL=Directions.js.map