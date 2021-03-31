import { useState } from "react"
import './WeatherForm.scss';
import { Button, TextField, IconButton } from '@material-ui/core';
import {getWeatherData, resetLocation, setLocation, clearWeatherForecast} from "../../store/weather/actions";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux"
import ClearIcon from '@material-ui/icons/Clear';

function WeatherForm() {
    const dispatch: Dispatch<any> = useDispatch();
    const [ city, setCity ] = useState('')
    const [ country, setCountry ] = useState('')

    const handleChange = (event: any) => {
        if(event.currentTarget.id === 'city') {
            setCity(event.currentTarget.value)
        } else if(event.currentTarget.id === 'country') {
            setCountry(event.currentTarget.value)
        } else {
            return;
        }
    }

    const handleClear = () => {
        const city = document.getElementById("city")
        const country = document.getElementById("country")
        if(city && country) {
            (city as HTMLInputElement).value = '';
            (country as HTMLInputElement).value = '';
        }
        dispatch(resetLocation());
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (city !== '' && country !== '') {
            dispatch(setLocation({ city: city, country: country }))
            dispatch(getWeatherData());
            dispatch(clearWeatherForecast());
        }
    }

  return (
    <form id="weather-form" onSubmit={e => handleSubmit(e)} onReset={handleClear} className='weather-form'>
        <TextField
            required
            id="city"
            name="city"
            label="City"
            onChange={handleChange}
        />
        <TextField
            required
            type="text"
            id="country"
            name="country"
            label="Country"
            onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
            Get Weather
        </Button>
        <IconButton color="primary" aria-label="my location" component="span" onClick={handleClear}>
            <ClearIcon />
        </IconButton>
    </form>
  );
}

export default WeatherForm;
