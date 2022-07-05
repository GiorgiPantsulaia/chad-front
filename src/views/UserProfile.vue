<template>
  <section class="h-screen bg-[#1a1825] absolute top-0 left-0 w-screen">
    <nav-bar></nav-bar>
    <div class="flex mt-24 w-full">
      <side-bar></side-bar>
      <div class="ml-64 flex flex-col w-5/12 h-1/2">
        <h1 class="text-white text-xl font-black">My Profile</h1>
        <div
          class="w-full h-full flex flex-col items-center mt-24 rounded-lg bg-[#11101A]"
        >
          <img
            src="@/icons/interstellar.png"
            alt="profile picture"
            class="w-32 h-32 rounded-full -mt-16"
          />
          <button class="text-white">Upload a new photo</button>
          <Form @submit="saveChanges" class="flex flex-col w-6/12 pb-24">
            <label for="username" class="text-white mt-4">Username</label>
            <Field
              type="text"
              name="username"
              rules="min:3|max:15"
              class="border border-[#CED4DA] bg-[#CED4DA] outline-none rounded-sm h-9 pl-3"
              v-model="username"
            />
            <ErrorMessage name="username" class="text-[#D0342C]" />
            <label for="email" class="text-white mt-4">Email</label>
            <Field
              type="email"
              name="email"
              rules="email"
              v-model="user_email"
              class="border border-[#CED4DA] bg-[#CED4DA] outline-none rounded-sm h-9 pl-3"
            />
            <ErrorMessage name="email" class="text-[#D0342C]" />
            <label for="password" class="text-white mt-4">Password</label>
            <Field
              type="password"
              rules="min:8|max:15"
              name="password"
              placeholder="Enter new password"
              class="border border-[#CED4DA] bg-[#CED4DA] outline-none rounded-sm h-9 pl-3"
            /><ErrorMessage name="password" class="text-[#D0342C]" />
            <button
              class="bg-[#E31221] px-3 w-1/3 h-9 rounded-md text-white self-end relative top-40 left-48"
            >
              Save Changes
            </button>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NavBar from "@/components/layout/NavBar.vue";
import SideBar from "@/components/layout/SideBar.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "@/config/axios/index.js";
export default {
  data() {
    return {
      username: "",
      user_email: "",
    };
  },

  // eslint-disable-next-line vue/no-reserved-component-names
  beforeMount() {
    axios.post("logged-user").then((response) => {
      this.username = response.data.user.name;
      this.user_email = response.data.user.email;
    });
  },
  components: { NavBar, SideBar, Form, Field, ErrorMessage },
};
</script>
