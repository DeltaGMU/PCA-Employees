<template>
  <div>
    
    <div class="container">

        <div class="row justify-content-center">

            <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12 col-12">

                <div class="loginContainer">
    
                    <div class="text-center">
                        <h1 class="text-beige loginHeader">Forgot Password</h1>
                    </div>

                    <p v-if="showError" class="error text-center formText">The Employee ID was not found</p>
                    
                    <form @submit.prevent="submit">
                        <div class="mb-3">
                            <label for="username" class="text-beige">Enter Employee ID</label>
                            <input type="text" class="form-control form-control-lg textBox" name="username" v-model="form.username" required>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn formBtn">Send Reset Request</button>
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
  name: "ForgotPassword",
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
          this.$router.push("/resetpassword").catch((err) => console.log(err));
          throw "incorrect information"
      } catch (error) {
        this.showError = true;
      }
    },
  },
};
</script>