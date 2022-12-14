import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import SignupForm from "@/components/forms/SignupForm.vue";
import LoginForm from "@/components/forms/LoginForm.vue";
import NewsFeed from "@/views/NewsFeed.vue";
import ViewForbidden from "@/views/ViewForbidden.vue";
import NotFound from "@/views/NotFound.vue";
import MyProfile from "@/views/MyProfile.vue";
import RedirectUser from "@/views/RedirectUser.vue";
import VerifyEmail from "@/views/VerifyEmail.vue";
import MoviesList from "@/views/MoviesList.vue";
import MovieDescription from "@/views/MovieDescription.vue";
import ForgotPassword from "@/components/modals/ForgotPassword.vue";
import PasswordReset from "@/components/UI/PasswordReset.vue";
import ViewQuote from "@/components/modals/ViewQuote.vue";
import GenreMovies from "@/views/GenreMovies.vue";
import UserProfile from "@/views/UserProfile.vue";
import ChatWithUser from '@/views/ChatWithUser.vue';
import { isAuthenticated, redirectIfAuthenticated } from "./guards";
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
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
      beforeEnter: [redirectIfAuthenticated],

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
      beforeEnter: [isAuthenticated],
    },
    {
      path: "/forbidden",
      name: "forbidden",
      component: ViewForbidden,
    },
    {
      path: "/profile",
      name: "profile",
      component: MyProfile,
      beforeEnter: [isAuthenticated],
    },
    {
      path: "/redirecting",
      name: "redirecting",
      component: RedirectUser,
    },
    {
      path: "/verify",
      name: "email-verification",
      component: VerifyEmail,
    },
    {
      path: "/movies",
      name: "movies-list",
      component: MoviesList,
      beforeEnter: [isAuthenticated],
    },
    {
      path: "/movies/:slug",
      props: true,
      name: "movie-view",
      component: MovieDescription,
      beforeEnter: [isAuthenticated],
    },
    {
      path: "/view-quote/:id",
      props: true,
      name: "view-quote",
      component: ViewQuote,
      beforeEnter: [isAuthenticated],
    },
    {
      path: "/genres/:genre",
      props: true,
      name: "genres",
      component: GenreMovies,
      beforeEnter: [isAuthenticated],
    },
    {
      path: "/users/:id",
      props: true,
      name: "profile-view",
      component: UserProfile,
      beforeEnter: [isAuthenticated]
    },
    {
      path: "/users/:id/chat",
      props: true,
      name: "chat",
      component: ChatWithUser,
      beforeEnter: [isAuthenticated]
    }
  ],
});

export default router;
