<template>
  <div class="flex flex-col">
    <label :for="name" class="text-white capitalize mt-4"
      >{{ name }} <span class="text-red-500">*</span></label
    >
    <Field
      :type="type"
      :name="name"
      :rules="rules"
      :placeholder="placeholder"
      class="border border-gray-200 bg-[#CED4DA] mt-1 h-9 rounded-sm pl-3 outline-none"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <ErrorMessage :name="name" class="text-[#D0342C]" />
  </div>
</template>
<script>
import { Field, ErrorMessage } from "vee-validate";
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Field, ErrorMessage },

  props: {
    type: {
      type: String,
      required: true,
    },
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
