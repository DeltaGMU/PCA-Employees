import axios from "axios";

const state = {

};

const getters = {

};

const actions = {
    async GetStudentsByGrade(context, items) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      let payload = {
        "student_grade": items.student_grade,
        "care_type": items.care_type,
        "care_date": items.care_date
      }
      return await axios.post("api/v1/care", payload, headers).then(
        resp => {
          console.log(resp.data.data.students)
          return resp.data.data.students;
        }
      );
    },
    async GetStudentCareHours(context, items) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      let payload = {
        "grade": items.grade,
        "start_date": items.start_date,
        "end_date": items.end_date
      }
      console.log(payload)
      return await axios.post("api/v1/care/records/total", payload, headers).then(
        resp => {
          if (resp && resp.status === 200) {
            console.log(resp.data.data.students)
            return resp.data.data.students;
          }
          return {}
        }
      ).catch(err => {
        console.log(err)
        return {}
      });
    },
    async GetAllStudentGrades(context) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      return await axios.get("api/v1/grades", headers).then(
        resp => {
          return resp.data.data.grades;
        }
      )
    },
    async GetStudentInfoKiosk(_, studentID) {
      return await axios.get("api/v1/kiosk/info/"+studentID).then(
        resp => {
          return resp.data.data.student;
        }
      );
    },
    async GetStudentInfo(context, studentID) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      return await axios.get("api/v1/students/"+studentID, headers).then(
        resp => {
          return resp.data.data.student;
        }
      );
    },
    async GetAllStudents(context) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      return await axios.get("api/v1/students", headers).then(
        resp => {
          if(resp && resp.status === 200) {
            return resp.data.data.students;
          }
          return [];
        }
      ).catch(err => {
        console.log(err)
        return [];
      })
    },
    async GetStudentCareRecords(context, items) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      let payload = {
        "student_id": items.student_id,
        "start_date": items.start_date,
        "end_date": items.end_date
      }
      return await axios.post("api/v1/care/records", payload, headers).then(
        resp => {
          return resp.data.data.records;
        }
      );
    },
    async DeleteStudentCareRecord(context, items) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      let payload = {
        "student_id": items.student_id,
        "care_date": items.care_date,
      }
      if (items.care_type == 0) {
        payload["care_type"] = false
      }
      else if(items.care_type == 1) {
        payload["care_type"] = true
      }
      console.log(payload)
      return await axios.post("api/v1/care/records/remove", payload, headers).then(
        resp => {
          if (resp && resp.status == 200){
            return true;
          }
          return false;
        }
      ).catch(err => {
        console.log(err);
        return false;
      });
    },
    async CreateStudent(context, payload) {
      return await axios({
          method: 'post',
          url: "api/v1/students",
          data: payload,
          headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }).then(resp => {
          if (resp && resp.status == 201) {
            return true;
          }
          return false;
      }).catch(err => {
          console.log(err)
          return false
      });
    },
    async DeleteStudent(context, payload) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      return await axios.post("api/v1/students/remove/"+payload.studentID, {}, headers).then(
        resp => {
          if (resp && resp.status == 200){
            return true;
          }
          return false;
        }
        ).catch(err => {
            console.log(err);
            return false;
        })
    },
    async CheckInStudent(_, payload) {
      return await axios.post("api/v1/care/checkin", payload).then(
        resp => {
          console.log(resp)
          if (resp && resp.status == 201) {
            return true;
          }
          return false;
        }
      ).catch(err => {
        console.log(err);
        return false;
      })
    },
    async UpdateStudent(context, payload) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      console.log(payload)
      return await axios.put("api/v1/students/"+payload.studentID, payload.payload, headers).then(
        resp => {
          if (resp && resp.status == 200){
            return true;
          }
          return false;
        }
        ).catch(err => {
            console.log(err);
            return false;
        })
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