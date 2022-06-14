<template>
  <div class="content">
    <form>
      <refund-form :datas="dataall"></refund-form>
      <kontragent :datas="dataall"></kontragent>
      <firma></firma>
      <sklad :datas="dataall"></sklad>
      <paytype :datas="dataall"></paytype>
    </form>
  </div>
</template>
<script>
import { RefundForm, Kontragent, Firma, Sklad, Paytype } from "@/pages";
export default {
  components: {
    RefundForm,
    Kontragent,
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
        this.$root.$refs.refund.Savedokument();
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
        updated_at: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        sklad_id: parseInt(localStorage.getItem("sklad_id")),
        kontragent_id: 0,
        user_id: parseInt(localStorage.getItem("user_id")),
        pay_type_id: 0,
        price_type: "chakana",
        summa: 0,
        cash_summa: 0,
        plastic_summa: 0,
        count_all: 0,
        comment: "",
        refund_table: [
          {
            product_id: 0,
            count: 0,
            price: 0,
            summa: 0,
            shtrix_kod: null,
            current_balance: 0
          }
        ]
      }
    };
  }
};
</script>
