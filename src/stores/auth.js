import { defineStore } from "pinia";
import axios from "axios";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: "",
  }),
  actions: {
    storeUser(payload) {
      this.token = payload.token;
      localStorage.setItem("token", payload.token);
      localStorage.setItem(
        "expire_time",
        Date.now() + payload.expire_time * 1000
      );
      this.router.push({ name: "home" });
    },
    tryLogin() {
      const token = localStorage.getItem("token");
      let expire_time = localStorage.getItem("expire_time");
      expire_time = expire_time > Date.now() ? expire_time : null;
      if (token && expire_time) {
        this.token = token;
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
