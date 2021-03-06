/**
 * The DirectLineMeasurement3D widget calculates and displays the 3D distance between two points.
 * This widget can be used in a {@link module:esri/views/SceneView} to measure the vertical, horizontal,
 * and direct distance between two points.
 *
 * [![measurement-line-3d](../../assets/img/apiref/widgets/direct-line-measurement-3d-sample.png)](../sample-code/widgets-measurement-3d/index.html)
 *
 * When the widget is active, a horizontal "laser" line is drawn which indicates the height at the current mouse position.
 * This line can help in analyzing the heights of objects relative to each other and the terrain.
 * A second laser line shows the intersection of the scene with the vertical plane that passes through the checkered line.
 *
 * DirectLineMeasurement3D widget labels the direct, horizontal, and vertical orange distance lines and displays the same values
 * in the UI panel. In a WGS84 or WebMercator scene, when the distance between the points is greater than 100 km,
 * DirectLineMeasurement3D widget switches to displaying only the Horizontal and Vertical distances taking into consideration
 * the curvature of the earth (i.e. ellipsoid-based geodesic distance).
 *
 * ![measurement-line-3d](../../assets/img/apiref/widgets/direct-line-measurement-3d.png)
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * This widget is designed to work with 3D SceneViews. For measurements with 2D MapViews, use
 * {@link module:esri/widgets/DistanceMeasurement2D}.
 *
 * :::
 *
 * @example
 * var measurementWidget = new DirectLineMeasurement3D({
 *   view: view
 * });
 *
 * view.ui.add(measurementWidget, "top-right");
 *
 * @module esri/widgets/DirectLineMeasurement3D
 * @since 4.6
 *
 * @see [DirectLineMeasurement3D.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/DirectLineMeasurement3D.tsx)
 * @see [DirectLineMeasurement3D.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_DirectLineMeasurement3D.scss)
 * @see [Sample - Measurement in 3D](../sample-code/widgets-measurement-3d/index.html)
 * @see {@link module:esri/widgets/DirectLineMeasurement3D/DirectLineMeasurement3DViewModel}
 * @see {@link module:esri/widgets/AreaMeasurement3D}
 * @see {@link module:esri/views/View#ui View.ui}
 * @see {@link module:esri/views/ui/DefaultUI}
 */

/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

// dojo
import * as i18n from "dojo/i18n!esri/widgets/DirectLineMeasurement3D/nls/DirectLineMeasurement3D";

// esri.core.accessorSupport
import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";

// esri.views
import View = require("esri/views/View");

// esri.widgets
import Widget = require("esri/widgets/Widget");

// esri.widgets.DirectLineMeasurement3D
import DirectLineMeasurement3DViewModel = require("esri/widgets/DirectLineMeasurement3D/DirectLineMeasurement3DViewModel");

// esri.widgets.support
import { VNode } from "esri/widgets/support/interfaces";
import { accessibleHandler, renderable, tsx } from "esri/widgets/support/widget";

const CSS = {
  // common
  button: "esri-button esri-button--secondary",
  buttonDisabled: "esri-button--disabled",
  // base
  base: "esri-direct-line-measurement-3d esri-widget esri-widget--panel",
  // container
  container: "esri-direct-line-measurement-3d__container",
  // hint
  hint: "esri-direct-line-measurement-3d__hint",
  hintText: "esri-direct-line-measurement-3d__hint-text",
  panelError: "esri-direct-line-measurement-3d__panel--error",
  // measurement
  measurement: "esri-direct-line-measurement-3d__measurement",
  measurementItem: "esri-direct-line-measurement-3d__measurement-item",
  measurementItemDisabled: "esri-direct-line-measurement-3d__measurement-item--disabled",
  measurementItemTitle: "esri-direct-line-measurement-3d__measurement-item-title",
  measurementItemValue: "esri-direct-line-measurement-3d__measurement-item-value",
  // units
  settings: "esri-direct-line-measurement-3d__settings",
  units: "esri-direct-line-measurement-3d__units",
  unitsLabel: "esri-direct-line-measurement-3d__units-label",
  unitsSelect: "esri-direct-line-measurement-3d__units-select esri-select",
  unitsSelectWrapper: "esri-direct-line-measurement-3d__units-select-wrapper",
  // clear
  actionSection: "esri-direct-line-measurement-3d__actions",
  clearButton: "esri-direct-line-measurement-3d__clear-button"
};

