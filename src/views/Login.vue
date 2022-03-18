<template>
  <div>
    
    <div class="container">

        <div class="row justify-content-center">

            <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12 col-12">

                <div class="loginContainer">
    
                    <div class="text-center">
                        <h1 class="text-beige loginHeader">Log In</h1>
                    </div>

                    <p v-if="showError" class="error text-center formText">The login credentials you entered are incorrect. Please try again.</p>
                    
                    <form @submit.prevent="submit" novalidate>
                        <div class="mb-3">
                            <label for="username" class="text-beige">Enter Employee ID or Email Address</label>
                            <input type="text" class="form-control form-control-lg textBox" name="username" v-model="form.username" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="text-beige">Enter Password</label>
                            <input type="password" class="form-control form-control-lg textBox" name="password" v-model="form.password" required>
                        </div>
                        <div class="text-center formText">
                            <a class="text-beige" @click="forgotPassword">Forgot password? Click here to reset.</a>
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
    ...mapActions(["LogIn"]),
    async submit() {
      const User = new FormData();
      User.append("username", this.form.username);
      User.append("password", this.form.password);
      try {
          await this.LogIn(User);
          this.$router.push("/timesheet").catch((err) => console.log(err));
          throw "incorrect information"
      } catch (error) {
        this.showError = true;
      }
    },
    forgotPassword() {
      this.$router.push("/forgotpassword").catch((err) => console.log(err));
    }
  },
};
</script>