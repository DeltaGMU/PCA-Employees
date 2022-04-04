<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div class="p-2">
                <Sidebar/>
            </div>
            <div class="modal fade" id="gradeModal" tabindex="-1" aria-labelledby="gradeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">                    
                        <div class="modal-header" v-if="submissionSuccess">
                            <h5 class="modal-title">Grade Successfully Created!</h5>
                            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                        </div>
                        <div class="modal-header" v-else>
                            <h5 class="modal-title">Grade Creation Failed!</h5>
                            <button type="button" class="btn-close" aria-label="Close"  @click="closeModal"></button>
                        </div>
                        <div class="modal-body" v-if="submissionSuccess">
                            Successfully created the student grade level.
                        </div>
                        <div class="modal-body" v-else>
                            Encountered an error creating the student grade level. Please try again and ensure the required fields are filled correctly.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn" :class="submissionSuccess ? 'btn-success' : 'btn-danger'" @click="closeModal">Ok</button>
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

                        <div class="mb-1">
                            <label for="gradeLevel" class="text-blue formLabel">Grade Level Name</label>
                        </div>
                        <div class="pb-3 input-group">
                            <input type="text" class="form-control textBox" id="gradeLevel" v-model="form_grade_level" required>                            
                            <button type="button" id="submitGradeBtn" class="btn blueBtn p-2" style="border-radius: 0px 5px 5px 0px;" @click="addNewGrade()" :disabled="!form_grade_level">
                                <span v-show="!isLoading"> Submit</span>
                                <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                                <span v-show="isLoading"> Loading... </span>
                            </button>
                            <div class="invalid-feedback">
                                Please provide a valid grade level name under 100 characters.
                            </div>
                        </div>
                    </div>
                </form>
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

                form_grade_level: ""
            }
        },
        mounted() {
            this.closeModal();
            this.submitButton = document.getElementById("submitGradeBtn")
            this.employeeForm = document.getElementById("gradeForm")
            this.gradeForm.addEventListener('click', 
                function (event) {
                    let form = document.getElementById("gradeForm")
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false);
            this.clickEvent = new Event('click');
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
            async addNewGrade() {

            },
        }
    }
</script>

