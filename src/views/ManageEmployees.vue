<template>
    <div>
        <div class = "sideBar">
            <Sidebar>   </Sidebar>
        </div>

        <div class = "empContent">

            <h1>Manage Employees</h1>

            
            <button class="btn blueBtn" @click="$router.push({ path: 'createemployee'})">
                Create Employee 
            </button>
            
            <br> <br>

            <!-- >Search and filter through employees <-->
            <!-- v-model= "query" -->
            <input class = "search-bar" type="text" placeholder="Search for employees.." title="Type in a name">
            
            <table class = "table">
                <thead>
                    <th class = "table-th text-center" v-for = "option in options.headings" v-bind:key = "option" scope = "col" >
                        {{ option }}
                    </th>
                </thead>
                <tbody>
                    <tr class = "row-striped" v-for = "(emp, index) in empInfo" v-bind:key=index>
                        <td class = "column text-center">{{ emp.employee_id }} </td>
                        <td class = "column text-center">{{ emp.last_name }} </td>
                        <td class = "column text-center">{{ emp.first_name}} </td>
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
</template> 

<script>
    import Sidebar from "../components/Sidebar.vue";
    export default {
        components: {
            Sidebar
        },
        data() {
        return {
            //query: '',
            //empInfo: [],
            empInfo: [
                {
                    'employee_id':"jadams",
                    'last_name':'Adams',
                    'first_name': 'Jane'
                },
                {
                    'employee_id':"asmith",
                    'last_name':'Smith',
                    'first_name': 'Amy'
                },
                {
                    'employee_id':"sjones",
                    'last_name':'Jones',
                    'first_name': 'Sam'
                }
                
            ],
        
            columns: [
                'employeeID',
                'last_name',
                'first_name',
                'editEmployee'
            ],

            empCollection: [],

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
    };
</script>