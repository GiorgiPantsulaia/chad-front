<template>
  <section class="h-screen bg-[#1a1825] absolute top-0 left-0 w-screen">
    <nav-bar></nav-bar>
    <div
      class="flex mt-24 w-full"
      :class="{
        'blur-[2px] pointer-events-none':
          loading || confirmation_sent || emailChanged,
      }"
    >
      <side-bar class="hidden lg:block"></side-bar>
      <div class="sm:ml-64 flex flex-col sm:w-5/12 w-full">
        <slot></slot>
      </div>
    </div>
    <email-update-sent
      v-if="confirmation_sent"
      @on-close="confirmation_sent = false"
    />
    <email-changed v-if="emailChanged" @on-close="emailChanged = false" />
    <loading-bar
      v-if="loading"
      class="absolute top-0 bottom-0 my-auto left-0 right-0 mx-auto"
    />
  </section>
</template>

<script>
import SideBar from "@/components/layout/SideBar.vue";
import NavBar from "@/components/layout/NavBar.vue";
import EmailUpdateSent from "@/components/modals/EmailUpdateSent.vue";
import EmailChanged from "@/components/modals/EmailChanged.vue";
import LoadingBar from "@/components/UI/LoadingBar.vue";

export default {
  data() {
    return {
      loading: false,
      confirmation_sent: false,
      emailChanged: false,
    };
  },
  components: {
    LoadingBar,
    EmailChanged,
    EmailUpdateSent,
    NavBar,
    SideBar,
  },
};
</script>
<style scoped>
@media only screen and (min-width: 760px) {
  div {
    scrollbar-color: #d4aa70 #e4e4e4;
    scrollbar-width: thin;
  }

  div::-webkit-scrollbar {
    width: 10px;
  }

  div::-webkit-scrollbar-track {
    background-color: #4d4d4d;
    border-radius: 50px;
  }

  div::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-image: linear-gradient(180deg, #27243f 0%, #26355a 99%);
    box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
  }
  * {
    box-sizing: border-box;
  }
}
</style>
