<template>
  <div class="row">
    <md-card>
      <md-card-content>
        <div style="display:-webkit-inline-box">
          <router-link :to="{ name: 'Товар модал create' }">
            <button type="button" class="mybtn btn insert" v-b-modal.modal-product>
              {{ $t("Қўшиш") }}<sup>(insert)</sup>
            </button>
          </router-link>
          <input
            type="text"
            class="form-control searchtable"
            v-bind:placeholder="$t('Қидирув')"
            v-model="filter"
            ref="inputText1"
          />
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>{{ $t("Номи") }}</th>
              <th>{{ $t("Қолдиқ") }}</th>
              <th>{{ $t("Чакана") }} {{ $t("Нарх") }}</th>
              <th>{{ $t("Улгуржи") }} {{ $t("Нарх") }}</th>
              <th></th>
            </tr>
          </thead>
          <tbody style="overflow: hidden;">
            <VueAutoVirtualScrollList
              :totalHeight="630"
              :defaultHeight="25"
              class="virtual"
              style="width: 100%;height: 82vh!important;"
            >
              <span
                style="display: contents;"
                v-for="(item, index) in filteredRows"
                :key="index"
              >
                <tr v-if="item.is_folder == false">
                  <td>
                    <button
                      type="button"
                      class="atable"
                      @click="Select(item.id)"
                    >
                      <span
                        v-if="item.parent_id > 0"
                        style="padding:0 15px;"
                      ></span>
                      {{ item.extra_name }}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="noborder"
                      @click="Select(item.id)"
                    >
                      {{ item.balance }}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="noborder"
                      @click="Select(item.id)"
                      v-if="item.price_register[0]"
                    >
                      {{ item.price_register[0].chakana_price }}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="noborder"
                      @click="Select(item.id)"
                      v-if="item.price_register[0]"
                    >
                      {{ item.price_register[0].optom_price }}
                    </button>
                  </td>
                  <td>
                    <router-link
                      :to="{
                        name: 'Товар модал update',
                        params: { id: item.id }
                      }"
                    >
                      <button type="button" class="mybtn btn">
                        <b-icon icon="pencil"></b-icon><sup>(F2)</sup>
                      </button>
                    </router-link>
                    <button
                      type="button"
                      class="mybtn btn"
                      @click="Producttrash(item.id)"
                    >
                      <b-icon icon="trash"></b-icon><sup>(delete)</sup>
                    </button>
                    <router-link
                      :to="{
                        name: 'Товар модал create',
                        params: { id: item.id }
                      }"
                    >
                      <button type="button" class="copy mybtn btn">
                        <b-icon icon="back"></b-icon><sup>(F3)</sup>
                      </button>
                    </router-link>
                  </td>
                </tr>
              </span>
            </VueAutoVirtualScrollList>
          </tbody>
        </table>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
import $ from "jquery";
import VueAutoVirtualScrollList from "vue-auto-virtual-scroll-list";
export default {
  name: "product",
  components: { VueAutoVirtualScrollList },
  data() {
    return {
      from: null,
      scrol: 0,
      filter: "",
      limit: 200,
      sett: null,
      productlist: []
    };
  },
  computed: {
    filterlist() {
      return this.productlist.slice(0, this.limit);
    },
    filteredRows() {
      return this.productlist.filter(row => {
        const name = row.extra_name.toString().toLowerCase();
        const searchTerm = this.filter.toLowerCase();
        return name.includes(searchTerm);
      });
    }
  },
  methods: {
    Focus() {
      if (this.from.path == "/directory/product/create") {
        var set = document.getElementsByClassName("atable");
        set[0].focus();
      } else if (this.from.params.id) {
        this.$refs.inputText1.focus();
        // $('.virtual').find('.atable').focus();
      } else {
        this.$refs.inputText1.focus();
      }
    },
    Select(val) {
      localStorage.setItem("setted_product", val);
      this.Cacheclear();
      window.close();
    },
    Updateset(index) {
      let self = this;
      var id = self.filteredRowsRows[index].id;
      var table = $(":focus").parents("table:eq(0)");
      self.scrol = $(".virtual").scrollTop();
      var focusable = table.find("tr");
      self.sett = focusable.index($(":focus").parents("tr"));
    },
    Producttrash(id) {
      const answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
      if (answer) {
        let self = this;
        axios({
          method: "delete",
          url: "api/v1/product/id/" + id
        }).then(function(response) {
          self.Cacheclear();
          self.$store.dispatch("Productlist");
        });
      }
    },
    Cacheclear() {
      let self = this;
      axios({
        method: "post",
        url: "api/v1/cache-clear/all-price-balance",
        data: {
          sklad_id: localStorage.getItem("sklad_id"),
          datetime: localStorage.getItem("created_at")
        }
      }).then(function(response) {
        self.Productlist();
      });
    },
    Productlist() {
      let self = this;
      if (localStorage.getItem("sklad_id") > 0) {
        var datetime = null;
        if (localStorage.getItem("created_at")) {
          datetime = localStorage.getItem("created_at");
        }
        axios({
          method: "post",
          url: "api/v1/product/all-price-balance/0",
          data: {
            sklad_id: localStorage.getItem("sklad_id"),
            datetime: datetime
          }
        }).then(function(response) {
          self.$store.state.prostatka = response.data;
          self.productlist = response.data;
        });
      } else {
        self.productlist = [];
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.from = from;
      vm.Focus();
    });
  },
  mounted: function() {
    let self = this;
    $(".virtual").scroll(function() {
      var scroll = $(this).scrollTop() + 1000;
      var height = $(this).prop("scrollHeight");
      if (scroll > height) {
        self.limit += 100;
      }
    });
    if (this.$store.state.prostatka == null) {
      this.Productlist();
      console.log("ok");
    } else {
      this.productlist = this.$store.state.prostatka;
    }
  }
};
</script>
<style scoped lang="scss">
.md-card-content > .table.table-bordered tbody {
  height: auto !important;
}
</style>
