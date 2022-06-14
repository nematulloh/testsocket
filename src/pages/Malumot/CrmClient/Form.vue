<template>
  <form>
    <md-card>
      <div style="float:right;margin-top:-27px;">
        <button type="button" class="mybtn btn saved" @click="Savedokument()">
          {{ $t("Сақлаш ва беркитиш") }} <sup>F9</sup>
        </button>
        <router-link
          class="mybtn btn"
          :to="{ path: '/malumot/crm-client/index' }"
          >{{ $t("Чиқиш") }}<sup>esc</sup></router-link
        >
      </div>
      <md-card-content>
        <div class="md-layout">
          <form>
            <div class="row">
              <div class="col-md-4">
                <label>{{ $t("Исм") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  ref="focused"
                  v-model="datas.first_name"
                  type="text"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("Фамилия") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.last_name"
                  type="text"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("Отасининг исми") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.middle_name"
                  type="text"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("Телефон") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.phone_number"
                  type="text"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("Иш фаолияти") }}</label>
              </div>
              <div class="col-md-8">
                <v-select
                  :clearable="false"
                  class="md-input"
                  :options="worklist"
                  v-model="datas.work_id"
                  :reduce="name => name.id"
                  label="name"
                >
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      v-bind="attributes"
                      v-on="events"
                    />
                    <button
                      type="button"
                      class="modallist"
                      v-b-modal.modal-crmworklist
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
                        class="pluss"
                        @click="work.name = search"
                        v-b-modal.modal-crmwork
                      >
                        +
                      </button>
                      <b>insert</b>
                    </template>
                    <em style="opacity: 0.5;" v-else>{{
                      $t("Маьлумот йўқ")
                    }}</em>
                  </template>
                </v-select>
              </div>
              <div class="col-md-4">
                <label>{{ $t("Иш жойи қаерда жойлашган") }}</label>
              </div>
              <div class="col-md-8">
                <v-select
                  :clearable="false"
                  class="md-input"
                  :options="workaddreslist"
                  v-model="datas.work_address_id"
                  :reduce="name => name.id"
                  label="name"
                >
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      v-bind="attributes"
                      v-on="events"
                    />
                    <button
                      type="button"
                      class="modallist"
                      v-b-modal.modal-crmworkaddreslist
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
                        class="pluss"
                        @click="workaddres.name = search"
                        v-b-modal.modal-crmworkaddres
                      >
                        +
                      </button>
                      <b>insert</b>
                    </template>
                    <em style="opacity: 0.5;" v-else>{{
                      $t("Маьлумот йўқ")
                    }}</em>
                  </template>
                </v-select>
              </div>
              <div class="col-md-4">
                <label>{{ $t("Бизни қаердан топган") }}</label>
              </div>
              <div class="col-md-8">
                <v-select
                  :clearable="false"
                  class="md-input"
                  :options="foundaddresslist"
                  v-model="datas.found_address_id"
                  :reduce="name => name.id"
                  label="name"
                >
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      v-bind="attributes"
                      v-on="events"
                    />
                    <button
                      type="button"
                      class="modallist"
                      v-b-modal.modal-crmfoundaddresslist
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
                        class="pluss"
                        @click="foundaddress.name = search"
                        v-b-modal.modal-crmfoundaddress
                      >
                        +
                      </button>
                      <b>insert</b>
                    </template>
                    <em style="opacity: 0.5;" v-else>{{
                      $t("Маьлумот йўқ")
                    }}</em>
                  </template>
                </v-select>
              </div>
              <div class="col-md-4">
                <label>{{ $t("Мурожаат вақти") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.found_datetime"
                  type="date"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("Охирги гаплашилган вақт") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.last_datetime"
                  type="date"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("Алоқага чиқиш вақти") }}</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.contact_datetime"
                  type="date"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("Сотиб олиш эхтимоли") }}(%)</label>
              </div>
              <div class="col-md-8">
                <input
                  class="form-control"
                  v-model="datas.probability"
                  type="number"
                />
              </div>
              <div class="col-md-4">
                <label>{{ $t("Статус") }}</label>
              </div>
              <div class="col-md-8">
                <v-select
                  :clearable="false"
                  class="md-input"
                  :options="statuslist"
                  v-model="datas.status_id"
                  :reduce="name => name.id"
                  label="name"
                >
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      v-bind="attributes"
                      v-on="events"
                    />
                    <button
                      type="button"
                      class="modallist"
                      v-b-modal.modal-crmstatuslist
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
                        class="pluss"
                        @click="status.name = search"
                        v-b-modal.modal-crmstatus
                      >
                        +
                      </button>
                      <b>insert</b>
                    </template>
                    <em style="opacity: 0.5;" v-else>{{
                      $t("Маьлумот йўқ")
                    }}</em>
                  </template>
                </v-select>
              </div>
              <div class="col-md-4">
                <label>{{ $t("Комментарий") }}</label>
              </div>
              <div class="col-md-8">
                <textarea
                  class="form-control"
                  v-model="datas.comment"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </md-card-content>
    </md-card>
    <work :datas="datas"></work>
    <workaddres :datas="datas"></workaddres>
    <foundaddress :datas="datas"></foundaddress>
    <status :datas="datas"></status>
  </form>
