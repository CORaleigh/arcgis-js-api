/**
 * The CoordinateConversion widget provides a way to display user cursor position either as map coordinates or
 * as any of several popular coordinate notations.  Additionally, the widget provides a way to convert
 * user input coordinates into a {@link module:esri/geometry/Point}.
 *
 * [![coordinate-conversion](../../assets/img/apiref/widgets/coordinate-conversion.png)](../sample-code/widgets-coordinateconversion/index.html)
 *
 * Several common [formats](esri-widgets-CoordinateConversion-support-Format.html) are included by default:
 * * XY - Longitude, Latitude (WGS84)
 * * MGRS - [Military Grid Reference System](http://earth-info.nga.mil/GandG/publications/tm8358.1/tr83581b.html)
 * * UTM - [Universal Transverse Mercator](http://earth-info.nga.mil/GandG/coordsys/grids/utm.html)
 * * DD - Decimal Degrees
 * * DDM - Degrees Decimal Minutes
 * * DMS - Degrees Minutes Seconds
 * * Basemap - X, Y in the coordinate system used by the current {@link module:esri/Basemap} in the units used by the {@link module:esri/Basemap}.
 * Web Mercator is the standard for Esri-provided {@link module:esri/Map#basemap basemaps}.
 *
 * Additional [formats](esri-widgets-CoordinateConversion-support-Format.html) can be created by a developer and made available
 * through the widget.
 *
 * @module esri/widgets/CoordinateConversion
 * @since 4.7
 *
 * @see [CoordinateConversion.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/CoordinateConversion.tsx)
 * @see [CoordinateConversion.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_CoordinateConversion.scss)
 * @see [Sample - Coordinate widget](../sample-code/widgets-coordinateconversion/index.html)
 * @see [Sample - Add custom coordinate formats](../sample-code/widgets-coordinateconversion-custom/index.html)
 * @see module:esri/widgets/CoordinateConversion/CoordinateConversionViewModel
 * @see module:esri/geometry/coordinateFormatter
 *
 * @example
 * var ccWidget = new CoordinateConversion({
 *   view: view
 * });
 *
 * // Adds widget in the bottom left corner of the view
 * view.ui.add(ccWidget, "bottom-left");
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/nls/common", "dojo/i18n!esri/widgets/CoordinateConversion/nls/CoordinateConversion", "dojo/keys", "esri/core/global", "esri/core/Logger", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/CoordinateConversion/CoordinateConversionViewModel", "esri/widgets/CoordinateConversion/support/Conversion", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18nCommon, i18n, keys_1, global, Logger, decorators_1, Widget, CoordinateViewModel, Conversion, widget_1) {
    "use strict";
    i18nCommon = __importStar(i18nCommon);
    i18n = __importStar(i18n);
    var CSS = {
        base: "esri-coordinate-conversion esri-widget",
        captureMode: "esri-coordinate-conversion--capture-mode",
        noBasemap: "esri-coordinate-conversion--no-basemap",
        popup: "esri-coordinate-conversion__popup",
        conversionList: "esri-coordinate-conversion__conversion-list",
        conversionRow: "esri-coordinate-conversion__row",
        coordDisplay: "esri-coordinate-conversion__display",
        expanded: "esri-coordinate-conversion__conversions-view--expanded",
        expandDown: "esri-coordinate-conversion__conversions-view--expand-down",
        expandUp: "esri-coordinate-conversion__conversions-view--expand-up",
        conversionsView: "esri-coordinate-conversion__conversions-view",
        primarySelect: "esri-coordinate-conversion__select-primary",
        rowSelect: "esri-coordinate-conversion__select-row",
        toolDisplay: "esri-coordinate-conversion__tools",
        modeToggle: "esri-coordinate-conversion__mode-toggle",
        rowButton: "esri-coordinate-conversion__row-button",
        backButton: "esri-coordinate-conversion__back-button",
        convertButton: "esri-coordinate-conversion__button",
        coordinateInput: "esri-coordinate-conversion__input-coordinate",
        inputForm: "esri-coordinate-conversion__input-form",
        inputFormGroup: "esri-coordinate-conversion__input-group",
        rejectInput: "esri-coordinate-conversion__input-coordinate--rejected",
        sectionHeading: "esri-coordinate-conversion__heading",
        patternInput: "esri-coordinate-conversion__pattern-input",
        settings: "esri-coordinate__settings",
        settingsFormGroup: "esri-coordinate-conversion__settings-group",
        settingsFormGroupHorizontal: "esri-coordinate-conversion__settings-group-horizontal",
        previewCoordinate: "esri-coordinate-conversion__preview-coordinate",
        disabled: "esri-disabled",
        input: "esri-input",
        button: "esri-button",
        header: "esri-widget__heading",
        widgetButton: "esri-widget--button",
        leftArrow: "esri-icon-left-arrow",
        captureButton: "esri-icon-map-pin",
        collapseButton: "esri-icon-down",
        copyButton: "esri-icon-duplicate",
        editButton: "esri-icon-edit",
        esriSelect: "esri-select",
        expandButton: "esri-icon-up",
        goToButton: "esri-icon-locate",
        refresh: "esri-icon-refresh",
        removeConversion: "esri-icon-close",
        settingsButton: "esri-icon-settings2"
    };
    var logger = Logger.getLogger("esri.widgets.CoordinateConversion");
    var CoordinateConversion = /** @class */ (function (_super) {
        __extends(CoordinateConversion, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @extends module:esri/widgets/Widget
         * @mixes module:esri/widgets/support/GoTo
         * @constructor
         * @alias module:esri/widgets/CoordinateConversion
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                              that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * var ccWidget = new CoordinateConversion({
         *   view: view
         * });
         */
        function CoordinateConversion(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._popupMessage = null;
            _this._popupId = null;
            _this._coordinateInput = null;
            _this._badInput = false;
            _this._goToEnabled = false;
            _this._conversionFormat = null;
            _this._settingsFormat = null;
            _this._previewConversion = null;
            _this._expanded = false;
            _this._popupVisible = false;
            _this._settingsVisible = false;
            _this._inputVisible = false;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  conversions
            //----------------------------------
            /**
             * A {@link module:esri/core/Collection} containing every {@link module:esri/widgets/CoordinateConversion/support/Conversion}
             * that the widget is currently displaying.
             *
             * @name conversions
             * @instance
             * @type {module:esri/core/Collection<module:esri/widgets/CoordinateConversion/support/Conversion>}
             * @since 4.7
             */
            _this.conversions = null;
            //----------------------------------
            //  currentLocation
            //----------------------------------
            /**
             * Describes the location of the coordinates currently displayed by the widget as a {@link module:esri/geometry/Point}.
             * Setting this property will update all [conversions](#conversions).
             *
             * @name currentLocation
             * @instance
             * @type {module:esri/geometry/Point}
             * @since 4.7
             */
            _this.currentLocation = null;
            //----------------------------------
            //  formats
            //----------------------------------
            /**
             * A {@link module:esri/core/Collection} containing every {@link module:esri/widgets/CoordinateConversion/support/Format}
             * that the widget is capable of displaying.
             *
             * The default formats are `basemap`, `dd`, `ddm`, `dms`, `mgrs`, `usng`, `utm`, and `xy`.
             *
             * @name formats
             * @instance
             * @type {module:esri/core/Collection<module:esri/widgets/CoordinateConversion/support/Format>}
             */
            _this.formats = null;
            //----------------------------------
            //  goToOverride
            //----------------------------------
            _this.goToOverride = null;
            //----------------------------------
            //  mode
            //----------------------------------
            /**
             * Describes the current mode of the widget.
             *
             * **Possible Values:** live | capture
             *
             * * While in `live` mode, the widget will update as the cursor moves.
             * * While in `capture` mode, the widget will update on mouse click and display a graphic
             * marking the current location.
             *
             * @name mode
             * @instance
             * @type {string}
             * @default live
             * @since 4.7
             */
            _this.mode = null;
            //----------------------------------
            //  orientation
            //----------------------------------
            /**
             * Determines whether the widget should expand up or down.  If set to `auto`
             * the widget will be oriented based on its position in the view.
             *
             * **Possible Values:** auto | expand-up | expand-down
             *
             * @name orientation
             * @instance
             * @type {string}
             * @default auto
             * @since 4.7
             */
            _this.orientation = "auto";
            //----------------------------------
            //  requestDelay
            //----------------------------------
            /**
             * The number of milliseconds of delay before conversion requests will be sent
             * to the {@link module:esri/tasks/GeometryService}.  This only affects conversions that cannot be
             * performed in the browser.
             *
             * @name requestDelay
             * @instance
             * @type {number}
             * @since 4.7
             * @default 300
             */
            _this.requestDelay = null;
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
             * The view model for this widget. The view model contains the logic that controls the Coordinate Widget's behavior.  See the
             * {@link module:esri/widgets/CoordinateConversion/CoordinateConversionViewModel} class to access all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/CoordinateConversion/CoordinateConversionViewModel}
             */
            _this.viewModel = new CoordinateViewModel();
            return _this;
        }
        Object.defineProperty(CoordinateConversion.prototype, "multipleConversions", {
            get: function () {
                var stored = this._get("multipleConversions");
                return typeof stored === "boolean" ? stored : true;
            },
            //----------------------------------
            //  multipleConversions
            //----------------------------------
            /**
             * If this property is set to `true`, multiple conversions can be displayed.  For a simpler experience with only
             * one conversion at a time, this property can be set to `false`.
             *
             * @name multipleConversions
             * @instance
             * @default true
             * @type {boolean}
             * @since 4.7
             */
            set: function (value) {
                if (value === false) {
                    this._expanded = false;
                    this.conversions.splice(1, this.conversions.length - 1);
                }
                this._set("multipleConversions", value);
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
         * Attempt to convert a string into a {@link module:esri/geometry/Point}.  The format of the
         * string must be specified.  A {@link module:esri/core/Collection} of available formats can be
         * obtained from the [formats](#formats) property.
         *
         * @param {string} coordinate - The coordinate string.
         *
         * @param {module:esri/widgets/CoordinateConversion/support/Format} format - Specifies the format of the input coordinate.
         *
         * @return {Promise<module:esri/geometry/Point>} When resolved, returns a {@link module:esri/geometry/Point}.
         */
        CoordinateConversion.prototype.reverseConvert = function (coordinate, format) {
            return null;
        };
        CoordinateConversion.prototype.render = function () {
            var _a;
            var state = this.get("viewModel.state"), noBasemapAlert = state === "disabled" ? (widget_1.tsx("div", { key: "esri-coordinate__no-basemap" }, i18n.noBasemap)) : null, inputForm = !noBasemapAlert && this._inputVisible ? this._renderInputForm() : null, settings = !noBasemapAlert && this._settingsVisible ? this._renderSettings() : null, conversionsView = !noBasemapAlert && !inputForm && !settings ? this._renderConversionsView() : null, popup = this._popupVisible ? this._renderPopup() : null, widgetWrapperClasses = (_a = {},
                _a[CSS.captureMode] = this.mode === "capture",
                _a[CSS.disabled] = state === "loading",
                _a[CSS.noBasemap] = state === "disabled",
                _a);
            return (widget_1.tsx("div", { class: this.classes(CSS.base, widgetWrapperClasses) },
                popup,
                noBasemapAlert,
                conversionsView,
                settings,
                inputForm));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        CoordinateConversion.prototype._addConversion = function (event) {
            var select = event.target, formatToAdd = select.options[select.options.selectedIndex]["data-format"], insertIndex = select["data-index"], newConversion = new Conversion({
                format: formatToAdd
            });
            select.options.selectedIndex = 0;
            if (insertIndex >= 0) {
                this.conversions.removeAt(insertIndex);
            }
            this.conversions.add(newConversion, insertIndex);
        };
        CoordinateConversion.prototype._findSettingsFormat = function () {
            return (this._settingsFormat ||
                this.conversions.reduceRight(function (format, conversion, index) {
                    var currentFormat = conversion.format;
                    return currentFormat.get("hasDisplayProperties") ? currentFormat : format;
                }, null) ||
                this.formats.find(function (format) { return format.hasDisplayProperties; }));
        };
        CoordinateConversion.prototype._hidePopup = function () {
            if (this._popupId) {
                clearTimeout(this._popupId);
                this._popupId = null;
            }
            this._popupVisible = false;
            this._popupMessage = null;
            this.scheduleRender();
        };
        CoordinateConversion.prototype._onConvertComplete = function () {
            this._inputVisible = false;
            this._coordinateInput.value = "";
        };
        CoordinateConversion.prototype._onCopy = function (event) {
            var target = event.currentTarget;
            var coordinate = target["data-conversion"].displayCoordinate;
            // IE 11
            if ("clipboardData" in global) {
                global.clipboardData.setData("text", coordinate);
            }
            else {
                event.clipboardData.setData("text/plain", coordinate);
            }
            this._showPopup(i18n.copySuccessMessage);
            event.preventDefault();
        };
        CoordinateConversion.prototype._processUserInput = function (event) {
            var _this = this;
            var keyCode = event.keyCode, vm = this.viewModel;
            if (keyCode === keys_1.ENTER || !keyCode) {
                var format = this._coordinateInput["data-format"], userInput = this._coordinateInput.value;
                this._reverseConvert(userInput, format)
                    .then(function (point) {
                    _this.mode === "capture" ? vm.resume() : (_this.mode = "capture");
                    // trigger all conversions to be updated
                    _this.currentLocation = point;
                    vm.setLocation(point);
                    _this._onConvertComplete();
                })
                    .catch(function (error) {
                    logger.error(error);
                    _this._showPopup(i18n.invalidCoordinate);
                    _this._badInput = true;
                });
            }
            else {
                if (this._badInput) {
                    this._badInput = false;
                }
            }
        };
        CoordinateConversion.prototype._reverseConvert = function (userInput, format) {
            var _this = this;
            var vm = this.viewModel;
            return format.reverseConvert(userInput).then(function (result) {
                if (_this._goToEnabled) {
                    vm.goToLocation(result).catch(function (error) {
                        logger.warn(error);
                        _this._showPopup(i18n.locationOffBasemap);
                    });
                }
                return result;
            });
        };
        CoordinateConversion.prototype._setInputFormat = function (event) {
            var select = event.target, format = select[select.options.selectedIndex]["data-format"];
            this._conversionFormat = format;
        };
        CoordinateConversion.prototype._setPreviewConversion = function () {
            var format = this._findSettingsFormat(), vm = this.viewModel;
            if (format) {
                var existingConversion = this.conversions.find(function (conversion) { return conversion.format === format; });
                this._previewConversion = new Conversion({
                    format: format,
                    position: {
                        location: this.currentLocation,
                        coordinate: existingConversion && existingConversion.position.coordinate
                    }
                });
                if (!this._previewConversion.position.coordinate) {
                    vm.previewConversion(this._previewConversion);
                }
            }
        };
        CoordinateConversion.prototype._setSettingsFormat = function (event) {
            var select = event.target, format = select[select.options.selectedIndex]["data-format"];
            this._settingsFormat = format;
            this._setPreviewConversion();
        };
        CoordinateConversion.prototype._showPopup = function (message, duration) {
            var _this = this;
            if (duration === void 0) { duration = 2500; }
            this._popupMessage = message;
            this._popupVisible ? clearTimeout(this._popupId) : (this._popupVisible = true);
            this.scheduleRender();
            this._popupId = setTimeout(function () {
                _this._popupId = null;
                _this._hidePopup();
            }, duration);
        };
        CoordinateConversion.prototype._toggleGoTo = function () {
            this._goToEnabled = !this._goToEnabled;
        };
        CoordinateConversion.prototype._updateCurrentPattern = function (event) {
            event.stopPropagation();
            var input = event.target, format = this._findSettingsFormat();
            if (format) {
                format.currentPattern = input.value;
            }
        };
        CoordinateConversion.prototype._renderConversion = function (conversion, index) {
            var widgetId = this.id, rowId = widgetId + "__list-item-" + index, rowLabel = conversion.format.name + " " + i18n.conversionOutputSuffix, firstRow = index === 0, rowVisible = firstRow || this._expanded, tools = firstRow
                ? this._renderFirstConversion(conversion, rowId)
                : this._renderTools(index, conversion, rowId), displayedCoordinate = firstRow && !conversion.displayCoordinate ? i18n.noLocation : conversion.displayCoordinate, displayOutput = (widget_1.tsx("div", { "aria-label": displayedCoordinate, class: CSS.coordDisplay, "data-conversion": conversion, role: "listitem", tabindex: "0", title: displayedCoordinate }, displayedCoordinate));
            var coordinateOptions = this._renderOptions(this.formats.filter(function (format) { return format !== conversion.format; }));
            return rowVisible ? (widget_1.tsx("li", { "aria-label": rowLabel, class: CSS.conversionRow, id: rowId, key: conversion, role: "group", title: rowLabel, tabindex: "0" },
                widget_1.tsx("select", { "aria-controls": rowId, "aria-label": i18n.selectFormat, class: this.classes(CSS.esriSelect, CSS.rowSelect), bind: this, "data-index": index, onchange: this._addConversion, title: i18n.selectFormat },
                    widget_1.tsx("option", { "aria-label": conversion.format.name, selected: true, title: conversion.format.name }, conversion.format.name.toUpperCase()),
                    coordinateOptions),
                displayOutput,
                tools)) : null;
        };
        CoordinateConversion.prototype._renderCopyButton = function (conversion) {
            return (widget_1.tsx("li", { "aria-label": i18nCommon.copy, bind: this, class: this.classes(CSS.widgetButton, CSS.rowButton), "data-conversion": conversion, onclick: this._copyCoordinateOutput, onkeydown: this._copyCoordinateOutput, oncopy: this._onCopy, role: "button", tabindex: "0", title: i18nCommon.copy },
                widget_1.tsx("span", { "aria-hidden": "true", class: CSS.copyButton })));
        };
        CoordinateConversion.prototype._renderFirstConversion = function (conversion, rowId) {
            var _a;
            var widgetId = this.id;
            var expandButtonClasses = (_a = {},
                _a[CSS.expandButton] = !this._expanded,
                _a[CSS.collapseButton] = this._expanded,
                _a);
            var modeTitle = this.mode === "live" ? i18n.captureMode : i18n.liveMode, buttonTitle = !this._expanded ? i18nCommon.expand : i18nCommon.collapse, copyButton = conversion.displayCoordinate && this.mode === "capture"
                ? this._renderCopyButton(conversion)
                : null, modeButtonOrExpandButton = this.multipleConversions ? (widget_1.tsx("li", { "aria-controls": widgetId + "__" + CSS.conversionList, "aria-label": buttonTitle, bind: this, class: CSS.widgetButton, key: "esri-coordinate-conversion__expand-button", onclick: this._toggleExpand, onkeydown: this._toggleExpand, role: "button", tabindex: "0", title: buttonTitle },
                widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(expandButtonClasses) }))) : (widget_1.tsx("li", { "aria-label": modeTitle, bind: this, class: this.classes(CSS.widgetButton, CSS.modeToggle), key: "esri-coordinate-conversion__mode-toggle", onclick: this._toggleMode, onkeydown: this._toggleMode, role: "button", tabindex: "0", title: modeTitle },
                widget_1.tsx("span", { "aria-hidden": "true", class: CSS.captureButton })));
            return (widget_1.tsx("ul", { class: CSS.toolDisplay },
                copyButton,
                modeButtonOrExpandButton));
        };
        CoordinateConversion.prototype._renderInputForm = function () {
            var _a;
            var selectFormat = this._conversionFormat || this.conversions.getItemAt(0).format, selectIndex = this.formats.findIndex(function (format) { return format.name === selectFormat.name; }), widgetId = this.id, inputId = widgetId + "__" + CSS.coordinateInput, headerId = widgetId + "__" + CSS.coordinateInput + "__header";
            var options = this._renderOptions(this.formats, true, selectIndex);
            var inputClasses = (_a = {},
                _a[CSS.rejectInput] = this._badInput,
                _a);
            return (widget_1.tsx("div", { "aria-labelledby": headerId, class: CSS.inputForm, key: "esri-coordinate-conversion__input-form", role: "search" },
                widget_1.tsx("div", { class: CSS.sectionHeading },
                    widget_1.tsx("div", { "aria-label": i18nCommon.back, bind: this, class: this.classes(CSS.widgetButton, CSS.backButton), onclick: this._toggleInputVisibility, onkeydown: this._toggleInputVisibility, role: "button", tabindex: "0", title: i18nCommon.back },
                        widget_1.tsx("span", { "aria-hidden": "true", class: CSS.leftArrow })),
                    widget_1.tsx("h4", { class: CSS.header, id: headerId }, i18n.inputCoordTitle)),
                widget_1.tsx("div", { class: CSS.inputFormGroup },
                    widget_1.tsx("select", { "aria-controls": inputId, "aria-label": i18n.selectFormat, bind: this, class: this.classes(CSS.esriSelect, CSS.rowSelect), onchange: this._setInputFormat, title: i18n.selectFormat }, options),
                    widget_1.tsx("input", { afterCreate: widget_1.storeNode, "aria-labelledby": headerId, "aria-required": "true", bind: this, class: this.classes(CSS.coordinateInput, CSS.input, inputClasses), "data-format": selectFormat, "data-node-ref": "_coordinateInput", id: inputId, onkeydown: this._processUserInput, placeholder: i18n.inputCoordTitle, role: "textbox", spellcheck: false, title: i18n.inputCoordTitle, type: "text" })),
                widget_1.tsx("div", { class: CSS.inputFormGroup },
                    widget_1.tsx("label", { "aria-label": i18n.goTo },
                        widget_1.tsx("input", { bind: this, checked: this._goToEnabled, onclick: this._toggleGoTo, title: i18n.goTo, type: "checkbox" }),
                        i18n.goTo),
                    widget_1.tsx("button", { "aria-label": i18n.convert, bind: this, class: this.classes(CSS.convertButton, CSS.button), onclick: this._processUserInput, title: i18n.convert, type: "button" }, i18n.convert))));
        };
        CoordinateConversion.prototype._renderConversionsView = function () {
            var _this = this;
            var _a;
            var widgetId = this.id, listId = widgetId + "__" + CSS.conversionList, addRowTools = this._renderPrimaryTools(), coordinateOptions = this._renderOptions(this.formats), conversionListItems = this.conversions
                .map(function (conversion, index) { return _this._renderConversion(conversion, index); })
                .toArray();
            var mainTools = this._expanded ? (widget_1.tsx("div", { class: CSS.conversionRow },
                widget_1.tsx("select", { "aria-controls": listId, "aria-label": i18n.addConversion, bind: this, class: this.classes(CSS.esriSelect, CSS.primarySelect), onchange: this._addConversion, title: i18n.addConversion },
                    widget_1.tsx("option", { disabled: true, selected: true, value: "" }, i18n.addConversion),
                    coordinateOptions),
                addRowTools)) : null;
            var conversionsViewClasses = (_a = {},
                _a[CSS.expanded] = this._expanded,
                _a[CSS.expandUp] = this.orientation === "expand-up",
                _a[CSS.expandDown] = this.orientation === "expand-down",
                _a);
            return (widget_1.tsx("div", { class: this.classes(CSS.conversionsView, conversionsViewClasses), key: "esri-coordinate-conversion__main-view" },
                widget_1.tsx("ul", { "aria-expanded": this._expanded ? "true" : "false", class: CSS.conversionList, id: listId }, conversionListItems),
                mainTools));
        };
        CoordinateConversion.prototype._renderOptions = function (formats, skipDisabled, selectedIndex) {
            var _this = this;
            var firstConversion = this.conversions.getItemAt(0);
            return formats
                .map(function (format, index) {
                var disabled = skipDisabled || !firstConversion
                    ? false
                    : firstConversion.format.name === format.name ||
                        _this.conversions.map(function (conversion) { return conversion.format.name; }).includes(format.name);
                return (widget_1.tsx("option", { "aria-label": format.name, "data-format": format, disabled: disabled, key: format.name, selected: index === selectedIndex, value: format.name }, format.name.toUpperCase()));
            })
                .toArray();
        };
        CoordinateConversion.prototype._renderPopup = function () {
            return (widget_1.tsx("div", { class: CSS.popup, role: "alert" }, this._popupMessage));
        };
        CoordinateConversion.prototype._renderPrimaryTools = function () {
            var modeTitle = this.mode === "live" ? i18n.captureMode : i18n.liveMode;
            return (widget_1.tsx("ul", { class: CSS.toolDisplay },
                widget_1.tsx("li", { bind: this, class: CSS.widgetButton, onclick: this._toggleInputVisibility, onkeydown: this._toggleInputVisibility, role: "button", tabindex: "0", title: i18n.inputCoordTitle },
                    widget_1.tsx("span", { "aria-hidden": "true", class: CSS.editButton })),
                widget_1.tsx("li", { bind: this, class: this.classes(CSS.widgetButton, CSS.modeToggle), onclick: this._toggleMode, onkeydown: this._toggleMode, role: "button", tabindex: "0", title: modeTitle },
                    widget_1.tsx("span", { "aria-hidden": "true", class: CSS.captureButton })),
                widget_1.tsx("li", { bind: this, class: CSS.widgetButton, onclick: this._toggleSettingsVisibility, onkeydown: this._toggleSettingsVisibility, role: "button", tabindex: "0", title: i18n.settingsTitle },
                    widget_1.tsx("span", { "aria-hidden": "true", class: CSS.settingsButton }))));
        };
        CoordinateConversion.prototype._renderSettings = function () {
            var widgetId = this.id, patternId = widgetId + "__" + CSS.patternInput, headerId = widgetId + "__" + CSS.patternInput + "__header", previewId = widgetId + "__" + CSS.previewCoordinate, formats = this.formats.filter(function (format) { return format.hasDisplayProperties; }), format = this._findSettingsFormat(), selectIndex = formats.indexOf(format), options = this._renderOptions(formats, true, selectIndex);
            var displayPattern = format.get("currentPattern");
            return (widget_1.tsx("div", { "aria-labelledby": headerId, class: CSS.settings, key: "esri-coordinate-conversion__settings" },
                widget_1.tsx("div", { class: CSS.sectionHeading },
                    widget_1.tsx("div", { bind: this, class: this.classes(CSS.widgetButton, CSS.backButton), onclick: this._toggleSettingsVisibility, onkeydown: this._toggleSettingsVisibility, role: "button", tabindex: "0", title: i18nCommon.back },
                        widget_1.tsx("span", { "aria-hidden": "true", class: CSS.leftArrow })),
                    widget_1.tsx("h4", { class: CSS.header, id: headerId }, i18n.settingsTitle)),
                widget_1.tsx("div", { class: CSS.settingsFormGroup },
                    widget_1.tsx("label", { for: patternId }, i18n.changeCoordinateDisplay),
                    widget_1.tsx("select", { "aria-label": i18n.selectFormat, class: CSS.esriSelect, bind: this, onchange: this._setSettingsFormat, title: i18n.selectFormat }, options),
                    widget_1.tsx("div", { class: CSS.settingsFormGroupHorizontal },
                        widget_1.tsx("input", { "aria-controls": previewId, bind: this, class: this.classes(CSS.patternInput, CSS.input), id: patternId, oninput: this._updateCurrentPattern, spellcheck: false, title: i18n.changeCoordinateDisplay, type: "text", value: displayPattern }),
                        widget_1.tsx("div", { "aria-controls": patternId, bind: this, class: CSS.widgetButton, onclick: this._setDefaultPattern, onkeydown: this._setDefaultPattern, role: "button", tabindex: "0", title: i18n.defaultPattern },
                            widget_1.tsx("span", { "aria-hidden": "true", class: CSS.refresh })))),
                widget_1.tsx("div", { class: CSS.settingsFormGroup },
                    widget_1.tsx("label", null,
                        i18nCommon.preview,
                        widget_1.tsx("div", { class: CSS.previewCoordinate, id: previewId, tabindex: "0" }, this._previewConversion.displayCoordinate)))));
        };
        CoordinateConversion.prototype._renderTools = function (index, conversion, rowId) {
            var copyButton = conversion.displayCoordinate && this.mode === "capture"
                ? this._renderCopyButton(conversion)
                : null;
            return (widget_1.tsx("ul", { class: CSS.toolDisplay, role: "listitem" },
                copyButton,
                widget_1.tsx("li", { "aria-controls": rowId, "aria-label": i18n.removeConversion, bind: this, class: this.classes(CSS.widgetButton, CSS.rowButton), "data-index": index, key: rowId + "__" + CSS.widgetButton, onclick: this._removeConversion, onkeydown: this._removeConversion, tabindex: "0", role: "button", title: i18n.removeConversion },
                    widget_1.tsx("span", { "aria-hidden": "true", class: CSS.removeConversion }))));
        };
        CoordinateConversion.prototype._copyCoordinateOutput = function (event) {
            var target = event.target;
            if (!("createTextRange" in document.body)) {
                var selection = window.getSelection(), range = document.createRange();
                range.selectNodeContents(target);
                selection.removeAllRanges();
                selection.addRange(range);
            }
            document.execCommand("copy");
        };
        CoordinateConversion.prototype._removeConversion = function (event) {
            var target = event.target, index = target["data-index"];
            this.conversions.removeAt(index);
        };
        CoordinateConversion.prototype._setDefaultPattern = function (event) {
            event.stopPropagation();
            var format = this._findSettingsFormat();
            if (format) {
                format.currentPattern = format.get("defaultPattern");
            }
        };
        CoordinateConversion.prototype._toggleExpand = function () {
            this._expanded = !this._expanded;
        };
        CoordinateConversion.prototype._toggleInputVisibility = function (event) {
            this._inputVisible = !this._inputVisible;
            if (this._popupVisible) {
                this._hidePopup();
            }
            if (this._inputVisible) {
                this.viewModel.pause();
            }
            else {
                this.viewModel.resume();
            }
        };
        CoordinateConversion.prototype._toggleMode = function () {
            this.mode = this.mode === "live" ? "capture" : "live";
        };
        CoordinateConversion.prototype._toggleSettingsVisibility = function () {
            this._settingsVisible = !this._settingsVisible;
            if (this._popupVisible) {
                this._hidePopup();
            }
            if (this._settingsVisible) {
                this._setPreviewConversion();
                this.viewModel.pause();
            }
            else {
                this.viewModel.resume();
            }
        };
        __decorate([
            decorators_1.aliasOf("viewModel.conversions")
        ], CoordinateConversion.prototype, "conversions", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.currentLocation"),
            widget_1.renderable()
        ], CoordinateConversion.prototype, "currentLocation", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.formats"),
            widget_1.renderable()
        ], CoordinateConversion.prototype, "formats", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.goToOverride")
        ], CoordinateConversion.prototype, "goToOverride", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.mode"),
            widget_1.renderable()
        ], CoordinateConversion.prototype, "mode", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], CoordinateConversion.prototype, "orientation", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.requestDelay")
        ], CoordinateConversion.prototype, "requestDelay", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], CoordinateConversion.prototype, "multipleConversions", null);
        __decorate([
            decorators_1.aliasOf("viewModel.locationSymbol")
        ], CoordinateConversion.prototype, "locationSymbol", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view"),
            widget_1.renderable()
        ], CoordinateConversion.prototype, "view", void 0);
        __decorate([
            decorators_1.property({
                type: CoordinateViewModel
            }),
            widget_1.renderable(["viewModel.state", "viewModel.waitingForConversions"])
        ], CoordinateConversion.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.reverseConvert")
        ], CoordinateConversion.prototype, "reverseConvert", null);
        __decorate([
            widget_1.accessibleHandler()
        ], CoordinateConversion.prototype, "_copyCoordinateOutput", null);
        __decorate([
            widget_1.accessibleHandler()
        ], CoordinateConversion.prototype, "_removeConversion", null);
        __decorate([
            widget_1.accessibleHandler()
        ], CoordinateConversion.prototype, "_setDefaultPattern", null);
        __decorate([
            widget_1.accessibleHandler()
        ], CoordinateConversion.prototype, "_toggleExpand", null);
        __decorate([
            widget_1.accessibleHandler()
        ], CoordinateConversion.prototype, "_toggleInputVisibility", null);
        __decorate([
            widget_1.accessibleHandler()
        ], CoordinateConversion.prototype, "_toggleMode", null);
        __decorate([
            widget_1.accessibleHandler()
        ], CoordinateConversion.prototype, "_toggleSettingsVisibility", null);
        CoordinateConversion = __decorate([
            decorators_1.subclass("esri.widgets.CoordinateConversion")
        ], CoordinateConversion);
        return CoordinateConversion;
    }(decorators_1.declared(Widget)));
    return CoordinateConversion;
});
//# sourceMappingURL=CoordinateConversion.js.map