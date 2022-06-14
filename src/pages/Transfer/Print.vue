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
        Cклад1
        <span v-if="datas.sklad"
          ><b>{{ datas.sklad.name }}</b></span
        >
        <span style="float: right;" v-if="datas.created_at"
          >{{ $t("Сана") }}:
          <b>{{ new Date(datas.created_at*1000).toISOString().substr(0, 10) }}</b></span
        ><br />
        Cклад2
        <span v-if="datas.transfer_sklad"
          ><b>{{ datas.transfer_sklad.name }}</b></span
        >
        <b style="float: right;">№{{ datas.id }}</b>
      </h5>
      <ul v-for="(item, index) in datas.transfer_table" :key="index">
        <li>
          {{ index + 1 }}.<span v-if="item.product">{{
            item.product.extra_name
          }}</span>
        </li>
        <li style="text-align: right;">
          {{ item.count }}x{{ item.chakana_price }}={{
            item.chakana_summa
          }}
        </li>
      </ul>
      <ul>
        <li>
          <b>{{ $t("Жами сумма") }}:</b>
          <b style="float: right;">{{ datas.summa }}</b>
        </li>
      </ul>
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
      print:'false',
      datas: [],
      mysklad: [],
      dataUrl:null,
      rotateType: 0,
      options: {
        offsetX: 0,
        offsetY: 0,
        imageWidth: 300
      },
    };
  },
 async updated(){
    if(this.print=='print'){
    await this.$refs.electronVuePrinter.print(this.dataUrl);
    }
  },
  created: function() {
    this.Data();
  },
  methods: {
    Data() {
      let self = this;
      axios
        .get("api/v1/transfer/id/" + self.$route.params.id)
        .then(function(response) {
          self.datas = response.data;
          self.Mysklad();
        });
    },
    Starprinting(data){
      if(data==true){
        window.close();
      }
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
    Mysklad() {
      let self = this;
      axios({
        method: "get",
        url: "api/v1/sklads/id/" + self.datas.sklad_id
      }).then(function(response) {
        self.mysklad = response.data;
        self.print=true;
      });
    }
  },
  watch: {
    // "$refs.electronVuePrinter":function(){
    //   console.log('set');
    // },
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
