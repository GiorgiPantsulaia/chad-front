<template>
  <profile-layout>
    <div
      class="w-full h-full max-h-[800px] mt-24 rounded-lg bg-[#11101A] flex flex-col"
    >
      <div class="h-12 border-b border-gray-600 flex">
        <h1></h1>
      </div>
    </div>
  </profile-layout>
</template>
<script>
import ProfileLayout from "@/components/layout/ProfileLayout.vue";
import axios from "@/config/axios/index.js";
export default {
  components: { ProfileLayout },
  data() {
    return {};
  },
  methods: {
    getMessages() {
      axios
        .get(`/messages/${this.id}`)
        .then((res) => (this.messages = res.data));
    },
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  mounted() {
    //listen to private channel with ids of authenticated user and the user which we want to
  },
};
</script>
