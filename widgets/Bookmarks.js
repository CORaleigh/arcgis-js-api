/**
 * The Bookmarks widget allows end users to quickly navigate to a particular area of interest.
 * It displays a list of {@link module:esri/webmap/Bookmark bookmarks},
 * which typically are defined inside the {@link module:esri/WebMap#bookmarks WebMap}.
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * This widget is designed to work in 2D only, so it shouldn't be used in a {@link module:esri/views/SceneView}.
 *
 * :::
 *
 * @module esri/widgets/Bookmarks
 * @since 4.8
 *
 * @see [Bookmarks.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Bookmarks.tsx)
 * @see [Bookmarks.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Bookmarks.scss)
 * @see [Sample - Bookmarks widget](../sample-code/widgets-bookmarks/index.html)
 * @see module:esri/widgets/Bookmarks/BookmarksViewModel
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!esri/widgets/Bookmarks/nls/Bookmarks", "esri/core/Handles", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/webmap/Bookmark", "esri/widgets/Widget", "esri/widgets/Bookmarks/BookmarksViewModel", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, i18n, Handles, watchUtils, decorators_1, Bookmark, Widget, BookmarksViewModel, widget_1) {
    "use strict";
    var CSS = {
        base: "esri-bookmarks esri-widget--panel",
        loaderContainer: "esri-bookmarks__loader-container",
        loader: "esri-bookmarks__loader",
        fadeIn: "esri-bookmarks--fade-in",
        bookmarkList: "esri-bookmarks__list",
        bookmark: "esri-bookmarks__bookmark",
        bookmarkContainer: "esri-bookmarks__bookmark-container",
        bookmarkIcon: "esri-bookmarks__bookmark-icon",
        bookmarkImage: "esri-bookmarks__image",
        bookmarkName: "esri-bookmarks__bookmark-name",
        bookmarkActive: "esri-bookmarks__bookmark--active",
        noBookmarksContainer: "esri-widget__content--empty",
        noBookmarksHeader: "esri-bookmarks__no-bookmarks-heading",
        noBookmarksImage: "esri-widget__content-icon--empty",
        noBookmarksDescription: "esri-bookmarks__no-bookmarks-description",
        disabledContainer: "esri-bookmarks__disabled-container",
        disabledHeading: "esri-bookmarks__disabled-heading",
        disabledDescription: "esri-bookmarks__disabled-description",
        button: "esri-sketch__button",
        resetIcon: "esri-icon-trash",
        addIcon: "esri-icon-plus-circled",
        addBookmarkContainer: "esri-bookmarks__add_container",
        // common
        esriWidget: "esri-widget",
        widgetIcon: "esri-icon-bookmark",
        header: "esri-widget__heading",
        disabled: "esri-disabled",
        inputText: "esri-print__input-text",
        input: "esri-input"
    };
    var Bookmarks = /** @class */ (function (_super) {
        __extends(Bookmarks, _super);
        //--------------------------------------------------------------------------
        //
        //  Events
        //
        //--------------------------------------------------------------------------
        /**
         * Fires when a {@link module:esri/webmap/Bookmark} is selected.
         *
         * @event module:esri/widgets/Bookmarks#select-bookmark
         *
         * @property {module:esri/webmap/Bookmark} bookmark - The bookmark selected by the user.
         *
         * @example
         * const bookmarksWidget = new Bookmarks({
         *   view: view
         * });
         *
         * const bookmarksExpand = new Expand({
         *   view: view,
         *   content: bookmarksWidget
         * });
         * view.ui.add(bookmarksExpand, "top-right");
         *
         * // collapses the associated Expand instance
         * // when the user selects a bookmark
         * bookmarksWidget.on("select-bookmark", function(event){
         *   bookmarksExpand.expanded = false;
         * });
         */
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @extends module:esri/widgets/Widget
         * @mixes module:esri/widgets/support/GoTo
         * @constructor
         * @alias module:esri/widgets/Bookmarks
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         */
        function Bookmarks(params) {
            var _this = _super.call(this) || this;
            _this._handles = new Handles();
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  bookmarks
            //----------------------------------
            /**
             * A collection of {@link module:esri/webmap/Bookmark}s.
             *
             * @name bookmarks
             * @instance
             * @type {module:esri/core/Collection<module:esri/webmap/Bookmark>}
             */
            _this.bookmarks = null;
            //----------------------------------
            //  goToOverride
            //----------------------------------
            _this.goToOverride = null;
            //----------------------------------
            //  iconClass
            //----------------------------------
            /**
             * The widget's default CSS icon class.
             *
             * @name iconClass
             * @instance
             * @type {string}
             */
            _this.iconClass = CSS.widgetIcon;
            //----------------------------------
            //  label
            //----------------------------------
            /**
             * The widget's default label.
             *
             * @name label
             * @instance
             * @type {string}
             */
            _this.label = i18n.widgetLabel;
            /**
              * The widget's default label.
              *
              * @name newBookmarkName
              * @instance
              * @type {string}
              */
            _this.newBookmarkName = "";
            //----------------------------------
            //  view
            //----------------------------------
            /**
             * The view from which the widget will operate.
             *
             * @name view
             * @instance
             * @type {module:esri/views/MapView}
             */
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            /**
             * The view model for this widget. This is a class that contains all the logic
             * (properties and methods) that controls this widget's behavior. See the
             * {@link module:esri/widgets/Bookmarks/BookmarksViewModel} class to access
             * all properties and methods on the widget.
             *
             * @name viewModel
             * @instance
             * @type {module:esri/widgets/Bookmarks/BookmarksViewModel}
             * @autocast
             */
            _this.viewModel = new BookmarksViewModel();
            return _this;
        }
        Bookmarks.prototype.postInitialize = function () {
            var _this = this;
            this._checkLocalStorage();
            this.own([
                watchUtils.on(this, "viewModel.bookmarks", "change", function () { return _this._bookmarksChanged(); }),
                watchUtils.init(this, "viewModel.bookmarks", function () { return _this._bookmarksChanged(); })
            ]);
        };
        Bookmarks.prototype.destroy = function () {
            this._handles.destroy();
            this._handles = null;
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        /**
         * Zoom to a specific bookmark.
         *
         * @param {module:esri/webmap/Bookmark} Bookmark - The bookmark to zoom to.
         * @return {Promise} Resolves after the animation to specified bookmark finishes.
         */
        Bookmarks.prototype.goTo = function (bookmark) {
            return null;
        };
        Bookmarks.prototype.render = function () {
            var _a;
            var state = this.viewModel.state;
            var bookmarkListNode = state === "disabled"
                ? this._renderDisabled()
                : state === "loading"
                    ? this._renderLoading()
                    : this._renderBookmarks();
            var baseClasses = (_a = {},
                _a[CSS.disabled] = state === "disabled",
                _a);
            var addBookmarks = (widget_1.tsx("div", { class: CSS.addBookmarkContainer },
                this._renderAddBookmarksInput(),
                this._renderAddButton()));
            return (widget_1.tsx("div", { class: this.classes(baseClasses, CSS.base, CSS.esriWidget) },
                addBookmarks,
                bookmarkListNode));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Bookmarks.prototype._renderLoading = function () {
            return (widget_1.tsx("div", { class: CSS.loaderContainer, key: "loader" },
                widget_1.tsx("div", { class: CSS.loader })));
        };
        Bookmarks.prototype._renderDisabled = function () {
            return (widget_1.tsx("div", { key: "bookmarks-disabled", class: this.classes(CSS.noBookmarksContainer, CSS.disabledContainer) },
                widget_1.tsx("h1", { class: CSS.header }, i18n.disabledHeading),
                widget_1.tsx("p", { class: CSS.disabledDescription }, i18n.disabledDescription)));
        };
        Bookmarks.prototype._updateInputValue = function (e) {
            var target = e.target;
            var targetProperty = target.getAttribute("data-input-name");
            this[targetProperty] = target.value;
        };
        Bookmarks.prototype._checkLocalStorage = function () {
            var _this = this;
            if (localStorage.getItem('bookmarks')) {
                var marks = JSON.parse(localStorage.getItem('bookmarks'));
                this.viewModel.bookmarks.removeAll();
                marks.forEach(function (mark) {
                    _this.viewModel.bookmarks.push(mark);
                });
            }
        };
        Bookmarks.prototype._updateLocalStorage = function () {
            var marks = [];
            this.viewModel.bookmarks.forEach(function (bookmark) {
                marks.push({ name: bookmark.name, extent: bookmark.extent.toJSON() });
            });
            localStorage.setItem('bookmarks', JSON.stringify(marks));
        };
        Bookmarks.prototype._deleteBookmark = function (event) {
            event.stopPropagation();
            var node = event.currentTarget.parentElement;
            var bookmark = node.parentElement["data-bookmark-item"];
            this.viewModel.bookmarks.remove(bookmark);
            this._bookmarksChanged();
            this._updateLocalStorage();
        };
        Bookmarks.prototype._addBookmark = function () {
            var bookmark = new Bookmark({ name: this.newBookmarkName, extent: this.view.extent });
            this.viewModel.bookmarks.add(bookmark);
            this._bookmarksChanged();
            this._updateLocalStorage();
        };
        Bookmarks.prototype._renderDeleteButton = function () {
            var title = "Delete";
            return (widget_1.tsx("button", { "aria-label": title, bind: this, class: this.classes(CSS.button, CSS.resetIcon), onclick: this._deleteBookmark, title: title }));
        };
        Bookmarks.prototype._renderAddButton = function () {
            var title = "Add";
            return (widget_1.tsx("button", { "aria-label": title, bind: this, class: this.classes(CSS.button, CSS.addIcon), onclick: this._addBookmark, title: title }));
        };
        Bookmarks.prototype._renderAddBookmarksInput = function () {
            return (widget_1.tsx("input", { type: "text", "data-input-name": "newBookmarkName", placeholder: "Bookmark Name", class: this.classes(CSS.inputText, CSS.input), value: this.newBookmarkName, oninput: this._updateInputValue, bind: this }));
        };
        Bookmarks.prototype._renderNoBookmarksContainer = function () {
            return (widget_1.tsx("div", { class: CSS.noBookmarksContainer, key: "no-bookmarks" },
                widget_1.tsx("svg", { class: CSS.noBookmarksImage, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32" },
                    widget_1.tsx("path", { fill: "currentColor", d: "M26 30.435L16.5 24.1 7 30.435V1h19zm-9.5-7.536l8.5 5.666V2H8v26.565z" })),
                widget_1.tsx("h1", { class: this.classes(CSS.header, CSS.noBookmarksHeader) }, i18n.noBookmarksHeading),
                widget_1.tsx("p", { class: CSS.noBookmarksDescription }, i18n.noBookmarksDescription)));
        };
        Bookmarks.prototype._renderBookmarksContainer = function (bookmarks) {
            var _this = this;
            return (widget_1.tsx("ul", { key: "bookmark-list", "aria-label": i18n.widgetLabel, class: CSS.bookmarkList }, bookmarks.map(function (bookmark) { return _this._renderBookmark(bookmark); }).toArray()));
        };
        Bookmarks.prototype._renderBookmarks = function () {
            var bookmarks = this.viewModel.bookmarks;
            var validBookmarks = bookmarks.filter(Boolean);
            return validBookmarks.length
                ? this._renderBookmarksContainer(validBookmarks)
                : this._renderNoBookmarksContainer();
        };
        Bookmarks.prototype._renderBookmark = function (bookmark) {
            var _a;
            var activeBookmark = this.viewModel.activeBookmark;
            var name = bookmark.name, thumbnail = bookmark.thumbnail;
            var bookmarkClasses = (_a = {},
                _a[CSS.bookmarkActive] = activeBookmark === bookmark,
                _a);
            var imageSource = (thumbnail && thumbnail.url) || "";
            var imageNode = imageSource ? (widget_1.tsx("div", { class: CSS.bookmarkContainer },
                widget_1.tsx("img", { src: imageSource, alt: name, class: CSS.bookmarkImage }))) : (widget_1.tsx("span", { "aria-hidden": "true", class: this.classes(CSS.bookmarkIcon, CSS.widgetIcon) }));
            var deleteButton = (widget_1.tsx("span", null, this._renderDeleteButton()));
            return (widget_1.tsx("li", { bind: this, "data-bookmark-item": bookmark, class: this.classes(CSS.bookmark, bookmarkClasses), onclick: this._goToBookmark, onkeydown: this._goToBookmark, tabIndex: 0, role: "button", title: i18n.goToBookmark, "aria-label": name },
                imageNode,
                widget_1.tsx("span", { class: CSS.bookmarkName }, name),
                deleteButton));
        };
        Bookmarks.prototype._bookmarksChanged = function () {
            var _this = this;
            var itemsKey = "items";
            var bookmarks = this.viewModel.bookmarks;
            var _handles = this._handles;
            _handles.remove(itemsKey);
            var handles = bookmarks.map(function (bookmark) {
                return watchUtils.watch(bookmark, ["active", "name", "thumbnail.url"], function () { return _this.scheduleRender(); });
            });
            _handles.add(handles, itemsKey);
            this.scheduleRender();
        };
        Bookmarks.prototype._goToBookmark = function (event) {
            var node = event.currentTarget;
            var bookmark = node["data-bookmark-item"];
            this.viewModel.goTo(bookmark);
        };
        __decorate([
            decorators_1.aliasOf("viewModel.bookmarks")
        ], Bookmarks.prototype, "bookmarks", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.goToOverride")
        ], Bookmarks.prototype, "goToOverride", void 0);
        __decorate([
            decorators_1.property()
        ], Bookmarks.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], Bookmarks.prototype, "label", void 0);
        __decorate([
            decorators_1.property()
        ], Bookmarks.prototype, "newBookmarkName", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Bookmarks.prototype, "view", void 0);
        __decorate([
            decorators_1.property({
                type: BookmarksViewModel
            }),
            widget_1.renderable(["activeBookmark", "state"]),
            widget_1.vmEvent(["select-bookmark"])
        ], Bookmarks.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.goTo")
        ], Bookmarks.prototype, "goTo", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Bookmarks.prototype, "_goToBookmark", null);
        Bookmarks = __decorate([
            decorators_1.subclass("esri.widgets.Bookmarks")
        ], Bookmarks);
        return Bookmarks;
    }(decorators_1.declared(Widget)));
    return Bookmarks;
});
//# sourceMappingURL=Bookmarks.js.map