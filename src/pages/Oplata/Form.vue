<template>
  <form>
    <md-card>
      <div class="md-layout myheader">
        <div class="md-layout-item md-small-size-50 md-size-50 ">
          <h4 style="font-weight: bold;color:#3d464c;">
            {{ $t($route.name) }}
            <span v-if="$route.params.id != undefined"
              >№{{ $route.params.id }}</span
            >
            {{ Dates(datas.datetime) }}
          </h4>
        </div>
        <div class="md-layout-item md-small-size-50 md-size-50 end">
          <button type="button" class="mybtn btn saved" @click="Savedokument()">
            {{ $t("Сақлаш ва беркитиш") }} <sup>F9</sup>
          </button>
          <router-link class="mybtn btn" :to="{ path: '/oplata/index' }"
            >{{ $t("Чиқиш") }}<sup>esc</sup></router-link
          >
        </div>
      </div>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-50 md-size-50">
            <label>Склад</label>
            <v-select
              :clearable="false"
              class="form-control-sm required md-input"
              :options="skladlist"
              v-model="datas.sklad_id"
              :reduce="name => name.id"
              label="name"
            >
              <template #list-footer>
                <li style="text-align: center;font-weight:bold;">
                  f4 {{ $t("умумий рўйхат") }}
                </li>
              </template>
              <template #search="{ attributes, events }">
                <input
                  class="vs__search"
                  v-bind="attributes"
                  v-on="events"
                  aria-activedescendant="null"
                />
                <button
                  type="button"
                  class="modallist"
                  v-b-modal.modal-skladlist
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
                    class="pluss"
                    @click="sklad.name = search"
                    v-b-modal.modal-sklad
                  >
                    +
                  </button>
                  <b>insert</b>
                </template>
                <em style="opacity: 0.5" v-else>{{ $t("Маьлумот йўқ") }}</em>
              </template>
            </v-select>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <label>Контрагент</label>
            <v-select
              :clearable="false"
              class="form-control-sm required md-input"
              :options="kontragentlist"
              v-model="datas.kontragent_id"
              :reduce="name => name.id"
              label="name"
              @input="Kontragentchange()"
            >
              <template #list-footer>
                <li style="text-align: center;font-weight:bold;">
                  f4 {{ $t("умумий рўйхат") }}
                </li>
              </template>
              <template #search="{ attributes, events }">
                <input
                  class="vs__search"
                  v-bind="attributes"
                  v-on="events"
                  ref="focused"
                />
                <button
                  type="button"
                  class="modallist"
                  v-b-modal.modal-kontragentlist
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
                    class="pluss"
                    @click="kontragent.name = search"
                    v-b-modal.modal-kontragent
                  >
                    +
                  </button>
                  <b>insert</b>
                </template>
                <em style="opacity: 0.5" v-else>{{ $t("Маьлумот йўқ") }}</em>
              </template>
            </v-select>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <label>{{ $t("Қолдиқ") }}</label>
            <vue-numeric
              v-model="datas.current_total"
              separator="space"
              readonly
              class="form-control needt"
              v-bind:precision="0"
            >
            </vue-numeric>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <label>Сумма</label>
            <vue-numeric
              v-model="datas.summa"
              separator="space"
              class="form-control"
              v-bind:precision="0"
            >
            </vue-numeric>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <label for="">{{ $t("Тўлов тури") }}</label>
            <v-select
              :clearable="false"
              class="form-control-sm required md-input"
              :options="paytypelist"
              v-model="datas.pay_type_id"
              :reduce="name => name.id"
              label="name"
            >
              <template #list-footer>
                <li style="text-align: center;font-weight:bold;">
                  f4 {{ $t("умумий рўйхат") }}
                </li>
              </template>
              <template #search="{ attributes, events }">
                <input class="vs__search" v-bind="attributes" v-on="events" />
                <button
                  type="button"
                  class="modallist"
                  v-b-modal.modal-paytypelist
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
                    class="pluss"
                    @click="paytype.name = search"
                    v-b-modal.modal-paytype
                  >
                    +
                  </button>
                </template>
                <em style="opacity: 0.5" v-else>{{ $t("Маьлумот йўқ") }}</em>
              </template>
            </v-select>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <label for="">{{ $t("Тури") }}</label>
            <v-select
              :clearable="false"
              class="form-control-sm"
              :options="typelist"
              v-model="datas.type"
              :reduce="name => name.id"
              label="name"
              required="true"
            ></v-select>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <label for="">Комментарий</label>
            <textarea
              v-model="datas.comment"
              style="width:100%"
              rows="3"
            ></textarea>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import $ from "jquery";
import { print } from "../../components/mixins/print.js";
export default {
  mixins: [print],
  name: "ChiqimForm",
  data() {
    return {
      typelist: [
        { id: false, name: this.$t("Чиқим") },
        { id: true, name: this.$t("Кирим") }
      ],
      sklad: "",
      paytype: "",
      kontragent: "",
      skladlist: [],
      paytypelist: [],
      kontragentlist: []
    };
  },
  props: ["datas"],
  created() {
    let self = this;
    self.$root.$refs.oplata = self;
    self.$root.$on("skladone", function(getdata) {
      self.sklad = getdata;
    });
    self.$root.$on("skladall", function(getdata) {
      self.skladlist = getdata;
    });
    self.$root.$on("paytypeone", function(getdata) {
      self.paytype = getdata;
    });
    self.$root.$on("paytypeall", function(getdata) {
      self.paytypelist = getdata;
    });
    self.$root.$on("kontragentone", function(getdata) {
      self.kontragent = getdata;
    });
    self.$root.$on("kontragentall", function(getdata) {
      self.kontragentlist = getdata;
    });
  },
  mounted: function() {
    let self = this;
    self.Focus();
  },
  methods: {
    Kontragentchange() {
      let self = this;
      axios({
        method: "post",
        url: "api/v1/kontragent/total",
        data: {
          kontragent_id: self.datas.kontragent_id,
          sklad_id: self.datas.sklad_id,
          datetime: self.datas.datetime
        }
      }).then(function(response) {
        if (response.data.total != null) {
          self.datas.current_total = response.data.total;
        } else {
          self.datas.current_total = 0;
        }
      });
    },
    Focus() {
      this.$refs.focused.focus();
    },
    Selectkontragent(index) {
      this.$root.$emit("tableselect", index);
    },
    Selectpaytype(index) {
      this.$root.$emit("tableselect", index);
    },
    Savedokument() {
      let self = this;
      if (this.$route.path == "/oplata/create") {
        var methods = "post";
        var action = "api/v1/kontragent-pay";
      } else {
        var methods = "patch";
        var action = "api/v1/kontragent-pay/id/" + self.$route.params.id;
      }
      axios({
        method: methods,
        url: action,
        data: self.datas
      }).then(function(response) {
        self.$store.state.saved = null;
        self.$router.push({ name: "Тўлов" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
