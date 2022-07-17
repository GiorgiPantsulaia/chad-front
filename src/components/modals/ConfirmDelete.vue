<template>
  <div
    class="absolute left-0 right-0 mx-auto w-64 text-white z-50 top-[40%] bg-[#11101A] flex flex-col text-center items-center pb-4 rounded-md font-bold"
  >
    <p class="text-red-500 text-2xl mt-4 font-black px-2">
      {{ $t("confirm_delete") }}
    </p>
    <div class="flex mt-12">
      <button
        class="mx-4 px-3 text-xl bg-[#24222F] rounded-sm"
        @click="this.$emit('handleRefuse')"
      >
        {{ $t("no") }}
      </button>
      <button
        class="mx-4 px-3 bg-red-500 text-xl rounded-sm"
        @click="this.$emit('handleAccept')"
      >
        {{ $t("yes") }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  emits: ["handleRefuse", "handleAccept"],
};
</script>
