import DefaultComponent from "../../../components/DefaultComponent/DefaultComponent";
import GroupPanel from "../../../components/GroupPanel/GroupPanel";
import { createDOM } from "../../../lib/domUtils";

import "./ContactsPanel.css";

export default class ContactsPanel extends DefaultComponent {
  constructor({ contactGroups, onGroupPanelRemoveButtonClick }) {
    super();

    this.contactGroups = contactGroups;
    this.onGroupPanelRemoveButtonClick = onGroupPanelRemoveButtonClick;

    this.el = null;
    this.panelContent = null;
    this.contactGroupsList = null;
    this.empty = null;

    this.groupPanels = [];
    this.openIndex = null;

    this._init();
  }

  setContactGroups(contactGroups) {
    this.contactGroups = contactGroups;
  }
  removeContactCard({ groupId, contactId }) {
    this.groupPanels.find(item => item.id === groupId).removeContactCard(contactId);
  }
  _hasAnyContacts() {
    return this.contactGroups.some(
      group => Array.isArray(group.contacts) && group.contacts.length > 0
    );
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

    this.contactGroups.forEach((group, i) => {
      const { id, title, contacts } = group;

      if (!contacts?.length) return;

      const groupPanelObj = new GroupPanel({
        id,
        title,
        contacts,
        index: i,
        isOpen: false,
        onButtonRemoveClick: (arg) => this.onGroupPanelRemoveButtonClick(arg)
      });

      this.groupPanels.push(groupPanelObj);
      
      list.append(groupPanelObj.render());
    });

    return list;
  }
  _createEmpty() {
    return createDOM("div", { className: "empty", innerHTML: `<span class="empty__title">Список контактов пуст</span>` });
  }
  renderContent() {
    this.panelContent.innerHTML = "";
    this.groupPanels = [];

    if (this._hasAnyContacts()) {
      this.contactGroupsList = this._createContactGroupsList()
      this.panelContent.append(this.contactGroupsList);
    } else {
      this.empty = this._createEmpty();
      this.panelContent.append(this.empty);
    }
  }
}