import { request } from '../utils/helpers';
import API_KEY  from '../config';

const API_URL = value => { return `https://api.openweathermap.org/data/2.5/${value}&appid=${API_KEY}` };
export const ICON_URL = value => { return `http://openweathermap.org/img/wn/${value}@2x.png` }

const getWeatherByName = async(name) => {
    const custom_url = `weather?q=${name}`;
    let result = await request(API_URL(custom_url));
    return result;
}

const getWeatherByCoords = async(lat,long) => {
    const custom_url = `onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly`;
    let result = await request(API_URL(custom_url));
    return result;
}


const WeatherService = {
    getWeatherByName,
    getWeatherByCoords
}

export default WeatherService;