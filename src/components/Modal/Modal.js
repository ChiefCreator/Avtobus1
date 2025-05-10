import { createDOM } from "../../lib/domUtils";
import DefaultComponent from "../DefaultComponent/DefaultComponent";
import ButtonClose from "../ButtonClose/ButtonClose";

import "./Modal.css";


export default class Modal extends DefaultComponent {
  constructor({ id, title, content, buttons, onClose }) {
    super();

    this.id = id;
    this.title = title;
    this.contentObj = content;
    this.buttons = buttons;
    this.onClose = onClose;

    this.isOpen = false;

    this._init();
  }

  setIsOpen(isOpen) {
    this.isOpen = isOpen;
  }

  toggle() {
    this.setIsOpen(!this.isOpen);

    this.el.classList.toggle("modal_open", this.isOpen);
  }
  close() {
    this.setIsOpen(false);

    this.el.classList.remove("modal_open");

    this.onClose?.();
  }

  _init() {
    this.buttonCloseObj = new ButtonClose({
      onClick: () => this.close()
    });
  
    this.el = this._create();
    this.overflow = this.el.querySelector(".overflow");

    this._initListeners();
  }
  _initListeners() {
    this.overflow.addEventListener("click", this.close.bind(this));
  }
  _create() {
    const innerHTML = `
      <div class="modal__container">
        <header class="modal__header">
          <h6 class="modal__title">${this.title}</h6>
        </header>
  
        <div class="modal__body">
          <div class="modal__content">
          
          </div>
        </div>

        <div class="modal__footer">
        </div>
      </div>
    `;
    const modal = createDOM("div", { className: "modal", id: this.id, innerHTML });
    const overflow = createDOM("div", { className: "overflow" });

    const header = modal.querySelector(".modal__header");
    const content = modal.querySelector(".modal__content");
    const footer = modal.querySelector(".modal__footer");

    content.append(this.contentObj.render());
    header.append(this.buttonCloseObj.render());
    this.buttons.forEach(button => {
      footer.append(button.render());
    });
    modal.append(overflow);

    return modal;
  }
}