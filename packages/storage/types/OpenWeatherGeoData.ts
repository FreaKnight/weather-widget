import { Coordinates } from './Coordinates';

// The ascii and feature name are internal fields, else a language code can be used to get the local name
type LocalNames = 'ascii' | 'feature_name' | string;

export interface OpenWeatherGeoData extends Coordinates {
    name: string;
    local_names: Record<LocalNames, string>;
    // Country code
    country: string;
    state?: string;
}
