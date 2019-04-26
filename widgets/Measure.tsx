/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

// esri.core.accessorSupport
import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";
import Widget = require("esri/widgets/Widget");
// esri.views
import View = require("esri/views/View");
import DistanceMeasurement2D = require("esri/widgets/DistanceMeasurement2D");
import AreaMeasurement2D = require("esri/widgets/AreaMeasurement2D");
import CoordinateConversion = require("esri/widgets/CoordinateConversion");
// esri.widgets.support
import { VNode } from "esri/widgets/support/interfaces";
import { accessibleHandler, renderable, storeNode, tsx } from "esri/widgets/support/widget";

const CSS = {
    base: "esri-print esri-widget esri-widget--panel",
    layoutTabList: "esri-print__layout-tab-list",
    layoutTab: "esri-print__layout-tab",
    layoutSection: "esri-print__layout-section",
    panelVisible: "esri-measure__panel-visible",
    panelNotVisible: "esri-measure__panel-not-visible",
    // clear
    actionSection: "esri-area-measurement-3d__actions",
    clearButton: "esri-area-measurement-3d__clear-button"   ,
    button: "esri-button esri-button--secondary",
    buttonDisabled: "esri-button--disabled",     
};

@subclass("esri.widgets.HelloWorld")
class Measure extends declared(Widget) {

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------
  //----------------------------------
  //  view
  //----------------------------------

  /**
   * A reference to the {@link module:esri/views/MapView}. Set this to link
   * the widget to a specific view.
   *
   * @todo REMOVE UNTIL SCENEVIEW SUPPORTS PRINTING or {@link module:esri/views/SceneView}
   *
   * @name view
   * @instance
   *
   * @type {module:esri/views/MapView}
   */

  @renderable()
  view: View = null;

 
  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------


  private _lineTabSelected = true; 
  private _areaTabSelected = false; 
  private _ccTabSelected  = false; 
  private _linepanel = null;
  private _areapanel = null;
  private _ccpanel = null;
  private _line:DistanceMeasurement2D;
  private _area:AreaMeasurement2D;
  private _cc:CoordinateConversion;
  private _rendered:boolean = false;
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
 
  render() {
      if (this._rendered) {
        if (!this._line) {
            this._line = new DistanceMeasurement2D({view: this.view, container:"esri-measure__lineContent"});
        }     
        if (!this._area) {
            this._area= new AreaMeasurement2D({view: this.view, container:"esri-measure__areaContent"});
        }      
        if (!this._cc) {
            this._cc = new CoordinateConversion({view: this.view, container:"esri-measure__ccContent"});   
        }          
      }
      this._rendered = true;
 
        let classes = [CSS.layoutSection];
        if (this._lineTabSelected) {
            classes.push(CSS.panelVisible)
        } else {
            classes.push(CSS.panelNotVisible);
        }
        this._linepanel = (
        <section
        key="esri-measure__lineContent"
        id="esri-measure__lineContent"
        aria-labelledby={`${this.id}__lineTab`}
        class={this.classes(classes)}
        role="tabpanel"
        //aria-selected={`${this._lineTabSelected}`}
        style={{display: this._lineTabSelected ? 'block' : 'none' }}        
        ><div id="lineDiv"></div>
      </section>);

        classes = [CSS.layoutSection];
        if (this._areaTabSelected) {
            classes.push(CSS.panelVisible)
        } else {
            classes.push(CSS.panelNotVisible);
        }
        this._areapanel = (
            <section
            key="esri-measure__areaContent"
            id="esri-measure__areaContent"
            aria-labelledby={`${this.id}__areaTab`}
            class={this.classes(classes)}
            role="tabpanel"
            style={{display: this._areaTabSelected ? 'block' : 'none' }}        

          ><div id="areaDiv"></div>
          </section>);
          classes = [CSS.layoutSection];
          if (this._ccTabSelected) {
              classes.push(CSS.panelVisible)
          } else {
              classes.push(CSS.panelNotVisible);
          }
    this._ccpanel = (
            <section
            key="esri-measure__ccContent"
            id="esri-measure__ccContent"
            aria-labelledby={`${this.id}__ccTab`}
            class={this.classes(classes)}
            role="tabpanel"
            style={{display: this._ccTabSelected ? 'block' : 'none' }}        

            ><div id="ccDiv"></div>
          </section>); 
 

    const normalPanel = (
        <div>
          <ul
            class={CSS.layoutTabList}
            role="tablist"
            onclick={this._toggleLayoutPanel}
            onkeydown={this._toggleLayoutPanel}
            bind={this}
          >
            <li
              id={`${this.id}__distanceTab`}
              data-tab-id="distanceTab"
              class={CSS.layoutTab}
              role="tab"
              tabIndex="0"
              aria-selected={`${this._lineTabSelected}`}
            >
              Distance
            </li>
            <li
              id={`${this.id}__areaTab`}
              data-tab-id="areaTab"
              class={CSS.layoutTab}
              role="tab"
              tabIndex="1"
              aria-selected={`${this._areaTabSelected}`}
            >
              Area
            </li>
            <li
              id={`${this.id}__coordTab`}
              data-tab-id="coordTab"
              class={CSS.layoutTab}
              role="tab"
              tabIndex="2"
              aria-selected={`${this._ccTabSelected}`}
            >
              Coordinates
            </li>            
          </ul>
          {this._linepanel}
          {this._areapanel}
          {this._ccpanel}       
          <div class={CSS.actionSection}>
          <button
           // disabled={isDisabled}
            class={this.classes(CSS.button, CSS.clearButton)}//, isDisabled && CSS.buttonDisabled)}
            bind={this}
            onclick={this._clearMeasurements}
            title="Clear Measurements"
            aria-label="Clear Measurements"
          >
            Clear Measurements
          </button>
        </div>                       
        </div>);
    return (
      <div class={this.classes(CSS.base)}>
        {normalPanel}
      </div>
      );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

@accessibleHandler()
private _toggleLayoutPanel(e: Event): void {
  //this._swapInputValue();

  const target = e.target as HTMLSelectElement;
  if (parseInt(target.getAttribute("tabindex")) === 0) {
    this._lineTabSelected = true;
    this._areaTabSelected = false;
    this._ccTabSelected = false;


  }
  if (parseInt(target.getAttribute("tabindex")) === 1) {
    this._areaTabSelected = true;
    this._lineTabSelected = false;
    this._ccTabSelected = false;


  }
  if (parseInt(target.getAttribute("tabindex")) === 2) {
    this._ccTabSelected = true;
    this._lineTabSelected = false;
    this._areaTabSelected = false;


  }

}

private _clearMeasurements() {
    this._area.viewModel.clearMeasurement();
    this._line.viewModel.clearMeasurement();

}   

}

export = Measure;