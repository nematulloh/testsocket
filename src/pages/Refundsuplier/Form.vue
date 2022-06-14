<template>
  <md-card>
    <div class="md-layout myheader">
      <div class="md-layout-item md-small-size-50 md-size-50">
        <h4 style="font-weight: bold;color:#3d464c;">
          {{ $t($route.name) }}
          <span v-if="$route.params.id != undefined"
            >№{{ $route.params.id }}</span
          >
          {{ Dates(datas.created_at) }}
        </h4>
      </div>
      <div class="md-layout-item md-small-size-50 md-size-50 end">
        <button class="mybtn btn" type="button" @click="Savedokument('print')">
          <b-icon icon="printer"></b-icon>
        </button>
        <button class="mybtn btn addrow" type="button" @click="Addtable()">
          +<sup>F1</sup>
        </button>
        <button class="mybtn btn saved" type="button" @click="Savedokument()">
          {{ $t("Сақлаш ва беркитиш") }}<sup>F9</sup>
        </button>
        <router-link
          class="mybtn btn esc"
          :to="{ path: '/refundsuplier/index' }"
          >{{ $t("Чиқиш") }} <sup>esc</sup>
        </router-link>
      </div>
    </div>
    <md-card-content>
      <div class="md-layout">
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
                v-bind="attributes"
                v-on="events"
                id="etkaz"
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
        <div class="md-layout-item md-small-size-20 md-size-20">
          <label>Сумма</label>
          <div style="border-bottom:1px solid silver">
            {{ datas.summa | numFormat }}
          </div>
        </div>
        <div class="md-layout-item md-small-size-20 md-size-20">
          <label>{{ $t("Сони") }}</label>
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
            <th>Товар</th>
            <th class="column2">{{ $t("Кол.") }}</th>
            <th class="column2">{{ $t("Қолдиқ") }}</th>
            <th class="column3">{{ $t("Нарх") }}</th>
            <th class="column4">Сумма</th>
            <th class="column0"></th>
          </tr>
        </thead>
        <tbody style="overflow: hidden;">
          <div
            style="overflow-y: scroll; height: 70vh !important; width: 100%;"
          >
            <tr
              v-for="(item, index) in datas.refund_supplier_table"
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
              <td>
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
              <td class="column2">
                <input type="text"
                  separator="space"
                  v-model="item.count"
                  class="table-input"
                  @input="Changecount(index)"
                  v-bind:precision="0"
                >
              </td>
              <td class="column2 kol">
                {{ item.current_balance | numFormat }}
              </td>
              <td class="column3 kol">
                {{ item.price | numFormat }}
              </td>
              <td class="column4 kol">{{ item.summa | numFormat }}</td>
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
                    datas.refund_supplier_table[settedindex].product_id =
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
                    datas.refund_supplier_table[settedindex].product_id =
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
                    datas.refund_supplier_table[settedindex].product_id =
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
                    datas.refund_supplier_table[settedindex].product_id =
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
                    datas.refund_supplier_table[settedindex].product_id =
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
import $ from "jquery";
import { print } from "../../components/mixins/print.js";
export default {
  name: "RefundForm",
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
      paytypelist: [],
      regionlist: [],
      showDialog: false
    };
  },
  props: ["datas"],
  created: function() {
    let self = this;
    self.$root.$refs.refundsuplier = self;
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
  },
  mounted: function() {
    (window.onstorage = () => {
      if (localStorage.getItem("setted_product") > 0) {
        this.Productlist();
        this.datas.refund_supplier_table[
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
        localStorage.setItem("created_at_dok", this.datas.created_at);
      }, 1000);
    this.Focus();
  },
  methods: {
    CreateProduct(index, search) {
      localStorage.setItem("product_name", search);
      this.$store.state.selected_index = index;
      let routeData = this.$router.resolve({ name: "Товар модал" });
      window.open(routeData.href, "_blank", "width=1200, height=1000");
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
        this.datas.summa -= this.datas.refund_supplier_table[
          index
        ].kontragent_summa;
        this.datas.refund_supplier_table.splice(index, 1);
        this.Summa();
      }
    },
    Productchange(index) {
      let self = this;
      var item = self.datas.refund_supplier_table[index];
      item.price = 0;
      axios({
        method: "post",
        url: "api/v1/product/price-balance",
        data: { product_id: item.product_id, sklad_id: self.datas.sklad_id }
      }).then(function(response) {
        item.current_balance = response.data.balance;
        item.price = response.data.body_price;
      });
      self.Changeprice(index);
      self.Setshtrix1(item);
    },
    Focus() {
      if (this.$route.path == "/refundsuplier/create") {
        $("#etkaz").focus();
      } else {
        setTimeout(() => {
          $(".table-input")
            .eq(0)
            .focus();
        }, 100);
      }
    },
    Shtrix(index) {
      let self = this;
      var shtrix = self.datas.refund_supplier_table[index].shtrix_kod;
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
          self.datas.refund_supplier_table[index].product_id =
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
      let routeData = this.$router.resolve({ name: "Товар модал create" });
      window.open(routeData.href, "_blank", "width=1200, height=1000");
    },
    Changeprice(index) {
      var item = this.datas.refund_supplier_table[index];
      if (item.count > 0) {
        item.summa = item.price * item.count;
        if (this.datas.refund_supplier_table.length == index + 1) {
          this.Addtable();
        }
      }
      this.Summa();
    },
    Changecount(index) {
      var item = this.datas.refund_supplier_table[index];
      let self = this;
      if (item.current_balance < item.count) {
        item.count = item.current_balance;
        self.$store.state.errors = "Қолдиқ мавжуд емас";
      }
      if (item.price > 0) {
        this.Changeprice(index);
      }
    },
    Addtable() {
      this.datas.refund_supplier_table.push({
        product_id: 0,
        count: 0,
        price: 0,
        summa: 0,
        shtrix_kod: null,
        current_balance: 0
      });
    },
    Summa() {
      this.datas.summa = 0;
      this.datas.count_all = 0;
      let self = this;
      this.datas.refund_supplier_table.forEach(function(key, value) {
        self.datas.summa += parseInt(key.summa);
        self.datas.count_all += parseInt(key.count);
      });
    },
    Savedokument(type) {
      var type;
      let self = this;
      if (this.$route.path == "/refundsuplier/create") {
        var methods = "post";
        var action = "api/v1/refund-supplier";
        self.datas.updated_at = new Date()
        .valueOf()
        .toString()
        .slice(0, 10);
      } else {
        var methods = "patch";
        var action = "api/v1/refund-supplier/id/" + self.$route.params.id;
        if(self.$store.state.saved==1){
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
          let myWindow;
          myWindow = window.open(
            '#/refundsuplier/print/'+response.data.id,
            "_blank",
            "width=1000, height=1000"
          );
        }
        self.$router.push({ name: "Возврат поставшик" });
        
      });
    }
  },
  computed: {
    SelectedProduct() {
      return this.$store.state.selected_product;
    },
    filteredRows() {
      return this.shtrixlist.filter(row => {
        const name = row.name.toString().toLowerCase();
        const searchTerm = this.filter.toLowerCase();

        return name.includes(searchTerm);
      });
    }
  },
  watch: {
    "$store.state.changed": function() {
      if (this.$store.state.changed != null) {
        this.Productchange(this.$store.state.selected_index);
        this.$store.state.changed = null;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.md-card-content > .table.table-bordered tbody {
  display: block;
  height: 70vh;
  overflow-y: scroll;
}

.md-card-content > .table.table-bordered thead,
.md-card-content > .table.table-bordered tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}
</style>
