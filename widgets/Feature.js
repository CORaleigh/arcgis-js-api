/**
 * The Feature widget displays a graphic according to its [PopupTemplate](esri-PopupTemplate.html).
 * This widget is useful in instances where you want to display information about a feature but without
 * the use of a [Popup](esri-widgets-Popup.html).
 *
 * @module esri/widgets/Feature
 * @since 4.7
 *
 * @see [Feature.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Feature.tsx)
 * @see [Feature.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Feature.scss)
 * @see [Sample - Feature widget](../sample-code/widgets-feature/index.html)
 * @see module:esri/widgets/Feature/FeatureViewModel
 * @see module:esri/widgets/Popup
 * @see module:esri/views/ui/DefaultUI
 * @see module:esri/PopupTemplate
 * @see [Arcade Profiles: Popop](https://developers.arcgis.com/arcade/guide/profiles/#popup)
 * @see [Arcade - expression language](https://developers.arcgis.com/javascript/latest/guide/arcade/index.html)
 *
 * @example
 * // Create graphic
 *
 * var graphic = new Graphic({
 *   geometry: view.center,
 *   popupTemplate: {
 *     content: [{
 *       // add popupTemplate content
 *     }]
 *   }
 * });
 *
 * var feature = new Feature({
 *   graphic: graphic,
 *   map: map,
 *   spatialReference: spatialReference
 * });
 *
 * view.ui.add(feature, "top-right");
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/tsSupport/assignHelper", "dojo/i18n!esri/widgets/Feature/nls/Feature", "dojo/keys", "esri/core/lang", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/layers/support/exifUtils", "esri/widgets/Widget", "esri/widgets/Feature/FeatureViewModel", "esri/widgets/Feature/support/attachmentUtils", "esri/widgets/Feature/support/featureUtils", "esri/widgets/support/chartUtils", "esri/widgets/support/uriUtils", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, __assign, i18n, keys_1, lang_1, watchUtils, decorators_1, exifUtils_1, Widget, FeatureViewModel, attachmentUtils, featureUtils_1, chartUtils_1, uriUtils, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var CSS = {
        // common
        iconText: "esri-icon-font-fallback-text",
        iconLoading: "esri-icon-loading-indicator esri-rotating",
        iconLeftTriangleArrow: "esri-icon-left-triangle-arrow",
        iconRightTriangleArrow: "esri-icon-right-triangle-arrow",
        esriTable: "esri-widget__table",
        esriWidget: "esri-widget",
        // popup renderer
        base: "esri-feature",
        // containers and content
        container: "esri-feature__size-container",
        title: "esri-feature__title",
        main: "esri-feature__main-container",
        btn: "esri-feature__button",
        icon: "esri-feature__icon",
        content: "esri-feature__content",
        contentElement: "esri-feature__content-element",
        text: "esri-feature__text",
        lastEditedInfo: "esri-feature__last-edited-info",
        // global modifiers
        showMediaPagination: "esri-feature--media-pagination-visible",
        // attachment element
        attachments: "esri-feature__attachments",
        attachmentsList: "esri-feature__attachments--list",
        attachmentsPreview: "esri-feature__attachments--preview",
        attachmentsTitle: "esri-feature__attachments-title",
        attachmentsItems: "esri-feature__attachments-items",
        attachmentsItem: "esri-feature__attachments-item",
        attachmentsItemMask: "esri-feature__attachment-item-mask",
        attachmentsItemMaskIcon: "esri-feature__attachment-item-mask--icon",
        attachmentsItemImage: "esri-feature__attachments-image",
        attachmentsItemImageOverlay: "esri-feature__attachments-image-overlay",
        attachmentsItemLinkIcon: "esri-feature__attachments-link-icon esri-icon-link-external",
        attachmentsItemImageResizable: "esri-feature__attachments-image--resizable",
        attachmentsItemFilename: "esri-feature__attachments-filename",
        attachmentsItemLink: "esri-feature__attachments-item-link",
        // fields element
        fields: "esri-feature__fields",
        fieldHeader: "esri-feature__field-header",
        fieldData: "esri-feature__field-data",
        fieldDataDate: "esri-feature__field-data--date",
        // media element
        media: "esri-feature__media",
        mediaContainer: "esri-feature__media-container",
        mediaItemContainer: "esri-feature__media-item-container",
        mediaItem: "esri-feature__media-item",
        mediaItemTitle: "esri-feature__media-item-title",
        mediaItemCaption: "esri-feature__media-item-caption",
        mediaPrevious: "esri-feature__media-previous",
        mediaPreviousIconLTR: "esri-feature__media-previous-icon",
        mediaPreviousIconRTL: "esri-feature__media-previous-icon--rtl",
        mediaNext: "esri-feature__media-next",
        mediaNextIconLTR: "esri-feature__media-next-icon",
        mediaNextIconRTL: "esri-feature__media-next-icon--rtl",
        mediaChart: "esri-feature__media-chart",
        // loading
        loadingSpinnerContainer: "esri-feature__loading-container",
        spinner: "esri-feature__loading-spinner"
    };
    var WIDGET_KEY_PARTIAL = "esri-feature";
    var DEFAULT_VISIBLE_ELEMENTS = {
        title: true,
        content: true,
        lastEditedInfo: true
    };
    function buildKey(element, index) {
        if (index === undefined) {
            return WIDGET_KEY_PARTIAL + "__" + element;
        }
        return WIDGET_KEY_PARTIAL + "__" + element + "-" + index;
    }
    var Feature = /** @class */ (function (_super) {
        __extends(Feature, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @alias module:esri/widgets/Feature
         * @extends module:esri/widgets/Widget
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         */
        function Feature(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._chartMap = new Map();
            _this._activeMediaMap = new Map();
            _this._refreshTimers = new Map();
            _this._mediaInfo = new Map();
            //--------------------------------------------------------------------------
            //
            // Type definitions
            //
            //--------------------------------------------------------------------------
            //--------------------------------------------------------------------------
            //
            // VisibleElements typedef
            //
            //--------------------------------------------------------------------------
            /**
             * @typedef module:esri/widgets/Feature~VisibleElements
             *
             * @property {boolean} [title] - Indicates whether the title associated with the feature displays.
             * Default value is `true`.
             * @property {boolean | module:esri/widgets/Feature~VisibleContentElements} [content] - Indicates
             * whether content for the Feature displays, can also indicate the specific types of content elements
             * by setting it via {@link module:esri/widgets/Feature~VisibleContentElements}. The default value
             * is `true`, everything displays.
             * @property {boolean} [lastEditInfo] - Indicates whether [lastEditInfo](esri-widgets-Feature-FeatureViewModel.html#lastEditInfo) is displayed
             * within the feature. Default value is `true`.
             */
            //--------------------------------------------------------------------------
            //
            // VisibleContentElements typedef
            //
            //--------------------------------------------------------------------------
            /**
             * @typedef module:esri/widgets/Feature~VisibleContentElements
             *
             * @property {boolean} [attachments] - Indicates whether to display any {@link module:esri/popup/content/AttachmentsContent} elements. Default is `true`.
             * @property {boolean} [fields] - Indicates whether to display any {@link module:esri/popup/content/FieldsContent} elements. Default is `true`.
             * @property {boolean} [media] - Indicates whether to display any {@link module:esri/popup/content/MediaContent} elements. Default is `true`.
             * @property {boolean} [text] - Indicates whether to display any {@link module:esri/popup/content/TextContent} elements. Default is `true`.
             */
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  graphic
            //----------------------------------
            /**
             * The {@link module:esri/Graphic Graphic} used to represent the feature.
             *
             * @name graphic
             * @instance
             * @type {module:esri/Graphic}
             * @default null
             * @see [PopupTemplate.content](esri-PopupTemplate.html#content)
             *
             * @example
             * var graphic = new Graphic({
             *   geometry: view.center,
             *   attributes: {
             *     "name": "Spruce",
             *     "family": "Pinaceae",
             *     "count": 126
             *   },
             *   symbol: new SimpleMarkerSymbol({
             *     style: "square",
             *     color: "blue",
             *     size: "8px"
             *   }),
             *   popupTemplate: {
             *     content: [
             *       {
             *         // Set popup template content
             *       }
             *     ]
             *   }
             * });
             *
             */
            _this.graphic = null;
            //----------------------------------
            //  defaultPopupTemplateEnabled
            //---------------------------------
            /**
             * Enables automatic creation of a popup template for layers
             * that have popups enabled but no popupTemplate defined.
             * Automatic popup templates are supported for layers that support
             * the `createPopupTemplate` method.
             * (Supported for {@link module:esri/layers/FeatureLayer},
             * {@link module:esri/layers/SceneLayer}, {@link module:esri/layers/CSVLayer},
             * {@link module:esri/layers/StreamLayer}, and {@link module:esri/layers/ImageryLayer}).
             *
             * @name defaultPopupTemplateEnabled
             * @instance
             * @type {boolean}
             * @default false
             * @since 4.11
             */
            _this.defaultPopupTemplateEnabled = false;
            //----------------------------------
            //  spatialReference
            //----------------------------------
            /**
             * The spatial reference used for [Arcade](https://developers.arcgis.com/arcade) operations.
             *
             * @name spatialReference
             * @instance
             * @since 4.11
             * @type {module:esri/geometry/SpatialReference}
             * @default null
             * @see [Type system](https://developers.arcgis.com/arcade/guide/types/#featuresetcollection)
             * @see [Arcade Profiles: Popop](https://developers.arcgis.com/arcade/guide/profiles/#popup)
             *
             */
            _this.spatialReference = null;
            //----------------------------------
            //  title
            //----------------------------------
            /**
             * The title for the feature. You can disable this via the [visibleElements](#visibleElements) property.
             *
             * @name title
             * @instance
             * @type {string}
             * @readonly
             * @default null
             *
             */
            _this.title = null;
            //----------------------------------
            //  visibleElements
            //----------------------------------
            /**
             * The visible elements that are displayed within the widget's [graphic.popupTemplate.content](esri-PopupTemplate.html#content).
             * This property provides the ability to turn individual elements of the widget's display on/off.
             * See the {@link module:esri/PopupTemplate#content PopupTemplate.content} documentation
             * for additional information on how these elements work.
             *
             * @name visibleElements
             * @instance
             * @type {module:esri/widgets/Feature~VisibleElements}
             * @since 4.11
             * @autocast { "value": "Object[]" }
             * @see [PopupTemplate.content](esri-PopupTemplate.html#content)
             */
            _this.visibleElements = __assign({}, DEFAULT_VISIBLE_ELEMENTS);
            //----------------------------------
            //  map
            //----------------------------------
            /**
             * A reference to the {@link module:esri/views/View view's} {@link module:esri/Map}. Use this property
             * when needing to get access to the underlying layers within the map. This can then be used
             * within [Arcade](https://developers.arcgis.com/arcade) expressions.
             *
             * @name map
             * @instance
             * @type {module:esri/Map}
             * @default null
             * @since 4.11
             * @see [Type system](https://developers.arcgis.com/arcade/guide/types/#featuresetcollection)
             * @see [Arcade Profiles: Popop](https://developers.arcgis.com/arcade/guide/profiles/#popup)
             *
             * @example
             * // The building footprints repreent the buildings that intersect a clicked parcel
             * let buildingFootprints = Intersects($feature, FeatureSetByName($map, "Building Footprints"));
             */
            _this.map = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            /**
             * The view model for this widget. This is a class that contains all the logic
             * (properties and methods) that controls this widget's behavior. See the
             * {@link module:esri/widgets/Feature/FeatureViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/Feature/FeatureViewModel}
             * @autocast
             */
            _this.viewModel = new FeatureViewModel();
            return _this;
        }
        Feature.prototype.postInitialize = function () {
            var _this = this;
            this.own(watchUtils.init(this, "viewModel.content", function () { return _this._setupMediaRefreshTimers(); }));
        };
        Feature.prototype.destroy = function () {
            this._clearMediaRefreshTimers();
            this._activeMediaMap.clear();
            this._activeMediaMap = null;
            this._destroyCharts();
        };
        Feature.prototype.castVisibleElements = function (value) {
            return __assign({}, DEFAULT_VISIBLE_ELEMENTS, value);
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        Feature.prototype.render = function () {
            var loadingNode = (widget_1.tsx("div", { key: buildKey("loading-container"), class: CSS.loadingSpinnerContainer },
                widget_1.tsx("span", { class: this.classes(CSS.iconLoading, CSS.spinner) })));
            var visibleElements = this.visibleElements;
            var _a = this.viewModel, waitingForContent = _a.waitingForContent, title = _a.title;
            var titleNode = visibleElements.title ? widget_1.tsx("h4", { class: CSS.title, innerHTML: title }) : null;
            var contentNode = !!visibleElements.content ? (widget_1.tsx("div", { class: CSS.main }, [this._renderContent(), this._renderLastEditInfo()])) : null;
            return (widget_1.tsx("div", { class: this.classes(CSS.base, CSS.esriWidget) },
                widget_1.tsx("div", { class: CSS.container },
                    titleNode,
                    waitingForContent ? loadingNode : contentNode)));
        };
        /**
         * Paginates to a specified [media](esri-popup-content-MediaContent.html) info object. For example,
         * you may have [media](esri-popup-content-MediaContent.html) content which contains
         * multiple `mediaInfos`. This method allows you to specify the index of the `mediaInfos`
         * you wish to display.
         *
         * @method
         * @param {number} contentElementIndex - The index position of the [media](esri-popup-content-MediaContent.html) content element to be updated.
         * @param {number} mediaInfoIndex - The index position of the [media](esri-popup-content-MediaContent.html) info object you wish to display.
         *
         */
        Feature.prototype.goToMedia = function (contentElementIndex, mediaInfoIndex) {
            this._setContentElementMedia(contentElementIndex, mediaInfoIndex);
        };
        /**
         * Paginates to the next [media](esri-popup-content-MediaContent.html) info.
         *
         * @method
         * @param {number} contentElementIndex - The index position of the [media](esri-popup-content-MediaContent.html) content element.
         *
         */
        Feature.prototype.nextMedia = function (contentElementIndex) {
            this._pageContentElementMedia(contentElementIndex, "next");
        };
        /**
         * Paginates to the previous [media](esri-popup-content-MediaContent.html) info in the specified
         * [media](esri-popup-content-MediaContent.html) content element.
         *
         * @method
         * @param {number} contentElementIndex - The index position of the [media](esri-popup-content-MediaContent.html) content element.
         */
        Feature.prototype.previousMedia = function (contentElementIndex) {
            this._pageContentElementMedia(contentElementIndex, "previous");
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Feature.prototype._destroyCharts = function () {
            this._chartMap.forEach(function (chart) { return chart.dispose(); });
            this._chartMap.clear();
        };
        Feature.prototype._renderContent = function () {
            var content = this.viewModel.content;
            var contentKey = "content";
            if (!content) {
                return null;
            }
            if (typeof content === "string") {
                return widget_1.tsx("div", { key: buildKey(contentKey + "-string"), innerHTML: content });
            }
            if (widget_1.isWidget(content)) {
                return widget_1.tsx("div", { key: buildKey(contentKey + "-widget") }, content.render());
            }
            if (content instanceof HTMLElement) {
                return (widget_1.tsx("div", { key: buildKey(contentKey + "-html-element"), bind: content, afterCreate: this._attachToNode }));
            }
            if (widget_1.isWidgetBase(content)) {
                return (widget_1.tsx("div", { key: buildKey(contentKey + "-dijit"), bind: content.domNode, afterCreate: this._attachToNode }));
            }
            if (Array.isArray(content)) {
                return content.length ? (widget_1.tsx("div", { key: buildKey(contentKey + "-content-elements") }, content.map(this._renderContentElement, this))) : null;
            }
        };
        Feature.prototype._renderContentElement = function (contentElement, contentElementIndex) {
            var visibleElements = this.visibleElements;
            if (typeof visibleElements.content !== "boolean" &&
                !visibleElements.content[contentElement.type]) {
                return null;
            }
            switch (contentElement.type) {
                case "attachments":
                    return this._renderAttachments(contentElement, contentElementIndex);
                case "fields":
                    return this._renderFields(contentElement, contentElementIndex);
                case "media":
                    return this._renderMedia(contentElement, contentElementIndex);
                case "text":
                    return this._renderText(contentElement, contentElementIndex);
                default:
                    return null;
            }
        };
        Feature.prototype._renderAttachmentInfo = function (options) {
            var _a, _b;
            var attachmentInfo = options.attachmentInfo, supportsResizeAttachments = options.supportsResizeAttachments;
            var contentType = attachmentInfo.contentType, exifInfo = attachmentInfo.exifInfo, name = attachmentInfo.name, url = attachmentInfo.url;
            var thumbSize = 48;
            var orientation = exifUtils_1.getExifValue({
                exifName: "Exif IFD0",
                tagName: "Orientation",
                exifInfo: exifInfo
            });
            var imageStyles = featureUtils_1.getOrientationStyles(orientation);
            var hasSupportedImageFormat = supportsResizeAttachments && attachmentUtils.isSupportedImage(contentType);
            var sep = url.indexOf("?") === -1 ? "?" : "&";
            var thumbnail = hasSupportedImageFormat
                ? "" + url + sep + "w=" + thumbSize
                : attachmentUtils.getIconPath(contentType);
            var attachmentsItemMaskClasses = (_a = {},
                _a[CSS.attachmentsItemMaskIcon] = !hasSupportedImageFormat,
                _a);
            var attachmentsItemImageClasses = (_b = {},
                _b[CSS.attachmentsItemImageResizable] = supportsResizeAttachments,
                _b);
            return (widget_1.tsx("li", { class: CSS.attachmentsItem, key: attachmentInfo },
                widget_1.tsx("a", { class: CSS.attachmentsItemLink, href: url, target: "_blank" },
                    widget_1.tsx("div", { class: this.classes(attachmentsItemMaskClasses, CSS.attachmentsItemMask) },
                        widget_1.tsx("img", { styles: imageStyles, alt: "", class: this.classes(attachmentsItemImageClasses, CSS.attachmentsItemImage), src: thumbnail }),
                        widget_1.tsx("span", { class: CSS.attachmentsItemImageOverlay },
                            widget_1.tsx("span", { "aria-hidden": "true", class: CSS.attachmentsItemLinkIcon }))),
                    widget_1.tsx("span", { class: CSS.attachmentsItemFilename }, name || i18n.noTitle))));
        };
        Feature.prototype._renderAttachments = function (contentElement, contentElementIndex) {
            var _this = this;
            var _a;
            var displayType = contentElement.displayType, attachmentInfos = contentElement.attachmentInfos;
            var hasAttachments = attachmentInfos && attachmentInfos.length;
            var supportsResizeAttachments = this.get("graphic.layer.capabilities.operations.supportsResizeAttachments");
            var attachmentsClasses = (_a = {},
                _a[CSS.attachmentsList] = displayType !== "preview",
                _a[CSS.attachmentsPreview] = displayType === "preview",
                _a);
            return hasAttachments ? (widget_1.tsx("div", { key: buildKey("attachments-element"), class: this.classes(CSS.attachments, CSS.contentElement, attachmentsClasses) },
                widget_1.tsx("div", { class: CSS.attachmentsTitle }, i18n.attach),
                widget_1.tsx("ul", { class: CSS.attachmentsItems }, attachmentInfos.map(function (attachmentInfo, attachmentInfoIndex) {
                    return _this._renderAttachmentInfo({
                        attachmentInfo: attachmentInfo,
                        attachmentInfoIndex: attachmentInfoIndex,
                        supportsResizeAttachments: supportsResizeAttachments,
                        contentElement: contentElement
                    });
                })))) : null;
        };
        Feature.prototype._forceLTR = function (value) {
            /*
             * We use "&lrm;" when displaying numeric attribute field
             * values. We can use it to force LTR text direction - regardless of whether
             * the page is in LTR or RTL mode. Even in LTR mode, a number can be surrounded
             * by English or RTL scripts - but we need the number to be displayed in LTR
             * direction.
             * When not forced, minus sign of negative numbers is displayed after
             * the number - we want to avoid this.
             */
            return "&lrm;" + value;
        };
        Feature.prototype._renderFieldInfo = function (fieldInfo, contentElementIndex) {
            var _a;
            var viewModel = this.viewModel;
            var formattedAttributes = viewModel.formattedAttributes;
            var availableFormattedAttributes = formattedAttributes
                ? formattedAttributes.content[contentElementIndex] || formattedAttributes.global
                : null;
            var fieldName = fieldInfo.fieldName;
            var fieldLabel = fieldInfo.label || fieldName;
            var fieldValue = availableFormattedAttributes
                ? availableFormattedAttributes[fieldName] == null
                    ? ""
                    : availableFormattedAttributes[fieldName]
                : "";
            var isDateField = !!(fieldInfo.format && fieldInfo.format.dateFormat);
            var isNumericField = typeof fieldValue === "number" && !isDateField;
            var formattedFieldValue = isNumericField
                ? this._forceLTR(fieldValue)
                : uriUtils.autoLink(fieldValue);
            var valueCellClasses = (_a = {},
                _a[CSS.fieldDataDate] = isDateField,
                _a);
            return (widget_1.tsx("tr", { key: buildKey("fields-element-info-row", contentElementIndex) },
                widget_1.tsx("th", { key: buildKey("fields-element-info-row-header", contentElementIndex), class: CSS.fieldHeader, innerHTML: fieldLabel }),
                widget_1.tsx("td", { key: buildKey("fields-element-info-row-data", contentElementIndex), class: this.classes(CSS.fieldData, valueCellClasses), innerHTML: formattedFieldValue })));
        };
        Feature.prototype._renderFields = function (contentElement, contentElementIndex) {
            var _this = this;
            var fieldInfos = contentElement.fieldInfos;
            return fieldInfos ? (widget_1.tsx("div", { key: buildKey("fields-element", contentElementIndex), class: this.classes(CSS.fields, CSS.contentElement) },
                widget_1.tsx("table", { class: CSS.esriTable, summary: i18n.fieldsSummary, key: buildKey("fields-element-table", contentElementIndex) },
                    widget_1.tsx("tbody", { key: buildKey("fields-element-table-body", contentElementIndex) }, fieldInfos.map(function (fieldInfo) { return _this._renderFieldInfo(fieldInfo, contentElementIndex); }))))) : null;
        };
        Feature.prototype._shouldOpenInNewTab = function (url) {
            if (url === void 0) { url = ""; }
            if (!url) {
                return;
            }
            // Returns false if the given url uses "mailto" or "tel" protocol.
            // This is to prevent adding blank target to such links, thereby
            // preventing browsers from opening a blank tab enroute to opening the
            // appropriate desktop application.
            // Refs:
            // https://code.google.com/p/chromium/issues/detail?id=144126
            var startsWithMailToOrTelProtocolRE = /^(?:mailto:|tel:)/;
            return !startsWithMailToOrTelProtocolRE.test(url.trim().toLowerCase());
        };
        Feature.prototype._clearMediaRefreshTimers = function () {
            this._refreshTimers.forEach(function (timerId) { return clearTimeout(timerId); });
            this._refreshTimers.clear();
        };
        Feature.prototype._clearMediaRefreshTimer = function (contentElementIndex) {
            var refreshTimer = this._refreshTimers.get(contentElementIndex);
            if (!refreshTimer) {
                return;
            }
            clearTimeout(refreshTimer);
            this._refreshTimers.delete(contentElementIndex);
        };
        Feature.prototype._getImageSource = function (sourceURL, timestamp) {
            var querySeparator = sourceURL.indexOf("?") !== -1 ? "&" : "?";
            var _a = sourceURL.split("#"), url = _a[0], _b = _a[1], hash = _b === void 0 ? "" : _b;
            var hashSeparator = hash ? "#" : "";
            return "" + url + querySeparator + "timestamp=" + timestamp + hashSeparator + hash;
        };
        Feature.prototype._setupMediaRefreshTimer = function (contentElementIndex) {
            var content = this.get("viewModel.content");
            if (!Array.isArray(content)) {
                return;
            }
            var contentElement = content[contentElementIndex];
            if (!contentElement || contentElement.type !== "media") {
                return;
            }
            var activeMediaIndex = this._activeMediaMap.get(contentElementIndex);
            if (isNaN(activeMediaIndex)) {
                activeMediaIndex = 0;
            }
            var mediaInfo = contentElement.mediaInfos[activeMediaIndex];
            if (!mediaInfo || mediaInfo.type !== "image" || !mediaInfo.refreshInterval) {
                return;
            }
            this._setRefreshTimeout(contentElementIndex, mediaInfo);
        };
        Feature.prototype._setupMediaRefreshTimers = function () {
            var _this = this;
            this._clearMediaRefreshTimers();
            var content = this.get("viewModel.content");
            if (!Array.isArray(content)) {
                return;
            }
            content.forEach(function (contentElement, contentElementIndex) {
                return _this._setupMediaRefreshTimer(contentElementIndex);
            });
        };
        Feature.prototype._updateMediaInfoTimestamp = function (sourceURL, contentElementIndex) {
            var timestamp = Date.now();
            this._mediaInfo.set(contentElementIndex, {
                timestamp: timestamp,
                sourceURL: this._getImageSource(sourceURL, timestamp)
            });
            this.scheduleRender();
        };
        Feature.prototype._setRefreshTimeout = function (contentElementIndex, mediaInfo) {
            var _this = this;
            var refreshInterval = mediaInfo.refreshInterval, value = mediaInfo.value;
            if (!refreshInterval) {
                return;
            }
            var intervalInMs = refreshInterval * 60000;
            this._updateMediaInfoTimestamp(value.sourceURL, contentElementIndex);
            var timerId = setInterval(function () {
                _this._updateMediaInfoTimestamp(value.sourceURL, contentElementIndex);
            }, intervalInMs);
            this._refreshTimers.set(contentElementIndex, timerId);
        };
        Feature.prototype._renderMediaInfoType = function (options) {
            var mediaInfo = options.mediaInfo, contentElementIndex = options.contentElementIndex, activeMediaIndex = options.activeMediaIndex;
            var _a = mediaInfo.title, title = _a === void 0 ? "" : _a;
            if (mediaInfo.type === "image") {
                var info = mediaInfo;
                var value = info.value, refreshInterval = info.refreshInterval;
                var sourceURL = value.sourceURL, linkURL = value.linkURL;
                var linkOpenInNewTab = this._shouldOpenInNewTab(linkURL);
                var linkTarget = linkOpenInNewTab ? "_blank" : "_self";
                var refreshIntervalInfo = refreshInterval ? this._mediaInfo.get(contentElementIndex) : null;
                var timestamp = refreshIntervalInfo ? refreshIntervalInfo.timestamp : 0;
                var imgSrc = refreshIntervalInfo ? refreshIntervalInfo.sourceURL : sourceURL;
                var imageNode = (widget_1.tsx("img", { alt: title, key: 
                    /* unique key is needed to redraw image node when refreshInterval is defined for a mediaInfo. */
                    buildKey("media-image-" + timestamp + "-" + contentElementIndex, activeMediaIndex), src: imgSrc }));
                var linkNode = linkURL ? (widget_1.tsx("a", { title: title, href: linkURL, target: linkTarget }, imageNode)) : null;
                return linkNode ? linkNode : imageNode;
            }
            if (mediaInfo.type.indexOf("chart") !== -1) {
                return (widget_1.tsx("div", { key: buildKey("media-chart-" + contentElementIndex, activeMediaIndex), bind: this, "data-media-info": mediaInfo, "data-content-element-index": contentElementIndex, class: CSS.mediaChart, afterCreate: this._getChartDependencies }));
            }
            return undefined;
        };
        Feature.prototype._getChartDependencies = function (chartDiv) {
            var _this = this;
            var mediaInfo = chartDiv["data-media-info"];
            var contentElementIndex = chartDiv["data-content-element-index"];
            var value = mediaInfo.value;
            var type = mediaInfo.type;
            chartUtils_1.loadChartsModule().then(function (amCharts4Index) {
                _this._renderChart({
                    chartDiv: chartDiv,
                    contentElementIndex: contentElementIndex,
                    type: type,
                    value: value,
                    chartsModule: amCharts4Index
                });
            });
        };
        Feature.prototype._createPieChart = function (options) {
            var chartDiv = options.chartDiv, amCharts4Index = options.chartsModule;
            var am4core = amCharts4Index.am4core, am4charts = amCharts4Index.am4charts;
            var chart = am4core.create(chartDiv, am4charts.PieChart);
            var series = chart.series.push(new am4charts.PieSeries());
            series.labels.template.disabled = true;
            series.ticks.template.disabled = true;
            series.dataFields.value = "y";
            series.dataFields.category = "x";
            return chart;
        };
        Feature.prototype._createXYChart = function (options) {
            var chartDiv = options.chartDiv, type = options.type, value = options.value, amCharts4Index = options.chartsModule;
            var am4core = amCharts4Index.am4core, am4charts = amCharts4Index.am4charts;
            var chart = am4core.create(chartDiv, am4charts.XYChart);
            var enableScrollbar = value.series.length > 15;
            if (type === "column-chart") {
                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "x";
                categoryAxis.renderer.labels.template.disabled = true;
                chart.yAxes.push(new am4charts.ValueAxis());
                var series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueY = "y";
                series.dataFields.categoryX = "x";
                chart.cursor = new am4charts.XYCursor();
                if (enableScrollbar) {
                    chart.scrollbarX = new am4core.Scrollbar();
                }
            }
            if (type === "bar-chart") {
                var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "x";
                categoryAxis.renderer.inversed = true;
                categoryAxis.renderer.labels.template.disabled = true;
                chart.xAxes.push(new am4charts.ValueAxis());
                var series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueX = "y";
                series.dataFields.categoryY = "x";
                chart.cursor = new am4charts.XYCursor();
                if (enableScrollbar) {
                    chart.scrollbarY = new am4core.Scrollbar();
                }
            }
            if (type === "line-chart") {
                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "x";
                categoryAxis.renderer.labels.template.disabled = true;
                chart.yAxes.push(new am4charts.ValueAxis());
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.categoryX = "x";
                series.dataFields.valueY = "y";
                chart.cursor = new am4charts.XYCursor();
                if (enableScrollbar) {
                    chart.scrollbarX = new am4core.Scrollbar();
                }
            }
            return chart;
        };
        Feature.prototype._renderChart = function (options) {
            var contentElementIndex = options.contentElementIndex, type = options.type, value = options.value, amCharts4Index = options.chartsModule;
            var am4core = amCharts4Index.am4core;
            am4core.useTheme(amCharts4Index.am4themes_animated);
            var chart = type === "pie-chart" ? this._createPieChart(options) : this._createXYChart(options);
            chart.data = value.series.map(function (entry) { return ({
                x: entry.tooltip,
                y: entry.y
            }); });
            this._chartMap.set(contentElementIndex, chart);
        };
        Feature.prototype._renderMediaInfo = function (options) {
            var mediaInfo = options.mediaInfo, contentElementIndex = options.contentElementIndex, activeMediaIndex = options.activeMediaIndex;
            var mediaTypeNode = this._renderMediaInfoType({
                mediaInfo: mediaInfo,
                contentElementIndex: contentElementIndex,
                activeMediaIndex: activeMediaIndex
            });
            var titleNode = mediaInfo.title ? (widget_1.tsx("div", { key: buildKey("media-title", contentElementIndex), class: CSS.mediaItemTitle, innerHTML: mediaInfo.title })) : null;
            var captionNode = mediaInfo.caption ? (widget_1.tsx("div", { key: buildKey("media-caption", contentElementIndex), class: CSS.mediaItemCaption, innerHTML: mediaInfo.caption })) : null;
            return (widget_1.tsx("div", { key: buildKey("media-container", contentElementIndex), class: CSS.mediaItemContainer },
                widget_1.tsx("div", { key: buildKey("media-item-container", contentElementIndex), class: CSS.mediaItem }, mediaTypeNode),
                titleNode,
                captionNode));
        };
        Feature.prototype._renderMediaPageButton = function (direction, contentElementIndex) {
            var isPrevious = direction === "previous";
            var title = isPrevious ? i18n.previous : i18n.next;
            var buttonClasses = isPrevious
                ? this.classes(CSS.btn, CSS.mediaPrevious)
                : this.classes(CSS.btn, CSS.mediaNext);
            var LTRIconClasses = isPrevious
                ? this.classes(CSS.icon, CSS.mediaPreviousIconLTR, CSS.iconLeftTriangleArrow)
                : this.classes(CSS.icon, CSS.mediaNextIconLTR, CSS.iconRightTriangleArrow);
            var RTLIconClasses = isPrevious
                ? this.classes(CSS.icon, CSS.mediaPreviousIconRTL, CSS.iconRightTriangleArrow)
                : this.classes(CSS.icon, CSS.mediaNextIconRTL, CSS.iconLeftTriangleArrow);
            var keyName = isPrevious ? "previous" : "next";
            var buttonClick = isPrevious ? this._previousClick : this._nextClick;
            return (widget_1.tsx("div", { key: buildKey(keyName, contentElementIndex), title: title, tabIndex: 0, role: "button", class: buttonClasses, "data-content-element-index": contentElementIndex, bind: this, onkeydown: buttonClick, onclick: buttonClick },
                widget_1.tsx("span", { "aria-hidden": "true", class: LTRIconClasses }),
                widget_1.tsx("span", { "aria-hidden": "true", class: RTLIconClasses }),
                widget_1.tsx("span", { class: CSS.iconText }, title)));
        };
        Feature.prototype._handleMediaKeyup = function (event) {
            var node = event.currentTarget;
            var elementIndex = node["data-content-element-index"];
            var keyCode = event.keyCode;
            if (keyCode === keys_1.LEFT_ARROW) {
                event.stopPropagation();
                this.previousMedia(elementIndex);
            }
            if (keyCode === keys_1.RIGHT_ARROW) {
                event.stopPropagation();
                this.nextMedia(elementIndex);
            }
        };
        Feature.prototype._renderMedia = function (contentElement, contentElementIndex) {
            var _a;
            var mediaInfos = contentElement.mediaInfos;
            var total = (mediaInfos && mediaInfos.length) || 0;
            var mediaClasses = (_a = {},
                _a[CSS.showMediaPagination] = total > 1,
                _a);
            var previousButtonNode = this._renderMediaPageButton("previous", contentElementIndex);
            var nextButtonNode = this._renderMediaPageButton("next", contentElementIndex);
            var activeMediaIndex = this._activeMediaMap.get(contentElementIndex);
            if (isNaN(activeMediaIndex)) {
                this._activeMediaMap.set(contentElementIndex, 0);
                activeMediaIndex = 0;
            }
            return total ? (widget_1.tsx("div", { key: buildKey("media-element", contentElementIndex), "data-content-element-index": contentElementIndex, bind: this, onkeyup: this._handleMediaKeyup, class: this.classes(CSS.media, CSS.contentElement, mediaClasses) },
                widget_1.tsx("div", { key: buildKey("media-element-container", contentElementIndex), class: CSS.mediaContainer },
                    previousButtonNode,
                    this._renderMediaInfo({
                        mediaInfo: mediaInfos[activeMediaIndex],
                        contentElementIndex: contentElementIndex,
                        activeMediaIndex: activeMediaIndex
                    }),
                    nextButtonNode))) : null;
        };
        Feature.prototype._renderLastEditInfo = function () {
            var visibleElements = this.visibleElements;
            var lastEditInfo = this.viewModel.lastEditInfo;
            if (!lastEditInfo || !visibleElements.lastEditedInfo) {
                return null;
            }
            var date = lastEditInfo.date, user = lastEditInfo.user;
            var nlsString = lastEditInfo.type === "edit"
                ? user
                    ? i18n.lastEditedByUser
                    : i18n.lastEdited
                : user
                    ? i18n.lastCreatedByUser
                    : i18n.lastCreated;
            var text = lang_1.substitute({
                date: date,
                user: user
            }, nlsString);
            return (widget_1.tsx("div", { key: buildKey("edit-info-element"), class: this.classes(CSS.lastEditedInfo, CSS.contentElement) }, text));
        };
        Feature.prototype._renderText = function (contentElement, contentElementIndex) {
            var hasText = contentElement.text;
            return hasText ? (widget_1.tsx("div", { key: buildKey("text-element", contentElementIndex), innerHTML: contentElement.text, class: this.classes(CSS.text, CSS.contentElement) })) : null;
        };
        Feature.prototype._attachToNode = function (node) {
            var content = this;
            node.appendChild(content);
        };
        Feature.prototype._setContentElementMedia = function (contentElementIndex, pagedMediaIndex) {
            this._clearMediaRefreshTimer(contentElementIndex);
            var content = this.viewModel.content;
            var contentElement = content && content[contentElementIndex];
            var mediaInfos = contentElement && contentElement.mediaInfos;
            if (!mediaInfos || !mediaInfos.length) {
                return;
            }
            var pagedRoundRobin = (pagedMediaIndex + mediaInfos.length) % mediaInfos.length;
            this._activeMediaMap.set(contentElementIndex, pagedRoundRobin);
            this._setupMediaRefreshTimer(contentElementIndex);
            this.scheduleRender();
        };
        Feature.prototype._pageContentElementMedia = function (contentElementIndex, direction) {
            var delta = direction === "previous" ? -1 : 1;
            var pagedMediaIndex = this._activeMediaMap.get(contentElementIndex) + delta;
            this._setContentElementMedia(contentElementIndex, pagedMediaIndex);
        };
        Feature.prototype._previousClick = function (event) {
            var node = event.currentTarget;
            var elementIndex = node["data-content-element-index"];
            this.previousMedia(elementIndex);
        };
        Feature.prototype._nextClick = function (event) {
            var node = event.currentTarget;
            var elementIndex = node["data-content-element-index"];
            this.nextMedia(elementIndex);
        };
        __decorate([
            decorators_1.aliasOf("viewModel.graphic")
        ], Feature.prototype, "graphic", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.defaultPopupTemplateEnabled")
        ], Feature.prototype, "defaultPopupTemplateEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.spatialReference")
        ], Feature.prototype, "spatialReference", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.title")
        ], Feature.prototype, "title", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], Feature.prototype, "visibleElements", void 0);
        __decorate([
            decorators_1.cast("visibleElements")
        ], Feature.prototype, "castVisibleElements", null);
        __decorate([
            decorators_1.aliasOf("viewModel.map")
        ], Feature.prototype, "map", void 0);
        __decorate([
            decorators_1.property({
                type: FeatureViewModel
            }),
            widget_1.renderable(["viewModel.waitingForContent", "viewModel.content", "viewModel.lastEditInfo"])
        ], Feature.prototype, "viewModel", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], Feature.prototype, "_previousClick", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Feature.prototype, "_nextClick", null);
        Feature = __decorate([
            decorators_1.subclass("esri.widgets.Feature")
        ], Feature);
        return Feature;
    }(decorators_1.declared(Widget)));
    return Feature;
});
//# sourceMappingURL=Feature.js.map