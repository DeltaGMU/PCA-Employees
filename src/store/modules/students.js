import axios from "axios";

const state = {
  students: null,
};

const getters = {
    StateStudents: (state) => state.students,
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
    async GetStudentInfo(studentID) {
      return await axios.get("api/v1/kiosk/info/"+studentID).then(
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
          context.commit("setStudents", resp.data.data.students)
        }
      )
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
      try {
          return await axios({
            method: 'post',
            url: "api/v1/students",
            data: {
                payload
            },
            headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
          });
      }
      catch(err) {
        throw "Student creation failed!"
      }
    },
    async CheckInStudent(context, payload) {
      console.log(context)
      console.log(payload)
      return await axios.post("api/v1/care/checkin", payload).then(
        resp => {
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