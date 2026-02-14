import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchInput from './components/SearchInput';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div style={{ padding: '20px' }}>
            <h2>Search Remote Standalone</h2>
            <SearchInput />
        </div>
    </React.StrictMode>
);
