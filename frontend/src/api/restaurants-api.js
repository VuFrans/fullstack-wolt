import axios from 'axios';

import { constants } from '../utility/constants';

const baseUrl =
    process.env.NODE_ENV === constants.environment.dev
      ? constants.localApiPath
      : '/api';

export const getRestaurantsApi = async () => {
    const response = await axios.get(`${baseUrl}/restaurants`);
    const data = response.data;
    console.log(response);

    if (response.status === constants.statusCodes.OK) {
        return data;
    }

    return [];
};

export const getRestaurantsTagsApi = async () => {
    const response = await axios.get(`${baseUrl}/restaurants/tags`);
    const data = response.data;
    
    console.log(response);
    if (response.status === constants.statusCodes.OK) {
        return data;
    }

    return [];
  };

export const getNearbyRestaurantsApi = async () => {
    navigator.geolocation.getCurrentPosition( async (position) => {
        const { latitude, longitude } = position.coords;

        const response = await axios.get(
        `${baseUrl}/search?q&lat=${latitude}&lon=${longitude}`
        );

        const data = response.data;

        console.log(response.status);
        if (response.status === constants.statusCodes.OK) {
            return data;
        }

        return [];
    });
};