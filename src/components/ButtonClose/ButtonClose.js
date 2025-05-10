import { createDOM } from "../../lib/domUtils";
import DefaultComponent from "../DefaultComponent/DefaultComponent";

import "./ButtonClose.css";

export default class ButtonClose extends DefaultComponent {
  constructor({ className, onClick }) {
    super();

    this.className = className;
    this.onClick = onClick;

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
    <svg class="button-close__icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path opacity="0.3" d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="black"/>
    </svg>
    `;
    
    return createDOM("button", { className: `button-close ${this.className}`, innerHTML });
  }
}