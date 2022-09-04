<template>
  <div class="w-8/12 flex flex-col items-center">
    <h1 class="text-xl text-white font-black">{{ $t("liked_posts") }}</h1>
    <quote-card
      class="border border-gray-600 mt-10"
      v-for="quote in quotes"
      :key="quote.id"
      :quote="quote"
    ></quote-card>
  </div>
</template>
<script>
import QuoteCard from "@/components/UI/QuoteCard.vue";
import axios from "@/config/axios/index.js";
import { mapState } from "pinia";
import { useAuthStore } from "../../stores/auth";
export default {
  components: { QuoteCard },
  computed: {
    ...mapState(useAuthStore, ["user_id"]),
  },
  mounted() {
    this.getQuotes();
  },
  data() {
    return {
      quotes: null,
    };
  },
  methods: {
    getQuotes() {
      axios
        .get(`${parseInt(this.user_id)}/liked-posts`)
        .then((res) => (this.quotes = res.data));
    },
  },
};
</script>
