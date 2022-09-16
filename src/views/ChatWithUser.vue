<template>
  <profile-layout>
    <div
      class="sm:w-6/12 w-full sm:h-[700px] sm:mt-24 rounded-lg bg-[#11101A] flex flex-col h-screen absolute top-0 z-48"
    >
      <div
        class="h-12 border-b border-gray-600 flex items-center justify-between px-6 text-white text-lg"
      >
        <button class="sm:flex hidden" @click="this.$router.go(-1)">
          <icon-go-back fill="white"></icon-go-back> {{ $t("back") }}
        </button>
        <h1 v-if="user" class="">{{ user.name }}</h1>
      </div>
      <div
        class="w-full h-full text-white pt-4 overflow-auto pb-16"
        ref="messagesContainer"
      >
        <ul class="px-16 flex flex-col">
          <li
            v-for="message in messages"
            class="flex flex-col py-2 text-lg"
            :class="{ 'self-end': message.sender_id === parseInt(id) }"
          >
            <p
              class="opacity-60 text-sm"
              :class="{ 'self-end': message.sender_id === parseInt(id) }"
            >
              {{ message.sender_id === parseInt(id) ? user.name : username }}
            </p>
            <p class="">{{ message.body }}</p>
          </li>
        </ul>
        <form
          class="absolute bottom-0 w-full flex text-white items-center z-50 bg-[#11101A]"
          @submit.prevent="sendMessage"
        >
          <input
            type="text"
            v-model="message"
            class="bg-inherit w-full h-16 outline-none pl-4 border-y border-gray-700"
          />
          <button class="absolute right-2">
            <icon-send-message></icon-send-message>
          </button>
        </form>
      </div>
    </div>
  </profile-layout>
</template>
<script>
import ProfileLayout from "@/components/layout/ProfileLayout.vue";
import axios from "@/config/axios/index.js";
import { mapState } from "pinia";
import IconGoBack from "@/components/icons/IconGoBack.vue";
import IconSendMessage from "@/components/icons/IconSendMessage.vue";
import { useAuthStore } from "@/stores/auth.js";
export default {
  components: { ProfileLayout, IconGoBack, IconSendMessage },
  data() {
    return {
      user: null,
      messages: null,
      message: null,
    };
  },
  beforeMount() {
    this.getMessages();
  },
  mounted() {
    this.updateMessages();
    this.scrollToEnd();
  },
  computed: {
    ...mapState(useAuthStore, ["username", "user_id"]),
  },
  methods: {
    scrollToEnd() {
      const content = this.$refs.messagesContainer;
      content.scrollTop = content.scrollHeight;
    },
    getMessages() {
      axios.get(`/messages/${this.id}`).then((res) => {
        this.user = res.data.user;
        this.messages = res.data.receivedMessages;
        Array.prototype.push.apply(this.messages, res.data.sentMessages);
        this.messages.sort((a, b) => {
          let firstMessage = new Date(a.created_at),
            secondMessage = new Date(b.created_at);
          if (firstMessage < secondMessage) return -1;
          if (firstMessage > secondMessage) return 1;
          return 0;
        });
      });
    },
    sendMessage() {
      axios
        .post(`/messages/${parseInt(this.id)}`, { message: this.message })
        .then((res) => {
          this.messages.push(res.data);
          this.message = null;
        });
    },
    updateMessages() {
      window.Echo.private(
        "messages." + parseInt(this.id) + "." + parseInt(this.user_id)
      ).listen("NewMessage", (data) => {
        this.messages.push(data.message);
      });
    },
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>
