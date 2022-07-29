import useAuthStore from "@/store/auth.js";
import router from "@/router/index.js";

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
