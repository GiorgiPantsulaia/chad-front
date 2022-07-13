<template>
  <main class="flex bg-[#11101A] rounded-lg pb-4 my-4">
    <div class="flex flex-col w-full">
      <button
        class="items-center relative text-white font-black text-3xl self-end mr-6 tracking-wide"
        type="button"
        @click="showOptions = !showOptions"
      >
        ...
      </button>
      <div class="flex mx-4 mb-4 border-b border-gray-600 pb-5">
        <img
          :src="back_url + quote.thumbnail"
          alt=""
          class="w-44 h-28 rounded-md"
        />
        <p class="text-white italic font-light ml-6 self-center">
          "{{ quote.body["en"] }}"
        </p>
      </div>
      <div class="flex mx-4 text-white">
        <div class="flex">
          {{ quote.comments.length }}
          <img src="@/icons/comment-icon.svg" alt="comments" class="mx-2" />
        </div>
        <div class="flex mx-4">
          {{ quote.likes_number }}
          <img src="@/icons/heart-icon.svg" alt="likes" class="mx-2" />
        </div>
      </div>
    </div>
    <transition name="options" mode="out-in">
      <ul
        v-if="showOptions"
        class="relative w-48 bg-[#24222F] h-40 text-lg p-4 text-white rounded-lg"
      >
        <li class="flex my-3 cursor-pointer">
          <img src="@/icons/eye-icon.svg" alt="view post" class="mr-2" /> View
          Post
        </li>
        <li class="flex my-3 cursor-pointer">
          <img src="@/icons/edit-pencil-icon.svg" alt="edit" class="mr-2" />
          Edit
        </li>
        <li class="flex my-3 cursor-pointer" @click="deleteQuote(quote.id)">
          <img src="@/icons/delete-icon.svg" alt="delete" class="mr-2" /> Delete
        </li>
      </ul>
    </transition>
  </main>
</template>

<script>
import axios from "@/config/axios/index.js";
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
  emits: ["onClick"],
  methods: {
    deleteQuote(id) {
      axios
        .post("delete-quote", { _method: "delete", id: id })
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>
<style scoped>
.options-enter-active,
.options-leave-active {
  transition: opacity 0.2s ease;
}

.options-enter-from,
.options-leave-to {
  opacity: 0;
}
</style>
