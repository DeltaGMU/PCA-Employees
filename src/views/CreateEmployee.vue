<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
                <Sidebar/>
            </div>
            <div class="modal fade" id="employeeModal" tabindex="-1" aria-labelledby="employeeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">                    
                        <div class="modal-header" v-if="submissionSuccess">
                            <h5 class="modal-title">Account Successfully Created!</h5>
                            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                        </div>
                        <div class="modal-header" v-else>
                            <h5 class="modal-title">Account Creation Failed!</h5>
                            <button type="button" class="btn-close" aria-label="Close"  @click="closeModal"></button>
                        </div>
                        <div class="modal-body" v-if="submissionSuccess">
                            Successfully created the employee account. The primary email should receive an Employee ID and temporary password soon!
                        </div>
                        <div class="modal-body" v-else>
                            Encountered an error creating the employee account. Please try again and ensure the required fields are filled correctly.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn" :class="submissionSuccess ? 'btn-success' : 'btn-danger'" @click="closeModal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show" id="backdrop" style="display: none;"></div>
            <div class="p-2 flex-grow-1">
                <form class="needs-validation" id="employeeForm" ref="form" novalidate>
                    <div>
                        <div class="topSection noSelect">
                            <div class="mb-1">
                                <h1 class="text-blue">Create Employee</h1>
                            </div>
                        </div>
                        <hr>
                        <div>
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="firstName" class="text-blue formLabel">First Name</label>
                                </div>
                                <input type="text" class="form-control" autocomplete="off" id="firstName" v-model="form_first_name" placeholder="Employee first name..." maxlength="50" required>  
                                <div class="invalid-feedback">
                                    Please provide a valid employee first name under 50 characters.
                                </div>
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="lastName" class="text-blue formLabel">Last Name</label>
                                </div>
                                <input type="text" class="form-control" autocomplete="off" id="lastName" v-model="form_last_name" placeholder="Employee last name..." maxlength="50" required>
                                <div class="invalid-feedback">
                                    Please provide a valid employee last name under 50 characters.
                                </div>
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="password" class="text-blue formLabel">Password</label>
                                </div>
                                <input style="text-overflow: ellipsis;" disabled type="text" class="form-control" id="password" value="The password will be automatically generated and sent to the primary email.">
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="role" class="text-blue formLabel">Select Role</label>
                                </div>

                                <select class="form-select" name="role" id="role" v-model="form_role_selection" required>
                                    <option selected disabled value="">Please select a role...</option>
                                    <option value="administrator">Administrator</option>
                                    <option value="employee">Employee</option>
                                </select>
                                <div class="invalid-feedback">
                                    Please select an employee role.
                                </div>
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="primaryEmail" class="text-blue formLabel">Primary Email</label>
                                </div>
                                
                                <input type="text" class="form-control" id="primaryEmail" autocomplete="off" v-model="form_primary_email" placeholder="Employee primary email..." maxlength="100" required>
                                <div class="invalid-feedback">
                                    Please provide a valid email address under 100 characters.
                                </div>
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="primaryEmailNotification" class="text-blue formLabel">Enable email notifications for primary email?</label>
                                </div>
                                
                                <div class="form-check">
                                    <input class="form-check-input" name="primaryEmailNotification" value="true" type="radio" v-model="form_enable_primary_email_notifications" id="primaryEmailNotificationEnabled" required>
                                    <label class="form-check-label" for="primaryEmailNotificationEnabled">
                                        Yes
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name="primaryEmailNotification" value="false" type="radio" v-model="form_enable_primary_email_notifications" id="primaryEmailNotificationDisabled" required>
                                    <label class="form-check-label" for="primaryEmailNotificationDisabled">
                                        No
                                    </label>
                                </div>
                                <div class="invalid-feedback">Please select one of the provided options.</div>
                            </div>
                        
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="secondaryEmail" class="text-blue formLabel leaveLabel">Secondary Email [Optional]</label>
                                </div>
                                
                                <input type="text" class="form-control" id="secondaryEmail" autocomplete="off" v-model="form_secondary_email" placeholder="Optional employee secondary email..." maxlength="100">
                                <div class="invalid-feedback">
                                    Please provide a valid email address under 100 characters.
                                </div>
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="secondaryEmailNotification" class="text-blue formLabel">Enable email notifications for secondary email?</label>
                                </div>
                                
                                <div class="form-check">
                                    <input class="form-check-input" name="secondaryEmailNotification" value="true" :disabled="!enableSecondaryEmailNotificationRadios" type="radio" v-model="form_enable_secondary_email_notifications" id="secondaryEmailNotificationEnabled">
                                    <label class="form-check-label" for="secondaryEmailNotificationEnabled">
                                        Yes
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name="secondaryEmailNotification" value="false" :disabled="!enableSecondaryEmailNotificationRadios" type="radio" v-model="form_enable_secondary_email_notifications" id="secondaryEmailNotificationDisabled">
                                    <label class="form-check-label" for="secondaryEmailNotificationDisabled">
                                        No
                                    </label>
                                </div>
                            </div>
                            
                            <hr>
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="ptoHoursOptions" class="text-blue formLabel">Enable or disable PTO hours in employee timesheet:</label>
                                </div>
                                
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" v-model="form_enable_pto_hours" value="true" name="ptoHoursOptions" id="ptoHoursEnabled" required>
                                    <label class="form-check-label" for="ptoHoursEnabled">
                                        Enable PTO Hours
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" v-model="form_enable_pto_hours" value="false" name="ptoHoursOptions" id="ptoHoursDisabled" required>
                                    <label class="form-check-label" for="ptoHoursDisabled">
                                        Disable PTO Hours
                                    </label>
                                </div>
                                <div class="invalid-feedback">Please select one of the provided options.</div>
                            </div>
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="extraHoursOptions" class="text-blue formLabel">Enable or disable Extra hours in employee timesheet:</label>
                                </div>
                                
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" v-model="form_enable_extra_hours" value="true" name="extraHoursOptions" id="extraHoursEnabled" required>
                                    <label class="form-check-label" for="extraHoursEnabled">
                                        Enable Extra Hours
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" v-model="form_enable_extra_hours" value="false" name="extraHoursOptions" id="extraHoursDisabled" required>
                                    <label class="form-check-label" for="extraHoursDisabled">
                                        Disable Extra Hours
                                    </label>
                                </div>
                                <div class="invalid-feedback">Please select one of the provided options.</div>
                            </div>
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="employeeAccountActivation" class="text-blue formLabel">Enable or disable employee account after creation:</label>
                                </div>
                                
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" v-model="form_enable_account" value="true" name="employeeAccountActivation" id="employeeAccountEnabled" required>
                                    <label class="form-check-label" for="employeeAccountEnabled">
                                        Enable Account
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" v-model="form_enable_account" value="false" name="employeeAccountActivation" id="employeeAccountDisabled" required>
                                    <label class="form-check-label" for="employeeAccountDisabled">
                                        Disable Account
                                    </label>
                                </div>
                                <div class="invalid-feedback">Please select one of the provided options.</div>
                            </div>
                        </div>
                        <br/>
                        <button type="button" id="submitEmployeeFormBtn" class="mb-3 btn formBtn blueBorder" @click="submit">
                            <span v-show="!isLoading"> Create Employee </span>
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
        data() {
            return {
                signedIn: this.$store.getters.isAuthenticated,
                empName: this.$store.getters.StateName,
                empRole: this.$store.getters.StateRole,
                currentPage: "/createemployee",

                enableSecondaryEmailNotificationRadios: false,
                submissionSuccess: false,
                isLoading: false,
                submitButton: null,
                employeeForm: null,
                clickEvent: null,

                form_first_name: "",
                form_last_name: "",
                form_role_selection: "",
                form_primary_email: "",
                form_secondary_email: "",
                form_enable_primary_email_notifications: "true",
                form_enable_secondary_email_notifications: "false",
                form_enable_pto_hours: "true",
                form_enable_extra_hours: "true",
                form_enable_account: "true"
            }
        },
        watch: {
            form_secondary_email(secondary_email) {
                if (secondary_email && secondary_email.length > 0) {
                    this.enableSecondaryEmailNotificationRadios = true;
                }
                else {
                    this.enableSecondaryEmailNotificationRadios = false;
                }
            }
        },
        mounted() {
            this.closeModal();
            this.submitButton = document.getElementById("submitEmployeeFormBtn")
            this.employeeForm = document.getElementById("employeeForm")
            this.submitButton.addEventListener('click', 
                function (event) {
                    let form = document.getElementById("employeeForm")
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false);
            this.clickEvent = new Event('click');
        },
        methods: {
            openModal() {
                document.getElementById("backdrop").style.display = "block"
                document.getElementById("employeeModal").style.display = "block"
                document.getElementById("employeeModal").classList.add("show")
            },

            closeModal() {
                document.getElementById("backdrop").style.display = "none"
                document.getElementById("employeeModal").style.display = "none"
                document.getElementById("employeeModal").classList.remove("show")
            },
            clearAllFields() {
                this.form_first_name = "",
                this.form_last_name = "",
                this.form_role_selection = "",
                this.form_primary_email = "",
                this.form_secondary_email = "",
                this.form_enable_primary_email_notifications = "true",
                this.form_enable_secondary_email_notifications = "false",
                this.form_enable_pto_hours = "true",
                this.form_enable_extra_hours = "true",
                this.form_enable_account = "true"
                this.isLoading = false
                this.employeeForm.classList.remove('was-validated')
            },
            async submit(e) {                
                let payload = {
                    "first_name": this.form_first_name,
                    "last_name": this.form_last_name,
                    "primary_email": this.form_primary_email,
                    "secondary_email": this.form_secondary_email,
                    "role": this.form_role_selection,
                    "enable_primary_email_notifications": this.form_enable_primary_email_notifications === 'true',
                    "pto_hours_enabled": this.form_enable_pto_hours === 'true',
                    "extra_hours_enabled": this.form_enable_extra_hours === 'true',
                    "is_enabled": this.form_enable_account === 'true'
                }
                if (this.enableSecondaryEmailNotificationRadios) {
                    payload["enable_secondary_email_notifications"] = this.form_enable_secondary_email_notifications === 'true'
                }

                if (!this.isLoading && this.employeeForm.checkValidity()) {
                    console.log(payload)
                    this.isLoading = true;
                    await this.$store.dispatch("CreateNewEmployee", payload).then(
                        resp => {
                            if (resp === true) {
                                this.submissionSuccess = true;
                                this.clearAllFields();
                            }
                            else {
                                this.submissionSuccess = false;
                            }
                            this.isLoading = false;
                            this.openModal()
                        }
                    ).catch(err => {
                        console.log(err);
                        this.isLoading = false;
                        this.submissionSuccess = false;
                        this.openModal();
                    })
                }
                e.preventDefault();
            },
        }
    }
</script>

