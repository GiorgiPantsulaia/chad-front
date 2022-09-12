<template>
  <div
    class="bg-inherit text-white md:pl-12 px-10 self-start"
    :class="{
      'md:fixed': this.$route.name === 'feed',
      'sm:w-96':
        this.$route.name === 'movies-list' ||
        this.$route.name === 'movie-view' ||
        this.$route.name === 'profile' ||
        this.$route.name === 'profile-view',
    }"
  >
    <ul>
      <li>
        <div class="flex">
          <img
            :src="avatar ? back_url + avatar : '/default-pfp.png'"
            alt="profile picture"
            class="rounded-full w-16 h-16"
            :class="{
              'border-2 border-[#E31221]': this.$route.name === 'profile',
            }"
          />
          <div class="flex flex-col ml-6">
            <h2 class="text-2xl font-medium w-48">{{ username }}</h2>
            <router-link
              :to="{ name: 'profile' }"
              class="text-[#CED4DA] self-start"
            >
              {{ $t("edit_profile") }}
            </router-link>
          </div>
        </div>
      </li>
      <li class="my-8">
        <router-link :to="{ name: 'feed' }" class="flex">
          <icon-home
            :fill="this.$route.name === 'feed' ? '#E31221' : 'white'"
          ></icon-home>
          <p class="text-xl ml-6">{{ $t("news_feed") }}</p>
        </router-link>
      </li>
      <li class="my-8">
        <router-link :to="{ name: 'movies-list' }" class="flex">
          <icon-camera
            :fill="
              this.$route.name === 'movies-list'
                ? '#E31221'
                : this.$route.name === 'movie-view'
                ? '#E31221'
                : 'white'
            "
          ></icon-camera>
          <p class="text-xl ml-6">{{ $t("my_movies") }}</p>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'profile', query: { tab: 'friends' } }"
          class="flex items-center"
        >
          <icon-friends
            :fill="this.$route.query.tab === 'friends' ? '#E31221' : 'white'"
          />
          <p class="text-xl ml-8">{{ $t("friends") }}</p>
        </router-link>
      </li>
      <slot></slot>
    </ul>
  </div>
</template>
<script>
import IconCamera from "@/components/icons/IconCamera.vue";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import IconHome from "@/components/icons/IconHome.vue";
import IconFriends from "../icons/IconFriends.vue";
export default {
  computed: {
    ...mapState(useAuthStore, ["username", "avatar"]),
  },
  data() {
    return {
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
    };
  },
  components: { IconCamera, IconHome, IconFriends },
};
</script>
