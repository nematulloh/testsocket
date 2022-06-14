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
          class="form-control-sm md-input"
          :options="skladlist"
          @input="Send()"
          v-model="datas.sklad_id"
          :reduce="name => name.id"
          label="name"
          :clearable="false"
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
      <b-col lg="2" class="my-1">
        <label for="">Товар</label>
        <v-select
          class="form-control-sm"
          v-if="productlist != null"
          @search="query => (search = query)"
          :options="paginated"
          :filter-by="$store.state.myFilter"
          v-model="datas.product_id"
          :reduce="extra_name => extra_name.id"
          label="extra_name"
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
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              <em
                ><b>{{ search }}</b></em
              >
              {{ $t("бўйича маьлумот йўқ") }}
            </template>
            <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
          </template>
          <template #selected-option-container="{option}">
            <div class="vs__selected">
              <span v-if="typeof option.extra_name === 'number'">{{
                Label(option.extra_name)
              }}</span
              ><span v-else>{{ option.extra_name }}</span>
            </div>
          </template>
        </v-select>
      </b-col>
      <b-col lg="2" class="my-1">
        <label for="">{{ $t("Нарх") }}</label>
        <v-select
          :clearable="false"
          class="form-control-sm"
          :options="senalist"
          @input="Jami()"
          v-model="datas.price"
          :reduce="name => name.id"
          label="name"
        >
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
      <b-col lg="2" class="my-1">
        <button type="button" class="btn mybtn" @click="Send()">
          {{ $t("Кўриш") }}
        </button>
        <button type="button" class="btn mybtn" @click="Print2()">
          <b-icon icon="printer"></b-icon>
        </button>
        <button type="button" class="btn mybtn" @click="Excel()">
          <b-icon icon="cloud-download"></b-icon> Excel
        </button>
      </b-col>
      <span v-if="results[0] != null" id="oldtable">  
        <md-card>
          <md-card-content>
        <table class="table table-bordered" style="font-size: 12px;">
          <thead class="thead-light">
            <tr>
              <th class="column1" rowspan="2">#</th>
              <th style="width: 30%!important;" rowspan="2">{{ $t("Номи") }}</th>
              <th class="column4" colspan="2">{{ $t("Бошланғич") }}</th>
              <th class="column4" colspan="2">{{ $t("Кирим") }}</th>
              <th class="column4" colspan="2">{{ $t("Чиқим") }}</th>
              <th class="column4" colspan="2">{{ $t("Якуний") }}</th>
            </tr>
            <tr>
              <th class="column2">{{$t('Сони')}}</th>
              <th class="column2">Сумма</th>
              <th class="column2">{{$t('Сони')}}</th>
              <th class="column2">Сумма</th>
              <th class="column2">{{$t('Сони')}}</th>
              <th class="column2">Сумма</th>
              <th class="column2">{{$t('Сони')}}</th>
              <th class="column2">Сумма</th>
            </tr>
          </thead>
          <tbody style="overflow: hidden;">
            <VueAutoVirtualScrollList :totalHeight="450" :defaultHeight="50" style="width: 100%!important;height: 58vh;">
              <tr :style="{ height: `${index / 1000 + 20}px` }" class="row100 body" v-for="(item, index) in results" :key="index">
                <td class="column1">{{ index + 1 }}</td>
                <td style="width: 30%!important;">{{ item.name }}</td>
                <td class="column2 kol">{{ item.begin_balance|numFormat0 }}</td>
                <td class="kol column2">{{ Format_bosh_summa(item) }}</td>
                <td class="column2 kol">{{ item.balance_kirim|numFormat0 }}</td>
                <td class="kol column2">{{ Format_kirim_summa(item) }}</td>
                <td class="column2 kol">{{ item.balance_chiqim|numFormat0 }}</td>
                <td class="kol column2">{{ Format_chiqim_summa(item) }}</td>
                <td class="column2 kol">{{ item.end_balance|numFormat0 }}</td>
                <td class="kol column2">{{ Format_end_summa(item) }}</td>
              </tr>
            </VueAutoVirtualScrollList>
          </tbody>
          <thead class="thead-light spesific">
          <tr>
            <th style="width: 35%;">Жами</th>
            <th class="column2 kol">{{ summ.begin_kol | numFormat0 }}</th>
            <th class="column2 kol">{{ summ.begin_summ | numFormat0 }}</th>
            <th class="column2 kol">{{ summ.kirim_kol | numFormat0 }}</th>
            <th class="column2 kol">{{ summ.kirim_summ | numFormat0 }}</th>
            <th class="column2 kol">{{ summ.chiqim_kol | numFormat0 }}</th>
            <th class="column2 kol">{{ summ.chiqim_summ | numFormat0 }}</th>
            <th class="column2 kol">{{ summ.end_kol | numFormat0 }}</th>
            <th class="column2 kol">{{ summ.end_summ | numFormat0 }}</th>
          </tr>
        </thead>
        </table>  
        </md-card-content>
        </md-card>
      </span>
    </b-row>
    <sklad :datas="datas"></sklad>
  </b-container>
