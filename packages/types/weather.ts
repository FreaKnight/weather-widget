export interface WeatherData {
    city: string;
    temp: number;
    condition: string;
    humidity: number;
    windspeed: number;
    timestamp: number;
};

export interface AppSettings {
    unit: 'metric' | 'imperial';
    theme: 'light' | 'dark';
    favorites: string[];
}
