<template>
    <div class="container">
        <NavBar :current_page="currentPage"/>
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
        <div class="row justify-content-center">
            <div class="mt-5 col-xl-10 col-lg-10 col-md-10 col-sm-12 min-vh-100">
                <div class="homeContainer">
                    <div class="text-center noSelect">
                        <img src="../../assets/pcawhite.svg" class="mb-4 homeLogo" alt="PCA Lion Logo">
                    </div>
                    <div class="mt-5 text-center noSelect">
                        <!-- <h3 class="text-blue">Please check the student information and select one of the available options shown below:</h3> -->
                        <h5 class="text-blue">Current Time: {{ current_time_text }}</h5>
                        
                        <table class="table text-blue">
                            <tbody>
                                <tr>
                                    <td><b>Student ID:</b></td>
                                    <td>{{ this.student_info.student_id }}</td>
                                </tr>
                                <tr>
                                    <td><b>First Name:</b></td>
                                    <td>{{ this.student_info.first_name[0].toUpperCase() + this.student_info.first_name.slice(1).toLowerCase() }}</td>
                                </tr>
                                <tr>
                                    <td><b>Last Name:</b></td>
                                    <td>{{ this.student_info.last_name[0].toUpperCase() + this.student_info.last_name.slice(1).toLowerCase() }}</td>
                                </tr>
                                <tr>
                                    <td><b>Grade:</b></td>
                                    <td>{{ this.student_info.grade.name.toUpperCase() }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table text-blue">
                            <tbody>
                                <tr v-if="care_info">
                                    <td><b>Before-Care Time Slot:</b></td>
                                    <td>{{ care_info.metadata.before_care_check_in_time }} - {{ care_info.metadata.before_care_check_out_time }}</td>
                                </tr>
                                <tr v-if="care_info">
                                    <td><b>After-Care Time Slot:</b></td>
                                    <td>{{ care_info.metadata.after_care_check_in_time }} - {{ care_info.metadata.after_care_check_out_time }}</td>
                                </tr>
                                <tr v-if="care_info && care_info.before_care !== undefined && care_info.after_care === undefined">
                                    <td><b>Student In:</b></td>
                                    <td> 
                                        Before-Care
                                    </td>
                                </tr>
                                <tr v-else-if="care_info && care_info.after_care !== undefined">
                                    <td><b>Student In:</b></td>
                                    <td> 
                                        After-Care
                                    </td>
                                </tr>
                                <tr v-else>
                                    <td><b>Student In:</b></td>
                                    <td> 
                                        Student not in any care
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="text-center">
                        <label for="parentSignatureInput" class="text-blue">
                            Please enter your full name here:
                        </label>
                        <input type="text" autocomplete="off" v-model="parent_signature" class="form-control" placeholder="Parent Signature..." id="parentSignature" name="parentSignatureInput">
                    </div>
                    <br>
                    <div class="twoBtnCol">
                        <button class="btn formBtn blueBorder mobilePadding" @click="beforeCareCheckIn" :disabled="(!canCheckInToBeforeCare || parent_signature.trim().length === 0)" :class="(!canCheckInToBeforeCare || parent_signature.trim().length === 0) ? 'btn-secondary' : 'formBtn blueBorder'">
                            <div v-if="canCheckInToBeforeCare && this.care_info.before_care !== undefined && this.care_info.before_care.manually_checked_out !== true">
                                Before-Care
                                <hr>
                                <div v-if="parent_signature.trim().length === 0">
                                    Enter Signature
                                </div>
                                <div v-else>
                                    <span v-show="!isLoading"> CHECK OUT </span>
                                    <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                                    <span v-show="isLoading"> Loading... </span>
                                </div> 
                            </div>
                            <div v-else>
                                Before-Care
                                <hr>
                                <div v-if="this.care_info.before_care !== undefined && this.care_info.before_care.manually_checked_out === true">
                                    ALREADY CHECKED OUT
                                </div>
                                <div v-else>
                                    CLOSED
                                </div>
                            </div>
                        </button>
                        <button class="btn formBtn blueBorder mobilePadding" @click="afterCareCheckOut" :disabled="(!canCheckOutOfAfterCare || parent_signature.trim().length === 0)" :class="(!canCheckOutOfAfterCare || parent_signature.trim().length === 0) ? 'btn-secondary' : 'formBtn blueBorder'">
                            <div v-if="canCheckOutOfAfterCare && this.care_info.after_care !== undefined && this.care_info.after_care.manually_checked_out !== true">
                                After-Care
                                <hr>
                                <div v-if="parent_signature.trim().length === 0">
                                    Enter Signature
                                </div>
                                <div v-else>
                                    <span v-show="!isLoading"> CHECK OUT </span>
                                    <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                                    <span v-show="isLoading"> Loading... </span>
                                </div> 
                            </div>
                            <div v-else>
                                After-Care
                                <hr>
                                <div v-if="this.care_info.after_care !== undefined && this.care_info.after_care.manually_checked_out === true">
                                    ALREADY CHECKED OUT
                                </div>
                                <div v-else>
                                    CLOSED
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import ConvertDateToTimezone from "@/store/utility/date_format";
import config from "../../server_config";

export default {
    name: "CareOptions",
    components: {
        NavBar,
    },
    props: {
        student_info: {}
    },
    data() {
        return {
            currentPage: "/kiosk/careoptions",
            parent_signature: "",
            current_time_text: "",
            care_info: {},

            isLoading: false,
            submissionSuccess: false,
            modalMessage: "N/A",
        }
    },
    computed: {
        canCheckInToBeforeCare() {
            return this.checkBeforeCare();
        },
        canCheckOutOfAfterCare() {
            return this.checkAfterCare();
        },     
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
            this.$router.push("/kiosk")
        },
        getCurrentTime() {
            return new Date(config.debug_mode ? ConvertDateToTimezone(config.test_date()) : ConvertDateToTimezone(new Date())).toLocaleTimeString()
        },
        checkBeforeCare() {
            if (this.care_info && this.care_info.before_care === undefined && this.care_info.after_care === undefined) {
                let currentDate = config.debug_mode ? ConvertDateToTimezone(config.test_date()).slice(0, 10) : ConvertDateToTimezone(new Date()).slice(0, 10)
                
                let beforeCareCheckIn = new Date(`${currentDate} ${this.care_info.metadata.before_care_check_in_time}`)
                console.log(beforeCareCheckIn)

                let beforeCareCheckOut = new Date(`${currentDate} ${this.care_info.metadata.before_care_check_out_time}`)
                console.log(beforeCareCheckOut)

                return this.checkWithinTimeRange(beforeCareCheckOut, beforeCareCheckIn)
            }
            return false
        },
        checkAfterCare() {
            if (this.care_info && this.care_info.after_care !== undefined) {
                let currentDate = config.debug_mode ? ConvertDateToTimezone(config.test_date()).slice(0, 10) : ConvertDateToTimezone(new Date()).slice(0, 10)

                let afterCareCheckIn = new Date(`${currentDate} ${this.care_info.metadata.after_care_check_in_time}`)
                console.log(afterCareCheckIn)

                let afterCareCheckOut = new Date(`${currentDate} ${this.care_info.metadata.after_care_check_out_time}`)
                console.log(afterCareCheckOut)

                return this.checkWithinTimeRange(afterCareCheckOut, afterCareCheckIn)
            }
            return false
        },
        checkWithinTimeRange(maxDateTime, minDateTime) {
            let currentDateTime = new Date(config.debug_mode ? ConvertDateToTimezone(config.test_date()) : ConvertDateToTimezone(new Date()))
            console.log(currentDateTime)
            if (currentDateTime >= minDateTime && currentDateTime <= maxDateTime) {
                return true
            }
            return false
        },
        beforeCareCheckIn() {
            if (!this.isLoading) {
                this.isLoading = true;
                if (this.checkBeforeCare() && this.student_info !== undefined && this.care_info.after_care.manually_checked_out !== true && this.parent_signature.trim().length > 0) {
                    // Check in student to before-care.
                    let currentDate = config.debug_mode ? ConvertDateToTimezone(config.test_date()) : ConvertDateToTimezone(new Date())
                    currentDate = currentDate.slice(0, 10)
                    let currentTime = new Date(config.debug_mode ? ConvertDateToTimezone(config.test_date()) : ConvertDateToTimezone(new Date()))
                    currentTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`

                    let payload = {
                        student_id: this.student_info.student_id,
                        check_in_time: currentTime,
                        check_in_date: currentDate,
                        care_type: false,
                        check_in_signature: this.parent_signature.trim()
                    }
                    console.log(payload)
                    this.$store.dispatch("CheckInStudent", payload).then(resp => {
                        console.log(resp);
                        if (resp) {
                            this.submissionSuccess = true;
                            this.modalMessage = `Successfully checked-in ${this.student_info.first_name} ${this.student_info.last_name} to Before-Care Services.`
                            this.openModal();
                        }
                        else {
                            this.submissionSuccess = false;
                            this.modalMessage = "Unable to check-in student! If the current time has exceeded the Before-Care time slot, then the student cannot be checked-in.";
                            this.openModal();
                        }
                        this.isLoading = false;
                    }).catch(err => {
                        console.log(err);
                        this.isLoading = false;
                        this.submissionSuccess = false;
                        this.modalMessage = "Encountered an error checking-in the student to Before-Care Services. Please contact an administrator.";
                        this.openModal();
                    })
                }
            }
        },
        afterCareCheckOut() {
            if (!this.isLoading) {
                this.isLoading = true;
                if (this.checkAfterCare() && this.student_info !== undefined && this.care_info.after_care.manually_checked_out !== true && this.parent_signature.trim().length > 0) {
                    // Check out student from after-care.
                    let currentDate = config.debug_mode ? ConvertDateToTimezone(config.test_date()) : ConvertDateToTimezone(new Date())
                    currentDate = currentDate.slice(0, 10)
                    let currentTime = new Date(config.debug_mode ? ConvertDateToTimezone(config.test_date()) : ConvertDateToTimezone(new Date()))
                    currentTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`

                    let payload = {
                        student_id: this.student_info.student_id,
                        check_out_time: currentTime,
                        check_out_date: currentDate,
                        care_type: true,
                        check_out_signature: this.parent_signature.trim()
                    }
                    console.log(payload)
                    this.$store.dispatch("CheckOutStudent", payload).then(resp => {
                        console.log(resp);
                        if (resp) {
                            this.submissionSuccess = true;
                            this.modalMessage = `Successfully checked-out ${this.student_info.first_name} ${this.student_info.last_name} from After-Care Services.`
                            this.openModal();
                        }
                        else {
                            this.submissionSuccess = false;
                            this.modalMessage = "Unable to check-out student! If the current time has exceeded the After-Care time slot, then the student is automatically checked-out.";
                            this.openModal();
                        }
                        this.isLoading = false;
                    }).catch(err => {
                        console.log(err);
                        this.isLoading = false;
                        this.submissionSuccess = false;
                        this.modalMessage = "Encountered an error checking-out the student from After-Care Services. Please contact an administrator.";
                        this.openModal();
                    })
                }        
            }
        }
    },
    beforeMount() {
        if (this.student_info === undefined) {
            this.$router.push("/kiosk")
        }
        else {
            let setDate = config.debug_mode ? config.test_date() : new Date()
            console.log(setDate)
            let currentDate = ConvertDateToTimezone(setDate).slice(0, 10)
            let payload = {
                studentID: this.student_info.student_id,
                careDate: currentDate
            }
            this.$store.dispatch("GetStudentCareInfoKiosk", payload).then(resp => {
                if (resp) {
                    console.log(resp)
                    this.care_info = resp
                }
                else {
                    console.log("Unable to retrieve student care information!")
                    this.care_info = {}
                }
            }).catch(err => {
                console.log(err)
                this.care_info = {}
            })
            this.current_time_text = this.getCurrentTime();
        }
    },
    created() {
        setInterval(() => {
            this.current_time_text = this.getCurrentTime()
        }, 1000)
    }
};
</script>