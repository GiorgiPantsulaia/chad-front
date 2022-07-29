<template>
  <div
    class="mx-10 bg-inherit border border-gray-600 h-20 flex rounded-md items-center mt-4"
  >
    <Field
      as="textarea"
      :rules="rules"
      :name="name"
      :placeholder="placeholder"
      class="resize-none outline-none p-2 text-white rounded-md bg-inherit w-full overflow-auto"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p class="mr-4 text-gray-600">{{ lang }}</p>
  </div>
  <ErrorMessage :name="name" class="mx-10 text-red-500 text-sm" />
</template>
<script>
import { Field, ErrorMessage } from "vee-validate";
export default {
  components: { Field, ErrorMessage },
  emits: ["update:modelValue"],
  props: {
    rules: {
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
    lang: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
::placeholder {
  color: white;
  opacity: 1;
}
</style>
