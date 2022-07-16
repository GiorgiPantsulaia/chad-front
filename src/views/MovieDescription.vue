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
        class="lg:w-9/12 w-full h-full flex flex-col md:ml-32 mx-4"
        v-if="!addQuote && editQuote === false && viewQuote === false"
      >
        <div class="flex mb-4 justify-between">
          <p class="text-white text-xl">Movie Description</p>
        </div>
        <div class="flex">
          <img
            :src="back_url + movie.thumbnail"
            alt="movie poster"
            class="w-6/12 rounded-2xl"
          />
          <div class="flex flex-col ml-4 w-full">
            <div class="flex justify-between w-full">
              <p class="text-[#DDCCAA] text-xl font-bold">
                {{ movie.title["en"] }} ({{ movie.release_date }})
              </p>
              <div
                v-if="user_email === movie.author.email"
                class="w-36 bg-[#24222F] py-2 items-center rounded-lg flex justify-center mr-24 text-gray-600 font-light"
              >
                <button class="pr-4 mx-2">
                  <img src="@/icons/edit-pencil-icon.svg" alt="edit" />
                </button>
                <span class="cursor-default">|</span>
                <button
                  class="pl-4 mx-2"
                  type="button"
                  @click="showConfirmation = !showConfirmation"
                >
                  <delete-icon class="fill-white hover:fill-[#E31221]" />
                </button>
              </div>
            </div>
            <div class="flex" v-for="genre in movie.genres" :key="genre.title">
              <p
                class="px-2 py-1 bg-[#6C757D] font-black text-white rounded-md cursor-pointer"
              >
                {{ genre.title }}
              </p>
            </div>
            <p class="text-white mt-6 font-medium text-lg">
              Director : {{ movie.director["en"] }}
            </p>
            <p class="text-white mt-6 font-medium text-lg">
              Budget : {{ movie.income }}$
            </p>
            <p class="text-white mt-6 text-base leading-6 w-11/12">
              {{ movie.description["ka"] }}
            </p>
          </div>
        </div>
        <div class="flex text-white mt-8 items-center">
          <p class="text-xl">Quotes (total {{ movie.quotes.length }})</p>
          <p class="text-gray-600 mx-2 text-2xl">|</p>
          <button
            v-if="user_email === movie.author.email"
            type="button"
            class="text-white bg-[#E31221] h-9 flex items-center justify-center rounded-md w-32"
            @click="addQuote = !addQuote"
          >
            <img
              src="@/icons/add-plus-icon.svg"
              alt="new-quote"
              width="20"
              class="mr-2"
            />
            Add Quote
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
      <div v-else-if="addQuote && !editQuote && !viewQuote">
        <add-quote-to-movie @on-click="addQuote = false" :movie="movie" />
      </div>
      <transition name="edit" mode="out-in">
        <div v-if="editQuote">
          <edit-quote
            :quote="quoteToEdit"
            @on-click="editQuote = !editQuote"
          /></div
      ></transition>
      <transition name="view" mode="out-in">
        <div v-if="viewQuote">
          <view-quote
            :quote="quoteToView"
            @on-click="viewQuote = !viewQuote"
            @handle-click-edit="showEdit(quoteToView)"
          />
        </div>
      </transition>
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
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import EditQuote from "@/components/modals/EditQuote.vue";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import ViewQuote from "@/components/modals/ViewQuote.vue";
export default {
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
      viewQuote: false,
      quoteToEdit: null,
      quoteToView: null,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user_email"]),
  },
  methods: {
    getMovie() {
      axios
        .post("movie-description", { slug: this.$props.slug })
        .then((response) => {
          this.movie = response.data.data;
          console.log(this.movie);
        });
    },
    showEdit(quote) {
      this.quoteToEdit = quote;
      this.editQuote = true;
      this.viewQuote = false;
    },
    showView(quote) {
      this.quoteToView = quote;
      this.viewQuote = true;
    },
    deleteMovie() {
      axios
        .post("delete-movie", { _method: "delete", id: this.movie.id })
        .then((response) => {
          console.log(response);
          this.$router.replace("/movies");
        });
    },
  },
  beforeMount() {
    this.getMovie();
  },
  components: {
    NavBar,
    SideBar,
    QuoteCard,
    ConfirmDelete,
    AddQuoteToMovie,
    DeleteIcon,
    EditQuote,
    ViewQuote,
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
</style>
