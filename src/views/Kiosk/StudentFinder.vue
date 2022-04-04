<template>
  <div>
      <div class="container">
        <NavBar :current_page="currentPage"/>
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-8 col-md-10 col-sm-12">

                <div>
    
                    <div class="text-center">
                        <h1 class="text-blue loginHeader">Student Before and After Care Service</h1>
                    </div>

                    <div v-if="showError" class="alert alert-danger ">Invalid student ID: {{ this.incorrect_id }}. Please try again.</div>
                    
                    <div>
                        <div class="mb-3  text-center">
                            <label for="student_id_input" class="text-blue">Enter a Student ID</label>
                            <input type="text" class="form-control form-control-lg textBox text-center" name="student_id_input" autocomplete="off" id="student_id_input" v-model="student_id" required>
                        </div>

                        <div class="d-flex justify-content-center">
                          <button type="button" id="submitStudentFinderBtn" :disabled="this.student_id.trim().length === 0" :class="this.student_id.trim().length === 0 ? 'btn-secondary' : 'formBtn blueBorder'" class="mt-3 btn formBtn smallerScreenBtn" @click="checkStudentInfo">
                              <span v-show="!isLoading"> Submit </span>
                              <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                              <span v-show="isLoading"> Loading... </span>
                          </button>
                        </div>
                    </div>
                </div>
    
            </div>
            
        </div>

      </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "StudentFinder",
  components: {
    NavBar,
  },
  data() {
    return {
      currentPage: "/kiosk/studentfinder",

      incorrect_id: "",
      student_id: "",
      showError: false,
      isLoading: false,
    };
  },
  watch: {
    student_id(value) {
      if (value.trim().length > 0) {
        this.showError = false;
      }
    }
  },
  mounted() {
    let studentIDInput = document.getElementById("student_id_input")
    studentIDInput.addEventListener('keyup', function(event) {
      if (event.key == 13 || event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("submitStudentFinderBtn").click();
      }
    })
  },
  methods: {
    ...mapActions(["GetStudentInfoKiosk"]),
    checkStudentInfo() {
      this.student_id = this.student_id.trim()
      if (this.student_id.length > 0 && !this.isLoading) {
        this.isLoading = true;
        this.GetStudentInfoKiosk(this.student_id).then(resp => {
          if (resp !== null) {
            this.$router.push({name: "CareOptions", params: {student_info: resp}}).catch((err) => console.log(err));
            this.showError = false;
            this.incorrect_id = "";
            this.student_id = "";
          }
          else {
            this.showError = true;
            this.incorrect_id = this.student_id;
          }
          this.isLoading = false;
        }).catch(err => {
          console.log(err);
          this.showError = true;
          this.incorrect_id = this.student_id;
          this.student_id = "";
          this.isLoading = false;
        });
      }
    },
    goToKioskHome() {
      this.$router.push("/kiosk")
    }
  },
};
</script>
