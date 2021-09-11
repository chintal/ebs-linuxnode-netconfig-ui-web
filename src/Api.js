

import axios from "axios";


export const netconfigApi = axios.create({
    baseURL: "/api",
})