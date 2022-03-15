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
        console.log(resp.data.data);
        commit("setUser", resp.data.data);
      }
    ).catch(e => console.log(e));
  },
  
  async LogOut(context) {
    let user = null;
    context.rootState.employees.employees = null;
    context.rootState.user.name = null;
    context.commit("logout", user);
  },
};

const mutations = {
  setUser(state, username) {
    state.user = username;
  },
  logout(state, user) {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};