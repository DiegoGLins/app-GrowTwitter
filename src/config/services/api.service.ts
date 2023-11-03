/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { CreateTweetRequest, TweetDto } from './tweet.service';

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
    data?: {
        reTweets: any | null,
        tweets: TweetDto[] | null
    }
}

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


