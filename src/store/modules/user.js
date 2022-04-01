import axios from "axios";

const state = {
  name: null,
  role: null,
  info: null,
};

const getters = {
    StateName: (state) => state.name,
    StateRole: (state) => state.role,
    StateInfo: (state) => state.info
};

const actions = {
    async GetName(context) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      return await axios.get("api/v1/me", headers).then(
        resp => {
          if (resp && resp.status == 200) {
            context.commit("setName", resp.data.data.user);
            return true;
          }
          return false;
        }
      ).catch(err => {
        console.log(err)
        return false;
      });
    },
    async GetUserInfo(context) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      return await axios.get("api/v1/employees/"+context.rootState.auth.user.employee_id, headers).then(
        resp => {
          if (resp && resp.status == 200) {
            context.commit("setInfo", resp.data.data.employee);
            return true;
          }
          return false;
        }
      ).catch(err => {
        console.log(err)
        return false;
      });
    },
    async GetRole(context) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      return await axios.get("api/v1/employees/" + context.rootState.auth.user.employee_id, headers).then(
        resp => {
          if (resp && resp.status == 200) {
            context.commit("setRole", resp.data.data.employee.role.name);
            return true;
          }
          return false;
        }
      ).catch(err => {
        console.log(err)
        return false;
      });
    },
};
  
const mutations = {
    setName(state, name) {
      state.name = name;
    },
    setRole(state, role) {
      state.role = role;
    },
    setInfo(state, info) {
      state.info = info;
    }
};
  
export default {
    state,
    getters,
    actions,
    mutations,
};