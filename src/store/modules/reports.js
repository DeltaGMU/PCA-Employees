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
};
  
const mutations = {

};
  
export default {
    state,
    getters,
    actions,
    mutations,
};