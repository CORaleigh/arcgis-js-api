/**
 * The FeatureForm widget displays attributes of a feature. This widget
 * renders input fields based on the feature's attributes and whether
 * the field allows editing. You can configure field groupings to aid in display
 * and organization of form data. Use this widget,
 * in combination with {@link module:esri/layers/FeatureLayer#applyEdits FeatureLayer.applyEdits},
 * to enable an end user to update a feature's attribute on a specified
 * editable feature layer(s).
 *
 * ![featureForm](../../assets/img/apiref/widgets/featureForm.png)
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * The FeatureForm widget is not yet at full parity with the functionality provided in the 3.x
 * [AttributeInspector](https://developers.arcgis.com/javascript/3/jsapi/attributeinspector-amd.html)
 * widget. For example, there is currently no support for editing attachments or related feature attributes.
 * :::
 *
 * @module esri/widgets/FeatureForm
 * @since 4.9
 *
 * @see [FeatureForm.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/FeatureForm.tsx)
 * @see [FeatureForm.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_FeatureForm.scss)
 * @see [Sample - Update Feature Attributes](../sample-code/editing-groupedfeatureform/index.html)
 * @see [Sample - Update FeatureLayer using ApplyEdits](../sample-code/editing-applyedits/index.html)
 * @see [Sample - Advanced Attribute Editing](../sample-code/editing-featureform-fieldvisibility/index.html)
 * @see module:esri/widgets/FeatureForm/FeatureFormViewModel
 * @see module:esri/widgets/FeatureForm/FieldConfig
 * @see module:esri/widgets/FeatureForm/InputField
 * @see module:esri/views/ui/DefaultUI
 * @see module:esri/layers/FeatureLayer
 *
 * @example
 * var featureForm = new FeatureForm({
 *   container: "formDiv",
 *   feature: graphic
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
define(["require", "exports", "esri/core/tsSupport/assignHelper", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/date/locale", "esri/moment", "esri/core/accessorSupport/decorators", "esri/layers/support/domains", "esri/layers/support/fieldUtils", "esri/widgets/Widget", "esri/widgets/FeatureForm/FeatureFormViewModel", "esri/widgets/support/widget"], function (require, exports, __assign, __extends, __decorate, locale_1, moment, decorators_1, domains_1, fieldUtils_1, Widget, FeatureFormViewModel, widget_1) {
    "use strict";
    var CSS = {
        base: "esri-feature-form",
        form: "esri-feature-form__form",
        label: "esri-feature-form__label",
        inputField: "esri-feature-form__input",
        inputDate: "esri-feature-form__input--date",
        inputTime: "esri-feature-form__input--time",
        inputDisabled: "esri-feature-form__input--disabled",
        inputInvalid: "esri-feature-form__input--invalid",
        inputIconInvalid: "esri-feature-form__input-icon--invalid",
        errorMessage: "esri-feature-form__field-error-message",
        description: "esri-feature-form__description-text",
        dateInputPart: "esri-feature-form__date-input-part",
        dateInputContainer: "esri-feature-form__date-input-container",
        dateFormatHint: "esri-feature-form__date-format-hint",
        group: "esri-feature-form__group",
        groupLabel: "esri-feature-form__group-label",
        groupDescription: "esri-feature-form__group-description",
        groupCollapsed: "esri-feature-form__group--collapsed",
        groupSequential: "esri-feature-form__group--sequential",
        groupActive: "esri-feature-form__group--active",
        // icon
        errorIcon: "esri-icon-notice-triangle",
        // common
        widget: "esri-widget",
        panel: "esri-widget--panel",
        input: "esri-input",
        select: "esri-select"
    };
    var defaultDateFormat = {
        datePattern: "M/d/y",
        timePattern: "h:mm:ss a"
    };
    function isGroupField(value) {
        return value && value.inputFields;
    }
    var FeatureForm = /** @class */ (function (_super) {
        __extends(FeatureForm, _super);
        /**
         * Fires when a field value is updated.
         *
         * @event module:esri/widgets/FeatureForm#value-change
         * @property {module:esri/layers/FeatureLayer} layer - The associated feature layer.
         * @property {module:esri/Graphic} feature - The associated feature.
         * @property {string} fieldName - The updated field.
         * @property {number | string | null } value - The updated field value.
         * @property {boolean} valid - When true, the value conforms to the field's definition.
         *
         */
        /**
         * Fires when the [submit()](#submit) method is called.
         * Call {@link module:esri/layers/FeatureLayer#applyEdits FeatureLayer.applyEdits()} method
         * to update a feature's attributes.
         *
         * @event module:esri/widgets/FeatureForm#submit
         * @property {string[]} valid - The valid field names.
         * @property {string[]} invalid - The invalid field names.
         * @property {Object} values - An object of key-value pairs of field names with all of their values,
         * regardless of whether or not they were updated.
         *
         * @example
         * // Listen to the feature form's submit event.
         * featureForm.on("submit", function(){
         *   if (editFeature) {
         *     // Grab updated attributes from the form.
         *     const updated = featureForm.getValues();
         *
         *     // Loop through updated attributes and assign
         *     // the updated values to feature attributes.
         *     Object.keys(updated).forEach(function(name) {
         *       editFeature.attributes[name] = updated[name];
         *     });
         *
         *     // Setup the applyEdits parameter with updates.
         *     const edits = {
         *       updateFeatures: [editFeature]
         *     };
         *     applyEdits(edits);
         *   }
         * });
         *
         * @see [submit()](#submit)
         * @see [getValues()](#getValues)
         */
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @extends module:esri/widgets/Widget
         * @constructor
         * @alias module:esri/widgets/FeatureForm
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                            that may be passed into the constructor.
         *
         * @example
         * // Typical usage
         * const featureForm = new FeatureForm({
         *   container: "formDiv", // HTML div
         *   feature: graphic, // Pass in feature
         *   // Configure fields to display
         *   fieldConfig: [ // Autocasts as FieldConfig
         *     {
         *       name: "Incident_desc",
         *       label: "Description"
         *     },
         *     {
         *       name: "Incident_Address",
         *       label: "Contact"
         *      }]
         * });
         */
        function FeatureForm(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._fieldFocusNeeded = false;
            _this._activeDateEdit = null;
            _this._activeInputName = null;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  feature
            //----------------------------------
            /**
             * The associated feature containing the editable attributes.
             * A common way to access this is via the {@link module:esri/views/MapView#hitTest MapView}
             * or {@link module:esri/views/SceneView#hitTest SceneView's} `hitTest()`
             * method.
             *
             * @name feature
             * @type {module:esri/Graphic}
             * @instance
             *
             * @example
             * // Check if a user clicked on an incident feature.
             * view.on("click", function(event) {
             *   view.hitTest(event).then(function(response) {
             *     // Display the attributes of selected incident feature in the form
             *     if (response.results[0].graphic && response.results[0].graphic.layer.id == "incidentsLayer") {
             *        formVM.feature = result.results[0].graphic
             *     }
             *   });
             * });
             */
            _this.feature = null;
            //----------------------------------
            //  fieldConfig
            //----------------------------------
            /**
             * Array of individual or grouped field configuration objects. This is where you specify what fields to
             * display and how you wish to display them. It is possible to configure individual
             * or {@link module:esri/widgets/FeatureForm/FieldGroupConfig grouped fields}. For an example of individual field configurations,
             * please refer to the [Update FeatureLayer using ApplyEdits](../sample-code/editing-applyedits/index.html)
             * sample. For an example of grouped field configurations, please refer to the
             * [Update Feature Attributes](../sample-code/editing-groupedfeatureform/index.html) sample.
             *
             * ::: esri-md class="panel trailer-1"
             * When not set, all fields except for `editor`, `globalID`, `objectID`, and system maintained area and length fields will be included.
             * Otherwise, it is up to the developer to set the right field(s) to override and display.
             * :::
             *
             * @name fieldConfig
             * @type {module:esri/widgets/FeatureForm/FieldConfig[] | module:esri/widgets/FeatureForm/FieldGroupConfig[]}
             * @instance
             * @autocast
             *
             * @example
             * // Individual field configurations without grouping
             * const featureForm = new FeatureForm({
             *   container: "formDiv",
             *   feature: graphic, // Pass in feature
             *   // Configure fields to display without grouping
             *   fieldConfig: [ // Autocasts as FieldConfig
             *     {
             *       name: "Incident_desc",
             *       label: "Description"
             *     },{
             *       name: "Incident_Address",
             *       label: "Contact"
             *    }]
             * });
             *
             * @example
             * // Grouped field configurations
             * const featureForm = new FeatureForm({
             *   container: "formDiv",
             *   feature: graphic,
             *   fieldConfig: [{ // Autocasts to FieldGroupConfig
             *     label: "Inspector", // Group 1
             *     description: "Inspector information",
             *     // Individual field configurations within the group
             *     fieldConfig: [{
             *       name: "inspector",
             *       label: "Name"
             *     },
             *     {
             *       name: "inspemail",
             *       label: "Email address"
             *     }]
             *    }, {
             *     label: "Business", // Group 2
             *     description: "Business information",
             *     // Individual field configurations within the group
             *     fieldConfig: [{
             *       name: "placename",
             *       label: "Business name"
             *     }, {
             *       name: "firstname",
             *       label: "First name"
             *     }]
             *   }]
             * });
             */
            _this.fieldConfig = null;
            //----------------------------------
            //  groupDisplay
            //----------------------------------
            /**
             * Defines how groups will be displayed to the user.
             *
             * **Possible Values:**
             *
             * Value | Description |
             * ----- | ----------- |
             * all | All groups will be expanded.
             * sequential | A single group will be expanded at a time.
             *
             * @name groupDisplay
             * @type {string}
             * @default all
             * @instance
             * @since 4.10
             *
             * @see [Sample - Update Feature Attributes](../sample-code/editing-groupedfeatureform/index.html)
             */
            _this.groupDisplay = "all";
            //----------------------------------
            //  layer
            //----------------------------------
            /**
             * Layer containing the editable feature attributes.
             * If this layer is not specified, it is the same as the
             * {@link module:esri/Graphic#layer graphic's layer}.
             *
             * @name layer
             * @type {module:esri/layers/FeatureLayer}
             * @instance
             *
             * @example
             *
             * const form = new FeatureForm({
             *   container: "formDiv", // HTML div
             *   layer: featureLayer // Feature layer
             * });
             */
            _this.layer = null;
            //----------------------------------
            //  strict
            //----------------------------------
            /**
             * Indicates whether to update a feature's attribute values, even if invalid. If `true`,
             * updates with invalid values are ignored. A value of `false` updates everything, regardless
             * of validity.
             *
             * @ignore
             * @name strict
             * @type {boolean}
             * @instance
             * @default false
             *
             */
            _this.strict = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            /**
             * The view model for this widget. This is a class that contains all the logic
             * (properties and methods) that controls this widget's behavior. See the
             * {@link module:esri/widgets/FeatureForm/FeatureFormViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/FeatureForm/FeatureFormViewModel}
             * @autocast
             */
            _this.viewModel = new FeatureFormViewModel();
            _this._handleFormKeyDown = _this._handleFormKeyDown.bind(_this);
            _this._handleInputBlur = _this._handleInputBlur.bind(_this);
            _this._handleInputFocus = _this._handleInputFocus.bind(_this);
            _this._handleNumberInputMouseDown = _this._handleNumberInputMouseDown.bind(_this);
            _this._handleInputKeyDown = _this._handleInputKeyDown.bind(_this);
            _this._handleOptionChange = _this._handleOptionChange.bind(_this);
            _this._handleGroupClick = _this._handleGroupClick.bind(_this);
            _this._handleSubmit = _this._handleSubmit.bind(_this);
            _this._afterScrollerCreateOrUpdate = _this._afterScrollerCreateOrUpdate.bind(_this);
            return _this;
        }
        FeatureForm.prototype.postInitialize = function () {
            var _this = this;
            this.own(this.watch("feature", function () {
                var first = _this.viewModel.inputFields[0];
                var groupOrInput = isGroupField(first) ? first.inputFields[0] : first;
                _this._activeInputName = groupOrInput && groupOrInput.name;
                _this._fieldFocusNeeded = true;
            }), this.on("submit", function (event) {
                if (event.invalid.length > 0) {
                    var invalidFieldName = event.invalid[0];
                    _this._activeInputName = invalidFieldName;
                    _this._fieldFocusNeeded = true;
                    _this.scheduleRender();
                }
            }));
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        //----------------------------------
        //  getValues
        //----------------------------------
        /**
         * Returns all of the field values, regardless of whether or not they were updated.
         *
         * @returns {Object} An object of key-value pairs of field names with their values.
         *
         * @see [submit](#event:submit) event
         * @see [submit()](#submit) method
         *
         * @example
         * function updateFeature() {
         *   // Get the updated field values
         *   const attributes = form.getValues();
         *   // Call applyEdits on the featurelayer
         *   layer.applyEdits({
         *     // Pass in the updated field values
         *     updateFeatures: [{ attributes }]
         *   });
         * }
         */
        FeatureForm.prototype.getValues = function () {
            return null;
        };
        //----------------------------------
        //  submit
        //----------------------------------
        /**
         * Fires the [submit](#event:submit) event.
         *
         * @example
         * // Listen for when 'submit' is called on the FeatureForm.
         * // Once it is fired, update the feature.
         * form.on("submit", updateFeature);
         * // When the DOM's button (btnUpdate) is clicked,
         * // execute the 'submit()' method.
         * on(dom.byId("btnUpdate"), "click", form.submit());
         */
        FeatureForm.prototype.submit = function () {
            return null;
        };
        FeatureForm.prototype.render = function () {
            var state = this.viewModel.state;
            return (widget_1.tsx("div", { class: this.classes(CSS.base, CSS.widget, CSS.panel) }, state === "ready" ? this.renderForm() : null));
        };
        //--------------------------------------------------------------------------
        //
        //  Protected Methods
        //
        //--------------------------------------------------------------------------
        FeatureForm.prototype.renderForm = function () {
            return (widget_1.tsx("form", { class: CSS.form, novalidate: true, onsubmit: this._handleSubmit, onkeydown: this._handleFormKeyDown }, this.renderFields()));
        };
        FeatureForm.prototype.renderFields = function () {
            var _this = this;
            var inputFields = this.viewModel.inputFields;
            return inputFields.map(function (inputField, index) {
                return isGroupField(inputField)
                    ? _this.renderGroup(inputField, index)
                    : _this.renderLabeledField(inputField);
            });
        };
        FeatureForm.prototype.renderGroup = function (inputFieldGroup, index) {
            var _this = this;
            var description = inputFieldGroup.description, label = inputFieldGroup.label, inputs = inputFieldGroup.inputFields;
            var activeInput = this.viewModel.findField(this._activeInputName);
            var isGroupActive = activeInput && activeInput.group === inputFieldGroup;
            var id = this.id + "_group_" + index;
            var labelId = this.id + "_group-label_" + index;
            var descriptionId = this.id + "_group-description_" + index;
            var descriptionNode = description ? (widget_1.tsx("p", { class: this.classes(CSS.groupDescription, CSS.description), id: descriptionId }, description)) : null;
            var sequential = this.groupDisplay === "sequential";
            var ariaExpanded = !sequential ? undefined : isGroupActive ? "true" : "false";
            return (widget_1.tsx("fieldset", { class: this.classes(CSS.group, sequential ? CSS.groupSequential : null, !sequential || isGroupActive ? null : CSS.groupCollapsed, isGroupActive ? CSS.groupActive : null), "aria-expanded": ariaExpanded, "aria-labelledby": labelId, "aria-describedby": description ? descriptionId : "", "data-group": inputFieldGroup, id: id, key: index, onclick: this._handleGroupClick },
                widget_1.tsx("div", { class: CSS.groupLabel, id: labelId }, label),
                descriptionNode,
                inputs.map(function (inputField) { return _this.renderLabeledField(inputField); })));
        };
        FeatureForm.prototype._getFocusableInput = function (direction, input) {
            var inputs = this.viewModel._allInputFields;
            var allInputs = direction === "forward" ? inputs : inputs.slice().reverse();
            var searchStartIndex = allInputs.indexOf(input) + 1;
            for (var i = searchStartIndex; i < allInputs.length; i++) {
                var current = allInputs[i];
                if (current.visible && current.editable) {
                    return current;
                }
            }
            return null;
        };
        FeatureForm.prototype.renderLabeledField = function (inputField) {
            var label = inputField.label, layer = inputField.layer, type = inputField.type;
            return (widget_1.tsx("label", { key: layer.id + "-" + inputField.name, class: CSS.label }, [
                label,
                type !== "unsupported"
                    ? this.renderInputField(inputField)
                    : this.renderUnsupportedField(inputField),
                this.renderAuxiliaryText(inputField)
            ]));
        };
        FeatureForm.prototype.renderInputField = function (inputField) {
            var viewModel = this.viewModel;
            var domain = inputField.domain, editable = inputField.editable, name = inputField.name, type = inputField.type;
            var value = viewModel.getValue(name);
            var readOnly = !editable;
            var props = this.getCommonInputProps(inputField);
            if (domain && domain.type === "coded-value" && !readOnly) {
                return this.renderSelectInputField(value, domain.codedValues.map(function (_a) {
                    var value = _a.code, name = _a.name;
                    return ({
                        value: value,
                        name: name
                    });
                }), props);
            }
            return (type === "text" && inputField.editorType === "text-area") ||
                inputField.editorType === "rich-text" ? (widget_1.tsx("textarea", __assign({}, props))) : type === "date" ? (this.renderDateInputField(value, props)) : (widget_1.tsx("input", __assign({ type: type === "text" ? "text" : "number" }, props)));
        };
        FeatureForm.prototype.renderDateInputField = function (value, props) {
            var _a = this._formatDate(0), dateFormatHint = _a.date, timeFormatHint = _a.time;
            var commonHintId = this.id + "-" + props.key;
            var dateFormatHintId = commonHintId + "-date";
            var timeFormatHintId = commonHintId + "-time";
            var inputField = props["data-field"];
            return (widget_1.tsx("div", { key: props.key + "-date", class: CSS.dateInputContainer },
                widget_1.tsx("div", { class: CSS.dateInputPart },
                    widget_1.tsx("input", __assign({ "aria-label": inputField.label, "aria-describedby": dateFormatHintId, type: "text" }, props, { "data-date-part": "date", class: this.classes(props.class, CSS.inputDate), value: this._formatDate(value).date })),
                    widget_1.tsx("div", { class: CSS.dateFormatHint, id: dateFormatHintId }, dateFormatHint)),
                widget_1.tsx("div", { class: CSS.dateInputPart },
                    widget_1.tsx("input", __assign({ "aria-describedby": timeFormatHintId, "aria-label": inputField.label, type: "text" }, props, { "data-date-part": "time", class: this.classes(props.class, CSS.inputTime), value: this._formatDate(value).time })),
                    widget_1.tsx("div", { class: CSS.dateFormatHint, id: timeFormatHintId }, timeFormatHint))));
        };
        FeatureForm.prototype.renderUnsupportedField = function (inputField) {
            var value = this.viewModel.getValue(inputField.name);
            return (widget_1.tsx("input", { class: this.classes(CSS.input, CSS.inputField, CSS.inputDisabled), disabled: true, type: "text", value: "" + value }));
        };
        FeatureForm.prototype.renderSelectInputField = function (value, values, props) {
            var isNotOutlierValue = false;
            var options = values.map(function (v) {
                if (v.value === value) {
                    isNotOutlierValue = true;
                }
                return (widget_1.tsx("option", { value: "" + v.value, key: v.name }, v.name));
            });
            if (value != null && value !== "" && !isNotOutlierValue) {
                // non-matching value
                options.unshift(widget_1.tsx("option", { value: "" + value, key: "outlier-option" }, value));
            }
            var inputField = props["data-field"];
            // only show empty option if existing value not previously set
            if (!inputField.required && inputField.value == null) {
                // "" is treated as null
                options.unshift(widget_1.tsx("option", { value: "", key: "empty-option" }));
            }
            return (widget_1.tsx("select", __assign({}, props, { class: this.classes(props.class, CSS.select), onchange: this._handleOptionChange }), options));
        };
        FeatureForm.prototype.renderAuxiliaryText = function (inputField) {
            if (!inputField.valid) {
                return (widget_1.tsx("div", { key: "error-message" },
                    widget_1.tsx("span", { class: this.classes(CSS.inputIconInvalid, CSS.errorIcon) }),
                    widget_1.tsx("div", { class: CSS.errorMessage }, inputField.errorMessage)));
            }
            if (inputField.valid && inputField.description) {
                return (widget_1.tsx("div", { key: "description", class: CSS.description }, inputField.description));
            }
        };
        // tslint:disable-next-line:typedef
        FeatureForm.prototype.getCommonInputProps = function (inputField) {
            var viewModel = this.viewModel;
            var editable = inputField.editable, name = inputField.name, required = inputField.required, maxLength = inputField.maxLength, hint = inputField.hint, type = inputField.type, valid = inputField.valid;
            var value = viewModel.getValue(name);
            var disabled = !editable;
            return __assign({ afterCreate: this._afterScrollerCreateOrUpdate, afterUpdate: this._afterScrollerCreateOrUpdate, "aria-invalid": valid ? "false" : "true", class: this.classes(CSS.input, CSS.inputField, disabled ? CSS.inputDisabled : null, !valid ? CSS.inputInvalid : null), key: name, maxlength: maxLength > -1 ? "" + maxLength : "" }, this._getNumberFieldConstraints(inputField), { disabled: disabled, value: value == null ? "" : "" + value, "data-field": inputField, onfocus: this._handleInputFocus, onblur: this._handleInputBlur, onkeydown: this._handleInputKeyDown, onmousedown: type === "number" ? this._handleNumberInputMouseDown : null, required: required, title: hint });
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        FeatureForm.prototype._handleNumberInputMouseDown = function (_a) {
            var target = _a.target;
            var input = target;
            if (!input.disabled) {
                // workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=1012818
                input.focus();
            }
            this.scheduleRender();
        };
        FeatureForm.prototype._getNumberFieldConstraints = function (field) {
            var constraints = domains_1.getDomainRange(field.domain) || fieldUtils_1.getFieldRange(field.field);
            if (!constraints ||
                constraints.max === Number.MAX_VALUE ||
                constraints.min === Number.MIN_VALUE) {
                return {
                    min: null,
                    max: null
                };
            }
            return constraints;
        };
        FeatureForm.prototype._afterScrollerCreateOrUpdate = function (node) {
            var inputField = node["data-field"];
            var activeInput = this.viewModel.findField(this._activeInputName);
            var shouldAutoFocusField = inputField.editable && this._fieldFocusNeeded && activeInput === inputField;
            if (shouldAutoFocusField) {
                this._fieldFocusNeeded = false;
                node.focus();
            }
        };
        FeatureForm.prototype._handleInputFocus = function (event) {
            var input = event.target;
            this._activeInputName = input["data-field"].name;
        };
        FeatureForm.prototype._handleInputBlur = function (event) {
            var _a;
            var input = event.target;
            var inputField = input["data-field"];
            var maybeNextInput = event.relatedTarget;
            var nextInputField = maybeNextInput && maybeNextInput["data-field"];
            if (inputField.type === "date") {
                var part = input.getAttribute("data-date-part");
                this._activeDateEdit = __assign({}, this._activeDateEdit, (_a = {}, _a[part] = { value: input.value, input: input }, _a));
            }
            var willEditSameDate = nextInputField &&
                inputField.type === "date" &&
                nextInputField.type === "date" &&
                inputField.field === nextInputField.field;
            if (willEditSameDate) {
                var fillInDate = input.value !== "" && maybeNextInput.value === "";
                if (fillInDate) {
                    var part = maybeNextInput.getAttribute("data-date-part");
                    maybeNextInput.value = this._formatDate(Date.now())[part];
                }
                // hold off on processing date until both parts are blurred
                return;
            }
            this._commitValue(input);
            this.scheduleRender();
        };
        FeatureForm.prototype._commitValue = function (input) {
            var inputField = input["data-field"];
            if (this._activeDateEdit) {
                var _a = this._activeDateEdit, dateEdits = _a.date, timeEdits = _a.time;
                var dateValue = this._getDateEditValue(inputField, "date");
                var timeValue = this._getDateEditValue(inputField, "time");
                var clearDate = dateValue === "" || timeValue === "";
                if (dateEdits) {
                    var input_1 = dateEdits.input;
                    input_1.value = clearDate ? "" : dateValue;
                    this._updateFieldValue(input_1);
                }
                if (timeEdits) {
                    var input_2 = timeEdits.input;
                    input_2.value = clearDate ? "" : timeValue;
                    this._updateFieldValue(input_2);
                }
                this._activeDateEdit = null;
            }
            else {
                this._updateFieldValue(input);
            }
        };
        FeatureForm.prototype._getDateEditValue = function (inputField, part) {
            var edits = this._activeDateEdit[part];
            if (!edits) {
                return;
            }
            var dateValue = edits.value;
            if (dateValue === "") {
                return "";
            }
            var date = this._parseDate(edits.value, part);
            if (!date) {
                // if invalid, use previous value
                return this._formatDate(inputField.value)[part];
            }
            return this._formatDate(date.getTime())[part];
        };
        FeatureForm.prototype._handleInputKeyDown = function (event) {
            var key = event.key, altKey = event.altKey, ctrlKey = event.ctrlKey, metaKey = event.metaKey, shiftKey = event.shiftKey;
            if (key === "Tab") {
                var input = event.target;
                var inputField = input["data-field"];
                var direction = shiftKey ? "backward" : "forward";
                var datePart = input.getAttribute("data-date-part");
                var movingToOtherInputField = !((direction === "backward" && datePart === "time") ||
                    (direction === "forward" && datePart === "date"));
                if (!movingToOtherInputField) {
                    return;
                }
                this._commitValue(input);
                var latestInputField = this.viewModel.findField(inputField.name);
                var nextInputFocusTarget = this._getFocusableInput(direction, latestInputField);
                this._activeInputName = nextInputFocusTarget && nextInputFocusTarget.name;
                if (nextInputFocusTarget) {
                    event.preventDefault();
                    this._fieldFocusNeeded = true;
                }
                else {
                    // ensure to-be-removed fields are removed to lose browser focus
                    this.renderNow();
                }
                return;
            }
            if (key !== "Enter") {
                var input = event.target;
                var inputField = input["data-field"];
                var type = inputField.field.type;
                var isInt = type === "integer" || type === "small-integer";
                var isFloat = type === "single" || type === "double";
                var noModifiers = !altKey && !ctrlKey && !metaKey;
                var numberInputChar = (isInt || isFloat) && noModifiers && key.length === 1;
                if (numberInputChar) {
                    var keyAsDigit = Number(key);
                    var signs = ["-", "+"];
                    var floatCharExceptions = ["e", "."];
                    var allowedNonNumericChars = isFloat ? signs.concat(floatCharExceptions) : signs;
                    if (isNaN(keyAsDigit) && allowedNonNumericChars.indexOf(key) === -1) {
                        event.preventDefault();
                    }
                }
                return;
            }
            this._updateFieldValue(event.target);
            this.scheduleRender();
        };
        FeatureForm.prototype._updateFieldValue = function (input) {
            var inputField = input["data-field"];
            this.viewModel.setValue(inputField.name, this._parseValue(input));
        };
        FeatureForm.prototype._parseValue = function (input) {
            var inputField = input["data-field"];
            var valueAsText = input.value;
            var required = inputField.required, type = inputField.type;
            if (!required && valueAsText === "") {
                return null;
            }
            if (type === "number") {
                return parseFloat(valueAsText);
            }
            if (type === "date") {
                if (!valueAsText) {
                    return null;
                }
                var part = input.getAttribute("data-date-part");
                // coded-values get passed as numbers
                var utcDate = Number(valueAsText);
                if (!isNaN(utcDate)) {
                    return utcDate;
                }
                var parsed = this._parseDate(valueAsText, part);
                if (!parsed) {
                    return null;
                }
                var latest = moment(parsed);
                var domain = inputField.domain;
                var now = moment();
                var defaultDate = now;
                if (domain && domain.type === "range") {
                    var maxDate = moment(domain.maxValue);
                    if (!now.isAfter(maxDate)) {
                        defaultDate = maxDate;
                    }
                }
                var prevValue = this.viewModel.getValue(inputField.name);
                var prev = moment(prevValue != null ? prevValue : defaultDate);
                if (part === "date") {
                    latest.hour(prev.hour());
                    latest.minutes(prev.minutes());
                    latest.seconds(prev.seconds());
                }
                else {
                    latest.date(prev.date());
                    latest.month(prev.month());
                    latest.year(prev.year());
                }
                return latest.valueOf();
            }
            return valueAsText;
        };
        FeatureForm.prototype._handleOptionChange = function (event) {
            this._updateFieldValue(event.target);
            this.scheduleRender();
        };
        FeatureForm.prototype._handleGroupClick = function (event) {
            var fieldSet = event.currentTarget;
            var ariaExpanded = fieldSet.getAttribute("aria-expanded");
            // ignore clicks if group is not collapsible or already expanded
            if (ariaExpanded !== "false") {
                return;
            }
            var group = fieldSet["data-group"];
            this._activeInputName = group.inputFields[0].name;
            this._fieldFocusNeeded = true;
            this.scheduleRender();
        };
        FeatureForm.prototype._handleSubmit = function (event) {
            event.preventDefault();
        };
        FeatureForm.prototype._handleFormKeyDown = function (event) {
            if (event.key === "Enter") {
                this.viewModel.submit();
            }
        };
        FeatureForm.prototype._formatDate = function (dateUTC) {
            if (dateUTC == null) {
                return { date: "", time: "" };
            }
            var date = new Date(dateUTC);
            return {
                date: locale_1.format(date, __assign({ selector: "date" }, defaultDateFormat)),
                time: locale_1.format(date, __assign({ selector: "time" }, defaultDateFormat))
            };
        };
        FeatureForm.prototype._parseDate = function (dateString, part) {
            if (dateString == null || dateString === "") {
                return null;
            }
            return locale_1.parse(dateString, __assign({ selector: part }, defaultDateFormat));
        };
        __decorate([
            decorators_1.aliasOf("viewModel.feature")
        ], FeatureForm.prototype, "feature", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.fieldConfig")
        ], FeatureForm.prototype, "fieldConfig", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], FeatureForm.prototype, "groupDisplay", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.layer")
        ], FeatureForm.prototype, "layer", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.strict")
        ], FeatureForm.prototype, "strict", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable(["viewModel.inputFields", "viewModel.state"]),
            widget_1.vmEvent(["value-change", "submit"])
        ], FeatureForm.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.getValues")
        ], FeatureForm.prototype, "getValues", null);
        __decorate([
            decorators_1.aliasOf("viewModel.submit")
        ], FeatureForm.prototype, "submit", null);
        FeatureForm = __decorate([
            decorators_1.subclass("esri.widgets.FeatureForm")
        ], FeatureForm);
        return FeatureForm;
    }(decorators_1.declared(Widget)));
    return FeatureForm;
});
//# sourceMappingURL=FeatureForm.js.map