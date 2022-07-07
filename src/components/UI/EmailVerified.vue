<template>
  <div
    class="flex flex-col bg-[#222030] absolute top-[30%] left-0 right-0 mx-auto w-3/12 h-96 text-center text-white"
  >
    <button
      class="text-white text-4xl self-end mr-2"
      @click="this.$emit('onClose')"
    >
      ✕
    </button>
    <img
      src="@/icons/verified-check-icon.svg"
      alt="Verified"
      width="50"
      class="mx-auto mt-16"
    />
    <h1 class="text-3xl mt-4">Thank you!</h1>
    <p class="my-8 mx-10">Your account has been activated</p>
    <button
      type="button"
      class="py-1 px-4 bg-[#E31221] w-7/12 self-center rounded-sm"
      @click="this.$router.replace('/login')"
    >
      Sign in
    </button>
  </div>
</template>
<script>
export default {
  emits: ["onClose"],
};
</script>
