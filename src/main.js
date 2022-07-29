/* eslint-disable no-unused-vars */
import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import "@/index.css";
import App from "@/App.vue";
import router from "./router";
import "@vee-validate/rules";
import "@/config/vee-validate/rules.js";
import "@/config/vee-validate/messages";
import vClickOutside from "click-outside-vue3";
import i18n from "@/config/i18n";
import pusherJs from "pusher-js";

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(vClickOutside);
app.use(pinia);
app.use(router);
app.use(i18n);
app.mount("#app");
