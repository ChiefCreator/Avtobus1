import { createDOM } from "./../../lib/domUtils";

import "./HomePage.css";

export default class HomePage {
  constructor() {
    this.id = "main";
    this.title = "Главная";
    this.page = null;

    this._init();
  }

  _init() {
    this.page = this._create();
  }
  _create() {
    const innerHTML = `
      <div class="main-page__container">
        Main page
      </div>
    `;

    const page = createDOM("main", { className: "main-page", innerHTML: innerHTML });

    return page;
  }
  render() {
    return this.page;
  }
}
