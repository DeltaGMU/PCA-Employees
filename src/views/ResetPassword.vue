<template>
  <div>
    
    <div class="container">
        <NavBar />

        <div class="row justify-content-center">

            <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12 col-12">

                <div class="loginContainer">
    
                    <div class="text-center">
                        <h1 class="text-beige loginHeader">Reset Password</h1>
                    </div>

                    <p v-if="showError" class="error text-center formText">The Employee ID was not found</p>
                    
                    <form @submit.prevent="submit">
                        <div class="mb-3">
                            <label for="new_password" class="text-beige">Enter New Password</label>
                            <input type="text" class="form-control form-control-lg textBox" name="new_password" v-model="form.new_password" required>
                        </div>
                        <div class="mb-3">
                            <label for="reset_token" class="text-beige">Enter Reset Code</label>
                            <input type="text" class="form-control form-control-lg textBox" name="reset_token" v-model="form.reset_token" required>
                        </div>
                        <div class="twoBtnCol">
                            <button class="mt-3 btn formBtn smallerScreenBtn" type="button" @click="returnToLogin">Cancel</button>
                            <button class="mt-3 btn formBtn smallerScreenBtn" type="submit">Reset Password</button>
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
  import NavBar from "@/components/NavBar.vue";

  export default {
    name: "ResetPassword",
    components: {
      NavBar,
    },
    data() {
      return {
        form: {
          new_password: "",
          reset_token: "",
        },
        showError: false
      };
    },
    methods: {
      ...mapActions(["LogIn"]),
      async submit() {
        const User = new FormData();
        User.append("new_password", this.form.new_password);
        User.append("reset_token", this.form.reset_token);
        try {
            this.$router.push("/resetpassword").catch((err) => console.log(err));
            throw "incorrect information"
        } catch (error) {
          this.showError = true;
        }
      },
      returnToLogin() {
        this.$router.push("/").catch((err)=> console.log(err));
      },
    },
  };
</script>