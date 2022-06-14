<template>
  <form>
    <md-card>
      <div style="float:right;margin-top:-27px;">
        <button type="button" class="mybtn btn saved" @click="Savedokument()">
          {{ $t("Сақлаш ва беркитиш") }} <sup>F9</sup>
        </button>
        <router-link
          class="mybtn btn"
          :to="{ path: '/directory/product/index' }"
          >{{ $t("Чиқиш") }}<sup>esc</sup>
        </router-link>
      </div>
      <md-card-content>
        <div class="md-layout">
          <form>
            <div class="row">
              <div class="col-md-4">
                <label>{{ $t("Умумий номи") }}</label>
              </div>
              <div class="col-md-8">
                {{ product.extra_name }}
              </div>
              <div class="col-md-4">
                <label>{{ $t("Номи") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  ref="focused"
                  @input="Extra()"
                  v-model="product.name"
                  type="text"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("Ўлчов бирлик") }}</label>
              </div>
              <div class="col-md-8">
                <v-select
                  :clearable="true"
                  class="md-input"
                  :options="unitlist"
                  v-model="product.unit_id"
                  :reduce="name => name.id"
                  label="name"
                >
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      v-bind="attributes"
                      v-on="events"
                    />
                    <button
                      type="button"
                      class="modallist"
                      v-b-modal.modal-unitlist
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
                      <button
                        type="button"
                        class="pluss"
                        @click="unit.name = search"
                        v-b-modal.modal-unit
                      >
                        +
                      </button>
                      <b>insert</b>
                    </template>
                    <em style="opacity: 0.5;" v-else>{{
                      $t("Маьлумот йўқ")
                    }}</em>
                  </template>
                </v-select>
              </div>
              <div class="col-md-4">
                <label>{{ $t("Давлат") }}</label>
              </div>
              <div class="col-md-8">
                <v-select
                  :clearable="true"
                  class="md-input"
                  :options="countrylist"
                  @input="Countrychange"
                  v-model="product.country_id"
                  :reduce="name => name.id"
                  label="name"
                >
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      v-bind="attributes"
                      v-on="events"
                    />
                    <button
                      type="button"
                      class="modallist"
                      v-b-modal.modal-countrylist
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
                      <button
                        type="button"
                        class="pluss"
                        @click="country.name = search"
                        v-b-modal.modal-country
                      >
                        +
                      </button>
                      <b>insert</b>
                    </template>
                    <em style="opacity: 0.5;" v-else>{{
                      $t("Маьлумот йўқ")
                    }}</em>
                  </template>
                </v-select>
              </div>
              <div class="col-md-4">
                <label>Модел</label>
              </div>
              <div class="col-md-8">
                <v-select
                  :clearable="true"
                  class="md-input"
                  :options="modellist"
                  @input="Modelchange"
                  v-model="product.model_id"
                  :reduce="name => name.id"
                  label="name"
                >
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      v-bind="attributes"
                      v-on="events"
                    />
                    <button
                      type="button"
                      class="modallist"
                      v-b-modal.modal-modellist
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
                      <button
                        type="button"
                        @click="model.name = search"
                        v-b-modal.modal-model
                        class="pluss"
                      >
                        +
                      </button>
                      <b>insert</b>
                    </template>
                    <em style="opacity: 0.5;" v-else>{{
                      $t("Маьлумот йўқ")
                    }}</em>
                  </template>
                </v-select>
              </div>
              <div class="col-md-4">
                <label>Бренд</label>
              </div>
              <div class="col-md-8">
                <v-select
                  :clearable="true"
                  class="md-input"
                  :options="brandlist"
                  @input="Brandchange"
                  v-model="product.brand_id"
                  :reduce="name => name.id"
                  label="name"
                >
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      v-bind="attributes"
                      v-on="events"
                    />
                    <button
                      type="button"
                      class="modallist"
                      v-b-modal.modal-brandlist
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
                      <button
                        type="button"
                        @click="brand.name = search"
                        v-b-modal.modal-brand
                        class="pluss"
                      >
                        +
                      </button>
                      <b>insert</b>
                    </template>
                    <em style="opacity: 0.5;" v-else>{{
                      $t("Маьлумот йўқ")
                    }}</em>
                  </template>
                </v-select>
              </div>
              <div class="col-md-4">
                <label>{{ $t("Ранг") }}</label>
              </div>
              <div class="col-md-8">
                <v-select
                  :clearable="true"
                  class="md-input"
                  :options="colourlist"
                  @input="Colourchange"
                  v-model="product.colour_id"
                  :reduce="name => name.id"
                  label="name"
                >
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      v-bind="attributes"
                      v-on="events"
                    />
                    <button
                      type="button"
                      href="javascript:void(0)"
                      class="modallist"
                      v-b-modal.modal-colourlist
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
                      <button
                        type="button"
                        @click="colour.name = search"
                        v-b-modal.modal-colour
                        class="pluss"
                      >
                        +
                      </button>
                      <b>insert</b>
                    </template>
                    <em style="opacity: 0.5;" v-else>{{
                      $t("Маьлумот йўқ")
                    }}</em>
                  </template>
                </v-select>
              </div>
              <div class="col-md-4">
                <label>{{ $t("Гурух") }}</label>
              </div>
              <div class="col-md-8">
                <v-select
                  :clearable="true"
                  class="md-input"
                  :options="folder"
                  v-model="product.parent_id"
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
                    <em style="opacity: 0.5;" v-else>{{
                      $t("Маьлумот йўқ")
                    }}</em>
                  </template>
                </v-select>
              </div>
              <div class="col-md-4">
                <label for="">{{ $t("Сифат") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  type="text"
                  class="form-control"
                  v-model="product.quality"
                  @input="Extra()"
                />
              </div>
              <div class="col-md-4">
                <label for="">Штрих <button
                  type="button"
                  class="btn btn-primary needt"
                  @click="Createshtrix()"
                >
                  {{ $t("Янги") }} штрих
                </button></label>
              </div>
              <div class="col-md-8">
                <div v-for="(item, index) in product.shtrix_table" :key="index">
                  <input
                    type="text"
                    class="form-control"
                    v-model="item.shtrix_kod"
                    @change="Addshtrix('update')"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label for="">Папка</label>
              </div>
              <div class="col-md-8">
                <input type="checkbox" v-model="product.is_folder" />
              </div>
              <div class="col-md-4">
                <label for="">Фото</label>
              </div>
              <div class="col-md-8">
                <input
                  type="file"
                  id="files"
                  ref="files"
                  v-on:change="handleFilesUpload()"
                />
                <img v-bind:src="product.picture_name" style="width:200px;" />
              </div>
            </div>
          </form>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import $ from "jquery";
export default {
  name: "product-modal-form",
  data() {
    return {
      files: "",
      filter: "",
      unitlist: [],
      countrylist: [],
      productlist: [],
      unit: { name: "" },
      model: { name: "" },
      modellist: [],
      brand: { name: "" },
      brandlist: [],
      colour: { name: "" },
      colourlist: [],
      country: { name: "" }
    };
  },
  props: ["product"],
  computed: {
    folder: function() {
      var all = [];
      this.productlist.forEach(function(key, value) {
        if (key.is_folder == 1) {
          all.push(key);
        }
      });
      return all;
    }
  },
  created() {
    let self = this;
    self.$root.$refs.product = self;
    self.$root.$on("unitone", function(getdata) {
      self.unit = getdata;
    });
    self.$root.$on("unitall", function(getdata) {
      self.unitlist = getdata;
    });
    self.$root.$on("unitselected", function(getdata) {
      self.product.unit_id = getdata;
    });
    self.$root.$on("modelone", function(getdata) {
      self.model = getdata;
    });
    self.$root.$on("modelall", function(getdata) {
      self.modellist = getdata;
    });
    self.$root.$on("modelselected", function(getdata) {
      self.product.model_id = getdata;
      self.Modelchange(getdata);
    });

    self.$root.$on("brandone", function(getdata) {
      self.brand = getdata;
    });
    self.$root.$on("brandall", function(getdata) {
      self.brandlist = getdata;
    });
    self.$root.$on("brandselected", function(getdata) {
      self.product.brand_id = getdata;
      self.Brandchange(getdata);
    });

    self.$root.$on("colourone", function(getdata) {
      self.colour = getdata;
    });
    self.$root.$on("colourall", function(getdata) {
      self.colourlist = getdata;
    });
    self.$root.$on("colourselected", function(getdata) {
      self.product.colour_id = getdata;
      self.Colourchange(getdata);
    });
    self.$root.$on("countryone", function(getdata) {
      self.country = getdata;
    });
    self.$root.$on("countryall", function(getdata) {
      self.countrylist = getdata;
    });
    self.$root.$on("countryselected", function(getdata) {
      self.product.country_id = getdata;
      self.Countrychange(getdata);
    });
    // if (self.$route.params.id) {
    //   console.log('ishladiyu');
    //   self.Addshtrix();
    // }
  },
  mounted: function() {
    this.Focus();
    this.Extra();
  },
  methods: {
    Createshtrix() {
      if (this.product.shtrix_table.length == 0) {
        this.Addshtrix();
      }
      var creating =
        localStorage.getItem("sklad_id") * 1000000000000 +
        this.$store.state.prostatka.length;
      if (this.product.shtrix_table[0].shtrix_kod == "") {
        this.product.shtrix_table[0].shtrix_kod = creating;
      }
    },
    Focus() {
      this.$refs.focused.focus();
    },
    handleFilesUpload() {
      this.files = this.$refs.files.files;
      this.product.picture_name = URL.createObjectURL(
        this.$refs.files.files[0]
      );
    },
    Addshtrix(type) {
      this.product.shtrix_table.push({ shtrix_kod: "" });
      setTimeout(() => {
        var self = $(':focus'),form = self.parents(".row:eq(0)"),focusable,next,prev;
        focusable = form.find(".form-control");
        next = focusable.eq(-1);
        if(next.length){
          next.focus();
        }
      }, 1000);
    },
    Savedokument() {
      let self = this;
      if (this.$route.path == "/directory/product/create") {
        var methods = "post";
        var action = "api/v1/product";
      } else {
        var methods = "patch";
        var action = "api/v1/product/id/" + self.$route.params.id;
      }
      let formData = new FormData();
      let file = this.files[0];
      formData.append("picture_name", file);
      formData.append("extra_name", this.product.extra_name);
      formData.append("name", this.product.name);
      if (this.product.unit_id == null) {
        this.product.unit_id = 0;
      }
      if (this.product.brand_id == null) {
        this.product.brand_id = 0;
      }
      if (this.product.colour_id == null) {
        this.product.colour_id = 0;
      }
      if (this.product.parent_id == null) {
        this.product.parent_id = 0;
      }
      if (this.product.country_id == null) {
        this.product.country_id = 0;
      }
      if (this.product.model_id == null) {
        this.product.model_id = 0;
      }
      formData.append("unit_id", this.product.unit_id);
      formData.append("colour_id", this.product.colour_id);
      formData.append("parent_id", this.product.parent_id);
      formData.append("is_folder", this.product.is_folder);
      formData.append("country_id", this.product.country_id);
      formData.append("model_id", this.product.model_id);
      formData.append("brand_id", this.product.brand_id);
      formData.append("quality", this.product.quality);
      for (let i = 0; i < this.product.shtrix_table.length; i++) {
        formData.append(
          `shtrix_table[${i}][shtrix_kod]`,
          this.product.shtrix_table[i].shtrix_kod
        );
      }
      axios({
        method: methods,
        url: action,
        data: formData
      }).then(function(response) {
        self.$store.state.saved = 1;
        localStorage.removeItem("product_name");
        if (self.$route.path == "/directory/product/create") {
          var a = [];
          a.push({
            id: response.data.id,
            extra_name: response.data.extra_name,
            balance: 0,
            is_folder: response.data.is_folder,
            parent_id: response.data.parent_id,
            shtrix_table: [],
            price_register: []
          });
          var b = a.concat(self.$store.state.prostatka);
          self.$store.state.prostatka = b;
        } else {
          self.$store.state.prostatka = null;
        }
        self.$router.push({ name: "Товар модал" });
      });
    },
    Colourchange(val) {
      let self = this;
      if (val == null || val == 0) {
        self.product.colour = null;
        self.Extra();
      } else {
        axios.get("api/v1/colour/id/" + val).then(function(response) {
          self.product.colour = response.data;
          self.Extra();
        });
      }
    },
    Brandchange(val) {
      let self = this;
      if (val == null || val == 0) {
        self.product.brand = null;
        self.Extra();
      } else {
        axios.get("api/v1/brand/id/" + val).then(function(response) {
          self.product.brand = response.data;
          self.Extra();
        });
      }
    },
    Countrychange(val) {
      let self = this;
      if (val == null || val == 0) {
        self.product.country = null;
        self.Extra();
      } else {
        axios.get("api/v1/country/id/" + val).then(function(response) {
          self.product.country = response.data;
          self.Extra();
        });
      }
    },
    Modelchange(val) {
      let self = this;
      if (val == null || val == 0) {
        self.product.model = null;
        self.Extra();
      } else {
        axios.get("api/v1/model/id/" + val).then(function(response) {
          self.product.model = response.data;
          self.Extra();
        });
      }
    },
    Extra() {
      let self = this;
      self.product.extra_name = self.product.name;
      if (self.product.colour != null) {
        self.product.extra_name =
          self.product.extra_name + " " + self.product.colour.name;
      }
      if (self.product.brand != null) {
        self.product.extra_name =
          self.product.extra_name + " " + self.product.brand.name;
      }
      if (self.product.country != null) {
        self.product.extra_name =
          self.product.extra_name + " " + self.product.country.name;
      }
      if (self.product.model != null) {
        self.product.extra_name =
          self.product.extra_name + " " + self.product.model.name;
      }
      if (self.product.quality != "") {
        self.product.extra_name =
          self.product.extra_name + " " + self.product.quality;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .row>div{
    padding: 5px;
    border-bottom:1px outset;
  }
/* .md-dialog .md-dialog-container {
    max-width: 768px;
  } */
</style>
