import axios from 'axios';

const getWeather = (capital) => {
    const request = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${import.meta.env.VITE_SOME_KEY}`);
    return request.then(response => response.data);
};

export default { getWeather };