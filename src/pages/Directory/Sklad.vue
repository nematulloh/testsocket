<template>
  <md-card>
    <div>
      <b-modal
        id="modal-sklad"
        title="Cклад"
        size="xl"
        hide-footer
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
                v-model="skladnew.name"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>Телефон</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="skladnew.phone_number"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>{{ $t("Манзил") }}</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="skladnew.address"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>{{ $t("Чек ёзуви") }}</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="skladnew.check_word"
                type="text"
              />
            </div>
            <div class="col-md-12 modal-footer">
              <hr />
              <button
                type="button"
                class="btn btn-primary"
                @click="Createsklad()"
              >
                {{ $t("Сақлаш") }}
              </button>
            </div>
          </div>
        </form>
      </b-modal>
      <b-modal
        id="modal-skladset"
        title="Cклад"
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
                v-model="sklad.name"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>Телефон</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="sklad.phone_number"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>{{ $t("Манзил") }}</label>
            </div>
            <div class="col-md-8">
              <input class="form-control" v-model="sklad.address" type="text" />
            </div>
            <div class="col-md-4">
              <label>{{ $t("Чек ёзуви") }}</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="sklad.check_word"
                type="text"
              />
            </div>
            <div class="col-md-12 modal-footer">
              <hr />
              <button
                type="button"
                class="btn btn-primary"
                @click="Updatesklad()"
              >
                {{ $t("Сақлаш") }}
              </button>
            </div>
          </div>
        </form>
      </b-modal>
    </div>
    <div>
      <b-modal
        id="modal-skladlist"
        title="Склад"
        hide-footer
        size="xl"
        @shown="Shoved"
        @hidden="Hide()"
      >
        <div class="row">
          <div style="display: -webkit-inline-box">
            <button type="button" class="mybtn btn" v-b-modal.modal-sklad>
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
                <th>Номи</th>
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
                      datas.sklad_id = item.id;
                      $bvModal.hide('modal-skladlist');
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
                      sklad = filteredRows[index];
                      sett = index;
                    "
                    v-b-modal.modal-skladset
                  >
                    <b-icon icon="pencil"></b-icon><sup>(F2)</sup>
                  </button>
                  <button
                    type="button"
                    class="mybtn btn"
                    @click="Skladtrash(item.id)"
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
export default {
  name: "sklad",
  data() {
    return {
      focusset: "",
      sklad: {
        name: "",
        phone_number: "+998",
        address: "",
        check_word: ""
      },
      skladnew: {
        name: "",
        phone_number: "+998",
        address: "",
        check_word: ""
      },
      skladlist: [],
      filter: "",
      sett: null
    };
  },
  props: ["datas"],
  computed: {
    filteredRows() {
      return this.skladlist.filter(row => {
        const name = row.name.toString().toLowerCase();
        const searchTerm = this.filter.toLowerCase();
        return name.includes(searchTerm);
      });
    }
  },
  methods: {
    Skladtrash(id) {
      const answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
      if (answer) {
        let self = this;
        axios({
          method: "delete",
          url: "api/v1/sklads/id/" + id
        }).then(function(response) {
          self.Skladlist();
        });
      }
    },
    Skladlist() {
      let self = this;
      axios.get("api/v1/sklads").then(function(response) {
        self.skladlist = response.data;
        self.$root.$emit("skladall", response.data);
      });
    },
    Updatesklad() {
      let self = this;
      axios({
        method: "patch",
        url: "api/v1/sklads/id/" + self.sklad.id,
        data: self.sklad
      }).then(function(response) {
        self.Skladlist();
        self.sklad = {
          name: "",
          phone_number: "+998",
          address: "",
          check_word: ""
        };
        self.$store.state.saved_modal = "updated";
        self.$bvModal.hide("modal-skladset");
        self.sklad = {
          name: "",
          phone_number: "+998",
          address: "",
          check_word: ""
        };
      });
    },
    Shovedform() {
      this.$bvModal.hide("modal-skladlist");
      if (this.$store.state.saved_modal == "update") {
        this.$store.state.saved_modal = null;
      }
      let self = this;
      $(document).on("focusout", function(e) {
        if ($(e.target).attr("class") == "vs__search") {
          if (self.focusset == "") {
            self.focusset = e.target;
          }
        }
      });
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
        var set = document.getElementsByClassName("atable");
        set[set.length - 1].focus();
      } else if (self.sett == null) {
        self.$refs.inputText1.focus();
      } else if (self.sett >= 0) {
        var set = document.getElementsByClassName("atable");
        set[self.sett].focus();
      } else {
        self.$refs.inputText1.focus();
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
          } else {
            $(self.focusset).focus();
          }
        } else if (classs.attr("class") == undefined) {
          if (
            $(self.focusset)
              .siblings(".vs__selected")
              .attr("class") != undefined
          ) {
            focused = rrr.eq(rrr.index($(self.focusset)) + 2);
            focused.focus();
          } else {
            $(self.focusset).focus();
          }
        } else if (classs.attr("class") == "modal-content") {
          self.$refs.inputText1.focus();
        }
      }, 100);
    },
    Createsklad() {
      let self = this;
      self.$bvModal.hide("modal-skladlist");
      axios({
        method: "post",
        url: "api/v1/sklads",
        data: self.skladnew
      }).then(function(response) {
        self.$bvModal.hide("modal-sklad");
        self.skladlist.push(response.data);
        self.$store.state.saved_modal = "created";
        self.sett = "create";
        self.skladnew = {
          name: "",
          phone_number: "+998",
          address: "",
          check_word: ""
        };
        self.$root.$emit("skladone", self.skladnew);
      });
    },
    Hidecreate() {
      if (this.$store.state.saved_modal == "create") {
        const answer = window.confirm(
          this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
        );
        if (answer) {
          this.Createsklad();
        } else {
          this.skladnew = {
            name: "",
            phone_number: "+998",
            address: "",
            check_word: ""
          };
          this.$root.$emit("skladone", this.skladnew);
        }
      } else if (this.$store.state.saved_modal == "update") {
        const answer = window.confirm(
          this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
        );
        if (answer) {
          this.Updatesklad();
        }
      }
      this.$store.state.saved_modal = null;
      this.$bvModal.show("modal-skladlist");
    }
  },
  watch: {
    sklad: {
      deep: true,
      handler(val, oldVal) {
        if (this.$store.state.saved_modal == null) {
          this.$store.state.saved_modal = "update";
        }
      }
    },
    skladnew: {
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
    this.$root.$emit("skladone", this.skladnew);
    this.Skladlist();
  }
};
</script>
<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
