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

/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

// dojo
import i18n = require("dojo/i18n!esri/widgets/Bookmarks/nls/Bookmarks");

// esri.core
import Collection = require("esri/core/Collection");
import Handles = require("esri/core/Handles");
import watchUtils = require("esri/core/watchUtils");

// esri.core.accessorSupport
import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";

// esri.views
import MapView = require("esri/views/MapView");

// esri.webmap
import Bookmark = require("esri/webmap/Bookmark");

// esri.widgets
import Widget = require("esri/widgets/Widget");

// esri.widgets.Bookmarks
import BookmarksViewModel = require("esri/widgets/Bookmarks/BookmarksViewModel");

// esri.widgets.support
import { GoToOverride, VNode } from "esri/widgets/support/interfaces";
import { accessibleHandler, renderable, tsx, vmEvent } from "esri/widgets/support/widget";
import { VNode } from "maquette";

const CSS = {
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

@subclass("esri.widgets.Bookmarks")
class Bookmarks extends declared(Widget) {
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
  constructor(params?: any) {
    super();
  }

  postInitialize(): void {
    this._checkLocalStorage()
    this.own([

      watchUtils.on(this, "viewModel.bookmarks", "change", () => this._bookmarksChanged()),
      watchUtils.init(this, "viewModel.bookmarks", () => this._bookmarksChanged())
    ]);
  }

  destroy(): void {
    this._handles.destroy();
    this._handles = null;
  }

  private _handles: Handles = new Handles();

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
  @aliasOf("viewModel.bookmarks")
  bookmarks: Collection<Bookmark> = null;

  //----------------------------------
  //  goToOverride
  //----------------------------------

  @aliasOf("viewModel.goToOverride")
  goToOverride: GoToOverride = null;

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
  @property()
  iconClass = CSS.widgetIcon;

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
  @property()
  label = i18n.widgetLabel;
 /**
   * The widget's default label.
   *
   * @name newBookmarkName
   * @instance
   * @type {string}
   */
  @property()
  newBookmarkName: string= "";

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
  @aliasOf("viewModel.view")
  view: MapView = null;

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
  @property({
    type: BookmarksViewModel
  })
  @renderable(["activeBookmark", "state"])
  @vmEvent(["select-bookmark"])
  viewModel: BookmarksViewModel = new BookmarksViewModel();

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
  @aliasOf("viewModel.goTo")
  goTo(bookmark: Bookmark): IPromise<void> {
    return null;
  }

  render(): VNode {
    const { state } = this.viewModel;

    const bookmarkListNode =
      state === "disabled"
        ? this._renderDisabled()
        : state === "loading"
        ? this._renderLoading()
        : this._renderBookmarks();

    const baseClasses = {
      [CSS.disabled]: state === "disabled"
    };
    const addBookmarks = (<div class={CSS.addBookmarkContainer}>{this._renderAddBookmarksInput()}{this._renderAddButton()}</div>);

    return (
      <div class={this.classes(baseClasses, CSS.base, CSS.esriWidget)}>{addBookmarks}{bookmarkListNode}</div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _renderLoading(): VNode {
    return (
      <div class={CSS.loaderContainer} key="loader">
        <div class={CSS.loader} />
      </div>
    );
  }

  private _renderDisabled(): VNode {
    return (
      <div
        key="bookmarks-disabled"
        class={this.classes(CSS.noBookmarksContainer, CSS.disabledContainer)}
      >
        <h1 class={CSS.header}>{i18n.disabledHeading}</h1>
        <p class={CSS.disabledDescription}>{i18n.disabledDescription}</p>
      </div>
    );
  }

  private _updateInputValue(e: Event): void {
    const target = e.target as HTMLInputElement;
    const targetProperty = target.getAttribute("data-input-name");

    this[targetProperty] = target.value;
  }

  private _checkLocalStorage(): void {
    if (localStorage.getItem('bookmarks')) {
      let marks = JSON.parse(localStorage.getItem('bookmarks'));
      this.viewModel.bookmarks.removeAll();
      marks.forEach(mark => {
        this.viewModel.bookmarks.push(mark);
      });

    }
  }

  private _updateLocalStorage(): void {
    let marks:any[] = [];
    this.viewModel.bookmarks.forEach(bookmark => {
      marks.push({name:bookmark.name, extent: bookmark.extent.toJSON()});
    });
    localStorage.setItem('bookmarks', JSON.stringify(marks));
  }

  private _deleteBookmark(event:Event): void {
    event.stopPropagation();
    const node = event.currentTarget.parentElement as Element;
    const bookmark = node.parentElement["data-bookmark-item"] as Bookmark;
    this.viewModel.bookmarks.remove(bookmark);
    this._bookmarksChanged();
    this._updateLocalStorage();
  }
  private _addBookmark(): void {
    const bookmark:__esri.Bookmark = new Bookmark({name:this.newBookmarkName, extent:this.view.extent});
    this.viewModel.bookmarks.add(bookmark);
    this._bookmarksChanged();
    this._updateLocalStorage();
  }

  protected _renderDeleteButton(): VNode {
    const title = "Delete";

    return (
      <button
        aria-label={title}
        bind={this}
        class={this.classes(CSS.button, CSS.resetIcon)}
        onclick={this._deleteBookmark}
        title={title}
      />
    );
  }
  protected _renderAddButton(): VNode {
    const title = "Add";

    return (
      <button
        aria-label={title}
        bind={this}
        class={this.classes(CSS.button, CSS.addIcon)}
        onclick={this._addBookmark}
        title={title}
      />
    );
  }


  
  private _renderAddBookmarksInput(): VNode {
    return (<input
    type="text"
     data-input-name="newBookmarkName"
     placeholder="Bookmark Name"
     class={this.classes(CSS.inputText, CSS.input)}
     value={this.newBookmarkName}
     oninput={this._updateInputValue}
    bind={this}
    />);    
  }
  private _renderNoBookmarksContainer(): VNode {
    return (
      <div class={CSS.noBookmarksContainer} key="no-bookmarks">
        <svg class={CSS.noBookmarksImage} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path
            fill="currentColor"
            d="M26 30.435L16.5 24.1 7 30.435V1h19zm-9.5-7.536l8.5 5.666V2H8v26.565z"
          />
        </svg>
        <h1 class={this.classes(CSS.header, CSS.noBookmarksHeader)}>{i18n.noBookmarksHeading}</h1>
        <p class={CSS.noBookmarksDescription}>{i18n.noBookmarksDescription}</p>
      </div>
    );
  }

  private _renderBookmarksContainer(bookmarks: Collection<Bookmark>): VNode {
    return (
      <ul key="bookmark-list" aria-label={i18n.widgetLabel} class={CSS.bookmarkList}>
        {bookmarks.map((bookmark) => this._renderBookmark(bookmark)).toArray()}
      </ul>
    );
  }

  private _renderBookmarks(): VNode {
    const { bookmarks } = this.viewModel;

    const validBookmarks = bookmarks.filter(Boolean);

    return validBookmarks.length
      ? this._renderBookmarksContainer(validBookmarks)
      : this._renderNoBookmarksContainer();
  }

  private _renderBookmark(bookmark: Bookmark): VNode {
    const { activeBookmark } = this.viewModel;
    const { name, thumbnail } = bookmark;

    const bookmarkClasses = {
      [CSS.bookmarkActive]: activeBookmark === bookmark
    };

    const imageSource = (thumbnail && thumbnail.url) || "";

    const imageNode = imageSource ? (
      <div class={CSS.bookmarkContainer}>
        <img src={imageSource} alt={name} class={CSS.bookmarkImage} />
      </div>
    ) : (
      <span aria-hidden="true" class={this.classes(CSS.bookmarkIcon, CSS.widgetIcon)} />
    );
    const deleteButton = (<span>{this._renderDeleteButton()}</span>);

    return (
      <li
        bind={this}
        data-bookmark-item={bookmark}
        class={this.classes(CSS.bookmark, bookmarkClasses)}
        onclick={this._goToBookmark}
        onkeydown={this._goToBookmark}
        tabIndex={0}
        role="button"
        title={i18n.goToBookmark}
        aria-label={name}
      >
        {imageNode}
        <span class={CSS.bookmarkName}>{name}</span>
        {deleteButton}
      </li>
    );
  }

  private _bookmarksChanged(): void {
    const itemsKey = "items";
    const { bookmarks } = this.viewModel;
    const { _handles } = this;

    _handles.remove(itemsKey);

    const handles = bookmarks.map((bookmark) =>
      watchUtils.watch(bookmark, ["active", "name", "thumbnail.url"], () => this.scheduleRender())
    );

    _handles.add(handles, itemsKey);

    this.scheduleRender();
  }

  @accessibleHandler()
  private _goToBookmark(event: Event): void {
    const node = event.currentTarget as Element;
    const bookmark = node["data-bookmark-item"] as Bookmark;
    this.viewModel.goTo(bookmark);
  }
}

export = Bookmarks;
