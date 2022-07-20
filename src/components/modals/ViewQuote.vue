<template>
  <div class="w-full">
    <div
      class="2xl:w-[700px] xl:w-[500px] lg:w-[400px] w-full xl:ml-80 lg:ml-40 flex flex-col h-fit text-white bg-[#11101A] rounded-lg mb-10 pb-6 mt-10 md:mt-0"
      :class="{ 'opacity-30 pointer-events-none': showConfirmation }"
    >
      <div
        class="flex justify-between items-center mt-4 px-6 border-b-2 border-[#1a1825] pb-6"
      >
        <div
          class="flex justify-between w-16"
          v-if="quote.author.email === user_email"
        >
          <button class="" @click="this.$emit('handleClickEdit')">
            <icon-edit class="w-4" />
          </button>
          <span class="cursor-default text-gray-600">|</span>
          <button
            class=""
            type="button"
            @click="showConfirmation = !showConfirmation"
          >
            <icon-delete class="fill-white hover:fill-[#E31221] w-4" />
          </button>
        </div>
        <p class="font-medium text-xl md:mr-6">View Quote</p>
        <button
          type="button"
          @click="this.$emit('onClick')"
          class="text-3xl text-white"
        >
          ✕
        </button>
      </div>
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
      <p class="text-base w-11/12 mx-auto py-6">
        "{{ quote.body["en"] }}" movie -
        <button type="button" class="text-[#DDCCAA] underline">
          {{ quote.movie.title["en"] }} ({{ quote.movie.release_date }})
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
          <button class="mx-2" @click="likePost">
            <icon-heart />
          </button>
        </div>
      </div>
      <div
        class="w-11/12 mx-auto"
        v-if="!quote.isShown && quote.comments.length"
      >
        <div class="mt-4 flex pb-4">
          <img
            src="@/icons/interstellar.png"
            alt="user profile picture"
            class="rounded-full w-12 h-12"
          />
          <div
            class="flex flex-col mx-4 mt-2 w-10/12 md:w-11/12 break-words border-b border-gray-700"
          >
            <h2 class="font-black">
              {{
                quote.comments.length > 0 ? quote.comments[0].author.name : ""
              }}
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
              src="@/icons/interstellar.png"
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
          src="@/icons/interstellar.png"
          alt=""
          class="w-12 h-12 rounded-full"
        />
        <Form @submit="addComment()" class="w-full ml-6"
          ><Field
            v-model="newComment"
            type="text"
            name="comment"
            placeholder="Write a comment"
            class="w-full bg-[#24222F] text-[#CED4DA] placeholder-[#CED4DA] pl-4 rounded-md h-10 outline-none"
          />
        </Form>
      </div>
      <button
        v-if="quote.comments.length > 1"
        class="text-[#DDCCAA] mt-8"
        @click="showComments = !showComments"
      >
        {{ quote.isShown && quote.comments.length > 1 ? "Hide" : "Show" }}
        all comments
      </button>
    </div>
    <confirm-delete
      v-if="showConfirmation"
      @handle-refuse="showConfirmation = false"
      @handle-accept="deleteQuote"
    />
  </div>
</template>
<script>
import axios from "@/config/axios/index.js";
import { mapState } from "pinia";
import { Form, Field } from "vee-validate";
import { useAuthStore } from "@/stores/auth.js";
import IconDelete from "@/components/icons/IconDelete.vue";
import ConfirmDelete from "./ConfirmDelete.vue";
import IconComment from "@/components/icons/IconComment.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconHeart from "../icons/IconHeart.vue";
export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    Field,
    IconDelete,
    ConfirmDelete,
    IconComment,
    IconEdit,
    IconHeart,
  },
  emits: ["onClick", "handleClickEdit"],
  props: {
    quote: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
      showComments: false,
      showConfirmation: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user_email"]),
  },
  methods: {
    addComment() {
      axios
        .post("add-comment", {
          quote_id: this.$props.quote.id,
          body: this.newComment,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    likePost() {
      this.loading = true;
      axios.post("like-post", { id: this.$props.quote.id }).then((response) => {
        if (response.status === 200) {
          this.loading = false;
        }
      });
    },
    deleteQuote() {
      axios
        .post("delete-quote", { _method: "delete", id: this.$props.quote.id })
        .then((response) => {
          console.log(response);
          location.reload();
        });
    },
  },
};
</script>
