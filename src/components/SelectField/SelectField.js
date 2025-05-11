import { createDOM } from "../../lib/domUtils";
import DefaultComponent from "../DefaultComponent/DefaultComponent";

import "./SelectField.css";

export default class SelectField extends DefaultComponent {
  constructor({ options }) {
    super();

    this.selectedValue = null;
    this.defaultValue = "Выберите группу"
    this.options = options;
    console.log(options)

    this.isOpen = false;

    this._init();
  }

  setOptions(newOptions) {
    this.options = newOptions;
  }

  close() {
    this.isOpen = false;
    this.select.classList.remove("select_open");
  }
  toggle(e) {
    this.isOpen = !this.isOpen;

    this.select.classList.toggle("select_open");
  }
  setError({ message }) {
    this.el.classList.add("select-field_error");

    this.errorText.textContent = message;
  }
  removeError() {
    this.el.classList.remove("select-field_error");

    this.errorText.textContent = "";
  }

  handleDropdownClick(e) {
    const selectedValueEl = e.target.closest(".select__option");
    if (selectedValueEl) {
      const value = selectedValueEl.dataset.value;
      this.selectedValue = this.options.find(option => option.id === value)?.title;

      this.selectInput.value = this.selectedValueEl.innerHTML = this.selectedValue;

      this.close();
    }
  }

  _init() {
    this.el = this._create();
    this.select = this.el.querySelector(".select");
    this.selectInput = this.select.querySelector(".select__input");
    this.trigger = this.select.querySelector(".select__trigger");
    this.selectedValueEl = this.trigger.querySelector(".select__selected-value");
    this.dropdown = this.select.querySelector(".select__dropdown");
    this.errorText = this.el.querySelector(".select-field__error");

    this._initListeners();
  }
  _initListeners() {
    this.trigger.addEventListener("click", this.toggle.bind(this));
    this.dropdown.addEventListener("click", this.handleDropdownClick.bind(this));
  }
  _create() {
    const innerHTML = `
      <div class="select">
      <input class="select__input" value="${this.selectedValue ?? ""}" name="contactGroup">
        <button class="select__trigger" type="button">
          <span class="select__selected-value">${this.selectedValue ?? this.defaultValue}</span>

          <svg class="select__arrow" xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
            <path d="M10.8849 0.294983L6.29492 4.87498L1.70492 0.294983L0.294922 1.70498L6.29492 7.70498L12.2949 1.70498L10.8849 0.294983Z" fill="black"/>
          </svg>
        </button>

        <div class="select__dropdown">
          <div class="select__dropdown-container">
            <div class="select__body">
              ${this.options.map(opt => `<div class="select__option" data-value="${opt.id}">${opt.title}</div>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <span class="select-field__error"></span>
    `;

    const el = createDOM("div", { className: "select-field", innerHTML });

    return el;
  }
}