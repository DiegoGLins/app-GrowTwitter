/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseLikeApi, ResponseListLikeApi } from "./api.service";

export interface LikeCreateDto {
    idLike?: string
    idTweet?: string | null
    idReTweet?: string | null
    idAuthorTweet?: string | null
    idAuthorLike?: string | null
    authorLike?: string
}

export interface LikeListDto {
    contentTweetLiked: string;
    likes: number
}

export async function listLike(): Promise<ResponseListLikeApi> {
    try {
        const response = await apiService.get('/likes')

        return {
            ok: response.data?.ok,
            code: response.data?.code,
            message: response.data?.message,
            data: response.data?.data,
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


export async function createLike(data: LikeCreateDto): Promise<ResponseLikeApi> {
    try {
        const dataLike = {
            idTweet: data.idTweet,
            idReTweet: data.idReTweet,
            idAuthorLike: data.idAuthorLike,
        }
        const response = await apiService.post('/likes', dataLike)

        return {
            ok: response.data?.ok,
            code: response.data?.code,
            message: response.data?.message,
            data: response.data?.data,
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

export async function deleteLike(idLike: string): Promise<ResponseLikeApi> {
    try {
        const response = await apiService.delete(`/likes/${idLike}`,)

        return {
            ok: response.data?.ok,
            code: response.data?.code,
            message: response.data?.message,
            data: response.data?.data,
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
