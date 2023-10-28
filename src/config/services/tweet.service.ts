/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseApi } from "./api.service";

export interface TweetDto {
    idTweet: string;
    idUser?: string
    nameUser?: string
    usernameAuthorTweet: string
    content: string;
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

// export async function listById(idTweet: string) {
//     try {
//         const resposta = await apiService.get(`/tweets/${idTweet} `, {
//         });

//         return {
//             ok: resposta.data?.ok,
//             message: resposta.data.message,
//             code: resposta.data.code,
//             data: resposta.data.data,
//         };
//     } catch (error: any) {
//         return {
//             ok: error.response.data?.ok,
//             code: error.response.data?.code,
//             message: error.response.data?.message,
//             data: error.response.data?.data,
//         };
//     }
// }

export async function update(data: UpdateTweetRequest) {
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

export async function deleteTweet(idTweet: string) {
    try {
        const resposta = await apiService.delete(`/tweets/${idTweet} `, {
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