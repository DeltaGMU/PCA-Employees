<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
                <Sidebar/>
            </div>
            <div class="modal fade" id="reset-password" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="passwordResetLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header" v-if="passwordResetRequestSuccess">
                            Sent Password Reset Request!
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closePasswordModal"></button>
                        </div>
                        <div class="modal-header" v-else>
                            Failed To Send Request!
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closePasswordModal"></button>
                        </div>
                        <div class="modal-body" v-if="passwordResetRequestSuccess">
                            Successfully sent a password reset request to the employee's primary email!
                        </div>
                        <div class="modal-body" v-else>
                            Encountered an error when trying to send a password reset request for the employee.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn blueBtn" data-bs-dismiss="modal" @click="closePasswordModal">OK</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show" id="reset-password-backdrop" style="display: none;"></div>
            <div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="deletEmployeeBtnLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            Delete Employee Account?
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete the employee's account?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn blueBtn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#employee-deleted" @click="deleteEmployeeAccount()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="employee-deleted" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="employeeDeletedLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div v-if=" deletionSuccess ">
                            <div class="modal-header">
                                Employee Account Deleted!
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                The employee account was successfully deleted.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="$router.push('/manageemployees')">OK</button>
                            </div>
                        </div>
                        <div v-else>
                            <div class="modal-header">
                                Employee Account Deletion Failed!
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                There was an error with the deletion request.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="this.$router.push('/manageemployees')">OK</button>
                            </div>
                        </div>                     
                    </div>
                </div>
            </div>
            <div class="modal fade" id="employee-updated" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="employeeDeletedLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div  v-if= "updateSuccess">
                            <div class="modal-header">
                                Employee Account Updated!
                                <button type="button" class="btn-close" aria-label="Close" @click="closeEmployeeUpdatedModal"></button>
                            </div>
                            <div class="modal-body">
                                The employee account was successfully updated.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="$router.push('/manageemployees')">OK</button>
                            </div>
                        </div>
                        <div v-else>
                            <div class="modal-header">
                                Employee Account Update Failed!
                                <button type="button" class="btn-close" aria-label="Close" @click="closeEmployeeUpdatedModal"></button>
                            </div>
                            <div class="modal-body">
                                There was an error with your update request.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" @click="closeEmployeeUpdatedModal">OK</button>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show" id="employee-updated-backdrop" style="display: none;"></div>
            <div class="p-2 flex-grow-1">
                <form class="needs-validation" id="employeeForm">
                    <div class="topSection noSelect">
                        <div class="mb-1">
                            <h1 class="text-blue">Edit Employee</h1>
                        </div>
                    </div>

                    <div>
                        <div class="noSelect">
                            <div class="mb-1">
                                <label for="firstName" class="text-blue formLabel"> First Name</label>
                            </div>
                                
                            <input type="text" class="form-control" id="firstName" placeholder="Employee first name..." v-model="first_name" maxlength="50" required>
                            <div class="invalid-feedback">
                                Please provide a valid employee first name under 50 characters.
                            </div>
                        </div>

                        <div class="noSelect">
                                <div class="mb-1">
                                    <label for="lastName" class="text-blue formLabel">Employee Last Name</label>
                                </div>
                                
                                <input type="text" class="form-control" id="lastName" placeholder="Employee last name..." maxlength="50" v-model="last_name" required>
                                <div class="invalid-feedback">
                                    Please provide a valid employee last name under 50 characters.
                                </div>
                        </div>

                        <div>
                            <div class="mb-1">
                                <label for="passwordChange" class="text-blue formLabel">Password</label>
                                <br/><small>This will send a password reset request to the employee's primary email.</small><br>
                                <button type="button" class="mt-2 btn blueBtn" id="passwordChange" @click="sendPasswordResetRequest">Send Reset Password Request</button>
                            </div>
                        </div>

                        <div class="noSelect">
                            <div class="mb-1">
                                <label for="employeeRole" class="text-blue formLabel leaveLabel">Select Role</label>
                            </div>

                            <select class="form-control" name="employeeRole" id="employeeRole" v-model="roleSelection" required>
                                <option selected disabled value="">Please select a role...</option>
                                <option value="Administrator">Administrator</option>
                                <option value="Employee"> Employee</option>
                            </select>
                             <div class="invalid-feedback">
                                Please select a role.
                            </div>
                        </div>

                        <div class="noSelect">
                            <div class="mb-1">
                               <label for="primaryEmail" class="text-blue formLabel">Primary Email</label>
                             </div>
                                    
                             <input type="email" class="form-control" id="primaryMail" v-model="primary_email" placeholder="Employee primary email..." maxLength ="100" required>
                            <div class="invalid-feedback">
                                Please provide a valid primary email under 100 characters.
                            </div>
                         </div>

                          <div>
                            <div class="mb-1">
                                <label for="pass" class="text-blue formLabel">Enable email notifications for primary email?</label>
                            </div>
                                
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" value = "true"  name="flexRadioDefault1" id="pass flexRadioDefault1" v-model="enable_primary_email_notifications" required>
                                <label class="form-check-label" for="flexRadioDefault1" v-bind:selected = "enable_primary_email_notifications">
                                    Yes
                                </label>
                            </div>

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" value = "false" name="flexRadioDefault1" id="pass flexRadioDefault1" v-model="enable_primary_email_notifications" required>
                                <label class="form-check-label" for="flexRadioDefault1" v-bind:selected = "enable_primary_email_notifications">
                                    No
                                </label>
                            </div>          
                        </div>

                        
                         <div class="noSelect">
                            <div class="mb-1">
                                 <label for="secondaryEmail" class="text-blue formLabel leaveLabel">Secondary Email [Optional]</label>
                            </div>
                                    
                            <input type="email" class="form-control" id="secondaryEmail" v-model="secondary_email" placeholder="Optional...">
                        </div>

                        <div>
                            <div class="mb-1">
                                <label for="notification" class="text-blue formLabel">Enable email notifications for secondary email?</label>
                            </div>
                                
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" value = "true" name="flexRadioDefault2" id="notification flexRadioDefault2" :disabled="!enableSecondaryEmailNotificationRadios" v-model="enable_secondary_email_notifications">
                                <label class="form-check-label" for="flexRadioDefault2" v-bind:selected = "enable_secondary_email_notifications">
                                    Yes
                                </label>
                            </div>

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" value = "false" name="flexRadioDefault2" id="notification flexRadioDefault2" :disabled="!enableSecondaryEmailNotificationRadios" v-model="enable_secondary_email_notifications">
                                <label class="form-check-label" for="flexRadioDefault2" v-bind:selected = "enable_secondary_email_notifications">
                                    No
                                </label>
                            </div>
                        </div>
                        
                        <hr>
                        <div class="noSelect">
                            <div class="mb-1">
                                <label for="ptoHoursOptions" class="text-blue formLabel">Enable or disable PTO hours in employee timesheet:</label>
                             </div>
                                
                            <div class="form-check">
                                <input class="form-check-input" type="radio"  value="true" name="ptoHoursOptions" id="ptoHoursEnabled" v-model="enable_pto_hours">
                                <label class="form-check-label" for="ptoHoursEnabled" v-bind:selected= "enable_pto_hours">
                                    Enable PTO Hours
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" value="false" name="ptoHoursOptions" id="ptoHoursDisabled" v-model="enable_pto_hours">
                                <label class="form-check-label" for="ptoHoursDisabled" v-bind:selected= "enable_pto_hours">
                                    Disable PTO Hours
                                </label>
                            </div>
                            <div class="invalid-feedback">Please select one of the provided options.</div>
                        </div>
                        <div class="noSelect">
                            <div class="mb-1">
                                <label for="extraHoursOptions" class="text-blue formLabel">Enable or disable Extra hours in employee timesheet:</label>
                            </div>
                            
                            <div class="form-check">
                                <input class="form-check-input" type="radio" value="true" name="extraHoursOptions" id="extraHoursEnabled" v-model="enable_extra_hours">
                                <label class="form-check-label" for="extraHoursEnabled" v-bind:selected= "enable_extra_hours">
                                    Enable Extra Hours
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" value="false" name="extraHoursOptions" id="extraHoursDisabled" v-model="enable_extra_hours">
                                <label class="form-check-label" for="extraHoursDisabled" v-bind:selected= "enable_extra_hours">
                                    Disable Extra Hours
                                </label>
                            </div>
                            <div class="invalid-feedback">Please select one of the provided options.</div>
                        </div>

                        <hr>
                        
                        <div class="noSelect">
                            <div class="mb-1">
                                <label for="deleteEmployeeAccountBtn" class="text-blue formLabel">Delete Employee Account:</label><br/>
                                <small v-if="!canDelete">Unable to delete an employee account with existing timesheet records.<br></small>
                                <button type="button" class="btn btn-danger" name="deleteEmployeeAccountBtn" :disabled="!canDelete" id="deleteEmployeeAccount" data-bs-toggle="modal" data-bs-target="#confirm-delete">
                                    Delete Account
                                </button>
                            </div>
                         </div>
                    
                        <div class="noSelect">
                            <div>
                                <label for="employeeOptions" class="text-blue formLabel">Enable or disable employee account:</label>
                            </div>
                                
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" value = "true" name="employeeOptions" id="employeeEnabled" v-model="is_enabled">
                                <label class="form-check-label" for="employeeEnabled" v-bind:selected= "is_enabled">
                                    Enable Account
                                </label>
                            </div>
        
                           <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" value = "false" name="employeeOptions" id="employeeDisabled" v-model="is_enabled">
                                <label class="form-check-label" for="employeeEnabled" v-bind:selected= "is_enabled">
                                     Disable Account
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <br/>

                    <button type="button" id="updateEmpBtn" class="mb-2 btn formBtn blueBorder" @click="updateEmployeeAccount()">
                        <span v-show="!isLoading"> Update Employee </span>
                        <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                        <span v-show="isLoading"> Loading... </span>
                    </button>
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
            employeeID: String
        },
        data() {
            return {
                signedIn: this.$store.getters.isAuthenticated,
                empName: this.$store.getters.StateName,
                empRole: this.$store.getters.StateRole,
                currentPage: "/editemployee",
                
                roleSelection: "",

                first_name: "",
                last_name: "",

                role: "",
                primary_email: "",
                secondary_email: "",
                enable_primary_email_notifications: "true",
                enable_secondary_email_notifications: "false",
                is_enabled: "true",
                enable_pto_hours: "true",
                enable_extra_hours: "true",
                canDelete: false,

                deletionSuccess: false,
                updateSuccess: false,
                isLoading: false,
                enableSecondaryEmailNotificationRadios: false,
                clickEvent: null,
                employeeForm: null,

                employeeInfo: {},
                passwordResetRequestSuccess: false,
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
            openPasswordModal() {
                document.getElementById("reset-password-backdrop").style.display = "block"
                document.getElementById("reset-password").style.display = "block"
                document.getElementById("reset-password").classList.add("show")
            },
            closePasswordModal() {
                document.getElementById("reset-password-backdrop").style.display = "none"
                document.getElementById("reset-password").style.display = "none"
                document.getElementById("reset-password").classList.remove("show")
            },
            openEmployeeUpdatedModal() {
                document.getElementById("employee-updated-backdrop").style.display = "block"
                document.getElementById("employee-updated").style.display = "block"
                document.getElementById("employee-updated").classList.add("show")
            },
            closeEmployeeUpdatedModal() {
                document.getElementById("employee-updated-backdrop").style.display = "none"
                document.getElementById("employee-updated").style.display = "none"
                document.getElementById("employee-updated").classList.remove("show")
            },
            populateFields() {
                this.first_name = this.employeeInfo.first_name.charAt(0).toUpperCase() + this.employeeInfo.first_name.slice(1)
                this.last_name = this.employeeInfo.last_name.charAt(0).toUpperCase() + this.employeeInfo.last_name.slice(1)
                this.role = this.employeeInfo.role.name.charAt(0).toUpperCase() + this.employeeInfo.role.name.slice(1)
                
                this.findRole()

                this.primary_email = this.employeeInfo.contact_info.primary_email
                this.enable_primary_email_notifications = this.employeeInfo.contact_info.enable_primary_email_notifications ? 'true' : 'false'

                this.secondary_email = this.employeeInfo.contact_info.secondary_email
                this.enable_secondary_email_notifications = this.employeeInfo.contact_info.enable_secondary_email_notifications ? 'true' : 'false'

                this.enable_pto_hours = this.employeeInfo.pto_hours_enabled ? 'true' : 'false'
                this.enable_extra_hours = this.employeeInfo.extra_hours_enabled ? 'true' : 'false'
                this.is_enabled = this.employeeInfo.is_enabled ? 'true' : 'false'

                this.canDelete = this.employeeInfo.can_delete

                this.enableSecondaryEmailNotificationRadios = this.secondary_email && this.secondary_email.length > 0

                // console.log(this.employeeInfo)
            },

            findRole() {
                if (this.role == "Administrator"){
                    this.roleSelection = "Administrator"
                }
                else if (this.role == "Employee"){
                    this.roleSelection = "Employee"
                }
                else {
                    this.roleSelection = ""
                }
            },

            deleteEmployeeAccount() {
                this.$store.dispatch("DeleteEmployee", this.employeeID).then(resp => {
                    if (resp) {
                        this.deletionSuccess = true
                        this.clearAllFields()
                    }
                    else {
                        this.deletionSuccess = false
                    }
                }).catch(err => {
                    console.log(err)
                    this.deletionSuccess = false
                })
            },

            updateEmployeeAccount() {
                if (!this.isLoading && this.employeeForm.checkValidity()) {
                    this.isLoading = true;
                
                    let payload = {
                        "employee_id": this.employeeID,
                        "first_name": this.first_name,
                        "last_name": this.last_name,
                        "primary_email": this.primary_email,
                        "role": this.roleSelection,
                        "pto_hours_enabled": this.enable_pto_hours === "true",
                        "extra_hours_enabled": this.enable_extra_hours === "true",
                        "is_enabled": this.is_enabled === "true",
                        "enable_primary_email_notifications": this.enable_primary_email_notifications === "true",
                    }

                    if(this.enableSecondaryEmailNotificationRadios) {
                        payload["enable_secondary_email_notifications"] = this.enable_secondary_email_notifications === "true"
                    }
                    if(this.secondary_email !== null && this.secondary_email !== ""){
                        payload["secondary_email"] = this.secondary_email
                    }
    
                    this.$store.dispatch("UpdateEmployee", payload).then(resp => {
                        if(resp) {
                            this.employeeInfo = resp
                            this.updateSuccess = true
                        }
                        else {
                            this.updateSuccess = false
                        }
                        this.isLoading = false
                        this.openEmployeeUpdatedModal()
                    }).catch(err => {
                        console.log(err)
                        this.updateSuccess = false
                        this.isLoading = false
                        this.openEmployeeUpdatedModal()
                    }).then(() => {
                        this.$store.dispatch("GetEmployeeInfo", this.employeeID).then(resp => {
                            if (resp) {
                                this.employeeInfo = resp
                            }
                        }).then(() => {this.populateFields()})
                    })
                }
            },
            
            sendPasswordResetRequest() {
                let payload = {
                    employee_id: this.employeeInfo.employee_id
                }
                this.$store.dispatch("ForgotPassword", payload).then(resp => {
                    if (resp && resp === true) {
                        this.passwordResetRequestSuccess = true;
                    }
                    else {
                        this.passwordResetRequestSuccess = false;
                    }
                    this.openPasswordModal()
                }).catch(err => {
                    console.log(err)
                    this.passwordResetRequestSuccess = false;
                    this.openPasswordModal()
                })
            },

            clearAllFields() {
                this.first_name = ""
                this.last_name = ""
                this.primary_email = ""
                this.secondary_email = ""
                this.enable_primary_email_notifications = "true"
                this.enable_secondary_email_notifications = "false"
                this.enable_pto_hours = "true"
                this.enable_extra_hours = "true"
                this.is_enabled = "true"
                this.isLoading = false
                this.canDelete = false
                this.employeeForm.classList.remove('was-validated')
            }
        },
        mounted() {
            if (this.employeeID === undefined) {
                this.$router.push('/manageemployees')
            }
            this.$store.dispatch("GetEmployeeInfo", this.employeeID).then(resp => {
                if (resp) {
                    this.employeeInfo = resp
                }
            }).then(() => {this.populateFields()})

            this.employeeForm = document.getElementById("employeeForm")
            this.submitButton = document.getElementById("updateEmpBtn")

            this.submitButton.addEventListener('click', 
                function (event) {
                    let form = document.getElementById("employeeForm")
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            this.clickEvent = new Event('click');
        },
        
    }
</script>

