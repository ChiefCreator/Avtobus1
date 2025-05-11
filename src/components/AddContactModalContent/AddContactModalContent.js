import { createDOM, generateId } from "../../lib/domUtils";

import DefaultComponent from "../DefaultComponent/DefaultComponent";
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField";

import "./AddContactModalContent.css";

export default class AddContactModalContent extends DefaultComponent {
  constructor({ nameValue = "", numberValue = "", formId, contactGroups, onFormSubmit, onAddNewContact }) {
    super();

    this.nameValue = nameValue;
    this.numberValue = numberValue;
    this.contactGroups = contactGroups;
    this.formId = formId;
    this.onFormSubmit = onFormSubmit;
    this.onAddNewContact = onAddNewContact;

    this._init();
  }

  setData({ id, name, number, contactGroup }) {
    this.inputFieldNameObj.setValue(name);
    this.inputFieldNumberObj.setValue(number);
    this.selectFieldObj.setValue(contactGroup);
    this.contactId = id;
  }

  _addNewContact(data) {
    this.onAddNewContact?.(data);
  }

  handleRemoveButtonClick(id) {
    this.onClickButtonDelete?.(id);
  }
  handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);

    const data = { id: this.contactId ?? generateId() };
    for (let [key, value] of formData.entries()) {
      data[key] = value.trim();
    }

    const isError = this._validateData(data);

    if (!isError) {
      this._addNewContact(data);
      this.onFormSubmit?.(data);
    }
  }
  _validateData(data) {
    let error = false;
    const { name, number, contactGroup } = data;

    const isNameValid = /^[А-Яа-яЁё]+(?:\s+[А-Яа-яЁё]+){1,2}$/.test(name);

    const isPhoneValid = /^((\+375|80)(25|29|33|44)\d{7})$/.test(number);

    if (!isNameValid) {
      this.inputFieldNameObj.setError({ message: "Поле является обязательным" });
      error = true;
    } else {
      this.inputFieldNameObj.removeError();
    }

    if (!isPhoneValid) {
      this.inputFieldNumberObj.setError({ message: "Поле является обязательным" });
      error = true;
    } else {
      this.inputFieldNumberObj.removeError();
    }

    if (!contactGroup) {
      this.selectFieldObj.setError({ message: "Поле является обязательным" });
      error = true;
    } else {
      this.selectFieldObj.removeError();
    }

    return error;
  }
  onModalClose() {
    this.nameValue = "";
    this.numberValue = "";
    this.contactId = null;
    this.inputFieldNameObj.clearValue();
    this.inputFieldNumberObj.clearValue();

    this.inputFieldNameObj.removeError();
    this.inputFieldNumberObj.removeError();
    this.selectFieldObj.removeError();
  }

  renderSelect(contactGroups) {
    this.contactGroups = contactGroups;

    this.selectFieldObj.el.remove();
    this.selectFieldObj = new SelectField({
      options: this.contactGroups,
    });

    this.list.append(this.selectFieldObj.render())
  }

  _init() {
    this.inputFieldNameObj = new InputField({ placeholder: "Введите ФИО", value: this.nameValue, name: "name" });
    this.inputFieldNumberObj = new InputField({ placeholder: "Введите номер", value: this.numberValue, name: "number" });
    this.selectFieldObj = new SelectField({
      options: this.contactGroups,
    });

    this.el = this._create();
    this.form = this.el.querySelector(".add-contact-modal-content__form");
    this.list = this.el.querySelector(".add-contact-modal-content__list");

    this._initListeners();
  }
  _initListeners() {
    this.el.addEventListener("submit", this.handleFormSubmit.bind(this));
  }
  _create() {
    const content = createDOM("div", { className: "add-contact-modal-content" });
    const form = createDOM("form", { className: "add-contact-modal-content__form", id: this.formId })
    const contentList = createDOM("div", { className: "add-contact-modal-content__list" });

    form.append(contentList);
    contentList.append(this.inputFieldNameObj.render(), this.inputFieldNumberObj.render(), this.selectFieldObj.render())
    content.append(form);

    return content;
  }
  _createList() {
    const list = createDOM("div", { className: "contact-groups__list" })

    return list;
  }
}