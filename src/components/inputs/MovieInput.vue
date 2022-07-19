<template>
  <div class="flex flex-col">
    <div
      class="mx-10 bg-inherit border border-gray-600 h-10 flex rounded-md items-center mt-4"
    >
      <Field
        type="text"
        :name="name"
        :rules="rules"
        :placeholder="placeholder"
        class="outline-none p-2 text-white rounded-md bg-inherit w-full"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <p class="mr-4 text-gray-600">{{ lang }}</p>
    </div>
    <ErrorMessage :name="name" class="text-red-500 text-sm mx-10" />
  </div>
</template>
<script>
import { Field, ErrorMessage } from "vee-validate";
export default {
  components: { Field, ErrorMessage },
  emits: ["update:modelValue"],
  props: {
    name: {
      type: String,
      required: true,
    },
    rules: {
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
<!-- @input="$emit('update:modelValue', $event.target.value)" -->
