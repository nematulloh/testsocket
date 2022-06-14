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
                      <th class="cell100 column6"></th>
                      <th class="cell100 column4">
                        {{ $t("Бошланғич қолдиқ") }}
                      </th>
                      <th class="cell100 column3">{{ $t("Кирим") }}</th>
                      <th class="cell100 column3">{{ $t("Чиқим") }}</th>
                      <th class="cell100 column4">{{ $t("Якуний қолдиқ") }}</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="table100-body" v-if="results.product">
                <table>
                  <tbody>
                    <tr class="row100 body">
                      <td class="cell100 column6">
                        {{ $t("Товар хисоботи") }}
                      </td>
                      <td class="cell100 kol column4">
                        <span
                          :class="{ red: results.product.begin_total < 0 }"
                          >{{ results.product.begin_total | numFormat }}</span
                        >
                      </td>
                      <td class="cell100 kol column3">
                        {{ results.product.total_kirim | numFormat }}
                      </td>
                      <td class="cell100 kol column3">
                        {{ results.product.total_chiqim | numFormat }}
                      </td>
                      <td class="cell100 kol column4">
                        <span :class="{ red: results.product.end_total < 0 }">{{
                          results.product.end_total | numFormat
                        }}</span>
                      </td>
                    </tr>
                    <tr class="row100 body" v-if="datas.sklad_id == 1">
                      <td class="cell100 column6">
                        {{ $t("Бошқа омборлар") }}
                      </td>
                      <td class="cell100 kol column4">
                        <span
                          :class="{
                            red: results.product_others.begin_total < 0
                          }"
                          >{{
                            results.product_others.begin_total | numFormat
                          }}</span
                        >
                      </td>
                      <td class="cell100 kol column3">
                        {{ results.product_others.total_kirim | numFormat }}
                      </td>
                      <td class="cell100 kol column3">
                        {{ results.product_others.total_chiqim | numFormat }}
                      </td>
                      <td class="cell100 kol column4">
                        <span
                          :class="{ red: results.product_others.end_total < 0 }"
                          >{{
                            results.product_others.end_total | numFormat
                          }}</span
                        >
                      </td>
                    </tr>
                    <span
                      style="display: contents;"
                      v-for="item in results.product_others.items"
                      :key="item.id"
                    >
                      <tr class="row100 body" v-if="datas.sklad_id == 1">
                        <td class="cell100 column6 kol">{{ item.sklad }}</td>
                        <td class="cell100 kol column4">
                          <span :class="{ red: item.begin_total < 0 }">{{
                            item.begin_total | numFormat
                          }}</span>
                        </td>
                        <td class="cell100 kol column3">
                          {{ item.total_kirim | numFormat }}
                        </td>
                        <td class="cell100 kol column3">
                          {{ item.total_chiqim | numFormat }}
                        </td>
                        <td class="cell100 kol column4">
                          <span :class="{ red: item.end_total < 0 }">{{
                            item.end_total | numFormat
                          }}</span>
                        </td>
                      </tr>
                    </span>

                    <tr class="row100 body">
                      <td class="cell100 column6">
                        {{ $t("Контрагент хисоботи") }}
                      </td>
                      <td class="cell100 kol column4">
                        <span
                          :class="{ red: results.kontragent.begin_total < 0 }"
                          >{{
                            results.kontragent.begin_total | numFormat
                          }}</span
                        >
                      </td>
                      <td class="cell100 kol column3">
                        {{ results.kontragent.total_kirim | numFormat }}
                      </td>
                      <td class="cell100 kol column3">
                        {{ results.kontragent.total_chiqim | numFormat }}
                      </td>
                      <td class="cell100 kol column4">
                        <span
                          :class="{ red: results.kontragent.end_total < 0 }"
                          >{{ results.kontragent.end_total | numFormat }}</span
                        >
                      </td>
                    </tr>
                    <span
                      style="display: contents;"
                      v-for="item in results.kassa"
                      :key="item.id"
                    >
                      <tr class="row100 body">
                        <td class="cell100 column6">
                          {{ $t("Касса китоби") }}({{ item.pay_type.name }})
                        </td>
                        <td class="cell100 kol column4">
                          <span :class="{ red: item.begin_total < 0 }">{{
                            item.begin_total | numFormat
                          }}</span>
                        </td>
                        <td class="cell100 kol column3">
                          {{ item.total_kirim | numFormat }}
                        </td>
                        <td class="cell100 kol column3">
                          {{ item.total_chiqim | numFormat }}
                        </td>
                        <td class="cell100 kol column4">
                          <span :class="{ red: item.end_total < 0 }">{{
                            item.end_total | numFormat
                          }}</span>
                        </td>
                      </tr>
                    </span>

                    <span
                      style="display: contents;"
                      v-for="item1 in results.kassa_order"
                      :key="item1.id"
                    >
                      <tr class="row100 body">
                        <td class="cell100 column6">
                          {{ $t("Харажат") }}({{ item1.pay_type.name }})
                        </td>
                        <td class="cell100 kol column4">
                          <span :class="{ red: item1.begin_total < 0 }">{{
                            item1.begin_total | numFormat
                          }}</span>
                        </td>
                        <td class="cell100 kol column3">
                          {{ item1.total_kirim | numFormat }}
                        </td>
                        <td class="cell100 kol column3">
                          {{ item1.total_chiqim | numFormat }}
                        </td>
                        <td class="cell100 kol column4">
                          <span :class="{ red: item1.end_total < 0 }">{{
                            item1.end_total | numFormat
                          }}</span>
                        </td>
                      </tr>
                    </span>

                    <tr class="row100 body">
                      <td class="cell100 column6">{{ $t("Скидка") }}</td>
                      <td class="cell100 kol column4">
                        <span
                          :class="{ red: results.skidka.begin_total < 0 }"
                          >{{ results.skidka.begin_total | numFormat }}</span
                        >
                      </td>
                      <td class="cell100 kol column3">
                        {{ results.skidka.total_kirim | numFormat }}
                      </td>
                      <td class="cell100 kol column3">
                        {{ results.skidka.total_chiqim | numFormat }}
                      </td>
                      <td class="cell100 kol column4">
                        <span :class="{ red: results.skidka.end_total < 0 }">{{
                          results.skidka.end_total | numFormat
                        }}</span>
                      </td>
                    </tr>
                    <tr class="row100 body">
                      <td class="cell100 column6">
                        {{ $t("Фойда хисоботи") }}
                      </td>
                      <td class="cell100 kol column4">
                        <span
                          :class="{ red: results.profit.begin_total < 0 }"
                          >{{ results.profit.begin_total | numFormat }}</span
                        >
                      </td>
                      <td class="cell100 kol column3">
                        {{ results.profit.total_kirim | numFormat }}
                      </td>
                      <td class="cell100 kol column3">
                        {{ results.profit.total_chiqim | numFormat }}
                      </td>
                      <td class="cell100 kol column4">
                        <span :class="{ red: results.profit.end_total < 0 }">{{
                          results.profit.end_total | numFormat
                        }}</span>
                      </td>
                    </tr>
                    <tr class="row100 body">
                      <td class="cell100 column6">
                        {{ $t("Бошланғич қолдиқ") }}
                      </td>
                      <td class="cell100 kol column4">
                        <span
                          :class="{
                            red: results.initial_balance.begin_total < 0
                          }"
                          >{{
                            results.initial_balance.begin_total | numFormat
                          }}</span
                        >
                      </td>
                      <td class="cell100 kol column3">
                        {{ results.initial_balance.total_kirim | numFormat }}
                      </td>
                      <td class="cell100 kol column3">
                        {{ results.initial_balance.total_chiqim | numFormat }}
                      </td>
                      <td class="cell100 kol column4">
                        <span
                          :class="{
                            red: results.initial_balance.end_total < 0
                          }"
                          >{{
                            results.initial_balance.end_total | numFormat
                          }}</span
                        >
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
    <sklad :datas="datas"></sklad>
  </b-container>
</template>

<script>
var XLSX = require("xlsx");
var FileSaver = require("file-saver");
import { Sklad } from "@/pages";
import { print } from "../../../components/mixins/print.js";
export default {
  components: { Sklad },
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
        new Date() + "balans_xisobot.xlsx"
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
        url: "api/v1/report/balance",
        data: datas
      }).then(function(response) {
        self.results = response.data;
      });
    }
  }
};
</script>
