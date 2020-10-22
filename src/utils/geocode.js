const request = require('postman-request')

// MapBox Geocoding
const geocode = (address, callback) => {
    const geoCodeMapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2VlbmthbmFrIiwiYSI6ImNrZ2RpcXZxODBqa2cyc2xlMmNreGs0bGwifQ.aO7eAU6e4bdDsrtza7Dp3g'

    request({ url: geoCodeMapBoxUrl, json: true }, (error, response) => {
        //console.log(response.body.current)
        if (error) {
            callback("Unable to connect to MapBox API", undefined)

        }
        else if (response.body.message) {
            callback(response.body.message, undefined)

        }
        else if (response.body.features.length === 0) {
            callback(error, undefined)

        }
        else {
            const data = {
                Latitude: response.body.features[0].center[1],
                Longitude: response.body.features[0].center[0],
                Location: response.body.features[0].place_name,
                error:"Location not found"
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode