import { createDOM } from "../../lib/domUtils";

import DefaultComponent from "../DefaultComponent/DefaultComponent";
import ButtonClose from "../ButtonClose/ButtonClose";
import Button from "../Button/Button";

import "./ConfirmModal.css";

export default class ConfirmModal extends DefaultComponent {
  constructor({ title, description, buttonTrueOnClick, buttonFalseOnClick }) {
    super();

    this.title = title;
    this.description = description;
    this.buttonTrueOnClick = buttonTrueOnClick;
    this.buttonFalseOnClick = buttonFalseOnClick;

    this._init();
  }

  setIsOpen(isOpen) {
    this.isOpen = isOpen;
  }
  setDeletedGroupId(id) {
    this.deletedGroupId = id;
  }

  toggle() {
    this.setIsOpen(!this.isOpen);

    this.el.classList.toggle("confirm-modal_open", this.isOpen);
  }
  open() {
    this.setIsOpen(true);

    this.el.classList.add("confirm-modal_open");
  }
  close() {
    this.setIsOpen(false);

    this.el.classList.remove("confirm-modal_open");

    this.onClose?.();
  }

  _init() {
    this.buttonCloseObj = new ButtonClose({
      className: "confirm-modal__close",
      onClick: () => this.close(),
    });
    this.buttonTrue = new Button({ 
      className: "button_primary",
      title: "Да, удалить",
      onClick: () => {
        this.buttonTrueOnClick?.();
        this.close();
      }
    });
    this.buttonFalse = new Button({ 
      className: "button_without-bg",
      title: "Отмена",
      onClick: () => {
        this.buttonFalseOnClick?.();
        this.close();
      }
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
      <div class="confirm-modal__container">
        <header class="confirm-modal__header">
          <h6 class="confirm-modal__title">${this.title}</h6>
          <p class="confirm-modal__description">${this.description}</p>
        </header>

        <div class="confirm-modal__buttons">
        </div>
      </div>
    `;
    const modal = createDOM("div", { className: "confirm-modal", innerHTML });
    const overflow = createDOM("div", { className: "overflow" });

    const modalContainer = modal.querySelector(".confirm-modal__container");
    const buttonsWrapper = modal.querySelector(".confirm-modal__buttons");

    modalContainer.append(this.buttonCloseObj.render());
    buttonsWrapper.append(this.buttonTrue.render(), this.buttonFalse.render());
    modal.append(overflow);

    return modal;
  }
}
