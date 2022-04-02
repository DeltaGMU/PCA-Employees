import axios from "axios";

const state = {

};

const getters = {

};

const actions = {
    async GetStudentCarePDFReport(context, payload) {
        let headers = {
            headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token},
            responseType: 'arraybuffer'
        }
        let studentPayload = {
            "grade": payload.grade,
            "start_date": payload.start_date,
            "end_date": payload.end_date
        }
        return await axios.post("api/v1/reports/care/pdf", studentPayload, headers).then(
            resp => {
              if (resp && resp.status == 200) {
                return resp.data;
              }
              return null;
            }
        ).catch(err => {
            console.log(err)
            return null;
        });
    },
    async GetStudentCareCSVReport(context, payload) {
        let headers = {
            headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token},
            responseType: 'arraybuffer'
        }
        let studentPayload = {
            "grade": payload.grade,
            "start_date": payload.start_date,
            "end_date": payload.end_date
        }
        return await axios.post("api/v1/reports/care/csv", studentPayload, headers).then(
            resp => {
              if (resp && resp.status == 200) {
                return resp.data;
              }
              return null;
            }
        ).catch(err => {
            console.log(err)
            return null;
        });
    },

    /*
    async GetRole(context) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      return await axios.get("api/v1/employees/" + context.rootState.auth.user.employee_id, headers).then(
        resp => {
          if (resp && resp.status == 200) {
            context.commit("setRole", resp.data.data.employee.role.name);
            return true;
          }
          return false;
        }
      ).catch(err => {
        console.log(err)
        return false;
      });
    },
    */
};
  
const mutations = {

};
  
export default {
    state,
    getters,
    actions,
    mutations,
};