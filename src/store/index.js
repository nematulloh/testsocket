import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";
import VueCookie from "vue-cookie";
Vue.use(Vuex);
export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      getState: key => Cookies.getJSON(key),
      setState: (key, state) =>
        Cookies.set(key, state, { expires: 3, secure: true })
    })
  ],
  state: {
    locale: "uz",
    selected_product: 0,
    selected_index: null,
    changed: null,
    productlist: null,
    prostatka: null,
    saved: false,
    loading: false,
    countindex: 15,
    user_role:localStorage.getItem('user_role'),
    totatheight: 550,
    myFilter: (option, label, search) => {
      if (search.length > 2) {
        let temp = search.toLowerCase();
        let ss = option.id.toString();
        return (
          option.extra_name.toLowerCase().indexOf(temp) > -1 ||
          ss.indexOf(temp) > -1
        );
      } else {
        return option;
      }
    },
    errors: "",
    token: ""
  },

  mutations: {
    SET_LOCALE(state, locale) {
      state.locale = locale;
    },
    SET_PRODUCT(state, productlist) {
      state.productlist = productlist;
    }
  },

  actions: {
    inrementAction({ commit }, payload) {
      commit("incrementCounter", payload);
    },
    Productlist({ commit, getters }) {
      axios.get("api/v1/product/extra-name").then(response => {
        let productlist = response.data;
        console.log(response.data);
        commit("SET_PRODUCT", productlist);
      });
    }
  },

  getters: {
    getLocale: state => state.locale,
    getProduct: state => state.productlist
  }
});
