<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
                <Sidebar>   </Sidebar>
            </div>

            <div class="p-2 flex-grow-1">

                <h1 class="text-blue">Manage Students</h1>

                <div class="d-flex mb-3">
                    <div class="me-auto pe-2 pt-2 pb-2">
                        <button class="btn blueBtn" @click="$router.push({ path: 'createstudent'})">
                            Create Student 
                        </button>
                    </div>
                    <div class="ps-2 pt-2 pb-2">
                        <button class="btn blueBtn" @click="refreshStudentsTable()">
                            Refresh Students List
                        </button>
                    </div>
                </div>

                <div class="col-sm-12">
                    <label class="form-check-label" for="studentSearchBar">
                        Filter student list:
                    </label>
                    <input type="text" v-model="searchQuery" class="form-control rounded" placeholder="Search for students by ID, Carpool #, First Name, Last Name, or Grade..." name="studentSearchBar" id="studentSearchBar"/>
                    <br>
                </div> 

                <div class="table-responsive" v-if = "!filteredStudentsList || !filteredStudentsList.length">
                    <table class = "pcaTable table-hover">
                        <thead>
                            <th class = "table-th text-center" scope = "col" >
                                Students List
                            </th>
                        </thead>
                        <tbody>
                            <tr class = "row-striped">
                                <td class = "column text-center">No student information available...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="table-responsive" id="manageStudentTable" v-else>
                    <table class = "pcaTable table-hover">
                        <thead>
                            <th scope = "col">ID</th>
                            <th scope = "col" class="middleCols"> Carpool # </th>
                            <th scope = "col" class="middleCols"> Last Name </th>
                            <th scope = "col" class="middleCols"> First Name </th>
                            <th scope = "col" class="middleCols"> Grade </th>
                            <th scope = "col"> Edit Student </th>
                        </thead>
                        <tbody>
                            <tr class = "row-striped" v-for = "(student, index) in filteredStudentsList" v-bind:key="index">
                                <td>{{ student.student_id }} </td>
                                <td class = "middleCols">{{ student.car_pool_number }} </td>
                                <td class = "middleCols">{{ student.last_name }} </td>
                                <td class = "middleCols">{{ student.first_name}} </td>
                                <td class = "middleCols">{{ student.grade.name}} </td>
                                <td> 
                                    <button type="button" class="btn blueBtn" @click="$router.push({ path: '/editStudent', name: 'EditStudent', params: { id: student.student_id }})">
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
                currentPage: "/managestudents",

                searchQuery: "",
                studentInfo: [],
                columns: [
                    'studentID',
                    'carpoolNum',
                    'last_name',
                    'first_name',
                    'grade',
                    'editStudent'
                ],
                options: {
                    headings: {
                        studentID: 'ID',
                        carpoolNum: 'Carpool #',
                        last_name: 'Last Name',
                        first_name: 'First Name',
                        grade: 'Grade',
                        editStudent: 'Edit Student'
                    }
                }
            }
        },
        computed: {
            filteredStudentsList() {
                if (this.studentInfo !== null) {
                    return this.studentInfo.filter(item => {
                        return (
                            item.first_name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1
                            ) || (item.last_name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1) ||
                            (item.student_id.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1) ||
                            (item.grade.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1) ||
                            (item.carpool_number.toString().toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1);
                    })
                }
                else {
                    return [];
                }
            }
        },
        methods: {
            refreshStudentsTable() {
                this.$store.dispatch("GetAllStudents").then(
                    (resp) => {
                        this.studentInfo = resp
                    }
                )
            }
        },
        mounted() {
            this.refreshStudentsTable();
        }
    };
</script>