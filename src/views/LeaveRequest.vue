<template>
    <div class="wrapper">
        <div class="topSection">

            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">

                <h1 class="text-blue">Employee Leave of Absence</h1>
                <p>Please fill out each field and hit Submit to request a leave of absence. The form will be automatically emailed to the PCA Administrator for review.</p>

            </div>
        
        </div>

        <div>
            <div class="mb-3 row">
                <label for="name" class="text-blue">Employee Name</label>
                <input type="text" readonly class="form-control-plaintext leaveInput" id="name" :value=" getName ">
            </div>
            <div class="mb-3 row">
                <label for="currentDate" class="text-blue">Current Date</label>
                <input type="text" readonly class="form-control-plaintext leaveInput" id="currentDate" :value=" getCurrentDate() ">
            </div>
             <div class="mb-3 row">
                <label class="text-blue">Date(s) of Absence</label>
                <div class="mb-3 input-group">
                    <input type="date" class="form-control" id="absenceDateStart" :min = " min ">
                    <span class="input-group-text">to</span>
                    <input type="date" class="form-control" id="absenceDateEnd" :min=" min ">
                </div>        
            </div>
            <div class="mb-3 row">
                <input type="number">
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "LeaveRequest",
    data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const minDate = new Date(today)

        return {
            value: "",
            today: today,
            min: minDate
        }
    },
    components: {},
    computed: {
        getName: function() {
            return this.$store.getters.StateName;
        },
        ...mapGetters({Name: "StateName"}),
    },
    methods: {
        getCurrentDate() {

            let day = ('0' + this.today.getDate()).slice(-2)
            let month = ('0' + (this.today.getMonth()+1)).slice(-2)
            let formattedDate = month + '/'  + day + '/' + this.today.getFullYear()
            return formattedDate
        },
        ...mapActions(["GetName"]),
    },
}
</script>

