<template>
  <md-card>
    <div>
      <b-modal
        id="modal-model"
        title="Модел"
        hide-footer
        size="xl"
        @shown="Shovedform('modal-modellist')"
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
        id="modal-modelset"
        title="Модел"
        hide-footer
        size="xl"
        @shown="Shovedform('modal-modellist')"
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
                v-model="models.name"
                type="text"
              />
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
        id="modal-modellist"
        title="Модел"
        hide-footer
        size="xl"
        @shown="Shoved"
        @hidden="Hide()"
      >
        <div class="row">
          <div style="display:-webkit-inline-box">
            <button type="button" class="mybtn btn" v-b-modal.modal-model>
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
                      Selected(item.id);
                      $bvModal.hide('modal-modellist');
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
                      models = filteredRows[index];
                      sett = index;
                    "
                    v-b-modal.modal-modelset
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
import $ from "jquery";
import { toggle } from "../../components/mixins/mymixin.js";
export default {
  name: "model",
  mixins: [toggle],
  data() {
    return {
      focusset: "",
      filter: "",
      sett: null,
      models: { name: "" },
      modelsnew: { name: "" },
      list: [],
      select: 0
    };
  },
  methods: {
    Trash(id) {
      const answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
      if (answer) {
        let self = this;
        axios({
          method: "delete",
          url: "api/v1/model/id/" + id
        }).then(function(response) {
          self.List();
        });
      }
    },
    List() {
      let self = this;
      axios.get("api/v1/model").then(function(response) {
        self.list = response.data;
        self.$root.$emit("modelall", response.data);
      });
    },
    Selected(id) {
      this.$root.$emit("modelselected", id);
    },
    Update() {
      let self = this;
      axios({
        method: "patch",
        url: "api/v1/model/id/" + self.models.id,
        data: self.models
      }).then(function(response) {
        self.List();
        self.models = { name: "" };
        self.$store.state.saved_modal = "updated";
        self.$bvModal.hide("modal-modelset");
      });
    },
    Hidecreate() {
      if (this.$store.state.saved_modal == "create") {
        const answer = window.confirm(
          this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
        );
        if (answer) {
          this.Create();
        } else {
          this.modelsnew = { name: "" };
          this.$root.$emit("modelone", this.modelsnew);
        }
      } else if (this.$store.state.saved_modal == "update") {
        const answer = window.confirm(
          this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
        );
        if (answer) {
          this.Update();
        }
      }
      this.$store.state.saved_modal = null;
      this.$bvModal.show("modal-modellist");
    },
    Create() {
      let self = this;
      axios({
        method: "post",
        url: "api/v1/model",
        data: self.modelsnew
      }).then(function(response) {
        self.list.push(response.data);
        self.$store.state.saved_modal = "created";
        self.modelsnew = { name: "" };
        self.$bvModal.hide("modal-model");
        self.sett = "create";
        self.$root.$emit("modelone", self.modelsnew);
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
    }
  },
  watch: {
    models: {
      deep: true,
      handler(val, oldVal) {
        if (this.$store.state.saved_modal == null) {
          this.$store.state.saved_modal = "update";
        }
      }
    },
    modelsnew: {
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
  created() {
    this.$root.$emit("modelone", this.modelsnew);
    this.$root.$emit("modelselected", this.select);
    this.List();
  }
};
</script>
<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
