/**
 * The slice widget is a 3D analysis tool that can be used to reveal occluded content in a {@link
 * module:esri/views/SceneView}. The slice widget can be applied to any layer type, making it possible
 * to see inside buildings or to explore geological surfaces.
 *
 * [![slice-widget](../../assets/img/apiref/widgets/slice.gif)](../sample-code/building-scene-layer-slice/index.html)
 *
 * To use the widget, instantiate it and add it to the view:
 * ```js
 * const slice = new Slice({
 *   view: view
 * });
 *
 * // Add widget to the bottom left corner of the view
 * view.ui.add(slice, {
 *   position: "bottom-left"
 * });
 * ```
 * The slicing shape is always a plane. When you click a surface or object in your scene,
 * you create a slice with either a horizontal or vertical plane. The slice hides any
 * content in front of the surface. The handles on the sides
 * of the plane can be used to adjust the size, rotation and position of the slice plane.
 *
 * Once a slice is created, layers can be excluded from the slice. For example, to look at
 * interior elements inside a {@link module:esri/layers/BuildingSceneLayer}, the windows or
 * furniture layers can be excluded from the slice widget.
 *
 * [![slice-widget-exclude](../../assets/img/apiref/widgets/slice-exclude.png)](../sample-code/building-scene-layer-slice/index.html)
 *
 * The visualizations created using slices are temporary and cannot be persisted in a {@link
 * module:esri/WebScene} or in {@link module:esri/webscene/Slide slides}.
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * Slice only works with {@link module:esri/views/SceneView}.
 * :::
 *
 * @module esri/widgets/Slice
 * @since 4.10
 *
 * @see [Slice.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Slice.tsx)
 * @see [Slice.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Slice.scss)
 * @see [Sample - Slice widget](../sample-code/building-scene-layer-slice/index.html)
 * @see module:esri/widgets/Slice/SliceViewModel
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/widgets/Slice/nls/Slice", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/Slice/SliceViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18n, decorators_1, Widget, SliceViewModel, widget_1) {
    "use strict";
    i18n = __importStar(i18n);
    var CSS = {
        // common
        button: "esri-button esri-button--secondary",
        buttonDisabled: "esri-button--disabled",
        layerIncludeButton: "esri-icon-close esri-slice__cross",
        // base
        base: "esri-slice esri-widget esri-widget--panel",
        // container
        layerList: "esri-slice__settings",
        layerListHeading: "esri-slice__settings-title esri-widget__heading",
        layerItem: "esri-slice__layer-item",
        container: "esri-slice__container",
        actionSection: "esri-slice__actions",
        // hint
        hint: "esri-slice__hint",
        hintText: "esri-slice__hint-text",
        panelError: "esri-slice__panel--error",
        // clear
        excludeButton: "esri-slice__exclude-button",
        cancelButton: "esri-slice__cancel-button",
        clearButton: "esri-slice__clear-button"
    };
    var Slice = /** @class */ (function (_super) {
        __extends(Slice, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @alias module:esri/widgets/Slice
         * @extends module:esri/widgets/Widget
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * const slice = new Slice({
         *   view: view
         * });
         */
        function Slice(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  view
            //----------------------------------
            /**
             * A reference to the {@link module:esri/views/SceneView}. Set this to link the widget to a specific view.
             *
             * @name view
             * @instance
             * @type {module:esri/views/SceneView}
             */
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            /**
             * The view model for this widget. This is a class that contains the properties
             * and methods that control this widget's behavior.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/Slice/SliceViewModel}
             * @autocast
             */
            _this.viewModel = new SliceViewModel();
            return _this;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        Slice.prototype.render = function () {
            var _this = this;
            var isSupported = this.viewModel.isSupported;
            var isActive = this.viewModel.active;
            var isDisabled = this.viewModel.state === "disabled";
            var isReady = this.viewModel.state === "ready";
            var isSlicing = this.viewModel.state === "slicing" || this.viewModel.state === "sliced";
            var isExcludeMode = this.layersMode === "exclude";
            var buttonClasses = [CSS.button, isDisabled && CSS.buttonDisabled];
            var newSliceNode = (!isActive || isSlicing) && !isExcludeMode ? (widget_1.tsx("button", { disabled: isDisabled, class: this.classes.apply(this, [CSS.clearButton].concat(buttonClasses)), bind: this, onclick: this._newSlice, key: "esri-slice__clear" }, i18n.newSlice)) : null;
            var excludeLayerNode = isSlicing && !isExcludeMode ? (widget_1.tsx("button", { class: this.classes.apply(this, [CSS.excludeButton].concat(buttonClasses)), bind: this, onclick: function () {
                    _this.viewModel.enterExcludeLayerMode();
                }, key: "esri-slice__exclude" }, i18n.excludeLayer)) : null;
            var cancelExcludeNode = isActive && isExcludeMode ? (widget_1.tsx("button", { class: this.classes.apply(this, [CSS.cancelButton].concat(buttonClasses)), bind: this, onclick: function () {
                    _this.viewModel.exitExcludeLayerMode();
                }, key: "esri-slice__cancel-exclude" }, i18n.cancel)) : null;
            var hintText = null;
            if (isActive) {
                if (isExcludeMode) {
                    hintText = i18n.excludeHint;
                }
                else if (isReady) {
                    hintText = i18n.hint;
                }
            }
            var hintNode = hintText ? (widget_1.tsx("div", { class: CSS.hint, key: "esri-slice__hint" },
                widget_1.tsx("p", { class: CSS.hintText }, hintText))) : null;
            var layerListItemNodes = this.excludedLayers
                ? this.excludedLayers.toArray().map(function (l) { return (widget_1.tsx("li", { class: CSS.layerItem, key: l.uid },
                    widget_1.tsx("a", { href: "", onclick: function () {
                            _this.excludedLayers.remove(l);
                            return false;
                        }, class: CSS.layerIncludeButton, title: i18n.includeLayer }),
                    l.title)); })
                : [];
            if (this.excludeGroundSurface) {
                layerListItemNodes.push(widget_1.tsx("li", { class: CSS.layerItem, key: "ground" },
                    widget_1.tsx("a", { href: "", onclick: function () {
                            _this.excludeGroundSurface = false;
                            return false;
                        }, class: CSS.layerIncludeButton, title: i18n.includeLayer }),
                    i18n.ground));
            }
            var layerListNode = !isExcludeMode && isSlicing && layerListItemNodes.length > 0 ? (widget_1.tsx("div", { class: CSS.layerList, key: "esri-slice__settings" },
                widget_1.tsx("h3", { class: CSS.layerListHeading }, i18n.excludedLayers),
                widget_1.tsx("ul", null, layerListItemNodes))) : null;
            var unsupportedNode = (widget_1.tsx("div", { class: CSS.panelError, key: "esri-slice__unsupported" },
                widget_1.tsx("p", null, i18n.unsupported)));
            var actionNode = (widget_1.tsx("div", { class: CSS.actionSection },
                excludeLayerNode,
                cancelExcludeNode,
                newSliceNode));
            var containerNode = this.visible ? (widget_1.tsx("div", { class: CSS.container }, isSupported ? [hintNode, layerListNode, actionNode] : unsupportedNode)) : null;
            return (widget_1.tsx("div", { class: CSS.base, role: "presentation" }, containerNode));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Slice.prototype._newSlice = function () {
            this.viewModel.newSlice();
        };
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Slice.prototype, "view", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.visible"),
            widget_1.renderable()
        ], Slice.prototype, "visible", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.active"),
            widget_1.renderable()
        ], Slice.prototype, "active", void 0);
        __decorate([
            decorators_1.property({
                type: SliceViewModel
            })
        ], Slice.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.plane"),
            widget_1.renderable()
        ], Slice.prototype, "plane", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.layersMode"),
            widget_1.renderable()
        ], Slice.prototype, "layersMode", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.excludedLayers"),
            widget_1.renderable()
        ], Slice.prototype, "excludedLayers", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.excludeGroundSurface"),
            widget_1.renderable()
        ], Slice.prototype, "excludeGroundSurface", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], Slice.prototype, "_newSlice", null);
        Slice = __decorate([
            decorators_1.subclass("esri.widgets.Slice")
        ], Slice);
        return Slice;
    }(decorators_1.declared(Widget)));
    return Slice;
});
//# sourceMappingURL=Slice.js.map