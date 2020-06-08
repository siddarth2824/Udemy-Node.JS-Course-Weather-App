const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1f80fabffd97103b1ef289a0273a50e9&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const description = body.current.weather_descriptions[0]
            const { temperature } = body.current
            const { feelslike } = body.current
            callback(undefined, description + ". It is currently " + temperature + " degrees out. It feels like " + feelslike + " degrees out.")
        }
    })
}

module.exports = forecast