</template>

<script>
var XLSX = require("xlsx");
import ZkTable from 'vue-table-with-tree-grid';
var FileSaver = require("file-saver");
import VueAutoVirtualScrollList from "vue-auto-virtual-scroll-list";
import $ from "jquery";
import { print } from "../../../components/mixins/print.js";
import { Sklad } from "@/pages";
export default {
  components: { Sklad,ZkTable,VueAutoVirtualScrollList},
  mixins: [print],
  data() {
    return {
     datas: {
        date1: new Date().toISOString().slice(0, 8) + "01",
        date2: new Date().toISOString().slice(0, 10),
        product_id: null,
        sklad_id: parseInt(localStorage.getItem("sklad_id")),
        price: "prixod_price"
      },
      senalist: [
        { id: "prixod_price", name: this.$t("Кирим") },
        { id: "optom_price", name: this.$t("Улгуржи") },
        { id: "chakana_price", name: this.$t("Чакана") }
      ],
      summ: {
        begin_kol: 0,
        begin_summ: 0,
        kirim_kol: 0,
        kirim_summ: 0,
        chiqim_kol: 0,
        chiqim_summ: 0,
        end_kol: 0,
        end_summ: 0
      },
      sklad: "",
      skladlist: [],
      results: []
    };
  },
  computed: {
      propList() {
        return Object.keys(this.props).map(item => ({
          name: item,
        }));
      },
    },
  mounted() {
    (window.onstorage = () => {
      if (localStorage.getItem("setted_product") > 0) {
        this.Productlist();
        this.datas.product_id = parseInt(
          localStorage.getItem("setted_product")
        );
        localStorage.setItem("setted_product", 0);
      }
    }),
      setTimeout(() => {
        localStorage.setItem("sklad_id_dok", this.datas.sklad_id);
        localStorage.setItem("created_at_dok", this.datas.date2);
      }, 1000);
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
    Format: function(field, data, column) {
      return this.$options.filters.numFormat0(data[field]);
    },
    Format_bosh_summa: function(item) {
      if (this.datas.price == "prixod_price") {
        return this.$options.filters.numFormat0(item.begin_debit_summa);
      } else if (this.datas.price == "optom_price") {
        return this.$options.filters.numFormat0(item.begin_optom_summa);
      } else if (this.datas.price == "chakana_price") {
        return this.$options.filters.numFormat0(item.begin_chakana_summa);
      }
    },
    Format_kirim_summa: function(item) {
      if (this.datas.price == "prixod_price") {
        return this.$options.filters.numFormat0(item.debit_summa_kirim);
      } else if (this.datas.price == "optom_price") {
        return this.$options.filters.numFormat0(item.optom_summa_kirim);
      } else if (this.datas.price == "chakana_price") {
        return this.$options.filters.numFormat0(item.chakana_summa_kirim);
      }
    },
    Format_chiqim_summa: function(item) {
      if (this.datas.price == "prixod_price") {
        return this.$options.filters.numFormat0(item.debit_summa_chiqim);
      } else if (this.datas.price == "optom_price") {
        return this.$options.filters.numFormat0(item.optom_summa_chiqim);
      } else if (this.datas.price == "chakana_price") {
        return this.$options.filters.numFormat0(item.chakana_summa_chiqim);
      }
    },
    Format_end_summa: function(item) {
      if (this.datas.price == "prixod_price") {
        return this.$options.filters.numFormat0(item.end_debit_summa);
      } else if (this.datas.price == "optom_price") {
        return this.$options.filters.numFormat0(item.end_optom_summa);
      } else if (this.datas.price == "chakana_price") {
        return this.$options.filters.numFormat0(item.end_chakana_summa);
      }
    },
    Selectproduct(index) {
      this.$store.state.selected_index = index;
      let routeData = this.$router.resolve({ name: "Товар модал" });
      window.open(routeData.href, "_blank", "width=1200, height=1000");
    },
    Table() {
      var sikl = "";
      let self = this;
      this.results.forEach(function(key, value) {
        var index = value + 1;
        sikl =
          sikl +
          `<tr>
                          <td>` +
          index +
          `</td>
                          <td>
                            ` +
          key.name +
          `
                          </td>
                          <td>
                              ` +
          key.begin_balance +
          `
                          </td>
                          <td>
                            ` +
          self.Beginsumma(value) +
          `
                          </td>
                          <td>
                             ` +
          key.balance_kirim +
          `
                          </td>
                          <td>
                            ` +
          self.Kirimsumma(value) +
          `
                          </td>
                          <td>
                            ` +
          key.balance_chiqim +
          `
                          </td>
                          <td>
                            ` +
          self.Chiqimsumma(value) +
          `
                          </td>
                          <td>
                            ` +
          key.end_balance +
          `
                          </td>
                          <td>
                            ` +
          self.Endsumma(value) +
          `
                          </td>
                        </tr>`;
      });
      var table =
        `
                <table class='table table-bordered'>
                    <tr>
                      <th rowspan="2">#</th>
                      <th rowspan="2">` +
        this.$t("Номи") +
        `</th>
                      <th colspan="2">` +
        this.$t("Бошланғич") +
        `</th>
                      <th colspan="2">` +
        this.$t("Кирим") +
        `</th>
                      <th colspan="2">` +
        this.$t("Чиқим") +
        `</th>
                      <th colspan="2">` +
        this.$t("Якуний") +
        `</th>
                    </tr>
                    <tr>
                      <th>Кол.</th>
                      <th>Cумма</th>
                      <th>Кол.</th>
                      <th>Cумма</th>
                      <th>Кол.</th>
                      <th>Cумма</th>
                      <th>Кол.</th>
                      <th>Cумма</th>
                    </tr>
                    <tr>
                    <th colspan="2">` +
        this.$t("Жами") +
        `</th>
                    <th>` +
        this.summ.begin_kol +
        `</span></th>
                    <th>` +
        this.$options.filters.numFormat0(this.summ.begin_summ) +
        `</span></th>
                    <th>` +
        this.summ.kirim_kol +
        `</span></th>
                    <th>` +
        this.$options.filters.numFormat0(this.summ.kirim_summ) +
        `</span></th>
                    <th>` +
        this.summ.chiqim_kol +
        `</span></th>
                    <th>` +
        this.$options.filters.numFormat0(this.summ.chiqim_summ) +
        `</span></th>
                    <th>` +
        this.summ.end_kol +
        `</span></th>
                    <th>` +
        this.$options.filters.numFormat0(this.summ.end_summ) +
        `</span></th>
                    </tr>
                  ` +
        sikl +
        `
                </table>
          `;
      return table;
    },
    async Print2() {
      var head = $(".md-toolbar-section-start").html();
      if (head == undefined) {
        head = "";
      }
      var s = $(".content input")
        .eq(0)
        .val();
      var s1 = $(".content input")
        .eq(1)
        .val();
      var table = this.Table();
      window.document.body.innerHTML = head + table;
      $("input")
        .eq(0)
        .val(s);
      $("input")
        .eq(1)
        .val(s1);
      window.print();
      window.location.reload();
    },
    Excel() {
      $("#oldtable").html(this.Table());
      let wb = XLSX.utils.table_to_book(
          document.getElementById("oldtable")
        ),
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
        new Date() + "tovarxisobot.xlsx"
      );
      // self.Send();
       setTimeout(() => {
        window.location.reload();
       }, 2000);
    },
    Beginsumma(index) {
      if (this.datas.price == "prixod_price") {
        return this.results[index].begin_debit_summa;
      } else if (this.datas.price == "optom_price") {
        return this.results[index].begin_optom_summa;
      } else if (this.datas.price == "chakana_price") {
        return this.results[index].begin_chakana_summa;
      }
    },
    Kirimsumma(index) {
      if (this.datas.price == "prixod_price") {
        return this.results[index].debit_summa_kirim;
      } else if (this.datas.price == "optom_price") {
        return this.results[index].optom_summa_kirim;
      } else if (this.datas.price == "chakana_price") {
        return this.results[index].chakana_summa_kirim;
      }
    },
    Chiqimsumma(index) {
      if (this.datas.price == "prixod_price") {
        return this.results[index].debit_summa_chiqim;
      } else if (this.datas.price == "optom_price") {
        return this.results[index].optom_summa_chiqim;
      } else if (this.datas.price == "chakana_price") {
        return this.results[index].chakana_summa_chiqim;
      }
    },
    Endsumma(index) {
      if (this.datas.price == "prixod_price") {
        return this.results[index].end_debit_summa;
      } else if (this.datas.price == "optom_price") {
        return this.results[index].end_optom_summa;
      } else if (this.datas.price == "chakana_price") {
        return this.results[index].end_chakana_summa;
      }
    },
    Beginsummaseria(index, index1) {
      if (this.datas.price == "prixod_price") {
        return this.results[index].series[index1].begin_debit_summa;
      } else if (this.datas.price == "optom_price") {
        return this.results[index].series[index1].begin_optom_summa;
      } else if (this.datas.price == "chakana_price") {
        return this.results[index].series[index1].begin_chakana_summa;
      }
    },
    Kirimsummaseria(index, index1) {
      if (this.datas.price == "prixod_price") {
        return this.results[index].series[index1].debit_summa_kirim;
      } else if (this.datas.price == "optom_price") {
        return this.results[index].series[index1].optom_summa_kirim;
      } else if (this.datas.price == "chakana_price") {
        return this.results[index].series[index1].chakana_summa_kirim;
      }
    },
    Chiqimsummaseria(index, index1) {
      if (this.datas.price == "prixod_price") {
        return this.results[index].series[index1].debit_summa_chiqim;
      } else if (this.datas.price == "optom_price") {
        return this.results[index].series[index1].optom_summa_chiqim;
      } else if (this.datas.price == "chakana_price") {
        return this.results[index].series[index1].chakana_summa_chiqim;
      }
    },
    Endsummaseria(index, index1) {
      if (this.datas.price == "prixod_price") {
        return this.results[index].series[index1].end_debit_summa;
      } else if (this.datas.price == "optom_price") {
        return this.results[index].series[index1].end_optom_summa;
      } else if (this.datas.price == "chakana_price") {
        return this.results[index].series[index1].end_chakana_summa;
      }
    },
    Beginsummaitems(index, index1, index2) {
      if (this.datas.price == "prixod_price") {
        return this.results[index].series[index1].items[index2]
          .begin_debit_summa;
      } else if (this.datas.price == "optom_price") {
        return this.results[index].series[index1].items[index2]
          .begin_optom_summa;
      } else if (this.datas.price == "chakana_price") {
        return this.results[index].series[index1].items[index2]
          .begin_chakana_summa;
      }
    },
    Kirimsummaitems(index, index1, index2) {
      if (this.datas.price == "prixod_price") {
        return this.results[index].series[index1].items[index2]
          .debit_summa_kirim;
      } else if (this.datas.price == "optom_price") {
        return this.results[index].series[index1].items[index2]
          .optom_summa_kirim;
      } else if (this.datas.price == "chakana_price") {
        return this.results[index].series[index1].items[index2]
          .chakana_summa_kirim;
      }
    },
    Chiqimsummaitems(index, index1, index2) {
      if (this.datas.price == "prixod_price") {
        return this.results[index].series[index1].items[index2]
          .debit_summa_chiqim;
      } else if (this.datas.price == "optom_price") {
        return this.results[index].series[index1].items[index2]
          .optom_summa_chiqim;
      } else if (this.datas.price == "chakana_price") {
        return this.results[index].series[index1].items[index2]
          .chakana_summa_chiqim;
      }
    },
    Endsummaitems(index, index1, index2) {
      if (this.datas.price == "prixod_price") {
        return this.results[index].series[index1].items[index2].end_debit_summa;
      } else if (this.datas.price == "optom_price") {
        return this.results[index].series[index1].items[index2].end_optom_summa;
      } else if (this.datas.price == "chakana_price") {
        return this.results[index].series[index1].items[index2]
          .end_chakana_summa;
      }
    },
    Jami() {
      let self = this;
      self.summ = {
        begin_kol: 0,
        begin_summ: 0,
        kirim_kol: 0,
        kirim_summ: 0,
        chiqim_kol: 0,
        chiqim_summ: 0,
        end_kol: 0,
        end_summ: 0
      };
      self.results.forEach(function(key, value) {
        self.summ.begin_kol += parseInt(key.begin_balance);
        self.summ.begin_summ += parseInt(self.Beginsumma(value));
        self.summ.kirim_kol += parseInt(key.balance_kirim);
        self.summ.kirim_summ += parseInt(self.Kirimsumma(value));
        self.summ.chiqim_kol += parseInt(key.balance_chiqim);
        self.summ.chiqim_summ += parseInt(self.Chiqimsumma(value));
        self.summ.end_kol += parseInt(key.end_balance);
        self.summ.end_summ += parseInt(self.Endsumma(value));
      });
    },
    Clicked(id) {
      localStorage.setItem("date1", this.datas.date1);
      localStorage.setItem("date2", this.datas.date2);
      localStorage.setItem("product_id", id);
      localStorage.setItem("sklad_id", this.datas.sklad_id);
      let routeData = this.$router.resolve({ path: "/xisobot/sverka/product" });
      window.open(routeData.href, "_blank");
    },
    Send() {
      let self = this;
      self.results = [];
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
        product_id: self.datas.product_id
      };
      axios({
        method: "post",
        url: "api/v1/report/product",
        data: datas
      }).then(function(response) {
        self.results = response.data;
        // self.dataSourceSettings.dataSource = response.data;
        self.Jami();
        // setTimeout(() => {
        // $('.atable').eq(0).focus();
        // }, 100);
      });
    }
  }
};
</script>
<style>
  .spesific .kol{
    text-align: right!important;
  }
  .spesific .left{
    text-align: left!important;
  }
  .spesific{
    width: calc(100% - 9px)!important;
  }
  /* .zk-table__body-cell:nth-child(3),.zk-table__body-cell:nth-child(5),.zk-table__body-cell:nth-child(7),.zk-table__body-cell:nth-child(9){
    text-align: end!important;
  }
  .zk-table__body-row{
    height: auto!important;
  }
  .zk-table{
    font-size: 14px!important;
  }
  .zk-table__cell-inner{
    padding: 5px!important;
  }
  .zk-table {
    line-height: 14px!important;
  }
  .zk-table td{
    padding: 0!important;
  }
  .zk-table__header{
    width: calc(100% - 12px)!important;
  }
  .zk-table th{
    background-color:rgb(186 225 225)!important;
  }
  .spesific td{
    background-color:rgb(186 225 225)!important;
  }
  .zk-table__body-cell, .zk-table__footer-cell, .zk-table__header-cell{
    word-break: keep-all!important;
    border-right: 1px solid #aaa;
  }
  .zk-table__body{
    display: block!important;
  height: 62vh !important;
  overflow: auto !important;
 }  */
</style>
<style scoped>
  /* * {
    margin: 0;
    padding: 0;
  } */
  /* .switch-list {
    margin: 20px 0;
    list-style: none;
    overflow: hidden;
  }
  .switch-item {
    margin: 20px;
    float: left;
  } */
/* .zk-table__body tbody {
  height: 28vh !important;
  overflow: auto !important; */
/* } */

/* .btn.btn-secondary {
  float: right !important;
  padding: 2px 9px !important;
} */

.second > tr {
  background: #c0c0c03d;
}

.first > tr {
  font-weight: bold;
  background: rgb(211, 209, 208);
}

.spesific td {
  font-weight: bold;
  font-size: 14px;
}
.spesific {
  background-color: antiquewhite;
}
</style>
