<template>
  <div class="content">
    <kassaorder-form :datas="dataall"></kassaorder-form>
    <sklad :datas="dataall"></sklad>
    <paytype :datas="dataall"></paytype>
    <asos :datas="dataall"></asos>
  </div>
</template>
<script>
import { KassaorderForm, Sklad, Paytype, Asos } from "@/pages";
export default {
  components: { KassaorderForm, Sklad, Paytype, Asos },
  data() {
    return {
      dataall: {
        datetime: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        sklad_id: parseInt(localStorage.getItem("sklad_id")),
        summa: 0,
        kassa_order_table: [
          {
            base_id: 0,
            summa: 0,
            pay_type_id: 0,
            type: false,
            comment: ""
          }
        ]
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
    if (this.$store.state.saved == null) {
      next();
    } else {
      const answer = window.confirm(
        this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
      );
      if (answer) {
        this.$root.$refs.order.Savedokument();
      } else {
        this.$store.state.saved = null;
        next();
      }
    }
  }
};
</script>
