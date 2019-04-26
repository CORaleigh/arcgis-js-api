/**
 * The FeatureTemplates widget is part of the overall editing workflow. Its main purpose is to display
 * {@link module:esri/layers/FeatureLayer#templates templates} from one or more {@link module:esri/layers/FeatureLayer feature layers}.
 * In addition to displaying feature layer templates, it is also possible to [filter](#filterFunction) and [group](#groupBy) templates
 * for an easier editing experience. The widget listens for an end user to select a specific {@link esri/widgets/FeatureTemplates/TemplateItem template}
 * in the widget. Its [select](#event:select)
 * event is fired and the resulting template information is returned. This widget can be used in conjunction with
 * {@link module:esri/layers/FeatureLayer#applyEdits FeatureLayer.applyEdits} to enable an end user to
 * update one of its feature layers.
 *
 * [![featureTemplates](../../assets/img/apiref/widgets/featureTemplates.png)](../sample-code/editing-applyedits/index.html)
 *
 *
 * @module esri/widgets/FeatureTemplates
 * @since 4.10
 *
 * @see [FeatureTemplates.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/FeatureTemplates.tsx)
 * @see [FeatureTemplates.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_FeatureTemplates.scss)
 * @see [Sample - Update FeatureLayer using ApplyEdits](../sample-code/editing-applyedits/index.html)
 * @see module:esri/widgets/FeatureTemplates/FeatureTemplatesViewModel
 * @see module:esri/widgets/FeatureTemplates/TemplateItem
 * @see module:esri/widgets/FeatureTemplates/TemplateItemGroup
 * @see module:esri/views/ui/DefaultUI
 * @see module:esri/layers/FeatureLayer
 * @see module:esri/layers/support/FeatureTemplate
 *
 * @example
 * const templates = new FeatureTemplates({
 *   container: "templatesDiv",
 *   layers: layers
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
define(["require", "exports", "esri/core/tsSupport/assignHelper", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "@dojo/framework/shim/IntersectionObserver", "dojo/i18n!esri/widgets/FeatureTemplates/nls/FeatureTemplates", "esri/core/HandleOwner", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/FeatureTemplates/FeatureTemplatesViewModel", "esri/widgets/FeatureTemplates/ItemList", "esri/widgets/support/widget"], function (require, exports, __assign, __extends, __decorate, IntersectionObserver_1, i18n, HandleOwner, watchUtils_1, decorators_1, Widget, FeatureTemplatesViewModel, ItemList_1, widget_1) {
    "use strict";
    IntersectionObserver_1 = __importDefault(IntersectionObserver_1);
    i18n = __importStar(i18n);
    var CSS = {
        base: "esri-feature-templates",
        loader: "esri-feature-templates__loader",
        itemIcon: "esri-feature-templates__list-item-icon",
        // common
        widget: "esri-widget"
    };
    function isGroup(itemOrGroup) {
        return itemOrGroup.items;
    }
    function getItemOrGroupId(itemOrGroup) {
        if (isGroup(itemOrGroup)) {
            return itemOrGroup.uid;
        }
        return itemOrGroup.layer.id;
    }
    var FeatureTemplates = /** @class */ (function (_super) {
        __extends(FeatureTemplates, _super);
        /**
         * The filter used when setting the [filterFunction](#filterFunction)
         * property. It takes an object containing a {@link module:esri/widgets/FeatureTemplates/TemplateItem#label name}
         * property of the {@link module:esri/widgets/FeatureTemplates/TemplateItem template item} and returns
         * whether or not to include it.
         *
         * @typedef {Function} FilterFunction
         * @param {Object} filterName - An object containing a `name` property.
         * @param {string} filterName.name - The {@link module:esri/widgets/FeatureTemplates/TemplateItem#label name}
         * of the {@link module:esri/widgets/FeatureTemplates/TemplateItem template item} to filter.
         *
         * @return {boolean} Function is a predicate, to test each element of the array.
         * Return `true` to keep {@link module:esri/widgets/FeatureTemplates/TemplateItem item} in the template widget, otherwise, `false`
         * to remove it.
         *
         * @example
         * // Filter and display templates only if their names contain the word `Street`
         * function myFilterFunction(filter) {
         *   let containsName = filter.name.includes("Street");
         *   return containsName;
         * }
         *
         * // Create the FeatureTemplates widget
         * templates = new FeatureTemplates({
         *   container: "templatesDiv",
         *   filterEnabled: false, // disable the default filter UI
         *   layers: [featureLayer], // in this example, one layer is used
         *   filterFunction: myFilterFunction
         * });
         */
        /**
         * The function used when setting the [groupBy](#groupBy) property. It is
         * used to customize the grouping of {@link module:esri/widgets/FeatureTemplates/TemplateItem template items}. This can aid
         * in managing various template items and how they display within the widget. This takes an object containing a
         * `template` and a `layer` property.
         *
         * @typedef {Function} GroupByFunction
         * @param {Object} grouping - An object containing the properties referenced below.
         *
         * @param {module:esri/layers/FeatureLayer} grouping.layer - {@link module:esri/layers/FeatureLayer} instance referenced in [layers](#layers) property.
         * @param {module:esri/layers/support/FeatureTemplate} grouping.template - {@link module:esri/layers/support/FeatureTemplate} associated with the `layer`.
         * @return {string | Object} Groups consist of a group `key` and `label`. These are shown in the UI. If both
         * the `key` and `label` are identical, return a `string`. Otherwise, return an `object` with
         * `key/name` properties. This gives finer control of the groups.
         *
         * @example
         * // This example shows using a function to check if
         * // the layer title contains the word 'military'. If so,
         * // return a group of items called "All Military Templates"
         * function customGroup(grouping) {
         *   // Consolidate all military layers
         *   if (grouping.layer.title.toLowerCase().indexOf("military") > -1) {
         *     return "All Military Templates"
         *   }
         * // Otherwise, group by layer title
         *   return grouping.layer.title;
         * }
         *
         * // Create the FeatureTemplates widget
         * templates = new FeatureTemplates({
         *   container: "templatesDiv",
         *   layers: layers,
         *   groupBy: customGroup
         * });
         *
         * @example
         * // group template items by layers.
         * // this function is as same as setting
         * // groupBy property to "layer" option.
         * function groupByLayer (grouping) {
         *   const group = {
         *     key: grouping.layer,
         *     name: grouping.layer.title
         *   };
         *   return group;
         * }
         *
         * // Create the FeatureTemplates widget
         * templates = new FeatureTemplates({
         *   container: "templatesDiv",
         *   layers: layers,
         *   groupBy: groupByLayer
         * });
         */
        /**
         * Fires when a {@link module:esri/widgets/FeatureTemplates/TemplateItem template item} is selected.
         * This occurs when the associated view model's {@link module:esri/widgets/FeatureTemplates/FeatureTemplatesViewModel#select select} method
         * is called.
         *
         * @event module:esri/widgets/FeatureTemplates#select
         * @property {module:esri/widgets/FeatureTemplates/TemplateItem} item - The selected template item.
         * @property {module:esri/layers/support/FeatureTemplate} template - The feature template associated with the template item.
         *
         * @see [Sample - Update FeatureLayer using ApplyEdits](../sample-code/editing-applyedits/index.html)
         * @example
         * // Listen for when a template item is selected
         * templates.on("select", function(evtTemplate) {
         *   // Access the selected template item's attributes
         *   attributes = evtTemplate.template.prototype.attributes;
         *
         *   // Create a new feature with the selected template at cursor location
         *   const handler = view.on("click", function(event) {
         *     handler.remove(); // remove click event handler.
         *     event.stopPropagation(); // stop click event propagation
         *
         *     if (event.mapPoint) {
         *       // Create a new feature with the selected template item.
         *       editFeature = new Graphic({
         *         geometry: event.mapPoint,
         *           attributes: {
         *             "IncidentType": attributes.IncidentType
         *           }
         *       });
         *
         *       // Setup the applyEdits parameter with adds.
         *       const edits = {
         *         addFeatures: [editFeature]
         *       };
         *       featureLayer.applyEdits(params).then(function(editsResult) {
         *         if (editsResult.addFeatureResults.length > 0) {
         *           console.log("Created a new feature.")
         *         }
         *       });
         *     }
         *   });
         * });
         */
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @extends module:esri/widgets/Widget
         * @constructor
         * @alias module:esri/widgets/FeatureTemplates
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                            that may be passed into the constructor.
         *
         * @example
         * // Typical usage
         * const templates = new FeatureTemplates({
         *   container: "templatesDiv",
         *   layers: layers
         * });
         */
        function FeatureTemplates(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._iconIntersectionObserver = new IntersectionObserver_1.default(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var node_1 = entry.target;
                        if (!node_1["data-has-icon"]) {
                            node_1["data-has-icon"] = true;
                            var item_1 = node_1["data-item"];
                            item_1.fetchThumbnail().then(function () {
                                if (item_1.thumbnail) {
                                    node_1.appendChild(item_1.thumbnail);
                                }
                            });
                        }
                        observer.unobserve(node_1);
                    }
                });
            });
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  filterEnabled
            //----------------------------------
            /**
             * When `true`, displays the template [filter](#filterFunction).
             *
             * ![featureTemplatesFilter](../../assets/img/apiref/widgets/featureTemplatesFilter.png)
             *
             * @name filterEnabled
             * @type boolean
             * @instance
             * @default true
             *
             */
            _this.filterEnabled = true;
            //----------------------------------
            //  filterFunction
            //----------------------------------
            /**
             * {@link module:esri/widgets/FeatureTemplates~FilterFunction function} can be defined to help filter
             * {@link module:esri/widgets/FeatureTemplates/TemplateItem template items} within the widget.
             * A custom function can be used to aid when searching for templates. It takes a function which passes in
             * an object containing a {@link module:esri/widgets/FeatureTemplates/TemplateItem#label name}
             * property of the {@link module:esri/widgets/FeatureTemplates/TemplateItem template item}.
             *
             * ![featureTemplatesFilterFunction](../../assets/img/apiref/widgets/featureTemplatesFilterFunction.png)
             *
             * @name filterFunction
             * @type {module:esri/widgets/FeatureTemplates~FilterFunction}
             * @instance
             *
             * @example
             * // Filter and display templates only if their names contain the word `Street`
             * function myFilterFunction(filter) {
             *   let containsName = filter.name.includes("Street");
             *   return containsName;
             * }
             *
             * // Create the FeatureTemplates widget
             * templates = new FeatureTemplates({
             *   container: "templatesDiv",
             *   filterEnabled: false, // disable the default filter UI
             *   layers: [featureLayer], // in this example, one layer is used
             *   filterFunction: myFilterFunction
             * });
             */
            _this.filterFunction = null;
            //----------------------------------
            //  filterText
            //----------------------------------
            /**
             * Text used to filter items.
             *
             * @name filterText
             * @instance
             * @type string
             */
            _this.filterText = "";
            //----------------------------------
            //  groupBy
            //----------------------------------
            /**
             * It is possible to group {@link module:esri/widgets/FeatureTemplates/TemplateItem template items}. This can aid
             * in managing various template items and how they display within the widget. The values are discussed below.
             *
             * Type | Description | Example
             * ----- | ----------- | -------
             * layer | This is the *default* grouping. Groups template items by layers. | ![featureTemplatesGroupByLayer](../../assets/img/apiref/widgets/groupByLayers.png)
             * geometry | Groups template items by geometry type. | ![FeatureTemplatesGroupByGeometry](../../assets/img/apiref/widgets/groupByGeometry.png)
             * none | The widget displays everything in one list with no grouping. | ![featureTemplatesGroupByLayer](../../assets/img/apiref/widgets/groupByNone.png)
             * {@link module:esri/widgets/FeatureTemplates~GroupByFunction} | Custom function that takes an object containing a {@link module:esri/layers/support/FeatureTemplate} and {@link module:esri/layers/FeatureLayer}. | ![FeatureTemplatesGroupByCustomGroupFunction](../../assets/img/apiref/widgets/groupCustomGroup.png)
             *
             * @name groupBy
             * @type {string | module:esri/widgets/FeatureTemplates~GroupByFunction}
             * @instance
             * @default layer
             *
             * @example
             * // This example shows using a function to check if
             * // the layer title contains the word 'military'. If so,
             * // return a group of items called "All Military Templates"
             * function customGroup(grouping) {
             *   // Consolidate all military layers
             *   if (grouping.layer.title.toLowerCase().indexOf("military") > -1) {
             *     return "All Military Templates"
             *   }
             * // Otherwise, group by layer title
             *   return grouping.layer.title;
             * }
             *
             * // Create the FeatureTemplates widget
             * templates = new FeatureTemplates({
             *   container: "templatesDiv",
             *   layers: layers,
             *   groupBy: customGroup
             * });
             */
            _this.groupBy = null;
            //----------------------------------
            //  layers
            //----------------------------------
            /**
             * An array of {@link module:esri/layers/FeatureLayer Featurelayers}
             * to display within the widget. The order in which these layers are
             * set in the array dictates how they display within the widget.
             *
             * ::: esri-md class="panel trailer-1"
             * The widget is designed to only display layers that are enabled for editing.
             * It will not display layers that are enabled to only edit attributes.
             * :::
             *
             * @name layers
             * @type {module:esri/layers/FeatureLayer[]}
             * @instance
             *
             * @example
             * // The layers to display within the widget
             * let militaryUnits = new FeatureLayer({
             *   url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Military/FeatureServer/2"
             * });
             *
             * let militaryHostile = new FeatureLayer({
             *   url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Military/FeatureServer/6"
             * });
             *
             * let layers = [militaryUnits, militaryHostile];
             *
             * // Create FeatureTemplates widget
             * templates = new FeatureTemplates({
             *   container: "templatesDiv",
             *   layers: layers
             * });
             */
            _this.layers = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            /**
             * The view model for this widget. This is a class that contains all the logic
             * (properties and methods) that controls this widget's behavior. See the
             * {@link module:esri/widgets/FeatureTemplates/FeatureTemplatesViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/FeatureTemplates/FeatureTemplatesViewModel}
             * @autocast
             */
            _this.viewModel = new FeatureTemplatesViewModel();
            _this.renderItemIcon = _this.renderItemIcon.bind(_this);
            _this._afterItemCreateOrUpdate = _this._afterItemCreateOrUpdate.bind(_this);
            _this._afterItemRemoved = _this._afterItemRemoved.bind(_this);
            return _this;
        }
        FeatureTemplates.prototype.postInitialize = function () {
            var _this = this;
            var nameBasedFilter = function (_a) {
                var label = _a.label;
                return !_this.filterText || label.toLowerCase().indexOf(_this.filterText.toLowerCase()) > -1;
            };
            this.own(watchUtils_1.init(this, "viewModel", function (value, oldValue) {
                if (value && !value.filterFunction) {
                    _this.filterFunction = nameBasedFilter;
                }
                if (oldValue && oldValue !== value && oldValue.filterFunction === nameBasedFilter) {
                    oldValue.filterFunction = null;
                }
            }));
        };
        FeatureTemplates.prototype.destroy = function () {
            if (this._iconIntersectionObserver) {
                this._iconIntersectionObserver.disconnect();
                this._iconIntersectionObserver = null;
            }
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        FeatureTemplates.prototype.render = function () {
            var _this = this;
            var _a = this, filterText = _a.filterText, filterEnabled = _a.filterEnabled, _b = _a.viewModel, items = _b.items, state = _b.state;
            return (widget_1.tsx("div", { class: this.classes(CSS.base, CSS.widget), "aria-label": i18n.widgetLabel }, state === "loading"
                ? this.renderLoader()
                : state === "ready"
                    ? ItemList_1.ItemList({
                        id: this.id,
                        identify: getItemOrGroupId,
                        filterText: filterText,
                        items: items,
                        messages: {
                            filterPlaceholder: i18n.filterPlaceholder,
                            noItems: i18n.noItems,
                            noMatches: i18n.noMatches
                        },
                        filterEnabled: filterEnabled,
                        onItemSelect: function (item) {
                            _this.viewModel.select(item);
                        },
                        onFilterChange: function (value) {
                            _this.filterText = value;
                            _this.viewModel.refresh();
                        },
                        renderIcon: this.renderItemIcon
                    })
                    : null));
        };
        //--------------------------------------------------------------------------
        //
        //  Protected Methods
        //
        //--------------------------------------------------------------------------
        FeatureTemplates.prototype.renderItemIcon = function (_a) {
            var item = _a.item;
            return (widget_1.tsx("span", { key: "icon", class: CSS.itemIcon, afterCreate: this._afterItemCreateOrUpdate, afterUpdate: this._afterItemCreateOrUpdate, afterRemoved: this._afterItemRemoved, "data-item": item, "data-has-icon": false }));
        };
        FeatureTemplates.prototype.renderLoader = function () {
            return widget_1.tsx("div", { class: CSS.loader, key: "loader" });
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        FeatureTemplates.prototype._afterItemCreateOrUpdate = function (node) {
            this._iconIntersectionObserver.observe(node);
        };
        FeatureTemplates.prototype._afterItemRemoved = function (node) {
            this._iconIntersectionObserver.unobserve(node);
        };
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], FeatureTemplates.prototype, "filterEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.filterFunction")
        ], FeatureTemplates.prototype, "filterFunction", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], FeatureTemplates.prototype, "filterText", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.groupBy")
        ], FeatureTemplates.prototype, "groupBy", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.layers")
        ], FeatureTemplates.prototype, "layers", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable(["viewModel.items", "viewModel.state"]),
            widget_1.vmEvent("select")
        ], FeatureTemplates.prototype, "viewModel", void 0);
        FeatureTemplates = __decorate([
            decorators_1.subclass("esri.widgets.FeatureTemplates")
        ], FeatureTemplates);
        return FeatureTemplates;
    }(decorators_1.declared(Widget, HandleOwner)));
    return FeatureTemplates;
});
//# sourceMappingURL=FeatureTemplates.js.map