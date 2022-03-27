<template>
    <div class = "adminContainer">
        
        <div class = "sideBar">
         <Sidebar>   </Sidebar>
        </div>
        
        <div class = "mainContent">
            <button id="manageBtn" class="btn blueBtn"  @click="$router.push({ path: 'manageadmin'})">
                Manage My Account <br/>
                <i class="fas fa-user"></i>
            </button>
            
            <button id="manageBtn" class="btn blueBtn" @click="$router.push({ path: 'manageemployees'})">
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
            async goToStudentManagement() {
                this.$router.push({ path: 'managestudents'}).then(
                    () => {
                        this.$store.dispatch("GetAllStudents")
                    }
                )
            }
        },
        beforeMount() {
            this.$store.dispatch("GetName")
        }
    };
</script>
