<template>
  <div
    class="flex flex-col bg-[#222030] absolute top-48 left-0 right-0 mx-auto w-10/12 h-96 text-center text-white"
  >
    <button
      class="text-white text-4xl self-end mr-2"
      @click="this.$router.replace({ name: 'home' })"
    >
      ✕
    </button>
    <img
      src="@/icons/paper-plane.svg"
      alt="Paper plane"
      width="50"
      class="mx-auto mt-16"
    />
    <h1 class="text-3xl mt-4">Thank you!</h1>
    <p class="my-8 mx-10">
      Please check your email and follow the instructions to activate your
      account.
    </p>
    <a
      href="https://mail.google.com/mail/u/0/"
      target="_blank"
      class="py-1 px-4 bg-[#E31221] w-7/12 self-center rounded-sm"
      >Go to my email</a
    >
  </div>
</template>
<script></script>
