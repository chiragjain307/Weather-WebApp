import React, { useEffect, useState } from 'react';
import invalid from '../assets/invalid.png';
import { WiDaySunny } from "react-icons/wi"; // sunny/clear
import { BsCloudSun } from "react-icons/bs"; //haze
import { BsClouds } from "react-icons/bs"; //clouds
import { WiHumidity } from "react-icons/wi"; //humidity
import { IoRainy } from "react-icons/io5"; //rainy
import { FaSnowflake } from "react-icons/fa"; //snow
import { WiDayWindy } from "react-icons/wi"; //wind
import { WiDust } from "react-icons/wi"; //dust
import { CiCloudDrizzle } from "react-icons/ci"; //drizzle
import { BsCloudFog2 } from "react-icons/bs"; //fog

export default function CurrentLocation() {
    const key = import.meta.env.VITE_API_KEY;
    const [humidity, setHumidity] = useState("0");
    const [description, setDescription] = useState("")
    const [wind, setWind] = useState("0");
    const [temp, setTemp] = useState("0");
    const [cityName, setCityName] = useState("Enter Location");
    const [icon, setIcon] = useState(<img src={invalid} alt="invalid" className='w-[128px]' />);

    useEffect(() => {
        // Fetch weather data for the user's current location
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
                await fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.cod === "404") {
                            setCityName("Invalid City");
                            setHumidity("0");
                            setWind("0");
                            setTemp("0");
                            setIcon(<img src={invalid} alt="invalid" className='w-[128px]' />);
                            setDescription("");
                        } else {
                            setHumidity(Math.floor(data.main.humidity));
                            setWind(Math.floor(data.wind.speed));
                            setTemp(Math.floor(data.main.temp));
                            setCityName(data.name);
                            setDescription(data.weather[0].main)
                            // Set icon based on weather description
                            switch (data.weather[0].description) {
                                case "clear sky":
                                    setIcon(<WiDaySunny />);
                                    break;
                                case "few clouds":
                                    setIcon(<BsCloudSun />);
                                    break;
                                case "scattered clouds":
                                    setIcon(<BsClouds />);
                                    break;
                                case "rain":
                                    setIcon(<IoRainy />);
                                    break;
                                case "snow":
                                    setIcon(<FaSnowflake />);
                                    break;
                                case "dust":
                                    setIcon(<WiDust />);
                                    break;
                                case "fog":
                                    setIcon(<BsCloudFog2 />);
                                    break;
                                case "mist":
                                    setIcon(<CiCloudDrizzle />);
                                    break;
                                default:
                                    setIcon(<img src={invalid} alt="invalid" className='w-[128px]' />);
                            }
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                    });
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    }, []);

    return (
        <div className='w-[350px] bg-white bg-opacity-15 border-2 border-white border-opacity-20 backdrop-blur-lg h-[555px] rounded-2xl p-5 font-sans'>
            <h1 className=' text-3xl text-white font-bold text-center'>Current Location Weather</h1>
            <div className='mt-8 text-white font-normal flex flex-col items-center'>
                <div className='text-9xl'>
                    {icon}
                </div>
                <div className='mt-6 text-6xl font-bold'>
                    {temp}<span className='absolute text-2xl'>°C</span>
                </div>
                <div className='mt-5 text-2xl font-medium'>
                    {cityName}{description? ' - ' + description : null}
                </div>
            </div>

            <div className='w-full mt-8 text-white flex justify-center items-center'>
                <div className='flex items-center pl-5 w-1/2'>
                    <WiHumidity className='h-full text-white text-6xl' />
                    <div className='font-medium'>
                        <div className='text-xl'>{humidity} %</div>
                        <div className='text-sm'>Humidity</div>
                    </div>
                </div>
                <div className='flex items-center gap-3 w-1/2'>
                    <WiDayWindy className='h-full text-white text-6xl' />
                    <div className='font-medium'>
                        <div className='text-xl'>{wind} km/h</div>
                        <div className='text-sm'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
