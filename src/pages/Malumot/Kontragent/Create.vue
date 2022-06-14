<template>
  <div class="content">
    <kontragent-form :datas="dataall"></kontragent-form>
    <firma></firma>
    <sklad :datas="dataall"></sklad>
  </div>
</template>
<script>
import { KontragentForm, Firma, Sklad } from "@/pages";
export default {
  components: { KontragentForm, Firma, Sklad },
  data() {
    return {
      dataall: {
        name: "",
        phone_number: "",
        account_number: "",
        inn: "",
        mfo_id: 0,
        okonx: "",
        address: "",
        firma_id: 0,
        sklad_id: 0,
        is_folder: false,
        type: 2,
        comment: ""
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
        this.$root.$refs.kontragent.Savedokument();
      } else {
        this.$store.state.saved = null;
        next();
      }
    }
  }
};
</script>
