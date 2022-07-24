<template>
  <main
    class="h-screen bg-[#1a1825] absolute top-0 left-0 w-screen lg:overflow-hidden overflow-auto"
  >
    <nav-bar></nav-bar>
    <div
      class="flex pt-24 h-full overflow-auto w-full"
      :class="{ 'opacity-30 pointer-events-none': showConfirmation }"
    >
      <side-bar></side-bar>
      <section
        class="lg:w-9/12 w-full h-full flex flex-col md:ml-32 sm:mx-4 px-4 sm:px-0"
        v-if="!addQuote && editQuote === false"
      >
        <div class="hidden sm:flex mb-4 justify-between">
          <p class="text-white text-xl">{{ $t("movie_description") }}</p>
        </div>
        <div class="sm:flex mt-6 sm:mt-0">
          <img
            :src="back_url + movie.thumbnail"
            alt="movie poster"
            class="sm:w-6/12 rounded-2xl aspect-[4/3]"
          />
          <div class="flex flex-col sm:ml-4 w-full">
            <div class="flex justify-between w-full mt-4">
              <p class="text-[#DDCCAA] text-xl font-bold">
                {{ movie.title[$i18n.locale] }} ({{ movie.release_date }})
              </p>
              <div
                v-if="user_email === movie.author.email"
                class="w-36 bg-[#24222F] py-2 items-center rounded-lg flex justify-center sm:mr-24 mr-4 text-gray-600 font-light"
              >
                <button class="pr-4 mx-2">
                  <icon-edit />
                </button>
                <span class="cursor-default">|</span>
                <button
                  class="pl-4 mx-2"
                  type="button"
                  @click="showConfirmation = !showConfirmation"
                >
                  <icon-delete class="fill-white hover:fill-[#E31221]" />
                </button>
              </div>
            </div>
            <div class="flex">
              <p
                v-for="genre in movie.genres"
                :key="genre.title"
                class="px-2 m-0.5 py-1 bg-[#6C757D] font-black text-white rounded-md cursor-pointer"
              >
                {{ genre.title[$i18n.locale] }}
              </p>
            </div>
            <p class="text-white mt-6 font-medium text-lg">
              {{ $t("director") }} : {{ movie.director[$i18n.locale] }}
            </p>
            <p class="text-white mt-6 font-medium text-lg">
              {{ $t("budget") }} : {{ movie.income }}$
            </p>
            <p class="text-white mt-6 text-base leading-6 w-11/12">
              {{ movie.description[$i18n.locale] }}
            </p>
          </div>
        </div>
        <div class="flex text-white mt-8 items-center">
          <p class="text-xl">{{ $t("quotes") }} {{ movie.quotes.length }})</p>
          <p class="text-gray-600 mx-2 text-2xl cursor-default">|</p>
          <button
            v-if="user_email === movie.author.email"
            type="button"
            class="text-white bg-[#E31221] h-9 flex items-center justify-center rounded-md w-36 py-6 px-2"
            @click="addQuote = !addQuote"
          >
            <icon-add-plus class="mr-2" />
            {{ $t("add_quote") }}
          </button>
        </div>
        <div class="flex flex-col md:w-6/12 mt-2 w-full">
          <quote-card
            v-for="quote in movie.quotes"
            :key="quote.id"
            :quote="quote"
            @handle-edit="showEdit(quote)"
            @handle-view="showView(quote)"
          />
        </div>
      </section>
      <div v-else-if="addQuote && !editQuote">
        <add-quote-to-movie @on-click="addQuote = false" :movie="movie" />
      </div>
      <div v-else>
        <edit-quote :quote="quoteToEdit" @on-click="editQuote = false" />
      </div>
    </div>
    <confirm-delete
      v-if="showConfirmation"
      @handle-refuse="showConfirmation = !showConfirmation"
      @handle-accept="deleteMovie"
    ></confirm-delete>
  </main>
</template>
<script>
import axios from "@/config/axios/index.js";
import NavBar from "@/components/layout/NavBar.vue";
import SideBar from "@/components/layout/SideBar.vue";
import QuoteCard from "@/components/UI/QuoteCard.vue";
import ConfirmDelete from "@/components/modals/ConfirmDelete.vue";
import AddQuoteToMovie from "@/components/modals/AddQuoteToMovie.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import IconAddPlus from "@/components/icons/IconAddPlus.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import EditQuote from "../components/modals/EditQuote.vue";
export default {
  beforeMount() {
    this.getMovie();
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
      movie: null,
      showConfirmation: false,
      addQuote: false,
      editQuote: false,
      quoteToEdit: null,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user_email"]),
  },
  mounted() {
    this.updateLikes();
    this.updateComments();
  },
  methods: {
    updateLikes() {
      window.Echo.channel("likes").listen("PostLiked", (data) => {
        for (let i = 0; i < this.movie.quotes.length; i++) {
          if (this.movie.quotes[i].id === data.quote.id) {
            this.movie.quotes[i].likes = data.quote.likes;
          }
        }
      });
    },
    updateComments() {
      window.Echo.channel("comments").listen("PostCommented", (data) => {
        for (let i = 0; i < this.movie.quotes.length; i++) {
          if (this.movie.quotes[i].id === data.comment.quote_id) {
            this.movie.quotes[i].comments.push(data.comment);
          }
        }
      });
    },
    getMovie() {
      axios
        .post("movie-description", { slug: this.$props.slug })
        .then((response) => {
          this.movie = response.data.data;
        });
    },
    showEdit(quote) {
      this.quoteToEdit = quote;
      this.editQuote = true;
    },
    showView(quote) {
      this.$router.push("/view-quote/" + quote.id);
    },
    deleteMovie() {
      axios
        .post("delete-movie", { _method: "delete", id: this.movie.id })
        .then(() => {
          this.$router.replace("/movies");
        });
    },
  },

  components: {
    NavBar,
    SideBar,
    QuoteCard,
    ConfirmDelete,
    AddQuoteToMovie,
    IconDelete,
    IconAddPlus,
    IconEdit,
    EditQuote,
  },
};
</script>
<style scoped>
.edit-enter-active,
.edit-leave-active,
.view-enter-active,
.view-leave-active {
  transition: opacity 0.2s ease;
}

.edit-enter-from,
.view-enter-from,
.edit-leave-to,
.view-leave-to {
  opacity: 0;
}
div {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
div::-webkit-scrollbar {
  display: none;
}
</style>
