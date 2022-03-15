<template>
  <div>
    <!--<NavBar />-->
    <div class="wrapper">

        <div class="row topSection">

            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-6">

                <h1 class="text-blue">Timesheet Submission Form</h1>
                <p>Please fill in the hours under each week day and click Submit Timesheet.</p>

            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                
                <button id="nextPageBtn" class="btn blueBtn right-align" @click="switchTimesheetPage">
                    View Next Page
                    <svg class="chevron" data-src="https://s2.svgbox.net/octicons.svg?ic=chevron-right-bold"></svg>
                </button>
                <button id="previousPageBtn" class="btn blueBtn right-align hide" @click="switchTimesheetPage">
                    <svg class="chevron" data-src="https://s2.svgbox.net/octicons.svg?ic=chevron-left-bold"></svg>
                    View Previous Page
                </button>

            </div>

        </div>
        
        <div>
            <table class="timesheet">

                <tr class="headingRow">
                    <th class="smallCol">Date</th>
                    <th class="smallCol middleCols">Day</th>
                    <th class="largeCol middleCols">Regular Hours</th>
                    <th class="largeCol middleCols">Overtime</th>
                    <th class="largeCol middleCols">Personal Time Off (PTO)</th>
                    <th class="largeCol middleCols">Extra Hours</th>
                </tr>

                <!-- Table body for the first half of the month (will be displayed by default) -->
                <tbody id="firstHalf">

                    <!-- If the index is even, add the "evenRow" class; if not, add the oddRow class -->
                    <tr v-for="day in daysInFirstHalf" v-bind:class="day % 2 == 0 ? 'evenRow' : 'oddRow'" :key="day.id">
                        
                        <!-- Get the date (format ex: 3/10) and day from the dateAndDayArray in employees.js -->
                        <td class="smallCol">{{ dateAndDayArray[day-1][0] }}</td>
                        <td class="smallCol middleCols">{{ dateAndDayArray[day-1][1] }}</td>
                        <td class="largeCol middleCols"><input type="text" class="form-control textBox" :id=" 'day' + day + 'RegHours' "></td>
                        <td class="largeCol middleCols"><input type="text" class="form-control textBox" :id=" 'day' + day + 'OTHours' "></td>
                        <td class="largeCol middleCols"><input type="text" class="form-control textBox" :id=" 'day' + day + 'PTOHours' "></td>
                        <td class="largeCol middleCols"><input type="text" class="form-control textBox" :id=" 'day' + day + 'ExtraHours' "></td>

                    </tr>

                </tbody>

                <!-- Table body for the second half of the month (will be hidden by default) -->
                <tbody id="secondHalf" class="hide">

                    <tr v-for="day in daysInSecondHalf" v-bind:class="day % 2 == 0 ? 'evenRow' : 'oddRow'" :key="day.id">

                        <!-- In order to get the correct dates, add the index to the number of days in the first half of the month because index starts at 1 -->
                        <td class="smallCol">{{ dateAndDayArray[(daysInFirstHalf + day) - 1][0] }}</td>
                        <td class="smallCol middleCols">{{ dateAndDayArray[(daysInFirstHalf + day) - 1][1] }}</td>
                        <td class="largeCol middleCols"><input type="text" class="form-control textBox" :id=" 'day' + (daysInFirstHalf + day) + 'RegHours' "></td>
                        <td class="largeCol middleCols"><input type="text" class="form-control textBox" :id=" 'day' + (daysInFirstHalf + day) + 'OTHours' "></td>
                        <td class="largeCol middleCols"><input type="text" class="form-control textBox" :id=" 'day' + (daysInFirstHalf + day) + 'PTOHours' "></td>
                        <td class="largeCol middleCols"><input type="text" class="form-control textBox" :id=" 'day' + (daysInFirstHalf + day) + 'ExtraHours' "></td>

                    </tr>

                </tbody>
            </table>
            <button id="submitTimesheetBtn" class="btn blueBtn">Submit Timesheet</button>
        </div>

    </div>
  </div>
</template>

<script>
export default {
    name: "Timesheet",
    components: {},
    data() {
        return {
            title: '',
            employees: [],
            days: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
            dateAndDayArray: [],
            year: 0,
            monthNum: 0,
            daysInMonth: 0,
            daysInFirstHalf: 0,
            daysInSecondHalf: 0
        }
    },
    methods: {
        // The data retrieved from the API is always going to be in this format:
        /*
        {
            status: <status_code>,  (example: 200, 201, 400, 500)
            message: <status_message>,  (example: "success" or "error")
            data: {
                <data_from_server>,  (example: "employees": [emp1, emp2, emp3, etc...])
            }
        }
        */
       
        // This function associates a date with the day of the week in the dateAndDayArray
        correlateDateAndDay() {
            var d = new Date(this.year, this.monthNum-1)
            var abbrevDay

            // setDate sets the month day of the date that was created above; starts at 1, goes until it gets to the end of the month
            // getDay returns an int (0-6) of the weekday that correlates to the date that was set; reference the index of the days array that corresponds to that int
            // Push the day number and abbreviated day name to dateAndDayArray
            for(var i = 1; i <= this.daysInMonth; i ++) {                               
                d.setDate(i) 
                abbrevDay = this.days[d.getDay()]
                this.dateAndDayArray.push([this.monthNum + "/" + i, abbrevDay])
            }
        },

        // Calculates the number of days in the first half of the month (for the first page of the timesheet)
        getDaysInFirstHalf() {
            var dt = new Date()
            this.monthNum = dt.getMonth() + 1
            this.year = dt.getFullYear()
            this.daysInMonth = new Date(this.year, this.monthNum, 0).getDate()
            this.daysInFirstHalf = parseInt(this.daysInMonth / 2)
        },

        // Calculates the number of days in the second half of the month (for the second page of the timesheet)
        getDaysInSecondHalf() {
            this.daysInSecondHalf = this.daysInMonth - this.daysInFirstHalf
        },

        // Controls the switch between the first half and second half of the month on the Timesheet
        switchTimesheetPage() {
            var nextPageBtn = document.getElementById("nextPageBtn")
            var previousPageBtn = document.getElementById("previousPageBtn")
            var firstHalf = document.getElementById("firstHalf")
            var secondHalf = document.getElementById("secondHalf")

            // Add the "hide" class to the elements if it is already there or remove it if it is not
            nextPageBtn.classList.toggle("hide")
            firstHalf.classList.toggle("hide")
            secondHalf.classList.toggle("hide")
            previousPageBtn.classList.toggle("hide")
        }
    },

    // Call these functions when the app has been mounted
    mounted() {
        this.getDaysInFirstHalf()
        this.getDaysInSecondHalf()
        this.correlateDateAndDay()
    }
};
</script>
