<template>
  <div
    class="md:w-[800px] w-full left-0 md:left-auto h-[600px] md:h-[700px] bg-black rounded-xl flex flex-col overflow-auto"
    v-click-outside="handleClickOutside"
  >
    <div class="flex justify-between mx-4 mt-8">
      <h1 class="text-2xl font-bold">Notifications</h1>
      <button type="button" class="underline" @click="markAsRead">
        Mark all as read
      </button>
    </div>
    <div class="h-full">
      <div
        v-for="notification in this.notifications"
        :key="notification.id"
        class="mx-4 bg-inherit border border-[#6C757D] border-opacity-50 rounded-sm md:h-[96px] h-[130px] my-2 flex cursor-pointer"
        @click="goToPost(notification.quote_id, notification.id)"
      >
        <div
          class="flex md:flex-row flex-col md:items-center px-4 justify-between w-full"
        >
          <div class="flex items-center">
            <img
              :src="
                notification.sender.profile_pic
                  ? back_url + notification.sender.profile_pic
                  : '/default-pfp.png'
              "
              class="w-20 h-20 rounded-full mt-2 md:mt-0"
              :class="{
                'border-2 border-[#0eb868]': notification.state === 'unread',
              }"
              alt="user profile picture"
            />
            <div class="flex flex-col pl-4">
              <p class="text-lg font-semibold">
                {{ notification.sender.name }}
              </p>
              <p class="flex items-center pt-1 text-lg">
                <icon-filled-heart
                  class="mr-2"
                  v-if="notification.type === 'like'"
                />
                <icon-quote class="mr-2 w-6" v-else />
                {{
                  notification.type === "like" ? $t("liked") : $t("commented")
                }}
              </p>
            </div>
          </div>
          <div
            class="flex md:flex-col flex-row-reverse md:justify-center justify-end mx-6 md:mx-0 text-lg"
          >
            <p class="mx-8 md:mx-0">
              {{ date(notification.created_at) }}
            </p>
            <p class="text-[#0eb868] md:self-end">
              {{ notification.state === "unread" ? "New" : "" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconFilledHeart from "@/components/icons/IconFilledHeart.vue";
import timeDiff from "time-diff-for-humans";
import IconQuote from "@/components/icons/IconQuote.vue";
import { mapActions, mapState } from "pinia";
import { useNotificationsStore } from "@/stores/notifications.js";
import axios from "@/config/axios/index.js";
export default {
  emits: ["onOutside"],
  methods: {
    ...mapActions(useNotificationsStore, ["markAllAsRead"]),
    handleClickOutside() {
      this.$emit("onOutside");
    },
    goToPost(id, notification_id) {
      axios.post("notification-read", { id: notification_id }).then((res) => {
        console.log(res);
      });
      this.$router.push("/view-quote/" + id);
      const index = this.notifications.findIndex(
        (notification) => notification.id === notification_id
      );
      this.notifications[index].state = "read";
    },
    markAsRead() {
      if (this.allMarked === false) {
        axios.get("notifications-read").then((res) => {
          console.log(res);
        });
      }
      this.markAllAsRead();
    },
    date(date) {
      return timeDiff(date, this.$i18n.locale);
    },
  },
  computed: {
    ...mapState(useNotificationsStore, ["notifications"]),
    ...mapState(useNotificationsStore, ["allMarked"]),
  },
  data() {
    return {
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
    };
  },
  components: { IconFilledHeart, IconQuote },
};
</script>
<style scoped>
div {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
div::-webkit-scrollbar {
  display: none;
}
</style>
