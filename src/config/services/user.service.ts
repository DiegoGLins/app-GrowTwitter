/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseApiUser } from "./api.service"
import { CreateLikeRequest } from "./like.service";

export interface UserDto {
    id?: string,
    name: string,
    username: string,
    token?: string,
    avatar: string;
    userLiker?: CreateLikeRequest[]
}


export interface CadastroRequest {
    name: string;
    username: string;
    email: string;
    password: string;
}


export async function cadastro(objCadastro: CadastroRequest): Promise<ResponseApiUser> {
    try {
        const response = await apiService.post('/users', objCadastro)

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
            data: error.response.data?.data
        }
    }
}


export async function listUsers(): Promise<ResponseApiUser> {
    try {
        const response = await apiService.get('/users')
        const users = response.data.data.map((item: UserDto) => {
            return {
                ok: true,
                code: 200,
                message: "Usuarios listados com sucesso",
                data: {
                    id: item.id,
                    name: item.name,
                    username: item.username,
                    token: item.token
                }
            }
        })
        return users

    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}


export async function getUserById(): Promise<ResponseApiUser> {
    try {
        const token = localStorage.getItem('token')
        const response = await apiService.get(`/users/byId`, {
            headers: { Authorization: token }
        })

        return {
            ok: response.data?.ok,
            code: response.data?.code,
            message: response.data?.message,
            data: response.data?.data,
        }
    }
    catch (error: any) {
        throw new Error(error.response.data.message)
    }
}
