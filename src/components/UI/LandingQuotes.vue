<template>
  <div class="relative w-full transition-all duration-1000 h-screen">
    <img
      v-bind:src="`@/icons/${image}`"
      alt="MovieWithQuote"
      class="w-full h-full pointer-events-none"
    />
    <div class="z-50 text-white relative bottom-[65%] left-36 font-black">
      <h1 class="text-5xl w-5/12 leading-tight">─ “{{ quote }}”</h1>
      <p class="text-3xl mt-6">{{ movie_with_date }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    quote: { type: String, required: true },
    movie_with_date: { type: String, required: true },
    image: { type: String, required: true },
  },
};
</script>
