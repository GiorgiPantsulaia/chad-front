<template>
  <div class="h-screen w-screen bg-[#11101A]">
    <nav-bar></nav-bar>
    <router-view class="z-50" />
    <div
      class="mx-auto w-9/12 text-center"
      :class="{
        'blur-[2px] pointer-events-none': active,
      }"
    >
      <h1 class="pt-96 text-5xl font-black leading-snug text-[#DDCCAA]">
        Find any quote in <br />
        millions of movie lines
      </h1>
      <button class="mt-8 bg-[#E31221] text-white rounded-md py-2 px-3">
        Get Started
      </button>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/layout/NavBar.vue";
export default {
  components: { NavBar },
  computed: {
    active() {
      return (
        this.$route.fullPath === "/register" ||
        this.$route.fullPath === "/login"
      );
    },
  },
};
</script>
