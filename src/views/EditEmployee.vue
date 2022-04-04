<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
                <Sidebar/>
            </div>
            <div class="modal-backdrop fade show" id="empBackdrop" style="display: none;"></div>
            <div class="modal-backdrop fade show" id="deleteBackdrop" style="display: none;"></div>
            <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="empAccountBtnLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5>Delete Employee Account?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeDeleteModal"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete the employee's account?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn blueBtn" data-bs-dismiss="modal" @click="closeDeleteModal">Cancel</button>
                            <button type="button" class="btn btn-danger" id = "submitDeleteFormBtn" data-bs-dismiss="modal" @click="deleteEmployeeAccount(); closeDeleteModal()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="empModal" tabindex="-1" aria-labelledby="empModalLabel" aria-hidden="true">
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
                            Successfully updated the employee's account.
                        </div>
                        <div class="modal-body" v-else>
                            Encountered an error updating the employee's account. Please try again and ensure the required fields are filled correctly.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn" :class="submissionSuccess ? 'blueBtn' : 'btn-danger'" @click="closeModal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-2 flex-grow-1">
                <form class = "needs-validation" id= "empForm" ref="form" novalidate>
                    <div>
                        <div class="topSection noSelect">
                            <div class="mb-1">
                                <h1 class="text-blue">Edit Employee</h1>
                            </div>
                        </div>
                        <div>
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="firstName" class="text-blue formLabel" >First Name</label>
                                </div>
                                
                                <input type="text" class="form-control" id="firstName" v-model="form_first_name" placeholder="Employee first name..." maxLength ="50" required >
                                <div class="invalid-feedback">
                                    Please provide a valid employee first name under 50 characters.
                                </div>
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="lastName" class="text-blue formLabel">Last Name</label>
                                </div>
                                
                                <input type="text" class="form-control" id="lastName" v-model="form_last_name" placeholder="Employee last name..." maxLength ="50" required>
                                <div class="invalid-feedback">
                                    Please provide a valid employee last name under 50 characters.
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="mb-1">
                                    <label for="pass" class="text-blue formLabel">Password</label>
                                    <br/><small>Resetting the password will send a new generated temporary password to the employee's primary email.</small>
                                </div>
                                
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" name="resetPasswordCheckbox" id="pass resetPasswordCheckbox">
                                    <label class="form-check-label" for="resetPasswordCheckbox">
                                        Reset Password
                                    </label>
                                </div>
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="employeeRole" class="text-blue formLabel leaveLabel">Select Role</label>
                                </div>

                                <select class="form-control" name="employeeRole" id="employeeRole" required>
                                    <option value="adminRole" v-bind:selected = "isAdmin" >Administrator</option>
                                    <option value="empRole" v-bind:selected = "isEmployee"> Employee</option>
                                </select>
                                 <div class="invalid-feedback">
                                    Please select a role.
                                </div>
                            </div>

                            <div class="form-group noSelect">
                                    <div class="mb-1">
                                        <label for="primaryEmail" class="text-blue formLabel">Primary Email</label>
                                    </div>
                                    
                                    <input type="text" class="form-control" id="primaryMail" v-model="form_primary_email" placeholder="Employee primary email..." maxLength ="100" required>
                                    <div class="invalid-feedback">
                                        Please provide a valid primary email under 100 characters.
                                    </div>
                            </div>
                        
                            <div class="form-group noSelect">
                                    <div class="mb-1">
                                        <label for="secondaryEmail" class="text-blue formLabel leaveLabel">Secondary Email</label>
                                    </div>
                                    
                                    <input type="text" class="form-control" id="secondaryEmail" v-model="form_secondary_email" placeholder="Optional...">
                            </div>

                            <div class="form-group">
                                <div class="mb-1">
                                    <label for="pass" class="text-blue formLabel">Enable email notifications for primary email?</label>
                                </div>
                                
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" value = "true"  name="flexRadioDefault1" id="pass flexRadioDefault1" v-model="form_enable_primary_email_notifications" required>
                                    <label class="form-check-label" for="flexRadioDefault1" v-bind:selected = "form_enable_primary_email_notifications">
                                        Yes
                                    </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" value = "false" name="flexRadioDefault1" id="pass flexRadioDefault1" v-model="form_enable_primary_email_notifications" required>
                                    <label class="form-check-label" for="flexRadioDefault1" v-bind:selected = "form_enable_primary_email_notifications">
                                        No
                                    </label>
                                </div>
                               
                            </div>
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="notification" class="text-blue formLabel">Enable email notifications for secondary email?</label>
                                </div>
                                
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" value = "true" name="flexRadioDefault2" id="notification flexRadioDefault2" :disabled="!enableSecondaryEmailNotificationRadios" v-model="form_enable_secondary_email_notifications">
                                    <label class="form-check-label" for="flexRadioDefault2" v-bind:selected = "form_enable_secondary_email_notifications">
                                        Yes
                                    </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" value = "false" name="flexRadioDefault2" id="notification flexRadioDefault2" :disabled="!enableSecondaryEmailNotificationRadios" v-model="form_enable_secondary_email_notifications">
                                    <label class="form-check-label" for="flexRadioDefault2" v-bind:selected = "form_enable_secondary_email_notifications">
                                        No
                                    </label>
                                </div>
                            </div>
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="deleteEmployeeAccountBtn" class="text-blue formLabel">Delete Employee Account:</label><br/>
                                    <button type="button" class="btn btn-danger" name="deleteEmployeeAccountBtn" id="deleteEmployeeAccount" data-bs-toggle="modal" data-bs-target="#confirm-delete" @click="openDeleteModal()">Delete Employee Account</button>
                                </div>
                            </div>
                            <div class="form-group noSelect">
                                <div>
                                    <label for="notification" class="text-blue formLabel">Enable or disable employee account:</label>
                                </div>
                                
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" value = "true" name="flexRadioDefault3" id="notification flexRadioDefault3" v-model="form_is_enabled">
                                    <label class="form-check-label" for="flexRadioDefault3" v-bind:selected= "form_is_enabled">
                                        Enable Account
                                    </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" value = "false" name="flexRadioDefault3" id="notification flexRadioDefault3" v-model="form_is_enabled">
                                    <label class="form-check-label" for="flexRadioDefault3" v-bind:selected= "form_is_enabled">
                                        Disable Account
                                    </label>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <button type="button" id="submitEmpFormBtn" class="mb-2 btn formBtn blueBorder" @click="submit; openModal()">
                            <span v-show="!isLoading"> Update Account </span>
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
            employeeID: String
        },
        data() {
            return {
                signedIn: this.$store.getters.isAuthenticated,
                empName: this.$store.getters.StateName,
                empRole: this.$store.getters.StateRole,
                currentPage: "/editemployee", 

                isAdmin: false,
                isEmployee: false,
                isLoading: false,
                empForm: null,
                submitButton: null,
                submissionSuccess: false,
                clickEventAccountForm: null,
                enableSecondaryEmailNotificationRadios: false,

                form_employee: {},
                form_role: "",
                
                form_first_name: "",
                form_last_name: "",

                form_primary_email: "",
                form_secondary_email: null,

                form_enable_primary_email_notifications: null,
                form_enable_secondary_email_notifications: null,
                form_is_enabled: null,
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
                document.getElementById("empBackdrop").style.display = "block"
                document.getElementById("empModal").style.display = "block"
                document.getElementById("empModal").classList.add("show")
            },
            closeModal() {
                document.getElementById("empBackdrop").style.display = "none"
                document.getElementById("empModal").style.display = "none"
                document.getElementById("empModal").classList.remove("show")
            },

            openDeleteModal() {
                document.getElementById("deleteBackdrop").style.display = "block"
                document.getElementById("deleteModal").style.display = "block"
                document.getElementById("deleteModal").classList.add("show")
            },
            closeDeleteModal() {
                document.getElementById("deleteBackdrop").style.display = "none"
                document.getElementById("deleteModal").style.display = "none"
                document.getElementById("deleteModal").classList.remove("show")
            },

            clearAllFields() {
                this.form_first_name = "",
                this.form_last_name = "",
                this.form_primary_email = "",
                this.form_secondary_email = "",
                this.form_enable_primary_email_notifications = "true",
                this.form_enable_secondary_email_notifications = "false",
                this.isLoading = false
                this.empForm.classList.remove('was-validated')
            },

            deleteEmployeeAccount() {
                this.$store.dispatch("DeleteEmployee", this.$route.params.employeeID)
            },

            populateFields(){
                this.form_first_name = this.form_employee.first_name.charAt(0).toUpperCase() + this.form_employee.first_name.slice(1)
                this.form_last_name = this.form_employee.last_name.charAt(0).toUpperCase() + this.form_employee.last_name.slice(1)
                
                this.form_role = this.form_employee.role.name.charAt(0).toUpperCase() + this.form_employee.role.name.slice(1)
                this.findRole()

                this.form_primary_email = this.form_employee.contact_info.primary_email
                this.form_enable_primary_email_notifications = this.form_employee.contact_info.enable_primary_email_notifications
                this.form_enable_secondary_email_notifications = this.form_employee.contact_info.enable_secondary_email_notifications

                this.form_is_enabled = this.form_employee.is_enabled
            },

            findAdmin() {
                if (this.form_role == "Admin"){
                    this.isAdmin = true
                }
            },

            findEmployee() {
                if (this.form_role == "Employee"){
                    this.isEmployee = true
                }
            },
            
            findRole() {
                this.findAdmin()
                this.findEmployee()
            },

            async submit(e) {
                let payload = {
                    "employee_id": this.form_employee.employee_id,
                    "first_name": this.form_first_name,
                    "last_name": this.form_last_name,
                    "primary_email": this.form_primary_email,
                    "secondary_email": this.form_secondary_email,
                    "enable_primary_email_notifications": this.form_enable_primary_email_notifications === 'true',
                   // "is_enabled": this.form_is_enabled,
                   // "role.name": this.form_role

                }
                if (this.enableSecondaryEmailNotificationRadios) {
                   payload["enable_secondary_email_notifications"] = this.form_enable_secondary_email_notifications === 'true'
                }
                if (!this.isLoading && this.empForm.checkValidity()) {
                    this.isLoading = true;
                    await this.$store.dispatch("UpdateEmployee", payload).then(
                        resp => {
                            if (resp === true) {
                                this.submissionSuccess = true;
                                this.clearAllFields();
                                console.log(resp)
                            }
                            else {
                                this.submissionSuccess = false;
                                console.log(resp)
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
                        this.$store.dispatch('GetEmployeeInfo', this.employeeID).then(resp => {
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
            },

        },

        
        
        mounted() {
            this.closeModal();
            this.closeDeleteModal();
            this.submitButton = document.getElementById("submitEmpFormBtn")
            this.deleteSubmitButton = document.getElementById("submitDeleteFormBtn")
            this.empForm = document.getElementById("empForm")

            console.log(this.submitButton)
            console.log(this.deleteSubmitButton)
            console.log(this.empForm)

            this.submitButton.addEventListener('click', 
                function (event) {
                    let form = document.getElementById("empForm")
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false);
            this.clickEventAccountForm = new Event('click');

            this.$store.dispatch("GetEmployeeInfo", this.$route.params.employeeID).then(resp => {
                if (resp){
                    this.form_employee = resp
                    console.log(resp)
                }
            }).then(() => {this.populateFields()})
        }
    }
</script>

