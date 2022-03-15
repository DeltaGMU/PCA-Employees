import axios from "axios";

const state = {
  timesheetSubmission: null,
};

const getters = {
  StateTimesheet: (state) => state.timesheetSubmission,
};

const actions = {
  async SubmitTimesheet(context) {
    let headers = {
      headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
    }
    axios.get("api/v1/employees/all", headers).then(
      resp => {
        context.commit("setTimesheet", resp.data.data.timesheetSubmission);
      }
    );
    
  },
};

const mutations = {
  setTimesheet(state, timesheetSubmission) {
    state.timesheetSubmission = timesheetSubmission;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};