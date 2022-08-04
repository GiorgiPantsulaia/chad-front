<template>
  <div
    class="flex flex-col text-white h-[470px] sm:w-[30%] my-6 cursor-pointer"
  >
    <img
      :src="back_url + thumbnail"
      alt="movie poster"
      class="w-full h-[370px] rounded-xl"
    />
    <h1
      class="pt-4 text-xl font-medium tracking-wide"
      @click="
        this.$router.push({ name: 'movies-list', params: { slug: slug } })
      "
    >
      {{ title[$i18n.locale] }}({{ releaseDate }})
    </h1>
    <div class="flex mt-4">
      <p class="text-2xl">
        {{ quotesLength }}
      </p>
      <icon-quote class="ml-2" />
    </div>
  </div>
</template>
<script>
import IconQuote from "@/components/icons/IconQuote.vue";
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
  components: { IconQuote },
};
</script>
