<template>
    <div class = "container">
        <NavBar :signed_in= "signedIn" :name= "empName" :role= "empRole" :current_page= "currentPage"/>
        <div class = "d-flex">
            <div class = "p-2">
                <Sidebar/>
            </div>

            <div class="p-2 flex-grow-1">
                <h1 class="text-blue">Generate Timesheet Report</h1>
                <label class="form-check-label" for = "reportStartDateInput">Pick a Reporting Period</label>
        
                <div class="pb-3 input-group">
                    <input type="date" class="form-control textBox" id="reportStartDate" v-model="reportStartDate" required>
                    <span class="input-group-text">to</span>
                    <input type="date" class="form-control textBox" id="reportEndDate" v-model="reportEndDate" :min="reportStartDate" :disabled="!reportStartDate" required>    
                    <button class="btn blueBtn p-2" style="border-radius: 0px 5px 5px 0px;" @click="getReportingPeriod()" :disabled="!reportStartDate || !reportEndDate">
                         Submit
                    </button>
                    <hr>
                </div>
                

                <div v-if= "selectedPeriod != '' ">
                    <hr>
                    <div class = "p-2" v-if= "selectedPeriod != '' ">
                        <h2>Reporting period for employee timesheets: </h2> 
                        <h3> {{  selectedPeriod  }}</h3>
                    </div>
                    <div class = "p-2" >
                        <button type="button" id= "btn formBtn blueBorder" class="btn blueBtn" @click="downloadPDF">
                            <span v-show="!isLoadingPDF"><i class="fa-solid fa-file-pdf"></i> | Download PDF </span>
                            <span v-show="isLoadingPDF" class="spinner-border spinner-border-sm" role="status"></span>
                            <span v-show="isLoadingPDF"> Loading... </span>
                        </button>

                        <br> <br>

                        <button type="button" id= "btn formBtn blueBorder" class="btn blueBtn" @click="downloadCSV">
                            <span v-show="!isLoadingCSV"><i class="fa-solid fa-file-csv"></i> | Download CSV </span>
                            <span v-show="isLoadingCSV" class="spinner-border spinner-border-sm" role="status"></span>
                            <span v-show="isLoadingCSV"> Loading... </span>
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
                currentPage: "/generatetimesheets",
                        
                selected: '',
                employees: {},

                isLoadingPDF: false,
                isLoadingCSV: false,

                reportStartDate: "",
                reportEndDate: "",
                selectedPeriod: ""
            }
        },
        watch: {
            reportStartDate(value) {
                if (value && this.reportEndDate !== '') {
                    this.reportEndDate = ''
                }
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
                this.resetInformation();
                this.selectedPeriod = this.formatRange(this.reportStartDate, this.reportEndDate);
            },
            resetInformation() {
                this.selectedPeriod = ""
            },
            downloadPDF() {
                let pdfData = null
                if (!this.isLoadingPDF) {
                    this.isLoadingPDF = true;
                    let payload = {
                        start_date: this.reportStartDate,
                        end_date: this.reportEndDate,
                    }
                    this.$store.dispatch("GetTimesheetPDFReport", payload).then(resp => {
                        if (resp !== null) {
                            pdfData = resp
                            this.isLoadingPDF = false;
                        }
                        else {
                            this.isLoadingPDF = false;
                        }
                    }).catch(err => {
                        console.log(err)
                        this.isLoadingPDF = false;
                    }).then(() => {
                        if (pdfData !== null) {
                            const url = window.URL.createObjectURL(new Blob([pdfData] ,{type: "application/pdf"}))
                            var link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', 'TimesheetReport.pdf');
                            document.body.appendChild(link);
                            link.click();
                            link.remove();
                        }
                    })
                }
            },
            downloadCSV() {
                let csvData = null
                if (!this.isLoadingCSV) {
                    this.isLoadingCSV = true;
                    let payload = {
                        start_date: this.reportStartDate,
                        end_date: this.reportEndDate,
                    }
                    this.$store.dispatch("GetTimesheetCSVReport", payload).then(resp => {
                        if (resp !== null) {
                            csvData = resp
                            this.isLoadingCSV = false;
                        }
                        else {
                            this.isLoadingCSV = false;
                        }
                    }).catch(err => {
                        console.log(err)
                        this.isLoadingCSV = false;
                    }).then(() => {
                        if (csvData !== null) {
                            const url = window.URL.createObjectURL(new Blob([csvData] ,{type: "text/csv"}))
                            var link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', 'TimesheetReport.csv');
                            document.body.appendChild(link);
                            link.click();
                            link.remove();
                        }
                    })
                }
            },
        },
        mounted() {
            this.resetInformation();
            this.reportStartDate = ""
            this.reportEndDate = ""
            this.isLoading = false
        },
        
    }
</script>

