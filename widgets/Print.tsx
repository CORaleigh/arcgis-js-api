/**
 * The Print widget connects your application with a [printing service](https://server.arcgis.com/en/portal/latest/administer/windows/configure-the-portal-to-print-maps.htm) to allow the map to be printed.
 * It takes advantage of server-side, high-quality, full cartographic print functionality using the ExportWebMap service of ArcGIS,
 * which can be configured with custom layout templates. One is provided that shows the map only, while another provides a layout with legend, etc.
 * The Print widget works with the {@link module:esri/tasks/PrintTask} which generates a printer-ready version of the map.
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * * There is no current support for printing {@link module:esri/views/SceneView SceneViews}. Instead, see {@link module:esri/views/SceneView#takeScreenshot SceneView.takeScreenshot()}.
 * * {@link module:esri/layers/VectorTileLayer} printing requires ArcGIS Server 10.5.1 or later.
 * * {@link module:esri/layers/support/LabelClass Labels} currently cannot be printed as part of a FeatureLayer with ArcGIS Server 10.5.1 or any Printing Service published with ArcMap.
 * * {@link module:esri/layers/ImageryLayer} cannot be printed with ArcGIS Server 10.5.1 or earlier, or any Printing Service published with ArcMap.
 * * The print server does not directly print [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol) symbols. Rather, they are converted to {@link module:esri/symbols/PictureMarkerSymbol PictureMarkerSymbols} for display.
 * * Make certain that any resources to be printed are accessible by the print server. For example, if printing a map containing {@link module:esri/symbols/PictureMarkerSymbol PictureMarkerSymbols},
 * the URL to these symbols must be accessible to the print server for it to work properly.
 * * Printing layers rendered with the {@link module:esri/renderers/DotDensityRenderer} will create a client-side image of the layer in the printout.
 * * For printing secure VectorTileLayers with ArcGIS Server 10.5.1 or 10.6.0,
 * or for printing VectorTileLayers with ArcGIS Server 10.5.1 or any Printing Service published with [ArcMap](https://desktop.arcgis.com/en/arcmap/),
 * the {@link module:esri/tasks/PrintTask} will create a client-side image for the VectorTileLayer to use in the printout.
 * This has some limitations related to large size printing quality and a dependency on browser window height/width ratio.
 * :::
 *
 * @module esri/widgets/Print
 * @since 4.2
 *
 * @see [Print.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Print.tsx)
 * @see [Print.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Print.scss)
 * @see [Sample - Print widget](../sample-code/widgets-print/index.html)
 * @see module:esri/widgets/Print/PrintViewModel
 * @see [Printing in web applications](https://server.arcgis.com/en/server/latest/create-web-apps/windows/printing-in-web-applications.htm)
 * @see [Configure the portal to print maps](https://server.arcgis.com/en/portal/latest/administer/windows/configure-the-portal-to-print-maps.htm)
 * @see [Export Web Map Task (Geoprocessing service) [REST doc]](https://developers.arcgis.com/rest/services-reference/export-web-map-task.htm)
 *
 * @example
 * var print = new Print({
 *   view: view
 * });
 * // Adds widget below other elements in the top left corner of the view
 * view.ui.add(print, {
 *   position: "top-left"
 * });
 */

/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

// dojo
import * as i18n from "dojo/i18n!esri/widgets/Print/nls/Print";

// esri.core
import Collection = require("esri/core/Collection");
import EsriError = require("esri/core/Error");
import Logger = require("esri/core/Logger");
import urlUtils = require("esri/core/urlUtils");
import watchUtils = require("esri/core/watchUtils");

// esri.core.accessorSupport
import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";

// esri.tasks.support
import PrintTemplate = require("esri/tasks/support/PrintTemplate");

// esri.views
import View = require("esri/views/View");

// esri.widgets
import Widget = require("esri/widgets/Widget");

// esri.widgets.Print
import FileLink = require("esri/widgets/Print/FileLink");
import PrintViewModel = require("esri/widgets/Print/PrintViewModel");
import TemplateOptions = require("esri/widgets/Print/TemplateOptions");
import PrintTask = require("esri/tasks/PrintTask");
import PrintParameters = require("esri/tasks/support/PrintParameters");
// esri.widgets.support
import { VNode } from "esri/widgets/support/interfaces";
import { accessibleHandler, renderable, storeNode, tsx } from "esri/widgets/support/widget";

interface TemplateInfo {
  choiceList: string[];
  defaultValue: string;
}

