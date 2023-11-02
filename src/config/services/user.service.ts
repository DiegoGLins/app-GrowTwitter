/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseApiUser } from "./api.service"

export interface UserDto {
    id: string,
    name: string,
    username: string,
    email: string
    token?: string,
    avatar?: string
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


export async function listUsersById(idUser: string): Promise<ResponseApiUser> {
    try {
        const body = idUser
        const response = await apiService.get(`/users/byId`, {
            data: {
                body
            }
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
