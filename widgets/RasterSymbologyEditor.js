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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dgrid/OnDemandGrid", "./ColorRampSelector", "dijit/TitlePane", "dijit/form/CheckBox", "dijit/form/FilteringSelect", "dijit/form/NumberSpinner", "dijit/form/NumberTextBox", "dojo/dom-construct", "dojo/i18n!esri/widgets/RasterSymbologyEditor/nls/RasterSymbologyEditor", "dojo/store/Memory", "esri/core/lang", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/RasterSymbologyEditor/RasterSymbologyEditorViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, OnDemandGrid, ColorRampSelector, TitlePane, CheckBox, FilteringSelect, NumberSpinner, NumberTextBox, domConstruct, i18n, Memory, lang, decorators_1, Widget, RasterSymbologyEditorViewModel, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var CSS = {
        base: "esri-raster-symbology-editor",
        filteringSelect: "esri-raster-symbology-editor__filtering-select",
        stretchColorSchemeRow: "esri-raster-symbology-editor__stretch-color-ramp-row",
        percentClipOptionsRow: "esri-raster-symbology-editor__percent-clip-row",
        stdDeviationOptionsRow: "esri-raster-symbology-editor__std-deviation-row",
        stretchOptionsBlock: "esri-raster-symbology-editor__stretch-options",
        stretchGammaBlock: "esri-raster-symbology-editor__stretch-gamma-row",
        stretchDraBlock: "esri-raster-symbology-editor__stretch-dra-row",
        displayHidden: "esri-raster-symbology-editor--hidden",
        displayBlock: "esri-raster-symbology-editor--block",
        table: "esri-raster-symbology-editor__table",
        thumbnailImage: "esri-raster-symbology-editor__thumbnail-image",
        bandCombinationPresetNaturalColorIcon: "esri-raster-symbology-editor__band-combination-icon--natural-color",
        bandCombinationPresetLanduseIcon: "esri-raster-symbology-editor__band-combination-icon--landuse",
        bandCombinationPresetLandWaterIcon: "esri-raster-symbology-editor__band-combination-icon--land-water",
        bandCombinationPresetVegetationIcon: "esri-raster-symbology-editor__band-combination-icon--vegetation",
        bandCombinationPresetShallowBathymetricIcon: "esri-raster-symbology-editor__band-combination-icon--bathymetric",
        bandCombinationPresetColorInfraredIcon: "esri-raster-symbology-editor__band-combination-icon--color-infrared",
        minMaxStretchTypeIcon: "esri-raster-symbology-editor__stretch-type-icon--min-max",
        noneStretchTypeIcon: "esri-raster-symbology-editor__stretch-type-icon--none",
        standardDeviationStretchTypeIcon: "esri-raster-symbology-editor__stretch-type-icon--standard-deviation",
        percentClipStretchTypeIcon: "esri-raster-symbology-editor__stretch-type-icon--percent-clip",
        rgbSymbologyTypeIcon: "esri-raster-symbology-editor__symbology-type-icon--rgb",
        stretchSymbologyTypeIcon: "esri-raster-symbology-editor__symbology-type-icon--stretch",
        uniqueValueSymbologyTypeIcon: "esri-raster-symbology-editor__symbology-type-icon--unique-value",
        discreteSymbologyTypeIcon: "esri-raster-symbology-editor__symbology-type-icon--discrete",
        menuItemTd: "esri-raster-symbology-editor__menu-item-td",
        dgridSymbolCell: "esri-raster-symbology-editor__dgrid-symbol-cell",
        menuItemText: "esri-raster-symbology-editor__menu-item-text",
        checkbox: "esri-raster-symbology-editor__checkbox"
    };
    var RasterSymbologyEditor = /** @class */ (function (_super) {
        __extends(RasterSymbologyEditor, _super);
        function RasterSymbologyEditor() {
            //--------------------------------------------------------------------------
            //
            //  Lifecycle
            //
            //--------------------------------------------------------------------------
            var _this = _super !== null && _super.apply(this, arguments) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  layer
            //----------------------------------
            _this.layer = null;
            _this.defaultParams = null;
            _this.viewModel = new RasterSymbologyEditorViewModel();
            _this.stretchType = 0;
            _this.symbologyType = "";
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._components = [];
            _this._symbologySelect = null;
            _this._supportsBandPresets = false;
            return _this;
        }
        RasterSymbologyEditor.prototype.postInitialize = function (params) {
            this.defaultParams = this.viewModel.getDefaultRenderParameters();
            this._createUIComponents();
        };
        RasterSymbologyEditor.prototype.destroy = function () {
            this._components.forEach(function (item) {
                if (item) {
                    item.destroy();
                    item = null;
                }
            });
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        RasterSymbologyEditor.prototype.render = function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            var _o = this, symbologyType = _o.symbologyType, stretchType = _o.stretchType;
            var _p = RasterSymbologyEditorViewModel.SymbologyTypes, stretch = _p.stretch, rgb = _p.rgb, uniqueValue = _p.uniqueValue, discrete = _p.discrete;
            var isStretchColorRampApplicable = this.viewModel.isStretchColorRampApplicable(stretchType), stretchTypePercentClipId = this.viewModel.getStretchFilterType(RasterSymbologyEditorViewModel.StretchTypeNames.percentClip), stretchTypeNoneId = this.viewModel.getStretchFilterType(RasterSymbologyEditorViewModel.StretchTypeNames.none), stretchTypeStandardDeviationsId = this.viewModel.getStretchFilterType(RasterSymbologyEditorViewModel.StretchTypeNames.standardDeviation);
            var symbologyTypeSegment = (widget_1.tsx("div", null,
                widget_1.tsx("div", { afterCreate: this._placeSymbologySelect, bind: this })));
            var stretchColorSchemeBlock = (widget_1.tsx("div", { class: this.classes((_a = {},
                    _a[CSS.displayBlock] = symbologyType === stretch,
                    _a[CSS.displayHidden] = symbologyType !== stretch,
                    _a)) },
                widget_1.tsx("div", { afterCreate: this._createColorSchemeTitlePane, bind: this },
                    widget_1.tsx("table", { class: CSS.table },
                        widget_1.tsx("tr", null,
                            widget_1.tsx("td", null,
                                widget_1.tsx("label", null, i18n.bandSelectionLabel)),
                            widget_1.tsx("td", null,
                                widget_1.tsx("div", { afterCreate: this._placeBandSelect, bind: this }))),
                        widget_1.tsx("tr", { class: this.classes((_b = {},
                                _b[CSS.stretchColorSchemeRow] = isStretchColorRampApplicable,
                                _b[CSS.displayHidden] = !isStretchColorRampApplicable,
                                _b)) },
                            widget_1.tsx("td", null,
                                widget_1.tsx("label", null, i18n.colorSchemeLabel)),
                            widget_1.tsx("td", null,
                                widget_1.tsx("div", { afterCreate: this._placeColorRampSelect, bind: this })))))));
            var backgroundBlock = (widget_1.tsx("div", { class: this.classes((_c = {},
                    _c[CSS.displayBlock] = symbologyType === stretch || symbologyType === rgb,
                    _c[CSS.displayHidden] = symbologyType !== stretch,
                    _c)) },
                widget_1.tsx("div", { afterCreate: this._createNoDataTitlePane, bind: this },
                    widget_1.tsx("table", { class: CSS.table },
                        widget_1.tsx("tr", null,
                            widget_1.tsx("td", null,
                                widget_1.tsx("label", null, i18n.noDataLabel)),
                            widget_1.tsx("td", null,
                                widget_1.tsx("div", { afterCreate: this._placeNoDataInput, bind: this })))))));
            var stretchTypeSelect = widget_1.tsx("div", { afterCreate: this._placeStretchTypeSelect, bind: this });
            var percentClipStretchOptions = (widget_1.tsx("tr", { class: this.classes((_d = {},
                    _d[CSS.percentClipOptionsRow] = stretchType === stretchTypePercentClipId,
                    _d[CSS.displayHidden] = stretchType !== stretchTypePercentClipId,
                    _d)) },
                widget_1.tsx("td", null,
                    widget_1.tsx("label", null, i18n.minLabel)),
                widget_1.tsx("td", null,
                    widget_1.tsx("div", { afterCreate: this._placeMinPercentInput, bind: this })),
                widget_1.tsx("td", null,
                    widget_1.tsx("label", null, i18n.maxLabel)),
                widget_1.tsx("td", null,
                    widget_1.tsx("div", { afterCreate: this._placeMaxPercentInput, bind: this }))));
            var stdDeviationsOptions = (widget_1.tsx("tr", { class: this.classes((_e = {},
                    _e[CSS.stdDeviationOptionsRow] = stretchType === stretchTypeStandardDeviationsId,
                    _e[CSS.displayHidden] = stretchType !== stretchTypeStandardDeviationsId,
                    _e)) },
                widget_1.tsx("td", { colSpan: 2 },
                    widget_1.tsx("label", null, i18n.nStdDeviationsLabel)),
                widget_1.tsx("td", { colSpan: 2 },
                    widget_1.tsx("div", { afterCreate: this._placeStandardDeviationsInput, bind: this }))));
            var stretchOptionsBlock = (widget_1.tsx("div", { class: this.classes((_f = {},
                    _f[CSS.displayBlock] = symbologyType === stretch || symbologyType === rgb,
                    _f[CSS.displayHidden] = symbologyType !== stretch,
                    _f)) },
                widget_1.tsx("div", { afterCreate: this._createStretchTitlePane, bind: this },
                    widget_1.tsx("table", { class: CSS.table },
                        widget_1.tsx("tr", { class: CSS.stretchOptionsBlock },
                            widget_1.tsx("td", { colSpan: 2 },
                                widget_1.tsx("label", null, i18n.stretchTypeLabel)),
                            widget_1.tsx("td", { colSpan: 2 }, stretchTypeSelect)),
                        percentClipStretchOptions,
                        stdDeviationsOptions,
                        widget_1.tsx("tr", { class: this.classes((_g = {},
                                _g[CSS.stretchGammaBlock] = stretchType !== stretchTypeNoneId,
                                _g[CSS.displayHidden] = stretchType === stretchTypeNoneId,
                                _g)) },
                            widget_1.tsx("td", { colSpan: 2 },
                                widget_1.tsx("label", null, i18n.gammaLabel)),
                            widget_1.tsx("td", { colSpan: 2 },
                                widget_1.tsx("div", { afterCreate: this._placeGammaInput, bind: this }))),
                        widget_1.tsx("tr", { class: this.classes((_h = {},
                                _h[CSS.stretchDraBlock] = stretchType !== stretchTypeNoneId,
                                _h[CSS.displayHidden] = stretchType === stretchTypeNoneId,
                                _h)) },
                            widget_1.tsx("td", { colSpan: 4 },
                                widget_1.tsx("div", { class: CSS.checkbox, afterCreate: this._placeStretchStatisticsCheckbox, bind: this }),
                                widget_1.tsx("label", null, i18n.draStatisticsTitle)))))));
            var bandCombinationBlock = (widget_1.tsx("div", { class: this.classes((_j = {},
                    _j[CSS.displayBlock] = symbologyType === rgb,
                    _j[CSS.displayHidden] = symbologyType !== rgb,
                    _j)) },
                widget_1.tsx("div", { afterCreate: this._createBandCombinationTitlePane, bind: this },
                    widget_1.tsx("table", { class: CSS.table },
                        widget_1.tsx("tr", { class: this.classes((_k = {},
                                _k[CSS.stdDeviationOptionsRow] = this._supportsBandPresets,
                                _k[CSS.displayHidden] = !this._supportsBandPresets,
                                _k)) },
                            widget_1.tsx("td", null,
                                widget_1.tsx("label", null, i18n.bandCombinationPresetLabel)),
                            widget_1.tsx("td", null,
                                widget_1.tsx("div", { afterCreate: this._placeBandCombinationPresetSelect, bind: this }))),
                        widget_1.tsx("tr", null,
                            widget_1.tsx("td", null,
                                widget_1.tsx("label", null, i18n.redBandTitle)),
                            widget_1.tsx("td", null,
                                widget_1.tsx("div", { afterCreate: this._placeRedBandSelect, bind: this }))),
                        widget_1.tsx("tr", null,
                            widget_1.tsx("td", null,
                                widget_1.tsx("label", null, i18n.greenBandTitle)),
                            widget_1.tsx("td", null,
                                widget_1.tsx("div", { afterCreate: this._placeGreenBandSelect, bind: this }))),
                        widget_1.tsx("tr", null,
                            widget_1.tsx("td", null,
                                widget_1.tsx("label", null, i18n.blueBandTitle)),
                            widget_1.tsx("td", null,
                                widget_1.tsx("div", { afterCreate: this._placeBlueBandSelect, bind: this })))))));
            var uniqueValueBlock = (widget_1.tsx("div", { class: this.classes((_l = {},
                    _l[CSS.displayBlock] = symbologyType === uniqueValue,
                    _l[CSS.displayHidden] = symbologyType !== uniqueValue,
                    _l)) },
                widget_1.tsx("table", { class: CSS.table },
                    widget_1.tsx("tr", null,
                        widget_1.tsx("td", null,
                            widget_1.tsx("label", null, i18n.valueFieldTitle)),
                        widget_1.tsx("td", null,
                            widget_1.tsx("div", { afterCreate: this._placeUniqueValueFieldSelect, bind: this }))),
                    widget_1.tsx("tr", null,
                        widget_1.tsx("td", null,
                            widget_1.tsx("label", null, i18n.colorSchemeLabel)),
                        widget_1.tsx("td", null,
                            widget_1.tsx("div", { afterCreate: this._placeUniqueValueColorSchemeSelect, bind: this }))),
                    widget_1.tsx("tr", null,
                        widget_1.tsx("td", null,
                            widget_1.tsx("label", null, i18n.noDataLabel)),
                        widget_1.tsx("td", null,
                            widget_1.tsx("div", { afterCreate: this._placeUniqueValueNoDataInput, bind: this })))),
                widget_1.tsx("div", { afterCreate: this._placeUniqueValuesGrid, bind: this })));
            var discreteBlock = (widget_1.tsx("div", { class: this.classes((_m = {},
                    _m[CSS.displayBlock] = symbologyType === discrete,
                    _m[CSS.displayHidden] = symbologyType !== discrete,
                    _m)) },
                widget_1.tsx("table", { class: CSS.table },
                    widget_1.tsx("tr", null,
                        widget_1.tsx("td", null,
                            widget_1.tsx("label", null, i18n.colorSchemeLabel)),
                        widget_1.tsx("td", null,
                            widget_1.tsx("div", { afterCreate: this._placeDiscreteColorSchemeSelect, bind: this }))),
                    widget_1.tsx("tr", null,
                        widget_1.tsx("td", null,
                            widget_1.tsx("label", null, i18n.numberOfColors)),
                        widget_1.tsx("td", null,
                            widget_1.tsx("div", { afterCreate: this._placeDiscreteNColorsInput, bind: this }))),
                    widget_1.tsx("tr", null,
                        widget_1.tsx("td", null,
                            widget_1.tsx("label", null, i18n.noDataLabel)),
                        widget_1.tsx("td", null,
                            widget_1.tsx("div", { afterCreate: this._placeDiscreteNoDataInput, bind: this }))))));
            return (widget_1.tsx("div", null,
                symbologyTypeSegment,
                stretchColorSchemeBlock,
                bandCombinationBlock,
                backgroundBlock,
                stretchOptionsBlock,
                uniqueValueBlock,
                discreteBlock));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        RasterSymbologyEditor.prototype._createUIComponents = function () {
            this._createSymbologySelect();
            this._createStretchStatisticsCheckbox();
            this._createBandSelect();
            this._createStretchTypeSelect();
            this._createColorRampSelect();
            this._createBandCombinationPresetSelect();
            this._createRedBandSelect();
            this._createGreenBandSelect();
            this._createBlueBandSelect();
            this._createNoDataInput();
            this._createMinPercentInput();
            this._createMaxPercentInput();
            this._createStandardDeviationsInput();
            this._createGammaInput();
            this._createUniqueValueFieldSelect();
            this._createUniqueValueColorSchemeSelect();
            this._createUniqueValueNoDataInput();
            this._createUniqueValuesGrid();
            this._createDiscreteColorSchemeSelect();
            this._createDiscreteNoDataInput();
            this._createDiscreteNColorsInput();
        };
        RasterSymbologyEditor.prototype._createSymbologySelect = function () {
            var _this = this;
            this._symbologySelect = new FilteringSelect({
                store: this._getSymbologyStore(),
                class: CSS.filteringSelect,
                labelAttr: "label",
                labelType: "html",
                onChange: function (newValue) { return _this._updateSymbologyType(newValue); },
                value: this.defaultParams.symbologyType
            });
            this._symbologySelect.startup();
            this._components.push(this._symbologySelect);
        };
        RasterSymbologyEditor.prototype._createStretchStatisticsCheckbox = function () {
            var _this = this;
            this._stretchStatisticsCheckBox = new CheckBox({
                onChange: function () { return _this._updateSymbology(); }
            });
            this._stretchStatisticsCheckBox.startup();
            this._components.push(this._stretchStatisticsCheckBox);
        };
        RasterSymbologyEditor.prototype._createColorSchemeTitlePane = function (node) {
            this._colorSchemeTitlePane = new TitlePane({
                title: i18n.colorRampTitle
            }, node);
            this._colorSchemeTitlePane.startup();
            this._components.push(this._colorSchemeTitlePane);
        };
        RasterSymbologyEditor.prototype._createNoDataTitlePane = function (node) {
            this._noDataTitlePane = new TitlePane({
                title: i18n.backgroundTitle
            }, node);
            this._noDataTitlePane.startup();
            this._components.push(this._noDataTitlePane);
        };
        RasterSymbologyEditor.prototype._createStretchTitlePane = function (node) {
            this._stretchTitlePane = new TitlePane({
                title: i18n.stretchTitle
            }, node);
            this._stretchTitlePane.startup();
            this._components.push(this._stretchTitlePane);
        };
        RasterSymbologyEditor.prototype._createBandCombinationTitlePane = function (node) {
            this._bandCombinationTitlePane = new TitlePane({
                title: i18n.bandCombinationTitle
            }, node);
            this._bandCombinationTitlePane.startup();
            this._components.push(this._bandCombinationTitlePane);
        };
        RasterSymbologyEditor.prototype._createBandSelect = function () {
            var _this = this;
            this._bandSelect = new FilteringSelect({
                class: CSS.filteringSelect,
                onChange: function () { return _this._updateSymbology(); }
            });
            this._bandSelect.startup();
            this._populateBandSelect();
            this._components.push(this._bandSelect);
        };
        RasterSymbologyEditor.prototype._createStretchTypeSelect = function () {
            var _this = this;
            this._stretchTypeSelect = new FilteringSelect({
                class: CSS.filteringSelect,
                onChange: function (newStretchType) { return _this._onStretchTypeChange(newStretchType); },
                labelAttr: "label",
                labelType: "html"
            });
            this._stretchTypeSelect.startup();
            this._populateStretchTypeSelect();
            this._components.push(this._stretchTypeSelect);
        };
        RasterSymbologyEditor.prototype._createColorRampSelect = function () {
            var _this = this;
            this._stretchColorRampSelect = new ColorRampSelector({
                class: CSS.filteringSelect,
                maxHeight: 300
            });
            this._stretchColorRampSelect.on("change", function () { return _this._updateSymbology(); });
            this._stretchColorRampSelect.startup();
            this._stretchColorRampSelect.set("value", this.defaultParams.colorRamp);
            this._components.push(this._stretchColorRampSelect);
        };
        RasterSymbologyEditor.prototype._createBandCombinationPresetSelect = function () {
            var _this = this;
            this._bandCombinationPresetSelect = new FilteringSelect({
                class: CSS.filteringSelect,
                onChange: function (newBandCombinationId) { return _this._updateBandCombination(newBandCombinationId); },
                labelType: "html",
                labelAttr: "label",
                maxHeight: 350
            });
            this._bandCombinationPresetSelect.startup();
            this._components.push(this._bandCombinationPresetSelect);
        };
        RasterSymbologyEditor.prototype._createRedBandSelect = function () {
            var _this = this;
            this._redBandSelect = new FilteringSelect({
                class: CSS.filteringSelect,
                onChange: function () { return _this._bandCombinationChanged(); }
            });
            this._redBandSelect.startup();
            this._populateBandLists();
            this._components.push(this._redBandSelect);
        };
        RasterSymbologyEditor.prototype._createGreenBandSelect = function () {
            var _this = this;
            this._greenBandSelect = new FilteringSelect({
                class: CSS.filteringSelect,
                onChange: function () { return _this._bandCombinationChanged(); }
            });
            this._greenBandSelect.startup();
            this._populateBandLists();
            this._components.push(this._greenBandSelect);
        };
        RasterSymbologyEditor.prototype._createBlueBandSelect = function () {
            var _this = this;
            this._blueBandSelect = new FilteringSelect({
                class: CSS.filteringSelect,
                onChange: function () { return _this._bandCombinationChanged(); }
            });
            this._blueBandSelect.startup();
            this._populateBandLists();
            this._components.push(this._blueBandSelect);
        };
        RasterSymbologyEditor.prototype._createNoDataInput = function () {
            var _this = this;
            this._noDataInput = new NumberTextBox({
                class: CSS.filteringSelect,
                onChange: function () { return _this._updateSymbology(); }
            });
            this._noDataInput.startup();
            this._components.push(this._noDataInput);
        };
        RasterSymbologyEditor.prototype._createMinPercentInput = function () {
            var _this = this;
            this._minPercentInput = new NumberTextBox({
                class: CSS.filteringSelect,
                onChange: function () { return _this._updateSymbology(); },
                value: this.defaultParams.minPercent
            });
            this._minPercentInput.startup();
            this._components.push(this._minPercentInput);
        };
        RasterSymbologyEditor.prototype._createMaxPercentInput = function () {
            var _this = this;
            this._maxPercentInput = new NumberTextBox({
                class: CSS.filteringSelect,
                onChange: function () { return _this._updateSymbology(); },
                value: this.defaultParams.maxPercent
            });
            this._maxPercentInput.startup();
            this._components.push(this._maxPercentInput);
        };
        RasterSymbologyEditor.prototype._createStandardDeviationsInput = function () {
            var _this = this;
            this._standardDeviationsInput = new NumberTextBox({
                class: CSS.filteringSelect,
                onChange: function () { return _this._updateSymbology(); },
                value: this.defaultParams.numberOfStandardDeviations
            });
            this._standardDeviationsInput.startup();
            this._components.push(this._standardDeviationsInput);
        };
        RasterSymbologyEditor.prototype._createGammaInput = function () {
            var _this = this;
            this._gammaInput = new NumberSpinner({
                class: CSS.filteringSelect,
                onChange: function () { return _this._updateSymbology(); },
                value: this.defaultParams.gamma,
                smallDelta: 0.1
            });
            this._gammaInput.startup();
            this._components.push(this._gammaInput);
        };
        RasterSymbologyEditor.prototype._createUniqueValueFieldSelect = function () {
            var _this = this;
            this._uniqueValueFieldSelect = new FilteringSelect({
                class: CSS.filteringSelect,
                onChange: function () { return _this._updateUniqueValueGrid(); }
            });
            this._populateUniqueValueFieldSelect();
            this._components.push(this._uniqueValueFieldSelect);
        };
        RasterSymbologyEditor.prototype._createUniqueValueColorSchemeSelect = function () {
            var _this = this;
            this._uniqueValueColorSchemeSelect = new ColorRampSelector({
                class: CSS.filteringSelect,
                maxHeight: 300
            });
            this._uniqueValueColorSchemeSelect.on("change", function () { return _this._updateUniqueValueGrid(); });
            this._uniqueValueColorSchemeSelect.startup();
            if (this.defaultParams.uniqueValuesColorRamp) {
                this.defaultParams.uniqueValuesColorRamp.name = i18n.uniqueValuesColorRampTitle;
                this._uniqueValueColorSchemeSelect.addColorRamp(this.defaultParams.uniqueValuesColorRamp, true);
            }
            this._components.push(this._uniqueValueColorSchemeSelect);
        };
        RasterSymbologyEditor.prototype._createUniqueValueNoDataInput = function () {
            var _this = this;
            this._uniqueValueNoDataInput = new NumberTextBox({
                class: CSS.filteringSelect,
                onChange: function () { return _this._updateSymbology(); }
            });
            this._components.push(this._uniqueValueNoDataInput);
            this._uniqueValueNoDataInput.startup();
        };
        RasterSymbologyEditor.prototype._createDiscreteColorSchemeSelect = function () {
            var _this = this;
            this._discreteColorSchemeSelect = new ColorRampSelector({
                class: CSS.filteringSelect,
                maxHeight: 300
            });
            this._discreteColorSchemeSelect.on("change", function () {
                _this._updateSymbology();
            });
            this._discreteColorSchemeSelect.startup();
            this._discreteColorSchemeSelect.set("value", this.defaultParams.colorRamp);
            this._components.push(this._discreteColorSchemeSelect);
        };
        RasterSymbologyEditor.prototype._createDiscreteNoDataInput = function () {
            var _this = this;
            this._discreteNoDataInput = new NumberTextBox({
                class: CSS.filteringSelect,
                onChange: function () { return _this._updateSymbology(); }
            });
            this._discreteNoDataInput.startup();
            this._components.push(this._discreteNoDataInput);
        };
        RasterSymbologyEditor.prototype._createDiscreteNColorsInput = function () {
            var _this = this;
            this._discreteNColorsInput = new NumberTextBox({
                class: CSS.filteringSelect,
                onChange: function () { return _this._updateSymbology(); },
                value: this.defaultParams.discreteNColors
            });
            this._discreteNColorsInput.startup();
            this._components.push(this._discreteNColorsInput);
        };
        RasterSymbologyEditor.prototype._createUniqueValuesGrid = function () {
            this._uniqueValuesGrid = new OnDemandGrid({
                columns: [
                    {
                        field: "esriRasterSymbologyEditorUniqueValueSymbol",
                        renderCell: function (object, value, node) {
                            node.innerHTML = "<div class = " + CSS.dgridSymbolCell + "\n          style = \"background: rgb( " + object.esriRasterSymbologyEditorUniqueValueSymbol.r + ",\n          " + object.esriRasterSymbologyEditorUniqueValueSymbol.g + ",\n          " + object.esriRasterSymbologyEditorUniqueValueSymbol.b + "\");></div>";
                        },
                        label: i18n.symbolLabel
                    },
                    {
                        field: "esriRasterSymbologyEditorUniqueValueValue",
                        label: i18n.valueLabel
                    }
                ]
            });
            this._uniqueValuesGrid.startup();
            this._components.push(this._uniqueValuesGrid);
        };
        RasterSymbologyEditor.prototype._placeSymbologySelect = function (node) {
            if (this._symbologySelect) {
                domConstruct.place(this._symbologySelect.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeStretchStatisticsCheckbox = function (node) {
            if (this._stretchStatisticsCheckBox) {
                domConstruct.place(this._stretchStatisticsCheckBox.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeBandSelect = function (node) {
            if (this._bandSelect) {
                domConstruct.place(this._bandSelect.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeStretchTypeSelect = function (node) {
            if (this._stretchTypeSelect) {
                domConstruct.place(this._stretchTypeSelect.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeColorRampSelect = function (node) {
            if (this._stretchColorRampSelect) {
                domConstruct.place(this._stretchColorRampSelect.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeBandCombinationPresetSelect = function (node) {
            if (this._bandCombinationPresetSelect) {
                domConstruct.place(this._bandCombinationPresetSelect.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeRedBandSelect = function (node) {
            if (this._redBandSelect) {
                domConstruct.place(this._redBandSelect.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeGreenBandSelect = function (node) {
            if (this._colorSchemeTitlePane) {
                domConstruct.place(this._greenBandSelect.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeBlueBandSelect = function (node) {
            if (this._blueBandSelect) {
                domConstruct.place(this._blueBandSelect.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeNoDataInput = function (node) {
            if (this._noDataInput) {
                domConstruct.place(this._noDataInput.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeMinPercentInput = function (node) {
            if (this._minPercentInput) {
                domConstruct.place(this._minPercentInput.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeMaxPercentInput = function (node) {
            if (this._maxPercentInput) {
                domConstruct.place(this._maxPercentInput.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeStandardDeviationsInput = function (node) {
            if (this._standardDeviationsInput) {
                domConstruct.place(this._standardDeviationsInput.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeGammaInput = function (node) {
            if (this._gammaInput) {
                domConstruct.place(this._gammaInput.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeUniqueValueFieldSelect = function (node) {
            if (this._uniqueValueFieldSelect) {
                domConstruct.place(this._uniqueValueFieldSelect.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeUniqueValueColorSchemeSelect = function (node) {
            if (this._uniqueValueColorSchemeSelect) {
                domConstruct.place(this._uniqueValueColorSchemeSelect.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeUniqueValueNoDataInput = function (node) {
            if (this._uniqueValueNoDataInput) {
                domConstruct.place(this._uniqueValueNoDataInput.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeUniqueValuesGrid = function (node) {
            if (this._uniqueValuesGrid) {
                domConstruct.place(this._uniqueValuesGrid.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeDiscreteColorSchemeSelect = function (node) {
            if (this._discreteColorSchemeSelect) {
                domConstruct.place(this._discreteColorSchemeSelect.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeDiscreteNoDataInput = function (node) {
            if (this._discreteNoDataInput) {
                domConstruct.place(this._discreteNoDataInput.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._placeDiscreteNColorsInput = function (node) {
            if (this._discreteNColorsInput) {
                domConstruct.place(this._discreteNColorsInput.domNode, node);
            }
        };
        RasterSymbologyEditor.prototype._bandCombinationChanged = function () {
            if (this._redBandSelect &&
                this._redBandSelect.validate() &&
                this._greenBandSelect &&
                this._greenBandSelect.validate() &&
                this._blueBandSelect &&
                this._blueBandSelect.validate()) {
                this._updateSymbology();
            }
        };
        RasterSymbologyEditor.prototype._updateBandCombination = function (bandCombinationId) {
            if (bandCombinationId === "custom") {
                this._redBandSelect.set("disabled", false);
                this._greenBandSelect.set("disabled", false);
                this._blueBandSelect.set("disabled", false);
                return;
            }
            var presets = this._bandCombinationPresetSelect.store.data;
            var bandCombination;
            presets.some(function (preset) {
                if (bandCombinationId === preset.id) {
                    bandCombination = preset.combination;
                }
            });
            if (bandCombination) {
                this._redBandSelect.set({
                    value: bandCombination[0] - 1,
                    disabled: true
                });
                this._greenBandSelect.set({
                    value: bandCombination[1] - 1,
                    disabled: true
                });
                this._blueBandSelect.set({
                    value: bandCombination[2] - 1,
                    disabled: true
                });
                this._updateSymbology();
            }
        };
        RasterSymbologyEditor.prototype._updateSymbologyType = function (value) {
            this.symbologyType = value;
            this._updateSymbology();
        };
        RasterSymbologyEditor.prototype._updateUniqueValueGrid = function () {
            var symbolData = this.viewModel.getUniqueValueGridData(this._uniqueValueColorSchemeSelect.colorRamp, this._uniqueValueFieldSelect.value);
            if (!symbolData) {
                return;
            }
            this._uniqueValuesGrid.refresh();
            this._uniqueValuesGrid.renderArray(symbolData);
            this._uniqueValuesSymbolData = symbolData;
            this._updateSymbology();
        };
        RasterSymbologyEditor.prototype._populateUniqueValueFieldSelect = function () {
            var uniqueValueFields = this.viewModel.getUniqueValueFields(), fieldsStore = new Memory({
                data: uniqueValueFields,
                idProperty: "name"
            });
            this._uniqueValueFieldSelect.set({
                store: fieldsStore,
                labelAttr: "alias",
                value: this.defaultParams.uniqueValuesField
            });
        };
        RasterSymbologyEditor.prototype._populateStretchTypeSelect = function () {
            var stretchTypeDescription, stretchTypeTitle, imgClass;
            var stretchTypes = lang.clone(this.viewModel.stretchTypes);
            stretchTypes.forEach(function (stretchType) {
                stretchTypeDescription =
                    i18n[stretchType.name + "StretchTypeDescription"] ||
                        i18n[stretchType.name + "TypeDescription"];
                imgClass = CSS[stretchType.name + "StretchTypeIcon"];
                stretchTypeTitle = i18n[stretchType.name + "StretchTitle"];
                stretchType.id = stretchType.filterType.toString();
                stretchType.label = "<html><body><section>\n        <h4>" + stretchTypeTitle + "</h4>\n        <table><tr>\n          <td class=" + CSS.menuItemTd + ">\n            <img class=\"" + imgClass + " " + CSS.thumbnailImage + "\" />\n          </td>\n          <td class=" + CSS.menuItemTd + ">\n            <p class=" + CSS.menuItemText + "><i>" + stretchTypeDescription + "</i></p>\n          </td>\n          </tr></table>\n        </section></body></html>";
                stretchType.name = stretchTypeTitle;
            });
            this._stretchTypeSelect.set({
                store: new Memory({ data: stretchTypes }),
                value: this.defaultParams.stretchType.toString(),
                labelAttr: "label",
                labelType: "html"
            });
        };
        RasterSymbologyEditor.prototype._populateBandSelect = function () {
            var _this = this;
            var store;
            this.viewModel.getBandData().then(function (bandData) {
                store = new Memory({
                    data: bandData.lists[0],
                    idProperty: "index"
                });
                _this._bandSelect.set("store", store);
                if (bandData.lists[0].length === 1) {
                    _this._bandSelect.set({
                        value: bandData.lists[0][0].index,
                        disabled: true
                    });
                }
            });
        };
        RasterSymbologyEditor.prototype._populateBandLists = function () {
            var _this = this;
            if (!(this._redBandSelect &&
                this._greenBandSelect &&
                this._blueBandSelect &&
                this._bandCombinationPresetSelect)) {
                return;
            }
            var bandSelects = [this._redBandSelect, this._greenBandSelect, this._blueBandSelect], presets = [];
            var key, selectedIdx, store, presetStore, bandCombinationTitle, bandCombinationDescription, imgClass;
            this.viewModel.getBandData().then(function (bandData) {
                bandData.lists.forEach(function (list, idx) {
                    list.some(function (listItem) {
                        if (listItem.selected) {
                            selectedIdx = listItem.index;
                            return true;
                        }
                    });
                    store = new Memory({
                        data: list,
                        idProperty: "index"
                    });
                    bandSelects[idx].set({
                        store: store,
                        value: selectedIdx
                    });
                });
                if (bandData.presets && bandData.presets.length) {
                    _this._supportsBandPresets = true;
                    bandData.presets.forEach(function (preset, idx) {
                        key = Object.keys(preset)[0];
                        bandCombinationTitle = i18n["bandComboName" + key];
                        bandCombinationDescription = i18n["bandComboDesc" + key];
                        imgClass = CSS["bandCombinationPreset" + key + "Icon"];
                        presets.push({
                            name: i18n["bandComboName" + key],
                            label: "<html><body><section>\n              <h4>" + bandCombinationTitle + "</h4>\n              <table><tr>\n                <td class=" + CSS.menuItemTd + ">\n                  <img class= \"" + imgClass + " " + CSS.thumbnailImage + "\" />\n                </td>\n                <td class=" + CSS.menuItemTd + ">\n                  <p class=" + CSS.menuItemText + "><i>" + bandCombinationDescription + "</i></p>\n                </td>\n              </tr></table>\n            </section></body></html>",
                            combination: preset[key],
                            id: key
                        });
                    });
                    presets.push({
                        name: i18n["bandComboNameCustom"],
                        combination: null,
                        id: "custom",
                        label: "<html><body><section>\n            <h4> " + i18n["bandComboNameCustom"] + ":</h4>\n            <table cellspacing='5'>\n              <tr>\n                <td class=" + CSS.menuItemTd + ">\n                  <p class=" + CSS.menuItemText + "><i>" + i18n["bandComboNameCustom"] + "</i></p>\n                </td>\n              </tr>\n            </table>\n          </section></body></html>"
                    });
                    presetStore = new Memory({
                        data: presets
                    });
                    _this._bandCombinationPresetSelect.set({
                        store: presetStore,
                        value: "custom"
                    });
                }
                else {
                    _this._supportsBandPresets = false;
                }
                _this.scheduleRender();
            });
        };
        RasterSymbologyEditor.prototype._onStretchTypeChange = function (newStretchType) {
            var selectedStretchType;
            this._stretchTypeSelect.store.data.forEach(function (stretchType) {
                if (stretchType.id === newStretchType) {
                    selectedStretchType = stretchType.filterType;
                }
            });
            this.stretchType = selectedStretchType;
            this.scheduleRender();
            this._updateSymbology();
        };
        RasterSymbologyEditor.prototype._updateSymbology = function () {
            if (!(this._symbologySelect &&
                this._stretchTypeSelect &&
                this._stretchColorRampSelect &&
                this._noDataInput &&
                this._minPercentInput &&
                this._maxPercentInput &&
                this._stretchTypeSelect &&
                this._gammaInput &&
                this._standardDeviationsInput)) {
                return;
            }
            var props = this._getProperties();
            this.viewModel.updateRendering(props);
        };
        RasterSymbologyEditor.prototype._getProperties = function () {
            var renderParameters = {};
            renderParameters.symbologyType = this._symbologySelect.value;
            renderParameters.stretchType = this.stretchType;
            renderParameters.minPercent = this._minPercentInput.value;
            renderParameters.maxPercent = this._maxPercentInput.value;
            renderParameters.numberOfStandardDeviations = this._standardDeviationsInput.value;
            if (this.symbologyType === RasterSymbologyEditorViewModel.SymbologyTypes.uniqueValue) {
                renderParameters.noData = this._uniqueValueNoDataInput.value;
            }
            else if (this.symbologyType === RasterSymbologyEditorViewModel.SymbologyTypes.discrete) {
                renderParameters.noData = this._discreteNoDataInput.value;
            }
            else {
                renderParameters.noData = this._noDataInput.value;
            }
            renderParameters.gamma = this._gammaInput.value;
            renderParameters.colorRampName = this._stretchColorRampSelect.colorRampName;
            renderParameters.dra = this._stretchStatisticsCheckBox.checked;
            renderParameters.selectedBand = this._bandSelect.value;
            renderParameters.bandIds = [
                this._redBandSelect.value,
                this._greenBandSelect.value,
                this._blueBandSelect.value
            ];
            renderParameters.uniqueValuesColorRamp = this._uniqueValueColorSchemeSelect.colorRamp;
            renderParameters.uniqueValuesSymbolData = this._uniqueValuesSymbolData;
            renderParameters.discreteColorRamp = this._discreteColorSchemeSelect.colorRamp;
            renderParameters.discreteNColors = this._discreteNColorsInput.value;
            return renderParameters;
        };
        RasterSymbologyEditor.prototype._getSymbologyStore = function () {
            var symbologyTypes = this.viewModel.getSymbologyTypes(), symbologyTypeData = [];
            var symbologyTypeTitle, symbologyTypeDescription, imgClass;
            symbologyTypes.forEach(function (symbologyType) {
                symbologyTypeTitle = i18n[symbologyType + "Title"];
                symbologyTypeDescription =
                    i18n[symbologyType + "Description"] || i18n[symbologyType + "Title"];
                imgClass = CSS[symbologyType + "SymbologyTypeIcon"];
                symbologyTypeData.push({
                    id: symbologyType,
                    name: symbologyTypeTitle,
                    label: "<html><body><section>\n          <h4>" + symbologyTypeTitle + "</h4>\n          <table><tr>\n            <td class=" + CSS.menuItemTd + "><img class= " + imgClass + " /></td>\n            <td class=" + CSS.menuItemTd + ">\n              <p class=" + CSS.menuItemText + "><i>" + symbologyTypeDescription + "</i></p>\n            </td>\n          </tr></table>\n        </section></body></html>"
                });
            }, this);
            return new Memory({
                data: symbologyTypeData
            });
        };
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], RasterSymbologyEditor.prototype, "layer", void 0);
        __decorate([
            decorators_1.property()
        ], RasterSymbologyEditor.prototype, "defaultParams", void 0);
        __decorate([
            decorators_1.property({
                type: RasterSymbologyEditorViewModel
            })
        ], RasterSymbologyEditor.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], RasterSymbologyEditor.prototype, "stretchType", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], RasterSymbologyEditor.prototype, "symbologyType", void 0);
        RasterSymbologyEditor = __decorate([
            decorators_1.subclass("esri.widgets.RasterSymbologyEditor")
        ], RasterSymbologyEditor);
        return RasterSymbologyEditor;
    }(decorators_1.declared(Widget)));
    return RasterSymbologyEditor;
});
//# sourceMappingURL=RasterSymbologyEditor.js.map