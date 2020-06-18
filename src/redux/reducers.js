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
    loadingCarousel: true,
    loadingTodayWeather: true,
    loadingDailyForecast: true
};

export const reducer = (state = initial_state, action) => { 
    switch(action.type) {
        case GET_CITIES_WEATHER_START:
        case GET_WEATHER_START:
        case GET_DAILY_FORECAST_START:
            return state;

        case GET_CITIES_WEATHER_ERROR:
        case GET_WEATHER_ERROR:
        case GET_DAILY_FORECAST_ERROR:
            return Object.assign({}, state, { loading: false });

        case GET_CITIES_WEATHER_SUCCESS:
            return Object.assign({}, state, { citiesWeather: action.args, loadingCarousel: false });

        case GET_WEATHER_SUCCESS:
            return Object.assign({}, state, { cityWeather: action.args, loadingTodayWeather: false });
        
        case GET_DAILY_FORECAST_SUCCESS:
            return Object.assign({}, state, { dailyForecast: action.args, loadingDailyForecast: false });
        
        default:
            return state;
    }    
}