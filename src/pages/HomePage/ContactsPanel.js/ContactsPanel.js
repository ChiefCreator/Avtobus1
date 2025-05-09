import DefaultComponent from "../../../components/DefaultComponent/DefaultComponent";
import { createDOM } from "../../../lib/domUtils";

import globalState from "./../../../app/globalState";

import "./ContactsPanel.css";

export default class ContactsPanel extends DefaultComponent {
  constructor() {
    super();

    this.container = null;
    this.contacts = globalState.getContacts();

    this._init();
  }

  setContainer(container) {
    container.innerHTML = "";
    this.container = container;
  }

  _init() {
    this.el = this._create();
  }
  _create() {
    this.contacts = globalState.getContacts();

    let panelContent = "";
    
    if (this.contacts) {
      panelContent = `
        Список контактов
      `
    } else {
      panelContent = `
        <div class="empty">
          <span class="empty__title">Список контактов пуст</div>
        </div>
      `
    }

    const panel = createDOM("div", { className: "contacts-panel", innerHTML: panelContent });

    return panel;
  }
  globalStateSubscribe() {
    globalState.subscribe([this._init.bind(this), this._create.bind(this), this.render.bind(this, this.container)]);
  }
  render(container) {
    this.setContainer(container);

    this.container.append(this.el);
  }
}