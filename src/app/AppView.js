import { createDOM } from "../lib/domUtils";

export default class AppView {
  constructor({ root }) {
    this.root = root;
    this.el = null;
    this.content = null;

    this.routes = null;
    this.components = null;
  }

  setRoutes(routes) {
    this.routes = routes;
  }
  setComponents(components) {
    this.components = components;
  }

  renderContent(currentPageId) {
    const pageObject = this.routes[currentPageId] || this.routes["error"];
    const page = pageObject.render();

    this.content.innerHTML = "";
    this.content.append(page);

    document.title = pageObject.title;
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  init() {
    this.el = this._create();
    this.content = this.el.querySelector(".content");

    root.append(this.el);
  }
  _create() {
    const layout = createDOM("div", { className: "layout" });
    const content = createDOM("div", { className: "content" });
    const modalsContainer = createDOM("div", { className: "modals-container" });

    const header = this.components.header.render();
    modalsContainer.append(this.components.contactGroupsModal.render());
    modalsContainer.append(this.components.confirmModal.render());

    layout.append(header, content, modalsContainer);

    return layout;
  }
}
