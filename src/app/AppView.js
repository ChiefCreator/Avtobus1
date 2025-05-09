
export default class AppView {
  constructor() {
    this.routes = null;
    this.content = null;
  }

  setRoutes(routes) {
    this.routes = routes;
  }
  setContent(content) {
    this.content = content;
  }

  renderContent(currentPageId) {
    const pageObject = this.routes[currentPageId] || this.routes["error"];
    const page = pageObject.render();

    this.content.innerHTML = "";
    this.content.append(page);

    document.title = pageObject.title;
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}
