import axios from "axios";

const state = {

};

const getters = {

};

const actions = {
  async CreateNewEmployee(context, employee_data) {
    let headers = {
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token},    
    }
    return axios.post("api/v1/employees", employee_data, headers).then(
      resp => {
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
    return axios.get("api/v1/employees/all", headers).then(
      resp => {
        console.log(resp)
        return resp.data.data.employees
        // commit("setEmployees", resp.data.data.employees);
      }
    );
  },
  async UpdateEmployee(context, employee_data) {
    let headers = {
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token},    
    }
    return axios.put("api/v1/employees/"+context.rootState.auth.user.employee_id, employee_data, headers).then(
      resp => {
        if (resp.status === 200) {
          return true;
        }
        return false;
      }
    ).catch(err => {
      console.log(err);
      return false;
    });
  },
  async UpdateAccountPassword(context, password_payload) {
    let headers = {
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token},    
    }
    return axios.put("api/v1/employees/password/new", password_payload, headers).then(
      resp => {
        if (resp.status === 200) {
          return true;
        }
        return false;
      }
    ).catch(err => {
      console.log(err);
      return false;
    });
  }
};

const mutations = {

};

export default {
  state,
  getters,
  actions,
  mutations,
};