<template>
  <div class="content">
    <chiqim-form :bronlist="bronlist" :datas="dataall"></chiqim-form>
    <kontragent :datas="dataall"></kontragent>
    <b-modal id="modal-bronlist" hide-footer  size="lg" style="float: right!important;" @hidden="Hide()">
      <md-card>
        <md-card-content>
          <table class="table table-bordered left">
            <thead>
              <tr>
                <th class="column1">№</th>
                <th class="column3">Склад</th>
                <th class="column3" >Клиент</th>
                <th class="column3">{{$t('Сони')}}</th>
                <th class="column3">Сумма</th>
                <th class="column3">{{$t('Вақт')}}</th>
              </tr>
            </thead>
            <tbody style="height: 44vh!important;">
                <tr  v-for="(item, index) in bronlist"
                  :key="index">
                  <td class="column1">{{ index + 1 }}</td>
                  <td class="column3">
                    <button type="button" class="atable" @click="
                        Bronselect(item,index);
                      " v-if="item.sklad!=null">
                      {{ item.sklad.name }}
                    </button>
                  </td>
                  <td class="column3">
                    <button type="button" class="atable" @click="
                        Bronselect(item,index);
                      " v-if="item.kontragent!=null">
                      {{ item.kontragent.name}}
                    </button>
                  </td>
                  <td class="column3">
                    <button type="button" class="atable" @click="
                        Bronselect(item,index);
                      " >
                      {{ item.count_all }}
                    </button>
                  </td>
                  <td class="column3">
                    <button type="button" class="atable" @click="
                        Bronselect(item,index);
                      " >
                      {{item.summa}}
                    </button>
                  </td>
                  <td class="column3">
                    <button type="button" class="atable" @click="
                        Bronselect(item,index);
                      " >
                      {{ Datetime(item.created_at) }}
                    </button>
                  </td>
                </tr>
            </tbody>
          </table>
        </md-card-content>
      </md-card>
    </b-modal>
  </div>
</template>
<script>
import $ from "jquery";
import { ChiqimForm, Kontragent } from "@/pages";
export default {
  components: { ChiqimForm, Kontragent },
  watch: {
    dataall: {
      deep: true,
      handler(val, oldVal) {
        this.$store.state.saved += 1;
      }
    }
  },
  methods:{
    Hide() {
        let self = this;
        setTimeout(function (e) {
            $("#shtrix").focus();
        }, 100);
      },
    Bronselect(item,index){
        let self = this;
      axios({
        method: "get",
        url: "api/v1/bron/id/"+item.id
      }).then(function(response) {
        self.dataall=response.data;
        self.Deletebron(item.id);
        self.bronlist.splice(index,1);
      });
      },
      Deletebron(id){
        let self=this;
        axios({
        method: "delete",
        url: "api/v1/bron/id/"+id
      }).then(function(response) {
        self.$bvModal.hide("modal-bronlist");
      });
      },
      Datetime(date) {
      var d = new Date(date * 1000);
      var dt = d.getDate();
      var month = d.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      if (dt < 10) {
        dt = "0" + dt;
      }

      return dt + "-" + month + "-" + d.getFullYear();
    },
    Bronlist(){
        let self = this;
      axios({
        method: "get",
        url: "api/v1/bron"
      }).then(function(response) {
        self.bronlist = response.data;
      });
      }
  },
  beforeRouteLeave(to, from, next) {
    if (this.$store.state.saved == null) {
      this.$store.state.saved = null;
      next();
    } else {
      console.log(this.$store.state.saved);
      const answer = window.confirm(
        this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
      );
      if (answer) {
        this.$root.$refs.rasxod.Savedokument("home");
      } else {
        this.$store.state.saved = null;
        next();
      }
    }
  },
  mounted:function(){
    this.Bronlist();
  },
  data() {
    return {
      bronlist:[],
      dataall: {
        sklad_id: parseInt(localStorage.getItem("sklad_id")),
        created_at: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        updated_at: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        kontragent_id: 0,
        user_id: parseInt(localStorage.getItem("user_id")),
        pay_type_id: 0,
        price_type: "chakana",
        skidka_summa: 0,
        summa: 0,
        comment: "",
        cash_summa: 0,
        plastic_summa: 0,
        count_all: 0,
        rasxod_table: []
      }
    };
  }
};
</script>
