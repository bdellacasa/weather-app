
import React, { useEffect, useState } from 'react';
import './card.scss';
import { dates } from '../../utils/Constants';
import { kelvinToCelsius } from '../../utils/helpers';
import { ICON_URL } from '../../services/WeatherService';

const CityCard = (props) => {
    const [values, setValues] = useState({
        title: undefined,
        icon: null,
        temp: undefined,
        description: undefined,
        tempMin: undefined,
        tempMax: undefined,
    })

    const date = new Date();

    const getDayWeek = (offset) => {
        const sum = date.getDay() + offset;
        const value = sum <= (dates.length - 1) ? sum : sum - dates.length;
        return dates[value].toUpperCase();
    }

    useEffect(() => {
        if (props.data) {
            props.idx == 0 ? setValues({
                title: 'TODAY',
                icon: ICON_URL(props.data.weather[0].icon),
                temp: kelvinToCelsius(props.data.main.temp),
                description: props.data.weather[0].main.toUpperCase(),
                tempMin: kelvinToCelsius(props.data.main.temp_min),
                tempMax: kelvinToCelsius(props.data.main.temp_max),
            }) : setValues({
                title: getDayWeek(props.idx),
                icon: ICON_URL(props.data.weather[0].icon),
                temp: kelvinToCelsius(props.data.temp.day),
                description: props.data.weather[0].main.toUpperCase(),
                tempMin: kelvinToCelsius(props.data.temp.min),
                tempMax: kelvinToCelsius(props.data.temp.max)
            })
        }

    },[props.data])

    const classNames = props.idx == 0 ?
        {
            container: "card-today-container",
            tempMaxContainer: "card-today-max-container",
            temp: "card-today-temp",
            img: "card-today-image",
            minMax: "card-min-max-temp-today"
        } : {
            container: "card-container",
            tempMaxContainer: "card-max-container",
            temp: "card-temp",
            img: "card-image",
            minMax: "card-min-max-temp"
        }

    return (
        <div className={classNames.container}>
            <div className={"card-image-container"}>
                <p className={"card-city"}>{values.title}</p>
                <img className={classNames.img} src={values.icon}/>
            </div> 
            <div className={"card-temp-container"}>
                <p className={classNames.temp}>{values.temp}°C</p>
                <p className={"card-description"}>{values.description}</p>
                <div className={"card-min-max-container"}>
                    <div className={"card-min-container"}>
                        <p className={classNames.minMax}>{values.tempMin}°C</p>
                        <p className={"card-min-title"}>MIN</p>
                    </div>
                    <div className={classNames.tempMaxContainer}>
                        <p className={classNames.minMax}>{values.tempMax}°C</p>
                        <p className={"card-max-title"}>MAX</p>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default CityCard;