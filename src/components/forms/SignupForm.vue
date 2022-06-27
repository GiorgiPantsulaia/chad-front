<template>
  <div
    class="w-[601px] bg-[#222030] mx-auto mt-24 flex flex-col items-center rounded-md"
  >
    <button
      class="text-white text-5xl self-end mr-2"
      @click="this.$router.replace('/')"
    >
      ✕
    </button>
    <h1 class="text-white text-4xl mt-10">Create an account</h1>
    <p class="text-[#6C757D]">Start your journey!</p>
    <form action="" class="flex flex-col w-[360px] pb-16 mt-6">
      <text-input
        v-model="name"
        name="name"
        placeholder="At least 3 & max.15 lower case characters"
      />
      <text-input
        v-model="email"
        name="email"
        type="email"
        placeholder="Enter your email"
      />
      <text-input
        v-model="password"
        name="password"
        type="password"
        placeholder="At least 8 & max.15 lower case characters"
      />

      <text-input
        v-model="confirm_password"
        name="confirm password"
        type="password"
        placeholder="Confirm password"
      />
      <button class="w-full h-10 bg-[#E31221] rounded-md mt-4 text-white">
        Get Started
      </button>
      <button
        class="w-full h-10 border border-white rounded-md mt-4 text-white"
      >
        Sign up with Google
      </button>
      <p class="text-center mt-6 text-[#6C757D]">
        Already have an account?
        <router-link to="/login" class="text-blue-500 underline"
          >Log in</router-link
        >
      </p>
    </form>
  </div>
</template>
<script>
import TextInput from "@/components/inputs/TextInput.vue";
export default {
  components: { TextInput },
};
</script>
