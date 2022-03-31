<template>
  <div>
    
    <div class="container">
        <NavBar/>
        <div class="row justify-content-center">

            <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12 col-12">

                <div class="loginContainer">
    
                    <div class="text-center">
                        <h1 class="text-beige loginHeader">Log In</h1>
                    </div>

                    <div v-if="showError" class="alert alert-danger ">Invalid login credentials. Please try again.</div>
                    
                    <form @submit.prevent="submit" novalidate>
                        <div class="mb-3">
                            <label for="username" class="text-beige formLabel">Enter Employee ID or Email Address</label>
                            <input type="text" class="form-control form-control-lg textBox" name="username" v-model="form.username" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="text-beige formLabel">Enter Password</label>
                            <input type="password" class="form-control form-control-lg textBox" name="password" v-model="form.password" required>
                        </div>
                        <div class="text-center formText">
                            <a class="text-beige" @click="forgotPassword">Forgot password? Click here to get a reset code.</a>
                        </div>
                        <div class="text-center formText">
                            <a class="text-beige" @click="resetPassword">Already have a reset code? Click here to reset.</a>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="mt-3 btn formBtn">Sign In</button>
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
        form: {
          username: "",
          password: "",
        },
        showError: false
      };
    },
    computed: {
      getRole: function() {
        return this.$store.getters.StateRole;
      },
      ...mapGetters({Name: "StateRole"}),
    },
    methods: {
      ...mapActions(["LogIn", "GetRole", "GetUserInfo", "GetName"]),
      
      async submit() {
        const User = new FormData();
        User.append("username", this.form.username);
        User.append("password", this.form.password);
        try {
            await this.LogIn(User);
            await this.GetRole();
            await this.GetName();
            await this.GetUserInfo();
            if(this.getRole == "administrator") {
              this.$router.push("/admindashboard").catch((err) => console.log(err));
            }
            else if (this.getRole == "employee"){
              this.$router.push("/timesheet").catch((err) => console.log(err));
            }
        } catch (error) {
          this.showError = true;
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