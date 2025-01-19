// src\index.ts
import { App } from "vue";
import MovingLight from "./components/MovingLight.vue";
export { MovingLight };
export default {
  install: (app: App) => {
    app.component("MovingLight", MovingLight);
    app.component("moving-light", MovingLight);
  },
};
