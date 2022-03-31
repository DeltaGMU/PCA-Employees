<template>
    <div class="container">
        <NavBar :signed_in="signedIn" :name="empName" :role="empRole" :current_page="currentPage"/>
        <div class="d-flex">
            <div v-if = " getRole == 'administrator' " class="p-2">
                <Sidebar></Sidebar>
            </div>
            <div v-bind:class=" getRole == 'administrator' ? 'p-2 flex-grow-1' : 'p-3 ps-md-4 pe-md-4 pb-md-4 flex-grow-1' ">
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
                        
                        <input type="text" readonly class="form-control-plaintext" id="name" :value=" getName ">
                    </div>
                    <div class="noSelect">
                        <div class="mb-1">
                            <label for="currentDate" class="text-blue formLabel">Current Date</label>
                        </div>
                        
                        <input type="text" readonly class="form-control-plaintext" id="currentDate" :value=" getCurrentDate() ">
                    </div>
                    <div>
                        <div class="mb-2">
                            <label class="text-blue formLabel">Date(s) of Absence</label>
                        </div>
                        
                        <div class="mb-3 input-group">
                            <input type="date" class="form-control textBox" id="absenceDateStart" :min = " min " required>
                            <span class="input-group-text">to</span>
                            <input type="date" class="form-control textBox" id="absenceDateEnd" :min=" min " required>
                        </div>

                        <div class="mb-3 row">
                            <div class="mb-1 col-auto">
                                <label class="form-text"># of full days</label> <br />
                                <input type="number" class="form-control textBox" id="fullDays">
                            </div>
                            <div class="mb-1 col-auto">
                                <label class="form-text" for="halfDays"># of half days</label><br>
                                <input type="number" class="form-control textBox" id="halfDays">
                            </div>
                            <div class="mb-1 col-auto">
                                <label class="form-text" for="hours"># of hours (round to nearest 15 minutes)</label><br>
                                <input type="number" class="form-control textBox" id="hours">
                            </div>
                        </div>            
                    </div>
                    <div class="mb-2">
                        <label for="currentDate" class="text-blue formLabel">Reason for Absence</label>
                    </div>
                    <div>
                        <div class="mb-3 form-check form-check-inline">
                            <input class="form-check-input textBox" type="checkbox" value="illnessSelf" id="illnessSelf">
                            <label class="form-check-label" for="illnessSelf">Illness - Self</label>
                        </div>
                        <div class="mb-3 form-check form-check-inline">
                            <input class="form-check-input textBox" type="checkbox" value="illnessFamily" id="illnessFamily">
                            <label class="form-check-label" for="illnessFamily">Illness - Family</label>
                        </div>
                        <div class="mb-3 form-check form-check-inline">
                            <input class="form-check-input textBox" type="checkbox" value="deathInFamily" id="deathInFamily">
                            <label class="form-check-label" for="deathInFamily">Death in the Family</label>
                        </div>
                        <div class="mb-3 form-check form-check-inline">
                            <input class="form-check-input textBox" type="checkbox" value="personal" id="personal">
                            <label class="form-check-label" for="personal">Personal</label>
                        </div>
                        <div class="mb-3 form-check form-check-inline">
                            <input class="form-check-input textBox" type="checkbox" value="juryDuty" id="juryDuty">
                            <label class="form-check-label" for="juryDuty">Jury Duty</label>
                        </div>
                        <div class="mb-3 form-check form-check-inline">
                            <input class="form-check-input textBox" type="checkbox" value="reservesOrGuard" id="reservesOrGuard">
                            <label class="form-check-label" for="reservesOrGuard">Reserves Or Guard</label>
                        </div>
                        <div class="mb-3 form-check form-check-inline">
                            <input class="form-check-input textBox" type="checkbox" value="professional" id="professional">
                            <label class="form-check-label" for="professional">Professional</label>
                        </div>
                        <div class="mb-3 form-check form-check-inline">
                            <input class="form-check-input textBox" type="checkbox" value="pcaRelated" id="pcaRelated">
                            <label class="form-check-label" for="pcaRelated">PCA Related</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="mb-2">
                            <label for="whoWillCover" class="text-blue formLabel">Who Will Cover the Absence, or How Will It Be Covered?</label>
                        </div>
                        <textarea id="whoWillCover" rows="5" class="form-control textBox"></textarea>
                    </div>
                    <div class="mb-3">
                        <div class="mb-2">
                            <label for="comments" class="text-blue formLabel">Comments</label>
                        </div>
                        <textarea id="comments" rows="5" class="form-control textBox"></textarea>
                    </div>
                </div>
                <button class="mt-2 btn blueBtn">Submit</button>
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

                today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                min: ""
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
        methods: {
            getCurrentDate() {

                let day = ('0' + this.today.getDate()).slice(-2)
                let month = ('0' + (this.today.getMonth()+1)).slice(-2)

                let formattedDate = month + '/'  + day + '/' + this.today.getFullYear()

                this.min = this.today.getFullYear() + '-'  + month + '-' + day
                return formattedDate
            },
            ...mapActions(["GetName"]),
            ...mapActions(["GetRole"]),
        },
    }
</script>

