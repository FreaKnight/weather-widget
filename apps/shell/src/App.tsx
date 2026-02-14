import React, { useState} from 'react';
import { LocalDB } from '@weather/storage';

const App = () => {
    const [city, setCity] = useState(LocalDB.getSettings().favorites[0]);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Weather Microfrontend Shell</h1>
            <p>Last Searched city from DB: <strong>{city}</strong></p>
        </div>
    );
};

export default App;
