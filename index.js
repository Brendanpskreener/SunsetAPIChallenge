import * as dotenv from 'dotenv'
dotenv.config()
import got from 'got';

//Add feature to pass in city/state from the terminal

async function getLatLong (city, state, country = 'US') {
    const { API_NINJA_URL, API_NINJA_API_KEY} = process.env
    const options = {
        headers: {
            'X-Api-Key': API_NINJA_API_KEY
        },
        searchParams: {
            city,
            state,
            country
        }
    }
    const [result] = await got(API_NINJA_URL, options).json()
    const { latitude, longitude } = result
    return {
        latitude,
        longitude
    }
}

async function getSunriseSunset (latitude, longitude) {
    const { API_SUNRISE_SUNSET_URL } = process.env
    const options = {
        searchParams: {
            lat: latitude,
            lng: longitude,
            formatted: 0
        }
    }
    const { results: { sunrise, sunset } } = await got(API_SUNRISE_SUNSET_URL, options).json()
    return {
        sunrise: new Date(sunrise).toLocaleString(),
        sunset: new Date(sunset).toLocaleString()
    }
}

try {
    const latLong = await getLatLong('Portland', 'Oregon')
    const sunTime = await getSunriseSunset(latLong.latitude, latLong.longitude)
    console.log(sunTime)
} catch (error) {
    console.error(error)
}