</template>
<script>
import Work from "../../Directory/Work.vue";
import Workaddres from "../../Directory/Workaddres.vue";
import Foundaddress from "../../Directory/Foundaddress.vue";
import Status from "../../Directory/Status.vue";
import $ from "jquery";
export default {
  name: "Crm-ClientForm",
  components: { Work, Workaddres, Foundaddress, Status },
  data() {
    return {
      worklist: [],
      work: "",
      workaddreslist: [],
      workaddres: "",
      foundaddresslist: [],
      foundaddress: "",
      statuslist: [],
      status: ""
    };
  },
  props: ["datas"],
  created() {
    let self = this;
    self.$root.$refs.crmclient = self;
    self.$root.$on("crm-workone", function(getdata) {
      self.work = getdata;
    });
    self.$root.$on("crm-workall", function(getdata) {
      self.worklist = getdata;
    });
    self.$root.$on("crm-workaddresone", function(getdata) {
      self.workaddres = getdata;
    });
    self.$root.$on("crm-workaddresall", function(getdata) {
      self.workaddreslist = getdata;
    });
    self.$root.$on("crm-foundaddressone", function(getdata) {
      self.foundaddress = getdata;
    });
    self.$root.$on("crm-foundaddressall", function(getdata) {
      self.foundaddresslist = getdata;
    });
    self.$root.$on("crm-statusone", function(getdata) {
      self.status = getdata;
    });
    self.$root.$on("crm-statusall", function(getdata) {
      self.statuslist = getdata;
    });
  },
  mounted: function() {
    this.Focus();
  },
  methods: {
    Focus() {
      this.$refs.focused.focus();
    },
    Savedokument() {
      let self = this;
      self.datas.found_datetime = new Date(self.datas.found_datetime)
        .valueOf()
        .toString()
        .slice(0, 10);
      self.datas.last_datetime = new Date(self.datas.last_datetime)
        .valueOf()
        .toString()
        .slice(0, 10);
      self.datas.contact_datetime = new Date(self.datas.contact_datetime)
        .valueOf()
        .toString()
        .slice(0, 10);

      if (this.$route.path == "/malumot/crm-client/create") {
        var methods = "post";
        var action = "api/v1/crm-client";
      } else {
        var methods = "patch";
        var action = "api/v1/crm-client/id/" + self.$route.params.id;
      }
      axios({
        method: methods,
        url: action,
        data: self.datas
      }).then(function(response) {
        self.$store.state.saved = 1;
        self.$router.push({ name: "Crm" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
