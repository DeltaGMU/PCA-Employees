<template>
  <div>
    
    <div class="container">
        <NavBar/>
        <div class="row justify-content-center">

            <div class="col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-11">

                <div class="loginContainer">
    
                    <div class="text-center">
                        <h1 class="text-beige loginHeader">Log In</h1>
                    </div>

                    <div v-if="showError" class="alert alert-danger ">{{ errorMessage }}</div>
                    
                    <form @submit.prevent="submit" novalidate>
                        <div class="mb-3">
                            <label for="username" class="text-beige formLabel">Enter Employee ID or Email Address</label>
                            <input type="text" class="form-control form-control-lg textBox" name="username" v-model="usernameInput" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="text-beige formLabel">Enter Password</label>
                            <input type="password" class="form-control form-control-lg textBox" name="password" v-model="passwordInput" required>
                        </div>
                        <div class="text-center formText">
                            <a class="text-beige" @click="forgotPassword">Forgot password? Click here to get a reset code.</a>
                        </div>
                        <div class="text-center formText">
                            <a class="text-beige" @click="resetPassword">Already have a reset code? Click here to reset.</a>
                        </div>

                        <div class="d-flex justify-content-center">
                          <button type="submit" id="submitLoginBtn" class="mt-3 btn formBtn">
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
        usernameInput: "",
        passwordInput: "",
        isLoading: false,
        showError: false,
        errorMessage: "",
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

          await this.LogIn(User).then(resp => {
            if (resp >= 500) {
              this.errorMessage = "Server error encountered. Please contact a system administrator."
              this.showError = true;
              this.isLoading = false;
              this.clearAllFields();
              return;
            }
            else if (resp >= 400) {
              this.errorMessage = "Invalid login credentials. Please try again."
              this.showError = true;
              this.isLoading = false;
              this.clearAllFields();
              return;
            }
            else if(resp === 0) {
              this.GetRole().then(resp => {
                if (resp === false) {
                  this.errorMessage = "Unable to retrieve employee role. Please contact a system administrator."
                  this.showError = true;
                  this.isLoading = false;
                  this.clearAllFields();
                  return;
                }
              });
              this.GetName().then(resp => {
                if (resp === false) {
                  this.errorMessage = "Unable to retrieve employee name. Please contact a system administrator."
                  this.showError = true;
                  this.isLoading = false;
                  this.clearAllFields();
                  return;
                }
              });
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
            }
            else {
              this.errorMessage = "Network connection error."
              this.showError = true;
              this.isLoading = false;
              this.clearAllFields();
              return;
            }
          }).catch(err => {
            console.log(err)
            if (err.status === 400) {
              this.errorMessage = "Invalid credentials."
              this.showError = true;
              this.isLoading = false;
              this.clearAllFields();
              return
            }
            this.errorMessage = "Network connection error."
            this.showError = true;
            this.isLoading = false;
            this.clearAllFields();
          });
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