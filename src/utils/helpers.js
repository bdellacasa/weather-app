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

export const validate = (s) => {
    if (typeof s !== 'string' || !(/^[a-zA-Z ]+$/.test(s))) { 
        return null;
    } else {
        const array = (s).split(" ").map(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
        let result = "";        
        array.forEach((e, idx) => {
            result = result.concat(idx < array.length-1 ? e + " " : e);
        });
        return result;
    }
}