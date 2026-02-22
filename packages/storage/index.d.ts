import { WeatherData, AppSettings } from './types';
export declare const LocalDB: {
    saveForecast: (city: string, data: WeatherData) => void;
    getForecast: (city: string) => WeatherData | null;
    saveSettings: (settings: AppSettings) => void;
    getSettings: () => AppSettings;
};
export * from './types';
