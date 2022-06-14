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
        <button class="mybtn btn" type="button" v-b-modal.modal-doklist>
          {{ $t("Док юклаш") }}
        </button>
        <button class="mybtn btn addrow" type="button" @click="Addtable()">
          +<sup>F1</sup>
        </button>
        <b-spinner smal v-if="sending"></b-spinner>
        <button
          class="mybtn btn saved"
          type="button"
          :disabled="sending"
          @click="Savedokument()"
        >
          {{ $t("Сақлаш ва беркитиш") }}<sup>F9</sup>
        </button>
        <router-link class="mybtn btn esc" :to="{ path: '/transfer/index' }"
          >{{ $t("Чиқиш") }} <sup>esc</sup>
        </router-link>
      </div>
    </div>
    <md-card-content>
      <div class="md-layout">
        <div class="md-layout-item md-small-size-20 md-size-20">
          <label>Склад1</label>
          <v-select
            :clearable="false"
            class="form-control-sm required md-input"
            :options="skladlist"
            v-model="datas.sklad_id"
            :reduce="name => name.id"
            label="name"
            @input="Doklist()"
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
          <label>Склад2</label>
          <v-select
            :clearable="false"
            class="form-control-sm required md-input"
            :options="skladlist"
            v-model="datas.transfer_sklad_id"
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
        <div class="md-layout-item md-small-size-10 md-size-10">
          <label>Сумма</label>
          <div style="border-bottom:1px solid silver">
            {{ datas.summa | numFormat }}
          </div>
        </div>
        <div class="md-layout-item md-small-size-10 md-size-10">
          <label>{{ $t("Cони") }}</label>
          <div style="border-bottom:1px solid silver">
            {{ datas.count_all | numFormat }}
          </div>
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
            <th class="column1">Штрих код</th>
            <th>Товар</th>
            <th class="column1">{{ $t("Кол.") }}</th>
            <th class="column1">{{ $t("Қолдиқ") }}</th>
            <th class="column2">{{ $t("Нарх") }} ({{ $t("Кирим") }})</th>
            <th class="column2">Сумма ({{ $t("Кирим") }})</th>
            <th class="column1">{{ $t("Чакана") }} (%)</th>
            <th class="column2">{{ $t("Чакана") }}({{ $t("Нарх") }})</th>
            <th class="column1">{{ $t("Улгуржи") }} (%)</th>
            <th class="column1">{{ $t("Улгуржи") }} ({{ $t("Нарх") }})</th>
            <th class="column0"></th>
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
              v-for="(item, index) in datas.transfer_table"
              :key="index"
            >
              <td class="column0">{{ index + 1 }}</td>
              <td class="column1">
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
                  <template #selected-option-container="{ option}">
                    <div class="vs__selected">
                      <span v-if="typeof option.extra_name === 'number'">{{
                        Label(option.extra_name)
                      }}</span
                      ><span v-else>{{ option.extra_name }}</span>
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
              <td class="column1">{{ item.current_balance | numFormat }}</td>
              <td class="column2">
                <input
                  type="text"
                  separator="space"
                  v-model="item.debit_price"
                  class="table-input"
                  @change="Changeprice(index)"
                  v-bind:precision="0"
                />
              </td>
              <td class="column2">{{ item.debit_summa | numFormat }}</td>
              <td class="column1">
                <vue-numeric
                  separator="space"
                  v-model="item.chakana_percent"
                  class="table-input"
                  @change="Changepercentchakana(index)"
                  v-bind:precision="0"
                ></vue-numeric>
              </td>
              <td class="column2">
                <vue-numeric
                  separator="space"
                  v-model="item.chakana_price"
                  class="table-input needt"
                  @change="Changepricechakana(index)"
                  v-bind:precision="0"
                ></vue-numeric>
              </td>
              <td class="column1">
                <vue-numeric
                  separator="space"
                  v-model="item.optom_percent"
                  class="table-input"
                  @change="Changepercentoptom(index)"
                  v-bind:precision="0"
                ></vue-numeric>
              </td>
              <td class="column1">
                <vue-numeric
                  separator="space"
                  v-model="item.optom_price"
                  class="table-input needt"
                  @change="Changepriceoptom(index)"
                  v-on:keypress.native="Changeoptomprice(index)"
                  v-bind:precision="0"
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
          </VueAutoVirtualScrollList>
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
                    datas.transfer_table[settedindex].product_id =
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
                    datas.transfer_table[settedindex].product_id =
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
                    datas.transfer_table[settedindex].product_id =
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
                    datas.transfer_table[settedindex].product_id =
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
                    datas.transfer_table[settedindex].product_id =
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
    <b-modal
      id="modal-doklist"
      title="Приход"
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
          v-model="filter1"
          ref="inputText2"
        />
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>№</th>
              <th>Ид</th>
              <th>{{ $t("Вақт") }}</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in filtereddok" :key="index">
            <tr>
              <td>{{ index + 1 }}</td>
              <td>
                <button
                  type="button"
                  :disabled="sending"
                  class="atable"
                  @click="SetDok(item.id)"
                >
                  {{ item.id }}
                </button>
              </td>
              <td>
                <button
                  type="button"
                  :disabled="sending"
                  class="atable"
                  @click="SetDok(item.id)"
                >
                  {{
                    new Date(item.created_at * 1000).toISOString().substr(0, 19)
                  }}
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
import VueAutoVirtualScrollList from "vue-auto-virtual-scroll-list";
export default {
  name: "KirimForm",
  mixins: [print],
  components: { VueAutoVirtualScrollList },
  data() {
    return {
      shtrixlist: [],
      settedindex: null,
      sklad: "",
      filter: "",
      filter1: "",
      focusset: "",
      doklist: [],
      skladlist: [],
      regionlist: [],
      showDialog: false
    };
  },
  props: ["datas"],
  created: function() {
    let self = this;
    self.$root.$refs.transfer = self;
    self.$root.$on("skladone", function(getdata) {
      self.sklad = getdata;
    });
    self.$root.$on("skladall", function(getdata) {
      self.skladlist = getdata;
    });
    self.Doklist();
  },
  mounted: function() {
    (window.onstorage = () => {
      if (localStorage.getItem("setted_product") > 0) {
        this.Productlist();
        this.datas.transfer_table[
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
    SetDok(id) {
      let self = this;
      if (self.sending == false) {
        self.sending = true;
        const str = this.doklist.find(d => d.id === id);
        this.doklist.splice(this.doklist.indexOf(str), 1);
        axios.get("api/v1/prixod/id/" + id).then(function(response) {
          const combined1 = [].concat(
            response.data.prixod_table,
            self.datas.transfer_table
          );
          self.datas.transfer_table = combined1;
          self.Summa();
          self.$bvModal.hide("modal-doklist");
        });
        if (self.sending == true) {
          setTimeout(() => {
            self.sending = false;
          }, 1000);
        }
      }
    },
    Changeoptomprice(index) {
      if (this.datas.transfer_table.length == index + 1) {
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
        this.datas.summa -= this.datas.transfer_table[index].debit_summa;
        this.datas.transfer_table.splice(index, 1);
        this.Summa();
      }
    },
    Doklist() {
      let self = this;
      axios
        .get("api/v1/prixod/by-sklad/" + self.datas.sklad_id)
        .then(function(response) {
          self.doklist = response.data;
        });
    },
    Productchange(index) {
      let self = this;
      var item = self.datas.transfer_table[index];
      item.optom_price = 0;
      item.chakana_price = 0;
      axios({
        method: "post",
        url: "api/v1/product/price-balance",
        data: {
          product_id: item.product_id,
          sklad_id: self.datas.sklad_id,
          datetime: self.datas.created_at
        }
      }).then(function(response) {
        item.balance = response.data.balance;
        item.current_balance = response.data.balance;
        item.debit_price = response.data.body_price;
        item.debit_summa = item.debit_price * item.count;
        item.optom_price = response.data.optom_price;
        item.chakana_price = response.data.chakana_price;
        self.Changeprice(index);
        self.Setshtrix1(item);
      });
    },
    Focus() {
      if (this.$route.path == "/transfer/create") {
        this.$refs.focused.focus();
      } else {
        $(".table-input")
          .eq(0)
          .focus();
      }
    },
    Qoldiq(item) {
      let self = this;
      axios({
        method: "post",
        url: "api/v1/product/price-balance",
        data: {
          product_id: item.product_id,
          sklad_id: self.datas.sklad_id,
          datetime: self.datas.created_at
        }
      }).then(function(response) {
        item.balance = response.data.balance;
        if (item.count > item.balance) {
          item.current_balance = response.data.balance;
          item.count = item.balance;
          self.$store.state.errors = "Қолдиқ етарли емас";
        }
      });
    },
    Shtrix(index) {
      let self = this;
      var shtrix = self.datas.transfer_table[index].shtrix_kod;
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
          self.datas.transfer_table[index].product_id =
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
      var item = this.datas.transfer_table[index];
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
      let self = this;
      var item = this.datas.transfer_table[index];
      if (item.balance) {
        if (item.count > item.balance) {
          item.count = item.balance;
          self.$store.state.errors = "Қолдиқ етарли емас";
        }
      } else {
        axios({
          method: "post",
          url: "api/v1/product/price-balance",
          data: {
            product_id: item.product_id,
            sklad_id: self.datas.sklad_id,
            datetime: self.datas.created_at
          }
        }).then(function(response) {
          item.balance = response.data.balance;
          if (item.count > item.balance) {
            item.current_balance = response.data.balance;
            item.count = item.balance;
            self.$store.state.errors = "Қолдиқ етарли емас";
          }
        });
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
      var item = this.datas.transfer_table[index];
      item.optom_price = item.debit_price * (item.optom_percent / 100 + 1);
      item.optom_summa = item.optom_price * item.count;
    },
    Changepercentchakana(index) {
      var item = this.datas.transfer_table[index];
      item.chakana_price =
        parseInt(item.debit_price) * (item.chakana_percent / 100 + 1);
      item.chakana_summa = item.chakana_price * item.count;
    },
    Changepriceoptom(index) {
      var item = this.datas.transfer_table[index];
      item.optom_percent = (item.optom_price / item.debit_price) * 100 - 100;
      item.optom_summa = item.optom_price * item.count;
    },
    Changepricechakana(index) {
      var item = this.datas.transfer_table[index];
      item.chakana_percent =
        (item.chakana_price / item.debit_price) * 100 - 100;
      item.chakana_summa = item.chakana_price * item.count;
    },
    Addtable() {
      this.datas.transfer_table.push({
        product_id: 0,
        count: 0,
        debit_price: 0,
        debit_summa: 0,
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
      this.datas.transfer_table.forEach(function(key, value) {
        self.Qoldiq(key);
        self.datas.summa += parseInt(key.debit_summa);
        self.datas.count_all += parseInt(key.count);
      });
    },
    Savedokument(type) {
      var type;
      let self = this;
      if (self.sending == false) {
        self.sending = true;
        if (this.$route.path == "/transfer/create") {
          var methods = "post";
          var action = "api/v1/transfer";
        } else {
        if(self.$store.state.saved==1){
          self.datas.updated_at = new Date()
            .valueOf()
            .toString()
            .slice(0, 10);
        }
          var methods = "patch";
          var action = "api/v1/transfer/id/" + self.$route.params.id;
        }
        axios({
          method: methods,
          url: action,
          data: self.datas
        }).then(function(response) {
          self.$store.state.saved = null;
          if (type == "print") {
            // self.Print();
            let routeData = self.$router.resolve({
            name: "printtransfer",
            query: { id: response.data.id }
          });
          let myWindow;
          myWindow = window.open(
            routeData.href,
            "_blank",
            "width=1000, height=1000"
          );
          self.$router.push({ name: "Перемешения" });
          } else {
            self.$router.push({ name: "Перемешения" });
          }
        });
        if (self.sending == true) {
          setTimeout(() => {
            self.sending = false;
          }, 1000);
        }
      }
    }
  },
  computed: {
    SelectedProduct() {
      return this.$store.state.selected_product;
    },
    filtereddok() {
      return this.doklist.filter(row => {
        const name = new Date(row.created_at * 1000)
          .toISOString()
          .substr(0, 19);
        const searchTerm = this.filter1.toLowerCase();
        return name.includes(searchTerm);
      });
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
