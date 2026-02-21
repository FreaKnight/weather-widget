import { WeatherStorageData, AppSettings } from './types';

const PREFIX = 'W_APP_';

export const LocalDB = {
    saveForecast: (city: string, data: WeatherStorageData): void => {
        localStorage.setItem(`${PREFIX}FC_${city.toUpperCase()}`, JSON.stringify(data));
    },
    getForecast: (city: string): WeatherStorageData | null => {
        const raw = localStorage.getItem(`${PREFIX}_FC_${city.toUpperCase()}`);
        return raw ? JSON.parse(raw) : null;
    },
    saveSettings: (settings: AppSettings): void => {
        localStorage.setItem(`${PREFIX}Settings`, JSON.stringify(settings));

        const event = new CustomEvent('weather_storage_update', { detail: settings });
        window.dispatchEvent(event);
    },
    getSettings: (): AppSettings => {
        const raw = localStorage.getItem(`${PREFIX}Settings`);
        return raw ? JSON.parse(raw) : { unit: 'metric', theme: 'light', favorites: [] };
    }
};

export * from './types';
