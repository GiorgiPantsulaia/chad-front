<template>
  <div class="w-96 h-96 flex flex-col">
    <img
      :src="friend.profile_pic ? back_url + friend.profile_pic : '/default.png'"
      alt="Movie quotes user profile picture"
      class="w-full h-full"
    />
    <h1 class="text-white text-lg font-medium">{{ friend.name }}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
    };
  },
  props: {
    friend: {
      type: Object,
      required: true,
    },
  },
};
</script>
