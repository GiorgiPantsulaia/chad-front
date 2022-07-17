<template>
  <router-view v-slot="{ Component }">
    <component :is="Component"></component>
  </router-view>
</template>
<script>
import { useAuthStore } from "@/stores/auth.js";
import { mapActions } from "pinia";
import { setLocale } from "@vee-validate/i18n";
export default {
  name: "App",
  methods: {
    ...mapActions(useAuthStore, ["tryLogin"]),
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
