<template>
  <div>
      <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-8 col-md-10 col-sm-12">

                <div>
    
                    <div class="text-center">
                        <h1 class="text-blue loginHeader">Student Before and After Care Service</h1>
                    </div>

                    <div v-if="showError" class="alert alert-danger ">Invalid student ID: {{ this.incorrect_id }}. Please try again.</div>
                    
                    <div class="needs-validation" novalidate>
                        <div class="mb-3  text-center">
                            <label for="student_id_input" class="text-blue">Enter a Student ID</label>
                            <input type="text" class="form-control form-control-lg textBox text-center" name="student_id_input" autocomplete="off" id="student_id_input" v-model="student_id" required>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn blueBtn" @click="checkStudentInfo">Submit</button>
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
      signedIn: this.$store.getters.isAuthenticated,
      empName: this.$store.getters.StateName,
      empRole: this.$store.getters.StateRole,
      currentPage: "/kiosk/studentfinder",

      incorrect_id: "",
      student_id: "",
      showError: false
    };
  },
  watch: {
    student_id(value) {
      if (value.length > 0) {
        this.showError = false;
      }
    }
  },
  methods: {
    ...mapActions(["GetStudentInfoKiosk"]),
    checkStudentInfo() {
      console.log(this.student_id)
      this.GetStudentInfoKiosk(this.student_id).then(() => {
        this.$router.push("/careoptions").catch((err) => console.log(err));
        this.showError = false;
        this.incorrect_id = "";
        this.student_id = "";
      }).catch((err) => {
        console.log(err);
        this.showError = true;
        this.incorrect_id = this.student_id;
        this.student_id = "";
      });
    },
  },
};
</script>
