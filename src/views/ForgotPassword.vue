<template>
  <div>
    
    <div class="container">

        <div class="row justify-content-center">

            <div class="col-xl-7 col-lg-8 col-md-11 col-sm-12 col-12">

                <div class="loginContainer">
    
                    <div class="text-center">
                        <h1 class="text-beige loginHeader">Forgot Password</h1>
                    </div>

                    <div v-if="showError" class="alert alert-danger ">Employee ID not found. Please try again.</div>
                    
                    <form @submit.prevent="submit" novalidate>
                        <div class="mb-3">
                            <label for="username" class="text-beige formLabel">Enter Employee ID</label>
                            <input type="text" class="form-control form-control-lg textBox" name="username" v-model="form.username" required>
                        </div>
                        <div class="twoBtnCol">
                            <button class="btn formBtn" @click="returnToLogin">Cancel</button>
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
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      const User = new FormData();
      User.append("username", this.form.username);
      try {
          await this.LogIn(User);
          this.$router.push("/resetpassword").catch((err) => console.log(err));
      } 
      catch (error) {
        this.showError = true;
      }
    },
    returnToLogin() {
      this.$router.push("/").catch((err)=> console.log(err));
    }
  },
};
</script>