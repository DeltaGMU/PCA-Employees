<template>
    <div class = "px-0 sidebar">
        <div class="d-flex flex-column align-items-center align-items-sm-start">
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" style="border-radius: 5px 5px 0px 0px;" id="menu">
                <li class="sidebar-item" style="border-radius: 5px 5px 0px 0px;">
                    <a class="nav-link align-middle noSelect" @click=" home ">
                        <i class="fas fa-home"></i> <span class="d-none d-sm-inline">Home</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#submenu1" data-bs-toggle="collapse" class="nav-link align-middle">
                        <i class="fas fa-info-circle"></i> <span class="d-none d-sm-inline">View Information</span>
                    </a>
                    <ul class="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                        <li>
                            <a class="nav-link align-middle noSelect" @click="timesheetInfo">
                                <i class="fa-solid fa-hourglass"></i> <span class="d-none d-sm-inline">Timesheet Info</span>
                            </a>
                        </li>
                    </ul>
                    <ul class="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                        <li>
                            <a class="nav-link align-middle noSelect" @click="() => {}">
                                <i class="fa-solid fa-school"></i> <span class="d-none d-sm-inline">Student Care Info</span>
                            </a>
                        </li>
                    </ul>                  
                </li>
                
                <li class="sidebar-item" style="border-radius: 0px 0px 5px 5px;">
                    <a href="#submenu2" data-bs-toggle="collapse" class="nav-link align-middle">
                        <i class="fas fa-file-alt"></i> <span class="d-none d-sm-inline">Generate Report</span>
                    </a>
                    <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                        <li>
                            <a class="nav-link align-middle noSelect" @click="() => {}">
                                <i class="fa-solid fa-hourglass"></i> <span class="d-none d-sm-inline">Timesheet Report</span>
                            </a>
                        </li>
                    </ul>
                    <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                        <li>
                            <a class="nav-link align-middle noSelect" @click="() => {}">
                                <i class="fa-solid fa-school"></i> <span class="d-none d-sm-inline">Student Care Report</span>
                            </a>
                        </li>
                    </ul>                      
                </li> 
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: "Sidebar",
  methods: {
    home() {
      this.$router.push("/admindashboard");
    },
    timesheetInfo() {
      this.$router.push("/timesheetinfo");
    },
  },
};
</script>