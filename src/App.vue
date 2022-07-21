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
import pusher from "@/config/pusher/pusher.js";
export default {
  name: "App",
  computed: {
    ...mapState(useNotificationsStore, ["notifications"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["tryLogin"]),
    subscribe() {
      pusher.subscribe("likes");
      pusher.subscribe("comments");
      // pusher.subscribe("private-notification");
    },
  },
  created() {
    this.tryLogin();
    this.subscribe();
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
