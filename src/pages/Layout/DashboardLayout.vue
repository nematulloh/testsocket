<template>
  <div
    class="wrapper"
    :class="[
      { 'nav-open': $sidebar.showSidebar },
      { rtl: $route.meta.rtlActive }
    ]"
  >
    <side-bar
      :active-color="sidebarBackground"
      :background-image="sidebarBackgroundImage"
      :data-background-color="sidebarBackgroundColor"
    >
      <mobile-menu></mobile-menu>
      <template slot="links" v-if="$store.state.user_role=='Admin'">
        <span >
        <sidebar-item
          v-if="$route.meta.rtlActive"
          :link="{
            name: 'Бош сахифа',
            icon: 'bag-fill-fill',
            path: '/'
          }"
        />
        <sidebar-item
          v-else
          :link="{
            name: 'Бош сахифа',
            icon: 'bag-fill',
            path: '/'
          }"
        />
        <sidebar-item opened :link="{ name: 'Хужжатлар', icon: 'bag-fill' }">
          <sidebar-item
            :link="{
              name: 'Бошланғич қолдиқ',
              path: '/initial/index',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{ name: 'Кирим', path: '/kirim/index', icon: 'bag-fill' }"
          />
          <sidebar-item
            :link="{ name: 'Чиқим', path: '/chiqim/index', icon: 'bag-fill' }"
          />
          <sidebar-item
            :link="{
              name: 'Кассовий ордер',
              path: '/kassaorder/index',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{ name: 'Тўлов', path: '/oplata/index', icon: 'bag-fill' }"
          />
          <sidebar-item
            :link="{
              name: 'Возврат клиент',
              path: '/refund/index',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Возврат поставшик',
              path: '/refundsuplier/index',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Перемешения',
              path: '/transfer/index',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Перемешения касса',
              path: '/money-transfer/index',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Ревизия',
              path: '/revision/index',
              icon: 'bag-fill'
            }"
          />
        </sidebar-item>
        <sidebar-item :link="{ name: 'Хисоботлар', icon: 'bag-fill' }">
          <sidebar-item
            :link="{
              name: 'Товар хисоботи',
              path: '/xisobot/xisobot/product',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Товар сверкаси',
              path: '/xisobot/sverka/product',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Кунлик айланма',
              path: '/xisobot/xisobot/rasxod',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Харажат хисобот',
              path: '/xisobot/xisobot/xarajat',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Баланс хисобот',
              path: '/xisobot/xisobot/balance',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Фойда хисоботи',
              path: '/xisobot/xisobot/foyda',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Фойда сверкаси',
              path: '/xisobot/sverka/foyda',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Контрагент хисоботи',
              path: '/xisobot/xisobot/kontragent',
              icon: 'bag-fill'
            }"
          />
          <!-- <sidebar-item
            :link="{
              name: 'Касса хисоботи',
              path: '/xisobot/xisobot/kassa',
              icon: 'bag-fill'
            }"
          /> -->
          <sidebar-item
            :link="{
              name: 'Контрагент сверкаси',
              path: '/xisobot/sverka/kontragent',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Касса сверкаси',
              path: '/xisobot/sverka/kassa',
              icon: 'bag-fill'
            }"
          />
        </sidebar-item>
        <sidebar-item :link="{ name: 'Маьлумотлар', icon: 'bag-fill' }">
          <sidebar-item
            :link="{
              name: 'Товар',
              path: '/malumot/product/index',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Cклад',
              path: '/malumot/sklad/index',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Контрагент',
              path: '/malumot/kontragent/index',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Фойдаланувчи',
              path: '/malumot/user/index',
              icon: 'bag-fill'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Crm',
              path: '/malumot/crm-client/index',
              icon: 'bag-fill'
            }"
          />
        </sidebar-item>
      </span>
      </template>
      <template slot="links" v-if="$store.state.user_role=='SuperUser'">
        <sidebar-item
          v-if="$route.meta.rtlActive"
          :link="{
            name: 'Бош сахифа',
            icon: 'bag-fill-fill',
            path: '/'
          }"
        />
        <sidebar-item
          v-else
          :link="{
            name: 'Бош сахифа',
            icon: 'bag-fill',
            path: '/'
          }"
        />
        <sidebar-item opened :link="{ name: 'Хужжатлар', icon: 'bag-fill' }">
          <sidebar-item
            :link="{ name: 'Чиқим', path: '/chiqim/index', icon: 'bag-fill' }"
          />
        </sidebar-item>
      </template>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>
      <div :class="{ content: !$route.meta.hideContent }">
        <div
          class="alert alert-danger alert-dismissable"
          style="z-index:1200!important"
          v-if="$store.state.errors != ''"
        >
          <a
            aria-hidden="true"
            data-dismiss="alert"
            class="close"
            href="javascript:void(0)"
            @click="$store.state.errors = ''"
            >×</a
          >
          <h4><i class="icon fa fa-check"></i>Хатолик {{ Interval() }}</h4>
          {{ $store.state.errors }}
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
    document.getElementsByClassName(className)[0].scrollTop = 0;
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

