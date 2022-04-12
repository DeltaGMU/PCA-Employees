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
        if (resp && resp.status === 201) {
          return true;
        }
        return false;
      }
    ).catch(err => {
      console.log(err);
      return false;
    });
  },
  async GetEmployeeInfo(context, employeeID) {
    let headers = {
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
    }
    return await axios.get("api/v1/employees/"+employeeID, headers).then(
      resp => {
        return resp.data.data.employee
      }
    );
  },
  async GetAllEmployees(context) {
    let headers = {
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
    }
    return axios.get("api/v1/employees/all", headers).then(
      resp => {
        if (resp && resp.status === 200) {
          return resp.data.data.employees
        }
        return []
      }
    ).catch(err => {
      console.log(err)
      return []
    });
  },
  async UpdateEmployee(context, employee_data) {
    let headers = {
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token},    
    }
    let employee_id = employee_data['employee_id']
    console.log(employee_data)
    delete employee_data['employee_id']
    
    return axios.put("api/v1/employees/"+employee_id, employee_data, headers).then(
      resp => {
        if (resp && resp.status === 200) {
          return true;
        }
        return false;
      }
    ).catch(err => {
      console.log(err);
      return false;
    });
  },
  async DeleteEmployee(context, employeeID) {
    let headers = {
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
    }

    return await axios.post("api/v1/employees/remove/"+employeeID, {}, headers).then(
      resp => {
        if (resp && resp.status == 200){
          console.log(resp)
          return true;
        }
        return false;
      }
      ).catch(err => {
          console.log(err);
          return false;
      })
  },
  async UpdateAccountPassword(context, password_payload) {
    let headers = {
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token},    
    }
    return axios.put("api/v1/employees/password/new", password_payload, headers).then(
      resp => {
        if (resp && resp.status === 200) {
          return true;
        }
        return false;
      }
    ).catch(err => {
      console.log(err);
      return false;
    });
  },
  async SubmitLeaveRequest(context, leave_payload) {
    let headers = {
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token},
    }
    return axios.post("api/v1/reports/leave-request", leave_payload, headers).then(
      resp => {
        if (resp && resp.status === 201) {
          return true;
        }
        return false;
      }
    ).catch(err => {
      console.log(err);
      return false;
    });
  },
  async GetLeaveRequestReasons(context) {
    let headers = {
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token},
    }
    return axios.get("api/v1/reports/leave-request/reasons", headers).then(
      resp => {
        if (resp && resp.status === 200) {
          return resp.data.data.reasons;
        }
        return [];
      }
    ).catch(err => {
      console.log(err);
      return [];
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