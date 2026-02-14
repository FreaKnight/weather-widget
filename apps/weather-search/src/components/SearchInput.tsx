import React, { useState } from 'react';
import { LocalDB } from '@weather/storage';

const SearchInput = () => {
    const [city, setCity] = useState('');

    const handleSave = () => {
        const settings = LocalDB.getSettings();
        LocalDB.saveSettings({
            ...settings,
            favorites: [...settings.favorites, city],
        });
        // Log or alert save state
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
