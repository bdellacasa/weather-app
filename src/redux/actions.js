import {
    GET_CITIES_WEATHER_START,
    GET_CITIES_WEATHER_SUCCESS,
    GET_CITIES_WEATHER_ERROR,
    GET_WEATHER_START,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_ERROR,
    GET_DAILY_FORECAST_START,
    GET_DAILY_FORECAST_SUCCESS,
    GET_DAILY_FORECAST_ERROR
} from './types';

import WeatherService from '../services/WeatherService';

const getCitiesWeatherStart = () => ({
    type: GET_CITIES_WEATHER_START
});

const getCitiesWeatherSuccess = (args) => ({
    type: GET_CITIES_WEATHER_SUCCESS,
    args
});

const getCitiesWeatherError = () => ({
    type: GET_CITIES_WEATHER_ERROR
});

const getWeatherStart = () => ({
    type: GET_WEATHER_START
});

const getWeatherSuccess = (args) => ({
    type: GET_WEATHER_SUCCESS,
    args
});

const getWeatherError = () => ({
    type: GET_WEATHER_ERROR
});

const getDailyForecastStart = () => ({
    type: GET_DAILY_FORECAST_START
});

const getDailyForecastSuccess = (args) => ({
    type: GET_DAILY_FORECAST_SUCCESS,
    args
});

const getDailyForecastError = () => ({
    type: GET_DAILY_FORECAST_ERROR
});

const fetchCitiesWeather = (name) => {
    return new Promise((resolve, reject) => {
        WeatherService.getWeatherByName(name).then(res => { 
            return resolve(res);  
        }).catch(err => {
            console.log("Error fetchCitiesWeather:", err)
            reject(name);
        })
    })
  }

const getCitiesWeather = (names) => {
    return dispatch => {
        dispatch(getCitiesWeatherStart());

        Promise.all(names.map(name => fetchCitiesWeather(name)))
          .then(result => {
            dispatch(getCitiesWeatherSuccess(result));
          })
          .catch(err => {
            console.log(err.message)
            dispatch(getCitiesWeatherError());
          });
    }
}

const getCityWeatherByName = (name) => {
    return dispatch => {
        dispatch(getWeatherStart());
        WeatherService.getWeatherByName(name)
          .then(result => {
            dispatch(getWeatherSuccess(result));
          })
          .catch(err => {
            console.log(err.message)
            dispatch(getWeatherError());
          });
    }
}

const getDailyForecast = (lat, long) => {
    return dispatch => {
        dispatch(getDailyForecastStart());
    
        WeatherService.getWeatherByCoords(lat, long)
          .then(result => {
            dispatch(getDailyForecastSuccess(result));
          })
          .catch(err => {
            console.log(err.message)
            dispatch(getDailyForecastError());
          });
    }
}

const actions = {
    getCitiesWeather,
    getCityWeatherByName,
    getDailyForecast
}

export default actions;

