import { createRouter, createWebHistory } from "vue-router";
import SingleLightDemo from "./pages/SingleLightDemo.vue";
import LightShowroom from "./pages/LightShowroom.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/single",
    },
    {
      path: "/single",
      name: "single",
      component: SingleLightDemo,
    },
    {
      path: "/showroom",
      name: "showroom",
      component: LightShowroom,
    },
  ],
});

export default router;
