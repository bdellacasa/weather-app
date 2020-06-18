import axios from 'axios';

export const request = async (url) => {
    return axios.get(url).then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err)
        return null;
    })
}
  
export const kelvinToCelsius = (kelvin) => Math.round((kelvin - 273.15));