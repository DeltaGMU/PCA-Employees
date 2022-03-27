import axios from "axios";

const state = {
  students: null
};

const getters = {
    StateStudents: (state) => state.students,
};

const actions = {
    async GetAllStudents(context) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      await axios.get("api/v1/students", headers).then(
        resp => {
          context.commit("setStudents", resp.data.data.students);
        }
      );
    },
};
  
const mutations = {
    setStudents(state, students) {
      state.students = students;
    }
};
  
export default {
    state,
    getters,
    actions,
    mutations,
};