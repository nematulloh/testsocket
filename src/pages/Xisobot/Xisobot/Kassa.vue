<template>
  <b-container fluid>
    <b-row>
      <b-col lg="3" class="my-1">
        <label for="">Вақт 1</label>
        <input class="form-control" type="date" v-model="datas.date1" />
      </b-col>
      <b-col lg="3" class="my-1">
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
              ><b-icon icon="three-dots"></b-icon
            ></a>
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
        <label for="">Тўлов тури</label>
        <v-select
          :clearable="false"
          class="form-control-sm"
          :options="paytypelist"
          v-model="datas.pay_type_id"
          :reduce="name => name.id"
          label="name"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes"></span>
            <a
              href="javascript:void(0)"
              class="modallist"
              v-b-modal.modal-paytypelist
              ><b-icon icon="three-dots"></b-icon
            ></a>
          </template>
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              <em
                ><b>{{ search }}</b></em
              >
              бўйича маьлумот йўқ
              <button
                type="button"
                @click="paytype.name = search"
                v-b-modal.modal-paytype
              >
                +
              </button>
            </template>
            <em style="opacity: 0.5;" v-else>Маьлумот йўқ</em>
          </template>
        </v-select>
      </b-col>
      <b-col lg="2" class="my-1">
        <br /><button type="button" class="btn mybtn" @click="Send()">
          Кўриш
        </button>
      </b-col>
    </b-row>
    <table class="table table-bordered">
      <tr>
        <th>#</th>
        <th>Бош. қолдиқ</th>
        <th>Кирим</th>
        <th>Чиқим</th>
        <th>Якуний қолдиқ</th>
      </tr>
      <tbody v-for="(item, index) in results" :key="index">
        <tr>
          <td>{{ index + 1 }}</td>
          <td>
            <button
              type="button"
              class="noborder"
              @click="Clicked(item.kontragent.id)"
            >
              {{ item.begin_total }}
            </button>
          </td>
          <td>{{ item.total_kirim }}</td>
          <td>{{ item.total_chiqim }}</td>
          <td>{{ item.end_total }}</td>
        </tr>
      </tbody>
    </table>
    <paytype :datas="datas"></paytype>
    <sklad :datas="datas"></sklad>
    <unit></unit>
    <model></model>
    <brand></brand>
    <colour></colour>
  </b-container>
</template>

<script>
import { Paytype, Unit, Model, Brand, Colour, Sklad } from "@/pages";
import { print } from "../../../components/mixins/print.js";
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
        pay_type_id: self.datas.pay_type_id
      };
      axios({
        method: "post",
        url: "api/v1/report/kassa",
        headers: {
          "Content-Type": "application/json"
        },
        data: datas
      })
        .then(function(response) {
          self.results = response.data;
        })
        .catch(function(error) {
          self.errors = error.message;
        });
    }
  }
};
</script>
