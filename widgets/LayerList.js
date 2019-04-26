/**
 * The LayerList widget provides a way to display a list of layers, and switching on/off their visibility.
 *
 * @module esri/widgets/LayerList
 * @since 4.2
 *
 * @see [LayerList.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/LayerList.tsx)
 * @see [LayerList.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_LayerList.scss)
 * @see [Sample - LayerList widget](../sample-code/widgets-layerlist/index.html)
 * @see [Sample - LayerList widget with actions](../sample-code/widgets-layerlist-actions/index.html)
 * @see module:esri/widgets/LayerList/LayerListViewModel
 *
 * @example
 * var layerList = new LayerList({
 *   view: view
 * });
 * // Adds widget below other elements in the top left corner of the view
 * view.ui.add(layerList, {
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/nls/common", "dojo/i18n!esri/widgets/LayerList/nls/LayerList", "esri/core/Handles", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/LayerList/LayerListViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18nCommon, i18n, Handles, watchUtils, decorators_1, Widget, LayerListViewModel, widget_1) {
    "use strict";
    i18nCommon = __importStar(i18nCommon);
    i18n = __importStar(i18n);
    var CSS = {
        // layerlist classes
        base: "esri-layer-list esri-widget esri-widget--panel",
        inputText: "esri-print__input-text",
        filterSection: "esri-layer-list__filter",
        esriWidget: "esri-widget",
        iconToggleVisible: "esri-icon-layer-list__icon_visible",
        noItems: "esri-layer-list__no-items",
        list: "esri-layer-list__list",
        listRoot: "esri-layer-list__list--root",
        listExclusive: "esri-layer-list__list--exclusive",
        listInherited: "esri-layer-list__list--inherited",
        listIndependent: "esri-layer-list__list--independent",
        item: "esri-layer-list__item",
        itemContent: "esri-layer-list__item-content",
        itemError: "esri-layer-list__item--error",
        itemInvisibleAtScale: "esri-layer-list__item--invisible-at-scale",
        itemUpdating: "esri-layer-list__item--updating",
        itemChildren: "esri-layer-list__item--has-children",
        itemContainer: "esri-layer-list__item-container",
        actionsMenu: "esri-layer-list__item-actions-menu",
        actionsMenuItem: "esri-layer-list__item-actions-menu-item",
        actionsMenuItemActive: "esri-layer-list__item-actions-menu-item--active",
        actions: "esri-layer-list__item-actions",
        actionsList: "esri-layer-list__item-actions-list",
        action: "esri-layer-list__item-action",
        actionIcon: "esri-layer-list__item-action-icon",
        actionImage: "esri-layer-list__item-action-image",
        actionTitle: "esri-layer-list__item-action-title",
        actionToggle: "esri-layer-list__action-toggle",
        actionToggleOn: "esri-layer-list__action-toggle--on",
        label: "esri-layer-list__item-label",
        errorMessage: "esri-layer-list__item-error-message",
        title: "esri-layer-list__item-title",
        toggleVisible: "esri-layer-list__item-toggle",
        toggleVisibleIcon: "esri-layer-list__item-toggle-icon",
        childToggle: "esri-layer-list__child-toggle",
        childToggleOpen: "esri-layer-list__child-toggle--open",
        childOpened: "esri-layer-list__child-toggle-icon--opened",
        childClosed: "esri-layer-list__child-toggle-icon--closed",
        childClosed_RTL: "esri-layer-list__child-toggle-icon--closed-rtl",
        // common
        disabled: "esri-disabled",
        disabledElement: "esri-disabled-element",
        hidden: "esri-hidden",
        rotating: "esri-rotating",
        input: "esri-input",
        // icon classes
        iconEllipses: "esri-icon-handle-horizontal",
        iconVisible: "esri-icon-visible",
        iconInvisible: "esri-icon-non-visible",
        iconRadioSelected: "esri-icon-radio-checked",
        iconRadioUnselected: "esri-icon-radio-unchecked",
        iconNoticeTriangle: "esri-icon-notice-triangle",
        iconChildrenOpen: "esri-icon-down-arrow",
        iconDownArrow: "esri-icon-down-arrow",
        iconRightArrow: "esri-icon-right-triangle-arrow",
        iconLeftArrow: "esri-icon-left-triangle-arrow",
        iconLoading: "esri-icon-loading-indicator",
        iconDefaultAction: "esri-icon-default-action",
        widgetIcon: "esri-icon-layers"
    };
    var REGISTRY_KEYS = {
        actions: "actions",
        actionSection: "action-section",
        items: "items"
    };
    var VISIBILITY_MODES = {
        exclusive: "exclusive",
        inherited: "inherited",
        independent: "independent"
    };
    function closeItemActions(item) {
        var actionsOpen = item.actionsOpen, children = item.children;
        if (actionsOpen) {
            item.actionsOpen = false;
        }
        children.forEach(function (child) { return closeItemActions(child); });
    }
    /**
     * Fires after the user clicks on an {@link module:esri/support/actions/ActionButton action} or {@link module:esri/support/actions/ActionToggle action toggle} inside the LayerList widget.
     * This event may be used to define a custom function to execute when particular
     * actions are clicked.
     *
     * @event module:esri/widgets/LayerList#trigger-action
     * @property {module:esri/support/actions/ActionButton | module:esri/support/actions/ActionToggle} action - The action clicked by the user.
     * @property {module:esri/widgets/LayerList/ListItem} item - An item associated with the action.
     */
    var LayerList = /** @class */ (function (_super) {
        __extends(LayerList, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @extends module:esri/widgets/Widget
         * @constructor
         * @alias module:esri/widgets/LayerList
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         *
         * @example
         * // typical usage
         * var layerlist = new LayerList({
         *   view: view
         * });
         */
        function LayerList(params) {
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
            //  statusIndicatorsVisible
            //----------------------------------
            /**
             * Option for enabling status indicators, which indicate whether or not each layer
             * is loading resources.
             *
             * @name statusIndicatorsVisible
             * @instance
             *
             * @type {boolean}
             * @default true
             * @since 4.5
             *
             * @example
             * // disable status indicators for all layers listed in LayerList
             * layerList.statusIndicatorsVisible = false;
             */
            _this.statusIndicatorsVisible = true;
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
            //  listItemCreatedFunction
            //----------------------------------
            /**
             * Function definition for the [listItemCreatedFunction](#listItemCreatedFunction) property.
             * See the example snippet in the  [listItemCreatedFunction](#listItemCreatedFunction)
             * documentation for more details.
             *
             * @callback module:esri/widgets/LayerList~ListItemCreatedHandler
             * @param {Object} event - An object containing a list item created by the LayerList.
             * @param {module:esri/widgets/LayerList/ListItem} event.item - A list item
             *   created by the LayerList. You can modify the properties of this item to customize
             *   the text, actions, panel content, and visibility of the list item. See the
             *   documentation for the [listItemCreatedFunction](#listItemCreatedFunction) for more details.
             */
            /**
             * Specifies a function that accesses each {@link module:esri/widgets/LayerList/ListItem}.
             * Each list item can be modified
             * according to its modifiable properties. Actions can be added to list items
             * using the {@link module:esri/widgets/LayerList/ListItem#actionsSections actionsSections}
             * property of the ListItem.
             *
             * @since 4.4
             *
             * @name listItemCreatedFunction
             * @instance
             * @type {module:esri/widgets/LayerList~ListItemCreatedHandler}
             * @see [Sample - LayerList widget with actions](../sample-code/widgets-layerlist-actions/index.html)
             *
             * @example
             * var layerList = new LayerList({
             *   view: view,
             *   // executes for each ListItem in the LayerList
             *   listItemCreatedFunction: function (event) {
             *
             *     // The event object contains properties of the
             *     // layer in the LayerList widget.
             *
             *     var item = event.item;
             *
             *     if (item.title === "US Demographics") {
             *       // open the list item in the LayerList
             *       item.open = true;
             *       // change the title to something more descriptive
             *       item.title = "Population by county";
             *       // set an action for zooming to the full extent of the layer
             *       item.actionsSections = [[{
             *         title: "Go to full extent",
             *         className: "esri-icon-zoom-out-fixed",
             *         id: "full-extent"
             *       }]];
             *     }
             *   }
             * });
             */
            _this.listItemCreatedFunction = null;
            //----------------------------------
            //  operationalItems
            //----------------------------------
            /**
             * A collection of {@link module:esri/widgets/LayerList/ListItem}s representing operational layers.
             * @name operationalItems
             * @instance
             * @type {module:esri/core/Collection<module:esri/widgets/LayerList/ListItem>}
             * @readonly
             *
             * @see {@link module:esri/layers/Layer#listMode Layer.listMode}
             */
            _this.operationalItems = null;
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
             * {@link module:esri/widgets/LayerList/LayerListViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/LayerList/LayerListViewModel}
             * @default
             */
            _this.viewModel = new LayerListViewModel();
            _this._resetLayerVisibility = function () {
                this.operationalItems.forEach(function (item) {
                    if (item.layer.title === 'Property') {
                        item.layer.visible = true;
                        if (item.layer.type === 'group') {
                            item.layer.layers.forEach(function (layer) {
                                if (layer.title === 'Property') {
                                    layer.visible = true;
                                }
                                else {
                                    layer.visible = false;
                                }
                            });
                        }
                    }
                    else {
                        item.layer.visible = false;
                    }
                });
            };
            _this._updateInputValue = function (e) {
                var target = e.target;
                console.log(target.value.length);
                var targetProperty = target.getAttribute("data-input-name");
                var cnt1 = 0;
                var cnt2 = 0;
                this.view.layerViews.items.forEach(function (item) {
                    cnt1 = 0;
                    cnt2 = 0;
                    if (item.layer.type === 'group') {
                        item.layer.layers.forEach(function (item1) {
                            if (item1.type === 'group') {
                                cnt2 = 0;
                                item1.layers.forEach(function (item2) {
                                    if (item2.title.toUpperCase().indexOf(target.value.toUpperCase()) > -1 || !target.value.length) {
                                        item2.listMode = 'show';
                                        cnt1 += 1;
                                        cnt2 += 1;
                                    }
                                    else {
                                        item2.listMode = 'hide';
                                    }
                                });
                                item1.listMode = (cnt2 > 0 || !target.value.length) ? 'show' : 'hide';
                            }
                            else {
                                if (item1.title.toUpperCase().indexOf(target.value.toUpperCase()) > -1 || !target.value.length) {
                                    item1.listMode = 'show';
                                    cnt1 += 1;
                                }
                                else {
                                    item1.listMode = 'hide';
                                }
                            }
                        });
                        console.log(item.layer.title, cnt1);
                        item.layer.listMode = (cnt1 > 0 || !target.value.length) ? 'show' : 'hide';
                    }
                    else {
                        if (item.layer.type === 'graphics' || !item.layer.title.trim().length) {
                            item.layer.listMode = 'hide';
                        }
                        else {
                            if (item.layer.title.toUpperCase().indexOf(target.value.toUpperCase()) > -1 || !target.value.length) {
                                item.layer.listMode = 'show';
                            }
                            else {
                                item.layer.listMode = 'hide';
                            }
                        }
                    }
                });
                console.log(this.operationalItems);
            };
            return _this;
        }
        LayerList.prototype.postInitialize = function () {
            var _this = this;
            var operationalItems = this.operationalItems;
            this.own(watchUtils.on(this, "operationalItems", "change", function () { return _this._itemsChanged(operationalItems); }));
        };
        LayerList.prototype.destroy = function () {
            this._handles.destroy();
            this._handles = null;
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        /**
         * Triggers the [trigger-action](#event:trigger-action) event and executes
         * the given {@link module:esri/support/actions/ActionButton action} or {@link module:esri/support/actions/ActionToggle action toggle}.
         *
         * @param {module:esri/support/actions/ActionButton | module:esri/support/actions/ActionToggle} - The action to execute.
         * @param {module:esri/widgets/LayerList/ListItem} - An item associated with the action.
         */
        LayerList.prototype.triggerAction = function (action, item) { };
        LayerList.prototype.render = function () {
            var _this = this;
            var _a;
            var items = this._getItems();
            var state = this.get("viewModel.state");
            var resetButton = widget_1.tsx("div", { key: "reset-button", bind: this, onclick: this._resetLayerVisibility, class: this.classes(CSS.actionsMenuItem), 
                //tabindex="0"
                role: "button" },
                widget_1.tsx("span", { "aria-hidden": "true", class: CSS.iconToggleVisible }));
            var filterSection = (widget_1.tsx("div", { class: this.classes(CSS.filterSection, CSS.esriWidget), key: "layerlist-filter" },
                widget_1.tsx("input", { type: "text", placeholder: "Filter layers", class: this.classes(CSS.inputText, CSS.input), oninput: this._updateInputValue, bind: this }),
                resetButton));
            var content = items.length === 0 ? (widget_1.tsx("div", null,
                filterSection,
                widget_1.tsx("div", { class: CSS.noItems }, i18n.noItemsToDisplay))) : (widget_1.tsx("div", null,
                filterSection,
                widget_1.tsx("ul", { class: this.classes(CSS.list, CSS.listRoot, CSS.listIndependent) }, items.map(function (item, key) { return _this._renderItem(item, null); }))));
            var baseClasses = (_a = {},
                _a[CSS.hidden] = state === "loading",
                _a[CSS.disabled] = state === "disabled",
                _a);
            return widget_1.tsx("div", { class: this.classes(CSS.base, baseClasses) }, content);
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        LayerList.prototype._getItems = function () {
            var _this = this;
            return this.operationalItems.toArray().filter(function (item) { return _this.errorsVisible || !item.error; });
        };
        LayerList.prototype._getSingleActionButton = function (item) {
            return item.actionsSections
                .reduce(function (item) { return item; })
                .filter(function (item) { return item && item.type === "button"; })
                .getItemAt(0);
        };
        LayerList.prototype._renderItem = function (item, parent) {
            var _this = this;
            var _a, _b, _c, _d;
            var widgetId = this.id;
            var uid = widgetId + "_" + item.uid;
            var actionsUid = uid + "_actions";
            var listUid = uid + "__list";
            var titleKey = uid + "__title";
            var childrenLen = item.children.length;
            var hasChildren = !!childrenLen;
            var hasError = !!item.error;
            var errorMessage = hasError ? i18n.layerError : "";
            var visibilityMode = item.visibilityMode;
            var childItems = item.children && item.children.toArray();
            var exclusive = VISIBILITY_MODES.exclusive, inherited = VISIBILITY_MODES.inherited;
            var childClasses = (_a = {},
                _a[CSS.listExclusive] = visibilityMode === exclusive,
                _a[CSS.listInherited] = visibilityMode === inherited,
                _a[CSS.listIndependent] = visibilityMode !== inherited && visibilityMode !== exclusive,
                _a);
            var itemClasses = (_b = {},
                _b[CSS.itemChildren] = hasChildren,
                _b[CSS.itemError] = !!errorMessage,
                _b[CSS.itemUpdating] = item.updating && !parent && this.statusIndicatorsVisible,
                _b[CSS.itemInvisibleAtScale] = !item.visibleAtCurrentScale,
                _b);
            var actionsCount = this._countActions(item.actionsSections);
            var panel = item.panel;
            var contentNode = panel && panel.open ? panel.render() : null;
            var contentActionNode = panel && panel.visible ? this._renderPanelButton(panel) : null;
            var actionsMenuClasses = (_c = {},
                _c[CSS.actionsMenuItemActive] = item.actionsOpen,
                _c);
            var actionsMenuTitle = item.actionsOpen ? i18nCommon.close : i18nCommon.open;
            var singleAction = actionsCount === 1 && this._getSingleActionButton(item);
            var singleActionNode = singleAction
                ? this._renderAction({ item: item, action: singleAction, singleAction: true })
                : null;
            var actionsMenuIcon = !singleAction && actionsCount ? (widget_1.tsx("div", { key: "actions-menu-toggle", "data-item": item, bind: this, onclick: this._toggleActionsOpen, onkeydown: this._toggleActionsOpen, class: this.classes(CSS.actionsMenuItem, actionsMenuClasses), tabindex: "0", role: "button", "aria-controls": actionsUid, "aria-label": actionsMenuTitle, title: actionsMenuTitle },
                widget_1.tsx("span", { "aria-hidden": "true", class: CSS.iconEllipses }))) : null;
            var actionsMenu = actionsMenuIcon || contentActionNode || singleActionNode ? (widget_1.tsx("div", { key: "esri-layer-list__actions-menu", class: CSS.actionsMenu },
                contentActionNode,
                singleActionNode,
                actionsMenuIcon)) : null;
            var actions = actionsCount
                ? this._renderActionsSections(item, item.actionsSections, actionsUid)
                : null;
            var children = hasChildren ? (widget_1.tsx("ul", { key: "esri-layer-list__list-items", id: listUid, class: this.classes(CSS.list, childClasses), "aria-expanded": item.open ? "true" : "false", role: visibilityMode === exclusive ? "radiogroup" : "group", hidden: item.open ? null : true }, childItems.map(function (childItem) { return _this._renderItem(childItem, item); }))) : null;
            var childToggleClasses = (_d = {},
                _d[CSS.childToggleOpen] = item.open,
                _d);
            var toggleChildrenTitle = item.open ? i18nCommon.collapse : i18nCommon.expand;
            var toggleChildren = hasChildren ? (widget_1.tsx("span", { onclick: this._toggleChildrenClick, onkeydown: this._toggleChildrenClick, "data-item": item, key: "esri-layer-list__toggle-children", class: this.classes(CSS.childToggle, childToggleClasses), tabindex: "0", role: "button", "aria-controls": listUid, "aria-label": toggleChildrenTitle, title: toggleChildrenTitle },
                widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.childClosed, CSS.iconRightArrow) }),
                widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.childOpened, CSS.iconDownArrow) }),
                widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.childClosed_RTL, CSS.iconLeftArrow) }))) : null;
            var itemLabel = this._createLabelNode(item, parent, titleKey);
            var errorBlock = hasError ? (widget_1.tsx("div", { key: "esri-layer-list__error", class: CSS.errorMessage, role: "alert" },
                widget_1.tsx("span", { "aria-hidden": "true", class: CSS.iconNoticeTriangle }),
                widget_1.tsx("span", null, errorMessage))) : null;
            return (widget_1.tsx("li", { key: item, class: this.classes(CSS.item, itemClasses), "aria-labelledby": titleKey },
                widget_1.tsx("div", { key: "esri-layer-list__list-item-container", class: CSS.itemContainer },
                    toggleChildren,
                    itemLabel,
                    actionsMenu),
                errorBlock,
                actions,
                contentNode,
                children));
        };
        LayerList.prototype._createLabelNode = function (item, parent, titleKey) {
            var _a;
            var exclusive = VISIBILITY_MODES.exclusive, inherited = VISIBILITY_MODES.inherited;
            var parentVisibilityMode = parent && parent.visibilityMode;
            var toggleIconClasses = (_a = {},
                _a[CSS.iconRadioSelected] = parentVisibilityMode === exclusive && item.visible,
                _a[CSS.iconRadioUnselected] = parentVisibilityMode === exclusive && !item.visible,
                _a[CSS.iconVisible] = parentVisibilityMode !== exclusive && item.visible,
                _a[CSS.iconInvisible] = parentVisibilityMode !== exclusive && !item.visible,
                _a);
            var toggleRole = parentVisibilityMode === exclusive ? "radio" : "checkbox";
            var title = item.title || i18n.untitledLayer;
            var label = !item.visibleAtCurrentScale ? title + " (" + i18n.layerInvisibleAtScale + ")" : title;
            var titleNode = (widget_1.tsx("span", { id: titleKey, title: label, "aria-label": label, class: CSS.title }, title));
            return parentVisibilityMode === inherited ? (widget_1.tsx("div", { key: item, class: CSS.label }, titleNode)) : (widget_1.tsx("div", { key: item, onclick: this._labelClick, onkeydown: this._labelClick, "data-item": item, "data-parent-visibility": parentVisibilityMode, tabindex: "0", "aria-checked": item.visible ? "true" : "false", role: toggleRole, "aria-labelledby": titleKey, class: CSS.label },
                widget_1.tsx("span", { class: CSS.toggleVisible },
                    widget_1.tsx("span", { class: this.classes(CSS.toggleVisibleIcon, toggleIconClasses), "aria-hidden": "true" })),
                titleNode));
        };
        LayerList.prototype._renderPanelButton = function (panel) {
            var _a, _b;
            var className = panel.className, open = panel.open, title = panel.title, image = panel.image;
            var actionClass = !image && !className ? CSS.iconDefaultAction : className;
            var iconStyles = this._getIconImageStyles(panel);
            var buttonClasses = (_a = {},
                _a[CSS.actionsMenuItemActive] = open,
                _a);
            var iconClasses = (_b = {},
                _b[CSS.actionImage] = !!iconStyles["background-image"],
                _b);
            if (actionClass) {
                iconClasses[actionClass] = !!actionClass;
            }
            return (widget_1.tsx("div", { key: panel, bind: this, "data-panel": panel, onclick: this._triggerPanel, onkeydown: this._triggerPanel, class: this.classes(CSS.actionsMenuItem, buttonClasses), role: "button", tabindex: "0", title: title, "aria-label": title },
                widget_1.tsx("span", { class: this.classes(iconClasses), styles: iconStyles })));
        };
        LayerList.prototype._watchActionSectionChanges = function (actionSection, itemId) {
            var _this = this;
            var registryKey = REGISTRY_KEYS.actionSection + itemId;
            this._handles.add(actionSection.on("change", this.scheduleRender.bind(this)), registryKey);
            actionSection.forEach(function (action) { return _this._renderOnActionChanges(action, itemId); });
        };
        LayerList.prototype._renderOnActionChanges = function (action, itemId) {
            var _this = this;
            var registryKey = REGISTRY_KEYS.actions + itemId;
            if (action.type === "toggle") {
                this._handles.add([
                    watchUtils.init(action, ["className", "image", "id", "title", "visible", "value"], function () {
                        return _this.scheduleRender();
                    })
                ], registryKey);
                return;
            }
            if (action.type === "slider") {
                this._handles.add([
                    watchUtils.init(action, [
                        "className",
                        "id",
                        "title",
                        "visible",
                        "value",
                        "displayValueEnabled",
                        "max",
                        "min",
                        "step"
                    ], function () { return _this.scheduleRender(); })
                ], registryKey);
                return;
            }
            this._handles.add([
                watchUtils.init(action, ["className", "image", "id", "title", "visible"], function () {
                    return _this.scheduleRender();
                })
            ], registryKey);
        };
        LayerList.prototype._renderOnItemChanges = function (item) {
            var _this = this;
            var itemId = item.uid;
            var registryKey = REGISTRY_KEYS.items + itemId;
            this._handles.add([
                watchUtils.init(item, [
                    "actionsOpen",
                    "visible",
                    "open",
                    "updating",
                    "title",
                    "visibleAtCurrentScale",
                    "error",
                    "visibilityMode",
                    "panel",
                    "panel.title",
                    "panel.content",
                    "panel.className"
                ], function () { return _this.scheduleRender(); }),
                item.actionsSections.on("change", function () { return _this.scheduleRender(); }),
                item.children.on("change", function () { return _this.scheduleRender(); })
            ], registryKey);
            item.children.forEach(function (child) { return _this._renderOnItemChanges(child); });
            item.actionsSections.forEach(function (actionSection) {
                return _this._watchActionSectionChanges(actionSection, itemId);
            });
        };
        LayerList.prototype._itemsChanged = function (items) {
            var _this = this;
            this._handles.removeAll();
            items.forEach(function (item) { return _this._renderOnItemChanges(item); });
            this.scheduleRender();
        };
        LayerList.prototype._renderActionsSections = function (item, actionsSections, actionsUid) {
            var _this = this;
            var actionSectionsArray = actionsSections.toArray();
            var actionSection = actionSectionsArray.map(function (actionSection) { return (widget_1.tsx("ul", { key: actionSection, class: CSS.actionsList }, _this._renderActionSection(item, actionSection))); });
            return (widget_1.tsx("div", { role: "group", "aria-expanded": item.actionsOpen ? "true" : "false", key: "esri-layer-list__actions-section", id: actionsUid, class: CSS.actions, hidden: item.actionsOpen ? null : true }, actionSection));
        };
        LayerList.prototype._renderActionSection = function (item, actionSection) {
            var _this = this;
            var actionSectionArray = actionSection && actionSection.toArray();
            return actionSectionArray.map(function (action) { return _this._renderAction({ item: item, action: action }); });
        };
        LayerList.prototype._renderAction = function (options) {
            var _a, _b;
            var item = options.item, action = options.action, singleAction = options.singleAction;
            var iconStyles = this._getIconImageStyles(action);
            var active = action.active, className = action.className, disabled = action.disabled, title = action.title;
            var actionClass = action.type === "button" && !action.image && !className ? CSS.iconDefaultAction : className;
            var buttonClasses = (_a = {},
                _a[CSS.actionsMenuItem] = singleAction && action.type === "button",
                _a[CSS.action] = !singleAction && action.type !== "toggle",
                _a[CSS.actionToggle] = action.type === "toggle",
                _a[CSS.actionToggleOn] = action.type === "toggle" && action.value,
                _a[CSS.disabledElement] = disabled,
                _a);
            var iconClasses = (_b = {},
                _b[CSS.actionImage] = !active && !!iconStyles["background-image"],
                _b[CSS.iconLoading] = active,
                _b[CSS.rotating] = active,
                _b);
            if (actionClass) {
                iconClasses[actionClass] = true;
            }
            var iconNode = (widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.actionIcon, iconClasses), styles: iconStyles }));
            var titleNode = !singleAction ? widget_1.tsx("span", { class: CSS.actionTitle }, title) : null;
            var actionContentNodes = [iconNode, titleNode];
            if (singleAction) {
                return (widget_1.tsx("div", { bind: this, "data-item": item, "data-action": action, role: "button", key: action, onclick: this._triggerAction, onkeydown: this._triggerAction, classes: buttonClasses, tabindex: "0", title: title, "aria-label": title }, actionContentNodes));
            }
            return (widget_1.tsx("li", { bind: this, "data-item": item, "data-action": action, key: action, onclick: this._triggerAction, onkeydown: this._triggerAction, classes: buttonClasses, tabindex: "0", role: "button", title: title, "aria-label": title }, actionContentNodes));
        };
        LayerList.prototype._countActions = function (actionSections) {
            return actionSections.reduce(function (count, section) { return count + section.length; }, 0);
        };
        LayerList.prototype._getIconImageStyles = function (source) {
            var image = (source.declaredClass =
                "esri.widgets.LayerList.ListItemPanel" ||
                    source.declaredClass === "esri.support.Action.ActionButton" ||
                    source.declaredClass === "esri.support.Action.ActionToggle"
                    ? source.image
                    : null);
            return {
                "background-image": image ? "url(\"" + image + "\")" : null
            };
        };
        LayerList.prototype._toggleActionsOpen = function (event) {
            var node = event.currentTarget;
            var item = node["data-item"];
            var actionsOpen = item.actionsOpen;
            var toggledValue = !actionsOpen;
            if (toggledValue) {
                this.operationalItems.forEach(function (item) { return closeItemActions(item); });
            }
            item.actionsOpen = toggledValue;
        };
        LayerList.prototype._triggerPanel = function (event) {
            var node = event.currentTarget;
            var panel = node["data-panel"];
            if (panel) {
                panel.open = !panel.open;
            }
        };
        LayerList.prototype._triggerAction = function (event) {
            var node = event.currentTarget;
            var action = node["data-action"];
            var item = node["data-item"];
            if (action.type === "toggle") {
                action.value = !action.value;
            }
            this.triggerAction(action, item);
        };
        LayerList.prototype._labelClick = function (event) {
            var node = event.currentTarget;
            var parentVisibilityMode = node.getAttribute("data-parent-visibility");
            var item = node["data-item"];
            if (!(parentVisibilityMode === VISIBILITY_MODES.exclusive && item.visible)) {
                item.visible = !item.visible;
            }
        };
        LayerList.prototype._toggleChildrenClick = function (event) {
            var node = event.currentTarget;
            var item = node["data-item"];
            item.open = !item.open;
        };
        __decorate([
            decorators_1.property()
        ], LayerList.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], LayerList.prototype, "statusIndicatorsVisible", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], LayerList.prototype, "errorsVisible", void 0);
        __decorate([
            decorators_1.property()
        ], LayerList.prototype, "label", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.listItemCreatedFunction"),
            widget_1.renderable()
        ], LayerList.prototype, "listItemCreatedFunction", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.operationalItems"),
            widget_1.renderable()
        ], LayerList.prototype, "operationalItems", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view"),
            widget_1.renderable()
        ], LayerList.prototype, "view", void 0);
        __decorate([
            widget_1.vmEvent("trigger-action"),
            decorators_1.property({
                type: LayerListViewModel
            }),
            widget_1.renderable("viewModel.state")
        ], LayerList.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.triggerAction")
        ], LayerList.prototype, "triggerAction", null);
        __decorate([
            widget_1.accessibleHandler()
        ], LayerList.prototype, "_toggleActionsOpen", null);
        __decorate([
            widget_1.accessibleHandler()
        ], LayerList.prototype, "_triggerPanel", null);
        __decorate([
            widget_1.accessibleHandler()
        ], LayerList.prototype, "_triggerAction", null);
        __decorate([
            widget_1.accessibleHandler()
        ], LayerList.prototype, "_labelClick", null);
        __decorate([
            widget_1.accessibleHandler()
        ], LayerList.prototype, "_toggleChildrenClick", null);
        LayerList = __decorate([
            decorators_1.subclass("esri.widgets.LayerList")
        ], LayerList);
        return LayerList;
    }(decorators_1.declared(Widget)));
    return LayerList;
});
//# sourceMappingURL=LayerList.js.map