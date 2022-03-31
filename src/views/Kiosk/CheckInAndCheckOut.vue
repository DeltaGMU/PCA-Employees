<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="mt-5 col-xl-10 col-lg-10 col-md-10 col-sm-12">
                <div class="homeContainer">
                    <div class="text-center">
                        <img src="../../assets/pcawhite.svg" class="mb-4 homeLogo" alt="PCA Lion Logo">
                        <h1 class="text-blue">Please choose one of the care options shown below.</h1>
                    </div>
                    <div class="mt-5 twoBtnCol">
                        <button class="btn blueBtn" @click="beforeCare">Check In</button>
                        <button class="btn blueBtn" @click="afterCare">Check Out</button>
                    </div>
                </div>  
            </div>
        </div>        
    </div>
</template>

<script>
export default {
  name: "CheckInAndCheckOut",
  components: {},
  methods: {
    beforeCare() {
        this.$router.push("/").catch((err) => console.log(err));
    },
    afterCare() {
        this.$router.push("/").catch((err) => console.log(err));
    }
  },
};
</script>