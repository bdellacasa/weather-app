import { request } from '../utils/helpers';

const API_URL = 'http://ip-api.com/json';

const getCoordinates = async() => {
    const result = await request(API_URL);
    return result;
}

export default getCoordinates;