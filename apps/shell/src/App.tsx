import React, { useState, Suspense } from 'react';
import { LocalDB } from '@weather/storage';

// @ts-ignore
const SearchInput = React.lazy(() => import('weather_search/SearchInput'));

const App = () => {
    const [city, setCity] = useState(LocalDB.getSettings().favorites[0]);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Weather Microfrontend Shell</h1>
            <p>Last Searched city from DB: <strong>{city}</strong></p>
            <Suspense fallback={<div>Loading Search Widget....</div>}>
                <SearchInput />
            </Suspense>
        </div>
    );
};

export default App;
