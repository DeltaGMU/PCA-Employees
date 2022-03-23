import axios from "axios";
import httpsAgent from 'https'

const state = {
  user: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUser: (state) => state.user,
};

const actions = {
  async LogIn({commit}, credentials) {
    const http_agent = new httpsAgent({
      rejectUnauthorized: false,
      requestCert: false
    })
    await axios.post("api/v1/login", credentials, http_agent).then(
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
    context.commit("logout");
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