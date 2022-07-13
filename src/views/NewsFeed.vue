<template>
  <main
    class="h-screen bg-[#1a1825] absolute top-0 left-0 w-screen overflow-hidden"
  >
    <nav-bar></nav-bar>
    <div class="flex pt-24 h-full overflow-auto w-full" id="infinite-list">
      <side-bar
        id="sidebar"
        :class="{ 'opacity-30 pointer-events-none': addNewQuote }"
      ></side-bar>
      <transition name="newQuote" mode="out-in">
        <new-quote
          v-if="addNewQuote"
          :username="username"
          @onClick="addNewQuote = false"
        >
        </new-quote>
      </transition>
      <section
        class="lg:w-9/12 w-full h-full"
        :class="{ 'opacity-30 pointer-events-none': addNewQuote }"
      >
        <div class="flex mb-4">
          <button
            type="button"
            class="text-white lg:ml-[21%] bg-[#24222F] h-12 flex items-center justify-center px-4 rounded-lg"
            @click="addNewQuote = !addNewQuote"
          >
            <img
              src="@/icons/write-icon.svg"
              alt="new-quote"
              width="25"
              class="mr-3"
            />
            Write a new quote
          </button>
          <form
            class="2xl:w-[40%] xl:w-[33%] lg:w-[27%] hidden mx-5 border-b border-gray-600 items-center md:flex text-white"
          >
            <button><img src="@/icons/search-icon.svg" alt="search" /></button>
            <input
              type="search"
              class="bg-inherit h-12 ml-4 w-full outline-none"
              placeholder="Enter @ to search movies, Enter # to search quotes"
            />
          </form>
        </div>
        <div
          class="lg:w-7/12 w-full mx-auto flex flex-col h-fit text-white bg-[#11101A] rounded-lg mb-10 pb-6"
          v-for="(quote, index) in quotes"
          :key="quote.slug"
        >
          <div class="flex items-center w-11/12 mx-auto mt-6">
            <img
              src="@/icons/interstellar.png"
              alt="quote author"
              class="w-12 h-12 rounded-full"
            />
            <p class="mx-4 text-base">{{ quote.author.name }}</p>
          </div>
          <p class="text-base w-11/12 mx-auto py-6">
            "{{ quote.body["en"] }}" movie -
            <button type="button" class="text-[#DDCCAA] underline">
              {{ quote.movie.title["en"] }} ({{ quote.movie.release_date }})
            </button>
          </p>
          <img
            :src="back_url + quote.thumbnail"
            alt="quote-poster"
            class="w-11/12 mx-auto rounded-lg md:h-full h-2/5"
          />
          <div class="w-11/12 mx-auto flex mt-6 border-b border-gray-700 pb-6">
            <div class="flex items-center">
              <p class="font-black pointer-events-none">
                {{ quote.comments.length }}
              </p>
              <button class="mx-2">
                <img src="@/icons/comment-icon.svg" alt="comment" />
              </button>
            </div>
            <div class="flex mx-4 items-center">
              <p class="font-black pointer-events-none">
                {{ quote.likes_number }}
              </p>
              <button
                class="mx-2"
                :class="{ 'pointer-events-none': loading }"
                @click="likePost(quote.id)"
              >
                <img src="@/icons/heart-icon.svg" alt="like" />
              </button>
            </div>
          </div>
          <div
            class="w-11/12 mx-auto"
            v-if="!quote.isShown && quote.comments.length"
          >
            <div class="mt-4 flex pb-4">
              <img
                src="@/icons/interstellar.png"
                alt="user profile picture"
                class="rounded-full w-12 h-12"
              />
              <div
                class="flex flex-col mx-4 mt-2 w-10/12 md:w-11/12 break-words border-b border-gray-700"
              >
                <h2 class="font-black">
                  {{
                    quote.comments.length > 0
                      ? quote.comments[0].author.name
                      : ""
                  }}
                </h2>
                <p class="py-4 w-full">
                  {{ quote.comments.length > 0 ? quote.comments[0].body : "" }}
                </p>
              </div>
            </div>
          </div>
          <transition name="comments" mode="out-in">
            <div class="w-11/12 mx-auto" v-if="quote.isShown">
              <div
                v-for="comment in quote.comments"
                :key="comment.id"
                class="mt-1 flex pb-4"
              >
                <img
                  src="@/icons/interstellar.png"
                  alt="user profile picture"
                  class="rounded-full w-10 h-10"
                />
                <div
                  class="flex flex-col mx-4 mt-2 border-b border-gray-700 w-10/12 md:w-11/12 break-words"
                >
                  <h2 class="font-black">{{ comment.author.name }}</h2>
                  <p class="py-4 w-full">{{ comment.body }}</p>
                </div>
              </div>
            </div>
          </transition>
          <div class="flex w-11/12 mx-auto items-center mt-4">
            <img
              src="@/icons/interstellar.png"
              alt=""
              class="w-12 h-12 rounded-full"
            />
            <Form @submit="addComment(quote.id)" class="w-full ml-6"
              ><Field
                v-model="newComment"
                type="text"
                name="comment"
                placeholder="Write a comment"
                class="w-full bg-[#24222F] text-[#CED4DA] placeholder-[#CED4DA] pl-4 rounded-md h-10 outline-none"
              />
            </Form>
          </div>
          <button
            v-if="quote.comments.length > 1"
            class="text-[#DDCCAA] mt-8"
            @click="toggleShow(index)"
          >
            {{ quote.isShown && quote.comments.length > 1 ? "Hide" : "Show" }}
            all comments
          </button>
        </div>
      </section>
    </div>
  </main>
