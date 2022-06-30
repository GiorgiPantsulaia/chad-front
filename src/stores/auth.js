import { defineStore } from "pinia";
import axios from "axios";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: "",
    user: "",
    user_email: "",
  }),
  actions: {
    storeUser(payload) {
      this.token = payload.token;
      this.user = payload.user;
      this.user_email = payload.user_email;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", payload.user);
      localStorage.setItem("user_email", payload.user_email);
    },
    tryLogin() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const user_email = localStorage.getItem("user_email");
      if (token && user && user_email) {
        this.token = token;
        this.user = user;
        this.user_email = user_email;
      }
    },
    logout() {
      axios
        .post("http://localhost:8000/api/logout")
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("user_email");
            this.token = "";
            this.user = "";
            this.user_email = "";
            this.router.push({ name: "home" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    userEmail(state) {
      return state.user_email;
    },
  },
});
