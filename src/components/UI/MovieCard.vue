<template>
  <div class="flex flex-col text-white h-[470px] w-[30%] my-6 cursor-pointer">
    <img
      :src="back_url + thumbnail"
      alt="movie poster"
      class="w-full h-[370px] rounded-xl"
    />
    <h1 class="pt-4 text-xl font-medium tracking-wide">
      {{ title["en"] }}({{ releaseDate }})
    </h1>
    <div class="flex mt-4">
      <p class="text-2xl">
        {{ quotesLength }}
      </p>
      <img src="@/icons/quote-icon.svg" alt="quotes" width="23" class="ml-2" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: Object,
      required: true,
    },
    releaseDate: {
      type: Number,
      required: true,
    },
    quotesLength: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
    };
  },
};
</script>
