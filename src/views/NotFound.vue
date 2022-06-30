<template>
  <div
    class="h-screen w-screen bg-[#11101A] flex justify-center items-center text-white text-center"
  >
    <div class="flex flex-col mb-36">
      <img
        src="@/icons/404-ghost.png"
        alt="Error 404"
        width="150"
        class="self-center opacity-80"
      />
      <h1 class="text-5xl font-black tracking-normal mt-14">Whoops!</h1>
      <p class="my-6 tracking-wider text-lg font-medium">
        We can't see the page you are looking for
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
