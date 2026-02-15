/// <reference path="../../../../env.d.ts" />

import React, { useState, useEffect } from 'react';
import { LocalDB } from '@weather/storage';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const SearchInput = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            if (query.length < 3) {
                setSuggestions([]);
                return;
            }

            try {
                const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`);
                const data = await response.json();
                setSuggestions(data);
            } catch (e) {
                console.error('Geocoding failed', e);
            }
        };

        const timeoutId = setTimeout(fetchCities, 400);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelect = (city: any) => {
        const cityName = `${city.name}, ${city.country}`;
        const current = LocalDB.getSettings();

        LocalDB.saveSettings({ 
            ...current,
            favorites: [
                ...current.favorites,
                cityName
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
                    {suggestions.map((city, i) => {
                        const cityName = `${city.name}, ${city.country}`;
                        const current = LocalDB.getSettings();
                        const disabled = current.favorites.includes(cityName);
                        return (
                            <li
                                key={`${city.name}-${i}`}
                                onClick={() => !disabled && handleSelect(city)}
                                style={{
                                    padding: '8px',
                                    borderBottom: '1px solid #eee',
                                    backgroundColor: disabled ? '#aaa' : '#fff',
                                    cursor: disabled ? 'not-allowed' : 'pointer'
                                }}
                                aria-disabled={disabled}
                            >
                                {city.name}, {city.state && `${city.state}, `}{city.country}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;
