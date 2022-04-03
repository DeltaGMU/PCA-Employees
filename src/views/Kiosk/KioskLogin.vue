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
    ...mapActions(["LogIn"]),
    ...mapActions(["GetRole"]),
    
    async submit() {
      const User = new FormData();
      User.append("username", this.form.username);
      User.append("password", this.form.password);
      try {
          await this.LogIn(User);
          await this.GetRole();
          await this.$store.dispatch("GetName");
          if(this.getRole == "administrator" || this.getRole == "employee") {
            this.$router.push("/kiosk/checkinmultiple").catch((err) => console.log(err));
          }
      } catch (error) {
        this.showError = true;
      }
    },
  },
};
</script>