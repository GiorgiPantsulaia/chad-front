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
        :class="{ 'cursor-auto': notification.type === 'friends' }"
        @click="goToPost(notification)"
      >
        <div
          class="flex md:flex-row flex-col md:items-center px-4 justify-between w-full relative"
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
              <p
                class="text-lg font-semibold w-fit"
                :class="{ 'cursor-pointer': notification.type === 'friends' }"
                @click="goToUser(notification.sender.id)"
              >
                {{ notification.sender.name }}
              </p>
              <div class="flex sm:items-center pt-1 sm:text-lg">
                <icon-filled-heart
                  class="mr-2"
                  v-if="notification.type === 'like'"
                />
                <icon-quote
                  class="mr-2 w-6"
                  v-else-if="notification.type === 'comment'"
                />
                <icon-add-friend
                  v-else
                  class="hidden sm:block"
                ></icon-add-friend>
                {{
                  notification.type === "like"
                    ? $t("liked")
                    : notification.type === "comment"
                    ? $t("commented")
                    : notification.status === "accepted"
                    ? $t("friend_accepted")
                    : notification.status === "denied"
                    ? $t("friend_denied")
                    : $t("incoming_friend_request")
                }}
                <div
                  v-if="
                    notification.type === 'friends' &&
                    notification.status === 'pending'
                  "
                  class="flex flex-col sm:absolute gap-3 font-medium sm:right-40 sm:bottom-3"
                >
                  <button
                    class="bg-sky-600 flex px-2 w-20 items-center justify-center text-center hover:bg-blue-600"
                    @click="
                      acceptFriendRequest(
                        notification.sender.id,
                        notification.id
                      )
                    "
                  >
                    Accept
                  </button>
                  <button
                    class="items-center gap-1 px-2 bg-red-500 text-center justify-center hover:bg-red-700"
                    @click="
                      denyFriendRequest(notification.sender.id, notification.id)
                    "
                  >
                    Deny
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex md:flex-col flex-row-reverse md:justify-center absolute md:relative bottom-0 left-0 md:mx-0 text-lg"
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
import IconAddFriend from "@/components/icons/IconAddFriend.vue";
export default {
  emits: ["onOutside"],
  methods: {
    ...mapActions(useNotificationsStore, [
      "markAllAsRead",
      "updateNotificationStatus",
    ]),
    handleClickOutside() {
      this.$emit("onOutside");
    },
    acceptFriendRequest(id, notification_id) {
      axios
        .post(`/friends/${id}/accept`, { notificationId: notification_id })
        .then(() => {
          this.updateNotificationStatus({
            id: notification_id,
            status: "accepted",
          });
          this.updateNotificationState({ id: notification_id, state: "read" });
        });
    },
    denyFriendRequest(id, notification_id) {
      axios
        .post(`/friends/${id}/deny`, { notificationId: notification_id })
        .then(() => {
          this.updateNotificationStatus({
            id: notification_id,
            status: "denied",
          });
          this.updateNotificationState({ id: notification_id, state: "read" });
        });
    },
    goToPost(notification) {
      if (notification.state === "unread") {
        axios.patch(`notification-read/${notification.id}`).then((res) => {
          console.log(res);
        });
      }
      if (notification.type !== "friends") {
        this.$router.push({
          name: "view-quote",
          params: { id: notification.quote_id },
        });
        this.updateNotificationState({ id: notification.id, state: "read" });
      }
    },
    markAsRead() {
      if (this.allMarked === false) {
        axios.post("notifications-read").then((res) => {
          console.log(res);
        });
      }
      this.markAllAsRead();
    },
    date(date) {
      return timeDiff(date, this.$i18n.locale);
    },
    goToUser(id) {
      this.$router.push({ name: "profile-view", params: { id: id } });
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
  components: { IconFilledHeart, IconQuote, IconAddFriend },
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
