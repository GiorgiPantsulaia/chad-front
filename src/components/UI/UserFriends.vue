<template>
  <div class="w-full flex flex-col items-center pb-10">
    <h1 class="text-xl text-white font-black sm:-mt-5">
      {{ $t("friends") }} ({{ friends ? friends.length : 0 }})
    </h1>
    <div
      v-if="fetched && friends"
      class="w-full flex flex-col sm:flex-row items-center sm:flex-wrap sm:gap-10 gap-6 text-center px-5 mt-10"
    >
      <friend-card
        class="cursor-pointer hover:opacity-80"
        v-for="friend in friends"
        :key="friend.id"
        :friend="friend"
        @click="
          this.$router.push({ name: 'profile-view', params: { id: friend.id } })
        "
      ></friend-card>
    </div>
  </div>
</template>
<script>
import axios from "@/config/axios/index.js";
import FriendCard from "@/components/UI/FriendCard.vue";
export default {
  data() {
    return {
      friends: null,
      fetched: false,
    };
  },
  mounted() {
    this.fetchFriends();
  },
  methods: {
    fetchFriends() {
      axios.get("friends").then((res) => {
        this.friends = res.data;
        this.fetched = true;
      });
    },
  },
  components: { FriendCard },
};
</script>
