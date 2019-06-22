const request = require('request');
const geocode = require('./geocode')

const weather = (lat, long, callback) => {
            const url ='https://api.darksky.net/forecast/6ca82334bc0e26be1b0940f8d9a97ac3/'+ lat + ',' + long + '?units=si';
            request( { url, json: true }, (error, {body}) => {
                if(error)
                    callback('Error connecting to the weather services', undefined);
                else if(body.error)
                    callback('Error searching for the weather, try another place', undefined);
                else{

                    callback(undefined, {
                        temperature: body.currently.temperature,
                        precipProbability: body.currently.precipProbability,
                        summary: body.currently.summary,
                        tomorSummary: body.daily.data[1].summary,
                        timezone: body.timezone
                    })
                }
            })
}

module.exports = weather
