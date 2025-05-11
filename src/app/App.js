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

    this.contactGroups = [
      {
      id: "friends",
      title: "Друзья",
      contacts: [
        {
          id: "tima",
          name: "Тима",
          number: "+375256038315",
        },
        {
          id: "ganchick",
          name: "Ганчик",
          number: "+375256024315",
        },
      ],
      },
      {
        id: "collegues",
        title: "Коллеги"
      }
    ];
    this.deletedContactGroupId = "friends";

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

  init() {
    const contactsPanel = new ContactsPanel({
      contactGroups: this.contactGroups,
      onGroupPanelRemoveButtonClick: (arg) => {
        this.confirmModal_2.open();
        this.confirmModal_2.setArg(arg);
      }
    });
    this.confirmModal_2 = new ConfirmModal({
      title: "Удалить контакт?",
      description: "Данный контакт невозможно будет восстановить",
      buttonTrueOnClick: () => {
        const { groupId, contactId } = this.confirmModal_2.arg;
        contactsPanel.removeContactCard(this.confirmModal_2.arg);     
        
        this.removeContact(groupId, contactId);
      }
    });
    const homePage = new HomePage({ contactsPanelObj: contactsPanel });

    const contactGroups = new ContactGroups({
      groups: this.contactGroups,
      onClickButtonDelete: (arg) => {
        this.confirmModal.open();
        this.confirmModal.setArg(arg);
        this.contactGroupsModal.close();
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
        contactsPanel.renderContent();
        this.contactGroupsModal.close();
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
      }
    });

    const addContactModalContent = new AddContactModalContent({
      nameValue: "",
      numberValue: "",
      contactGroups: this.contactGroups.map(({ id, title }) => ({ id, title })),
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

          contactsPanel.setContactGroups(this.contactGroups);
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
      content: addContactModalContent,
      buttons: [buttonSaveContact],
      onClose: () => {
        addContactModalContent.onModalClose();
      },
    });

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
      confirmModal: this.confirmModal,
      confirmModal_2: this.confirmModal_2
    };

    this.view.setRoutes(this.routes);
    this.view.setComponents(this.components);

    this.view.init();
    this.controller.init();
  }
}
