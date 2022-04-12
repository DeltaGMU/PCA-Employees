<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
                <Sidebar/>
            </div>
            <div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="deleteAccountBtnLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            Delete Student Account?
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete the student's account?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn blueBtn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#student-deleted" @click="deleteStudentAccount()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="student-deleted" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="studentDeletedLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div v-if=" deletionSuccess ">
                            <div class="modal-header">
                                Student Account Deleted!
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                The student account was successfully deleted.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="$router.push('/managestudents')">OK</button>
                            </div>
                        </div>
                        <div v-else>
                            <div class="modal-header">
                                Student Account Deletion Failed!
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                There was an error with the deletion request.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="this.$router.push('/managestudents')">OK</button>
                            </div>
                        </div>                     
                    </div>
                </div>
            </div>
            <div class="modal fade" id="student-updated" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="studentDeletedLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div v-if=" updateSuccess ">
                            <div class="modal-header">
                                Student Account Updated!
                                <button type="button" class="btn-close" aria-label="Close" @click="closeStudentUpdatedModal"></button>
                            </div>
                            <div class="modal-body">
                                The student account was successfully updated.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" @click="$router.push('/managestudents')">OK</button>
                            </div>
                        </div>
                        <div v-else>
                            <div class="modal-header">
                                Student Account Update Failed!
                                <button type="button" class="btn-close" aria-label="Close" @click="closeStudentUpdatedModal"></button>
                            </div>
                            <div class="modal-body">
                                There was an error with your update request.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" @click="closeStudentUpdatedModal">OK</button>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show" id="student-updated-backdrop" style="display: none;"></div>
            <div class="p-2 flex-grow-1">
                <form class="needs-validation" id="studentForm" novalidate>
                    <div class="topSection noSelect">
                        <div class="mb-1">
                            <h1 class="text-blue">Edit Student</h1>
                        </div>
                    </div>
                    <div>
                        <div class="noSelect">
                            <div class="mb-1">
                                <label for="firstName" class="text-blue formLabel">Student First Name</label>
                            </div>
                                
                            <input type="text" class="form-control" id="firstName" v-model="first_name" maxlength="50" required>
                            <div class="invalid-feedback">
                                Please provide a valid student first name under 50 characters.
                            </div>
                        </div>

                        <div class="noSelect">
                                <div class="mb-1">
                                    <label for="lastName" class="text-blue formLabel">Student Last Name</label>
                                </div>
                                
                                <input type="text" class="form-control" id="lastName" maxlength="50" v-model="last_name" required>
                                <div class="invalid-feedback">
                                    Please provide a valid student last name under 50 characters.
                                </div>
                        </div>

                        <div class="noSelect">
                                <div class="mb-1">
                                    <label for="carpool" class="text-blue formLabel">Carpool Number</label>
                                </div>
                                
                                <input type="number" class="form-control" id="carpool" min="0" max="10000" v-model="car_pool_number" required onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57">
                                <div class="invalid-feedback">
                                    Please provide a valid carpool number under 10,000.
                                </div>
                        </div>

                        <div class="noSelect">
                                <label for="selectGrades" class="text-blue formLabel">Grade</label>
                                <select class="form-select" v-model="grade" name="selectGrades" id="selectGrades" required>
                                    <option value="" selected disabled>Please select a grade...</option>
                                    <option v-for="(grade, index) in grades" :value="grades[index]" v-bind:key = "grade.id">{{ grades[index].name.toUpperCase() }}</option>
                                </select>
                                <div class="invalid-feedback">
                                    Please select a grade.
                                </div>
                            </div>
                        <br>
                        <hr>
                        <div class="noSelect">
                            <div class="mb-1">
                                <label for="firstNameParent1" class="text-blue formLabel">Parent #1 First Name</label>
                            </div>
                                
                            <input type="text" class="form-control" id="firstNameParent1" maxlength="50" v-model="parent_one_first_name" required>
                            <div class="invalid-feedback">
                                Please provide a valid parent first name under 50 characters.
                            </div>
                        </div>

                        <div class="noSelect">
                            <div class="mb-1">
                                <label for="lastNameParent1" class="text-blue formLabel">Parent #1 Last Name</label>
                            </div>
                                
                            <input type="text" class="form-control" id="lastNameParent1" maxlength="50" v-model="parent_one_last_name" required>
                            <div class="invalid-feedback">
                                Please provide a valid parent last name under 50 characters.
                            </div>
                        </div>

                        <div class="noSelect">
                            <div class="mb-1">
                                <label for="primaryEmail" class="text-blue formLabel">Parent #1 Email</label>
                            </div>
                                    
                            <input type="email" class="form-control" maxlength="100" id="primaryEmail" v-model="primary_email" required>
                            <div class="invalid-feedback">
                                Please provide a valid parent email under 100 characters.
                            </div>
                        </div>

                        <div class="noSelect">
                            <div class="mb-1">
                                <label for="enable_notifications_parent_one" class="text-blue formLabel">Enable email notifications for Parent #1 email?</label>
                            </div>
                                
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" value="true" name="enable_notifications_parent_one" id="notificationsParentOne_yes" v-model="enable_primary_email_notifications" required>
                                <label class="form-check-label" for="notificationsParentOne_yes" selected>
                                    Yes
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" value="false" name="enable_notifications_parent_one" id="notificationsParentOne_no" v-model="enable_primary_email_notifications" required>
                                <label class="form-check-label" for="notificationsParentOne_no">
                                    No
                                </label>
                            </div>
                        </div>
                        <br>
                        <hr>
                        <div class="noSelect">
                            <div class="mb-1">
                                <label for="firstName2" class="text-blue formLabel">Parent #2 First Name</label>
                            </div>
                                
                            <input type="text" class="form-control" id="firstName2" v-model="parent_two_first_name" placeholder="Optional...">
                        </div>

                        <div class="noSelect">
                            <div class="mb-1">
                                <label for="lastName2" class="text-blue formLabel">Parent #2 Last Name</label>
                            </div>
                                
                            <input type="text" class="form-control" id="lastName2" v-model="parent_two_last_name" placeholder="Optional...">
                            </div>                   
                        
                        <div class="form-group noSelect">
                            <div class="mb-1">
                                <label for="secondaryEmail" class="text-blue formLabel">Parent #2 Email</label>
                            </div>
                                    
                            <input type="email" class="form-control" id="secondaryEmail" v-model="secondary_email" placeholder="Optional...">
                        </div>

                        <div class="noSelect">
                            <div class="mb-1">
                                    <label for="enable_secondary_email_notification" class="text-blue formLabel">Enable email notifications for Parent #2 email?</label>
                            </div>
                                
                            <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="enable_secondary_email_notification" value="true" id="notifParentTwo_yes" :disabled = "!enableSecondaryEmailNotificationRadios" v-model="enable_secondary_email_notifications">
                                    <label class="form-check-label" for="notifParentTwo_yes">
                                        Yes
                                    </label>
                            </div>
                            <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="enable_secondary_email_notification" value="false" id="notifParentTwo_no" :disabled = "!enableSecondaryEmailNotificationRadios" v-model="enable_secondary_email_notifications">
                                    <label class="form-check-label" for="notifParentTwo_no">
                                        No
                                    </label>
                            </div>
                            <div class="invalid-feedback">Please select one of the provided options.</div>
                        </div>
                        <br>
                        <hr>
                        <div class="noSelect mb-3">
                            <div class="mb-1">
                                <label for="deleteStudentAccountBtn" class="text-blue formLabel">Delete Student Account:</label>                        
                            </div>
                            <button type="button" class="btn btn-danger" name="deleteStudentAccountBtn" id="deleteStudentAccount" data-bs-toggle="modal" data-bs-target="#confirm-delete">Delete Student Account</button>
                        </div>
                        <div class="noSelect mb-3">
                                <div class="mb-1">
                                    <label for="enable_student_account" class="text-blue formLabel">Enable or disable student account after creation:</label>
                                </div>
                                
                                <div class="form-check form-check-inline mb-1">
                                    <input class="form-check-input" type="radio" value="true" name="enable_student_account" id="enableAccount" v-model="is_enabled" required>
                                    <label class="form-check-label" for="enableAccount">
                                        Enable Account
                                    </label>
                                </div>
                                <div class="form-check form-check-inline mb-1">
                                    <input class="form-check-input" type="radio" value="false" name="enable_student_account" id="disableAccount" v-model="is_enabled" required>
                                    <label class="form-check-label" for="disableAccount">
                                        Disable Account
                                    </label>
                                </div>
                                <div class="invalid-feedback">Please select one of the provided options.</div>
                        </div>
                        <button type="button" id="updateStudentBtn" class="mb-2 btn formBtn blueBorder" @click="updateStudentAccount">
                            <span v-show="!isLoading"> Update Student </span>
                            <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                            <span v-show="isLoading"> Loading... </span>
                        </button>
                    </div>
                </form>
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
        props: {
            studentID: String
        },
        data() {
            return {
                signedIn: this.$store.getters.isAuthenticated,
                empName: this.$store.getters.StateName,
                empRole: this.$store.getters.StateRole,
                currentPage: "/editstudent",
                
                first_name: "",
                last_name: "",
                car_pool_number: "",
                grade: "",

                parent_one_first_name: "",
                parent_one_last_name: "",
                parent_two_first_name: "",
                parent_two_last_name: "",

                primary_email: "",
                secondary_email: "",
                enable_primary_email_notifications: "true",
                enable_secondary_email_notifications: "false",
                is_enabled: "true",

                grades: [],
                deletionSuccess: false,
                updateSuccess: false,
                isLoading: false,
                enableSecondaryEmailNotificationRadios: false,
                clickEvent: null,
                studentForm: null,

                studentInfo: {}
            }
        },
        watch: {
            secondary_email(value) {
                if (value && value.length > 0) {
                    this.enableSecondaryEmailNotificationRadios = true;
                }
                else {
                    this.enableSecondaryEmailNotificationRadios = false;
                }          
            }
        },
        methods: {
            openStudentUpdatedModal() {
                document.getElementById("student-updated-backdrop").style.display = "block"
                document.getElementById("student-updated").style.display = "block"
                document.getElementById("student-updated").classList.add("show")
            },
            closeStudentUpdatedModal() {
                document.getElementById("student-updated-backdrop").style.display = "none"
                document.getElementById("student-updated").style.display = "none"
                document.getElementById("student-updated").classList.remove("show")
            },
            populateFields() {
                this.first_name = this.studentInfo.first_name.charAt(0).toUpperCase() + this.studentInfo.first_name.slice(1)
                this.last_name = this.studentInfo.last_name.charAt(0).toUpperCase() + this.studentInfo.last_name.slice(1)
                this.car_pool_number = this.studentInfo.car_pool_number
                this.grade = this.studentInfo.grade
                
                this.parent_one_first_name = this.studentInfo.contact_info.parent_one_first_name.charAt(0).toUpperCase() + this.studentInfo.contact_info.parent_one_first_name.slice(1)
                this.parent_one_last_name = this.studentInfo.contact_info.parent_one_last_name.charAt(0).toUpperCase() + this.studentInfo.contact_info.parent_one_last_name.slice(1)
                this.primary_email = this.studentInfo.contact_info.primary_email
                this.enable_primary_email_notifications = this.studentInfo.contact_info.enable_primary_email_notifications ? 'true' : 'false'
                if (this.studentInfo.contact_info.parent_two_first_name !== null){
                    this.parent_two_first_name = this.studentInfo.contact_info.parent_two_first_name.charAt(0).toUpperCase() + this.studentInfo.contact_info.parent_two_first_name.slice(1)
                }
                if (this.studentInfo.contact_info.parent_two_last_name !== null) {
                    this.parent_two_last_name = this.studentInfo.contact_info.parent_two_last_name.charAt(0).toUpperCase() + this.studentInfo.contact_info.parent_two_last_name.slice(1)
                }                            
                this.secondary_email = this.studentInfo.contact_info.secondary_email
                this.enable_secondary_email_notifications = this.studentInfo.contact_info.enable_secondary_email_notifications
                this.is_enabled = this.studentInfo.is_enabled ? 'true' : 'false'

                this.enableSecondaryEmailNotificationRadios = this.secondary_email && this.secondary_email.length > 0
            },
            deleteStudentAccount () {
                this.$store.dispatch("DeleteStudent", {studentID: this.studentID}).then(resp => {
                    if (resp) {
                        this.deletionSuccess = true
                        this.clearAllFields()
                    }
                    else {
                        this.deletionSuccess = false
                    }
                    
                })
            },
            updateStudentAccount() {
                if (!this.isLoading && this.studentForm.checkValidity()) {
                    this.isLoading = true;
                    let payload = {
                        "first_name": this.first_name,
                        "last_name": this.last_name,
                        "car_pool_number": parseInt(this.car_pool_number),
                        "parent_one_first_name": this.parent_one_first_name,
                        "parent_one_last_name": this.parent_one_last_name,
                        "parent_two_first_name": this.parent_two_first_name,
                        "parent_two_last_name": this.parent_two_last_name,
                        "primary_email": this.primary_email,
                        "secondary_email": this.secondary_email,
                        "grade": this.grade.name,
                        "is_enabled": this.is_enabled === "true",
                        "enable_primary_email_notifications": this.enable_primary_email_notifications === "true",
                    }
                    if(this.enableSecondaryEmailNotificationRadios) {
                        payload["enable_secondary_email_notifications"] = this.enable_secondary_email_notifications === "true"
                    }
                    this.$store.dispatch("UpdateStudent", {"studentID" : this.studentID, "payload" : payload}).then(resp => {
                        if(resp) {
                            this.updateSuccess = true
                        }
                        else {
                            this.updateSuccess = false
                        }
                        this.isLoading = false
                        this.openStudentUpdatedModal()
                    }).catch(err => {
                        console.log(err)
                        this.updateSuccess = false
                        this.isLoading = false
                        this.openStudentUpdatedModal()
                    }).then(() => {
                        this.$store.dispatch("GetStudentInfo", this.studentID).then(resp => {
                            if (resp) {
                                this.studentInfo = resp
                            }
                        }).then(() => {this.populateFields()})
                    })
                }
            },
            clearAllFields() {
                this.first_name = ""
                this.last_name = ""
                this.car_pool_number = ""
                this.grade = ""
                this.parent_one_first_name = ""
                this.parent_one_last_name = ""
                this.primary_email = ""
                this.parent_two_first_name = ""
                this.parent_two_last_name = ""
                this.secondary_email = ""
                this.enable_primary_email_notifications = "true"
                this.enable_secondary_email_notifications = "false"
                this.is_enabled = "true"
                this.isLoading = false
                this.studentForm.classList.remove('was-validated')
            }
        },
        mounted() {
            if (this.studentID === undefined) {
                this.$router.push('/managestudents')
            }
            this.$store.dispatch("GetStudentInfo", this.studentID).then(resp => {
                if (resp) {
                    this.studentInfo = resp
                }
            }).then(() => {this.populateFields()})

            this.studentForm = document.getElementById("studentForm")
            this.submitButton = document.getElementById("updateStudentBtn")

            this.submitButton.addEventListener('click', 
                function (event) {
                    let form = document.getElementById("studentForm")
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            this.clickEvent = new Event('click');
        },
        beforeMount() {
            this.$store.dispatch("GetAllStudentGrades").then(
                (resp) => {
                    if (resp !== undefined) {
                        this.grades = resp
                    }
                }
            );
        },
    }
</script>

