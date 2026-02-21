import { Coordinates } from './Coordinates';

export interface WeatherStorageData {
    city: string;
    temp: number;
    condition: string;
    humidity: number;
    windspeed: number;
    timestamp: number;
};

export interface Favorites {
    cityName: string,
    coords: Coordinates
}

export interface AppSettings {
    unit: 'metric' | 'imperial';
    theme: 'light' | 'dark';
    favorites: Favorites[];
}
