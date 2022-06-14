<template>
  <b-container fluid>
    <b-row>
      <b-col lg="4" class="my-1">
        <b-form-group
          :label="$t('Қидирув')"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              :placeholder="$t('Қидирув')"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col sm="4" md="4" class="my-1">
        <b-form-group
          :label="$t('Cони')"
          label-for="per-page-select"
          label-cols-sm="5"
          label-cols-md="5"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input
            id="per-page-select"
            v-model="$store.state.countindex"
            type="number"
            size="sm"
          ></b-input>
        </b-form-group>
      </b-col>
      <b-col sm="4" md="4" class="my-1">
        <button
          class="btn btn-primary mybtn"
          @click="Href('/malumot/product/create')"
        >
          {{ $t("Қўшиш") }}
        </button>
        <button class="btn btn-primary mybtn" type="button" @click="Data()">
          {{ $t("Янгилаш") }}
        </button>
        <button
          class="btn btn-primary mybtn"
          v-b-modal.modal-upload
          type="button"
        >
          {{ $t("Файл") }}
        </button>
        <button
          class="btn btn-primary mybtn"
          type="button"
          @click="Bazayuklash()"
        >
          {{ $t("База") }}
        </button>
      </b-col>
    </b-row>

    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="$store.state.countindex"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
      @row-clicked="Update"
      :filter-function="filterFunction"
    >
      <template #cell(datetime)="row">
        {{ new Date(row.item.datetime * 1000).toISOString().substr(0, 16) }}
      </template>
      <template #cell(actions)="row">
        <router-link
          class="mybtn btn"
          :to="{ path: '/malumot/product/update/' + row.item.id }"
        >
          <b-icon icon="pencil"></b-icon>
        </router-link>
        <a
          class="mybtn btn"
          href="javascript:void(0)"
          @click="Trash(row.item.id)"
        >
          <b-icon icon="trash"></b-icon>
        </a>
      </template>
    </b-table>
    <span v-if="totalRows > $store.state.countindex">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="$store.state.countindex"
        align="fill"
        size="sm"
        class="my-0"
      ></b-pagination>
    </span>
    <sklad :datas="datas"></sklad>
    <b-modal
      id="modal-upload"
      title=""
      size="xl"
      hide-footer
      @shown="Shovedform"
    >
      <form>
        <v-select
          :clearable="false"
          class="md-input"
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
        <input
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
        <button type="button" class="btn btn-primary" @click="Yuklash()">
          {{ $t("Сақлаш") }}
        </button>
      </form>
    </b-modal>
  </b-container>
</template>

<script>
import { print } from "../../../components/mixins/print.js";
import filterFunction from "../../../utils/filterFunction";
import { Sklad } from "@/pages";
export default {
  components: { Sklad },
  mixins: [print],
  data() {
    return {
      file: "",
      datas: {
        file: "",
        sklad_id: parseInt(localStorage.getItem("sklad_id"))
      },
      items: [],
      sklad: "",
      skladlist: [],
      errors: "",
      fields: [
        {
          key: "id",
          label: "Id",
          sortable: true,
          class: "text-center column1"
        },
        {
          key: "extra_name",
          label: "Номи",
          sortable: true,
          class: "text-center"
        },
        {
          key: "shtrix_table",
          label: "Штрих",
          sortable: true,
          class: "column2 text-center",
          formatter: (value, key, item) => {
            if (value != null) {
              let all = " ";
              value.forEach(element => {
                return (all += element.shtrix_kod + " ");
              });
              return all;
            }
          }
        },
        {
          key: "quality",
          label: "Сифат",
          sortable: true,
          class: "text-center column2"
        },
        {
          key: "brand",
          label: "Бренд",
          sortable: true,
          class: "column2 text-center",
          formatter: (value, key, item) => {
            if (value != null) {
              return value.name;
            }
          }
        },
        {
          key: "colour",
          label: "Ранг",
          sortable: true,
          class: "column2 text-center",
          formatter: (value, key, item) => {
            if (value != null) {
              return value.name;
            }
          }
        },
        {
          key: "country",
          label: "Давлат",
          sortable: true,
          class: "column2 text-center",
          formatter: (value, key, item) => {
            if (value != null) {
              return value.name;
            }
          }
        },
        {
          key: "model",
          label: "Модел",
          sortable: true,
          class: "column2 text-center",
          formatter: (value, key, item) => {
            if (value != null) {
              return value.name;
            }
          }
        },
        {
          key: "unit",
          label: "Ўлчов",
          sortable: true,
          class: "column2 text-center",
          formatter: (value, key, item) => {
            if (value != null) {
              return value.name;
            }
          }
        },
        { key: "actions", label: "", class: "column1-5 text-center" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      }
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  created: function() {
    this.Data();
    let self = this;
    self.$root.$on("skladone", function(getdata) {
      self.sklad = getdata;
    });
    self.$root.$on("skladall", function(getdata) {
      self.skladlist = getdata;
    });
    // self.Interval();
  },
  methods: {
    filterFunction,
    Update(record, index) {
      this.$router.push({ path: '/malumot/product/update/' + record.id});
    },
    handleFileUpload() {
      this.file = this.$refs.file.files;
      this.datas.file = URL.createObjectURL(this.$refs.file.files[0]);
    },
    Bazayuklash() {
      axios({
        method: "get",
        url: "api/v1/download/dump"
      }).then(function(response) {});
    },
    Yuklash() {
      let self = this;
      let formData = new FormData();
      let file = this.file[0];
      formData.append("file_name", file);
      formData.append("sklad_id", this.datas.sklad_id);
      formData.append("user_id", localStorage.getItem("user_id"));
      axios({
        method: "post",
        url: "api/v1/upload/product",
        data: formData
      }).then(function(response) {
        self.datas = {
          file: "",
          sklad_id: 0
        };
        self.$bvModal.hide("modal-upload");
        self.Data();
      });
    },
    Data() {
      let self = this;
      axios({
        method: "get",
        url: "api/v1/product"
      })
        .then(function(response) {
          self.items = response.data;
          self.totalRows = self.items.length;
        })
        .catch(function(error) {
          self.errors = error.message;
        });
    },
    Interval() {
      window.setInterval(() => {
        this.Data();
      }, 60000);
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    Trash(id) {
      let self=this;
      self.$prompt(self.$t("Паролни киритинг")).then(text => {
          if (text == self.update_password) {
            axios({
            method: "delete",
            url: "api/v1/product/id/" + id
          }).then(function(response) {
            self.Data();
          });
          } else {
            self.$store.state.errors = self.$t("Парол хато");
          }
        })
        .catch(function() {});
    },
    Shovedform() {
      this.$refs.file.focus();
    }
  }
};
</script>
