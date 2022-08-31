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
      <div class="sm:ml-64 flex flex-col sm:w-5/12 h-[500px] w-full">
        <h1 class="text-white text-xl font-black hidden sm:block">
          {{ $t("profile") }}
        </h1>
        <div
          class="w-full h-fit flex flex-col items-center mt-24 rounded-lg bg-[#11101A]"
        >
          <edit-user
            @on-confirmation-close="confirmation_sent = false"
            @on-confirmation-send="confirmation_sent = true"
            @on-email-change="emailChanged = true"
            @on-loading="loading = true"
            @on-stop-loading="loading = false"
          ></edit-user>
        </div>
      </div>
    </div>
    <email-update-sent
      v-if="confirmation_sent"
      @on-close="confirmation_sent = false"
    />
    <email-changed v-if="emailChanged" @on-close="emailChanged = false" />
    <loading-bar
      v-if="loading"
      class="absolute top-0 bottom-0 my-auto left-0 right-0"
    />
  </section>
</template>

<script>
import EditUser from "@/components/UI/EditUser.vue";
import SideBar from "@/components/layout/SideBar.vue";
import NavBar from "@/components/layout/NavBar.vue";
import EmailUpdateSent from "@/components/modals/EmailUpdateSent.vue";
import EmailChanged from "@/components/modals/EmailChanged.vue";
import LoadingBar from "@/components/UI/LoadingBar.vue";
export default {
  computed: {},
  data() {
    return {
      loading: false,
      confirmation_sent: false,
      emailChanged: false,
    };
  },
  methods: {},
  components: {
    EditUser,
    NavBar,
    SideBar,
    EmailUpdateSent,
    EmailChanged,
    LoadingBar,
  },
};
</script>
