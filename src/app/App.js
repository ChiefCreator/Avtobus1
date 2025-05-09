import AppView from "./AppView.js";
import AppModel from "./AppModel.js";
import AppController from "./AppController.js";

import HomePage from "./../pages/HomePage/HomePage";

import { createDOM } from "../lib/domUtils.js";

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

    this.content = createDOM("div", { id: "content" });
    this.root.append(this.content);

    this.view.setContent(this.content);
    this.view.setRoutes(this.routes);

    this.controller.init();
  }
}
