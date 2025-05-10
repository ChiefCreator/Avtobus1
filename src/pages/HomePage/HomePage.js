import { createDOM } from "./../../lib/domUtils";

import Button from "./../../components/Button/Button";
import Container from "./../../components/Container/Container";

import "./HomePage.css";

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

export default class HomePage {
  constructor({ contactsPanelObj }) {
    this.id = "main";
    this.title = "Главная";
    this.page = null;

    this.contactsPanelObj = contactsPanelObj;
    this.buttonObj = null;

    this._init();
  }

  _init() {
    this.buttonObj = new Button({
      className: "button_add",
      title: "Добавить контакт",
      icon: buttonAddIcon,
      onClick: () => {
       
      }
    });

    this.page = this._create();
  }
  _create() {
    const page = createDOM("main", { className: "page" });
    const pageContainer = createDOM("div", {
      className: "page__container",
      innerHTML: `
        <div class="page__button-add-wrapper">
        </div>
        <div class="page__contacts-panel-wrapper"></div>
      `
    });

    const buttonAddWrapper = pageContainer.querySelector(".page__button-add-wrapper");
    const contactsPanelWrapper = pageContainer.querySelector(".page__contacts-panel-wrapper");

    const buttonAdd = this.buttonObj.render();
    const container = new Container({ children: pageContainer }).render();

    buttonAddWrapper.append(buttonAdd);
    page.append(container);

    contactsPanelWrapper.append(this.contactsPanelObj.render());

    return page;
  }
  render() {
    return this.page;
  }
}
