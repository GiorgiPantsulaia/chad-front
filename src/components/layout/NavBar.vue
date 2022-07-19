<template>
  <nav
    class="flex justify-between py-4 'bg-[#11101A]' text-white absolute top-0 left-0 w-full z-50"
    :class="{
      'blur-[2px] pointer-events-none': active,
      'bg-[#222030]': !landing,
    }"
  >
    <h1
      class="uppercase sm:ml-12 ml-6 text-[#DDCCAA] cursor-pointer self-center font-bold whitespace-nowrap sm:whitespace-normal"
      @click="this.$router.push({ name: 'home' })"
    >
      Movie Quotes
    </h1>

    <div class="flex mr-12 items-center">
      <notifications-dropdown
        v-if="showNotifications"
        id="notification"
        class="absolute top-16 right-16"
      />
      <button
        class="items-center hidden sm:flex"
        @click="showNotifications = !showNotifications"
      >
        <img
          src="@/icons/notification-icon.svg"
          alt=""
          width="25"
          class="mx-2"
        />
        <p class="bg-[#E33812] rounded-full w-6 h-6 relative bottom-2 right-5">
          {{ notifications.length }}
        </p>
      </button>

      <div class="mx-4 cursor-pointer">
        <div @click="showLang = !showLang" class="flex text-lg">
          {{ $i18n.locale === "en" ? "Eng" : "ქარ" }}
          <img
            src="@/icons/arrow-down.svg"
            alt="arrow-down"
            class="ml-1 transition-all"
            :class="{ 'rotate-180': showLang }"
          />
        </div>
        <transition name="localeChanger" mode="out-in">
          <div v-if="showLang" class="absolute text-lg" @click="changeLocale">
            {{ $i18n.locale === "en" ? "ქარ" : "Eng" }}
          </div>
        </transition>
      </div>

      <router-link
        to="/register"
        class="mx-4 bg-[#E31221] rounded-sm py-1 px-5 hidden sm:block"
        v-if="!isAuthenticated"
        >{{ $t("signup") }}</router-link
      >
      <router-link
        v-if="!isAuthenticated"
        to="/login"
        class="py-1 px-5 sm:mx-4 mx-8 border border-white rounded-sm whitespace-nowrap"
      >
        {{ $t("login") }}</router-link
      >
      <button
        type="button"
        v-else
        class="py-1 px-5 mx-4 border border-white rounded-sm"
        @click="logout"
      >
        {{ $t("logout") }}
      </button>
    </div>
  </nav>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import { useLocaleStore } from "@/stores/locale.js";
import { setLocale } from "@vee-validate/i18n";
import { useNotificationsStore } from "@/stores/notifications.js";
import pusher from "@/config/pusher/pusher.js";
import NotificationsDropdown from "@/components/UI/NotificationsDropdown.vue";
export default {
  mounted() {
    this.updateNotifications();
  },
  data() {
    return {
      showLang: false,
      showNotifications: false,
      // notifications: [],
    };
  },
  methods: {
    updateNotifications() {
      pusher.bind("App\\Events\\PostLiked", (data) => {
        this.storeNotifications({ notifications: data });
      });
    },
    ...mapActions(useLocaleStore, ["storeLocale"]),
    ...mapActions(useNotificationsStore, ["storeNotifications"]),

    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "en" ? "ka" : "en";
      this.storeLocale({ locale: this.$i18n.locale });
      this.showLang = false;
      setLocale(this.$i18n.locale);
    },
  },
  computed: {
    ...mapState(useAuthStore, ["isAuthenticated", "logout"]),
    ...mapState(useNotificationsStore, ["notifications"]),
    active() {
      return (
        this.$route.fullPath === "/register" ||
        this.$route.fullPath === "/login"
      );
    },
    landing() {
      return this.$route.fullPath === "/";
    },
  },
  components: { NotificationsDropdown },
};
</script>
<style scoped>
.localeChanger-enter-active,
.localeChanger-leave-active {
  transition: opacity 0.2s ease;
}

.localeChanger-enter-from,
.localeChanger-leave-to {
  opacity: 0;
}
</style>
