<template>
  <md-card>
    <div style="float: right; margin-top: -27px">
      <button class="mybtn btn addrow" type="button" @click="Addtable()">
        +<sup>F1</sup>
      </button>
      <button class="mybtn btn saved" type="button" @click="Savedokument()">
        {{ $t("Сақлаш ва беркитиш") }}<sup>F9</sup>
      </button>
      <router-link class="mybtn btn" :to="{ path: '/money-transfer/index' }"
        >{{ $t("Чиқиш") }} <sup>esc</sup>
      </router-link>
    </div>
    <md-card-content>
      <div class="md-layout">
        <div class="md-layout-item md-small-size-25 md-size-25">
          <label>Склад1</label>
          <v-select
            :clearable="false"
            class="form-control-sm required md-input"
            :options="skladlist"
            v-model="datas.sklad_id"
            :reduce="name => name.id"
            label="name"
          >
            <template #list-footer>
              <li style="text-align: center;font-weight:bold;">
                f4 {{ $t("умумий рўйхат") }}
              </li>
            </template>
            <template #search="{ attributes, events }">
              <input
                class="vs__search"
                v-bind="attributes"
                v-on="events"
                aria-activedescendant="null"
              />
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
                <b>insert</b>
              </template>
              <em style="opacity: 0.5" v-else>{{ $t("Маьлумот йўқ") }}</em>
            </template>
          </v-select>
        </div>
        <div class="md-layout-item md-small-size-25 md-size-25">
          <label>Склад2</label>
          <v-select
            :clearable="false"
            class="form-control-sm required md-input"
            :options="skladlist"
            v-model="datas.transfer_sklad_id"
            :reduce="name => name.id"
            label="name"
          >
            <template #list-footer>
              <li style="text-align: center;font-weight:bold;">
                f4 {{ $t("умумий рўйхат") }}
              </li>
            </template>
            <template #search="{ attributes, events }">
              <input
                class="vs__search"
                ref="focused"
                v-bind="attributes"
                v-on="events"
                aria-activedescendant="null"
              />
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
                <b>insert</b>
              </template>
              <em style="opacity: 0.5" v-else>{{ $t("Маьлумот йўқ") }}</em>
            </template>
          </v-select>
        </div>
        <div class="md-layout-item md-small-size-15 md-size-15">
          <label>Сумма</label>
          <div style="border-bottom:1px solid silver">
            {{ datas.summa | numFormat }}
          </div>
        </div>
        <div class="md-layout-item md-small-size-35 md-size-35">
          <md-field>
            <label>Комментарий</label>
            <md-input
              v-model="datas.comment"
              class="needt"
              type="text"
            ></md-input>
          </md-field>
        </div>
      </div>
      <table class="table table-bordered">
        <thead class="thead-light">
          <tr>
            <th>№</th>
            <th>Сумма</th>
            <th>{{ $t("Тўлов тури") }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in datas.money_transfer_table" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <vue-numeric
                separator="space"
                v-model="item.summa"
                class="table-input"
                v-bind:precision="0"
                @change="Change(index)"
              >
              </vue-numeric>
            </td>
            <td>
              <v-select
                :clearable="false"
                class="form-control-sm required md-input"
                :options="paytypelist"
                v-model="item.pay_type_id"
                :reduce="name => name.id"
                label="name"
              >
                <template #search="{ attributes, events }">
                  <input class="vs__search" v-bind="attributes" v-on="events" />
                </template>
              </v-select>
            </td>
            <td>
              <a
                href="javascript:void(0)"
                class="mybtn btn"
                @click="Trashitem(index)"
              >
                <b-icon icon="trash"></b-icon>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </md-card-content>
  </md-card>
</template>
<script>
import $ from "jquery";
export default {
  name: "KirimForm",
  data() {
    return {
      paytypelist: [],
      settedindex: null,
      sklad: "",
      paytype: "",
      skladlist: []
    };
  },
  props: ["datas"],
  created: function() {
    let self = this;
    self.$root.$refs.moneytransfer = self;
    self.$root.$on("skladone", function(getdata) {
      self.sklad = getdata;
    });
    self.$root.$on("skladall", function(getdata) {
      self.skladlist = getdata;
    });
    self.$root.$on("paytypeone", function(getdata) {
      self.paytype = getdata;
    });
    self.$root.$on("paytypeall", function(getdata) {
      self.paytypelist = getdata;
    });
  },
  mounted: function() {
    this.Focus();
  },
  methods: {
    Change(index) {
      if (this.datas.money_transfer_table.length == index + 1) {
        this.Addtable();
      }
      this.Summa();
    },
    handlerClose: function(event) {
      if (this.$store.state.saved == null) {
        this.$store.state.saved = null;
      } else {
        const answer = window.confirm(
          this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
        );
        if (answer) {
          this.Savedokument();
          event.returnValue = "";
        } else {
          this.$store.state.saved = null;
        }
      }
    },
    Trashitem(index) {
      const answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
      if (answer) {
        this.datas.money_transfer_table.splice(index, 1);
        this.Summa();
      }
    },
    Focus() {
      if (this.$route.path == "/money-transfer/create") {
        this.$refs.focused.focus();
      } else {
        setTimeout(() => {
          $(".table-input")
            .eq(0)
            .focus();
        }, 100);
      }
    },
    Addtable() {
      this.datas.money_transfer_table.push({ pay_type_id: 1, summa: 0 });
    },
    Summa() {
      this.datas.total = 0;
      let self = this;
      this.datas.money_transfer_table.forEach(function(key, value) {
        self.datas.total += parseInt(key.summa);
      });
    },
    Savedokument() {
      let self = this;
      if (this.$route.path == "/money-transfer/create") {
        var methods = "post";
        var action = "api/v1/money-transfer";
      } else {
        self.datas.updated_at = new Date()
          .valueOf()
          .toString()
          .slice(0, 10);
        var methods = "patch";
        var action = "api/v1/money-transfer/id/" + self.$route.params.id;
      }
      axios({
        method: methods,
        url: action,
        data: self.datas
      }).then(function(response) {
        self.$store.state.saved = null;
        self.$router.push({ name: "Перемешения касса" });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.md-card-content > .table.table-bordered tbody {
  display: block;
  height: 70vh;
  overflow-y: scroll;
}

.md-card-content > .table.table-bordered thead,
.md-card-content > .table.table-bordered tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}
</style>
