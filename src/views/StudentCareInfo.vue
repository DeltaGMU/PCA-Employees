<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
                <Sidebar/>
            </div>
            <div class="modal fade" id="studentCareModal" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="studentCareModalLbl" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-fullscreen m-2">
                    <div class="modal-content">
                        <div class="modal-header">
                            Student Care Records
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive" style="height: 100%; max-height: 100%;">
                                <table id="studentCareRecordsModalTable" class = "pcaTable table-hover" style="overflow-x: auto;">
                                    <thead>
                                        <th class="p-2" scope = "col">Date</th>
                                        <th class="p-2" style="border-left: 2px solid #c3a579" scope = "col">BC Check-in Time</th>
                                        <th class="middleCols p-2" scope = "col">BC Check-out Time</th>
                                        <th class="middleCols p-2" scope = "col">BC Check-in Signature</th>
                                        <th class="p-2" style="border-right: 2px solid #c3a579" scope = "col">BC Check-out Signature</th>
                                        <th class="p-2" style="border-left: 2px solid #c3a579" scope = "col">AC Check-in Time</th> 
                                        <th class="middleCols p-2" scope = "col">AC Check-out Time</th>
                                        <th class="middleCols p-2" scope = "col">AC Check-in Signature</th>
                                        <th class="p-2" style="border-right: 2px solid #c3a579" scope = "col">AC Check-out Signature</th>                                        
                                    </thead>
                                    <tbody>
                                        <tr class = "row-striped" v-for="(record, index) in studentCareRecords" :key="index">
                                            <td class = "p-2">{{ formatDate(index) }} </td>
                                            <!-- Before Care -->
                                            <td class = "p-2" style="border-left: 2px solid #c3a579" v-if="record.before_care !== undefined"> {{ record.before_care.check_in_time }} </td>
                                            <td class = "middleCols p-2" style="border-left: 2px solid #c3a579" v-else> N/A </td>

                                            <td class = "middleCols p-2" v-if="record.before_care !== undefined"> {{ record.before_care.check_out_time }} </td>
                                            <td class = "middleCols p-2" v-else> N/A </td>

                                            <td class = "middleCols p-2" v-if="record.before_care !== undefined"> {{ record.before_care.check_in_signature }} </td>
                                            <td class = "middleCols p-2" v-else> N/A </td>

                                            <td class = "middleCols p-2" style="border-right: 2px solid #c3a579" v-if="record.before_care !== undefined && record.before_care.check_out_signature !== null"> {{ record.before_care.check_out_signature }} </td>
                                            <td class = "p-2" style="border-right: 2px solid #c3a579" v-else> N/A </td>
                                            <!-- Before Care -->

                                            <!-- After Care -->
                                            <td class = "p-2" style="border-left: 2px solid #c3a579" v-if="record.after_care !== undefined"> {{ record.after_care.check_in_time }} </td>
                                            <td class = "middleCols p-2" style="border-left: 2px solid #c3a579" v-else> N/A </td>

                                            <td class = "middleCols p-2" v-if="record.after_care !== undefined"> {{ record.after_care.check_out_time }} </td>
                                            <td class = "middleCols p-2" v-else> N/A </td>

                                            <td class = "middleCols p-2" v-if="record.after_care !== undefined"> {{ record.after_care.check_in_signature }} </td>
                                            <td class = "middleCols p-2" v-else> N/A </td>

                                            <td class = "p-2" style="border-right: 2px solid #c3a579" v-if="record.after_care !== undefined && record.after_care.check_out_signature !== null"> {{ record.after_care.check_out_signature }} </td>
                                            <td class = "p-2" style="border-right: 2px solid #c3a579" v-else> N/A </td>
                                            <!-- After Care -->
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn blueBtn" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "p-2 flex-grow-1">
                <h1 class="text-blue">Student Care Records</h1>
                <!--<h3 class="text-blue pb-3">{{ selectedPeriod }}</h3>-->
                <label class="form-check-label" for="reportStartDateInput">Please select a reporting period:</label>
                <div class="pb-1 input-group">
                    <input type="date" class="form-control textBox" id="reportStartDateInput" v-model="reportStartDate" required>
                    <span class="input-group-text">to</span>
                    <input type="date" class="form-control textBox" id="reportEndDate" v-model="reportEndDate" :min="reportStartDate" :disabled="!reportStartDate" required>
                </div>
                <div v-if="reportStartDate && reportEndDate">
                    <label for="role" class="text-blue formLabel">Select Grade</label>
                </div>
                <div class="pb-1 input-group noSelect" v-if="reportStartDate && reportEndDate">
                    <select class="form-select" v-model= "selected" name= "selectGrades" id= "selectGrades">
                        <option value= "" selected disabled>Select an option...</option>
                        <option v-for= "(grade, index) in grades" :value= "grades[index]" v-bind:key = "grade.id">{{ grades[index].name.toUpperCase() }}</option>
                    </select>
                    <button class="btn blueBtn p-2" style="border-radius: 0px 5px 5px 0px;" @click="getReportingPeriod()" :disabled="!reportStartDate || !reportEndDate || selected === ''">
                        <span v-show="!isLoading"> Submit</span>
                        <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                        <span v-show="isLoading"> Loading... </span>
                    </button>
                    <hr>
                </div>
                <div v-if="selectedPeriod != ''">
                    <div class="pb-3" v-if= "selectedPeriod != '' ">
                        <hr>
                        <h4 class="text-blue">Reporting Period: {{ selectedPeriod }}</h4>
                    </div>

                    <label class="form-check-label" for="reportSearchBar">
                        Filter student care records:
                    </label>
                    <div class="pb-3 input-group">
                        <input type="text" v-model="searchQuery" class="form-control" placeholder="Search for student care records by First Name, Last Name, Student ID..." name="reportSearchBar" id="reportSearchBar">
                    </div>

                    <div class="table-responsive" v-if="!filteredReportsList || Object.keys(filteredReportsList).length == 0">
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
                                    <td class = "middleCols">{{ student.before_care_hours }} </td>
                                    <td class = "middleCols">{{ student.after_care_hours }} </td>
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
    </div>
