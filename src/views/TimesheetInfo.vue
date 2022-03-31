<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
                <Sidebar></Sidebar>
            </div>
            <div class = "p-2 flex-grow-1">
                <h1 class="text-blue">Timesheet Records</h1>
                <!--<h3 class="text-blue pb-3">{{ selectedPeriod }}</h3>-->

                <label class="form-check-label" for="absenceStartDate">Please select a reporting period:</label>
                <div class="pb-3 input-group">
                    <input type="date" class="form-control textBox" id="absenceStartDate" required>
                    <span class="input-group-text">to</span>
                    <input type="date" class="form-control textBox" id="absenceEndDate" required>
                    <button class="btn blueBtn p-2" style="border-radius: 0px 5px 5px 0px;" @click="getReportingPeriod()">Submit</button>
                </div>

                <label class="form-check-label" for="reportSearchBar">
                    Filter timesheets list:
                </label>
                <div class="pb-3 input-group">
                    <input type="text" style="border-radius: 5px 0px 0px 5px;" v-model="searchQuery" class="form-control" placeholder="Search for timesheets by First Name, Last Name..." name="reportSearchBar" id="reportSearchBar">
                    <button class="btn blueBtn p-2" style="border-radius: 0px 5px 5px 0px;" type="button" @click="refreshReportsTable()">
                        Refresh Timesheets
                    </button>
                </div>

                <div class="table-responsive" v-if = "!filteredReportsList || !filteredReportsList.length">
                    <table class = "table table-hover">
                        <thead>
                            <th class = "table-th text-center" scope = "col" >
                                Timesheets List
                            </th>
                        </thead>
                        <tbody>
                            <tr class = "row-striped">
                                <td class = "column text-center">No timesheet information available...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="table-responsive" v-else>
                    <table class = "table table-hover">
                        <thead>
                            <th class = "table-th text-center" v-for = "option in options.headings" v-bind:key = "option" scope = "col" >
                                {{ option }}
                            </th>
                        </thead>
                        <tbody>
                            <!--<template v-for = "emp in empInfo" >
                                <div v-bind:key="emp.last_name"> -->

                                <tr class = "row-striped" v-for = "(emp, index) in filteredReportsList" v-bind:key="index">
                                    <td class = "column text-center">{{ emp.last_name }} </td>
                                    <td class = "column text-center">{{ emp.first_name}} </td>
                                    <td class = "column text-center">{{ emp.work_hours}} </td>
                                    <td class = "column text-center">{{ emp.pto_hours}} </td>
                                    <td class = "column text-center">{{ emp.extra_hours}} </td>
                                    <td class = "column text-center"> 
                                        <button type="button" class="btn blueBtn">
                                            <img src="https://s2.svgbox.net/hero-outline.svg?ic=zoom-in&color=ffffff" width="28" height="28">
                                        </button>
                                    </td>
                                </tr>
                                <!-- <tr class = "row-striped" v-for = "(item, i) in empInfo" v-bind:key="i">
                                    <td class = "column">{{ item.last_name}} </td>
                                    <td class = "column">{{ item.first_name}} </td>
                                    <td class = "column">{{ item.work_hours}} </td>
                                    <td class = "column">{{ item.pto_hours}} </td>
                                    <td class = "column">{{ item.extra_hours}} </td>
                                    <td class = "column">{{ item.sub_status}} </td>
                                </tr> -->
                            <!--  </div>
                            </template> -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
    import Sidebar from "../components/Sidebar.vue";
    import NavBar from "@/components/NavBar.vue";
    //import ConvertDateToTimezone from "@/store/utility/date_format";

    export default {
        components: {
            Sidebar,
            NavBar
        },
        data() {
            return {
                signedIn: this.$store.getters.isAuthenticated,
                empName: this.$store.getters.StateName,
                empRole: this.$store.getters.StateRole,
                allEmps: this.$store.getters.StateEmployees,
                empTotalHours: this.$store.getters.RetrievedTotalHours,
                currentPage: "/timesheetinfo",
                absenceStartDate: "",
                absenceEndDate: "",
                selectedPeriod: "",

                searchQuery: "",
                timesheetInfo: [
                    {
                        'last_name':'Adams',
                        'first_name': 'Jane',
                        'work_hours': 30,
                        'pto_hours': 0,
                        'extra_hours': 0
                    },
                    {
                        'last_name':'Smith',
                        'first_name': 'Amy',
                        'work_hours': 30,
                        'pto_hours': 0,
                        'extra_hours': 0
                    },
                    {
                        'last_name':'Jones',
                        'first_name': 'Sam',
                        'work_hours': 30,
                        'pto_hours': 0,
                        'extra_hours': 0
                    },
                    
                    
                    
                ],
                columns: [
                    'last_name',
                    'first_name',
                    'work_hours',
                    'pto_hours',
                    'extra_hours'
                ],
                options: {
                    headings: {
                        last_name: 'Last Name',
                        first_name: 'First Name',
                        work_hours: 'Work Hours' ,
                        pto_hours: 'PTO Hours',
                        extra_hours:'Extra Hours',
                        view_details: 'View Details'
                    }
                },
                payload: {}
            }
        },
        computed: {
            filteredReportsList() {
                if (this.timesheetInfo !== null) {
                    return this.timesheetInfo.filter(item => {
                        return (
                            item.first_name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1
                            ) || (item.last_name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1);
                    })
                }
                else {
                    return [];
                }
            },
        },
        methods: {
            refreshReportsTable() {
                /*
                You would dispatch a function that sends a request to the server API to retrieve
                reports for a given time period (YYYY-MM-DD to YYYY-MM-DD), and then retrieve
                those results.

                this.$store.dispatch("GetAllReports").then(
                    () => {
                        this.reportsInfo = this.$store.getters.StateReports
                    }
                )
                */
            },
            getReportingPeriod() {
                this.absenceStartDate = document.getElementById("absenceStartDate").value
                this.absenceEndDate = document.getElementById("absenceEndDate").value

                this.selectedPeriod = this.absenceStartDate + " to " + this.absenceEndDate

                this.payload = {
                    'absenceDateStart': this.absenceDateStart,
                    'absenceDateEnd': this.absenceDateEnd
                }
            },
            getEmployeeHours() {
                
                console.log(this.allEmps)

                for(let i = 0; i < this.allEmps.length; i++) {
                    this.payload["employeeID"] = this.allEmps[i].employee_id
                    this.$store.dispatch("GetTotalHours", this.payload)
                    console.log("EMPLOYEE " + i + ": " + this.empTotalHours)
                }               
            },
        },
        mounted() {
            this.$store.dispatch("GetAllEmployees");
            this.getEmployeeHours();
            this.refreshReportsTable();
        }
    };
</script>