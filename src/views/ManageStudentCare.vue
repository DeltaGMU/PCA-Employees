<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
                <Sidebar>   </Sidebar>
            </div>
            <div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="deleteStudentRecordLbl" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5>Delete Student Record?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearSelectedCareRecord()"></button>
                        </div>
                        <div class="modal-body">
                            <div v-if="selected_care == 0 && !!selected_record && !!selected_record.before_care">
                                <p>Are you sure you want to delete this <b>before-care</b> record?</p><br>
                                <ul>
                                    <li>Student ID: <b>{{ selected_record.student.student_id }}</b></li>
                                    <li>Name: <b>{{ selected_record.student.first_name }} {{ selected_record.student.last_name }}</b></li>
                                    <li>Care Type: <b>Before-Care</b></li>
                                    <li>Date: <b>{{ selected_record.before_care.care_date }}</b></li>
                                </ul>                                
                            </div>
                            <div v-if="selected_care == 1 && !!selected_record  && !!selected_record.after_care">
                                <p>Are you sure you want to delete this <b>after-care</b> record?</p><br>
                                <ul>
                                    <li>Student ID: <b>{{ selected_record.student.student_id }}</b></li>
                                    <li>Name: <b>{{ selected_record.student.first_name }} {{ selected_record.student.last_name }}</b></li>
                                    <li>Care Type: <b>After-Care</b></li>
                                    <li>Date: <b>{{ selected_record.after_care.care_date }}</b></li>
                                </ul>
                            </div>
                            <div v-if="selected_care == 2 && !!selected_record && !!selected_record.before_care  && !!selected_record.after_care">
                                <p>Are you sure you want to delete this <b>before-care and after-care</b> record?</p><br>
                                <ul>
                                    <li>Student ID: <b>{{ selected_record.student.student_id }}</b></li>
                                    <li>Name: <b>{{ selected_record.student.first_name }} {{ selected_record.student.last_name }}</b></li>
                                    <li>Care Type: <b>Before-Care</b></li>
                                    <li>Date: <b>{{ selected_record.before_care.care_date }}</b></li>
                                </ul>
                                <ul>
                                    <li>Student ID: <b>{{ selected_record.student.student_id }}</b></li>
                                    <li>Name: <b>{{ selected_record.student.first_name }} {{ selected_record.student.last_name }}</b></li>
                                    <li>Care Type: <b>After-Care</b></li>
                                    <li>Date: <b>{{ selected_record.after_care.care_date }}</b></li>
                                </ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn blueBtn" data-bs-dismiss="modal" @click="clearSelectedCareRecord()">Cancel</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteSelectedCareRecord()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-2 flex-grow-1">

                <h1 class="text-blue">Manage Student Care</h1>

                <div class="pb-2 noSelect">
                    <div>
                        <label for="role" class="text-blue formLabel">Enter Student ID</label>
                    </div>

                    <div v-if="showError" class="alert alert-danger ">Invalid student ID: {{ this.incorrect_id }}. Please try again.</div>
                    <div class="needs-validation" novalidate>
                        <div class="mb-3  text-center">
                            <input type="text" class="form-control form-control-lg textBox text-center" name="student_id_input" autocomplete="off" id="student_id_input" v-model="student_id" required>
                        </div>
                        
                        <div class="d-flex justify-content-center">
                            <button type="button" id="studentSearchBtn" :disabled="student_id.length == 0" class="mt-3 btn formBtn blueBorder smallerScreenBtn" @click="checkStudentInfo">
                                <span v-show="!isLoading"> Search </span>
                                <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                                <span v-show="isLoading"> Loading... </span>
                            </button>
                        </div>
                    </div>
                </div>

                <hr>
                <div class="input-group mb-3" v-if="Object.keys(records).length > 0">
                    <br>
                    <input type="text" style="border-radius: 5px 0px 0px 5px;" v-model="searchQuery" class="form-control" placeholder="Search for records by Date..." name="recordSearchBar" id="recordSearchBar"/>
                    <button class="btn blueBtn p-2" style="border-radius: 0px 5px 5px 0px;" type="button" @click="checkStudentInfo()">
                        Refresh Reports
                    </button>
                    <br>
                </div>
                
                <div class="table-responsive noSelect" v-if="!filteredRecordsList || Object.keys(filteredRecordsList).length == 0">
                    <table class="pcaTable table-hover">
                        <thead>
                            <th scope = "col" >
                                Student Care Records
                            </th>
                        </thead>
                        <tbody>
                            <tr class = "row-striped">
                                <td class = "noInfo">No student information available for the selected ID...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table-responsive noSelect" v-else>
                    <h4 class="text-blue">Records period: {{ this.thirty_days_ago }} to {{ this.today }}</h4>
                    <table id="manageStudentCareTable" class="pcaTable table-hover">
                        <thead>
                            <th scope = "col">Date</th>
                            <th class="middleCols" scope = "col">Student Name</th>
                            <th class="middleCols" scope = "col">Before-Care</th>
                            <th class="middleCols" scope = "col">After-Care</th>
                            <th class="middleCols" scope = "col">Delete BC</th>
                            <th class="middleCols" scope = "col">Delete AC</th>
                            <th scope = "col">Delete Both</th>
                        </thead>
                        <tbody>
                            <tr class="row-striped text-center" v-for="(record, index) in filteredRecordsList" :key="index">
                                <td>{{ index }}</td>
                                <td class="middleCols">{{ record.student.first_name }} {{ record.student.last_name }}</td>
                                <td class="middleCols"><input class="form-check-input" type="checkbox" onClick="return false;" :checked="!!record.before_care"></td>
                                <td class="middleCols"><input class="form-check-input" type="checkbox" onClick="return false;" :checked="!!record.after_care"></td>
                                <td class="middleCols mobilePadding">
                                    <button type="button" v-if="!!record.before_care" class="btn btn-danger" id="deleteStudentBCButton" data-bs-toggle="modal" data-bs-target="#confirm-delete" @click="setSelectedCareRecord(record, 0)">
                                        <span class="fa-solid fa-xmark">
                                        </span>
                                    </button>
                                </td>
                                <td class="middleCols mobilePadding">
                                    <button type="button" v-if="!!record.after_care" class="btn btn-danger" id="deleteStudentACButton" data-bs-toggle="modal" data-bs-target="#confirm-delete" @click="setSelectedCareRecord(record, 1)">
                                        <span class="fa-solid fa-xmark">
                                        </span>
                                    </button>
                                </td>
                                <td class = "mobilePadding">
                                    <button type="button" v-if="!!record.before_care && !!record.after_care" class="btn btn-danger" id="deleteStudentBothButton" data-bs-toggle="modal" data-bs-target="#confirm-delete" @click="setSelectedCareRecord(record, 2)">
                                        <span class="fa-solid fa-xmark">
                                        </span>
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
    import { mapActions } from "vuex";
    import Sidebar from "@/components/Sidebar.vue";
    import NavBar from "@/components/NavBar.vue";
    import ConvertDateToTimezone from "@/store/utility/date_format";

    export default {
        name: "ManageStudentCare",
        components: {
            Sidebar,
            NavBar
        },
        data() {
            return {
                signedIn: this.$store.getters.isAuthenticated,
                empName: this.$store.getters.StateName,
                empRole: this.$store.getters.StateRole,
                currentPage: "/managestudentcare",

                searchQuery: "",
                incorrect_id: "",
                student_id: "",
                showError: false,
                isLoading: false,
                today: ConvertDateToTimezone(new Date()).slice(0, 10),
                thirty_days_ago: ConvertDateToTimezone(new Date(new Date().setDate(new Date().getDate() - 30))).slice(0, 10),
                records: {},

                selected_record: {},
                selected_care: 0
            }
        },
        watch: {
            student_id(value) {
                if (value.length > 0) {
                    this.showError = false;
                }
            }
        },
        computed: {
            filteredRecordsList() {
                if (this.records !== null) {
                    return Object.keys(this.records).filter(key => {
                        return (
                            key.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1
                        );                    
                    }).reduce((cur, key) => {
                        cur[key] = this.records[key];
                        return cur;
                    }, {})
                }
                else {
                    return {};
                }
            }
        },
        methods: {
            ...mapActions(["GetStudentCareRecords", "DeleteStudentCareRecord"]),
            checkStudentInfo() {
                if (!this.isLoading) {
                    this.isLoading = true;
                    this.GetStudentCareRecords({
                        student_id: this.student_id, 
                        start_date: this.thirty_days_ago, 
                        end_date: this.today
                    }).then((resp) => {
                        this.records = resp;
                        this.showError = false;
                        this.incorrect_id = "";
                        this.isLoading = false;
                        this.selected_record = {};
                        this.selected_care = 0;
                        console.log(this.records);
                    }).catch((err) => {
                        console.log(err);
                        this.showError = true;
                        this.incorrect_id = this.student_id;
                        this.student_id = "";
                        this.isLoading = false;
                        this.records = {};
                        this.selected_record = {};
                        this.selected_care = 0;
                    });
                }
            },
            clearSelectedCareRecord() {
                this.selected_record = {};
                this.selected_care = 0;
            },
            setSelectedCareRecord(studentRecord, careType) {
                this.selected_record = studentRecord;
                this.selected_care = careType;
            },
            deleteSelectedCareRecord() {
                if (this.selected_record) {
                    this.DeleteStudentCareRecord({
                        student_id: this.selected_record.student.student_id,
                        care_date: this.selected_record.before_care !== undefined ? this.selected_record.before_care.care_date : this.selected_record.after_care.care_date,
                        care_type: this.selected_care
                    }).then(resp => {
                        if (!resp) {
                            console.log("Error deleting student record!");
                        }
                        else {
                            console.log("Deleted student record!");
                        }
                    })
                    this.clearSelectedCareRecord();
                    this.checkStudentInfo();
                }
            }
        },
    };
</script>