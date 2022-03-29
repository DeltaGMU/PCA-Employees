<template>
    <div class="d-flex">
        <div class="p-2">
            <Sidebar></Sidebar>
        </div>
        <div v-if="showModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">                    
                            <div class="modal-header" v-if="submissionSuccess">
                                <h5>Account Successfully Created!</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="showModal = false"></button>
                            </div>
                            <div class="modal-header" v-else>
                                <h5>Account Creation Failed!</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"  @click="showModal = false"></button>
                            </div>
                            <div class="modal-body" v-if="submissionSuccess">
                                Successfully created the employee account. The primary email should receive an Employee ID and temporary password soon!
                            </div>
                            <div class="modal-body" v-else>
                                Encountered an error creating the employee. Please try again and ensure the required fields are filled correctly.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn" :class="submissionSuccess ? 'blueBtn' : 'btn-danger'" data-bs-dismiss="modal" @click="showModal = false">Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div class="modal-backdrop fade d-none" ref="backdrop"></div>
        <div class="p-2 flex-grow-1">
            <form class="needs-validation" id="employee-form" ref="form" novalidate>
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
                                <label for="role" class="text-blue formLabel leaveLabel">Select Role</label>
                            </div>

                            <select class="form-select" name="role" id="role" v-model="form_role_selection" required>
                                <option selected disabled value="">Please select a role...</option>
                                <option value="administrator">Administrator</option>
                                <option value="employee">Employee</option>
                            </select>
                        </div>

                        <div class="form-group noSelect">
                            <div class="mb-1">
                                <label for="primaryEmail" class="text-blue formLabel">Primary Email</label>
                            </div>
                            
                            <input type="text" class="form-control" id="primaryEmail" autocomplete="off" v-model="form_primary_email" placeholder="Employee primary email..." required maxlength="100">
                            <div class="invalid-feedback">
                                Please provide a valid email address under 100 characters.
                            </div>
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
                                <label for="primaryEmailNotification" class="text-blue formLabel">Enable email notifications for primary email?</label>
                            </div>
                            
                            <div class="form-check">
                                <input class="form-check-input" name="primaryEmailNotification" type="radio" v-model="form_enable_primary_email_notifications" value="true" id="primaryEmailNotificationEnabled" required>
                                <label class="form-check-label" for="primaryEmailNotificationEnabled">
                                    Yes
                                </label>
                                </div>
                                <div class="form-check">
                                <input class="form-check-input" name="primaryEmailNotification" type="radio" v-model="form_enable_primary_email_notifications" value="false" id="primaryEmailNotificationDisabled" required>
                                <label class="form-check-label" for="primaryEmailNotificationDisabled">
                                    No
                                </label>
                            </div>
                            <div class="invalid-feedback">Please select one of the provided options.</div>
                        </div>

                        <div class="form-group noSelect">
                            <div class="mb-1">
                                <label for="secondaryEmailNotification" class="text-blue formLabel">Enable email notifications for secondary email?</label>
                            </div>
                            
                            <div class="form-check">
                                <input class="form-check-input" name="secondaryEmailNotification" value="true" :disabled="enableSecondaryEmailNotificationRadios == 'true'" type="radio" v-model="form_enable_secondary_email_notifications" id="secondaryEmailNotificationEnabled">
                                <label class="form-check-label" for="secondaryEmailNotificationEnabled">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" name="secondaryEmailNotification" value="false" :disabled="enableSecondaryEmailNotificationRadios == 'true'" type="radio" v-model="form_enable_secondary_email_notifications" id="secondaryEmailNotificationDisabled">
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
                                <input class="form-check-input" type="radio" v-model="form_enable_extra_hours" value="true" name="extraHoursOptions" id="extraHoursOptions extraHoursEnabled" required>
                                <label class="form-check-label" for="extraHoursEnabled">
                                    Enable Extra Hours
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" v-model="form_enable_extra_hours" value="false" name="extraHoursOptions" id="extraHoursOptions extraHoursDisabled" required>
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
                                <input class="form-check-input" type="radio" v-model="form_enable_account" value="true" name="employeeAccountActivation" id="employeeAccountActivation employeeAccountEnabled" required>
                                <label class="form-check-label" for="employeeAccountEnabled">
                                    Enable Account
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" v-model="form_enable_account" value="false" name="employeeAccountActivation" id="employeeAccountActivation employeeAccountDisabled" required>
                                <label class="form-check-label" for="employeeAccountDisabled">
                                    Disable Account
                                </label>
                            </div>
                            <div class="invalid-feedback">Please select one of the provided options.</div>
                        </div>
                    </div>
                    <br/>
                    <button type="button" class="btn blueBtn" @click="submit" data-bs-toggle="modal" data-bs-target="#employeeModal">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Sidebar from "../components/Sidebar.vue";

    export default {
        components: {
            Sidebar
        },
        data() {
            return {
                enableSecondaryEmailNotificationRadios: false,
                submissionSuccess: false,
                showModal: false,

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
                if (secondary_email.length > 0) {
                    this.enableSecondaryEmailNotificationRadios = true;
                }
                this.enableSecondaryEmailNotificationRadios = false;
            }
        },
        methods: {
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
            },
            async submit(e) {
                // Fetch all the forms we want to apply custom Bootstrap validation styles to
                var forms = document.querySelectorAll('.needs-validation')

                // Loop over them and prevent submission
                Array.prototype.slice.call(forms)
                    .forEach(function (form) {
                        form.addEventListener('submit', function (event) {
                            if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                            }

                            form.classList.add('was-validated')
                        }, false)
                    })       
                
                let payload = {
                    "first_name": this.form_first_name,
                    "last_name": this.form_last_name,
                    "primary_email": this.form_primary_email,
                    "secondary_email": this.form_secondary_email,
                    "role": this.form_role_selection,
                    "enable_primary_email_notifications": this.form_enable_primary_email_notifications === 'true',
                    "enable_secondary_email_notifications": this.form_enable_secondary_email_notifications === 'true',
                    "pto_hours_enabled": this.form_enable_pto_hours === 'true',
                    "extra_hours_enabled": this.form_enable_extra_hours === 'true',
                    "is_enabled": this.form_enable_account === 'true'
                }
                console.log(payload)
                await this.$store.dispatch("CreateNewEmployee", payload).then(
                    resp => {
                        if (resp === true) {
                            this.submissionSuccess = true;
                        }
                        else {
                            this.submissionSuccess = false;
                        }
                        this.clearAllFields();
                        this.showModal = true;
                    }
                ).catch(err => {
                    console.log(err);
                    this.showModal = false;
                    this.submissionSuccess = false;
                })
                e.preventDefault();
            },
        }
    }
</script>

