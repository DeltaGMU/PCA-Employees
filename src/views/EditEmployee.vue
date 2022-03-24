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
                        <label for="pass" class="text-blue formLabel">Request for temporary password?</label>
                    </div>
                    
                    <div class="form-check form-check-inline leaveInput">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="pass flexRadioDefault1">
                        <label class="form-check-label" for="flexRadioDefault1">
                            Yes
                        </label>
                        </div>
                        <div class="form-check form-check-inline leaveInput">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="pass flexRadioDefault2" checked>
                        <label class="form-check-label" for="flexRadioDefault2">
                            No
                        </label>
                    </div>
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
                        <label for="role" class="text-blue formLabel leaveLabel">Select Role</label>
                    </div>

                    <select class="form-control leaveInput" name="role" id="role">
                        <option value="adminRole">Administrator</option>
                        <option value="empRole">Employee</option>
                    </select>
                </div>

                <div class="form-group row">
                    <div class="mb-1">
                        <label for="pass" class="text-blue formLabel">Enable email notifications?</label>
                    </div>
                    
                    <div class="form-check form-check-inline leaveInput">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="pass flexRadioDefault1">
                        <label class="form-check-label" for="flexRadioDefault1">
                            Yes
                        </label>
                        </div>
                        <div class="form-check form-check-inline leaveInput">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="pass flexRadioDefault2" checked>
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

