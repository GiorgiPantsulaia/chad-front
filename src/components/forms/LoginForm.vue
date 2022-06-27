<template>
  <div
    class="w-[601px] bg-[#222030] mt-24 flex flex-col items-center rounded-md absolute mx-auto left-0 right-0"
  >
    <button
      class="text-white text-5xl self-end mr-2"
      @click="this.$router.replace('/')"
    >
      ✕
    </button>
    <h1 class="text-white text-4xl mt-10">Log in to your account</h1>
    <p class="text-[#6C757D]">Welcome back! Please enter your details.</p>
    <form class="flex flex-col w-[360px] pb-16 mt-6">
      <text-input
        v-model="user"
        name="email"
        placeholder="At least 3 & max.15 lower case characters"
      />
      <text-input
        v-model="password"
        name="password"
        type="password"
        placeholder="At least 8 & max.15 lower case characters"
      />
      <div class="text-white flex justify-between">
        <div>
          <input type="checkbox" name="remember_me" class="mr-2" />
          <label for="remember_me">Remember me</label>
        </div>
        <p class="text-[#0D6EFD] cursor-pointer">Forgot password?</p>
      </div>
      <button class="w-full h-10 bg-[#E31221] rounded-md mt-4 text-white">
        Sign in
      </button>
      <button
        class="w-full h-10 border border-white rounded-md mt-4 text-white"
      >
        Sign in with Google
      </button>
      <p class="text-center mt-6 text-[#6C757D]">
        Don't have an account?
        <router-link to="/register" class="text-[#0D6EFD] underline mx-1">
          Sign up</router-link
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
