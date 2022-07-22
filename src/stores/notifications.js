import { defineStore } from "pinia";
export const useNotificationsStore = defineStore({
  id: "notifications",
  state: () => ({
    notifications: [],
  }),
  actions: {
    storeNotifications(payload) {
      this.notifications.unshift(payload.notification);
    },
  },
});
