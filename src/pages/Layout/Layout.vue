<template>
  <div :class="{ content: !$route.meta.hideContent }">
    <div
      class="alert alert-danger alert-dismissable"
      style="z-index:1200!important"
      v-if="$store.state.errors != ''"
    >
      <a
        aria-hidden="true"
        data-dismiss="alert"
        class="close"
        href="javascript:void(0)"
        @click="$store.state.errors = ''"
        >×</a
      >
      <h4><i class="icon fa fa-check"></i>Хатолик {{ Interval() }}</h4>
      {{ $store.state.errors }}
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  beforecreate: function() {
    // if (this.$store.state.productlist == null) {
    //   if (localStorage.getItem('token') != null) {
    // this.$store.dispatch('Productlist');
    //   }
    // }
    // if(this.$route.path!='/directory/product/index'){
    // if (localStorage['prostatka'] != true) {
    // }
    // }
  },
  mounted: function() {
    if (localStorage["prostatka"] != true || self.$store.state.prostatka) {
      this.Ostatka();
    }
  },
  methods: {
    Ostatka() {
      let self = this;
      var sklad;
      if (localStorage.getItem("sklad_id") > 0) {
        sklad = localStorage.getItem("sklad_id");
      } else {
        sklad = parseInt(localStorage.getItem("sklad_id"));
      }
      var datetime = null;
      if (localStorage.getItem("created_at")) {
        datetime = localStorage.getItem("created_at");
      }
    },
    Interval() {
      setTimeout(() => {
        this.$store.state.errors = "";
      }, 10000);
    }
  }
};
</script>
