<template>
    <div class = "container">
        <NavBar :signed_in= "signedIn" :name= "empName" :role= "empRole" :current_page= "currentPage"/>
        <div class = "d-flex">
            <div class = "p-2">
                <Sidebar/>
            </div>

            <div class="p-2 flex-grow-1">
                <h1 class="text-blue">Generate Student Care Report</h1>
                <label class="form-check-label" for = "reportStartDateInput">Pick a Reporting Period</label>
        
                <div class="pb-3 input-group">
                    <input type="date" class="form-control textBox" id="reportStartDate" v-model="reportStartDate" required>
                    <span class="input-group-text">to</span>
                    <input type="date" class="form-control textBox" id="reportEndDate" v-model="reportEndDate" :min="reportStartDate" :disabled="!reportStartDate" required>    
                </div>

                <div v-if="reportStartDate && reportEndDate">
                    <label for="role" class="text-blue formLabel">Select Grade</label>
                </div>
                <div class="pb-1 input-group noSelect" v-if="reportStartDate && reportEndDate">
                    <select class="form-select" v-model= "selected" name= "selectGrades" id= "selectGrades">
                        <option value= "" selected disabled>Select an option...</option>
                        <option v-for="(grade, index) in grades" :value="grades[index]" v-bind:key="grade.id">{{ grades[index].name.toUpperCase() }}</option>
                    </select>
                    <button class="btn blueBtn p-2" style="border-radius: 0px 5px 5px 0px;" @click="getReportingPeriod()" :disabled="!reportStartDate || !reportEndDate || selected === ''">
                         Submit
                    </button>
                    <hr>
                </div>
                

                <div v-if= "selectedPeriod != '' ">
                    <hr>
                    <div class = "p-2" v-if= "selectedPeriod != '' ">
                        <h3>Reporting Period:  {{ selectedPeriod }}</h3> 
                        <h4 v-if="selected !== ''"> Selected Grade: {{  selected.name.toUpperCase()  }}</h4>
                    </div>
                    <br>
                    <div class = "p-2" >
                        <button type="button" id= "btn formBtn blueBorder" class="btn btn-danger" @click="downloadPDF">
                            <span v-show="!isLoadingPDF"><i class="fa-solid fa-file-pdf"></i> | Download PDF </span>
                            <span v-show="isLoadingPDF" class="spinner-border spinner-border-sm" role="status"></span>
                            <span v-show="isLoadingPDF"> Loading... </span>
                        </button>
                        <br> <br>
                        <button type="button" id= "btn formBtn blueBorder" class="btn btn-success" @click="downloadCSV">
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
                currentPage: "/generatestudentcare",
                        
                grades: [],
                selected: '',
                studentsByGrade: {},

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
                        grade: this.selected.name,
                    }
                    this.$store.dispatch("GetStudentCarePDFReport", payload).then(resp => {
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
                            link.setAttribute('download', 'StudentCareReport.pdf');
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
                        grade: this.selected.name,
                    }
                    this.$store.dispatch("GetStudentCareCSVReport", payload).then(resp => {
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
                            link.setAttribute('download', 'StudentCareReport.csv');
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
        beforeMount() {
            this.$store.dispatch("GetAllStudentGrades").then(
                (resp) => {
                    if (resp !== undefined) {
                        this.grades = resp
                    }
                }
            );
        }
    }
</script>

