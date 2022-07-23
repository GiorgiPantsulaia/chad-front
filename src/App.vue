<template>
  <router-view v-slot="{ Component }">
    <component :is="Component"></component>
  </router-view>
</template>
<script>
import { useAuthStore } from "@/stores/auth.js";
import { useNotificationsStore } from "@/stores/notifications.js";
import { mapActions, mapState } from "pinia";
import { setLocale } from "@vee-validate/i18n";
import axios from "@/config/axios/index.js";
import Echo from "laravel-echo";
export default {
  name: "App",
  computed: {
    ...mapState(useAuthStore, ["isAuthenticated"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["tryLogin"]),
    ...mapActions(useNotificationsStore, ["storeNotifications"]),
    getNotifications() {
      axios.get("notifications").then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.storeNotifications({ notification: res.data[i] });
        }
      });
    },
  },
  watch: {
    isAuthenticated() {
      if (this.isAuthenticated) {
        this.getNotifications();
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
      }
    },
  },
  created() {
    this.tryLogin();
    setLocale(localStorage.getItem("locale") || "en");
  },
};
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
  font-weight: normal;
}
</style>
