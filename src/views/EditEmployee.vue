<template>
    <form>
        <div class="wrapper">
            <div class="topSection noSelect">

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">

                    <h1 class="text-blue">Edit Employee</h1>

                </div>
            
            </div>

            <div>
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
                        <br/><small>Resetting the password will send a new generated temporary password to the employee's primary email.</small>
                    </div>
                    
                    <div class="form-check form-check-inline leaveInput">
                        <input class="form-check-input" type="checkbox" name="resetPasswordCheckbox" id="pass resetPasswordCheckbox">
                        <label class="form-check-label" for="resetPasswordCheckbox">
                            Reset Password
                        </label>
                    </div>
                </div>

                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="role" class="text-blue formLabel leaveLabel">Select Role</label>
                    </div>

                    <select class="form-control leaveInput" name="role" id="role">
                        <option value="adminRole">Administrator</option>
                        <option value="empRole">Employee</option>
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

                <div class="form-group row">
                    <div class="mb-1">
                        <label for="pass" class="text-blue formLabel">Enable email notifications for primary email?</label>
                    </div>
                    
                    <div class="form-check form-check-inline leaveInput">
                        <input class="form-check-input" type="radio" name="flexRadioDefault1" id="pass flexRadioDefault1">
                        <label class="form-check-label" for="flexRadioDefault1">
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
                        <input class="form-check-input" type="radio" name="flexRadioDefault2" id="notification flexRadioDefault2">
                        <label class="form-check-label" for="flexRadioDefault2">
                            No
                        </label>
                    </div>
                </div>
            </div>
            <button class="btn blueBtn">Submit</button>
        </div>
    </form>
</template>

<script>

</script>

