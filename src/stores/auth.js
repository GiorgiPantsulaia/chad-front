import { defineStore } from "pinia";
import axios from "axios";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null,
    username: null,
    user_email: null,
    user_pfp: null,
    liked_posts: null,
  }),
  actions: {
    storeLoginUser(payload) {
      this.token = payload.token;
      this.username = payload.username;
      this.user_email = payload.user_email;
      this.user_pfp = payload.user_pfp !== null ? payload.user_pfp : null;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("username", payload.username);
      localStorage.setItem("user_email", payload.user_email);
      localStorage.setItem("user_pfp", this.user_pfp);
      localStorage.setItem(
        "expire_time",
        Date.now() + payload.expire_time * 1000
      );
      this.router.push({ name: "home" });
    },
    storeLikedPosts(payload) {
      this.liked_posts = payload.liked_posts;
    },
    updateLikedPosts(payload) {
      if (payload.id) {
        this.liked_posts = this.liked_posts.filter(
          (post) => post.id !== payload.id
        );
      } else {
        this.liked_posts.push(payload.quote);
      }
    },
    tryLogin() {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const user_email = localStorage.getItem("user_email");
      const user_pfp = localStorage.getItem("user_pfp");
      let expire_time = localStorage.getItem("expire_time");
      expire_time = expire_time > Date.now() ? expire_time : null;
      if (token && expire_time && username && user_email) {
        this.token = token;
        this.username = username;
        this.user_email = user_email;
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
