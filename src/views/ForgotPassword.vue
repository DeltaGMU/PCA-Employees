<template>
  <div>
    
    <div class="container">
        <NavBar :current_page="currentPage"/>
        <div class="d-flex justify-content-center">
            <div class="modal fade" id="forgotModal" tabindex="-1" aria-labelledby="forgotModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">                    
                        <div class="modal-header" v-if="submissionSuccess">
                            <h5 class="modal-title">Reset Code Sent!</h5>
                            <button type="button" class="btn-close" aria-label="Close" @click="goToResetPage"></button>
                        </div>
                        <div class="modal-header" v-else>
                            <h5 class="modal-title">Reset Request Failed!</h5>
                            <button type="button" class="btn-close" aria-label="Close"  @click="closeModal"></button>
                        </div>
                        <div class="modal-body" v-if="submissionSuccess">
                            Successfully submitted password reset request. Your primary email should receive a reset code soon!
                        </div>
                        <div class="modal-body" v-else>
                            Encountered an error submitting the password reset request. Please try again and ensure the Employee ID is filled correctly.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn" :class="submissionSuccess ? 'btn-success' : 'btn-danger'" @click="goToResetPage">OK</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show" id="backdrop" style="display: none;"></div>

            <div class="col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-11">
                <div class="loginContainer">

                    <div class="text-center">
                        <h1 class="text-beige loginHeader">Forgot Password</h1>
                    </div>

                    <div v-if="showError" class="alert alert-danger ">The provided Employee ID is incorrect. Please try again.</div>
                    
                    <form class="needs-validation" id="forgotPasswordForm" novalidate>
                        <div class="mb-3">
                            <label for="username" class="text-beige formLabel">Enter Employee ID</label>
                            <input type="text" class="form-control form-control-lg textBox" name="username" id="employeeIDField" maxlength="100" v-model="employeeIDInput" required>
                            <div class="pt-2 pb-2">
                              <a class="text-beige fst-italic text-decoration-none" @click="goToResetPageIfCodeExists">Already have a reset code?</a>
                            </div>
                            <div class="invalid-feedback">
                              Please provide a valid Employee ID.
                            </div>
                        </div>

                        <div class="twoBtnCol">
                            <button type="button" class="mt-3 btn formBtn smallerScreenBtn" @click="returnToLogin">Cancel</button>
                            <button type="button" class="mt-3 btn formBtn smallerScreenBtn" id="submitForgotBtn" @click="submit">
                              <span v-show="!isLoading"> Send Reset Code </span>
                              <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                              <span v-show="isLoading"> Loading... </span>
                            </button>
                        </div>
                    </form>
                </div>
    
            </div>
            
        </div>

    </div>
  </div>
</template>

<script>
  import NavBar from "@/components/NavBar.vue";

  export default {
    name: "ForgotPassword",
    components: {
      NavBar,
    },
    data() {
      return {
        currentPage: "/forgotpassword",

        forgotPasswordBtn: null,
        employeeIDInput: "",
        showError: false,
        isLoading: false,
        submissionSuccess: false,
      };
    },
    watch: {
      employeeIDInput(value) {
        if (value.length > 0) {
          this.showError = false;
        }
      },
    },
    mounted() {
      this.forgotPasswordBtn = document.getElementById("submitForgotBtn")
      this.forgotPasswordBtn.addEventListener('click', 
          function (event) {
              let form = document.getElementById("forgotPasswordForm")
              if (!form.checkValidity()) {
                  event.preventDefault()
                  event.stopPropagation()
              }
              form.classList.add('was-validated')
          }, false);
      this.clickEvent = new Event('click');

      let employeeIDField = document.getElementById("employeeIDField")
      employeeIDField.addEventListener('keyup', function(event) {
        if (event.key == 13 || event.keyCode == 13) {
          event.preventDefault();
          document.getElementById("submitForgotBtn").click();
        }
      })
    },
    methods: {
      openModal() {
        document.getElementById("backdrop").style.display = "block"
        document.getElementById("forgotModal").style.display = "block"
        document.getElementById("forgotModal").classList.add("show")
      },

      closeModal() {
        document.getElementById("backdrop").style.display = "none"
        document.getElementById("forgotModal").style.display = "none"
        document.getElementById("forgotModal").classList.remove("show")
      },
      async submit() {
        if (!this.isLoading && this.employeeIDInput.trim().length > 0) {
          this.isLoading = true
          let payload = {
            employee_id: this.employeeIDInput.trim()
          }
          await this.$store.dispatch("ForgotPassword", payload).then(resp => {
            if (resp && resp === true) {
              this.isLoading = false;
              this.employeeIDInput = "";
              this.submissionSuccess = true;
              this.openModal();
            }
            else {
              this.showError = true;
              this.employeeIDInput = "";
              this.isLoading = false;
              this.submissionSuccess = false;
              this.openModal();
            }
          }).catch(err => {
            console.log(err)
            this.showError = true;
            this.employeeIDInput = "";
            this.isLoading = false;
            this.submissionSuccess = false;
            this.openModal();
          })
        }
      },
      goToResetPage() {
        if (this.submissionSuccess) {
          this.$router.push('/resetpassword').catch((err) => console.log(err));
        }
        else {
          this.closeModal();
        }
      },
      returnToLogin() {
        this.$router.push("/").catch((err)=> console.log(err));
      },
      goToResetPageIfCodeExists() {
        this.$router.push("/resetpassword").catch((err) => console.log(err));
      }
    },
  };
</script>