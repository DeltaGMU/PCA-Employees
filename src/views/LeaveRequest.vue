<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div v-if = " getRole == 'administrator' " class="p-2">
                <Sidebar/>
            </div>

            <div class="modal fade" id="leaveModal" tabindex="-1" aria-labelledby="leaveModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">                    
                        <div class="modal-header" v-if="submissionSuccess">
                            <h5 class="modal-title">Leave Request Submitted!</h5>
                            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                        </div>
                        <div class="modal-header" v-else>
                            <h5 class="modal-title">Submission Failed!</h5>
                            <button type="button" class="btn-close" aria-label="Close"  @click="closeModal"></button>
                        </div>
                        <div class="modal-body" v-if="submissionSuccess">
                            Successfully submitted the leave request! The administrator(s) responsible for handling this request
                            will receive an email notification.
                        </div>
                        <div class="modal-body" v-else>
                            Encountered an error submitting the leave request. Please try again and ensure the required fields are filled correctly.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn" :class="submissionSuccess ? 'btn-success' : 'btn-danger'" @click="closeModal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show" id="backdrop" style="display: none;"></div>

            <div v-bind:class=" getRole == 'administrator' ? 'p-2 flex-grow-1' : 'p-3 ps-md-4 pe-md-4 pb-md-4 flex-grow-1' ">
                <form class="needs-validation" id="leaveForm" ref="form" novalidate>
                    <div>
                        <div class="noSelect">
                            <div>

                                <h1 class="text-blue">Employee Leave of Absence</h1>
                                <p>Please fill out each field and hit Submit to request a leave of absence. The form will be automatically emailed to the PCA Administrator for review.</p>

                            </div>
                        </div>
                        
                        <div>
                            <div class="noSelect">
                                <div class="mb-1">
                                    <label for="name" class="text-blue formLabel">Employee Name</label>
                                </div>
                                
                                <input type="text" readonly disabled class="form-control-plaintext" id="name" :value=" getName ">
                            </div>
                            <div class="noSelect">
                                <div class="mb-1">
                                    <label for="currentDate" class="text-blue formLabel">Current Date</label>
                                </div>
                                
                                <input type="text" readonly disabled class="form-control-plaintext" id="currentDate" :value=" getCurrentDate() ">
                            </div>
                            <div>
                                <div class="mb-2">
                                    <label class="text-blue formLabel">Date(s) of Absence</label>
                                </div>
                                
                                <div class="mb-3 input-group">
                                    <input type="date" class="form-control textBox" id="absenceDateStart" :min ="min" v-model="selectedStart" required>
                                    <span class="input-group-text">to</span>
                                    <input type="date" class="form-control textBox" id="absenceDateEnd" :min="selectedStart" v-model="selectedEnd" :disabled="selectedStart === ''" required>
                                    <div class="invalid-feedback">
                                        Please provide a valid starting date and ending date.
                                    </div>
                                </div>
                                
                                <div class="mb-3 row">
                                    <div class="mb-1 col-auto">
                                        <label class="form-text"># of full days</label> <br />
                                        <input type="number" min="0" v-model="form_full_days" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" class="form-control textBox" id="fullDays">
                                        <div class="invalid-feedback">
                                            Please provide the number of full days of absence.
                                        </div>
                                    </div>
                                    <div class="mb-1 col-auto">
                                        <label class="form-text" for="halfDays"># of half days</label><br>
                                        <input type="number" min="0" v-model="form_half_days" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" class="form-control textBox" id="halfDays">
                                        <div class="invalid-feedback">
                                            Please provide the number of half days of absence.
                                        </div>
                                    </div>
                                    <div class="mb-1 col-auto">
                                        <label class="form-text" for="hours"># of hours (round to nearest 15 minutes)</label><br>
                                        <input type="number" min="0" v-model="form_hours" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" class="form-control textBox" id="hours">
                                        <div class="invalid-feedback">
                                            Please provide the number of hours of absence.
                                        </div>
                                    </div>
                                </div>            
                            </div>
                            <div class="mb-2">
                                <label for="currentDate" class="text-blue formLabel">Reason for Absence</label>
                            </div>
                            <div>
                                <div class="mb-3 form-check form-check-inline">
                                    <input class="form-check-input textBox" type="checkbox" value="Illness - Self" :required="form_reason_checkbox.length === 0" v-model="form_reason_checkbox" id="illnessSelf">
                                    <label class="form-check-label" for="illnessSelf">Illness - Self</label>
                                </div>
                                <div class="mb-3 form-check form-check-inline">
                                    <input class="form-check-input textBox" type="checkbox" value="Illness - Family" :required="form_reason_checkbox.length === 0" v-model="form_reason_checkbox" id="illnessFamily">
                                    <label class="form-check-label" for="illnessFamily">Illness - Family</label>
                                </div>
                                <div class="mb-3 form-check form-check-inline">
                                    <input class="form-check-input textBox" type="checkbox" value="Death in the Family" :required="form_reason_checkbox.length === 0" v-model="form_reason_checkbox" id="deathInFamily">
                                    <label class="form-check-label" for="deathInFamily">Death in the Family</label>
                                </div>
                                <div class="mb-3 form-check form-check-inline">
                                    <input class="form-check-input textBox" type="checkbox" value="Personal" :required="form_reason_checkbox.length === 0" v-model="form_reason_checkbox" id="personal">
                                    <label class="form-check-label" for="personal">Personal</label>
                                </div>
                                <div class="mb-3 form-check form-check-inline">
                                    <input class="form-check-input textBox" type="checkbox" value="Jury Duty" :required="form_reason_checkbox.length === 0" v-model="form_reason_checkbox" id="juryDuty">
                                    <label class="form-check-label" for="juryDuty">Jury Duty</label>
                                </div>
                                <div class="mb-3 form-check form-check-inline">
                                    <input class="form-check-input textBox" type="checkbox" value="Reserves Or Guard" :required="form_reason_checkbox.length === 0" v-model="form_reason_checkbox" id="reservesOrGuard">
                                    <label class="form-check-label" for="reservesOrGuard">Reserves Or Guard</label>
                                </div>
                                <div class="mb-3 form-check form-check-inline">
                                    <input class="form-check-input textBox" type="checkbox" value="Professional" :required="form_reason_checkbox.length === 0" v-model="form_reason_checkbox" id="professional">
                                    <label class="form-check-label" for="professional">Professional</label>
                                </div>
                                <div class="mb-3 form-check form-check-inline">
                                    <input class="form-check-input textBox" type="checkbox" value="PCA Related" :required="form_reason_checkbox.length === 0" v-model="form_reason_checkbox" id="pcaRelated">
                                    <label class="form-check-label" for="pcaRelated">PCA Related</label>
                                </div>
                                <div class="invalid-feedback">
                                    Please select at least one reason for your absence.
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="mb-2">
                                    <label for="whoWillCover" class="text-blue formLabel">Who Will Cover the Absence, or How Will It Be Covered?</label>
                                </div>
                                <textarea id="whoWillCover" v-model="form_reason_cover_textbox" rows="5" class="form-control textBox" required></textarea>
                                <div class="invalid-feedback">
                                    Please input who will cover for the absence.
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="mb-2">
                                    <label for="comments" class="text-blue formLabel">Comments</label>
                                </div>
                                <textarea id="comments" v-model="form_reason_comments_textbox" rows="5" class="form-control textBox"></textarea>
                            </div>
                        </div>
                        <button type="button" id="submitLeaveFormBtn" class="mt-2 btn formBtn blueBorder" @click="submitLeaveRequest">
                            <span v-show="!isLoading"> Send Leave Request </span>
                            <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                            <span v-show="isLoading"> Loading... </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import Sidebar from "@/components/Sidebar.vue";
    import NavBar from "@/components/NavBar.vue";

    export default {
        name: "LeaveRequest",
        components: {
            Sidebar,
            NavBar
        },
        data() {
            const now = new Date() 
            return {
                signedIn: this.$store.getters.isAuthenticated,
                empName: this.$store.getters.StateName,
                empRole: this.$store.getters.StateRole,
                currentPage: "/leaverequest",       

                isLoading: false,
                submissionSuccess: false,
                submitButton: null,
                leaveForm: null,
                clickEvent: null,

                today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                min: "",
                selectedStart: "",
                selectedEnd: "",

                form_full_days: "0",
                form_half_days: "0",
                form_hours: "0",
                form_reason_checkbox: [],
                form_reason_cover_textbox: "",
                form_reason_comments_textbox: "",
            }
        },
        computed: {
            getName: function() {
                return this.$store.getters.StateName;
            },
            ...mapGetters({Name: "StateName"}),
            getRole: function() {
                return this.$store.getters.StateRole;
            },
            ...mapGetters({Name: "StateRole"}),
        },
        watch: {
            selectedStart(value) {
                if (value && this.selectedEnd !== '') {
                    this.selectedEnd = ''
                }
            }
        },
        mounted() {
            this.closeModal();
            this.submitButton = document.getElementById("submitLeaveFormBtn")
            this.leaveForm = document.getElementById("leaveForm")
            this.submitButton.addEventListener('click', 
                function (event) {
                    let form = document.getElementById("leaveForm")
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
                document.getElementById("leaveModal").style.display = "block"
                document.getElementById("leaveModal").classList.add("show")
            },

            closeModal() {
                document.getElementById("backdrop").style.display = "none"
                document.getElementById("leaveModal").style.display = "none"
                document.getElementById("leaveModal").classList.remove("show")
            },
            clearAllFields() {
                this.min = "",
                this.selectedStart = "",
                this.selectedEnd = "",

                this.form_full_days = "0",
                this.form_half_days = "0",
                this.form_hours = "0",
                this.form_reason_checkbox = [],
                this.form_reason_cover_textbox = "",
                this.form_reason_comments_textbox = "",
                this.isLoading = false
                this.leaveForm.classList.remove('was-validated')
            },
            getCurrentDate() {

                let day = ('0' + this.today.getDate()).slice(-2)
                let month = ('0' + (this.today.getMonth()+1)).slice(-2)

                let formattedDate = month + '/'  + day + '/' + this.today.getFullYear()

                this.min = this.today.getFullYear() + '-'  + month + '-' + day
                return formattedDate
            },
            async submitLeaveRequest() {
                if (!this.isLoading && this.leaveForm.checkValidity()) {
                    this.isLoading = true;
                    let payload = {
                        "employee_id": this.$store.getters.StateUser.employee_id,
                        "employee_name": this.getName,
                        "current_date": this.getCurrentDate(),
                        "date_of_absence_start": this.selectedStart,
                        "date_of_absence_end": this.selectedEnd,
                        "num_full_days": parseInt(this.form_full_days),
                        "num_half_days": parseInt(this.form_half_days),
                        "num_hours": parseInt(this.form_hours),
                        "absence_reason_list": this.form_reason_checkbox,
                        "absence_cover_text": this.form_reason_cover_textbox,
                        "absence_comments": this.absence_comments,
                    }
                    await this.$store.dispatch("SubmitLeaveRequest", payload).then(resp => {
                        if (resp === true) {
                            this.submissionSuccess = true;
                            this.clearAllFields();
                        }
                        else {
                            this.submissionSuccess = false;
                        }
                        this.isLoading = false;
                        this.openModal()
                    }).catch(err => {
                        console.log(err)
                        this.isLoading = false;
                        this.submissionSuccess = false;
                        this.openModal();
                    })
                }
            },
            ...mapActions(["GetName"]),
            ...mapActions(["GetRole"]),
        },
    }
</script>

