import { useAuthStore } from "@/stores/auth.js";

export function isAuthenticated() {
  const store = useAuthStore();
  if (!store.isAuthenticated) {
    return "/forbidden";
  }
}
export function redirectIfAuthenticated() {
  const store = useAuthStore();
  if (store.isAuthenticated) {
    return "/news-feed";
  }
}
