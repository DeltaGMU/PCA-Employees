import axios from "axios";

const state = {
  employees: null,
};

const getters = {
  StateEmployees: (state) => state.employees,
};

const actions = {
  async CreateNewEmployee(context, employee_data) {
    console.log(employee_data);
    let headers = {
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token},    
    }
    return axios.post("api/v1/employees", employee_data, headers).then(
      resp => {
        console.log(resp)
        if (resp.status === 201) {
          return true;
        }
        return false;
      }
    ).catch(err => {
      console.log(err);
      return false;
    });
  },
  async GetAllEmployees(context) {
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