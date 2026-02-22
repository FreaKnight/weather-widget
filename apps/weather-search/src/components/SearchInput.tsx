/// <reference path="../../../../env.d.ts" />

import React, { useState, useEffect } from 'react';
import { Favorites, LocalDB, OpenWeatherGeoData } from '@weather/storage';
import { Input } from '@weather/ui';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const SearchInput = () => {
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<OpenWeatherGeoData[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            if (query.length < 3) {
                setSuggestions([]);
                return;
            }

            try {
                const response = await fetch(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${API_KEY}`
                );
                const data = await response.json();
                setSuggestions(data);
            } catch (e) {
                setSuggestions([]);
                console.error('Geocoding failed', e);
            }
        };

        const timeoutId = setTimeout(fetchCities, 400);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelect = (favorite: Favorites) => {
        const current = LocalDB.getSettings();

        LocalDB.saveSettings({
            ...current,
            favorites: [...current.favorites, favorite]
        });

        setQuery('');
        setSuggestions([]);

        // TODO: indicate the save status to user.
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '350px'
            }}
        >
            <Input
                label="Find a City"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Cape Town"
            />
            {suggestions.length > 0 && (
                <ul
                    style={{
                        position: 'absolute',
                        width: '100%',
                        top: '100%',
                        background: '#fff',
                        border: '1px solid #ccc',
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        zIndex: 2,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                >
                    {suggestions.map((suggestion) => {
                        const { lat, lon, name, state, country } = suggestion;
                        const coords = `${lat}-${lon}`;
                        const city = `${name}, ${state ? state + ',' : ''} ${country}`;
                        const current = LocalDB.getSettings();
                        const disabled = !!current.favorites.find(
                            (favorite) => {
                                const { coords } = favorite;
                                return coords.lat === lat && coords.lon === lon;
                            }
                        );

                        return (
                            <li
                                key={coords}
                                onClick={() =>
                                    !disabled &&
                                    handleSelect({
                                        city,
                                        coords: { lat, lon }
                                    })
                                }
                                style={{
                                    color: disabled ? '#555' : '#000',
                                    padding: '8px',
                                    borderBottom: '1px solid #eee',
                                    backgroundColor: disabled ? '#bbb' : '#fff',
                                    cursor: disabled ? 'not-allowed' : 'pointer'
                                }}
                                aria-disabled={disabled}
                            >
                                {city}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;
