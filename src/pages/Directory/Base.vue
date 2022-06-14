<template>
  <md-card>
    <div>
      <b-modal
        id="modal-base"
        title="Асос"
        hide-footer
        size="xl"
        @shown="Shovedform"
        @hidden="Hidecreate()"
      >
        <form>
          <div class="row">
            <div class="col-md-4">
              <label>{{ $t("Номи") }}</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                ref="inputText1"
                v-model="modelsnew.name"
                type="text"
              />
            </div>
            <div class="col-md-12 modal-footer">
              <hr />
              <button type="button" class="btn btn-primary" @click="Create()">
                {{ $t("Сақлаш") }}
              </button>
            </div>
          </div>
        </form>
      </b-modal>
      <b-modal
        id="modal-baseset"
        title="Асос"
        hide-footer
        size="xl"
        @shown="Shovedform"
        @hidden="Hidecreate()"
      >
        <form>
          <div class="row">
            <div class="col-md-4">
              <label>{{ $t("Номи") }}</label>
            </div>
            <div class="col-md-8">
              <input class="form-control" v-model="models.name" type="text" />
            </div>
            <div class="col-md-12 modal-footer">
              <hr />
              <button type="button" class="btn btn-primary" @click="Update()">
                {{ $t("Сақлаш") }}
              </button>
            </div>
          </div>
        </form>
      </b-modal>
    </div>
    <div>
      <b-modal
        id="modal-baselist"
        title="Асос"
        hide-footer
        size="xl"
        @shown="Shoved"
        @hidden="Hide()"
      >
        <div class="row">
          <div style="display:-webkit-inline-box">
            <button type="button" class="mybtn btn" v-b-modal.modal-base>
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
                <th>№</th>
                <th>{{ $t("Номи") }}</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in filteredRows" :key="index">
              <tr>
                <td>{{ index + 1 }}</td>
                <td>
                  <button
                    type="button"
                    class="atable"
                    @click="
                      datas.kassa_order_table[
                        $store.state.selected_index
                      ].base_id = item.id;
                      $bvModal.hide('modal-baselist');
                    "
                  >
                    {{ item.name }}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="mybtn btn"
                    @click="
                      models = list[index];
                      sett = index;
                    "
                    v-b-modal.modal-baseset
                  >
                    <b-icon icon="pencil"></b-icon><sup>(F2)</sup>
                  </button>
                  <button
                    type="button"
                    class="mybtn btn"
                    @click="Trash(item.id)"
                  >
                    <b-icon icon="trash"></b-icon><sup>(delete)</sup>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-modal>
    </div>
  </md-card>
</template>
<script>
import { toggle } from "../../components/mixins/mymixin.js";
import $ from "jquery";
export default {
  name: "asos",
  mixins: [toggle],
  props: ["datas"],
  data() {
    return {
      focusset: "",
      filter: "",
      sett: null,
      models: { name: "" },
      modelsnew: { name: "" },
      list: [],
      select: 0,
      itemindex: 0
    };
  },
  methods: {
    Trash(id) {
      const answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
      if (answer) {
        let self = this;
        axios({ method: "delete", url: "api/v1/base/id/" + id }).then(function(
          response
        ) {
          self.List();
        });
      }
    },
    List() {
      let self = this;
      axios.get("api/v1/base").then(function(response) {
        self.list = response.data;
        self.$root.$emit("baseall", response.data);
      });
    },
    Selected(id) {
      this.$root.$emit("baseselected", id);
    },
    Update() {
      let self = this;
      axios({
        method: "patch",
        url: "api/v1/base/id/" + self.models.id,
        data: self.models
      }).then(function(response) {
        self.List();
        self.models = { name: "" };
        self.$bvModal.hide("modal-baselist");
        self.$bvModal.hide("modal-baseset");
        self.$bvModal.show("modal-baselist");
      });
    },
    Hidecreate() {
      this.$bvModal.hide("modal-baselist");
      this.$bvModal.show("modal-baselist");
    },
    Create() {
      let self = this;
      axios({
        method: "post",
        url: "api/v1/base",
        data: self.modelsnew
      }).then(function(response) {
        self.list.push(response.data);
        self.modelsnew = { name: "" };
        self.$root.$emit("baseone", self.modelsnew);
        self.$bvModal.hide("modal-base");
        self.$bvModal.show("modal-baselist");
        self.sett = "create";
      });
    }
  },
  computed: {
    filteredRows() {
      return this.list.filter(row => {
        const name = row.name.toString().toLowerCase();
        const searchTerm = this.filter.toLowerCase();

        return name.includes(searchTerm);
      });
    },
    Set() {
      return this.datas.kassa_order_table[this.select];
    }
  },
  mounted: function() {
    this.$root.$emit("baseone", this.modelsnew);
    this.$root.$emit("baseselected", this.select);
    this.List();
  }
};
</script>
<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
