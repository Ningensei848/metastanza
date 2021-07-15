import Stanza from "togostanza/stanza";

import { createApp } from "vue";
import App from "./app.vue";

export default class ScrollTable extends Stanza {
  async render() {
    const main = this.root.querySelector("main");
    main.parentNode.style.backgroundColor =
      "var(--togostanza-background-color)";
    main.parentNode.style.padding = this.params["padding"];
    createApp(App, this.params).mount(main);
  }
}
