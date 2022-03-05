const app = Vue.createApp({
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
        getEmployees() {
            fetch("http://jjservers.ddns.net:56709/api/v1/employees")
                .then((resp) => resp.json())
                .then(data => {
                    this.employees = data['data']['employees']
                    this.title = "Data retrieved successfully!"
                })
                .catch(err => {
                    console.log(err.message)
                    this.title = "Data retrieval error!"
                })
        },
        
        // This function associates the day of the week with the date in the dateAndDayArray
        dateAndDay() {
            var d = new Date(this.year, this.monthNum-1)
            var abbrevDay

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
        }
    },

    // Call these functions when the app has been mounted
    mounted() {
        this.getDaysInFirstHalf()
        this.getDaysInSecondHalf()
        this.dateAndDay()
    }
})

app.mount('#app')