import React, { useState, Suspense, useEffect } from 'react';
import { Favorites, LocalDB } from '@weather/storage';
import { Button, Card } from '@weather/ui';

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
                minHeight: '100vh',
                backgroundColor: '#f0f2f5',
                paddingBottom: '40px',
                fontFamily: 'sans-serif'
            }}
        >
            <nav
                style={{
                    padding: '1rem 2rem',
                    background: '#fff',
                    borderBottom: '1px solid #ddd',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <h2 style={{ margin: 0 }}>☁️ WeatherOS</h2>
                <Button onClick={() => window.location.reload()}>
                    Refresh App
                </Button>
            </nav>
            <main
                style={{
                    maxWidth: '1100px',
                    margin: '2rem auto',
                    padding: '0 1rem'
                }}
            >
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '350px 1fr',
                        gap: '2rem'
                    }}
                >
                    <aside>
                        <Card title="Add New City">
                            <Suspense fallback={<div>Loading Search...</div>}>
                                <SearchInput />
                            </Suspense>
                            <p
                                style={{
                                    fontSize: '0.8rem',
                                    color: '#888',
                                    marginTop: '1rem'
                                }}
                            >
                                Tip: Search by city name and country code (e.g.
                                "London, GB")
                            </p>
                        </Card>
                    </aside>
                    <section>
                        <Card title="Weather Feed">
                            <Suspense fallback={<div>Loading Display...</div>}>
                                <WeatherCards />
                            </Suspense>
                        </Card>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default App;
