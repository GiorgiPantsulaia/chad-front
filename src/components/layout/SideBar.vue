<template>
  <div
    class="bg-inherit text-white pl-12 self-start hidden lg:block"
    :class="{
      fixed: this.$route.fullPath === '/news-feed',
      'sm:w-96':
        this.$route.fullPath === '/movies' ||
        this.$route.name === 'movie-view' ||
        this.$route.fullPath === '/profile',
    }"
  >
    <ul>
      <li>
        <div class="flex">
          <img
            :src="user_pfp ? back_url + user_pfp : '/default-pfp.png'"
            alt="profile picture"
            class="rounded-full w-16 h-16"
            :class="{ 'border-2 border-[#E31221]': active === 'profile' }"
          />
          <div class="flex flex-col ml-6">
            <h2 class="text-2xl font-medium">{{ username }}</h2>
            <router-link to="/profile" class="text-[#CED4DA] self-start">
              {{ $t("edit_profile") }}
            </router-link>
          </div>
        </div>
      </li>
      <li class="my-8">
        <router-link to="/news-feed" class="flex">
          <icon-home
            :fill="active === 'feed' ? '#E31221' : 'white'"
          ></icon-home>
          <p class="text-xl ml-6">{{ $t("news_feed") }}</p>
        </router-link>
      </li>
      <li>
        <router-link to="/movies" class="flex">
          <icon-camera
            :fill="
              active === 'movies'
                ? '#E31221'
                : active === 'view'
                ? '#E31221'
                : 'white'
            "
          ></icon-camera>
          <p class="text-xl ml-6">{{ $t("my_movies") }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import IconCamera from "@/components/icons/IconCamera.vue";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import IconHome from "@/components/icons/IconHome.vue";
export default {
  computed: {
    active() {
      return this.$route.fullPath === "/news-feed"
        ? "feed"
        : this.$route.fullPath === "/movies"
        ? "movies"
        : this.$route.fullPath === "/profile"
        ? "profile"
        : this.$route.name === "movie-view"
        ? "view"
        : "";
    },
    ...mapState(useAuthStore, ["username", "user_pfp"]),
  },
  data() {
    return {
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
    };
  },
  components: { IconCamera, IconHome },
};
</script>
