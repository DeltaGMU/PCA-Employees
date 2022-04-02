<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
                <Sidebar/>
            </div>
            <div class="modal fade" id="studentCareModal" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="studentCareModalLbl" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            Student Care Records
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive">
                                <table id="studentCareRecordsModalTable" class = "pcaTable table-hover">
                                    <thead>
                                        <th scope = "col">Date</th>
                                        <th class="middleCols" scope = "col">Before Care Hours</th>
                                        <th class="middleCols" scope = "col">Before Care Check-in Time</th>
                                        <th class="middleCols" scope = "col">Before Care Check-out Time</th>
                                        <th class="middleCols" scope = "col">After Care Hours</th> 
                                        <th class="middleCols" scope = "col">After Care Check-in Time</th>
                                        <th scope = "col">After Care Check-out Time</th>
                                        
                                    </thead>
                                    <tbody>
                                        <tr class = "row-striped" v-for="(record, index) in studentCareRecords" :key="index">
                                            <td>{{  }} </td>
                                            <td class = "middleCols">{{  }} </td>
                                            <td class = "middleCols">{{  }} </td>
                                            <td class = "middleCols">{{  }} </td>
                                            <td class = "middleCols">{{  }} </td>
                                            <td class = "middleCols">{{  }} </td>
                                            <td>{{  }} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn blueBtn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="()=>{}">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "p-2 flex-grow-1">
                <h1 class="text-blue">Student Care Records</h1>
                <!--<h3 class="text-blue pb-3">{{ selectedPeriod }}</h3>-->
                <div class="pb-2 noSelect">
                <div>
                    <label for="role" class="text-blue formLabel">Select Grade</label>
                </div>

                <select class="form-select" v-model= "selected" name= "selectGrades" id= "selectGrades">
                    <option value= "" selected disabled>Select an option...</option>
                    <option v-for= "(grade, index) in grades" :value= "grades[index]" v-bind:key = "grade.id">{{ grades[index].name.toUpperCase() }}</option>
                </select>

                </div>

                <label class="form-check-label" for="reportStartDateInput">Please select a reporting period:</label>
                <div class="pb-3 input-group">
                    <input type="date" class="form-control textBox" id="reportStartDateInput" v-model="reportStartDate" required>
                    <span class="input-group-text">to</span>
                    <input type="date" class="form-control textBox" id="reportEndDate" v-model="reportEndDate" :min="reportStartDate" :disabled="!reportStartDate" required>
                    
                    <button class="btn blueBtn p-2" style="border-radius: 0px 5px 5px 0px;" @click="getReportingPeriod()" :disabled="!reportStartDate || !reportEndDate">
                        <span v-show="!isLoading"> Submit</span>
                        <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                        <span v-show="isLoading"> Loading... </span>
                    </button>
                </div>
                <div class="pb-3" v-if= "selectedPeriod != '' ">
                    <hr>
                    <h4 class="text-blue">Reporting Period: {{ selectedPeriod }}</h4>
                </div>

                <label class="form-check-label" for="reportSearchBar">
                    Filter student care records:
                </label>
                <div class="pb-3 input-group">
                    <input type="text" v-model="searchQuery" class="form-control" placeholder="Search for student care records by First Name, Last Name, Grade..." name="reportSearchBar" id="reportSearchBar">
                </div>

                <div class="table-responsive" v-if= "!filteredReportsList || Object.keys(filteredReportsList).length == 0">
                    <table class = "pcaTable table-hover">
                        <thead>
                            <th scope = "col">
                                Student Care Records
                            </th>
                        </thead>
                        <tbody>
                            <tr class = "row-striped">
                                <td class="noInfo">No student care records available...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="table-responsive" id="studentCareRecordsTable" v-else>
                    <table class = "pcaTable table-hover">
                        <thead>
                            <th scope = "col">Student ID</th>
                            <th class="middleCols" scope = "col">Last Name</th>
                            <th class="middleCols" scope = "col">First Name</th>
                            <th class="middleCols" scope = "col">Total Before Care Hours</th>
                            <th class="middleCols" scope = "col">Total After Care Hours</th>
                            <th scope = "col">View Details</th>
                        </thead>
                        <tbody>

                            <tr class = "row-striped" v-for="(student, index) in filteredReportsList" v-bind:key="index">
                                <td class = "middleCols">{{ student.student_id}} </td>
                                <td>{{ student.last_name.charAt(0).toUpperCase() + student.last_name.slice(1) }} </td>
                                <td class = "middleCols">{{ student.first_name.charAt(0).toUpperCase() + student.first_name.slice(1)}} </td>
                                <td class = "middleCols">{{ }} </td>
                                <td class = "middleCols">{{ }} </td>
                                <td> 
                                    <button type="button" class="btn blueBtn p-2" data-bs-toggle="modal" data-bs-target="#studentCareModal" @click="viewStudentCareRecords(index)">
                                        <img src="https://s2.svgbox.net/hero-outline.svg?ic=zoom-in&color=ffffff" width="28" height="28">
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
    import Sidebar from "../components/Sidebar.vue";
    import NavBar from "@/components/NavBar.vue";
    import ConvertDateToTimezone from "@/store/utility/date_format";

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
                currentPage: "/studentcareinfo",
                isLoading: false,

                studentCareRecords: {},
                studentsByGrade: [],
                studentTotalHours: {},
                studentsTwo: [],
                reportStartDate: "",
                reportEndDate: "",
                selectedPeriod: "",

                searchQuery: "",
                studentInfo: [],
                selected: '',
                grades: [],

                columns: [
                    'student_id',
                    'last_name',
                    'first_name',
                    'total_before',
                    'total_after',
                    'view_details'
                ],
                options: {
                    headings: {
                        student_id: 'Student ID',
                        last_name: 'Last Name' ,
                        first_name: 'First Name',
                        total_before:'Total Before Care Hours',
                        total_after: 'Total After Care Hours',
                        view_details: 'View Details'
                    }
                },
            }
        },
        computed: {
            filteredReportsList() {
                if (this.studentInfo !== null) {
                    return this.studentInfo.filter(item => {
                        return (
                            item.first_name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1
                            ) || (item.last_name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1) ||
                            (item.student_id.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1);
                    })
                }
                else {
                    return [];
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
            /*
             checkStudentInfo() {
                if (!this.isLoading) {
                    this.isLoading = true;
                    this.GetStudentCareRecords({
                        student_id: this.student_id.trim(), 
                        start_date: this.reportStartDate, 
                        end_date: this.reportEndDate
                    }).then((resp) => {
                        this.records = resp;
                        this.showError = false;
                        this.incorrect_id = "";
                        this.isLoading = false;
                        this.selected_record = {};
                        this.selected_care = 0;
                        console.log(this.records);
                    }).catch((err) => {
                        console.log(err);
                        this.showError = true;
                        this.incorrect_id = this.student_id;
                        this.student_id = "";
                        this.isLoading = false;
                        this.records = {};
                        this.selected_record = {};
                        this.selected_care = 0;
                    });
                }
            },
            */
            viewStudentCareRecords(student_id) {
                console.log(student_id)
                let payload = {
                    date_start: this.reportStartDate,
                    date_end: this.reportEndDate,
                    student_id: student_id
                }
                this.$store.dispatch("GetStudentCareRecords", payload).then(resp => {
                    this.studentCareRecords = resp.records
                })
            },
            /*
            getReportingPeriod() {
                if (!this.isLoading) {
                    this.isLoading = true;
                    this.resetInformation();

                    
                    this.selectedPeriod = this.formatRange(this.reportStartDate, this.reportEndDate)
                    this.$store.dispatch("GetStudentsByGrade").then(() => {
                        this.studentsByGrade = this.$store.getters.StateStudents
                        this.getStudentCareHours();
                        this.isLoading = false;
                    });
                }
            },
            */
           getReportingPeriod() {
                if (!this.isLoading) {
                    this.isLoading = true;
                    this.resetInformation();

                    let payload = {
                        grade: this.selected,
                        date_start: this.reportStartDate,
                        date_end: this.reportEndDate
                }
                    
                    this.selectedPeriod = this.formatRange(this.reportStartDate, this.reportEndDate)
                    this.$store.dispatch("GetStudentsByGrade", payload).then(() => {
                        this.studentsByGrade = this.$store.getters.StateStudents
                        this.getStudentCareHours();
                        this.isLoading = false;
                    });
                }
            },

            getStudentCareHours() {
                let payload = {
                    'reportStartDate': this.reportStartDate,
                    'reportEndDate': this.reportEndDate
                }
                payload["students"] = []
                if (this.studentsByGrade && this.studentsByGrade.length > 0) {
                    for (let student in Object.keys(this.studentsByGrade)) {
                        payload["students"].push({
                            first_name: this.studentsByGrade[student].first_name,
                            last_name: this.studentsByGrade[student].last_name,
                            students_id: this.studentsByGrade[student].student_id
                        })
                    }
                    console.log(payload)
                   // this.$store.dispatch("GetTotalHoursForEmployees", payload).then(() => {
                        //console.log("AFTER RETRIEVING HOURS")
                    //    this.empTotalHours = this.$store.getters.RetrievedTotalHours
                        //console.log(this.empTotalHours)
                    //})
                }
            },
            resetInformation() {
                this.studentsByGrade = []
                this.studentTotalHours = {}
                this.studentRecords = {}
                this.selectedPeriod = ""
            },
        },

        getStudentRecordsByGrade() {
            let payload = {
                'grade': this.grade,
                'start_date': this.reportStartDate,
                'end_date': this.reportEndDate
            }
            console.log(payload)
        },
        /*
        getBeforeCareHours () {

        }

        getAfterCare Hours() {

        }
        */
        watch: {
        selected(value) {
            // console.log("selected grade: " + value.name);
            this.$store.dispatch("GetStudentsByGrade", {
                student_grade: value.name, 
                care_type: true, 
                care_date: ConvertDateToTimezone(new Date()).slice(0, 10),
            }).then(
                (resp) => {
                    if (resp !== undefined) {
                        this.students = resp
                        this.studentsTwo = [];
                    }
                }
            )
        }
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