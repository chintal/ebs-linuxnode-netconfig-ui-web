

import axios from "axios";
import { getToken } from "./Utils/Auth";


export const netconfigApi = axios.create({
    baseURL: "/api",
})


netconfigApi.interceptors.request.use(function (config) {
    let token = getToken();
    if (token){
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});
