<template>
  <md-card>
    <div>
      <b-modal
        id="modal-kontragentset"
        title="Етказувчи"
        hide-footer
        size="xl"
        @shown="Shovedform"
        @hidden="Hidecreate()"
      >
        <form>
          <div class="row">
            <div class="col-md-4"><label>ФИО</label></div>
            <div class="col-md-8">
              <input
                class="form-control"
                ref="inputText1"
                v-model="kontragent.name"
                type="text"
              />
            </div>
            <div class="col-md-4"><label>Телефон</label></div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="kontragent.phone_number"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>{{ $t("Хисоб рақам") }}</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="kontragent.account_number"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>{{ $t("ИНН") }}</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="kontragent.inn"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>{{ $t("МФО") }}</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="kontragent.mfo_id"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>{{ $t("ОКОНХ") }}</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="kontragent.okonx"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>{{ $t("Манзил") }}</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="kontragent.address"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>{{ $t("Фирма") }}</label>
            </div>
            <div class="col-md-8">
              <v-select
                :clearable="false"
                class="md-input"
                :options="firmalist"
                v-model="kontragent.firma_id"
                :reduce="name => name.id"
                label="name"
              >
                <template #search="{attributes, events}">
                  <input class="vs__search" v-bind="attributes" v-on="events" />
                  <button
                    href="javascript:void(0)"
                    class="modallist"
                    v-b-modal.modal-firmalist
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
                      class="pluss"
                      type="button"
                      @click="firma.name = search"
                      v-b-modal.modal-firma
                    >
                      +
                    </button></template
                  >
                  <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
                </template>
              </v-select>
            </div>
            <div class="col-md-4">
              <label>{{ $t("Склад") }}</label>
            </div>
            <div class="col-md-8">
              <v-select
                :clearable="false"
                :options="skladlist"
                v-model="kontragent.sklad_id"
                :reduce="name => name.id"
                label="name"
              ></v-select>
            </div>
            <div class="col-md-4">
              <label>{{ $t("Папка") }}</label>
            </div>
            <div class="col-md-8">
              <input type="checkbox" v-model="kontragent.is_folder" />
            </div>
            <div class="col-md-4"><label>Комментарий</label></div>
            <div class="col-md-8">
              <textarea
                class="form-control"
                v-model="kontragent.comment"
              ></textarea>
            </div>
            <div class="col-md-4">
              <label>{{ $t("Тури") }}</label>
            </div>
            <div class="col-md-8">
              <v-select
                :clearable="false"
                :options="kontragent_type"
                v-model="kontragent.type"
                :reduce="name => name.id"
                label="name"
              ></v-select>
            </div>
            <div class="col-md-12 modal-footer">
              <hr />
              <button
                type="button"
                class="btn btn-primary"
                @click="Updatekontragent()"
              >
                {{ $t("Сақлаш") }}
              </button>
            </div>
          </div>
        </form>
      </b-modal>
      <b-modal
        id="modal-kontragent"
        title="Етказувчи"
        hide-footer
        size="xl"
        @shown="Shovedform"
        @hidden="Hidecreate()"
      >
        <form>
          <div class="row">
            <div class="col-md-4"><label>ФИО</label></div>
            <div class="col-md-8">
              <input
                ref="inputText1"
                class="form-control"
                v-model="kontragentnew.name"
                type="text"
              />
            </div>
            <div class="col-md-4"><label>Телефон</label></div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="kontragentnew.phone_number"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>{{ $t("Хисоб рақам") }}</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="kontragentnew.account_number"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>{{ $t("ИНН") }}</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="kontragentnew.inn"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>{{ $t("МФО") }}</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="kontragentnew.mfo_id"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>{{ $t("ОКОНХ") }}</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="kontragentnew.okonx"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>{{ $t("Манзил") }}</label>
            </div>
            <div class="col-md-8">
              <input
                class="form-control"
                v-model="kontragentnew.address"
                type="text"
              />
            </div>
            <div class="col-md-4">
              <label>{{ $t("Фирма") }}</label>
            </div>
            <div class="col-md-8">
              <v-select
                :clearable="false"
                class="md-input"
                :options="firmalist"
                v-model="kontragentnew.firma_id"
                :reduce="name => name.id"
                label="name"
              >
                <template #search="{attributes, events}">
                  <input class="vs__search" v-bind="attributes" v-on="events" />
                  <button
                    type="button"
                    class="modallist"
                    v-b-modal.modal-firmalist
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
                      @click="firma.name = search"
                      class="pluss"
                      v-b-modal.modal-firma
                    >
                      +
                    </button></template
                  >
                  <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
                </template>
              </v-select>
            </div>
            <div class="col-md-4">
              <label>{{ $t("Склад") }}</label>
            </div>
            <div class="col-md-8">
              <v-select
                :clearable="false"
                :options="skladlist"
                v-model="kontragentnew.sklad_id"
                :reduce="name => name.id"
                label="name"
              ></v-select>
            </div>
            <div class="col-md-4">
              <label>{{ $t("Папка") }}</label>
            </div>
            <div class="col-md-8">
              <input type="checkbox" v-model="kontragentnew.is_folder" />
            </div>
            <div class="col-md-4"><label>Комментарий</label></div>
            <div class="col-md-8">
              <textarea
                class="form-control"
                v-model="kontragentnew.comment"
              ></textarea>
            </div>
            <div class="col-md-4">
              <label>{{ $t("Тури") }}</label>
            </div>
            <div class="col-md-8">
              <v-select
                :clearable="false"
                :options="kontragent_type"
                v-model="kontragentnew.type"
                :reduce="name => name.id"
                label="name"
              ></v-select>
            </div>
            <div class="col-md-12 modal-footer">
              <hr />
              <button
                type="button"
                class="btn btn-primary"
                @click="Createkontragent()"
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
        id="modal-kontragentlist"
        title="Етказувчи"
        hide-footer
        size="xl"
        @shown="Shoved"
        @hidden="Hide()"
      >
        <div class="row">
          <div style="display:-webkit-inline-box">
            <button type="button" class="mybtn btn" v-b-modal.modal-kontragent>
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
                      datas.kontragent_id = item.id;
                      $bvModal.hide('modal-kontragentlist');
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
                      kontragent = filteredRows[index];
                      sett = index;
                    "
                    v-b-modal.modal-kontragentset
                  >
                    <b-icon icon="pencil"></b-icon><sup>(F2)</sup>
                  </button>
                  <button
                    type="button"
                    class="mybtn btn"
                    @click="Kontragenttrash(item.id)"
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
  name: "kontragent",
  data() {
    return {
      focusset: "",
      skladlist: [],
      kontragent: {
        name: "",
        phone_number: "",
        account_number: "",
        inn: "",
        mfo_id: 0,
        okonx: "",
        address: "",
        firma_id: 0,
        sklad_id: 0,
        is_folder: false,
        type: 2,
        comment: ""
      },
      firma: "",
      firmalist: [],
      kontragentnew: {
        name: "",
        phone_number: "",
        account_number: "",
        inn: "",
        mfo_id: 0,
        okonx: "",
        address: "",
        firma_id: 0,
        sklad_id: 0,
        is_folder: false,
        type: 2,
        comment: ""
      },
      kontragent_type: [
        { id: 1, name: "Клиент" },
        { id: 2, name: "Етказувчи" },
        { id: 3, name: "Клиент ва Етказувчи" }
      ],
      kontragentlist: [],
      filter: "",
      sett: null
    };
  },
  props: ["datas"],
  computed: {
    filteredRows() {
      return this.kontragentlist.filter(row => {
        const name = row.name.toString().toLowerCase();
        const searchTerm = this.filter.toLowerCase();
        return name.includes(searchTerm);
      });
    }
  },
  methods: {
    Kontragenttrash(id) {
      const answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
      if (answer) {
        let self = this;
        axios({
          method: "delete",
          url: "api/v1/kontragent/id/" + id
        }).then(function(response) {
          self.Kontragentlist();
        });
      }
    },
    Kontragentlist() {
      let self = this;
      axios.get("api/v1/kontragent").then(function(response) {
        self.kontragentlist = response.data;
        self.$root.$emit("kontragentall", response.data);
      });
    },
    Updatekontragent() {
      let self = this;
      axios({
        method: "patch",
        url: "api/v1/kontragent/id/" + self.kontragent.id,
        data: self.kontragent
      }).then(function(response) {
        self.Kontragentlist();
        self.$store.state.saved_modal = "updated";
        self.$bvModal.hide("modal-kontragentset");
        self.kontragent = {
          name: "",
          phone_number: "",
          account_number: "",
          inn: "",
          mfo_id: 0,
          okonx: "",
          address: "",
          firma_id: 0,
          sklad_id: 0,
          is_folder: false,
          type: 2,
          comment: ""
        };
      });
    },
    Shovedform() {
      this.$bvModal.hide("modal-kontragentlist");
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
    Hidecreate() {
      if (this.$store.state.saved_modal == "create") {
        const answer = window.confirm(
          this.$t("Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?")
        );
        if (answer) {
          this.Createkontragent();
        } else {
          this.New();
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
      this.$bvModal.show("modal-kontragentlist");
    },
    New() {
      this.kontragentnew = {
        name: "",
        phone_number: "",
        account_number: "",
        inn: "",
        mfo_id: 0,
        okonx: "",
        address: "",
        firma_id: 0,
        sklad_id: 0,
        is_folder: false,
        type: 2,
        comment: ""
      };
      this.$root.$emit("kontragentone", this.kontragentnew);
    },
    Createkontragent() {
      let self = this;
      axios({
        method: "post",
        url: "api/v1/kontragent",
        data: self.kontragentnew
      }).then(function(response) {
        self.kontragentlist.push(response.data);
        self.$store.state.saved_modal = "created";
        self.New();
        self.$bvModal.hide("modal-kontragent");
        self.sett = "create";
      });
    }
  },
  watch: {
    kontragent: {
      deep: true,
      handler(val, oldVal) {
        if (this.$store.state.saved_modal == null) {
          this.$store.state.saved_modal = "update";
        }
      }
    },
    kontragentnew: {
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
    this.$root.$emit("kontragentone", this.kontragentnew);
    this.Kontragentlist();
    let self = this;
    self.$root.$on("skladall", function(getdata) {
      self.skladlist = getdata;
    });
    self.$root.$on("firmaone", function(getdata) {
      self.firma = getdata;
    });
    self.$root.$on("firmaall", function(getdata) {
      self.firmalist = getdata;
    });
    self.$root.$on("firmaselected", function(getdata) {
      self.kontragent.firma_id = getdata;
      self.kontragentnew.firma_id = getdata;
    });
  }
};
</script>
<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
