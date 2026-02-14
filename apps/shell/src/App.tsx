import React, { useState, Suspense, useEffect } from 'react';
import { LocalDB } from '@weather/storage';

// @ts-ignore
const SearchInput = React.lazy(() => import('weather_search/SearchInput'));

const App = () => {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const data = LocalDB.getSettings();
        setFavorites(data.favorites);
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <header style={{ borderBottom: '1px solid #ccc', marginBottom: '2rem' }}>
                <h1>Weather OS Shell</h1>
            </header>
            <section>
                <h3>Find a City</h3>
                <Suspense fallback={<div>Loading Search...</div>}>
                    <SearchInput />
                </Suspense>
            </section>
            <section style={{ marginTop: '2rem' }}>
                <h3>Your Pinned Cities</h3>
                <ul>
                    {favorites.map((city, i) => <li key={`${city}-${i}`}>{city}</li>)}
                </ul>
            </section>
        </div>
    );
};

export default App;
