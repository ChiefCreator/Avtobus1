import { createDOM } from "../../lib/domUtils";
import DefaultComponent from "../DefaultComponent/DefaultComponent";

import ContactCard from "../ContactCard/ContactCard";

import "./GroupPanel.css";

export default class GroupPanel extends DefaultComponent {
  constructor({ id, title, contacts, index, isOpen }) {
    super();

    this.id = id;
    this.title = title;
    this.contacts = contacts;
    this.index = index;

    this.contactCards = [];

    this.isOpen = isOpen;

    this._init();
  }

  close() {
    this.el.classList.remove("group-panel_open");
  }
  toggle() {
    this.el.classList.toggle("group-panel_open");
  }

  _init() {
    this.el = this._create();
  }
  _create() {
    const innerHTML = `
      <header class="group-panel__header">
        <h2 class="group-panel__title">${this.title}</h2>

        <svg class="group-panel__arrow" xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
          <path d="M10.8849 0.294983L6.29492 4.87498L1.70492 0.294983L0.294922 1.70498L6.29492 7.70498L12.2949 1.70498L10.8849 0.294983Z" fill="black"/>
        </svg>
      </header>
      <div class="group-panel__dropdown">
        <div class="group-panel__dropdown-container">
          <div class="group-panel__body"></div>
        </div>
      </div>
    `;
    const groupPanel = createDOM("div", { className: "group-panel", innerHTML, attributes: { "data-index": this.index } });
    const body = groupPanel.querySelector(".group-panel__body");

    this.contacts?.forEach(data => {
      const contactCard = new ContactCard({ ...data });
      this.contactCards.push(contactCard);

      body.append(contactCard.render());
    });

    return groupPanel;
  }
}