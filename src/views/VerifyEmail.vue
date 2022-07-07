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
          .then((response) => {
            if (response.status === 200) {
              this.$router.push("/?verified=true");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  beforeMount() {
    this.verifyEmail();
  },
};
</script>
