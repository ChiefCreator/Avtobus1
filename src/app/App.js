import AppView from "./AppView.js";
import AppModel from "./AppModel.js";
import AppController from "./AppController.js";

import HomePage from "./../pages/HomePage/HomePage";

import Header from "../components/Header/Header";
import Button from "../components/Button/Button.js";

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

    this.view = new AppView({ root });
    this.model = new AppModel(this.view);
    this.controller = new AppController(this.model);
  }

  init() {
    const homePage = new HomePage();

    this.routes = {
      main: homePage,
      default: homePage,
    };

    this.components = {
      header: new Header({
        buttons: [
          new Button({
            className: "header__button-add button_add",
            title: "Добавить контакт",
            icon: buttonAddIcon
          }),
          new Button({ 
            className: "button_primary",
            title: "Группы"
          })
        ]
      }),
    };

    this.view.setRoutes(this.routes);
    this.view.setComponents(this.components);

    this.view.init();
    this.controller.init();
  }
}
