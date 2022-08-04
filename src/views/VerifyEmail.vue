<template>
  <div>Verifying...</div>
</template>
<script>
import axios from "@/config/axios/index.js";

export default {
  methods: {
    verifyEmail() {
      if (this.$route.query.token) {
        axios
          .post("verify-email", {
            token: this.$route.query.token,
          })
          .then(() => {
            this.$router.push("/?verified=true");
          })
          .catch((err) => {
            console.log(err);
            this.$router.replace({ name: "home" });
          });
      } else {
        this.$router.replace({ name: "home" });
      }
    },
  },
  beforeMount() {
    this.verifyEmail();
  },
};
</script>
