import { defineStore } from "pinia";
import axios from "axios";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: "",
  }),
  actions: {
    storeToken(payload) {
      this.token = payload.token;
    },
    tryLogin() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
      }
    },
    logout() {
      axios
        .post("http://localhost:8000/api/logout")
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            localStorage.removeItem("token");
            this.token = "";
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
  },
});
