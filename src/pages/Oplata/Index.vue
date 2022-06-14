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
      <b-col sm="5" md="5" class="my-1">
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
      <b-col sm="3" md="3" class="my-1">
        <button class="btn btn-primary mybtn" @click="Href('/oplata/create')">
          {{ $t("Қўшиш") }}
        </button>
        <button class="btn btn-primary mybtn" type="button" @click="Data()">
          {{ $t("Янгилаш") }}
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
      @row-clicked="Update"
      @filtered="onFiltered"
      :filter-function="filterFunction"
    >
      <template #cell(sklad)="row">
        <span v-if="row.item.sklad != null">
          {{ row.item.sklad.name }}
        </span>
      </template>
      <template #cell(kontragent)="row">
        <span v-if="row.item.kontragent != null">
          {{ row.item.kontragent.name }}
        </span>
      </template>
      <template #cell(summa)="row">
        {{ row.item.summa | numFormat }}
      </template>
      <template #cell(type)="row">
        <span v-if="row.item.type == false">
          {{ $t("Чиқим") }}
        </span>
        <span v-else>
          {{ $t("Кирим") }}
        </span>
      </template>
      <template #cell(actions)="row">
        <router-link
          class="mybtn btn"
          :to="{ path: '/oplata/update/' + row.item.id }"
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
  </b-container>
</template>

<script>
import { print } from "../../components/mixins/print.js";
import filterFunction from "../../utils/filterFunction";
export default {
  mixins: [print],
  data() {
    return {
      items: [],
      errors: "",
      fields: [
        {
          key: "id",
          label: "Id",
          sortable: true,
          class: "text-center column1"
        },
        {
          key: "datetime",
          label: this.$t("Вақт"),
          sortable: true,
          formatter: (value, key, item) => {
            return this.Date(value);
          },
          sortByFormatted: true,
          filterByFormatted: true,
          class: "text-center column4"
        },
        {
          key: "kontragent",
          label: "Контрагент",
          sortable: true,
          class: "text-center"
        },
        { key: "sklad", label: "Cклад", sortable: true, class: "text-center" },
        {
          key: "summa",
          label: "Сумма",
          sortable: true,
          class: "text-center column2"
        },
        {
          key: "type",
          label: this.$t("Тури"),
          sortable: true,
          class: "text-center column2"
        },

        { key: "actions", label: "", class: "column2" }
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
  mounted() {
    this.Data();
    // this.Interval();
  },
  methods: {
    filterFunction,
    Update(record, index) {
      this.$router.push({ path: '/oplata/update/' + record.id});
    },
    Data() {
      let self = this;
      axios({
        method: "get",
        url: "api/v1/kontragent-pay",
        headers: {
          "Content-Type": "application/json"
        }
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
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    Trash(id) {
      let self=this;
      self.$prompt(self.$t("Паролни киритинг")).then(text => {
          if (text == self.update_password) {
            axios({
            method: "delete",
            url: "api/v1/kontragent-pay/id/" + id
          }).then(function(response) {
            self.Data();
          });
          } else {
            self.$store.state.errors = self.$t("Парол хато");
          }
        })
        .catch(function() {});
    }
  }
};
</script>
