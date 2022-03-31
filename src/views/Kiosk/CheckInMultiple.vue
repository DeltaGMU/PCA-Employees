<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="p-3">
            <h1 class="text-blue noSelect">Check In Students for After Care</h1>
            <div class="pb-2 noSelect">
                <div>
                    <label for="role" class="text-blue formLabel">Select Grade</label>
                </div>

                <select class="form-select" v-model="selected" name="selectGrades" id="selectGrades">
                    <option value="" selected disabled>Select an option...</option>
                    <option v-for="(grade, index) in grades" :value="grades[index]" v-bind:key = "grade.id">{{ grades[index].name.toUpperCase() }}</option>
                </select>

            </div>
            <div class="table-responsive noSelect" v-if = "!students || !students.length">
                <table class="pcaTable table-hover">
                    <thead>
                        <th class = "table-th text-center" scope = "col" >
                            Students List
                        </th>
                    </thead>
                    <tbody>
                        <tr class = "row-striped">
                            <td class = "column text-center">No student information available for the selected grade...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="table-responsive noSelect" v-else>
                <table class="pcaTable table-hover">
                    <thead>
                        <th class="col-2" scope = "col">Student ID</th>
                        <th class="middleCols col-4" scope = "col">Student Name</th>
                        <th class="middleCols col-2" scope = "col">Student Grade</th>
                        <th class="middleCols col-2" scope = "col">Previously Checked In</th>
                        <th class="col-1" scope = "col">Select All <input class="form-check-input" type='checkbox' @click='checkAll()' v-model='isCheckAll'></th>
                    </thead>
                    <tbody>
                        <tr class="row-striped text-center" v-for="student in students" :key="student.id" :class="student.not_applicable ? 'row-disabled': ''">
                            <td>{{ student.student.student_id }}</td>
                            <td class="middleCols">{{ student.student.first_name }} {{ student.student.last_name }}</td>
                            <td class="middleCols">{{ student.student.grade.name }}</td>
                            <td class="middleCols"><input class="form-check-input" type="checkbox" :checked="student.not_applicable" onClick="return false;" disabled></td>
                            <td><input class="form-check-input" type="checkbox" v-bind:value='student' v-model='selectedStudents' @change='updateCheckall()' v-if="!student.not_applicable"></td>
                        </tr>
                    </tbody>
                </table>
            </div> 
            <div class="pt-2">
                <button class="btn blueBtn">Check In</button>
            </div>
        </div>
    </div>
</template>

<script>
//import { mapActions, mapGetters } from "vuex";
import NavBar from "@/components/NavBar.vue";
import ConvertDateToTimezone from "@/store/utility/date_format";


export default {
    components: {
        NavBar,
    },
    data() {
        return {
            signedIn: this.$store.getters.isAuthenticated,
            empName: this.$store.getters.StateName,
            empRole: this.$store.getters.StateRole,
            currentPage: "/kiosk/checkinmultiple",

            isCheckAll: false,
            selected: '',
            students: [],
            grades: [],
            selectedStudents: []
        }        
    },
    methods: {
        checkAll: function(){

            this.isCheckAll = !this.isCheckAll;
            this.selectedStudents = [];
            
            if(this.isCheckAll) { // Check all
                for (var key in this.students) {
                    this.selectedStudents.push(this.students[key]);
                }
            }
        },
        updateCheckall: function() {
            if(this.students.length == this.selectedStudents.length) {
                this.isCheckAll = true;
            }
            else {
                this.isCheckAll = false;
            }
        },
    },
    watch: {
        selected(value) {
            // console.log("selected grade: " + value.name);
            this.$store.dispatch("GetStudentsByGrade", {
                student_grade: value.name, 
                care_type: true, 
                care_date: ConvertDateToTimezone(new Date()).slice(0, 10),
            }).then(
                (resp) => {
                    if (resp !== undefined) {
                        this.students = resp
                        this.studentsTwo = [];
                        this.isCheckAll = false;
                    }
                }
            )
        }
    },
    beforeMount() {
        this.$store.dispatch("GetAllStudentGrades").then(
            (resp) => {
                if (resp !== undefined) {
                    this.grades = resp
                }
            }
        );
    }
}
</script>
