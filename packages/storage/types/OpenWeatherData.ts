import { Coordinates } from './Coordinates';
import { WeatherData } from './WeatherData';

export interface OpenWeatherData extends Coordinates {
    /**
     * Timezone name for the requested location
     * @title Timezone
     */
    timezone: string;
    /**
     * Shift in seconds from UTC
     * @title Timezone Offset
     */
    timezone_offset: number;
    /**
     * Current weather data API response
     * @title Current
     */
    current: WeatherData & {
        /**
         * Sunrise time, Unix, UTC.
         * For polar areas in midnight sun and polar night periods this parameter is not returned in the response
         * @title Sunrise
         */
        sunrise: Date;
        /**
         * Sunset time, Unix, UTC.
         * For polar areas in midnight sun and polar night periods this parameter is not returned in the response
         * @title Sunset
         */
        sunset: Date;
        /**
         * Temperature.
         * Units -
         *  default: kelvin,
         *  metric: Celsius,
         *  imperial: Fahrenheit.
         * @title Temp
         */
        temp: number;
        /**
         * Temperature.
         * This temperature parameter accounts for the human perception of weather.
         * Units –
         *  default: kelvin,
         *  metric: Celsius,
         *  imperial: Fahrenheit.
         * @title Feels Like
         */
        feels_like: number;
        /**
         * Average visibility, metres.
         * The maximum value of the visibility is 10 km
         * @title Visibility
         */
        visibility?: number;
    };
    /**
     * Minute forecast weather data API response
     * @title Minutely
     */
    minutely: {
        /**
         * Time of the forecasted data, unix, UTC
         * @title Minutely
         */
        dt: Date;
        /**
         * Precipitation, mm/h.
         * Only mm/h as units of measurement are available for this parameter
         * @title Precipitation
         */
        precipitation: number;
    };
    /**
     * Hourly forecast weather data API response
     * @title Hourly
     */
    hourly: WeatherData & {
        /**
         * Temperature.
         * Units -
         *  default: kelvin,
         *  metric: Celsius,
         *  imperial: Fahrenheit.
         * @title Temp
         */
        temp: number | {};
        /**
         * Temperature.
         * This temperature parameter accounts for the human perception of weather.
         * Units –
         *  default: kelvin,
         *  metric: Celsius,
         *  imperial: Fahrenheit.
         * @title Feels Like
         */
        feels_like: number | {};
        /**
         * Average visibility, metres.
         * The maximum value of the visibility is 10 km
         * @title Visibility
         */
        visibility?: number;
        /**
         * Probability of precipitation.
         * The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%
         * @title Probability
         */
        pop?: number;
    };
    daily: WeatherData & {
        /**
         * Sunrise time, Unix, UTC.
         * For polar areas in midnight sun and polar night periods this parameter is not returned in the response
         * @title Sunrise
         */
        sunrise?: Date;
        /**
         * Sunset time, Unix, UTC.
         * For polar areas in midnight sun and polar night periods this parameter is not returned in the response
         * @title Sunset
         */
        sunset?: Date;
        /**
         * The time of when the moon rises for this day, Unix, UTC
         * @title Moonrise
         */
        moonrise?: Date;
        /**
         * The time of when the moon sets for this day, Unix, UTC
         * @title Moonset
         */
        moonset?: Date;
        /**
         * Moon phase.
         * 0 and 1 are 'new moon',
         * 0.25 is 'first quarter moon',
         * 0.5 is 'full moon'
         * and 0.75 is 'last quarter moon'.
         * The periods in between are called 'waxing crescent', 'waxing gibbous', 'waning gibbous', and 'waning crescent', respectively.
         * Moon phase calculation algorithm:
         *  if the moon phase values between the start of the day and the end of the day
         *      have a round value (0, 0.25, 0.5, 0.75, 1.0),
         *  then this round value is taken,
         *  otherwise the average of moon phases for the start of the day and the end of the day is taken
         * @title Moon Phase
         */
        moon_phase?: number;
        /**
         * Units –
         *  default: kelvin,
         *  metric: Celsius,
         *  imperial: Fahrenheit.
         * @title Temperature
         */
        temp: {
            /**
             * @title Morning
             */
            morn: number;
            /**
             * @title Day
             */
            day: number;
            /**
             * @title Evening
             */
            eve: number;
            /**
             * @title Night
             */
            night: number;
            /**
             * @title Minimum
             */
            min: number;
            /**
             * @title Maximum
             */
            max: number;
        };
        feels_like: {
            /**
             * @title Morning
             */
            morn: number;
            /**
             * @title Day
             */
            day: number;
            /**
             * @title Evening
             */
            eve: number;
            /**
             * @title Night
             */
            night: number;
        };
        /**
         * Human-readable description of the weather conditions for the day
         * @title Summary
         */
        summary?: string;
        /**
         * Probability of precipitation.
         * The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%
         * @title Probability
         */
        pop: number;
    };
    alerts: {
        sender_name: string;
        event: string;
        start: Date;
        end: Date;
        description: string;
        tags: string[]; // string ??
    };
}
