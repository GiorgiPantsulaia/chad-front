<template>
  <div class="sm:w-8/12 w-11/12 flex flex-col items-center">
    <h1 class="text-xl text-white font-black">
      {{ $t("friends") }}({{ friends.length }})
    </h1>
    <div v-if="fetched && friends" class="w-full">
      <friend-card
        class="border border-gray-600 mt-10"
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
import FriendCard from "./FriendCard.vue";
export default {
  data() {
    return {
      friends: null,
    };
  },
  methods: {
    fetchFriends() {
      axios
        .get(`${parseInt(this.user_id)}/friends`)
        .then((res) => (this.friends = res.data));
    },
  },
  components: { FriendCard },
};
</script>
