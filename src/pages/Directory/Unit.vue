<template>
  <md-card>
    <div>
      <b-modal
        id="modal-unit"
        title="Ўлчов бирлик"
        hide-footer
        size="xl"
        @shown="Shovedform('modal-unitlist')"
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
                v-model="unitnew.name"
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
        id="modal-unitset"
        title="Ўлчов бирлик"
        hide-footer
        size="xl"
        @shown="Shovedform('modal-unitlist')"
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
                v-model="unit.name"
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
        id="modal-unitlist"
        title="Ўлчов бирлик"
        hide-footer
        size="xl"
        @shown="Shoved"
        @hidden="Hide()"
      >
        <div class="row">
          <div style="display:-webkit-inline-box">
            <button type="button" class="mybtn btn" v-b-modal.modal-unit>
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
                      $bvModal.hide('modal-unitlist');
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
                      unit = filteredRows[index];
                      sett = index;
                    "
                    v-b-modal.modal-unitset
                  >
                    <b-icon icon="pencil"></b-icon><sup>(f2)</sup>
                  </button>
                  <button
                    type="button"
                    class="mybtn btn"
                    @click="Unittrash(item.id)"
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
  name: "unit",
  mixins: [toggle],
  data() {
    return {
      focusset: "",
      filter: "",
      sett: null,
      unit: { name: "" },
      unitnew: { name: "" },
      unitlist: [],
      select: 0
    };
  },
  methods: {
    Unittrash(id) {
      const answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
      if (answer) {
        let self = this;
        axios({
          method: "delete",
          url: "api/v1/unit/id/" + id
        }).then(function(response) {
          self.Unitlist();
        });
      }
    },
    Unitlist() {
      let self = this;
      axios.get("api/v1/unit").then(function(response) {
        self.unitlist = response.data;
        self.$root.$emit("unitall", response.data);
      });
    },
    Selected(id) {
      this.$root.$emit("unitselected", id);
    },
    Update() {
      let self = this;
      axios({
        method: "patch",
        url: "api/v1/unit/id/" + self.unit.id,
        data: self.unit
      }).then(function(response) {
        self.Unitlist();
        self.unit = { name: "" };
        self.$store.state.saved_modal = "updated";
        self.$bvModal.hide("modal-unitset");
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
          this.unitnew = { name: "" };
          this.$root.$emit("unitone", this.unitnew);
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
      this.$bvModal.show("modal-unitlist");
    },
    Create() {
      let self = this;
      axios({
        method: "post",
        url: "api/v1/unit",
        data: self.unitnew
      }).then(function(response) {
        self.unitlist.push(response.data);
        self.$store.state.saved_modal = "created";
        self.unitnew = { name: "" };
        self.$bvModal.hide("modal-unit");
        self.sett = "create";
        self.$root.$emit("unitone", self.unitnew);
      });
    }
  },
  computed: {
    filteredRows() {
      return this.unitlist.filter(row => {
        const name = row.name.toString().toLowerCase();
        const searchTerm = this.filter.toLowerCase();

        return name.includes(searchTerm);
      });
    }
  },
  watch: {
    unit: {
      deep: true,
      handler(val, oldVal) {
        if (this.$store.state.saved_modal == null) {
          this.$store.state.saved_modal = "update";
        }
      }
    },
    unitnew: {
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
    this.$root.$emit("unitone", this.unitnew);
    this.$root.$emit("unitselected", this.select);
    this.Unitlist();
  }
};
</script>
<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
