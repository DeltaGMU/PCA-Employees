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
    context.rootState.user = {};
    context.rootState.reports = null;

    console.log("logging out!")
    if (this.state.isAuthenticated) {
      console.log("Logging out...")
      let headers = { 'Authorization': 'Bearer '+context.rootState.auth.user.token }
      await axios.post("api/v1/logout", headers).then(
        (resp) => {
          if (resp.status === 200) {
            console.log("Logged out.")
            context.commit("logout") 
          } 
        }
      ).catch(e => console.log(e));
    }
    else {
      context.commit("logout")
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