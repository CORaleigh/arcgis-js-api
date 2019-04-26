/**
 * This widget provides an out-of-the-box editing experience to help streamline the editing
 * experience within a web application. The widget has two different {@link module:esri/widgets/Editor/Workflow Workflows},
 * `create` and `update`. These workflows allow you to either add features or edit and/or delete existing features within an editable feature layer.
 * The widget automatically recognizes if there are editable feature layers within the map. If it recognizes that they are editable,
 * the layers can be used by the widget. In addition, it is also possible to configure how the `Editor` behaves by setting its
 * {@link module:esri/widgets/Editor#layerInfos layerInfos} property.
 * This property takes an array of configuration objects which allow you to configure the editing experience for these layers.
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * The Editor widget is not yet at full parity with the functionality provided in the 3.x
 * [Editor](https://developers.arcgis.com/javascript/3/jsapi/editor-amd.html)
 * widget. For example, there is currently no support for editing attachments or related feature attributes.
 * There is also currently no support for editing feature layers derived from feature collections and is currently only supported when
 * working with {@link module:esri/views/MapView MapViews}.
 * :::
 *
 * ![editor](../../assets/img/apiref/widgets/editor_in_action.gif)
 *
 * @module esri/widgets/Editor
 * @amdalias Editor
 * @since 4.11
 *
 * @see [Editor.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Editor.tsx)
 * @see [Editor.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Editor.scss)
 * @see [Sample - Edit features with the Editor widget](../sample-code/widgets-editor-basic/index.html)
 * @see [Sample - Editor widget with configurations](../sample-code/widgets-editor-configurable/index.html)
 * @see module:esri/widgets/Editor/EditorViewModel
 * @see module:esri/widgets/Editor/Workflow
 * @see module:esri/views/ui/DefaultUI
 * @see module:esri/layers/FeatureLayer
 *
 * @example
 * var editor = new Editor({
 *   view: view
 * });
 *
 * view.ui.add(editor, "top-right");
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/tsSupport/assignHelper", "@dojo/framework/shim/Map", "dojo/i18n!esri/nls/common", "dojo/i18n!esri/widgets/Editor/nls/Editor", "dojo/i18n!esri/widgets/FeatureTemplates/nls/FeatureTemplates", "dojo/keys", "esri/core/HandleOwner", "esri/core/lang", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/widgets/FeatureForm", "esri/widgets/FeatureTemplates", "esri/widgets/Widget", "esri/widgets/Editor/EditorViewModel", "esri/widgets/FeatureTemplates/ItemList", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, __assign, Map_1, i18nCommon, i18n, i18nTemplates, keys_1, HandleOwner, lang_1, watchUtils_1, decorators_1, FeatureForm, FeatureTemplates, Widget, EditorViewModel, ItemList_1, widget_1) {
    "use strict";
    Map_1 = __importDefault(Map_1);
    i18nCommon = __importStar(i18nCommon);
    i18n = __importStar(i18n);
    i18nTemplates = __importStar(i18nTemplates);
    var CSS = {
        base: "esri-editor esri-widget",
        header: "esri-editor__header",
        scroller: "esri-editor__scroller",
        content: "esri-editor__content",
        contentWrapper: "esri-editor__temp-wrapper",
        message: "esri-editor__message",
        controls: "esri-editor__controls",
        title: "esri-editor__title",
        backButton: "esri-editor__back-button",
        modeSelection: "esri-editor__mode-selection",
        progressBar: "esri-editor__progress-bar",
        warningCard: "esri-editor__warning-card",
        warningHeader: "esri-editor__warning-header",
        warningHeading: "esri-editor__warning-heading",
        warningMessage: "esri-editor__warning-message",
        warningDivider: "esri-editor__warning-divider",
        warningOption: "esri-editor__warning-option",
        warningOptionPrimary: "esri-editor__warning-option--primary",
        warningOptionNegative: "esri-editor__warning-option--negative",
        warningOptionPositive: "esri-editor__warning-option--positive",
        featureList: "esri-editor__feature-list",
        featureListItem: "esri-editor__feature-list-item",
        featureListItemDisabled: "esri-editor__feature-list-item--disabled",
        featureListName: "esri-editor__feature-list-name",
        featureListIcon: "esri-editor__feature-list-icon",
        featureListIndex: "esri-editor__feature-list-index",
        controlButton: "esri-editor__control-button",
        overlay: "esri-editor__overlay",
        // icon
        errorIcon: "esri-icon-error2",
        basemapIcon: "esri-basemap",
        rightArrowIcon: "esri-icon-right",
        leftArrowIcon: "esri-icon-left",
        warningIcon: "esri-icon-notice-triangle",
        widgetIcon: "esri-icon-edit",
        // common
        button: "esri-button",
        buttonDisabled: "esri-button--disabled",
        buttonSecondary: "esri-button--secondary",
        buttonTertiary: "esri-button--tertiary",
        heading: "esri-heading",
        input: "esri-input",
        interactive: "esri-interactive",
        select: "esri-select"
    };
    function focusOnCreate(node) {
        node.focus();
    }
    var Editor = /** @class */ (function (_super) {
        __extends(Editor, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @alias module:esri/widgets/Editor
         * @extends module:esri/widgets/Widget
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                              that may be passed into the constructor.
         *
         * @example
         * // Typical usage for Editor widget. This will recognize all editable layers in the map.
         * const editor = new Editor({
         *   view: viewDiv
         * });
         *
         */
        function Editor(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._featureForm = new FeatureForm();
            _this._featureTemplates = new FeatureTemplates();
            _this._filterText = "";
            _this._prompt = null;
            //--------------------------------------------------------------------------
            //
            // Type definitions
            //
            //--------------------------------------------------------------------------
            //--------------------------------------------------------------------------
            //
            // CreationInfo typedef
            //
            //--------------------------------------------------------------------------
            /**
             * The information needed for creating a new feature.
             *
             * @typedef module:esri/widgets/Editor~CreationInfo
             *
             * @property {module:esri/layers/FeatureLayer} layer - The associated feature layer where
             * the new feature is created.
             * @property {module:esri/layers/support/FeatureTemplate} template - The associated feature template
             * used to create the new feature.
             */
            //--------------------------------------------------------------------------
            //
            // LayerInfo typedef
            //
            //--------------------------------------------------------------------------
            /**
             * Editor configurations used for an array of fields.
             *
             * @typedef module:esri/widgets/Editor~LayerInfo
             *
             * @property {module:esri/layers/FeatureLayer} layer - The associated feature layer containing
             * the editable fields.
             * @property {module:esri/widgets/FeatureForm/FieldConfig[]} [fieldConfig] - The configuration options
             * for displaying an array of fields within the widget. Take note that all fields except for `editor`,
             * `globalID`, `objectID`, and system maintained area and length fields will be included.
             * Otherwise, it is up to the developer to set the right field(s) to override and display.
             *
             * ::: esri-md class="panel trailer-1"
             * If this is set, in addition to overrides in the [supportingWidgetDefaults](#supportingWidgetDefaults), the overrides specified in
             * the [supportingWidgetDefaults](#supportingWidgetDefaults) property take precedence.
             * :::
             *
             * @property {boolean} [enabled = true] - Indicates whether to enable editing on the layer. Defaults to `true` if service supports it.
             * @property {boolean} [addEnabled] - Indicates whether to enable `Add feature` functionality. Defaults to `true` if service supports it.
             * @property {boolean} [updateEnabled] - Indicates whether to enable `Update feature` functionality. Defaults to `true` if service supports it.
             * @property {boolean} [deleteEnabled] - Indicates whether to enable the ability to delete features. Defaults to `true` if service supports it.
             */
            //--------------------------------------------------------------------------
            //
            // SupportingWidgetDefaults typedef
            //
            //--------------------------------------------------------------------------
            /**
             * Set this to customize any supporting Editor widgets default behavior. These widgets include
             * {@link module:esri/widgets/FeatureForm}, {@link module:esri/widgets/FeatureTemplates},
             * and {@link module:esri/widgets/Sketch}.
             *
             * @typedef module:esri/widgets/Editor~SupportingWidgetDefaults
             *
             * @property {Object} [featureForm] - An object containing properties specific for customizing the
             * {@link module:esri/widgets/FeatureForm} widget.
             * @property {module:esri/widgets/FeatureForm/FieldConfig[]} [featureForm.fieldConfig] - An array of
             * {@link module:esri/widgets/FeatureForm/FieldConfig} objects to use within the {@link module:esri/widgets/FeatureForm}.
             * ::: esri-md class="panel trailer-1"
             * Any {@link module:esri/widgets/FeatureForm/FieldConfig field configurations} set within the [layerInfos](#layerInfos) property will be
             * overridden if it is set here in the [supportingWidgetDefaults](#supportingWidgetDefaults) property.
             * :::
             * @property {string} [featureForm.groupDisplay] - String indicating the
             * {@link module:esri/widgets/FeatureForm#groupDisplay [groupDisplay]} and how they will be displayed to the end user.
             *
             * @property {Object} [featureTemplates] - An object containing properties specific for customizing
             * the {@link module:esri/widgets/FeatureTemplates} widget.
             * @property {string | module:esri/widgets/FeatureTemplates~GroupByFunction} [featureTemplates.groupBy] - Aids in managing
             * various template items and how they display within the widget. Please refer to
             * {@link module:esri/widgets/FeatureTemplates#groupBy groupBy API reference} for additional
             * information.
             * @property {boolean} [featureTemplates.filterEnabled] - Indicates whether the {@link module:esri/widgets/FeatureTemplates#filterEnabled templates filter}
             * displays.
             *
             * @property {Object} [sketch] - An object containing properties specific for customizng the
             * {@link module:esri/widgets/Sketch} widget.
             * @property {Object} [sketch.updateOptions] - An object containing the {@link module:esri/widgets/Sketch#update updateOptions}
             * for the {@link module:esri/widgets/Sketch} widget.
             * @property {module:esri/symbols/SimpleMarkerSymbol} [sketch.markerSymbol] - The marker symbol used to symbolize any
             * point feature updates.
             * @property {module:esri/symbols/SimpleFillSymbol} [sketch.polygonSymbol] - The polygon symbol used to symbolize any
             * polygon feature updates.
             * @property {module:esri/symbols/SimpleLineSymbol} [sketch.polylineSymbol] - The line symbol used to symbolize any
             * line feature updates.
             */
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  activeWorkflow
            //----------------------------------
            /**
             * A property indicating the current active workflow.
             *
             * @name activeWorkflow
             * @instance
             * @type {module:esri/widgets/Editor/Workflow}
             * @readonly
             *
             */
            _this.activeWorkflow = null;
            //----------------------------------
            //  allowedWorkflows
            //----------------------------------
            /**
             * An array of string values which specifies what end users are allowed to
             * edit. For example, a feature layer with full editing privileges may
             * be available. But you may only want the end user to have the
             * ability to update existing features. Set the `allowedWorkflows`
             * to only `update`.
             *
             * Possible Value | Description | Example
             * ---------------|------------|----------
             * create | Indicated in the widget via the `Add feature` option. This allows the end user to create new features in the feature service. | ![combinedcreate](../../assets/img/apiref/widgets/editor_combined_create.png)
             * update | Indicated in the widget via the `Edit feature` option. This allows the end user to update and/or delete features in the feature service. | ![combinedupdate](../../assets/img/apiref/widgets/editor_combined_update.png)
             *
             * ::: esri-md class="panel trailer-1"
             * These workflows are only enabled if the feature service allows these operations.
             * For example, if a feature service is only enabled to allow updates, `Add features`
             * is not enabled.
             * :::
             *
             * @name allowedWorkflows
             * @instance
             * @type {string[]}
             *
             * @example
             * const editor = new Editor({
             *   view: view,
             *   allowedWorkflows: ["update"] // allows only updates and no adds
             * });
             *
             */
            _this.allowedWorkflows = null;
            //----------------------------------
            //  iconClass
            //----------------------------------
            /**
             * The widget's default CSS icon class.
             *
             * @name iconClass
             * @instance
             * @type {string}
             * @readonly
             */
            _this.iconClass = CSS.widgetIcon;
            //----------------------------------
            //  label
            //----------------------------------
            /**
             * The widget's default label.
             *
             * @name label
             * @instance
             * @type {string}
             */
            _this.label = i18n.widgetLabel;
            //----------------------------------
            //  layerInfos
            //----------------------------------
            /**
             * An array of editing configurations for individual layers.
             *
             * If you have an editable feature layer but do not want
             * the end user to do any type of editing, you can limit this by
             * setting the `enabled` property to `false`.
             *
             * @name layerInfos
             * @instance
             * @type {module:esri/widgets/Editor~LayerInfo[]}
             * @see [Sample - Editor widget with configurations](../sample-code/widgets-editor-configurable/index.html)
             *
             * @example
             * const editor = new Editor({
             *   layerInfos: [{
             *     layer: featureLayer, // pass in the feature layer
             *     fieldConfig: [ // Specify which fields to configure
             *       {
             *         name: "fulladdr",
             *         label: "Full Address"
             *       },
             *       {
             *         name: "neighborhood",
             *         label: "Neighborhood"
             *       }],
             *     enabled: true, // default is true, set to false to disable editing functionality
             *     addEnabled: true, // default is true, set to false to disable the ability to add a new feature
             *     updateEnabled: false // default is true, set to false to disable the ability to edit an existing feature
             *     deleteEnabled: false // default is true, set to false to disable the ability to delete features
             *   }]
             * });
             *
             */
            _this.layerInfos = null;
            //----------------------------------
            //  supportingWidgetDefaults
            //----------------------------------
            /**
             * This property allows customization of supporting Editor widgets and their default behavior.
             * These widgets include {@link module:esri/widgets/FeatureForm}, {@link module:esri/widgets/FeatureTemplates}, and
             * {@link module:esri/widgets/Sketch}.
             *
             * ::: esri-md class="panel trailer-1"
             * This property is useful for basic overrides of the default widgets. There may be some limitations
             * to what the Editor can do with these overridden properties. For example, the Editor will always
             * disable the `multipleSelectionEnabled` property in {@link module:esri/widgets/Sketch#defaultUpdateOptions Sketch.defaultUpdateOptions}
             * no matter what is set within this property.
             * :::
             *
             * @name supportingWidgetDefaults
             * @instance
             * @type {module:esri/widgets/Editor~SupportingWidgetDefaults}
             * @see [Sample - Editor widget with configurations](../sample-code/widgets-editor-configurable/index.html)
             *
             */
            _this.supportingWidgetDefaults = null;
            //----------------------------------
            //  view
            //----------------------------------
            /**
             * A reference to the {@link module:esri/views/MapView}. This view
             * provides the editable layers for the Editor widget.
             *
             * @name view
             * @instance
             * @type {module:esri/views/MapView}
             *
             */
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            /**
             * The view model for this widget. This is a class that contains all the logic
             * (properties and methods) that controls this widget's behavior. See the
             * {@link module:esri/widgets/Editor/EditorToggleViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/Editor/EditorViewModel}
             * @autocast
             */
            _this.viewModel = new EditorViewModel();
            _this._handleSave = _this._handleSave.bind(_this);
            _this._handleBack = _this._handleBack.bind(_this);
            _this._handleDone = _this._handleDone.bind(_this);
            _this._handleDelete = _this._handleDelete.bind(_this);
            _this._handleAdd = _this._handleAdd.bind(_this);
            _this._handleEdit = _this._handleEdit.bind(_this);
            return _this;
        }
        Editor.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.init(this, "viewModel", function (viewModel) {
                    _this._featureForm.viewModel = viewModel ? viewModel.featureFormViewModel : null;
                    _this._featureTemplates.viewModel = viewModel ? viewModel.featureTemplatesViewModel : null;
                }),
                watchUtils_1.on(this, "viewModel.sketchViewModel", "create", function (event) {
                    if (event.state === "active") {
                        // re-render as 'new' graphic is sketched to get appropriate tip
                        _this.scheduleRender();
                    }
                }),
                watchUtils_1.on(this, "viewModel.activeWorkflow", "cancel-request", function (_a) {
                    var controller = _a.controller;
                    _this._prompt = {
                        title: i18n.cancelRequestTitle,
                        message: i18n.cancelRequestWarningMessage,
                        options: [
                            {
                                label: i18nCommon.form.no,
                                type: "neutral",
                                action: function () {
                                    controller.deny();
                                    return (_this._prompt = null);
                                }
                            },
                            {
                                label: i18nCommon.form.yes,
                                type: "negative",
                                action: function () {
                                    controller.allow();
                                    _this._prompt = null;
                                }
                            }
                        ]
                    };
                    _this.scheduleRender();
                }),
                watchUtils_1.init(this, "supportingWidgetDefaults", function (defaults) {
                    if (!defaults) {
                        return;
                    }
                    _this._featureForm.set(defaults.featureForm);
                    _this._featureTemplates.set(defaults.featureTemplates);
                    _this.viewModel.sketchViewModel.set(defaults.sketch);
                }),
                watchUtils_1.watch(this, "viewModel.failures", function (failures) {
                    if (!failures) {
                        return;
                    }
                    var _a = failures[0], error = _a.error, retry = _a.retry, cancel = _a.cancel;
                    _this._prompt = {
                        title: i18n.errorWarningTitle,
                        message: lang_1.substitute({ errorMessage: error.message }, i18n.errorWarningMessageTemplate),
                        options: [
                            {
                                label: i18n.retry,
                                type: "positive",
                                action: function () {
                                    retry();
                                    _this._prompt = null;
                                }
                            },
                            {
                                label: i18n.ignore,
                                type: "neutral",
                                action: function () {
                                    cancel();
                                    return (_this._prompt = null);
                                }
                            }
                        ]
                    };
                }),
                watchUtils_1.whenNot(this, "viewModel.activeWorkflow", function () { return (_this._featureTemplates.filterText = ""); })
            ]);
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        /**
         * Initiates the `create` workflow by displaying the [FeatureTemplates]{@link module:esri/widgets/FeatureTemplates} panel.
         *
         * @method startCreateWorkflowAtFeatureTypeSelection
         * @instance
         */
        Editor.prototype.startCreateWorkflowAtFeatureTypeSelection = function () {
            return null;
        };
        /**
         * Initiates the `create` workflow by displaying the panel where feature creation begins. This method
         * takes a {@link module:esri/widgets/Editor~CreationInfo} object containing the layer(s) and template(s)
         * to use.
         *
         * @method startCreateWorkflowAtFeatureCreation
         * @instance
         *
         * @param {module:esri/widgets/Editor~CreationInfo} creationInfo - An object containing
         * information needed to create a new feature using the Editor widget.
         */
        Editor.prototype.startCreateWorkflowAtFeatureCreation = function (creationInfo) {
            return null;
        };
        /**
         * This method starts the Editor workflow where it waits for the feature
         * to be selected.
         *
         * @method startCreateWorkflowAtFeatureEdit
         * @instance
         * @param {module:esri/Graphic} feature - The feature to be edited.
         *
         */
        Editor.prototype.startCreateWorkflowAtFeatureEdit = function (feature) {
            return null;
        };
        /**
         * Starts the `update` workflow using the current selected feature.
         *
         * @method startUpdateWorkflowAtFeatureSelection
         * @instance
         *
         */
        Editor.prototype.startUpdateWorkflowAtFeatureSelection = function () {
            return null;
        };
        /**
         * This method starts the Editor workflow where it waits for multiple features
         * to be selected.
         *
         * @method startUpdateWorkflowAtMultipleFeatureSelection
         * @instance
         *
         * @param {module:esri/Graphic[]} candidates - An array of features to be updated.
         *
         */
        Editor.prototype.startUpdateWorkflowAtMultipleFeatureSelection = function (candidates) {
            return null;
        };
        /**
         * Starts the `update` workflow at the feature geometry and attribute editing panel.
         *
         * @method startUpdateWorkflowAtFeatureEdit
         * @instance
         *
         * @param {module:esri/Graphic} feature - The feature to be updated.
         */
        Editor.prototype.startUpdateWorkflowAtFeatureEdit = function (feature) {
            return null;
        };
        /**
         * This is applicable if there is an active update workflow. If so, this method
         * deletes the workflow feature.
         *
         * @method deleteFeatureFromWorkflow
         * @instance
         *
         */
        Editor.prototype.deleteFeatureFromWorkflow = function () {
            return null;
        };
        /**
         * Cancels any active workflow.
         *
         * @method cancelWorkflow
         * @instance
         */
        Editor.prototype.cancelWorkflow = function (options) {
            return null;
        };
        Editor.prototype.render = function () {
            var viewModel = this.viewModel;
            if (!viewModel) {
                return widget_1.tsx("div", { class: CSS.base });
            }
            var state = viewModel.state;
            var overlay = this._prompt ? (widget_1.tsx("div", { class: CSS.overlay, key: "overlay" }, this.renderPrompt({
                message: this._prompt.message,
                title: this._prompt.title,
                options: this._prompt.options
            }))) : null;
            return (widget_1.tsx("div", { class: CSS.base },
                this.viewModel.syncing ? this.renderProgressBar() : null,
                state === "disabled"
                    ? null
                    : state === "ready"
                        ? this.renderLanding()
                        : state === "awaiting-feature-creation-info"
                            ? this.renderTemplates()
                            : state === "editing-new-feature" || state === "editing-existing-feature"
                                ? this.renderAttributeEditing()
                                : state === "awaiting-feature-to-update"
                                    ? this.renderFeatureUpdating()
                                    : state === "awaiting-update-feature-candidate"
                                        ? this.renderFeatureList()
                                        : state === "awaiting-feature-to-create"
                                            ? this.renderFeatureCreation()
                                            : null,
                overlay));
        };
        //--------------------------------------------------------------------------
        //
        //  Protected Methods
        //
        //--------------------------------------------------------------------------
        Editor.prototype.renderTemplates = function () {
            return (widget_1.tsx("div", { class: CSS.contentWrapper, key: "wrapper" },
                this.renderHeader(i18n.selectTemplate, true),
                widget_1.tsx("div", { key: "content", class: CSS.content }, this._featureTemplates.render()),
                this.renderControls([
                    {
                        label: i18nCommon.back,
                        type: "secondary",
                        clickHandler: this._handleDone
                    }
                ])));
        };
        Editor.prototype.renderAttributeEditing = function () {
            var _a = this.viewModel, workflow = _a.activeWorkflow, featureFormViewModel = _a.featureFormViewModel;
            var feature = workflow.data.edits.feature;
            var disabled = (workflow.type === "update" && !workflow.data.edits.modified) ||
                (featureFormViewModel.inputFields.length > 0 && !featureFormViewModel.valid);
            var primaryButtonLabel = workflow.type === "create" ? i18nCommon.add : i18nCommon.update;
            var controls = [
                {
                    label: primaryButtonLabel,
                    type: "primary",
                    disabled: disabled,
                    clickHandler: this._handleSave
                },
                {
                    label: i18nCommon.back,
                    type: "secondary",
                    clickHandler: this._handleBack
                }
            ];
            if (workflow.type === "update" && workflow.data.editableItem.supports.indexOf("delete") > -1) {
                controls.push({
                    label: i18nCommon.delete,
                    type: "tertiary",
                    clickHandler: this._handleDelete
                });
            }
            var header = this._getLabel(feature);
            return (widget_1.tsx("div", { class: CSS.contentWrapper, key: "wrapper" },
                this.renderHeader(header, true),
                widget_1.tsx("div", { key: "content", class: this.classes(CSS.content, CSS.scroller) }, featureFormViewModel.inputFields.length > 0
                    ? this._featureForm.render()
                    : this.renderMessage(lang_1.substitute({ button: primaryButtonLabel }, i18n.clickToFinishTemplate))),
                this.renderControls(controls)));
        };
        Editor.prototype.renderFeatureUpdating = function () {
            return (widget_1.tsx("div", { class: CSS.contentWrapper, key: "wrapper" },
                this.renderHeader(i18n.selectFeature, true),
                widget_1.tsx("div", { key: "content", class: this.classes(CSS.content, CSS.scroller) }, this.renderMessage(i18n.selectFeatureToEdit)),
                this.renderControls([
                    {
                        label: i18nCommon.back,
                        type: "secondary",
                        clickHandler: this._handleDone
                    }
                ])));
        };
        Editor.prototype.renderMessage = function (message) {
            return widget_1.tsx("div", { class: CSS.message }, message);
        };
        Editor.prototype.renderFeatureCreation = function () {
            var viewModel = this.viewModel;
            var workflow = viewModel.activeWorkflow;
            var layer = workflow.data.creationInfo.layer;
            var tip = this._getSketchingTip(layer.geometryType, viewModel.sketchViewModel.createGraphic);
            return (widget_1.tsx("div", { class: CSS.contentWrapper, key: "wrapper" },
                this.renderHeader(i18n.placeFeature, true),
                widget_1.tsx("div", { key: "content", class: this.classes(CSS.content, CSS.scroller) }, this.renderMessage(tip)),
                this.renderControls([
                    {
                        label: i18nCommon.back,
                        type: "secondary",
                        clickHandler: this._handleBack
                    }
                ])));
        };
        Editor.prototype.renderControls = function (buttons) {
            var _this = this;
            return (widget_1.tsx("div", { class: CSS.controls, key: "controls" }, buttons.map(function (_a, index) {
                var _b = _a.disabled, disabled = _b === void 0 ? false : _b, label = _a.label, type = _a.type, clickHandler = _a.clickHandler;
                return _this.renderButton({
                    label: label,
                    class: _this.classes(CSS.controlButton, CSS.button, type === "secondary"
                        ? CSS.buttonSecondary
                        : type === "tertiary"
                            ? CSS.buttonTertiary
                            : null, disabled ? CSS.buttonDisabled : null),
                    disabled: disabled,
                    clickHandler: clickHandler,
                    key: index
                });
            })));
        };
        Editor.prototype.renderPrompt = function (_a) {
            var _this = this;
            var title = _a.title, message = _a.message, _b = _a.options, options = _b === void 0 ? [] : _b;
            return (widget_1.tsx("div", { class: CSS.warningCard, role: "alert" },
                widget_1.tsx("div", { class: CSS.warningHeader },
                    widget_1.tsx("span", { class: CSS.warningIcon, "aria-hidden": "true" }),
                    widget_1.tsx("h4", { class: this.classes(CSS.heading, CSS.warningHeading) }, title)),
                widget_1.tsx("div", { class: CSS.warningMessage }, message),
                widget_1.tsx("div", { class: CSS.warningDivider }),
                options.map(function (_a, index) {
                    var label = _a.label, action = _a.action, type = _a.type;
                    var first = index === 0;
                    return (widget_1.tsx("div", { afterCreate: first ? focusOnCreate : null, class: _this.classes(CSS.warningOption, first ? CSS.warningOptionPrimary : null, type === "positive"
                            ? CSS.warningOptionPositive
                            : type === "negative"
                                ? CSS.warningOptionNegative
                                : null), key: index, onclick: action, onkeydown: function (event) {
                            if (event.keyCode === keys_1.ENTER || event.keyCode === keys_1.SPACE) {
                                event.preventDefault();
                                action.call(null);
                            }
                        }, tabIndex: 0, role: "button" }, label));
                })));
        };
        Editor.prototype.renderProgressBar = function () {
            return widget_1.tsx("div", { class: this.classes(CSS.progressBar), key: "progress-bar" });
        };
        Editor.prototype.renderButton = function (props) {
            return (widget_1.tsx("button", { class: props.class, disabled: props.disabled, key: props.key, onclick: props.clickHandler }, props.label));
        };
        Editor.prototype.renderHeader = function (title, breadcrumb) {
            if (breadcrumb === void 0) { breadcrumb = false; }
            return (widget_1.tsx("header", { class: CSS.header, key: "header" },
                breadcrumb ? (widget_1.tsx("div", { "aria-label": i18nCommon.back, class: this.classes(CSS.backButton, CSS.interactive), key: "back-button", onclick: this._handleBack, onkeydown: this._handleBack, tabIndex: 0, title: i18nCommon.back },
                    widget_1.tsx("span", { "aria-hidden": "true", class: widget_1.isRTL() ? CSS.rightArrowIcon : CSS.leftArrowIcon }))) : null,
                widget_1.tsx("h4", { class: this.classes(CSS.title, CSS.heading) }, title)));
        };
        Editor.prototype.renderLanding = function () {
            var _a = this.viewModel, allowedWorkflows = _a.allowedWorkflows, canCreate = _a.canCreate, canUpdate = _a.canUpdate;
            var arrowIconClass = widget_1.isRTL() ? CSS.leftArrowIcon : CSS.rightArrowIcon;
            return (widget_1.tsx("div", { class: CSS.contentWrapper, key: "wrapper" },
                this.renderHeader(i18n.widgetLabel),
                widget_1.tsx("div", { key: "content", class: CSS.content, role: "group" },
                    widget_1.tsx("div", { class: CSS.modeSelection, key: "mode-selection" },
                        allowedWorkflows.indexOf("update") > -1 ? (widget_1.tsx("div", { "aria-disabled": canUpdate ? "false" : "true", class: this.classes(CSS.featureListItem, !canUpdate ? CSS.featureListItemDisabled : null), key: "update", onclick: this._handleEdit, onkeydown: this._handleEdit, role: "button", tabIndex: !canUpdate ? -1 : 0 },
                            widget_1.tsx("span", { class: CSS.featureListName }, i18n.editFeature),
                            widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.featureListIcon, arrowIconClass) }))) : null,
                        allowedWorkflows.indexOf("create") > -1 ? (widget_1.tsx("div", { class: this.classes(CSS.featureListItem, !canCreate ? CSS.featureListItemDisabled : null), key: "create", onclick: this._handleAdd, onkeydown: this._handleAdd, role: "button", tabIndex: !canCreate ? -1 : 0 },
                            widget_1.tsx("span", { class: CSS.featureListName }, i18n.addFeature),
                            widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.featureListIcon, arrowIconClass) }))) : null))));
        };
        Editor.prototype.renderFeatureList = function () {
            var _this = this;
            var _a = this.viewModel, editableItems = _a.editableItems, activeWorkflow = _a.activeWorkflow;
            var workflow = activeWorkflow;
            var candidates = workflow.data.candidates;
            var title = lang_1.substitute({ total: candidates.length }, i18n.multipleFeaturesTemplate);
            var grouped = new Map_1.default();
            candidates
                .map(function (feature) {
                var label = _this._getLabel(feature);
                return {
                    label: label,
                    id: feature.attributes[feature.layer.objectIdField],
                    data: feature
                };
            })
                .filter(function (item) {
                var label = item.label, data = item.data;
                var lowerCasedFilter = _this._filterText.toLowerCase();
                var title = data.layer.title;
                var match = _this.viewModel.editableItems.find(function (item) { return item.layer === data.layer; });
                return (match.supports.indexOf("update") > -1 &&
                    (!lowerCasedFilter ||
                        (label.toLowerCase().indexOf(lowerCasedFilter) > -1 ||
                            title.toLowerCase().indexOf(lowerCasedFilter) > -1)));
            })
                .forEach(function (item) {
                var layer = item.data.layer;
                if (!grouped.has(layer)) {
                    grouped.set(layer, {
                        id: layer.id,
                        label: layer.title,
                        items: [item]
                    });
                    return;
                }
                grouped.get(layer).items.push(item);
            });
            var sortedAndGrouped = editableItems
                .filter(function (_a) {
                var layer = _a.layer;
                return grouped.has(layer);
            })
                .map(function (_a) {
                var layer = _a.layer;
                return grouped.get(layer);
            })
                .toArray();
            return (widget_1.tsx("div", { class: CSS.contentWrapper, key: "wrapper" },
                this.renderHeader(title, true),
                widget_1.tsx("div", { key: "content", class: this.classes(CSS.content, CSS.scroller) }, ItemList_1.ItemList({
                    id: this.id,
                    filterText: this._filterText,
                    items: sortedAndGrouped,
                    messages: {
                        filterPlaceholder: i18nTemplates.filterPlaceholder,
                        noItems: i18nTemplates.noItems,
                        noMatches: i18nTemplates.noMatches
                    },
                    onItemMouseEnter: function (_a) {
                        var feature = _a.data;
                        workflow.data.edits.feature = feature;
                    },
                    onItemMouseLeave: function () {
                        workflow.data.edits.feature = null;
                    },
                    onItemSelect: function (_a) {
                        var feature = _a.data;
                        workflow.data.edits.feature = feature;
                        workflow.next();
                    },
                    onFilterChange: function (value) {
                        _this._filterText = value;
                    }
                })),
                this.renderControls([
                    {
                        label: i18nCommon.back,
                        type: "secondary",
                        clickHandler: this._handleBack
                    }
                ])));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Editor.prototype._getSketchingTip = function (geometryType, graphicInProgress) {
            if (geometryType === "point") {
                return i18n.tips.clickToAddPoint;
            }
            if (geometryType === "polygon" || geometryType === "polyline") {
                if (!graphicInProgress) {
                    return i18n.tips.clickToStart;
                }
                var geometry = graphicInProgress.geometry;
                var segmentProperty = geometryType === "polygon" ? "rings" : "paths";
                var segment = geometry[segmentProperty][0];
                if (geometryType === "polygon" && segment < 4) {
                    return i18n.tips.clickToContinue;
                }
                return i18n.tips.clickToContinueThenDoubleClickToEnd;
            }
            return i18n.tips.clickToAddFeature;
        };
        Editor.prototype._getLabel = function (feature) {
            var layer = feature.layer;
            var displayField = layer.displayField, objectIdField = layer.objectIdField;
            var attributes = feature.attributes;
            return ((displayField && attributes[displayField]) ||
                lang_1.substitute({ id: attributes[objectIdField] }, i18n.untitledFeatureTemplate));
        };
        Editor.prototype._handleDelete = function () {
            var _this = this;
            this._prompt = {
                title: i18n.deleteWarningTitle,
                message: i18n.deleteWarningMessage,
                options: [
                    {
                        label: i18n.keep,
                        type: "neutral",
                        action: function () { return (_this._prompt = null); }
                    },
                    {
                        label: i18nCommon.delete,
                        type: "positive",
                        action: function () {
                            _this.viewModel.deleteFeatureFromWorkflow();
                            _this._prompt = null;
                        }
                    }
                ]
            };
        };
        Editor.prototype._handleSave = function () {
            var workflow = this.viewModel.activeWorkflow;
            workflow.commit();
            workflow.reset();
        };
        Editor.prototype._handleAdd = function () {
            if (!this.viewModel.canCreate) {
                return;
            }
            this.viewModel.startCreateWorkflowAtFeatureTypeSelection();
        };
        Editor.prototype._handleEdit = function () {
            if (!this.viewModel.canUpdate) {
                return;
            }
            this.viewModel.startUpdateWorkflowAtFeatureSelection();
        };
        Editor.prototype._handleDone = function () {
            this.viewModel.cancelWorkflow({ force: true });
        };
        Editor.prototype._handleBack = function () {
            var _this = this;
            var workflow = this.viewModel.activeWorkflow;
            var stepId = workflow.stepId, data = workflow.data, type = workflow.type;
            var goBack = function () {
                if (workflow.hasPreviousStep) {
                    workflow.previous();
                    return;
                }
                _this.viewModel.cancelWorkflow({ force: true });
            };
            if (stepId === "editing-new-feature" ||
                (stepId === "editing-existing-feature" && data.edits.modified)) {
                var title = i18n.cancelWarningTitle;
                var message = type === "create" ? i18n.cancelCreateWarningMessage : i18n.cancelUpdateWarningMessage;
                this._prompt = {
                    title: title,
                    message: message,
                    options: [
                        {
                            label: i18n.keep,
                            type: "neutral",
                            action: function () { return (_this._prompt = null); }
                        },
                        {
                            label: i18n.discard,
                            type: "negative",
                            action: function () {
                                goBack();
                                _this._prompt = null;
                            }
                        }
                    ]
                };
                return;
            }
            goBack();
        };
        __decorate([
            decorators_1.aliasOf("viewModel.activeWorkflow")
        ], Editor.prototype, "activeWorkflow", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.allowedWorkflows")
        ], Editor.prototype, "allowedWorkflows", void 0);
        __decorate([
            decorators_1.property()
        ], Editor.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], Editor.prototype, "label", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.layerInfos")
        ], Editor.prototype, "layerInfos", void 0);
        __decorate([
            decorators_1.property()
        ], Editor.prototype, "supportingWidgetDefaults", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Editor.prototype, "view", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable([
                "viewModel.canCreate",
                "viewModel.canUpdate",
                "viewModel.failures",
                "viewModel.state",
                "viewModel.syncing",
                "viewModel.activeWorkflow.data.edits.modified"
            ])
        ], Editor.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.startCreateWorkflowAtFeatureTypeSelection")
        ], Editor.prototype, "startCreateWorkflowAtFeatureTypeSelection", null);
        __decorate([
            decorators_1.aliasOf("viewModel.startCreateWorkflowAtFeatureCreation")
        ], Editor.prototype, "startCreateWorkflowAtFeatureCreation", null);
        __decorate([
            decorators_1.aliasOf("viewModel.startCreateWorkflowAtFeatureEdit")
        ], Editor.prototype, "startCreateWorkflowAtFeatureEdit", null);
        __decorate([
            decorators_1.aliasOf("viewModel.startUpdateWorkflowAtFeatureSelection")
        ], Editor.prototype, "startUpdateWorkflowAtFeatureSelection", null);
        __decorate([
            decorators_1.aliasOf("viewModel.startUpdateWorkflowAtMultipleFeatureSelection")
        ], Editor.prototype, "startUpdateWorkflowAtMultipleFeatureSelection", null);
        __decorate([
            decorators_1.aliasOf("viewModel.startUpdateWorkflowAtFeatureEdit")
        ], Editor.prototype, "startUpdateWorkflowAtFeatureEdit", null);
        __decorate([
            decorators_1.aliasOf("viewModel.deleteFeatureFromWorkflow")
        ], Editor.prototype, "deleteFeatureFromWorkflow", null);
        __decorate([
            decorators_1.aliasOf("viewModel.cancelWorkflow")
        ], Editor.prototype, "cancelWorkflow", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Editor.prototype, "_handleDelete", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Editor.prototype, "_handleAdd", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Editor.prototype, "_handleEdit", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Editor.prototype, "_handleDone", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Editor.prototype, "_handleBack", null);
        Editor = __decorate([
            decorators_1.subclass("esri.widgets.Editor")
        ], Editor);
        return Editor;
    }(decorators_1.declared(Widget, HandleOwner)));
    return Editor;
});
//# sourceMappingURL=Editor.js.map