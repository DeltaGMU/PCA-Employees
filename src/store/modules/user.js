import axios from "axios";

const state = {
  name: null,
  role: null
};

const getters = {
    StateName: (state) => state.name,
    StateRole: (state) => state.role
};

const actions = {
    async GetName(context) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      await axios.get("api/v1/me", headers).then(
        resp => {
          context.commit("setName", resp.data.data.user);
        }
      );
    },
    async GetRole(context) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      await axios.get("api/v1/employees/" + context.rootState.auth.user.employee_id, headers).then(
        resp => {
          context.commit("setRole", resp.data.data.employee.role.name);
        }
      );
    },
};
  
const mutations = {
    setName(state, name) {
      state.name = name;
    },
    setRole(state, role) {
      state.role = role;
    },
};
  
export default {
    state,
    getters,
    actions,
    mutations,
};