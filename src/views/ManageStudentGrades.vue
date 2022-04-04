<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
                <Sidebar/>
            </div>
            <div class="modal fade" id="deleteGradeModal" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="empAccountBtnLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5>Delete Student Grade Level?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete the student grade level?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn blueBtn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" id = "submitDeleteFormBtn" data-bs-dismiss="modal" @click="deleteSelectedGrade">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="gradeModal" tabindex="-1" aria-labelledby="gradeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">                    
                        <div class="modal-header" v-if="submissionSuccess">
                            <h5 class="modal-title">Grade Successfully Created!</h5>
                            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                        </div>
                        <div class="modal-header" v-else>
                            <h5 class="modal-title">Task Failed!</h5>
                            <button type="button" class="btn-close" aria-label="Close"  @click="closeModal"></button>
                        </div>
                        <div class="modal-body" v-if="submissionSuccess">
                            {{ modalSuccessMessage }}
                        </div>
                        <div class="modal-body" v-else>
                            {{ modalErrorMessage }}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn" :class="submissionSuccess ? 'btn-success' : 'btn-danger'" @click="closeModal">OK</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show" id="backdrop" style="display: none;"></div>
            <div class="p-2 flex-grow-1">
                <form class="needs-validation" id="gradeForm" ref="form" novalidate>
                    <div>
                        <div class="topSection noSelect">
                            <div class="mb-1">
                                <h1 class="text-blue">Manage Student Grade Levels</h1>
                            </div>
                        </div>
                        <hr>
                        <div>
                            <label for="gradeLevel" class="text-blue formLabel">Create Grade Level:</label>
                        </div>
                        <div class="pb-3 input-group">
                            <input type="text" class="form-control textBox" id="gradeLevel" v-model="form_grade_level" maxlength="100" required>                            
                            <button type="button" id="submitGradeBtn" class="btn blueBtn p-2" style="border-radius: 0px 5px 5px 0px;" @click="addNewGrade" :disabled="!form_grade_level">
                                <span v-show="!isLoading"> Create </span>
                                <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                                <span v-show="isLoading"> Loading... </span>
                            </button>
                            <div class="invalid-feedback">
                                Please provide a valid grade level name under 100 characters.
                            </div>
                        </div>
                    </div>
                </form>
                <hr>
                <h4 class="text-blue">Grades Registered In System:</h4>
                <div class="input-group mb-3">
                    <br>
                    <input type="text" style="border-radius: 5px 0px 0px 5px;" v-model="searchQuery" class="form-control p-1 ms-1" placeholder="Search for grades by name..." name="gradeSearchBar" id="gradeSearchBar"/>
                    <button class="btn blueBtn p-2" style="border-radius: 0px 5px 5px 0px;" type="button" @click="checkAllGrades">
                        Refresh Grades
                    </button>
                    <br>
                </div>
                <div class="table-responsive noSelect">
                    <table id="manageStudentGradesTable" class="pcaTable table-hover">
                        <thead>
                            <th class="col-3" scope = "col">Grade Name</th>
                            <th class="col-1" scope = "col">Delete Grade</th>
                        </thead>
                        <tbody>
                            <tr class="row-striped text-center" v-for="(grade, index) in filteredGradesList" :key="index">
                                <td>{{ grade.name.toUpperCase() }}</td>
                                <td class = "mobilePadding">
                                    <button type="button" class="btn btn-danger" style="width: 100%;" id="deleteStudentGradBtn" data-bs-toggle="modal" data-bs-target="#deleteGradeModal" @click="setSelectedGrade(grade.name)">
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
                currentPage: "/managestudentgrades",

                submissionSuccess: false,
                isLoading: false,
                submitButton: null,
                gradeForm: null,
                clickEvent: null,

                modalErrorMessage: "",
                modalSuccessMessage: "",
                form_grade_level: "",
                all_grades: [],
                selected_grade: "",
                searchQuery: "",
            }
        },
        computed: {
            filteredGradesList() {
                if (this.all_grades !== null) {
                    console.log(this.all_grades)
                    return this.all_grades.filter(item => {
                        return item.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) != -1;
                    })
                }
                else {
                    return [];
                }
            }
        },
        methods: {
            openModal() {
                document.getElementById("backdrop").style.display = "block"
                document.getElementById("gradeModal").style.display = "block"
                document.getElementById("gradeModal").classList.add("show")
            },
            closeModal() {
                document.getElementById("backdrop").style.display = "none"
                document.getElementById("gradeModal").style.display = "none"
                document.getElementById("gradeModal").classList.remove("show")
            },
            clearAllFields() {
                this.form_grade_level = ""
                this.gradeForm.classList.remove('was-validated')
            },
            setSelectedGrade(grade) {
                this.selected_grade = grade.trim();
            },
            async deleteSelectedGrade() {
                if (this.selected_grade !== '') {
                    let payload = {
                        student_grade: this.selected_grade
                    }
                    await this.$store.dispatch("DeleteStudentGrade", payload).then(resp => {
                        if (resp) {
                            this.submissionSuccess = true
                            this.modalSuccessMessage = "Successfully deleted the student grade level: " + this.selected_grade
                            this.openModal()
                        }
                        else {
                            this.submissionSuccess = false
                            this.modalErrorMessage = "Error encountered while deleting the student grade level. Please ensure there are no students currently in the grade you're trying to delete!"
                            this.openModal()
                        }
                    }).catch(err => {
                        console.log(err)
                        this.submissionSuccess = false
                        this.modalErrorMessage = "Error encountered while deleting the student grade level. Please ensure there are no students currently in the grade you're trying to delete!"
                        this.openModal()
                    }).then(() => {this.checkAllGrades()})
                }
            },
            async checkAllGrades() {
                await this.$store.dispatch("GetAllStudentGrades").then(resp => {
                    if (resp) {
                        this.all_grades = resp
                    }
                    else {
                        this.all_grades = []
                        this.modalErrorMessage = "Encountered an error creating the student grade level. Please try again and ensure the required fields are filled correctly."
                        this.openModal();
                    }
                }).catch(err => {
                    console.log(err)
                    this.all_grades = []
                    this.modalErrorMessage = "Encountered an error creating the student grade level. Please try again and ensure the required fields are filled correctly."
                    this.openModal();
                })
            },
            async addNewGrade() {
                if (this.form_grade_level.trim() !== "") {
                    await this.$store.dispatch("CreateStudentGrade", {"student_grade": this.form_grade_level.trim()}).then(resp => {
                        console.log(resp)
                        if (resp) {
                            this.submissionSuccess = true;
                            this.modalSuccessMessage = "Successfully created the student grade level."
                            this.openModal();
                            this.clearAllFields();
                        }
                        else {
                            this.submissionSuccess = false;
                            this.isLoading = false;
                            this.modalErrorMessage = "Encountered an error creating the student grade level. Please try again and ensure the required fields are filled correctly."
                            this.openModal();
                        }
                    }).catch(err => {
                        console.log(err)
                        this.isLoading = false;
                        this.submissionSuccess = false;
                        this.modalErrorMessage = "Encountered an error creating the student grade level. Please try again and ensure the required fields are filled correctly."
                        this.openModal();
                    }).then(() => {this.checkAllGrades()})
                }
            },
        },
        mounted() {
            this.closeModal();
            this.submitButton = document.getElementById("submitGradeBtn")
            this.gradeForm = document.getElementById("gradeForm")
            this.submitButton.addEventListener('click', 
                function (event) {
                    let form = document.getElementById("gradeForm")
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false);
            this.clickEvent = new Event('click');
            this.checkAllGrades();
        },
    }
</script>

