<template>
<div class="d-flex">

    <div v-if = " getRole == 'administrator' " class="p-2">
        <Sidebar></Sidebar>
    </div>
    
    <div v-bind:class=" getRole == 'administrator' ? 'p-2 flex-grow-1' : 'p-3 ps-md-4 pe-md-4 pb-md-4 flex-grow-1' ">

        <div class="topSection noSelect">
            <div>

                <h1 class="text-blue">Timesheet Submission Form</h1>
                <p>Please fill in the hours under each week day and click Submit Timesheet.</p>

            </div>       
        </div>
        
        <div class="table-responsive">
            <table class="timesheet">
                <thead class="headingRow">
                    <th class="col-1">Date</th>
                    <th class="col-1 middleCols">Day</th>
                    <th class="col-2 middleCols">Regular Hours</th>
                    <th class="col-2 middleCols">PTO</th>
                    <th class="col-2 middleCols">Extra Hours</th>
                    <th class="col-4 middleCols">Comments</th>
                </thead>

                <!-- Table body for the first half of the month (will be displayed by default) -->
                <tbody id="firstHalf">

                    <tr v-for="day in daysInFirstHalf" class="row-striped" :key="day.id">
                        
                        <!-- Get the date (format ex: 3/10) and day from the dateAndDayArray -->
                        <td>{{ dateAndDayArray[day-1][0] }}</td>
                        <td class="middleCols">{{ dateAndDayArray[day-1][1] }}</td>
                        <td class="middleCols"><input type="number" min="0" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" class="form-control textBox" v-model=" formData[day-1].work_hours "></td>
                        <td class="middleCols"><input type="number" min="0" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" class="form-control textBox" v-model=" formData[day-1].pto_hours "></td>
                        <td class="middleCols"><input type="number" min="0" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" class="form-control textBox" v-model=" formData[day-1].extra_hours "></td>
                        <td><input type="text" maxlength="1024" class="form-control textBox" v-model=" formData[day-1].comment "></td>
                    </tr>

                </tbody>

                <!-- Table body for the second half of the month (will be hidden by default) -->
                <tbody id="secondHalf" class="showWhenSmall hide">

                    <tr v-for="day in daysInSecondHalf" class="row-striped" :key="day.id">

                        <!-- In order to get the correct dates, add the index to the number of days in the first half of the month because index starts at 1 -->
                        <td>{{ dateAndDayArray[(daysInFirstHalf + day) - 1][0] }}</td>
                        <td class="middleCols">{{ dateAndDayArray[(daysInFirstHalf + day) - 1][1] }}</td>
                        <td class="middleCols"><input type="text" min="0" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" class="form-control textBox" v-model=" formData[(daysInFirstHalf + day) - 1].work_hours "></td>
                        <td class="middleCols"><input type="text" min="0" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" class="form-control textBox" v-model=" formData[(daysInFirstHalf + day) - 1].pto_hours "></td>
                        <td class="middleCols"><input type="text" min="0" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" class="form-control textBox" v-model=" formData[(daysInFirstHalf + day) - 1].extra_hours "></td>
                        <td><input type="text" maxlength="1024" class="form-control textBox" v-model=" formData[(daysInFirstHalf + day) - 1].comment "></td>
                    </tr>

                </tbody>
            </table>

            <div class="twoBtnCol">
                <button id="nextPageBtn" class="mt-3 btn blueBtn switchPageBtn smallerScreenBtn hideWhenSmall" @click="switchTimesheetPage">
                    View Next Page
                    <i class="fa fa-chevron-right chevron" alt="Chevron Right"></i>
                </button>
                <button id="previousPageBtn" class="mt-3 btn blueBtn switchPageBtn smallerScreenBtn hide" @click="switchTimesheetPage">
                    <i class="fa fa-chevron-left chevron" alt="Chevron Left"></i>
                    View Previous Page
                </button>
                <button id="submitTimesheetBtn" class="mt-3 btn formBtn smallerScreenBtn" @click="submitTimesheet">
                    <span v-show="!isLoading"> Submit Timesheet </span>
                    <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                    <span v-show="isLoading"> Loading... </span>
                </button>
            </div>

            <div class="modal fade" id="submissionModal" tabindex="-1" aria-labelledby="submissionModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{timesheetMessageTitle}}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
                        </div>
                        <div class="modal-body">
                            {{timesheetMessageBody}}
                        </div>
                        <div class="modal-footer">
                            <button type="button" @click="closeModal" v-bind:class=" timesheetMessageTitle == 'Timesheet submitted!' ? 'btn btn-success' : ' btn btn-warning' " data-bs-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Sidebar from "../components/Sidebar.vue";
