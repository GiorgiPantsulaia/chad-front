import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import SignupForm from "@/components/forms/SignupForm.vue";
import LoginForm from "@/components/forms/LoginForm.vue";
import { useAuthStore } from "@/stores/auth.js";
import NewsFeed from "@/views/NewsFeed.vue";
import ViewForbidden from "@/views/ViewForbidden.vue";
import NotFound from "@/views/NotFound.vue";
import UserProfile from "@/views/UserProfile.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:NotFound(.*)",
      name: "not-found",
      component: NotFound,
    },
    {
      path: "/",
      name: "home",
      component: LandingPage,
      meta: { requiresAuth: false },
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
    {
      path: "/news-feed",
      name: "feed",
      component: NewsFeed,
      meta: { requiresAuth: true },
    },
    {
      path: "/forbidden",
      name: "forbidden",
      component: ViewForbidden,
    },
    {
      path: "/profile",
      name: "profile",
      component: UserProfile,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next("/forbidden");
  } else if (to.meta.requiresAuth === false && store.isAuthenticated) {
    next("/news-feed");
  } else {
    next();
  }
});
export default router;
