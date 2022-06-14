<template>
  <div class="content">
    <form>
      <initial-form :datas="dataall"></initial-form>
      <firma></firma>
      <sklad :datas="dataall"></sklad>
      <paytype :datas="dataall"></paytype>
    </form>
  </div>
</template>
<script>
// const InitialForm = () => import("@/pages/Initial/Form.vue");
import { InitialForm, Sklad, Firma, Paytype } from "@/pages";
export default {
  components: {
    InitialForm,
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
      next();
    } else {
      const answer = window.confirm(
        this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
      );
      if (answer) {
        this.$root.$refs.initial.Savedokument();
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
  // async mounted() {
  //   let self = this;
  //   try {
  //     const response = await axios.get("api/v1/initial-balance/id/" + self.$route.params.id, {})
  //     if(response){
  //       self.dataall = response.data;
  //       self.dataall.created_at = new Date(self.dataall.created_at * 1000)
  //         .toISOString()
  //         .substr(0, 10);
  //     }

  //   } catch (error) {
  //     console.log(error)
  //   }

  // }
  mounted() {
    this.Data();
    this.Sklad();
  },
  methods: {
    Data() {
      let self = this;
      axios
        .get("api/v1/initial-balance/id/" + self.$route.params.id, {})
        .then(function(response) {
          self.dataall = response.data;
          self.dataall.create_time = new Date(self.dataall.created_at * 1000)
            .toISOString()
            .substr(0, 10);
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
  }
};
</script>
