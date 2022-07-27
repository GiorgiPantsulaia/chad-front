<template>
  <div class="bg-[#1a1825] h-full" v-click-outside="handleClickOutside">
    <side-bar class="h-full pt-28">
      <li class="my-8 ml-2 flex" @click="logout">
        <icon-logout class="" />
        <button type="button" class="py-1 rounded-sm text-xl ml-8">
          {{ $t("logout") }}
        </button>
      </li>
      <li @click="showLang = !showLang">
        <div class="ml-1.5 cursor-pointer text-xl flex">
          <icon-earth />
          <div class="ml-7 flex text-xl items-center">
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
  emits: ["onOutside"],
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
    ...mapActions(useLocaleStore, ["storeLocale"]),
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "en" ? "ka" : "en";
      this.storeLocale({ locale: this.$i18n.locale });
      this.showLang = false;
      setLocale(this.$i18n.locale);
    },
    handleClickOutside() {
      this.$emit("onOutside");
    },
  },
  data() {
    return {
      showLang: false,
    };
  },
};
</script>
