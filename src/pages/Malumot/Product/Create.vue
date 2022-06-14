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
      dataall: {
        name: "",
        unit_id: 0,
        parent_id: 0,
        is_folder: 0,
        model_id: 0,
        country_id: 0,
        brand_id: 0,
        colour_id: 0,
        quality: "",
        picture_name: null,
        extra_name: "",
        shtrix_table: [{ shtrix_kod: "" }]
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
  }
};
</script>
