/**
 * The Print widget connects your application with a [printing service](https://server.arcgis.com/en/portal/latest/administer/windows/configure-the-portal-to-print-maps.htm) to allow the map to be printed.
 * It takes advantage of server-side, high-quality, full cartographic print functionality using the ExportWebMap service of ArcGIS,
 * which can be configured with custom layout templates. One is provided that shows the map only, while another provides a layout with legend, etc.
 * The Print widget works with the {@link module:esri/tasks/PrintTask} which generates a printer-ready version of the map.
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * * There is no current support for printing {@link module:esri/views/SceneView SceneViews}. Instead, see {@link module:esri/views/SceneView#takeScreenshot SceneView.takeScreenshot()}.
 * * {@link module:esri/layers/VectorTileLayer} printing requires ArcGIS Server 10.5.1 or later.
 * * {@link module:esri/layers/support/LabelClass Labels} currently cannot be printed as part of a FeatureLayer with ArcGIS Server 10.5.1 or any Printing Service published with ArcMap.
 * * {@link module:esri/layers/ImageryLayer} cannot be printed with ArcGIS Server 10.5.1 or earlier, or any Printing Service published with ArcMap.
 * * The print server does not directly print [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol) symbols. Rather, they are converted to {@link module:esri/symbols/PictureMarkerSymbol PictureMarkerSymbols} for display.
 * * Make certain that any resources to be printed are accessible by the print server. For example, if printing a map containing {@link module:esri/symbols/PictureMarkerSymbol PictureMarkerSymbols},
 * the URL to these symbols must be accessible to the print server for it to work properly.
 * * Printing layers rendered with the {@link module:esri/renderers/DotDensityRenderer} will create a client-side image of the layer in the printout.
 * * For printing secure VectorTileLayers with ArcGIS Server 10.5.1 or 10.6.0,
 * or for printing VectorTileLayers with ArcGIS Server 10.5.1 or any Printing Service published with [ArcMap](https://desktop.arcgis.com/en/arcmap/),
 * the {@link module:esri/tasks/PrintTask} will create a client-side image for the VectorTileLayer to use in the printout.
 * This has some limitations related to large size printing quality and a dependency on browser window height/width ratio.
 * :::
 *
 * @module esri/widgets/Print
 * @since 4.2
 *
 * @see [Print.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Print.tsx)
 * @see [Print.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Print.scss)
 * @see [Sample - Print widget](../sample-code/widgets-print/index.html)
 * @see module:esri/widgets/Print/PrintViewModel
 * @see [Printing in web applications](https://server.arcgis.com/en/server/latest/create-web-apps/windows/printing-in-web-applications.htm)
 * @see [Configure the portal to print maps](https://server.arcgis.com/en/portal/latest/administer/windows/configure-the-portal-to-print-maps.htm)
 * @see [Export Web Map Task (Geoprocessing service) [REST doc]](https://developers.arcgis.com/rest/services-reference/export-web-map-task.htm)
 *
 * @example
 * var print = new Print({
 *   view: view
 * });
 * // Adds widget below other elements in the top left corner of the view
 * view.ui.add(print, {
 *   position: "top-left"
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/widgets/Print/nls/Print", "esri/core/Collection", "esri/core/Logger", "esri/core/urlUtils", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/tasks/support/PrintTemplate", "esri/widgets/Widget", "esri/widgets/Print/FileLink", "esri/widgets/Print/PrintViewModel", "esri/widgets/Print/TemplateOptions", "esri/tasks/PrintTask", "esri/tasks/support/PrintParameters", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18n, Collection, Logger, urlUtils, watchUtils, decorators_1, PrintTemplate, Widget, FileLink, PrintViewModel, TemplateOptions, PrintTask, PrintParameters, widget_1) {
    "use strict";
   // i18n = __importStar(i18n);
    var FileLinkCollection = Collection.ofType(FileLink);
    var CSS = {
        // base
        base: "esri-print esri-widget esri-widget--panel",
        // print-widget
        headerTitle: "esri-print__header-title",
        inputText: "esri-print__input-text",
        layoutTabList: "esri-print__layout-tab-list",
        layoutTab: "esri-print__layout-tab",
        layoutSection: "esri-print__layout-section",
        mapOnlySection: "esri-print__map-only-section",
        scaleInput: "esri-print__scale-input",
        // startup
        loader: "esri-print__loader",
        // buttons
        advancedOptionsButton: "esri-print__advanced-options-button",
        advancedOptionsButtonContainer: "esri-print__advanced-options-button-container",
        advancedOptionsButtonTitle: "esri-print__advanced-options-button-title",
        advancedOptionsButtonIconOpened: "esri-print__advanced-options-button-icon--opened",
        advancedOptionsButtonIconClosed: "esri-print__advanced-options-button-icon--closed",
        advancedOptionsButtonIconClosed_RTL: "esri-print__advanced-options-button-icon--closed-rtl",
        refreshButton: "esri-print__refresh-button",
        swapButton: "esri-print__swap-button",
        linkButton: "esri-print__link-button",
        printButton: "esri-print__export-button",
        // containers
        formSectionContainer: "esri-print__form-section-container",
        advancedOptionsSection: "esri-print__advanced-options-section",
        advancedOptionsContainer: "esri-print__advanced-options-container",
        authorInfoContainer: "esri-print__author-info-container",
        copyrightInfoContainer: "esri-print__copyright-info-container",
        exportedFilesContainer: "esri-print__export-panel-container",
        exportedFilesTitle: "esri-print__export-title",
        exportedFile: "esri-print__exported-file",
        exportedFileLink: "esri-widget__anchor esri-print__exported-file-link",
        exportedFileLinkTitle: "esri-print__exported-file-link-title",
        heightContainer: "esri-print__height-container",
        legendInfoContainer: "esri-print__legend-info-container",
        printWidgetContainer: "esri-print__container",
        panelContainer: "esri-print__panel-container",
        scaleInfoContainer: "esri-print__scale-info-container",
        scaleInputContainer: "esri-print__scale-input-container",
        sizeContainer: "esri-print__size-container",
        widthContainer: "esri-print__width-container",
        // common
        widgetButton: "esri-widget--button",
        button: "esri-button",
        select: "esri-select",
        header: "esri-widget__heading",
        input: "esri-input",
        disabled: "esri-disabled",
        anchorDisabled: "esri-widget__anchor--disabled",
        buttonDisabled: "esri-button--disabled",
        panelError: "esri-print__panel--error",
        exportedFileError: "esri-print__exported-file--error",
        hide: "esri-hidden",
        rotate: "esri-rotating",
        // icons
        iconCheckMark: "esri-icon-check-mark",
        iconDownload: "esri-icon-download",
        iconError: "esri-icon-error",
        iconPrinter: "esri-icon-printer",
        iconRightTriangleArrow: "esri-icon-right-triangle-arrow",
        iconLeftTriangleArrow: "esri-icon-left-triangle-arrow",
        iconDownArrow: "esri-icon-down-arrow",
        iconRefresh: "esri-icon-refresh",
        iconSpinner: "esri-icon-loading-indicator",
        iconSwap: "esri-icon-swap",
        iconLinked: "esri-icon-link-horizontal",
        iconUnlinked: "esri-icon-unlocked-link-horizontal",
        widgetIcon: "esri-icon-printer"
    };
    var declaredClass = "esri.widgets.Print";
    var logger = Logger.getLogger(declaredClass);
    var invalidLayoutWarningMessage = "User sets an invalid layout, resetting it to the default valid one...";
    var invalidFormatWarningMessage = "User sets an invalid format, resetting it to the default valid one...";
    var Print = /** @class */ (function (_super) {
        __extends(Print, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @extends module:esri/widgets/Widget
         * @constructor
         * @alias module:esri/widgets/Print
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * var print = new Print({
         *   view: view,
         *   printServiceUrl: "https://www.example.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
         * });
         */
        function Print(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._exportedFileNameMap = {};
            _this._layoutTabSelected = true;
            _this._advancedOptionsVisibleForLayout = false;
            _this._advancedOptionsVisibleForMapOnly = false;
            _this._pendingExportScroll = false;
            _this._previousTitleOrFilename = "";
            _this._rootNode = null;
            _this._awaitingServerResponse = false;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  exportedLinks
            //----------------------------------
            /**
             * @todo doc
             * @type {module:esri/core/Collection<module:esri/widgets/Print/FileLink>}
             * @ignore
             */
            _this.exportedLinks = new FileLinkCollection();
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
            //  templateOptions
            //----------------------------------
            /**
             * Defines the layout template options used by the {@link module:esri/widgets/Print|Print} widget to generate the print page.
             *
             * @name templateOptions
             * @since 4.6
             * @instance
             *
             * @example
             * templateOptions: {
             *   title: "My Print",
             *   author: "Sam",
             *   copyright: "My Company",
             *   legendEnabled: false
             * }
             *
             * @type {module:esri/widgets/Print/TemplateOptions}
             * @autocast
             */
            _this.templateOptions = new TemplateOptions();
            //----------------------------------
            //  printServiceUrl
            //----------------------------------
            /**
             * The URL of the REST endpoint of the Export Web Map Task.
             *
             * @name printServiceUrl
             * @instance
             * @type {string}
             */
            _this.printServiceUrl = null;
            //----------------------------------
            //  view
            //----------------------------------
            /**
             * A reference to the {@link module:esri/views/MapView}. Set this to link
             * the widget to a specific view.
             *
             * @todo REMOVE UNTIL SCENEVIEW SUPPORTS PRINTING or {@link module:esri/views/SceneView}
             *
             * @name view
             * @instance
             *
             * @type {module:esri/views/MapView}
             */
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            /**
             * The view model for this widget. This is a class that contains all the logic
             * (properties and methods) that controls this widget's behavior. See the
             * {@link module:esri/widgets/Print/PrintViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/Print/PrintViewModel}
             * @autocast
             */
            _this.viewModel = new PrintViewModel();
            return _this;
        }
        Print.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils.init(this, "viewModel.templatesInfo", function (templatesInfo) {
                    var _a = _this.templateOptions, format = _a.format, layout = _a.layout;
                    if (templatesInfo) {
                        var isValidLayout = layout === templatesInfo.layout.defaultValue ||
                            (layout && layout.toUpperCase() === "MAP_ONLY") ||
                            (templatesInfo.layout.choiceList &&
                                templatesInfo.layout.choiceList.indexOf(layout) > -1);
                        var isValidFormat = format === templatesInfo.format.defaultValue ||
                            (templatesInfo.format.choiceList &&
                                templatesInfo.format.choiceList.indexOf(format) > -1);
                        if (!isValidLayout) {
                            if (layout) {
                                logger.warn(invalidLayoutWarningMessage);
                            }
                            _this.templateOptions.layout = templatesInfo.layout.defaultValue;
                        }
                        if (!isValidFormat) {
                            if (format) {
                                logger.warn(invalidFormatWarningMessage);
                            }
                            _this.templateOptions.format = templatesInfo.format.defaultValue;
                        }
                        if (layout && layout.toUpperCase() === "MAP_ONLY") {
                            _this._layoutTabSelected = false;
                        }
                    }
                }),
                watchUtils.init(this, "templateOptions.format", function (newValue) {
                    var templatesInfo = _this.viewModel.templatesInfo;
                    if (templatesInfo && newValue) {
                        var isValidFormat_1 = false;
                        templatesInfo.format.choiceList &&
                            templatesInfo.format.choiceList.forEach(function (option) {
                                if (option.toUpperCase() === newValue.toUpperCase()) {
                                    _this.templateOptions.format = option;
                                    isValidFormat_1 = true;
                                }
                            });
                        if (!isValidFormat_1) {
                            _this.templateOptions.format = templatesInfo.format.defaultValue;
                            logger.warn(invalidFormatWarningMessage);
                        }
                        _this.scheduleRender();
                    }
                }),
                watchUtils.init(this, "templateOptions.layout", function (newValue) {
                    var templatesInfo = _this.viewModel.templatesInfo;
                    if (templatesInfo && newValue) {
                        _this._layoutTabSelected = newValue.toUpperCase() !== "MAP_ONLY";
                        var isValidLayout_1 = false || !_this._layoutTabSelected;
                        if (!isValidLayout_1) {
                            templatesInfo.layout.choiceList &&
                                templatesInfo.layout.choiceList.forEach(function (option) {
                                    if (option.toUpperCase() === newValue.toUpperCase()) {
                                        _this.templateOptions.layout = option;
                                        isValidLayout_1 = true;
                                    }
                                });
                        }
                        if (!isValidLayout_1) {
                            _this.templateOptions.layout = templatesInfo.layout.defaultValue;
                            logger.warn(invalidLayoutWarningMessage);
                        }
                        _this.scheduleRender();
                    }
                }),
                watchUtils.init(this, "templateOptions.dpi", function (newValue) {
                    if (newValue <= 0) {
                        _this.templateOptions.dpi = 1;
                        return;
                    }
                    _this.scheduleRender();
                }),
                watchUtils.init(this, "viewModel.view.scale", function (newValue) {
                    var _a = _this.templateOptions, scale = _a.scale, scaleEnabled = _a.scaleEnabled;
                    if (!scaleEnabled || !scale) {
                        _this.templateOptions.scale = newValue;
                    }
                }),
                watchUtils.whenOnce(this, "printServiceUrl", function () {
                    var maxWaitTime = 500;
                    var timeoutId = setTimeout(function () {
                        _this._awaitingServerResponse = true;
                        _this.scheduleRender();
                    }, maxWaitTime);
                    _this.viewModel.load().then(function () { return clearTimeout(timeoutId); });
                })
            ]);
            var _a = this.templateOptions, height = _a.height, width = _a.width;
            this.templateOptions.width = width || 800;
            this.templateOptions.height = height || 1100;
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        Print.prototype.render = function () {
            var _a;
            var _b = this.templateOptions, attributionEnabled = _b.attributionEnabled, author = _b.author, copyright = _b.copyright, dpi = _b.dpi, format = _b.format, height = _b.height, layout = _b.layout, legendEnabled = _b.legendEnabled, title = _b.title, scaleEnabled = _b.scaleEnabled, scale = _b.scale, width = _b.width;
            var titleSection = (widget_1.tsx("div", { class: CSS.formSectionContainer },
                widget_1.tsx("label", null,
                    this._layoutTabSelected ? i18n.title : i18n.fileName,
                    widget_1.tsx("input", { type: "text", tabIndex: 0, placeholder: this._layoutTabSelected ? i18n.titlePlaceHolder : i18n.fileNamePlaceHolder, class: this.classes(CSS.inputText, CSS.input), value: title, "data-input-name": "title", oninput: this._updateInputValue, bind: this }))));
            var fileFormatMenuItems = this.get("viewModel.templatesInfo.format.choiceList") || [];
            var fileFormatOptions = fileFormatMenuItems.length > 0 ? (fileFormatMenuItems.map(function (fileFormatMenuItem) {
                var selected = fileFormatMenuItem === format;
                return (widget_1.tsx("option", { key: fileFormatMenuItem, selected: selected, value: fileFormatMenuItem }, fileFormatMenuItem.toUpperCase()));
            })) : (widget_1.tsx("option", { key: "format-default-option" }, i18n.formatDefaultOption));
            var fileFormatSection = (widget_1.tsx("div", { class: CSS.formSectionContainer },
                widget_1.tsx("label", null,
                    i18n.fileFormatTitle,
                    widget_1.tsx("select", { class: CSS.select, onchange: this._updateFromOption, "data-target-property": "format", bind: this }, fileFormatOptions))));
            var layoutMenuItems = this.get("viewModel.templatesInfo.layout.choiceList") || [];
            var layoutOptions = layoutMenuItems.length > 0 ? (layoutMenuItems.map(function (layoutMenuItem) {
                var selected = layoutMenuItem === layout;
                var label = i18n[layoutMenuItem] || layoutMenuItem;
                return (widget_1.tsx("option", { key: layoutMenuItem, selected: selected, value: layoutMenuItem }, label));
            })) : (widget_1.tsx("option", { key: "layout-default-option" }, i18n.layoutDefaultOption));
            var pageSetupSection = (widget_1.tsx("div", { class: CSS.formSectionContainer },
                widget_1.tsx("label", null,
                    i18n.layoutTitle,
                    widget_1.tsx("select", { class: CSS.select, onchange: this._updateFromOption, "data-target-property": "layout", bind: this }, layoutOptions))));
            var dpiSection = (widget_1.tsx("div", { class: CSS.formSectionContainer },
                widget_1.tsx("label", null,
                    i18n.dpi,
                    widget_1.tsx("input", { type: "number", class: this.classes(CSS.inputText, CSS.input), "data-input-name": "dpi", oninput: this._updateInputValue, value: "" + dpi, min: "1", tabIndex: 0, bind: this }))));
            var scaleSection = (widget_1.tsx("div", { class: this.classes(CSS.scaleInfoContainer, CSS.formSectionContainer) },
                widget_1.tsx("label", null,
                    widget_1.tsx("input", { "data-option-name": "scaleEnabled", checked: scaleEnabled, type: "checkbox", tabIndex: 0, onchange: this._toggleInputValue, bind: this }),
                    i18n.scale),
                widget_1.tsx("div", { class: CSS.scaleInputContainer },
                    widget_1.tsx("input", { "aria-label": i18n.scaleLabel, "aria-valuenow": "" + scale, role: "spinbutton", type: "number", class: this.classes(CSS.inputText, CSS.input, CSS.scaleInput), tabIndex: 0, "data-input-name": "scale", oninput: this._updateInputValue, disabled: !scaleEnabled, value: "" + scale, bind: this }),
                    widget_1.tsx("button", { role: "button", "aria-label": i18n.reset, class: this.classes(CSS.widgetButton, CSS.refreshButton, CSS.iconRefresh), tabIndex: 0, onclick: this._resetToCurrentScale, bind: this }))));
            var advancedSectionForLayout = this._advancedOptionsVisibleForLayout ? (widget_1.tsx("div", { "aria-labelledby": this.id + "__advancedOptionsForLayout", class: CSS.advancedOptionsContainer },
                scaleSection,
                widget_1.tsx("div", { class: this.classes(CSS.authorInfoContainer, CSS.formSectionContainer) },
                    widget_1.tsx("label", null,
                        i18n.author,
                        widget_1.tsx("input", { type: "text", value: author, class: this.classes(CSS.inputText, CSS.input), tabIndex: 0, "data-input-name": "author", oninput: this._updateInputValue, bind: this }))),
                widget_1.tsx("div", { class: this.classes(CSS.copyrightInfoContainer, CSS.formSectionContainer) },
                    widget_1.tsx("label", null,
                        i18n.copyright,
                        widget_1.tsx("input", { type: "text", class: this.classes(CSS.inputText, CSS.input), tabIndex: 0, value: copyright, "data-input-name": "copyright", oninput: this._updateInputValue, bind: this }))),
                dpiSection,
                widget_1.tsx("div", { class: this.classes(CSS.legendInfoContainer, CSS.formSectionContainer) },
                    widget_1.tsx("label", null,
                        widget_1.tsx("input", { type: "checkbox", "data-option-name": "legendEnabled", tabIndex: 0, checked: legendEnabled, onchange: this._toggleInputValue, bind: this }),
                        i18n.legend)))) : null;
            var advancedSectionForMapOnly = this._advancedOptionsVisibleForMapOnly ? (widget_1.tsx("div", { "aria-labelledby": this.id + "__advancedOptionsForMapOnly", class: CSS.advancedOptionsContainer },
                scaleSection,
                dpiSection,
                widget_1.tsx("div", { class: CSS.formSectionContainer },
                    widget_1.tsx("label", null,
                        widget_1.tsx("input", { "data-option-name": "attributionEnabled", type: "checkbox", onchange: this._toggleInputValue, tabIndex: 0, checked: attributionEnabled, bind: this }),
                        i18n.attribution)))) : null;
            var panel = this._layoutTabSelected ? (widget_1.tsx("section", { key: "esri-print__layoutContent", id: this.id + "__layoutContent", "aria-labelledby": this.id + "__layoutTab", class: CSS.layoutSection, role: "tabpanel", "aria-selected": this._layoutTabSelected },
                widget_1.tsx("div", { class: CSS.panelContainer },
                    titleSection,
                    pageSetupSection,
                    this._layoutTabSelected ? fileFormatSection : null),
                widget_1.tsx("div", { class: this.classes(CSS.panelContainer, CSS.advancedOptionsSection) },
                    widget_1.tsx("button", { "aria-label": i18n.advancedOptions, "aria-expanded": this._advancedOptionsVisibleForLayout ? "true" : "false", role: "button", class: CSS.advancedOptionsButton, onclick: this._showAdvancedOptions, bind: this },
                        widget_1.tsx("div", { class: CSS.advancedOptionsButtonContainer },
                            widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.iconRightTriangleArrow, CSS.advancedOptionsButtonIconClosed) }),
                            widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.iconLeftTriangleArrow, CSS.advancedOptionsButtonIconClosed_RTL) }),
                            widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.iconDownArrow, CSS.advancedOptionsButtonIconOpened) }),
                            widget_1.tsx("span", { class: CSS.advancedOptionsButtonTitle }, i18n.advancedOptions))),
                    advancedSectionForLayout))) : (widget_1.tsx("section", { key: "esri-print__mapOnlyContent", id: this.id + "__mapOnlyContent", "aria-selected": !this._layoutTabSelected, "aria-labelledby": this.id + "__mapOnlyTab", class: CSS.mapOnlySection, role: "tabpanel" },
                widget_1.tsx("div", { class: CSS.panelContainer },
                    titleSection,
                    this._layoutTabSelected ? null : fileFormatSection,
                    widget_1.tsx("div", { class: this.classes(CSS.sizeContainer, CSS.formSectionContainer) },
                        widget_1.tsx("div", { class: CSS.widthContainer },
                            widget_1.tsx("label", null,
                                i18n.width,
                                widget_1.tsx("input", { type: "text", class: this.classes(CSS.inputText, CSS.input), "data-input-name": "width", onchange: this._updateInputValue, value: "" + width, tabIndex: 0, bind: this }))),
                        widget_1.tsx("div", { class: CSS.heightContainer },
                            widget_1.tsx("label", null,
                                i18n.height,
                                widget_1.tsx("input", { type: "text", class: this.classes(CSS.inputText, CSS.input), "data-input-name": "height", onchange: this._updateInputValue, value: "" + height, tabIndex: 0, bind: this }))),
                        widget_1.tsx("button", { role: "button", "aria-label": i18n.swap, class: this.classes(CSS.widgetButton, CSS.swapButton, CSS.iconSwap), onclick: this._switchInput, tabIndex: 0, bind: this })),
                    widget_1.tsx("div", { class: this.classes(CSS.panelContainer, CSS.advancedOptionsSection) },
                        widget_1.tsx("button", { "aria-label": i18n.advancedOptions, "aria-expanded": this._advancedOptionsVisibleForMapOnly ? "true" : "false", role: "button", class: CSS.advancedOptionsButton, onclick: this._showAdvancedOptions, bind: this },
                            widget_1.tsx("div", { class: CSS.advancedOptionsButtonContainer },
                                widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.iconRightTriangleArrow, CSS.advancedOptionsButtonIconClosed) }),
                                widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.iconLeftTriangleArrow, CSS.advancedOptionsButtonIconClosed_RTL) }),
                                widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.iconDownArrow, CSS.advancedOptionsButtonIconOpened) }),
                                widget_1.tsx("span", { class: CSS.advancedOptionsButtonTitle }, i18n.advancedOptions))),
                        advancedSectionForMapOnly))));
            var exportedLinksArray = this.exportedLinks.toArray();
            var exportedLinksItems = this._renderExportedLink(exportedLinksArray);
            var exportButtonClasses = (_a = {},
                _a[CSS.buttonDisabled] = !layout && !format,
                _a);
            var isSceneView = this.get("view") != null && this.get("view.type") !== "2d";
            var errorPanel = (widget_1.tsx("div", { class: CSS.panelError }, isSceneView ? i18n.sceneViewError : i18n.serviceError));
            var normalPanel = (widget_1.tsx("div", null,
                widget_1.tsx("ul", { class: CSS.layoutTabList, role: "tablist", onclick: this._toggleLayoutPanel, onkeydown: this._toggleLayoutPanel, bind: this },
                    widget_1.tsx("li", { id: this.id + "__layoutTab", "data-tab-id": "layoutTab", class: CSS.layoutTab, role: "tab", tabIndex: 0, "aria-selected": "" + this._layoutTabSelected }, i18n.layoutTab),
                    widget_1.tsx("li", { id: this.id + "__mapOnlyTab", "data-tab-id": "mapOnlyTab", class: CSS.layoutTab, role: "tab", tabIndex: 0, "aria-selected": "" + !this._layoutTabSelected }, i18n.mapOnlyTab)),
                panel,
                widget_1.tsx("button", { "aria-label": i18n.exportDescription, role: "button", class: this.classes(CSS.printButton, CSS.button, exportButtonClasses), tabIndex: 0, onclick: this._handlePrintMap, bind: this }, i18n.export),
                widget_1.tsx("div", { class: CSS.exportedFilesContainer, afterUpdate: this._scrollExportIntoView, onclick: this._removeLink, bind: this },
                    widget_1.tsx("h3", { class: this.classes(CSS.exportedFilesTitle, CSS.header) }, i18n.exportText),
                    exportedLinksArray.length > 0 ? null : (widget_1.tsx("div", null,
                        widget_1.tsx("div", null, i18n.exportHint))),
                    exportedLinksItems)));
            var printWidgetPanel = (widget_1.tsx("div", null,
                widget_1.tsx("div", { class: CSS.printWidgetContainer },
                    widget_1.tsx("header", { class: CSS.headerTitle }, i18n.export),
                    this.error || !this.printServiceUrl || isSceneView || !this.view
                        ? errorPanel
                        : normalPanel)));
            var initializing = this.get("viewModel.state") === "initializing";
            var panelContent = initializing ? this._renderLoader() : printWidgetPanel;
            return (widget_1.tsx("div", { afterCreate: widget_1.storeNode, bind: this, class: CSS.base, "data-node-ref": "_rootNode" }, panelContent));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Print.prototype._renderLoader = function () {
            var _a;
            var classes = (_a = {},
                _a[CSS.loader] = this._awaitingServerResponse,
                _a);
            return widget_1.tsx("div", { class: this.classes(classes), key: "loader" });
        };
        Print.prototype._createFileLink = function (template) {
            var titleText = template.layoutOptions.titleText || i18n.untitled, lowercaseFormat = template.format.toLowerCase(), extension = lowercaseFormat.indexOf("png") > -1 ? "png" : lowercaseFormat, fileName = titleText + extension, hasSameFileName = this._exportedFileNameMap[fileName] !== undefined;
            if (hasSameFileName) {
                this._exportedFileNameMap[fileName]++;
            }
            else {
                this._exportedFileNameMap[fileName] = 0;
            }
            return new FileLink({
                name: titleText,
                extension: extension,
                count: this._exportedFileNameMap[fileName]
            });
        };
        Print.prototype._toPrintTemplate = function (templateOptions) {
            var attributionEnabled = templateOptions.attributionEnabled, author = templateOptions.author, copyright = templateOptions.copyright, dpi = templateOptions.dpi, forceFeatureAttributes = templateOptions.forceFeatureAttributes, format = templateOptions.format, height = templateOptions.height, layout = templateOptions.layout, legendEnabled = templateOptions.legendEnabled, title = templateOptions.title, scale = templateOptions.scale, width = templateOptions.width;
            var printTemplate = new PrintTemplate({
                attributionVisible: attributionEnabled,
                layoutOptions: {
                    authorText: author || "",
                    copyrightText: copyright || "",
                    titleText: title || ""
                },
                forceFeatureAttributes: forceFeatureAttributes,
                format: format,
                layout: layout,
                outScale: scale
            });
            if (width) {
                printTemplate.exportOptions.width = width;
            }
            if (height) {
                printTemplate.exportOptions.height = height;
            }
            if (dpi) {
                printTemplate.exportOptions.dpi = dpi;
            }
            if (!legendEnabled) {
                printTemplate.layoutOptions.legendLayers = [];
            }
            return printTemplate;
        };
        Print.prototype._resetToCurrentScale = function () {
            this.templateOptions.scale = this.viewModel.view.scale;
        };
        Print.prototype._updateInputValue = function (e) {
            var target = e.target;
            var targetProperty = target.getAttribute("data-input-name");
            this.templateOptions[targetProperty] = target.value;
        };
        Print.prototype._handlePrintMap = function () {
            var _this = this;
            this._pendingExportScroll = true;
            var template = this._toPrintTemplate(this.templateOptions);
            var link = this._createFileLink(template);
            this.exportedLinks.add(link);
            var printTask = new PrintTask({ url: this.printServiceUrl });
            var params = new PrintParameters();
            params.view = this.viewModel.view;
            params.outSpatialReference = this.viewModel.view.spatialReference;
            params.template = template;
            template.layoutOptions.customTextElements = [{ 'propertyinfo': 'Property Information' }];
            printTask.execute(params).then(function (result) {
                link.set({
                    url: result && result.url,
                    state: "ready"
                });
            })
                .catch(function () {
                link.set({
                    state: "error"
                });
            })
                .then(function () { return _this.scheduleRender(); });
            ;
            // this.viewModel
            //   .print(template)
            //   .then((result) => {
            //     link.set({
            //       url: result && result.url,
            //       state: "ready"
            //     });
            //   })
            //   .catch(() => {
            //     link.set({
            //       state: "error"
            //     });
            //   })
            //   .then(() => this.scheduleRender());
        };
        Print.prototype._updateFromOption = function (e) {
            var target = e.target;
            var selectedOption = target.selectedOptions
                ? target.selectedOptions.item(0).value
                : target.options[target.selectedIndex].value;
            var targetProperty = target.getAttribute("data-target-property");
            this.templateOptions[targetProperty] = selectedOption;
        };
        Print.prototype._switchInput = function () {
            var _a;
            _a = [
                this.templateOptions.height,
                this.templateOptions.width
            ], this.templateOptions.width = _a[0], this.templateOptions.height = _a[1];
        };
        Print.prototype._showAdvancedOptions = function () {
            if (this._layoutTabSelected) {
                this._advancedOptionsVisibleForLayout = !this._advancedOptionsVisibleForLayout;
            }
            else {
                this._advancedOptionsVisibleForMapOnly = !this._advancedOptionsVisibleForMapOnly;
            }
        };
        Print.prototype._scrollExportIntoView = function () {
            if (this._pendingExportScroll) {
                this._pendingExportScroll = false;
                var _a = this, _rootNode = _a._rootNode, _b = _a._rootNode, clientHeight = _b.clientHeight, scrollHeight = _b.scrollHeight;
                var delta = scrollHeight - clientHeight;
                if (delta > 0) {
                    // scroll to bottom (export link area) only if root node owns scroller
                    _rootNode.scrollTop = delta;
                }
            }
        };
        Print.prototype._toggleInputValue = function (e) {
            var target = e.target;
            var propName = target.getAttribute("data-option-name");
            this.templateOptions[propName] = target.checked;
            if (propName === "scaleEnabled") {
                this.viewModel.scaleEnabled = this.templateOptions.scaleEnabled;
                if (!this.templateOptions[propName]) {
                    this._resetToCurrentScale();
                }
            }
        };
        Print.prototype._removeLink = function (e) {
            var target = e.target;
            var item = target["data-item"];
            if (item && item.state === "error") {
                this.exportedLinks.remove(item);
            }
        };
        Print.prototype._renderExportedLink = function (exportedLinksArray) {
            var _this = this;
            return exportedLinksArray.map(function (exportedLink) {
                var _a, _b, _c;
                var anchorClasses = (_a = {},
                    _a[CSS.anchorDisabled] = exportedLink.state === "pending" || exportedLink.state === "error",
                    _a);
                var iconClasses = (_b = {},
                    _b[CSS.iconSpinner] = exportedLink.state === "pending",
                    _b[CSS.rotate] = exportedLink.state === "pending",
                    _b[CSS.iconDownload] = exportedLink.state === "ready",
                    _b[CSS.iconError] = exportedLink.state === "error",
                    _b[CSS.exportedFileError] = exportedLink.state === "error",
                    _b);
                var linkTitleClasses = (_c = {},
                    _c[CSS.exportedFileError] = exportedLink.state === "error",
                    _c);
                var url = exportedLink.url === "" ? null : exportedLink.url;
                if (url) {
                    url = urlUtils.addProxy(url);
                }
                var itemDescriptiveStatus;
                if (exportedLink.state === "pending") {
                    itemDescriptiveStatus = i18n.pending;
                }
                else if (exportedLink.state === "ready") {
                    itemDescriptiveStatus = i18n.ready;
                }
                else {
                    itemDescriptiveStatus = i18n.error;
                }
                return (widget_1.tsx("div", { "aria-label": itemDescriptiveStatus, key: exportedLink.formattedName, class: CSS.exportedFile },
                    widget_1.tsx("a", { "aria-label": exportedLink.formattedName + ". " + i18n.linkReady, href: url, tabIndex: 0, target: "_blank", class: _this.classes(CSS.exportedFileLink, anchorClasses) },
                        widget_1.tsx("span", { "data-item": exportedLink, class: _this.classes(iconClasses) }),
                        widget_1.tsx("span", { "data-item": exportedLink, class: _this.classes(CSS.exportedFileLinkTitle, linkTitleClasses) }, exportedLink.formattedName))));
            });
        };
        Print.prototype._swapInputValue = function () {
            var previous = this._previousTitleOrFilename;
            this._previousTitleOrFilename = this.templateOptions.title;
            this.templateOptions.title = previous;
        };
        Print.prototype._toggleLayoutPanel = function (e) {
            this._swapInputValue();
            var target = e.target;
            this._layoutTabSelected = target.getAttribute("data-tab-id") === "layoutTab";
            if (!this._layoutTabSelected) {
                this.templateOptions.layout = "MAP_ONLY";
            }
            else {
                var layoutChoices = this.get("viewModel.templatesInfo.layout.choiceList");
                this.templateOptions.layout = layoutChoices && layoutChoices[0];
            }
        };
        __decorate([
            decorators_1.property({
                type: FileLinkCollection
            }),
            widget_1.renderable()
        ], Print.prototype, "exportedLinks", void 0);
        __decorate([
            decorators_1.property()
        ], Print.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], Print.prototype, "label", void 0);
        __decorate([
            widget_1.renderable(),
            decorators_1.property({
                type: TemplateOptions
            })
        ], Print.prototype, "templateOptions", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.error")
        ], Print.prototype, "error", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.printServiceUrl")
        ], Print.prototype, "printServiceUrl", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view"),
            widget_1.renderable()
        ], Print.prototype, "view", void 0);
        __decorate([
            decorators_1.property({
                type: PrintViewModel
            }),
            widget_1.renderable(["viewModel.templatesInfo", "viewModel.state"])
        ], Print.prototype, "viewModel", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], Print.prototype, "_toggleLayoutPanel", null);
        Print = __decorate([
            decorators_1.subclass("esri.widgets.Print")
        ], Print);
        return Print;
    }(decorators_1.declared(Widget)));
    return Print;
});
//# sourceMappingURL=Print.js.map