<template>
  <b-container fluid>
    <b-row id="tableId">
      <b-col lg="2" class="my-1">
        <label for="">{{ $t("Вақт") }} 1</label>
        <input class="form-control" type="date" v-model="datas.date1" />
      </b-col>
      <b-col lg="2" class="my-1">
        <label for="">{{ $t("Вақт") }} 2</label>
        <input class="form-control" type="date" v-model="datas.date2" />
      </b-col>
      <b-col lg="2" class="my-1">
        <label>Склад</label>
        <v-select
          :clearable="false"
          class="form-control-sm md-input"
          :options="skladlist"
          v-model="datas.sklad_id"
          :reduce="name => name.id"
          label="name"
        >
          <template #search="{attributes, events}">
            <input class="vs__search" v-bind="attributes" v-on="events" />
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
            </template>
            <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
          </template>
        </v-select>
      </b-col>
      <b-col lg="4" class="my-1">
        <label for="">Товар</label>
        <v-select
          :clearable="false"
          class="form-control-sm"
          v-if="productlist != null"
          :options="paginated"
          @search="query => (search = query)"
          v-model="datas.product_id"
          :filter-by="$store.state.myFilter"
          :reduce="extra_name => extra_name.id"
          label="extra_name"
          @input="Tovarchange()"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes"></span>
            <button
              type="button"
              class="modallist"
              @click="Selectproduct(null)"
            >
              <b-icon icon="three-dots"></b-icon>
            </button>
          </template>
          <!-- <template #selected-option="{ extra_name }">
            <div style="max-width:auto;position:absolute;">
              {{ extra_name }}
            </div>
          </template> -->
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
            </template>
            <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
          </template>
        </v-select>
      </b-col>
      <!-- <b-col lg="2" class="my-1">
        <label for="">Серия</label>
        <v-select
          :clearable="false"
          class="form-control-sm"
          :options="serieslist"
          v-model="datas.series_id"
          :reduce="datetime => datetime.id"
          label="datetime"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              <em
                ><b>{{ search }}</b></em
              >
              {{ $t("бўйича маьлумот йўқ") }}
              <button
                class="pluss"
                type="button"
                @click="product.name = search"
                v-b-modal.modal-product
              >
                +
              </button>
            </template>
            <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
          </template>
        </v-select>
      </b-col> -->
      <b-col lg="2" class="my-1">
        <button type="button" class="btn mybtn" @click="Send()">
          {{ $t("Кўриш") }}
        </button>
        <button type="button" class="btn mybtn" @click="Print()">
          <b-icon icon="printer"></b-icon>
        </button>
        <button type="button" class="btn mybtn" @click="downloadExl">
          <b-icon icon="cloud-download"></b-icon> {{ $t("Excel(Юклаш)") }}
        </button>
      </b-col>
      <div class="limiter">
        <div class="container-table100">
          <div class="wrap-table100">
            <div class="table100 ver1 m-b-110">
              <div class="table100-head">
                <table>
                  <thead>
                    <tr class="row100 head">
                      <th class="cell100 column1">#</th>
                      <th class="cell100">{{ $t("Номи") }}</th>
                      <th class="cell100 column3">{{ $t("Вақт") }}</th>
                      <th class="cell100 column2">{{ $t("Кирим") }}</th>
                      <th class="cell100 column2">{{ $t("Чиқим") }}</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="table100-body summatable">
                <table>
                  <tr>
                    <td class="cell100" colspan="3">
                      {{ $t("Бошланғич қолдиқ") }}
                    </td>
                    <td class="cell100 column2 kol">
                      {{ results.begin_balance | numFormat }}
                    </td>
                    <td class="cell100 column2 kol"></td>
                  </tr>
                </table>
              </div>
              <div class="table100-body sverka js-pscroll">
                <table>
                  <tbody>
                    <tr
                      class="row100 body"
                      v-for="(item, index) in results.data"
                      :key="index"
                    >
                      <td class="cell100 column1">
                        <router-link
                          target="_blank"
                          :to="{
                            name: item.doc_type + ' ўзгартириш',
                            params: { id: item.doc_id }
                          }"
                          >{{ index + 1 }}</router-link
                        >
                      </td>
                      <td class="cell100">
                        <router-link
                          target="_blank"
                          :to="{
                            name: item.doc_type + ' ўзгартириш',
                            params: { id: item.doc_id }
                          }"
                          >{{ item.doc_type }} № {{ item.doc_id }}</router-link
                        >
                      </td>
                      <td class="cell100 column3">
                        <router-link
                          target="_blank"
                          :to="{
                            name: item.doc_type + ' ўзгартириш',
                            params: { id: item.doc_id }
                          }"
                          >{{ Dates(item.datetime) }}</router-link
                        >
                      </td>
                      <td class="cell100 column2 kol">
                        <router-link
                          target="_blank"
                          :to="{
                            name: item.doc_type + ' ўзгартириш',
                            params: { id: item.doc_id }
                          }"
                          ><span v-if="item.type == true">{{
                            item.count | numFormat
                          }}</span></router-link
                        >
                      </td>
                      <td class="cell100 column2 kol">
                        <router-link
                          target="_blank"
                          :to="{
                            name: item.doc_type + ' ўзгартириш',
                            params: { id: item.doc_id }
                          }"
                          ><span v-if="item.type == false">{{
                            item.count | numFormat
                          }}</span></router-link
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="table100-body summatable1">
                <table>
                  <tr>
                    <td class="cell100" colspan="3">{{ $t("Жами") }}</td>
                    <td class="cell100 column2 kol">
                      <span v-if="results.summ">{{
                        results.summ.kirim_cash | numFormat
                      }}</span>
                    </td>
                    <td class="cell100 column2 kol">
                      <span v-if="results.summ">{{
                        results.summ.chiqim_cash | numFormat
                      }}</span>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="table100-body summatable">
                <table>
                  <tr>
                    <td colspan="3" class="cell100 ">
                      {{ $t("Якуний қолдиқ") }}
                    </td>
                    <td class="cell100 column2 kol">
                      {{ results.end_balance | numFormat }}
                    </td>
                    <td class="cell100 column2 kol"></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-row>
    <sklad :datas="datas"></sklad>
  </b-container>
