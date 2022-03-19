<template>
    <div class = adminContainer>
        
        <div class = sideBar>
         <Sidebar>   </Sidebar>
        </div>
        
        <div class = mainContent>
            <button id="manageBtn" class="btn blueBtn" @click="manageUserPage">
                Manage User <br/>
                <img src = "https://s2.svgbox.net/octicons.svg?ic=person" >
            </button>
            <button id="manageBtn" class="btn blueBtn" @click="manageEmployeesPage">
                Manage Employees <br/>
                <img src = "https://s2.svgbox.net/octicons.svg?ic=people" >
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
