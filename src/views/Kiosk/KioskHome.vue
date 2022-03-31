<template>
    <div class="container">
        <NavBar/>
        <div class="row justify-content-center">
            <div class="mt-5 col-xl-8 col-lg-8 col-md-10 col-sm-12">
                <div class="homeContainer">
                    <div class="text-center">
                        <img src="../../assets/pcawhite.svg" class="mb-4 homeLogo" alt="PCA Lion Logo">
                        <h1 class="text-blue">Are you a PCA employee or parent?</h1>
                    </div>
                    <div class="mt-5 twoBtnCol">
                        <button class="btn blueBtn" @click="employeeLogin">Employee</button>
                        <button class="btn blueBtn" @click="studentFinder">Parent</button>
                    </div>
                </div>  
            </div>
        </div>        
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "Home",
  components: {
    NavBar,
  },
  methods: {
    employeeLogin() {
        this.$router.push("/kiosk/login").catch((err) => console.log(err));
    },
    studentFinder() {
        this.$router.push("/kiosk/studentfinder").catch((err) => console.log(err));
    }
  },
};
</script>
