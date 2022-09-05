<template>
  <main class="flex bg-[#11101A] rounded-lg my-4 w-full relative">
    <div
      class="flex flex-col w-full"
      :class="{
        'md:flex hidden': showOptions,
      }"
    >
      <div
        class="flex mx-4 mb-4 border-b border-gray-600 pb-5"
        :class="{ 'cursor-pointer': this.$route.query.tab === 'liked-posts' }"
        @click="viewLikedPost"
      >
        <img
          :src="back_url + quote.thumbnail"
          alt="quote-poster"
          class="w-44 h-32 rounded-md pt-3"
        />
        <p
          class="text-white italic font-light ml-6 self-center lg:w-6/12 break-words w-3/12 mt-3"
        >
          "{{ quote.body[$i18n.locale].slice(0, 50)
          }}{{ quote.body[$i18n.locale].length > 60 ? "..." : "" }}"
        </p>
      </div>
      <div class="flex mx-4 text-white pb-4">
        <div class="flex">
          {{ quote.comments.length }}
          <icon-comment class="mx-2" />
        </div>
        <div class="flex mx-4">
          {{ quote.likes.length }}
          <icon-heart
            class="mx-2"
            :class="{
              'cursor-pointer': this.$route.query.tab === 'liked-posts',
            }"
            :fill="this.$route.query.tab === 'liked-posts' ? 'red' : '#fff'"
            @click="unlikePost"
          />
        </div>
      </div>
    </div>
    <transition name="options" mode="in-out">
      <ul
        v-if="showOptions"
        class="relative md:w-48 w-full bg-[#24222F] h-48 sm:text-lg text-2xl p-4 text-white rounded-lg flex flex-col justify-evenly"
      >
        <li
          class="flex cursor-pointer items-center w-8/12 md:w-auto"
          @click="this.$emit('handleView')"
        >
          <icon-eye class="mr-2 w-6" />
          View Post
        </li>
        <li
          class="flex cursor-pointer items-center w-8/12 md:w-auto"
          @click="this.$emit('handleEdit')"
          v-if="user_email === quote.author.email"
        >
          <icon-edit class="mr-2 w-6" />
          Edit
        </li>
        <li
          class="flex cursor-pointer items-center w-8/12 md:w-auto"
          @click="deleteQuote(quote.id)"
          v-if="user_email === quote.author.email"
        >
          <icon-delete class="mr-2 w-6 fill-white" />
          Delete
        </li>
        <li
          :class="{ 'sm:hidden flex w-8/12 md:w-auto': showOptions }"
          @click="showOptions = false"
        >
          <icon-return width="20" />
          Quote
        </li>
      </ul>
    </transition>
    <button
      v-if="this.$route.name === 'movie-view'"
      class="text-white font-black text-3xl tracking-wide absolute right-4 transition-all"
      :class="{ 'font-medium right-5': showOptions }"
      type="button"
      @click="showOptions = !showOptions"
    >
      {{ showOptions ? "⨉" : "..." }}
    </button>
  </main>
</template>

<script>
import axios from "@/config/axios/index.js";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import IconComment from "@/components/icons/IconComment.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconEye from "@/components/icons/IconEye.vue";
import IconReturn from "@/components/icons/IconReturn.vue";
import IconHeart from "@/components/icons/IconHeart.vue";
export default {
  data() {
    return {
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
      showOptions: false,
    };
  },
  props: {
    quote: {
      type: Object,
      required: true,
    },
  },
  emits: ["onClick", "handleEdit", "handleView", "onDelete", "onPostUnlike"],
  computed: {
    ...mapState(useAuthStore, ["user_email"]),
  },
  methods: {
    deleteQuote(id) {
      axios.delete(`quote/${id}`).then(() => {
        this.$emit("onDelete");
      });
    },
    viewLikedPost(id) {
      if (this.$route.query.tab === "liked-posts") {
        this.$router.push({
          name: "view-quote",
          params: { id: this.quote.id },
        });
      }
    },
    unlikePost() {
      axios
        .post(`unlike/${this.quote.id}`)
        .then(this.$emit("onPostUnlike", this.quote.id));
    },
  },
  components: {
    IconComment,
    IconDelete,
    IconEdit,
    IconEye,
    IconReturn,
    IconHeart,
  },
};
</script>
<style scoped>
.options-enter-active,
.options-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.options-enter-from,
.options-leave-to {
  opacity: 0;
}
</style>
