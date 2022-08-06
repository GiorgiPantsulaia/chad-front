<template>
  <main
    class="h-screen bg-[#1a1825] absolute top-0 left-0 w-screen lg:overflow-hidden overflow-auto"
    v-if="movie"
  >
    <nav-bar></nav-bar>
    <div
      class="flex pt-24 h-full overflow-auto w-full"
      :class="{ 'opacity-30 pointer-events-none': showConfirmation }"
    >
      <side-bar class="hidden lg:block"></side-bar>
      <section
        class="lg:w-9/12 w-full h-full flex flex-col md:ml-32 sm:mx-4 px-4 sm:px-0"
        v-if="!addQuote && editQuote === false && !editMovie"
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
                v-if="authStore.user_email === movie.author.email"
                class="w-36 bg-[#24222F] py-2 items-center rounded-lg flex justify-center sm:mr-24 mr-4 text-gray-600 font-light"
              >
                <button class="pr-4 mx-2" @click="editMovie = true">
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
            v-if="authStore.user_email === movie.author.email"
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
            @on-delete="removeQuote(quote.id)"
          />
        </div>
      </section>
      <div v-else-if="addQuote && !editQuote">
        <add-quote-to-movie
          @on-close="addQuote = false"
          :movie="movie"
          @on-post="handleQuotePost"
        />
      </div>
      <div v-else-if="editQuote">
        <edit-quote
          :quote="quoteToEdit"
          @on-close="editQuote = false"
          @on-edit="handleQuoteEdit"
        />
      </div>
      <div v-else>
        <edit-movie :movie="movie" @on-close="editMovie = false" />
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
import IconAddPlus from "@/components/icons/IconAddPlus.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import EditQuote from "@/components/modals/EditQuote.vue";
import EditMovie from "@/components/modals/EditMovie.vue";
import { onMounted, onBeforeMount, ref } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
export default {
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
    EditMovie,
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    onBeforeMount(() => {
      getMovie();
    });
    onMounted(() => {
      updateLikes();
      updateComments();
    });
    const back_url = ref(import.meta.env.VITE_BACKEND_BASE_URL);
    const authStore = useAuthStore();
    const router = useRouter();
    let editMovie = ref(false);
    let movie = ref(null);
    let showConfirmation = ref(false);
    let addQuote = ref(false);
    let editQuote = ref(false);
    let quoteToEdit = ref(null);
    function updateLikes() {
      window.Echo.channel("likes").listen("PostLiked", (data) => {
        for (let i = 0; i < movie.value.quotes.length; i++) {
          if (movie.value.quotes[i].id === data.quote.id) {
            movie.value.quotes[i].likes = data.quote.likes;
          }
        }
      });
    }
    function updateComments() {
      window.Echo.channel("comments").listen("PostCommented", (data) => {
        for (let i = 0; i < movie.value.quotes.length; i++) {
          if (movie.value.quotes[i].id === data.comment.quote_id) {
            movie.value.quotes[i].comments.push(data.comment);
          }
        }
      });
    }
    function handleMovieEdit() {
      editMovie.value = false;
      getMovie();
    }
    function handleQuotePost() {
      addQuote.value = false;
      getMovie();
    }
    function handleQuoteEdit() {
      editQuote.value = false;
      getMovie();
    }
    function removeQuote(id) {
      movie.value.quotes = movie.value.quotes.filter(
        (quote) => quote.id !== id
      );
    }
    async function getMovie() {
      try {
        const response = await axios.post("movie-description", {
          slug: props.slug,
        });
        movie.value = response.data;
      } catch (err) {
        router.go(-1);
      }
    }
    function showEdit(quote) {
      quoteToEdit.value = quote;
      editQuote.value = true;
    }
    function showView(quote) {
      router.push({
        name: "view-quote",
        params: { id: quote.id },
      });
    }
    function deleteMovie() {
      axios.post(`movie/${movie.value.id}`, { _method: "delete" }).then(() => {
        router.replace({ name: "movies-list" });
      });
    }
    return {
      handleQuoteEdit,
      handleMovieEdit,
      handleQuotePost,
      removeQuote,
      showEdit,
      showView,
      deleteMovie,
      authStore,
      back_url,
      editMovie,
      movie,
      showConfirmation,
      addQuote,
      editQuote,
      quoteToEdit,
    };
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
