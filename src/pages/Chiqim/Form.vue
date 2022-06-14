<template>
  <form>
    <div class="headerhref">
      <b class="watch">{{ time }}</b>
      <div class="mylayouts">
        <label>Склад</label>
        <v-select :clearable="false" class="form-control-sm required md-input" :options="skladlist"
          v-model="datas.sklad_id" :reduce="name => name.id" label="name" @input="Productlistfolder(datas.sklad_id)">
          <template #search="{attributes, events}">
            <input class="vs__search" v-bind="attributes" v-on="events" />
          </template>
          <template #selected-option="{ name }">
            {{ name }}
          </template>
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              <em><b>{{ search }}</b></em>{{ $t("бўйича маьлумот йўқ") }}
            </template>
            <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
          </template>
        </v-select>
      </div>
      <div class="mylayouts">
        <label>Клиент</label>
        <v-select :clearable="false" class="form-control-sm required md-input" :options="kontragentlist"
          v-model="datas.kontragent_id" :reduce="name => name.id" label="name">
          <template #search="{attributes, events}">
            <input class="vs__search" v-bind="attributes" v-on="events" />
            <button type="button" class="modallist" v-b-modal.modal-kontragentlist>
              <b-icon icon="three-dots"></b-icon>
            </button>
          </template>
          <template #list-footer>
            <li style="text-align: center;font-weight:bold;">
              f4 {{ $t("умумий рўйхат") }}
            </li>
          </template>
          <template #selected-option="{ name }">
            <div style="position:absolute;">
              {{ name }}
            </div>
          </template>
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              <em><b>{{ search }}</b></em>
              {{ $t("бўйича маьлумот йўқ") }}
              <button type="button" class="pluss" @click="kontragent.name = search" v-b-modal.modal-kontragent>
                +
              </button>
              <b>insert</b>
            </template>
            <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
          </template>
        </v-select>
      </div>
      <div class="mylayouts">
        <label>{{ $t("Нарх тури") }}</label>
        <v-select :clearable="false" class="form-control-sm required md-input" :options="pricetypelist"
          v-model="datas.price_type" :reduce="name => name.id" label="name" @input="ChangePricetype()"></v-select>
      </div>
      <div class="mylayouts">
        <label>Сумма</label>
        {{ datas.summa | numFormat }}
      </div>
      <div class="mylayouts">
        <label>Комментарий</label>
        <textarea v-model="datas.comment" rows="1"></textarea>
      </div>
      <div class="mylayouts">
        <label>Штрих</label>
        <input type="text" class="table-input" id="shtrix" v-model="newitem.shtrix_kod" />
      </div>
      <md-switch @change="Sensorchange()" v-model="touch">Сенсор</md-switch>
      <h3 style="color: #3f51b5;">
        <span v-if="datas.id">№ {{ datas.id }}</span>
      </h3>
    </div>
    <div class="row">
      <div class="col-md-5" v-if="touch == false">
        <div class="bodyrow">
          <md-card>
            <md-card-content>
              <input type="text" id="f10" class="form-control searchtable" v-bind:placeholder="$t('Қидирув') + '(F10)'"
                v-model="filter" ref="focused" data-layout="numeric" />
              <table class="table table-bordered left">
                <thead>
                  <tr>
                    <th class="column1">№</th>
                    <th>{{ $t("Номи") }}</th>
                    <th class="column2">Қолдиқ</th>
                    <th class="column3">{{ $t("Чакана") }} нарх</th>
                    <th class="column3">Оптом нарх</th>
                  </tr>
                </thead>
                <tbody>
                  <VueAutoVirtualScrollList :totalHeight="600" :defaultHeight="25" class="virtual"
                    style="width: 100%;height: 64vh!important;">
                    <tr :style="{ height: `${index / 1000 + 10}px` }" v-for="(item, index) in filteredProduct"
                      :key="index" @click="
                        newitem.product_id = item.id;
                        Ostatkanew(item);
                      ">
                      <td class="column1">{{ index + 1 }}</td>
                      <td>
                        <button type="button" class="atable">
                          {{ item.extra_name }}
                        </button>
                      </td>
                      <td class="column2">
                        <button type="button" class="noborder">
                          {{ item.balance | numFormat }}
                        </button>
                      </td>
                      <td class="column3">
                        <button type="button" class="noborder" v-if="item.price_register[0]">
                          {{ item.price_register[0].chakana_price | numFormat }}
                        </button>
                      </td>
                      <td class="column3">
                        <button type="button" class="noborder" v-if="item.price_register[0]">
                          {{ item.price_register[0].optom_price | numFormat }}
                        </button>
                      </td>
                    </tr>
                  </VueAutoVirtualScrollList>
                </tbody>
              </table>
            </md-card-content>
          </md-card>
        </div>
      </div>
      <div :class="touch == true ? 'col-md-9' : 'col-md-7'">
        <div class="bodyrow">
          <md-card>
            <md-card-content>
              <table class="table table-bordered right">
                <thead>
                  <tr>
                    <th class="column1">№</th>
                    <th class="column4">Штрих</th>
                    <th>Товар</th>
                    <th class="column1-5">{{ $t("Кол.") }}</th>
                    <th class="column1-5">{{ $t("Қолдиқ") }}</th>
                    <th class="column2">{{ $t("Нарх") }}</th>
                    <th class="column2">Сумма</th>
                  </tr>
                </thead>
                <tbody style="overflow: hidden;">
                  <div style="overflow-y: scroll;overflow-x: hidden; height: 61vh !important; width: 100%;">
                    <tr v-for="(item, index) in datas.rasxod_table"  :key="index" @click="ChangeIndex(index)">
                      <td class="column1" :style="[itemindex == index ? { background: '#baaaaa' } : {}]">
                        <a href="javascript:void(0)" class="savdolist">
                          {{ index + 1 }}
                        </a>
                      </td>
                      <td class="column4" :style="[itemindex == index ? { background: '#baaaaa' } : {}]">
                        <a href="javascript:void(0)" class="savdolist">
                          {{ item.shtrix_kod }}
                        </a>
                      </td>
                      <td :style="[itemindex == index ? { background: '#baaaaa' } : {}]">
                        <a href="javascript:void(0)" class="savdolist">
                          {{ Label(item.product_id) }}
                        </a>
                      </td>
                      <td :style="[itemindex == index ? { background: '#baaaaa' } : {}]" class="column1-5">
                        <a href="javascript:void(0)" class="savdolist">
                          {{ item.count | numFormat }}
                        </a>
                      </td>
                      <td :style="[itemindex == index ? { background: '#baaaaa' } : {}]" class="column1-5">
                        <a href="javascript:void(0)" class="savdolist">
                          {{ item.current_balance | numFormat }}
                        </a>
                      </td>
                      <td :style="[itemindex == index ? { background: '#baaaaa' } : {}]" class="column2">
                        <a href="javascript:void(0)" class="savdolist">
                          {{ item.price | numFormat }}
                        </a>
                      </td>
                      <td :style="[itemindex == index ? { background: '#baaaaa' } : {}]" class="kol column2">
                        <a href="javascript:void(0)" class="savdolist">
                          {{ item.summa | numFormat }}
                        </a>
                      </td>
                    </tr>
                  </div>
                </tbody>
              </table>
            </md-card-content>
          </md-card>
        </div>
      </div>
      <div class="col-md-3" v-if="touch == true">
        <button class="btn mybtn" style="width: 100%!important;" id="tovar" type="button" v-b-modal.modal-tovarlistnew>
          <b-icon icon="search"></b-icon>Товар<sup>F3</sup>
        </button>
        <input type="text" class="form-control" style="margin:5px 0;" v-model="sensors" id="sensors" @focus="show1" />
        <span class="keyboardglobal">
          <vue-touch-keyboard :options="options" :layout="layout" :cancel="hide" :accept="accept" :input="input" />
        </span>
        <b-modal id="modal-tovarlistnew" hide-footer @shown="Shoved1" size="lg" style="float: right!important;"
          @hidden="Hide()">
          <md-card>
            <md-card-content>
              <input type="text" @focus="showtext" class="form-control searchtable" v-bind:placeholder="$t('Қидирув')"
                v-model="filter" id="inputtext" data-layout="normal" />
              <table class="table table-bordered left">
                <thead>
                  <tr>
                    <th class="column1">№</th>
                    <th>{{ $t("Номи") }}</th>
                    <th class="column2">Қолдиқ</th>
                    <th class="column3">{{ $t("Чакана") }} нарх</th>
                    <th class="column3">Оптом нарх</th>
                  </tr>
                </thead>
                <tbody style="overflow: hidden;height: 44vh!important;">
                  <VueAutoVirtualScrollList :totalHeight="500" :defaultHeight="25" class="virtual"
                    style="width: 100%;height: 44vh!important;">
                    <tr :style="{ height: `${index / 1000 + 10}px` }" v-for="(item, index) in filteredProduct"
                      :key="index">
                      <td class="column1">{{ index + 1 }}</td>
                      <td>
                        <button type="button" class="atable" @click="
                            newitem.product_id = item.id;
                            Ostatkanew(item);
                            $bvModal.hide('modal-tovarlistnew');
                          ">
                          {{ item.extra_name }}
                        </button>
                      </td>
                      <td class="column2">
                        <button type="button" class="noborder" @click="
                            newitem.product_id = item.id;
                            Ostatkanew(item);
                            $bvModal.hide('modal-tovarlistnew');
                          ">
                          {{ item.balance | numFormat }}
                        </button>
                      </td>
                      <td class="column3">
                        <button type="button" class="noborder" @click="
                            newitem.product_id = item.id;
                            Ostatkanew(item);
                            $bvModal.hide('modal-tovarlistnew');
                          " v-if="item.price_register[0]">
                          {{ item.price_register[0].chakana_price | numFormat }}
                        </button>
                      </td>
                      <td class="column3">
                        <button type="button" class="noborder" @click="
                            newitem.product_id = item.id;
                            Ostatkanew(item);
                            $bvModal.hide('modal-tovarlistnew');
                          " v-if="item.price_register[0]">
                          {{ item.price_register[0].optom_price | numFormat }}
                        </button>
                      </td>
                    </tr>
                  </VueAutoVirtualScrollList>
                </tbody>
              </table>
              <vue-touch-keyboard :options="options" :layout="layout1" :cancel="hide" :accept="accept"
                :input="inputtext" />
            </md-card-content>
          </md-card>
        </b-modal>
        <div class="row">
          <div class="mycol-50">
            <button type="button" class="btn touchbutton" @click="Multiplication()">
              X
            </button>
          </div>
          <div class="mycol-50">
            <button type="button" class="btn touchbutton" @click="Kod()">
              <b-icon icon="search"></b-icon>Код
            </button>
          </div>
          <div class="mycol-50">
            <button type="button" class="btn touchbutton" @click="Shtrixsearch()">
              <b-icon icon="search"></b-icon>Штрих
            </button>
          </div>
          <div class="mycol-50">
            <button type="button" class="btn touchbutton" @click="Narxsearch()">
              <b-icon icon="search"></b-icon>{{ $t("Нарх") }}
            </button>
          </div>
          <!-- <div class="mycol-50">
            <button type="button" class="btn touchbutton" @click="Up()">
              <b-icon icon="arrow-up-square"></b-icon>
            </button>
          </div>
          <div class="mycol-50">
            <button type="button" class="btn touchbutton" @click="Down">
              <b-icon icon="arrow-down-square"></b-icon>
            </button>
          </div> -->
        </div>
      </div>
      <div class="col-md-12 buttom">
        <b-spinner smal v-if="sending"></b-spinner>
        <router-link style="padding: 5px!important;background-color: red!important;" :disabled="sending"
          class="mybtn btn" :to="{ path: '/chiqim/index' }">
          {{ $t("Чиқиш") }}<sup>esc</sup>
        </router-link>
        <router-link class="mybtn btn" style="background-color: blue!important;" :to="{ path: '/chiqim/index' }"
          target="_blank">
          <b-icon icon="card-list"></b-icon> Чек архив
        </router-link>
        <a href="https://t.me/xoshimov_nematulloh" style="background-color: blue!important;" target="_blank"
          class="btn mybtn">
          <b-icon icon="patch-question-fill"></b-icon>
        </a>
        <router-link class="mybtn btn" style="background-color: blue!important;" :to="{ path: '/refund/index' }"
          target="_blank">
          <b-icon icon="cart-x-fill"></b-icon> {{ $t("Возврат") }}
        </router-link>
        <router-link class="mybtn btn" style="background-color: blue!important;" :to="{ path: '/oplata/index' }"
          target="_blank">
          <b-icon icon="credit-card2-back"></b-icon> {{ $t("Тўловлар") }}
        </router-link>
        <!-- <button type="button" class="btn mybtn addrow" @click="Addtable()">
          {{ $t("Қўшиш") }}<sup>F1</sup>
        </button> -->
        <button class="btn mybtn" style="background-color: green!important;" id="f12" type="button" v-b-modal.modal-pay>
          <b-icon icon="cash"></b-icon>{{ $t("Тўлов") }}<sup>F12</sup>
        </button>
        <button type="button" style="width:62px" id="plus" class="btn touchbutton" @click="Plus(itemindex)">
          <b-icon icon="plus"></b-icon><sup>+</sup>
        </button>
        <button type="button" style="width:62px" id="minus" class="btn touchbutton" @click="Minus(itemindex)">
          -<sup>-</sup>
        </button>
        <button type="button" style="width:62px" id="del" class="btn touchbutton" @click="Trashitem(itemindex)">
          <b-icon icon="trash"></b-icon><sup>del</sup>
        </button>
        <button v-if="$route.path == '/chiqim/create'" type="button" style="width:62px" id="expection" class="btn touchbutton" @click="Expectation()">
          <b-icon icon="arrow-down-square"></b-icon>
        </button>
        <button v-if="$route.path == '/chiqim/create'" type="button" style="width:62px" class="btn touchbutton" v-b-modal.modal-bronlist>
          <b-icon icon="arrow-up-square"></b-icon>
        </button>
      </div>
    </div>
    <b-modal id="modal-pay" hide-footer size="l" @shown="Shoved" @hidden="Hide()">
      <form>
        <div class="row">
          <div class="col-md-4">
            <label>Сумма</label>
          </div>
          <div class="col-md-8">
            {{ datas.summa | numFormat }}
          </div>
          <div class="col-md-4">
            <label>Скидка</label>
          </div>
          <div class="col-md-8">
            <input type="text" v-model="datas.skidka_summa" @focus="show" @input="F5" ref="inputText2"
              class="form-control" />
          </div>
          <div class="col-md-4">
            <label @click="F5button()">{{ $t("Нахд") }}<sup>F5</sup></label>
          </div>
          <div class="col-md-8">
            <input type="text" v-model="datas.cash_summa" @focus="show" @input="F6" class="form-control" id="naxd" />
          </div>
          <div class="col-md-4">
            <label @click="F6button()">Пластик<sup>F6</sup></label>
          </div>
          <div class="col-md-8">
            <input type="text" v-model="datas.plastic_summa" @focus="show" @input="F5()" class="form-control"
              id="plastik" />
          </div>
          <div class="col-md-12">
            <button class="btn mybtn saved" style="background-color:green!important" :disabled="sending" id="f9"
              type="button" @click="Savedokument('saqlash')">
              <b-icon icon="x-square"></b-icon>{{ $t("Тўлов") }}({{
              $t("Чексиз")
              }})<sup>F9</sup>
            </button>
            <button class="btn mybtn" id="chek" :disabled="sending" type="button" @click="Savedokument('print')">
              <b-icon icon="printer"></b-icon>Чек<sup>F7</sup>
            </button>
            <vue-touch-keyboard :options="options" :layout="layout" :cancel="hide" :accept="accept" :input="input1" />
          </div>
        </div>
      </form>
    </b-modal>
    <!-- <b-modal id="modal-new" hide-footer size="xl" @shown="Shoved" @hidden="Hide()">
      <form>
        <h4>{{ newitem.product_name }}</h4>
        <div class="row">
          <div class="col-md-4">
            <label for="">{{ $t("Cони") }}</label>
          </div>
          <div class="col-md-8">
            <input class="form-control" ref="inputText2" type="number" v-model="newitem.count"
              @change="newitem.summa = newitem.price * newitem.count" :style="
                newitem.count > newitem.current_balance ? 'color:red' : 'black'
              " />
          </div>
          <div class="col-md-4">
            <label for="">{{ $t("Қолдиқ") }}</label>
          </div>
          <div class="col-md-8">
            <input type="text" class="form-control needt" readonly v-model="newitem.current_balance" />
          </div>
          <div class="col-md-4">
            <label for="">{{ $t("Нарх") }}</label>
          </div>
          <div class="col-md-8">
            <input :style="newitem.price < newitem.tan_narx ? 'color:red' : 'black'" class="form-control" type="number"
              v-model="newitem.price" @change="newitem.summa = newitem.price * newitem.count" />
          </div>
          <div class="col-md-4">
            <label for="">Сумма</label>
          </div>
          <div class="col-md-8">
            <input readonly class="form-control needt" type="number" v-model="newitem.summa" />
          </div>
          <div class="col-md-12">
            <button type="button" class="btn btn-primary" @click="Create()">
              Сақлаш
            </button>
          </div>
        </div>
      </form>
    </b-modal> -->
    <b-modal id="modal-shtrixnew" title="Товар" hide-footer size="xl" @shown="Shoved" @hidden="Hide()">
      <div class="row">
        <input type="text" v-if="touch==false" class="form-control searchtable" v-bind:placeholder="$t('Қидирув')" v-model="filter1" ref="inputText2" />
        <table class="table table-bordered">
          <thead>
            <tr>
              <!-- <th>№</th> -->
              <th>{{ $t("Номи") }}</th>
              <th>Қолдиқ</th>
              <th>{{ $t("Чакана") }} {{ $t("Нарх") }}</th>
              <th>{{ $t("Улгуржи") }} {{ $t("Нарх") }}</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in filteredShtrix" :key="index">
            <tr @click="newitem.product_id = item.product_id;$bvModal.hide('modal-shtrixnew');Ostatkanew(item);">
              <!-- <td>{{ index + 1 }}</td> -->
              <td>
                <button type="button" class="atable">
                  {{ item.extra_name }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder">
                  {{ item.balance }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder" v-if="item.price_register[0]">
                  {{ item.price_register[0].chakana_price }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder" v-if="item.price_register[0]">
                  {{ item.price_register[0].optom_price }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-modal>
    <b-modal id="modal-shtrix" title="Товар" hide-footer size="xl" @shown="Shoved" @hidden="Hide()">
      <div class="row">
        <input type="text" class="form-control searchtable" v-bind:placeholder="$t('Қидирув')" v-model="filter1"
          ref="inputText2" />
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>№</th>
              <th>{{ $t("Номи") }}</th>
              <th>{{ $t("Қолдиқ") }}</th>
              <th>{{ $t("Чакана") }} {{ $t("Нарх") }}</th>
              <th>{{ $t("Улгуржи") }} {{ $t("Нарх") }}</th>
              <th>Штрих</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in filteredShtrix" :key="index">
            <tr @click="datas.rasxod_table[settedindex].product_id =item.product_id;$bvModal.hide('modal-shtrix');Ostatka(settedindex);">
              <td>{{ index + 1 }}</td>
              <td>
                <button type="button" class="atable">
                  {{ item.extra_name }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder">
                  {{ item.balance }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder" v-if="item.price_register[0]">
                  {{ item.price_register[0].chakana_price }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder" v-if="item.price_register[0]">
                  {{ item.price_register[0].optom_price }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder" v-if="item.shtrix_table[0]">
                  {{ item.shtrix_table[0].shtrix_kod }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-modal>
  </form>
</template>

<script>
  import { print } from "../../components/mixins/print.js";
  import * as htmlToImage from "html-to-image";
  import VueAutoVirtualScrollList from "vue-auto-virtual-scroll-list";
  import $ from "jquery";
  export default {
    name: "ChiqimForm",
    components: { VueAutoVirtualScrollList },
    mixins: [print],
    data() {
      return {
        visible: false,
        layout1: {
          _meta: {
            "tab": { key: "\t", text: "Tab", width: 60, classes: "control" },
            "shiftl": { keySet: "shifted", text: "Shift", width: 100, classes: "control" },
            "shiftr": { keySet: "shifted", text: "Shift", width: 100, classes: "control" },
            "shiftlru": { keySet: "shifted_ru", text: "Shift", width: 100, classes: "control" },
            "shiftrru": { keySet: "shifted_ru", text: "Shift", width: 100, classes: "control" },
            "ru": { keySet: "default_ru", text: "ru", width: 40, classes: "control featured" },
            "eng": { keySet: "default", text: "eng", width: 40, classes: "control featured" },
            "caps": { keySet: "capsed", text: "Caps lock", width: 80, classes: "control" },
            "capsru": { keySet: "capsed_ru", text: "Caps lock", width: 80, classes: "control" },
            "space": { key: " ", text: "Space", width: 180 },
            "enter": { key: "\r\n", text: "Enter", width: 80, classes: "control" },
            "enter": { func: "enter", key: "\r\n", text: "Enter", width: 80, classes: "control" },
            "backspace": { func: "backspace", classes: "control backspace", width: 65 },
            "accept": { func: "accept", text: "Close", classes: "control featured" },
            "next": { func: "next", text: "Next", classes: "control featured" }
          },

          default: [
            "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
            "{tab} q w e r t y u i o p [ ] \\",
            "{caps} a s d f g h j k l ; ' {enter}",
            "{shiftl} z x c v b n m , . / {shiftr}",
            "{ru} {space} "
          ],
          shifted: [
            "~ ! @ # $ % ^ & * ( ) _ + {backspace}",
            "{tab} Q W E R T Y U I O P { } |",
            "{caps} A S D F G H J K L : \" {enter}",
            "{shiftl} Z X C V B N M < > ? {shiftr}",
            "{ru} {space} "
          ],
          capsed: [
            "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
            "{tab} Q W E R T Y U I O P [ ] \\",
            "{caps} A S D F G H J K L ; ' {enter}",
            "{shiftl} Z X C V B N M , . / {shiftr}",
            "{ru} {space} "
          ],
          shifted_ru: [
            "Ё ! \" № ; % : ? * ( ) _ + {backspace}",
            "{tab} Й Ц У К Е Н Г Ш Щ З Х Ъ |",
            "{capsru} Ф Ы В А П Р О Л Д Ж Э {enter}",
            "{shiftlru} Я Ч С М И Т Ь Б Ю , {shiftrru}",
            "{eng} {space} "
          ],
          default_ru: [
            "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
            "{tab} й ц у к е н г ш щ з х ъ \\",
            "{capsru} ф ы в а п р о л д ж э {enter}",
            "{shiftlru} я ч с м и т ь б ю . {shiftrru}",
            "{eng} {space} "
          ],
          capsed_ru: [
            "Ё 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
            "{tab} Й Ц У К Е Н Г Ш Щ З Х Ъ \\",
            "{capsru} Ф Ы В А П Р О Л Д Ж Э {enter}",
            "{shiftlru} Я Ч С М И Т Ь Б Ю . {shiftrru}",
            "{eng} {space} "
          ]
        },
        layout: {
          _meta: {
            backspace: { func: "backspace", classes: "control" }
          },

          default: ["1 2 3", "4 5 6", "7 8 9", "0 00 {backspace}"]
        },
        input: $("#sensors").target,
        inputtext: $("#inputtext").target,
        input1: null,
        itemindex: 0,
        keyboard: "",
        time: 0,
        options: {
          useKbEvents: false,
          preventClickEvent: true
        },
        sending: false,
        dataall: [],
        touch: true,
        sensors: "",
        kontragent: "",
        product_id: null,
        filter: "",
        filter1: "",
        focusout: "",
        shtrixlist: [],
        search2: "",
        newitem: {
          product_id: 0,
          count: 1,
          price: 0,
          summa: 0,
          shtrix_kod: "",
          product_name: ""
        },
        pricetypelist: [
          { id: "optom", name: "Оптом" },
          { id: "chakana", name: "Чакана" }
        ],
        settedindex: null,
        kontragentlist: [],
        skladlist: [],
        regionlist: [],
        productlistfolder: []
      };
    },
    computed: {
      filteredProduct() {
        return this.productlistfolder
          .filter(row => {
            const name = row.extra_name.toString().toLowerCase();
            const searchTerm = this.filter.toLowerCase();
            return name.includes(searchTerm);
          })
          .slice(0, 200);
      },
      paginated2() {
        let self = this;
        let search = self.search2;
        if (search.length > 2) {
          return self.productlistfolder;
        } else {
          return self.productlistfolder.slice(0, 100);
        }
      },
      Narxsearchcomputed() {
        return this.productlistfolder.filter(row => {
          if(row.price_register.length>0){
            if(row.price_register[0].chakana_price==this.sensors){
              return row;
            }
          }
        });
      },
      filteredShtrix() {
        return this.shtrixlist.filter(row => {
          const name = row.extra_name.toString().toLowerCase();
          const searchTerm = this.filter1.toLowerCase();
          if(row.balance>0){
          return name.includes(searchTerm);
          }
        });
      }
    },
    props: ["datas","bronlist"],
    created: function () {
      let self = this;
      self.Time();
      self.$root.$refs.rasxod = self;
      self.$root.$on("kontragentone", function (getdata) {
        self.kontragent = getdata;
      });
      self.$root.$on("kontragentall", function (getdata) {
        self.kontragentlist = getdata;
      });
      self.Skladlist();
    },
    mounted: function () {
      setTimeout(() => {
        this.Focus();
      }, 100);
      let self = this;
      if (localStorage.getItem("sensor") == "false") {
        self.touch = false;
      }
      $("input").focusout(function (e) {
        self.focusout = e.target;
      });
      $("body").on("keydown", "#shtrix", function (e) {
        if (e.keyCode == 13) {
          self.Shtrix_code();
        } else {
          return true;
        }
      });
      $("body").on("keydown", ".savdolist", function (e) {
        var tr = $(this).parents("tr");
        var tbody = $(this).parents("tbody");
        var index = self.itemindex;
        if (e.keyCode == 40) {
          index = tbody.find("tr").index(tr) + 1;
          if (index > tbody.find("tr").length - 1) {
            index = 0;
          }
          tbody
            .find("tr")
            .eq(index)
            .find(".savdolist")
            .focus();
        } else if (e.keyCode == 38) {
          index = tbody.find("tr").index(tr) - 1;
          if (index < 0) {
            index = tbody.find("tr").length - 1;
          }
          tbody
            .find("tr")
            .eq(index)
            .find(".savdolist")
            .focus();
        }
        self.itemindex = index;
      });
      setTimeout(() => {
        if (self.datas.sklad_id > 0) {
          self.Productlistfolder(self.datas.sklad_id);
        }
      }, 1000);
      $("body").keydown(function (e) {
        //+
        if (e.keyCode == 107) {
          self.Plus(self.itemindex);
          // $("#plus").click();
          return false;
          // f5 bosilsa
        } else if (e.keyCode == 109) {
          // $("#minus").click();
          self.Minus(self.itemindex);
          return false;
          // f5 bosilsa
        } else if (e.keyCode == 46) {
          $("#del").click();
          return false;
          // f5 bosilsa
        }
        // f3
        else if (e.keyCode == 114) {
          $("#tovar").click();
          return false;
          // f5 bosilsa
        } else if (e.keyCode == 116) {
          self.F5();
          return false;
          // f6 bosilsa
        } else if (e.keyCode == 117) {
          self.F6();
          return false;
        }
        // f7
        else if (e.keyCode == 118) {
          $("#chek").click();
          return false;
        }
        // f9
        else if (e.keyCode == 120) {
          $("#f9").click();
          return false;
        } else if (e.keyCode == 121) {
          $('#f10').focus();
          return false;
        } else if (e.keyCode == 123) {
          $("#f12").click();
          return false;
        } else if (self.touch == true) {
          if ($(':focus').attr('id') != 'shtrix') {
            $("#shtrix").focus();
            return true;
          }
        }
        else{
          return true;
        }
        // return false;
      });
    },
    watch: {
      itemindex: function (val) {
        setTimeout(() => {
          $(".right")
            .find("tbody")
            .children()
            .scrollTop(999999);
        }, 400);
      },
      search: function (val) {
        this.changed = true;
      }
    },
    methods: {
      Expectation(){
        let self = this;
       if (self.sending == false) {
          self.sending = true;
            var methods = "post";
            var action = "api/v1/bron";
            let datasend=self.datas;
          axios({
            method: methods,
            url: action,
            data: self.datas
          }).then(function (response) {
            // self.$store.state.saved = null;
            self.bronlist.push(response.data);
            self.sending = false;
            self.datas.created_at=new Date().valueOf().toString().slice(0, 10);
            self.datas.updated_at=new Date().valueOf().toString().slice(0, 10);
            self.datas.kontragent_id=0;
            self.datas.pay_type_id=0;
            self.datas.skidka_summ=0;
            self.datas.summa=0;
            self.datas.comment="";
            self.datas.cash_summa=0;
            self.datas.plastic_summa=0;
            self.datas.count_all=0;
            self.datas.rasxod_table=[];
          });
          if (self.sending == true) {
            setTimeout(() => {
              self.sending = false;
            }, 1000);
          }
      }
      },
      Up(){
        if(this.itemindex!=0){
          this.itemindex-=1;
        }else{
          this.itemindex=this.datas.rasxod_table.length-1;
        } 
      },
      Down(){
        if(this.itemindex==this.datas.rasxod_table.length-1){
          this.itemindex=0;
        }else{
          this.itemindex+=1;
        }
      },
      ChangePricetype() {
        let self = this;
        this.datas.rasxod_table.forEach(function (key, value) {
          self.Ostatka(value);
        });
      },
      Plus(index) {
        var item = this.datas.rasxod_table[index];
        item.count = item.count + 1;
        this.Ostatka(index);
        console.log("plus ishladi");
      },
      Minus(index) {
        var item = this.datas.rasxod_table[index];
        if(item.count>0){
          item.count = item.count - 1;
          this.Ostatka(index);
        }
        console.log("minus ishladi");
      },
      ChangeIndex(index) {
        this.itemindex = index;
      },
      Multiplication() {
        this.newitem.count = parseInt(this.sensors);
        this.sensors = "";
      },
      Sensorchange() {
        setTimeout(() => {
          this.Focus();
        }, 100);
      },
      Kod() {
        let self = this;
        if (this.productlistfolder.find(e => e.id == self.sensors) == undefined) {
          self.$store.state.errors = "Бундай товар мавжуд емас";
        } else {
          self.newitem.product_id = parseInt(self.sensors);
          self.Ostatkanew(this.productlistfolder.find(e => e.id == self.sensors));
          self.sensors = "";
        }
      },
      Shtrixsearch() {
        this.newitem.shtrix_kod = this.sensors;
        this.sensors = "";
        this.Shtrix_code();
      },
      Narxsearch() {
        let self = this;
        let item;
        if (self.datas.price_type == "chakana") {
          item = self.Narxlist();
        } else {
          item = self.productlistfolder.filter(
            e => e.price_register[0].optom_price == self.sensors
          );
        }
        if (item.length == 0) {
          self.$store.state.errors = "Бундай нархда товар мавжуд емас";
        } else if (item.length == 1) {
          self.newitem.product_id = item[0].id;
          self.Ostatkanew(item);
          self.sensors = "";
        } else {
          item.forEach(function (element, key) {
            self.shtrixlist.push({
              balance: element.balance,
              extra_name: element.extra_name,
              name: element.name,
              price_register: element.price_register,
              product_id: element.id,
              shtrix_table: []
            });
          });
          if(self.filteredShtrix.length){
            self.sensors = "";
            self.$bvModal.show("modal-shtrixnew");
          }
        }
      },
      Narxlist(){
        return this.productlistfolder.filter(row => {
          if(row.price_register.length>0){
            if(row.price_register[0].chakana_price==this.sensors){
              return row;
            }
          }
        });
      },
      Skladlist() {
        let self = this;
        axios.get("api/v1/sklads").then(function (response) {
          self.skladlist = response.data;
        });
      },
      accept(text) {
        this.hide();
      },
      show(e) {
        this.input1 = e.target;
      },
      showtext(e) {
        this.inputtext = e.target;
      },
      show1(e) {
        this.input = e.target;
      },
      hide() {
        this.visible = false;
      },
      F5button(){
        this.datas.cash_summa =this.datas.summa-this.datas.skidka_summa;
        this.datas.plastic_summa=0;
      },
      F6button(){
        this.datas.plastic_summa =this.datas.summa-this.datas.skidka_summa;
        this.datas.cash_summa=0;
      },
      F5() {
        this.datas.cash_summa =
          this.datas.summa - this.datas.plastic_summa - this.datas.skidka_summa;
      },
      F6() {
        this.datas.plastic_summa =
          this.datas.summa - this.datas.cash_summa - this.datas.skidka_summa;
      },
      Time: function () {
        window.setInterval(() => {
          var d = new Date();
          var s = d.getSeconds();
          var s = d.getSeconds();
          var m = d.getMinutes();
          var h = d.getHours();
          this.time =
            ("0" + h).substr(-2) +
            ":" +
            ("0" + m).substr(-2) +
            ":" +
            ("0" + s).substr(-2);
        }, 1000);
      },
      Productlistfolder(sklad) {
        let self = this;
        axios({
          method: "post",
          url: "api/v1/product/all-price-balance-not-zero/0",
          data: { sklad_id: sklad, datetime: self.datas.created_at }
        }).then(function (response) {
          self.productlistfolder = response.data;
          return false;
        });
      },
      async Print(id) {
        let self = this;
        await self.Qarzdorlik();
        $("#my-node").css("display", "block");
        var node = document.getElementById("my-node");
        setTimeout(() => {
          htmlToImage
            .toSvg(document.getElementById("my-node"))
            .then(function (dataUrl) {
              self.$refs.electronVuePrinter.print(dataUrl);
              setTimeout(() => {
                localStorage.setItem("sensor", self.touch);
                self.$router.go();
              }, 2500);
            })
            .catch(function (error) {
              console.error("oops, something went wrong!", error);
            });
        }, 100);
      },
      Focus() {
        if (this.touch == false) {
          $('#shtrix').focus();
        } else {
          $("#sensors").focus();
        }
      },
      Trashitem(index) {
        const answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
        if (answer) {
          // this.datas.summa -= this.datas.rasxod_table[index].summa;
          this.datas.rasxod_table.splice(index, 1);
          this.Summa();
        }
        if (this.datas.rasxod_table.length < this.itemindex + 1) {
          this.itemindex = 0;
        }
      },
      Ostatka(index) {
        let self = this;
        let data = {
          product_id: self.datas.rasxod_table[index].product_id,
          sklad_id: self.datas.sklad_id
        };
        axios({
          method: "post",
          url: "api/v1/product/price-balance",
          data: {
            product_id: self.datas.rasxod_table[index].product_id,
            sklad_id: self.datas.sklad_id,
            datetime: self.datas.created_at
          }
        }).then(function (response) {
          if (response.data.balance >= self.datas.rasxod_table[index].count) {
            self.datas.rasxod_table[index].current_balance =
              response.data.balance;
          } else {
            self.datas.rasxod_table[index].count = response.data.balance;
            self.$store.state.errors = "Қолдиқ мавжуд емас";
          }
          // if (self.datas.rasxod_table[index].price == 0) {
          if (self.datas.price_type == "optom") {
            self.datas.rasxod_table[index].price = response.data.optom_price;
          } else {
            self.datas.rasxod_table[index].price = response.data.chakana_price;
          }
          // }
          self.Changeprice(index);
        });
      },
      Productchanged(index) {
        let self = this;
        let item = self.datas.rasxod_table[index];
        self.datas.rasxod_table.forEach(function (key, value) {
          if (value != index) {
            if (item.product_id == key.product_id) {
              self.$store.state.errors = self.$t("Бу товар танланган");
              item.product_id = 0;
              item.count = 0;
              item.summa = 0;
              self.Summa();
            }
          }
        });
        if (item.product_id > 0) {
          if (item.shtrix_kod == "") {
            axios({
              method: "get",
              url: "api/v1/product/id/" + item.product_id
            }).then(function (response) {
              if (response.data.shtrix_table[0]) {
                item.shtrix_kod = response.data.shtrix_table[0].shtrix_kod;
              }
            });
          }
          self.Ostatka(index);
        }
      },
      Shoved() {
          if(this.$refs.inputText2!=undefined){
            this.$refs.inputText2.focus();
          }
      },
      Shoved1() {
        // setTimeout(() => {
        $('#inputtext').focus();
        // }, 100);
      },
      Productname() {
        let item = this.newitem;
        axios({
          method: "get",
          url: "api/v1/product/id/" + item.product_id
        }).then(function (response) {
          item.product_name = response.data.extra_name;
        });
      },
      Hide() {
        let self = this;
        setTimeout(function (e) {
          if ($(":focus").attr("class") == undefined) {
            $("#shtrix").focus();
          }
        }, 100);
      },
      Ostatkanew(item) {
        let self = this;
        if (item.balance >= self.newitem.count) {
          self.newitem.current_balance = item.balance;
          // self.$bvModal.show("modal-new");
          if (self.datas.price_type == "optom") {
            self.newitem.price = item.price_register[0].optom_price;
          } else {
            self.newitem.price = item.price_register[0].chakana_price;
          }
          self.Productname();
          self.newitem.summa = self.newitem.price * self.newitem.count;
          self.Create();
          self.newitem.tan_narx = item.price_register[0].body_price;
        } else {
          self.newitem = {
            shtrix_kod: "",
            product_id: 0,
            count: 1,
            price: 0,
            summa: 0,
            product_name: ""
          };
          self.$store.state.errors = "Қолдиқ мавжуд емас";
        }
      },
      Ostatkanews() {
        let self = this;
        axios({
          method: "post",
          url: "api/v1/product/price-balance",
          data: {
            product_id: self.newitem.product_id,
            sklad_id: self.datas.sklad_id,
            datetime: self.datas.created_at
          }
        }).then(function (response) {
          if (response.data.balance >= self.newitem.count) {
            self.newitem.current_balance = response.data.balance;
            if (self.datas.price_type == "optom") {
              self.newitem.price = response.data.optom_price;
            } else {
              self.newitem.price = response.data.chakana_price;
            }
            self.Productname();
            self.newitem.tan_narx = response.data.body_price;
            self.$bvModal.show("modal-new");
          } else {
            self.newitem = {
              shtrix_kod: "",
              product_id: 0,
              count: 1,
              price: 0,
              summa: 0,
              product_name: ""
            };
            self.$store.state.errors = "Қолдиқ мавжуд емас";
          }
        });
      },
      Shtrix_code(e) {
        let self = this;
        let shtrix = self.newitem.shtrix_kod;
        console.log(shtrix);
        if (shtrix != "" && shtrix != " ") {
          axios({
            method: "post",
            url: "api/v1/product/shtrix2/" + shtrix,
            data: { sklad_id: self.datas.sklad_id }
          }).then(function (response) {
            if (!response.data[0]) {
              self.newitem.shtrix_kod="";
            } else if (response.data[1]) {
              self.shtrixlist = response.data;
              console.log(self.filteredShtrix);
              if(self.filteredShtrix.length){
                self.$bvModal.show("modal-shtrixnew");
              }
            } else {
              self.newitem.product_id = response.data[0].product_id;
              self.Ostatkanew(response.data[0]);
            }
          });
        }
      },
      Shtrix(index) {
        let self = this;
        var shtrix = self.datas.rasxod_table[index].shtrix_kod;
        axios({
          method: "post",
          url: "api/v1/product/shtrix2/" + shtrix,
          data: { sklad_id: self.datas.sklad_id }
        }).then(function (response) {
          if (!response.data[0]) {
          } else if (response.data[1]) {
            self.settedindex = index;
            self.shtrixlist = response.data;
            self.$bvModal.show("modal-shtrix");
          } else {
            self.datas.rasxod_table[index].product_id =
              response.data[0].product_id;
            self.Productchanged(index);
          }
        });
      },
      Selectproduct(index) {
        this.$store.state.selected_product = this.datas.rasxod_table;
        this.$store.state.selected_index = index;
      },
      Changeprice(index) {
        let self = this;
        var item = self.datas.rasxod_table[index];
        axios({
          method: "post",
          url: "api/v1/product/price-balance",
          data: {
            product_id: item.product_id,
            sklad_id: self.datas.sklad_id,
            datetime: self.datas.created_at
          }
        }).then(function (response) {
          if (response.data.balance >= item.count) {
            item.current_balance = response.data.balance;
            item.summa = item.price * item.count;
            self.Summa();
          } else {
            item.count = item.summa / item.price;
            self.$store.state.errors = "Қолдиқ мавжуд емас";
          }
        });
      },
      Create() {
        let self = this;
        axios({
          method: "post",
          url: "api/v1/product/price-balance",
          data: {
            product_id: self.newitem.product_id,
            sklad_id: self.datas.sklad_id,
            datetime: self.datas.created_at
          }
        }).then(function (response) {
          if (response.data.balance >= self.newitem.count) {
            self.datas.rasxod_table.forEach(function (key, value) {
              if (key.product_id == self.newitem.product_id) {
                if (
                  response.data.balance >=
                  parseInt(self.newitem.count) + parseInt(key.count)
                ) {
                  key.count = parseInt(self.newitem.count) + parseInt(key.count);
                  key.price = self.newitem.price;
                  self.Changeprice(value);
                  self.newitem = {
                    shtrix_kod: "",
                    product_id: 0,
                    count: 1,
                    price: 0,
                    summa: 0,
                    product_name: ""
                  };
                } else {
                  key.count = response.data.balance;
                  key.price = self.newitem.price;
                  self.Changeprice(value);
                  self.newitem = {
                    shtrix_kod: "",
                    product_id: 0,
                    count: 1,
                    price: 0,
                    summa: 0,
                    product_name: ""
                  };
                }
              }
              if (self.touch == false) {
                $('#shtrix').focus();
              }
            });
            if (self.newitem.product_id > 0) {
              self.datas.rasxod_table.push(self.newitem);
              self.newitem = {
                shtrix_kod: "",
                product_id: 0,
                count: 1,
                price: 0,
                summa: 0,
                product_name: "",
                current_balance: 0
              };
              var items =
                self.datas.rasxod_table[self.datas.rasxod_table.length - 1];
              axios({
                method: "get",
                url: "api/v1/product/id/" + items.product_id
              }).then(function (response) {
                if (response.data.shtrix_table[0]) {
                  items.shtrix_kod = response.data.shtrix_table[0].shtrix_kod;
                }
              });
              self.itemindex = self.datas.rasxod_table.length - 1;
            }
            self.newitem.summa = self.newitem.price * self.newitem.count;
            self.Summa();
            self.$bvModal.hide("modal-new");
            self.filter = "";
          } else {
            self.$store.state.errors = "Қолдиқ мавжуд емас";
          }
        });
      },
      Addtable() {
        this.datas.rasxod_table.push({
          shtrix_kod: "",
          product_id: 0,
          count: 1,
          price: 0,
          summa: 0,
          current_balance: 0
        });
        // $('.right').find('td').eq(-1).find('input').focus();
        setTimeout(() => {
          var have = $(".shtrixx");
          if (have.length != 0) {
            have.eq(have.length - 1).focus();
          } else {
            have.focus();
          }
        }, 100);
      },
      Summa() {
        this.datas.summa = 0;
        this.datas.count_all = 0;
        let self = this;
        this.datas.rasxod_table.forEach(function (key, value) {
          self.datas.summa += parseInt(key.summa);
          self.datas.count_all += parseInt(key.count);
        });
      },
      Savedokument(type) {
        let self = this;
        if (
          self.datas.kontragent_id == 0 &&
          parseInt(self.datas.summa) >
          parseInt(self.datas.cash_summa) +
          parseInt(self.datas.skidka_summa) +
          parseInt(self.datas.plastic_summa)
        ) {
          this.$store.state.errors = this.$t("Тўлов тўлиқ амалга оширилмаган");
        } else if (self.sending == false) {
          self.sending = true;
          if (this.$route.path == "/chiqim/create") {
            var methods = "post";
            var action = "api/v1/rasxod";
          } else {
            var methods = "patch";
            var action = "api/v1/rasxod/id/" + self.$route.params.id;
            if (self.$store.state.saved == 1) {
              self.datas.updated_at = new Date()
                .valueOf()
                .toString()
                .slice(0, 10);
            }
          }
          axios({
            method: methods,
            url: action,
            data: self.datas
          }).then(function (response) {
            self.$store.state.saved = null;
            self.sending = false;
            if (type == "print") {
              let routeData = self.$router.resolve({
                name: "prints",
                query: { id: response.data.id }
              });
              let myWindow;
              myWindow = window.open(
                '#/chiqim/print/' + response.data.id,
                "_blank",
                "width=1000, height=1000"
              );
              localStorage.setItem("sensor", self.touch);
              self.$router.go();
            } else if (type == "home") {
              self.$router.push({ name: "Чиқим" });
            } else {
              localStorage.setItem("sensor", self.touch);
              self.$router.go();
            }
          });
          if (self.sending == true) {
            setTimeout(() => {
              self.sending = false;
            }, 1000);
          }
        }
      }
    }
  };
</script>
<style scoped>
  .watch {
    background: #3f51b5;
    color: white;
    border-radius: 5px;
    border: 2px solid #002bff45;
    padding: 20px 10px;
    font-size: 20pt;
    margin: 0 3px;
  }

  .touchbutton {
    padding: 1px 0;
    margin: 0.4em 0.6em 0 0;
    -webkit-box-flex: 40;
    -ms-flex: 40;
    flex: 40;
    height: 2.2em;
    line-height: 2.2em;
    overflow: hidden;
    vertical-align: middle;
    border: 1px solid #ccc;
    color: #333;
    background-color: #ccc;
    -webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.6) !important;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.6);
    border-radius: 0.35em;
    font-size: 1.25em !important;
    text-align: center;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer !important;
  }

  .buttom a,
  .buttom button,
  .mybtn {
    font-size: 15pt !important;
    margin: 5px 2px !important;
  }

  .toggle__button {
    vertical-align: middle;
    user-select: none;
    cursor: pointer;
  }

  .toggle__button input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
  }

  .toggle__button .toggle__switch {
    display: inline-block;
    height: 12px;
    border-radius: 6px;
    width: 40px;
    background: #bfcbd9;
    box-shadow: inset 0 0 1px #bfcbd9;
    position: relative;
    margin-left: 10px;
    transition: all 0.25s;
  }

  .toggle__button .toggle__switch::after,
  .toggle__button .toggle__switch::before {
    content: "";
    position: absolute;
    display: block;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    left: 0;
    top: -3px;
    transform: translateX(0);
    transition: all 0.25s cubic-bezier(0.5, -0.6, 0.5, 1.6);
  }

  .toggle__button .toggle__switch::after {
    background: #4d4d4d;
    box-shadow: 0 0 1px #666;
  }

  .toggle__button .toggle__switch::before {
    background: #4d4d4d;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    opacity: 0;
  }

  #my-node {
    width: 300px;
  }

  #my-node h5 {
    font-weight: bold;
    font-size: 14px;
    color: black;
  }

  #my-node ul {
    list-style: none;
    border-bottom: 1px dotted;
    text-align: left;
    padding: 0;
    margin: 0;
    font-size: 13px;
    color: black;
  }

  .vs__selected {
    position: absolute;
  }

  h5 {
    text-align: center;
  }

  .row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .leftkassa .mybtn {
    margin: 0px !important;
    border-color: currentColor;
  }

  .mylayouts {
    width: 10%;
    border: 2px solid #002bff45;
    margin: 2px 3px 0 0 !important;
  }

  .mylayouts>label {
    background: #3f51b5 !important;
    margin: 0 !important;
    font-weight: bold;
    color: white !important;
  }

  .bi-trash {
    color: black;
  }

  tr:nth-child(even) {
    background-color: #31cadd33;
  }

  .bodyrow .left>tbody {
    display: block;
    /* height: 50vh !important; */
    /* overflow-y: scroll; */
    overflow: hidden !important;
  }

  #mydiv {
    display: block;
    height: 72vh;
    overflow-y: scroll;
  }

  .bodyrow table thead,
  .bodyrow table tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  input[type="number"].table-input,
  input[type="tel"].table-input,
  input[type="text"].table-input {
    width: 100% !important;
  }
  .mybtn {
    border: 2px solid #002bff45;
    background: #3f51b5 !important;
    color: white !important;
    font-weight: bold;
  }

  .big {
    background: #ccc;
    height: 300px;
  }

  .btn {
    font-size: 14px;
  }

  .box {
    background: lightgreen;
    height: 40px;
  }

  input[type="number"].table-input,
  input[type="tel"].table-input,
  input[type="text"].table-input {
    background: none !important;
  }

  table .mybtn {
    background: none !important;
  }

  sup {
    font-size: 18px;
    color: #d92c54;
    font-weight: bold;
  }

  thead {
    background-color: #3f51b5 !important;
    color: white;
    font-weight: bold;
  }

  .mylayouts .table-input {
    max-width: 100% !important;
  }

  .sklad {
    background: #3f51b5;
    padding: 0px 2px;
    margin: 0 2px;
    width: 35vh;
    border-radius: 5px;
  }

  .md-card-content>.table.table-bordered.left tbody {
    height: 54vh !important;
  }

  .md-card-content>.table.table-bordered.right tbody {
    height: 61vh !important;
  }

  .headerhref {
    display: flex;
  }

  .headerhref a {
    padding: 13px 10px;
  }

  tr {
    cursor: pointer;
  }
</style>