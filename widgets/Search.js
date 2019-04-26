/**
 * The Search widget provides a way to perform search operations on {@link module:esri/tasks/Locator locator service(s)}
 * and/or {@link module:esri/layers/MapImageLayer map}/{@link module:esri/layers/FeatureLayer feature}
 * service feature layer(s).
 * If using a locator with a geocoding service, the
 * [findAddressCandidates](https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm)
 * operation is used, whereas {@link module:esri/tasks/support/Query queries} are used on feature layers.
 *
 * ![search](../../assets/img/apiref/widgets/search.png)
 *
 * You can use the view's {@link module:esri/views/ui/DefaultUI} to add widgets
 * to the view's user interface via the {@link module:esri/views/View#ui ui} property on the view.
 * See the example below.
 *
 * @example
 * var searchWidget = new Search({
 *   view: view
 * });
 * // Adds the search widget below other elements in
 * // the top left corner of the view
 * view.ui.add(searchWidget, {
 *   position: "top-left",
 *   index: 2
 * });
 *
 * @module esri/widgets/Search
 * @since 4.0
 *
 * @see [Search.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Search.tsx)
 * @see [Search.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Search.scss)
 * @see [Sample - Search widget (3D)](../sample-code/widgets-search-3d/index.html)
 * @see [Sample - Search widget with multiple sources](../sample-code/widgets-search-multiplesource/index.html)
 * @see module:esri/tasks/Locator
 * @see module:esri/layers/FeatureLayer
 * @see module:esri/widgets/Search/SearchViewModel
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "@dojo/framework/shim/array", "dojo/i18n!esri/nls/common", "dojo/i18n!esri/widgets/Search/nls/Search", "dojo/keys", "dojo/regexp", "esri/core/Handles", "esri/core/lang", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/Search/SearchResultRenderer", "esri/widgets/Search/SearchViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, array_1, i18nCommon, i18n, keys_1, regexp, Handles, esriLang, watchUtils, decorators_1, Widget, SearchResultRenderer, SearchViewModel, widget_1) {
    "use strict";
    i18nCommon = __importStar(i18nCommon);
    i18n = __importStar(i18n);
    var CSS = {
        base: "esri-search esri-widget",
        loader: "esri-widget__loader",
        loaderText: "esri-widget__loader-text",
        loaderAnimation: "esri-widget__loader-animation",
        esriInput: "esri-input",
        hasMultipleSources: "esri-search--multiple-sources",
        isLoading: "esri-search--loading",
        isSearching: "esri-search--searching",
        showSuggestions: "esri-search--show-suggestions",
        showSources: "esri-search--sources",
        showWarning: "esri-search--warning",
        container: "esri-search__container",
        input: "esri-search__input",
        inputContainer: "esri-search__input-container",
        form: "esri-search__form",
        submitButton: "esri-search__submit-button",
        sourcesButton: "esri-search__sources-button",
        clearButton: "esri-search__clear-button",
        sourceName: "esri-search__source-name",
        suggestionsMenu: "esri-search__suggestions-menu",
        suggestionList: "esri-search__suggestions-list",
        suggestionListCurrentLocation: "esri-search__suggestions-list--current-location",
        sourcesMenu: "esri-search__sources-menu",
        source: "esri-search__source",
        activeSource: "esri-search__source--active",
        warningMenu: "esri-search__warning-menu",
        warningMenuBody: "esri-search__warning-body",
        warningMenuHeader: "esri-search__warning-header",
        warningMenuText: "esri-search__warning-text",
        noValueText: "esri-search__no-value-text",
        // icons + common
        button: "esri-widget--button",
        fallbackText: "esri-icon-font-fallback-text",
        header: "esri-widget__heading",
        locate: "esri-icon-locate-circled",
        menu: "esri-menu",
        menuHeader: "esri-menu__header",
        loadingIcon: "esri-icon-loading-indicator esri-rotating",
        searchIcon: "esri-icon-search",
        dropdownIcon: "esri-icon-down-arrow esri-search__sources-button--down",
        dropupIcon: "esri-icon-up-arrow esri-search__sources-button--up",
        clearIcon: "esri-icon-close",
        noticeIcon: "esri-icon-notice-triangle",
        widgetIcon: "esri-icon-search",
        // common
        disabled: "esri-disabled"
    };
    var regexContainsHTML = /<[a-z/][\s\S]*>/i;
    var Search = /** @class */ (function (_super) {
        __extends(Search, _super);
        /**
         * The result object returned from a [search()](#search).
         *
         * @typedef SearchResult
         *
         * @property {module:esri/geometry/Extent} extent - The extent, or bounding box, of the returned feature.
         * @property {module:esri/Graphic} feature - The resulting feature or location obtained from the search.
         * @property {string} name - The name of the result.
         */
        /**
         * The result object returned from a [suggest()](#suggest).
         *
         * @typedef SuggestResult
         *
         * @property {string} key - The key related to the suggest result.
         * @property {string} text - The string name of the suggested location to geocode.
         * @property {number} sourceIndex - The index of the currently selected result.
         */
        /**
         * When resolved, returns this response after calling [search](#search).
         *
         * @typedef SearchResponse
         *
         * @property {number} activeSourceIndex - The index of the source from which the search result was obtained.
         * @property {Error[]} errors - An array of error objects returned from the search results.
         * @property {number} numResults - The number of search results.
         * @property {string} searchTerm - The searched expression
         * @property {Object[]} results - An array of objects representing the results of search. See object specification
         * table below for more information about the result object.
         * @property {module:esri/widgets/Search~SearchResult[]} results.results - An array of search results.
         * @property {number} results.sourceIndex - The index of the currently selected source.
         * @property {Object} results.source - The [source](#sources) of the selected result.
         */
        /**
         * When resolved, returns this response after calling [suggest](#suggest).
         *
         * @typedef SuggestResponse
         *
         * @property {number} activeSourceIndex - The index of the source from which suggestions are obtained. This value is `-1` when all sources are selected.
         * @property {Error[]} errors - An array of error objects returned from the suggest results.
         * @property {number} numResults - The number of suggest results.
         * @property {string} searchTerm - The search expression used for the suggest.
         * @property {Object[]} results - An array of objects representing the results of suggest. See object specification
         * table below for more information about the result object.
         * @property {module:esri/widgets/Search~SuggestResult[]} results.results - An array of suggest results.
         * @property {number} results.sourceIndex - The index of the currently selected source.
         * @property {Object} results.source - The [source](#sources) of the selected result.
         */
        /**
         * Fires when the widget's text input loses focus.
         *
         * @event module:esri/widgets/Search#search-blur
         *
         * @example
         * var searchWidget = new Search();
         *
         * searchWidget.on("search-blur", function(event){
         *   console.log("Focus removed from search input textbox.");
         * });
         */
        /**
         * Fires when the widget's text input sets focus.
         *
         * @event module:esri/widgets/Search#search-focus
         *
         * @example
         * var searchWidget = new Search();
         *
         * searchWidget.on("search-focus", function(event){
         *   console.log("Search input textbox is focused.");
         * });
         */
        /**
         * Fires when a result is cleared from the input box or a new result is selected.
         *
         * @event module:esri/widgets/Search#search-clear
         *
         * @example
         * var searchWidget = new Search();
         *
         * searchWidget.on("search-clear", function(event){
         *   console.log("Search input textbox was cleared.");
         * });
         */
        /**
         * Fires when the [search()](#search) method starts.
         *
         * @event module:esri/widgets/Search#search-start
         *
         * @example
         * var searchWidget = new Search();
         *
         * searchWidget.on("search-start", function(event){
         *   console.log("Search started.");
         * });
         */
        /**
         * Fires when the [suggest()](#suggest) method starts.
         *
         * @event module:esri/widgets/Search#suggest-start
         *
         * @example
         * var searchWidget = new Search();
         *
         * searchWidget.on("suggest-start", function(event){
         *   console.log("suggest-start", event);
         * });
         */
        /**
         * Fires when the [search()](#search) method is called and returns its results.
         *
         * @event module:esri/widgets/Search#search-complete
         * @property {number} activeSourceIndex - The index of the source from which the search result was obtained.
         * @property {Error[]} errors - An array of error objects returned from the search results.
         * @property {number} numResults - The number of results from the search.
         * @property {string} searchTerm - The searched expression.
         * @property {Object[]} results - An array of objects representing the results of the search. See object specification
         * table below for more information about the result object.
         * @property {module:esri/widgets/Search~SearchResult[]} results.results - An array of objects containing the search results.
         * @property {number} results.sourceIndex - The index of the currently selected source.
         * @property {Object} results.source - The [source](#sources) of the selected result.
         *
         * @example
         * var searchWidget = new Search();
         *
         * searchWidget.on("search-complete", function(event){
         *   // The results are stored in the event Object[]
         *   console.log("Results of the search: ", event);
         * });
         */
        /**
         * Fires when a search result is selected.
         *
         * @event module:esri/widgets/Search#select-result
         * @property {Object} result - An object containing the results of the search.
         * @property {module:esri/geometry/Extent} result.extent - The extent of the result to zoom to.
         * @property {module:esri/Graphic} result.feature - The graphic feature to place at the location of the search result.
         * @property {string} result.name - The string name of the geocoded location.
         * @property {Object} source - The source of the selected result. Please see [sources](#sources) for
         * additional information on its properties.
         * @property {number} sourceIndex - The index of the source of the selected result.
         *
         * @example
         * var searchWidget = new Search();
         *
         * searchWidget.on("select-result", function(event){
         *   console.log("The selected search result: ", event);
         * });
         */
        /**
         * Fires when the [suggest](#suggest) method is called and returns its results.
         *
         * @event module:esri/widgets/Search#suggest-complete
         * @property {number} activeSourceIndex - The index of the source from which suggestions are obtained. This value is `-1` when all sources are selected.
         * @property {Error[]} errors - An array of error objects returned from the suggest results.
         * @property {number} numResults - The number of suggest results.
         * @property {string} searchTerm - The search expression used for the suggest.
         * @property {Object[]} results - An array of objects representing the results of suggest. See object specification table below for more information on this object.
         * @property {module:esri/widgets/Search~SuggestResult[]} results.results - An array of objects containing the suggest results.
         * @property {number} results.sourceIndex - The index of the currently selected source.
         * @property {Object} results.source - The [source](#sources) of the selected result.
         *
         * @example
         * var searchWidget = new Search();
         *
         * searchWidget.on("suggest-complete", function(event){
         *   // The results are stored in the event Object[]
         *   console.log("Results of suggest: ", event);
         * });
         */
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @alias module:esri/widgets/Search
         * @extends module:esri/widgets/Widget
         * @mixes module:esri/widgets/support/GoTo
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                              that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * var search = new Search({
         *   view: view,
         *   sources: [ ... ]
         * });
         */
        function Search(value) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._handles = new Handles();
            _this._inputNode = null;
            _this._sourceMenuButtonNode = null;
            _this._sourceListNode = null;
            _this._suggestionListNode = null;
            _this._searchResultRenderer = new SearchResultRenderer({
                container: document.createElement("div")
            });
            _this._suggestPromise = null;
            _this._relatedTarget = null;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  activeMenu
            //----------------------------------
            /**
             * The current active menu of the Search widget.
             *
             * **Possible Values:** none | suggestion | source | warning
             *
             * @name activeMenu
             * @instance
             * @type {string}
             * @default none
             */
            _this.activeMenu = "none";
            //----------------------------------
            //  activeSource
            //----------------------------------
            /**
             * The [source](#sources) object currently selected. Can be either a
             * {@link module:esri/widgets/Search/LayerSearchSource} or a {@link module:esri/widget/Search/LocatorSearchSource}.
             *
             * @name activeSource
             * @instance
             * @default null
             * @type {module:esri/widgets/Search/LayerSearchSource | module:esri/widgets/Search/LocatorSearchSource}
             * @readonly
             */
            _this.activeSource = null;
            //----------------------------------
            //  activeSourceIndex
            //----------------------------------
            /**
             * The selected source's index. This value is `-1` when all sources are selected.
             *
             * @name activeSourceIndex
             * @instance
             * @type {number}
             * @default 0
             */
            _this.activeSourceIndex = null;
            //----------------------------------
            //  allPlaceholder
            //----------------------------------
            /**
             * String value used as a hint for input text when searching on multiple sources. See
             * the image below to view the location and style of this text in the context of the widget.
             *
             * ![search-allPlaceholder](../../assets/img/apiref/widgets/search-allplaceholder.png)
             *
             * @name allPlaceholder
             * @instance
             * @type {string}
             * @default "Find address or place"
             */
            _this.allPlaceholder = null;
            //----------------------------------
            //  allSources
            //----------------------------------
            //----------------------------------
            //  allSources
            //----------------------------------
            /**
             * The combined collection of {@link module:esri/widgets/Search/SearchViewModel#defaultSources defaultSources}
             * and {@link module:esri/widgets/Search/SearchViewModel#sources sources}.
             * The {@link module:esri/widgets/Search/SearchViewModel#defaultSources defaultSources}
             * displays first in the Search UI.
             *
             * @name allSources
             * @instance
             * @type {module:esri/core/Collection<module:esri/widgets/Search/LayerSearchSource | module:esri/widgets/Search/LocatorSearchSource>}
             * @readonly
             * @since 4.8
             */
            _this.allSources = null;
            //----------------------------------
            //  autoNavigate
            //----------------------------------
            /**
             * Indicates whether to automatically navigate to the selected result.
             *
             * @type {boolean}
             * @ignore
             */
            _this.autoNavigate = null;
            //----------------------------------
            //  autoSelect
            //----------------------------------
            /**
             * Indicates whether to automatically select and zoom to the first geocoded result. If `false`, the
             * [findAddressCandidates](https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm)
             * operation will still geocode the input string, but the top result will not be selected. To work with the
             * geocoded results, you can set up a [search-complete](#event:search-complete) event handler and get the results
             * through the event object.
             *
             * @name autoSelect
             * @instance
             * @type {boolean}
             * @default true
             */
            _this.autoSelect = null;
            //----------------------------------
            //  defaultSources
            //----------------------------------
            /**
             * A read-only property that is a {@link module:esri/core/Collection Collection}
             * of {@link module:esri/widgets/Search/LayerSearchSource}
             * and/or {@link module:esri/widgets/Search/LocatorSearchSource}. This property
             * may contain [ArcGIS Portal](https://enterprise.arcgis.com/en/portal/)
             * [locators](http://enterprise.arcgis.com/en/server/latest/publish-services/windows/geocode-services.htm)
             * and any web map or web scene [configurable search sources](http://doc.arcgis.com/en/arcgis-online/create-maps/configure-feature-search.htm).
             *
             * This property is used to populate the Search UI if the {@link module:esri/widgets/Search/SearchViewModel#sources sources} property is not set.
             *
             * @name defaultSources
             * @instance
             * @type {module:esri/core/Collection<module:esri/widgets/Search/LayerSearchSource | module:esri/widgets/Search/LocatorSearchSource>}
             * @readonly
             * @since 4.8
             */
            _this.defaultSources = null;
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
            //  includeDefaultSources
            //----------------------------------
            /**
             * Indicates whether or not to include {@link module:esri/widgets/Search/SearchViewModel#defaultSources defaultSources} in the Search UI.
             * This can be a boolean value or a function that returns an array of Search {@link module:esri/widgets/Search/SearchViewModel#sources sources}.
             *
             * @name includeDefaultSources
             * @instance
             * @type {boolean | Function}
             * @default true
             * @since 4.8
             */
            _this.includeDefaultSources = null;
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
            //  locationEnabled
            //----------------------------------
            /**
             * Enables location services within the widget.
             *
             * ![locationEnabled](../../assets/img/apiref/widgets/search-locationEnabled.png)
             *
             * ::: esri-md class="panel trailer-1"
             * The use of this property is only supported on secure origins.
             * To use it, switch your application to a secure origin, such as HTTPS.
             * Note that localhost is considered "potentially secure" and can be used for easy testing in browsers that supports
             * [Window.isSecureContext](https://developer.mozilla.org/en-US/docs/Web/API/Window/isSecureContext#Browser_compatibility)
             * (currently Chrome and Firefox).
             * :::
             *
             * @name locationEnabled
             * @instance
             * @since 4.6
             * @type {boolean}
             * @default true
             *
             */
            _this.locationEnabled = null;
            //----------------------------------
            //  locationToAddressDistance
            //----------------------------------
            /**
             * The default distance in meters used to reverse geocode (if not specified by source).
             *
             * @deprecated since version 4.11.
             * @type {number}
             * @ignore
             */
            _this.locationToAddressDistance = null;
            //----------------------------------
            //  maxResults
            //----------------------------------
            /**
             * The maximum number of results returned by the widget if not specified by the source.
             *
             * @name maxResults
             * @instance
             * @type {number}
             * @default 6
             */
            _this.maxResults = null;
            //----------------------------------
            //  maxSuggestions
            //----------------------------------
            /**
             * The maximum number of suggestions returned by the widget if not specified by the source.
             *
             * If working with the default
             * [ArcGIS Online Geocoding service](https://developers.arcgis.com/rest/geocode/api-reference/overview-world-geocoding-service.htm),
             * the default remains at `5`.
             *
             * @name maxSuggestions
             * @instance
             * @type {number}
             * @default 6
             */
            _this.maxSuggestions = null;
            //----------------------------------
            //  minSuggestCharacters
            //----------------------------------
            /**
             * The minimum number of characters needed for the search if not specified by the source.
             *
             * @name minSuggestCharacters
             * @instance
             * @type {number}
             * @default 1
             */
            _this.minSuggestCharacters = null;
            //----------------------------------
            //  popupEnabled
            //----------------------------------
            /**
             * Indicates whether to display the {@link module:esri/widgets/Popup} on feature click. The graphic can
             * be clicked to display a {@link module:esri/widgets/Popup}.
             *
             * @name popupEnabled
             * @instance
             * @type {boolean}
             * @default true
             */
            _this.popupEnabled = null;
            //----------------------------------
            //  popupTemplate
            //----------------------------------
            /**
             * A customized {@link module:esri/PopupTemplate} for the selected feature.
             * Note that any {@link module:esri/PopopTemplate templates}
             * defined on [allSources](#allSources) take precedence over those defined directly on the template.
             *
             * @name popupTemplate
             * @instance
             * @type {module:esri/PopupTemplate}
             */
            _this.popupTemplate = null;
            //----------------------------------
            //  portal
            //----------------------------------
            /**
             * It is possible to search a specified portal instance's [locator services](http://enterprise.arcgis.com/en/portal/latest/administer/windows/configure-portal-to-geocode-addresses.htm)
             * Use this property to set this [ArcGIS Portal](https://enterprise.arcgis.com/en/portal/) instance to search.
             *
             * @name portal
             * @instance
             * @type {module:esri/portal/Portal}
             * @default
             * @since 4.8
             */
            _this.portal = null;
            //----------------------------------
            //  resultGraphic
            //----------------------------------
            /**
             * The graphic used to highlight the resulting feature or location.
             *
             * :::esri-md class="panel trailer-1"
             * A graphic will be placed in the View's
             * {@link module:esri/views/View#graphics graphics}
             * for {@link module:esri/views/layers/LayerView layer views}
             * that do not support the `highlight` method.
             * :::
             *
             * @name resultGraphic
             * @instance
             * @type {module:esri/Graphic}
             * @readonly
             */
            _this.resultGraphic = null;
            //----------------------------------
            //  resultGraphicEnabled
            //----------------------------------
            /**
             * Indicates if the [resultGraphic](#resultGraphic) will display at the
             * location of the selected feature.
             *
             * @name resultGraphicEnabled
             * @instance
             * @type {boolean}
             * @default true
             */
            _this.resultGraphicEnabled = null;
            //----------------------------------
            //  results
            //----------------------------------
            /**
             * An array of objects, each containing a [SearchResult](#SearchResult) from the search.
             *
             * @name results
             * @instance
             * @type {Object[]}
             * @readonly
             */
            _this.results = null;
            //----------------------------------
            //  searchAllEnabled
            //----------------------------------
            /**
             * Indicates whether to display the option to search all sources. When `true`, the "All" option
             * is displayed by default:
             *
             * ![search-searchAllEnabled-true](../../assets/img/apiref/widgets/search-enablesearchingall-true.png)
             *
             * When `false`, no option to search all sources at once is available:
             *
             * ![search-searchAllEnabled-false](../../assets/img/apiref/widgets/search-enablesearchingall-false.png)
             *
             * @name searchAllEnabled
             * @instance
             * @type {boolean}
             * @default true
             */
            _this.searchAllEnabled = null;
            //----------------------------------
            //  searchTerm
            //----------------------------------
            /**
             * The value of the search box input text string.
             *
             * @name searchTerm
             * @instance
             * @type {string}
             */
            _this.searchTerm = null;
            //----------------------------------
            //  selectedResult
            //----------------------------------
            /**
             * The result selected from a search.
             *
             * @name selectedResult
             * @instance
             * @type {module:esri/widgets/Search~SearchResult}
             *
             * @see [Event: select-result](#event:select-result)
             * @see [select()](#select)
             * @readonly
             */
            _this.selectedResult = null;
            //----------------------------------
            //  sources
            //----------------------------------
            /**
             * The Search widget may be used to search features in a
             * {@link module:esri/layers/FeatureLayer} or geocode locations with a
             * {@link module:esri/tasks/Locator}. The `sources` property defines the sources from which
             * to search for the [view](#view) specified by the Search widget instance.
             * There are two types of sources:
             *
             * * {@link module:esri/widgets/Search/LayerSearchSource}
             * * {@link module:esri/widgets/Search/LocatorSearchSource}
             *
             * Any combination of these sources may be used
             * together in the same instance of the Search widget.
             *
             * ::: esri-md class="panel trailer-1"
             * Feature layers created from client-side graphics are not supported.
             * :::
             *
             * @name sources
             * @autocast
             * @instance
             * @type {module:esri/core/Collection<module:esri/widgets/Search/LayerSearchSource | module:esri/widgets/Search/LocatorSearchSource>}
             *
             * @example
             * // Default sources[] when sources is not specified
             * [
             *   {
             *     locator: new Locator({ url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" }),
             *     singleLineFieldName: "SingleLine",
             *     outFields: ["Addr_type"],
             *     name: "ArcGIS World Geocoding Service",
             *     localSearchOptions: {
             *       minScale: 300000,
             *       distance: 50000
             *     },
             *     placeholder: i18n.placeholder,
             *     resultSymbol: {
             *        type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
             *        url: this.basePath + "/images/search/search-symbol-32.png",
             *        size: 24,
             *        width: 24,
             *        height: 24,
             *        xoffset: 0,
             *        yoffset: 0
             *    }
             *   }
             * ]
             *
             * @example
             * // Example of multiple sources[]
             * var sources = [
             * {
             *   locator: new Locator({ url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" }),
             *   singleLineFieldName: "SingleLine",
             *   name: "Custom Geocoding Service",
             *   localSearchOptions: {
             *     minScale: 300000,
             *     distance: 50000
             *   },
             *   placeholder: "Search Geocoder",
             *   maxResults: 3,
             *   maxSuggestions: 6,
             *   suggestionsEnabled: false,
             *   minSuggestCharacters: 0
             * }, {
             *   featureLayer: new FeatureLayer({
             *     url: "https://services.arcgis.com/DO4gTjwJVIJ7O9Ca/arcgis/rest/services/GeoForm_Survey_v11_live/FeatureServer/0",
             *     outFields: ["*"]
             *   }),
             *   searchFields: ["Email", "URL"],
             *   displayField: "Email",
             *   exactMatch: false,
             *   outFields: ["*"],
             *   name: "Point FS",
             *   placeholder: "example: esri",
             *   maxResults: 6,
             *   maxSuggestions: 6,
             *   suggestionsEnabled: true,
             *   minSuggestCharacters: 0
             * },
             * {
             *   featureLayer: new FeatureLayer({
             *     outFields: ["*"]
             *   }),
             *   placeholder: "esri",
             *   name: "A FeatureLayer",
             *   prefix: "",
             *   suffix: "",
             *   maxResults: 1,
             *   maxSuggestions: 6,
             *   exactMatch: false,
             *   searchFields: [], // defaults to FeatureLayer.displayField
             *   displayField: "", // defaults to FeatureLayer.displayField
             *   minSuggestCharacters: 0
             * }
             * ];
             *
             * @example
             * // Set source(s) on creation
             * var searchWidget = new Search({
             *   sources: []
             * });
             *
             * @example
             * // Set source(s)
             * var searchWidget = new Search();
             * var sources = [{ ... }, { ... }, { ... }]; //array of sources
             * searchWidget.sources = sources;
             *
             * @example
             * // Add to source(s)
             * var searchWidget = new Search();
             * searchWidget.sources.push({ ... });  //new source
             */
            _this.sources = null;
            //----------------------------------
            //  suggestions
            //----------------------------------
            /**
             * An array of results from the [suggest method](#suggest).
             *
             * This is available if working with a 10.3 or greater geocoding service that has [suggest capability
             * loaded](https://developers.arcgis.com/rest/geocode/api-reference/geocoding-suggest.htm) or a
             * 10.3 or greater feature layer that supports pagination, i.e. `supportsPagination = true`.
             *
             * @name suggestions
             * @instance
             * @type {module:esri/widgets/Search~SuggestResult[]}
             * @readonly
             */
            _this.suggestions = null;
            //----------------------------------
            //  suggestionsEnabled
            //----------------------------------
            /**
             * Enable suggestions for the widget.
             *
             * This is only available if working with a 10.3 or greater geocoding service that has [suggest capability
             * loaded](https://developers.arcgis.com/rest/geocode/api-reference/geocoding-suggest.htm) or a 10.3 or greater feature layer that supports pagination, i.e. `supportsPagination = true`.
             *
             * @name suggestionsEnabled
             * @instance
             * @type {boolean}
             * @default true
             */
            _this.suggestionsEnabled = null;
            //----------------------------------
            //  view
            //----------------------------------
            /**
             * A reference to the {@link module:esri/views/MapView} or {@link module:esri/views/SceneView}. Set this to link the widget to a specific view.
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
             * {@link module:esri/widgets/Search/SearchViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/Search/SearchViewModel}
             * @autocast
             */
            _this.viewModel = new SearchViewModel();
            _this.own(watchUtils.watch(_this, "searchTerm", function (value) {
                var hideActiveMenu = (value && _this.activeMenu === "warning") ||
                    (!value && !_this.get("viewModel.selectedSuggestion.location"));
                if (hideActiveMenu) {
                    _this.activeMenu = "none";
                }
            }), watchUtils.on(_this, "viewModel.allSources", "change", function () { return _this._watchSourceChanges(); }), watchUtils.init(_this, ["viewModel.popupTemplate", "viewModel.popupTemplate.content"], function () {
                var content = _this.get("viewModel.popupTemplate.content");
                var defaultVMContent = "{Match_addr}";
                // use search result renderer widget
                if (content === defaultVMContent) {
                    _this.viewModel.popupTemplate.content = _this._renderSearchResultsContent.bind(_this);
                }
            }));
            return _this;
        }
        Search.prototype.destroy = function () {
            this._handles.destroy();
            this._handles = null;
            this._cancelSuggest();
            if (this._searchResultRenderer) {
                this._searchResultRenderer.viewModel = null;
                this._searchResultRenderer.destroy();
                this._searchResultRenderer = null;
            }
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        /**
         * Clears the current searchTerm, search results, suggest results, graphic, and graphics layer.
         * It also hides any open menus.
         */
        Search.prototype.clear = function () { };
        /**
         * Brings focus to the widget's text input.
         *
         * @method
         */
        Search.prototype.focus = function () {
            if (!this._inputNode) {
                return;
            }
            this.activeMenu = "suggestion";
            this._inputNode.focus();
            this.emit("search-focus");
        };
        /**
         * Unfocuses the widget's text input.
         *
         * @method
         */
        Search.prototype.blur = function (event) {
            if (!this._inputNode) {
                return;
            }
            this._inputNode.blur();
            this._inputBlur(event);
            this.emit("search-blur");
        };
        /**
         * Depending on the sources specified, search() queries the feature layer(s) and/or performs
         * address matching using any specified {@link module:esri/tasks/Locator Locator(s)} and
         * returns any applicable results.
         *
         * @param {string|module:esri/geometry/Geometry|module:esri/widgets/Search~SuggestResult|number[][]} [searchTerm] - This searchTerm can be
         *        a string, geometry, suggest candidate object, or an array of [longitude,latitude] coordinate pairs.
         *        If a geometry is supplied, then it will reverse geocode (locator) or
         *        findAddressCandidates with geometry instead of text.
         *
         * @return {Promise<module:esri/widgets/Search~SearchResponse>} When resolved, returns a [SearchResponse](#SearchResponse) containing a
         *                   [SearchResult](#SearchResult).
         */
        Search.prototype.search = function (searchItem) {
            var _this = this;
            this.activeMenu = "none";
            this._cancelSuggest();
            var searching = this.viewModel
                .search(searchItem)
                .catch(function (response) {
                _this.activeMenu = "none";
                return response;
            })
                .then(function (searchResponse) {
                _this.activeMenu = !searchResponse.numResults ? "warning" : "none";
                return searchResponse;
            });
            return searching;
        };
        /**
         * Performs a suggest() request on the active Locator. It also uses the current value of
         * the widget or one that is passed in.
         *
         * Suggestions are available if working with a 10.3 or greater geocoding service that has
         * [suggest capability
         * loaded](https://developers.arcgis.com/rest/geocode/api-reference/geocoding-suggest.htm) or a 10.3 or greater feature layer that supports pagination, i.e.
         * `supportsPagination = true`.
         *
         * @param {string} [value] - The string value used to suggest() on an active Locator or feature layer. If
         *                         nothing is passed in, takes the current value of the widget.
         *
         *
         * @return {Promise<module:esri/widgets/Search~SuggestResponse>} When resolved, returns [SuggestResponse](#SuggestResponse) containing an array of result objects. Each of these results contains a [SuggestResult](#SuggestResult).
         */
        Search.prototype.suggest = function (query) {
            var _this = this;
            this._cancelSuggest();
            var suggestPromise = this.viewModel
                .suggest(query)
                .then(function (suggestResponse) {
                if (suggestResponse.numResults) {
                    _this.activeMenu = "suggestion";
                }
                _this._scrollToTopSuggestion();
                return suggestResponse;
            })
                .catch(function () { return null; });
            this._suggestPromise = suggestPromise;
            return suggestPromise;
        };
        Search.prototype.render = function () {
            var _this = this;
            var _a, _b;
            var vm = this.viewModel;
            var activeSourceIndex = vm.activeSourceIndex, suggestions = vm.suggestions, maxInputLength = vm.maxInputLength, placeholder = vm.placeholder, searchTerm = vm.searchTerm, searchAllEnabled = vm.searchAllEnabled, allSources = vm.allSources;
            var sourceName = this._getSourceName(activeSourceIndex);
            var trimmedSearchTerm = ("" + searchTerm).trim();
            var _c = this, activeMenu = _c.activeMenu, id = _c.id;
            var state = this.viewModel.state;
            var suggestionsMenuId = this.id + "-suggest-menu";
            var inputNode = (widget_1.tsx("input", { bind: this, placeholder: placeholder, "aria-label": i18n.searchButtonTitle, maxlength: maxInputLength, autocomplete: "off", type: "text", tabindex: "0", class: this.classes(CSS.esriInput, CSS.input), "aria-autocomplete": "list", value: searchTerm, "aria-haspopup": "true", "aria-owns": suggestionsMenuId, role: "textbox", onkeydown: this._handleInputKeydown, onkeyup: this._handleInputKeyup, onclick: this._handleInputClick, oninput: this._handleInputPaste, onpaste: this._handleInputPaste, afterCreate: widget_1.storeNode, "data-node-ref": "_inputNode", onfocusout: this._storeRelatedTarget, onfocus: this.focus, onblur: this.blur, title: searchTerm ? "" : placeholder }));
            var formNode = (widget_1.tsx("form", { key: "esri-search__form", bind: this, class: CSS.form, onsubmit: this._formSubmit, role: "search" }, inputNode));
            var clearButtonNode = searchTerm ? (widget_1.tsx("div", { key: "esri-search__clear-button", bind: this, role: "button", class: this.classes(CSS.clearButton, CSS.button), tabindex: "0", title: i18n.clearButtonTitle, onfocus: this._clearButtonFocus, onclick: this._handleClearButtonClick, onkeydown: this._handleClearButtonClick },
                widget_1.tsx("span", { "aria-hidden": "true", class: CSS.clearIcon }))) : null;
            var showSuggestGroupNode = this.locationEnabled && !trimmedSearchTerm;
            var locationSuggestGroupNode = showSuggestGroupNode ? (widget_1.tsx("ul", { key: "esri-search__suggestion-list-current-location", class: this.classes(CSS.suggestionList, CSS.suggestionListCurrentLocation) },
                widget_1.tsx("li", { bind: this, onclick: this._handleUseCurrentLocationClick, onkeydown: this._handleUseCurrentLocationClick, onkeyup: this._handleSuggestionKeyup, role: "menuitem", tabindex: "-1" },
                    widget_1.tsx("span", { "aria-hidden": "true", role: "presentation", class: CSS.locate }),
                    " ",
                    i18n.useCurrentLocation))) : null;
            var showMultipleSourceResults = allSources.length > 1 && activeSourceIndex === SearchViewModel.ALL_INDEX;
            var suggestionsGroupNode = suggestions
                ? suggestions.map(function (suggestResults, suggestResultsIndex) {
                    var sourceIndex = suggestResults.sourceIndex;
                    var suggestResultCount = suggestResults.results.length;
                    var suggestHeaderNode = suggestResultCount && showMultipleSourceResults
                        ? _this._getSuggestionHeaderNode(sourceIndex)
                        : null;
                    var results = suggestResults.results;
                    var suggestItemsNodes = results.map(function (suggestion, suggestionIndex) {
                        return _this._getSuggestionNode(suggestion, suggestionIndex, sourceIndex);
                    });
                    var suggestionListContainerNode = suggestResultCount ? (widget_1.tsx("ul", { key: "esri-search__suggestion-list-" + sourceIndex, class: CSS.suggestionList }, suggestItemsNodes)) : null;
                    return [suggestHeaderNode, suggestionListContainerNode];
                })
                : null;
            var suggestionsMenuNode = (widget_1.tsx("div", { id: suggestionsMenuId, "aria-expanded": activeMenu === "suggestion", key: "esri-search__suggestions-menu", class: this.classes(CSS.menu, CSS.suggestionsMenu), role: "menu", bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_suggestionListNode" },
                locationSuggestGroupNode,
                suggestionsGroupNode));
            var inputContainerNode = (widget_1.tsx("div", { key: "esri-search__input-container", class: CSS.inputContainer },
                formNode,
                suggestionsMenuNode,
                clearButtonNode));
            var submitButtonNode = (widget_1.tsx("div", { key: "esri-search__submit-button", bind: this, role: "button", title: i18n.searchButtonTitle, class: this.classes(CSS.submitButton, CSS.button), tabindex: "0", onclick: this._handleSearchButtonClick, onkeydown: this._handleSearchButtonClick },
                widget_1.tsx("span", { "aria-hidden": "true", role: "presentation", class: CSS.searchIcon }),
                widget_1.tsx("span", { class: CSS.fallbackText }, i18n.searchButtonTitle)));
            var notFoundText = trimmedSearchTerm
                ? esriLang.substitute({
                    value: "\"" + searchTerm + "\""
                }, i18n.noResultsFoundForValue)
                : i18n.noResultsFound;
            var warningNode = vm.get("selectedSuggestion.location") || trimmedSearchTerm ? (widget_1.tsx("div", { key: "esri-search__no_results" },
                widget_1.tsx("div", { class: CSS.warningMenuHeader }, i18n.noResults),
                widget_1.tsx("div", { class: CSS.warningMenuText }, notFoundText))) : null;
            var emptySearchTermNode = !vm.get("selectedSuggestion.location") && !trimmedSearchTerm ? (widget_1.tsx("div", { key: "esri-search__empty-search" },
                widget_1.tsx("span", { "aria-hidden": "true", class: CSS.noticeIcon }),
                widget_1.tsx("span", { class: CSS.noValueText }, i18n.emptyValue))) : null;
            var errorMenuNode = (widget_1.tsx("div", { key: "esri-search__error-menu", class: this.classes(CSS.menu, CSS.warningMenu) },
                widget_1.tsx("div", { class: CSS.warningMenuBody },
                    warningNode,
                    emptySearchTermNode)));
            var hasMultipleSources = allSources.length > 1;
            var sourceList = allSources && allSources.toArray();
            var allItemNode = searchAllEnabled ? this._getSourceNode(SearchViewModel.ALL_INDEX) : null;
            var sourceMenuId = id + "-source-menu";
            var sourceMenuButtonNode = hasMultipleSources ? (widget_1.tsx("div", { key: "esri-search__source-menu-button", bind: this, role: "button", title: i18n.searchIn, "aria-haspopup": "true", "aria-expanded": activeMenu === "source", "aria-controls": sourceMenuId, class: this.classes(CSS.sourcesButton, CSS.button), tabindex: "0", onkeydown: this._handleSourceMenuButtonKeydown, onclick: this._handleSourcesMenuToggleClick, onkeyup: this._handleSourceMenuButtonKeyup, onblur: this._sourcesButtonBlur, afterCreate: widget_1.storeNode, "data-node-ref": "_sourceMenuButtonNode" },
                widget_1.tsx("span", { "aria-hidden": "true", role: "presentation", class: CSS.dropdownIcon }),
                widget_1.tsx("span", { "aria-hidden": "true", role: "presentation", class: CSS.dropupIcon }),
                widget_1.tsx("span", { class: CSS.sourceName }, sourceName))) : null;
            var sourcesListNode = hasMultipleSources ? (widget_1.tsx("ul", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_sourceListNode" },
                allItemNode,
                sourceList.map(function (source, sourceIndex) { return _this._getSourceNode(sourceIndex); }))) : null;
            var sourcesMenuNode = (widget_1.tsx("div", { id: sourceMenuId, key: "esri-search__source-menu", class: this.classes(CSS.menu, CSS.sourcesMenu), role: "menu" }, sourcesListNode));
            var containerNodeClasses = (_a = {},
                _a[CSS.hasMultipleSources] = hasMultipleSources,
                _a[CSS.isLoading] = state === "loading",
                _a[CSS.isSearching] = state === "searching",
                _a[CSS.showWarning] = activeMenu === "warning",
                _a[CSS.showSources] = activeMenu === "source",
                _a[CSS.showSuggestions] = activeMenu === "suggestion",
                _a);
            var baseClasses = (_b = {},
                _b[CSS.disabled] = state === "disabled",
                _b);
            var contentNode = state === "loading" ? (widget_1.tsx("div", { role: "presentation", class: CSS.loader, key: "base-loader" },
                widget_1.tsx("span", { "aria-hidden": "true", role: "presentation", class: CSS.loaderAnimation }),
                widget_1.tsx("span", { class: CSS.fallbackText }, i18n.searchButtonTitle),
                widget_1.tsx("span", { class: CSS.loaderText }, i18nCommon.loading))) : (widget_1.tsx("div", { role: "presentation", class: this.classes(containerNodeClasses, CSS.container), key: "base-container" },
                sourceMenuButtonNode,
                sourcesMenuNode,
                inputContainerNode,
                submitButtonNode,
                errorMenuNode));
            return widget_1.tsx("div", { class: this.classes(CSS.base, baseClasses) }, contentNode);
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Search.prototype._watchSourceChanges = function () {
            var _this = this;
            var _a = this, _handles = _a._handles, allSources = _a.viewModel.allSources;
            var handleKey = "sources";
            _handles.remove(handleKey);
            allSources.forEach(function (source) {
                return _handles.add(watchUtils.watch(source, "name", function () { return _this.scheduleRender(); }), handleKey);
            });
        };
        Search.prototype._handleSourceMenuButtonKeydown = function (event) {
            var keyCode = event.keyCode;
            if (keyCode === keys_1.UP_ARROW || keyCode === keys_1.DOWN_ARROW || keyCode === keys_1.END || keyCode === keys_1.HOME) {
                event.preventDefault();
                event.stopPropagation();
                this.activeMenu = "source";
                return;
            }
            this._handleSourcesMenuToggleClick(event);
        };
        Search.prototype._handleSourcesMenuToggleClick = function (event) {
            var isSourceActive = this.activeMenu === "source";
            this.activeMenu = isSourceActive ? "none" : "source";
            this.renderNow();
            if (isSourceActive) {
                this._sourceMenuButtonNode && this._sourceMenuButtonNode.focus();
                return;
            }
            var list = this._sourceListNode ? this._sourceListNode.getElementsByTagName("li") : null;
            if (!list) {
                return;
            }
            var keyCode = event.keyCode;
            var focusNode = keyCode === keys_1.END ? list[list.length - 1] : list[0];
            focusNode && focusNode.focus();
        };
        Search.prototype._handleClearButtonClick = function () {
            this.viewModel.clear();
            this._focus();
        };
        Search.prototype._handleSearchButtonClick = function () {
            this.search();
        };
        Search.prototype._handleSuggestionClick = function (event) {
            var node = event.currentTarget;
            var suggestResult = node["data-suggestion"];
            if (suggestResult) {
                this._focus();
                this.search(suggestResult);
            }
        };
        Search.prototype._handleUseCurrentLocationClick = function () {
            this._focus("none");
            this.viewModel.searchNearby();
        };
        Search.prototype._handleSourceClick = function (event) {
            var node = event.currentTarget;
            var sourceIndex = node["data-source-index"];
            this.viewModel.activeSourceIndex = sourceIndex;
            this._focus("none");
        };
        Search.prototype._sourcesButtonBlur = function (event) {
            var relatedTarget = event && event.relatedTarget;
            this._removeActiveMenu(relatedTarget, this._sourceListNode);
        };
        Search.prototype._inputBlur = function (event) {
            var relatedTarget = event && event.relatedTarget;
            this._removeActiveMenu(relatedTarget ? relatedTarget : this._relatedTarget, this._suggestionListNode);
        };
        Search.prototype._storeRelatedTarget = function (event) {
            this._relatedTarget = event.relatedTarget;
        };
        Search.prototype._clearButtonFocus = function () {
            this.activeMenu = "none";
        };
        Search.prototype._removeActiveMenu = function (targetNode, parentNode) {
            if (targetNode && parentNode && parentNode.contains(targetNode)) {
                return;
            }
            this.activeMenu = "none";
        };
        Search.prototype._cancelSuggest = function () {
            var suggestPromise = this._suggestPromise;
            if (suggestPromise) {
                suggestPromise.cancel();
            }
            this._suggestPromise = null;
        };
        Search.prototype._handleInputKeydown = function (event) {
            var keyCode = event.keyCode;
            if (keyCode === keys_1.TAB || keyCode === keys_1.ESCAPE || (event.shiftKey && keyCode === keys_1.TAB)) {
                this._cancelSuggest();
            }
        };
        Search.prototype._handleInputKeyup = function (event) {
            var keyCode = event.keyCode;
            var isIgnorableKey = event.ctrlKey ||
                event.metaKey ||
                keyCode === keys_1.copyKey ||
                keyCode === keys_1.LEFT_ARROW ||
                keyCode === keys_1.RIGHT_ARROW ||
                keyCode === keys_1.ENTER ||
                keyCode === keys_1.SHIFT;
            var list = this._suggestionListNode
                ? this._suggestionListNode.getElementsByTagName("li")
                : null;
            if (isIgnorableKey) {
                return;
            }
            if (keyCode === keys_1.TAB || keyCode === keys_1.ESCAPE || (event.shiftKey && keyCode === keys_1.TAB)) {
                this._cancelSuggest();
                if (keyCode === keys_1.ESCAPE) {
                    this.activeMenu = "none";
                }
                return;
            }
            if ((keyCode === keys_1.UP_ARROW || keyCode === keys_1.DOWN_ARROW) && list) {
                this.activeMenu = "suggestion";
                event.stopPropagation();
                event.preventDefault();
                this._cancelSuggest();
                var focusIndex = keyCode === keys_1.UP_ARROW ? list.length - 1 : 0;
                var focusNode = list[focusIndex];
                focusNode && focusNode.focus();
                return;
            }
            if (!this.viewModel.searchTerm) {
                return;
            }
            this.suggest();
        };
        Search.prototype._scrollToTopSuggestion = function () {
            if (this._suggestionListNode) {
                this._suggestionListNode.scrollTop = 0;
            }
        };
        Search.prototype._handleInputClick = function (event) {
            this.activeMenu = "suggestion";
        };
        Search.prototype._handleInputPaste = function (event) {
            var searchTerm = this.get("viewModel.searchTerm");
            var input = event.target;
            if (searchTerm !== input.value) {
                this.viewModel.searchTerm = input.value;
            }
            if (!searchTerm) {
                return;
            }
            this.suggest();
        };
        Search.prototype._handleSourceMenuButtonKeyup = function (event) {
            var keyCode = event.keyCode;
            if (keyCode !== keys_1.UP_ARROW && keyCode !== keys_1.DOWN_ARROW && keyCode !== keys_1.HOME && keyCode !== keys_1.END) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            var list = this._sourceListNode ? this._sourceListNode.getElementsByTagName("li") : null;
            if (!list) {
                return;
            }
            var cursorIndex = keyCode === keys_1.UP_ARROW || keyCode === keys_1.END ? list.length - 1 : 0;
            var focusNode = list[cursorIndex];
            focusNode && focusNode.focus();
        };
        Search.prototype._handleSourceKeyup = function (event) {
            var node = event.target;
            var list = this._sourceListNode
                ? array_1.from(this._sourceListNode.getElementsByTagName("li"))
                : null;
            var keyCode = event.keyCode;
            if (keyCode === keys_1.ESCAPE) {
                this._focus("none");
                this._sourceMenuButtonNode && this._sourceMenuButtonNode.focus();
                return;
            }
            if (list) {
                var itemIndex = list.indexOf(node);
                if (keyCode === keys_1.HOME || keyCode === keys_1.END || keyCode === keys_1.UP_ARROW || keyCode === keys_1.DOWN_ARROW) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if (keyCode === keys_1.HOME) {
                    var homeFocusNode = list[0];
                    homeFocusNode && homeFocusNode.focus();
                    return;
                }
                if (keyCode === keys_1.END) {
                    var endFocusNode = list[list.length - 1];
                    endFocusNode && endFocusNode.focus();
                    return;
                }
                if (keyCode === keys_1.UP_ARROW) {
                    var previousItemIndex = itemIndex - 1;
                    var previousFocusNode = previousItemIndex < 0 ? this._sourceMenuButtonNode : list[previousItemIndex];
                    previousFocusNode && previousFocusNode.focus();
                    return;
                }
                if (keyCode === keys_1.DOWN_ARROW) {
                    var nextItemIndex = itemIndex + 1;
                    var nextFocusNode = nextItemIndex >= list.length ? this._sourceMenuButtonNode : list[nextItemIndex];
                    nextFocusNode && nextFocusNode.focus();
                }
            }
        };
        Search.prototype._handleSuggestionKeyup = function (event) {
            var node = event.target;
            var list = this._suggestionListNode
                ? array_1.from(this._suggestionListNode.getElementsByTagName("li"))
                : null;
            var itemIndex = list.indexOf(node);
            var keyCode = event.keyCode;
            this._cancelSuggest();
            if (keyCode === keys_1.BACKSPACE || keyCode === keys_1.DELETE) {
                this._focus();
                return;
            }
            if (keyCode === keys_1.ESCAPE) {
                this._focus("none");
                return;
            }
            if (list) {
                if (keyCode === keys_1.HOME || keyCode === keys_1.END || keyCode === keys_1.UP_ARROW || keyCode === keys_1.DOWN_ARROW) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if (keyCode === keys_1.HOME) {
                    var homeFocusNode = list[0];
                    homeFocusNode && homeFocusNode.focus();
                }
                if (keyCode === keys_1.END) {
                    var endFocusNode = list[list.length - 1];
                    endFocusNode && endFocusNode.focus();
                }
                if (keyCode === keys_1.UP_ARROW) {
                    var previousItemIndex = itemIndex - 1;
                    var previousFocusNode = previousItemIndex < 0 ? list[list.length - 1] : list[previousItemIndex];
                    previousFocusNode && previousFocusNode.focus();
                    return;
                }
                if (keyCode === keys_1.DOWN_ARROW) {
                    var nextItemIndex = itemIndex + 1;
                    var nextFocusNode = nextItemIndex >= list.length ? list[0] : list[nextItemIndex];
                    nextFocusNode && nextFocusNode.focus();
                    return;
                }
            }
        };
        Search.prototype._focus = function (activeMenu) {
            this.focus();
            if (!activeMenu) {
                return;
            }
            this.activeMenu = activeMenu;
        };
        Search.prototype._formSubmit = function (event) {
            event.preventDefault();
            this.search();
        };
        Search.prototype._getSourceName = function (sourceIndex) {
            var vm = this.viewModel;
            var allSources = vm.allSources;
            var source = allSources.getItemAt(sourceIndex);
            return sourceIndex === SearchViewModel.ALL_INDEX
                ? i18n.all
                : source
                    ? source.name || i18n.untitledSource
                    : i18n.untitledSource;
        };
        Search.prototype._getSuggestionHeaderNode = function (sourceIndex) {
            var name = this._getSourceName(sourceIndex);
            return (widget_1.tsx("div", { key: "esri-search__suggestion-header-" + sourceIndex, class: CSS.menuHeader }, name));
        };
        Search.prototype._splitResult = function (input, needle) {
            var escapedNeedle = regexp.escapeString(needle);
            var matches = input.replace(new RegExp("(^|)(" + escapedNeedle + ")(|$)", "ig"), "$1|$2|$3");
            return matches.split("|");
        };
        Search.prototype._getSuggestionNode = function (suggestion, suggestionIndex, sourceIndex) {
            var vm = this.viewModel;
            var searchTerm = vm.searchTerm;
            if (searchTerm) {
                var text = suggestion.text;
                var resultText = text || i18n.untitledResult;
                var containsHTML = regexContainsHTML.test(resultText);
                var matches_1 = [];
                if (containsHTML) {
                    matches_1.push(widget_1.tsx("div", { innerHTML: resultText }));
                }
                else {
                    var resultParts = this._splitResult(resultText, searchTerm);
                    var searchTermLC_1 = searchTerm.toLowerCase();
                    resultParts.forEach(function (part, partIndex) {
                        if (part && part.length) {
                            if (part.toLowerCase() === searchTermLC_1) {
                                matches_1.push(widget_1.tsx("strong", { key: partIndex }, part));
                            }
                            else {
                                matches_1.push(part);
                            }
                        }
                    });
                }
                return (widget_1.tsx("li", { bind: this, onclick: this._handleSuggestionClick, onkeydown: this._handleSuggestionClick, onkeyup: this._handleSuggestionKeyup, key: "esri-search__suggestion$-{sourceIndex}_" + suggestionIndex, "data-suggestion": suggestion, role: "menuitem", tabindex: "-1" }, matches_1));
            }
        };
        Search.prototype._getSourceNode = function (sourceIndex) {
            var _a;
            var itemClasses = (_a = {},
                _a[CSS.activeSource] = sourceIndex === this.viewModel.activeSourceIndex,
                _a);
            return (widget_1.tsx("li", { bind: this, key: "esri-search__source-" + sourceIndex, onclick: this._handleSourceClick, onkeydown: this._handleSourceClick, onkeyup: this._handleSourceKeyup, "data-source-index": sourceIndex, role: "menuitem", class: this.classes(CSS.source, itemClasses), tabindex: "-1" }, this._getSourceName(sourceIndex)));
        };
        Search.prototype._renderSearchResultsContent = function () {
            this._searchResultRenderer.showMoreResultsOpen = false;
            this._searchResultRenderer.viewModel = this.viewModel;
            return this._searchResultRenderer;
        };
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], Search.prototype, "activeMenu", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.activeSource"),
            widget_1.renderable()
        ], Search.prototype, "activeSource", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.activeSourceIndex"),
            widget_1.renderable()
        ], Search.prototype, "activeSourceIndex", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.allPlaceholder"),
            widget_1.renderable()
        ], Search.prototype, "allPlaceholder", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.allSources")
        ], Search.prototype, "allSources", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.autoNavigate")
        ], Search.prototype, "autoNavigate", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.autoSelect")
        ], Search.prototype, "autoSelect", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.defaultSources")
        ], Search.prototype, "defaultSources", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.goToOverride")
        ], Search.prototype, "goToOverride", void 0);
        __decorate([
            decorators_1.property()
        ], Search.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.includeDefaultSources")
        ], Search.prototype, "includeDefaultSources", void 0);
        __decorate([
            decorators_1.property()
        ], Search.prototype, "label", void 0);
        __decorate([
            widget_1.renderable(),
            decorators_1.aliasOf("viewModel.locationEnabled")
        ], Search.prototype, "locationEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.locationToAddressDistance")
        ], Search.prototype, "locationToAddressDistance", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.maxResults")
        ], Search.prototype, "maxResults", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.maxSuggestions")
        ], Search.prototype, "maxSuggestions", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.minSuggestCharacters")
        ], Search.prototype, "minSuggestCharacters", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.popupEnabled")
        ], Search.prototype, "popupEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.popupTemplate")
        ], Search.prototype, "popupTemplate", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.portal")
        ], Search.prototype, "portal", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.resultGraphic")
        ], Search.prototype, "resultGraphic", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.resultGraphicEnabled")
        ], Search.prototype, "resultGraphicEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.results"),
            widget_1.renderable()
        ], Search.prototype, "results", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.searchAllEnabled"),
            widget_1.renderable()
        ], Search.prototype, "searchAllEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.searchTerm"),
            widget_1.renderable()
        ], Search.prototype, "searchTerm", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.selectedResult")
        ], Search.prototype, "selectedResult", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.sources")
        ], Search.prototype, "sources", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.suggestions"),
            widget_1.renderable()
        ], Search.prototype, "suggestions", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.suggestionsEnabled")
        ], Search.prototype, "suggestionsEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view"),
            widget_1.renderable()
        ], Search.prototype, "view", void 0);
        __decorate([
            widget_1.vmEvent([
                "search-complete",
                "search-clear",
                "search-start",
                "select-result",
                "suggest-start",
                "suggest-complete"
            ]),
            decorators_1.property({
                type: SearchViewModel
            }),
            widget_1.renderable([
                "viewModel.allSources",
                "viewModel.activeSource.placeholder",
                "viewModel.activeSource.name",
                "viewModel.state"
            ])
        ], Search.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.clear")
        ], Search.prototype, "clear", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Search.prototype, "_handleSourcesMenuToggleClick", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Search.prototype, "_handleClearButtonClick", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Search.prototype, "_handleSearchButtonClick", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Search.prototype, "_handleSuggestionClick", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Search.prototype, "_handleUseCurrentLocationClick", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Search.prototype, "_handleSourceClick", null);
        Search = __decorate([
            decorators_1.subclass("esri.widgets.Search")
        ], Search);
        return Search;
    }(decorators_1.declared(Widget)));
    return Search;
});
//# sourceMappingURL=Search.js.map