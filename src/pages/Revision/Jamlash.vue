<template>
  <div class="content">
    <form>
      <div class="headerhref">
        <div style="position: fixed;right: 0;">
          <button
            type="button"
            class="btn mybtn"
            v-b-modal.modal-dokument
            @click="dokumentset = null"
          >
            {{ $t("Док юклаш") }}
          </button>
          <button type="button" class="btn mybtn" @click="Birlash()">
            {{ $t("Бирлаштириш") }}
          </button>
          <button
            class="btn mybtn saved"
            id="f9"
            :disabled="active"
            type="button"
            @click="Savedokument('test')"
          >
            {{ $t("Сақлаш") }}(Проба)
          </button>
          <button
            class="btn mybtn"
            :disabled="active"
            type="button"
            @click="Savedokument('real')"
          >
            {{ $t("Сақлаш") }}(Реал)
          </button>
          <router-link
            style="padding: 5px!important;"
            class="mybtn btn"
            :to="{ path: '/revision/index' }"
          >
            {{ $t("Чиқиш") }}<sup>esc</sup>
          </router-link>
        </div>
      </div>
      <div class="topkassa">
        <div class="mylayouts">
          <label for="">{{ $t("Cклад") }}</label>
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
            <template #search="{attributes, events}">
              <input class="vs__search" v-bind="attributes" v-on="events" />
              <button type="button" class="modallist" v-b-modal.modal-skladlist>
                <b-icon icon="three-dots"></b-icon>
              </button>
            </template>
            <template #selected-option="{ name }">
              <div style="position:absolute;">
                <b>{{ name }}</b>
              </div>
            </template>
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                <em
                  ><b>{{ search }}</b></em
                >{{ $t("бўйича маьлумот йўқ") }}
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
              <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
            </template>
          </v-select>
        </div>
        <div class="mylayouts">
          <label>Комментарий</label>
          <textarea v-model="datas.comment" rows="1"></textarea>
        </div>
        <div class="mylayouts">
          <label>{{ $t("Cони") }}</label>
          <input
            type="text"
            class="table-input needt"
            readonly
            id="shtrix"
            v-model="datas.count_all"
          />
        </div>
        <div class="mylayouts">
          <label>Сумма</label>
          {{ datas.summa | numFormat }}
        </div>
        <div class="mylayouts">
          <label>Қолдиқ</label>
          {{ datas.total_real_count | numFormat }}
        </div>
        <div class="mylayouts">
          <label>Фарқ</label>
          {{ datas.total_difference | numFormat }}
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="bodyrow">
            <md-card>
              <md-card-content>
                <button
                  type="button"
                  class="btn mybtn"
                  style="padding: 3px;"
                  @click="Adddok()"
                >
                  {{ $t("Қўшиш") }}
                </button>
                <table class="table table-bordered left">
                  <thead>
                    <tr>
                      <th class="column1">№</th>
                      <th>{{ $t("Документ") }}</th>
                      <th class="column2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <VueAutoVirtualScrollList
                      :totalHeight="550"
                      :defaultHeight="25"
                      class="virtual"
                      style="width: 100%;height: 70vh!important;"
                    >
                      <tr
                        v-for="(item, index) in dokuments"
                        :key="index"
                        :style="{ height: `${index / 1000 + 10}px` }"
                      >
                        <td class="column1">{{ index + 1 }}</td>
                        <td>
                          <v-select
                            :clearable="false"
                            class="form-control-sm required md-input"
                            :options="doklist"
                            v-model="item.dok_id"
                            :reduce="created_at => created_at.id"
                            label="created_at"
                          >
                            <template #list-footer>
                              <li style="text-align: center;font-weight:bold;">
                                f4 {{ $t("умумий рўйхат") }}
                              </li>
                            </template>
                            <template #search="{attributes, events}">
                              <input
                                class="vs__search"
                                v-bind="attributes"
                                v-on="events"
                              />
                              <button
                                type="button"
                                class="modallist"
                                v-b-modal.modal-dokument
                                @click="dokumentset = index"
                              >
                                <b-icon icon="three-dots"></b-icon>
                              </button>
                            </template>
                            <template slot="option" slot-scope="option">
                              {{
                                new Date(option.created_at * 1000)
                                  .toISOString()
                                  .substr(0, 19)
                              }}
                            </template>
                            <template #selected-option="{ created_at }">
                              <div style="position:absolute;">
                                <b>{{
                                  new Date(created_at * 1000)
                                    .toISOString()
                                    .substr(0, 19)
                                }}</b>
                              </div>
                            </template>
                            <template v-slot:no-options="{ search, searching }">
                              <template v-if="searching">
                                <em
                                  ><b>{{ search }}</b></em
                                >{{ $t("бўйича маьлумот йўқ") }}
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
                              <em style="opacity: 0.5;" v-else>{{
                                $t("Маьлумот йўқ")
                              }}</em>
                            </template>
                          </v-select>
                        </td>
                        <td class="column2">
                          <a
                            href="javascript:void(0)"
                            type="button"
                            class="mybtn btn"
                            @click="Trashdok(index)"
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
          </div>
        </div>
        <div class="col-md-8">
          <div class="bodyrow">
            <md-card>
              <md-card-content>
                <button
                  type="button"
                  class="btn mybtn addrow"
                  style="padding: 3px;"
                  @click="Addtable()"
                >
                  {{ $t("Қўшиш") }} <sup>F1</sup>
                </button>
                <table class="table table-bordered right">
                  <thead>
                    <tr>
                      <th class="column1">№</th>
                      <th class="column4">Штрих</th>
                      <th>Товар</th>
                      <th class="column2">{{ $t("Кол.") }}</th>
                      <th class="column2">{{ $t("Қолдиқ") }}</th>
                      <th class="column2">{{ $t("Фарқ") }}</th>
                      <th class="column1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <div
                      style="overflow-y: scroll;overflow-x: hidden; height: 70vh !important; width: 100%;"
                    >
                      <tr
                        v-for="(item, index) in datas.revision_table"
                        :key="index"
                      >
                        <td class="column1">{{ index + 1 }}</td>
                        <td class="column4">
                          <input
                            class="table-input shtrixx"
                            type="text"
                            v-model="item.shtrix_kod"
                            @change="Shtrix(index)"
                          />
                        </td>
                        <td>
                          <v-select
                            :clearable="false"
                            v-if="productlist != null"
                            class="form-control-sm"
                            @search="query => (search = query)"
                            :options="paginated"
                            menu-props="auto"
                            v-model="item.product_id"
                            :reduce="extra_name => extra_name.id"
                            label="extra_name"
                            :filter-by="$store.state.myFilter"
                            @input="Productchanged(index)"
                            required="true"
                          >
                            <template #open-indicator="{ attributes }">
                              <span v-bind="attributes"></span>
                              <button
                                type="button"
                                class="modallist"
                                @click="Selectproduct(index)"
                                v-b-modal.modal-productlist
                              >
                                <b-icon icon="three-dots"></b-icon>
                              </button>
                            </template>
                            <template #selected-option-container="{ option}">
                              <div class="vs__selected">
                                <span
                                  v-if="typeof option.extra_name === 'number'"
                                  >{{ Label(option.extra_name) }}</span
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
                                  @click="product.name = search"
                                  v-b-modal.modal-product
                                >
                                  +
                                </button>
                              </template>
                              <em style="opacity: 0.5;" v-else>{{
                                $t("Маьлумот йўқ")
                              }}</em>
                            </template>
                            <template #search="{ search, searching }">
                              <template v-if="searching">
                                <em
                                  ><b>{{ search }}</b></em
                                >
                                {{ $t("бўйича маьлумот йўқ") }}
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
                          <vue-numeric
                            separator="space"
                            v-model="item.real_count"
                            @change="Addtable(false)"
                            class="table-input"
                            v-bind:precision="0"
                            @input="Changecount(index)"
                          >
                          </vue-numeric>
                        </td>
                        <td class="column2">
                          {{ item.count | numFormat }}
                        </td>
                        <td class="column2">
                          {{ item.difference | numFormat }}
                        </td>
                        <td class="column1">
                          <a
                            href="javascript:void(0)"
                            type="button"
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
            </md-card>
          </div>
        </div>
      </div>
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
            v-model="filter1"
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
            <tbody v-for="(item, index) in filteredShtrix" :key="index">
              <tr>
                <td>{{ index + 1 }}</td>
                <td>
                  <button
                    type="button"
                    class="atable"
                    @click="
                      datas.revision_table[settedindex].product_id =
                        item.product_id;
                      $bvModal.hide('modal-shtrix');
                      Ostatka(settedindex);
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
                      datas.revision_table[settedindex].product_id =
                        item.product_id;
                      $bvModal.hide('modal-shtrix');
                      Ostatka(settedindex);
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
                      datas.revision_table[settedindex].product_id =
                        item.product_id;
                      $bvModal.hide('modal-shtrix');
                      Ostatka(settedindex);
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
                      datas.revision_table[settedindex].product_id =
                        item.product_id;
                      $bvModal.hide('modal-shtrix');
                      Ostatka(settedindex);
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
                      datas.revision_table[settedindex].product_id =
                        item.product_id;
                      $bvModal.hide('modal-shtrix');
                      Ostatka(settedindex);
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
        id="modal-dokument"
        title="Документ"
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
                <th>{{ $t("Вақт") }}</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in filtereddok" :key="index">
              <tr>
                <td>{{ index + 1 }}</td>
                <td>
                  <button type="button" class="atable" @click="SetDok(item.id)">
                    {{
                      new Date(item.created_at * 1000)
                        .toISOString()
                        .substr(0, 19)
                    }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-modal>
    </form>
    <sklad :datas="datas"></sklad>
    <product :datas="datas"></product>
    <unit></unit>
    <model></model>
    <brand></brand>
    <colour></colour>
    <country></country>
    <firma></firma>
  </div>
</template>
<script>
import $ from "jquery";
import { print } from "../../components/mixins/print.js";
import VueAutoVirtualScrollList from "vue-auto-virtual-scroll-list";
import {
  Firma,
  Sklad,
  Product,
  Unit,
  Model,
  Brand,
  Colour,
  Country
} from "@/pages";
export default {
  name: "ChiqimForm",
  mixins: [print],
  components: {
    VueAutoVirtualScrollList,
    Firma,
    Sklad,
    Product,
    Unit,
    Model,
    Brand,
    Colour,
    Country
  },
  data() {
    return {
      datas: {
        sklad_id: parseInt(localStorage.getItem("sklad_id")),
        created_at: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        updated_at: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        kontragent_id: 0,
        user_id: parseInt(localStorage.getItem("user_id")),
        comment: "",
        summa: 0,
        count_all: 0,
        total_real_count: 0,
        total_difference: 0,
        real: false,
        revision_table: []
      },
      dokumentset: null,
      doklist: [],
      dokuments: [],
      filter: "",
      filter1: "",
      focusset: "",
      shtrixlist: [],
      active: false,
      newitem: {
        shtrix_kod: "",
        product_id: 1,
        series_id: 0,
        count: 0,
        real_count: 0,
        difference: 0,
        body_price: 0,
        body_summa: 0,
        difference_summa: 0
      },
      settedindex: null,
      sklad: "",
      product: "",
      kontragentlist: [],
      skladlist: [],
      paytypelist: [],
      regionlist: [],
      productlistfolder: []
    };
  },
  computed: {
    filtereddok() {
      return this.doklist.filter(row => {
        const name = new Date(row.created_at * 1000)
          .toISOString()
          .substr(0, 19);
        const searchTerm = this.filter.toLowerCase();
        return name.includes(searchTerm);
      });
    },
    filteredShtrix() {
      return this.shtrixlist.filter(row => {
        const name = row.extra_name.toString().toLowerCase();
        const searchTerm = this.filter1.toLowerCase();
        return name.includes(searchTerm);
      });
    }
  },
  created: function() {
    let self = this;
    self.$root.$refs.revision = self;
    self.$root.$on("skladone", function(getdata) {
      self.sklad = getdata;
    });
    self.$root.$on("skladall", function(getdata) {
      self.skladlist = getdata;
    });
    self.$root.$on("productone", function(getdata) {
      self.product = getdata;
    });
    if (this.$route.path != "/revision/create") {
      self.datas.updated_at = new Date()
        .valueOf()
        .toString()
        .slice(0, 10);
    }
  },
  mounted: function() {
    // this.Focus();
    this.Doklist();
    let self = this;
    $("body").keydown(function(e) {
      // f3
      if (e.keyCode == 114) {
        $("#tovar").click();
        return false;
        // f5 bosilsa
      }
      // f7
      else if (e.keyCode == 118) {
        $("#chek").click();
        return false;
      }
      // f9
      else if (e.keyCode == 120) {
        $("#f9").click();
        return false;
      }
      // return false;
    });
  },
  methods: {
    Adddok() {
      this.dokuments.push({ dok_id: null });
    },
    Birlash() {
      let self = this;
      var data = [];
      self.dokuments.forEach(function(key, value) {
        data.push(key.dok_id);
      });
      axios({
        method: "post",
        url: "api/v1/revision/tables-by-ids",
        data: { ids: data }
      }).then(function(response) {
        const combined1 = [].concat(self.datas.revision_table, response.data);
        self.datas.revision_table = combined1;
        self.Summa();
      });
    },
    SetDok(id) {
      if (this.dokumentset == null) {
        this.dokuments.push({ dok_id: id });
      } else {
        this.dokuments[this.dokumentset].dok_id = id;
      }
      this.$bvModal.hide("modal-dokument");
    },
    Doklist() {
      let self = this;
      axios.get("api/v1/revision/real/false").then(function(response) {
        self.doklist = response.data;
      });
    },
    Print() {
      let newstr = document.getElementsByClassName("dialogCare")[0].innerHTML;
      window.document.body.innerHTML = newstr;
      let oldstr = window.document.body.innerHTML;
      window.print();
      // window.document.body.innerHTML = oldstr;
      return false;
    },
    Focus() {
      this.$refs.focused.focus();
    },
    Trashitem(index) {
      const answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
      if (answer) {
        this.datas.revision_table.splice(index, 1);
        this.Summa();
      }
    },
    Trashdok(index) {
      const answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
      if (answer) {
        this.dokuments.splice(index, 1);
      }
    },
    Ostatka(index) {
      let self = this;
      let item = self.datas.revision_table[index];
      let datas = {
        product_id: item.product_id,
        sklad_id: self.datas.sklad_id,
        datetime: self.datas.created_at
      };
      axios({
        method: "post",
        url: "api/v1/product/price-balance",
        data: datas
      }).then(function(response) {
        item.body_price = response.data.body_price;
        item.count = response.data.balance;
        self.Changecount(index);
      });
    },
    Changecount(index) {
      let self = this;
      let item = self.datas.revision_table[index];
      item.difference = item.count - item.real_count;
      item.body_summa = item.body_price * item.real_count;
      item.difference_summa = item.body_price * item.difference;
      self.Summa();
    },
    Productchanged(index) {
      let self = this;
      let item = self.datas.revision_table[index];
      if (item.product_id > 0) {
        self.Ostatka(index);
        self.Setshtrix1(item);
      }
    },
    Shoved() {
      setTimeout(() => {
        this.$refs.inputText2.focus();
      }, 100);
    },
    Productname() {
      let item = this.newitem;
      axios({
        method: "get",
        url: "api/v1/product/id/" + item.product_id
      }).then(function(response) {
        item.product_name = response.data.extra_name;
      });
    },
    Hide() {
      let self = this;
      setTimeout(function(e) {
        if ($(":focus").attr("class") == undefined) {
          $("#shtrix").focus();
        }
      }, 100);
    },
    Ostatkanew() {
      this.Productname();
      this.$bvModal.show("modal-new");
    },
    Shtrix_code(shtrix) {
      let self = this;
      axios({
        method: "post",
        url: "api/v1/product/shtrix2/" + shtrix,
        data: { sklad_id: self.datas.sklad_id }
      }).then(function(response) {
        if (!response.data[0]) {
        } else if (response.data[1]) {
          self.shtrixlist = response.data;
          self.$bvModal.show("modal-shtrixnew");
        } else {
          self.newitem.product_id = response.data[0].product_id;
          self.Ostatkanew();
        }
      });
    },
    Shtrix(index) {
      let self = this;
      var shtrix = self.datas.revision_table[index].shtrix_kod;
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
          self.datas.revision_table[index].product_id =
            response.data[0].product_id;
          self.Productchanged(index);
        }
      });
    },
    Selectproduct(index) {
      this.$store.state.selected_product = this.datas.revision_table;
      this.$store.state.selected_index = index;
    },
    Create() {
      let self = this;
      axios({
        method: "post",
        url: "api/v1/product/price-balance",
        data: {
          product_id: self.newitem.product_id,
          sklad_id: self.datas.sklad_id,
          datetime: self.datas.created_at
        }
      }).then(function(response) {
        self.newitem.body_price = response.data.body_price;
        self.newitem.count = response.data.balance;
        self.newitem.difference = self.newitem.count - self.newitem.real_count;
        self.newitem.body_summa =
          self.newitem.body_price * self.newitem.real_count;
        self.newitem.difference_summa =
          self.newitem.body_price * self.newitem.difference;
        self.datas.revision_table.push(self.newitem);
        self.newitem = {
          product_name: "",
          shtrix_kod: "",
          product_id: 1,
          series_id: 0,
          count: 0,
          real_count: 0,
          difference: 0,
          body_price: 0,
          body_summa: 0,
          difference_summa: 0
        };
        self.Summa();
        self.$bvModal.hide("modal-new");
      });
    },
    Summa() {
      let self = this;
      self.datas.count_all = 0;
      self.datas.summa = 0;
      self.datas.total_real_count = 0;
      self.datas.total_difference = 0;
      self.datas.revision_table.forEach(function(key, value) {
        self.datas.total_real_count += parseFloat(key.real_count);
        self.datas.summa += parseFloat(key.body_summa);
        self.datas.count_all += parseFloat(key.count);
        self.datas.total_difference += parseFloat(key.difference);
      });
    },
    Addtable(focus = true) {
      this.datas.revision_table.push({
        shtrix_kod: "",
        product_id: 0,
        count: 0,
        price: 0,
        summa: 0
      });
      // $('.right').find('td').eq(-1).find('input').focus();
      // if(focus==true){
      setTimeout(() => {
        var have = $(".shtrixx");
        if (have.length != 0) {
          have.eq(have.length - 1).focus();
        } else {
          have.focus();
        }
      }, 100);
      // }
    },
    Savedokument(type) {
      let self = this;
      if (type == "real") {
        self.datas.real = true;
      } else {
        self.datas.real = false;
      }
      axios({
        method: "post",
        url: "api/v1/revision",
        data: self.datas
      }).then(function(response) {
        self.$store.state.saved = 1;
        self.datas = response.data;
        // self.$router.push({ name: "Ревизия" });
      });
    }
  },
  watch: {
    "$store.state.changed": function() {
      if (this.$store.state.changed != null) {
        this.Ostatka(this.$store.state.selected_index);
        this.$store.state.changed = null;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.vs__selected {
  position: absolute;
}

.row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.leftkassa .mybtn {
  margin: 0px !important;
  border-color: currentColor;
}

.mylayouts {
  width: 9%;
  border: 2px solid #002bff45;
  margin: 2px 3px 0 0 !important;
}

.mylayouts > label {
  background: rgb(43 190 209) !important;
  margin: 0 !important;
  font-weight: bold;
  color: black !important;
}

tr:nth-child(even) {
  background-color: #31cadd33;
}

.bodyrow .left tbody {
  display: block;
  height: 65vh;
  overflow-y: scroll;
}

.bodyrow .right tbody {
  display: block;
  height: 70vh !important;
  overflow-y: scroll;
}
tbody {
  overflow: hidden !important;
}
.md-card-content > .table.table-bordered tbody {
  height: 70vh !important;
}

.bodyrow table thead,
.bodyrow table tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

input[type="number"].table-input,
input[type="tel"].table-input,
input[type="text"].table-input {
  width: 100% !important;
}

.mybtn {
  color: black;
  border: 2px solid #002bff45;
  background: rgb(43 190 209) !important;
  color: black !important;
  font-weight: bold;
}

td {
  /* border-color: black; */
}

input[type="number"].table-input,
input[type="tel"].table-input,
input[type="text"].table-input {
  background: none !important;
}

table .mybtn {
  background: none !important;
}

sup {
  font-size: 18px;
  color: #d92c54;
  font-weight: bold;
}

thead {
  background-color: rgb(43 190 209) !important;
  color: black;
  font-weight: bold;
}

.mylayouts .table-input {
  max-width: 100% !important;
}

.sklad {
  background: rgb(43 190 209);
  padding: 9px 2px;
  margin: 0 2px;
  width: 35vh;
  border: 2px solid #002bff45;
  border-radius: 5px;
}
</style>
<style>
.headerhref {
  display: flex;
}

.headerhref a {
  padding: 13px 10px;
}
</style>
