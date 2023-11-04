/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseApiTweet, ResponseCreateTweetApi } from "./api.service";
import { UserDto } from "./user.service";

export interface TweetDto {
    idUser?: string
    nameUser: string
    usernameAuthorTweet: string
    reTweets: TweetDto[]
    content: string;
    user: UserDto
    tweeetOriginal: TweetDto
    type: "N" | "R"

}

export interface CreateTweetRequest {
    idUser?: string;
    nameUser?: string;
    usernameAuthorTweet?: string
    content: string;
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
    content: string;
    idUser?: string
    nameUser?: string
    usernameAuthorTweet: string
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

export async function listAll(token: string) {
    try {
        const resposta = await apiService.get('/tweets', {
            headers: {
                Authorization: token,
            },
        });

        return {
            ok: resposta.data?.ok,
            message: resposta.data?.message,
            code: resposta.data?.code,
            data: resposta.data?.data,
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

export async function listTweetFromUser(data: UserDto): Promise<ResponseApiTweet> {
    try {
        const resposta = await apiService.get(`/tweets/fromUser/${data.id} `, {
            headers: {
                Authorization: data.token
            }
        });

        return {
            ok: resposta.data?.ok,
            code: resposta.data?.code,
            message: resposta.data?.message,
            data: resposta.data?.data,
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

        const resposta = await apiService.get(`/tweets/${data.idTweet} `, {
            headers: {
                Authorization: data.token
            }
        });

        return {
            ok: resposta.data?.ok,
            message: resposta.data?.message,
            code: resposta.data?.code,
            data: resposta.data?.data,
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

        const resposta = await apiService.put(`/tweets/${data.idTweet}`, body, {
            headers: {
                Authorization: data.token,
            },
        });

        return {
            ok: resposta.data?.ok,
            code: resposta.data?.code,
            message: resposta.data?.message,
            data: resposta.data?.data,
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
        const resposta = await apiService.delete(`/tweets/${data.idTweet} `, {
            headers: {
                Authorization: data.token
            }
        });

        return {
            ok: resposta.data?.ok,
            message: resposta.data?.message,
            code: resposta.data?.code,
            data: resposta.data?.data,
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

