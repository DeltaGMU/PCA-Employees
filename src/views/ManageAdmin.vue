<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
                <Sidebar/>
            </div>
            <div class="modal fade" id="adminModal" tabindex="-1" aria-labelledby="adminModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">                    
                        <div class="modal-header" v-if="submissionSuccess">
                            <h5 class="modal-title">Account Successfully Updated!</h5>
                            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                        </div>
                        <div class="modal-header" v-else>
                            <h5 class="modal-title">Account Update Failed!</h5>
                            <button type="button" class="btn-close" aria-label="Close"  @click="closeModal"></button>
                        </div>
                        <div class="modal-body" v-if="submissionSuccess">
                            Successfully updated your administrator account.
                        </div>
                        <div class="modal-body" v-else>
                            Encountered an error updating your administrator account. Please try again and ensure the required fields are filled correctly.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn" :class="submissionSuccess ? 'blueBtn' : 'btn-danger'" @click="closeModal">OK</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show" id="adminBackdrop" style="display: none;"></div>
            <div class="modal-backdrop fade show" id="passwordBackdrop" style="display: none;"></div>
            <div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">                    
                        <div class="modal-header">
                            <h5 class="modal-title">Update Password</h5>
                            <button type="button" class="btn-close" @click="closePasswordModal"></button>
                        </div>
                        <div class="modal-body">
                            <form class="needs-validation" id="passwordForm" ref="passwordForm" novalidate>
                                <div class="form-group noSelect">
                                    <div class="mb-1">
                                        <label for="currentPassword" class="text-blue formLabel">Current Password</label>
                                    </div>
                                    <input type="password" class="form-control" autocomplete="off" id="currentPassword" v-model="form_current_password" placeholder="Your current password..." required>
                                    <div class="invalid-feedback">
                                        Please provide your current password here.
                                    </div>
                                </div>
                                <div class="form-group noSelect">
                                    <div class="mb-1">
                                        <label for="newPassword" class="text-blue formLabel">New Password</label>
                                    </div>
                                    <input type="password" class="form-control" autocomplete="off" id="newPassword" v-model="form_new_password" placeholder="Your new password..." maxlength="50" required>
                                    <div class="invalid-feedback">
                                        Please ensure your new password has a maximum length of 50 characters.
                                    </div>
                                </div>
                            </form>
                            <br>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn formBtn blueBorder p-1" id="submitPasswordFormBtn" @click="submitPassword">
                                <span v-show="!passwordIsLoading"> Update Password </span>
                                <span v-show="passwordIsLoading" class="spinner-border spinner-border-sm" role="status"></span>
                                <span v-show="passwordIsLoading"> Loading... </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "p-2 flex-grow-1">
                <form class="needs-validation" id="adminForm" ref="form" novalidate>
                    <div>
                        <div class="topSection noSelect">
                            <div class="mb-1">
                                <h1 class="text-blue">Manage My Account</h1>
                            </div>
                        </div>

                        <div>
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="firstName" class="text-blue formLabel">First Name</label>
                                </div>
                                <input type="text" class="form-control" autocomplete="off" id="firstName" v-model="form_first_name" placeholder="Your first name..." maxlength="50" required>
                                <div class="invalid-feedback">
                                    Please provide a valid first name under 50 characters.
                                </div>
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="lastName" class="text-blue formLabel">Last Name</label>
                                </div>
                                <input type="text" class="form-control" autocomplete="off" id="lastName" v-model="form_last_name" placeholder="Your last name..." maxlength="50" required>
                                <div class="invalid-feedback">
                                    Please provide a valid last name under 50 characters.
                                </div>
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="passwordChange" class="text-blue formLabel">Password</label><br>
                                    <button type="button" class="mt-2 btn blueBtn" id="passwordChange" @click="openPasswordModal">Change Password</button>
                                </div>                    
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="primaryEmail" class="text-blue formLabel">Primary Email</label>
                                </div>
                                <input type="email" class="form-control" autocomplete="off" id="primaryEmail" v-model="form_primary_email" placeholder="Your primary email..." required maxlength="100">
                                <div class="invalid-feedback">
                                    Please provide a valid email address under 100 characters.
                                </div>
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="primaryEmailNotification" class="text-blue formLabel">Enable email notifications for primary email?</label>
                                </div>
                                
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" value="true" v-model="form_enable_primary_email_notifications" name="primaryEmailNotification" id="primaryEmailNotificationEnabled" required>
                                    <label class="form-check-label" for="primaryEmailNotificationEnabled">
                                        Yes
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" value="false" v-model="form_enable_primary_email_notifications" name="primaryEmailNotification" id="primaryEmailNotificationDisabled" required>
                                    <label class="form-check-label" for="primaryEmailNotificationDisabled">
                                        No
                                    </label>
                                </div>
                                <div class="invalid-feedback">Please select one of the provided options.</div>
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="secondaryEmail" class="text-blue formLabel leaveLabel">Secondary Email</label>
                                </div>
                                <input type="email" class="form-control" autocomplete="off" id="secondaryEmail" v-model="form_secondary_email" placeholder="Optional secondary email..." maxlength="100">
                                <div class="invalid-feedback">
                                    Please provide a valid email address under 100 characters.
                                </div>
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="secondaryEmailNotification" class="text-blue formLabel">Enable email notifications for secondary email?</label>
                                </div>
                                
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="secondaryEmailNotification" value="true" :disabled="!enableSecondaryEmailNotificationRadios" v-model="form_enable_secondary_email_notifications" id="secondaryEmailNotificationEnabled" >
                                    <label class="form-check-label" for="secondaryEmailNotificationEnabled">
                                        Yes
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="secondaryEmailNotification" value="false" :disabled="!enableSecondaryEmailNotificationRadios" v-model="form_enable_secondary_email_notifications" id="secondaryEmailNotificationDisabled">
                                    <label class="form-check-label" for="secondaryEmailNotificationDisabled">
                                        No
                                    </label>
                                </div>
                            </div>
                            <br/>
                            <button type="button" id="submitAdminFormBtn" class="mb-2 btn formBtn blueBorder" @click="submit">
                                <span v-show="!isLoading"> Update My Account </span>
                                <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                                <span v-show="isLoading"> Loading... </span>
                            </button>
                        </div>
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
                currentPage: "/manageadmin",
                
                enableSecondaryEmailNotificationRadios: false,
                submissionSuccess: false,
                isLoading: false,
                submitButton: null,
                adminForm: null,
                clickEventAccountForm: null,

                form_first_name: "",
                form_last_name: "",
                form_role_selection: "",
                form_primary_email: "",
                form_secondary_email: "",
                form_enable_primary_email_notifications: "true",
                form_enable_secondary_email_notifications: "false",

                passwordSubmitButton: null,
                passwordForm: null,
                clickEventPasswordForm: null,
                passwordIsLoading: false,
                form_current_password: "",
                form_new_password: ""
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
        methods: {
            openModal() {
                document.getElementById("adminBackdrop").style.display = "block"
                document.getElementById("adminModal").style.display = "block"
                document.getElementById("adminModal").classList.add("show")
            },
            closeModal() {
                this.form_current_password = "";
                this.form_new_password = "";
                document.getElementById("adminBackdrop").style.display = "none"
                document.getElementById("adminModal").style.display = "none"
                document.getElementById("adminModal").classList.remove("show")
            },
            openPasswordModal() {
                document.getElementById("passwordBackdrop").style.display = "block"
                document.getElementById("passwordModal").style.display = "block"
                document.getElementById("passwordModal").classList.add("show")
            },
            closePasswordModal() {
                document.getElementById("passwordBackdrop").style.display = "none"
                document.getElementById("passwordModal").style.display = "none"
                document.getElementById("passwordModal").classList.remove("show")
            },
            clearAllFields() {
                this.form_first_name = "",
                this.form_last_name = "",
                this.form_primary_email = "",
                this.form_secondary_email = "",
                this.form_enable_primary_email_notifications = "true",
                this.form_enable_secondary_email_notifications = "false",
                this.isLoading = false
                this.adminForm.classList.remove('was-validated')
                this.passwordForm.classList.remove('was-validated')
            },
            populateFields() {
                this.form_first_name = this.$store.getters.StateInfo.first_name.charAt(0).toUpperCase() + this.$store.getters.StateInfo.first_name.slice(1)
                this.form_last_name = this.$store.getters.StateInfo.last_name.charAt(0).toUpperCase() + this.$store.getters.StateInfo.last_name.slice(1)
                this.form_primary_email = this.$store.getters.StateInfo.contact_info.primary_email
                this.form_enable_primary_email_notifications = this.$store.getters.StateInfo.contact_info.enable_primary_email_notifications ? 'true' : 'false'
                this.form_secondary_email = this.$store.getters.StateInfo.contact_info.secondary_email
                this.form_enable_secondary_email_notifications = this.$store.getters.StateInfo.contact_info.enable_secondary_email_notifications ? 'true' : 'false'
            },
            async submitPassword(e) {
                let payload = {
                    "employee_id": this.$store.getters.StateInfo.employee_id,
                    "current_password": this.form_current_password,
                    "new_password": this.form_new_password,
                }
                console.log(payload)
                if (!this.passwordIsLoading && this.passwordForm.checkValidity()) {
                    this.passwordIsLoading = true;
                    await this.$store.dispatch("UpdateAccountPassword", payload).then(
                        resp => {
                            if (resp && resp === true) {
                                this.submissionSuccess = true;
                                this.clearAllFields();
                                this.closePasswordModal();
                            }
                            else {
                                this.submissionSuccess = false;
                                this.passwordIsLoading = false;
                                this.submissionSuccess = false;
                                this.closePasswordModal();
                                this.openModal();
                            }
                            this.passwordIsLoading = false;
                            this.openModal()
                        }
                    ).catch(err => {
                        console.log(err);
                        this.passwordIsLoading = false;
                        this.submissionSuccess = false;
                        this.closePasswordModal();
                        this.openModal();
                    }).then(() => {
                        this.$store.dispatch('GetUserInfo').then(resp => {
                            if (resp === false) {
                                this.passwordIsLoading = false;
                                this.submissionSuccess = false;
                                this.openModal();
                                return;
                            }
                        }).then(() => { this.populateFields() })
                    });
                    e.preventDefault();
                }
            },
            async submit(e) {
                let payload = {
                    "employee_id": this.$store.getters.StateUser.employee_id,
                    "first_name": this.form_first_name,
                    "last_name": this.form_last_name,
                    "primary_email": this.form_primary_email,
                    "secondary_email": this.form_secondary_email,
                    "enable_primary_email_notifications": this.form_enable_primary_email_notifications === 'true',
                }
                if (this.enableSecondaryEmailNotificationRadios) {
                    payload["enable_secondary_email_notifications"] = this.form_enable_secondary_email_notifications === 'true'
                }
                if (!this.isLoading && this.adminForm.checkValidity()) {
                    this.isLoading = true;
                    await this.$store.dispatch("UpdateEmployee", payload).then(
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
                    }).then(() => {
                        this.$store.dispatch('GetUserInfo').then(resp => {
                            if (resp === false) {
                                this.isLoading = false;
                                this.submissionSuccess = false;
                                this.openModal();
                                return;
                            }
                        }).then(() => { this.populateFields() })
                    })
                }
                e.preventDefault();
            }
        },
        mounted() {
            this.closeModal();
            this.submitButton = document.getElementById("submitAdminFormBtn")
            this.passwordSubmitButton = document.getElementById("submitPasswordFormBtn")
            this.adminForm = document.getElementById("adminForm")
            this.passwordForm = document.getElementById("passwordForm")
            
            this.submitButton.addEventListener('click', 
                function (event) {
                    let form = document.getElementById("adminForm")
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false);
            this.clickEventAccountForm = new Event('click');

            this.passwordSubmitButton.addEventListener('click', 
                function (event) {
                    let form = document.getElementById("passwordForm")
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false);
            this.clickEventPasswordForm = new Event('click');
            this.populateFields();
        }
    }
</script>