</template>

<script>
var XLSX = require("xlsx");
var FileSaver = require("file-saver");
import { print } from "../../../components/mixins/print.js";
import { Sklad } from "@/pages";
export default {
  components: { Sklad },
  mixins: [print],
  data() {
    return {
      datas: {
        date1: new Date().toISOString().slice(0, 8) + "01",
        date2: new Date().toISOString().slice(0, 10),
        product_id: 0,
        series_id: 0,
        sklad_id: parseInt(localStorage.getItem("sklad_id"))
      },
      serieslist: [],
      sklad: "",
      skladlist: [],
      errors: "",
      results: []
    };
  },
  mounted: function() {
    let self = this;
    self.$root.$on("skladone", function(getdata) {
      self.sklad = getdata;
    });
    self.$root.$on("skladall", function(getdata) {
      self.skladlist = getdata;
      (window.onstorage = () => {
        if (localStorage.getItem("setted_product") > 0) {
          self.Productlist();
          self.datas.product_id = parseInt(
            localStorage.getItem("setted_product")
          );
          localStorage.setItem("setted_product", 0);
        }
      }),
        setTimeout(() => {
          localStorage.setItem("sklad_id_dok", self.datas.sklad_id);
          localStorage.setItem("created_at_dok", self.datas.date2);
        }, 1000);
    });
  },
  created: function() {
    let self = this;
    if (localStorage.getItem("product_id") != null) {
      self.datas.date1 = localStorage.getItem("date1");
      self.datas.date2 = localStorage.getItem("date2");
      self.datas.sklad_id = parseInt(localStorage.getItem("sklad_id"));
      self.datas.product_id = parseInt(localStorage.getItem("product_id"));
      self.Send();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (localStorage.getItem("product_id") != null) {
      localStorage.removeItem("product_id");
      localStorage.removeItem("date1");
      localStorage.removeItem("date2");
      localStorage.removeItem("sklad_id");
    }
    next();
  },
  methods: {
    Selectproduct(index) {
      this.$store.state.selected_index = index;
      let routeData = this.$router.resolve({ name: "Товар модал" });
      window.open(routeData.href, "_blank", "width=1200, height=1000");
    },
    Tovarchange() {
      let self = this;
      axios({
        method: "post",
        url: "api/v1/product/all-series",
        data: {
          product_id: self.datas.product_id,
          sklad_id: self.datas.sklad_id
        }
      }).then(function(response) {
        self.serieslist = response.data;
        self.serieslist.forEach(function(key, value) {
          key.datetime = new Date(key.datetime * 1000)
            .toISOString()
            .substr(0, 19);
        });
      });
    },
    downloadExl() {
      let wb = XLSX.utils.table_to_book(document.getElementById("tableId")),
        wopts = {
          bookType: "xlsx",
          bookSST: false,
          type: "binary"
        },
        wbout = XLSX.write(wb, wopts);
      FileSaver.saveAs(
        new Blob([this.s2ab(wbout)], {
          type: "application/octet-stream;charset=utf-8"
        }),
        new Date() + "product_sverka.xlsx"
      );
    },
    s2ab(s) {
      if (typeof ArrayBuffer !== "undefind") {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
    },
    Send() {
      let self = this;
      var datas = {
        datetime1: parseInt(
          new Date(self.datas.date1)
            .valueOf()
            .toString()
            .slice(0, 10)
        ),
        datetime2:
          parseInt(
            new Date(self.datas.date2)
              .valueOf()
              .toString()
              .slice(0, 10)
          ) + 86399,
        sklad_id: self.datas.sklad_id,
        product_id: self.datas.product_id,
        seris_id: self.datas.series_id
      };
      axios({
        method: "post",
        url: "api/v1/akt-sverka/product",
        headers: {
          "Content-Type": "application/json"
        },
        data: datas
      }).then(function(response) {
        self.results = response.data;
        self.results.summ = {
          kirim_cash: 0,
          chiqim_cash: 0,
          kirim_plastic: 0,
          chiqim_plastic: 0
        };
        self.results.data.forEach(function(key, value) {
          if (key.type == true) {
            self.results.summ.kirim_cash += parseInt(key.count);
          } else {
            self.results.summ.chiqim_cash += parseInt(key.count);
          }
        });
      });
    }
  }
};
</script>
<style scoped>
/* .table100-body {
    max-height: 440px;
  } */
</style>
