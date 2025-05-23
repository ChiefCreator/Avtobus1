import { createDOM } from "../../lib/domUtils";

import DefaultComponent from "../DefaultComponent/DefaultComponent";
import ContactGroup from "./ContactGroup/ContactGroup";

import { generateId } from "../../lib/domUtils";

import "./ContactGroups.css";

export default class ContactGroups extends DefaultComponent {
  constructor({ groups, onClickButtonDelete, onGroupRemove }) {
    super();

    this.groups = groups;
    this.newGroups = [];
    this.onClickButtonDelete = onClickButtonDelete;
    this.onGroupRemove = onGroupRemove;

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

    const contactGroup =  new ContactGroup({ ...newGroup, onButtonRemoveClick: this.handleRemoveButtonClick.bind(this) })
    this.contactGroupObjs.push(contactGroup)
    this.list.append(contactGroup.render());
  }
  updateContactGroupsData() {
    this.contactGroupObjs.forEach(obj => {
      const group = this.groups.find(g => g.id === obj.id)
      if (group) {
        group.title = obj.title;
      }
    });
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

    this.onGroupRemove?.();
  }
  hasRecentlyAdded() {
    return this.groups.find(group => group.isRecentlyAdded);
  }
  updateList() {
    this.el.innerHTML = "";

    this.el.append(this._createList());
    this.list = this.el.querySelector(".contact-groups__list")
  }

  onModalClose() {
    const arr = [...this.groups];
    arr.forEach(({ id, title, isRecentlyAdded }) => {
      if (!title && isRecentlyAdded) {
        this.removeGroup(id);
      }
    })

    this.groups.forEach(({ isRecentlyAdded }, i) => {
      if (isRecentlyAdded) {
        this.groups[i].isRecentlyAdded = false;
      }
    })

    this.updateList();
  }

  _init() {
    this.contactGroupObjs = [];

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
      const contactGroup =  new ContactGroup({ ...group, onButtonRemoveClick: this.handleRemoveButtonClick.bind(this) })
      this.contactGroupObjs.push(contactGroup)
      list.append(contactGroup.render());
    });

    return list;
  }
}