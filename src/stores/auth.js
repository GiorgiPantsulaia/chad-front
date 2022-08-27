import { defineStore } from "pinia";
import axios from "axios";
import { useNotificationsStore } from "./notifications";
export const useAuthStore = defineStore({
  id: "auth",

  state: () => ({
    token: null,
    username: null,
    user_email: null,
    avatar: null,
    user_id: null,
    google_user: null,
  }),

  actions: {
    storeLoggedUser(payload) {
      this.token = payload.token;
      this.username = payload.username;
      this.user_email = payload.user_email;
      this.avatar = payload.avatar !== null ? payload.avatar : null;
      this.user_id = payload.user_id;
      this.google_user = payload.google_user;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("username", payload.username);
      localStorage.setItem("user_email", payload.user_email);
      localStorage.setItem("avatar", this.avatar);
      localStorage.setItem("user_id", this.user_id);
      localStorage.setItem("google_user", this.google_user);
      localStorage.setItem(
        "expire_time",
        Date.now() + payload.expire_time * 1000
      );
      this.router.replace({ name: "feed" });
    },
    tryLogin() {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const user_email = localStorage.getItem("user_email");
      const avatar = localStorage.getItem("avatar");
      const user_id = localStorage.getItem("user_id");
      const google_user = localStorage.getItem("google_user");
      let expire_time = localStorage.getItem("expire_time");
      expire_time = expire_time > Date.now() ? expire_time : null;
      console.log(expire_time > Date.now());
      if (expire_time) {
        this.token = token;
        this.username = username;
        this.user_email = user_email;
        this.user_id = user_id;
        this.google_user = google_user;
        this.avatar = avatar === "null" ? null : avatar;
      } else {
        localStorage.clear();
      }
    },
    logout() {
      axios
        .post(`${import.meta.env.VITE_API_BASE_URL}logout`)
        .then(() => {
          localStorage.clear();
          this.token = null;
          this.username = null;
          this.user_email = null;
          this.avatar = null;
          this.user_id = null;
          this.google_user = null;
          this.clearNotifications();
          this.router.push({ name: "home" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateUser(payload) {
      this.username = payload.username;
      this.user_email = payload.user_email;
      this.avatar = payload.avatar;
    },
    updateEmail(payload) {
      this.user_email = payload.email;
    },
    clearNotifications() {
      const notificationsStore = useNotificationsStore();
      notificationsStore.notifications = [];
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
  },
});
