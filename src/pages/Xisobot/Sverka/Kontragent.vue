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
      <b-col lg="2" class="my-1">
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
      <b-col lg="2" class="my-1">
        <label for="">Контрагент</label>
        <v-select
          :clearable="false"
          class="form-control-sm"
          :options="kontragentlist"
          v-model="datas.kontragent_id"
          :reduce="name => name.id"
          label="name"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes"></span>
            <a
              href="javascript:void(0)"
              class="modallist"
              v-b-modal.modal-kontragentlist
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
                @click="kontragent.name = search"
                v-b-modal.modal-kontragent
              >
                +
              </button>
            </template>
            <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
          </template>
        </v-select>
      </b-col>
      <b-col lg="4" class="my-1">
        <br /><button type="button" class="btn mybtn" @click="Send()">
          Кўриш
        </button>
        <button type="button" class="btn mybtn" @click="Print()">
          <b-icon icon="printer"></b-icon>
        </button>
        <button type="button" class="btn mybtn" @click="downloadExl">
          <b-icon icon="cloud-download"></b-icon> {{ $t("Excel(Юклаш)") }}
        </button>
      </b-col>
      <div class="limiter" id="tableId">
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
                    <td colspan="3" class="cell100">
                      {{ $t("Бошланғич қолдиқ") }}
                    </td>
                    <td class="cell100 column2 kol">
                      <span
                        :class="{ red: parseInt(results.begin_total) < 0 }"
                        >{{ results.begin_total|numFormat }}</span
                      >
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
                        >
                          {{ item.doc_type }} № {{ item.doc_id }}</router-link
                        >
                      </td>
                      <td class="cell100 column3">
                        <router-link
                          target="_blank"
                          :to="{
                            name: item.doc_type + ' ўзгартириш',
                            params: { id: item.doc_id }
                          }"
                        >
                          {{ Dates(item.datetime) }}</router-link
                        >
                      </td>
                      <td class="cell100 column2 kol">
                        <router-link
                          target="_blank"
                          :to="{
                            name: item.doc_type + ' ўзгартириш',
                            params: { id: item.doc_id }
                          }"
                        >
                          {{ item.kirim_summa | numFormat }}</router-link
                        >
                      </td>
                      <td class="cell100 column2 kol">
                        <router-link
                          target="_blank"
                          :to="{
                            name: item.doc_type + ' ўзгартириш',
                            params: { id: item.doc_id }
                          }"
                        >
                          {{ item.chiqim_summa | numFormat }}</router-link
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
                    <td colspan="3" class="cell100">
                      {{ $t("Якуний қолдиқ") }}
                    </td>
                    <td class="cell100 column2 kol">
                      <span :class="{ red: results.end_total < 0 }">{{
                        results.end_total | numFormat
                      }}</span>
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
    <kontragent :datas="datas"></kontragent>
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
import { print } from "../../../components/mixins/print.js";
import { Kontragent, Unit, Model, Brand, Colour, Sklad } from "@/pages";
export default {
  components: { Kontragent, Unit, Model, Brand, Colour, Sklad },
  mixins: [print],

  data() {
    return {
      datas: {
        date1: new Date().toISOString().slice(0, 8) + "01",
        date2: new Date().toISOString().slice(0, 10),
        kontragent_id: 0,
        sklad_id: parseInt(localStorage.getItem("sklad_id"))
      },
      kontragent: "",
      kontragentlist: [],
      sklad: "",
      skladlist: [],
      errors: "",
      results: []
    };
  },
  created() {
    let self = this;
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
    if (localStorage.getItem("kontragent") != null) {
      self.datas.date1 = localStorage.getItem("date1");
      self.datas.date2 = localStorage.getItem("date2");
      self.datas.sklad_id = parseInt(localStorage.getItem("sklad_id"));
      self.datas.kontragent_id = localStorage.getItem("kontragent");
      self.Send();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (localStorage.getItem("kontragent") != null) {
      localStorage.removeItem("kontragent");
      localStorage.removeItem("date1");
      localStorage.removeItem("date2");
      localStorage.removeItem("sklad_id");
    }
    next();
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
        new Date() + "kontragent_sverka.xlsx"
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
    Print() {
      let oldstr = window.document.body.innerHTML;
      let newstr = document.getElementById("tableId").innerHTML;
      window.document.body.innerHTML = newstr;
      window.print();
      window.document.body.innerHTML = oldstr;
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
        kontragent_id: self.datas.kontragent_id
      };
      axios({
        method: "post",
        url: "api/v1/akt-sverka/kontragent",
        data: datas
      }).then(function(response) {
        self.results = response.data;
        self.results.summ = { kirim_cash: 0, chiqim_cash: 0 };
        self.results.data.forEach(function(key, value) {
          self.results.summ.kirim_cash += parseInt(key.kirim_summa);
          self.results.summ.chiqim_cash += parseInt(key.chiqim_summa);
        });
      });
    }
  }
};
</script>
<style scoped>
.table100-body {
  max-height: 440px;
}
</style>
