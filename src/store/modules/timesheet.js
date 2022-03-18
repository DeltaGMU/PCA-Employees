import axios from "axios";

const state = {
  retrievedTimesheets: null
};

const getters = {
  RetrievedTimesheet: (state) => state.retrievedTimesheets,
};

const actions = {
  async SubmitTimesheet(context, valueArray) {
    // console.log(valueArray);
    await axios({
          method: 'post',
          url: "api/v1/timesheet/" + context.rootState.auth.user.employee_id,
          data: {
              "time_sheets": valueArray
          },
          headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
    }).catch(() => alert('Timesheet submission failed!'));
    alert('Timesheet submitted!')
  },
  
  async GetTimesheets(context, payload) {
    // console.log("start day in payload: " + payload.firstDay);
    // console.log("end day in payload: " + payload.lastDay);
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
  }
};

const mutations = {
  retrievedTimesheet(state, retrievedTimesheets) {
    state.retrievedTimesheets = retrievedTimesheets;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};