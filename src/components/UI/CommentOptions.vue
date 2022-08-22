<template>
  <ul
    class="w-24 h-16 absolute top-10 bg-[#24222F] rounded-lg border border-[#11101A] text-center space-y-1"
  >
    <li
      class="rotate-45 w-10 h-10 opacity-100 absolute left-7 bg-[#24222F]"
    ></li>
    <li
      v-if="
        comment.author.id === parseInt(user_id) ||
        quote.author.id === parseInt(user_id)
      "
      class="mt-2 z-40 relative cursor-pointer"
      @click="this.$emit('onCommentDelete')"
    >
      Delete
    </li>
    <li class="z-40 relative cursor-pointer">Report</li>
  </ul>
</template>
<script>
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";

export default {
  emits: ["onCommentDelete"],
  props: {
    comment: {
      type: Object,
      required: true,
    },
    quote: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(useAuthStore, ["user_id"]),
  },
};
</script>
