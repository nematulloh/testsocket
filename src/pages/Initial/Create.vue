<template>
  <div class="content">
    <form>
      <initial-form :datas="dataall"></initial-form>
      <firma></firma>
      <sklad :datas="dataall"></sklad>
      <paytype :datas="dataall"></paytype>
    </form>
  </div>
</template>
<script>
import { InitialForm, Firma, Sklad, Paytype } from "@/pages";
export default {
  components: {
    InitialForm,
    Firma,
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
        this.$root.$refs.initial.Savedokument();
      } else {
        this.$store.state.saved = null;
        next();
      }
    }
  },
  data() {
    return {
      dataall: {
        created_at: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        create_time: new Date().toISOString().slice(0, 10),
        updated_at: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        sklad_id: parseInt(localStorage.getItem("sklad_id")),
        user_id: parseInt(localStorage.getItem("user_id")),
        pay_type_id: 0,
        summa: 0,
        debit_summa: 0,
        comment: "",
        count_all: 0,
        initial_balance_table: [
          {
            product: null,
            product_id: 0,
            count: 0,
            debit_price: 0,
            debit_summa:0,
            chakana_percent: 0,
            optom_percent: 0,
            chakana_price: 0,
            optom_price: 0,
            chakana_summa: 0,
            optom_summa: 0
          }
        ]
      }
    };
  }
};
</script>
