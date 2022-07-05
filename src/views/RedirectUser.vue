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
    ...mapActions(useAuthStore, ["storeUser"]),
  },
  computed: {
    ...mapState(useAuthStore, ["isAuthenticated"]),
  },
  beforeMount() {
    if (this.$route.query.token && this.$route.query.expires_in) {
      this.storeUser({
        token: this.$route.query.token,
        expire_time: Number(this.$route.query.expires_in),
      });
    }
  },
};
</script>
