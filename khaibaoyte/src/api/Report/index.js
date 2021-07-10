import { GET_RESPONSE_API } from "../APIurl";
import axiosClient from "../axiosClient";


const RESPONSE_API = {
    getResponse: () => {
        const url = GET_RESPONSE_API;
        return axiosClient.get(url);
    }
};

export default RESPONSE_API;