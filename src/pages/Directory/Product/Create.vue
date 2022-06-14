<template>
  <div class="content">
    <product-form-modal :product="dataall"></product-form-modal>
    <unit></unit>
    <model></model>
    <brand></brand>
    <colour></colour>
    <country></country>
  </div>
</template>
<script>
import { ProductFormModal, Unit, Model, Brand, Colour, Country } from "@/pages";
export default {
  components: { ProductFormModal, Unit, Model, Brand, Colour, Country },
  data() {
    return {
      dataall: {
        name: localStorage.getItem("product_name"),
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
  created: function() {
    let self = this;
    if(localStorage.getItem('shtrix_code')){
      self.dataall.shtrix_table[0].shtrix_kod=localStorage.getItem('shtrix_code');
    }
    if (self.$route.params.id) {
      axios
        .get("api/v1/product/id/" + self.$route.params.id)
        .then(function(response) {
          self.dataall = response.data;
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.$store.state.saved == 1) {
      this.$store.state.saved = null;
      localStorage.removeItem("shtrix_code");
      localStorage.removeItem("product_name");
      next();
    } else {
      const answer = window.confirm(
        this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
      );
      if (answer) {
        this.$root.$refs.product.Savedokument();
      } else {
        this.$store.state.saved = null;
        localStorage.removeItem("shtrix_code");
      localStorage.removeItem("product_name");
        next();
      }
    }
  }
};
</script>
