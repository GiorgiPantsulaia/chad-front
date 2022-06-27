import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    name: "",
    email: "",
    password: "",
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {},
});
