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
      dataall: {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        sklad_id: 1,
        role: "Admin"
      }
    };
  },
  watch: {
    dataall: {
      deep: true,
      handler(val, oldVal) {
        this.$store.state.saved += 1;
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
  }
};
</script>
