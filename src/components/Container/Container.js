import { createDOM } from "./../../lib/domUtils";

import "./Container.css";

export default class Container {
  constructor({ className = "", children }) {
    this.className = className;
    this.children = children;
    this.el = null;

    this._init();
  }

  _init() {
    this.el = this._create();
  }
  _create() {
    const el = createDOM("div", { className: "container" });

    el.appendChild(this.children);

    if (this.children instanceof Element || this.children instanceof HTMLElement) {
      el.append(this.children);
    } else if (typeof this.children === "string") {
      el.innerHTML = this.children;
    }

    return el;
  }
  render() {
    return this.el;
  }
}
