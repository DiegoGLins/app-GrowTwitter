/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { CreateReTweetRequest, CreateTweetRequest, TweetDto } from './tweet.service';
import { LikeCreateDto, LikeListDto } from './like.service';


const apiService = axios.create({
    baseURL: 'https://api-growtwitter-6edn.onrender.com',
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

export interface ResponseCreateReTweetApi {
    ok?: boolean;
    code?: number;
    message?: string;
    data?: CreateReTweetRequest[]
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
    data?: LikeCreateDto[]
}

export interface ResponseListLikeApi {
    ok?: boolean;
    code?: number;
    message?: string
    data?: LikeListDto
}


