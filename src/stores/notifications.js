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
    updateNotificationState(payload){
      const index = this.notifications.findIndex((notification)=>
        notification.id===payload.id);
      this.notifications[index].state=payload.state;
    },
    updateNotificationStatus(payload){
      const index = this.notifications.findIndex((notification)=>
        notification.id===payload.id);
      this.notifications[index].status=payload.status;
    },
    markAllAsRead() {
      this.notifications.forEach((notification) => {
        notification.state = "read";
      });
      this.allMarked = true;
    },
  },
  getters:{
    filteredNotifications(){
      return this.notifications.filter((notification)=> 
      notification.state!=='read');

    }
  }
});
