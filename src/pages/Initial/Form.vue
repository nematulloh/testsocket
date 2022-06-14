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
        <button type="button" class="btn mybtn" @click="onexport">
          <b-icon icon="cloud-download"></b-icon> {{ $t("Excel(Юклаш)") }}
        </button>
        <button class="mybtn btn addrow" type="button" @click="Addtable()">
          + <sup>F1</sup>
        </button>
        <button class="mybtn btn saved" type="button" @click="Savedokument()">
          {{ $t("Сақлаш ва беркитиш") }}<sup>F9</sup>
        </button>
        <router-link class="mybtn btn" :to="{ path: '/initial/index' }"
          >{{ $t("Чиқиш") }} <sup>esc</sup>
        </router-link>
      </div>
    </div>
    <md-card-content id="tableId">
      <div class="md-layout">
        <div class="md-layout-item md-small-size-20 md-size-20">
          <md-field>
            <label>{{ $t("Вақт") }}</label>
            <md-input v-model="datas.create_time" type="date"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-20 md-size-20">
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
                ref="focused"
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
        <div class="md-layout-item md-small-size-20 md-size-20">
          <label>Сумма</label><br />
          <div style="border-bottom:1px solid silver">
            {{ datas.summa | numFormat }}
          </div>
        </div>
        <div class="md-layout-item md-small-size-20 md-size-20">
          <label>{{ $t("Сони") }}</label
          ><br />
          <div style="border-bottom:1px solid silver">
            {{ datas.count_all | numFormat }}
          </div>
        </div>
        <div class="md-layout-item md-small-size-20 md-size-20">
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
            <th class="column5">Товар</th>
            <th class="column1">{{ $t("Cони") }}</th>
            <th class="column1">{{ $t("Нарх") }} ({{ $t("Кирим") }})</th>
            <th class="column2">Сумма ({{ $t("Кирим") }})</th>
            <th class="column1">{{ $t("Чакана") }}(%)</th>
            <th class="column1">{{ $t("Чакана") }} ({{ $t("Нарх") }})</th>
            <th class="column1">{{ $t("Улгуржи") }} (%)</th>
            <th class="column1">{{ $t("Улгуржи") }} ({{ $t("Нарх") }})</th>
            <th class="column1"></th>
          </tr>
        </thead>
        <tbody style="overflow: hidden;">
          <VueAutoVirtualScrollList
            :totalHeight="500"
            class="virtual"
            :defaultHeight="50"
            style="width: 100%;height: 70vh!important;"
          >
            <tr
              :style="{ height: `${index / 1000 + 10}px` }"
              v-for="(item, index) in filterlist"
              :key="index"
            >
              <td class="column0">{{ index + 1 }}</td>
              <td class="column2">
                <input
                  class="table-input"
                  type="text"
                  v-model="item.shtrix_kod"
                  @change="Shtrix(index)"
                />
              </td>
              <td class="column5">
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
                  v-model="item.count"
                  class="table-input"
                  @change="Changecount(index)"
                  v-bind:precision="0"
                >
                </vue-numeric>
              </td>
              <td class="column1">
                <vue-numeric
                  separator="space"
                  style="text-align: center;"
                  v-model="item.debit_price"
                  class="table-input"
                  @change="Changeprice(index)"
                  v-bind:precision="0"
                >
                </vue-numeric>
              </td>
              <td class="column2 kol">{{ item.debit_summa | numFormat }}</td>
              <td class="column1">
                <vue-numeric
                  separator="space"
                  style="text-align: center;"
                  v-model="item.chakana_percent"
                  class="table-input"
                  @blur="Changepercentchakana(index)"
                  v-bind:precision="0"
                >
                </vue-numeric>
              </td>
              <td class="column1">
                <vue-numeric
                  separator="space"
                  style="text-align: center;"
                  v-model="item.chakana_price"
                  class="table-input needt"
                  @blur="Changepricechakana(index)"
                  v-bind:precision="0"
                >
                </vue-numeric>
              </td>
              <td class="column1">
                <vue-numeric
                  separator="space"
                  style="text-align: center;"
                  v-model="item.optom_percent"
                  class="table-input"
                  @blur="Changepercentoptom(index)"
                  v-bind:precision="0"
                >
                </vue-numeric>
              </td>
              <td class="column1">
                <vue-numeric
                  separator="space"
                  style="text-align: center;"
                  v-model="item.optom_price"
                  class="table-input needt"
                  @blur="Changepriceoptom(index)"
                  v-bind:precision="0"
                  >
                </vue-numeric>
              </td>
              <td class="column1">
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
        <thead class="thead-light">
          <tr>
            <th style="width:45.5%;text-align: left!important;" colspan="3">
              Сумма
            </th>
            <th style="width: 6.3%;text-align: left!important;">
              {{ datas.count_all | numFormat }}
            </th>
            <th style="width: 6%;"></th>
            <th style="width: 12.1%;text-align: right!important;">
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
                    datas.initial_balance_table[settedindex].product_id =
                      item.product_id;
                    Productchange(settedindex);
                    $bvModal.hide('modal-shtrix');
                  "
                >
                  {{ item.name }}
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="noborder"
                  @click="
                    datas.initial_balance_table[settedindex].product_id =
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
                    datas.initial_balance_table[settedindex].product_id =
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
                    datas.initial_balance_table[settedindex].product_id =
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
                    datas.initial_balance_table[settedindex].product_id =
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
import { print } from "../../components/mixins/print.js";
import XLSX from "xlsx";
import VueAutoVirtualScrollList from "vue-auto-virtual-scroll-list";
import $ from "jquery";
export default {
  name: "KirimForm",
  mixins: [print],
  data() {
    return {
      shtrixlist: [],
      settedindex: null,
      sklad: "",
      paytype: "",
      limit: 100,
      filter: "",
      focusset: "",
      skladlist: [],
      paytypelist: []
    };
  },
  props: ["datas"],
  components: { VueAutoVirtualScrollList },
  created: function() {
    let self = this;
    self.$root.$refs.initial = self;
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
  },
  mounted: function() {
    let self = this;
    $(".virtual").scroll(function() {
      var scroll = $(this).scrollTop() + 1000;
      var height = $(this).prop("scrollHeight");
      if (scroll > height) {
        self.limit += 100;
      }
    });
    (window.onstorage = () => {
      if (localStorage.getItem("setted_product") > 0) {
        this.Productlist();
        this.datas.initial_balance_table[
          this.$store.state.selected_index
        ].product_id = parseInt(localStorage.getItem("setted_product"));
        this.Productchange(this.$store.state.selected_index);
        localStorage.setItem("setted_product", 0);
        setTimeout(() => {
          this.Next();
        }, 1000);
      }
    }),
      setTimeout(() => {
        localStorage.setItem("sklad_id_dok", this.datas.sklad_id);
        localStorage.setItem(
          "created_at_dok",
          this.Dates(this.datas.created_at)
        );
      }, 1000);
    this.Focus();
  },
  methods: {
    onexport() {
      const myHeader = [
        "shtrix_kod",
        "product",
        "count",
        "debit_price",
        "debit_summa",
        "chakana_percent",
        "chakana_price",
        "optom_percent",
        "optom_price"
      ];
      var shtrix_kod = XLSX.utils.json_to_sheet(
        this.datas.initial_balance_table,
        { header: myHeader }
      );
      var wb = XLSX.utils.book_new();
      let self = this;
      shtrix_kod["A1"].v = "Штрих";
      shtrix_kod["B1"].v = "Товар";
      shtrix_kod["C1"].v = this.$t("Cони");
      shtrix_kod["D1"].v = this.$t("Нарх") + " " + this.$t("Кирим");
      shtrix_kod["E1"].v = "Сумма " + this.$t("Кирим");
      shtrix_kod["F1"].v = this.$t("Чакана") + " %";
      shtrix_kod["G1"].v = this.$t("Чакана") + " " + this.$t("Нарх");
      shtrix_kod["H1"].v = this.$t("Улгуржи") + " %";
      shtrix_kod["I1"].v = this.$t("Улгуржи") + " " + this.$t("Нарх");
      for (
        let index = 2;
        index < this.datas.initial_balance_table.length + 2;
        index++
      ) {
        if (self.datas.initial_balance_table[index - 2].product != null) {
          shtrix_kod["B" + index].v =
            self.datas.initial_balance_table[index - 2].product.extra_name;
        }
      }
      XLSX.utils.book_append_sheet(wb, shtrix_kod, "bosh_qoldiq");
      XLSX.writeFile(wb, new Date() + ".xlsx"); // name of the file is 'book.xlsx'
    },
    CreateProduct(index, search) {
      localStorage.setItem("product_name", search);
      this.$store.state.selected_index = index;
      let routeData = this.$router.resolve({ name: "Товар модал create" });
      window.open(routeData.href, "_blank", "width=1200, height=1000");
    },
    updateItems(text) {
      yourGetItemsMethod(text).then(response => {
        this.$store.state.productlist = response;
      });
    },
    ChangedAndAdd(index) {
      if (this.datas.initial_balance_table.length == index + 1) {
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
        this.datas.summa -= this.datas.initial_balance_table[index].debit_summa;
        this.datas.initial_balance_table.splice(index, 1);
        this.Summa();
      }
    },
    Productchange(index) {
      let self = this;
      var item = self.datas.initial_balance_table[index];
      axios({
        method: "post",
        url: "api/v1/product/price-balance",
        data: { product_id: item.product_id, sklad_id: self.datas.sklad_id }
      }).then(function(response) {
        item.optom_price = response.data.optom_price;
        item.chakana_price = response.data.chakana_price;
        item.debit_price = response.data.body_price;
      });
      self.Setshtrix1(item);
    },
    Focus() {
      $(".table-input")
        .eq(0)
        .focus();
    },
    Shtrix(index) {
      let self = this;
      var shtrix = self.datas.initial_balance_table[index].shtrix_kod;
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
          self.datas.initial_balance_table[index].product_id =
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
    Changeprice(index) {
      var item = this.datas.initial_balance_table[index];
      if (item.debit_price != 0) {
        item.debit_summa = item.debit_price * item.count;
      }
      if (item.optom_price > 0) {
        this.Changepriceoptom(index);
      }
      if (item.chakana_price > 0) {
        this.Changepricechakana(index);
      }
      this.Summa();
    },
    Changecount(index) {
      var item = this.datas.initial_balance_table[index];
      if (item.debit_price > 0) {
        item.debit_summa = item.count * item.debit_price;
        this.Changepricechakana(index);
        this.Changepriceoptom(index);
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
      var item = this.datas.initial_balance_table[index];
      item.optom_price = parseFloat(item.debit_price) * (parseFloat(item.optom_percent) / 100 + 1);
      item.optom_summa = item.optom_price * item.count;
      this.ChangedAndAdd(index);
    },
    Changepercentchakana(index) {
      var item = this.datas.initial_balance_table[index];
      item.chakana_price =
        parseFloat(item.debit_price) * (item.chakana_percent / 100 + 1);
      item.chakana_summa = item.chakana_price * item.count;
    },
    Changepriceoptom(index) {
      var item = this.datas.initial_balance_table[index];
      item.optom_percent = (item.optom_price / item.debit_price) * 100 - 100;
      item.optom_summa = item.optom_price * item.count;
    },
    Changepricechakana(index) {
      var item = this.datas.initial_balance_table[index];
      item.chakana_percent =
        (item.chakana_price / item.debit_price) * 100 - 100;
      item.chakana_summa = item.chakana_price * item.count;
    },
    Addtable() {
      this.datas.initial_balance_table.push({
        product: null,
            product_id: 0,
            count: 0,
            debit_price: 0,
            chakana_percent: 0,
            optom_percent: 0,
            chakana_price: 0,
            optom_price: 0,
            chakana_summa: 0,
            optom_summa: 0,
            debit_summa:0,
      });
    },
    Summa() {
      this.datas.summa = 0;
      this.datas.count_all = 0;
      let self = this;
      this.datas.initial_balance_table.forEach(function(key, value) {
        self.datas.summa += parseInt(key.debit_summa);
        self.datas.count_all += parseInt(key.count);
      });
    },
    Savedokument() {
      let self = this;
      if (this.$route.path == "/initial/create") {
        var methods = "post";
        var action = "api/v1/initial-balance";
      } else {
        var methods = "patch";
        var action = "api/v1/initial-balance/id/" + self.$route.params.id;
      }
      self.datas.updated_at = new Date()
        .valueOf()
        .toString()
        .slice(0, 10);
      self.datas.created_at = new Date(self.datas.create_time)
        .valueOf()
        .toString()
        .slice(0, 10);
      axios({
        method: methods,
        url: action,
        data: self.datas
      }).then(function(response) {
        self.$store.state.saved = null;
        self.$router.push({ name: "Бошланғич" });
      });
    }
  },
  computed: {
    filterlist() {
      if(this.datas.initial_balance_table){
      return this.datas.initial_balance_table.slice(0, this.limit);
      }
    },
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
