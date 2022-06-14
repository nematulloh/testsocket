<template>
  <div class="content">
    <sklad-form :datas="dataall"></sklad-form>
  </div>
</template>
<script>
import { SkladForm } from "@/pages";
export default {
  components: { SkladForm },
  data() {
    return {
      dataall: []
    };
  },
  watch: {
    dataall: {
      deep: true,
      handler(val, oldVal) {
        this.$store.state.saved += 1;
        console.log(this.$store.state.saved);
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
        this.$root.$refs.sklad.Savedokument();
      } else {
        this.$store.state.saved = null;
        next();
      }
    }
  },
  created: function() {
    let self = this;
    axios
      .get("api/v1/sklads/id/" + self.$route.params.id)
      .then(function(response) {
        self.dataall = response.data;
      });
  }
};
</script>
