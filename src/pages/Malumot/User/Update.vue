<template>
  <div class="content">
    <user-form :datas="dataall"></user-form>
  </div>
</template>
<script>
import { UserForm } from "@/pages";
export default {
  components: { UserForm },
  data() {
    return {
      dataall: []
    };
  },
  watch: {
    dataall: {
      deep: true,
      handler(val, oldVal) {
        this.$store.state.saved += 1;
        console.log(this.$store.state.saved);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.$store.state.saved == 1) {
      this.$store.state.saved = null;
      next();
    } else {
      const answer = window.confirm(
        this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
      );
      if (answer) {
        this.$root.$refs.user.Savedokument();
      } else {
        this.$store.state.saved = null;
        next();
      }
    }
  },
  created: function() {
    let self = this;
    axios
      .get("api/v1/users/id/" + self.$route.params.id)
      .then(function(response) {
        self.dataall = response.data;
        self.dataall.password = "";
        self.dataall.confirm_password = "";
      });
  }
};
</script>
