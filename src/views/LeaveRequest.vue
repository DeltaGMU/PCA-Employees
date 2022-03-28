<template>
    <div v-bind:class=" getRole == 'administrator' ? 'row' : '' ">
        <div v-if = " getRole == 'administrator' " class="col-2 col-md-4 col-lg-3 col-xxl-2">
            <Sidebar>   </Sidebar>
        </div>
        <div v-bind:class=" getRole != 'administrator' ? 'ms-3 ms-md-4 me-3 me-md-4 mt-3 mb-5' : 'mt-3 mb-5 col-10 col-md-8 col-lg-9 col-xxl-10 pe-3 pe-md-4 pe-xl-' ">
            <div class="noSelect">

            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">

                <h1 class="text-blue">Employee Leave of Absence</h1>
                <p>Please fill out each field and hit Submit to request a leave of absence. The form will be automatically emailed to the PCA Administrator for review.</p>

            </div>
        
            </div>

            <div>
                <div class="row noSelect">
                    <div class="mb-1">
                        <label for="name" class="text-blue formLabel leaveLabel">Employee Name</label>
                    </div>
                    
                    <input type="text" readonly class="form-control-plaintext leaveInput" id="name" :value=" getName ">
                </div>
                <div class="row noSelect">
                    <div class="mb-1">
                        <label for="currentDate" class="text-blue formLabel leaveLabel">Current Date</label>
                    </div>
                    
                    <input type="text" readonly class="form-control-plaintext leaveInput" id="currentDate" :value=" getCurrentDate() ">
                </div>
                <div class="row">
                    <div class="mb-2">
                        <label class="text-blue formLabel leaveLabel">Date(s) of Absence</label>
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
                <div class="mb-2 row">
                    <label for="currentDate" class="text-blue formLabel leaveLabel">Reason for Absence</label>
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
                <div class="mb-3 row">
                    <div class="mb-2">
                        <label for="whoWillCover" class="text-blue formLabel leaveLabel">Who Will Cover the Absence, or How Will It Be Covered?</label>
                    </div>
                    <textarea id="whoWillCover" rows="5" class="form-control textBox leaveInput"></textarea>
                </div>
                <div class="mb-3 row">
                    <div class="mb-2">
                        <label for="comments" class="text-blue formLabel leaveLabel">Comments</label>
                    </div>
                    <textarea id="comments" rows="5" class="form-control textBox leaveInput"></textarea>
                </div>
            </div>
            <button class="mt-2 btn blueBtn">Submit</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Sidebar from "../components/Sidebar.vue";
export default {
    name: "LeaveRequest",
    components: {
        Sidebar
    },
    data() {
        const now = new Date() 
        return {
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

