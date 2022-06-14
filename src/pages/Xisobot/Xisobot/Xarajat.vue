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
      <b-col lg="6" class="my-1">
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
                      <th class="cell100 column4">{{ $t("Номи") }}</th>
                      <th class="cell100 column4">{{ $t("Вақт") }}</th>
                      <th class="cell100 column4">Комментарий</th>
                      <th class="cell100 column4">{{ $t("Нахд") }}</th>
                      <th class="cell100 column4">Пластик</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="table100-body js-pscroll">
                <table>
                  <tbody v-for="(item1, index1) in results" :key="index1">
                    <tr class="row100 body summatable1">
                      <td class="cell100" colspan="3" style="width: 60%;">
                        {{ item1.sklad }}
                        <b-button v-b-toggle="'collapse-' + index1">+</b-button>
                      </td>
                      <td class="cell100 kol column4">
                        {{ item1.cash_summa | numFormat }}
                      </td>
                      <td class="cell100 kol column4">
                        {{ item1.plastic_summa | numFormat }}
                      </td>
                    </tr>
                    <b-collapse :id="'collapse-' + index1" class="mt-2">
                      <span
                        class="template-cell"
                        style="display: contents;"
                        v-for="(item, index) in item1.base"
                        :key="index"
                      >
                        <tr class="row100 body">
                          <td class="cell100" colspan="3" style="width: 60%;">
                            {{ item.name }}
                          </td>
                          <td class="cell100 kol column4">
                            {{ item.cash_summa | numFormat }}
                          </td>
                          <td class="cell100 kol column4">
                            {{ item.plastic_summa | numFormat }}
                          </td>
                        </tr>
                        <tr
                          class="row100 body"
                          v-for="(item2, index2) in item.items"
                          :key="index2"
                        >
                          <td class="cell100  column4"></td>
                          <td class="cell100  column4">
                            {{ Dates(item2.datetime) }}
                          </td>
                          <td class="cell100 column4">{{ item2.comment }}</td>
                          <td class="cell100 column4 kol">
                            <span v-if="item2.pay_type.name == 'Нақд'">{{
                              item2.summa | numFormat
                            }}</span>
                          </td>
                          <td class="cell100 column4 kol">
                            <span v-if="item2.pay_type.name == 'Пластик'">{{
                              item2.summa | numFormat
                            }}</span>
                          </td>
                        </tr>
                      </span>
                    </b-collapse>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
var XLSX = require("xlsx");
var FileSaver = require("file-saver");
import { print } from "../../../components/mixins/print.js";
export default {
  data() {
    return {
      datas: {
        date1: new Date().toISOString().slice(0, 8) + "01",
        date2: new Date().toISOString().slice(0, 10)
      },
      results: []
    };
  },
  mixins: [print],
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
          type: "application/octet-stream;charsetted=utf-8"
        }),
        new Date() + "xarajat.xlsx"
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
          ) + 86399
      };
      axios({
        method: "post",
        url: "api/v1/report/kassa-order",
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
