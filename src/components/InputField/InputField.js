import { createDOM } from "../../lib/domUtils";
import DefaultComponent from "../DefaultComponent/DefaultComponent";

import "./InputField.css";

export default class InputField extends DefaultComponent {
  constructor({ placeholder, value, name }) {
    super();

    this.placeholder = placeholder;
    this.value = value;
    this.name = name;

    this._init();
  }

  clearValue() {
    this.value = "";
    this.input.value = "";
  }
  setError({ message }) {
    this.el.classList.add("input-field_error");

    this.errorText.textContent = message;
  }
  removeError() {
    this.el.classList.remove("input-field_error");

    this.errorText.textContent = "";
  }

  _init() {
    this.el = this._create();
    this.input = this.el.querySelector(".input-field__input");
    this.errorText = this.el.querySelector(".input-field__error");
  }
  _create() {
    const innerHTML = `
      <input class="input-field__input" name="${this.name}" placeholder="${this.placeholder}">

      <span class="input-field__error"></span>
    `;

    const inputField = createDOM("div", { className: "input-field", innerHTML });

    

    return inputField;
  }
}