<template>
  <div
    class="flex flex-col bg-[#222030] absolute top-64 left-0 right-0 mx-auto w-3/12 h-96 text-center text-white rounded-lg"
  >
    <button
      class="text-white text-4xl self-end mr-2"
      @click="this.$router.replace({ name: 'home' })"
    >
      ✕
    </button>
    <icon-plane class="mx-auto mt-16" />
    <h1 class="text-3xl mt-4">{{ $t("check_your_email") }}</h1>
    <p class="my-8 mx-10">
      {{ $t("confirmation_sent") }}
    </p>
    <button
      @click="this.$router.replace('/login')"
      target="_blank"
      class="py-1 px-4 bg-[#E31221] w-7/12 self-center rounded-sm text-xl"
    >
      {{ $t("close") }}
    </button>
  </div>
</template>
<script>
import IconPlane from "@/components/icons/IconPlane.vue";
export default {
  components: { IconPlane },
};
</script>
