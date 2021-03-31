import * as actionConstant from "./actionContants"
import {WeatherResponse} from "../../models/WeatherResponse";
import {SelectedLocation} from "../../models/WeatherState";
import {ForecastResponse} from "../../models/ForecastResponse";

export function setLocation(location: SelectedLocation) {
    return { type: actionConstant.SET_LOCATION, payload: location}
}

export function resetLocation() {
    const city = 'Toronto';
    const country = 'Canada';
    return (dispatch: any) => {
        dispatch(clearWeatherForecast());
        dispatch(setLocation({ city: city, country: country }))
        dispatch(getWeatherData());
    }
}

export function setWeatherData(data: WeatherResponse) {
    return { type: actionConstant.SET_WEATHER_DATA, payload: data}
}

export function clearWeatherForecast() {
    return { type: actionConstant.CLEAR_WEATHER_FORECAST }
}

export function setWeatherForecast(data: ForecastResponse) {
    data.list.forEach(item => item.date = new Date(item.dt * 1000));
    return { type: actionConstant.SET_WEATHER_FORECAST, payload: data }
}

export function getWeatherData() {
    return (dispatch: any, getState: any) => {
        dispatch(clearWeatherForecast());

        const state = getState();
        const apiUrl = `${process.env.REACT_APP_WEATHER_API_URL}/weather?q=${state.selectedLocation.city},
        ${state.selectedLocation.country}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`

        fetch(apiUrl)
            .then(resp => resp.json())
            .then(data => dispatch(setWeatherData(data)));
    }
}

export function getWeatherForecastData() {
    return (dispatch: any, getState: any) => {
        const state = getState();
        const apiUrl = `${process.env.REACT_APP_WEATHER_API_URL}/forecast?q=${state.selectedLocation.city},
        ${state.selectedLocation.country}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`

        fetch(apiUrl)
            .then(resp => resp.json())
            .then(data => dispatch(setWeatherForecast(data)));
    }
}