import DefaultComponent from "../DefaultComponent/DefaultComponent";

import { createDOM } from "../../lib/domUtils";

import "./Button.css";

export default class Button extends DefaultComponent {
  constructor({ className = "", title, icon, attributes, onClick, onSubmit }) {
    super();

    this.className = className;
    this.title = title;
    this.icon = icon;
    this.attributes = attributes;
    this.onClick = onClick;
    this.onSubmit = onSubmit;

    this._init();
  }

  _init() {
    this.el = this._create();

    this._initListeners();
  }
  _initListeners() {
    this.el.addEventListener("click", this.onClick);
  }
  _create() {
    const innerHTML = `
      <span className="button__title">${this.title}</span>
      ${this.icon ?? ""}
    `;
    const el = createDOM("button", { className: `button ${this.className}`, innerHTML, attributes: this.attributes });

    return el;
  }
}