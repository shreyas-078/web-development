import { useState } from 'react'
import './App.css'

type WeatherData = {
    latitude: number
    longitude: number
    timezone: string
    hourly: {
        time: string[]
        temperature_2m: number[]
    }
}

function App() {
    const [weatherState, setWeatherState] = useState<WeatherData | null>(null)
    const [city, setCity] = useState<string>("")
    const [searching, setSearching] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function getWeatherForCity(city: string) {
        setSearching(true)
        setError(null)

        try {
            const geoResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
            )

            const geoData = await geoResponse.json()

            if (!geoData.results?.length) {
                throw new Error("City not found")
            }

            const lat = geoData.results[0].latitude
            const lng = geoData.results[0].longitude

            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m`
            )

            const weatherData = await weatherResponse.json()

            setWeatherState(weatherData)

        } catch (err) {
            setError(
                "Could not fetch weather. Additional details: " + err
            )
        } finally {
            setSearching(false)
        }
    }

    if (error) {
        return <h1>{error}</h1>
    } else if (searching) {
        return <h1>Searching Weather Data for {city}...</h1>
    } else if(!weatherState) {
        return (
            <div>
                <h1>Search Weather of a city!</h1>
                <input type="text" placeholder="Enter city name" onChange={(e) => setCity(e.target.value)} value={city}/>
                <button onClick={() => {getWeatherForCity(city)}}>Search</button>
            </div>
        )
    } else {
        return (
            <>
               <h1>Weather For {city}</h1>
                <div>
                    <p>Latitude: {weatherState.latitude}</p>
                    <p>Longitude: {weatherState.longitude}</p>
                    <p>timezone: {weatherState.timezone}</p>
                    <p>Hourly Temps:</p>
                    <div id="tempsDiv">
                        <br /> 
                        <div id="hoursDiv">
                            {weatherState.hourly.time.slice(0, 5).map((hour, idx) => <p key={idx}>{hour.split("T")[1]}</p>)}
                        </div>
                        <div>
                            {weatherState.hourly.temperature_2m.slice(0, 5).map((temp, idx) => <p key={idx}>{temp + "°C"}</p>)}
                        </div>
                    </div> 
                </div>
            </>
        )
    }
}

export default App
