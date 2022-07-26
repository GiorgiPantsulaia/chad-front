<template>
  <div>
    <div
      class="flex flex-col bg-[#11101A] absolute lg:w-[35%] left-0 right-0 mx-auto z-50 h-fit pb-4 rounded-lg"
      :class="{ 'opacity-30 pointer-events-none': showConfirmation }"
    >
      <div
        class="flex items-center w-full p-6 border-b border-gray-600 justify-between"
      >
        <button type="button" @click="showConfirmation = !showConfirmation">
          <icon-delete class="fill-white hover:fill-[#E31221] w-4" />
        </button>
        <h1 class="text-white w-56 mx-auto font-semibold text-xl">
          {{ $t("edit_quote") }}
        </h1>
        <button
          type="button"
          @click="this.$emit('onClick')"
          class="text-3xl text-white"
        >
          ✕
        </button>
      </div>
      <div class="flex lg:w-full text-white items-center mx-10 mt-2">
        <img
          :src="user_pfp ? back_url + user_pfp : '/default-pfp.png'"
          alt=""
          class="w-14 h-14 rounded-full mr-4"
        />
        <p>{{ username }}</p>
      </div>
      <Form class="flex flex-col" @submit="postQuote">
        <label for="english_quote" class="text-white mx-10 mt-4">Eng</label>
        <Field
          as="textarea"
          name="english_quote"
          rules="required|english"
          v-model="english_quote"
          placeholder="New Quote..."
          class="bg-inherit border border-gray-600 mx-10 h-20 resize-none outline-none rounded-md p-2 text-white"
        />
        <ErrorMessage name="english_quote" class="text-red-500 text-sm mx-10" />
        <label for="georgian_quote" class="text-white mx-10 mt-4">ქარ</label>
        <Field
          as="textarea"
          name="georgian_quote"
          rules="required|georgian"
          v-model="georgian_quote"
          placeholder="ახალი ციტატა..."
          class="bg-inherit border border-gray-600 mx-10 h-20 resize-none outline-none rounded-md p-2 text-white"
        />
        <ErrorMessage
          name="georgian_quote"
          class="text-red-500 text-sm mx-10"
        />
        <label
          class="flex mx-10 h-full bg-inherit text-white items-center cursor-pointer rounded-md mt-6"
        >
          <input type="file" class="hidden" @change="handleImageUpload" />
          <img
            :src="file_url ? file_url : back_url + quote.thumbnail"
            alt="upload photo"
            class="h-96 w-full mx-auto"
          />
          <div
            class="absolute w-28 h-20 mx-auto left-0 right-0 bg-[#11101A] opacity-80 flex flex-col text-center rounded-xl justify-center hover:opacity-100"
          >
            <IconUploadPhoto class="self-center" />
            {{ $t("change_photo") }}
          </div>
        </label>
        <p class="text-red-500 text-sm mx-10" v-if="image && !imageValid">
          {{ errorMessage }}
        </p>
        <button
          class="text-white bg-[#E31221] mx-10 h-10 font-black text-lg mt-6 rounded-md"
        >
          {{ $t("save") }}
        </button>
      </Form>
    </div>
    <confirm-delete
      v-if="showConfirmation"
      @handle-refuse="showConfirmation = false"
      @handle-accept="deleteQuote"
    />
  </div>
</template>
<script>
import axios from "@/config/axios/index.js";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import IconDelete from "@/components/icons/IconDelete.vue";
import ConfirmDelete from "@/components/modals/ConfirmDelete.vue";
import IconUploadPhoto from "@/components/icons/IconUploadPhoto.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  emits: ["onClick", "onEdit"],
  props: {
    quote: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      english_quote: this.$props.quote.body["en"],
      georgian_quote: this.$props.quote.body["ka"],
      image: null,
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
      file_url: null,
      showConfirmation: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user_pfp", "username"]),
    imageValid() {
      if (this.image) {
        return this.image.type.slice(0, 5) === "image";
      }
      return true;
    },
    errorMessage() {
      return this.$t("invalid_image");
    },
  },
  methods: {
    handleImageUpload(e) {
      this.image = e.target.files[0];
      this.file_url = URL.createObjectURL(this.image);
    },
    postQuote() {
      if (this.imageValid) {
        let formData = new FormData();
        formData.append("img", this.image);
        formData.append("english_quote", this.english_quote);
        formData.append("georgian_quote", this.georgian_quote);
        formData.append("id", this.$props.quote.id);
        formData.append("_method", "patch");
        axios
          .post("update-quote", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            this.$emit("onEdit");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    deleteQuote() {
      axios
        .post("delete-quote", { _method: "delete", id: this.$props.quote.id })
        .then(() => {
          this.$router.go(-1);
        });
    },
  },
  components: {
    IconDelete,
    ConfirmDelete,
    IconUploadPhoto,
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    Field,
    ErrorMessage,
  },
};
</script>