</template>
<script>
import NavBar from "@/components/layout/NavBar.vue";
import SideBar from "@/components/layout/SideBar.vue";
import axios from "@/config/axios/index.js";
import { Form, Field } from "vee-validate";
import NewQuote from "@/components/modals/NewQuote.vue";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { NavBar, SideBar, Form, Field, NewQuote },
  data() {
    return {
      quotes: [],
      page: 0,
      lastPage: false,
      loading: false,
      newComment: "",
      addNewQuote: false,
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
    };
  },
  mounted() {
    const scrollDiv = document.getElementById("infinite-list");
    scrollDiv.addEventListener("scroll", () => {
      if (
        scrollDiv.offsetHeight + scrollDiv.scrollTop >=
        scrollDiv.scrollHeight
      ) {
        this.addQuotes();
      }
    });
  },
  computed: {
    ...mapState(useAuthStore, ["username"]),
  },
  methods: {
    addComment(quote_id) {
      axios
        .post("add-comment", {
          quote_id: quote_id,
          body: this.newComment,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    likePost(id) {
      // WIP : user still can like post twice if they refresh the page
      this.loading = true;
      axios.post("like-post", { id: id }).then((response) => {
        if (response.status === 200) {
          this.loading = false;
        }
      });
    },
    toggleShow(index) {
      this.quotes[index].isShown = !this.quotes[index].isShown;
    },
    getInitialQuotes() {
      axios
        .get("all-quotes")
        .then((response) => {
          this.quotes = response.data.data.data;
          this.page++;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addQuotes() {
      if (!this.lastPage) {
        axios
          .get(`all-quotes?page=${this.page}`)
          .then((response) => {
            this.quotes.push.apply(this.quotes, response.data.data.data);
            this.page++;
            // prevent from requesting after last page reached
            response.data.data.current_page === response.data.data.last_page
              ? (this.lastPage = true)
              : false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  beforeMount() {
    this.getInitialQuotes();
  },
};
</script>
<style scoped>
#infinite-list {
  scroll-behavior: smooth;
}
.comments-enter-active,
.comments-leave-active {
  transition: opacity 0.2s ease;
}

.comments-enter-from,
.comments-leave-to {
  opacity: 0;
}
.newQuote-enter-active,
.newQuote-leave-active {
  transition: opacity 0.2s ease;
}

.newQuote-enter-from,
.newQuote-leave-to {
  opacity: 0;
}
</style>
