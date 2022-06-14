<template>
  <b-container fluid>
    <b-row>
      <b-col lg="2" class="my-1">
        <label for="">Вақт 1</label>
        <input class="form-control" type="date" v-model="datas.date1" />
      </b-col>
      <b-col lg="2" class="my-1">
        <label for="">Вақт 2</label>
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
              бўйича маьлумот йўқ
              <button
                type="button"
                @click="sklad.name = search"
                v-b-modal.modal-sklad
              >
                +
              </button>
            </template>
            <em style="opacity: 0.5;" v-else>Маьлумот йўқ</em>
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
              бўйича маьлумот йўқ
              <button
                type="button"
                @click="kontragent.name = search"
                v-b-modal.modal-kontragent
              >
                +
              </button>
            </template>
            <em style="opacity: 0.5;" v-else>Маьлумот йўқ</em>
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
                      <th class="cell100 column3">{{ $t("Бош. қолдиқ") }}</th>
                      <th class="cell100 column3">{{ $t("Кирим") }}</th>
                      <th class="cell100 column3">{{ $t("Чиқим") }}</th>
                      <th class="cell100 column3">{{ $t("Якуний қолдиқ") }}</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="table100-body js-pscroll">
                <table>
                  <tbody>
                    <tr
                      class="row100 body"
                      v-for="(item, index) in results"
                      :key="index"
                    >
                      <td class="cell100 column1">
                        <button
                          type="button"
                          class="noborder"
                          @click="Clicked(item.id)"
                        >
                          {{ index + 1 }}
                        </button>
                      </td>
                      <td class="cell100">
                        <button
                          type="button"
                          class="noborder"
                          @click="Clicked(item.id)"
                        >
                          {{ item.name }}
                        </button>
                      </td>
                      <td class="cell100 column3 kol">
                        <button
                          type="button"
                          class="noborder"
                          @click="Clicked(item.id)"
                        >
                        <span :class="{ red: item.begin_total < 0 }">
                          {{ item.begin_total | numFormat }}
                          </span>
                        </button>
                      </td>
                      <td class="cell100 column3 kol">
                        <button
                          type="button"
                          class="noborder"
                          @click="Clicked(item.id)"
                        >
                        <span :class="{ red: item.total_kirim < 0 }">
                          {{ item.total_kirim | numFormat }}
                          </span>
                        </button>
                      </td>
                      <td class="cell100 column3 kol">
                        <button
                          type="button"
                          class="noborder"
                          @click="Clicked(item.id)"
                        >
                        <span :class="{ red: item.total_chiqim < 0 }">
                          {{ item.total_chiqim | numFormat }}
                          </span>
                        </button>
                      </td>
                      <td class="cell100 column3 kol">
                        <button
                          type="button"
                          class="noborder"
                          @click="Clicked(item.id)"
                        >
                          <span :class="{ red: item.end_total < 0 }">{{
                            item.end_total|numFormat
                          }}</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="table100-body summatable1">
                <table>
                  <tr>
                    <td class="cell100">{{ $t("Жами") }}</td>
                    <td class="cell100 column3  kol">
                      <span :class="{ red: bosh_summ < 0 }">{{
                        bosh_summ | numFormat
                      }}</span>
                    </td>
                    <td class="cell100 column3  kol">
                      <span :class="{ red: kirim_summ < 0 }">{{
                        kirim_summ | numFormat
                      }}</span>
                    </td>
                    <td class="cell100 column3  kol">
                      <span :class="{ red: chiqim_summ < 0 }">{{
                        chiqim_summ | numFormat
                      }}</span>
                    </td>
                    <td class="cell100 column3  kol">
                      <span :class="{ red: summ < 0 }">{{
                        summ | numFormat
                      }}</span>
                    </td>
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
        kontragent_id: null,
        sklad_id: parseInt(localStorage.getItem("sklad_id"))
      },
      summ: 0,
      bosh_summ:0,
      kirim_summ:0,
      chiqim_summ:0,
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
        new Date() + "kontragent_xisobot.xlsx"
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
    Clicked(id) {
      localStorage.setItem("date1", this.datas.date1);
      localStorage.setItem("date2", this.datas.date2);
      localStorage.setItem("kontragent", id);
      localStorage.setItem("sklad_id", this.datas.sklad_id);
      this.$router.push({ path: "/xisobot/sverka/kontragent" });
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
        url: "api/v1/report/kontragent",
        data: datas
      }).then(function(response) {
        self.results = response.data;
        self.summ = 0;
        self.bosh_summ = 0;
        self.kirim_summ = 0;
        self.chiqim_summ = 0;
        self.results.forEach(function(key, value) {
          self.summ += parseFloat(key.end_total);
          self.bosh_summ+=parseFloat(key.begin_total);
          self.kirim_summ+=parseFloat(key.total_kirim);
          self.chiqim_summ+=parseFloat(key.total_chiqim);
        });
      });
    }
  }
};
</script>
<style scoped>
.table100-body {
  max-height: 460px;
}
</style>
