<template>
  <div
    class="lg:w-7/12 mx-auto w-full flex flex-col h-fit text-white bg-[#11101A] rounded-lg mb-10 pb-6"
    :class="{ 'rounded-none': this.$route.name === 'view-quote' }"
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
          <icon-comment @click="showComments = !showComments" />
        </button>
      </div>
      <div class="flex mx-4 items-center">
        <p class="font-black pointer-events-none">
          {{ quote.likes.length }}
        </p>
        <button
          class="mx-2"
          :class="{ 'pointer-events-none': loading }"
          @click="likeOrUnlikePost(quote)"
        >
          <icon-heart :fill="postLiked ? '#FF3333' : '#fff'" alt="like" />
        </button>
      </div>
    </div>
    <div class="w-11/12 mx-auto" v-if="!showComments && quote.comments.length">
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
      <div class="w-11/12 mx-auto" v-if="showComments">
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
          id="comment"
          v-model="newComment"
          type="text"
          name="comment"
          :placeholder="$t('write_comment')"
          class="w-full bg-[#24222F] text-[#CED4DA] placeholder-[#CED4DA] pl-4 rounded-md h-10 outline-none"
        />
      </Form>
    </div>
  </div>
</template>
<script>
import { mapState } from "pinia";
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
      showComments: false,
      loading: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user_pfp", "user_email"]),
    postLiked() {
      let liked = false;
      if (this.$props.quote.likes) {
        for (let i = 0; i < this.$props.quote.likes.length; i++) {
          if (this.$props.quote.likes[i].email === this.user_email) {
            liked = true;
          }
        }
      }
      return liked;
    },
  },
  props: {
    quote: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addComment(quote_id) {
      document.getElementById("comment").blur();
      axios
        .post("comments", {
          quote_id: quote_id,
          body: this.newComment,
          recipient_id: this.$props.quote.author.id,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      this.newComment = null;
    },
    likeOrUnlikePost(quote) {
      if (!this.postLiked) {
        this.loading = true;
        axios.post(`like/${quote.id}`).then(() => {
          this.loading = false;
        });
      } else {
        this.loading = true;
        axios.post(`unlike/${quote.id}`).then(() => {
          this.loading = false;
        });
      }
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
