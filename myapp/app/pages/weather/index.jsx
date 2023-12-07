import React, {useState, useEffect} from 'react'
import {Box, Button, Container, Heading, Image, Input} from '@chakra-ui/react'

// State variables for user input, geolocation data, weather data, and custom content
// Some of the parameters were mandatory as per the API guide (https://openweathermap.org/current)
const WeatherApp = () => {
    const [city, setCity] = useState('')
    const [limit, setLimit] = useState('1')

    const [geoData, setGeoData] = useState(null)
    const [weatherData, setWeatherData] = useState(null)

    const [citySearched, setCitySearched] = useState(null)
    const [icon, setIcon] = useState(null)
    const [main, setMain] = useState(null)
    const [description, setDescription] = useState(null)

    const [temp, setTemp] = useState(null)
    const [feelsLike, setFeelsLike] = useState(null)

    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)

    const [bgImage, setBgImage] = useState(null)
    const [customText, setCustomText] = useState(null)

    // Event handler for changing the input city
    const handleChangeCity = (event) => {
        setCity(event.target.value)
    }

    // Event handler for searching weather based on the input city
    const searchWeather = (event) => {
        event.preventDefault()
        if (city !== '') {
            fetchWeatherData()
            setCity('')
        }
    }
    // Customizing background and description based on the weather state (fog, rain, etc.)
    const customizeContent = (main, citySearched, description) => {
        switch (main) {
            case 'Rain':
                setBgImage(
                    'https://images.unsplash.com/photo-1532928448850-d740ccdd9f9c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                )
                setCustomText(`The weather in ${citySearched} is ${description}`)
                break
            case 'Mist':
                setBgImage(
                    'https://images.unsplash.com/photo-1543968996-ee822b8176ba?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                )
                setCustomText(`The weather in ${citySearched} is ${description}`)
                break
            case 'Fog':
                setBgImage(
                    'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                )
                setCustomText(`The weather in ${citySearched} is ${description}`)
                break
            case 'Drizzle':
                setBgImage(
                    'https://images.unsplash.com/photo-1556485689-33e55ab56127?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                )
                setCustomText(`The weather in ${citySearched} is ${description}`)
                break
            case 'Thunderstorm':
                setBgImage(
                    'https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                )
                setCustomText(`The weather in ${citySearched} is ${description}`)
                break
            case 'Snow':
                setBgImage(
                    'https://images.unsplash.com/photo-1514632488-3d65989924b7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                )
                setCustomText(`The weather in ${citySearched} is ${description}`)
                break
            case 'Clear':
                setBgImage(
                    'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?q=80&w=2914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                )
                setCustomText(`There is ${description} in ${citySearched}`)
                break
            case 'Clouds':
                setBgImage(
                    'https://images.unsplash.com/photo-1514519273132-6a1abd48302c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                )
                setCustomText(`It's ${description} in ${citySearched}`)
                break
            default:
                setBgImage(
                    'https://images.unsplash.com/photo-1538947151057-dfe933d688d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                )
                setCustomText(`It's ${description} in ${citySearched}`)
                break
        }
    }

    // Function to fetch weather data from the OpenWeatherMap API
    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=2301e58060429674ddf9ea1c84b8d02f`
            )

            if (response.ok) {
                const geoData = await response.json()
                setGeoData(geoData)
                setLat(geoData[0]?.lat)
                setLon(geoData[0]?.lon)

                try {
                    const response2 = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0]?.lat}&lon=${geoData[0]?.lon}&appid=2301e58060429674ddf9ea1c84b8d02f`
                    )

                    if (response2.ok) {
                        const weatherData = await response2.json()
                        setWeatherData(weatherData)
                        setTemp(weatherData?.main?.temp)
                        setFeelsLike(weatherData?.main?.feels_like)
                        setIcon(weatherData?.weather[0]?.icon)
                        setDescription(weatherData?.weather[0]?.description)
                        setMain(weatherData?.weather[0]?.main)
                        setCitySearched(city)

                        // Customize content based on weather conditions
                        customizeContent(
                            weatherData?.weather[0]?.main,
                            geoData[0]?.name,
                            weatherData?.weather[0]?.description
                        )
                    } else {
                        console.log('Oops, error when fetching weather data!')
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log('Oops, error when fetching geolocation data!')
            }
        } catch (error) {
            console.log('Oops, error when fetching! Please try again', error)
        }
    }

    // rendering the weather app
    return (
        <Container>
            <Box display="flex" flexDirection="column">
                <Box mb={3} backgroundColor="">
                    <Heading as="h3">My weather App</Heading>
                </Box>
                <Box className="weatherApp-search" display="flex">
                    <Input
                        placeholder="City"
                        maxWidth="350px"
                        value={city}
                        onChange={handleChangeCity}
                    />
                    <Button onClick={searchWeather}>Search</Button>
                </Box>
                {geoData?.length > 0 && weatherData && (
                    <Box
                        mt={3}
                        className="weatherApp-result"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor="blue.200"
                        padding={3}
                        backgroundImage={`${bgImage}`}
                    >
                        <Box
                            backdropFilter="auto"
                            backdropBlur="8px"
                            padding="20px"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Box>
                                <Image
                                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                                    alt={description}
                                />
                            </Box>
                            <Box mb={3}>{customText}</Box>
                            <Box>
                                The temperature is <b>{Math.round(temp - 273.15)}°C</b>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Container>
    )
}

export default WeatherApp
