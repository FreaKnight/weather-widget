import React, { useState } from 'react';
import { LocalDB } from '@weather/storage';

const SearchInput = () => {
    const [city, setCity] = useState('');

    const handleSave = () => {
        const settings = LocalDB.getSettings();
        if (settings.favorites.includes(city)) {
            console.warn(`City ${city} was already pinned.`);
            return;
        }
        LocalDB.saveSettings({
            ...settings,
            favorites: [...settings.favorites, city],
        });
        console.log(`City ${city} is pinned!`);
        // TODO: have a better solution to indicate save status
    };

    return (
        <div style={{ border: '2px solid #3b82f6', padding: '1rem', borderRadius: '8px' }}>
            <input type='input' value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter city...' />
            <button onClick={handleSave}>Pin City</button>
        </div>
    );
};

export default SearchInput;
