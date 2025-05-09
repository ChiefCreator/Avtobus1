export default class AppModel {
  constructor(view) {
    this.view = view;

    this.history = [];
    this.currentPage = null;
    this.prevPage = null;
  }

  updateState(pageId) {
    this.history.push(pageId);
    this.currentPage = pageId;
    this.prevPage = this.history.length > 1 ? this.history[this.history.length - 2] : null;

    this.view.renderContent(this.currentPage);
  }
}
