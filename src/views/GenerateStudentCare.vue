<template>
    <div class = "container">
        <NavBar :signed_in= "signedIn" :name= "empName" :role= "empRole" :current_page= "currentPage"/>
        <div class = "d-flex">
            <div class = "p-2">
                <Sidebar/>
            </div>

            <div class= "p-2">
                <div class="p-2 flex-grow-1">
                    <h1 class="text-blue">Generate Student Care Report</h1>
                    <label class="form-check-label" for = "reportStartDateInput">Pick a Reporting Period</label>
                        </div>
                    <div class="pb-1 input-group">
                        <input type="date" class="form-control textBox" id="reportStartDate" v-model="reportStartDate" required>
                        <span class="input-group-text">to</span>
                        <input type="date" class="form-control textBox" id="reportEndDate" v-model="reportEndDate" :min="reportStartDate" :disabled="!reportStartDate" required>    
                        <button class="btn blueBtn p-2" style="border-radius: 0px 5px 5px 0px;" @click="getReportingPeriod()" :disabled="!reportStartDate || !reportEndDate ">
                            <span v-show="!isLoading"> Submit</span>
                            <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                            <span v-show="isLoading"> Loading... </span>
                    </button>
                    </div>
                

                <div v-if= "selectedPeriod != '' ">
                    <div class = "p-2" >
                        <h2>Reporting Period for Student Care: </h2> 
                        <h3> {{ formatRange(reportStartDate, reportEndDate) }}</h3>
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
                signedIn: this.$store.getters.isAuthenticated,
                empName: this.$store.getters.StateName,
                empRole: this.$store.getters.StateRole,
                currentPage: "/generatestudentcare",
        
                report: 'https://www.slideteam.net/media/catalog/product/cache/1280x720/c/o/competitive_landscape_analysis_report_template_example_ppt_presentation_Slide01.jpg',
                
                isLoading: false,

                reportStartDate: "",
                reportEndDate: "",
                selectedPeriod: ""
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

            getReportingPeriod(){
                if (!this.isLoading) {
                    this.isLoading = true;
                    this.resetInformation();
                    this.selectedPeriod = this.formatRange(this.reportStartDate, this.reportEndDate);
                    this.isLoading = false;
                }
            },
            resetInformation() {
                this.selectedPeriod = ""
            },
            mounted() {
            this.resetInformation();
            this.reportStartDate = ""
            this.reportEndDate = ""
            this.isLoading = false
            },
        }
}
</script>

