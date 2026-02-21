/// <reference path="../../../../env.d.ts" />

import React, { useState, useEffect } from 'react';
import { Favorites, LocalDB, OpenWeatherGeoData } from '@weather/storage';
import { Coordinates } from 'packages/storage/types/Coordinates';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const SearchInput = () => {
    const [query, setQuery] = useState('');
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
                const data: OpenWeatherGeoData[] = await response.json();
                setSuggestions(data);
            } catch (e) {
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
            favorites: [
                ...current.favorites,
                favorite
            ]
        });

        setQuery('');
        setSuggestions([]);

        // TODO: indicate the save status to user.
    };

    return (
        <div style={{ border: '2px solid #3b82f6', padding: '1rem', borderRadius: '8px' }}>
            <input
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search for a city...'
                style={{ width: 'calc(100% - 18px)', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {suggestions.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    width: '22%',
                    background: '#fff',
                    border: '1px solid #ccc',
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    zIndex: 2,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    {suggestions.map((suggestion, i) => {
                        const cityName = `${suggestion.name}, ${suggestion.state ? suggestion.state + ',' : ''} ${suggestion.country}`
                        const suggestionCoords: Coordinates = { lat: suggestion.lat, lon: suggestion.lon };
                        const current = LocalDB.getSettings();
                        const disabled = !!current.favorites.find((favourite) => {
                            const { coords } = favourite;
                            return coords.lat === suggestion.lat && coords.lon === suggestion.lon;
                        });
                        return (
                            <li
                                key={`${suggestion.name}-${i}`}
                                onClick={() => !disabled && handleSelect({ cityName, coords: suggestionCoords })}
                                style={{
                                    padding: '8px',
                                    borderBottom: '1px solid #eee',
                                    backgroundColor: disabled ? '#aaa' : '#fff',
                                    cursor: disabled ? 'not-allowed' : 'pointer'
                                }}
                                aria-disabled={disabled}
                            >
                                {cityName}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;
