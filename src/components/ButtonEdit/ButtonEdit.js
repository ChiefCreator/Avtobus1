import { createDOM } from "../../lib/domUtils";
import DefaultComponent from "../DefaultComponent/DefaultComponent";

import "./ButtonEdit.css";

export default class ButtonEdit extends DefaultComponent {
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
      <svg class="button-edit__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M0 14.25V18H3.75L14.81 6.94L11.06 3.19L0 14.25ZM17.71 4.04C18.1 3.65 18.1 3.02 17.71 2.63L15.37 0.289998C14.98 -0.100002 14.35 -0.100002 13.96 0.289998L12.13 2.12L15.88 5.87L17.71 4.04Z" fill="black"/>
      </svg>
    `;
    
    return createDOM("button", { className: `button-edit ${this.className}`, innerHTML });
  }
}