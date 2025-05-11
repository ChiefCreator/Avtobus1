import { createDOM } from "../../lib/domUtils";

import DefaultComponent from "../DefaultComponent/DefaultComponent";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import ButtonRemove from "../ButtonRemove/ButtonRemove";

import "./ContactCard.css";

export default class ContactCard extends DefaultComponent {
  constructor({ id, name, number, groupId, onButtonRemoveClick }) {
    super();

    this.id = id;
    this.name = name;
    this.number = number;
    this.groupId = groupId;
    this.onButtonRemoveClick = onButtonRemoveClick;

    this._init();
  }

  remove() {
    this.el.remove();
  }

  _init() {
    this.editButtonObj = new ButtonEdit({ className: "" });
    this.removeButtonObj = new ButtonRemove({ className: "", onClick: () => this.onButtonRemoveClick({ groupId: this.groupId, contactId: this.id }) });


    this.el = this._create();
  }
  _create() {
    const innerHTML = `
      <div class="contact-card__container">
        <h4 class="contact-card__title">${this.name}</h4>
        <span class="contact-card__number">${this.number}</span>

        <div class="contact-card__controls"></div>
      </div>
    `;
    const card = createDOM("div", { className: "contact-card", innerHTML, attributes: { "data-id": this.id } });
    const controls = card.querySelector(".contact-card__controls");

    controls.append(this.editButtonObj.render(), this.removeButtonObj.render());

    return card;
  }
}