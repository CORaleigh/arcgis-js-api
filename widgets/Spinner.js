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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/promiseUtils", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/AnchorElementViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, promiseUtils, watchUtils, decorators_1, Widget, AnchorElementViewModel, widget_1) {
    "use strict";
    var CSS = {
        base: "esri-spinner",
        spinnerStart: "esri-spinner--start",
        spinnerFinish: "esri-spinner--finish"
    };
    var Spinner = /** @class */ (function (_super) {
        __extends(Spinner, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function Spinner(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            _this._animationDelay = 500;
            _this._animationPromise = null;
            //----------------------------------
            //  location
            //----------------------------------
            _this.location = null;
            //----------------------------------
            //  view
            //----------------------------------
            _this.view = null;
            //----------------------------------
            //  visible
            //----------------------------------
            _this.visible = false;
            //----------------------------------
            //  viewModel
            //----------------------------------
            _this.viewModel = new AnchorElementViewModel();
            return _this;
        }
        Spinner.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils.watch(this, "visible", function (visible) { return _this._visibleChange(visible); })
            ]);
        };
        Spinner.prototype.destroy = function () {
            this._cancelAnimationPromise();
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        Spinner.prototype.show = function (options) {
            var _this = this;
            var location = options.location, promise = options.promise;
            if (location) {
                this.viewModel.location = location;
            }
            this.visible = true;
            var hide = function () { return _this.hide(); };
            if (promise) {
                promise.catch(function () { }).then(hide);
            }
        };
        Spinner.prototype.hide = function () {
            this.visible = false;
        };
        Spinner.prototype.render = function () {
            var _a;
            var visible = this.visible;
            var screenLocation = this.viewModel.screenLocation;
            var hasScreenLocation = !!screenLocation;
            var showSpinnerStart = visible && hasScreenLocation;
            var showSpinnerFinish = !visible && hasScreenLocation;
            var baseClasses = (_a = {},
                _a[CSS.spinnerStart] = showSpinnerStart,
                _a[CSS.spinnerFinish] = showSpinnerFinish,
                _a);
            var positionStyles = this._getPositionStyles();
            return widget_1.tsx("div", { class: this.classes(CSS.base, baseClasses), styles: positionStyles });
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Spinner.prototype._cancelAnimationPromise = function () {
            var _animationPromise = this._animationPromise;
            if (_animationPromise) {
                _animationPromise.cancel();
            }
            this._animationPromise = null;
        };
        Spinner.prototype._visibleChange = function (visible) {
            var _this = this;
            if (visible) {
                this.viewModel.screenLocationEnabled = true;
                return;
            }
            this._cancelAnimationPromise();
            this._animationPromise = promiseUtils.after(this._animationDelay).then(function () {
                _this.viewModel.screenLocationEnabled = false;
                _this._animationPromise = null;
            });
        };
        Spinner.prototype._getPositionStyles = function () {
            var _a = this.viewModel, screenLocation = _a.screenLocation, view = _a.view;
            if (!view || !screenLocation) {
                return {};
            }
            var padding = view.padding;
            return {
                left: screenLocation.x - padding.left + "px",
                top: screenLocation.y - padding.top + "px"
            };
        };
        __decorate([
            decorators_1.aliasOf("viewModel.location")
        ], Spinner.prototype, "location", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Spinner.prototype, "view", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], Spinner.prototype, "visible", void 0);
        __decorate([
            decorators_1.property({
                type: AnchorElementViewModel
            }),
            widget_1.renderable(["viewModel.screenLocation", "viewModel.screenLocationEnabled"])
        ], Spinner.prototype, "viewModel", void 0);
        Spinner = __decorate([
            decorators_1.subclass("esri.widgets.Spinner")
        ], Spinner);
        return Spinner;
    }(decorators_1.declared(Widget)));
    return Spinner;
});
//# sourceMappingURL=Spinner.js.map