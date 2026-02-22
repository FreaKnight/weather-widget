import React, { useState, Suspense, useEffect } from 'react';
import { Favorites, LocalDB } from '@weather/storage';

// @ts-ignore
const SearchInput = React.lazy(() => import('weather_search/SearchInput'));
// @ts-ignore
const WeatherCards = React.lazy(() => import('weather_display/WeatherCards'));

const App = () => {
    const [favorites, setFavorites] = useState<Favorites[]>([]);

    useEffect(() => {
        const data = LocalDB.getSettings();
        setFavorites(data?.favorites ?? []);
    }, []);

    useEffect(() => {
        const handleUpdate = (event: any) => {
            setFavorites(event.detail.favorites);
        };

        window.addEventListener('weather_storage_update', handleUpdate);

        return () =>
            window.removeEventListener('weather_storage_update', handleUpdate);
    }, []);

    return (
        <div
            style={{
                maxWidth: '800px',
                margin: '0 auto',
                fontFamily: 'sans-serif',
            }}
        >
            <header
                style={{ borderBottom: '1px solid #ccc', marginBottom: '2rem' }}
            >
                <h1>Weather OS Shell</h1>
            </header>
            <div style={{ display: 'flex' }}>
                <section style={{ flex: 'auto', margin: '0 5px' }}>
                    <h3>Find a City</h3>
                    <Suspense fallback={<div>Loading Search...</div>}>
                        <SearchInput />
                    </Suspense>
                </section>
                <section style={{ margin: '0 5px', flex: 'auto' }}>
                    <h3>Your Saved Cities</h3>
                    <ul>
                        {favorites.map((favorite) => {
                            const { city, coords } = favorite;
                            return (
                                <li key={`${coords.lat}-${coords.lon}`}>
                                    {city}
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </div>
            <section style={{ marginTop: '2rem' }}>
                <h3>Current Weather</h3>
                <Suspense fallback={<div>Loading Weather...</div>}>
                    <WeatherCards />
                </Suspense>
            </section>
        </div>
    );
};

export default App;
