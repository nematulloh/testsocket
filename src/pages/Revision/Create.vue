<template>
  <div class="content">
    <revision-form :datas="dataall"></revision-form>
    <sklad :datas="dataall"></sklad>
    <paytype :datas="dataall"></paytype>
    <product :datas="dataall"></product>
    <unit></unit>
    <model></model>
    <brand></brand>
    <colour></colour>
    <country></country>
    <firma></firma>
  </div>
</template>
<script>
import {
  Firma,
  RevisionForm,
  Sklad,
  Paytype,
  Product,
  Unit,
  Model,
  Brand,
  Colour,
  Country
} from "@/pages";
export default {
  components: {
    Firma,
    RevisionForm,
    Sklad,
    Paytype,
    Product,
    Unit,
    Model,
    Brand,
    Colour,
    Country
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
        this.$root.$refs.revision.Savedokument("home");
      } else {
        this.$store.state.saved = null;
        next();
      }
    }
  },
  data() {
    return {
      errors: "",
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
        count_all: 0,
        user_id: parseInt(localStorage.getItem("user_id")),
        comment: "",
        summa: 0,
        total_real_count: 0,
        total_difference: 0,
        real: false,
        revision_table: []
      }
    };
  }
};
</script>
