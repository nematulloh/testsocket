<template>
  <b-container fluid>
    <b-row>
      <b-col lg="2" class="my-1">
        <label for="">{{ $t("Вақт") }} 1</label>
        <input class="form-control" type="date" v-model="datas.date1" />
      </b-col>
      <b-col lg="2" class="my-1">
        <label for="">{{ $t("Вақт") }} 2</label>
        <input class="form-control" type="date" v-model="datas.date2" />
      </b-col>
      <b-col lg="3" class="my-1">
        <label>Склад</label>
        <v-select
          class="form-control-sm md-input"
          :options="skladlist"
          v-model="datas.sklad_id"
          :reduce="name => name.id"
          label="name"
        >
          <template #search="{attributes, events}">
            <input class="vs__search" v-bind="attributes" v-on="events" />
            <a
              href="javascript:void(0)"
              class="modallist"
              v-b-modal.modal-skladlist
            >
              <b-icon icon="three-dots"></b-icon>
            </a>
          </template>
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              <em
                ><b>{{ search }}</b></em
              >
              {{ $t("бўйича маьлумот йўқ") }}
              <button
                type="button"
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
      <b-col lg="5" class="my-1">
        <br /><button type="button" class="btn mybtn" @click="Send()">
          {{ $t("Кўриш") }}
        </button>
        <button type="button" class="btn mybtn" @click="downloadExl">
          <b-icon icon="cloud-download"></b-icon> {{ $t("Excel(Юклаш)") }}
        </button>
        <button type="button" class="btn mybtn" @click="Print()">
          <b-icon icon="printer"></b-icon>
        </button>
      </b-col>
      <div class="limiter" id="tableId">
        <div class="container-table100">
          <div class="wrap-table100">
            <div class="table100 tworow ver1 m-b-110">
              <div class="table100-head">
                <table>
                  <thead>
                    <tr class="row100 head">
                      <th class="cell100 column1" rowspan="2">#</th>
                      <th class="cell100" rowspan="2">{{ $t("Номи") }}</th>
                      <th class="cell100 column3" rowspan="2">
                        {{ $t("Вақт") }}
                      </th>
                      <th class="cell100 column3" rowspan="2">
                        {{ $t("Комментарий") }}
                      </th>
                      <th class="cell100" colspan="2">{{ $t("Нахд") }}</th>
                      <th class="cell100" colspan="2">Пластик</th>
                    </tr>
                    <tr class="row100 head">
                      <th class="cell100 column2">{{ $t("Кирим") }}</th>
                      <th class="cell100 column2">{{ $t("Чиқим") }}</th>
                      <th class="cell100 column2">{{ $t("Кирим") }}</th>
                      <th class="cell100 column2">{{ $t("Чиқим") }}</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="table100-body summatable">
                <table>
                  <tr>
                    <td class="cell100" colspan="4">
                      {{ $t("Бошланғич қолдиқ") }}
                    </td>
                    <td class="cell100 column2 kol">
                      <span v-if="results.begin">{{
                        (results.begin.kirim_cash - results.begin.chiqim_cash)
                          | numFormat
                      }}</span
                      ><span v-else>0</span>
                    </td>
                    <td class="cell100 column2 kol"></td>
                    <td class="cell100 column2 kol">
                      <span v-if="results.begin">{{
                        (results.begin.kirim_plastic -
                          results.begin.chiqim_plastic)
                          | numFormat
                      }}</span
                      ><span v-else>0</span>
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
                      <td class="cell100 column3">
                        <router-link
                          target="_blank"
                          :to="{
                            name: item.doc_type + ' ўзгартириш',
                            params: { id: item.doc_id }
                          }"
                          >{{ item.comment }}</router-link
                        >
                      </td>
                      <td class="cell100 column2 kol">
                        <router-link
                          target="_blank"
                          :to="{
                            name: item.doc_type + ' ўзгартириш',
                            params: { id: item.doc_id }
                          }"
                          >{{ item.kirim_cash | numFormat }}</router-link
                        >
                      </td>
                      <td class="cell100 column2 kol">
                        <router-link
                          target="_blank"
                          :to="{
                            name: item.doc_type + ' ўзгартириш',
                            params: { id: item.doc_id }
                          }"
                          >{{ item.chiqim_cash | numFormat }}</router-link
                        >
                      </td>
                      <td class="cell100 column2 kol">
                        <router-link
                          target="_blank"
                          :to="{
                            name: item.doc_type + ' ўзгартириш',
                            params: { id: item.doc_id }
                          }"
                          >{{ item.kirim_plastic | numFormat }}</router-link
                        >
                      </td>
                      <td class="cell100 column2 kol">
                        <router-link
                          target="_blank"
                          :to="{
                            name: item.doc_type + ' ўзгартириш',
                            params: { id: item.doc_id }
                          }"
                          >{{ item.chiqim_plastic | numFormat }}</router-link
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="table100-body summatable1">
                <table>
                  <tr>
                    <td class="cell100" colspan="4">{{ $t("Жами") }}</td>
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
                    <td class="cell100 column2 kol">
                      <span v-if="results.summ">{{
                        results.summ.kirim_plastic | numFormat
                      }}</span>
                    </td>
                    <td class="cell100 column2 kol">
                      <span v-if="results.summ">{{
                        results.summ.chiqim_plastic | numFormat
                      }}</span>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="table100-body summatable">
                <table>
                  <tr>
                    <td class="cell100" colspan="3">
                      {{ $t("Якуний қолдиқ") }}
                    </td>
                    <td class="cell100 column2 kol">
                      <span v-if="results.end">{{
                        (results.end.kirim_cash - results.end.chiqim_cash)
                          | numFormat
                      }}</span>
                    </td>
                    <td class="cell100 column2 kol">
                      <span v-if="results.end"></span>
                    </td>
                    <td class="cell100 column2 kol">
                      <span v-if="results.end">{{
                        (results.end.kirim_plastic -
                          results.end.chiqim_plastic)
                          | numFormat
                      }}</span>
                    </td>
                    <td class="cell100 column2 kol">
                      <span v-if="results.end"></span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-row>
    <paytype :datas="datas"></paytype>
    <sklad :datas="datas"></sklad>
    <unit></unit>
    <model></model>
    <brand></brand>
    <colour></colour>
  </b-container>
