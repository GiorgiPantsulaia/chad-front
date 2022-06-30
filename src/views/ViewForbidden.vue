<template>
  <div
    class="h-screen w-screen bg-[#11101A] flex justify-center items-center text-white text-center"
  >
    <div class="flex flex-col mb-36">
      <img
        src="@/icons/forbidden-icon.png"
        alt="forbidden"
        width="300"
        class="self-center"
      />
      <h1 class="text-5xl font-black tracking-normal mt-14">
        You shall not pass!
      </h1>
      <p class="my-6 tracking-wider">
        Sorry, but you don't have permission to access this page
      </p>
      <button
        @click="this.$router.replace({ name: 'home' })"
        class="py-2 bg-[#E31221] w-32 rounded-sm self-center"
      >
        Return Home
      </button>
    </div>
  </div>
</template>
<script></script>
