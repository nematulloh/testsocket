import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);
import { store } from "@/store";
import ru from "@/src/ru.json";
import uz from "@/src/uz.json";
const translation = {
  ru: ru,
  uz: uz
};
const i18n = new VueI18n({
  locale: store.state.locale, // set locale
  // fallbackLocale:store.getters.getLocale,
  messages: translation // set locale messages
});

export default i18n;
