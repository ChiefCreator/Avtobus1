import { createDOM } from "../../lib/domUtils";
import DefaultComponent from "../DefaultComponent/DefaultComponent";

import "./ContactCard.css";

export default class ContactCard extends DefaultComponent {
  constructor({ id, name, number }) {
    super();

    this.id = id;
    this.name = name;
    this.number = number;

    this._init();
  }

  _init() {
    this.el = this._create();
  }
  _create() {
    const innerHTML = `
      <div class="contact-card__container">
        <h4 class="contact-card__title">${this.name}</h4>
        <span class="contact-card__number">${this.number}</span>


      </div>
    `;
    const card = createDOM("div", { className: "contact-card", innerHTML, attributes: { "data-id": this.id } });

    return card;
  }
}