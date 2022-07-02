<template>
  <div class="bg-inherit text-white pl-12 self-start hidden lg:block">
    <ul>
      <li>
        <div class="flex">
          <img
            src="@/icons/interstellar.png"
            alt="profile picture"
            class="rounded-full w-16 h-16"
            :class="{ 'border-2 border-[#E31221]': active === 'profile' }"
          />
          <div class="flex flex-col ml-6">
            <h2 class="text-3xl">{{ user }}</h2>
            <button
              class="text-[#CED4DA] self-start"
              @click="this.$router.push('/profile')"
            >
              Edit your profile
            </button>
          </div>
        </div>
      </li>
      <li class="my-8">
        <button class="flex" @click="this.$router.push({ name: 'feed' })">
          <home-icon
            :fill="active === 'feed' ? '#E31221' : 'white'"
          ></home-icon>
          <p class="text-xl ml-10">News Feed</p>
        </button>
      </li>
      <li>
        <button class="flex" @click="this.$router.push({ name: 'movies' })">
          <camera-icon
            :fill="active === 'movies' ? '#E31221' : 'white'"
          ></camera-icon>
          <p class="text-xl ml-10">List of movies</p>
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
import { useAuthStore } from "@/stores/auth";
import { mapState } from "pinia";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import HomeIcon from "@/components/icons/HomeIcon.vue";
export default {
  computed: {
    ...mapState(useAuthStore, ["user"]),
    active() {
      return this.$route.fullPath === "/news-feed"
        ? "feed"
        : this.$route.fullPath === "/movies"
        ? "movies"
        : this.$route.fullPath === "/profile"
        ? "profile"
        : "";
    },
  },
  components: { CameraIcon, HomeIcon },
};
</script>
