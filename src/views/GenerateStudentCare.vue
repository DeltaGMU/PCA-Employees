<template>
    <div class = "container">
        <NavBar :signed_in= "signedIn" :name= "empName" :role= "empRole" :current_page= "currentPage"/>
        <div class = "d-flex">
            <div class = "p-2">
                <Sidebar> </Sidebar>
            </div>

            <div class= "p-2">
            
            <form>
                <div class="p-2 mb-2">
                            <label class="text-blue formLabel">Pick a Reporting Period</label>
                        </div>
                <div class=" p-2 mb-3 input-group">
                        <input v-model = "rangeStart" type="date" class="form-control textBox" id="rangeDateStart" required>
                        <span class="input-group-text">to</span>
                        <input v-model = "rangeEnd" type="date" class="form-control textBox" id="rangeDateEnd" required>
                        
                </div>
                <button type="button" class="btn blueBtn"  @click="submitReportingPeriod()">
                    Submit
                </button>
            </form>

            <div v-if="isSubmitted == true">
                <div class = "p-2" >
                    <h2>Reporting Period for Student Care: </h2> 
                    <h3> {{ formatRange(rangeStart, rangeEnd) }}</h3>
                </div>

                <div class = "p-2" >
                    <img class = "float-start w-50 h-75" v-bind:src= "report" style = "display: inline-block, position: absolute" />
                
                    <button id= "btn blueBtn" class="btn blueBtn">
                        Download .PDF
                    </button>

                    <br> <br>

                    <button id= "btn blueBtn" class="btn blueBtn">
                        Download .CSV 
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from "@/components/Sidebar.vue";
    import NavBar from "@/components/NavBar.vue";

    export default {
        components: {
            Sidebar,
            NavBar
        },
        data() {
            
            return {
                report: 'https://www.slideteam.net/media/catalog/product/cache/1280x720/c/o/competitive_landscape_analysis_report_template_example_ppt_presentation_Slide01.jpg',
                rangeStart: '',
                rangeEnd: '',
                isSubmitted: false,

                signedIn: this.$store.getters.isAuthenticated,
                empName: this.$store.getters.StateName,
                empRole: this.$store.getters.StateRole,
                currentPage: "/generatestudentcare",
            }
        },
    
        methods: {
            formatDate(rangeDate){
                let newDate = new Date(rangeDate).toISOString().slice(0, 10);
                let formatedDate = newDate.slice(5,7) + "/" + newDate.slice(8, 10) + "/" + newDate.slice(0,4);
                return formatedDate;
            },

            formatRange(rangeStart, rangeEnd){
                let formatedStart = this.formatDate(rangeStart); 
                let formatedEnd = this.formatDate(rangeEnd);
                let formatedRange = formatedStart + " to " + formatedEnd;
                return formatedRange;
            },

            submitReportingPeriod(){
                this.isSubmitted = true;
            }
        }
}
</script>
