import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/Dashboard/DashboardView.vue";
import RegisterView from "../views/register/Register.vue";
import { auth } from "../firebase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
 
    {
      path: "/",
      name: "register",
      component: RegisterView,
      
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: {
        requiresAuth: true,
      },
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   component: () => import("../views/Login.vue"),
    //   meta: {
    //     requiresAuth: true,
    //   },
    // },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/Login.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

export default router;
