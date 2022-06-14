<template>
  <b-container fluid>
    <b-row>
      <b-col lg="3" class="my-1">
        <label for="">{{ $t("Вақт") }} 1</label>
        <input class="form-control" type="date" v-model="datas.date1" />
      </b-col>
      <b-col lg="3" class="my-1">
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
      <b-col lg="4" class="my-1">
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
            <div class="table100 ver1 m-b-110">
              <div class="table100-head">
                <table>
                  <thead>
                    <tr class="row100 head">
                      <th class="cell100 column2" rowspan="2">
                        {{ $t("Вақт") }}
                      </th>
                      <th class="cell100 column3" rowspan="2">
                        {{ $t("Нахд") }}
                      </th>
                      <th class="cell100 column3" colspan="2">Пластик</th>
                      <th class="cell100 column3" colspan="2">
                        {{ $t("Насия") }}
                      </th>
                      <th class="cell100 column3" colspan="2">Скидка</th>
                      <th class="cell100 column4" colspan="2">
                        {{ $t("Жами") }}
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="table100-body js-pscroll">
                <table>
                  <tbody v-for="(item1, index1) in results" :key="index1">
                    <tr class="row100 body summatable1">
                      <td class="cell100 column2">
                        {{
                          new Date(index1).toLocaleString("ru-Ru", {
                            month: "long"
                          })
                        }}
                      </td>
                      <td class="cell100 kol column3">{{ Setted(item1) }}</td>
                      <td class="cell100 kol column3">
                        {{ item1.plastik | numFormat }}
                      </td>
                      <td class="cell100 kol column3">
                        {{ item1.nasiya | numFormat }}
                      </td>
                      <td class="cell100 kol column3">
                        {{ item1.skidka | numFormat }}
                      </td>
                      <td class="cell100 kol column4">
                        {{ item1.total | numFormat }}
                      </td>
                    </tr>
                    <tr
                      class="row100 body"
                      v-for="(item, index) in item1"
                      :key="index"
                    >
                      <td class="cell100 column2">{{ item.day }}</td>
                      <td class="cell100 kol column3">
                        {{ item.total_cash | numFormat }}
                      </td>
                      <td class="cell100 kol column3">
                        {{ item.total_plastic | numFormat }}
                      </td>
                      <td class="cell100 kol column3">
                        {{ item.total_credit | numFormat }}
                      </td>
                      <td class="cell100 kol column3">
                        {{ item.total_skidka | numFormat }}
                      </td>
                      <td class="cell100 kol column4">
                        {{ item.total | numFormat }}
                      </td>
                    </tr>
                  </tbody>
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
import { print } from "../../../components/mixins/print.js";
import { Paytype, Unit, Model, Brand, Colour, Sklad } from "@/pages";
export default {
  components: { Paytype, Unit, Model, Brand, Colour, Sklad },
  mixins: [print],
  data() {
    return {
      datas: {
        date1: new Date().toISOString().slice(0, 8) + "01",
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
    Setted: function(item1) {
      item1.total = 0;
      item1.naqd = 0;
      item1.plastik = 0;
      item1.skidka = 0;
      item1.nasiya = 0;
      item1.forEach(function(key, value) {
        item1.total += parseInt(key.total);
        item1.naqd += parseInt(key.total_cash);
        item1.nasiya += parseInt(key.total_credit);
        item1.skidka += parseInt(key.total_skidka);
        item1.plastik += parseInt(key.total_plastic);
      });
      return item1.naqd;
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
          type: "application/octet-stream;charsetted=utf-8"
        }),
        new Date() + "kunlik_aylanma.xlsx"
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
        url: "api/v1/report/daily-rasxod",
        headers: {
          "Content-Type": "application/json"
        },
        data: datas
      }).then(function(response) {
        self.results = response.data;
      });
    }
  }
};
</script>
<style scoped>
.table100-body {
  max-height: 77vh;
}
</style>
