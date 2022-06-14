<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h5 class="labelheader">{{ $t($route.name) }}</h5>
      </div>
      <div class="md-toolbar-section-end">
        <div class="md-collapse">
          <md-list>
            <li class="md-list-item">
              <button
                @click="Export()"
                style="padding-top:8px"
                type="button"
                class="labelheader"
              >
                <b-icon icon="cloud-download-fill"></b-icon>
              </button>
            </li>
            <li class="md-list-item">
              <a
                href="javascript:void(0)"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <span class="labelheader">{{ $store.state.locale }}</span>

                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <a href="#" @click="handleChangeLocale('uz')">Ўзбек</a>
                      </li>
                      <li>
                        <a href="#" @click="handleChangeLocale('ru')">Рус</a>
                      </li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>
            <li class="md-list-item">
              <a
                href="javascript:void(0)"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <b-icon class="labelheader" icon="person"></b-icon>

                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <router-link :to="{ path: '/login' }"
                          ><b-icon icon="arrow-bar-left"></b-icon
                          >{{ $t("Чиқиш") }}</router-link
                        >
                      </li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  data() {
    return {
      locale: this._i18n.locale,
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  },
  computed: {
    availableLanguages() {
      const { messages } = this._i18n;
      return Object.keys(messages).map(lang => {
        return {
          text: messages[lang][lang],
          value: lang
        };
      });
    }
  },
  methods: {
    Export() {
      let self = this;
      axios({
        method: "post",
        url: "api/v1/download/product",
        data: { sklad_id: parseInt(localStorage.getItem("sklad_id")) }
      }).then(function(response) {});
    },
    computeLocaleText(locale) {
      return this.$t(locale);
    },
    handleChangeLocale(locale) {
      this._i18n.locale = locale;
      this.$store.commit("SET_LOCALE", locale);
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    }
  }
};
</script>

<style lang="css"></style>
