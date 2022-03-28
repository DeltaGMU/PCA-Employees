<template>
    <div class = "px-0 sidebar">
        <div class="d-flex flex-column align-items-center align-items-sm-start">
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li class="sidebar-item" style="border-radius: 5px 5px 0px 0px;">
                    <a class="nav-link align-middle noSelect" @click=" home ">
                        <i class="fas fa-home"></i> <span class="ml-1 d-none d-sm-inline">Home</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a class="nav-link align-middle noSelect" @click="timesheetInfo">
                        <i class="fa-solid fa-hourglass"></i> <span class="ml-1 d-none d-sm-inline">View Timesheet Info</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a class="nav-link align-middle noSelect" @click="() => {}">
                        <i class="fa-solid fa-school"></i> <span class="ml-1 d-none d-sm-inline">View Student Care Info</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a class="nav-link align-middle noSelect" @click="() => {}">
                        <i class="fa-solid fa-hourglass"></i> <span class="ml-1 d-none d-sm-inline">Generate Timesheet Report</span>
                    </a>
                </li>
                <li class="sidebar-item" style="border-radius: 0px 0px 5px 5px;">
                    <a class="nav-link align-middle noSelect" @click="() => {}">
                        <i class="fa-solid fa-school"></i> <span class="ml-1 d-none d-sm-inline">Generate Student Care Report</span>
                    </a>
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