<template>
  <form>
    <md-card>
      <div style="float:right;margin-top:-27px;">
        <button type="button" class="mybtn btn saved" @click="Savedokument()">
          {{ $t("Сақлаш ва беркитиш") }} <sup>F9</sup>
        </button>
        <router-link class="mybtn btn" :to="{ path: '/malumot/user/index' }"
          >{{ $t("Чиқиш") }}<sup>esc</sup>
        </router-link>
      </div>
      <md-card-content>
        <div class="md-layout">
          <form>
            <div class="row">
              <div class="col-md-4">
                <label>{{ $t("Исми") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  ref="focused"
                  v-model="datas.first_name"
                  type="text"
                />
              </div>
              <div class="col-md-4">
                <label>Фамилия</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.last_name"
                  type="text"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("Почта") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.email"
                  type="email"
                />
              </div>
              <div class="col-md-4">
                <label>Склад</label>
              </div>
              <div class="col-md-8">
                <v-select
                  :clearable="false"
                  class="form-control-sm required md-input"
                  :options="skladlist"
                  v-model="datas.sklad_id"
                  :reduce="name => name.id"
                  label="name"
                  @input="Productlistfolder(datas.sklad_id)"
                >
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                  <template #selected-option="{ name }">
                    {{ name }}
                  </template>
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      <em
                        ><b>{{ search }}</b></em
                      >{{ $t("бўйича маьлумот йўқ") }}
                    </template>
                    <em style="opacity: 0.5;" v-else>{{
                      $t("Маьлумот йўқ")
                    }}</em>
                  </template>
                </v-select>
              </div>
              <div class="col-md-4">
                <label>{{ $t("Хуқуқ") }}</label>
              </div>
              <div class="col-md-8">
                <select v-model="datas.role" class="form-control">
                  <option value="Admin">Admin</option>
                  <option value="SuperUser">SuperUser</option>
                </select>
              </div>
              <div class="col-md-4">
                <label>Логин</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.username"
                  type="text"
                />
              </div>
              <div class="col-md-4">
                <label>Парол</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.password"
                  type="password"
                />
              </div>
              <div class="col-md-4">
                <label>Парол тасдиқлаш</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  @change="Changeparol()"
                  v-model="datas.confirm_password"
                  type="password"
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
  name: "user-form",
  data() {
    return {
      filter: "",
      skladlist: []
    };
  },
  props: ["datas"],
  created() {
    let self = this;
    self.$root.$refs.user = self;
  },
  mounted: function() {
    this.Skladlist();
    this.Focus();
  },
  methods: {
    Skladlist() {
      let self = this;
      axios.get("api/v1/sklads").then(function(response) {
        self.skladlist = response.data;
      });
    },
    Changeparol() {
      if (this.datas.password != this.datas.confirm_password) {
        this.$store.state.errors = this.$t("Парол тасдиқланмади");
      }
    },
    Focus() {
      this.$refs.focused.focus();
    },
    Savedokument() {
      let self = this;
      if (this.$route.path == "/malumot/user/create") {
        var methods = "post";
        var action = "api/v1/users";
      } else {
        var methods = "patch";
        var action = "api/v1/users/id/" + self.$route.params.id;
      }
      axios({
        method: methods,
        url: action,
        data: self.datas
      }).then(function(response) {
        self.$store.state.saved = 1;
        self.$router.push({ name: "Фойдаланувчи" });
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
