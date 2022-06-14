<template>
  <div class="content">
    <div style="display: none!important;">
      <electron-vue-printer
        ref="electronVuePrinter"
        :show="true"
        :options="options"
        :rotateType="rotateType"
        @webview-ready="Printer"
        @start-printing="Starprinting"
        :silent="true"
      >
      </electron-vue-printer>
    </div>
    {{print}}
    <div id="my-node">
      <h5>
        <span v-if="datas.sklad"
          ><b>{{ datas.sklad.name }}</b></span
        >
        <span style="float: right;" v-if="datas.created_at>0"
          >{{ $t("Сана") }}:
          <b>{{ new Date(datas.created_at*1000).toISOString().substr(0, 10) }}</b></span
        ><br />
        {{ $t("Етказувчи") }}:
        <span v-if="datas.kontragent"
          ><b>{{ datas.kontragent.name }}</b></span
        >
        <b style="float: right;">№{{ datas.id }}</b>
      </h5>
      <ul v-for="(item, index) in datas.prixod_table" :key="index">
        <li>
          {{ index + 1 }}.<span v-if="item.product">{{
            item.product.extra_name
          }}</span>
        </li>
        <li style="text-align: right;">
          {{ item.count }}x{{ item.kontragent_price }}={{
            item.kontragent_summa
          }}
        </li>
      </ul>
      <ul>
        <li>
          <b>{{ $t("Жами сумма") }}:</b>
          <b style="float: right;">{{ datas.summa }}</b>
        </li>
      </ul>
      <h5 style="text-align: center;" v-if="datas.kontragent">
        {{ $t("Қолдиқ сумма") }}: {{ qarz }}
      </h5>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import electronVuePrinter from "electron-vue-printer";
export default {
  name: "Print",
  components: { electronVuePrinter, htmlToImage },
  data() {
    return {
      datas: [],
      mysklad: [],
      dataUrl:null,
      print:'false',
      rotateType: 0,
      options: {
        offsetX: 0,
        offsetY: 0,
        imageWidth: 300
      },
      qarz: 0
    };
  },
  created: function() {
    this.Data();
  },
 async updated(){
    if(this.print=='print'){
    await this.$refs.electronVuePrinter.print(this.dataUrl);
    }
  },
  methods: {
    Starprinting(data){
      if(data==true){
        window.close();
      }
    },
    Data() {
      let self = this;
      axios
        .get("api/v1/prixod/id/" + self.$route.params.id)
        .then(function(response) {
          self.datas = response.data;
          self.Mysklad();
          self.Qarzdorlik();
        });
    },
   async Printer() {
      let self = this;
      var node = document.getElementById("my-node");
     await htmlToImage
        .toSvg(document.getElementById("my-node"))
        .then(function(dataUrl) {
          self.dataUrl=dataUrl;
            self.print='print';            
        })
        .catch(function(error) {
          console.error("oops, something went wrong!", error);
        });
    },
    Qarzdorlik() {
      let self = this;
      axios({
        method: "post",
        url: "api/v1/kontragent/total",
        data: {
          kontragent_id: self.datas.kontragent_id,
          sklad_id: self.datas.sklad_id,
          datetime: self.datas.created_at
        }
      }).then(function(response) {
        self.qarz = response.data.total;
        self.print=true;
      });
    },
    Mysklad() {
      let self = this;
      axios({
        method: "get",
        url: "api/v1/sklads/id/" + self.datas.sklad_id
      }).then(function(response) {
        self.mysklad = response.data;
      });
    }
  },
  watch: {
    "$store.state.changed": function() {
      if (this.$store.state.changed != null) {
        this.Ostatka(this.$store.state.selected_index);
        this.$store.state.changed = null;
      }
    }
  }
};
</script>
<style scoped>
#my-node {
  width: 300px;
}

h5 {
  font-weight: bold;
  font-size: 14px;
  color: black;
}

ul {
  list-style: none;
  border-bottom: 1px dotted;
  text-align: left;
  padding: 0;
  margin: 0;
  font-size: 13px;
  color: black;
}
</style>
