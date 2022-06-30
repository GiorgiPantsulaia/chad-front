<template>
  <div class="absolute top-0 left-0 max-h-screen w-full overflow-hidden">
    <div class="h-screen bg-[#11101A]">
      <nav-bar></nav-bar>
      <router-view class="z-50" />
      <div
        class="mx-auto w-9/12 text-center z-50"
        :class="{
          'blur-[2px] pointer-events-none': active,
        }"
        @wheel="showFirst = true"
      >
        <h1
          class="pt-96 text-6xl font-black leading-snug text-[#DDCCAA] pointer-events-none"
        >
          Find any quote in <br />
          millions of movie lines
        </h1>
        <button
          class="mt-8 bg-[#E31221] text-white rounded-md py-2.5 px-4"
          @click="getStarted"
        >
          Get Started
        </button>
      </div>
    </div>
    <div
      id="movie"
      class="absolute -bottom-full left-0 w-full transition-all duration-1000 h-screen"
      :class="{
        ' -translate-y-full ': showFirst,
        'blur-[2px] pointer-events-none transition-none': active,
      }"
      @wheel="showSecond = true"
    >
      <img
        src="@/icons/interstellar.png"
        alt=""
        class="w-full h-full pointer-events-none"
      />
      <div class="text-white font-black relative bottom-[60%] pl-32">
        <h1 class="text-5xl w-5/12 leading-tight">
          ─ “You have to leave something behind to go forward”
        </h1>
        <p class="text-3xl mt-4 outline-slate-900">Interstellar,2014</p>
      </div>
    </div>
    <div
      id="movie"
      class="absolute -bottom-full left-0 transition-all duration-1000 h-screen z-20"
      :class="{
        '-translate-y-full': showSecond,
        'blur-[2px] pointer-events-none transition-none': active,
      }"
      @wheel="showThird = true"
    >
      <img
        src="@/icons/royal-tenenbaums.png"
        alt=""
        class="w-full h-full pointer-events-none"
      />
      <div class="text-white font-black relative bottom-[60%] pl-32">
        <h1 class="text-5xl w-5/12 leading-tight">
          ─ “I think we're just gonna have to be secretly in love with each
          other and leave it that”
        </h1>
        <p class="text-3xl mt-4">The Royal Tunenbaums,2001</p>
      </div>
    </div>
    <div
      id="movie"
      class="absolute -bottom-full left-0 w-full transition-all duration-1000 h-screen z-40"
      :class="{
        '-translate-y-full': showThird,
        'blur-[2px] pointer-events-none transition-none': active,
      }"
      @wheel="back"
    >
      <img
        src="@/icons/third-movie.png"
        alt=""
        class="w-full h-full pointer-events-none"
      />
      <div class="text-white font-black relative bottom-[60%] pl-32">
        <h1 class="text-5xl w-5/12 leading-tight">
          ─ “I see in your eyes the same fear that would take the heart of
          me....”
        </h1>
        <p class="text-3xl mt-4">The Lord of the Rings, 2003</p>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/layout/NavBar.vue";
export default {
  components: { NavBar },
  data() {
    return {
      showFirst: false,
      showSecond: false,
      showThird: false,
    };
  },
  computed: {
    active() {
      return (
        this.$route.fullPath === "/register" ||
        this.$route.fullPath === "/login"
      );
    },
  },
  methods: {
    getStarted() {
      this.$router.push({ name: "register" });
    },
    back() {
      this.showFirst = false;
      this.showSecond = false;
      this.showThird = false;
    },
  },
};
</script>
<style scoped>
#movie {
  font-family: "Monsterrat";
}
</style>
