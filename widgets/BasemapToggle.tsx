/**
 * The BasemapToggle provides a widget which allows an end-user to switch between
 * two basemaps. The toggled basemap is set inside the [view's](#view)
 * {@link module:esri/views/View#map map} object.
 *
 * ![basemap-toggle](../../assets/img/apiref/widgets/basemap-toggle.png)
 *
 * @module esri/widgets/BasemapToggle
 * @since 4.0
 *
 * @see [BasemapToggle.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/BasemapToggle.tsx)
 * @see [BasemapToggle.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_BasemapToggle.scss)
 * @see [Sample - Intro to widgets using BasemapToggle](../sample-code/intro-widgets/index.html)
 * @see module:esri/widgets/BasemapToggle/BasemapToggleViewModel
 *
 * @example
 * // Create a map with an initial basemap
 * var map = new Map({
 *   basemap: "streets",  // The initial basemap to toggle from
 *   ground: "world-elevation"
 * });
 *
 * // Reference the map in the view instance
 * var view = new SceneView({
 *   container: "viewDiv",
 *   map: map
 * });
 *
 * var basemapToggle = new BasemapToggle({
 *   view: view,  // The view that provides access to the map's "streets" basemap
 *   nextBasemap: "hybrid"  // Allows for toggling to the "hybrid" basemap
 * });
 */

/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

// dojo
import * as i18n from "dojo/i18n!esri/widgets/BasemapToggle/nls/BasemapToggle";

// esri
import Basemap = require("esri/Basemap");

// esri.core.accessorSupport
import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";

// esri.views
import View = require("esri/views/View");

// esri.widgets
import Widget = require("esri/widgets/Widget");

// esri.widgets.BasemapToggle
import BasemapToggleViewModel = require("esri/widgets/BasemapToggle/BasemapToggleViewModel");

// esri.widgets.support
import { VNode } from "esri/widgets/support/interfaces";
import { accessibleHandler, renderable, tsx, vmEvent } from "esri/widgets/support/widget";

const CSS: any = {
  base: "esri-basemap-toggle esri-widget",
  secondaryBasemapImage: "esri-basemap-toggle__image--secondary",

  container: "esri-basemap-thumbnail esri-basemap-toggle__container",
  image: "esri-basemap-thumbnail__image esri-basemap-toggle__image",
  overlay: "esri-basemap-thumbnail__overlay esri-basemap-toggle__image-overlay",
  title: "esri-basemap-thumbnail__title esri-basemap-toggle__title",

  // common
  disabled: "esri-disabled"
};

function getThumbnailStyles(basemap: Basemap): HashMap<string> {
  const thumbnailUrl = BasemapToggleViewModel.getThumbnailUrl(basemap);

  return thumbnailUrl ? { backgroundImage: "url(" + thumbnailUrl + ")" } : { backgroundImage: "" };
}

