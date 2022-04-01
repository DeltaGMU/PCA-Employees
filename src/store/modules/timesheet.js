import axios from "axios";

const state = {
  retrievedTimesheets: null,
  retrievedTotalHours: null
};

const getters = {
  RetrievedTimesheet: (state) => state.retrievedTimesheets,
  RetrievedTotalHours: (state) => state.retrievedTotalHours
};

const actions = {
  async SubmitTimesheet(context, valueArray) {
     console.log(valueArray);
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
     //console.log("start day in payload: " + payload.firstDay);
     //console.log("end day in payload: " + payload.lastDay);
    await axios({
      method: 'get',
      url: "api/v1/timesheet/" + context.rootState.auth.user.employee_id,
      params: {
          "date_start": payload.firstDay,
          "date_end": payload.lastDay
      },
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
    }).then(resp => {
      if (resp !== undefined) {
        context.commit("retrievedTimesheet", resp.data.data)
        //console.log(resp.data.data)
      }
      else {
        console.log("No employee time sheet records exist for the provided date range!")
        context.commit("retrievedTimesheet", {})
      }
    })
  },
  async GetTimesheetsForEmployee(context, payload) {
    //console.log("start day in payload: " + payload.firstDay);
    //console.log("end day in payload: " + payload.lastDay);
    console.log(payload)
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
        console.log(resp.data.data.total_hours)
        return resp.data.data.total_hours
        // context.commit("retrievedTotalHours", resp.data)
      }
      else {
        console.log("No employee time sheet records exist for the provided date range!")
        return {}
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
      console.log(new_payload)
      await context.dispatch("GetTotalHours", new_payload).then(resp => {
        if(resp !== undefined) {
          employee_hours_obj[new_payload.employee_id] = {
            first_name: employee_ids[employee].first_name,
            last_name: employee_ids[employee].last_name,
            total_hours: resp
          }
        }
        else {
          console.log("MISSING DATA FOR - " + new_payload.employee_id)
        }
      }).then(() => {
        context.commit("retrievedTotalHours", employee_hours_obj)
      })
    }
  }
};

const mutations = {
  retrievedTimesheet(state, retrievedTimesheets) {
    state.retrievedTimesheets = retrievedTimesheets;
  },
  retrievedTotalHours(state, retrievedTotalHours) {
    state.retrievedTotalHours = retrievedTotalHours;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};