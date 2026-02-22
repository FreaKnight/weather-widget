import { Coordinates } from './Coordinates';
interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}
interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}
interface Wind {
    speed: number;
    deg: number;
    gust: number;
}
interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: Date;
    sunset: Date;
}
export interface OpenWeatherData {
    coord: Coordinates;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: {
        all: number;
    };
    dt: Date;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}
export {};
