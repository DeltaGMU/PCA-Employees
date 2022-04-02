<template>
    <div class="content">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
            <Sidebar/>
            </div>
            
            <div class = "p-2 manageButtonsDiv flex-grow-1">
                <button id="manageBtn" class="btn blueBtn"  @click="$router.push({ path: 'manageadmin'})">
                    Manage My Account <br/>
                    <i class="fas fa-user"></i>
                </button>
                
                <button id="manageBtn" class="btn blueBtn" @click="goToEmployeeManagement()">
                    Manage Employees <br/>
                    <i class="fas fa-users"></i>
                </button>

                <button id="manageBtn" class="btn blueBtn" @click="goToStudentManagement()">
                    Manage Students <br/>
                    <i class="fas fa-school"></i>
                </button>

                <button id="manageBtn" class="btn blueBtn" @click="goToStudentCareManagement()">
                    Manage Student Care <br/>
                    <i class="fas fa-address-card"></i>
                </button>

                <button id="manageBtn" class="btn blueBtn" @click="goToStudentGradeManagement()">
                    Manage Grade Levels <br/>
                    <i class="fas fa-graduation-cap"></i>
                </button>
            </div>
        </div>
    </div>
</template>


<script>
    import Sidebar from "@/components/Sidebar.vue";
    import NavBar from "@/components/NavBar.vue";
    
    export default {
        name: "AdminDashboard",
        components: {
            Sidebar,
            NavBar,
        },
        data() {
            return {
                signedIn: this.$store.getters.isAuthenticated,
                empName: this.$store.getters.StateName,
                empRole: this.$store.getters.StateRole,
                currentPage: "/admindashboard",
            }
        },
        methods: {
            goToStudentManagement() {
                this.$router.push({ path: 'managestudents'}).then(
                    () => {
                        this.$store.dispatch("GetAllStudents")
                    }
                )
            },
            goToEmployeeManagement() {
                this.$router.push({ path: 'manageemployees'}).then(
                    () => {
                        this.$store.dispatch("GetAllEmployees")
                    }
                )
            },
            goToStudentCareManagement() {
                this.$router.push({ path: 'managestudentcare'}).then(
                    () => {
                        this.$store.dispatch("GetAllStudents")
                    }
                )
            },
            goToStudentGradeManagement() {
                this.$router.push({ path: 'managestudentgrades'}).then(
                    () => {
                        // this.$store.dispatch("GetAllStudents")
                    }
                )
            },
        },
    };
</script>
