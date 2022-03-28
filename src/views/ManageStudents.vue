<template>
    <div class="row">
        <div class="col-2 col-md-4 col-lg-3 col-xxl-2">
            <Sidebar>   </Sidebar>
        </div>

        <div class = "mt-3 col-10 col-md-8 col-lg-9 col-xxl-10 pe-3 pe-md-4 pe-xl-5">

            <h1 class="text-blue">Manage Students</h1>

            <button class="btn blueBtn" @click="$router.push({ path: 'createstudent'})">
                Create Student 
            </button>
            <button class="btn blueBtn" style="float: right;" @click="refreshStudentsTable()">
                Refresh Students List
            </button>
            
            <br> <br>

            <!-- >Search and filter through employees <-->
            <!-- <input class = "search-bar" type="text"  v-model= "query" placeholder="Search for students.." title="Type in a name"> -->
            
            <div class="search-bar col-sm-12">
                <label class="form-check-label" for="studentSearchBar">
                    Filter student list:
                </label>
                <input type="text" v-model="searchQuery" class="search-bar form-control rounded" placeholder="Search for students by ID, First Name, Last Name, or Grade..." name="studentSearchBar" id="studentSearchBar"/>
                <br>
            </div> 
            <div v-if = "!filteredStudentsList || !filteredStudentsList.length">
                <table class = "table">
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
            <table class = "table" v-else>
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
                            <button class="btn blueBtn" @click="$router.push({ path: 'editStudent'})">
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