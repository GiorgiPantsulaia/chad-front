<template>
  <div
    class="sm:w-56 sm:h-56 flex sm:flex-col w-full h-20 border-b border-gray-500 items-center sm:border-none"
  >
    <img
      :src="
        friend.profile_pic ? back_url + friend.profile_pic : '/default-pfp.png'
      "
      alt="Movie quotes user profile picture"
      class="sm:w-full w-16 h-16 sm:h-full sm:rounded-xl rounded-full ml-4 sm:ml-0"
    />
    <h1 class="text-white text-lg font-medium ml-4 sm:ml-0">
      {{ friend.name }}
    </h1>
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
