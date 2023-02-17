import * as dotenv from 'dotenv'
dotenv.config()
import got from 'got';

function getLatLong (city, state, country = 'US') {
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
    return got(API_NINJA_URL, options).json();
}

try {
    console.log(await getLatLong('Portland', 'Oregon'))
} catch (error) {
    console.error(error)
}
