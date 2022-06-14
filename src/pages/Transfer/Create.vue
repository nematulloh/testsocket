<template>
  <div class="content">
    <form>
      <transfer-form :datas="dataall"></transfer-form>
      <firma></firma>
      <sklad :datas="dataall"></sklad>
    </form>
  </div>
</template>
<script>
import { TransferForm, Firma, Sklad } from "@/pages";
export default {
  components: {
    TransferForm,
    Firma,
    Sklad
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
        this.$root.$refs.transfer.Savedokument();
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
        count_all: 0,
        user_id: parseInt(localStorage.getItem("user_id")),
        summa: 0,
        comment: "",
        transfer_table: [
          {
            product_id: 0,
            count: 0,
            current_balance: 0,
            debit_price: 0,
            debit_summa: 0,
            chakana_percent: 0,
            optom_percent: 0,
            chakana_price: 0,
            optom_price: 0,
            chakana_summa: 0,
            optom_summa: 0,
            shtrix_kod: ""
          }
        ]
      }
    };
  }
};
</script>
