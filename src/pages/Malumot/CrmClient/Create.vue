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
      dataall: {
        first_name: "",
        last_name: "",
        middle_name: "",
        phone_number: "+998",
        work_id: null,
        work_address_id: null,
        found_address_id: null,
        found_datetime: 1,
        last_datetime: 1,
        contact_datetime: 1,
        probability: 0,
        status_id: null,
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
  }
};
</script>
