/// <reference path="../../../../env.d.ts" />

import React, { useEffect, useState } from 'react';
import { LocalDB } from '@weather/storage';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const WeatherCards = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [cities, setCities] = useState(LocalDB.getSettings().favorites);

    const fetchWeather = async (cityList: string[]) => {
        // TODO: improve the await in loop
        const promises = cityList.map(async (city) => {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
                return response.json();
            });
        const results = await Promise.all(promises);
        setWeatherData(results.filter(data => data.cod === 200));
    };

    const handleDelete = (cityName: string) => {
        const current = LocalDB.getSettings();
        const updatedFavorites = current.favorites.filter((fav: string) => fav !== cityName);
        LocalDB.saveSettings({
            ...current,
            favorites: updatedFavorites
        });
    }

    useEffect(() => {
        fetchWeather(cities);

        const handleUpdate = (event: any) => {
            setCities(event.detail.favorites);
            fetchWeather(event.detail.favorites);
        }

        window.addEventListener('weather_storage_update', handleUpdate);
        return () => window.removeEventListener('weather_storage_update', handleUpdate);
    }, []);

    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {weatherData.map((data) => {
                const cityIdentifier = `${data.name}, ${data.sys.country}`;

                return (
                    <div
                        key={data.id}
                        style={{
                            border: '1px solid #ddd',
                            padding: '1rem',
                            borderRadius: '12px',
                            background: '#f9f9f9',
                            minWidth: '150px',
                            position: 'relative'
                        }}
                    >
                        <button
                            onClick={() => handleDelete(cityIdentifier)}
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                color: '#999'
                            }}
                        >
                            x
                        </button>
                        <h4>{data.name}</h4>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {Math.round(data.main.temp)}°C
                        </p>
                        <p>
                            {data.weather[0].description}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default WeatherCards;
