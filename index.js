import * as dotenv from 'dotenv'
import getParsedArgs from './args.js';
dotenv.config()
import got from 'got';

async function getLatLong (city, state, country) {
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

const { city, state, country = "US" } = getParsedArgs()
try {
    const latLong = await getLatLong(city, state, country)
    const sunTime = await getSunriseSunset(latLong.latitude, latLong.longitude)
    console.log(sunTime)
} catch (error) {
    if (error?.response?.statusCode) {
        const { statusCode, statusMessage } = error?.response || {};
        console.error( 'error fetching sunrise-sunset data:', statusCode, statusMessage)
    } else {
        console.error('error fetching sunrise-sunset data', error)
    }
}