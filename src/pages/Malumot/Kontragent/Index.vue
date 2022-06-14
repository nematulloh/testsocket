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
          @click="Href('/malumot/kontragent/create')"
        >
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
          :to="{ path: '/malumot/kontragent/update/' + row.item.id }"
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
import { print } from "../../../components/mixins/print.js";
import filterFunction from "../../../utils/filterFunction";
export default {
  mixins: [print],
  data() {
    return {
      items: [],
      fields: [
        {
          key: "id",
          label: "Id",
          sortable: true,
          class: "text-center column1"
        },
        {
          key: "name",
          label: "ФИО",
          sortable: true,
          class: "text-center"
        },
        {
          key: "phone_number",
          label: "Телефон",
          sortable: true,
          class: "text-center"
        },
        // {
        //   key: "account_number",
        //   label: this.$t("Хисоб рақам"),
        //   sortable: true,
        //   class: "text-center"
        // },
        // {
        //   key: "inn",
        //   label: this.$t("ИНН"),
        //   sortable: true,
        //   class: "text-center"
        // },
        // {
        //   key: "mfo_id",
        //   label: this.$t("МФО"),
        //   sortable: true,
        //   class: "text-center"
        // },
        // {
        //   key: "okonx",
        //   label: this.$t("ОКОНХ"),
        //   sortable: true,
        //   class: "text-center"
        // },
        // {
        //   key: "address",
        //   label: this.$t("Манзил"),
        //   sortable: true,
        //   class: "text-center"
        // },
        // {
        //   key: "firma_id",
        //   label: this.$t("Фирма"),
        //   sortable: true,
        //   class: "text-center"
        // },
        // {
        //   key: "comment",
        //   label: "Комментарий",
        //   sortable: true,
        //   class: "text-center"
        // },
        { key: "actions", label: "", class: "column1-5 text-center" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: []
    };
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  created: function() {
    this.Data();
  },
  methods: {
    filterFunction,
    Update(record, index) {
      this.$router.push({ path: '/malumot/kontragent/update/' + record.id});
    },
    Data() {
      let self = this;
      axios({
        method: "get",
        url: "api/v1/kontragent",
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
            url: "api/v1/kontragent/id/" + id
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
