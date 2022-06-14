import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Layout from "@/pages/Layout/Layout.vue";
// const Chiqimcreate = ()=> import('@/pages/Chiqim/Create.vue');
// const Bron = ()=>import('@/pages/Bron/Index.vue');
const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/",
    children: [
      {
        path: "/",
        name: "Бош сахифа",
        component: () => import("@/pages/Dashboard.vue")
      },
      {
        path: "/kirim/index",
        name: "Кирим",
        component: () => import("@/pages/Kirim/Index.vue")
      },
      {
        path: "/refund/index",
        name: "Возврат",
        component: () => import("@/pages/Refund/Index.vue")
      },
      {
        path: "/refundsuplier/index",
        name: "Возврат поставшик",
        component: () => import("@/pages/Refundsuplier/Index.vue")
      },
      {
        path: "/chiqim/index",
        name: "Чиқим",
        component: () => import("@/pages/Chiqim/Index.vue")
      },
      {
        path: "/kassaorder/index",
        name: "Кассовий ордер",
        component: () => import("@/pages/Kassaorder/Index.vue")
      },
      {
        path: "/oplata/index",
        name: "Тўлов",
        component: () => import("@/pages/Oplata/Index.vue")
      },
      {
        path: "/revision/index",
        name: "Ревизия",
        component: () => import("@/pages/Revision/Index.vue")
      },
      {
        path: "/transfer/index",
        name: "Перемешения",
        component: () => import("@/pages/Transfer/Index.vue")
      },
      {
        path: "/money-transfer/index",
        name: "Перемешения касса",
        component: () => import("@/pages/Moneytransfer/Index.vue")
      },
      {
        path: "/initial/index",
        name: "Бошланғич",
        component: () => import("@/pages/Initial/Index.vue")
      },
      {
        path: "/xisobot/sverka/kontragent",
        name: "Контрагент сверкаси",
        component: () => import("@/pages/Xisobot/Sverka/Kontragent.vue")
      },
      {
        path: "/xisobot/sverka/kassa",
        name: "Касса сверкаси",
        component: () => import("@/pages/Xisobot/Sverka/Kassa.vue")
      },
      {
        path: "/xisobot/sverka/foyda",
        name: "Фойда сверкаси",
        component: () => import("@/pages/Xisobot/Sverka/Foyda.vue")
      },
      {
        path: "/xisobot/xisobot/product",
        name: "Товар хисоботи",
        component: () => import("@/pages/Xisobot/Xisobot/Product.vue")
      },
      {
        path: "/xisobot/xisobot/rasxod",
        name: "Кунлик айланма",
        component: () => import("@/pages/Xisobot/Xisobot/Rasxod.vue")
      },
      {
        path: "/xisobot/xisobot/balance",
        name: "Баланс",
        component: () => import("@/pages/Xisobot/Xisobot/Balance.vue")
      },
      {
        path: "/xisobot/xisobot/xarajat",
        name: "Харажат хисобот",
        component: () => import("@/pages/Xisobot/Xisobot/Xarajat.vue")
      },
      {
        path: "/xisobot/xisobot/foyda",
        name: "Фойда хисоботи",
        component: () => import("@/pages/Xisobot/Xisobot/Foyda.vue")
      },
      {
        path: "/xisobot/xisobot/kontragent",
        name: "Контрагент хисоботи",
        component: () => import("@/pages/Xisobot/Xisobot/Kontragent.vue")
      },
      {
        path: "/xisobot/xisobot/kassa",
        name: "Касса хисоботи",
        component: () => import("@/pages/Xisobot/Xisobot/Kassa.vue")
      },
      {
        path: "/malumot/product/index",
        name: "Товар",
        component: () => import("@/pages/Malumot/Product/Index.vue")
      },
      {
        path: "/malumot/sklad/index",
        name: "Склад",
        component: () => import("@/pages/Malumot/Sklad/Index.vue")
      },
      {
        path: "/malumot/user/index",
        name: "Фойдаланувчи",
        component: () => import("@/pages/Malumot/User/Index.vue")
      },
      {
        path: "/malumot/kontragent/index",
        name: "Контрагент",
        component: () => import("@/pages/Malumot/Kontragent/Index.vue")
      },
      {
        path: "/malumot/crm-client/index",
        name: "Crm",
        component: () => import("@/pages/Malumot/CrmClient/Index.vue")
      },
      {
        path: "/xisobot/sverka/product",
        name: "Товар сверкаси",
        component: () => import("@/pages/Xisobot/Sverka/Product.vue")
      }
    ]
  },
  {
    path: "/login",
    component: Layout,
    redirect: "/login",
    children: [
      {
        path: "/baseurl",
        name: "Baseurl",
        component: () => import("@/pages/Baseurl.vue")
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/pages/Login.vue")
      },
      {
        path: "/directory/product/index",
        name: "Товар модал",
        // component: Product
        component: () => import("@/pages/Directory/Product/Index.vue")
      },
      {
        path: "/directory/product/create",
        name: "Товар модал create",
        component: () => import("@/pages/Directory/Product/Create.vue")
      },
      {
        path: "/directory/product/update/:id",
        name: "Товар модал update",
        component: () => import("@/pages/Directory/Product/Update.vue")
      },
      {
        path: "/initial/create",
        name: "Initial qoshish",
        component: () => import("@/pages/Initial/Create.vue")
      },
      {
        path: "/revision/create",
        name: "Revision qoshish",
        component: () => import("@/pages/Revision/Create.vue")
      },
      {
        path: "/revision/update/:id",
        name: "Ревизия ўзгартириш",
        component: () => import("@/pages/Revision/Update.vue")
      },
      {
        path: "/revision/jamlash",
        name: "Ревизия жамлаш",
        component: () => import("@/pages/Revision/Jamlash.vue")
      },
      {
        path: "/transfer/update/:id",
        name: "Перевод ўзгартириш",
        component: () => import("@/pages/Transfer/Update.vue")
      },
      {
        path: "/transfer/create",
        name: "Transfercreate",
        component: () => import("@/pages/Transfer/Create.vue")
      },
      {
        path: "/money-transfer/update/:id",
        name: "Перевод денег ўзгартириш",
        component: () => import("@/pages/Moneytransfer/Update.vue")
      },
      {
        path: "/money-transfer/create",
        name: "MoneyTransfercreate",
        component: () => import("@/pages/Moneytransfer/Create.vue")
      },
      {
        path: "/initial/update/:id",
        name: "Начальный остаток ўзгартириш",
        component: () => import("@/pages/Initial/Update.vue")
      },
      {
        path: "/chiqim/create",
        name: "Chiqim qoshish",
        component: () => import("@/pages/Chiqim/Create.vue")
      },
      // {
      //   path: "/chiqim/bronlist",
      //   name: "Chiqim qoshish",
      //   components: {
      //     default: Chiqimcreate,
      //     modals: Bron
      //   }
      // },

      {
        path: "/chiqim/update/:id",
        name: "Чиқим ўзгартириш",
        component: () => import("@/pages/Chiqim/Update.vue")
      },
      {
        path: "/chiqim/print/:id",
        name: "prints",
        component: () => import("@/pages/Chiqim/Print.vue")
      },
      {
        path: "/refund/print/:id",
        name: "printrefund",
        component: () => import("@/pages/Refund/Print.vue")
      },
      {
        path: "/refundsuplier/print/:id",
        name: "printrefundsuplier",
        component: () => import("@/pages/Refundsuplier/Print.vue")
      },
      {
        path: "/kirim/print/:id",
        name: "printprixod",
        component: () => import("@/pages/Kirim/Print.vue")
      },
      {
        path: "/kirim/barcode/:id",
        name: "barcodeprixod",
        component: () => import("@/pages/Kirim/Barcode.vue")
      },
      {
        path: "/transfer/print/:id",
        name: "printtransfer",
        component: () => import("@/pages/Transfer/Print.vue")
      },
      {
        path: "/kassaorder/create",
        name: "Kassaorder qoshish",
        component: () => import("@/pages/Kassaorder/Create.vue")
      },
      {
        path: "/kassaorder/update/:id",
        name: "Кассовий ордер ўзгартириш",
        component: () => import("@/pages/Kassaorder/Update.vue")
      },
      {
        path: "/oplata/create",
        name: "Oplata qoshish",
        component: () => import("@/pages/Oplata/Create.vue")
      },
      {
        path: "/oplata/update/:id",
        name: "Тўлов ўзгартириш",
        component: () => import("@/pages/Oplata/Update.vue")
      },
      {
        path: "/kirim/create",
        name: "Kirim qoshish",
        component: () => import("@/pages/Kirim/Create.vue")
      },

      {
        path: "/kirim/update/:id",
        name: "Кирим ўзгартириш",
        component: () => import("@/pages/Kirim/Update.vue")
      },
      {
        path: "/refund/create",
        name: "Refund qoshish",
        component: () => import("@/pages/Refund/Create.vue")
      },

      {
        path: "/refund/update/:id",
        name: "Возврат ўзгартириш",
        component: () => import("@/pages/Refund/Update.vue")
      },
      {
        path: "/refundsuplier/create",
        name: "Refund postavshik qoshish",
        component: () => import("@/pages/Refundsuplier/Create.vue")
      },

      {
        path: "/refundsuplier/update/:id",
        name: "Возврат поставщик ўзгартириш",
        component: () => import("@/pages/Refundsuplier/Update.vue")
      },
      {
        path: "/malumot/product/create",
        name: "Product qoshish",
        component: () => import("@/pages/Malumot/Product/Create.vue")
      },
      {
        path: "/malumot/product/update/:id",
        name: "Продукт ўзгартириш",
        component: () => import("@/pages/Malumot/Product/Update.vue")
      },
      {
        path: "/malumot/sklad/create",
        name: "Sklad qoshish",
        component: () => import("@/pages/Malumot/Sklad/Create.vue")
      },
      {
        path: "/malumot/sklad/update/:id",
        name: "Склад ўзгартириш",
        component: () => import("@/pages/Malumot/Sklad/Update.vue")
      },
      {
        path: "/malumot/user/create",
        name: "User qoshish",
        component: () => import("@/pages/Malumot/User/Create.vue")
      },
      {
        path: "/malumot/user/update/:id",
        name: "Узер ўзгартириш",
        component: () => import("@/pages/Malumot/User/Update.vue")
      },
      {
        path: "/malumot/kontragent/create",
        name: "Kontragent qoshish",
        component: () => import("@/pages/Malumot/Kontragent/Create.vue")
      },
      {
        path: "/malumot/kontragent/update/:id",
        name: "Контрагент ўзгартириш",
        component: () => import("@/pages/Malumot/Kontragent/Update.vue")
      },
      {
        path: "/malumot/crm-client/create",
        name: "CrmClient qoshish",
        component: () => import("@/pages/Malumot/CrmClient/Create.vue")
      },
      {
        path: "/malumot/crm-client/update/:id",
        name: "Crm client ўзгартириш",
        component: () => import("@/pages/Malumot/CrmClient/Update.vue")
      }
    ]
  }
];
export default routes;
