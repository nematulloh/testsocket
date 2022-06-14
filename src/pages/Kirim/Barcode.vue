<template>
  <div class="content">
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Товар</th>
        <th>{{$t('Нарх')}} <input type="checkbox" v-model="price"></th>
        <th>{{$t('Cони')}} 
          <button style="float: right;" type="button" class="btn btn-primary" @click='Print()'>
          <b-icon icon="printer"></b-icon>
        </button>
        <button style="float: right;" type="button" class="btn btn-success" @click='Clear()'>
          {{$t('Тозалаш')}}
          </button>
      </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in datas.prixod_table" :key="index">
        <td>
          {{item.product.extra_name}}
        </td>
        <td>
          {{item.chakana_price}}
        </td>
        <td>
          <input type="number" @input="item.count=parseInt(item.count)" v-model="item.count">
        </td>
      </tr>
    </tbody>
    </table>
    <div style="width: 200px;">
    <center>{{datas.prixod_table[0].product.extra_name}}</center>
    <barcode :value="datas.prixod_table[0].shtrix_kod"></barcode>
    <center v-if="price==true" style="font-size: 14pt;">{{datas.prixod_table[0].chakana_price|numFormat0}}</center>
  </div>
    <div class="mybody" style="display: none;">
      <span v-for="(item, index) in datas.prixod_table" :key="index">
        <div class="page" v-if="item.shtrix_kod!=''" v-for="n in item.count">
         <center>{{item.product.extra_name}}</center>
          <barcode :value="item.shtrix_kod" width="2px"></barcode>
          <center v-if="price==true" style="font-size: 14pt;">{{item.chakana_price|numFormat0}}</center>
        </div>
      </span>
    </div>
</div>
</template>
<style>
  .vue-barcode-element{
    width: 195px!important;
    height: 101px;
  }
   div.page
      {
        background-color: white;
        text-align: center;
        /* border: 1px solid red; */
        transform: rotate(90deg);
        page-break-after: auto;
        page-break-inside: avoid;
        padding: 65px 0 0 0px;
        width: 219px;
        height: 151px;
        /* width: 300px; */
      }
</style>
<script>
import $ from "jquery";
import VueBarcode from 'vue-barcode';
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import electronVuePrinter from "electron-vue-printer";
export default {
  name: "Print",
  components: { 'barcode': VueBarcode },
  data() {
    return {
      price:true,
      datas: [],
      mysklad: [],
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
  mounted: function() {
  },
  methods: {
    Print(){
      var head = $(".mybody").html();
      if (head == undefined) {
        head = "";
      }       
      document.body.style.zoom="1000%";
      // document.body.style.transform = "rotate(90deg)";
      // document.body.style.textAlign = "center";
      // document.body.style.width = "188px";
      // document.body.style.minHeight = "116px";
      // document.body.style.padding = "200px 0px 0px 200px";
      window.document.body.innerHTML = head;
      window.print();
      window.location.reload();
    },
    Clear(){
      let self=this;
      self.datas.prixod_table.forEach(function(key, value) {
        key.count=0;
      });
    },
    Data() {
      let self = this;
      axios
        .get("api/v1/prixod/id/" + self.$route.params.id)
        .then(function(response) {
          self.datas = response.data;
        });
    },
    Printer() {
      let body = $(".mybody").html();
      window.document.body.innerHTML = body;
      window.print();
      window.location.reload();
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
