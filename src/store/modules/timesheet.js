import axios from "axios";

const state = {

};

const getters = {

};

const actions = {
  async SubmitTimesheet(context, valueArray) {
    try {
      return await axios({
        method: 'post',
        url: "api/v1/timesheet/" + context.rootState.auth.user.employee_id,
        data: {
            "time_sheets": valueArray
        },
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      });
    }
    catch(err) {
      throw "Timesheet submission failed!"
    }
  },
  
  async GetTimesheets(context, payload) {
    return await axios({
      method: 'get',
      url: "api/v1/timesheet/" + context.rootState.auth.user.employee_id,
      params: {
          "date_start": payload.firstDay,
          "date_end": payload.lastDay
      },
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
    }).then(resp => {
      if (resp !== undefined) {
        // console.log(resp)
        return resp.data.data
      }
      else {
        console.log("No employee time sheet records exist for the provided date range!")
        return null
      }
    })
  },
  async GetTimesheetsForEmployee(context, payload) {
    // console.log(payload)
    return await axios({
      method: 'get',
      url: "api/v1/timesheet/" + payload.employee_id,
      params: {
          "date_start": payload.date_start,
          "date_end": payload.date_end
      },
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
    }).then(resp => {
      if (resp !== undefined) {
        console.log(resp.data.data)
        return resp.data.data
      }
      else {
        console.log("No employee time sheet records exist for the provided date range!")
        return {}
      }
    })
  },
  
  async GetTotalHours(context, payload) {
    //console.log(payload.employeeID)
    return await axios({
      method: 'get',
      url: "api/v1/timesheet/hours/" + payload.employee_id,
      params: {
        "date_start": payload.date_start,
        "date_end": payload.date_end
      },
     headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
    }).then(resp => {
      if (resp !== undefined) {
        // console.log(resp.data.data.total_hours)
        return resp.data.data.total_hours
        // context.commit("retrievedTotalHours", resp.data)
      }
      else {
        console.log("No employee time sheet records exist for the provided date range!")
        return null
        // context.commit("retrievedTotalHours", {})
      }
    })
  },

  async GetTotalHoursForEmployees(context, payload) {
    let employee_hours_obj = {}
    let employee_ids = payload.employees
    for(let employee in Object.keys(employee_ids)) {
      let new_payload = {
        date_start: payload.reportStartDate,
        date_end: payload.reportEndDate,
        employee_id: employee_ids[employee].employee_id
      }
      // console.log(new_payload)
      await context.dispatch("GetTotalHours", new_payload).then(resp => {
        console.log(resp)
        if(resp) {
          employee_hours_obj[new_payload.employee_id] = {
            first_name: employee_ids[employee].first_name,
            last_name: employee_ids[employee].last_name,
            total_hours: resp
          }
          console.log(employee_hours_obj)
        }
        else {
          console.log("MISSING DATA FOR - " + new_payload.employee_id)
        }
      })
    }
    return employee_hours_obj
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