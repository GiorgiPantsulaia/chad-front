<template>
  <div class="flex flex-col">
    <label for="name" class="text-white capitalize"
      >{{ name }} <span class="text-red-500">*</span></label
    >
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      class="border border-gray-200 bg-[#CED4DA] mb-4 mt-1 h-9 rounded-sm pl-3 outline-none"
    />
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
  },
};
</script>
