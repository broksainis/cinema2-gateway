const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const utils = require('./utils.js');
const moviesBackend = process.env.BACKEND_MOVIES || '0.0.0.0';
const scheduleBackend = process.env.BACKEND_SCHEDULE || '0.0.0.0';

app.use(cors());

app.get("/", async (req, res) => {
    try {
        const moviesWithSchedule = await utils.mergeMoviesWithSchedule(`http://${moviesBackend}:${port}`, `http://${scheduleBackend}:${port}`);
        res.send(moviesWithSchedule);
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => {
    console.log('Server started.');
})