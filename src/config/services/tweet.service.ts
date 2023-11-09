/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseApiTweet, ResponseCreateTweetApi } from "./api.service";
import { CreateLikeRequest } from "./like.service";
import { UserDto } from "./user.service";

export interface TweetDto {
    id: string;
    content: string;
    idUser: string;
    authorTweet: string;
    avatarTweet?: string
    likes: CreateLikeRequest[];
    type?: "N" | "R"
    tweeetOriginal?: TweetDto
    reTweet: TweetDto[]
    user: UserDto

}

export interface CreateTweetRequest {
    content: string;
    type: "N" | "R";
    usernameAuthorTweet?: string
    token: string
}


type UpdateTweetRequest = Partial<CreateTweetRequest> & { idTweet: string }

export interface DeleteTweetRequest {
    idTweet: string;
    content?: string;
    idUser?: string
    authorTweet?: string
    token: string
}

export interface ListTweetRequest {
    idTweet: string;
    content?: string;
    idUser?: string
    nameUser?: string
    userNameAuthorTweet?: string
    avatar?: string | null;
    token: string
}


export async function create(data: CreateTweetRequest): Promise<ResponseCreateTweetApi> {

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

export async function listAll(): Promise<ResponseApiTweet> {
    try {
        const response = await apiService.get('/tweets', {
        })

        return {
            ok: response.data?.ok,
            message: response.data?.message,
            code: response.data?.code,
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

export async function listTweetFromUser(token: string): Promise<ResponseApiTweet> {
    try {
        const response = await apiService.get(`/tweets/fromUser`, {
            headers: {
                Authorization: token
            }
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

export async function listById(data: ListTweetRequest): Promise<ResponseApiTweet> {
    try {

        const response = await apiService.get(`/tweets/${data.idTweet} `, {
            headers: {
                Authorization: data.token
            }
        });

        return {
            ok: response.data?.ok,
            message: response.data?.message,
            code: response.data?.code,
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

export async function update(data: UpdateTweetRequest): Promise<ResponseApiTweet> {
    try {
        const body = { tweet: data.content };

        const response = await apiService.put(`/tweets/${data.idTweet}`, body, {
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

export async function deleteTweet(data: DeleteTweetRequest): Promise<ResponseApiTweet> {
    try {
        const response = await apiService.delete(`/tweets/${data.idTweet} `, {
            headers: {
                Authorization: data.token
            }
        });

        return {
            ok: response.data?.ok,
            message: response.data?.message,
            code: response.data?.code,
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

