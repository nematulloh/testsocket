<template>
  <div class="content">
    <crm-client-form :datas="dataall"></crm-client-form>
  </div>
</template>
<script>
import { CrmClientForm } from "@/pages";
export default {
  components: { CrmClientForm },
  data() {
    return {
      dataall: ""
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
    console.log(this.$store.state.saved);

    if (this.$store.state.saved == 1) {
      this.$store.state.saved = null;
      next();
    } else {
      const answer = window.confirm(
        this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
      );
      if (answer) {
        this.$root.$refs.crmclient.Savedokument();
      } else {
        this.$store.state.saved = null;
        next();
      }
    }
  },
  mounted: function() {
    let self = this;
    axios
      .get("api/v1/crm-client/id/" + self.$route.params.id)
      .then(function(response) {
        self.dataall = response.data;
      });
  }
};
</script>
