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
import { KirimForm, Kontragent, Sklad, Firma, Paytype } from "@/pages";
export default {
  components: {
    KirimForm,
    Kontragent,
    Sklad,
    Firma,
    Paytype
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
        next();
        this.$store.state.selected_index = null;
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
        .get("api/v1/prixod/id/" + self.$route.params.id)
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
  created: function() {
    this.Data();
    this.Sklad();
  }
};
</script>
