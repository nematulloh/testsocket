<template>
  <div class="content">
    <form>
      <money-transfer-form :datas="dataall"></money-transfer-form>
      <sklad :datas="dataall"></sklad>
      <paytype :datas="dataall"></paytype>
    </form>
  </div>
</template>
<script>
import { MoneyTransferForm, Sklad, Paytype } from "@/pages";
export default {
  components: {
    MoneyTransferForm,
    Sklad,
    Paytype
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
    if (this.$store.state.saved == null) {
      this.$store.state.saved = null;
      next();
    } else {
      const answer = window.confirm(
        this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
      );
      if (answer) {
        this.$root.$refs.moneytransfer.Savedokument();
      } else {
        this.$store.state.saved = null;
        next();
      }
    }
  },
  data() {
    return {
      dataall: {
        sklad_id: parseInt(localStorage.getItem("sklad_id")),
        created_at: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        updated_at: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        transfer_sklad_id: 0,
        total: 0,
        user_id: parseInt(localStorage.getItem("user_id")),
        comment: "",
        money_transfer_table: [{ pay_type_id: 1, summa: 0 }]
      }
    };
  }
};
</script>
