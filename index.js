const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const utils = require('./utils.js');

// url to movies and schedule microservices
const MOVIES_API_URL = process.env.MOVIES_API_URL;
const SHCEDULE_API_URL = process.env.SHCEDULE_API_URL;

app.use(cors());

app.get("/", async (req, res) => {
    try {
        const moviesWithSchedule = await utils.mergeMoviesWithSchedule(MOVIES_API_URL, SHCEDULE_API_URL);
        res.send(moviesWithSchedule);
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => {
    console.log('Server started.');
})