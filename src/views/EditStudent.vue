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
                            Delete Student Account?
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete the student's account?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn blueBtn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteStudentAccount()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-2 flex-grow-1">
                <form>
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
                                
                                <input type="number" class="form-control" id="carpool" max="10000" v-model="car_pool_number" required>
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
                        </div>>

                        <div class="noSelect">
                            <div class="mb-1">
                                <label for="primaryEmail" class="text-blue formLabel">Parent #1 Email</label>
                            </div>
                                    
                            <input type="email" class="form-control" maxlength="100" id="primaryEmail" v-model="primary_email" required>
                            <div class="invalid-feedback">
                                Please provide a valid parent email under 100 characters.
                            </div>
                        </div>

                        <div class="form-group">
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
                                    <input class="form-check-input" type="radio" name="enable_notifications_parent_one" value="false" id="notificationsParentOne_no" v-model="enable_primary_email_notifications" required>
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
                                    
                            <input type="text" class="form-control" id="secondaryEmail" v-model="secondary_email" placeholder="Optional...">
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
                        <hr>
                        <div class="form-group noSelect">
                            <div class="mb-1">
                                <label for="deleteStudentAccountBtn" class="text-blue formLabel">Delete Student Account:</label><br/>
                                <button type="button" class="btn btn-danger" name="deleteStudentAccountBtn" id="deleteStudentAccount" data-bs-toggle="modal" data-bs-target="#confirm-delete">Delete Student Account</button>
                            </div>
                        </div>
                        <div class="noSelect">
                                <div class="mb-1">
                                    <label for="enable_student_account" class="text-blue formLabel">Enable or disable student account after creation:</label>
                                </div>
                                
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" value="true" name="enable_student_account" id="enableAccount" v-model="is_enabled" required>
                                    <label class="form-check-label" for="enableAccount">
                                        Enable Account
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" value="false" name="enable_student_account" id="disableAccount" v-model="is_enabled" required>
                                    <label class="form-check-label" for="disableAccount">
                                        Disable Account
                                    </label>
                                </div>
                                <div class="invalid-feedback">Please select one of the provided options.</div>
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
                creationSuccess: false,
                isLoading: false,
                enableSecondaryEmailNotificationRadios: false,
                clickEvent: null,
                studentForm: null
            }
        },
        methods: {
            deleteStudentAccount: function() {
                return
            },
        },
        mounted() {
            this.$store.dispatch("GetStudentInfo")
        }
    }
</script>

