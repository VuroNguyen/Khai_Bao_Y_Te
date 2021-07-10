import { APPROVED_API } from "./APIurl";
import axiosClient from "../axiosClient";


const ApprovedAPI = {
    getApproved: () => {
        const url = APPROVED_API;
        return axiosClient.get(url);
    }
};

export default ApprovedAPI;