</template> 

<script>
    import Sidebar from "../components/Sidebar.vue";
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
                currentPage: "/studentcareinfo",
                isLoading: false,

                studentCareRecords: {},
                studentsByGrade: {},
                studentTotalHours: {},
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
                if (this.studentsByGrade !== null) {
                    return Object.keys(this.studentsByGrade).filter(key => {
                        return (
                            this.studentsByGrade[key].first_name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1 ||
                            this.studentsByGrade[key].last_name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1 ||
                            this.studentsByGrade[key].student_id.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1
                        );                    
                    }).reduce((cur, key) => {
                        cur[key] = this.studentsByGrade[key];
                        return cur;
                    }, {})
                }
                else {
                    return {};
                }
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
            viewStudentCareRecords(student_id) {
                let payload = {
                    student_id: student_id,
                    start_date: this.reportStartDate,
                    end_date: this.reportEndDate
                }
                this.$store.dispatch("GetStudentCareRecords", payload).then(resp => {
                    if (resp) {
                        console.log(resp)
                        this.studentCareRecords = resp;
                    }
                    else {
                        this.studentCareRecords = {}
                    }
                }).catch(err => {
                    console.log(err)
                    this.studentCareRecords = {}
                })
            },
            getReportingPeriod() {
                if (!this.isLoading) {
                    this.isLoading = true;
                    this.resetInformation();

                    let payload = {
                        grade: this.selected.name,
                        start_date: this.reportStartDate,
                        end_date: this.reportEndDate
                    }
                    console.log(payload)
                    
                    this.selectedPeriod = this.formatRange(this.reportStartDate, this.reportEndDate)
                    this.$store.dispatch("GetStudentCareHours", payload).then(resp => {
                        if (resp) {
                            this.studentsByGrade = resp
                        }
                        this.isLoading = false;
                    }).catch(err => {
                        console.log(err)
                        this.isLoading = false;
                    });
                }
            },
            resetInformation() {
                this.studentsByGrade = {}
                this.studentTotalHours = {}
                this.studentRecords = {}
                this.selectedPeriod = ""
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