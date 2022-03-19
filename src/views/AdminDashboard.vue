<template>
    <div class = "adminContainer">
        
        <div class = "sideBar">
         <Sidebar>   </Sidebar>
        </div>
        
        <div class = "mainContent">
            <button id="manageBtn" class="btn blueBtn" @click="manageUserPage">
                Manage User <br/>
                <i class="fas fa-user"></i>
            </button>
            <button id="manageBtn" class="btn blueBtn" @click="manageEmployeesPage">
                Manage Employees <br/>
                <i class="fas fa-users"></i>
            </button>
        </div>
    </div>
</template>


<script>
    import Sidebar from "../components/Sidebar.vue";
    export default {
        components: {
            Sidebar
        },
    };
</script>
