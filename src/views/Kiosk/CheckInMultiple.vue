<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="modal fade" id="careModal" tabindex="-1" aria-labelledby="careModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">                    
                    <div class="modal-header" v-if="submissionSuccess">
                        <h5 class="modal-title">Task Complete!</h5>
                        <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                    </div>
                    <div class="modal-header" v-else>
                        <h5 class="modal-title">Task Failed!</h5>
                        <button type="button" class="btn-close" aria-label="Close"  @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        {{ modalMessage }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" :class="submissionSuccess ? 'btn-success' : 'btn-danger'" @click="closeModal">OK</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop fade show" id="backdrop" style="display: none;"></div>
        <div class="p-3">
            <h1 class="text-blue noSelect">Check In Students for After Care</h1>
            <div v-if="checkAfterCare()">
                <div class="mb-3 noSelect">
                    <div>
                        <label for="role" class="text-blue formLabel">Select Grade</label>
                    </div>

                    <select class="form-select p-1 ms-1" v-model="selected" name="selectGrades" id="selectGrades">
                        <option value="" selected disabled>Select an option...</option>
                        <option v-for="(grade, index) in grades" :value="grades[index]" v-bind:key = "grade.id">{{ grades[index].name.toUpperCase() }}</option>
                    </select>
                    <br>
                    <button class="btn blueBtn p-2" type="button" @click="refreshStudentList(selected.name)" v-if="selected.name">
                        Refresh Reports
                    </button>
                </div>
                <div class="table-responsive noSelect" v-if = "!students || !students.length">
                    <table class="pcaTable table-hover">
                        <thead>
                            <th class = "table-th text-center" scope = "col" >
                                Students List
                            </th>
                        </thead>
                        <tbody>
                            <tr class = "row-striped">
                                <td class = "text-center noInfo">No student information available for the selected grade...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table-responsive noSelect" v-else>
                    <table id="checkInMultipleTable" class="pcaTable table-hover">
                        <thead class="showWhenSmall">
                            <th class="col-2 hideWhenSmall" scope = "col">Student ID</th>
                            <th class="middleCols col-4 hideWhenSmall" scope = "col">Student Name</th>
                            <th class="middleCols col-2 hideWhenSmall" scope = "col">Student Grade</th>
                            <th class="middleCols col-2 hideWhenSmall" scope = "col">Previously Checked In</th>
                            <th class="col-1" scope = "col">Select All <input class="form-check-input" type='checkbox' @click='checkAll()' v-model='isCheckAll'></th>
                        </thead>
                        <tbody>
                            <tr class="row-striped text-center" v-for="student in students" :key="student.id" :class="student.not_applicable ? 'row-disabled': ''">
                                <td>{{ student.student.student_id }}</td>
                                <td class="middleCols">{{ student.student.first_name }} {{ student.student.last_name }}</td>
                                <td class="middleCols">{{ student.student.grade.name }}</td>
                                <td class="middleCols"><input class="form-check-input" type="checkbox" :checked="student.not_applicable" onClick="return false;" disabled></td>
                                <td><input class="form-check-input" type="checkbox" v-bind:value='student' v-model='selectedStudents' @change='updateCheckall()' v-if="!student.not_applicable"></td>
                            </tr>
                        </tbody>
                    </table>
                </div> 

                <div class="pt-2">
                    <button type="button" id="submitBtn" class="mt-3 btn formBtn blueBorder" style="width: auto;" :disabled="selectedStudents.length === 0" @click="checkInSelectedStudents">
                        <span v-show="!isLoading"> Check In Selected Students </span>
                        <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                        <span v-show="isLoading"> Loading... </span>
                    </button>
                </div>
            </div>
            <div class="noSelect" v-else>
                <table class="table text-blue">
                    <tbody v-if="timeslots && timeslots.metadata !== undefined">
                        <tr>
                            <td><b>After-Care Time Slot:</b></td>
                            <td>{{ convertTimeTo12HourFormat(timeslots.metadata.after_care_check_in_time) }} - {{ convertTimeTo12HourFormat(timeslots.metadata.after_care_check_out_time) }}</td>
                        </tr>
                        <tr>
                            <td><b>Current Time:</b></td>
                            <td>{{ current_time_text }}</td>
                        </tr>
                    </tbody>
                </table>
                <h3 class="text-blue formLabel">After-Care Services are currently closed.</h3>
                <h4 class="text-blue formLabel">Students cannot be checked into after-care unless the current time is within the after-care time slot.</h4>
            </div>
        </div>
    </div>
</template>

<script>
//import { mapActions, mapGetters } from "vuex";
import NavBar from "@/components/NavBar.vue";
import ConvertDateToTimezone from "@/store/utility/date_format";
import config from "../../server_config";


export default {
    components: {
        NavBar,
    },
    data() {
        return {
            signedIn: this.$store.getters.isAuthenticated,
            empName: this.$store.getters.StateName,
            empRole: this.$store.getters.StateRole,
            currentPage: "/kiosk/checkinmultiple",
            isLoading: false,
            current_time_text: "",
            timeslots: {},

            isCheckAll: false,
            selected: {name: ""},
            students: [],
            grades: [],
            selectedStudents: [],
            submissionSuccess: false,
            modalMessage: "",
        }        
    },
    methods: {
        openModal() {
            document.getElementById("backdrop").style.display = "block"
            document.getElementById("careModal").style.display = "block"
            document.getElementById("careModal").classList.add("show")
        },
        closeModal() {
            document.getElementById("backdrop").style.display = "none"
            document.getElementById("careModal").style.display = "none"
            document.getElementById("careModal").classList.remove("show")
        },
        convertTimeTo12HourFormat(timeString) {
                let currentDate = config.debug_mode ? ConvertDateToTimezone(config.test_date()).slice(0, 10) : ConvertDateToTimezone(new Date()).slice(0, 10)
                let newDate = new Date(`${currentDate} ${timeString}`)
                return newDate.toLocaleString('en-US', {
                    hour12: true
                }).slice(10)
        },
        checkAfterCare() {
            if (this.timeslots && this.timeslots.metadata !== undefined) {
                let currentDate = config.debug_mode ? ConvertDateToTimezone(config.test_date()).slice(0, 10) : ConvertDateToTimezone(new Date()).slice(0, 10)

                let afterCareCheckIn = new Date(`${currentDate} ${this.timeslots.metadata.after_care_check_in_time}`)
                // console.log(afterCareCheckIn)

                let afterCareCheckOut = new Date(`${currentDate} ${this.timeslots.metadata.after_care_check_out_time}`)
                // console.log(afterCareCheckOut)

                return this.checkWithinTimeRange(afterCareCheckOut, afterCareCheckIn)
            }
            return false
        },
        checkWithinTimeRange(maxDateTime, minDateTime) {
            let currentDateTime = new Date(config.debug_mode ? ConvertDateToTimezone(config.test_date()) : ConvertDateToTimezone(new Date()))
            // console.log(currentDateTime)
            if (currentDateTime >= minDateTime && currentDateTime <= maxDateTime) {
                return true
            }
            return false
        },
        getCurrentTime() {
            return new Date(config.debug_mode ? ConvertDateToTimezone(config.test_date()) : ConvertDateToTimezone(new Date())).toLocaleTimeString()
        },
        checkAll() {
            this.isCheckAll = !this.isCheckAll;
            this.selectedStudents = [];
            
            if(this.isCheckAll) { // Check all
                for (var key in this.students) {
                    this.selectedStudents.push(this.students[key]);
                }
            }
        },
        updateCheckall() {
            if(this.students.length == this.selectedStudents.length) {
                this.isCheckAll = true;
            }
            else {
                this.isCheckAll = false;
            }
        },
        checkInSelectedStudents() {
            if (!this.checkAfterCare()) {
                this.modalMessage = `Students cannot be checked-in to after-care unless the current time is within the timeslot for after-care services!\n
                The current time is: ${this.current_time_text}`
                this.submissionSuccess = false;
                this.openModal()
            }
            else if (!this.isLoading) {
                this.isLoading = true;
                let encounteredError = false;
                // console.log(this.selectedStudents)
                for (let index in this.selectedStudents) {
                    if (encounteredError) continue;
                    let setDate = config.debug_mode ? config.test_date() : new Date()
                    // console.log(setDate)
                    let student = this.selectedStudents[index]
                    let currentDate = ConvertDateToTimezone(setDate).slice(0, 10)
                    let currentTime = ('0'  +  setDate.getHours()).slice(-2)+':'+('0' + setDate.getMinutes()).slice(-2);
                    let payload = {
                        'student_id': student.student.student_id,
                        'check_in_time': currentTime,
                        'check_in_date': currentDate,
                        'care_type': true,
                        'check_in_signature': this.$store.getters.StateName 
                    }
                    // console.log(payload)
                    this.$store.dispatch("CheckInStudent", payload).then(resp => {
                        // console.log(resp)
                        if (!resp) {
                            this.isLoading = false;
                            this.submissionSuccess = false;
                            encounteredError = true;
                            this.modalMessage = `Encountered an error checking-in ${student.student.first_name} ${student.student.first_name} into After-Care Services.`;
                        }
                    }).catch(err => {
                        console.log(err)
                        this.isLoading = false;
                        this.submissionSuccess = false;
                        encounteredError = true;
                        this.modalMessage = "Encountered an error checking-in the selected students into After-Care Services.";
                        this.openModal()
                    }).then(() => this.refreshStudentList(this.selected.name))
                }
                if (!encounteredError) {
                    this.isLoading = false;
                    this.modalMessage = "All selected students have been checked-in to After-Care Services!"
                    this.submissionSuccess = true;
                    this.openModal()
                }
            }
        },
        refreshStudentList(selected_grade) {
            if (!this.isLoading) {
                this.isLoading = true;
                if (!selected_grade || selected_grade.length === 0 ) {
                    this.isLoading = false;
                    return;
                }
                this.$store.dispatch("GetStudentsByGrade", {
                    student_grade: selected_grade, 
                    care_type: true, 
                    care_date: config.debug_mode ? ConvertDateToTimezone(config.test_date()).slice(0, 10) : ConvertDateToTimezone(new Date()).slice(0, 10),
                }).then(
                    (resp) => {
                        if (resp !== undefined) {
                            this.students = resp
                            this.selectedStudents = [];
                            this.isCheckAll = false;
                        }
                        this.isLoading = false;
                    }
                ).catch(err => {
                    console.log(err)
                    this.isLoading = false;
                });
            }
        }
    },
    watch: {
        selected(value) {
            // console.log("selected grade: " + value.name);
            this.refreshStudentList(value.name);
        }
    },
    beforeMount() {
        this.$store.dispatch("GetAllStudentGrades").then(
            (resp) => {
                if (resp !== undefined) {
                    this.grades = resp
                }
            }
        );
        this.$store.dispatch("GetStudentCareTimeSlotsKiosk").then(resp => {
            if (resp) {
                // console.log(resp)
                this.timeslots = resp
            }
            else {
                console.log("Unable to retrieve student care timeslots information!")
                this.timeslots = {}
            }
        }).catch(err => {
            console.log(err)
            this.timeslots = {}
        })
        this.current_time_text = this.getCurrentTime();
    },
    created() {
        setInterval(() => {
            this.current_time_text = this.getCurrentTime()
        }, 1000)
    }
}
</script>
