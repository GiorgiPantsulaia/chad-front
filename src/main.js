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
