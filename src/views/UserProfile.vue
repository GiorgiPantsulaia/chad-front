<template>
  <profile-layout>
    <div
      class="w-full h-full max-h-[600px] mt-24 rounded-lg bg-[#11101A]"
      :class="{
        'overflow-y-auto flex flex-col items-center relative':
          tab === 'liked-posts',
      }"
    >
      <div class="flex flex-col items-center relative" v-if="!tab">
        <button
          class="flex fixed self-start text-white ml-4 mt-4 items-center gap-1"
          @click="this.$router.go(-1)"
        >
          <icon-go-back fill="white"></icon-go-back>
          <p class="text-base font-medium">{{ $t("back") }}</p>
        </button>
        <button
          class="flex fixed self-end text-white mr-4 mt-4 items-center gap-1"
          @click="addOrRemoveFriend"
          v-if="user"
        >
          <icon-add-friend
            v-if="
              !user.friend ||
              user.friend === 'pending' ||
              user.friend === 'incoming'
            "
          ></icon-add-friend>
          <icon-friends-with v-else></icon-friends-with>
          <p class="text-base font-medium">
            {{
              !user.friend
                ? $t("add_friend")
                : user.friend === "pending"
                ? $t("pending")
                : user.friend === "incoming"
                ? $t("accept")
                : $t("unfriend")
            }}
          </p>
        </button>
        <div class="flex flex-col items-center relative" v-if="user">
          <img
            :src="
              user.profile_pic
                ? back_url + user.profile_pic
                : '/default-pfp.png'
            "
            alt="profile picture"
            class="w-32 h-32 rounded-full absolute -top-16"
          />
          <h2 class="tracking-wider text-white font-bold text-2xl mt-16">
            {{ user.name }}
          </h2>
          <ul
            class="text-white mt-12 text-center gap-10 flex flex-col w-52 text-lg font-semibold pb-10"
          >
            <li
              class="border-b border-gray-700 pb-2 pl-3 tracking-widest cursor-pointer flex items-center gap-5"
            >
              <icon-profile-friends
                class="flex-shrink-0"
              ></icon-profile-friends>
              {{ $t("friends") }}
            </li>
            <li
              class="border-b border-gray-700 pb-2 pl-3 tracking-widest cursor-pointer flex items-center gap-5 whitespace-normal"
              :class="{ 'gap-2': $i18n.locale === 'ka' }"
              @click="
                this.$router.push({
                  name: 'profile-view',
                  query: { tab: 'liked-posts' },
                })
              "
            >
              <icon-heart fill="#fff" class="flex-shrink-0"></icon-heart>
              {{ $t("liked_posts") }}
            </li>
          </ul>
        </div>
      </div>
      <liked-posts
        v-if="tab === 'liked-posts' && user"
        class="mt-10"
        :userId="user.id"
      ></liked-posts>
      <user-friends v-if="tab === 'friends'"></user-friends>
    </div>
  </profile-layout>
</template>
<script>
import ProfileLayout from "@/components/layout/ProfileLayout.vue";
import axios from "@/config/axios/index.js";
import IconHeart from "@/components/icons/IconHeart.vue";
import IconGoBack from "@/components/icons/IconGoBack.vue";
import IconProfileFriends from "@/components/icons/IconProfileFriends.vue";
import IconAddFriend from "@/components/icons/IconAddFriend.vue";
import IconFriendsWith from "@/components/icons/IconFriendsWith.vue";
import LikedPosts from "../components/UI/LikedPosts.vue";
import UserFriends from "../components/UI/UserFriends.vue";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
      user: null,
    };
  },
  beforeMount() {
    this.getUser();
  },
  computed: {
    tab() {
      return this.$route.query.tab;
    },
  },
  methods: {
    getUser() {
      axios.get(`users/${this.id}`).then((res) => {
        console.log(res.data);
        this.user = res.data.user;
        this.user.friend = res.data.friend;
      });
    },
    addOrRemoveFriend() {
      if (this.user.friend === "incoming") {
        axios
          .post(`/friends/${this.id}/accept`)
          .then((this.user.friend = true));
      } else if (!this.user.friend) {
        axios.post(`/friends/${this.id}`).then((this.user.friend = "pending"));
      } else {
        axios
          .post(`/unfriend/${parseInt(this.id)}`)
          .then((this.user.friend = false));
      }
    },
  },
  components: {
    ProfileLayout,
    IconGoBack,
    IconHeart,
    IconProfileFriends,
    IconAddFriend,
    IconFriendsWith,
    LikedPosts,
    UserFriends,
  },
};
</script>
