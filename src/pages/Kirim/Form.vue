<template>
  <md-card>
    <div class="md-layout myheader">
      <div class="md-layout-item md-small-size-50 md-size-50 ">
        <h4 style="font-weight: bold;color:#3d464c;">
          {{ $t($route.name) }}
          <span v-if="$route.params.id != undefined"
            >№{{ $route.params.id }}</span
          >
          {{ Dates(datas.created_at) }}
        </h4>
      </div>
      <div class="md-layout-item md-small-size-50 md-size-50 end">
        <button class="mybtn btn" type="button" @click="Savedokument('save')">
          {{ $t("Сақлаш") }}
        </button>
        <a class="mybtn btn" href="javascript:void(0)" @click="RasxodXisob()"
          >Расход</a
        >
        <button class="mybtn btn addrow" type="button" @click="Addtable()">
          +<sup>F1</sup>
        </button>
        <button
          class="btn mybtn"
          id="chek"
          type="button"
          @click="Savedokument('print')"
        >
          <b-icon icon="printer"></b-icon>Чек<sup>F7</sup>
        </button>
        <button
          class="btn mybtn"
          id="chek"
          type="button"
          @click="Savedokument('barcode')"
        >
          <b-icon icon="upc-scan"></b-icon><sup></sup>
        </button>
        <button class="mybtn btn saved" type="button" @click="Savedokument()">
          {{ $t("Сақлаш ва беркитиш") }}<sup>F9</sup>
        </button>
        <router-link class="mybtn btn" :to="{ path: '/kirim/index' }"
          >{{ $t("Чиқиш") }} <sup>esc</sup>
        </router-link>
      </div>
    </div>
    <md-card-content>
      <div class="md-layout">
        <div class="md-layout-item md-small-size-15 md-size-15">
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
              <button type="button" class="modallist" v-b-modal.modal-skladlist>
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
        <div class="md-layout-item md-small-size-15 md-size-15">
          <label>{{ $t("Етказувчи") }}</label>
          <v-select
            :clearable="false"
            class="form-control-sm required md-input"
            :options="kontragentlist"
            v-model="datas.kontragent_id"
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
                ref="focused"
                v-bind="attributes"
                v-on="events"
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
        <div class="md-layout-item md-small-size-15 md-size-15">
          <label>{{ $t("Тўлов тури") }}</label>
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
        <div class="md-layout-item md-small-size-10 md-size-10">
          <label>Сумма</label>
          <div style="border-bottom:1px solid silver">
            {{ datas.summa | numFormat }}
          </div>
        </div>
        <div class="md-layout-item md-small-size-10 md-size-10">
          <label>{{ $t("Сони") }}</label>
          <div style="border-bottom:1px solid silver">
            {{ datas.count_all | numFormat }}
          </div>
        </div>
        <div class="md-layout-item md-small-size-10 md-size-10">
          <label>Расход</label>
          <input
            type="text"
            v-model.number="datas.rasxod_summa"
            class="table-input needt"
          />
        </div>
        <div class="md-layout-item md-small-size-10 md-size-10">
          <label>Скидка</label>
          <input
            type="text"
            v-model="datas.skidka_summa"
            class="table-input needt"
          />
        </div>
        <div class="md-layout-item md-small-size-15 md-size-15">
          <md-field>
            <label>Комментарий</label>
            <md-input
              v-model="datas.comment"
              class="needt"
              type="text"
            ></md-input>
          </md-field>
        </div>
      </div> 
      <table class="table table-bordered">
        <thead class="thead-light">
          <tr>
            <th class="column0">№</th>
            <th class="column2">Штрих код</th>
            <th class="column4">Товар</th>
            <th class="column1">{{ $t("Кол.") }}</th>
            <th class="column1">{{ $t("Қолдиқ") }}</th>
            <th class="column1">{{ $t("Нарх") }} ({{ $t("Етказувчи") }})</th>
            <th class="column2 kol">Сумма ({{ $t("Етказувчи") }})</th>
            <th class="column1">{{ $t("Нарх") }} ({{ $t("Кирим") }})</th>
            <th class="column2 kol">Сумма ({{ $t("Кирим") }})</th>
            <th class="column1">{{ $t("Чакана") }} (%)</th>
            <th class="column1">{{ $t("Чакана") }} ({{ $t("Нарх") }})</th>
            <th class="column1">{{ $t("Улгуржи") }} (%)</th>
            <th class="column1">{{ $t("Улгуржи") }} ({{ $t("Нарх") }})</th>
            <th class="column0"></th>
          </tr>
        </thead>
        <tbody style="overflow: hidden;">
          <div
            style="overflow-y: scroll; height: 58vh !important; width: 100%;"
          >
            <tr
              :style="{ height: `${index / 1000 + 10}px` }"
              v-for="(item, index) in datas.prixod_table"
              :key="index"
            >
              <td class="column0">{{ index + 1 }}</td>
              <td class="column2">
                <input
                  class="table-input"
                  style="text-align: left;"
                  type="text"
                  v-model="item.shtrix_kod"
                  @change="Shtrix(index)"
                />
              </td>
              <td class="column4">
                <v-select
                  v-if="productlist != null"
                  :filter-by="$store.state.myFilter"
                  :clearable="false"
                  class="form-control-sm required"
                  @search="query => (search = query)"
                  :options="paginated"
                  menu-props="auto"
                  v-model="item.product_id"
                  :reduce="extra_name => extra_name.id"
                  label="extra_name"
                  @input="Productchange(index)"
                >
                  <template #list-footer>
                    <li style="text-align: center;font-weight:bold;">
                      f4 {{ $t("умумий рўйхат") }}
                    </li>
                  </template>
                  <template #selected-option-container="{option}">
                    <div class="vs__selected">
                      <span v-if="typeof option.extra_name === 'number'">{{
                        Label(option.extra_name)
                      }}</span
                      ><span v-else>{{ option.extra_name }}</span>
                    </div>
                  </template>
                  <template #open-indicator="{ attributes }">
                    <span v-bind="attributes"></span>
                    <button
                      type="button"
                      class="modallist"
                      @click="Selectproduct(index)"
                    >
                      <b-icon icon="three-dots"></b-icon>
                    </button>
                  </template>
                  <template #selected-option="{ extra_name }">
                    <div style="position: absolute">
                      {{ extra_name }}
                    </div>
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
                        @click="CreateProduct(index, search)"
                      >
                        +</button
                      ><b>Insert</b>
                    </template>
                    <em style="opacity: 0.5" v-else>{{
                      $t("Маьлумот йўқ")
                    }}</em>
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
              <td class="column1">
                <vue-numeric
                  separator="space"
                  style="text-align: center;"
                  v-bind:precision="1"
                  v-model="item.count"
                  class="table-input"
                  @change="Changecount(index)"
                ></vue-numeric>
              </td>
              <td class="column1" style="text-align: center;">
                {{ item.current_balance | numFormat0 }}
              </td>
              <td class="column1">
                <vue-numeric
                  separator="space"
                  v-bind:precision="1"
                  style="text-align: center;"
                  v-model="item.kontragent_price"
                  class="table-input"
                  @change="Changeprice(index)"
                ></vue-numeric>
              </td>
              <td class="column2 kol">
                {{ item.kontragent_summa | numFormat }}
              </td>
              <td class="column1" style="text-align: center;">
                {{ item.debit_price | numFormat }}
              </td>
              <td class="column2 kol">{{ item.debit_summa | numFormat }}</td>
              <td class="column1">
                <vue-numeric
                  separator="space"
                  style="text-align: center;"
                  v-bind:precision="1"
                  v-model="item.chakana_percent"
                  class="table-input"
                  @change="Changepercentchakana(index)"
                ></vue-numeric>
              </td>
              <td class="column1">
                <vue-numeric
                  style="text-align: center;"
                  separator="space"
                  v-bind:precision="1"
                  v-model="item.chakana_price"
                  class="table-input needt"
                  @change="Changepricechakana(index)"
                ></vue-numeric>
              </td>
              <td class="column1">
                <vue-numeric
                  separator="space"
                  style="text-align: center;"
                  v-bind:precision="1"
                  v-model="item.optom_percent"
                  class="table-input"
                  @change="Changepercentoptom(index)"
                  @blur="Autoadd(index)"
                ></vue-numeric>
              </td>
              <td class="column1">
                <vue-numeric
                  style="text-align: center;"
                  separator="space"
                  v-bind:precision="1"
                  v-model="item.optom_price"
                  class="table-input needt"
                  @change="Changepriceoptom(index)"
                ></vue-numeric>
              </td>
              <td class="column0">
                <a
                  href="javascript:void(0)"
                  class="mybtn btn"
                  @click="Trashitem(index)"
                >
                  <b-icon icon="trash"></b-icon>
                </a>
              </td>
            </tr>
          </div>
        </tbody>
        <thead class="thead-light">
          <tr>
            <th style="width:34.5%;text-align: left!important;" colspan="3">
              Сумма
            </th>
            <th style="width: 5.5%;text-align: left!important;">
              {{ datas.count_all | numFormat }}
            </th>
            <th colspan="2" style="width: 10.5%;"></th>
            <th style="width: 10.5%;text-align: right!important;">
              {{ datas.summa | numFormat }}
            </th>
            <th colspan="6"></th>
          </tr>
        </thead>
      </table>
    </md-card-content>
    <b-modal
      id="modal-shtrix"
      title="Товар"
      hide-footer
      size="xl"
      @shown="Shoved"
      @hidden="Hide()"
    >
      <div class="row">
        <input
          type="text"
          class="form-control searchtable"
          v-bind:placeholder="$t('Қидирув')"
          v-model="filter"
          ref="inputText2"
        />
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>№</th>
              <th>{{ $t("Номи") }}</th>
              <th>{{ $t("Қолдиқ") }}</th>
              <th>{{ $t("Чакана") }} {{ $t("Нарх") }}</th>
              <th>{{ $t("Улгуржи") }} {{ $t("Нарх") }}</th>
              <th>Штрих</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in filteredRows" :key="index">
            <tr>
              <td>{{ index + 1 }}</td>
              <td>
                <button
                  type="button"
                  class="atable"
                  @click="
                    datas.prixod_table[settedindex].product_id =
                      item.product_id;
                    Productchange(settedindex);
                    $bvModal.hide('modal-shtrix');
                  "
                >
                  {{ item.extra_name }}
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="noborder"
                  @click="
                    datas.prixod_table[settedindex].product_id =
                      item.product_id;
                    Productchange(settedindex);
                    $bvModal.hide('modal-shtrix');
                  "
                >
                  {{ item.balance }}
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="noborder"
                  @click="
                    datas.prixod_table[settedindex].product_id =
                      item.product_id;
                    Productchange(settedindex);
                    $bvModal.hide('modal-shtrix');
                  "
                  v-if="item.price_register[0]"
                >
                  {{ item.price_register[0].chakana_price }}
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="noborder"
                  @click="
                    datas.prixod_table[settedindex].product_id =
                      item.product_id;
                    Productchange(settedindex);
                    $bvModal.hide('modal-shtrix');
                  "
                  v-if="item.price_register[0]"
                >
                  {{ item.price_register[0].optom_price }}
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="noborder"
                  @click="
                    datas.prixod_table[settedindex].product_id =
                      item.product_id;
                    Productchange(settedindex);
                    $bvModal.hide('modal-shtrix');
                  "
                  v-if="item.shtrix_table[0]"
                >
                  {{ item.shtrix_table[0].shtrix_kod }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-modal>
  </md-card>
</template>
<script>
// import VueAutoVirtualScrollList from "vue-auto-virtual-scroll-list";
import { print } from "../../components/mixins/print.js";
import $ from "jquery";
export default {
  // components: { VueAutoVirtualScrollList },
  name: "KirimForm",
  mixins: [print],
  data() {
    return {
      kontragent: "",
      shtrixlist: [],
      settedindex: null,
      sklad: "",
      paytype: "",
      filter: "",
      focusset: "",
      kontragentlist: [],
      skladlist: [],
      paytypelist: []
    };
  },
  props: ["datas"],
  created: function() {
    let self = this;
    self.$root.$refs.prixod = self;
    self.$root.$on("kontragentone", function(getdata) {
      self.kontragent = getdata;
    });
    self.$root.$on("kontragentall", function(getdata) {
      self.kontragentlist = getdata;
    });
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
    (window.onstorage = () => {
      if (localStorage.getItem("setted_product") > 0) {
        this.Productlist();
        this.datas.prixod_table[
          this.$store.state.selected_index
        ].product_id = parseInt(localStorage.getItem("setted_product"));
        if (this.$store.state.selected_index != null) {
          this.Productchange(this.$store.state.selected_index);
        }
        localStorage.setItem("setted_product", 0);
        setTimeout(() => {
          this.Next();
        }, 1000);
      }
    }),
      setTimeout(() => {
        localStorage.setItem("sklad_id_dok", this.datas.sklad_id);
        localStorage.setItem("created_at_dok", this.datas.created_at);
      }, 1000);
  },
  mounted: function() {
    this.Focus();
  },
  methods: {
    CreateProduct(index, search) {
      localStorage.setItem("product_name", search);
      localStorage.setItem("shtrix_code", this.datas.prixod_table[index].shtrix_kod);
      this.$store.state.selected_index = index;
      let routeData = this.$router.resolve({ name: "Товар модал create" });
      window.open(routeData.href, "_blank", "width=1200, height=1000");
    },
    handlerClose: function(event) {
      if (this.$store.state.saved == null) {
        this.$store.state.saved = null;
      } else {
        const answer = window.confirm(
          this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
        );
        if (answer) {
          this.Savedokument();
          event.returnValue = "";
        } else {
          this.$store.state.saved = null;
        }
      }
    },
    Autoadd(index) {
      if (this.datas.prixod_table.length == index + 1) {
        this.Addtable();
      }
    },
    Shoved() {
      let self = this;
      $(document).on("focusout", function(e) {
        if ($(e.target).attr("class") == "vs__search") {
          if (self.focusset == "") {
            self.focusset = e.target;
          }
        }
      });
      self.$refs.inputText2.focus();
    },
    Hide() {
      let self = this;
      setTimeout(function(e) {
        var classs = $(":focus");
        var rrr = $("body")
          .find("input,select,textarea,button")
          .filter(":visible");
        if (classs.attr("class") == "vs__search") {
          if (
            $(self.focusset)
              .siblings(".vs__selected")
              .attr("class") != undefined
          ) {
            var focused = rrr.eq(rrr.index(classs) + 2);
            focused.focus();
          } else {
            $(self.focusset).focus();
          }
        } else if (classs.attr("class") == undefined) {
          if (
            $(self.focusset)
              .siblings(".vs__selected")
              .attr("class") != undefined
          ) {
            focused = rrr.eq(rrr.index($(self.focusset)) + 3);
            focused.focus();
          } else {
            $(self.focusset).focus();
          }
        }
      }, 100);
    },
    Trashitem(index) {
      const answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
      if (answer) {
        this.datas.summa -= this.datas.prixod_table[index].kontragent_summa;
        this.datas.prixod_table.splice(index, 1);
      }
    },
    Productchange(index) {
      let self = this;
      var item = self.datas.prixod_table[index];
      item.optom_price = 0;
      item.chakana_price = 0;
      axios({
        method: "post",
        url: "api/v1/product/price-balance",
        data: { product_id: item.product_id, sklad_id: self.datas.sklad_id }
      }).then(function(response) {
        item.current_balance = response.data.balance;
        item.optom_price = response.data.optom_price;
        item.chakana_price = response.data.chakana_price;
        item.kontragent_price = response.data.delivery_price;
        item.debit_price = response.data.body_price;
        setTimeout(() => {
          self.Changeprice(index);
        }, 100);
      });
      // if (item.shtrix_kod == "") {
        axios({
          method: "get",
          url: "api/v1/product/id/" + item.product_id
        }).then(function(response) {
          if (response.data.shtrix_table[0]) {
            item.shtrix_kod = response.data.shtrix_table[0].shtrix_kod;
          }
        });
      // }
    },
    Focus() {
      if (this.$route.path == "/kirim/create") {
        this.$refs.focused.focus();
      } else {
        setTimeout(() => {
          $(".table-input")
          .eq(2)
          .focus();   
        }, 100);
        
      }
    },
    Shtrix(index) {
      let self = this;
      var shtrix = self.datas.prixod_table[index].shtrix_kod;
      axios({
        method: "post",
        url: "api/v1/product/shtrix2/" + shtrix,
        data: { sklad_id: self.datas.sklad_id }
      }).then(function(response) {
        if (!response.data[0]) {
        } else if (response.data[1]) {
          self.settedindex = index;
          self.shtrixlist = response.data;
          self.$bvModal.show("modal-shtrix");
        } else {
          self.datas.prixod_table[index].product_id =
            response.data[0].product_id;
          self.Productchange(index);
          var classs = $(":focus");
          var rrr = $("body")
            .find("input,select,textarea,button")
            .filter(":visible");
          var focused = rrr.eq(rrr.index(classs) + 2);
          focused.focus();
        }
      });
    },
    Selectproduct(index) {
      this.$store.state.selected_index = index;
      let routeData = this.$router.resolve({ name: "Товар модал" });
      window.open(routeData.href, "_blank", "width=1200, height=1000");
    },
    RasxodXisob() {
      if (this.datas.rasxod_summa != 0 && this.datas.summa) {
        var ortacharasxod = this.datas.rasxod_summa / this.datas.summa;
        this.datas.prixod_table.forEach(function(key, value) {
          key.debit_price =
            parseInt(key.kontragent_price) +
            key.kontragent_price * ortacharasxod;
          key.debit_summa = key.debit_price * key.count;
        });
      } else {
        this.datas.prixod_table.forEach(function(key, value) {
          key.debit_price = key.kontragent_price;
          key.debit_summa = key.debit_price * key.count;
        });
      }
    },
    Changeprice(index) {
      var item = this.datas.prixod_table[index];
      if (item.kontragent_price > 0) {
        item.debit_price = item.kontragent_price;
        item.debit_summa = item.debit_price * item.count;
      }
      if (item.optom_price > 0) {
        this.Changepriceoptom(index);
      }
      if (item.chakana_price > 0) {
        this.Changepricechakana(index);
      }
      item.kontragent_summa = item.kontragent_price * item.count;
      this.Summa();
    },
    Changecount(index) {
      var item = this.datas.prixod_table[index];
      if (item.kontragent_price > 0) {
        item.kontragent_summa = item.count * item.kontragent_price;
        // this.Changepricechakana(index);
        // this.Changepriceoptom(index);
      }
      if (item.debit_price > 0) {
        item.debit_summa = item.count * item.debit_price;
      }
      if (item.optom_price > 0) {
        item.optom_summa = item.count * item.optom_price;
      }
      if (item.chakana_price > 0) {
        item.chakana_summa = item.count * item.chakana_price;
      }
      this.Summa();
    },
    Changepercentoptom(index) {
      var item = this.datas.prixod_table[index];
      item.optom_price = item.debit_price * (item.optom_percent / 100 + 1);
      item.optom_summa = item.optom_price * item.count;
    },
    Changepercentchakana(index) {
      var item = this.datas.prixod_table[index];
      item.chakana_price =
        parseInt(item.debit_price) * (item.chakana_percent / 100 + 1);
      item.chakana_summa = item.chakana_price * item.count;
    },
    Changepriceoptom(index) {
      var item = this.datas.prixod_table[index];
      if (item.debit_price > 0) {
        item.optom_percent = (item.optom_price / item.debit_price) * 100 - 100;
        item.optom_summa = item.optom_price * item.count;
      }
    },
    Changepricechakana(index) {
      var item = this.datas.prixod_table[index];
      if (item.debit_price > 0) {
        item.chakana_percent =
          (item.chakana_price / item.debit_price) * 100 - 100;
        item.chakana_summa = item.chakana_price * item.count;
      }
    },
    Addtable() {
      this.datas.prixod_table.push({
        product_id: 0,
        current_balance: 0,
        count: 0,
        debit_price: 0,
        debit_summa: 0,
        kontragent_price: 0,
        kontragent_summa: 0,
        chakana_percent: 0,
        optom_percent: 0,
        chakana_price: 0,
        optom_price: 0,
        chakana_summa: 0,
        optom_summa: 0,
        shtrix_kod: ""
      });
    },
    Summa() {
      this.datas.summa = 0;
      this.datas.count_all = 0;
      let self = this;
      this.datas.prixod_table.forEach(function(key, value) {
        self.datas.summa += parseInt(key.kontragent_summa);
        self.datas.count_all += parseInt(key.count);
      });
    },
    Savedokument(type = "default") {
      let self = this;
      if (this.$route.path == "/kirim/create") {
        var methods = "post";
        var action = "api/v1/prixod";
        self.Summa();
      } else {
        var methods = "patch";
        var action = "api/v1/prixod/id/" + self.$route.params.id;
        if(self.$store.state.saved==1){
          self.Summa();
          self.datas.updated_at = new Date()
        .valueOf()
        .toString()
        .slice(0, 10);
        }
      }
      axios({
        method: methods,
        url: action,
        data: self.datas
      }).then(function(response) {
        self.$store.state.saved = null;
        if (type == "print") {
          let routeData = self.$router.resolve({
            name: "printprixod",
            query: { id: response.data.id}
          });
          let myWindow;
          myWindow = window.open(
            '#/kirim/print/'+response.data.id,
            "_blank",
            "width=1000, height=1000"
          );
          self.$router.push({ name: "Кирим" });
        } else if (type == "save") {
          self.$router.push({ path: "/kirim/update/" + response.data.id });
        } else if(type=='barcode'){
          let myWindow;
          myWindow = window.open(
            '#/kirim/barcode/'+response.data.id,
            "_blank",
            "width=500, height=800"
          );
        }
        else {
          self.$router.push({ name: "Кирим" });
        }
      });
    }
  },
  computed: {
    filteredRows() {
      return this.shtrixlist.filter(row => {
        const name = row.name.toString().toLowerCase();
        const searchTerm = this.filter.toLowerCase();

        return name.includes(searchTerm);
      });
    }
  }
};
</script>
