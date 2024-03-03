import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi"; // sunny/clear
import { BsCloudSun } from "react-icons/bs"; //haze
import { BsClouds } from "react-icons/bs"; //clouds
import { WiHumidity } from "react-icons/wi"; //humudity
import { IoRainy } from "react-icons/io5"; //rainy
import { FaSnowflake } from "react-icons/fa"; //snow
import { WiDayWindy } from "react-icons/wi"; //wind
import { WiDust } from "react-icons/wi"; //dust
import { CiCloudDrizzle } from "react-icons/ci"; //drizzle
import { BsCloudFog2 } from "react-icons/bs"; //fog







function Weather() {
    const key = import.meta.env.VITE_API_KEY
    const [city, setCity] = useState("")
    const [data, setData] = useState({})
    const [humidity, setHumudity] = useState("")
    const [wind, setWind] = useState("")
    const [temp, setTemp] = useState("")
    const [cityName, setCityName] = useState("")
    const [icon, setIcon] = useState("")

    const handleSearch = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
        if (city === "") {
            return null
        } else {
            await fetch(url)
                .then((e) => e.json())
                .then((e) => setData(e))

            setHumudity(Math.floor(data.main.humidity))
            setWind(Math.floor(data.wind.speed))
            setTemp(Math.floor(data.main.temp))
            setCityName(data.name)

            if (data.weather[0].description === "clear sky") {
                setIcon(<WiDaySunny />)
            } else if (data.weather[0].description === "few clouds") {
                setIcon(<BsCloudSun />)
            } else if (data.weather[0].description === "scattered clouds") {
                setIcon(<BsClouds />)
            } else if (data.weather[0].description === "rain") {
                setIcon(<IoRainy />)
            } else if (data.weather[0].description === "snow") {
                setIcon(<FaSnowflake />)
            } else if (data.weather[0].description === "dust") {
                setIcon(<WiDust />)
            } else if (data.weather[0].description === "fog") {
                setIcon(<BsCloudFog2 />)
            } else if (data.weather[0].description === "mist") {
                setIcon(<CiCloudDrizzle />)
            }
            setCity("")
        }
    }


    return (
        <div className='container w-full bg-slate-800 h-full'>
            <div className='top-bar flex justify-center items-center gap-10 pt-60'>
                <input type="text" placeholder='Search' value={city} onChange={(e) => setCity(e.target.value)} className='w-[362px]' />
                <button onClick={handleSearch}>
                    <FaSearch className='search-icon text-white' />
                </button>
            </div>
            <div className='weather-image text-white mt-7 flex justify-center text-[200px]' >
                {icon}
            </div>
            <div className='weather-temp text-white text-9xl font-normal '>
                {temp}°c
            </div>
            <div className='weather-location text-white text-6xl font-normal'>
                {cityName}
            </div>
            <div className='data-container mt-12 text-white flex justify-center'>
                <div className='elements m-auto flex items-start gap-3'>
                    <WiHumidity className='icon text-white mt-3' />
                    <div className='data text-4xl font-normal'>
                        <div className='humudity-percentage'>{humidity}%</div>
                        <div className='text text-xl font-normal'>Humidity</div>
                    </div>
                </div>
                <div className='elements m-auto flex items-start gap-3'>
                    <WiDayWindy className='icon text-white mt-3' />
                    <div className='data text-4xl font-normal'>
                        <div className='humudity-percentage'>{wind} km/h</div>
                        <div className='text text-xl font-normal'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather