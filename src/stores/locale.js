import { defineStore } from "pinia";
export const useLocaleStore = defineStore({
  id: "locale",
  state: () => ({}),
  actions: {
    storeLocale(payload) {
      localStorage.setItem("locale", payload.locale);
    },
  },
});
