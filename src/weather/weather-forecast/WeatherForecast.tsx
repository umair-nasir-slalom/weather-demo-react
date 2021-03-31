import './WeatherForecast.scss';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import {ForecastResponse, List} from "../../models/ForecastResponse";
import React, {useState} from "react";
import Paper from '@material-ui/core/Paper';
import { chain } from 'underscore'
import moment from "moment";

type Props = {
    forecast: ForecastResponse
}

export const WeatherForecast : React.FC<Props> = ({forecast}) => {
    const [ currentIndex, setCurrentIndex ] = useState(0)

    const occurrenceDay = (occurrence: List) => {
        return moment(occurrence.date).startOf('day').format();
    };

    const groupToDay = (group: List[], day: any) => {
        return {
            day: moment(day).format('DD MMM'),
            items: group
        }
    };

    const dataGroup = chain(forecast.list)
        .groupBy(occurrenceDay)
        .map(groupToDay)
        .value();


    return (
        <div className="forecast-container">
            { forecast.cnt && forecast.cnt > 0 ?
                (
                    <div className="forecast-content">
                        <TableContainer component={Paper}>
                            <Table className="table" aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date/Time</TableCell>
                                        <TableCell align="right">Temp (&deg;C)</TableCell>
                                        <TableCell align="right">Min. Temp (&deg;C)</TableCell>
                                        <TableCell align="right">Max. Temp (&deg;C)</TableCell>
                                        <TableCell align="right">Wind (m/s)</TableCell>
                                        <TableCell align="right">Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataGroup[currentIndex].items.map((row: List) => (
                                        <TableRow key={row.dt}>
                                            <TableCell component="th" scope="row">
                                                {moment(row.date).format('DD MMM - h a')}
                                            </TableCell>
                                            <TableCell align="right">{Math.round(row.main.temp)}</TableCell>
                                            <TableCell align="right">{Math.round(row.main.temp_min)}</TableCell>
                                            <TableCell align="right">{Math.round(row.main.temp_max)}</TableCell>
                                            <TableCell align="right">{Math.round(row.wind.speed)}</TableCell>
                                            <TableCell align="right">{row.weather[0].description}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className="day-toggles">
                            {dataGroup.map((group, index) => {
                                return (<Button key={group.day} className="action-button" variant="contained"
                                                type="button" color="primary" onClick={() => setCurrentIndex(index)}>
                                    {group.day}
                                </Button>)
                            })}
                        </div>
                    </div>
                ) : (<div className="no-forecast">NO DATA AVAILABLE</div>) }
        </div>
    );
}