const config = {
    // TURN DEBUG MODE OFF OR CHECK-IN SYSTEM WON'T WORK AS INTENDED IN PRODUCTION.
    debug_mode: false,

    test_date: function() {
        let currentDate = new Date()
        currentDate.setHours(6, 30) // Set this to (6, 30) for before-care hours, (15:30) for after-care hours.
        return currentDate
    },
    python_server: {
        host: 'localhost', // This should be set to the IP of the system this is deployed on.
        port: 56709,
        https: true,
    }
}

export default config;