<template>
  <div class="content">
    <oplata-form :datas="dataall"></oplata-form>
    <sklad :datas="dataall"></sklad>
    <paytype :datas="dataall"></paytype>
    <asos :datas="dataall"></asos>
    <kontragent :datas="dataall"></kontragent>
  </div>
</template>
<script>
import { OplataForm, Sklad, Paytype, Asos, Kontragent } from "@/pages";
export default {
  components: { OplataForm, Sklad, Paytype, Asos, Kontragent },
  data() {
    return {
      dataall: {
        datetime: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        sklad_id: parseInt(localStorage.getItem("sklad_id")),
        kontragent_id: null,
        current_total: 0,
        summa: 0,
        pay_type_id: 1,
        type: true,
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
    if (this.$store.state.saved == null) {
      this.$store.state.saved = null;
      next();
    } else {
      const answer = window.confirm(
        this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
      );
      if (answer) {
        this.$root.$refs.oplata.Savedokument();
      } else {
        this.$store.state.saved = null;
        next();
      }
    }
  }
};
</script>
