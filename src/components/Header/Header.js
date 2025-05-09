import { createDOM } from "./../../lib/domUtils";

import Container from "../Container/Container";
import Logo from "../Logo/Logo";

import "./Header.css";

export default class Header {
  constructor({ buttons = [] }) {
    this.el = null;
    this.buttons = buttons;

    this._init();
  }

  _init() {
    this.el = this._create();
  }
  _create() {
    const elContainerInnerHTML = `
      <div class="header__buttons"></div>
    `;

    const el = createDOM("header", { className: "header" });
    const elContainer = createDOM("div", { className: "header__container", innerHTML: elContainerInnerHTML });
    const logo = new Logo().render();

    const headerButtons = elContainer.querySelector(".header__buttons");

    this.buttons.forEach(button => {
      headerButtons.append(button.render?.());
    })

    const container = new Container({ children: elContainer }).render();

    elContainer.prepend(logo);

    el.append(container);

    return el;
  }
  render() {
    return this.el;
  }
}