import axios from "axios";

const state = {
  user: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUser: (state) => state.user,
};

const actions = {
  async LogIn({commit}, credentials) {
    await axios.post("api/v1/login", credentials).then(
      resp => {
        commit("setUser", resp.data.data);
      }
    ).catch(e => console.log(e));
  },
  
  async LogOut(context) {
    context.rootState.employees.employees = null;
    context.rootState.user.name = null;
    context.rootState.user.role = null;
    context.rootState.timesheet.retrievedTimesheets = null;

    if (this.state.isAuthenticated) {
      let headers = { 'Authorization': 'Bearer '+context.rootState.auth.user.token }
      await axios.post("api/v1/logout", headers).then(
        () => { context.commit("logout") }
      ).catch(e => console.log(e));
    }

    
  },
};

const mutations = {
  setUser(state, username) {
    state.user = username;
  },
  logout(state) {
    state.user = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};