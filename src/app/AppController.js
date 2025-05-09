export default class AppController {
  constructor(model) {
    this.model = model;
  }

  _handleHashChange() {
    const pageId = location.hash.slice(1) || "main";

    this.model.updateState(pageId);
  }

  _addListeners() {
    window.addEventListener("hashchange", this._handleHashChange.bind(this));
  }
  init() {
    this._handleHashChange();
    this._addListeners();
  }
}
