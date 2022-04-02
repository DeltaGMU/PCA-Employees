const config = {
    // TURN DEBUG MODE OFF OR CHECK-IN SYSTEM WON'T WORK AS INTENDED IN PRODUCTION.
    debug_mode: true,

    test_date: function() {
        let currentDate = new Date()
        currentDate.setHours(16, 30)
        return currentDate
    },
    python_server: {
        host: 'localhost',
        port: 56709,
        https: true,
    }
}

export default config;