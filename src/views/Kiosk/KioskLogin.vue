<template>
  <div>
    
    <div class="container">
        <NavBar :current_page="currentPage"/>
        <div class="row justify-content-center">

            <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12 col-12">

                <div class="loginContainer">
    
                    <div class="text-center">
                        <h1 class="text-beige loginHeader">Kiosk Login</h1>
                    </div>

                    <div v-if="showError" class="alert alert-danger ">Invalid login credentials. Please try again.</div>
                    
                    <form class="needs-validation" id="loginForm" novalidate>
                        <div class="mb-3">
                          <label for="username" class="text-beige formLabel">Enter Employee ID or Email Address</label>
                          <input type="text" class="form-control form-control-lg textBox" name="username" id="usernameField" v-model="usernameInput" required>
                          <div class="invalid-feedback">
                              Please provide an employee ID or email address.
                          </div>
                        </div>
                        <div class="mb-3">
                          <label for="password" class="text-beige formLabel">Enter Password</label>
                          <input type="password" class="form-control form-control-lg textBox" name="password" id="passwordField" v-model="passwordInput" required>
                          <div class="invalid-feedback">
                              Please provide a password.
                          </div>
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
  name: "KioskLogin",
  components: {
    NavBar,
  },
  data() {
    return {
      currentPage: "/kiosk/login",

      usernameInput: "",
      passwordInput: "",
      isLoading: false,
      errorMessage: "",
      showError: false,

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
                      if(this.getRole == "administrator" || this.getRole == "employee") {
                        this.$router.push("/kiosk/checkinmultiple").catch((err) => console.log(err));
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
    }
  }
};
</script>