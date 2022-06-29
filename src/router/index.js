import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import SignupForm from "@/components/forms/SignupForm.vue";
import LoginForm from "@/components/forms/LoginForm.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingPage,
      children: [
        {
          path: "/register",
          name: "register",
          component: SignupForm,
        },
        {
          path: "/login",
          name: "login",
          component: LoginForm,
        },
      ],
    },
  ],
});

export default router;
