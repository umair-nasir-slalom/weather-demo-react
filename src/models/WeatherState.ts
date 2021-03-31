import { WeatherResponse } from "./WeatherResponse";
import {ForecastResponse} from "./ForecastResponse";

export interface WeatherState {
    weather: WeatherResponse,
    forecast: ForecastResponse,
    selectedLocation: SelectedLocation
}

export interface SelectedLocation {
    city : string,
    country: string
}