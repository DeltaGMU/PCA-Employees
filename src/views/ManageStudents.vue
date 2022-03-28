<template>
    <div class="d-flex">
        <div class="p-2">
            <Sidebar>   </Sidebar>
        </div>

        <div class = "p-2 flex-grow-1">

            <h1 class="text-blue">Manage Students</h1>

            <div class="d-flex mb-3">
                <div class="me-auto p-2">
                    <button class="btn blueBtn" @click="$router.push({ path: 'createstudent'})">
                        Create Student 
                    </button>
                </div>
                <div class="p-2"></div>
                <div class="p-2">
                    <button class="btn blueBtn" style="float: right;" @click="refreshStudentsTable()">
                        Refresh Students List
                    </button>
                </div>
            </div>

            <div class="col-sm-12">
                <label class="form-check-label" for="studentSearchBar">
                    Filter student list:
                </label>
                <input type="text" v-model="searchQuery" class="form-control rounded" placeholder="Search for students by ID, First Name, Last Name, or Grade..." name="studentSearchBar" id="studentSearchBar"/>
                <br>
            </div> 

            <div class="table-responsive" v-if = "!filteredStudentsList || !filteredStudentsList.length">
                <table class = "table table-hover">
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

            <div class="table-responsive" v-else>
                <table class = "table table-hover">
                    <thead>
                        <th class = "table-th text-center" v-for = "option in options.headings" v-bind:key = "option" scope = "col" >
                            {{ option }}
                        </th>
                    </thead>
                    <tbody>
                        <tr class = "row-striped" v-for = "(student, index) in filteredStudentsList" v-bind:key="index">
                            <td class = "column text-center">{{ student.student_id }} </td>
                            <td class = "column text-center">{{ student.carpool_number }} </td>
                            <td class = "column text-center">{{ student.last_name }} </td>
                            <td class = "column text-center">{{ student.first_name}} </td>
                            <td class = "column text-center">{{ student.grade.name}} </td>
                            <td class = "column text-center"> 
                                <button type="button" class="btn blueBtn" @click="$router.push({ path: 'editStudent'})">
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
                searchQuery: "",
                studentInfo: this.$store.getters.StateStudents,
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
                            (item.grade.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1);
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
                    () => {
                        this.studentInfo = this.$store.getters.StateStudents
                    }
                )
            }
        },
        mounted() {
            this.refreshStudentsTable();
        }
    };
</script>