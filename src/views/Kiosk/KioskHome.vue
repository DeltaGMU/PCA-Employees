<template>
    <div class="container">
        <NavBar/>
        <div class="d-flex justify-content-center">
            <div class="mt-5 col-xl-8 col-lg-8 col-md-10 col-11">
                <div>
                    <div class="text-center">
                        <img src="@/assets/pcawhite.svg" class="mb-4 homeLogo" alt="PCA Lion Logo">
                        <h1 class="text-blue">Are you a PCA employee or parent?</h1>
                    </div>
                    <div class="d-flex mt-5">
                        <div class="me-auto pe-2 pt-2 pb-2">
                            <button class="btn blueBtn" style="font-size: 1.7rem; padding: 1rem;" @click="employeeLogin">Employee</button>
                        </div>
                        <div class="ps-2 pt-2 pb-2">
                            <button class="btn blueBtn" style="font-size: 1.7rem; padding: 1rem;" @click="studentFinder">Parent</button>
                        </div>
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
