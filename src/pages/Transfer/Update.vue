<template>
  <div class="content">
    <form>
      <transfer-form :datas="dataall"></transfer-form>
      <firma></firma>
      <sklad :datas="dataall"></sklad>
    </form>
  </div>
</template>
<script>
import { TransferForm, Sklad, Firma } from "@/pages";
export default {
  components: {
    TransferForm,
    Sklad,
    Firma
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
        this.$root.$refs.transfer.Savedokument();
      } else {
        this.$store.state.saved = null;
        next();
      }
    }
  },
  data() {
    return {
      watch: false,
      update_password: "",
      dataall: {}
    };
  },
  methods: {
    Data() {
      let self = this;
      axios
        .get("api/v1/transfer/id/" + self.$route.params.id)
        .then(function(response) {
          self.dataall = response.data;
          setTimeout(() => {
            self.watch = true;
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
  },
  mounted() {
    this.Data();
    this.Sklad();
  }
};
</script>
