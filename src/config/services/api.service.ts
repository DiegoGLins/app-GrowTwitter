/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const apiService = axios.create({
    baseURL: 'https://api-growtwitter-6edn.onrender.com'
})

export default apiService

export interface ResponseApi {
    ok?: boolean;
    code?: number;
    message?: string;
    data?: any
}

