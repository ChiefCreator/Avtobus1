import { createDOM } from "../../lib/domUtils";

import DefaultComponent from "../DefaultComponent/DefaultComponent";
import ContactGroup from "./ContactGroup/ContactGroup";

import { generateId } from "../../lib/domUtils";

import "./ContactGroups.css";

export default class ContactGroups extends DefaultComponent {
  constructor({ groups, onClickButtonDelete }) {
    super();

    this.groups = groups;
    this.onClickButtonDelete = onClickButtonDelete;

    this._init();
  }

  handleRemoveButtonClick(id) {
    this.onClickButtonDelete?.(id);
  }

  setNewGroup() {
    const newGroup = {
      id: generateId(),
      title: "",
      isRecentlyAdded: true
    }
    this.groups.push(newGroup);

    this.list.append(new ContactGroup({ ...newGroup, onButtonRemoveClick: this.handleRemoveButtonClick.bind(this), update: (group) => this.updateGroup(group) }).render());
  }
  updateGroup(updatedGroup) {
    const index = this.groups.findIndex(item => item.id === updatedGroup.id);

    if (index !== -1) {
      this.groups[index] = updatedGroup;
    }
  }
  removeGroup(id) {
    const index = this.groups.findIndex(item => item.id === id);

    if (index !== -1) {
      this.groups.splice(index, 1);

      const contactGroup = this.list.querySelector(`[data-id="${id}"]`);
      contactGroup.remove?.();
    }
  }
  hasRecentlyAdded() {
    return this.groups.find(group => group.isRecentlyAdded);
  }
  updateList() {
    this.el.innerHTML = "";

    this.el.append(this._createList());
  }

  onModalClose() {
    this.groups.forEach(({ id, title, isRecentlyAdded }) => {
      if (!title && isRecentlyAdded) {
        this.removeGroup(id);
      }
    })

    // this.updateList();
  }

  _init() {
    this.el = this._create();
    this.list = this.el.querySelector(".contact-groups__list")
  }
  _create() {
    const contactGroups = createDOM("div", { className: "contact-groups" });

    contactGroups.append(this._createList());

    return contactGroups;
  }
  _createList() {
    const list = createDOM("div", { className: "contact-groups__list" })

    this.groups.forEach(group => {
      list.append(new ContactGroup({ ...group, onButtonRemoveClick: this.handleRemoveButtonClick.bind(this) }).render());
    });

    return list;
  }
}