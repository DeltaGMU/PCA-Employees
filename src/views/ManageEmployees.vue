<template>
    <div class="d-flex">
        <div class="p-2">
            <Sidebar>   </Sidebar>
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

            <!-- >Search and filter through employees <-->
            <!-- <input class = "search-bar" type="text" v-model= "query" placeholder="Search for employees.." title="Type in a name"> -->
            <div class="search-bar col-sm-12">
                <label class="form-check-label" for="studentSearchBar">
                    Filter employee list:
                </label>
                <input type="text" v-model="searchQuery" class="search-bar form-control rounded" placeholder="Search for employees by ID, First Name, or Last Name..." name="studentSearchBar" id="studentSearchBar"/>
                <br>
            </div> 
            <div class="table-responsive" v-if = "!filteredEmployeesList || !filteredEmployeesList.length">
                <table class = "table table-hover">
                    <thead>
                        <th class = "table-th text-center" scope = "col" >
                            Employees List
                        </th>
                    </thead>
                    <tbody>
                        <tr class = "row-striped">
                            <td class = "column text-center">No employee information available...</td>
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
                        <tr class = "row-striped" v-for = "(employee, index) in filteredEmployeesList" v-bind:key=index>
                            <td class = "column text-center">{{ employee.employee_id }} </td>
                            <td class = "column text-center">{{ employee.last_name }} </td>
                            <td class = "column text-center">{{ employee.first_name}} </td>
                            <td class = "column text-center"> 
                                <button class="btn blueBtn" @click="$router.push({ path: 'editEmployee'})">
                                    Edit 
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template> 

<script>
    import Sidebar from "../components/Sidebar.vue";
    export default {
        components: {
            Sidebar
        },
        data() {
            return {
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
            }
        },
        mounted() {
            this.refreshEmployeesTable();
        }
    };
</script>