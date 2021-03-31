import * as actionConstants from "./actionContants"
import { WeatherState } from "../../models/WeatherState";
import { WeatherResponse } from "../../models/WeatherResponse";
import {ForecastResponse} from "../../models/ForecastResponse";

let initialState: WeatherState = {
    weather: new WeatherResponse(),
    forecast: new ForecastResponse(),
    selectedLocation: {
        city: '',
        country: ''
    }
};

const reducer = (
    state: any = initialState,
    action: any
): any => {
    switch (action.type) {
        case actionConstants.SET_LOCATION:
            return {
                ...state,
                selectedLocation: action.payload
            }
        case actionConstants.CLEAR_LOCATION:
            return {
                ...state,
                selectedLocation: initialState.selectedLocation
            }
        case actionConstants.SET_WEATHER_DATA:
            return {
                ...state,
                weather: action.payload
            }
        case actionConstants.CLEAR_WEATHER_DATA:
            return {
                ...state,
                weather: initialState.weather
            }
        case actionConstants.SET_WEATHER_FORECAST:
            return {
                ...state,
                forecast: action.payload
            }
        case actionConstants.CLEAR_WEATHER_FORECAST:
            return {
                ...state,
                forecast: initialState.forecast
            }
    }
    return state;
}

export default reducer;