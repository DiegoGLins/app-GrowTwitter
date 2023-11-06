/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseLikeApi } from "./api.service";

export interface LikeCreateDto {
    idTweet?: string
    token: string;
}


export interface CreateLikeRequest {
    idLike?: string;
    idTweet?: string
    idAuthorTweet?: string;
    idAuthorLike?: string;
    authorLike?: string;
    contentTweetLiked?: string;
}

export async function createLike(data: LikeCreateDto): Promise<ResponseLikeApi> {
    try {
        const response = await apiService.get(`/likes/${data.idTweet}`, {
            headers: {
                Authorization: data.token,
            },
        });

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