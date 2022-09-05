<template>
  <main
    class="h-screen bg-[#1a1825] absolute top-0 left-0 w-screen overflow-auto"
  >
    <nav-bar />
    <div
      class="flex pt-24 h-full overflow-auto w-full"
      :class="{ 'opacity-30 pointer-events-none': showConfirmation }"
    >
      <side-bar class="hidden md:block"></side-bar>
      <div class="sm:w-8/12 w-full flex flex-col" v-if="!editQuote">
        <div
          v-if="quote"
          class="flex justify-between sm:w-7/12 py-2 w-full mx-auto text-white font-bold text-lg items-center rounded-t bg-[#11101A] border-b border-[#EFEFEF] border-opacity-20"
        >
          <div
            class="flex justify-evenly items-center h-16 ml-4"
            v-if="quote.user_id === parseInt(user_id)"
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
          <h1 class="text-xl px-4">
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
        @on-close="editQuote = false"
        @on-edit="handleEdit"
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
import ConfirmDelete from "@/components/modals/ConfirmDelete.vue";
import PostCard from "@/components/modals/PostCard.vue";
import SideBar from "@/components/layout/SideBar.vue";
import NavBar from "@/components/layout/NavBar.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import EditQuote from "@/components/modals/EditQuote.vue";
export default {
  components: {
    ConfirmDelete,
    PostCard,
    SideBar,
    NavBar,
    IconDelete,
    IconEdit,
    EditQuote,
  },
  emits: ["handleClickEdit"],
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.updateLikes();
    this.updateComments();
    this.updateDeletedComments();
    this.$watch(
      () => this.$route.params,
      (toParams) => {
        if (toParams.id) this.getQuote();
      }
    );
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
    ...mapState(useAuthStore, ["user_email", "avatar", "user_id"]),
  },
  methods: {
    handleEdit() {
      this.editQuote = false;
      this.getQuote();
    },
    deleteQuote(id) {
      axios.delete(`quote/${id}`).then(() => {
        this.$router.replace({ name: "movies-list" });
      });
    },
    getQuote() {
      axios
        .get(`quotes/${this.$props.id}`)
        .then((res) => {
          this.quote = res.data;
        })
        .catch((err) => {
          if (err.response.status === 404) {
            this.$router.go(-1);
          }
        });
    },
    updateComments() {
      window.Echo.channel("comments").listen("PostCommented", (data) => {
        if (this.quote.id === data.comment.quote_id) {
          this.quote.comments.push(data.comment);
        }
      });
    },
    updateDeletedComments() {
      window.Echo.channel("comments").listen("CommentDeleted", (data) => {
        this.quote.comments = this.quote.comments.filter(
          (comment) => comment.id !== data.comment.id
        );
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
