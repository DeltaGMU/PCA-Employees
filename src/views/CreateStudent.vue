<template>
    <form>
        <div class = "sideBar">
            <Sidebar>   </Sidebar>
        </div>

        <div class="empContent">
            <div class="topSection noSelect">

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">

                    <h1 class="text-blue">Create Student</h1>

                </div>
            
            </div>

            <div>
                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="firstNameStudent" class="text-blue formLabel">Student First Name</label>
                    </div>
                    
                    <input type="text" class="form-control leaveInput" id="firstName" required>
                    
                </div>

                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="lastNameStudent" class="text-blue formLabel">Student Last Name</label>
                    </div>
                    
                    <input type="text" class="form-control leaveInput" id="lastName">
                </div>

                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="carpool" class="text-blue formLabel">Carpool Number</label>
                    </div>
                    
                    <input type="text" class="form-control leaveInput" id="carpool">
                </div>
                <br>
                <hr>
                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="firstNameParent" class="text-blue formLabel">Parent #1 First Name</label>
                    </div>
                    
                    <input type="text" class="form-control leaveInput" id="firstName" required>
                </div>

                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="lastNameParent" class="text-blue formLabel">Parent #1 Last Name</label>
                    </div>
                    
                    <input type="text" class="form-control leaveInput" id="lastName" required>
                </div>

                <div class="form-group row noSelect">
                        <div class="mb-1">
                            <label for="primaryEmail" class="text-blue formLabel">Parent #1 Email</label>
                        </div>
                        
                        <input type="text" class="form-control leaveInput" id="primaryMail">
                </div>

                <div class="form-group row">
                    <div class="mb-1">
                        <label for="pass" class="text-blue formLabel">Enable email notifications for Parent #1 email?</label>
                    </div>
                    
                    <div class="form-check form-check-inline leaveInput">
                        <input class="form-check-input" type="radio" name="flexRadioDefault1" id="pass flexRadioDefault1" checked>
                        <label class="form-check-label" for="flexRadioDefault1" selected>
                            Yes
                        </label>
                        </div>
                        <div class="form-check form-check-inline leaveInput">
                        <input class="form-check-input" type="radio" name="flexRadioDefault1" id="pass flexRadioDefault1">
                        <label class="form-check-label" for="flexRadioDefault1">
                            No
                        </label>
                    </div>
                </div>
                <br>
                <hr>
                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="firstNameParent" class="text-blue formLabel">Parent #2 First Name</label>
                    </div>
                    
                    <input type="text" class="form-control leaveInput" id="firstName" placeholder="Optional...">
                </div>

                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="lastNameParent" class="text-blue formLabel">Parent #2 Last Name</label>
                    </div>
                    
                    <input type="text" class="form-control leaveInput" id="lastName" placeholder="Optional...">
                </div>                   
            
                <div class="form-group row noSelect">
                        <div class="mb-1">
                            <label for="secondaryEmail" class="text-blue formLabel leaveLabel">Parent #2 Email</label>
                        </div>
                        
                        <input type="text" class="form-control leaveInput" id="secondaryEmail" placeholder="Optional...">
                </div>

                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="notification" class="text-blue formLabel">Enable email notifications for Parent #2 email?</label>
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
                <br/>
                <button class="btn blueBtn">Submit</button>
            </div>
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