</template>

<script>
var XLSX = require("xlsx");
var FileSaver = require("file-saver");

import { Paytype, Unit, Model, Brand, Colour, Sklad } from "@/pages";
import { print } from "../../../components/mixins/print.js";
export default {
  components: { Paytype, Unit, Model, Brand, Colour, Sklad },
  data() {
    return {
      datas: {
        date1: new Date().toISOString().slice(0, 10),
        date2: new Date().toISOString().slice(0, 10),
        pay_type_id: null,
        sklad_id: parseInt(localStorage.getItem("sklad_id"))
      },
      paytype: "",
      paytypelist: [],
      sklad: "",
      skladlist: [],
      errors: "",
      results: []
    };
  },
  mixins: [print],
  created() {
    let self = this;
    self.$root.$on("paytypeone", function(getdata) {
      self.paytype = getdata;
    });
    self.$root.$on("paytypeall", function(getdata) {
      self.paytypelist = getdata;
    });
    self.$root.$on("skladone", function(getdata) {
      self.sklad = getdata;
    });
    self.$root.$on("skladall", function(getdata) {
      self.skladlist = getdata;
    });
  },
  methods: {
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
        new Date() + "kassa_kniga.xlsx"
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
        sklad_id: self.datas.sklad_id
      };
      axios({
        method: "post",
        url: "api/v1/akt-sverka/kassa-book",
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
          self.results.summ.kirim_cash += parseInt(key.kirim_cash);
          self.results.summ.chiqim_cash += parseInt(key.chiqim_cash);
          self.results.summ.kirim_plastic += parseInt(key.kirim_plastic);
          self.results.summ.chiqim_plastic += parseInt(key.chiqim_plastic);
        });
      });
    }
  }
};
</script>
