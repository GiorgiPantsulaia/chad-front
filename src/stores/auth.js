import { defineStore } from "pinia";
import axios from "axios";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null,
    username: null,
    user_email: null,
    user_pfp: null,
    user_id: null,
    google_user: null,
  }),
  actions: {
    storeLoginUser(payload) {
      this.token = payload.token;
      this.username = payload.username;
      this.user_email = payload.user_email;
      this.user_pfp = payload.user_pfp !== null ? payload.user_pfp : null;
      this.user_id = payload.user_id;
      this.google_user = payload.google_user;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("username", payload.username);
      localStorage.setItem("user_email", payload.user_email);
      localStorage.setItem("user_pfp", this.user_pfp);
      localStorage.setItem("user_id", this.user_id);
      localStorage.setItem("google_user", this.google_user);
      localStorage.setItem(
        "expire_time",
        Date.now() + payload.expire_time * 1000
      );
      this.router.push({ name: "home" });
    },
    tryLogin() {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const user_email = localStorage.getItem("user_email");
      const user_pfp = localStorage.getItem("user_pfp");
      const user_id = localStorage.getItem("user_id");
      const google_user = localStorage.getItem("google_user");
      let expire_time = localStorage.getItem("expire_time");
      expire_time = expire_time > Date.now() ? expire_time : null;
      if (token && expire_time && username && user_email) {
        this.token = token;
        this.username = username;
        this.user_email = user_email;
        this.user_id = user_id;
        this.google_user = google_user;
        this.user_pfp = user_pfp === "null" ? null : user_pfp;
      } else {
        return;
      }
    },
    logout() {
      axios
        .post("http://localhost:8000/api/logout")
        .then((response) => {
          if (response.status === 200) {
            localStorage.clear();
            this.token = null;
            this.username = null;
            this.user_email = null;
            this.user_pfp = null;
            this.user_id = null;
            this.google_user = null;
            this.router.push({ name: "home" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateUser(payload) {
      this.username = payload.username;
      this.user_email = payload.user_email;
      this.user_pfp = payload.user_pfp;
    },
    updateEmail(payload) {
      this.user_email = payload.email;
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
