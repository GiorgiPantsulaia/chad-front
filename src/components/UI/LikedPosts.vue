<template>
  <div class="sm:w-8/12 w-11/12 flex flex-col items-center relative">
    <button
      class="flex absolute self-start text-white mt-1 items-center gap-1"
      @click="this.$router.go(-1)"
      v-if="this.$route.name !== 'profile'"
    >
      <icon-go-back fill="white"></icon-go-back>
      <p class="text-base font-medium">{{ $t("back") }}</p>
    </button>
    <h1 class="text-xl text-white font-black">{{ $t("liked_posts") }}</h1>
    <div v-if="fetched && quotes" class="w-full">
      <quote-card
        class="border border-gray-600 mt-10"
        v-for="quote in quotes"
        :key="quote.id"
        :quote="quote"
        @handle-view="
          this.$router.push({ name: 'view-quote', params: { id: quote.id } })
        "
        @on-post-unlike="(id) => handlePostUnlike(id)"
      ></quote-card>
    </div>
    <p
      v-if="fetched && quotes.length < 1"
      class="py-24 text-white font-black text-lg"
    >
      {{ $t("no_posts_liked") }}
    </p>
  </div>
</template>
<script>
import QuoteCard from "@/components/UI/QuoteCard.vue";
import axios from "@/config/axios/index.js";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import IconGoBack from "../icons/IconGoBack.vue";
export default {
  components: { QuoteCard, IconGoBack },
  computed: {
    ...mapState(useAuthStore, ["user_id"]),
  },
  props: {
    userId: {
      type: Number,
      required: false,
    },
  },
  mounted() {
    this.getQuotes();
  },
  data() {
    return {
      quotes: null,
      fetched: false,
    };
  },
  methods: {
    getQuotes() {
      axios
        .get(
          `${this.userId ? this.userId : parseInt(this.user_id)}/liked-posts`
        )
        .then((res) => {
          this.quotes = res.data;
          this.fetched = true;
        });
    },
    handlePostUnlike(id) {
      if (!this.userId)
        setTimeout(() => {
          this.quotes = this.quotes.filter((quote) => quote.id !== id);
        }, 500);
    },
  },
};
</script>
