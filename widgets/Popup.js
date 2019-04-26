/**
 * The popup widget allows users to view content from feature attributes. Popups enhance web applications
 * by providing users with a simple way to interact with and view attributes in a layer.
 * They play an important role in relaying information to the user, which improves the storytelling capabilities of the application.
 *
 * All {@link module:esri/views/View Views} contain a default popup.
 * This popup can display generic content, which is set in its [title](#title)
 * and [content](#content) properties.
 * When  content is set directly on the Popup instance it is not tied to a specific feature or layer.
 *
 * [![popup-basic-example](../../assets/img/apiref/widgets/popup-basic.png)](../sample-code/sandbox/sandbox.html?sample=intro-popup)
 *
 * In the image above, the text "Marriage in NY, Zip Code: 11385" is the popup's `title`. The remaining text is
 * its `content`. A dock button ![popup-dock-btn](../../assets/img/apiref/widgets/popup-dock.png) may also be available in the
 * top right corner of the popup. This allows the user to dock the popup to one of the sides or corners of the view.
 * The options for docking may be set in the [dockOptions](#dockOptions) property.
 *
 * Popups can also contain [actions](#actions) that act like buttons,
 * which execute a function defined by the developer when clicked.
 * By default, every popup has a "Zoom in" action ![popupTemplate-zoom-action](../../assets/img/apiref/widgets/popuptemplate-zoom-action.png)
 * that allows users to zoom to the selected feature. See the [actions](#actions)
 * property for information about adding custom actions to a popup.
 *
 * In most cases this module will not need to be loaded into your application because the view contains a default instance of popup.
 *
 * {@link module:esri/PopupTemplate} is closely related to Popup, but is more specific to {@link module:esri/layers/Layer layers}
 * and {@link module:esri/Graphic graphics}. It allows you to define custom title and content templates based on the source of the
 * [selected feature](#selectedFeature). When a layer or a graphic has a defined
 * PopupTemplate, the popup will display the content
 * defined in the PopupTemplate when the feature is clicked. The content may contain field values from the attributes of the [selected feature](#selectedFeature).
 *
 * Custom PopupTemplates may also be assigned directly to a popup by setting {@link module:esri/Graphic graphics} on the
 * [features](#features) property. For more information about Popup
 * and how it relates to {@link module:esri/PopupTemplate} see the samples listed below.
 *
 * @module esri/widgets/Popup
 * @since 4.0
 *
 * @see [Popup.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Popup.tsx)
 * @see [Popup.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Popup.scss)
 * @see module:esri/PopupTemplate
 * @see {@link module:esri/views/View#popup View.popup}
 * @see [Intro to popups](../sample-code/intro-popup/index.html)
 * @see [Intro to PopupTemplate](../sample-code/intro-popuptemplate/index.html)
 * @see [Sample - Dock positions with popup](../sample-code/popup-docking-position/index.html)
 * @see [Sample - Popup actions](../sample-code/popup-actions/index.html)
 * @see [Sample - Custom popup actions per feature](../sample-code/popup-custom-action/index.html)
 * @see [Sample - Popup with DOM node](../sample-code/popup-domnode/index.html)
 * @see [Guide - Esri Icon Font](../guide/esri-icon-font/index.html)
 * @see module:esri/widgets/Popup/PopupViewModel
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/tsSupport/assignHelper", "esri/core/tsSupport/generatorHelper", "esri/core/tsSupport/awaiterHelper", "dojo/dom-geometry", "dojo/i18n!esri/nls/common", "dojo/i18n!esri/widgets/Popup/nls/Popup", "dojo/keys", "esri/core/Handles", "esri/core/lang", "esri/core/Logger", "esri/core/promiseUtils", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/widgets/Spinner", "esri/widgets/Widget", "esri/widgets/Popup/PopupViewModel", "esri/widgets/support/widget", "esri/widgets/support/widgetUtils"], function (require, exports, __extends, __decorate, __assign, __generator, __awaiter, domGeometry, i18nCommon, i18n, keys_1, Handles, esriLang, Logger, promiseUtils_1, watchUtils, decorators_1, Spinner, Widget, PopupViewModel, widget_1, widgetUtils) {
    "use strict";
    i18nCommon = __importStar(i18nCommon);
    i18n = __importStar(i18n);
    var SELECTED_INDEX_HANDLE_KEY = "selected-index";
    var SPINNER_KEY = "popup-spinner";
    var CSS = {
        // common
        iconLeftTriangleArrow: "esri-icon-left-triangle-arrow",
        iconRightTriangleArrow: "esri-icon-right-triangle-arrow",
        iconDockToTop: "esri-icon-maximize",
        iconDockToBottom: "esri-icon-dock-bottom",
        iconDockToLeft: "esri-icon-dock-left",
        iconDockToRight: "esri-icon-dock-right",
        iconClose: "esri-icon-close",
        iconUndock: "esri-icon-minimize",
        iconCheckMark: "esri-icon-check-mark",
        iconLoading: "esri-icon-loading-indicator",
        iconDefaultAction: "esri-icon-default-action",
        iconActionsMenu: "esri-icon-handle-horizontal",
        rotating: "esri-rotating",
        // base
        base: "esri-popup",
        // containers
        widget: "esri-widget",
        main: "esri-popup__main-container",
        loadingContainer: "esri-popup__loading-container",
        // global modifiers
        isCollapsible: "esri-popup--is-collapsible",
        isCollapsed: "esri-popup--is-collapsed",
        shadow: "esri-popup--shadow",
        isDocked: "esri-popup--is-docked",
        isDockedTopLeft: "esri-popup--is-docked-top-left",
        isDockedTopCenter: "esri-popup--is-docked-top-center",
        isDockedTopRight: "esri-popup--is-docked-top-right",
        isDockedBottomLeft: "esri-popup--is-docked-bottom-left",
        isDockedBottomCenter: "esri-popup--is-docked-bottom-center",
        isDockedBottomRight: "esri-popup--is-docked-bottom-right",
        alignTopCenter: "esri-popup--aligned-top-center",
        alignBottomCenter: "esri-popup--aligned-bottom-center",
        alignTopLeft: "esri-popup--aligned-top-left",
        alignBottomLeft: "esri-popup--aligned-bottom-left",
        alignTopRight: "esri-popup--aligned-top-right",
        alignBottomRight: "esri-popup--aligned-bottom-right",
        isFeatureMenuOpen: "esri-popup--feature-menu-open",
        isActionsMenuOpen: "esri-popup--actions-menu-open",
        hasFeatureUpdated: "esri-popup--feature-updated",
        // header and content
        header: "esri-popup__header",
        headerButtons: "esri-popup__header-buttons",
        headerContainer: "esri-popup__header-container",
        headerContainerButton: "esri-popup__header-container--button",
        headerTitle: "esri-popup__header-title",
        content: "esri-popup__content",
        footer: "esri-popup__footer",
        // buttons
        button: "esri-popup__button",
        buttonDisabled: "esri-popup__button--disabled",
        buttonDock: "esri-popup__button--dock",
        // icons
        icon: "esri-popup__icon",
        iconDock: "esri-popup__icon--dock-icon",
        // actions
        inlineActionsContainer: "esri-popup__inline-actions-container",
        actionsMenuButton: "esri-popup__actions-menu-button",
        actions: "esri-popup__actions",
        action: "esri-popup__action",
        actionImage: "esri-popup__action-image",
        actionText: "esri-popup__action-text",
        actionToggle: "esri-popup__action-toggle",
        actionToggleOn: "esri-popup__action-toggle--on",
        // pointer
        pointer: "esri-popup__pointer",
        pointerDirection: "esri-popup__pointer-direction",
        // navigation
        navigation: "esri-popup__navigation",
        // pagination
        paginationPrevious: "esri-popup__pagination-previous",
        paginationNext: "esri-popup__pagination-next",
        paginationPreviousIconLTR: "esri-popup__pagination-previous-icon",
        paginationPreviousIconRTL: "esri-popup__pagination-previous-icon--rtl",
        paginationNextIconLTR: "esri-popup__pagination-next-icon",
        paginationNextIconRTL: "esri-popup__pagination-next-icon--rtl",
        // feature menu
        featureMenu: "esri-popup__feature-menu",
        featureMenuList: "esri-popup__feature-menu-list",
        featureMenuItem: "esri-popup__feature-menu-item",
        featureMenuViewport: "esri-popup__feature-menu-viewport",
        featureMenuHeader: "esri-popup__feature-menu-header",
        featureMenuNote: "esri-popup__feature-menu-note",
        featureMenuSelected: "esri-popup__feature-menu-item--selected",
        featureMenuButton: "esri-popup__feature-menu-button",
        featureMenuTitle: "esri-popup__feature-menu-title",
        // collapse button
        collapseButton: "esri-popup__collapse-button"
    };
    var DOCK_OPTIONS = {
        buttonEnabled: true,
        position: "auto",
        breakpoint: {
            width: 544
        }
    };
    var WIDGET_KEY_PARTIAL = "esri-popup";
    var ACTIONS_KEY = "actions";
    function buildKey(element, index) {
        if (index === undefined) {
            return WIDGET_KEY_PARTIAL + "__" + element;
        }
        return WIDGET_KEY_PARTIAL + "__" + element + "-" + index;
    }
    function loadFeatureWidget() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, promiseUtils_1.create(function (resolve) {
                        require(["./Feature"], function (FeatureModule) {
                            resolve(FeatureModule);
                        });
                    })];
            });
        });
    }
    /**
     * Fires after the user clicks on an {@link module:esri/support/actions/ActionButton action} or {@link module:esri/support/actions/ActionToggle action toggle} inside a popup. This
     * event may be used to define a custom function to execute when particular
     * actions are clicked. See the example below for details of how this works.
     *
     * @event module:esri/widgets/Popup#trigger-action
     * @property {module:esri/support/actions/ActionButton | module:esri/support/actions/ActionToggle} action - The action clicked by the user. For a description
     * of this object and a specification of its properties, see the [actions](#actions) property of this
     * class.
     *
     * @see [actions](#actions)
     * @example
     * // Defines an action to zoom out from the selected feature
     * var zoomOutAction = {
     *  // This text is displayed as a tooltip
     *  title: "Zoom out",
     *  // The ID used to reference this action in the event handler
     *  id: "zoom-out",
     *  // Sets the icon font used to style the action button
     *  className: "esri-icon-zoom-out-magnifying-glass"
     * };
     * // Adds the custom action to the popup
     * view.popup.actions.push(zoomOutAction);
     *
     * // Fires each time an action is clicked
     * view.popup.on("trigger-action"), function(event){
     *   // If the zoom-out action is clicked, than execute the following code
     *   if(event.action.id === "zoom-out"){
     *     // Zoom out two levels (LODs)
     *     view.goTo({
     *       center: view.center,
     *       zoom: view.zoom - 2
     *     });
     *   }
     * });
     */
    var declaredClass = "esri.widgets.Popup";
    var logger = Logger.getLogger(declaredClass);
    var ACTIONS_SHOW_MENU_THRESHOLD = 2;
    var ACTIONS_HIDE_TEXT_THRESHOLD = 2;
    var Popup = /** @class */ (function (_super) {
        __extends(Popup, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @extends module:esri/widgets/Widget
         * @mixes module:esri/widgets/support/GoTo
         * @mixes module:esri/core/Evented
         * @constructor
         * @alias module:esri/widgets/Popup
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                              that may be passed into the constructor.
         */
        function Popup(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._blurContainer = false;
            _this._containerNode = null;
            _this._mainContainerNode = null;
            _this._featureMenuNode = null;
            _this._actionsMenuNode = null;
            _this._focusContainer = false;
            _this._focusDockButton = false;
            _this._focusFeatureMenuButton = false;
            _this._focusActionsMenuButton = false;
            _this._focusFirstFeature = false;
            _this._focusFirstAction = false;
            _this._handles = new Handles();
            _this._pointerOffsetInPx = 16;
            _this._spinner = null;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  actions
            //----------------------------------
            /**
             * Defines actions that may be executed by clicking the icon
             * or image symbolizing them in the popup. By default, every popup has a `zoom-to`
             * action styled with a magnifying glass icon
             * ![popupTemplate-zoom-action](../../assets/img/apiref/widgets/popuptemplate-zoom-action.png).
             * When this icon is clicked, the view zooms in four LODs and centers on the selected feature.
             *
             * You may override this action by removing it from the `actions` array or by setting the
             * [overwriteActions](esri-PopupTemplate.html#overwriteActions) property to `true` in a
             * {@link module:esri/PopupTemplate}. The order of each action in the popup is the order in which
             * they appear in the array.
             *
             * The [trigger-action](#event:trigger-action) event fires each time an action in the popup is clicked.
             * This event should be used to execute custom code for each action clicked. For example, if you would
             * like to add a `zoom-out` action to the popup that zooms the view out several LODs, you would
             * define the zoom-out code in a separate function. Then you would call the custom `zoom-out` function
             * in the [trigger-action](#event:trigger-action) event handler. See the sample code
             * snippet below for more details on how this works.
             *
             * Actions are defined with the properties listed in the {@link module:esri/support/actions/ActionButton} or {@link module:esri/support/actions/ActionToggle} classes.
             *
             * @name actions
             * @instance
             *
             * @type {module:esri/core/Collection<module:esri/support/actions/ActionButton | module:esri/support/actions/ActionToggle>}
             *
             * @autocast { "value": "Object[]" }
             *
             * @see [Sample - Popup actions](../sample-code/popup-actions/index.html)
             * @see [Sample - Custom popup actions per feature](../sample-code/popup-custom-action/index.html)
             *
             * @example
             * // Defines an action to zoom out from the selected feature
             * var zoomOutAction = {
             *   // This text is displayed as a tooltip
             *   title: "Zoom out",
             *   // The ID by which to reference the action in the event handler
             *   id: "zoom-out",
             *   // Sets the icon font used to style the action button
             *   className: "esri-icon-zoom-out-magnifying-glass"
             * };
             * // Adds the custom action to the popup.
             * view.popup.actions.push(zoomOutAction);
             *
             * // The function to execute when the zoom-out action is clicked
             * function zoomOut() {
             *   // in this case the view zooms out two LODs on each click
             *   view.goTo({
             *     center: view.center,
             *     zoom: view.zoom - 2
             *   });
             * }
             *
             * // This event fires for each click on any action
             * view.popup.on("trigger-action", function(event){
             *   // If the zoom-out action is clicked, fire the zoomOut() function
             *   if(event.action.id === "zoom-out"){
             *     zoomOut();
             *   }
             * });
             */
            _this.actions = null;
            //----------------------------------
            //  actionsMenuEnabled
            //----------------------------------
            /**
             * Indicates whether [actions](#actions) within the popup should display in a menu item.
             *
             * | actionsMenuEnabled = false | actionsMenuEnabled = true |
             * | -------------------------- | ------------------------- |
             * | ![actions49](../../assets/img/guide/whats-new/410/popup-actions-49.png) | ![actions410](../../assets/img/guide/whats-new/410/popup-actions-410.png) |
             *
             * @name actionsMenuEnabled
             * @instance
             * @type {boolean}
             * @default true
             * @since 4.11
             * @see [Sample - Custom popup actions per feature](../sample-code/popup-custom-action/index.html)
             */
            _this.actionsMenuEnabled = true;
            //----------------------------------
            //  alignment
            //----------------------------------
            /**
             * Position of the popup in relation to the selected feature.
             *
             * **Possible Values:** auto | top-center | top-right | bottom-left | bottom-center | bottom-right | Function
             *
             * @name alignment
             * @instance
             * @type {String | Function}
             * @default "auto"
             * @since 4.8
             *
             * @example
             * // The popup will display to the left of the feature
             * view.popup.alignment = "auto";
             */
            _this.alignment = "auto";
            //----------------------------------
            //  autoCloseEnabled
            //----------------------------------
            /**
             *
             * This closes the popup when the {@link module:esri/views/View} camera or {@link module:esri/Viewpoint} changes.
             *
             * @since 4.5
             * @name autoCloseEnabled
             * @instance
             *
             * @type {boolean}
             * @default false
             */
            _this.autoCloseEnabled = null;
            //----------------------------------
            //  autoOpenEnabled
            //----------------------------------
            /**
             * This property indicates to the `Popup` that it needs to allow or disallow the click
             * event propagation.
             *
             * Use `view.popup.autoOpenEnabled = false;` when needing to stop the click event propagation.
             *
             * @instance
             * @name autoOpenEnabled
             * @type {boolean}
             * @default true
             * @since 4.10
             *
             * @example
             * view.popup.autoOpenEnabled = false;
             * view.on("click", function(event) {
             *   view.popup.open({
             *     // Set the popup
             *   });
             * });
             */
            _this.autoOpenEnabled = null;
            //----------------------------------
            //  defaultPopupTemplateEnabled
            //----------------------------------
            /**
             * Enables automatic creation of a popup template for layers that have popups enabled but no
             * popupTemplate defined. Automatic popup templates are supported for layers that
             * support the `createPopupTemplate` method. (Supported for {@link module:esri/layers/FeatureLayer},
             * {@link module:esri/layers/SceneLayer}, {@link module:esri/layers/CSVLayer},
             * {@link module:esri/layers/StreamLayer} and {@link module:esri/layers/ImageryLayer}).
             *
             * @instance
             * @name defaultPopupTemplateEnabled
             * @type {boolean}
             * @default false
             * @since 4.11
             */
            _this.defaultPopupTemplateEnabled = null;
            //----------------------------------
            //  content
            //----------------------------------
            /**
             * The content of the popup. When set directly on the Popup, this content is
             * static and cannot use fields to set content templates. To set a template
             * for the content based on field or attribute names, see
             * {@link module:esri/PopupTemplate#content PopupTemplate.content}.
             *
             * @name content
             * @instance
             *
             * @type {string | HTMLElement | module:esri/widgets/Widget}
             * @see [Sample - Popup Docking](../sample-code/popup-docking-position/index.html)
             * @see [Sample - Popup with DOM node](../sample-code/popup-domnode/index.html)
             *
             * @example
             * // This sets generic instructions in the popup that will always be displayed
             * // unless it is overridden by a PopupTemplate
             * view.popup.content = "Click a feature on the map to view its attributes";
             */
            _this.content = null;
            //----------------------------------
            //  collapsed
            //----------------------------------
            /**
             *
             * Indicates whether the popup displays its content. If `true`, only the header displays.
             *
             * @name collapsed
             * @instance
             * @type {boolean}
             * @since 4.5
             * @default false
             */
            _this.collapsed = false;
            //----------------------------------
            //  collapseEnabled
            //----------------------------------
            /**
             *
             * Indicates whether to enable collapse functionality for the popup.
             *
             * @name collapseEnabled
             * @instance
             * @type {boolean}
             * @default true
             */
            _this.collapseEnabled = true;
            //----------------------------------
            //  dockEnabled
            //----------------------------------
            /**
             * Indicates whether the placement of the popup is docked to the side of the view.
             *
             * Docking the popup allows for a better user experience, particularly when opening
             * popups in apps on mobile devices. When a popup is "dockEnabled" it means the popup no
             * longer points to the [selected feature](#selectedFeature) or the [location](#location)
             * assigned to it. Rather it is attached to a side, the top, or the bottom of the view.
             *
             * See [dockOptions](#dockOptions) to override default options related to docking the popup.
             *
             * @name dockEnabled
             * @instance
             *
             * @type {Boolean}
             * @default false
             * @see [Sample - Popup docking](../sample-code/popup-docking-position/index.html)
             *
             * @example
             * // The popup will automatically be dockEnabled when made visible
             * view.popup.dockEnabled = true;
             */
            _this.dockEnabled = false;
            //----------------------------------
            //  featureCount
            //----------------------------------
            /**
             * The number of selected [features](#features) available to the popup.
             *
             * @name featureCount
             * @instance
             *
             * @type {Number}
             * @default 0
             * @readonly
             */
            _this.featureCount = null;
            //----------------------------------
            //  features
            //----------------------------------
            /**
             * An array of features associated with the popup. Each graphic in this array must
             * have a valid {@link module:esri/PopupTemplate} set. They may share the same
             * {@link module:esri/PopupTemplate} or have unique
             * {@link module:esri/PopupTemplate PopupTemplates} depending on their attributes.
             * The [content](#content) and [title](#title)
             * of the popup is set based on the `content` and `title` properties of each graphic's respective
             * {@link module:esri/PopupTemplate}.
             *
             * When more than one graphic exists in this array, the current content of the
             * Popup is set based on the value of the [selected feature](#selectedFeature).
             *
             * This value is `null` if no features are associated with the popup.
             *
             * @name features
             * @instance
             *
             * @type {module:esri/Graphic[]}
             *
             * @example
             * // When setting the features property, the graphics pushed to this property
             * // must have a PopupTemplate set.
             * var g1 = new Graphic();
             * g1.popupTemplate = new PopupTemplate({
             *   title: "Results title",
             *   content: "Results: {ATTRIBUTE_NAME}"
             * });
             * // Set the graphics as an array to the popup instance. The content and title of
             * // the popup will be set depending on the PopupTemplate of the graphics.
             * // Each graphic may share the same PopupTemplate or have a unique PopupTemplate
             * var graphics = [g1, g2, g3, g4, g5];
             * view.popup.features = graphics;
             */
            _this.features = null;
            //----------------------------------
            //  featureNavigationEnabled
            //----------------------------------
            /**
             * Shows pagination for the popup if available. This allows the user to
             * scroll through various [selected features](#features) using either
             * arrows
             *
             * ![popup-pagination-arrows](../../assets/img/apiref/widgets/popup-pagination-arrows.png)
             *
             * or a menu.
             *
             * ![popup-feature-menu](../../assets/img/apiref/widgets/popup-pagination-menu.png)
             *
             * @name featureNavigationEnabled
             * @instance
             * @type {Boolean}
             * @default
             */
            _this.featureNavigationEnabled = true;
            //----------------------------------
            //  goToOverride
            //----------------------------------
            _this.goToOverride = null;
            //----------------------------------
            //  highlightEnabled
            //----------------------------------
            /**
             * Highlight the selected popup feature using the {@link module:esri/views/MapView#highlightOptions highlightOptions}
             * set on the {@link module:esri/views/MapView} or the {@link module:esri/views/SceneView#highlightOptions highlightOptions}
             * set on the {@link module:esri/views/SceneView}.
             *
             * @name highlightEnabled
             * @instance
             *
             * @type {Boolean}
             * @default true
             */
            _this.highlightEnabled = null;
            //----------------------------------
            //  location
            //----------------------------------
            /**
             * Point used to position the popup. This is automatically set when viewing the
             * popup by selecting a feature. If using the Popup to display content not related
             * to features in the map, such as the results from a task, then you must set this
             * property before making the popup [visible](#visible) to the user.
             *
             * @name location
             * @instance
             *
             * @type {module:esri/geometry/Point}
             * @autocast
             *
             * @see [Intro to popups](../sample-code/intro-popup/index.html)
             *
             * @example
             * // Sets the location of the popup to the center of the view
             * view.popup.location = view.center;
             * // Displays the popup
             * view.popup.visible = true;
             *
             * @example
             * // Sets the location of the popup to a specific place (using autocast)
             * // Note: using latlong only works if view is in Web Mercator or WGS84 spatial reference.
             * view.popup.location = {latitude: 34.0571, longitude: -117.1968};
             *
             * @example
             * // Sets the location of the popup to the location of a click on the view
             * view.on("click", function(event){
             *   view.popup.location = event.mapPoint;
             *   // Displays the popup
             *   view.popup.visible = true;
             * });
             */
            _this.location = null;
            //----------------------------------
            //  featureWidgets
            //----------------------------------
            /**
             * @private
             */
            _this.featureWidgets = [];
            //----------------------------------
            //  promises
            //----------------------------------
            /**
             * An array of pending Promises that have not yet been fulfilled. If there are
             * no pending promises, the value is `null`. When the pending promises are
             * resolved they are removed from this array and the features they return
             * are pushed into the [features](#features) array.
             *
             * @name promises
             * @instance
             *
             * @type {Promise[]}
             */
            _this.promises = null;
            //----------------------------------
            //  selectedFeature
            //----------------------------------
            /**
             * The selected feature accessed by the popup. The content of the Popup is
             * determined based on the {@link module:esri/PopupTemplate} assigned to
             * this feature.
             *
             * @name selectedFeature
             * @instance
             *
             * @type {module:esri/Graphic}
             * @readonly
             */
            _this.selectedFeature = null;
            //----------------------------------
            //  selectedFeatureIndex
            //----------------------------------
            /**
             * Index of the feature that is [selected](#selectedFeature). When [features](#features) are set,
             * the first index is automatically selected.
             *
             * @name selectedFeatureIndex
             * @instance
             *
             * @type {Number}
             */
            _this.selectedFeatureIndex = null;
            //----------------------------------
            //  selectedFeatureWidget
            //----------------------------------
            /**
             * @todo document
             */
            _this.selectedFeatureWidget = null;
            //----------------------------------
            //  spinnerEnabled
            //----------------------------------
            /**
             * Indicates whether to display a spinner at the popup location prior to its
             * display when it has pending promises.
             *
             * @name spinnerEnabled
             * @instance
             * @type {boolean}
             * @default
             */
            _this.spinnerEnabled = true;
            //----------------------------------
            //  title
            //----------------------------------
            /**
             * The title of the popup. This can be set generically on the popup no
             * matter the features that are selected. If the [selected feature](#selectedFeature)
             * has a {@link module:esri/PopupTemplate}, then the title set in the
             * corresponding template is used here.
             *
             * @name title
             * @instance
             *
             * @type {String}
             *
             * @example
             * // This title will display in the popup unless a selected feature's
             * // PopupTemplate overrides it
             * view.popup.title = "Population by zip codes in Southern California";
             */
            _this.title = null;
            //----------------------------------
            //  updateLocationEnabled
            //----------------------------------
            /**
             * @todo document
             */
            _this.updateLocationEnabled = null;
            //----------------------------------
            //  view
            //----------------------------------
            /**
             * A reference to the {@link module:esri/views/MapView} or {@link module:esri/views/SceneView}. Set this to link the widget to a specific view.
             *
             * @name view
             * @instance
             *
             * @type {module:esri/views/MapView | module:esri/views/SceneView}
             */
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            /**
             * This is a class that contains all the logic
             * (properties and methods) that controls this widget's behavior. See the
             * {@link module:esri/widgets/Popup/PopupViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/Popup/PopupViewModel}
             * @autocast
             */
            _this.viewModel = new PopupViewModel();
            //----------------------------------
            //  visible
            //----------------------------------
            /**
             * Indicates whether the popup is visible.
             *
             * @name visible
             * @instance
             * @type {boolean}
             */
            _this.visible = null;
            _this._addSelectedFeatureIndexHandle();
            _this.own([
                watchUtils.watch(_this, "viewModel.screenLocation", function () {
                    return _this._positionContainer();
                }),
                watchUtils.watch(_this, ["viewModel.visible", "dockEnabled"], function () {
                    return _this._toggleScreenLocationEnabled();
                }),
                watchUtils.watch(_this, "viewModel.screenLocation", function (newValue, oldValue) {
                    if (!!newValue !== !!oldValue) {
                        _this.reposition();
                    }
                }),
                watchUtils.watch(_this, "viewModel.features", function () { return _this._updateFeatureWidgets(); }),
                watchUtils.watch(_this, [
                    "viewModel.view.padding",
                    "viewModel.view.size",
                    "viewModel.visible",
                    "viewModel.waitingForResult",
                    "viewModel.location",
                    "alignment"
                ], function () { return _this.reposition(); }),
                watchUtils.watch(_this, "spinnerEnabled", function (value) {
                    return _this._spinnerEnabledChange(value);
                }),
                watchUtils.watch(_this, "viewModel.view.size", function (newSize, oldSize) {
                    return _this._updateDockEnabledForViewSize(newSize, oldSize);
                }),
                watchUtils.watch(_this, "viewModel.view", function (newView, oldView) {
                    return _this._viewChange(newView, oldView);
                }),
                watchUtils.watch(_this, "viewModel.view.ready", function (isReady, wasReady) {
                    return _this._viewReadyChange(isReady, wasReady);
                }),
                watchUtils.watch(_this, ["viewModel.waitingForResult", "viewModel.location"], function () {
                    return _this._displaySpinner();
                }),
                watchUtils.watch(_this, ["featureWidgets", "viewModel.selectedFeatureIndex"], function () {
                    return _this._updateFeatureWidget();
                }),
                watchUtils.watch(_this, "selectedFeatureWidget.viewModel.title", function (title) {
                    return _this._setTitleFromFeatureWidget(title);
                }),
                watchUtils.watch(_this, [
                    "selectedFeatureWidget.viewModel.content",
                    "selectedFeatureWidget.viewModel.waitingForContent"
                ], function () { return _this._setContentFromFeatureWidget(); }),
                watchUtils.whenFalse(_this, "collapsed", function () {
                    if (_this.get("viewModel.view.widthBreakpoint") !== "xsmall" ||
                        !_this.visible ||
                        !_this.collapseEnabled) {
                        return;
                    }
                    _this.viewModel.centerAtLocation();
                })
            ]);
            return _this;
        }
        Popup.prototype.destroy = function () {
            this._destroyFeatureWidgets();
            this._destroySpinner();
            this._handles && this._handles.destroy();
            this._handles = null;
            this.viewModel = null;
        };
        Object.defineProperty(Popup.prototype, "actionsMenuOpen", {
            get: function () {
                return this.viewModel.visible && this.actionsMenuEnabled ? this._get("actionsMenuOpen") : false;
            },
            //----------------------------------
            //  actionsMenuOpen
            //----------------------------------
            /**
             * @todo document
             */
            set: function (value) {
                this._set("actionsMenuOpen", !!value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Popup.prototype, "currentAlignment", {
            //----------------------------------
            //  currentAlignment
            //----------------------------------
            /**
             *
             * **Possible Values:**  auto | top-center | top-right | top-left | bottom-left | bottom-center | bottom-right
             *
             * @type {string}
             * @default
             * @ignore
             */
            get: function () {
                return this._getCurrentAlignment();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Popup.prototype, "currentDockPosition", {
            //----------------------------------
            //  currentDockPosition
            //----------------------------------
            /**
             * Dock position in the {@link module:esri/views/View}.
             *
             * **Possible Values:** top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
             *
             * @type {string}
             * @instance
             * @name currentDockPosition
             * @readonly
             */
            get: function () {
                return this._getCurrentDockPosition();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Popup.prototype, "dockOptions", {
            //----------------------------------
            //  dockOptions
            //----------------------------------
            /**
             * Docking the popup allows for a better user experience, particularly when opening
             * popups in apps on mobile devices. When a popup is "dockEnabled" it means the popup no
             * longer points to the [selected feature](#selectedFeature) or the [location](#location)
             * assigned to it. Rather it is placed in one of the corners of the view or to the top or bottom
             * of it. This property allows the developer to set various options for docking the popup.
             *
             * See the object specification table below to override default docking properties on the popup.
             *
             * @type {Object}
             * @instance
             * @name dockOptions
             * @see [Sample - Popup docking](../sample-code/popup-docking-position/index.html)
             *
             * @property {Object | boolean} [breakpoint=true] - Defines the dimensions of the {@link module:esri/views/View}
             *                        at which to dock the popup. Set to `false` to disable docking at a breakpoint.
             * @property {number} [breakpoint.width=544] - The maximum width of the {@link module:esri/views/View}
             *                        at which the popup will be set to dockEnabled automatically.
             * @property {number} [breakpoint.height=544] - The maximum height of the {@link module:esri/views/View}
             *                        at which the popup will be set to dockEnabled automatically.
             * @property {boolean} [buttonEnabled] - If `true`, displays the dock button. If `false`, hides the dock
             *                         button from the popup.
             * @property {string | function} [position=auto] - The position in the view at which to dock the popup.
             *                        Can be set as either a string or function. See the table below for known
             *                        string values and their position in the view based on the view's size.
             *                        <br><br>
             * Known Value | View size > breakpoint | View size < breakpoint
             * --------------- | ------------------------------- | -------------
             * auto | top-right | bottom 100%
             * top-left | top-left | top 100%
             * top-center | top-center | top 100%
             * top-right | top-right | top 100%
             * bottom-left | bottom-left | bottom 100%
             * bottom-center | bottom-center | bottom 100%
             * bottom-right | bottom-right | bottom 100%
             *
             * @example
             * view.popup.dockOptions = {
             *   // Disable the dock button so users cannot undock the popup
             *   buttonEnabled: false,
             *   // Dock the popup when the size of the view is less than or equal to 600x1000 pixels
             *   breakpoint: {
             *     width: 600,
             *     height: 1000
             *   }
             * };
             */
            get: function () {
                return this._get("dockOptions") || DOCK_OPTIONS;
            },
            set: function (dockOptions) {
                var dockOptionDefaults = __assign({}, DOCK_OPTIONS);
                var breakpoints = this.get("viewModel.view.breakpoints");
                var viewDockSize = {};
                if (breakpoints) {
                    viewDockSize.width = breakpoints.xsmall;
                    viewDockSize.height = breakpoints.xsmall;
                }
                var dockOptionsMixin = __assign({}, dockOptionDefaults, dockOptions);
                var breakpointDefaults = __assign({}, dockOptionDefaults.breakpoint, viewDockSize);
                var breakpoint = dockOptionsMixin.breakpoint;
                if (breakpoint === true) {
                    dockOptionsMixin.breakpoint = breakpointDefaults;
                }
                else if (typeof breakpoint === "object") {
                    dockOptionsMixin.breakpoint = __assign({}, breakpointDefaults, breakpoint);
                }
                this._set("dockOptions", dockOptionsMixin);
                this._setCurrentDockPosition();
                this.reposition();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Popup.prototype, "featureMenuOpen", {
            get: function () {
                return this.viewModel.visible ? this._get("featureMenuOpen") : false;
            },
            //----------------------------------
            //  featureMenuOpen
            //----------------------------------
            /**
             * @todo document
             */
            set: function (value) {
                this._set("featureMenuOpen", !!value);
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
         * Use this method to remove focus from the Widget.
         *
         * @method
         * @since 4.6
         *
         */
        Popup.prototype.blur = function () {
            var visible = this.visible;
            if (!visible) {
                logger.warn("Popup cannot be blurred while visible is false");
            }
            this._blurContainer = true;
            this.scheduleRender();
        };
        /**
         * Removes [promises](#promises), [features](#features), [content](#content),
         * [title](#title) and [location](#location) from the Popup.
         *
         * @method
         */
        Popup.prototype.clear = function () { };
        /**
         * Closes the popup by setting its [visible](#visible) property to `false`. Users can
         * alternatively close the popup
         * by directly setting the [visible](#visible) property to `false`.
         *
         * @see [Popup.visible](#visible)
         */
        Popup.prototype.close = function () {
            this.visible = false;
        };
        /**
         * Use this method to give focus to the Widget if the widget is able to be focused.
         *
         * @method
         * @since 4.6
         *
         */
        Popup.prototype.focus = function () {
            var visible = this.visible;
            if (!visible) {
                logger.warn("Popup cannot be focused while visible is false");
            }
            this._focusContainer = true;
            this.scheduleRender();
        };
        /**
         * Selects the feature at the next index in relation to the selected feature.
         *
         * @method
         *
         * @see [selectedFeatureIndex](#selectedFeatureIndex)
         *
         * @return {module:esri/widgets/Popup/PopupViewModel} Returns an instance of the popup's view model.
         */
        Popup.prototype.next = function () {
            return null;
        };
        /**
         * Opens the popup at the given location with content defined either explicitly with `content`
         * or driven from the {@link module:esri/PopupTemplate} of input features. This method sets
         * the popup's [visible](#visible) property to `true`. Users can alternatively open the popup
         * by directly setting the [visible](#visible) property to `true`. The popup will only display if
         * the view's size constraints in [dockOptions](#dockOptions) are met or the [location](#location)
         * property is set to a geometry.
         *
         * @see [Intro to popups](../sample-code/intro-popup/index.html)
         * @see [Popup.visible](#visible)
         * @see [Sample - QueryTask](../sample-code/tasks-query/index.html)
         * @see [Sample - Popup with DOM node](../sample-code/popup-domnode/index.html)
         *
         * @param {Object} [options] - Defines the location and content of the popup when opened.
         * @param {string} [options.title] - Sets the [title](#title) of the popup.
         * @param {string | HTMLElement | module:esri/widgets/Widget} [options.content] - Sets the the [content](#content) of the popup.
         * @param {module:esri/geometry/Geometry} [options.location] - Sets the popup's [location](#location), which is the geometry used to position the popup.
         * @param {module:esri/Graphic[]} [options.features] - Sets the popup's [features](#features), which populate the title and content of the popup based on each graphic's {@link module:esri/PopupTemplate}.
         * @param {Promise[]} [options.promises] - Sets pending [promises](#promises) on the popup. The popup will display once the promises resolve. Each promise must resolve to an array of {@link module:esri/Graphic Graphics}.
         * @param {boolean} [options.featureMenuOpen=false] - **Since:** 4.5 <br> This property enables multiple features in a popup to display in a list rather than displaying the first selected feature. Setting this to `true`
         * allows the user to scroll through the list of features returned from the query and choose the selection they want to display within the popup.
         * @param {boolean} [options.updateLocationEnabled=false] - When `true` indicates the popup should update its [location](#location) for each paginated feature based on the [selected feature's](#selectedFeature) geometry.
         * @param {boolean} [options.collapsed=false] - **Since:** 4.5 <br> When `true`, indicates that only the popup header will display.
         *
         * @example
         * view.on("click", function(event){
         *   view.popup.open({
         *    location: event.mapPoint,  // location of the click on the view
         *    title: "You clicked here",  // title displayed in the popup
         *    content: "This is a point of interest"  // content displayed in the popup
         *   });
         * });
         *
         * @example
         * view.popup.open({
         *   title: "You clicked here",  // title displayed in the popup
         *   content: "This is a point of interest",  // content displayed in the popup
         *   updateLocationEnabled: true  // updates the location of popup based on
         *   // selected feature's geometry
         * });
         *
         * @example
         * view.popup.open({
         *   features: graphics,  // array of graphics
         *   featureMenuOpen: true, // selected features initially display in a list
         * });
         *
         */
        Popup.prototype.open = function (options) {
            this._handles.remove(SELECTED_INDEX_HANDLE_KEY);
            var featureMenuOpen = options ? !!options.featureMenuOpen : false;
            var actionsMenuOpen = options ? !!options.actionsMenuOpen : false;
            var collapsed = options ? !!options.collapsed : false;
            var setOptions = {
                collapsed: collapsed,
                actionsMenuOpen: actionsMenuOpen,
                featureMenuOpen: featureMenuOpen
            };
            if (this.get("viewModel.view.widthBreakpoint") === "xsmall") {
                setOptions.collapsed = true;
                options.updateLocationEnabled = true;
            }
            this.set(setOptions);
            this.viewModel.open(options);
            this._addSelectedFeatureIndexHandle();
        };
        /**
         * Selects the feature at the previous index in relation to the selected feature.
         *
         * @method
         *
         * @see [selectedFeatureIndex](#selectedFeatureIndex)
         *
         * @return {module:esri/widgets/Popup/PopupViewModel} Returns an instance of the popup's view model.
         */
        Popup.prototype.previous = function () {
            return null;
        };
        /**
         * Positions the popup on the view.
         * Moves the popup into the view's extent if the popup is partially or fully outside
         * the view's extent.
         *
         * If the popup is partially out of view, the view will move to fully show the popup.
         * If the popup is fully out of view, the view will move to the popup's location.
         */
        Popup.prototype.reposition = function () {
            this.renderNow();
            this._positionContainer();
            this._setCurrentAlignment();
        };
        /**
         * Triggers the [trigger-action](#event:trigger-action) event and executes the [action](#actions)
         * at the specified index in the [actions](#actions) array.
         *
         * @param {number} actionIndex - The index of the [action](#actions) to execute.
         *
         * @method
         */
        Popup.prototype.triggerAction = function (actionIndex) {
            return null;
        };
        Popup.prototype.render = function () {
            var _this = this;
            var _a, _b, _c, _d, _e, _f;
            var _g = this, actionsMenuOpen = _g.actionsMenuOpen, collapsed = _g.collapsed, collapseEnabled = _g.collapseEnabled, dockEnabled = _g.dockEnabled, featureMenuOpen = _g.featureMenuOpen, featureNavigationEnabled = _g.featureNavigationEnabled, featureWidgets = _g.featureWidgets, visible = _g.visible, actionsMenuEnabled = _g.actionsMenuEnabled;
            var _h = this.viewModel, allActions = _h.allActions, content = _h.content, featureCount = _h.featureCount, pendingPromisesCount = _h.pendingPromisesCount, selectedFeatureIndex = _h.selectedFeatureIndex, title = _h.title;
            var actionsCount = allActions && allActions.length;
            var featureNavigationVisible = featureCount > 1 && featureNavigationEnabled;
            var isFeatureMenuOpen = featureCount > 1 && featureMenuOpen;
            var isActionsMenuOpen = actionsCount > 1 && actionsMenuOpen;
            var pageText = featureNavigationVisible && this._getPageText(featureCount, selectedFeatureIndex);
            var contentNode = this._renderContent();
            var isRtl = widgetUtils.isRTL();
            var hasContent = !!(this.get("selectedFeatureWidget")
                ? this.get("selectedFeatureWidget.viewModel.waitingForContent") ||
                    this.get("selectedFeatureWidget.viewModel.content")
                : contentNode);
            var canBeCollapsed = !!(collapseEnabled && title && hasContent);
            var contentCollapsed = canBeCollapsed && !isFeatureMenuOpen && collapsed;
            var widthBreakpoint = this.get("viewModel.view.widthBreakpoint");
            var dockTitle = dockEnabled ? i18n.undock : i18n.dock;
            var _j = this, currentAlignment = _j.currentAlignment, currentDockPosition = _j.currentDockPosition;
            var loadingContainerNode = !!pendingPromisesCount ? (widget_1.tsx("div", { key: buildKey("loading-container"), role: "presentation", class: CSS.loadingContainer, "aria-label": i18nCommon.loading, title: i18nCommon.loading },
                widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.icon, CSS.iconLoading, CSS.rotating) }))) : null;
            var previousIconClasses = (_a = {},
                _a[CSS.iconRightTriangleArrow] = isRtl,
                _a[CSS.paginationPreviousIconRTL] = isRtl,
                _a[CSS.iconLeftTriangleArrow] = !isRtl,
                _a[CSS.paginationPreviousIconLTR] = !isRtl,
                _a);
            var previousIconNode = (widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.icon, previousIconClasses) }));
            var paginationPreviousButtonNode = (widget_1.tsx("div", { role: "button", tabIndex: 0, bind: this, onclick: this._previous, onkeydown: this._previous, class: this.classes(CSS.button, CSS.paginationPrevious), "aria-label": i18n.previous, title: i18n.previous }, previousIconNode));
            var nextIconClasses = (_b = {},
                _b[CSS.iconLeftTriangleArrow] = isRtl,
                _b[CSS.paginationNextIconRTL] = isRtl,
                _b[CSS.iconRightTriangleArrow] = !isRtl,
                _b[CSS.paginationNextIconLTR] = !isRtl,
                _b);
            var nextIconNode = (widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.icon, nextIconClasses) }));
            var paginationNextButtonNode = (widget_1.tsx("div", { role: "button", tabIndex: 0, bind: this, onclick: this._next, onkeydown: this._next, class: this.classes(CSS.button, CSS.paginationNext), "aria-label": i18n.next, title: i18n.next }, nextIconNode));
            var featureUpdatedAnim = widgetUtils.cssTransition("enter", CSS.hasFeatureUpdated);
            var featureMenuId = this.id + "-feature-menu";
            var featureMenuToggleNode = (widget_1.tsx("div", { role: "button", tabIndex: 0, bind: this, onclick: this._toggleFeatureMenu, onkeydown: this._toggleFeatureMenu, afterCreate: this._focusFeatureMenuButtonNode, afterUpdate: this._focusFeatureMenuButtonNode, class: this.classes(CSS.button, CSS.featureMenuButton), "aria-haspopup": "true", "aria-controls": featureMenuId, "aria-expanded": featureMenuOpen, "aria-label": i18nCommon.menu, title: i18nCommon.menu }, pageText));
            var navigationButtonsNode = featureNavigationVisible
                ? [
                    paginationPreviousButtonNode,
                    loadingContainerNode || featureMenuToggleNode,
                    paginationNextButtonNode
                ]
                : null;
            var wouldDockTo = this._wouldDockTo();
            var dockIconClasses = (_c = {},
                _c[CSS.iconUndock] = dockEnabled,
                _c[CSS.iconDock] = !dockEnabled,
                _c[CSS.iconDockToRight] = !dockEnabled && (wouldDockTo === "top-right" || wouldDockTo === "bottom-right"),
                _c[CSS.iconDockToLeft] = !dockEnabled && (wouldDockTo === "top-left" || wouldDockTo === "bottom-left"),
                _c[CSS.iconDockToTop] = !dockEnabled && wouldDockTo === "top-center",
                _c[CSS.iconDockToBottom] = !dockEnabled && wouldDockTo === "bottom-center",
                _c);
            var dockIconNode = (widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(dockIconClasses, CSS.icon) }));
            var dockButtonNode = widthBreakpoint !== "xsmall" && this.get("dockOptions.buttonEnabled") ? (widget_1.tsx("div", { role: "button", "aria-label": dockTitle, title: dockTitle, tabIndex: 0, bind: this, onclick: this._toggleDockEnabled, onkeydown: this._toggleDockEnabled, afterCreate: this._focusDockButtonNode, afterUpdate: this._focusDockButtonNode, class: this.classes(CSS.button, CSS.buttonDock) }, dockIconNode)) : null;
            var containerClasses = (_d = {},
                _d[CSS.headerContainerButton] = canBeCollapsed,
                _d);
            var titleRole = canBeCollapsed ? "button" : "heading";
            var titleLabel = canBeCollapsed
                ? contentCollapsed
                    ? i18nCommon.expand
                    : i18nCommon.collapse
                : "";
            var titleId = this.id + "-popup-title";
            var titleNode = title ? (widget_1.tsx("div", { class: this.classes(CSS.headerContainer, containerClasses), key: title, enterAnimation: featureUpdatedAnim, id: titleId, role: titleRole, "aria-label": titleLabel, title: titleLabel, tabIndex: canBeCollapsed ? 0 : -1, bind: this, onclick: this._toggleCollapsed, onkeydown: this._toggleCollapsed },
                widget_1.tsx("h2", { class: CSS.headerTitle, innerHTML: title }))) : null;
            var closeIconNode = widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.icon, CSS.iconClose) });
            var closeButtonNode = (widget_1.tsx("div", { role: "button", tabIndex: 0, bind: this, onclick: this._close, onkeydown: this._close, class: CSS.button, "aria-label": i18nCommon.close, title: i18nCommon.close }, closeIconNode));
            var headerNode = (widget_1.tsx("header", { class: CSS.header },
                titleNode,
                widget_1.tsx("div", { class: CSS.headerButtons },
                    dockButtonNode,
                    closeButtonNode)));
            var contentId = this.id + "-popup-content";
            var contentNodeContainer = !hasContent || (canBeCollapsed && contentCollapsed) ? null : (widget_1.tsx("article", { key: content, enterAnimation: featureUpdatedAnim, id: contentId, class: CSS.content }, contentNode));
            var showButtonsTop = currentAlignment === "bottom-left" ||
                currentAlignment === "bottom-center" ||
                currentAlignment === "bottom-right" ||
                currentDockPosition === "top-left" ||
                currentDockPosition === "top-center" ||
                currentDockPosition === "top-right";
            var showButtonsBottom = currentAlignment === "top-left" ||
                currentAlignment === "top-center" ||
                currentAlignment === "top-right" ||
                currentDockPosition === "bottom-left" ||
                currentDockPosition === "bottom-center" ||
                currentDockPosition === "bottom-right";
            var actionsMenuLabel = actionsMenuOpen ? i18nCommon.close : i18nCommon.open;
            var inlineActions = this._getInlineActions();
            var inlineActionsNodes = inlineActions &&
                inlineActions.toArray().map(function (action, index) {
                    return _this._renderAction({
                        action: action,
                        index: index,
                        key: ACTIONS_KEY,
                        type: "inline",
                        showText: inlineActions.length < ACTIONS_HIDE_TEXT_THRESHOLD
                    });
                });
            var inlineActionsContainer = inlineActionsNodes ? (widget_1.tsx("div", { key: "inline-actions-container", class: CSS.inlineActionsContainer }, inlineActionsNodes)) : null;
            var actionsMenuToggleNode = actionsMenuEnabled && actionsCount && !inlineActionsContainer ? (widget_1.tsx("div", { key: buildKey("actions-menu-button"), class: this.classes(CSS.button, CSS.actionsMenuButton), role: "button", id: this.id + "-actions-menu-button", "aria-haspopup": "true", "aria-controls": actionsMenuOpen ? this.id + "-actions-menu" : null, tabIndex: 0, bind: this, onclick: this._toggleActionsMenu, onkeydown: this._toggleActionsMenu, afterCreate: this._focusActionsMenuButtonNode, afterUpdate: this._focusActionsMenuButtonNode, "aria-label": actionsMenuLabel, title: actionsMenuLabel },
                widget_1.tsx("span", { "aria-hidden": "true", class: CSS.iconActionsMenu }))) : null;
            var navigationNode = featureNavigationVisible ? (widget_1.tsx("section", { key: buildKey("navigation"), class: this.classes(CSS.navigation) }, navigationButtonsNode)) : null;
            var footerNode = featureNavigationVisible || actionsCount ? (widget_1.tsx("div", { key: buildKey("feature-buttons"), class: CSS.footer },
                navigationNode,
                actionsMenuToggleNode,
                inlineActionsContainer)) : null;
            var actionsNode = actionsCount && actionsMenuOpen ? (widget_1.tsx("ul", { id: this.id + "-actions-menu", role: "menu", "aria-labelledby": this.id + "-actions-menu-button", key: buildKey("actions"), class: CSS.actions, bind: this, onkeyup: this._handleActionMenuKeyup, afterCreate: this._actionsMenuNodeUpdated, afterUpdate: this._actionsMenuNodeUpdated }, this._renderActions())) : null;
            var featureMenuNode = this._renderFeatureMenuNode(featureWidgets, selectedFeatureIndex, featureMenuId);
            var infoText = esriLang.substitute({
                total: featureWidgets.length
            }, i18n.selectedFeatures);
            var menuNode = (widget_1.tsx("section", { key: buildKey("menu"), class: CSS.featureMenu },
                widget_1.tsx("h2", { class: CSS.featureMenuHeader }, infoText),
                widget_1.tsx("nav", { class: CSS.featureMenuViewport, afterCreate: this._featureMenuViewportNodeUpdated, afterUpdate: this._featureMenuViewportNodeUpdated }, featureMenuNode)));
            var pointerNode = !dockEnabled ? (widget_1.tsx("div", { key: buildKey("pointer"), class: CSS.pointer, role: "presentation" },
                widget_1.tsx("div", { class: this.classes(CSS.pointerDirection, CSS.shadow) }))) : null;
            var layerTitle = this.get("selectedFeature.layer.title");
            var layerId = this.get("selectedFeature.layer.id");
            var mainContainerClasses = (_e = {},
                _e[CSS.shadow] = dockEnabled,
                _e[CSS.isCollapsible] = canBeCollapsed,
                _e[CSS.isCollapsed] = contentCollapsed,
                _e);
            var baseClasses = (_f = {},
                _f[CSS.alignTopCenter] = visible && currentAlignment === "top-center",
                _f[CSS.alignBottomCenter] = visible && currentAlignment === "bottom-center",
                _f[CSS.alignTopLeft] = visible && currentAlignment === "top-left",
                _f[CSS.alignBottomLeft] = visible && currentAlignment === "bottom-left",
                _f[CSS.alignTopRight] = visible && currentAlignment === "top-right",
                _f[CSS.alignBottomRight] = currentAlignment === "bottom-right",
                _f[CSS.isDocked] = visible && dockEnabled,
                _f[CSS.shadow] = visible && !dockEnabled,
                _f[CSS.isDockedTopLeft] = visible && currentDockPosition === "top-left",
                _f[CSS.isDockedTopCenter] = visible && currentDockPosition === "top-center",
                _f[CSS.isDockedTopRight] = visible && currentDockPosition === "top-right",
                _f[CSS.isDockedBottomLeft] = visible && currentDockPosition === "bottom-left",
                _f[CSS.isDockedBottomCenter] = visible && currentDockPosition === "bottom-center",
                _f[CSS.isDockedBottomRight] = visible && currentDockPosition === "bottom-right",
                _f[CSS.isFeatureMenuOpen] = visible && isFeatureMenuOpen,
                _f[CSS.isActionsMenuOpen] = visible && isActionsMenuOpen,
                _f);
            var menuTopNode = showButtonsTop ? [menuNode, actionsNode] : null;
            var menuBottomNode = showButtonsBottom ? [menuNode, actionsNode] : null;
            var buttonsTopNode = showButtonsTop ? footerNode : null;
            var buttonsBottomNode = showButtonsBottom ? footerNode : null;
            var mainContainerNode = (widget_1.tsx("div", { class: this.classes(CSS.main, CSS.widget, mainContainerClasses), tabIndex: -1, role: "dialog", "aria-labelledby": titleNode ? titleId : "", "aria-describedby": contentNodeContainer ? contentId : "", bind: this, onkeyup: this._handleMainKeyup, afterCreate: this._mainContainerNodeUpdated, afterUpdate: this._mainContainerNodeUpdated },
                buttonsTopNode,
                menuTopNode,
                headerNode,
                contentNodeContainer,
                buttonsBottomNode,
                menuBottomNode));
            return (widget_1.tsx("div", { key: buildKey("base"), class: this.classes(CSS.base, baseClasses), role: "presentation", "data-layer-title": layerTitle, "data-layer-id": layerId, bind: this, afterCreate: this._positionContainer, afterUpdate: this._positionContainer }, visible ? [mainContainerNode, pointerNode] : null));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Popup.prototype._getInlineActions = function () {
            var actionsMenuEnabled = this.actionsMenuEnabled;
            var allActions = this.viewModel.allActions;
            if (actionsMenuEnabled && allActions.length >= ACTIONS_SHOW_MENU_THRESHOLD) {
                return;
            }
            return allActions;
        };
        Popup.prototype._featureMenuOpenChanged = function (value) {
            if (value) {
                this._focusFirstFeature = true;
            }
            else {
                this._focusFeatureMenuButton = true;
            }
        };
        Popup.prototype._actionsMenuOpenChanged = function (value) {
            if (value) {
                this._focusFirstAction = true;
            }
            else {
                this._focusActionsMenuButton = true;
            }
        };
        Popup.prototype._setTitleFromFeatureWidget = function (title) {
            var selectedFeatureWidget = this.selectedFeatureWidget;
            if (selectedFeatureWidget) {
                this.viewModel.title = title || "";
            }
        };
        Popup.prototype._setContentFromFeatureWidget = function () {
            var selectedFeatureWidget = this.selectedFeatureWidget;
            if (selectedFeatureWidget) {
                this.viewModel.content = selectedFeatureWidget;
            }
        };
        Popup.prototype._handleFeatureMenuKeyup = function (event) {
            var keyCode = event.keyCode;
            if (keyCode === keys_1.ESCAPE) {
                event.stopPropagation();
                this._focusFeatureMenuButton = true;
                this.featureMenuOpen = false;
                this.scheduleRender();
            }
        };
        Popup.prototype._handleActionMenuKeyup = function (event) {
            var keyCode = event.keyCode;
            if (keyCode === keys_1.ESCAPE) {
                event.stopPropagation();
                this._focusActionsMenuButton = true;
                this.actionsMenuOpen = false;
                this.scheduleRender();
            }
        };
        Popup.prototype._handleFeatureMenuItemKeyup = function (event) {
            var keyCode = event.keyCode;
            var _featureMenuNode = this._featureMenuNode;
            var node = event.currentTarget;
            var featureIndex = node["data-feature-index"];
            if (!_featureMenuNode) {
                return;
            }
            var items = _featureMenuNode.querySelectorAll("li");
            var count = items.length;
            if (keyCode === keys_1.UP_ARROW) {
                event.stopPropagation();
                var previousIndex = featureIndex - 1;
                var value = (previousIndex + count) % count;
                var previousElement = items[value];
                previousElement.focus();
                return;
            }
            if (keyCode === keys_1.DOWN_ARROW) {
                event.stopPropagation();
                var nextIndex = featureIndex + 1;
                var value = (nextIndex + count) % count;
                var nextElement = items[value];
                nextElement.focus();
                return;
            }
            if (keyCode === keys_1.HOME) {
                event.stopPropagation();
                var firstElement = items[0];
                firstElement.focus();
                return;
            }
            if (keyCode === keys_1.END) {
                event.stopPropagation();
                var lastElement = items[items.length - 1];
                lastElement.focus();
                return;
            }
        };
        Popup.prototype._handleActionMenuItemKeyup = function (event) {
            var keyCode = event.keyCode;
            var _actionsMenuNode = this._actionsMenuNode;
            var node = event.currentTarget;
            var actionIndex = node["data-action-index"];
            if (!_actionsMenuNode) {
                return;
            }
            var items = _actionsMenuNode.querySelectorAll("li");
            var count = items.length;
            if (keyCode === keys_1.UP_ARROW) {
                event.stopPropagation();
                var previousIndex = actionIndex - 1;
                var value = (previousIndex + count) % count;
                var previousElement = items[value];
                previousElement.focus();
                return;
            }
            if (keyCode === keys_1.DOWN_ARROW) {
                event.stopPropagation();
                var nextIndex = actionIndex + 1;
                var value = (nextIndex + count) % count;
                var nextElement = items[value];
                nextElement.focus();
                return;
            }
            if (keyCode === keys_1.HOME) {
                event.stopPropagation();
                var firstElement = items[0];
                firstElement.focus();
                return;
            }
            if (keyCode === keys_1.END) {
                event.stopPropagation();
                var lastElement = items[items.length - 1];
                lastElement.focus();
                return;
            }
        };
        Popup.prototype._handleMainKeyup = function (event) {
            var keyCode = event.keyCode;
            if (keyCode === keys_1.LEFT_ARROW) {
                event.stopPropagation();
                this.previous();
            }
            if (keyCode === keys_1.RIGHT_ARROW) {
                event.stopPropagation();
                this.next();
            }
        };
        Popup.prototype._spinnerEnabledChange = function (spinnerEnabled) {
            this._destroySpinner();
            if (!spinnerEnabled) {
                return;
            }
            var view = this.get("viewModel.view");
            this._createSpinner(view);
        };
        Popup.prototype._displaySpinner = function () {
            var spinner = this._spinner;
            if (!spinner) {
                return;
            }
            var _a = this.viewModel, location = _a.location, waitingForResult = _a.waitingForResult;
            if (waitingForResult) {
                spinner.show({
                    location: location
                });
                return;
            }
            spinner.hide();
        };
        Popup.prototype._getIconStyles = function (subActionImage) {
            return {
                "background-image": subActionImage ? "url(" + subActionImage + ")" : ""
            };
        };
        Popup.prototype._renderAction = function (options) {
            var _this = this;
            var _a, _b;
            var action = options.action, index = options.index, key = options.key, type = options.type, showText = options.showText;
            var actionHandle = watchUtils.watch(action, ["active", "className", "disabled", "id", "title", "image", "visible"], function () { return _this.scheduleRender(); });
            this._handles.add(actionHandle, key);
            var selectedFeatureAttributes = this.get("selectedFeature.attributes");
            var actionTitle = action.title, actionClassName = action.className, actionImage = action.image;
            var actionClass = !actionImage && !actionClassName ? CSS.iconDefaultAction : actionClassName;
            var subActionTitle = actionTitle && selectedFeatureAttributes
                ? esriLang.substitute(selectedFeatureAttributes, actionTitle)
                : actionTitle;
            var subActionClass = actionClass && selectedFeatureAttributes
                ? esriLang.substitute(selectedFeatureAttributes, actionClass)
                : actionClass;
            var subActionImage = actionImage && selectedFeatureAttributes
                ? esriLang.substitute(selectedFeatureAttributes, actionImage)
                : actionImage;
            var iconClasses = (_a = {},
                _a[CSS.iconLoading] = action.active,
                _a[CSS.rotating] = action.active,
                _a[CSS.icon] = !!actionClass,
                _a[CSS.actionImage] = !action.active && !!subActionImage,
                _a);
            if (subActionClass) {
                iconClasses[subActionClass] = !action.active;
            }
            var buttonClasses = (_b = {},
                _b[CSS.action] = action.type !== "toggle",
                _b[CSS.actionToggle] = action.type === "toggle",
                _b[CSS.actionToggleOn] = action.type === "toggle" && action.value,
                _b[CSS.buttonDisabled] = action.disabled,
                _b);
            var textNode = showText ? (widget_1.tsx("span", { key: "text", class: CSS.actionText }, subActionTitle)) : null;
            var iconNode = (widget_1.tsx("span", { key: "icon", "aria-hidden": "true", class: this.classes(CSS.icon, iconClasses), styles: this._getIconStyles(subActionImage) }));
            var actionNodes = [iconNode, textNode];
            var baseNode = type === "menu-item" ? (widget_1.tsx("li", { key: action, role: "menuitem", tabIndex: 0, title: subActionTitle, "aria-label": subActionTitle, class: this.classes(CSS.button, buttonClasses), onkeyup: this._handleActionMenuItemKeyup, bind: this, "data-action-index": index, onclick: this._triggerAction, onkeydown: this._triggerAction }, actionNodes)) : (widget_1.tsx("div", { key: action, role: "button", tabIndex: 0, title: subActionTitle, "aria-label": subActionTitle, class: this.classes(CSS.button, buttonClasses), onkeyup: this._handleActionMenuItemKeyup, bind: this, "data-action-index": index, onclick: this._triggerAction, onkeydown: this._triggerAction }, actionNodes));
            return action.visible ? baseNode : null;
        };
        Popup.prototype._renderActions = function () {
            var _this = this;
            this._handles.remove(ACTIONS_KEY);
            var allActions = this.viewModel.allActions;
            if (!allActions) {
                return;
            }
            var actionNodes = allActions
                .map(function (action, index) {
                return _this._renderAction({ action: action, index: index, key: ACTIONS_KEY, type: "menu-item", showText: true });
            })
                .toArray();
            return actionNodes;
        };
        Popup.prototype._addSelectedFeatureIndexHandle = function () {
            var _this = this;
            var selectedFeatureIndexHandle = watchUtils.watch(this, "viewModel.selectedFeatureIndex", function (value, oldValue) { return _this._selectedFeatureIndexUpdated(value, oldValue); });
            this._handles.add(selectedFeatureIndexHandle, SELECTED_INDEX_HANDLE_KEY);
        };
        Popup.prototype._selectedFeatureIndexUpdated = function (value, oldValue) {
            var featureCount = this.featureCount;
            if (!featureCount || value === oldValue || value === -1) {
                return;
            }
            this.actionsMenuOpen = false;
            this.featureMenuOpen = false;
        };
        Popup.prototype._updateFeatureWidget = function () {
            var featureWidgets = this.featureWidgets;
            var selectedFeatureIndex = this.viewModel.selectedFeatureIndex;
            var selectedFeatureWidget = featureWidgets[selectedFeatureIndex] || null;
            this._set("selectedFeatureWidget", selectedFeatureWidget);
        };
        Popup.prototype._destroyFeatureWidgets = function () {
            this.featureWidgets.forEach(function (featureWidget) { return featureWidget.destroy(); });
            this._set("featureWidgets", []);
        };
        Popup.prototype._updateFeatureWidgets = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, features, featureWidgets, Feature, featureWidgetsCopy, newFeatureWidgets;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this, features = _a.features, featureWidgets = _a.featureWidgets;
                            if (!features || !features.length) {
                                featureWidgets.forEach(function (featureWidget) { return featureWidget.destroy(); });
                                this._set("featureWidgets", []);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, loadFeatureWidget()];
                        case 1:
                            Feature = _b.sent();
                            featureWidgetsCopy = featureWidgets.slice(0);
                            newFeatureWidgets = [];
                            features.forEach(function (feature, featureIndex) {
                                if (!feature) {
                                    return;
                                }
                                var foundWidget = null;
                                featureWidgetsCopy.some(function (featureWidget, featureWidgetIndex) {
                                    if (featureWidget && featureWidget.graphic === feature) {
                                        foundWidget = featureWidget;
                                        featureWidgetsCopy.splice(featureWidgetIndex, 1);
                                    }
                                    return !!foundWidget;
                                });
                                if (foundWidget) {
                                    newFeatureWidgets[featureIndex] = foundWidget;
                                }
                                else {
                                    var featureWidget = new Feature({
                                        defaultPopupTemplateEnabled: _this.defaultPopupTemplateEnabled,
                                        graphic: feature,
                                        spatialReference: _this.get("view.spatialReference"),
                                        map: _this.get("view.map")
                                    });
                                    featureWidget.visibleElements = __assign({}, featureWidget.visibleElements, { title: false });
                                    newFeatureWidgets[featureIndex] = featureWidget;
                                }
                            });
                            featureWidgetsCopy.forEach(function (featureWidget) { return featureWidget && featureWidget.destroy(); });
                            this._set("featureWidgets", newFeatureWidgets);
                            return [2 /*return*/];
                    }
                });
            });
        };
        Popup.prototype._isScreenLocationWithinView = function (screenLocation, view) {
            return (screenLocation.x > -1 &&
                screenLocation.y > -1 &&
                screenLocation.x <= view.width &&
                screenLocation.y <= view.height);
        };
        Popup.prototype._isOutsideView = function (options) {
            var popupHeight = options.popupHeight, popupWidth = options.popupWidth, screenLocation = options.screenLocation, side = options.side, view = options.view;
            if (isNaN(popupWidth) || isNaN(popupHeight) || !view || !screenLocation) {
                return false;
            }
            var padding = view.padding;
            if (side === "right" && screenLocation.x + popupWidth / 2 > view.width - padding.right) {
                return true;
            }
            if (side === "left" && screenLocation.x - popupWidth / 2 < padding.left) {
                return true;
            }
            if (side === "top" && screenLocation.y - popupHeight < padding.top) {
                return true;
            }
            if (side === "bottom" && screenLocation.y + popupHeight > view.height - padding.bottom) {
                return true;
            }
            return false;
        };
        Popup.prototype._determineCurrentAlignment = function () {
            var _a = this, pointerOffset = _a._pointerOffsetInPx, containerNode = _a._containerNode, mainContainerNode = _a._mainContainerNode, viewModel = _a.viewModel;
            var screenLocation = viewModel.screenLocation, view = viewModel.view;
            if (!screenLocation || !view || !containerNode) {
                return "top-center";
            }
            if (!this._isScreenLocationWithinView(screenLocation, view)) {
                return this._get("currentAlignment") || "top-center";
            }
            function cssPropertyToInteger(value) {
                return parseInt(value.replace(/[^-\d\.]/g, ""), 10);
            }
            var mainComputedStyle = mainContainerNode
                ? window.getComputedStyle(mainContainerNode, null)
                : null;
            var contentMaxHeight = mainComputedStyle
                ? cssPropertyToInteger(mainComputedStyle.getPropertyValue("max-height"))
                : 0;
            var contentHeight = mainComputedStyle
                ? cssPropertyToInteger(mainComputedStyle.getPropertyValue("height"))
                : 0;
            var contentBox = domGeometry.getContentBox(containerNode);
            var popupWidth = contentBox.w + pointerOffset;
            var popupHeight = Math.max(contentBox.h, contentMaxHeight, contentHeight) + pointerOffset;
            var isOutsideViewRight = this._isOutsideView({
                popupHeight: popupHeight,
                popupWidth: popupWidth,
                screenLocation: screenLocation,
                side: "right",
                view: view
            });
            var isOutsideViewLeft = this._isOutsideView({
                popupHeight: popupHeight,
                popupWidth: popupWidth,
                screenLocation: screenLocation,
                side: "left",
                view: view
            });
            var isOutsideViewTop = this._isOutsideView({
                popupHeight: popupHeight,
                popupWidth: popupWidth,
                screenLocation: screenLocation,
                side: "top",
                view: view
            });
            var isOutsideViewBottom = this._isOutsideView({
                popupHeight: popupHeight,
                popupWidth: popupWidth,
                screenLocation: screenLocation,
                side: "bottom",
                view: view
            });
            return isOutsideViewLeft
                ? isOutsideViewTop
                    ? "bottom-right"
                    : "top-right"
                : isOutsideViewRight
                    ? isOutsideViewTop
                        ? "bottom-left"
                        : "top-left"
                    : isOutsideViewTop
                        ? isOutsideViewBottom
                            ? "top-center"
                            : "bottom-center"
                        : "top-center";
        };
        Popup.prototype._getCurrentAlignment = function () {
            var _a = this, alignment = _a.alignment, dockEnabled = _a.dockEnabled;
            if (dockEnabled) {
                return null;
            }
            var currentAlignment = alignment === "auto"
                ? this._determineCurrentAlignment()
                : typeof alignment === "function"
                    ? alignment.call(this)
                    : alignment;
            return currentAlignment;
        };
        Popup.prototype._setCurrentAlignment = function () {
            this._set("currentAlignment", this._getCurrentAlignment());
        };
        Popup.prototype._setCurrentDockPosition = function () {
            this._set("currentDockPosition", this._getCurrentDockPosition());
        };
        Popup.prototype._getDockPosition = function () {
            var dockPosition = this.get("dockOptions.position");
            var position = dockPosition === "auto"
                ? this._determineCurrentDockPosition()
                : typeof dockPosition === "function"
                    ? dockPosition.call(this)
                    : dockPosition;
            return position;
        };
        Popup.prototype._getCurrentDockPosition = function () {
            return this.dockEnabled ? this._getDockPosition() : null;
        };
        Popup.prototype._wouldDockTo = function () {
            return !this.dockEnabled ? this._getDockPosition() : null;
        };
        Popup.prototype._renderFeatureMenuItemNode = function (featureWidget, featureWidgetIndex, selectedFeatureIndex) {
            var _a;
            var isSelectedFeature = featureWidgetIndex === selectedFeatureIndex;
            var itemClasses = (_a = {},
                _a[CSS.featureMenuSelected] = isSelectedFeature,
                _a);
            var checkMarkNode = isSelectedFeature ? (widget_1.tsx("span", { key: buildKey("feature-menu-selected-feature-" + selectedFeatureIndex), title: i18n.selectedFeature, "aria-label": i18n.selectedFeature, class: CSS.iconCheckMark })) : null;
            var titleNode = widget_1.tsx("span", { innerHTML: featureWidget.title || i18nCommon.untitled });
            return (widget_1.tsx("li", { role: "menuitem", tabIndex: -1, key: buildKey("feature-menu-feature-" + selectedFeatureIndex), class: this.classes(itemClasses, CSS.featureMenuItem), bind: this, "data-feature-index": featureWidgetIndex, onkeyup: this._handleFeatureMenuItemKeyup, onclick: this._selectFeature, onkeydown: this._selectFeature },
                widget_1.tsx("span", { class: CSS.featureMenuTitle },
                    titleNode,
                    checkMarkNode)));
        };
        Popup.prototype._renderFeatureMenuNode = function (featureWidgets, selectedFeatureIndex, featureMenuId) {
            var _this = this;
            return featureWidgets.length > 1 ? (widget_1.tsx("ol", { class: CSS.featureMenuList, id: featureMenuId, bind: this, afterCreate: this._featureMenuNodeUpdated, afterUpdate: this._featureMenuNodeUpdated, onkeyup: this._handleFeatureMenuKeyup, role: "menu" }, featureWidgets.map(function (featureWidget, featureWidgetIndex) {
                return _this._renderFeatureMenuItemNode(featureWidget, featureWidgetIndex, selectedFeatureIndex);
            }))) : null;
        };
        Popup.prototype._determineCurrentDockPosition = function () {
            var view = this.get("viewModel.view");
            var defaultDockPosition = widgetUtils.isRTL() ? "top-left" : "top-right";
            if (!view) {
                return defaultDockPosition;
            }
            var viewPadding = view.padding || { left: 0, right: 0, top: 0, bottom: 0 };
            var viewWidth = view.width - viewPadding.left - viewPadding.right;
            var breakpoints = view.get("breakpoints");
            if (breakpoints && viewWidth <= breakpoints.xsmall) {
                return "bottom-center";
            }
            return defaultDockPosition;
        };
        Popup.prototype._renderContent = function () {
            var content = this.get("viewModel.content");
            if (!content) {
                return null;
            }
            if (typeof content === "string") {
                return widget_1.tsx("div", { key: content, innerHTML: content });
            }
            if (widget_1.isWidget(content)) {
                return widget_1.tsx("div", { key: content }, content.render());
            }
            if (content instanceof HTMLElement) {
                return widget_1.tsx("div", { key: content, bind: content, afterCreate: this._attachToNode });
            }
            if (widget_1.isWidgetBase(content)) {
                return widget_1.tsx("div", { key: content, bind: content.domNode, afterCreate: this._attachToNode });
            }
        };
        Popup.prototype._attachToNode = function (node) {
            var content = this;
            node.appendChild(content);
        };
        Popup.prototype._positionContainer = function (containerNode) {
            if (containerNode === void 0) { containerNode = this._containerNode; }
            if (containerNode) {
                this._containerNode = containerNode;
            }
            if (!containerNode) {
                return;
            }
            var screenLocation = this.viewModel.screenLocation;
            var domGeometryBox = domGeometry.getContentBox(containerNode);
            var positionStyle = this._calculatePositionStyle(screenLocation, domGeometryBox);
            if (!positionStyle) {
                return;
            }
            containerNode.style.top = positionStyle.top;
            containerNode.style.left = positionStyle.left;
            containerNode.style.bottom = positionStyle.bottom;
            containerNode.style.right = positionStyle.right;
        };
        Popup.prototype._calculateFullWidth = function (width) {
            var _a = this, currentAlignment = _a.currentAlignment, pointerOffset = _a._pointerOffsetInPx;
            if (currentAlignment === "top-left" ||
                currentAlignment === "bottom-left" ||
                currentAlignment === "top-right" ||
                currentAlignment === "bottom-right") {
                return width + pointerOffset;
            }
            return width;
        };
        Popup.prototype._calculateAlignmentPosition = function (x, y, view, width) {
            var _a = this, currentAlignment = _a.currentAlignment, pointerOffset = _a._pointerOffsetInPx;
            var halfWidth = width / 2;
            var viewHeightOffset = view.height - y;
            var viewWidthOffset = view.width - x;
            var padding = this.view.padding;
            if (currentAlignment === "bottom-center") {
                return {
                    top: y + pointerOffset - padding.top,
                    left: x - halfWidth - padding.left
                };
            }
            if (currentAlignment === "top-left") {
                return {
                    bottom: viewHeightOffset + pointerOffset - padding.bottom,
                    right: viewWidthOffset + pointerOffset - padding.right
                };
            }
            if (currentAlignment === "bottom-left") {
                return {
                    top: y + pointerOffset - padding.top,
                    right: viewWidthOffset + pointerOffset - padding.right
                };
            }
            if (currentAlignment === "top-right") {
                return {
                    bottom: viewHeightOffset + pointerOffset - padding.bottom,
                    left: x + pointerOffset - padding.left
                };
            }
            if (currentAlignment === "bottom-right") {
                return {
                    top: y + pointerOffset - padding.top,
                    left: x + pointerOffset - padding.left
                };
            }
            if (currentAlignment === "top-center") {
                return {
                    bottom: viewHeightOffset + pointerOffset - padding.bottom,
                    left: x - halfWidth - padding.left
                };
            }
        };
        Popup.prototype._calculatePositionStyle = function (screenLocation, domGeometryBox) {
            var _a = this, dockEnabled = _a.dockEnabled, view = _a.view;
            if (!view) {
                return;
            }
            if (dockEnabled) {
                return {
                    left: "",
                    top: "",
                    right: "",
                    bottom: ""
                };
            }
            if (!screenLocation || !domGeometryBox) {
                return;
            }
            var width = this._calculateFullWidth(domGeometryBox.w);
            var position = this._calculateAlignmentPosition(screenLocation.x, screenLocation.y, view, width);
            if (!position) {
                return;
            }
            return {
                top: position.top !== undefined ? position.top + "px" : "auto",
                left: position.left !== undefined ? position.left + "px" : "auto",
                bottom: position.bottom !== undefined ? position.bottom + "px" : "auto",
                right: position.right !== undefined ? position.right + "px" : "auto"
            };
        };
        Popup.prototype._viewChange = function (newView, oldView) {
            if (newView && oldView) {
                this.close();
                this.clear();
            }
        };
        Popup.prototype._viewReadyChange = function (isReady, wasReady) {
            if (isReady) {
                var view = this.get("viewModel.view");
                this._wireUpView(view);
                return;
            }
            if (wasReady) {
                this.close();
                this.clear();
            }
        };
        Popup.prototype._wireUpView = function (view) {
            this._destroySpinner();
            if (!view) {
                return;
            }
            var spinnerEnabled = this.spinnerEnabled;
            if (spinnerEnabled) {
                this._createSpinner(view);
            }
            this._setDockEnabledForViewSize(this.dockOptions);
        };
        Popup.prototype._dockingThresholdCrossed = function (newSize, oldSize, dockingThreshold) {
            var currWidth = newSize[0], currHeight = newSize[1], prevWidth = oldSize[0], prevHeight = oldSize[1], dockingWidth = dockingThreshold.width, dockingHeight = dockingThreshold.height;
            return ((currWidth <= dockingWidth && prevWidth > dockingWidth) ||
                (currWidth > dockingWidth && prevWidth <= dockingWidth) ||
                (currHeight <= dockingHeight && prevHeight > dockingHeight) ||
                (currHeight > dockingHeight && prevHeight <= dockingHeight));
        };
        Popup.prototype._updateDockEnabledForViewSize = function (newSize, oldSize) {
            if (!newSize || !oldSize) {
                return;
            }
            var viewPadding = this.get("viewModel.view.padding") || {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            };
            var widthPadding = viewPadding.left + viewPadding.right;
            var heightPadding = viewPadding.top + viewPadding.bottom;
            var newUISize = [], oldUISize = [];
            newUISize[0] = newSize[0] - widthPadding;
            newUISize[1] = newSize[1] - heightPadding;
            oldUISize[0] = oldSize[0] - widthPadding;
            oldUISize[1] = oldSize[1] - heightPadding;
            /*
              When the size of the view changes, check to see if we need to switch the dockEnabled state
            */
            var dockOptions = this.dockOptions;
            var breakpoint = dockOptions.breakpoint;
            if (this._dockingThresholdCrossed(newUISize, oldUISize, breakpoint)) {
                this._setDockEnabledForViewSize(dockOptions);
            }
            this._setCurrentDockPosition();
        };
        Popup.prototype._focusDockButtonNode = function (element) {
            if (!this._focusDockButton) {
                return;
            }
            this._focusDockButton = false;
            element.focus();
        };
        Popup.prototype._mainContainerNodeUpdated = function (element) {
            this._mainContainerNode = element;
            if (this._focusContainer) {
                this._focusContainer = false;
                element.focus();
                return;
            }
            if (this._blurContainer) {
                this._blurContainer = false;
                element.blur();
                return;
            }
        };
        Popup.prototype._featureMenuNodeUpdated = function (element) {
            this._featureMenuNode = element;
            if (!element || !this._focusFirstFeature) {
                return;
            }
            this._focusFirstFeature = false;
            var items = element.querySelectorAll("li");
            if (items.length) {
                var firstItem = items[0];
                firstItem.focus();
            }
        };
        Popup.prototype._actionsMenuNodeUpdated = function (element) {
            this._actionsMenuNode = element;
            if (!element || !this._focusFirstAction) {
                return;
            }
            this._focusFirstAction = false;
            var items = element.querySelectorAll("li");
            if (items.length) {
                var firstItem = items[0];
                firstItem.focus();
            }
        };
        Popup.prototype._focusFeatureMenuButtonNode = function (element) {
            if (!this._focusFeatureMenuButton) {
                return;
            }
            this._focusFeatureMenuButton = false;
            element.focus();
        };
        Popup.prototype._focusActionsMenuButtonNode = function (element) {
            if (!this._focusActionsMenuButton) {
                return;
            }
            this._focusActionsMenuButton = false;
            element.focus();
        };
        Popup.prototype._featureMenuViewportNodeUpdated = function (element) {
            if (!element) {
                return;
            }
            element.scrollTop = 0;
        };
        Popup.prototype._toggleScreenLocationEnabled = function () {
            var _a = this, dockEnabled = _a.dockEnabled, visible = _a.visible, viewModel = _a.viewModel;
            if (!viewModel) {
                return;
            }
            var screenLocationEnabled = visible && !dockEnabled;
            viewModel.screenLocationEnabled = screenLocationEnabled;
        };
        Popup.prototype._shouldDockAtCurrentViewSize = function (dockOptions) {
            var breakpoint = dockOptions.breakpoint;
            var _a = this.get("viewModel.view.ui"), uiWidth = _a.width, uiHeight = _a.height;
            if (isNaN(uiWidth) || isNaN(uiHeight)) {
                return false;
            }
            var crossedWidthBreakpoint = breakpoint.hasOwnProperty("width") && uiWidth <= breakpoint.width;
            var crossedHeightBreakpoint = breakpoint.hasOwnProperty("height") && uiHeight <= breakpoint.height;
            return crossedWidthBreakpoint || crossedHeightBreakpoint;
        };
        Popup.prototype._setDockEnabledForViewSize = function (dockOptions) {
            if (dockOptions.breakpoint) {
                this.dockEnabled = this._shouldDockAtCurrentViewSize(dockOptions);
            }
        };
        Popup.prototype._getPageText = function (featureCount, selectedFeatureIndex) {
            return esriLang.substitute({
                index: selectedFeatureIndex + 1,
                total: featureCount
            }, i18n.pageText);
        };
        Popup.prototype._destroySpinner = function () {
            var _a = this, _spinner = _a._spinner, view = _a.view;
            if (_spinner) {
                view && view.ui.remove(this._spinner, SPINNER_KEY);
                _spinner.destroy();
                this._spinner = null;
            }
        };
        Popup.prototype._createSpinner = function (view) {
            if (!view) {
                return;
            }
            this._spinner = new Spinner({
                view: view
            });
            view.ui.add(this._spinner, {
                key: SPINNER_KEY,
                position: "manual"
            });
        };
        Popup.prototype._toggleCollapsed = function () {
            this.collapsed = !this.collapsed;
        };
        Popup.prototype._close = function () {
            this.close();
            this.view && this.view.focus();
        };
        Popup.prototype._toggleDockEnabled = function () {
            this.dockEnabled = !this.dockEnabled;
            this._focusDockButton = true;
            this.scheduleRender();
        };
        Popup.prototype._toggleFeatureMenu = function () {
            var toggleValue = !this.featureMenuOpen;
            this._featureMenuOpenChanged(toggleValue);
            this.actionsMenuOpen = false;
            this.featureMenuOpen = toggleValue;
        };
        Popup.prototype._toggleActionsMenu = function () {
            var toggleValue = !this.actionsMenuOpen;
            this._actionsMenuOpenChanged(toggleValue);
            this.featureMenuOpen = false;
            this.actionsMenuOpen = toggleValue;
        };
        Popup.prototype._triggerAction = function (event) {
            var node = event.currentTarget;
            var actionIndex = node["data-action-index"];
            var action = this.viewModel.allActions.getItemAt(actionIndex);
            if (action && action.type === "toggle") {
                action.value = !action.value;
            }
            this.actionsMenuOpen = false;
            this.viewModel.triggerAction(actionIndex);
        };
        Popup.prototype._selectFeature = function (event) {
            var node = event.currentTarget;
            var featureIndex = node["data-feature-index"];
            if (!isNaN(featureIndex)) {
                this.viewModel.selectedFeatureIndex = featureIndex;
            }
            this._focusFeatureMenuButton = true;
            this.scheduleRender();
        };
        Popup.prototype._next = function () {
            this.next();
        };
        Popup.prototype._previous = function () {
            this.previous();
        };
        __decorate([
            decorators_1.aliasOf("viewModel.actions"),
            widget_1.renderable()
        ], Popup.prototype, "actions", void 0);
        __decorate([
            decorators_1.property({
                dependsOn: ["viewModel.visible", "actionsMenuEnabled"]
            }),
            widget_1.renderable()
        ], Popup.prototype, "actionsMenuOpen", null);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], Popup.prototype, "actionsMenuEnabled", void 0);
        __decorate([
            decorators_1.property()
        ], Popup.prototype, "alignment", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.autoCloseEnabled")
        ], Popup.prototype, "autoCloseEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.autoOpenEnabled")
        ], Popup.prototype, "autoOpenEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.defaultPopupTemplateEnabled")
        ], Popup.prototype, "defaultPopupTemplateEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.content"),
            widget_1.renderable()
        ], Popup.prototype, "content", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], Popup.prototype, "collapsed", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], Popup.prototype, "collapseEnabled", void 0);
        __decorate([
            decorators_1.property({
                readOnly: true,
                dependsOn: ["dockEnabled", "alignment"]
            }),
            widget_1.renderable()
        ], Popup.prototype, "currentAlignment", null);
        __decorate([
            decorators_1.property({
                readOnly: true,
                dependsOn: ["viewModel.view.ready", "dockEnabled", "dockOptions"]
            }),
            widget_1.renderable()
        ], Popup.prototype, "currentDockPosition", null);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], Popup.prototype, "dockOptions", null);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], Popup.prototype, "dockEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.featureCount"),
            widget_1.renderable()
        ], Popup.prototype, "featureCount", void 0);
        __decorate([
            decorators_1.property({
                dependsOn: ["viewModel.visible"]
            }),
            widget_1.renderable()
        ], Popup.prototype, "featureMenuOpen", null);
        __decorate([
            decorators_1.aliasOf("viewModel.features"),
            widget_1.renderable()
        ], Popup.prototype, "features", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], Popup.prototype, "featureNavigationEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.goToOverride")
        ], Popup.prototype, "goToOverride", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.highlightEnabled")
        ], Popup.prototype, "highlightEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.location"),
            widget_1.renderable()
        ], Popup.prototype, "location", void 0);
        __decorate([
            decorators_1.property({
                readOnly: true
            }),
            widget_1.renderable()
        ], Popup.prototype, "featureWidgets", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.promises")
        ], Popup.prototype, "promises", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.selectedFeature"),
            widget_1.renderable()
        ], Popup.prototype, "selectedFeature", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.selectedFeatureIndex"),
            widget_1.renderable()
        ], Popup.prototype, "selectedFeatureIndex", void 0);
        __decorate([
            decorators_1.property({
                readOnly: true
            }),
            widget_1.renderable()
        ], Popup.prototype, "selectedFeatureWidget", void 0);
        __decorate([
            decorators_1.property()
        ], Popup.prototype, "spinnerEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.title"),
            widget_1.renderable()
        ], Popup.prototype, "title", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.updateLocationEnabled")
        ], Popup.prototype, "updateLocationEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Popup.prototype, "view", void 0);
        __decorate([
            decorators_1.property({ type: PopupViewModel }),
            widget_1.renderable([
                "viewModel.view.widthBreakpoint",
                "viewModel.allActions",
                "viewModel.screenLocation",
                "viewModel.screenLocationEnabled",
                "viewModel.state",
                "viewModel.pendingPromisesCount",
                "viewModel.promiseCount",
                "viewModel.waitingForResult"
            ]),
            widget_1.vmEvent(["triggerAction", "trigger-action"])
        ], Popup.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.visible"),
            widget_1.renderable()
        ], Popup.prototype, "visible", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.clear")
        ], Popup.prototype, "clear", null);
        __decorate([
            decorators_1.aliasOf("viewModel.next")
        ], Popup.prototype, "next", null);
        __decorate([
            decorators_1.aliasOf("viewModel.previous")
        ], Popup.prototype, "previous", null);
        __decorate([
            decorators_1.aliasOf("viewModel.triggerAction")
        ], Popup.prototype, "triggerAction", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Popup.prototype, "_toggleCollapsed", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Popup.prototype, "_close", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Popup.prototype, "_toggleDockEnabled", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Popup.prototype, "_toggleFeatureMenu", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Popup.prototype, "_toggleActionsMenu", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Popup.prototype, "_triggerAction", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Popup.prototype, "_selectFeature", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Popup.prototype, "_next", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Popup.prototype, "_previous", null);
        Popup = __decorate([
            decorators_1.subclass(declaredClass)
        ], Popup);
        return Popup;
    }(decorators_1.declared(Widget)));
    return Popup;
});
//# sourceMappingURL=Popup.js.map