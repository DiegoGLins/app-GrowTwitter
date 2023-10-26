/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseApi } from "./api.service";

export interface TweetDto {
    content: string;
    idUser: string
    authorTweet: string
}

export interface UpdateTweetDto {
    idUser: string;
    idTweet: string;
    content?: string
}

export interface CreateTweetRequest {
    content: string;
    idUser: string
    authorTweet: string
    token: string
}

export interface UpdateTweetRequest {
    id: string;
    content: string;
    idUser: string
    authorTweet: string
    token: string
}

export interface DeleteTweetRequest {
    id: string;
    content: string;
    idUser: string
    authorTweet: string
    token: string
}

export interface ListTweetRequest {
    id: string;
    content: string;
    idUser: string
    authorTweet: string
    token: string
}


export async function create(data: CreateTweetRequest): Promise<ResponseApi> {

    try {
        const response = await apiService.post('/tweets', data, {
            headers: {
                Authorization: data.token
            }
        })

        return {
            ok: response.data?.ok,
            code: response.data?.code,
            message: response.data?.message,
            data: response.data?.data
        }
    } catch (error: any) {
        return {
            ok: error.response.data?.ok,
            code: error.response.data?.code,
            message: error.response.data?.message,
            data: error.response.data?.data,
        };
    }
}

export async function listAll(token: string) {
    try {
        const resposta = await apiService.get('/tweets', {
            headers: {
                Authorization: token,
            },
        });

        return {
            ok: resposta.data?.ok,
            message: resposta.data.message,
            code: resposta.data.code,
            data: resposta.data.data,
        };
    } catch (error: any) {
        return {
            ok: error.response.data?.ok,
            code: error.response.data?.code,
            message: error.response.data?.message,
            data: error.response.data?.data,
        };
    }
}