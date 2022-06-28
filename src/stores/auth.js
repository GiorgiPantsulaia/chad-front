import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: "",
    user_id: null,
  }),
  actions: {
    storeToken(payload) {
      this.token = payload.token;
    },
    tryLogin() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");
      if (token && userId) {
        this.token = token;
        this.user_id = userId;
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.token = "";
      this.user_id = null;
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
