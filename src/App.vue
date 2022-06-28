<template>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </transition>
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

<style>
#app {
  margin: 0;
  padding: 0;
  font-weight: normal;
}
.route-enter-from {
  opacity: 0;
}
.route-enter-active {
  transition: all 0.4s ease-out;
}
.route-leave-to {
  opacity: 0;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
