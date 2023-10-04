import Vue from "vue";
import Vuex from "vuex";
import {
  state as state1,
  mutations as mutations1,
  actions as actions1,
} from "./modules/linhvuc1";
import {
  state as state2,
  mutations as mutations2,
  actions as actions2,
} from "./modules/linhvuc2";
import {
  state as state3,
  mutations as mutations3,
  actions as actions3,
} from "./modules/linhvuc3";
import {
  state as state4,
  mutations as mutations4,
  actions as actions4,
} from "./modules/linhvuc4";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // ...
  },
  mutations: {
    // ...
  },
  actions: {
    // ...
  },
  modules: {
    linhvuc1: {
      // namespaced: true, // Enable namespace for authentic store
      state: state1,
      mutations: mutations1,
      actions: actions1,
    },
    linhvuc2: {
      // namespaced: true, // Enable namespace for authentic store
      state: state2,
      mutations: mutations2,
      actions: actions2,
    },
    linhvuc3: {
      // namespaced: true, // Enable namespace for authentic store
      state: state3,
      mutations: mutations3,
      actions: actions3,
    },
    linhvuc4: {
      // namespaced: true, // Enable namespace for authentic store
      state: state4,
      mutations: mutations4,
      actions: actions4,
    },
  },
});
