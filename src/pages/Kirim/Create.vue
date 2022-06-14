<template>
  <div class="content">
    <form>
      <kirim-form :datas="dataall"></kirim-form>
      <kontragent :datas="dataall"></kontragent>
      <firma></firma>
      <sklad :datas="dataall"></sklad>
      <paytype :datas="dataall"></paytype>
    </form>
  </div>
</template>
<script>
import { KirimForm, Kontragent, Firma, Sklad, Paytype } from "@/pages";
export default {
  components: {
    KirimForm,
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
  beforeMount() {
    // window.addEventListener("beforeunload", this.preventNav);
  },
  beforeRouteLeave(to, from, next) {
    if (this.$store.state.saved == null) {
      this.$store.state.saved = null;
      localStorage.removeItem("prostatka");
      next();
      this.$store.state.selected_index = null;
    } else {
      const answer = window.confirm(
        this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
      );
      if (answer) {
        this.$root.$refs.prixod.Savedokument();
      } else {
        this.$store.state.saved = null;
        localStorage.removeItem("prostatka");
        this.$store.state.selected_index = null;
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
        kontragent_id: 0,
        debit_summa: 0,
        user_id: parseInt(localStorage.getItem("user_id")),
        pay_type_id: 0,
        rasxod_summa: 0,
        skidka_summa: 0,
        summa: 0,
        comment: "",
        count_all: 0,
        prixod_table: [
          {
            product_id: 0,
            current_balance: 0,
            count: 0,
            debit_price: 0,
            debit_summa: 0,
            kontragent_price: 0,
            kontragent_summa: 0,
            chakana_percent: 0.0,
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
  // methods: {
  //   preventNav(event) {
  //     event.preventDefault();
  //     event.returnValue = "";
  //   }
  // },
};
</script>
