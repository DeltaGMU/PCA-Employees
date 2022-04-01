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
    return await axios.post("api/v1/login", credentials).then(
      resp => {
        console.log(resp.status);
        if (resp && resp.status === 200) {
          commit("setUser", resp.data.data);
          return 0;
        }
        else if (resp) {
          return resp.status;
        }
        return -1;
      }
    ).catch((err) => {
      if (err) {
        return err.status
      }
      return -1;
    });
  },
  
  async LogOut(context) {
    context.rootState.employees.employees = null;
    context.rootState.user.name = null;
    context.rootState.user.role = null;
    context.rootState.user.info = null;
    context.rootState.timesheet.retrievedTimesheets = null;
    context.rootState.students.students = null;

    /*
    if (this.state.isAuthenticated) {
      let headers = { 'Authorization': 'Bearer '+context.rootState.auth.user.token }
      await axios.post("api/v1/logout", headers).then(
        () => { context.commit("logout") }
      ).catch(e => console.log(e));
    }
    */
    context.commit("logout")
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