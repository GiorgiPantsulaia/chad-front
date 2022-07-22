<template>
  <div>Redirecting...</div>
</template>
<script>
import { useAuthStore } from "@/stores/auth.js";
import { mapActions, mapState } from "pinia";
export default {
  methods: {
    log() {
      console.log(this.isAuthenticated);
    },
    ...mapActions(useAuthStore, ["storeLoginUser"]),
  },
  computed: {
    ...mapState(useAuthStore, ["isAuthenticated"]),
  },
  beforeMount() {
    if (this.$route.query.token && this.$route.query.expires_in) {
      this.storeLoginUser({
        token: this.$route.query.token,
        username: this.$route.query.username,
        user_email: this.$route.query.email,
        expire_time: Number(this.$route.query.expires_in),
        user_pfp: this.$route.query.user_pfp,
        user_id: this.$route.query.user_id,
        google_user: true,
      });
    }
  },
};
</script>
