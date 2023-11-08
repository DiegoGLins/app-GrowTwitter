/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { CreateTweetRequest, TweetDto } from './tweet.service';
import { CreateLikeRequest } from './like.service';


//'https://api-growtwitter-6edn.onrender.com
const apiService = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        Authorization: localStorage.getItem('token')
    }
})

export default apiService

export interface ResponseApiTweet {
    ok?: boolean;
    code?: number;
    message?: string;
    data?: TweetDto[]
}

apiService.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? token : "";
    return config;
});


export interface ResponseCreateTweetApi {
    ok?: boolean;
    code?: number;
    message?: string;
    data?: CreateTweetRequest[]
}

export interface ResponseApiUser {
    ok?: boolean;
    code?: number;
    message?: string;
    data?: any
}

export interface ResponseLikeApi {
    ok?: boolean;
    code?: number;
    message?: string
    data?: CreateLikeRequest[]
}


