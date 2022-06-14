<template>
  <md-card>
    <div>
      <b-modal
        id="modal-crmfoundaddress"
        :title="$t('Бизни қаердан топган')"
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
        id="modal-crmfoundaddressset"
        :title="$t('Бизни қаердан топган')"
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
        id="modal-crmfoundaddresslist"
        :title="$t('Бизни қаердан топган')"
        hide-footer
        size="xl"
        @shown="Shoved"
        @hidden="Hide()"
      >
        <div class="row">
          <div style="display:-webkit-inline-box">
            <button
              type="button"
              class="mybtn btn"
              v-b-modal.modal-crmfoundaddress
            >
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
                      datas.found_address_id = item.id;
                      $bvModal.hide('modal-crmfoundaddresslist');
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
                    v-b-modal.modal-crmfoundaddressset
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
export default {
  name: "foundaddress",
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
        axios({
          method: "delete",
          url: "api/v1/crm-found-address/id/" + id
        }).then(function(response) {
          self.List();
        });
      }
    },
    List() {
      let self = this;
      axios.get("api/v1/crm-found-address").then(function(response) {
        self.list = response.data;
        self.$root.$emit("crm-foundaddressall", response.data);
      });
    },
    Selected(id) {
      this.$root.$emit("crm-foundaddressselected", id);
    },
    Update() {
      let self = this;
      axios({
        method: "patch",
        url: "api/v1/crm-found-address/id/" + self.models.id,
        data: self.models
      }).then(function(response) {
        self.List();
        self.models = { name: "" };
        self.$bvModal.hide("modal-crmfoundaddresslist");
        self.$bvModal.hide("modal-crmfoundaddressset");
        self.$bvModal.show("modal-crmfoundaddresslist");
      });
    },
    Shovedform() {
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
        }
      }, 100);
    },
    Hidecreate() {
      this.$bvModal.hide("modal-crmfoundaddresslist");
      this.$bvModal.show("modal-crmfoundaddresslist");
    },
    Create() {
      let self = this;
      axios({
        method: "post",
        url: "api/v1/crm-found-address",
        data: self.modelsnew
      }).then(function(response) {
        self.list.push(response.data);
        self.modelsnew = { name: "" };
        self.$bvModal.hide("modal-crmfoundaddress");
        self.$bvModal.show("modal-crmfoundaddresslist");
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
      return this.datas[this.select];
    }
  },
  mounted: function() {
    this.$root.$emit("crm-foundaddressone", this.modelsnew);
    this.$root.$emit("crm-foundaddressselected", this.select);
    this.List();
  }
};
</script>
<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
