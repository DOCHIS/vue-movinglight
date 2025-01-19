import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import MovingLight from "../src/index";

const app = createApp(App);
app.use(router);
app.use(MovingLight);
app.mount("#app");

// router가 제대로 동작하는지 확인
router.beforeEach((to, from, next) => {
  console.log("Navigating to:", to.path);
  next();
});
