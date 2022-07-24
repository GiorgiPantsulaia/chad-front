<template>
  <main
    class="h-screen bg-[#1a1825] absolute top-0 left-0 w-screen lg:overflow-hidden overflow-auto"
  >
    <nav-bar />
    <div
      class="flex pt-24 h-full overflow-auto w-full"
      :class="{ 'opacity-30 pointer-events-none': showConfirmation }"
    >
      <side-bar></side-bar>
      <div class="sm:w-8/12 flex flex-col" v-if="!editQuote">
        <div
          class="flex justify-between sm:w-7/12 w-full mx-auto text-white font-bold text-lg items-center rounded-t bg-[#11101A] border-b border-[#EFEFEF] border-opacity-20"
        >
          <div
            class="flex justify-evenly items-center h-16 ml-4"
            v-if="quote.user_id == user_id"
          >
            <button type="button" class="mr-2" @click="editQuote = true">
              <icon-edit class="fill-white hover:fill-[#E31221] w-4" />
            </button>
            <p class="text-gray-600 pointer-events-none">|</p>
            <button
              type="button"
              @click="showConfirmation = !showConfirmation"
              class="ml-2"
            >
              <icon-delete class="fill-white hover:fill-[#E31221] w-4" />
            </button>
          </div>
          <h1 class="text-xl" :class="{ 'ml-80': quote.user_id != user_id }">
            {{ $t("view_quote") }}
          </h1>
          <button
            type="button"
            @click="this.$router.go(-1)"
            class="text-3xl text-white mr-4"
          >
            ✕
          </button>
        </div>
        <post-card :quote="quote" />
      </div>
      <edit-quote
        :quote="quote"
        v-if="editQuote"
        @on-click="editQuote = false"
      />
    </div>
    <confirm-delete
      v-if="showConfirmation"
      @handle-refuse="showConfirmation = false"
      @handle-accept="deleteQuote(quote.id)"
    />
  </main>
</template>
<script>
import axios from "@/config/axios/index.js";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import ConfirmDelete from "./ConfirmDelete.vue";
import PostCard from "./PostCard.vue";
import SideBar from "@/components/layout/SideBar.vue";
import NavBar from "@/components/layout/NavBar.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import EditQuote from "./EditQuote.vue";
export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    ConfirmDelete,
    PostCard,
    SideBar,
    NavBar,
    IconDelete,
    IconEdit,
    EditQuote,
  },
  emits: ["onClick", "handleClickEdit"],
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.updateLikes();
    this.updateComments();
  },
  beforeMount() {
    this.getQuote();
  },
  data() {
    return {
      showComments: false,
      quote: null,
      showConfirmation: false,
      editQuote: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user_email", "user_pfp", "user_id"]),
  },
  methods: {
    deleteQuote(id) {
      axios
        .post("delete-quote", { _method: "delete", id: id })
        .then((response) => {
          console.log(response);
          this.$router.replace("/movies");
        });
    },
    getQuote() {
      axios.post("get-quote", { id: this.id }).then((res) => {
        this.quote = res.data;
      });
    },
    updateComments() {
      window.Echo.channel("comments").listen("PostCommented", (data) => {
        if (this.quote.id === data.comment.quote_id) {
          this.quote.comments.push(data.comment);
        }
      });
    },
    updateLikes() {
      window.Echo.channel("likes").listen("PostLiked", (data) => {
        if (this.quote.id === data.quote.id) {
          this.quote.likes = data.quote.likes;
        }
      });
    },
  },
};
</script>
