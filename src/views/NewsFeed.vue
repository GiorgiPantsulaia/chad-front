<template>
  <div class="h-screen bg-[#1a1825] absolute top-0 left-0 w-screen">
    <nav-bar></nav-bar>
    <div class="flex mt-24">
      <side-bar></side-bar>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/layout/NavBar.vue";
import SideBar from "@/components/layout/SideBar.vue";
export default {
  components: { NavBar, SideBar },
};
</script>
