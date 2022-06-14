<template>
  <div class="content">
    <revision-form :datas="dataall"></revision-form>
    <kontragent :datas="dataall"></kontragent>
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
  Kontragent,
  Sklad,
  Paytype,
  Product,
  Unit,
  Model,
  Country,
  Brand,
  Colour
} from "@/pages";
export default {
  components: {
    Firma,
    RevisionForm,
    Kontragent,
    Sklad,
    Paytype,
    Country,
    Product,
    Unit,
    Model,
    Brand,
    Colour
  },
  data() {
    return {
      watch: false,
      update_password: "",
      dataall: {}
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
        this.$root.$refs.revision.Savedokument("home");
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
        .get("api/v1/revision/id/" + self.$route.params.id)
        .then(function(response) {
          self.dataall = response.data;
          setTimeout(() => {
            self.$root.$refs.revision.Update();
            setTimeout(() => {
              self.watch = true;
            }, 1000);
          }, 100);
          // self.$root.$refs.revision.Productlistfolder(response.data.sklad_id);
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
