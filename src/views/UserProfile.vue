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
          class="w-full h-full max-h-[600px] mt-24 rounded-lg bg-[#11101A] flex flex-col items-center relative"
          :class="{ 'overflow-y-auto': tab === 'liked-posts' }"
        >
          <button
            class="flex fixed self-start text-white ml-4 mt-4 items-center gap-1"
            @click="this.$router.push({ path: 'profile' })"
            v-if="tab"
          >
            <icon-go-back :fill="white"></icon-go-back>
            <p class="text-base font-medium">{{ $t("back") }}</p>
          </button>
          <div class="flex flex-col items-center relative" v-if="!tab">
            <img
              :src="avatar ? back_url + avatar : '/default-pfp.png'"
              alt="profile picture"
              class="w-32 h-32 rounded-full absolute -top-16"
              v-if="tab !== 'settings'"
            />
            <h2 class="tracking-wider text-white font-bold text-2xl mt-16">
              {{ username }}
            </h2>
            <ul
              class="text-white mt-12 text-center gap-10 flex flex-col w-52 text-lg font-semibold pb-10"
              v-if="tab !== 'settings'"
            >
              <li
                class="border-b border-gray-700 pb-2 pl-3 tracking-widest cursor-pointer flex items-center gap-5"
              >
                <icon-profile-friends
                  class="flex-shrink-0"
                ></icon-profile-friends>
                {{ $t("friends") }}
              </li>
              <li
                class="border-b border-gray-700 pb-2 pl-3 tracking-widest cursor-pointer flex items-center gap-5 whitespace-normal"
                :class="{ 'gap-2': $i18n.locale === 'ka' }"
                @click="
                  this.$router.push({
                    name: 'profile',
                    query: { tab: 'liked-posts' },
                  })
                "
              >
                <icon-heart fill="#fff" class="flex-shrink-0"></icon-heart>
                {{ $t("liked_posts") }}
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
                <icon-settings class="flex-shrink-0"></icon-settings>
                {{ $t("settings") }}
              </li>
            </ul>
          </div>
          <edit-user
            v-if="this.$route.query.tab === 'settings'"
            @on-confirmation-close="confirmation_sent = false"
            @on-confirmation-send="confirmation_sent = true"
            @on-email-change="emailChanged = true"
            @on-loading="loading = true"
            @on-stop-loading="loading = false"
          ></edit-user>
          <liked-posts v-if="tab === 'liked-posts'" class="mt-10"></liked-posts>
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
import { useAuthStore } from "@/stores/auth.js";
import IconGoBack from "@/components/icons/IconGoBack.vue";
import IconProfileFriends from "@/components/icons/IconProfileFriends.vue";
import IconHeart from "@/components/icons/IconHeart.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import LikedPosts from "@/components/UI/LikedPosts.vue";
export default {
  computed: {
    ...mapState(useAuthStore, ["avatar", "username"]),
    tab() {
      return this.$route.query.tab;
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
    LikedPosts,
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
