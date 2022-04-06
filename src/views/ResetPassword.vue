<template>
  <div>
    
    <div class="container">
        <NavBar :current_page="currentPage"/>

        <div class="d-flex justify-content-center">
            <div class="modal fade" id="resetModal" tabindex="-1" aria-labelledby="resetModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">                    
                        <div class="modal-header" v-if="submissionSuccess">
                            <h5 class="modal-title">Password Reset Successful!</h5>
                            <button type="button" class="btn-close" aria-label="Close" @click="returnToLogin"></button>
                        </div>
                        <div class="modal-header" v-else>
                            <h5 class="modal-title">Password Reset Failed!</h5>
                            <button type="button" class="btn-close" aria-label="Close"  @click="closeModal"></button>
                        </div>
                        <div class="modal-body" v-if="submissionSuccess">
                            Your account password has been successfully updated!
                        </div>
                        <div class="modal-body" v-else>
                            Encountered an error updating your account password. Please try again later.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn" :class="submissionSuccess ? 'btn-success' : 'btn-danger'" @click="returnToLogin">OK</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show" id="backdrop" style="display: none;"></div>

            <div class="col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-11">

                <div class="loginContainer">
    
                    <div class="text-center">
                        <h1 class="text-beige loginHeader">Reset Password</h1>
                    </div>
                    
                    <form class="needs-validation" id="resetForm">
                        <div class="mb-3">
                            <label for="new_password" class="formLabel text-beige">Enter New Password</label>
                            <input type="password" class="form-control form-control-lg textBox" name="new_password" id="newPasswordField" maxlength="100" v-model="newPasswordInput" required>
                            <div class="invalid-feedback">
                              Please provide a new valid password under 100 characters.
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="reset_token" class="formLabel text-beige">Enter Reset Code</label>
                            <input type="text" class="form-control form-control-lg textBox" name="reset_token" id="resetTokenField" maxlength="8" v-model="resetTokenInput" required>
                            <div class="invalid-feedback">
                              Please provide the 8-digit reset code sent to your email.
                            </div>
                        </div>
                        <div class="twoBtnCol">
                            <button class="mt-3 btn formBtn smallerScreenBtn" type="button" @click="$router.push('/').catch(err => console.log(err))">Cancel</button>
                            <button class="mt-3 btn formBtn smallerScreenBtn" type="button" id="submitResetBtn" @click="submit">
                              <span v-show="!isLoading"> Reset Password </span>
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
    name: "ResetPassword",
    components: {
      NavBar,
    },
    data() {
      return {
        currentPage: "/resetpassword",
        newPasswordInput: "",
        resetTokenInput: "",
        
        submissionSuccess: false,
        isLoading: false,
        submitResetBtn: null,
      };
    },
    mounted() {
      this.submitResetBtn = document.getElementById("submitResetBtn")
      this.submitResetBtn.addEventListener('click', 
          function (event) {
              let form = document.getElementById("resetForm")
              if (!form.checkValidity()) {
                  event.preventDefault()
                  event.stopPropagation()
              }
              form.classList.add('was-validated')
          }, false);
      this.clickEvent = new Event('click');

      let newPasswordField = document.getElementById("newPasswordField")
      newPasswordField.addEventListener('keyup', function(event) {
        if (event.key == 13 || event.keyCode == 13) {
          event.preventDefault();
          document.getElementById("submitResetBtn").click();
        }
      })
      let resetTokenField = document.getElementById("resetTokenField")
      resetTokenField.addEventListener('keyup', function(event) {
        if (event.key == 13 || event.keyCode == 13) {
          event.preventDefault();
          document.getElementById("resetTokenField").click();
        }
      })
    },
    methods: {
      openModal() {
        document.getElementById("backdrop").style.display = "block"
        document.getElementById("resetModal").style.display = "block"
        document.getElementById("resetModal").classList.add("show")
      },
      closeModal() {
        document.getElementById("backdrop").style.display = "none"
        document.getElementById("resetModal").style.display = "none"
        document.getElementById("resetModal").classList.remove("show")
      },
      clearFields() {
        this.newPasswordInput = ""
        this.resetTokenInput = ""
      },
      async submit() {
        if (!this.isLoading && this.newPasswordInput.trim().length > 0 && this.resetTokenInput.trim().length > 0) {
          this.isLoading = true
          let payload = {
            new_password: this.newPasswordInput.trim(),
            reset_code: this.resetTokenInput.trim()
          }
          await this.$store.dispatch("ResetPassword", payload).then(resp => {
            if (resp && resp === true) {
              this.isLoading = false;
              this.clearFields()
              this.submissionSuccess = true;
              this.openModal()
            }
            else {
              this.clearFields()
              this.isLoading = false;
              this.submissionSuccess = false;
              this.openModal();
            }
          }).catch(err => {
            console.log(err)
            this.clearFields()
            this.isLoading = false;
            this.submissionSuccess = false;
            this.openModal();
          })
        }
      },
      returnToLogin() {
        if (this.submissionSuccess) {
          this.$router.push("/").catch((err)=> console.log(err));
        }
        else {
          this.closeModal();
        }
      },
    },
  };
</script>