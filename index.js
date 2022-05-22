const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const utils = require('./utils.js');
const moviesBackend = process.env.BACKEND_MOVIES;
const scheduleBackend = process.env.BACKEND_SCHEDULE;

// url to movies and schedule microservices
// const MOVIES_API_URL = process.env.MOVIES_API_URL;
// const SCHEDULE_API_URL = process.env.SHCEDULE_API_URL;

app.use(cors());

app.get("/", async (req, res) => {
    try {
        const moviesWithSchedule = await utils.mergeMoviesWithSchedule(moviesBackend, scheduleBackend);
        res.send(moviesWithSchedule);
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => {
    console.log('Server started.');
})