import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import user from "./modules/user";
import employees from "./modules/employees";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    auth,
    user,
    employees
  },
  plugins: [createPersistedState({
    key: 'pca-project',
    storage: window.localStorage
  })],
});