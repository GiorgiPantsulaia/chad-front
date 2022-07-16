<template>
  <main class="flex bg-[#11101A] rounded-lg my-4 w-full">
    <div
      class="flex flex-col sm:w-full w-screen"
      :class="{ 'md:flex hidden': showOptions }"
    >
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
        <p
          class="text-white italic font-light ml-6 self-center sm:w-full break-words w-56"
        >
          "{{ quote.body["en"].slice(0, 60)
          }}{{ quote.body["en"].length > 60 ? "..." : "" }}"
        </p>
      </div>
      <div class="flex mx-4 text-white pb-4">
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
        class="relative md:w-48 w-full bg-[#24222F] sm:h-full sm:text-lg text-2xl p-4 text-white rounded-lg flex flex-col justify-evenly"
      >
        <li class="flex cursor-pointer" @click="this.$emit('handleView')">
          <img src="@/icons/eye-icon.svg" alt="view post" class="mr-2 w-6" />
          View Post
        </li>
        <li
          class="flex cursor-pointer"
          @click="this.$emit('handleEdit')"
          v-if="user_email === quote.author.email"
        >
          <img src="@/icons/edit-pencil-icon.svg" alt="edit" class="mr-2 w-6" />
          Edit
        </li>
        <li
          class="flex cursor-pointer"
          @click="deleteQuote(quote.id)"
          v-if="user_email === quote.author.email"
        >
          <img src="@/icons/delete-icon.svg" alt="delete" class="mr-2 w-6" />
          Delete
        </li>
        <li
          :class="{ 'sm:hidden flex': showOptions }"
          @click="showOptions = false"
        >
          <img
            src="@/icons/return-icon.svg"
            alt="go back"
            class="mr-2 w-6"
            width="20"
          />
          Quote
        </li>
      </ul>
    </transition>
  </main>
</template>

<script>
import axios from "@/config/axios/index.js";
import { mapState } from "pinia";
import { useAuthStore } from "../../stores/auth";
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
  emits: ["onClick", "handleEdit", "handleView"],
  computed: {
    ...mapState(useAuthStore, ["user_email"]),
  },
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
