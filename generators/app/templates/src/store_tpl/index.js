import Vue from 'vue';
import Vuex from 'vuex';
import exampleModule from './exampleModule';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    exampleModule
  }
});

export default store;
