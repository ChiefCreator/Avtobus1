import AppView from "./AppView.js";
import AppModel from "./AppModel.js";
import AppController from "./AppController.js";

import HomePage from "./../pages/HomePage/HomePage";

import Header from "../components/Header/Header";
import Button from "../components/Button/Button.js";
import Modal from "../components/Modal/Modal.js";
import ContactsPanel from "../pages/HomePage/ContactsPanel/ContactsPanel.js";
import ContactGroups from "../components/ContactGroups/ContactGroups.js";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal.js";
import AddContactModalContent from "../components/AddContactModalContent/AddContactModalContent.js";

const buttonAddIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <g clip-path="url(#clip0_9143_16)">
      <path d="M14.25 9.75H9.75V14.25H8.25V9.75H3.75V8.25H8.25V3.75H9.75V8.25H14.25V9.75Z" fill="white"/>
    </g>
    <defs>
      <clipPath id="clip0_9143_16">
        <rect width="18" height="18" fill="white"/>
      </clipPath>
    </defs>
  </svg>
`

export default class App {
  constructor({ root }) {
    this.root = root;
    this.content = null;

    this.routes = null;
    this.components = null;

    this.contactGroups = JSON.parse(localStorage.getItem("contactGroups")) || [],

    this.view = new AppView({ root });
    this.model = new AppModel(this.view);
    this.controller = new AppController(this.model);
  }

  removeContact(groupId, contactId) {
    const group = this.contactGroups.find(g => g.id === groupId);
  
    if (group && group.contacts) {
      group.contacts = group.contacts.filter(contact => contact.id !== contactId);
    }
  }
  updateOrRelocateContact(contactId, newContactData, newGroupTitle) {
    let foundContact = null;
    let currentGroup = null;
  
    for (const group of this.contactGroups) {
      if (Array.isArray(group.contacts)) {
        const index = group.contacts.findIndex(c => c.id === contactId);
        if (index !== -1) {
          foundContact = { ...group.contacts[index], ...newContactData };
          currentGroup = group;
          group.contacts.splice(index, 1);
          break;
        }
      }
    }
  
    if (!foundContact) return;
  
    let targetGroup = this.contactGroups.find(g => g.title === newGroupTitle);

    if (!targetGroup) {
      targetGroup = {
        id: newGroupTitle.toLowerCase().replace(/\s+/g, '-'),
        title: newGroupTitle,
        contacts: []
      };
      this.contactGroups.push(targetGroup);
    }
  
    if (!Array.isArray(targetGroup.contacts)) {
      targetGroup.contacts = [];
    }

    targetGroup.contacts.push(foundContact);
  }
  

  init() {
    const contactsPanel = new ContactsPanel({
      contactGroups: this.contactGroups,
      onButtonRemoveClick: (arg) => {
        this.confirmModal_2.open();
        this.confirmModal_2.setArg(arg);
      },
      onEditButtonClick: ({ groupId, contactId }) => {
        const group = this.contactGroups.find(item => item.id === groupId);
        const { id, name, number } = group?.contacts.find(item => item.id === contactId);
        const contactData = { id, name, number, contactGroup: group.title };

        this.editContactModal.toggle();
        this.editContactModalContent.setData(contactData);
      },
    });
    this.confirmModal_2 = new ConfirmModal({
      title: "Удалить контакт?",
      description: "Данный контакт невозможно будет восстановить",
      buttonTrueOnClick: () => {
        const { groupId, contactId } = this.confirmModal_2.arg;
        contactsPanel.removeContactCard(this.confirmModal_2.arg);     
        
        this.removeContact(groupId, contactId);
        contactsPanel.setContactGroups(this.contactGroups);

        if (!this.contactGroups.find(item => item.id === groupId).contacts?.length) {
          contactsPanel.renderContent();
        }
      }
    });

    const contactGroups = new ContactGroups({
      groups: this.contactGroups,
      onClickButtonDelete: (arg) => {
        this.confirmModal.open();
        this.confirmModal.setArg(arg);
        this.contactGroupsModal.close();
      },
      onGroupRemove: () => {
        this.addContactModalContent.renderSelect(this.contactGroups);
        this.editContactModalContent.renderSelect(this.contactGroups);
        contactsPanel.renderContent();
      }
    });
    const buttonAddGroup = new Button({
      className: "button_without-bg",
      title: "Добавить",
      onClick: () => {
        if (!contactGroups.hasRecentlyAdded()) {
          contactGroups.setNewGroup();
        }
      }
    });
    const buttonSaveGroups = new Button({
      className: "button_primary",
      title: "Сохранить",
      onClick: () => {
        contactGroups.updateContactGroupsData();

        this.addContactModalContent.renderSelect(this.contactGroups);
        this.editContactModalContent.renderSelect(this.contactGroups);
        contactsPanel.renderContent();

        this.contactGroupsModal.close();

        localStorage.setItem("contactGroups", JSON.stringify(this.contactGroups));
      }
    });
    this.contactGroupsModal = new Modal({ 
      title: "Группы контактов",
      content: contactGroups,
      buttons: [buttonAddGroup, buttonSaveGroups],
      onClose: () => {
        contactGroups.onModalClose();
      }
    });

    const buttonAddContact = new Button({
      className: "header__button-add button_add",
      title: "Добавить контакт",
      icon: buttonAddIcon,
      onClick: () => {
        this.addContactModal.toggle();
      }
    });
    const buttonGrops = new Button({ 
      className: "button_primary",
      title: "Группы",
      onClick: () => {
        this.contactGroupsModal.toggle();
      }
    });

    this.confirmModal = new ConfirmModal({
      title: "Удалить группу?",
      description: "Удаление группы повлечет за собой удаление контактов связанных с этой группой",
      buttonTrueOnClick: () => {
        contactGroups.removeGroup(this.confirmModal.arg);
        contactsPanel.renderContent();

        localStorage.setItem("contactGroups", JSON.stringify(this.contactGroups));
      }
    });

    this.addContactModalContent = new AddContactModalContent({
      nameValue: "",
      numberValue: "",
      contactGroups: this.contactGroups.map(({ id, title }) => ({ id, title })),
      formId: "form-add-contact",
      onFormSubmit: () => {
        this.addContactModal.close();
      },
      onAddNewContact: (contactData) => {
        const contactGroup = this.contactGroups.find(item => item.title === contactData.contactGroup);
        if (contactGroup) {
          if (!contactGroup.contacts) {
            contactGroup.contacts = [contactData];
          } else {
            contactGroup.contacts.push(contactData);
          }

          localStorage.setItem("contactGroups", JSON.stringify(this.contactGroups));
          contactsPanel.setContactGroups(this.contactGroups);
          contactsPanel.renderContent();
        }
      }
    });
    const buttonSaveContact = new Button({
      className: "button_primary",
      title: "Сохранить",
      attributes: { form: "form-add-contact", type: "submit" },
    });
    this.addContactModal = new Modal({ 
      title: "Добавление контакта",
      content: this.addContactModalContent,
      buttons: [buttonSaveContact],
      onClose: () => {
        this.addContactModalContent.onModalClose();
      },
    });

    this.editContactModalContent = new AddContactModalContent({
      nameValue: "",
      numberValue: "",
      contactGroups: this.contactGroups.map(({ id, title }) => ({ id, title })),
      formId: "form-edit-contact",
      onFormSubmit: ({ id, name, number, contactGroup }) => {

        this.updateOrRelocateContact(id, { id, name, number }, contactGroup);
        localStorage.setItem("contactGroups", JSON.stringify(this.contactGroups));

        contactsPanel.setContactGroups(this.contactGroups);
        contactsPanel.renderContent();

        this.addContactModal.close();
      },
    });
    const buttonEditContact = new Button({
      className: "button_primary",
      title: "Изменить контакт",
      attributes: { form: "form-edit-contact", type: "submit" },
    });
    this.editContactModal = new Modal({ 
      title: "Изменение контакта",
      content: this.editContactModalContent,
      buttons: [buttonEditContact],
      onClose: () => {
        this.editContactModalContent.onModalClose();
      },
    });

    const buttonAddContactMobile = new Button({
      className: "button_add",
      title: "Добавить контакт",
      icon: buttonAddIcon,
      onClick: () => {
        this.addContactModal.toggle();
      }
    });

    const homePage = new HomePage({ contactsPanelObj: contactsPanel, buttonAddContactMobile: buttonAddContactMobile });

    this.routes = {
      main: homePage,
      default: homePage,
    };

    this.components = {
      header: new Header({
        buttons: [
          buttonAddContact,
          buttonGrops
        ]
      }),
      contactGroupsModal: this.contactGroupsModal,
      addContactModal: this.addContactModal,
      editContactModal: this.editContactModal,
      confirmModal: this.confirmModal,
      confirmModal_2: this.confirmModal_2
    };

    this.view.setRoutes(this.routes);
    this.view.setComponents(this.components);

    this.view.init();
    this.controller.init();
  }
}