@subclass("esri.widgets.DirectLineMeasurement3D")
class DirectLineMeasurement3D extends declared(Widget) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * @constructor
   * @alias module:esri/widgets/DirectLineMeasurement3D
   * @extends module:esri/widgets/Widget
   * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
   *                                that may be passed into the constructor.
   *
   * @example
   * // typical usage
   * var measurementWidget = new DirectLineMeasurement3D({
   *   view: view
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
  //  view
  //----------------------------------
  /**
   * A reference to the {@link module:esri/views/SceneView}. Set this to link the widget to a specific view.
   *
   * @name view
   * @instance
   * @type {module:esri/views/SceneView}
   */
  @aliasOf("viewModel.view")
  view: View = null;

  //----------------------------------
  //  visible
  //----------------------------------

  /**
   * Indicates whether the widget is visible.
   *
   * @name visible
   * @instance
   * @type {boolean}
   * @ignore
   */
  @aliasOf("viewModel.visible")
  @renderable()
  visible: boolean = null;

  //----------------------------------
  //  active
  //----------------------------------

  /**
   * Indicates whether the widget is active.
   *
   * @name active
   * @instance
   * @type {boolean}
   * @ignore
   */
  @aliasOf("viewModel.active")
  @renderable()
  active: boolean;

  //----------------------------------
  //  viewModel
  //----------------------------------

  /**
   * The view model for this widget. This is a class that contains all the logic
   * (properties and methods) that controls this widget's behavior. See the
   * {@link module:esri/widgets/DirectLineMeasurement3D/DirectLineMeasurement3DViewModel} class to access
   * all properties and methods on the widget.
   *
   * @name viewModel
   * @instance
   * @since 4.7
   * @type {module:esri/widgets/DirectLineMeasurement3D/DirectLineMeasurement3DViewModel}
   * @autocast
   */
  @property({
    type: DirectLineMeasurement3DViewModel
  })
  @renderable([
    "viewModel.state",
    "viewModel.unitOptions",
    "viewModel.unit",
    "viewModel.measurement"
  ])
  viewModel: DirectLineMeasurement3DViewModel = new DirectLineMeasurement3DViewModel();

  //----------------------------------
  //  unitOptions
  //----------------------------------
  /**
   * List of unit systems (imperial, metric) and specific units for displaying the distance values.
   * By default, the following units are included: `metric`, `imperial`, `inches`, `feet`, `us-feet`, `yards`, `miles`, `nautical-miles`, `meters`, `kilometers`.
   *
   * @name unitOptions
   * @instance
   * @since 4.7
   * @type {string[]}
   */
  @aliasOf("viewModel.unitOptions")
  unitOptions: Array<DirectLineMeasurement3DViewModel.Unit> = null;

  //----------------------------------
  //  unit
  //----------------------------------
  /**
   * Unit system (imperial, metric) or specific unit used for displaying the distance values.
   *
   * **Possible Values:** metric | imperial | inches | feet | us-feet | yards | miles | nautical-miles | meters | kilometers
   *
   * @name unit
   * @instance
   * @since 4.8
   * @type {string}
   */
  @aliasOf("viewModel.unit")
  unit: DirectLineMeasurement3DViewModel.Unit = null;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const isSupported = this.viewModel.isSupported;
    const isActive = this.viewModel.active;
    const isDisabled = this.viewModel.state === "disabled";
    const isReady = this.viewModel.state === "ready";
    const isMeasuring = this.viewModel.state === "measuring" || this.viewModel.state === "measured";
    const measurement = this.viewModel.measurement;

    const hintNode =
      isActive && isReady ? (
        <section key="esri-direct-line-measurement-3d__hint" class={CSS.hint}>
          <p class={CSS.hintText}>{i18n.hint}</p>
        </section>
      ) : null;

    const unsupportedNode = !isSupported ? (
      <section key="esri-direct-line-measurement-3d__unsupported" class={CSS.panelError}>
        <p>{i18n.unsupported}</p>
      </section>
    ) : null;

    const measurementLabelNode = (
      title: string,
      value: DirectLineMeasurement3DViewModel.MeasurementValue,
      key: string
    ) => {
      switch (value.state) {
        case "available":
          return (
            <div key={`${key}-enabled`} class={CSS.measurementItem}>
              <span class={CSS.measurementItemTitle}>{title}</span>
              <span class={CSS.measurementItemValue}>{value.text}</span>
            </div>
          );

        case "unavailable":
          return (
            <div
              key={`${key}-disabled`}
              class={this.classes(CSS.measurementItem, CSS.measurementItemDisabled)}
            >
              <span class={CSS.measurementItemTitle}>{title}</span>
            </div>
          );
      }
    };

    const measurementNode = isMeasuring ? (
      <section key="esri-direct-line-measurement-3d__measurement" class={CSS.measurement}>
        {measurementLabelNode(i18n.direct, measurement.directDistance, "direct")}
        {measurementLabelNode(i18n.horizontal, measurement.horizontalDistance, "horizontal")}
        {measurementLabelNode(i18n.vertical, measurement.verticalDistance, "vertical")}
      </section>
    ) : null;

    const unitsId = `${this.id}__units`;

    const unitsLabelNode = (
      <label class={CSS.unitsLabel} for={unitsId}>
        {i18n.unit}
      </label>
    );

    const unitsSelectNode = (
      <div class={CSS.unitsSelectWrapper}>
        <select class={CSS.unitsSelect} id={unitsId} onchange={this._changeUnit} bind={this}>
          {this.viewModel.unitOptions.map((unit) =>
            unit === this.viewModel.unit ? (
              <option key={unit} value={unit} selected>
                {i18n.units[unit]}
              </option>
            ) : (
              <option key={unit} value={unit}>
                {i18n.units[unit]}
              </option>
            )
          )}
        </select>
      </div>
    );

    const unitsNode = (
      <section key="esri-direct-line-measurement-3d__units" class={CSS.units}>
        {unitsLabelNode}
        {unitsSelectNode}
      </section>
    );

    const settingsNode = isMeasuring ? (
      <div key="settings" class={CSS.settings}>
        {unitsNode}
      </div>
    ) : null;

    const newMeasurementNode =
      isSupported && (!isActive || isMeasuring) ? (
        <div class={CSS.actionSection}>
          <button
            disabled={isDisabled}
            class={this.classes(CSS.button, CSS.clearButton, isDisabled && CSS.buttonDisabled)}
            bind={this}
            onclick={this._newMeasurement}
          >
            {i18n.newMeasurement}
          </button>
        </div>
      ) : null;

    const containerNode = this.visible ? (
      <div class={CSS.container}>
        {unsupportedNode}
        {hintNode}
        {settingsNode}
        {measurementNode}
        {newMeasurementNode}
      </div>
    ) : null;

    return (
      <div key="" class={CSS.base} role="presentation">
        {containerNode}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  @accessibleHandler()
  private _newMeasurement(): void {
    this.viewModel.newMeasurement();
  }

  @accessibleHandler()
  private _changeUnit(event: Event): void {
    const target = event.target as HTMLSelectElement;

    const selected = target.options[target.selectedIndex];

    if (selected) {
      this.unit = selected.value as DirectLineMeasurement3DViewModel.Unit;
    }
  }
}

export = DirectLineMeasurement3D;
