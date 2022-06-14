<template>
  <md-card>
    <div>
      <b-modal
        id="modal-paytype"
        title="Тўлов тури"
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
                v-model="paytypenew.name"
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
        id="modal-paytypeset"
        title="Тўлов тури"
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
                v-model="paytype.name"
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
        id="modal-paytypelist"
        title="Тўлов тури"
        hide-footer
        size="xl"
        @shown="Shoved"
        @hidden="Hide()"
      >
        <div class="row">
          <div style="display:-webkit-inline-box">
            <!-- <button type="button" class="mybtn btn" v-b-modal.modal-paytype>
              +(insert)
            </button> -->
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
                <!-- <th></th> -->
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
                      datas.pay_type_id = item.id;
                      $bvModal.hide('modal-paytypelist');
                    "
                  >
                    {{ item.name }}
                  </button>
                </td>
                <!-- <td>
                  <button
                    type="button"
                    class="mybtn btn"
                    @click="
                      paytype = filteredRows[index];
                      sett = index;
                    "
                    v-b-modal.modal-paytypeset
                  >
                    <b-icon icon="pencil"></b-icon><sup>(F2)</sup>
                  </button>
                  <button
                    type="button"
                    class="mybtn btn"
                    @click="Paytypetrash(item.id)"
                  >
                    <b-icon icon="trash"></b-icon><sup>(delete)</sup>
                  </button>
                </td> -->
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
  name: "paytype",
  data() {
    return {
      focusset: "",
      filter: "",
      sett: null,
      paytype: { name: "" },
      paytypenew: { name: "" },
      paytypelist: []
    };
  },
  computed: {
    filteredRows() {
      return this.paytypelist.filter(row => {
        const name = row.name.toString().toLowerCase();
        const searchTerm = this.filter.toLowerCase();

        return name.includes(searchTerm);
      });
    }
  },
  props: ["datas", "errors"],
  methods: {
    Paytypetrash(id) {
      const answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
      if (answer) {
        let self = this;
        axios({
          method: "delete",
          url: "api/v1/pay-type/id/" + id
        }).then(function(response) {
          self.Paytypelist();
        });
      }
    },
    Paytypelist() {
      let self = this;
      axios.get("api/v1/pay-type").then(function(response) {
        self.paytypelist = response.data;
        self.$root.$emit("paytypeall", response.data);
      });
    },
    Update() {
      let self = this;
      axios({
        method: "patch",
        url: "api/v1/pay-type/id/" + self.paytype.id,
        data: self.paytype
      }).then(function(response) {
        self.Paytypelist();
        self.$store.state.saved_modal = "updated";
        self.paytype = { name: "" };
        self.$bvModal.hide("modal-paytypeset");
      });
    },
    Create() {
      let self = this;
      axios({
        method: "post",
        url: "api/v1/pay-type",
        data: self.paytypenew
      }).then(function(response) {
        self.paytypelist.push(response.data);
        self.$store.state.saved_modal = "created";
        self.paytypenew = { name: "" };
        self.$root.$emit("paytypeone", self.paytypenew);
        self.$bvModal.hide("modal-paytype");
        self.$bvModal.show("modal-paytypelist");
        self.sett = "create";
      });
    },
    Shovedform() {
      this.$bvModal.hide("modal-paytypelist");
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
      }
    },
    Hide() {
      let self = this;
      setTimeout(function(e) {
        var classs = $(":focus");
        var rrr = $("body")
          .find("input,select,textarea,button")
          .filter(":visible")
          .not(".needt");
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
    Hidecreate() {
      if (this.$store.state.saved_modal == "create") {
        const answer = window.confirm(
          this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
        );
        if (answer) {
          this.Create();
        } else {
          this.paytypenew = { name: "" };
          this.$root.$emit("paytypeone", this.paytypenew);
          this.$store.state.saved_modal = null;
        }
      } else if (this.$store.state.saved_modal == "update") {
        const answer = window.confirm(
          this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
        );
        if (answer) {
          this.Updatekontragent();
        }
      }
      this.$store.state.saved_modal = null;
      this.$bvModal.show("modal-paytypelist");
    }
  },
  watch: {
    paytype: {
      deep: true,
      handler(val, oldVal) {
        if (this.$store.state.saved_modal == null) {
          this.$store.state.saved_modal = "update";
        }
      }
    },
    paytypenew: {
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
    this.$root.$emit("paytypeone", this.paytypenew);
    this.Paytypelist();
  }
};
</script>
<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
