<template>
  <router-view v-slot="{ Component }">
    <!-- <transition name="route" mode="out-in"> -->
    <component :is="Component"></component>
    <!-- </transition> -->
  </router-view>
</template>
<script>
import { useAuthStore } from "@/stores/auth.js";
import { mapActions } from "pinia";
export default {
  name: "App",
  methods: {
    ...mapActions(useAuthStore, ["tryLogin"]),
  },
  created() {
    this.tryLogin();
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
