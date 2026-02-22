import { Coordinates } from './Coordinates';
export interface OpenWeatherGeoData extends Coordinates {
    /**
     * Name of the city
     * @title Name
     */
    name: string;
    /**
     * Object whose keys are language codes and has that language city name
     * @title Local Names
     */
    local_names: Record<string, string>;
    /**
     * Country of the city
     * @title Country
     */
    country: string;
    /**
     * State or Province of the city
     * @title State
     */
    state?: string;
}