interface TemplatesInfo {
  format: TemplateInfo;
  layout: TemplateInfo;
}

const FileLinkCollection = Collection.ofType<FileLink>(FileLink);

const CSS = {
  // base
  base: "esri-print esri-widget esri-widget--panel",
  // print-widget
  headerTitle: "esri-print__header-title",
  inputText: "esri-print__input-text",
  layoutTabList: "esri-print__layout-tab-list",
  layoutTab: "esri-print__layout-tab",
  layoutSection: "esri-print__layout-section",
  mapOnlySection: "esri-print__map-only-section",
  scaleInput: "esri-print__scale-input",
  // startup
  loader: "esri-print__loader",
  // buttons
  advancedOptionsButton: "esri-print__advanced-options-button",
  advancedOptionsButtonContainer: "esri-print__advanced-options-button-container",
  advancedOptionsButtonTitle: "esri-print__advanced-options-button-title",
  advancedOptionsButtonIconOpened: "esri-print__advanced-options-button-icon--opened",
  advancedOptionsButtonIconClosed: "esri-print__advanced-options-button-icon--closed",
  advancedOptionsButtonIconClosed_RTL: "esri-print__advanced-options-button-icon--closed-rtl",
  refreshButton: "esri-print__refresh-button",
  swapButton: "esri-print__swap-button",
  linkButton: "esri-print__link-button",
  printButton: "esri-print__export-button",
  // containers
  formSectionContainer: "esri-print__form-section-container",
  advancedOptionsSection: "esri-print__advanced-options-section",
  advancedOptionsContainer: "esri-print__advanced-options-container",
  authorInfoContainer: "esri-print__author-info-container",
  copyrightInfoContainer: "esri-print__copyright-info-container",
  exportedFilesContainer: "esri-print__export-panel-container",
  exportedFilesTitle: "esri-print__export-title",
  exportedFile: "esri-print__exported-file",
  exportedFileLink: "esri-widget__anchor esri-print__exported-file-link",
  exportedFileLinkTitle: "esri-print__exported-file-link-title",
  heightContainer: "esri-print__height-container",
  legendInfoContainer: "esri-print__legend-info-container",
  printWidgetContainer: "esri-print__container",
  panelContainer: "esri-print__panel-container",
  scaleInfoContainer: "esri-print__scale-info-container",
  scaleInputContainer: "esri-print__scale-input-container",
  sizeContainer: "esri-print__size-container",
  widthContainer: "esri-print__width-container",
  // common
  widgetButton: "esri-widget--button",
  button: "esri-button",
  select: "esri-select",
  header: "esri-widget__heading",
  input: "esri-input",
  disabled: "esri-disabled",
  anchorDisabled: "esri-widget__anchor--disabled",
  buttonDisabled: "esri-button--disabled",
  panelError: "esri-print__panel--error",
  exportedFileError: "esri-print__exported-file--error",
  hide: "esri-hidden",
  rotate: "esri-rotating",
  // icons
  iconCheckMark: "esri-icon-check-mark",
  iconDownload: "esri-icon-download",
  iconError: "esri-icon-error",
  iconPrinter: "esri-icon-printer",
  iconRightTriangleArrow: "esri-icon-right-triangle-arrow",
  iconLeftTriangleArrow: "esri-icon-left-triangle-arrow",
  iconDownArrow: "esri-icon-down-arrow",
  iconRefresh: "esri-icon-refresh",
  iconSpinner: "esri-icon-loading-indicator",
  iconSwap: "esri-icon-swap",
  iconLinked: "esri-icon-link-horizontal",
  iconUnlinked: "esri-icon-unlocked-link-horizontal",
  widgetIcon: "esri-icon-printer"
};

const declaredClass = "esri.widgets.Print";
const logger = Logger.getLogger(declaredClass);
const invalidLayoutWarningMessage =
  "User sets an invalid layout, resetting it to the default valid one...";
const invalidFormatWarningMessage =
  "User sets an invalid format, resetting it to the default valid one...";

