<template>
  <div class="flex flex-col">
    <label :for="name" class="text-white capitalize mt-4"
      >{{ name }} <span class="text-red-500">*</span></label
    >
    <div class="flex w-full items-center">
      <Field
        :type="type ? 'password' : 'text'"
        :name="name"
        :rules="rules"
        :placeholder="placeholder"
        class="border border-gray-200 bg-[#CED4DA] mt-1 h-9 rounded-md pl-3 outline-none w-full"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <button
        class="absolute md:right-36 right-12 mt-1"
        @click="type = !type"
        type="button"
      >
        <img src="@/icons/show-password-icon.svg" alt="" width="25" />
      </button>
    </div>
    <ErrorMessage :name="name" class="text-[#D0342C] text-sm" />
  </div>
</template>
<script>
import { Field, ErrorMessage } from "vee-validate";
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Field, ErrorMessage },
  data() {
    return {
      type: true,
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    rules: {
      type: String,
      required: true,
    },
  },
};
</script>
