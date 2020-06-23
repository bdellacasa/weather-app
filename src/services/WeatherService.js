import { request } from '../utils/helpers';
import API_KEY  from '../config';

const API_URL = value => { return `https://api.openweathermap.org/data/2.5/${value}&appid=${API_KEY}` };
export const ICON_URL = value => { return `http://openweathermap.org/img/wn/${value}@2x.png` }

const getWeatherByName = async(name) => {
    let result;
    const cachedWeather = localStorage.getItem(name);
    if (cachedWeather) {
        result = JSON.parse(cachedWeather);
    } else {
        const custom_url = `weather?q=${name}`;
        result = await request(API_URL(custom_url));
        if (result) {
            localStorage.setItem(name, JSON.stringify(result));
        }
    }
    return result;
}

const getWeatherByCoords = async(lat,long,name) => {
    let result;
    const cachedWeather = localStorage.getItem(`${name}-7-days`);
    if (cachedWeather) {
        result = JSON.parse(cachedWeather);
    } else {
        const custom_url = `onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly`;
        result = await request(API_URL(custom_url));
        if (result) {
            localStorage.setItem(`${name}-7-days`, JSON.stringify(result));   
        }
    }
    return result;
}


const WeatherService = {
    getWeatherByName,
    getWeatherByCoords
}

export default WeatherService;