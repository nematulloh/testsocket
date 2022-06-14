<template>
  <div class="content">
    <product-form :product="dataall"></product-form>
    <unit></unit>
    <model></model>
    <brand></brand>
    <colour></colour>
    <country></country>
  </div>
</template>
<script>
import { ProductForm, Unit, Model, Brand, Colour, Country } from "@/pages";
export default {
  components: { ProductForm, Unit, Model, Brand, Colour, Country },
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
        this.$root.$refs.product.Savedokument();
      } else {
        this.$store.state.saved = null;
        next();
      }
    }
  },
  created: function() {
    let self = this;
    axios
      .get("api/v1/product/id/" + self.$route.params.id)
      .then(function(response) {
        self.dataall = response.data;
      });
  }
};
</script>
