import axios from "axios";

const state = {
  retrievedTimesheets: null
};

const getters = {
  RetrievedTimesheet: (state) => state.retrievedTimesheets,
};

const actions = {
  async SubmitTimesheet(context, valueArray) {
    await axios({
          method: 'post',
          url: "api/v1/timesheet/" + context.rootState.auth.user.employee_id,
          data: {
              "time_sheets": valueArray
          },
          headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
    });
  
  },
  async GetTimesheets(context, payload) {
    
    await axios({
      method: 'get',
      url: "api/v1/timesheet/" + context.rootState.auth.user.employee_id,
      params: {
          "date_start": payload.firstDay,
          "date_end": payload.lastDay
      },
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
    }).then(resp => context.commit("retrievedTimesheet", resp.data.data));
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