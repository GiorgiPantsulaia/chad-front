<template>
  <div
    class="lg:w-7/12 mx-auto w-full flex flex-col h-fit text-white bg-[#11101A] rounded-lg mb-10 pb-6"
  >
    <div class="flex items-center w-11/12 mx-auto mt-6">
      <img
        :src="
          quote.author.profile_pic
            ? back_url + quote.author.profile_pic
            : '/default-pfp.png'
        "
        alt="quote author"
        class="w-12 h-12 rounded-full"
      />
      <p class="mx-4 text-base">{{ quote.author.name }}</p>
    </div>
    <p class="text-base w-11/12 mx-auto py-6 break-words">
      "{{ quote.body[$i18n.locale] }}" {{ $t("movie") }} -
      <button
        type="button"
        class="text-[#DDCCAA] underline"
        @click="this.$router.push('/movies/' + quote.movie.slug)"
      >
        {{ quote.movie.title[$i18n.locale] }} ({{ quote.movie.release_date }})
      </button>
    </p>
    <img
      :src="back_url + quote.thumbnail"
      alt="quote-poster"
      class="w-11/12 mx-auto rounded-lg md:h-full h-2/5 aspect-[4/3]"
    />
    <div class="w-11/12 mx-auto flex mt-6 border-b border-gray-700 pb-6">
      <div class="flex items-center">
        <p class="font-black pointer-events-none">
          {{ quote.comments.length }}
        </p>
        <button class="mx-2">
          <icon-comment />
        </button>
      </div>
      <div class="flex mx-4 items-center">
        <p class="font-black pointer-events-none">
          {{ quote.likes_number }}
        </p>
        <button
          class="mx-2"
          :class="{ 'pointer-events-none': loading }"
          @click="likeOrUnlikePost(quote)"
        >
          <icon-heart :fill="postLiked ? '#F3426C' : '#fff'" alt="like" />
        </button>
      </div>
    </div>
    <div class="w-11/12 mx-auto" v-if="!quote.isShown && quote.comments.length">
      <div class="mt-4 flex pb-4">
        <img
          :src="
            quote.comments[0].author.profile_pic
              ? back_url + quote.comments[0].author.profile_pic
              : '/default-pfp.png'
          "
          alt="user profile picture"
          class="rounded-full w-12 h-12"
        />
        <div
          class="flex flex-col mx-4 mt-2 w-10/12 md:w-11/12 break-words border-b border-gray-700"
        >
          <h2 class="font-black">
            {{ quote.comments.length > 0 ? quote.comments[0].author.name : "" }}
          </h2>
          <p class="py-4 w-full">
            {{ quote.comments.length > 0 ? quote.comments[0].body : "" }}
          </p>
        </div>
      </div>
    </div>
    <transition name="comments" mode="out-in">
      <div class="w-11/12 mx-auto" v-if="quote.isShown">
        <div
          v-for="comment in quote.comments"
          :key="comment.id"
          class="mt-1 flex pb-4"
        >
          <img
            :src="
              comment.author.profile_pic
                ? back_url + comment.author.profile_pic
                : '/default-pfp.png'
            "
            alt="user profile picture"
            class="rounded-full w-10 h-10"
          />
          <div
            class="flex flex-col mx-4 mt-2 border-b border-gray-700 w-10/12 md:w-11/12 break-words"
          >
            <h2 class="font-black">{{ comment.author.name }}</h2>
            <p class="py-4 w-full">{{ comment.body }}</p>
          </div>
        </div>
      </div>
    </transition>
    <div class="flex w-11/12 mx-auto items-center mt-4">
      <img
        :src="user_pfp ? back_url + user_pfp : '/default-pfp.png'"
        alt=""
        class="w-12 h-12 rounded-full"
      />
      <Form @submit="addComment(quote.id)" class="w-full ml-6"
        ><Field
          v-model="newComment"
          type="text"
          name="comment"
          :placeholder="$t('write_comment')"
          class="w-full bg-[#24222F] text-[#CED4DA] placeholder-[#CED4DA] pl-4 rounded-md h-10 outline-none"
        />
      </Form>
    </div>
    <button
      v-if="quote.comments.length > 1"
      class="text-[#DDCCAA] mt-8"
      @click="toggleShow"
    >
      {{ quote.isShown && quote.comments.length > 1 ? "Hide" : "Show" }}
      all comments
    </button>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import axios from "@/config/axios/index.js";
import { Form, Field } from "vee-validate";
import IconHeart from "@/components/icons/IconHeart.vue";
import IconComment from "@/components/icons/IconComment.vue";

export default {
  components: {
    Field,
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    IconHeart,
    IconComment,
  },
  data() {
    return {
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
      newComment: "",
      loading: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user_pfp", "liked_posts"]),
    postLiked() {
      let liked = false;
      for (let i = 0; i < this.liked_posts.length; i++) {
        if (this.liked_posts[i].id === this.$props.quote.id) {
          liked = true;
        }
      }
      return liked;
    },
    hasLikedPost() {
      let hasLikedPost = false;
      for (let i = 0; i < this.liked_posts.length; i++) {
        if (this.liked_posts[i].id === this.$props.quote.id) {
          hasLikedPost = true;
        }
      }
      return hasLikedPost;
    },
  },
  props: {
    quote: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(useAuthStore, ["updateLikedPosts"]),
    addComment(quote_id) {
      axios
        .post("add-comment", {
          quote_id: quote_id,
          body: this.newComment,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    likeOrUnlikePost(quote) {
      if (!this.hasLikedPost) {
        this.loading = true;
        axios.post("like-post", { id: quote.id }).then((response) => {
          if (response.status === 200) {
            this.updateLikedPosts({ quote: quote });
            this.loading = false;
          }
        });
      } else {
        this.loading = true;
        axios.post("unlike-post", { id: quote.id }).then((response) => {
          if (response.status === 200) {
            this.updateLikedPosts({ id: quote.id });
            this.loading = false;
          }
        });
      }
    },
    toggleShow() {
      this.$props.quote.isShown = !this.$props.quote.isShown;
    },
  },
};
</script>
<style scoped>
.comments-enter-active,
.comments-leave-active {
  transition: opacity 0.2s ease;
}

.comments-enter-from,
.comments-leave-to {
  opacity: 0;
}
</style>