@subclass("esri.widgets.BasemapToggle")
class BasemapToggle extends declared(Widget) {
  /**
   * Fires after the [toggle()](#toggle) method is called.
   *
   * @event module:esri/widgets/BasemapToggle#toggle
   * @property {module:esri/Basemap} current - The map's current basemap.
   * @property {module:esri/Basemap} previous - The map's previous basemap.
   *
   * @see [toggle()](#toggle)
   *
   * @example
   * basemapToggle.on('toggle', function(event){
   *   console.log("current basemap title: ", event.current.title);
   *   console.log("previous basemap title: ", event.previous.title);
   * });
   */

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * @constructor
   * @alias module:esri/widgets/BasemapToggle
   * @extends module:esri/widgets/Widget
   * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
   *                              that may be passed into the constructor.
   *
   * @example
   * // typical usage
   * var basemapToggle = new BasemapToggle({
   *   view: view,
   *   nextBasemap: "satellite"
   * });
   */
  constructor(params?: any) {
    super();
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  activeBasemap
  //----------------------------------

  /**
   * The map's {@link module:esri/Map#basemap basemap}.
   *
   * @readonly
   * @type {module:esri/Basemap}
   * @name activeBasemap
   * @instance
   */
  @aliasOf("viewModel.activeBasemap")
  @renderable()
  activeBasemap: Basemap = null;

  //----------------------------------
  //  nextBasemap
  //----------------------------------

  /**
   * The next basemap for toggling. One of the following values may be set to this property:
   *
   * * The {@link module:esri/Map#basemap string ID} of any Esri basemap.
   * * A custom {@link module:esri/Basemap} object. Since this property may be
   * [autocast](../guide/autocasting/index.html), the {@link module:esri/Basemap}
   * module does not need to be included in the `require()` function in most applications.
   *
   * @instance
   * @name nextBasemap
   * @type {module:esri/Basemap}
   * @autocast { "value": "String | Object" }
   */
  @aliasOf("viewModel.nextBasemap")
  @renderable()
  nextBasemap: Basemap = null;

  //----------------------------------
  //  titleVisible
  //----------------------------------

  /**
   * Indicates if the title of the basemap is visible in the widget.
   *
   * @name titleVisible
   * @instance
   *
   * @type {boolean}
   * @default false
   */
  @property()
  @renderable()
  titleVisible = false;

  //----------------------------------
  //  view
  //----------------------------------

  /**
   * A reference to the {@link module:esri/views/MapView} or {@link module:esri/views/SceneView}. This view
   * provides the BasemapToggle widget with access to the initial
   * {@link module:esri/Map#basemap basemap} to toggle from
   * via the view's {@link module:esri/views/View#map map} property.
   *
   * @name view
   * @instance
   * @type {module:esri/views/MapView | module:esri/views/SceneView}
   */
  @aliasOf("viewModel.view")
  @renderable()
  view: View = null;

  //----------------------------------
  //  viewModel
  //----------------------------------

  /**
   * The view model for this widget. This is a class that contains all the logic
   * (properties and methods) that controls this widget's behavior. See the
   * {@link module:esri/widgets/BasemapToggle/BasemapToggleViewModel} class to access
   * all properties and methods on the widget.
   *
   * @name viewModel
   * @instance
   * @type {module:esri/widgets/BasemapToggle/BasemapToggleViewModel}
   * @autocast
   */
  @vmEvent("toggle")
  @property({
    type: BasemapToggleViewModel
  })
  @renderable("viewModel.state")
  viewModel: BasemapToggleViewModel = new BasemapToggleViewModel();

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Toggles to the [next basemap](#nextBasemap).
   * @method
   */
  @aliasOf("viewModel.toggle")
  toggle(): void {}

  render(): VNode {
    const vm = this.viewModel;
    const activeBasemap = vm.state === "disabled" ? null : vm.activeBasemap;
    const nextBasemap = vm.state === "disabled" ? null : vm.nextBasemap;
    const title = nextBasemap ? nextBasemap.title : "";

    let titleNode: any;

    if (this.titleVisible && title) {
      titleNode = (
        // need key to distinguish children - see http://maquettejs.org/docs/rules.html
        <div class={CSS.overlay} key="esri-basemap-toggle__overlay">
          <span class={CSS.title} title={title}>
            {title}
          </span>
        </div>
      );
    }

    return (
      <div
        class={CSS.base}
        role="button"
        data-basemap-id={nextBasemap ? nextBasemap.id : ""}
        bind={this}
        onclick={this._toggle}
        onkeydown={this._toggle}
        tabIndex={0}
        title={i18n.toggle}
      >
        <div class={CSS.container}>
          <div class={CSS.image} styles={getThumbnailStyles(nextBasemap)} />
          {titleNode}
        </div>
        <div class={this.classes(CSS.container, CSS.secondaryBasemapImage)}>
          <div class={CSS.image} styles={getThumbnailStyles(activeBasemap)} />
        </div>
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  @accessibleHandler()
  private _toggle(): void {
    this.toggle();
  }
}

export = BasemapToggle;
