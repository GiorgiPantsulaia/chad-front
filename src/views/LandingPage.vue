<template>
  <div class="absolute top-0 left-0 max-h-screen w-full overflow-hidden">
    <div class="h-screen bg-[#11101A]">
      <nav-bar></nav-bar>
      <router-view class="z-50" />

      <div
        class="mx-auto w-9/12 text-center z-50"
        :class="{
          'blur-[2px] pointer-events-none': active || email_verified,
        }"
        @wheel="showFirst = true"
      >
        <h1
          class="sm:pt-96 pt-72 sm:text-6xl text-4xl font-black leading-snug text-[#DDCCAA] pointer-events-none"
        >
          Find any quote in <br />
          millions of movie lines
        </h1>
        <button
          class="mt-8 bg-[#E31221] text-white rounded-md py-2.5 px-4"
          @click="getStarted"
        >
          {{ $t("get_started") }}
        </button>
      </div>
    </div>
    <div
      id="movie"
      class="absolute -bottom-full left-0 w-full transition-all duration-1000 h-screen font-['Monsterrat']"
      :class="{
        ' -translate-y-full ': showFirst,
        'blur-[2px] pointer-events-none transition-none': active,
      }"
      @wheel="showSecond = true"
    >
      <img
        src="@/assets/images/interstellar.png"
        alt="interstellar thumbnail"
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
        src="@/assets/images/royal-tenenbaums.png"
        alt="royal-tenenbaums-thumbnail"
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
        src="@/assets/images/third-movie.png"
        alt="movie-thumbnail"
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
  <email-verified v-if="email_verified" @onClose="handleClose" />
</template>
<script>
import NavBar from "@/components/layout/NavBar.vue";
import EmailVerified from "@/components/modals/EmailVerified.vue";
export default {
  components: { NavBar, EmailVerified },
  data() {
    return {
      showFirst: false,
      showSecond: false,
      showThird: false,
      email_verified: false,
    };
  },
  computed: {
    active() {
      return (
        this.$route.fullPath === "/register" ||
        this.$route.fullPath === "/login" ||
        this.$route.fullPath === "/forgot-password"
      );
    },
  },
  methods: {
    handleClose() {
      this.email_verified = false;
      this.$router.replace({ name: "home" });
    },
    getStarted() {
      this.$router.push({ name: "register" });
    },
    back() {
      this.showFirst = false;
      this.showSecond = false;
      this.showThird = false;
    },
  },
  beforeMount() {
    if (this.$route.query.verified === "true") {
      this.email_verified = true;
    }
  },
};
</script>
<style scoped>
.auth-enter-active,
.auth-leave-active {
  transition: opacity 0.2s ease;
}

.auth-enter-from,
.auth-leave-to {
  opacity: 0;
}
</style>
