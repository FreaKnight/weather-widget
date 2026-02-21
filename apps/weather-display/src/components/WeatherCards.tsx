/// <reference path="../../../../env.d.ts" />

import React, { useEffect, useState } from 'react';
import { Favorites, LocalDB, OpenWeatherData } from '@weather/storage';
import { Coordinates } from 'packages/storage/types/Coordinates';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const WeatherCards = () => {
    const [weatherData, setWeatherData] = useState<OpenWeatherData[]>([]);
    const [favorites, setFavorites] = useState<Favorites[]>(LocalDB.getSettings().favorites);

    const fetchWeather = async (favoriteList: Favorites[]) => {
        // TODO: improve the await in loop
        const promises = favoriteList.map(async ({ coords }) => {
            const { lat, lon } = coords;
            const response = await fetch(
                `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            return response.json();
        });
        const results: OpenWeatherData[] = await Promise.all(promises);
        console.log('WeatherCards', { results });
        setWeatherData(results);
    };

    const handleDelete = (selectedCoord: Coordinates) => {
        const current = LocalDB.getSettings();
        const updatedFavorites = current.favorites.filter((favorite) => {
            const { coords } = favorite;
            return coords.lat !== selectedCoord.lat && coords.lon !== selectedCoord.lon;
        });
        LocalDB.saveSettings({
            ...current,
            favorites: updatedFavorites
        });
    }

    useEffect(() => {
        fetchWeather(favorites);

        const handleUpdate = (event: any) => {
            setFavorites(event.detail.favorites);
            fetchWeather(event.detail.favorites);
        }

        window.addEventListener('weather_storage_update', handleUpdate);
        return () => window.removeEventListener('weather_storage_update', handleUpdate);
    }, []);

    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {weatherData.map((data) => {
                // const cityIdentifier = `${data.name}, ${data.sys.country}`;
                const { lat, lon } = data;
                const key = `${data.lat}-${data.lon}`;
                const matchedFavorite = favorites.find(({ coords }) => {
                    return lat === coords.lat && lon === coords.lon;
                });

                return (
                    <div
                        key={key}
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
                            onClick={() => handleDelete({ lat, lon })}
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
                        <h4>{matchedFavorite?.cityName ?? 'Undefined'}</h4>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {Math.round(data.current.temp)}°C
                        </p>
                        <p>
                            {data.current.weather.description}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default WeatherCards;
