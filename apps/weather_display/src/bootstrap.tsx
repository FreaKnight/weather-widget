import React from 'react';
import ReactDOM from 'react-dom/client';
import WeatherCards from './components/WeatherCards';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div style={{ padding: '20px' }}>
            <h2>Display Weather Remote Standalone</h2>
            <WeatherCards />
        </div>
    </React.StrictMode>
);
