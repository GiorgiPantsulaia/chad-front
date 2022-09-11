<template>
  <profile-layout>
    <h1 class="text-white text-xl font-black hidden sm:block">
      {{ $t("profile") }}
    </h1>
    <div
      class="w-full h-full max-h-[600px] mt-24 rounded-lg bg-[#11101A] flex flex-col items-center relative"
      :class="{
        'overflow-y-auto': tab === 'liked-posts',
        'max-h-fit': tab === 'friends',
      }"
    >
      <button
        class="flex fixed self-start text-white ml-4 mt-4 items-center gap-1"
        :class="{ relative: tab === 'friends' }"
        @click="this.$router.push({ path: 'profile' })"
        v-if="tab"
      >
        <icon-go-back fill="white"></icon-go-back>
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
            @click="
              this.$router.push({
                name: 'profile',
                query: { tab: 'friends' },
              })
            "
          >
            <icon-profile-friends class="flex-shrink-0"></icon-profile-friends>
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
      <user-friends v-if="tab === 'friends'"></user-friends>
    </div>
  </profile-layout>
</template>
<script>
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import IconGoBack from "@/components/icons/IconGoBack.vue";
import IconProfileFriends from "@/components/icons/IconProfileFriends.vue";
import IconHeart from "@/components/icons/IconHeart.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import LikedPosts from "@/components/UI/LikedPosts.vue";
import EditUser from "@/components/UI/EditUser.vue";
import ProfileLayout from "@/components/layout/ProfileLayout.vue";

import UserFriends from "../components/UI/UserFriends.vue";
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
  components: {
    EditUser,
    IconGoBack,
    IconProfileFriends,
    IconHeart,
    IconSettings,
    LikedPosts,
    ProfileLayout,
    UserFriends,
  },
};
</script>
