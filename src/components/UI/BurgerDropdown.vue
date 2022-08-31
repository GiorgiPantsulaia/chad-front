<template>
  <div class="bg-[#1a1825] h-full">
    <side-bar class="h-full pt-28">
      <li class="ml-1 my-8 flex gap-[3px]" @click="signOut">
        <icon-logout class="" />
        <button type="button" class="py-1 rounded-sm text-xl ml-8">
          {{ $t("logout") }}
        </button>
      </li>
      <li @click="showLang = !showLang">
        <div class="cursor-pointer text-xl flex">
          <icon-earth />
          <div class="ml-[31px] flex text-xl items-center">
            {{ $i18n.locale === "en" ? "Eng" : "ქარ" }}
            <icon-arrow-down
              class="ml-2 transition-all"
              :class="{ 'rotate-180': showLang }"
            />
          </div>
          <transition name="localeChanger" mode="out-in">
            <div
              v-if="showLang"
              class="relative top-10 right-14 text-xl z-50"
              @click="changeLocale"
            >
              {{ $i18n.locale === "en" ? "ქარ" : "Eng" }}
            </div>
          </transition>
        </div>
      </li></side-bar
    >
  </div>
</template>
<script>
import SideBar from "@/components/layout/SideBar.vue";
import IconLogout from "@/components/icons/IconLogout.vue";
import { mapActions } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import IconArrowDown from "@/components/icons/IconArrowDown.vue";
import IconEarth from "@/components/icons/IconEarth.vue";
import { setLocale } from "@vee-validate/i18n";
import { useLocaleStore } from "@/stores/locale.js";
export default {
  components: { SideBar, IconLogout, IconArrowDown, IconEarth },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
    ...mapActions(useLocaleStore, ["storeLocale"]),
    signOut() {
      this.$emit("onLogout");
      this.logout();
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "en" ? "ka" : "en";
      this.storeLocale({ locale: this.$i18n.locale });
      this.showLang = false;
      setLocale(this.$i18n.locale);
    },
  },
  data() {
    return {
      showLang: false,
    };
  },
};
</script>
