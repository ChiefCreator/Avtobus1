import App from "./app/App";

import "./assets/styles/base/_vars.css";
import "./assets/styles/base/_base.css";
import "./assets/styles/base/_utils.css";
import "./assets/styles/base/_reset.css";

window.addEventListener("load", () => {
  const root = document.getElementById("root");
  const app = new App({ root });
  app.init();
});
