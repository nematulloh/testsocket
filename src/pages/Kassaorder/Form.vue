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
          <button
            class="mybtn btn addrow"
            type="button"
            @click="Addtable(datas.kassa_order_table.length - 1)"
          >
            +<sup>F1</sup>
          </button>
          <button type="button" class="mybtn btn saved" @click="Savedokument()">
            {{ $t("Сақлаш ва беркитиш") }} <sup>F9</sup>
          </button>
          <router-link class="mybtn btn" :to="{ path: '/kassaorder/index' }"
            >{{ $t("Чиқиш") }} <sup>esc</sup></router-link
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
                <em style="opacity: 0.5" v-else>Маьлумот йўқ</em>
              </template>
            </v-select>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <label>Сумма</label>
            <div style="border-bottom:1px solid silver">
              {{ datas.summa | numFormat }}
            </div>
          </div>
        </div>
        <table class="table table-bordered">
          <thead class="thead-light">
            <tr>
              <th>№</th>
              <th>Асос</th>
              <th>Тўлов тури</th>
              <th>Тури</th>
              <th>Сумма</th>
              <th>Комментарий</th>
              <th></th>
            </tr>
          </thead>
          <tbody style="overflow: hidden;">
            <VueAutoVirtualScrollList
              :totalHeight="500"
              :defaultHeight="50"
              style="width: 100%;height: 70vh!important;"
            >
              <tr
                :style="{ height: `${index / 1000 + 10}px` }"
                v-for="(item, index) in datas.kassa_order_table"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  <v-select
                    :clearable="false"
                    class="form-control-sm required"
                    :options="baselist"
                    v-model="item.base_id"
                    :reduce="name => name.id"
                    label="name"
                    required="true"
                  >
                    <template #list-footer>
                      <li style="text-align: center;font-weight:bold;">
                        f4 {{ $t("умумий рўйхат") }}
                      </li>
                    </template>
                    <template #open-indicator="{ attributes }">
                      <span v-bind="attributes"></span>
                      <button
                        type="button"
                        class="modallist"
                        @click="Selectbase(index)"
                        v-b-modal.modal-baselist
                      >
                        <b-icon icon="three-dots"></b-icon>
                      </button>
                    </template>
                    <template #selected-option="{ name }">
                      <div style="max-width:200px;position:absolute;">
                        {{ name }}
                      </div>
                    </template>
                    <template v-slot:no-options="{ search, searching }">
                      <template v-if="searching">
                        <em
                          ><b>{{ search }}</b></em
                        >
                        бўйича маьлумот йўқ
                        <button
                          type="button"
                          @click="
                            base.name = search;
                            Selectbase(index);
                          "
                          class="pluss"
                          v-b-modal.modal-base
                        >
                          +(insert)
                        </button>
                      </template>
                      <em style="opacity: 0.5;" v-else>Маьлумот йўқ</em>
                    </template>
                    <template #search="{ search, searching }">
                      <template v-if="searching">
                        <em
                          ><b>{{ search }}</b></em
                        >
                        <input
                          class="vs__search"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </template>
                  </v-select>
                </td>
                <td>
                  <v-select
                    :clearable="false"
                    class="form-control-sm required"
                    :options="paytypelist"
                    v-model="item.pay_type_id"
                    :reduce="name => name.id"
                    label="name"
                    required="true"
                  >
                  </v-select>
                </td>
                <td>
                  <v-select
                    :clearable="false"
                    class="form-control-sm required"
                    :options="typelist"
                    v-model="item.type"
                    :reduce="name => name.id"
                    label="name"
                    required="true"
                  ></v-select>
                </td>
                <td>
                  <vue-numeric
                    separator="space"
                    v-model="item.summa"
                    @change="Summa()"
                    style="text-align: right;"
                    class="table-input"
                    v-bind:precision="0"
                  ></vue-numeric>
                </td>
                <td>
                  <input
                    v-model="item.comment"
                    style="width:100%"
                    class="table-input"
                    @keyup.enter="Addtable(index)"
                  />
                </td>
                <td>
                  <a
                    href="javascript:void(0)"
                    class="mybtn btn"
                    @click="Trashitem(index)"
                  >
                    <b-icon icon="trash"></b-icon>
                  </a>
                </td>
              </tr>
            </VueAutoVirtualScrollList>
          </tbody>
        </table>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import $ from "jquery";
import { print } from "../../components/mixins/print.js";
import VueAutoVirtualScrollList from "vue-auto-virtual-scroll-list";
export default {
  components: { VueAutoVirtualScrollList },
  name: "KassaorderForm",
  mixins: [print],
  data() {
    return {
      typelist: [
        { id: false, name: "Чиқим" },
        { id: true, name: "Кирим" }
      ],
      sklad: "",
      paytype: "",
      base: "",
      skladlist: [],
      paytypelist: [],
      baselist: []
    };
  },
  props: ["datas", "errors"],
  created() {
    let self = this;
    self.$root.$refs.order = self;
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
    self.$root.$on("baseone", function(getdata) {
      self.base = getdata;
    });
    self.$root.$on("baseall", function(getdata) {
      self.baselist = getdata;
    });
  },
  mounted: function() {
    let self = this;
    setTimeout(() => {
      self.Focus();
    }, 100);
  },
  methods: {
    Summa() {
      this.datas.summa = 0;
      let self = this;
      this.datas.kassa_order_table.forEach(function(key, value) {
        self.datas.summa += parseInt(key.summa);
      });
    },
    Focus() {
      $(".vs__search")
        .eq(1)
        .focus();
    },
    Selectbase(index) {
      this.$store.state.selected_index = index;
    },
    Selectpaytype(index) {
      this.$root.$emit("tableselect", index);
    },
    Addtable(index) {
      if (this.datas.kassa_order_table.length == index + 1 || index < 0) {
        this.datas.kassa_order_table.push({
          base_id: 0,
          summa: 0,
          pay_type_id: 0,
          type: false,
          comment: ""
        });
      }
    },
    Trashitem(index) {
      const answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
      if (answer) {
        this.datas.kassa_order_table.splice(index, 1);
      }
    },
    Savedokument() {
      let self = this;
      if (this.$route.path == "/kassaorder/create") {
        var methods = "post";
        var action = "api/v1/kassa-order";
      } else {
        var methods = "patch";
        var action = "api/v1/kassa-order/id/" + self.$route.params.id;
      }
      axios({
        method: methods,
        url: action,
        data: self.datas
      }).then(function(response) {
        self.$store.state.saved = null;
        self.$router.push({ name: "Кассовий ордер" });
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
