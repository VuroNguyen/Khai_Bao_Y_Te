import { LOGIN_API } from "../APIurl";
import axiosClient from "../axiosClient";


const loginApi = {
    login: (params) => {
        const url = LOGIN_API;
        return axiosClient.post(url, params);
    }
};

export default loginApi;