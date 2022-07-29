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
      this.notifications.forEach((notification) => {
        notification.state = "read";
      });
      this.allMarked = true;
    },
  },
});
