<template>
  <md-card>
    <div>
      <b-modal
        id="modal-productid"
        title="Товар"
        size="xl"
        hide-footer
        @shown="Shovedform"
        @hidden="Hidecreate()"
      >
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
                ref="inputText1"
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
                  <input class="vs__search" v-bind="attributes" v-on="events" />
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
                  <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
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
                  <input class="vs__search" v-bind="attributes" v-on="events" />
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
                  <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
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
                  <input class="vs__search" v-bind="attributes" v-on="events" />
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
                  <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
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
                  <input class="vs__search" v-bind="attributes" v-on="events" />
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
                  <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
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
                  <input class="vs__search" v-bind="attributes" v-on="events" />
                  <button
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
                  <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
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
                  <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
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
            <div class="col-md-4">
              <label for="">Штрих</label>
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
            <div class="col-md-12 modal-footer">
              <hr />
              <button
                type="button"
                class="btn btn-primary"
                @click="Updateproduct()"
              >
                {{ $t("Сақлаш") }}<sup>ctrl+enter</sup>
              </button>
            </div>
          </div>
        </form>
      </b-modal>
    </div>
    <div>
      <b-modal
        id="modal-product"
        title="Товар"
        size="xl"
        hide-footer
        @shown="Shovedform"
        @hidden="Hidecreate()"
      >
        <form>
          <div class="row">
            <div class="col-md-4">
              <label>{{ $t("Умумий номи") }}</label>
            </div>
            <div class="col-md-8">
              {{ productnew.extra_name }}
            </div>
            <div class="col-md-4">
              <label>{{ $t("Номи") }}</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="productnew.name"
                type="text"
                ref="inputText1"
                @input="Extranew()"
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
                v-model="productnew.unit_id"
                :reduce="name => name.id"
                label="name"
              >
                <template #selected-option="{ name }">
                  {{ name }}
                </template>
                <template #search="{attributes, events}">
                  <input class="vs__search" v-bind="attributes" v-on="events" />
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
                      @click="unit.name = search"
                      v-b-modal.modal-unit
                      class="pluss"
                    >
                      +
                    </button>
                    <b>insert</b>
                  </template>
                  <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
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
                @input="Countrychangenew"
                v-model="productnew.country_id"
                :reduce="name => name.id"
                label="name"
              >
                <template #search="{attributes, events}">
                  <input class="vs__search" v-bind="attributes" v-on="events" />
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
                  <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
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
                @input="Modelchangenew"
                v-model="productnew.model_id"
                :reduce="name => name.id"
                label="name"
              >
                <template #search="{attributes, events}">
                  <input class="vs__search" v-bind="attributes" v-on="events" />
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
                  <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
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
                @input="Brandchangenew"
                v-model="productnew.brand_id"
                :reduce="name => name.id"
                label="name"
              >
                <template #search="{attributes, events}">
                  <input class="vs__search" v-bind="attributes" v-on="events" />
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
                  <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
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
                @input="Colourchangenew"
                v-model="productnew.colour_id"
                :reduce="name => name.id"
                label="name"
              >
                <template #search="{attributes, events}">
                  <input class="vs__search" v-bind="attributes" v-on="events" />
                  <button
                    type="button"
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
                  <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
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
                v-model="productnew.parent_id"
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
            </div>
            <div class="col-md-4">
              <label for="">{{ $t("Сифат") }}</label>
            </div>
            <div class="col-md-8">
              <input
                type="text"
                class="form-control"
                v-model="productnew.quality"
                @input="Extranew()"
              />
            </div>
            <div class="col-md-4">
              <label for="">Папка</label>
            </div>
            <div class="col-md-8">
              <input type="checkbox" v-model="productnew.is_folder" />
            </div>
            <div class="col-md-4">
              <label for="">Фото</label>
            </div>
            <div class="col-md-8">
              <br />
              <input
                type="file"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
              />
              <img v-bind:src="productnew.picture_name" style="width:200px;" />
            </div>
            <div class="col-md-4">
              <label for="">Штрих</label>
            </div>
            <div class="col-md-8">
              <div
                v-for="(item, index) in productnew.shtrix_table"
                :key="index"
              >
                <input
                  type="text"
                  class="form-control"
                  v-model="item.shtrix_kod"
                  @change="Addshtrix('create')"
                />
              </div>
            </div>
            <div class="col-md-12 modal-footer">
              <hr />
              <button
                type="button"
                class="btn btn-primary"
                @click="Createproduct()"
              >
                {{ $t("Сақлаш") }}<sup>ctrl+enter</sup>
              </button>
            </div>
          </div>
        </form>
      </b-modal>
    </div>
    <div>
      <b-modal
        id="modal-productlist"
        title="Товар"
        hide-footer
        size="xl"
        @shown="Shoved"
        @hidden="Hide()"
      >
        <div class="row">
          <md-card>
            <md-card-content>
              <div style="display:-webkit-inline-box">
                <button type="button" class="mybtn btn" v-b-modal.modal-product>
                  {{ $t("Қўшиш") }}<sup>(insert)</sup>
                </button>
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
                    <!-- <th>Штрих</th> -->
                    <th></th>
                  </tr>
                </thead>
                <tbody style="overflow: hidden;">
                  <VueAutoVirtualScrollList
                    :totalHeight="500"
                    :defaultHeight="25"
                    class="virtual"
                    style="width: 100%;height: 64vh!important;"
                  >
                    <span
                      style="display: contents;"
                      v-for="(item, index) in filteredRows"
                      :key="index"
                    >
                      <tr v-if="item.is_folder == false">
                        >
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
                        <!-- <td>
                  <button type="button" class="noborder" @click="Select(item.id)" v-if="item.shtrix_table[0]">
                    {{ item.shtrix_table[0].shtrix_kod }}
                  </button>
                </td> -->
                        <td>
                          <button
                            type="button"
                            class="mybtn btn"
                            @click="Updateset(index)"
                            v-b-modal.modal-productid
                          >
                            <b-icon icon="pencil"></b-icon><sup>(F2)</sup>
                          </button>
                          <button
                            type="button"
                            class="mybtn btn"
                            @click="Producttrash(item.id)"
                          >
                            <b-icon icon="trash"></b-icon><sup>(delete)</sup>
                          </button>
                        </td>
                      </tr>
                    </span>
                  </VueAutoVirtualScrollList>
                </tbody>
                <!-- <tbody v-else>
              <tr>
                <td colspan="5">
                  <b-button type="button" @click="Addchild(index)" class="noborder mybtn"
                    v-b-toggle="'child' + item.id">
                    <span v-if="item.parent_id > 0" style="padding:0 15px;"></span>
                    <b-icon icon="folder2"></b-icon> {{ item.name }}
                  </b-button>
                </td>
                <td>
                  <button type="button" class="mybtn btn" @click="Updateset(index)" v-b-modal.modal-productid>
                    <b-icon icon="pencil"></b-icon><sup>(F2)</sup>
                  </button>
                  <button type="button" class="mybtn btn" @click="Producttrash(item.id)">
                    <b-icon icon="trash"></b-icon><sup>(delete)</sup>
                  </button>
                </td>
              </tr>
            </tbody> -->
              </table>
            </md-card-content>
          </md-card>
        </div>
      </b-modal>
    </div>
  </md-card>
