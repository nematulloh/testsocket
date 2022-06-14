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
      watch: false,
      update_password: "",
      dataall: ""
    };
  },
  watch: {
    dataall: {
      deep: true,
      handler(val, oldVal) {
        let self = this;
        if (this.watch == true) {
          if (self.$store.state.saved != 1) {
            this.$prompt(self.$t("Паролни киритинг"))
              .then(text => {
                if (text == self.update_password) {
                  self.$store.state.saved = 1;
                } else {
                  self.watch = false;
                  self.Data();
                  self.$store.state.errors = self.$t("Парол хато");
                }
              })
              .catch(function() {});
          }
        }
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
        this.$root.$refs.order.Savedokument();
      } else {
        this.$store.state.saved = null;
        next();
      }
    }
  },
  mounted() {
    this.Data();
    this.Sklad();
  },
  methods: {
    Data() {
      let self = this;
      axios
        .get("api/v1/kassa-order/id/" + self.$route.params.id)
        .then(function(response) {
          self.dataall = response.data;
          setTimeout(() => {
            self.watch = null;
          }, 100);
        });
    },
    Sklad() {
      let self = this;
      axios
        .get("api/v1/sklads/id/" + localStorage.getItem("sklad_id"))
        .then(function(response) {
          self.update_password = response.data.update_password;
        });
    }
  }
};
</script>
