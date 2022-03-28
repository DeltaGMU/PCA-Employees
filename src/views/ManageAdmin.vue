<template>
    <div class="row">
        <div class="col-2 col-sm-3 col-md-4 col-lg-3 col-xxl-2">
            <Sidebar>   </Sidebar>
        </div>

        <div class = "mt-3 col-10 col-sm-9 col-md-8 col-xxl-10 pe-3 pe-md-4 pe-lg-4 pe-xl-5">
            <form>
                <div>
                    <div class="topSection noSelect">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">

                            <h1 class="text-blue">Manage My Account</h1>

                        </div>
                    
                    </div>

                    <div>
                        <div class="form-group row noSelect">
                            <div class="mb-1">
                                <label for="firstName" class="text-blue formLabel">First Name</label>
                            </div>
                            
                            <input type="text" class="form-control leaveInput" id="firstName" required>
                            
                        </div>

                        <div class="form-group row noSelect">
                            <div class="mb-1">
                                <label for="lastName" class="text-blue formLabel">Last Name</label>
                            </div>
                            
                            <input type="text" class="form-control leaveInput" id="lastName">
                        </div>

                        <div class="form-group row noSelect">
                            <div class="mb-1">
                                <label for="passwordChange" class="text-blue formLabel">Password</label><br>
                                <button class="mt-2 btn blueBtn" id="passwordChange">Change Password</button>
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

                        <div class="form-group row">
                            <div class="mb-1">
                                <label for="notification" class="text-blue formLabel">Enable email notifications?</label>
                            </div>
                            
                            <div class="form-check form-check-inline leaveInput">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="notification flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check form-check-inline leaveInput">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="notification flexRadioDefault2" checked>
                                <label class="form-check-label" for="flexRadioDefault2">
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                    <button class="mt-3 btn blueBtn">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Sidebar from "../components/Sidebar.vue";
    export default {
        components: {
            Sidebar
        },
    }
</script>

