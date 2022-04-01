<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
                <Sidebar/>
            </div>

            <div class = "p-2 flex-grow-1">
                <h1 class="text-blue">Manage Employees</h1>
                <div class="d-flex mb-3">
                    <div class="me-auto p-2">
                        <button class="btn blueBtn" @click="$router.push({ path: 'createemployee'})">
                            Create Employee 
                        </button>
                    </div>
                    <div class="p-2"></div>
                    <div class="p-2">
                        <button class="btn blueBtn" style="float: right;" @click="refreshEmployeesTable()">
                            Refresh Employees List
                        </button>
                    </div>
                </div>

                <div class="col-sm-12">
                    <label class="form-check-label" for="studentSearchBar">
                        Filter employee list:
                    </label>
                    <input type="text" v-model="searchQuery" class="form-control rounded" placeholder="Search for employees by ID, First Name, or Last Name..." name="studentSearchBar" id="studentSearchBar"/>
                    <br>
                </div> 
                <div class="table-responsive" v-if="!filteredEmployeesList || !filteredEmployeesList.length">
                    <table class = "pcaTable table-hover">
                        <thead>
                            <th scope = "col" >
                                Employees List
                            </th>
                        </thead>
                        <tbody>
                            <tr class = "row-striped">
                                <td>No employee information available...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table-responsive" id="manageEmployeeTable" v-else>
                    <table class = "pcaTable table-hover">
                        <thead>
                            <th scope = "col"> Employee ID </th>
                            <th scope = "col" class="middleCols"> Last Name </th>
                            <th scope = "col" class="middleCols"> First Name </th>
                            <th scope = "col"> Edit Employee </th>
                        </thead>
                        <tbody>
                            <tr class = "row-striped" v-for = "(employee, index) in filteredEmployeesList" v-bind:key=index>
                                <td>{{ employee.employee_id }} </td>
                                <td class = "middleCols">{{ employee.last_name }} </td>
                                <td class = "middleCols">{{ employee.first_name}} </td>
                                <td> 
                                    <button class="btn blueBtn" @click="goToEditEmployee(option)">
                                        Edit 
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
    import Sidebar from "@/components/Sidebar.vue";
    import NavBar from "@/components/NavBar.vue";
    
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
                currentPage: "/manageemployees",

                searchQuery: '',
                employeeInfo: this.$store.getters.StateEmployees,
                columns: [
                    'employeeID',
                    'last_name',
                    'first_name',
                    'editEmployee'
                ],
                options: {
                    headings: {
                        employeeID: 'Employee ID',
                        last_name: 'Last Name',
                        first_mame: 'First Name',
                        editEmployee: 'Edit Employee'
                    }
                }
            }
        },
        computed: {
            filteredEmployeesList() {
                if (this.employeeInfo !== null) {
                    return this.employeeInfo.filter(item => {
                        return (
                            item.first_name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1
                            ) || (item.last_name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1) ||
                            (item.employee_id.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1);
                    })
                }
                else {
                    return [];
                }
            }
        },
        methods: {
            refreshEmployeesTable() {
                this.$store.dispatch("GetAllEmployees").then(
                    () => {
                        this.employeeInfo = this.$store.getters.StateEmployees
                    }
                )
            },
            goToEditEmployee(option) {
                this.$router.push({ name: 'EditEmployee', params: {employeeID: option.id}})
            }
        },
        mounted() {
            this.refreshEmployeesTable();
        }
    };
</script>