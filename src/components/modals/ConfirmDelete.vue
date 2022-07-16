<template>
  <div
    class="absolute left-0 right-0 mx-auto w-64 text-white z-50 top-[40%] bg-[#11101A] flex flex-col text-center items-center pb-4 rounded-md font-bold"
  >
    <p class="text-red-500 text-2xl mt-4 font-black">Are you sure?</p>
    <div class="flex mt-12">
      <button
        class="mx-4 px-3 text-xl bg-[#24222F]"
        @click="this.$emit('handleRefuse')"
      >
        No
      </button>
      <button
        class="mx-4 px-3 bg-red-500 text-xl"
        @click="this.$emit('handleAccept')"
      >
        Yes
      </button>
    </div>
  </div>
</template>
<script>
export default {
  emits: ["handleRefuse", "handleAccept"],
};
</script>
