<template>
  <b-container fluid id="tableId">
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
      <b-col lg="6" class="my-1">
        <br />
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
      <md-card>
        <md-card-content>
          <table class="table table-bordered">
            <thead class="thead-light">
              <tr>
                <th class="column1">#</th>
                <th style="width: 35%!important;">{{ $t("Номи") }}</th>
                <th class="column2">{{ $t("Cони") }}</th>
                <th class="column3">{{ $t("Сотиш сумма") }}</th>
                <th class="column3">{{ $t("Тан нарх") }}</th>
                <th class="column1">{{ $t("Фоиз") }}</th>
                <th class="column3">{{ $t("Фойда") }}</th>
              </tr>
            </thead>
            <tbody style="overflow: hidden;">
              <VueAutoVirtualScrollList
                :totalHeight="totalheight"
                :defaultHeight="defaultHeight"
                style="width: 100%!important;height: 60vh;"
              >
                <tr
                  :style="{ height: `${index / 1000 + 20}px` }"
                  class="row100 body"
                  v-for="(item, index) in results"
                  :key="index"
                >
                  <td class="column1">
                    {{ index + 1 }}
                  </td>
                  <td style="width: 35%!important;">
                    <button
                      type="button"
                      class="noborder"
                      @click="Clicked(item.product.id)"
                      v-if="item.product"
                    >
                      {{ item.product.extra_name }}
                    </button>
                  </td>
                  <td class="column2 kol">
                    <button
                      type="button"
                      class="noborder"
                      @click="Clicked(item.product.id)"
                    >
                      {{ item.balance | numFormat0 }}
                    </button>
                  </td>
                  <td class="column3 kol">
                    <button
                      type="button"
                      class="noborder"
                      @click="Clicked(item.product.id)"
                    >
                      {{ item.total_sold_summa | numFormat0 }}
                    </button>
                  </td>
                  <td class="column3 kol">
                    <button
                      type="button"
                      class="noborder"
                      @click="Clicked(item.product.id)"
                    >
                      {{ item.total_body_summa | numFormat0 }}
                    </button>
                  </td>
                  <td class="column1 kol">
                    <button
                      type="button"
                      class="noborder"
                      @click="Clicked(item.product.id)"
                      v-if="item.total_profit_percent!=null"
                    >
                      {{ parseFloat(item.total_profit_percent).toFixed(0) }}
                    </button>
                    <span v-else>
                      0
                    </span>
                  </td>
                  <td class="column3 kol">
                    <button
                      type="button"
                      class="noborder"
                      @click="Clicked(item.product.id)"
                    >
                      {{ item.total_profit_summa | numFormat0 }}
                    </button>
                  </td>
                </tr>
              </VueAutoVirtualScrollList>
            </tbody>
            <thead>
              <tr style="background: #aaa;">
                <td colspan="2">{{ $t("Жами") }}</td>
                <td class="column2 kol">{{ summ.kol | numFormat0 }}</td>
                <td class="column3 kol">{{ summ.sold | numFormat0 }}</td>
                <td class="column3 kol">{{ summ.body | numFormat0 }}</td>
                <td class="column1 kol">
                  {{ parseFloat((summ.profit / summ.body) * 100).toFixed(0) }}
                </td>
                <td class="column3 kol">{{ summ.profit | numFormat0 }}</td>
              </tr>
            </thead>
          </table>
        </md-card-content>
      </md-card>
    </b-row>

    <product :datas="datas"></product>
    <sklad :datas="datas"></sklad>
    <unit></unit>
    <model></model>
    <brand></brand>
    <colour></colour>
  </b-container>
</template>
<script>
import { Product, Unit, Model, Brand, Colour, Sklad } from "@/pages";
import VueAutoVirtualScrollList from "vue-auto-virtual-scroll-list";
import { print } from "../../../components/mixins/print.js";
export default {
  components: {
    Product,
    Unit,
    Model,
    Brand,
    Colour,
    Sklad,
    VueAutoVirtualScrollList
  },
  mixins: [print],
  data() {
    return {
      datas: {
        date1: new Date().toISOString().slice(0, 8) + "01",
        date2: new Date().toISOString().slice(0, 10),
        product_id: null,
        sklad_id: parseInt(localStorage.getItem("sklad_id"))
      },
      summ: { kol: 0, sold: 0, profit: 0, body: 0 },
      product: "",
      sklad: "",
      skladlist: [],
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
    Jami() {
      let self = this;
      self.summ = { kol: 0, sold: 0, profit: 0, body: 0 };
      self.results.forEach(function(key, value) {
        self.summ.kol += parseInt(key.balance);
        self.summ.sold += parseInt(key.total_sold_summa);
        self.summ.profit += parseInt(key.total_profit_summa);
        self.summ.body += parseInt(key.total_body_summa);
      });
    },
    Clicked(id) {
      localStorage.setItem("date1", this.datas.date1);
      localStorage.setItem("date2", this.datas.date2);
      localStorage.setItem("product_id", id);
      localStorage.setItem("sklad_id", this.datas.sklad_id);
      this.$router.push({ path: "/xisobot/sverka/foyda" });
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
        product_id: self.datas.product_id
      };
      axios({
        method: "post",
        url: "api/v1/report/profit",
        data: datas
      }).then(function(response) {
        self.results = response.data;
        self.Jami();
      });
    }
  }
};
</script>
<style scoped>
/* td,th{
    font-size: 14px;
  } */
</style>
