<template>
  <tr>
    <td class="column0">{{ index + 1 }}</td>
    <td class="column2">
      <input
        class="table-input"
        type="text"
        v-model="item.shtrix_kod"
        @change="Shtrix(index)"
      />
    </td>
    <td class="column5">
      <v-select
        :clearable="false"
        class="form-control-sm required"
        v-if="$store.state.productlist != null"
        :options="$store.state.productlist"
        :filter-by="$store.state.myFilter"
        v-model="item.product_id"
        :reduce="extra_name => extra_name.id"
        label="extra_name"
        @input="Productchange(index)"
      >
        <template #list-footer>
          <li style="text-align: center;font-weight:bold;">
            f4 {{ $t("умумий рўйхат") }}
          </li>
        </template>
        <template #open-indicator="{ attributes }">
          <span v-bind="attributes"></span>
          <button
            type="button"
            class="modallist"
            @click="Selectproduct(index)"
            v-b-modal.modal-productlist
          >
            <b-icon icon="three-dots"></b-icon>
          </button>
        </template>
        <template #selected-option="{ extra_name }">
          <div style="position: absolute">
            {{ extra_name }}
          </div>
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
              @click="
                Selectproduct(index);
                product.name = search;
              "
              v-b-modal.modal-product
            >
              +</button
            ><b>Insert</b>
          </template>
          <em style="opacity: 0.5" v-else>{{ $t("Маьлумот йўқ") }}</em>
        </template>
        <template #search="{ search, searching }">
          <template v-if="searching">
            <em
              ><b>{{ search }}</b></em
            >
            <input class="vs__search" v-bind="attributes" v-on="events" />
          </template>
        </template>
      </v-select>
    </td>
    <td class="column1">
      <input
        class="table-input"
        type="number"
        v-model="item.count"
        @change="Changecount(index)"
      />
    </td>
    <td class="column1">
      <input
        class="table-input"
        type="number"
        v-model="item.debit_price"
        @change="Changeprice(index)"
      />
    </td>
    <td class="column2">{{ item.debit_summa }}</td>
    <td class="column1">
      <input
        class="table-input"
        type="number"
        v-model="item.chakana_percent"
        @change="Changepercentchakana(index)"
      />
    </td>
    <td class="column1">
      <input
        class="table-input"
        type="number"
        v-model="item.chakana_price"
        @change="Changepricechakana(index)"
      />
    </td>
    <td class="column1">
      <input
        class="table-input"
        type="number"
        v-model="item.optom_percent"
        @change="Changepercentoptom(index)"
      />
    </td>
    <td class="column1">
      <input
        class="table-input"
        type="number"
        v-model="item.optom_price"
        @change="Changepriceoptom(index)"
        v-on:keyup.enter="Changeoptomprice(index)"
      />
    </td>
    <td class="column1">
      <a href="javascript:void(0)" class="mybtn btn" @click="Trashitem(index)">
        <b-icon icon="trash"></b-icon>
      </a>
    </td>
  </tr>
</template>

<script>
export default {
  name: "item-component",
  props: {
    index: {
      // index of current item
      type: Number
    },
    item: {
      // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default() {
        return { product_id: 1 };
      }
    }
  }
};
</script>
