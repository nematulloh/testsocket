<template>
  <form>
    <md-card>
      <div style="float:right;margin-top:-27px;">
        <button type="button" class="mybtn btn saved" @click="Savedokument()">
          {{ $t("Сақлаш ва беркитиш") }} <sup>F9</sup>
        </button>
        <router-link class="mybtn btn" :to="{ path: '/malumot/sklad/index' }"
          >{{ $t("Чиқиш") }}<sup>esc</sup>
        </router-link>
      </div>
      <md-card-content>
        <div class="md-layout">
          <form>
            <div class="row">
              <div class="col-md-4">
                <label>{{ $t("Номи") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  ref="focused"
                  v-model="datas.name"
                  type="text"
                />
              </div>
              <div class="col-md-4">
                <label>Телефон</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.phone_number"
                  type="text"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("Манзил") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.address"
                  type="text"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("Чек ёзуви") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.check_word"
                  type="text"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("Парол") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.update_password"
                  type="text"
                />
              </div>
            </div>
          </form>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import $ from "jquery";
export default {
  name: "sklad-form",
  data() {
    return {
      filter: ""
    };
  },
  props: ["datas"],
  created() {
    let self = this;
    self.$root.$refs.sklad = self;
  },
  mounted: function() {
    this.Focus();
  },
  methods: {
    Focus() {
      this.$refs.focused.focus();
    },
    Savedokument() {
      let self = this;
      if (this.$route.path == "/malumot/sklad/create") {
        var methods = "post";
        var action = "api/v1/sklads";
      } else {
        var methods = "patch";
        var action = "api/v1/sklads/id/" + self.$route.params.id;
      }
      axios({
        method: methods,
        url: action,
        data: self.datas
      }).then(function(response) {
        self.$store.state.saved = 1;
        self.$router.push({ name: "Склад" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/* .md-dialog .md-dialog-container {
    max-width: 768px;
  } */
</style>
