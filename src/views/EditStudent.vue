<template>
    <form>
        <div class="wrapper">
            <div class="topSection noSelect">

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">

                    <h1 class="text-blue">Edit Student</h1>

                </div>
            
            </div>

            <div>
                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="firstNameStudent" class="text-blue formLabel">Student First Name</label>
                    </div>
                    
                    <input type="text" class="form-control" id="firstName" required>
                    
                </div>

                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="lastNameStudent" class="text-blue formLabel">Student Last Name</label>
                    </div>
                    
                    <input type="text" class="form-control" id="lastName">
                </div>

                <br>

                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="carpool" class="text-blue formLabel">Carpool Number</label>
                    </div>
                    
                    <input type="text" class="form-control" id="carpool">
                </div>

                <br>

                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="firstNameParent" class="text-blue formLabel">Parent First Name</label>
                    </div>
                    
                    <input type="text" class="form-control" id="firstName" required>
                    
                </div>

                <div class="form-group row noSelect">
                    <div class="mb-1">
                        <label for="lastNameParent" class="text-blue formLabel">Parent Last Name</label>
                    </div>
                    
                    <input type="text" class="form-control" id="lastName">
                </div>
                
                <br>
                

                <div class="form-group row noSelect">
                        <div class="mb-1">
                            <label for="primaryEmail" class="text-blue formLabel">Parent Primary Email</label>
                        </div>
                        
                        <input type="text" class="form-control leaveInput" id="primaryMail">
                </div>
            
                <div class="form-group row noSelect">
                        <div class="mb-1">
                            <label for="secondaryEmail" class="text-blue formLabel leaveLabel">Parent Secondary Email</label>
                        </div>
                        
                        <input type="text" class="form-control leaveInput" id="primaryMail">
                </div>

                <br>


                <div class="form-group row">
                    <div class="mb-1">
                        <label for="notification" class="text-blue formLabel">Enable email notifications?</label>
                    </div>
                    
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="notification flexRadioDefault1">
                        <label class="form-check-label" for="flexRadioDefault1">
                            Yes
                        </label>
                        </div>
                        <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="notification flexRadioDefault2" checked>
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

