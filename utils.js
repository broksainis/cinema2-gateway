const request = require('request');

// get JSON data from movie and schedule api
const getDataFromApi = async (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, res, body) => {
            if (!error && res.statusCode == 200) {
                console.log('BODY OF JSON');
                console.log(res.body);
                resolve(JSON.parse(body));
            } else {
                reject(error);
            }
        });
    })
};

// merge movies with schedule
const mergeMoviesWithSchedule = async (moviesUrl, scheduleUrl) => {
    const movies = await getDataFromApi(moviesUrl);
    const schedule = await getDataFromApi(scheduleUrl);
    movies.forEach(movie => {
        movie.Events = [];
        if (schedule) {
            schedule.forEach(event => {
                if (event.OriginalTitle === movie.OriginalTitle) {
                    movie.Events.push(event);
                }
            })
        }
    });
    return movies;
};

module.exports = {
    mergeMoviesWithSchedule
}