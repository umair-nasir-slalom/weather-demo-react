import './WeatherPreview.scss';
import { Button, Card, CardContent } from '@material-ui/core';
import { WeatherResponse } from "../../models/WeatherResponse";
import {getWeatherForecastData} from "../../store/weather/actions";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";

type Props = {
    weather: WeatherResponse
}

export const WeatherPreview : React.FC<Props> = ({weather}) => {
    const dispatch: Dispatch<any> = useDispatch();

    const handleForecast = (e: any) => {
        e.preventDefault()
        if (weather.weather) {
            dispatch(getWeatherForecastData());
        }
    }

    return (
        <Card className="preview-container" variant="outlined">
            { weather.weather && weather.weather.length > 0 ? (
            <CardContent>
                <div className="preview-header">
                    <div className="title-block" color="textSecondary">
                        <div className="location">
                            { weather.name } - { weather.sys?.country }
                        </div>
                        <div className="weather">
                            {weather.weather[0].main } - {weather.weather[0].description }
                        </div>
                    </div>
                    <div>
                        <img className="image" src={ 'https://openweathermap.org/img/w/'
                        + weather.weather[0].icon + '.png'} alt="Weather icon" />
                    </div>
                </div>
                <div className="preview-body">
                    <div className="data">
                        <div className="temp" color="textSecondary">
                            { Math.round(weather?.main.temp) } &deg;C
                        </div>
                        <div className="wind-speed" color="textSecondary">
                            Wind {weather.wind?.speed } m/s
                        </div>
                    </div>
                    <Button className="action-button" type="button" color="primary" onClick={handleForecast}>
                        Get Forecast
                    </Button>
                </div>
            </CardContent>
                ) : (
                <CardContent>
                    <div className="no-preview">
                        NO DATA AVAILABLE
                    </div>
                </CardContent>
            ) }
        </Card>
    );
}