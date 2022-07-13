<template>
  <div
    class="mx-10 bg-inherit border border-gray-600 h-10 flex rounded-md items-center mt-4"
  >
    <input
      type="text"
      :name="name"
      :placeholder="placeholder"
      class="outline-none p-2 text-white rounded-md bg-inherit w-full"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p class="mr-4 text-gray-600">{{ lang }}</p>
  </div>
</template>
<script>
export default {
  emits: ["update:modelValue"],
  props: {
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
<!-- @input="$emit('update:modelValue', $event.target.value)" -->
