const request = require('postman-request')

//Using the WeatherStack API
const weatherstack = (Lattitude, Longitude, callback) => {
    const weatherStackUrl = 'http://api.weatherstack.com/current?access_key=919cc118ee50ce94a055ae5f5a9fe373&query=' + Lattitude + ',' + Longitude
    request({ url: weatherStackUrl, json: true }, (error, response) => {
        //console.log(response.body.current)
        if (error) {
            callback("Unable to connect to weather app", undefined)
        } else if (response.body.error) {
            callback(response.body.error, undefined)

        } else {
            callback(undefined, response.body.current.weather_descriptions + ". It is currently " + response.body.current.temperature +
                " degrees.It feels like " + response.body.current.feelslike + " degrees\n")
        }
    })
}
module.exports = weatherstack