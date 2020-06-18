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

const initial_state = {
    citiesWeather: [],
    cityWeather: null,
    dailyForecast: [],
    loading: false
};

export const reducer = (state = initial_state, action) => { 
    switch(action.type) {
        case GET_CITIES_WEATHER_START:
        case GET_WEATHER_START:
        case GET_DAILY_FORECAST_START:
            return Object.assign({}, state, { loading: true });

        case GET_CITIES_WEATHER_ERROR:
        case GET_WEATHER_ERROR:
        case GET_DAILY_FORECAST_ERROR:
            return Object.assign({}, state, { loading: false });

        case GET_CITIES_WEATHER_SUCCESS:
            return Object.assign({}, state, { citiesWeather: action.args, loading: false });

        case GET_WEATHER_SUCCESS:
            return Object.assign({}, state, { cityWeather: action.args, loading: false });
        
        case GET_DAILY_FORECAST_SUCCESS:
            return Object.assign({}, state, { dailyForecast: action.args, loading: false });
        
        default:
            return state;
    }    
}