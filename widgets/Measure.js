/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/DistanceMeasurement2D", "esri/widgets/AreaMeasurement2D", "esri/widgets/CoordinateConversion", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, decorators_1, Widget, DistanceMeasurement2D, AreaMeasurement2D, CoordinateConversion, widget_1) {
    "use strict";
    var CSS = {
        base: "esri-print esri-widget esri-widget--panel",
        layoutTabList: "esri-print__layout-tab-list",
        layoutTab: "esri-print__layout-tab",
        layoutSection: "esri-print__layout-section",
        panelVisible: "esri-measure__panel-visible",
        panelNotVisible: "esri-measure__panel-not-visible",
        // clear
        actionSection: "esri-area-measurement-3d__actions",
        clearButton: "esri-area-measurement-3d__clear-button",
        button: "esri-button esri-button--secondary",
        buttonDisabled: "esri-button--disabled",
    };
    var Measure = /** @class */ (function (_super) {
        __extends(Measure, _super);
        function Measure() {
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  view
            //----------------------------------
            var _this = _super !== null && _super.apply(this, arguments) || this;
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
            _this.view = null;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._lineTabSelected = true;
            _this._areaTabSelected = false;
            _this._ccTabSelected = false;
            _this._linepanel = null;
            _this._areapanel = null;
            _this._ccpanel = null;
            _this._rendered = false;
            return _this;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        Measure.prototype.render = function () {
            if (this._rendered) {
                if (!this._line) {
                    this._line = new DistanceMeasurement2D({ view: this.view, container: "esri-measure__lineContent" });
                }
                if (!this._area) {
                    this._area = new AreaMeasurement2D({ view: this.view, container: "esri-measure__areaContent" });
                }
                if (!this._cc) {
                    this._cc = new CoordinateConversion({ view: this.view, container: "esri-measure__ccContent" });
                }
            }
            this._rendered = true;
            var classes = [CSS.layoutSection];
            if (this._lineTabSelected) {
                classes.push(CSS.panelVisible);
            }
            else {
                classes.push(CSS.panelNotVisible);
            }
            this._linepanel = (widget_1.tsx("section", { key: "esri-measure__lineContent", id: "esri-measure__lineContent", "aria-labelledby": this.id + "__lineTab", class: this.classes(classes), role: "tabpanel", 
                //aria-selected={`${this._lineTabSelected}`}
                style: { display: this._lineTabSelected ? 'block' : 'none' } },
                widget_1.tsx("div", { id: "lineDiv" })));
            classes = [CSS.layoutSection];
            if (this._areaTabSelected) {
                classes.push(CSS.panelVisible);
            }
            else {
                classes.push(CSS.panelNotVisible);
            }
            this._areapanel = (widget_1.tsx("section", { key: "esri-measure__areaContent", id: "esri-measure__areaContent", "aria-labelledby": this.id + "__areaTab", class: this.classes(classes), role: "tabpanel", style: { display: this._areaTabSelected ? 'block' : 'none' } },
                widget_1.tsx("div", { id: "areaDiv" })));
            classes = [CSS.layoutSection];
            if (this._ccTabSelected) {
                classes.push(CSS.panelVisible);
            }
            else {
                classes.push(CSS.panelNotVisible);
            }
            this._ccpanel = (widget_1.tsx("section", { key: "esri-measure__ccContent", id: "esri-measure__ccContent", "aria-labelledby": this.id + "__ccTab", class: this.classes(classes), role: "tabpanel", style: { display: this._ccTabSelected ? 'block' : 'none' } },
                widget_1.tsx("div", { id: "ccDiv" })));
            var normalPanel = (widget_1.tsx("div", null,
                widget_1.tsx("ul", { class: CSS.layoutTabList, role: "tablist", onclick: this._toggleLayoutPanel, onkeydown: this._toggleLayoutPanel, bind: this },
                    widget_1.tsx("li", { id: this.id + "__distanceTab", "data-tab-id": "distanceTab", class: CSS.layoutTab, role: "tab", tabIndex: "0", "aria-selected": "" + this._lineTabSelected }, "Distance"),
                    widget_1.tsx("li", { id: this.id + "__areaTab", "data-tab-id": "areaTab", class: CSS.layoutTab, role: "tab", tabIndex: "1", "aria-selected": "" + this._areaTabSelected }, "Area"),
                    widget_1.tsx("li", { id: this.id + "__coordTab", "data-tab-id": "coordTab", class: CSS.layoutTab, role: "tab", tabIndex: "2", "aria-selected": "" + this._ccTabSelected }, "Coordinates")),
                this._linepanel,
                this._areapanel,
                this._ccpanel,
                widget_1.tsx("div", { class: CSS.actionSection },
                    widget_1.tsx("button", { 
                        // disabled={isDisabled}
                        class: this.classes(CSS.button, CSS.clearButton), bind: this, onclick: this._clearMeasurements, title: "Clear Measurements", "aria-label": "Clear Measurements" }, "Clear Measurements"))));
            return (widget_1.tsx("div", { class: this.classes(CSS.base) }, normalPanel));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Measure.prototype._toggleLayoutPanel = function (e) {
            //this._swapInputValue();
            var target = e.target;
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
        };
        Measure.prototype._clearMeasurements = function () {
            this._area.viewModel.clearMeasurement();
            this._line.viewModel.clearMeasurement();
        };
        __decorate([
            widget_1.renderable()
        ], Measure.prototype, "view", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], Measure.prototype, "_toggleLayoutPanel", null);
        Measure = __decorate([
            decorators_1.subclass("esri.widgets.HelloWorld")
        ], Measure);
        return Measure;
    }(decorators_1.declared(Widget)));
    return Measure;
});
//# sourceMappingURL=Measure.js.map