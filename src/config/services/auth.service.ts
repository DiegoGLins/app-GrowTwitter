/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseApiUser } from "./api.service";

interface LoginRequest {
    username: string;
    password: string
}

export interface CadastroRequest {
    name: string;
    username: string;
    email: string;
    password: string;
}


export async function login(objlogin: LoginRequest): Promise<ResponseApiUser> {
    try {
        const response = await apiService.post("/auth/login", objlogin)

        return {
            ok: response.data?.ok,
            code: response.data?.code,
            message: response.data?.message,
            data: response.data?.data,
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

export async function logout(token: string): Promise<ResponseApiUser> {
    try {
        const response = await apiService.get("/auth/logout", {
            headers: {
                Authorization: token
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
            data: error.response.data?.data
        }
    }
}

export async function cadastro(objCadastro: CadastroRequest): Promise<ResponseApiUser> {
    try {
        const response = await apiService.post('/users', objCadastro)
        console.log(response)

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