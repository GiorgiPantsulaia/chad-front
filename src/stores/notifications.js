import { defineStore } from "pinia";
export const useNotificationsStore = defineStore({
  id: "notifications",
  state: () => ({
    notifications: [],
    allMarked: false,
  }),
  actions: {
    storeNotifications(payload) {
      this.notifications.unshift(payload.notification);
    },
    markAllAsRead() {
      for (let i = 0; i < this.notifications.length; i++) {
        this.notifications[i].state = "read";
      }
      this.allMarked = true;
    },
  },
});
