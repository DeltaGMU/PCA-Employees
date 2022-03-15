import axios from "axios";

const state = {
  
};

const getters = {
  
};

const actions = {
  async SubmitTimesheets(context) {
    let headers = {
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
    }
  },
};

const mutations = {

};

export default {
  state,
  getters,
  actions,
  mutations,
};