/* eslint-disable no-unused-vars */
import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import "@/index.css";
import App from "@/App.vue";
import router from "./router";
import "@vee-validate/rules";
import "@/config/vee-validate/rules.js";
import "@/config/vee-validate/messages";
import { createI18n } from "vue-i18n";
import messages from "@/config/i18n/messages.js";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Echo = new Echo({
  authEndpoint: "http://localhost:8000/api/broadcasting/auth",
  broadcaster: "pusher",
  key: "398d603e7fcaaee24a78",
  forceTLS: true,
  cluster: ["eu"],
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  },
});
const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});
const i18n = createI18n({
  locale: localStorage.getItem("locale") || "ka",
  fallbackLocale: "en",
  messages,
});
app.use(i18n);
app.use(pinia);
app.use(router);
app.mount("#app");
