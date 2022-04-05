import axios from "axios";

const state = {
  user: {},
  lastPage: "",
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUser: (state) => state.user,
  StateLastPage: (state) => state.lastPage,
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
  async SaveLastPage(context, payload) {
    context.commit("saveLastPage", payload)
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
            localStorage.clear();
            return true
          }
          else if (resp && resp.status === 400) {
            console.log("Token already invalidated")
            localStorage.clear();
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
  saveLastPage(state, lastPage) {
    state.lastPage = lastPage;
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