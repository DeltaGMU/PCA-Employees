import axios from "axios";

const state = {
  employees: null,
};

const getters = {
  StateEmployees: (state) => state.employees,
};

const actions = {
  async GetEmployees(context) {
    let headers = {
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
    }
    axios.get("api/v1/employees/all", headers).then(
      resp => {
        context.commit("setEmployees", resp.data.data.employees);
      }
    );
    
  },
};

const mutations = {
  setEmployees(state, employees) {
    state.employees = employees;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};