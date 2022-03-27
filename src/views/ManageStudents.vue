<template>
    <div>
    <div class = "sideBar">
         <Sidebar>   </Sidebar>
    </div>

    <div class = "empContent">

        <h1>Manage Students</h1>

        <button class="btn blueBtn" @click="$router.push({ path: 'createstudent'})">
            Create Student 
        </button>
        <button class="btn blueBtn" style="float: right;" @click="refreshStudentsTable()">
            Refresh Students List
        </button>
        
        <br> <br>

        <!-- >Search and filter through employees <-->
        <!-- <input class = "search-bar" type="text"  v-model= "query" placeholder="Search for students.." title="Type in a name"> -->
        
        <table class = "table">
            <thead>
                <th class = "table-th text-center" v-for = "option in options.headings" v-bind:key = "option" scope = "col" >
                    {{ option }}
                </th>
            </thead>
            <tbody>
                <tr class = "row-striped" v-if = "!studentInfo || !studentInfo.length">
                    <td class = "column text-center">No student information available...</td>
                </tr>
                <tr class = "row-striped" v-for = "(student, index) in studentInfo" v-bind:key="index">
                    <td class = "column text-center">{{ student.student_id }} </td>
                    <td class = "column text-center">{{ student.carpool_number }} </td>
                    <td class = "column text-center">{{ student.last_name }} </td>
                    <td class = "column text-center">{{ student.first_name}} </td>
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
                //query: '',
                studentInfo: this.$store.getters.StateStudents,
            
                columns: [
                    'studentID',
                    'carpoolNum',
                    'last_name',
                    'first_name',
                    'editStudent'
                ],


                options: {
                    headings: {
                        studentID: 'ID',
                        carpoolNum: 'Carpool #',
                        last_name: 'Last Name',
                        first_name: 'First Name',
                        editStudent: 'Edit Student'
                    }
                }
            }
        },
        methods: {
            async refreshStudentsTable() {
                this.$store.dispatch("GetAllStudents").then(
                    () => {
                        this.studentInfo = this.$store.getters.StateStudents
                    }
                )
            }
        },
        mounted() {
            this.$store.dispatch("GetAllStudents").then(() => {
                this.refreshStudentsTable();
            })
        }
    };
</script>