export default {
    name: "Timesheet",
    components: {
        Sidebar
    },
    data() {
        return {
            days: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
            dateAndDayArray: [],
            dateAndValuesArray: [],
            formData: [
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                },
                {
                    "work_hours" : "",
                    "pto_hours" : "",
                    "extra_hours" : "",
                    "comment": ""
                }
            ],
            year: 0,
            monthNum: 0,
            yearAndThisMonth: 0,
            yearAndNextMonth: 0,
            daysInPeriod: 0,
            daysInThisMonth: 0,
            firstDay: "",
            lastDay: "",
            daysInFirstHalf: 0,
            daysInSecondHalf: 0,
            timesheetMessageTitle: "",
            timesheetMessageBody: "",
            reporting_period_start: 10,
            reporting_period_end: 9,
            isLoading: false,
        }
    },
    computed: {
        getRole: function() {
            return this.$store.getters.StateRole;
        },
        ...mapGetters({Name: "StateRole"}),
    },
    methods: {
       
        // This function associates a date with the day of the week in the dateAndDayArray
        correlateDateAndDay() {
            this.yearAndThisMonth = new Date(this.year, this.monthNum)
            // console.log(this.yearAndThisMonth)

            this.yearAndNextMonth = new Date(this.year, this.monthNum + 1)
            // console.log(this.yearAndNextMonth)

            this.daysInThisMonth = new Date(this.year, this.monthNum+1, 0).getDate()
            // console.log(this.monthNum)
            console.log("DAYS IN THIS MONTH: " + this.daysInThisMonth)

            let abbrevDay
    
            // setDate sets the month day of the date that was created above; starts at 1, goes until it gets to the end of the month
            // getDay returns an int (0-6) of the weekday that correlates to the date that was set; reference the index of the days array that corresponds to that int
            // Push the day number and abbreviated day name to dateAndDayArray
            for(let i = this.reporting_period_start; i <= this.daysInThisMonth; i++) {                               
                this.yearAndThisMonth.setDate(i)
                abbrevDay = this.days[this.yearAndThisMonth.getDay()]

                this.dateAndDayArray.push([this.monthNum+1 + "/" + i, abbrevDay])
            }

            for(let x = 1; x <= this.reporting_period_end; x++) {
                this.yearAndNextMonth.setDate(x) 
                abbrevDay = this.days[this.yearAndNextMonth.getDay()]

                this.dateAndDayArray.push([(this.getNextMonth()+1) + "/" + x, abbrevDay])
            }
            // console.log(this.dateAndDayArray)
        },

        getNextMonth() {
            let nextMonth = 0
            if ((this.monthNum + 1) > 11) {
                nextMonth = 0
            }
            else {
                nextMonth = this.monthNum + 1
            }
            return nextMonth
        },
        

        // Calculates the number of days in the first half of the month (for the first page of the timesheet)
        getDaysInFirstHalf() { 
            let startDate = new Date(this.firstDay)
            let endDate = new Date(this.lastDay)

            let differenceInTime = endDate.getTime() - startDate.getTime()

            // Add 1 to include the last day
            let differenceInDays = (differenceInTime / (1000 * 3600 * 24)) + 1
            
            this.daysInPeriod = differenceInDays
            this.daysInFirstHalf = parseInt(this.daysInPeriod / 2)
        },

        // Calculates the number of days in the second half of the month (for the second page of the timesheet)
        getDaysInSecondHalf() {
            this.daysInSecondHalf = this.daysInPeriod - this.daysInFirstHalf
        },

        // Sets the first day of the time period in a yyyy-mm-dd format
        setFirstDay() {
            let firstDate = new Date(this.year, this.monthNum, this.reporting_period_start)
            this.firstDay = firstDate.toISOString().slice(0, 10)
        },

        // Sets the last day of the time period in a yyyy-mm-dd format
        setLastDay() {
            let year = this.year
            if (this.month == 11) {
                year++
            }
            let lastDate = new Date(year, this.monthNum+1, this.reporting_period_end)
            this.lastDay = lastDate.toISOString().slice(0, 10)
        },

        // Controls the switch between the first half and second half of the month on the Timesheet
        switchTimesheetPage() {
            let nextPageBtn = document.getElementById("nextPageBtn")
            let previousPageBtn = document.getElementById("previousPageBtn")
            let firstHalf = document.getElementById("firstHalf")
            let secondHalf = document.getElementById("secondHalf")

            // Add the "hide" class to the elements if it is already there or remove it if it is not
            nextPageBtn.classList.toggle("hide")
            firstHalf.classList.toggle("hide")
            secondHalf.classList.toggle("hide")
            previousPageBtn.classList.toggle("hide")
        },

        // Get the values from the input fields and send them to the database
        submitTimesheet() {
            let work_hours, pto_hours, extra_hours, date_worked, comment
            let formCount = 0

            for(let i = this.reporting_period_start; i <= this.daysInThisMonth; i++) {
                this.yearAndThisMonth.setDate(i)
                date_worked = this.yearAndThisMonth.toISOString().slice(0, 10)

                work_hours = parseInt(this.formData[formCount].work_hours)
                pto_hours = parseInt(this.formData[formCount].pto_hours)
                extra_hours = parseInt(this.formData[formCount].extra_hours)
                comment = this.formData[formCount].comment

                if(isNaN(work_hours)) {
                    work_hours = 0
                }
                if(isNaN(pto_hours)) {
                    pto_hours = 0
                }
                if(isNaN(extra_hours)) {
                    extra_hours = 0
                }

                this.dateAndValuesArray[formCount] = {                    
                    "work_hours": work_hours,
                    "pto_hours": pto_hours,
                    "extra_hours": extra_hours,
                    "date_worked": date_worked,
                    "comment": comment
                }
                
                formCount += 1
            }

            for(let i = 1; i <= this.reporting_period_end; i++) {
                this.yearAndNextMonth.setDate(i)
                date_worked = this.yearAndNextMonth.toISOString().slice(0, 10)

                work_hours = parseInt(this.formData[formCount].work_hours)
                pto_hours = parseInt(this.formData[formCount].pto_hours)
                extra_hours = parseInt(this.formData[formCount].extra_hours)
                comment = this.formData[formCount].comment

                if(isNaN(work_hours)) {
                    work_hours = 0
                }
                if(isNaN(pto_hours)) {
                    pto_hours = 0
                }
                if(isNaN(extra_hours)) {
                    extra_hours = 0
                }

                this.dateAndValuesArray[formCount] = {                    
                    "work_hours": work_hours,
                    "pto_hours": pto_hours,
                    "extra_hours": extra_hours,
                    "date_worked": date_worked,
                    "comment": comment
                } 

                formCount += 1
            }

            let payload = {
            'firstDay': this.firstDay,
            'lastDay': this.lastDay
            };

            this.isLoading = true;
            this.$store.dispatch("SubmitTimesheet", this.dateAndValuesArray).then((resp) => {
                if (resp.status !== 200) {
                    this.$store.dispatch("GetTimesheets", payload);
                    this.timesheetMessageTitle = "Timesheet submitted!"
                    this.timesheetMessageBody = "Your timesheet was submitted succesfully."
                }
                else {
                    this.timesheetMessageTitle = "Timesheet submission error!"
                    this.timesheetMessageBody = "There was an error with your timesheet submission."
                }
                this.isLoading = false;
                this.openModal()
            }).catch((err) => {
                console.log(err)
                this.isLoading = false;
                this.timesheetMessageTitle = "Timesheet submission error!"
                this.timesheetMessageBody = "There was an error with your timesheet submission."
                this.openModal()
            });
   
        },

        openModal() {
            document.getElementById("submissionModal").style.display = "block"
            document.getElementById("submissionModal").classList.add("show")
        },

        closeModal() {
            document.getElementById("submissionModal").style.display = "none"
            document.getElementById("submissionModal").classList.remove("show")
        },

        // Fill the input fields with any previously submitted timesheet info
        getTimesheet() {
            let timesheets = this.$store.getters.RetrievedTimesheet
            let isoDate
            let formCount = 0

            if (timesheets === null) {
                for(let i = 0; i < this.daysInPeriod; i ++) {
                    this.formData[i].work_hours = ""
                    this.formData[i].pto_hours = ""
                    this.formData[i].extra_hours = ""
                    this.formData[i].comment = ""
                }
            }

            // Set the values of the input boxes for this month (starting at on 10th)
            for(let i = this.reporting_period_start; i <= this.daysInThisMonth; i ++) {
                this.yearAndThisMonth.setDate(i)
                isoDate = this.yearAndThisMonth.toISOString().slice(0, 10)
                // console.log(isoDate)

                if (timesheets.time_sheets === undefined || timesheets.time_sheets[isoDate] === undefined) {
                    this.formData[formCount].work_hours = ""
                    this.formData[formCount].pto_hours = ""
                    this.formData[formCount].extra_hours = ""
                    this.formData[formCount].comment = ""
                    continue
                }

                if(timesheets.time_sheets[isoDate].work_hours == 0) {
                    this.formData[formCount].work_hours = ""
                } 
                else {
                    this.formData[formCount].work_hours = timesheets.time_sheets[isoDate].work_hours
                }

                if(timesheets.time_sheets[isoDate].pto_hours == 0) {
                    this.formData[formCount].pto_hours = ""
                }
                else {
                    this.formData[formCount].pto_hours = timesheets.time_sheets[isoDate].pto_hours
                }

                if(timesheets.time_sheets[isoDate].extra_hours == 0) {
                    this.formData[formCount].extra_hours = ""
                }
                else {
                    this.formData[formCount].extra_hours = timesheets.time_sheets[isoDate].extra_hours
                }

                if(timesheets.time_sheets[isoDate].comment !== undefined) {
                    this.formData[formCount].comment = timesheets.time_sheets[isoDate].comment
                }

                formCount += 1
            }

            // Set the values of the input boxes for next month (ending on the 9th)
            for(let i = 1; i <= this.reporting_period_end; i ++) {
                this.yearAndNextMonth.setDate(i)
                isoDate = this.yearAndNextMonth.toISOString().slice(0, 10)
                // console.log(isoDate)
                
                if (timesheets.time_sheets === undefined || timesheets.time_sheets[isoDate] === undefined) {
                    this.formData[formCount].work_hours = ""
                    this.formData[formCount].pto_hours = ""
                    this.formData[formCount].extra_hours = ""
                    this.formData[formCount].comment = ""
                    continue
                }

                if(timesheets.time_sheets[isoDate].work_hours == 0) {
                    this.formData[formCount].work_hours = ""
                } 
                else {
                    this.formData[formCount].work_hours = timesheets.time_sheets[isoDate].work_hours
                }

                if(timesheets.time_sheets[isoDate].pto_hours == 0) {
                    this.formData[formCount].pto_hours = ""
                }
                else {
                    this.formData[formCount].pto_hours = timesheets.time_sheets[isoDate].pto_hours
                }

                if(timesheets.time_sheets[isoDate].extra_hours == 0) {
                    this.formData[formCount].extra_hours = ""
                }
                else {
                    this.formData[formCount].extra_hours = timesheets.time_sheets[isoDate].extra_hours
                }

                if(timesheets.time_sheets[isoDate].comment !== undefined) {
                    this.formData[formCount].comment = timesheets.time_sheets[isoDate].comment
                }

                formCount += 1
            }
        },
        ...mapActions(["GetRole"]),
    },
    
    // Call these functions when the app has been mounted
    mounted() {
        this.closeModal()
        this.getDaysInFirstHalf()
        this.getDaysInSecondHalf()
        this.correlateDateAndDay()

        let payload = {
            'firstDay': this.firstDay,
            'lastDay': this.lastDay
        };

        this.$store.dispatch("GetTimesheets", payload).then(() => {
            this.getTimesheet()
            //console.log(this.$store.getters.RetrievedTimesheet)
            //console.log("RE MOUNT")
        })
    },
    beforeMount() {
        let dt = new Date()
        
        console.log(dt)
        // console.log("CURRENT MONTH: " + dt.getMonth())
        
        console.log("GET DATE: " + dt.getDate())
        if(dt.getDate() < this.reporting_period_start) {
            if (dt.getMonth() > 0) {
                this.monthNum = dt.getMonth() - 1
            }
            else if (dt.getMonth() == 0) {
                this.monthNum = 11
            }
            else {
                this.monthNum = dt.getMonth()
            }
            console.log("GET MONTH: " + this.monthNum)
        }
        else {
            this.monthNum = dt.getMonth()
        }

        if(this.monthNum == 0) {
            this.year = dt.getFullYear() - 1
        }
        else {
            this.year = dt.getFullYear()
        }
        

        this.setFirstDay()
        this.setLastDay()

        this.$store.dispatch("GetName")
    },
}
</script>
