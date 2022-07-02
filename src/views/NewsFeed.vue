<template>
  <div
    class="h-screen bg-[#1a1825] absolute top-0 left-0 w-screen overflow-hidden"
  >
    <nav-bar></nav-bar>
    <div class="flex pt-24 h-full overflow-auto w-full" id="infinite-list">
      <side-bar id="sidebar"></side-bar>
      <div class="lg:w-9/12 w-full h-full">
        <div
          class="lg:w-7/12 w-full mx-auto flex flex-col h-5/6 text-white bg-[#11101A] rounded-lg mb-10 pb-10"
          v-for="quote in quotes"
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
            "{{ quote.body }}" movie -
            <span class="text-[#DDCCAA]"
              >{{ quote.movie.title }} ({{
                quote.movie.release_date.substring(0, 4)
              }})
            </span>
          </p>
          <img
            src="@/icons/interstellar.png"
            alt="quote-poster"
            class="w-11/12 mx-auto rounded-lg md:h-full h-2/5"
          />
          <div class="w-11/12 mx-auto flex mt-6 border-b border-gray-600 pb-6">
            <div class="flex items-center">
              <p class="font-black">{{ quote.comments_number }}</p>
              <button class="mx-2">
                <img src="@/icons/comment-icon.svg" alt="comment" />
              </button>
            </div>
            <div class="flex mx-4 items-center">
              <p class="font-black">{{ quote.likes_number }}</p>
              <button class="mx-2">
                <img src="@/icons/heart-icon.svg" alt="like" />
              </button>
            </div>
          </div>
          <div class="w-11/12 mx-auto">Comments Section</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/layout/NavBar.vue";
import SideBar from "@/components/layout/SideBar.vue";
import axios from "@/config/axios/index.js";
export default {
  components: { NavBar, SideBar },

  data() {
    return {
      quotes: [],
      page: 0,
    };
  },
  mounted() {
    const myDiv = document.getElementById("infinite-list");
    myDiv.addEventListener("scroll", () => {
      if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight) {
        this.addQuotes();
      }
    });
  },
  methods: {
    getInitialQuotes() {
      axios.get("all-quotes").then((response) => {
        console.log(response);
        console.log(response.data.data);
        this.quotes = response.data.data;
        this.page++;
      });
    },
    addQuotes() {
      axios.get(`all-quotes?page=${this.page}`).then((response) => {
        this.quotes.push.apply(this.quotes, response.data.data);
        this.page++;
      });
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
</style>
