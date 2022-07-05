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
            <h2 class="text-3xl">{{ username }}</h2>
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
import CameraIcon from "@/components/icons/CameraIcon.vue";
import HomeIcon from "@/components/icons/HomeIcon.vue";
import axios from "@/config/axios/index.js";
export default {
  data() {
    return {
      username: "",
    };
  },
  beforeMount() {
    axios.post("logged-user").then((response) => {
      this.username = response.data.user.name;
    });
  },
  computed: {
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
