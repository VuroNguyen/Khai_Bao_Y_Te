import axios from 'axios'
import queryString from "querystring"
import { beURL } from '../components/common/constant';

const axiosClient = axios.create({
    baseURL: beURL,
    header: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axios.interceptors.request.use(
    config => {
        const { origin } = new URL(config.url);
        const allowOrigins = [process.env.REACT_APP_API_URL];
        const token = localStorage.getItem('token');
        if (allowOrigins.includes(origin)) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    error =>{
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    error =>{
        throw error;
    }
);

export default axiosClient;