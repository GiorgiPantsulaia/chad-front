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
        <h1 class="text-white text-xl font-black hidden sm:block">
          {{ $t("profile") }}
        </h1>
        <div
          class="w-full h-full flex flex-col items-center mt-24 rounded-lg bg-[#11101A]"
        >
          <button
            class="flex absolute self-start text-white ml-4 mt-4 items-center gap-1"
            @click="this.$router.push({ path: 'profile' })"
            v-if="inSettings"
          >
            <icon-go-back></icon-go-back>
            <p class="text-base font-medium">Back</p>
          </button>
          <img
            :src="avatar ? back_url + avatar : '/default-pfp.png'"
            alt="profile picture"
            class="w-32 h-32 rounded-full -mt-16"
            v-if="!inSettings"
          />
          <h2 class="tracking-wider text-white font-bold text-2xl">
            {{ username }}
          </h2>
          <ul
            class="text-white mt-12 text-center gap-10 flex flex-col w-52 text-xl font-semibold pb-10"
            v-if="!inSettings"
          >
            <li
              class="border-b border-gray-700 pb-2 pl-3 tracking-widest cursor-pointer flex items-center gap-5"
            >
              <icon-profile-friends></icon-profile-friends>
              Friends
            </li>
            <li
              class="border-b border-gray-700 pb-2 pl-3 tracking-widest cursor-pointer flex items-center gap-[22px]"
            >
              <icon-heart fill="#fff"></icon-heart>
              Liked posts
            </li>
            <li
              class="border-b border-gray-700 pb-2 pl-3 cursor-pointer tracking-widest flex items-center gap-5"
              @click="
                this.$router.push({
                  path: 'profile',
                  query: { tab: 'settings' },
                })
              "
            >
              <icon-settings></icon-settings>
              Settings
            </li>
          </ul>
          <edit-user
            v-if="this.$route.query.tab === 'settings'"
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
      class="absolute top-0 bottom-0 my-auto left-0 right-0 mx-auto"
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
import { mapState } from "pinia";
import { useAuthStore } from "../stores/auth";
import IconGoBack from "../components/icons/IconGoBack.vue";
import IconProfileFriends from "../components/icons/IconProfileFriends.vue";
import IconHeart from "../components/icons/IconHeart.vue";
import IconSettings from "../components/icons/IconSettings.vue";
export default {
  computed: {
    ...mapState(useAuthStore, ["avatar", "username"]),
    inSettings() {
      return this.$route.query.tab === "settings";
    },
  },
  data() {
    return {
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
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
    IconGoBack,
    IconProfileFriends,
    IconHeart,
    IconSettings,
  },
};
</script>
