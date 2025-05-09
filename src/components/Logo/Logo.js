import { createDOM } from "../../lib/domUtils";

import "./Logo.css";
import logoSrc from "./../../assets/img/logo.svg";


export default class Logo {
  constructor() {
    this.el = null;

    this._init();
  };


  _init() {
    this.el = this._create();
  }
  _create() {
    const el = createDOM("img", { className: "logo", attributes: { src: logoSrc } });

    return el;
  }
  render() {
    return this.el;
  }
}