</template>
<script>
import $ from "jquery";
import VueAutoVirtualScrollList from "vue-auto-virtual-scroll-list";
export default {
  name: "product",
  components: { VueAutoVirtualScrollList },
  data() {
    return {
      select: 0,
      files: "",
      focusset: "",
      scrol: 0,
      filter: "",
      sett: null,
      file: "",
      setted: "rasxod_table[0].product_id",
      productnew: {
        name: "",
        extra_name: "",
        unit_id: 0,
        extra_name: "",
        country_id: 0,
        parent_id: 0,
        is_folder: 0,
        model_id: 0,
        country: null,
        model: null,
        brand_id: 0,
        brand: null,
        colour_id: 0,
        colour: null,
        quality: "",
        picture_name: null,
        shtrix_table: [{ shtrix_kod: "" }]
      },
      product: {
        name: "",
        extra_name: "",
        country_id: 0,
        unit_id: 0,
        extra_name: "",
        country_id: 0,
        parent_id: 0,
        is_folder: 0,
        model_id: 0,
        brand_id: 0,
        colour_id: 0,
        quality: "",
        picture_name: null,
        shtrix_table: [{ shtrix_kod: "" }]
      },
      productlist: [],
      unitlist: [],
      unit: { name: "" },
      model: { name: "" },
      modellist: [],
      countrylist: [],
      country: { name: "" },
      brand: { name: "" },
      brandlist: [],
      colour: { name: "" },
      colourlist: []
    };
  },
  props: ["datas"],
  computed: {
    skladd: function() {
      return this.datas.sklad_id;
    },
    Changed() {
      if (this.$store.state.selected_product == 0) {
        return this.datas;
      } else {
        return this.$store.state.selected_product[
          this.$store.state.selected_index
        ];
      }
    },
    filteredRows() {
      return this.productlist.filter(row => {
        const name = row.extra_name.toString().toLowerCase();
        const searchTerm = this.filter.toLowerCase();
        return name.includes(searchTerm);
      });
    },
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
  methods: {
    Addchild(index) {
      let self = this;
      var item = self.productlist[index];
      if (item.status != "parent") {
        var datetime = 0;
        if (self.datas.created_at) {
          datetime = self.datas.created_at;
        }
        axios({
          method: "post",
          url: "api/v1/product/all-price-balance/" + item.id,
          data: { sklad_id: self.datas.sklad_id, datetime: datetime }
        }).then(function(response) {
          if (response.data != []) {
            item.status = "parent";
            let child = [];
            for (let index1 = 0; index1 < index + 1; index1++) {
              child.push(self.productlist[index1]);
            }
            let children = [];
            children.push.apply(child, response.data);
            for (
              let index2 = index + 1;
              index2 < self.productlist.length;
              index2++
            ) {
              child.push(self.productlist[index2]);
            }
            self.productlist = child;
          }
        });
      } else {
        self.Productlist();
      }
    },
    Colourchangenew(val) {
      let self = this;
      if (val == null) {
        self.productnew.colour = null;
        self.Extranew();
      } else {
        axios.get("api/v1/colour/id/" + val).then(function(response) {
          self.productnew.colour = response.data;
          self.Extranew();
        });
      }
    },
    Colourchange(val) {
      let self = this;
      if (val == null) {
        self.product.colour = null;
        self.Extra();
      } else {
        axios.get("api/v1/colour/id/" + val).then(function(response) {
          self.product.colour = response.data;
          self.Extra();
        });
      }
    },
    Brandchangenew(val) {
      let self = this;
      if (val == null) {
        self.productnew.brand = null;
        self.Extranew();
      } else {
        axios.get("api/v1/brand/id/" + val).then(function(response) {
          self.productnew.brand = response.data;
          self.Extranew();
        });
      }
    },
    Brandchange(val) {
      let self = this;
      if (val == null) {
        self.product.brand = null;
        self.Extra();
      } else {
        axios.get("api/v1/brand/id/" + val).then(function(response) {
          self.product.brand = response.data;
          self.Extra();
        });
      }
    },
    Countrychangenew(val) {
      let self = this;
      if (val == null) {
        self.productnew.country = null;
        self.Extranew();
      } else {
        axios.get("api/v1/country/id/" + val).then(function(response) {
          self.productnew.country = response.data;
          self.Extranew();
        });
      }
    },
    Countrychange(val) {
      let self = this;
      if (val == null) {
        self.product.country = null;
        self.Extra();
      } else {
        axios.get("api/v1/country/id/" + val).then(function(response) {
          self.product.country = response.data;
          self.Extra();
        });
      }
    },
    Modelchangenew(val) {
      let self = this;
      if (val == null) {
        self.productnew.model = null;
        self.Extranew();
      } else {
        axios.get("api/v1/model/id/" + val).then(function(response) {
          self.productnew.model = response.data;
          self.Extranew();
        });
      }
    },
    Modelchange(val) {
      let self = this;
      if (val == null) {
        self.product.model = null;
        self.Extra();
      } else {
        axios.get("api/v1/model/id/" + val).then(function(response) {
          self.product.model = response.data;
          self.Extra();
        });
      }
    },
    Extranew() {
      let self = this;
      self.productnew.extra_name = self.productnew.name;
      if (self.productnew.colour != null) {
        self.productnew.extra_name =
          self.productnew.extra_name + " " + self.productnew.colour.name;
      }
      if (self.productnew.brand != null) {
        self.productnew.extra_name =
          self.productnew.extra_name + " " + self.productnew.brand.name;
      }
      if (self.productnew.country != null) {
        self.productnew.extra_name =
          self.productnew.extra_name + " " + self.productnew.country.name;
      }
      if (self.productnew.model != null) {
        self.productnew.extra_name =
          self.productnew.extra_name + " " + self.productnew.model.name;
      }
      if (self.productnew.quality != "") {
        self.productnew.extra_name =
          self.productnew.extra_name + " " + self.productnew.quality;
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
    },
    Select(val) {
      this.Changed.product_id = val;
      this.$store.state.changed = "product" + this.$store.state.selected_index;
      this.$bvModal.hide("modal-productlist");
    },
    Updateset(index) {
      let self = this;
      var id = self.filteredRows[index].id;
      var table = $(":focus").parents("table:eq(0)");
      self.scrol = $(".virtual").scrollTop();
      var focusable = table.find("tr");
      self.sett = focusable.index($(":focus").parents("tr"));
      axios({
        method: "get",
        url: "api/v1/product/id/" + id
      }).then(function(response) {
        self.product = response.data;
        self.Addshtrix("update");
      });
    },
    handleFilesUpload() {
      this.files = this.$refs.files.files;
      this.product.picture_name = URL.createObjectURL(
        this.$refs.files.files[0]
      );
    },
    handleFileUpload() {
      this.file = this.$refs.file.files;
      this.product.picture_name = URL.createObjectURL(this.$refs.file.files[0]);
    },
    Addshtrix(type) {
      if (type == "create") {
        this.productnew.shtrix_table.push({ shtrix_kod: "" });
      } else {
        this.product.shtrix_table.push({ shtrix_kod: "" });
      }
      return false;
    },
    Producttrash(id) {
      const answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
      if (answer) {
        let self = this;
        axios({
          method: "delete",
          url: "api/v1/product/id/" + id
        }).then(function(response) {
          self.Productlist();
          self.$store.dispatch("Productlist");
        });
      }
    },
    Productlist() {
      let self = this;
      if (self.datas.sklad_id > 0) {
        var datetime = null;
        if (self.datas.created_at) {
          datetime = self.datas.created_at;
        }
        axios({
          method: "post",
          url: "api/v1/product/all-price-balance/0",
          data: { sklad_id: self.datas.sklad_id, datetime: datetime }
        }).then(function(response) {
          self.productlist = response.data;
        });
      } else {
        self.productlist = [];
      }
    },
    Createproduct() {
      let self = this;
      let formData = new FormData();
      let file = this.file[0];
      formData.append("picture_name", file);
      formData.append("name", this.productnew.name);
      if (this.productnew.country_id == null) {
        this.productnew.country_id = 0;
      }
      if (this.productnew.unit_id == null) {
        this.productnew.unit_id = 0;
      }
      if (this.productnew.colour_id == null) {
        this.productnew.colour_id = 0;
      }
      if (this.productnew.model_id == null) {
        this.productnew.model_id = 0;
      }
      if (this.productnew.brand_id == null) {
        this.productnew.brand_id = 0;
      }
      formData.append("country_id", this.productnew.country_id);
      formData.append("extra_name", this.productnew.extra_name);
      formData.append("unit_id", this.productnew.unit_id);
      formData.append("colour_id", this.productnew.colour_id);
      formData.append("parent_id", this.productnew.parent_id);
      formData.append("is_folder", this.productnew.is_folder);
      formData.append("model_id", this.productnew.model_id);
      formData.append("brand_id", this.productnew.brand_id);
      formData.append("quality", this.productnew.quality);
      for (let i = 0; i < this.productnew.shtrix_table.length; i++) {
        formData.append(
          `shtrix_table[${i}][shtrix_kod]`,
          this.productnew.shtrix_table[i].shtrix_kod
        );
      }
      axios({
        method: "post",
        url: "api/v1/product",
        data: formData
      }).then(function(response) {
        self.$store.state.productlist.push({
          id: response.data.id,
          extra_name: response.data.extra_name
        });
        self.productlist.push({
          id: response.data.id,
          extra_name: response.data.extra_name,
          balance: 0,
          is_folder: response.data.is_folder,
          parent_id: response.data.parent_id,
          shtrix_table: [],
          price_register: []
        });
        // self.Productlist();
        self.productnew = {
          name: "",
          extra_name: "",
          country_id: 0,
          unit_id: 0,
          parent_id: 0,
          is_folder: 0,
          model_id: 0,
          brand_id: 0,
          colour_id: 0,
          quality: "",
          picture_name: null,
          shtrix_table: [{ shtrix_kod: "" }]
        };
        self.$root.$emit("productone", self.productnew);
        self.$store.state.saved_modal = "created";
        self.$bvModal.hide("modal-product");
        self.sett = "create";
      });
    },
    Updateproduct() {
      let self = this;
      let formData = new FormData();
      let file = this.files[0];
      if (this.product.country_id == null) {
        this.product.country_id = 0;
      }
      if (this.product.unit_id == null) {
        this.product.unit_id = 0;
      }
      if (this.product.colour_id == null) {
        this.product.colour_id = 0;
      }
      if (this.product.model_id == null) {
        this.product.model_id = 0;
      }
      if (this.product.brand_id == null) {
        this.product.brand_id = 0;
      }
      formData.append("picture_name", file);
      formData.append("name", this.product.name);
      formData.append("country_id", this.product.country_id);
      formData.append("extra_name", this.product.extra_name);
      formData.append("unit_id", this.product.unit_id);
      formData.append("colour_id", this.product.colour_id);
      formData.append("parent_id", this.product.parent_id);
      formData.append("is_folder", this.product.is_folder);
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
        method: "patch",
        url: "api/v1/product/id/" + self.product.id,
        data: formData
      }).then(function(response) {
        self.Productlist();
        self.product = {
          name: "",
          extra_name: "",
          country_id: 0,
          unit_id: 0,
          parent_id: 0,
          is_folder: 0,
          model_id: 0,
          brand_id: 0,
          colour_id: 0,
          quality: "",
          picture_name: null,
          shtrix_table: [{ shtrix_kod: "" }]
        };
        self.$store.state.saved_modal = "updated";
        self.$store.dispatch("Productlist");
        self.$bvModal.hide("modal-productid");
      });
    },
    notifyVue(verticalAlign, horizontalAlign) {
      var color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        message:
          "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer.",
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[color]
      });
    },
    Shovedform() {
      this.$bvModal.hide("modal-productlist");
      if (this.$store.state.saved_modal == "update") {
        this.$store.state.saved_modal = null;
      } else {
        this.Extranew();
      }
      let self = this;
      $(document).on("focusout", function(e) {
        if ($(e.target).attr("class") == "vs__search") {
          if (self.focusset == "") {
            self.focusset = e.target;
          }
        }
      });
      if (self.productnew.shtrix_table[0].shtrix_kod == "") {
        self.productnew.shtrix_table[0].shtrix_kod = self.Changed.shtrix_kod;
      }
      self.$refs.inputText1.focus();
    },
    Shoved() {
      let self = this;
      $(document).on("focusout", function(e) {
        if ($(e.target).attr("class") == "vs__search") {
          if (self.focusset == "") {
            self.focusset = e.target;
          }
        }
      });
      if (self.sett == "create") {
        var body = $(".virtual");
        body.scrollTop(9999999);
        setTimeout(() => {
          var set = document.getElementsByClassName("atable");
          set[set.length - 1].focus();
        }, 100);
      } else if (self.sett == null) {
        self.$refs.inputText1.focus();
      } else if (self.sett >= 0) {
        var body = $(".virtual");
        body.scrollTop(self.scrol);
        setTimeout(() => {
          var set = document.getElementsByClassName("atable");
          set[self.sett].focus();
        }, 100);
      }
    },
    Hide() {
      let self = this;
      setTimeout(function(e) {
        var classs = $(":focus");
        var rrr = $("body")
          .find("input,select,textarea,button")
          .filter(":visible");
        if (classs.attr("class") == "modallist") {
          if (
            $(self.focusset)
              .siblings(".vs__selected")
              .attr("class") != undefined
          ) {
            var focused = rrr.eq(rrr.index(classs) + 1);
            focused.focus();
            self.focusset = "";
          } else {
            $(self.focusset).focus();
            self.focusset = "";
          }
        } else if (classs.attr("class") == undefined) {
          if (
            $(self.focusset)
              .siblings(".vs__selected")
              .attr("class") != undefined
          ) {
            focused = rrr.eq(rrr.index($(self.focusset)) + 2);
            focused.focus();
            self.focusset = "";
          } else {
            $(self.focusset).focus();
            self.focusset = "";
          }
        } else if (classs.attr("class") == "modal-content") {
          self.$refs.inputText1.focus();
        }
      }, 100);
    },
    Hidecreate() {
      if (this.$store.state.saved_modal == "create") {
        const answer = window.confirm(
          this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
        );
        if (answer) {
          this.Createproduct();
        } else {
          this.productnew = {
            name: "",
            extra_name: "",
            country_id: 0,
            unit_id: 0,
            parent_id: 0,
            is_folder: 0,
            model_id: 0,
            brand_id: 0,
            colour_id: 0,
            quality: "",
            picture_name: null,
            shtrix_table: [{ shtrix_kod: "" }]
          };
          this.$root.$emit("productone", this.productnew);
          this.$store.state.saved_modal = null;
        }
      } else if (this.$store.state.saved_modal == "update") {
        const answer = window.confirm(
          this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
        );
        if (answer) {
          this.Updateproduct();
        }
      }
      this.$store.state.saved_modal = null;
      this.$bvModal.show("modal-productlist");
    }
  },
  watch: {
    skladd: {
      deep: true,
      handler(val, oldVal) {
        this.Productlist();
      }
    },
    product: {
      deep: true,
      handler(val, oldVal) {
        if (this.$store.state.saved_modal == null) {
          this.$store.state.saved_modal = "update";
        }
      }
    },
    productnew: {
      deep: true,
      handler(val, oldVal) {
        if (val.name != "") {
          this.$store.state.saved_modal = "create";
        } else {
          this.$store.state.saved_modal = null;
        }
      }
    }
  },
  created: function() {
    this.$root.$emit("productselect", null);
    this.$root.$emit("productone", this.productnew);
    this.Productlist();
    let self = this;
    self.$root.$on("tableselect", function(getdata) {
      self.select = getdata;
    });

    self.$root.$on("unitone", function(getdata) {
      self.unit = getdata;
    });
    self.$root.$on("unitall", function(getdata) {
      self.unitlist = getdata;
    });
    self.$root.$on("unitselected", function(getdata) {
      self.product.unit_id = getdata;
      self.productnew.unit_id = getdata;
    });
    self.$root.$on("countryone", function(getdata) {
      self.country = getdata;
    });
    self.$root.$on("countryall", function(getdata) {
      self.countrylist = getdata;
    });
    self.$root.$on("countryselected", function(getdata) {
      self.product.country_id = getdata;
      self.productnew.country_id = getdata;
      if (getdata != 0) {
        self.Countrychangenew(getdata);
        self.Countrychange(getdata);
      }
    });

    self.$root.$on("modelone", function(getdata) {
      self.model = getdata;
    });
    self.$root.$on("modelall", function(getdata) {
      self.modellist = getdata;
    });
    self.$root.$on("modelselected", function(getdata) {
      self.product.model_id = getdata;
      self.productnew.model_id = getdata;
      if (getdata != 0) {
        self.Modelchangenew(getdata);
        self.Modelchange(getdata);
      }
    });

    self.$root.$on("brandone", function(getdata) {
      self.brand = getdata;
    });
    self.$root.$on("brandall", function(getdata) {
      self.brandlist = getdata;
    });
    self.$root.$on("brandselected", function(getdata) {
      self.product.brand_id = getdata;
      self.productnew.brand_id = getdata;
      if (getdata != 0) {
        self.Brandchangenew(getdata);
        self.Brandchange(getdata);
      }
    });

    self.$root.$on("colourone", function(getdata) {
      self.colour = getdata;
    });
    self.$root.$on("colourall", function(getdata) {
      self.colourlist = getdata;
    });
    self.$root.$on("colourselected", function(getdata) {
      self.product.colour_id = getdata;
      self.productnew.colour_id = getdata;
      if (getdata != 0) {
        self.Colourchangenew(getdata);
        self.Colourchange(getdata);
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
