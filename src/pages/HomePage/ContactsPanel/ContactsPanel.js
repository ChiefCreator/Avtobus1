import DefaultComponent from "../../../components/DefaultComponent/DefaultComponent";
import GroupPanel from "../../../components/GroupPanel/GroupPanel";
import { createDOM } from "../../../lib/domUtils";

import "./ContactsPanel.css";

export default class ContactsPanel extends DefaultComponent {
  constructor({ contactGroups }) {
    super();

    this.contactGroups = contactGroups;

    this.el = null;
    this.panelContent = null;
    this.contactGroupsList = null;
    this.empty = null;

    this.groupPanels = [];
    this.openIndex = null;

    this._init();
  }

  handleClick(e) {
    const groupPanelHeader = e.target.closest(".group-panel__header");
    if (groupPanelHeader) {
      const groupPanel = groupPanelHeader.closest(".group-panel");
      const index = +groupPanel.dataset.index;

      this.groupPanels.forEach((groupPanel) =>{
        if (groupPanel.index !== index) groupPanel.close();
      })

      this.groupPanels[index]?.toggle();
    }
  }

  _init() {
    this.el = this._create();
    this.panelContent = this.el.querySelector(".contacts-panel__content");

    this.renderContent();

    this._initListeners();
  }
  _initListeners() {
    this.el.addEventListener("click", this.handleClick.bind(this));
  }
  _create() {
    const panel = createDOM("div", { className: "contacts-panel", innerHTML: `<div class="contacts-panel__content"></div>` });

    return panel;
  }
  _createContactGroupsList() {
    const list = createDOM("div", { className: "contact-groups-list" });

    this.contactGroups.forEach((data, i) => {
      const groupPanelObj = new GroupPanel({ id: data.id, title: data.title, index: i, isOpen: false });
      this.groupPanels.push(groupPanelObj);
      
      list.append(groupPanelObj.render());
    });

    return list;
  }
  _createEmpty() {
    return createDOM("div", { className: "empty", innerHTML: `<span class="empty__title"></span>` });
  }
  renderContent() {
    this.panelContent.innerHTML = "";
    this.groupPanels = [];

    if (this.contactGroups?.length) {
      this.contactGroupsList = this._createContactGroupsList()
      this.panelContent.append(this.contactGroupsList);
    } else {
      this.empty = this._createEmpty();
      this.panelContent.append(this.empty);
    }
  }
}