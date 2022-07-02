<template>
  <nav
    class="flex justify-between py-4 'bg-[#11101A]' text-white absolute top-0 left-0 w-full z-50"
    :class="{
      'blur-[2px] pointer-events-none': active,
      'bg-[#222030]': !landing,
    }"
  >
    <h1
      class="uppercase ml-12 text-[#DDCCAA] cursor-pointer self-center font-bold"
      @click="navigateHome"
    >
      Movie Quotes
    </h1>
    <div class="flex mr-12 items-center">
      <div class="mx-4 cursor-pointer">
        <div @click="showLang = !showLang" class="flex text-lg">
          Eng
          <img
            src="@/icons/arrow-down.svg"
            alt="arrow-down"
            class="ml-1 transition-all"
            :class="{ 'rotate-180': showLang }"
          />
        </div>
        <transition name="localeChanger" mode="out-in">
          <div v-if="showLang" class="absolute text-lg">Geo</div>
        </transition>
      </div>

      <router-link
        to="/register"
        class="mx-4 bg-[#E31221] rounded-sm py-1 px-5"
        v-if="!isAuthenticated"
        >Sign Up</router-link
      >
      <router-link
        v-if="!isAuthenticated"
        to="/login"
        class="py-1 px-5 mx-4 border border-white rounded-sm"
      >
        Log In</router-link
      >
      <button
        type="button"
        v-else
        class="py-1 px-5 mx-4 border border-white rounded-sm"
        @click="logout"
      >
        Log out
      </button>
    </div>
  </nav>
</template>
<script>
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";

export default {
  data() {
    return {
      showLang: false,
    };
  },

  computed: {
    ...mapState(useAuthStore, ["isAuthenticated", "logout"]),
    active() {
      return (
        this.$route.fullPath === "/register" ||
        this.$route.fullPath === "/login"
      );
    },
    landing() {
      return this.$route.fullPath === "/";
    },
  },
  methods: {
    navigateHome() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>
<style scoped>
.localeChanger-enter-active,
.localeChanger-leave-active {
  transition: opacity 0.2s ease;
}

.localeChanger-enter-from,
.localeChanger-leave-to {
  opacity: 0;
}
</style>
