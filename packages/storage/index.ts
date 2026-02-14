import { WeatherData, AppSettings } from '../types';

const PREFIX = 'W_APP_';

export const LocalDB = {
    saveForecast: (city: string, data: WeatherData): void => {
        localStorage.setItem(`${PREFIX}FC_${city.toUpperCase()}`, JSON.stringify(data));
    },
    getForecast: (city: string): WeatherData | null => {
        const raw = localStorage.getItem(`${PREFIX}_FC_${city.toUpperCase()}`);
        return raw ? JSON.parse(raw) : null;
    },
    saveSettings: (settings: AppSettings): void => {
        localStorage.setItem(`${PREFIX}Settings`, JSON.stringify(settings));
    },
    getSettings: (): AppSettings => {
        const raw = localStorage.getItem(`${PREFIX}Settings`);
        return raw ? JSON.parse(raw) : { unit: 'metric', theme: 'light', favorites: [] };
    }
};
