import DefaultComponent from "../DefaultComponent/DefaultComponent";

import { createDOM } from "../../lib/domUtils";

import "./Button.css";

export default class Button extends DefaultComponent {
  constructor({ className = "", title, icon }) {
    super();

    this.className = className;
    this.title = title;
    this.icon = icon;

    this._init();
  }

  _init() {
    this.el = this._create();
  }
  _create() {
    const innerHTML = `
      <span className="button__title">${this.title}</span>
      ${this.icon ?? ""}
    `;
    const el = createDOM("button", { className: `button ${this.className}`, innerHTML });

    return el;
  }
}