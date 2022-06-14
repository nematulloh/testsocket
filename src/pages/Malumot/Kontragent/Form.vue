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
              <div class="col-md-4"><label>ФИО</label></div>
              <div class="col-md-8">
                <input
                  ref="focused"
                  class="form-control"
                  v-model="datas.name"
                  type="text"
                />
              </div>
              <div class="col-md-4"><label>Телефон</label></div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.phone_number"
                  type="text"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("Хисоб рақам") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.account_number"
                  type="text"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("ИНН") }}</label>
              </div>
              <div class="col-md-8">
                <input class="form-control" v-model="datas.inn" type="text" />
              </div>
              <div class="col-md-4">
                <label>{{ $t("МФО") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.mfo_id"
                  type="text"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("ОКОНХ") }}</label>
              </div>
              <div class="col-md-8">
                <input class="form-control" v-model="datas.okonx" type="text" />
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
                <label>{{ $t("Фирма") }}</label>
              </div>
              <div class="col-md-8">
                <v-select
                  :clearable="false"
                  class="md-input"
                  :options="firmalist"
                  v-model="datas.firma_id"
                  :reduce="name => name.id"
                  label="name"
                >
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      v-bind="attributes"
                      v-on="events"
                    />
                    <button
                      type="button"
                      class="modallist"
                      v-b-modal.modal-firmalist
                    >
                      <b-icon icon="three-dots"></b-icon>
                    </button>
                  </template>
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      <em
                        ><b>{{ search }}</b></em
                      >
                      {{ $t("бўйича маьлумот йўқ") }}
                      <button
                        type="button"
                        @click="firma.name = search"
                        class="pluss"
                        v-b-modal.modal-firma
                      >
                        +
                      </button></template
                    >
                    <em style="opacity: 0.5;" v-else>{{
                      $t("Маьлумот йўқ")
                    }}</em>
                  </template>
                </v-select>
              </div>
              <div class="col-md-4">
                <label>{{ $t("Склад") }}</label>
              </div>
              <div class="col-md-8">
                <v-select
                  :clearable="false"
                  :options="skladlist"
                  v-model="datas.sklad_id"
                  :reduce="name => name.id"
                  label="name"
                ></v-select>
              </div>
              <div class="col-md-4">
                <label>{{ $t("Папка") }}</label>
              </div>
              <div class="col-md-8">
                <input type="checkbox" v-model="datas.is_folder" />
              </div>
              <div class="col-md-4"><label>Комментарий</label></div>
              <div class="col-md-8">
                <textarea
                  class="form-control"
                  v-model="datas.comment"
                ></textarea>
              </div>
              <div class="col-md-4">
                <label>{{ $t("Тури") }}</label>
              </div>
              <div class="col-md-8">
                <v-select
                  :clearable="false"
                  :options="kontragent_type"
                  v-model="datas.type"
                  :reduce="name => name.id"
                  label="name"
                ></v-select>
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
      filter: "",
      skladlist: [],
      firma: "",
      firmalist: [],
      kontragentlist: [],
      sett: null,
      kontragent_type: [
        { id: 1, name: "Клиент" },
        { id: 2, name: "Етказувчи" },
        { id: 3, name: "Клиент ва Етказувчи" }
      ]
    };
  },
  props: ["datas"],
  created() {
    let self = this;
    self.$root.$refs.kontragent = self;
    self.$root.$emit("kontragentone", this.kontragentnew);
    self.$root.$on("skladall", function(getdata) {
      self.skladlist = getdata;
    });
    self.$root.$on("firmaone", function(getdata) {
      self.firma = getdata;
    });
    self.$root.$on("firmaall", function(getdata) {
      self.firmalist = getdata;
    });
    self.$root.$on("firmaselected", function(getdata) {
      self.datas.firma_id = getdata;
    });
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
      if (this.$route.path == "/malumot/kontragent/create") {
        var methods = "post";
        var action = "api/v1/kontragent";
      } else {
        var methods = "patch";
        var action = "api/v1/kontragent/id/" + self.$route.params.id;
      }
      axios({
        method: methods,
        url: action,
        data: self.datas
      }).then(function(response) {
        self.$store.state.saved = 1;
        self.$router.push({ name: "Контрагент" });
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
