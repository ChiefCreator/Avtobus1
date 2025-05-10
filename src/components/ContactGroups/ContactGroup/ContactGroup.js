import { createDOM } from "../../../lib/domUtils";

import DefaultComponent from "../../DefaultComponent/DefaultComponent";

import "./ContactGroup.css";

export default class ContactGroup extends DefaultComponent {
  constructor({ id, title, isRecentlyAdded, onButtonRemoveClick, update }) {
    super();

    this.id = id;
    this.title = title;
    this.isRecentlyAdded = isRecentlyAdded;
    this.onButtonRemoveClick = onButtonRemoveClick;
    this.update = update;

    this._init();
  }

  changeTitle(e) {
    this.title = e.target.value;
    
    if (this.title) {
      this.isRecentlyAdded = false;
    }

    if (this.update) {
      this.update({ id: this.id, title: this.title, isRecentlyAdded: this.isRecentlyAdded });
    }
  }

  _init() {
    this.el = this._create();
    this.input = this.el.querySelector(".group__input");
    this.buttonDelete = this.el.querySelector(".button-delete");

    this._initListeners();
  }
  _initListeners() {
    this.input.addEventListener("input", this.changeTitle.bind(this));
    this.onButtonRemoveClick && this.buttonDelete.addEventListener("click", this.onButtonRemoveClick.bind(this, this.id));
  } 
  _create() {
    const innerHTML = `
      <input class="group__input" value="${this.title}">

    `;
    const group = createDOM("div", { className: "group", innerHTML, attributes: { "data-id": this.id } });
    const buttonDelete = createDOM("button", {
      className: "button-delete",
      innerHTML: `
       <svg class="button-delete__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
         <path d="M1.66664 17.3889C1.66664 18.55 2.61664 19.5 3.77775 19.5H12.2222C13.3833 19.5 14.3333 18.55 14.3333 17.3889V4.72222H1.66664V17.3889ZM4.26331 9.87333L5.75164 8.385L7.99997 10.6228L10.2378 8.385L11.7261 9.87333L9.48831 12.1111L11.7261 14.3489L10.2378 15.8372L7.99997 13.5994L5.7622 15.8372L4.27386 14.3489L6.51164 12.1111L4.26331 9.87333ZM11.6944 1.55556L10.6389 0.5H5.36108L4.30553 1.55556H0.611084V3.66667H15.3889V1.55556H11.6944Z" fill="white"/>
       </svg>
      `,
    });

    group.append(buttonDelete);

    return group;
  }
}
