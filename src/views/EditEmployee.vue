<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
                <Sidebar/>
            </div>
            <div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="deleteAccountBtnLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5>Delete Employee Account?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete the employee's account?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn blueBtn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteEmployeeAccount()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-2 flex-grow-1">
                <form>
                    <div>
                        <div class="topSection noSelect">
                            <div class="mb-1">
                                <h1 class="text-blue">Edit Employee</h1>
                            </div>
                        </div>
                        <div>
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="firstName" class="text-blue formLabel">First Name</label>
                                </div>
                                
                                <input type="text" class="form-control" id="firstName">
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="lastName" class="text-blue formLabel">Last Name</label>
                                </div>
                                
                                <input type="text" class="form-control" id="lastName">
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
                                    <label for="role" class="text-blue formLabel leaveLabel">Select Role</label>
                                </div>

                                <select class="form-control" name="role" id="role">
                                    <option value="adminRole">Administrator</option>
                                    <option value="empRole" selected>Employee</option>
                                </select>
                            </div>

                            <div class="form-group noSelect">
                                    <div class="mb-1">
                                        <label for="primaryEmail" class="text-blue formLabel">Primary Email</label>
                                    </div>
                                    
                                    <input type="text" class="form-control" id="primaryMail">
                            </div>
                        
                            <div class="form-group noSelect">
                                    <div class="mb-1">
                                        <label for="secondaryEmail" class="text-blue formLabel leaveLabel">Secondary Email</label>
                                    </div>
                                    
                                    <input type="text" class="form-control" id="secondaryEmail" placeholder="Optional...">
                            </div>

                            <div class="form-group">
                                <div class="mb-1">
                                    <label for="pass" class="text-blue formLabel">Enable email notifications for primary email?</label>
                                </div>
                                
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault1" id="pass flexRadioDefault1">
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Yes
                                    </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault1" id="pass flexRadioDefault1">
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        No
                                    </label>
                                </div>
                            </div>
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="notification" class="text-blue formLabel">Enable email notifications for secondary email?</label>
                                </div>
                                
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="notification flexRadioDefault2">
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Yes
                                    </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="notification flexRadioDefault2">
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        No
                                    </label>
                                </div>
                            </div>
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="deleteEmployeeAccountBtn" class="text-blue formLabel">Delete Employee Account:</label><br/>
                                    <button type="button" class="btn btn-danger" name="deleteEmployeeAccountBtn" id="deleteEmployeeAccount" data-bs-toggle="modal" data-bs-target="#confirm-delete">Delete Employee Account</button>
                                </div>
                            </div>
                            <div class="form-group noSelect">
                                <div>
                                    <label for="notification" class="text-blue formLabel">Enable or disable employee account:</label>
                                </div>
                                
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault3" id="notification flexRadioDefault3">
                                    <label class="form-check-label" for="flexRadioDefault3">
                                        Enable Account
                                    </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault3" id="notification flexRadioDefault3">
                                    <label class="form-check-label" for="flexRadioDefault3">
                                        Disable Account
                                    </label>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <button class="btn blueBtn">Submit</button>
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
            }
        },
        methods: {
            deleteEmployeeAccount: function() {
                return
            },
        }
    }
</script>

