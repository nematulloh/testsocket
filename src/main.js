import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import routes from "./routes/routes";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "active"
});

// import VueRx from 'vue-rx';
// import { Observable } from "rxjs/Observable";
// Vue.use(VueRx,{Observable});

import "./assets/global.css";
import "./assets/main.css";

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import VueSession from "vue-session";
Vue.use(VueSession);

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts)

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("v-select", vSelect);

import Vuex from "vuex";
Vue.use(Vuex);
import { store } from "./store";

// import Autocomplete from 'v-autocomplete'
// import 'v-autocomplete/dist/v-autocomplete.css'
// Vue.use(Autocomplete)

import { BootstrapVue, componentsPlugin, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import i18n from "./i18n";
Vue.use(VueSidebarMenu);
Vue.prototype.$Chartist = Chartist;
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
import VueTouchKeyboard from "vue-touch-keyboard";
import "vue-touch-keyboard/dist/vue-touch-keyboard.css"; // load default style
Vue.use(VueTouchKeyboard);
Vue.filter("numFormat", function(value) {
  return new Intl.NumberFormat("ru-RU", {
    style: "decimal",
    minimumFractionDigits: 2
  }).format(value);
});
Vue.filter("numFormat0", function(value) {
  return new Intl.NumberFormat("ru-RU", {
    style: "decimal",
    minimumFractionDigits: 0
  }).format(value);
});

// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);
window.axios = require("axios");
window.axios.defaults.baseURL = "http://localhost:3000/";
window.axios.interceptors.request.use(req => {
  req.headers.authorization = "Bearer " + localStorage.getItem("token");
  req.headers.contentType = "application/json";
  return req;
});
window.axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status == 401) {
      store.state.errors = error.response.data.message;
      // localStorage.removeItem("user_id");
      // localStorage.removeItem("sklad_id");
      // localStorage.removeItem("token");
      router.push("/login");
    } else if (error.response.status == 400) {
      if (error.response.data.errors[0].msg) {
        store.state.errors = error.response.data.errors[0].msg;
      } else {
        store.state.errors =
          error.response.data.errors[0].row +
          " қатор " +
          error.response.data.errors[0].column +
          "ни тўлдиринг";
      }
    } else if (error.response.status == 404) {
      if (window.axios.defaults.baseURL == undefined) {
        router.push("/baseurl");
      } else {
        store.state.errors ='Сахифа топилмади';
      }
    } else {
      store.state.errors = error.response.data.message;
    }
    return Promise.reject(error);
  }
);
new Vue({
  el: "#app",
  render: h => h(App),
  store,
  i18n,
  router
});
