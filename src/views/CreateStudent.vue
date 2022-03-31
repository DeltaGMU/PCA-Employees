<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
                <Sidebar>   </Sidebar>
            </div>
            <div class="p-2 flex-grow-1">
                <form>
                    <div>
                        <div class="topSection noSelect">
                            <div class="mb-1">
                                <h1 class="text-blue">Create Student</h1>
                            </div>
                        </div>
                        <div>
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="firstNameStudent" class="text-blue formLabel">Student First Name</label>
                                </div>
                                
                                <input type="text" class="form-control" id="firstName" required>
                                
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="lastNameStudent" class="text-blue formLabel">Student Last Name</label>
                                </div>
                                
                                <input type="text" class="form-control leaveInput" id="lastName">
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="carpool" class="text-blue formLabel">Carpool Number</label>
                                </div>
                                
                                <input type="text" class="form-control" id="carpool">
                            </div>
                            <br>
                            <hr>
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="firstNameParent" class="text-blue formLabel">Parent #1 First Name</label>
                                </div>
                                
                                <input type="text" class="form-control" id="firstName" required>
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="lastNameParent" class="text-blue formLabel">Parent #1 Last Name</label>
                                </div>
                                
                                <input type="text" class="form-control" id="lastName" required>
                            </div>

                            <div class="form-group noSelect">
                                    <div class="mb-1">
                                        <label for="primaryEmail" class="text-blue formLabel">Parent #1 Email</label>
                                    </div>
                                    
                                    <input type="text" class="form-control" id="primaryMail">
                            </div>

                            <div class="form-group">
                                <div class="mb-1">
                                    <label for="pass" class="text-blue formLabel">Enable email notifications for Parent #1 email?</label>
                                </div>
                                
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault1" id="pass flexRadioDefault1" checked>
                                    <label class="form-check-label" for="flexRadioDefault1" selected>
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
                            <br>
                            <hr>
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="firstNameParent" class="text-blue formLabel">Parent #2 First Name</label>
                                </div>
                                
                                <input type="text" class="form-control" id="firstName" placeholder="Optional...">
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="lastNameParent" class="text-blue formLabel">Parent #2 Last Name</label>
                                </div>
                                
                                <input type="text" class="form-control" id="lastName" placeholder="Optional...">
                            </div>                   
                        
                            <div class="form-group noSelect">
                                    <div class="mb-1">
                                        <label for="secondaryEmail" class="text-blue formLabel leaveLabel">Parent #2 Email</label>
                                    </div>
                                    
                                    <input type="text" class="form-control" id="secondaryEmail" placeholder="Optional...">
                            </div>

                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="notification" class="text-blue formLabel">Enable email notifications for Parent #2 email?</label>
                                </div>
                                
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="notification flexRadioDefault2">
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Yes
                                    </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="notification flexRadioDefault2" checked>
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        No
                                    </label>
                                </div>
                            </div>
                            <hr>
                            <div class="form-group noSelect">
                                <div class="mb-1">
                                    <label for="notification" class="text-blue formLabel">Enable or disable student account after creation:</label>
                                </div>
                                
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault3" id="notification flexRadioDefault3" checked>
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
        data() {
            return {
                signedIn: this.$store.getters.isAuthenticated,
                empName: this.$store.getters.StateName,
                empRole: this.$store.getters.StateRole,
                currentPage: "/createstudent",                
            }
        }
    }
</script>