function reinitScrollbar() {
  let docClasses = document.body.classList;
  let isWindows = navigator.platform.startsWith("Win");
  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    initScrollbar("sidebar");
    initScrollbar("sidebar-wrapper");
    initScrollbar("main-panel");

    docClasses.add("perfect-scrollbar-on");
  } else {
    docClasses.add("perfect-scrollbar-off");
  }
}

import TopNavbar from "./TopNavbar.vue";
import MobileMenu from "./MobileMenu.vue";
import $ from "jquery";
export default {
  components: {
    TopNavbar,
    MobileMenu
  },
  data() {
    return {
      sidebarBackgroundColor: "black",
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
      sidebarMini: true,
      sidebarImg: true,
      image: process.env.VUE_APP_BASE_URL + "/img/laravel-vue.svg"
    };
  },
  methods: {
    Interval() {
      setTimeout(() => {
        this.$store.state.errors = "";
      }, 10000);
    },
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    }
  },
  updated() {
    reinitScrollbar();
  },
  mounted() {
    reinitScrollbar();
    setTimeout(() => {
      $(".nav-link.active").focus();
    }, 1000);
    $("body").on("keydown", "a", function(e) {
      var self = $(this),
        focus = $(document.activeElement).attr("class"),
        table = self.parents(".md-list:eq(0)"),
        focusable,
        focused,
        focusable = table.find("li>a").filter(":visible");
      // past bosilsa keyingi qatorga tushish
      if (e.keyCode == 40) {
        focused = focusable.eq(focusable.index(this) + 1);
        if (focused.length) {
          focused.focus();
        } else {
          focusable.eq(0).focus();
        }
        //tepa bosilsa
      } else if (e.keyCode == 38) {
        var ind = focusable.index(this) - 1;
        focused = focusable.eq(ind);
        // tepasida bolamas qidiruvga focus berish
        if (ind < 0) {
          focusable.eq(focusable.index(this) - 1).focus();
          // tepasida bolsa shunga otish
        } else if (focused.length) {
          focused.focus();
        }
      } else if (e.keyCode == 13) {
        focused = focusable.eq(focusable.index(this));
        focused.click();
      } else if ((e.keyCode = 39)) {
        $(".content")
          .find("button")
          .eq(0)
          .focus();
      } else {
        return true;
      }
    });
  },
  watch: {
    sidebarMini() {
      this.minimizeSidebar();
    }
  }
};
</script>
<style></style>
<style lang="scss">
$scaleSize: 0.95;

@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }

  to {
    opacity: 1;
  }
}

.main-panel .zoomIn {
  animation-name: zoomIn95;
}

@keyframes zoomOut95 {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
