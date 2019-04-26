/**
 * The BasemapGallery widget displays a collection images representing basemaps from ArcGIS.com or a user-defined set
 * of map or image services. When a new basemap is selected from the BasemapGallery, the map's basemap
 * layers are removed and replaced with the basemap layers of the associated basemap selected in the gallery. By default,
 * the BasemapGallery widget looks like the following image.
 *
 * ![basemap-gallery](../../assets/img/apiref/widgets/basemap-gallery.png)
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * All basemaps added to the gallery need to have the same spatial reference.
 * :::
 *
 * @module esri/widgets/BasemapGallery
 * @since 4.3
 *
 * @see [BasemapGallery.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/BasemapGallery.tsx)
 * @see [BasemapGallery.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_BasemapGallery.scss)
 * @see [Sample - BasemapGallery widget](../sample-code/widgets-basemapgallery/index.html)
 * @see module:esri/widgets/BasemapGallery/BasemapGalleryViewModel
 *
 * @example
 * var basemapGallery = new BasemapGallery({
 *   view: view
 * });
 * // Add widget to the top right corner of the view
 * view.ui.add(basemapGallery, {
 *   position: "top-right"
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/widgets/BasemapGallery/nls/BasemapGallery", "esri/core/Handles", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/BasemapGallery/BasemapGalleryViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18n, Handles, watchUtils_1, decorators_1, Widget, BasemapGalleryViewModel, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var DEFAULT_BASEMAP_IMAGE = require.toUrl("../themes/base/images/basemap-toggle-64.svg");
    var CSS = {
        base: "esri-basemap-gallery esri-widget esri-widget--panel-height-only",
        sourceLoading: "esri-basemap-gallery--source-loading",
        loader: "esri-basemap-gallery__loader",
        item: "esri-basemap-gallery__item",
        itemContainer: "esri-basemap-gallery__item-container",
        itemTitle: "esri-basemap-gallery__item-title",
        itemThumbnail: "esri-basemap-gallery__item-thumbnail",
        selectedItem: "esri-basemap-gallery__item--selected",
        itemLoading: "esri-basemap-gallery__item--loading",
        itemError: "esri-basemap-gallery__item--error",
        emptyMessage: "esri-widget__content--empty",
        widgetIcon: "esri-icon-basemap",
        // common
        disabled: "esri-disabled",
        header: "esri-widget__heading"
    };
    var BasemapGallery = /** @class */ (function (_super) {
        __extends(BasemapGallery, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @extends module:esri/widgets/Widget
         * @constructor
         * @alias module:esri/widgets/BasemapGallery
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * var basemapGallery = new BasemapGallery({
         *   view: view
         * });
         */
        function BasemapGallery(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._handles = new Handles();
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
             * @type {module:esri/Basemap}
             * @name activeBasemap
             * @instance
             */
            _this.activeBasemap = null;
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
            //  source
            //----------------------------------
            /**
             * The source for basemaps that the widget will display.
             * This property can be autocast with an array or {@link module:esri/core/Collection} of {@link module:esri/Basemap}s,
             * a {@link module:esri/portal/Portal} instance, or a URL to a portal instance.
             * The default source is a {@link module:esri/widgets/BasemapGallery/support/PortalBasemapsSource} that points to
             * the default portal instance set in {@link module:esri/config#portalUrl esriConfig.portalUrl}.
             *
             * @type {module:esri/widgets/BasemapGallery/support/LocalBasemapsSource | module:esri/widgets/BasemapGallery/support/PortalBasemapsSource}
             * @name source
             * @instance
             * @autocast
             *
             * @todo doc custom BasemapSource (interface) also supported
             */
            _this.source = null;
            //----------------------------------
            //  view
            //----------------------------------
            /**
             * The view from which the widget will operate. This view
             * provides access to the active
             * {@link module:esri/Map#basemap basemap}
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
             * {@link module:esri/widgets/BasemapGallery/BasemapGalleryViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/BasemapGallery/BasemapGalleryViewModel}
             * @autocast
             */
            _this.viewModel = new BasemapGalleryViewModel();
            return _this;
        }
        BasemapGallery.prototype.postInitialize = function () {
            var _this = this;
            var handles = this._handles;
            this.own([
                watchUtils_1.on(this, "viewModel.items", "change", function (event) {
                    var key = "basemap-gallery-item-changes";
                    var added = event.added, moved = event.moved;
                    handles.remove(key);
                    handles.add(added.concat(moved).map(function (item) { return item.watch("state", function () { return _this.scheduleRender(); }); }), key);
                    _this.scheduleRender();
                }),
                handles,
                watchUtils_1.whenOnce(this, "source", function () { return _this.viewModel.load(); })
            ]);
        };
        //-------------------------------------------------------------------
        //
        //  Public methods
        //
        //-------------------------------------------------------------------
        BasemapGallery.prototype.render = function () {
            var _a;
            var sourceLoading = this.get("source.state") === "loading";
            var isDisabled = this.get("viewModel.state") === "disabled";
            var items = this.get("viewModel.items")
                .toArray()
                .map(this._renderBasemapGalleryItem, this);
            var rootClasses = (_a = {},
                _a[CSS.sourceLoading] = sourceLoading,
                _a[CSS.disabled] = isDisabled,
                _a);
            var loader = sourceLoading ? (widget_1.tsx("div", { class: CSS.loader, key: "esri-basemap-gallery__loader" })) : null;
            var content = sourceLoading ? null : items.length > 0 ? (widget_1.tsx("ul", { class: CSS.itemContainer, key: "esri-basemap-gallery__item-container", role: "menu" }, items)) : (widget_1.tsx("div", { class: CSS.emptyMessage, key: "esri-basemap-gallery__empty-message" },
                widget_1.tsx("h2", { class: CSS.header }, i18n.noBasemaps)));
            return (widget_1.tsx("div", { class: this.classes(CSS.base, rootClasses) },
                loader,
                content));
        };
        //--------------------------------------------------------------------------
        //
        //  Private methods
        //
        //-------------------------------------------------------------------
        BasemapGallery.prototype._handleClick = function (event) {
            var item = event.currentTarget["data-item"];
            if (item.state === "ready") {
                this.activeBasemap = item.basemap;
            }
        };
        BasemapGallery.prototype._renderBasemapGalleryItem = function (item) {
            var _a;
            var labelsEnabled = true;
            var thumbnailUrl = item.get("basemap.thumbnailUrl");
            var thumbnailSource = thumbnailUrl || DEFAULT_BASEMAP_IMAGE;
            var title = item.get("basemap.title");
            var snippet = item.get("basemap.portalItem.snippet");
            var tooltip = item.get("error.message") || snippet || title;
            var tabIndex = item.state === "ready" ? 0 : -1;
            var isSelected = this.viewModel.basemapEquals(item.basemap, this.activeBasemap);
            var itemClasses = (_a = {},
                _a[CSS.selectedItem] = isSelected,
                _a[CSS.itemLoading] = item.state === "loading",
                _a[CSS.itemError] = item.state === "error",
                _a);
            var loader = item.state === "loading" ? (widget_1.tsx("div", { class: CSS.loader, key: "esri-basemap-gallery__loader" })) : null;
            return (widget_1.tsx("li", { "aria-selected": isSelected, bind: this, class: this.classes(CSS.item, itemClasses), "data-item": item, onkeydown: this._handleClick, onclick: this._handleClick, role: "menuitem", tabIndex: tabIndex, title: tooltip },
                loader,
                widget_1.tsx("img", { alt: "", class: CSS.itemThumbnail, src: thumbnailSource }),
                widget_1.tsx("div", { class: CSS.itemTitle }, title),
                widget_1.tsx("label", null,
                    widget_1.tsx("input", { type: "checkbox", "data-option-name": "labelsEnabled", tabIndex: 0, checked: labelsEnabled, 
                        // onchange={this._toggleInputValue}
                        bind: this }),
                    "Show Labels?")));
        };
        __decorate([
            decorators_1.aliasOf("viewModel.activeBasemap"),
            widget_1.renderable()
        ], BasemapGallery.prototype, "activeBasemap", void 0);
        __decorate([
            decorators_1.property()
        ], BasemapGallery.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], BasemapGallery.prototype, "label", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.source"),
            widget_1.renderable("source.state")
        ], BasemapGallery.prototype, "source", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view"),
            widget_1.renderable()
        ], BasemapGallery.prototype, "view", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable(["viewModel.state"])
        ], BasemapGallery.prototype, "viewModel", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], BasemapGallery.prototype, "_handleClick", null);
        BasemapGallery = __decorate([
            decorators_1.subclass("esri.widgets.BasemapGallery")
        ], BasemapGallery);
        return BasemapGallery;
    }(decorators_1.declared(Widget)));
    return BasemapGallery;
});
//# sourceMappingURL=BasemapGallery.js.map