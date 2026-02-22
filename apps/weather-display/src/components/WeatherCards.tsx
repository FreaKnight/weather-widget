/// <reference path="../../../../env.d.ts" />

import React, { useEffect, useState } from 'react';
import { Favorites, LocalDB, OpenWeatherData } from '@weather/storage';
import { Card, Button, CardSkeleton } from '@weather/ui';
import { Coordinates } from 'packages/storage/types/Coordinates';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const WeatherCards = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [weatherData, setWeatherData] = useState<OpenWeatherData[]>([]);
    const [favorites, setFavorites] = useState<Favorites[]>(
        LocalDB.getSettings().favorites
    );

    const fetchWeather = async (currentFavorites: Favorites[]) => {
        if (currentFavorites?.length >= 0) {
            setIsLoading(true);
            // TODO: improve the await in loop
            const promises = currentFavorites.map(async (favorite) => {
                const { city } = favorite;
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
                );
                return response.json();
            });
            const results = await Promise.all(promises);
            setWeatherData(results.filter((data) => data.cod === 200));
            setIsLoading(false);
        }
    };

    const handleDelete = (selectedCoords: Coordinates) => {
        const { lat, lon } = selectedCoords;
        const current = LocalDB.getSettings();
        const updatedFavorites = current.favorites.filter((fav) => {
            const { coords } = fav;
            // The API coords are not accurate between the weather data and Geo requests, flooring results for match
            // Adding another api request to normalize coords shouldnt happen, api should be updated to return consistent results over its endpoints
            // This presents an issue with deleting saved cities that are within a deg difference
            return (
                Math.floor(coords.lat) !== Math.floor(lat) &&
                Math.floor(coords.lon) !== Math.floor(lon)
            );
        });
        LocalDB.saveSettings({
            ...current,
            favorites: updatedFavorites
        });
    };

    useEffect(() => {
        fetchWeather(favorites);

        const handleUpdate = (event: any) => {
            setFavorites(event.detail.favorites);
            fetchWeather(event.detail.favorites);
        };

        window.addEventListener('weather_storage_update', handleUpdate);
        return () =>
            window.removeEventListener('weather_storage_update', handleUpdate);
    }, []);

    if (isLoading) return <CardSkeleton />;

    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {weatherData.map((data) => {
                const { coord } = data;

                return (
                    <Card
                        key={data.id}
                        title={data.name}
                        onClose={() =>
                            handleDelete({ lat: coord.lat, lon: coord.lon })
                        }
                    >
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '2rem', margin: '10px 0' }}>
                                {Math.round(data.main.temp)}°C
                            </p>
                            <p
                                style={{
                                    color: '#666',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {data.weather[0].description}
                            </p>
                            <Button
                                variant="primary"
                                style={{ marginTop: '10px', width: '100%' }}
                                onClick={() =>
                                    alert(
                                        `Fetching more details for ${data.name}...`
                                    )
                                }
                            >
                                Details
                            </Button>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

export default WeatherCards;
