import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import SignupForm from "@/components/forms/SignupForm.vue";
import LoginForm from "@/components/forms/LoginForm.vue";
import { useAuthStore } from "@/stores/auth.js";
import NewsFeed from "@/views/NewsFeed.vue";
import ViewForbidden from "@/views/ViewForbidden.vue";
import NotFound from "@/views/NotFound.vue";
import UserProfile from "@/views/UserProfile.vue";
import RedirectUser from "@/views/RedirectUser.vue";
import VerifyEmail from "@/views/VerifyEmail.vue";
import MoviesList from "@/views/MoviesList.vue";
import MovieDescription from "@/views/MovieDescription.vue";
import ForgotPassword from "@/components/modals/ForgotPassword.vue";
import PasswordReset from "@/components/UI/PasswordReset.vue";
import ViewQuote from "@/components/modals/ViewQuote.vue";
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
        {
          path: "/forgot-password",
          name: "forgot-password",
          component: ForgotPassword,
        },
        {
          path: "/reset-password",
          name: "reset-password",
          component: PasswordReset,
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
      meta: { requiresAuth: true },
    },
    {
      path: "/redirecting",
      name: "redirecting",
      component: RedirectUser,
      meta: { requiresAuth: false },
    },
    {
      path: "/verify",
      name: "email-verification",
      component: VerifyEmail,
      meta: { requiresAuth: false },
    },
    {
      path: "/movies",
      name: "movies-list",
      component: MoviesList,
      meta: { requiresAuth: true },
    },
    {
      path: "/movies/:slug",
      props: true,
      name: "movie-view",
      component: MovieDescription,
      meta: { requiresAuth: true },
    },
    {
      path: "/view-quote/:id",
      props: true,
      name: "view-quote",
      component: ViewQuote,
      meta: { requiresAuth: true },
    },
  ],
});
router.beforeEach((to, _2, next) => {
  const store = useAuthStore();
  if (to.name === "not-found") {
    next();
  } else if (to.meta.requiresAuth && !store.isAuthenticated) {
    next("/forbidden");
  } else if (!to.meta.requiresAuth && store.isAuthenticated) {
    next("/news-feed");
  } else {
    next();
  }
});
export default router;
