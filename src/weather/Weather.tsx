import React, { useEffect } from "react"
import './Weather.scss';
import { WeatherPreview } from "./weather-preview/WeatherPreview";
import { WeatherForecast } from "./weather-forecast/WeatherForecast";
import WeatherForm from "./weather-form/WeatherForm";
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import {WeatherResponse} from "../models/WeatherResponse";
import {WeatherState} from "../models/WeatherState";
import {resetLocation} from "../store/weather/actions";
import {Dispatch} from "redux";
import {ForecastResponse} from "../models/ForecastResponse";

function WeatherHome() {
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(resetLocation());
    }, [dispatch]);

    const weatherData: WeatherResponse = useSelector(
        (state: WeatherState) => state.weather,
        shallowEqual
    )

    const forecastData: ForecastResponse = useSelector(
        (state: WeatherState) => state.forecast,
        shallowEqual
    )

    return (
    <div className="weather-root">
        <WeatherForm />
        <WeatherPreview weather={weatherData}/>
        <WeatherForecast forecast={forecastData}/>
    </div>
  );
}

export default WeatherHome;
