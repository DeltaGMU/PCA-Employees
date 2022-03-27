<template>
    <form>
        <div class = "sideBar">
            <Sidebar>   </Sidebar>
        </div>
        <div class="empContent">
            <div class="topSection noSelect">

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">

                    <h1 class="text-blue">Create Employee</h1>

                </div>
            
            </div>

            <div>
                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="employeeID" class="text-blue formLabel">Employee ID</label>
                    </div>
                    
                    <input type="text" class="form-control leaveInput" id="employeeID">
                    
                </div>

                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="firstName" class="text-blue formLabel">First Name</label>
                    </div>
                    
                    <input type="text" class="form-control leaveInput" id="firstName">
                    
                </div>

                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="lastName" class="text-blue formLabel">Last Name</label>
                    </div>
                    
                    <input type="text" class="form-control leaveInput" id="lastName">
                </div>

                <div class="form-group row">
                    <div class="mb-1">
                        <label for="pass" class="text-blue formLabel">Password</label>
                    </div>
                    
                    <input disabled type="text" class="form-control leaveInput" id="password" value="The password will be automatically generated and sent to the primary email.">
                </div>

                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="role" class="text-blue formLabel leaveLabel">Select Role</label>
                    </div>

                    <select class="form-control leaveInput" name="role" id="role">
                        <option value="adminRole">Administrator</option>
                        <option value="empRole" selected>Employee</option>
                    </select>
                </div>

                <div class="form-group row noSelect">
                        <div class="mb-1">
                            <label for="primaryEmail" class="text-blue formLabel">Primary Email</label>
                        </div>
                        
                        <input type="text" class="form-control leaveInput" id="primaryMail">
                </div>
            
                <div class="form-group row noSelect">
                        <div class="mb-1">
                            <label for="secondaryEmail" class="text-blue formLabel leaveLabel">Secondary Email</label>
                        </div>
                        
                        <input type="text" class="form-control leaveInput" id="primaryMail">
                </div>


                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="notification" class="text-blue formLabel">Enable email notifications for primary email?</label>
                    </div>
                    
                    <div class="form-check form-check-inline leaveInput">
                        <input class="form-check-input" type="radio" name="flexRadioDefault1" id="notification flexRadioDefault1" checked>
                        <label class="form-check-label" for="flexRadioDefault1">
                            Yes
                        </label>
                        </div>
                        <div class="form-check form-check-inline leaveInput">
                        <input class="form-check-input" type="radio" name="flexRadioDefault1" id="notification flexRadioDefault1">
                        <label class="form-check-label" for="flexRadioDefault1">
                            No
                        </label>
                    </div>
                </div>

                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="notification" class="text-blue formLabel">Enable email notifications for secondary email?</label>
                    </div>
                    
                    <div class="form-check form-check-inline leaveInput">
                        <input class="form-check-input" type="radio" name="flexRadioDefault2" id="notification flexRadioDefault2">
                        <label class="form-check-label" for="flexRadioDefault2">
                            Yes
                        </label>
                        </div>
                        <div class="form-check form-check-inline leaveInput">
                        <input class="form-check-input" type="radio" name="flexRadioDefault2" id="notification flexRadioDefault2" checked>
                        <label class="form-check-label" for="flexRadioDefault2">
                            No
                        </label>
                    </div>
                </div>

                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="notification" class="text-blue formLabel">Enable or disable employee account after creation:</label>
                    </div>
                    
                    <div class="form-check form-check-inline leaveInput">
                        <input class="form-check-input" type="radio" name="flexRadioDefault3" id="notification flexRadioDefault3" checked>
                        <label class="form-check-label" for="flexRadioDefault3">
                            Enable
                        </label>
                        </div>
                        <div class="form-check form-check-inline leaveInput">
                        <input class="form-check-input" type="radio" name="flexRadioDefault3" id="notification flexRadioDefault3">
                        <label class="form-check-label" for="flexRadioDefault3">
                            Disable
                        </label>
                    </div>
                </div>
            </div>
            <br/>
            <button class="btn blueBtn">Submit</button>
        </div>
    </form>
</template>

<script>
    import Sidebar from "../components/Sidebar.vue";
    export default {
        components: {
            Sidebar
        },
    }
</script>

