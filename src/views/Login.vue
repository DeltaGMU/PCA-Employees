<template>
  <div>
    
    <div class="container">

        <div class="row justify-content-center">

            <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12">

                <div class="loginContainer">
    
                    <div class="text-center">
                        <h1 class="text-beige loginHeader">Log In</h1>
                        <router-link to="/timesheet">Timesheet</router-link>
                    </div>

                    <p v-if="showError" id="error" class="invalid-feedback">Employee ID, Email, or Password is incorrect</p>
                    
                    <form @submit.prevent="submit" class="needs-validation" novalidate>
                        <div class="mb-3">
                            <label for="username" class="text-beige">Enter Employee ID or Email Address</label>
                            <input type="text" class="form-control form-control-lg textBox" name="username" v-model="form.username" required>
                            <div class="invalid-feedback">
                                Please enter an employee ID or email address
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="text-beige">Enter Password</label>
                            <input type="password" class="form-control form-control-lg textBox" name="password" v-model="form.password" required>
                            <div class="invalid-feedback">
                                Please enter a password
                            </div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn formBtn">Sign In</button>
                        </div>
                    </form>
                </div>
    
            </div>
            
        </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["LogIn", "GetUserInfo"]),
    async submit() {
      const User = new FormData();
      User.append("username", this.form.username);
      User.append("password", this.form.password);
      try {
          await this.LogIn(User);
          //this.$router.push({name: "Timesheet"}).catch(() => {});
          this.$router.push("/timesheet").catch((err) => console.log(err));
          this.showError = false;
      } catch (error) {
        this.showError = true;
      }
    },
  },
};
</script>