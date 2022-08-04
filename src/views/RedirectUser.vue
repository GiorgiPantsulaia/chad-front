<template>
  <div>Redirecting...</div>
</template>
<script>
import { useAuthStore } from "@/stores/auth.js";
import { mapActions } from "pinia";
export default {
  methods: {
    ...mapActions(useAuthStore, ["storeLoggedUser"]),
  },
  beforeMount() {
    if (this.$route.query.token && this.$route.query.expires_in) {
      this.storeLoggedUser({
        token: this.$route.query.token,
        username: this.$route.query.username,
        user_email: this.$route.query.email,
        expire_time: Number(this.$route.query.expires_in),
        avatar: this.$route.query.avatar,
        user_id: this.$route.query.user_id,
        google_user: true,
      });
    } else {
      this.$router.replace({ name: "home" });
    }
  },
};
</script>
