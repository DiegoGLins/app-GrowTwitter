/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService, { ResponseApiUser } from "./api.service"

export interface UserDto {
    id: string,
    name: string,
    username: string,
    token?: string,
    avatar?: string;
    userLiker: any
}

//id String  @id @db.Uuid @default(uuid())
//name String @db.VarChar(18)
//username String @db.VarChar(16) @unique
//email String @db.VarChar(100) @unique
//password String @db.VarChar(64)
//token String? @unique
//following Follow[] @relation("user_following")
//followers Follow[] @relation("user_followers")
//tweets Tweet[]
//userLiker Liker[]

export interface CadastroRequest {
    name: string;
    username: string;
    email: string;
    password: string;
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
