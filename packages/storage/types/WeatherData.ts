interface Precipitation {
    /**
     * Precipitation, mm/h.
     * Only mm/h as units of measurement are available for this parameter
     * @title One Hour ???
     */
    '1h'?: number; // ??
}

interface Weather {
    /**
     * Weather Condition ID
     * @title ID
     */
    id: number;
    /**
     * Group of weather parameters (Rain, Snow etc.)
     * @title Main
     */
    main: string;
    /**
     * Weather condition within the group.
     * @title Description
     */
    description: string;
    /**
     * Weather icon ID
     * @title Icon
     */
    icon: string;
}

export interface WeatherData {
    /**
     * Current time, Unix, UTC
     * @title Date
     */
    dt: Date;
    /**
     * Atmospheric pressure on the sea level, hPa
     * @title Pressure
     */
    pressure: number;
    /**
     * Humidity, %
     * @title Humidity
     */
    humidity: number;
    /**
     * Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form.
     * Units –
     *  default: kelvin,
     *  metric: Celsius,
     *  imperial: Fahrenheit
     * @title Dew Point
     */
    dew_point: number;
    /**
     * Cloudiness, %
     * @title Clouds
     */
    clouds: number;
    /**
     * Current UV index
     * @title UVI
     */
    uvi: number;
    /**
     * Wind speed.
     * Units –
     *  default: metre/sec,
     *  metric: metre/sec,
     *  imperial: miles/hour.
     * @title Wind Speed
     */
    wind_speed: number;
    /**
     * Wind gust.
     * Units –
     *  default: metre/sec,
     *  metric: metre/sec,
     *  imperial: miles/hour.
     * @title Wind Gust
     */
    wind_gust?: number;
    /**
     * Wind direction, degrees (meteorological)
     * @title Wind degrees
     */
    wind_deg: number;
    /**
     * @title Rain
     */
    rain?: Precipitation;
    snow?: Precipitation;
    weather: Weather;
}
