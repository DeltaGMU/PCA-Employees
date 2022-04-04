import axios from "axios";

const state = {
  user: {},
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUser: (state) => state.user,
};

const actions = {
  async LogIn({commit}, credentials) {
    return await axios.post("api/v1/login", credentials).then(
      resp => {
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
  async ClearDataOnLogout(context) {
    context.rootState.user = {}
    context.commit("logout")
  },
  async LogOut(context) {
    if (this.getters.isAuthenticated) {      
      let headers = {
        headers: {'Authorization': 'Bearer '+this.getters.StateUser.token}
      }
      await axios.post("api/v1/logout", {}, headers).then(
        resp => {
          if (resp && resp.status === 200) {
            console.log("Logged out.")
            return true
          }
          else if (resp && resp.status === 400) {
            console.log("Token already invalidated")
            return true
          }
          return false
        }
      ).catch(e => {
        console.log(e)
        return false
      });
    }
    await context.dispatch("ClearDataOnLogout");
  },
};

const mutations = {
  setUser(state, username) {
    state.user = username;
  },
  logout(state) {
    state.user = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};