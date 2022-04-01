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
                    <input type="date" class="form-control textBox" id="absenceStartDate" v-model="absenceStartDate" required>
                    <span class="input-group-text">to</span>
                    <input type="date" class="form-control textBox" id="absenceEndDate" v-model="absenceEndDate" required>
                    
                    <button class="btn blueBtn p-2" style="border-radius: 0px 5px 5px 0px;" @click="getReportingPeriod()" :disabled="!absenceStartDate || !absenceEndDate">
                        <span v-show="!isLoading"> Submit</span>
                        <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                        <span v-show="isLoading"> Loading... </span>
                    </button>
                </div>

                <label class="form-check-label" for="reportSearchBar">
                    Filter timesheets list:
                </label>
                <div class="pb-3 input-group">
                    <input type="text" v-model="searchQuery" class="form-control" placeholder="Search for timesheets by First Name, Last Name..." name="reportSearchBar" id="reportSearchBar">
                </div>

                <div class="table-responsive" v-if="!filteredReportsList || Object.keys(filteredReportsList).length == 0">
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
                            <th class = "table-th text-center" v-for="option in options.headings" v-bind:key = "option" scope = "col" >
                                {{ option }}
                            </th>
                        </thead>
                        <tbody>
                            <!--<template v-for = "emp in empInfo" >
                                <div v-bind:key="emp.last_name"> -->

                                <tr class = "row-striped" v-for="(emp, index) in filteredReportsList" v-bind:key="index">
                                    <td class = "column text-center">{{ emp.last_name.charAt(0).toUpperCase() + emp.last_name.slice(1) }} </td>
                                    <td class = "column text-center">{{ emp.first_name.charAt(0).toUpperCase() + emp.first_name.slice(1)}} </td>
                                    <td class = "column text-center">{{ emp.total_hours.work_hours}} </td>
                                    <td class = "column text-center">{{ emp.total_hours.pto_hours}} </td>
                                    <td class = "column text-center">{{ emp.total_hours.extra_hours}} </td>
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
                currentPage: "/timesheetinfo",
                isLoading: false,

                allEmps: [],
                empTotalHours: {},
                absenceStartDate: "",
                absenceEndDate: "",
                selectedPeriod: "",

                searchQuery: "",

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
                if (this.empTotalHours !== null) {
                    return Object.keys(this.empTotalHours).filter(key => {
                        return (
                            this.empTotalHours[key].first_name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1 ||
                            this.empTotalHours[key].last_name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1
                        );                    
                    }).reduce((cur, key) => {
                        cur[key] = this.empTotalHours[key];
                        return cur;
                    }, {})
                }
                else {
                    return {};
                }
            },
        },
        methods: {
            getReportingPeriod() {
                if (!this.isLoading) {
                    this.isLoading = true;
                    this.resetInformation();

                    this.selectedPeriod = this.absenceStartDate + " to " + this.absenceEndDate

                    this.payload = {
                        'absenceDateStart': this.absenceStartDate,
                        'absenceDateEnd': this.absenceEndDate
                    }
                    console.log(this.payload)
                    this.$store.dispatch("GetAllEmployees").then(() => {
                        this.allEmps = this.$store.getters.StateEmployees
                        this.getEmployeeHours();
                        this.isLoading = false;
                    });
                }
            },
            getEmployeeHours() {
                
                console.log(this.allEmps)
                this.payload["employees"] = []
                for (let emp in Object.keys(this.allEmps)) {
                    this.payload["employees"].push({
                        first_name: this.allEmps[emp].first_name,
                        last_name: this.allEmps[emp].last_name,
                        employee_id: this.allEmps[emp].employee_id
                    })
                }
                console.log(this.payload)
                this.$store.dispatch("GetTotalHoursForEmployees", this.payload).then(() => {
                    console.log("AFTER RETRIEVING HOURS")
                    this.empTotalHours = this.$store.getters.RetrievedTotalHours
                    console.log(this.empTotalHours)
                })
                /*
                for(let i = 0; i < this.allEmps.length; i++) {
                    this.payload["employeeID"] = this.allEmps[i].employee_id
                    this.$store.dispatch("GetTotalHours", this.payload).then(() => {
                        console.log("EMPLOYEE " + i + ": " + this.empTotalHours)
                    })
                }
                */  
            },
            resetInformation() {
                this.allEmps = []
                this.empTotalHours = {}
                this.selectedPeriod = ""
            },
        },
        mounted() {
            this.resetInformation();
            this.absenceStartDate = ""
            this.absenceEndDate = ""
            this.isLoading = false
        }
    };
</script>