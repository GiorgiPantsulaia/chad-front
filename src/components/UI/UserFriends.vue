<template>
  <div class="w-full flex flex-col items-center pb-10">
    <button
      class="flex self-start text-white ml-4 mt-4 items-center gap-1"
      :class="{ relative: tab === 'friends' }"
      @click="this.$router.go(-1)"
      v-if="
        this.$route.query.tab === 'friends' &&
        this.$route.name === 'profile-view'
      "
    >
      <icon-go-back fill="white"></icon-go-back>
      <p class="text-base font-medium">{{ $t("back") }}</p>
    </button>
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
import IconGoBack from "@/components/icons/IconGoBack.vue";
export default {
  props: {
    userId: {
      type: Number,
      required: false,
    },
  },
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
      axios
        .get(this.userId ? `/${this.userId}/friends` : "friends")
        .then((res) => {
          this.friends = res.data;
          this.fetched = true;
        });
    },
  },
  components: { FriendCard, IconGoBack },
};
</script>
