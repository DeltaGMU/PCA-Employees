<template>
    <div class="d-flex">
        
        <div class="p-2">
         <Sidebar>   </Sidebar>
        </div>
        
        <div class = "p-2 flex-grow-1">
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
                <i class="fas fa-users"></i>
            </button>
        </div>
    </div>
</template>


<script>
    import Sidebar from "../components/Sidebar.vue";
    export default {
        name: "AdminDashboard",
        components: {
            Sidebar
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
            }
        },
        beforeMount() {
            this.$store.dispatch("GetName")
        }
    };
</script>
