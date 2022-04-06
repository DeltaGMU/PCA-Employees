<template>
  <div>
    
    <div class="container">
        <NavBar :current_page="currentPage"/>
        <div class="d-flex justify-content-center">

            <div class="col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-11">

                <div class="loginContainer">
    
                    <div class="text-center">
                        <h1 class="text-beige loginHeader">Log In</h1>
                    </div>

                    <div v-if="showError" class="alert alert-danger ">{{ errorMessage }}</div>
                    
                    <form class="needs-validation" id="loginForm" novalidate>
                        <div class="mb-3">
                            <label for="username" class="text-beige formLabel">Enter Employee ID or Email Address</label>
                            <input type="text" id="usernameField" class="form-control form-control-lg textBox" name="username" v-model="usernameInput" required>
                            <div class="invalid-feedback">
                                Please provide an employee ID or email address.
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="text-beige formLabel">Enter Password</label>
                            <input type="password" id="passwordField" class="form-control form-control-lg textBox" name="password" v-model="passwordInput" required>
                            <div class="invalid-feedback">
                                Please provide a password.
                            </div>
                        </div>
                        <div class="text-center formText">
                            <a class="text-beige" @click="forgotPassword">Forgot password? Click here to get a reset code.</a>
                        </div>
                        <div class="text-center formText">
                            <a class="text-beige" @click="resetPassword">Already have a reset code? Click here to reset.</a>
                        </div>

                        <div class="d-flex justify-content-center">
                          <button type="button" id="submitLoginBtn" class="mt-3 btn formBtn" @click="submit">
                              <span v-show="!isLoading"> Sign In </span>
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
  import { mapActions, mapGetters } from "vuex";
  import NavBar from "@/components/NavBar.vue";

  export default {
    name: "Login",
    components: {
      NavBar,
    },
    data() {
      return {
        currentPage: "/",

        usernameInput: "",
        passwordInput: "",
        isLoading: false,
        showError: false,
        errorMessage: "",

        loginButton: null,
        clickEvent: null,
      };
    },
    computed: {
      getRole: function() {
        return this.$store.getters.StateRole;
      },
      ...mapGetters({Name: "StateRole"}),
    },
    watch: {
      usernameInput(value) {
        if (value.length > 0) {
          this.showError = false;
        }
      },
      passwordInput(value) {
        if (value.length > 0) {
          this.showError = false;
        }
      }
    },
    mounted() {
      this.loginButton = document.getElementById("submitLoginBtn")
      this.loginButton.addEventListener('click', 
          function (event) {
              let form = document.getElementById("loginForm")
              if (!form.checkValidity()) {
                  event.preventDefault()
                  event.stopPropagation()
              }
              form.classList.add('was-validated')
          }, false);
      this.clickEvent = new Event('click');

      let usernameField = document.getElementById("usernameField")
      usernameField.addEventListener('keyup', function(event) {
        if (event.key == 13 || event.keyCode == 13) {
          event.preventDefault();
          document.getElementById("submitLoginBtn").click();
        }
      })
      let passwordField = document.getElementById("passwordField")
      passwordField.addEventListener('keyup', function(event) {
        if (event.key == 13 || event.keyCode == 13) {
          event.preventDefault();
          document.getElementById("submitLoginBtn").click();
        }
      })
    },
    methods: {
      ...mapActions(["LogIn", "GetRole", "GetUserInfo", "GetName"]),
      clearAllFields() {
        this.usernameInput = "",
        this.passwordInput =  ""
      },
      async submit() {
        if (!this.isLoading) {
          this.isLoading = true;
          const User = new FormData();
          User.append("username", this.usernameInput);
          User.append("password", this.passwordInput);

          if (this.usernameInput.length > 0 && this.passwordInput.length > 0) {
            await this.LogIn(User).then(resp => {
              if(resp === 0) {
                this.GetRole().then(resp => {
                  if (resp === false) {
                    this.errorMessage = "Unable to retrieve employee role. Please contact a system administrator."
                    this.showError = true;
                    this.isLoading = false;
                    this.clearAllFields();
                    return;
                  }
                }).then(() => {
                  this.GetName().then(resp => {
                    if (resp === false) {
                      this.errorMessage = "Unable to retrieve employee name. Please contact a system administrator."
                      this.showError = true;
                      this.isLoading = false;
                      this.clearAllFields();
                      return;
                    }
                  }).then(() => {
                    this.GetUserInfo().then(resp => {
                      if (resp === false) {
                        this.errorMessage = "Unable to retrieve user information. Please contact a system administrator."
                        this.showError = true;
                        this.isLoading = false;
                        this.clearAllFields();
                        return;
                      }
                    }).then(() => {
                      if(this.getRole == "administrator") {
                        this.$router.push("/admindashboard").catch((err) => console.log(err));
                      }
                      else if (this.getRole == "employee"){
                        this.$router.push("/timesheet").catch((err) => console.log(err));
                      }
                    });
                  })
                });
              }
              else {
                this.errorMessage = "Invalid login credentials."
                this.showError = true;
                this.isLoading = false;
                this.clearAllFields();
                return;
              }
            }).catch(err => {
              console.log(err)
              this.errorMessage = "Network connection error."
              this.showError = true;
              this.isLoading = false;
              this.clearAllFields();
            });
          }
          this.isLoading = false;
        }
      },
      forgotPassword() {
        this.$router.push("/forgotpassword").catch((err) => console.log(err));
      },
      resetPassword() {
        this.$router.push("/resetpassword").catch((err) => console.log(err));
      }
    },
  };
</script>