@subclass("esri.widgets.Print")
class Print extends declared(Widget) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * @extends module:esri/widgets/Widget
   * @constructor
   * @alias module:esri/widgets/Print
   * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
   *                                that may be passed into the constructor.
   *
   * @example
   * // typical usage
   * var print = new Print({
   *   view: view,
   *   printServiceUrl: "https://www.example.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
   * });
   */
  constructor(params?: any) {
    super();
  }

  postInitialize(): void {
    this.own([
      watchUtils.init(this, "viewModel.templatesInfo", (templatesInfo: TemplatesInfo) => {
        const { format, layout } = this.templateOptions;

        if (templatesInfo) {
          const isValidLayout =
            layout === templatesInfo.layout.defaultValue ||
            (layout && layout.toUpperCase() === "MAP_ONLY") ||
            (templatesInfo.layout.choiceList &&
              templatesInfo.layout.choiceList.indexOf(layout) > -1);
          const isValidFormat =
            format === templatesInfo.format.defaultValue ||
            (templatesInfo.format.choiceList &&
              templatesInfo.format.choiceList.indexOf(format) > -1);

          if (!isValidLayout) {
            if (layout) {
              logger.warn(invalidLayoutWarningMessage);
            }

            this.templateOptions.layout = templatesInfo.layout.defaultValue;
          }

          if (!isValidFormat) {
            if (format) {
              logger.warn(invalidFormatWarningMessage);
            }

            this.templateOptions.format = templatesInfo.format.defaultValue;
          }

          if (layout && layout.toUpperCase() === "MAP_ONLY") {
            this._layoutTabSelected = false;
          }
        }
      }),

      watchUtils.init(this, "templateOptions.format", (newValue: string) => {
        const {
          viewModel: { templatesInfo }
        } = this;

        if (templatesInfo && newValue) {
          let isValidFormat = false;
          templatesInfo.format.choiceList &&
            templatesInfo.format.choiceList.forEach((option) => {
              if (option.toUpperCase() === newValue.toUpperCase()) {
                this.templateOptions.format = option;
                isValidFormat = true;
              }
            });

          if (!isValidFormat) {
            this.templateOptions.format = templatesInfo.format.defaultValue;
            logger.warn(invalidFormatWarningMessage);
          }

          this.scheduleRender();
        }
      }),

      watchUtils.init(this, "templateOptions.layout", (newValue: string) => {
        const {
          viewModel: { templatesInfo }
        } = this;

        if (templatesInfo && newValue) {
          this._layoutTabSelected = newValue.toUpperCase() !== "MAP_ONLY";
          let isValidLayout = false || !this._layoutTabSelected;

          if (!isValidLayout) {
            templatesInfo.layout.choiceList &&
              templatesInfo.layout.choiceList.forEach((option) => {
                if (option.toUpperCase() === newValue.toUpperCase()) {
                  this.templateOptions.layout = option;
                  isValidLayout = true;
                }
              });
          }

          if (!isValidLayout) {
            this.templateOptions.layout = templatesInfo.layout.defaultValue;
            logger.warn(invalidLayoutWarningMessage);
          }

          this.scheduleRender();
        }
      }),

      watchUtils.init(this, "templateOptions.dpi", (newValue: number) => {
        if (newValue <= 0) {
          this.templateOptions.dpi = 1;
          return;
        }

        this.scheduleRender();
      }),

      watchUtils.init(this, "viewModel.view.scale", (newValue: number) => {
        const { scale, scaleEnabled } = this.templateOptions;
        if (!scaleEnabled || !scale) {
          this.templateOptions.scale = newValue;
        }
      }),

      watchUtils.whenOnce(this, "printServiceUrl", () => {
        const maxWaitTime = 500;

        const timeoutId = setTimeout(() => {
          this._awaitingServerResponse = true;
          this.scheduleRender();
        }, maxWaitTime);

        this.viewModel.load().then(() => clearTimeout(timeoutId));
      })
    ]);

    const { height, width } = this.templateOptions;

    this.templateOptions.width = width || 800;
    this.templateOptions.height = height || 1100;
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  private _exportedFileNameMap: HashMap<number> = {};

  private _layoutTabSelected = true;

  private _advancedOptionsVisibleForLayout = false;

  private _advancedOptionsVisibleForMapOnly = false;

  private _pendingExportScroll = false;

  private _previousTitleOrFilename: string = "";

  private _rootNode: HTMLElement = null;

  private _awaitingServerResponse = false;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  exportedLinks
  //----------------------------------

  /**
   * @todo doc
   * @type {module:esri/core/Collection<module:esri/widgets/Print/FileLink>}
   * @ignore
   */
  @property({
    type: FileLinkCollection
  })
  @renderable()
  exportedLinks: Collection<FileLink> = new FileLinkCollection();

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
  @property()
  iconClass = CSS.widgetIcon;

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
  @property()
  label: string = i18n.widgetLabel;

  //----------------------------------
  //  templateOptions
  //----------------------------------

  /**
   * Defines the layout template options used by the {@link module:esri/widgets/Print|Print} widget to generate the print page.
   *
   * @name templateOptions
   * @since 4.6
   * @instance
   *
   * @example
   * templateOptions: {
   *   title: "My Print",
   *   author: "Sam",
   *   copyright: "My Company",
   *   legendEnabled: false
   * }
   *
   * @type {module:esri/widgets/Print/TemplateOptions}
   * @autocast
   */
  @renderable()
  @property({
    type: TemplateOptions
  })
  templateOptions: TemplateOptions = new TemplateOptions();

  //----------------------------------
  //  error
  //----------------------------------

  /**
   * The Error object returned if an error occurred while fetching information from service
   * @type {EsriError}
   * @ignore
   */
  @aliasOf("viewModel.error")
  error: EsriError;

  //----------------------------------
  //  printServiceUrl
  //----------------------------------

  /**
   * The URL of the REST endpoint of the Export Web Map Task.
   *
   * @name printServiceUrl
   * @instance
   * @type {string}
   */

  @aliasOf("viewModel.printServiceUrl")
  printServiceUrl: string = null;

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
  @aliasOf("viewModel.view")
  @renderable()
  view: View = null;

  //----------------------------------
  //  viewModel
  //----------------------------------

  /**
   * The view model for this widget. This is a class that contains all the logic
   * (properties and methods) that controls this widget's behavior. See the
   * {@link module:esri/widgets/Print/PrintViewModel} class to access
   * all properties and methods on the widget.
   *
   * @name viewModel
   * @instance
   * @type {module:esri/widgets/Print/PrintViewModel}
   * @autocast
   */
  @property({
    type: PrintViewModel
  })
  @renderable(["viewModel.templatesInfo", "viewModel.state"])
  viewModel: PrintViewModel = new PrintViewModel();

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const {
      attributionEnabled,
      author,
      copyright,
      dpi,
      format,
      height,
      layout,
      legendEnabled,
      title,
      scaleEnabled,
      scale,
      width
    } = this.templateOptions;

    const titleSection = (
      <div class={CSS.formSectionContainer}>
        <label>
          {this._layoutTabSelected ? i18n.title : i18n.fileName}
          <input
            type="text"
            tabIndex={0}
            placeholder={this._layoutTabSelected ? i18n.titlePlaceHolder : i18n.fileNamePlaceHolder}
            class={this.classes(CSS.inputText, CSS.input)}
            value={title}
            data-input-name="title"
            oninput={this._updateInputValue}
            bind={this}
          />
        </label>
      </div>
    );

    const fileFormatMenuItems =
      this.get<string[]>("viewModel.templatesInfo.format.choiceList") || [];
    const fileFormatOptions =
      fileFormatMenuItems.length > 0 ? (
        fileFormatMenuItems.map((fileFormatMenuItem) => {
          const selected = fileFormatMenuItem === format;

          return (
            <option key={fileFormatMenuItem} selected={selected} value={fileFormatMenuItem}>
              {fileFormatMenuItem.toUpperCase()}
            </option>
          );
        })
      ) : (
        <option key="format-default-option">{i18n.formatDefaultOption}</option>
      );

    const fileFormatSection = (
      <div class={CSS.formSectionContainer}>
        <label>
          {i18n.fileFormatTitle}
          <select
            class={CSS.select}
            onchange={this._updateFromOption}
            data-target-property="format"
            bind={this}
          >
            {fileFormatOptions}
          </select>
        </label>
      </div>
    );

    const layoutMenuItems = this.get<string[]>("viewModel.templatesInfo.layout.choiceList") || [];
    const layoutOptions =
      layoutMenuItems.length > 0 ? (
        layoutMenuItems.map((layoutMenuItem) => {
          const selected = layoutMenuItem === layout;
          const label = i18n[layoutMenuItem] || layoutMenuItem;

          return (
            <option key={layoutMenuItem} selected={selected} value={layoutMenuItem}>
              {label}
            </option>
          );
        })
      ) : (
        <option key="layout-default-option">{i18n.layoutDefaultOption}</option>
      );

    const pageSetupSection = (
      <div class={CSS.formSectionContainer}>
        <label>
          {i18n.layoutTitle}
          <select
            class={CSS.select}
            onchange={this._updateFromOption}
            data-target-property="layout"
            bind={this}
          >
            {layoutOptions}
          </select>
        </label>
      </div>
    );

    const dpiSection = (
      <div class={CSS.formSectionContainer}>
        <label>
          {i18n.dpi}
          <input
            type="number"
            class={this.classes(CSS.inputText, CSS.input)}
            data-input-name="dpi"
            oninput={this._updateInputValue}
            value={`${dpi}`}
            min="1"
            tabIndex={0}
            bind={this}
          />
        </label>
      </div>
    );

    const scaleSection = (
      <div class={this.classes(CSS.scaleInfoContainer, CSS.formSectionContainer)}>
        <label>
          <input
            data-option-name="scaleEnabled"
            checked={scaleEnabled}
            type="checkbox"
            tabIndex={0}
            onchange={this._toggleInputValue}
            bind={this}
          />
          {i18n.scale}
        </label>
        <div class={CSS.scaleInputContainer}>
          <input
            aria-label={i18n.scaleLabel}
            aria-valuenow={`${scale}`}
            role="spinbutton"
            type="number"
            class={this.classes(CSS.inputText, CSS.input, CSS.scaleInput)}
            tabIndex={0}
            data-input-name="scale"
            oninput={this._updateInputValue}
            disabled={!scaleEnabled}
            value={`${scale}`}
            bind={this}
          />
          <button
            role="button"
            aria-label={i18n.reset}
            class={this.classes(CSS.widgetButton, CSS.refreshButton, CSS.iconRefresh)}
            tabIndex={0}
            onclick={this._resetToCurrentScale}
            bind={this}
          />
        </div>
      </div>
    );

    const advancedSectionForLayout = this._advancedOptionsVisibleForLayout ? (
      <div
        aria-labelledby={`${this.id}__advancedOptionsForLayout`}
        class={CSS.advancedOptionsContainer}
      >
        {scaleSection}
        <div class={this.classes(CSS.authorInfoContainer, CSS.formSectionContainer)}>
          <label>
            {i18n.author}
            <input
              type="text"
              value={author}
              class={this.classes(CSS.inputText, CSS.input)}
              tabIndex={0}
              data-input-name="author"
              oninput={this._updateInputValue}
              bind={this}
            />
          </label>
        </div>
        <div class={this.classes(CSS.copyrightInfoContainer, CSS.formSectionContainer)}>
          <label>
            {i18n.copyright}
            <input
              type="text"
              class={this.classes(CSS.inputText, CSS.input)}
              tabIndex={0}
              value={copyright}
              data-input-name="copyright"
              oninput={this._updateInputValue}
              bind={this}
            />
          </label>
        </div>
        {dpiSection}
        <div class={this.classes(CSS.legendInfoContainer, CSS.formSectionContainer)}>
          <label>
            <input
              type="checkbox"
              data-option-name="legendEnabled"
              tabIndex={0}
              checked={legendEnabled}
              onchange={this._toggleInputValue}
              bind={this}
            />
            {i18n.legend}
          </label>
        </div>
      </div>
    ) : null;

    const advancedSectionForMapOnly = this._advancedOptionsVisibleForMapOnly ? (
      <div
        aria-labelledby={`${this.id}__advancedOptionsForMapOnly`}
        class={CSS.advancedOptionsContainer}
      >
        {scaleSection}
        {dpiSection}
        <div class={CSS.formSectionContainer}>
          <label>
            <input
              data-option-name="attributionEnabled"
              type="checkbox"
              onchange={this._toggleInputValue}
              tabIndex={0}
              checked={attributionEnabled}
              bind={this}
            />
            {i18n.attribution}
          </label>
        </div>
      </div>
    ) : null;

    const panel = this._layoutTabSelected ? (
      <section
        key="esri-print__layoutContent"
        id={`${this.id}__layoutContent`}
        aria-labelledby={`${this.id}__layoutTab`}
        class={CSS.layoutSection}
        role="tabpanel"
        aria-selected={this._layoutTabSelected}
      >
        <div class={CSS.panelContainer}>
          {titleSection}
          {pageSetupSection}
          {this._layoutTabSelected ? fileFormatSection : null}
        </div>

        <div class={this.classes(CSS.panelContainer, CSS.advancedOptionsSection)}>
          <button
            aria-label={i18n.advancedOptions}
            aria-expanded={this._advancedOptionsVisibleForLayout ? "true" : "false"}
            role="button"
            class={CSS.advancedOptionsButton}
            onclick={this._showAdvancedOptions}
            bind={this}
          >
            <div class={CSS.advancedOptionsButtonContainer}>
              <span
                aria-hidden="true"
                class={this.classes(
                  CSS.iconRightTriangleArrow,
                  CSS.advancedOptionsButtonIconClosed
                )}
              />
              <span
                aria-hidden="true"
                class={this.classes(
                  CSS.iconLeftTriangleArrow,
                  CSS.advancedOptionsButtonIconClosed_RTL
                )}
              />
              <span
                aria-hidden="true"
                class={this.classes(CSS.iconDownArrow, CSS.advancedOptionsButtonIconOpened)}
              />
              <span class={CSS.advancedOptionsButtonTitle}>{i18n.advancedOptions}</span>
            </div>
          </button>
          {advancedSectionForLayout}
        </div>
      </section>
    ) : (
      <section
        key="esri-print__mapOnlyContent"
        id={`${this.id}__mapOnlyContent`}
        aria-selected={!this._layoutTabSelected}
        aria-labelledby={`${this.id}__mapOnlyTab`}
        class={CSS.mapOnlySection}
        role="tabpanel"
      >
        <div class={CSS.panelContainer}>
          {titleSection}
          {this._layoutTabSelected ? null : fileFormatSection}
          <div class={this.classes(CSS.sizeContainer, CSS.formSectionContainer)}>
            <div class={CSS.widthContainer}>
              <label>
                {i18n.width}
                <input
                  type="text"
                  class={this.classes(CSS.inputText, CSS.input)}
                  data-input-name="width"
                  onchange={this._updateInputValue}
                  value={`${width}`}
                  tabIndex={0}
                  bind={this}
                />
              </label>
            </div>
            <div class={CSS.heightContainer}>
              <label>
                {i18n.height}
                <input
                  type="text"
                  class={this.classes(CSS.inputText, CSS.input)}
                  data-input-name="height"
                  onchange={this._updateInputValue}
                  value={`${height}`}
                  tabIndex={0}
                  bind={this}
                />
              </label>
            </div>
            <button
              role="button"
              aria-label={i18n.swap}
              class={this.classes(CSS.widgetButton, CSS.swapButton, CSS.iconSwap)}
              onclick={this._switchInput}
              tabIndex={0}
              bind={this}
            />
          </div>
          <div class={this.classes(CSS.panelContainer, CSS.advancedOptionsSection)}>
            <button
              aria-label={i18n.advancedOptions}
              aria-expanded={this._advancedOptionsVisibleForMapOnly ? "true" : "false"}
              role="button"
              class={CSS.advancedOptionsButton}
              onclick={this._showAdvancedOptions}
              bind={this}
            >
              <div class={CSS.advancedOptionsButtonContainer}>
                <span
                  aria-hidden="true"
                  class={this.classes(
                    CSS.iconRightTriangleArrow,
                    CSS.advancedOptionsButtonIconClosed
                  )}
                />
                <span
                  aria-hidden="true"
                  class={this.classes(
                    CSS.iconLeftTriangleArrow,
                    CSS.advancedOptionsButtonIconClosed_RTL
                  )}
                />
                <span
                  aria-hidden="true"
                  class={this.classes(CSS.iconDownArrow, CSS.advancedOptionsButtonIconOpened)}
                />
                <span class={CSS.advancedOptionsButtonTitle}>{i18n.advancedOptions}</span>
              </div>
            </button>
            {advancedSectionForMapOnly}
          </div>
        </div>
      </section>
    );

    const exportedLinksArray = this.exportedLinks.toArray();
    const exportedLinksItems = this._renderExportedLink(exportedLinksArray);
    const exportButtonClasses = {
      [CSS.buttonDisabled]: !layout && !format
    };

    const isSceneView = this.get("view") != null && this.get("view.type") !== "2d";

    const errorPanel = (
      <div class={CSS.panelError}>{isSceneView ? i18n.sceneViewError : i18n.serviceError}</div>
    );

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
            id={`${this.id}__layoutTab`}
            data-tab-id="layoutTab"
            class={CSS.layoutTab}
            role="tab"
            tabIndex={0}
            aria-selected={`${this._layoutTabSelected}`}
          >
            {i18n.layoutTab}
          </li>
          <li
            id={`${this.id}__mapOnlyTab`}
            data-tab-id="mapOnlyTab"
            class={CSS.layoutTab}
            role="tab"
            tabIndex={0}
            aria-selected={`${!this._layoutTabSelected}`}
          >
            {i18n.mapOnlyTab}
          </li>
        </ul>

        {panel}

        <button
          aria-label={i18n.exportDescription}
          role="button"
          class={this.classes(CSS.printButton, CSS.button, exportButtonClasses)}
          tabIndex={0}
          onclick={this._handlePrintMap}
          bind={this}
        >
          {i18n.export}
        </button>
        <div
          class={CSS.exportedFilesContainer}
          afterUpdate={this._scrollExportIntoView}
          onclick={this._removeLink}
          bind={this}
        >
          <h3 class={this.classes(CSS.exportedFilesTitle, CSS.header)}>{i18n.exportText}</h3>
          {exportedLinksArray.length > 0 ? null : (
            <div>
              <div>{i18n.exportHint}</div>
            </div>
          )}

          {exportedLinksItems}
        </div>
      </div>
    );

    const printWidgetPanel = (
      <div>
        <div class={CSS.printWidgetContainer}>
          <header class={CSS.headerTitle}>{i18n.export}</header>
          {this.error || !this.printServiceUrl || isSceneView || !this.view
            ? errorPanel
            : normalPanel}
        </div>
      </div>
    );

    const initializing = this.get("viewModel.state") === "initializing";
    const panelContent = initializing ? this._renderLoader() : printWidgetPanel;

    return (
      <div afterCreate={storeNode} bind={this} class={CSS.base} data-node-ref="_rootNode">
        {panelContent}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _renderLoader(): VNode {
    const classes = {
      [CSS.loader]: this._awaitingServerResponse
    };

    return <div class={this.classes(classes)} key="loader" />;
  }

  private _createFileLink(template: PrintTemplate): FileLink {
    const titleText = template.layoutOptions.titleText || i18n.untitled,
      lowercaseFormat = template.format.toLowerCase(),
      extension = lowercaseFormat.indexOf("png") > -1 ? "png" : lowercaseFormat,
      fileName = titleText + extension,
      hasSameFileName = this._exportedFileNameMap[fileName] !== undefined;

    if (hasSameFileName) {
      this._exportedFileNameMap[fileName]++;
    } else {
      this._exportedFileNameMap[fileName] = 0;
    }

    return new FileLink({
      name: titleText,
      extension,
      count: this._exportedFileNameMap[fileName]
    });
  }

  private _toPrintTemplate(templateOptions: TemplateOptions): PrintTemplate {
    const {
      attributionEnabled,
      author,
      copyright,
      dpi,
      forceFeatureAttributes,
      format,
      height,
      layout,
      legendEnabled,
      title,
      scale,
      width
    } = templateOptions;
    const printTemplate = new PrintTemplate({
      attributionVisible: attributionEnabled,
      layoutOptions: {
        authorText: author || "",
        copyrightText: copyright || "",
        titleText: title || ""
      },
      forceFeatureAttributes,
      format,
      layout,
      outScale: scale
    });

    if (width) {
      printTemplate.exportOptions.width = width;
    }

    if (height) {
      printTemplate.exportOptions.height = height;
    }

    if (dpi) {
      printTemplate.exportOptions.dpi = dpi;
    }

    if (!legendEnabled) {
      printTemplate.layoutOptions.legendLayers = [];
    }

    return printTemplate;
  }

  private _resetToCurrentScale(): void {
    this.templateOptions.scale = this.viewModel.view.scale;
  }

  private _updateInputValue(e: Event): void {
    const target = e.target as HTMLInputElement;
    const targetProperty = target.getAttribute("data-input-name");

    this.templateOptions[targetProperty] = target.value;
  }

  private _handlePrintMap(): void {
    this._pendingExportScroll = true;
    const template = this._toPrintTemplate(this.templateOptions);
    const link = this._createFileLink(template);
    this.exportedLinks.add(link);
    let printTask = new PrintTask({url:this.printServiceUrl});
    let params = new PrintParameters();
    params.view = this.viewModel.view;
    params.outSpatialReference = this.viewModel.view.spatialReference;
    params.template = template;
    template.layoutOptions.customTextElements = [{'propertyinfo': 'Property Information'}];
    printTask.execute(params).then((result) => {
      link.set({
        url: result && result.url,
        state: "ready"
      });
    })
    .catch(() => {
      link.set({
        state: "error"
      });
    })
    .then(() => this.scheduleRender());;
    // this.viewModel
    //   .print(template)
    //   .then((result) => {
    //     link.set({
    //       url: result && result.url,
    //       state: "ready"
    //     });
    //   })
    //   .catch(() => {
    //     link.set({
    //       state: "error"
    //     });
    //   })
    //   .then(() => this.scheduleRender());
  }

  private _updateFromOption(e: Event): void {
    const target = e.target as HTMLSelectElement;
    const selectedOption = target.selectedOptions
      ? target.selectedOptions.item(0).value
      : target.options[target.selectedIndex].value;
    const targetProperty = target.getAttribute("data-target-property");

    this.templateOptions[targetProperty] = selectedOption;
  }

  private _switchInput(): void {
    [this.templateOptions.width, this.templateOptions.height] = [
      this.templateOptions.height,
      this.templateOptions.width
    ];
  }

  private _showAdvancedOptions(): void {
    if (this._layoutTabSelected) {
      this._advancedOptionsVisibleForLayout = !this._advancedOptionsVisibleForLayout;
    } else {
      this._advancedOptionsVisibleForMapOnly = !this._advancedOptionsVisibleForMapOnly;
    }
  }

  private _scrollExportIntoView(): void {
    if (this._pendingExportScroll) {
      this._pendingExportScroll = false;
      const {
        _rootNode,
        _rootNode: { clientHeight, scrollHeight }
      } = this;

      const delta = scrollHeight - clientHeight;

      if (delta > 0) {
        // scroll to bottom (export link area) only if root node owns scroller
        _rootNode.scrollTop = delta;
      }
    }
  }

  private _toggleInputValue(e: Event): void {
    const target = e.target as HTMLInputElement;
    const propName = target.getAttribute("data-option-name");

    this.templateOptions[propName] = target.checked;

    if (propName === "scaleEnabled") {
      this.viewModel.scaleEnabled = this.templateOptions.scaleEnabled;
      if (!this.templateOptions[propName]) {
        this._resetToCurrentScale();
      }
    }
  }

  private _removeLink(e: Event): void {
    const target = e.target as Element;
    const item = target["data-item"] as FileLink;

    if (item && item.state === "error") {
      this.exportedLinks.remove(item);
    }
  }

  private _renderExportedLink(exportedLinksArray: FileLink[]): VNode {
    return exportedLinksArray.map((exportedLink) => {
      const anchorClasses = {
        [CSS.anchorDisabled]: exportedLink.state === "pending" || exportedLink.state === "error"
      };

      const iconClasses = {
        [CSS.iconSpinner]: exportedLink.state === "pending",
        [CSS.rotate]: exportedLink.state === "pending",
        [CSS.iconDownload]: exportedLink.state === "ready",
        [CSS.iconError]: exportedLink.state === "error",
        [CSS.exportedFileError]: exportedLink.state === "error"
      };

      const linkTitleClasses = {
        [CSS.exportedFileError]: exportedLink.state === "error"
      };

      let url = exportedLink.url === "" ? null : exportedLink.url;

      if (url) {
        url = urlUtils.addProxy(url);
      }

      let itemDescriptiveStatus: string;

      if (exportedLink.state === "pending") {
        itemDescriptiveStatus = i18n.pending;
      } else if (exportedLink.state === "ready") {
        itemDescriptiveStatus = i18n.ready;
      } else {
        itemDescriptiveStatus = i18n.error;
      }

      return (
        <div
          aria-label={itemDescriptiveStatus}
          key={exportedLink.formattedName}
          class={CSS.exportedFile}
        >
          <a
            aria-label={`${exportedLink.formattedName}. ${i18n.linkReady}`}
            href={url}
            tabIndex={0}
            target="_blank"
            class={this.classes(CSS.exportedFileLink, anchorClasses)}
          >
            <span data-item={exportedLink} class={this.classes(iconClasses)} />
            <span
              data-item={exportedLink}
              class={this.classes(CSS.exportedFileLinkTitle, linkTitleClasses)}
            >
              {exportedLink.formattedName}
            </span>
          </a>
        </div>
      );
    });
  }

  private _swapInputValue(): void {
    const previous = this._previousTitleOrFilename;
    this._previousTitleOrFilename = this.templateOptions.title;
    this.templateOptions.title = previous;
  }

  @accessibleHandler()
  private _toggleLayoutPanel(e: Event): void {
    this._swapInputValue();

    const target = e.target as HTMLSelectElement;
    this._layoutTabSelected = target.getAttribute("data-tab-id") === "layoutTab";

    if (!this._layoutTabSelected) {
      this.templateOptions.layout = "MAP_ONLY";
    } else {
      const layoutChoices = this.get<string[]>("viewModel.templatesInfo.layout.choiceList");
      this.templateOptions.layout = layoutChoices && layoutChoices[0];
    }
  }
}

export = Print;
