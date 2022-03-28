<template>
    <div class = "row">
        
        <div class="col-3 col-sm-5 col-xl-3">
         <Sidebar>   </Sidebar>
        </div>
        
        <div class = "mt-3 col-9 col-sm-7 col-xl-9">
            <button id="manageBtn" class="btn blueBtn"  @click="$router.push({ path: 'manageadmin'})">
                Manage My Account <br/>
                <i class="fas fa-user"></i>
            </button>
            
            <button id="manageBtn" class="btn blueBtn" @click="$router.push({ path: 'manageemployees'})">
                Manage Employees <br/>
                <i class="fas fa-users"></i>
            </button>

            <button id="manageBtn" class="btn blueBtn" @click="$router.push({ path: 'managestudents'})">
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
            
        },
        beforeMount() {
            this.$store.dispatch("GetName")
        }
    };
</script>
